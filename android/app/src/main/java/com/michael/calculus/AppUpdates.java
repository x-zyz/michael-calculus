package com.michael.calculus;

import android.content.ClipData;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import androidx.core.content.FileProvider;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.security.MessageDigest;
import javax.net.ssl.HttpsURLConnection;
import org.json.JSONObject;

@CapacitorPlugin(name = "AppUpdates")
public class AppUpdates extends Plugin {
    private static final String PACKAGE = "com.michael.calculus";
    private static final String APK_TYPE = "application/vnd.android.package-archive";

    private record Release(String tag, String url, long size, String digest, long build, long sequence) {}

    @PluginMethod
    public void check(PluginCall call) {
        try {
            PackageInfo installed = installedPackage();
            JSONObject manifest = fetch(installed);
            Release latest = releaseFrom(manifest);
            JSObject response = new JSObject().put("installed", installed.versionName)
                .put("status", manifest.getString("status"));
            if (latest != null) {
                response.put("version", latest.tag().substring(1));
                response.put("size", latest.size());
                response.put("sequence", latest.sequence());
            }
            call.resolve(response);
        } catch (Exception e) {
            call.reject("无法检查更新，请确认手机能连接更新服务 后重试。", "CHECK_FAILED", e);
        }
    }

    @PluginMethod
    public void install(PluginCall call) {
        try {
            PackageInfo installed = installedPackage();
            Release latest = releaseFrom(fetch(installed));
            if (latest == null || !latest.tag().substring(1).equals(call.getString("version"))
                || !Long.toString(latest.sequence()).equals(call.getString("sequence"))) {
                call.reject("发布版本已变化，请重新检查更新。", "RELEASE_CHANGED");
                return;
            }
            File apk = cachedApk(latest, installed);
            if (!latest.equals(releaseFrom(fetch(installed)))) {
                call.reject("更新清单已变化，请重新检查更新。", "RELEASE_CHANGED");
                return;
            }
            getActivity().runOnUiThread(() -> openInstaller(call, apk));
        } catch (SecurityException e) {
            call.reject("更新包校验未通过，安装已取消。", "INVALID_APK", e);
        } catch (Exception e) {
            call.reject("无法下载更新，请检查网络和可用存储空间后重试。", "DOWNLOAD_FAILED", e);
        }
    }

    @SuppressWarnings("deprecation")
    private PackageInfo installedPackage() throws PackageManager.NameNotFoundException {
        if (!PACKAGE.equals(getContext().getPackageName())) {
            throw new SecurityException("Updates are only available in the production application");
        }
        return getContext().getPackageManager().getPackageInfo(PACKAGE, signatureFlags());
    }

    private JSONObject fetch(PackageInfo installed) throws Exception {
        return ByteVirtManifest.fetch(getContext(), Math.toIntExact(versionCode(installed)));
    }

    private static Release releaseFrom(JSONObject manifest) throws Exception {
        if (!manifest.has("tag")) return null;
        return new Release(manifest.getString("tag"), manifest.getString("url"),
            manifest.getLong("size"), manifest.getString("digest"), manifest.getLong("build"),
            manifest.getLong("sequence"));
    }

    private File cachedApk(Release release, PackageInfo installed) throws Exception {
        File cache = new File(getContext().getCacheDir(), "updates");
        Files.createDirectories(cache.toPath());
        File apk = new File(cache, release.sequence() + ".apk");
        if (apk.isFile()) {
            try {
                verifyApk(apk, release, installed);
                return apk;
            } catch (SecurityException invalid) {
                Files.delete(apk.toPath());
            }
        }
        File temporary = File.createTempFile("download-", ".part", cache);
        try {
            HttpsURLConnection connection = ByteVirtManifest.connection(release.url());
            if (connection.getResponseCode() != 200) {
                connection.disconnect();
                throw new IOException("APK download failed");
            }
            try (InputStream in = connection.getInputStream();
                 OutputStream out = Files.newOutputStream(temporary.toPath())) {
                copy(in, out, release.size());
            } finally {
                connection.disconnect();
            }
            // The package parser expects the .apk suffix on some Android releases.
            Files.move(temporary.toPath(), apk.toPath(), StandardCopyOption.REPLACE_EXISTING);
            try {
                verifyApk(apk, release, installed);
            } catch (Exception e) {
                Files.deleteIfExists(apk.toPath());
                throw e;
            }
            return apk;
        } finally {
            Files.deleteIfExists(temporary.toPath());
        }
    }

    private static void copy(InputStream in, OutputStream out, long limit) throws IOException {
        byte[] buffer = new byte[16384];
        long total = 0;
        for (int count; (count = in.read(buffer)) != -1;) {
            total += count;
            if (total > limit) throw new IOException("Update response exceeds expected size");
            out.write(buffer, 0, count);
        }
    }

    @SuppressWarnings("deprecation")
    private void verifyApk(File apk, Release release, PackageInfo installed) throws Exception {
        if (apk.length() != release.size()) throw new SecurityException("Incorrect APK size");
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        try (InputStream in = Files.newInputStream(apk.toPath())) {
            byte[] buffer = new byte[16384];
            for (int count; (count = in.read(buffer)) != -1;) digest.update(buffer, 0, count);
        }
        byte[] actual = digest.digest();
        byte[] expected = new byte[actual.length];
        for (int i = 0; i < expected.length; i++) {
            expected[i] = (byte) Integer.parseInt(release.digest().substring(i * 2, i * 2 + 2), 16);
        }
        if (!MessageDigest.isEqual(actual, expected)) throw new SecurityException("Incorrect APK digest");

        PackageInfo candidate = getContext().getPackageManager().getPackageArchiveInfo(apk.getPath(), signatureFlags());
        if (candidate == null || !PACKAGE.equals(candidate.packageName)
            || !release.tag().substring(1).equals(candidate.versionName)
            || versionCode(candidate) != release.build()
            || versionCode(candidate) <= versionCode(installed)
            || !sameSigner(candidate, installed)) {
            throw new SecurityException("APK identity does not match the installed release");
        }
    }

    @SuppressWarnings("deprecation")
    private static int signatureFlags() {
        return Build.VERSION.SDK_INT >= 28 ? PackageManager.GET_SIGNING_CERTIFICATES : PackageManager.GET_SIGNATURES;
    }

    @SuppressWarnings("deprecation")
    private static Signature[] signers(PackageInfo info) {
        if (Build.VERSION.SDK_INT < 28) return info.signatures;
        return info.signingInfo == null ? null : info.signingInfo.getApkContentsSigners();
    }

    private static boolean sameSigner(PackageInfo left, PackageInfo right) {
        Signature[] a = signers(left);
        Signature[] b = signers(right);
        return a != null && b != null && a.length == 1 && b.length == 1 && a[0].equals(b[0]);
    }

    @SuppressWarnings("deprecation")
    private static long versionCode(PackageInfo info) {
        return Build.VERSION.SDK_INT >= 28 ? info.getLongVersionCode() : info.versionCode;
    }

    private void openInstaller(PluginCall call, File apk) {
        try {
            if (!getContext().getPackageManager().canRequestPackageInstalls()) {
                Intent settings = new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES, Uri.parse("package:" + PACKAGE));
                getActivity().startActivity(settings);
                call.resolve(new JSObject().put("state", "permission"));
                return;
            }
            Uri uri = FileProvider.getUriForFile(getContext(), PACKAGE + ".fileprovider", apk);
            Intent installer = new Intent(Intent.ACTION_VIEW)
                .setDataAndType(uri, APK_TYPE)
                .addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            installer.setClipData(ClipData.newRawUri("APK", uri));
            getActivity().startActivity(installer);
            call.resolve(new JSObject().put("state", "installer"));
        } catch (RuntimeException e) {
            call.reject("此设备无法打开系统安装界面。", "INSTALLER_UNAVAILABLE", e);
        }
    }
}

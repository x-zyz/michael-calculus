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
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.security.MessageDigest;
import java.util.regex.Pattern;
import javax.net.ssl.HttpsURLConnection;
import org.json.JSONArray;
import org.json.JSONObject;

@CapacitorPlugin(name = "AppUpdates")
public class AppUpdates extends Plugin {
    private static final String PACKAGE = "com.michael.calculus";
    private static final String REPO = "x-zyz/michael-calculus";
    private static final String RELEASES = "https://github.com/" + REPO + "/releases/";
    private static final String LATEST = "https://api.github.com/repos/" + REPO + "/releases/latest";
    private static final Pattern TAG = Pattern.compile("v[0-9]{1,8}\\.[0-9]{1,8}\\.[0-9]{1,8}");
    private static final Pattern DIGEST = Pattern.compile("sha256:[a-f0-9]{64}");
    private static final long MAX_APK = 100L * 1024 * 1024;
    private static final int MAX_METADATA = 1024 * 1024;
    private static final String APK_TYPE = "application/vnd.android.package-archive";

    private record Release(String tag, URL url, long size, String digest) {}

    @PluginMethod
    public void check(PluginCall call) {
        try {
            PackageInfo installed = installedPackage();
            Release latest = latestRelease(installed.versionName);
            JSObject response = new JSObject().put("installed", installed.versionName);
            if (latest != null) {
                response.put("version", latest.tag().substring(1));
                response.put("size", latest.size());
            }
            call.resolve(response);
        } catch (Exception e) {
            call.reject("无法检查更新，请确认手机能连接 GitHub 后重试。", "CHECK_FAILED", e);
        }
    }

    @PluginMethod
    public void install(PluginCall call) {
        try {
            PackageInfo installed = installedPackage();
            Release latest = latestRelease(installed.versionName);
            if (latest == null || !latest.tag().substring(1).equals(call.getString("version"))) {
                call.reject("发布版本已变化，请重新检查更新。", "RELEASE_CHANGED");
                return;
            }
            File apk = cachedApk(latest, installed);
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

    private Release latestRelease(String currentVersion) throws Exception {
        HttpsURLConnection connection = connect(new URL(LATEST), true);
        JSONObject release;
        try (InputStream in = connection.getInputStream();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            copy(in, out, MAX_METADATA);
            release = new JSONObject(out.toString(StandardCharsets.UTF_8.name()));
        } finally {
            connection.disconnect();
        }

        String tag = release.optString("tag_name");
        String current = "v" + currentVersion;
        if (release.optBoolean("draft") || release.optBoolean("prerelease")
            || !TAG.matcher(tag).matches() || !TAG.matcher(current).matches()) {
            throw new IOException("Invalid release version");
        }
        if (compareTags(tag, current) <= 0) return null;
        String name = "Michael-calculus-" + tag.substring(1) + ".apk";
        String url = RELEASES + "download/" + tag + "/" + name;
        JSONArray assets = release.getJSONArray("assets");
        for (int i = 0; i < assets.length(); i++) {
            JSONObject asset = assets.getJSONObject(i);
            if (!name.equals(asset.optString("name"))) continue;
            String digest = asset.optString("digest");
            long size = asset.optLong("size");
            if (url.equals(asset.optString("browser_download_url"))
                && DIGEST.matcher(digest).matches() && size > 0 && size <= MAX_APK) {
                return new Release(tag, new URL(url), size, digest.substring(7));
            }
        }
        throw new IOException("No verified APK asset for " + tag);
    }

    private static int compareTags(String candidate, String installed) {
        String[] left = candidate.substring(1).split("\\.");
        String[] right = installed.substring(1).split("\\.");
        for (int i = 0; i < left.length; i++) {
            int cmp = Integer.compare(Integer.parseInt(left[i]), Integer.parseInt(right[i]));
            if (cmp != 0) return cmp;
        }
        return 0;
    }

    private File cachedApk(Release release, PackageInfo installed) throws Exception {
        File cache = new File(getContext().getCacheDir(), "updates");
        Files.createDirectories(cache.toPath());
        File apk = new File(cache, release.tag() + ".apk");
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
            HttpsURLConnection connection = connect(release.url(), false);
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

    private static HttpsURLConnection connect(URL initial, boolean metadata) throws IOException {
        URL url = initial;
        for (int redirects = 0; redirects <= 4; redirects++) {
            String host = url.getHost();
            boolean allowedHost = metadata ? "api.github.com".equalsIgnoreCase(host)
                : "github.com".equalsIgnoreCase(host) || "release-assets.githubusercontent.com".equalsIgnoreCase(host)
                    || "objects.githubusercontent.com".equalsIgnoreCase(host);
            if (!"https".equalsIgnoreCase(url.getProtocol()) || !allowedHost
                || url.getUserInfo() != null || (url.getPort() != -1 && url.getPort() != 443)) {
                throw new IOException("Unexpected update server");
            }
            HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
            connection.setInstanceFollowRedirects(false);
            connection.setConnectTimeout(15000);
            connection.setReadTimeout(20000);
            connection.setRequestProperty("User-Agent", "Michael-calculus-Android");
            if (metadata) connection.setRequestProperty("Accept", "application/vnd.github+json");
            try {
                int status = connection.getResponseCode();
                if (status == 200) return connection;
                String location = connection.getHeaderField("Location");
                if (!metadata && status >= 300 && status < 400 && location != null) {
                    url = new URL(url, location);
                    connection.disconnect();
                    continue;
                }
                throw new IOException("Update server returned HTTP " + status);
            } catch (IOException e) {
                connection.disconnect();
                throw e;
            }
        }
        throw new IOException("Too many redirects");
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

package com.michael.calculus;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Base64;
import android.util.JsonReader;
import android.util.JsonToken;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;
import java.net.URL;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.security.KeyFactory;
import java.security.MessageDigest;
import java.security.Signature;
import java.security.spec.X509EncodedKeySpec;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;
import javax.net.ssl.HttpsURLConnection;
import org.json.JSONException;
import org.json.JSONObject;

final class ByteVirtManifest {
    private static final String ORIGIN = "https://update.0979019203.top";
    private static final String LANE = "/calculus/stable/android";
    private static final String KEY_ID = "calculus-stable-android-1";
    private static final String PUBLIC_KEY = "MIIBojANBgkqhkiG9w0BAQEFAAOCAY8AMIIBigKCAYEAvygRDRVIl0GOMXJPZ0aApIAm1P51vjByHyMw3OAEPSgJCZHY/gfCkA3r1HpC2TA+3k4RXSsI9g07JK2BrC0HPITGKVQY3aWUIW0WAJq5PPTSrjADamBWh7g18UMktSkLmRz2ydq/ErX9XIURV7UH+cE3CfZMulVkV1TbZCzyOp3esUg7E9OVcnuZXwLOeSzJ2wsw7CN/+fP5vllpX5kklmIuPjX43TbI6pi435g+hoX602komvHhSgP9ZVhuFyoiQcvdauKuFDsOTNfwvlUTzuwfQuduhY5LUhYr9LBJk69xe+jVvG1Ixv3MWjiJkLdCBO4YzMV+tLxFKoODZJbKNhZqMy6I0ztSmVzqwdpNXviCaaXV/PJSGij6rX7XCUbDh8KeYfibT7+x3xHAUDrwSCd4oy5sSYV9WhQnEEnmET3uu011feYnU+rODSAGecB7MdjeKj5v0BtJFrLos2styFXMaW4Gz5LdrC6h4hICsaZBFelMGrSsMnfVXR1HngPHAgMBAAE=";
    static final String PACKAGE_ID = "com.michael.calculus";
    static final String APK_SIGNER = "8d7d3a0c3cccb6130ce83dc1d71c7c9721d4266c085f5a68f4b9df8027751706";
    private static final int URL_BASE64 = Base64.URL_SAFE | Base64.NO_WRAP | Base64.NO_PADDING;
    private static final int MAX_MANIFEST = 65536;
    private static final long DAY_MS = 86400000L;

    private ByteVirtManifest() {}

    static HttpsURLConnection connection(String url) throws IOException {
        if (!url.startsWith(ORIGIN + LANE + "/")) throw new IOException("Unexpected update URL");
        HttpsURLConnection connection = (HttpsURLConnection) new URL(url).openConnection();
        connection.setConnectTimeout(7000);
        connection.setReadTimeout(7000);
        connection.setInstanceFollowRedirects(false);
        connection.setUseCaches(false);
        return connection;
    }

    static synchronized JSONObject fetch(Context context, int installedBuild) throws IOException, JSONException {
        HttpsURLConnection connection = connection(ORIGIN + LANE + "/latest.json");
        try {
            connection.setRequestProperty("Accept", "application/json");
            int status = connection.getResponseCode();
            if (status == 404) return new JSONObject().put("status", "unpublished");
            if (status != 200) throw new IOException("Manifest HTTP " + status);
            byte[] envelopeBytes;
            try (InputStream input = connection.getInputStream()) {
                ByteArrayOutputStream bytes = new ByteArrayOutputStream();
                byte[] buffer = new byte[4096];
                for (int n; (n = input.read(buffer)) != -1;) {
                    if (bytes.size() + n > MAX_MANIFEST) throw new IOException("Manifest too large");
                    bytes.write(buffer, 0, n);
                }
                envelopeBytes = bytes.toByteArray();
            }
            return verify(context.getSharedPreferences("bytevirt-calculus-stable", Context.MODE_PRIVATE),
                    envelopeBytes, installedBuild);
        } finally {
            connection.disconnect();
        }
    }

    static JSONObject verify(SharedPreferences trust, byte[] envelopeBytes, int installedBuild)
            throws IOException, JSONException {
        check(envelopeBytes.length > 0 && envelopeBytes.length <= MAX_MANIFEST, "Manifest size");
        JSONObject envelope = object(envelopeBytes);
        check(envelope.length() == 3, "Unexpected JWS fields");
        String protectedText = string(envelope, "protected");
        String payloadText = string(envelope, "payload");
        String signatureText = string(envelope, "signature");
        JSONObject header = object(decode(protectedText));
        check(header.length() == 2 && "RS256".equals(string(header, "alg"))
                && KEY_ID.equals(string(header, "kid")), "Unsupported signature header");
        byte[] signatureBytes = decode(signatureText);
        check(signatureBytes.length == 384, "Unexpected signature size");
        String fingerprint;
        try {
            Signature signature = Signature.getInstance("SHA256withRSA");
            signature.initVerify(KeyFactory.getInstance("RSA").generatePublic(
                    new X509EncodedKeySpec(Base64.decode(PUBLIC_KEY, Base64.DEFAULT))));
            signature.update((protectedText + "." + payloadText).getBytes(StandardCharsets.US_ASCII));
            check(signature.verify(signatureBytes), "Invalid manifest signature");
            fingerprint = hex(MessageDigest.getInstance("SHA-256").digest(
                    (protectedText + "." + payloadText + "." + signatureText).getBytes(StandardCharsets.US_ASCII)));
        } catch (GeneralSecurityException e) {
            throw new IOException("Manifest signature verification failed", e);
        }

        JSONObject manifest = object(decode(payloadText));
        check(number(manifest, "schema") == 1 && "calculus".equals(string(manifest, "app"))
                && "stable".equals(string(manifest, "channel"))
                && "android".equals(string(manifest, "platform")), "Manifest scope mismatch");
        long sequence = number(manifest, "sequence");
        check(sequence > 0 && sequence <= 9007199254740991L, "Invalid sequence");
        long previous = trust.getLong("sequence", 0);
        check(sequence > previous || (sequence == previous && fingerprint.equals(trust.getString("fingerprint", ""))),
                "Stale manifest");
        long published = time(string(manifest, "published_at"));
        long expires = time(string(manifest, "expires_at"));
        long now = System.currentTimeMillis();
        check(published <= now + 300000L && now < expires && published < expires
                && expires - published <= 90L * DAY_MS, "Manifest outside its validity window");
        String notes = string(manifest, "notes");
        check(notes.getBytes(StandardCharsets.UTF_8).length <= 8192, "Release notes too large");
        String status = string(manifest, "status");
        JSONObject result = new JSONObject().put("status", status);
        if ("release".equals(status)) {
            check(manifest.length() == 13, "Unexpected release fields");
            String version = string(manifest, "version");
            check(version.matches("(0|[1-9][0-9]{0,3})(\\.(0|[1-9][0-9]{0,3})){2}"), "Invalid version");
            long build = number(manifest, "build");
            long minimum = number(manifest, "min_client_build");
            check(build > 0 && build <= 2100000000L && minimum >= 0 && minimum < build, "Invalid version code");
            JSONObject asset = manifest.getJSONObject("asset");
            check(asset.length() == 7 && "apk".equals(string(asset, "format"))
                    && "universal".equals(string(asset, "arch")) && PACKAGE_ID.equals(string(asset, "identity"))
                    && APK_SIGNER.equals(string(asset, "signer_sha256")), "Unsupported APK identity");
            String path = LANE + "/releases/" + sequence + "/package.apk";
            check(path.equals(string(asset, "url")), "Unexpected APK path");
            long size = number(asset, "size");
            String digest = string(asset, "sha256");
            check(size > 0 && size <= 256L * 1024 * 1024 && digest.matches("[0-9a-f]{64}"), "Invalid APK metadata");
            if (installedBuild < minimum) {
                result.put("status", "incompatible");
            } else if (installedBuild >= build) {
                result.put("status", "current");
            } else {
                result.put("tag", "v" + version).put("sequence", sequence).put("build", build)
                        .put("digest", digest).put("size", size).put("url", ORIGIN + path).put("notes", notes);
            }
        } else {
            check("paused".equals(status) && manifest.length() == 9, "Unsupported status");
        }
        if (sequence > previous) {
            check(trust.edit().putLong("sequence", sequence).putString("fingerprint", fingerprint).commit(),
                    "Cannot persist manifest trust state");
        }
        return result;
    }

    static String hex(byte[] bytes) {
        StringBuilder value = new StringBuilder(bytes.length * 2);
        for (byte b : bytes) value.append(Character.forDigit((b & 255) >>> 4, 16))
                .append(Character.forDigit(b & 15, 16));
        return value.toString();
    }

    private static long time(String value) throws IOException {
        check(value.matches("[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z"), "Invalid UTC time");
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.ROOT);
        format.setTimeZone(TimeZone.getTimeZone("UTC"));
        format.setLenient(false);
        try {
            Date parsed = format.parse(value);
            return parsed.getTime();
        } catch (ParseException e) {
            throw new IOException("Invalid UTC time", e);
        }
    }

    private static JSONObject object(byte[] bytes) throws IOException, JSONException {
        String utf8 = StandardCharsets.UTF_8.newDecoder().decode(ByteBuffer.wrap(bytes)).toString();
        try (JsonReader reader = new JsonReader(new StringReader(utf8))) {
            JSONObject value = readObject(reader, 0);
            check(reader.peek() == JsonToken.END_DOCUMENT, "Trailing JSON");
            return value;
        } catch (IllegalStateException | NumberFormatException e) {
            throw new IOException("Malformed JSON", e);
        }
    }

    private static JSONObject readObject(JsonReader reader, int depth) throws IOException, JSONException {
        check(depth < 2, "Unexpected nested object");
        JSONObject value = new JSONObject();
        reader.beginObject();
        while (reader.hasNext()) {
            String name = reader.nextName();
            check(!value.has(name), "Duplicate JSON field");
            switch (reader.peek()) {
                case STRING: value.put(name, reader.nextString()); break;
                case NUMBER:
                    String token = reader.nextString();
                    check(token.matches("0|[1-9][0-9]{0,15}"), "Invalid numeric field");
                    value.put(name, Long.parseLong(token));
                    break;
                case BEGIN_OBJECT: value.put(name, readObject(reader, depth + 1)); break;
                default: throw new IOException("Unsupported JSON value");
            }
        }
        reader.endObject();
        return value;
    }

    private static byte[] decode(String value) throws IOException {
        check(value.matches("[a-zA-Z0-9_-]+"), "Invalid Base64url");
        try {
            byte[] decoded = Base64.decode(value, URL_BASE64);
            check(value.equals(Base64.encodeToString(decoded, URL_BASE64)), "Noncanonical Base64url");
            return decoded;
        } catch (IllegalArgumentException e) {
            throw new IOException("Invalid Base64url", e);
        }
    }

    private static String string(JSONObject object, String name) throws IOException, JSONException {
        Object value = object.get(name);
        check(value instanceof String, "Invalid string field");
        return (String) value;
    }

    private static long number(JSONObject object, String name) throws IOException, JSONException {
        Object value = object.get(name);
        check(value instanceof Long, "Invalid integer field");
        return (Long) value;
    }

    private static void check(boolean condition, String error) throws IOException {
        if (!condition) throw new IOException(error);
    }
}

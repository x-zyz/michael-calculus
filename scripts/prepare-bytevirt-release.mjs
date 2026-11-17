import { createHash, createPrivateKey, createPublicKey, sign, verify } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";

const lane = "/calculus/stable/android";
const kid = "calculus-stable-android-1";
const [apkPath, version, keyPath, output] = process.argv.slice(2);
const gradle = readFileSync("android/app/build.gradle", "utf8");
const identity = JSON.parse(readFileSync("android/signing-identity.json", "utf8"));
const verifier = readFileSync("android/app/src/main/java/com/michael/calculus/ByteVirtManifest.java", "utf8");
const build = Number(gradle.match(/\bversionCode\s+(\d+)/)?.[1]);
const androidVersion = gradle.match(/\bversionName\s+"([^"]+)"/)?.[1];
if (!/^(0|[1-9]\d{0,3})(\.(0|[1-9]\d{0,3})){2}$/.test(version) ||
    version !== androidVersion || !Number.isSafeInteger(build) || build < 1 || build > 2_100_000_000) {
  throw new Error("Release version does not match the Android build");
}

const privateKey = createPrivateKey(readFileSync(keyPath));
const publicKey = createPublicKey(privateKey);
const pinned = verifier.match(/PUBLIC_KEY = "([^"]+)"/)?.[1];
const spki = publicKey.export({ type: "spki", format: "der" }).toString("base64");
if (privateKey.asymmetricKeyDetails?.modulusLength !== 3072 || spki !== pinned) {
  throw new Error("Manifest signing key does not match the app pin");
}

const apk = readFileSync(apkPath);
const hash = createHash("sha256").update(apk).digest("hex");
if (!apk.length || apk.length > 256 * 1024 * 1024) throw new Error("Unexpected APK size");

function writeBundle(envelope) {
  const header = Buffer.alloc(8);
  header.write("BVU1");
  header.writeUInt32BE(envelope.length, 4);
  writeFileSync(output, Buffer.concat([header, envelope, apk]), { flag: "wx" });
}

if (process.env.BYTEVIRT_CHECK_LIVE === "1") {
  const response = await fetch("https://update.0979019203.top" + lane + "/latest.json", {
    redirect: "error", signal: AbortSignal.timeout(15000),
  });
  if (response.ok) {
    const envelope = Buffer.from(await response.arrayBuffer());
    const existing = JSON.parse(envelope.toString("utf8"));
    const input = `${existing.protected}.${existing.payload}`;
    if (!verify("RSA-SHA256", Buffer.from(input), publicKey, Buffer.from(existing.signature, "base64url"))) {
      throw new Error("Existing update manifest has a different signature");
    }
    const payload = JSON.parse(Buffer.from(existing.payload, "base64url").toString("utf8"));
    if (payload.sequence >= build) {
      if (payload.sequence === build && payload.version === version &&
          payload.asset?.sha256 === hash && Date.parse(payload.expires_at) > Date.now()) {
        writeBundle(envelope);
        console.log("Reusing the existing signed manifest for an idempotent upload.");
        process.exit(0);
      }
      throw new Error("Update service already has this or a newer sequence; publish a new build");
    }
  } else if (response.status !== 404) {
    throw new Error(`Update service returned HTTP ${response.status}`);
  }
}

const utc = (ms) => new Date(ms).toISOString().replace(/\.\d{3}Z$/, "Z");
const now = Date.now();
const b64 = (obj) => Buffer.from(JSON.stringify(obj)).toString("base64url");
const protectedText = b64({ alg: "RS256", kid });
const payload = b64({
  schema: 1, app: "calculus", channel: "stable", platform: "android",
  sequence: build, status: "release", published_at: utc(now), expires_at: utc(now + 90 * 86400000),
  notes: `Michael calculus v${version}`,
  version, build, min_client_build: 0,
  asset: {
    arch: "universal", format: "apk", identity: identity.applicationId,
    signer_sha256: identity.certificateSha256, size: apk.length, sha256: hash,
    url: `${lane}/releases/${build}/package.apk`,
  },
});
const signature = sign("RSA-SHA256", Buffer.from(`${protectedText}.${payload}`), privateKey).toString("base64url");
writeBundle(Buffer.from(JSON.stringify({ protected: protectedText, payload, signature })));

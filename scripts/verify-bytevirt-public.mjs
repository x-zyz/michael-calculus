import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { setTimeout as delay } from "node:timers/promises";

const origin = "https://update.0979019203.top";
const lane = "/calculus/stable/android";
const bundle = readFileSync(process.argv[2]);
assert.equal(bundle.subarray(0, 4).toString("ascii"), "BVU1", "Unexpected release bundle");
const manifestEnd = 8 + bundle.readUInt32BE(4);
assert(manifestEnd > 8 && manifestEnd < bundle.length, "Missing manifest or APK");
const signedManifest = bundle.subarray(8, manifestEnd);
const signedApk = bundle.subarray(manifestEnd);
const envelope = JSON.parse(signedManifest);
const release = JSON.parse(Buffer.from(envelope.payload, "base64url"));
const asset = `${lane}/releases/${release.sequence}/package.apk`;
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
assert.equal(release.asset.url, asset, "Unexpected public asset path");
assert.equal(release.asset.size, signedApk.length, "Bundle APK size mismatch");
assert.equal(release.asset.sha256, sha256(signedApk), "Bundle APK digest mismatch");

async function get(path) {
  const response = await fetch(origin + path, {
    redirect: "error",
    signal: AbortSignal.timeout(20000),
    headers: { "Cache-Control": "no-cache" },
  });
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  return Buffer.from(await response.arrayBuffer());
}

for (let attempt = 1; attempt <= 3; attempt++) {
  try {
    const manifest = await get(`${lane}/latest.json`);
    if (!manifest.equals(signedManifest)) throw new Error("Public manifest differs from the uploaded signed manifest");
    const apk = await get(asset);
    if (!apk.equals(signedApk)) throw new Error("Public APK bytes differ from the released APK");
    console.log(`Verified public version ${release.version}, build ${release.build}, sequence ${release.sequence}.`);
    break;
  } catch (error) {
    if (attempt === 3) throw error;
    console.warn(`Public verification attempt ${attempt}: ${error.message}`);
    await delay(2500);
  }
}

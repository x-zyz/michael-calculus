import { readFileSync, readdirSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";
import assert from "node:assert/strict";
const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
export function verifyIdentity(
  badging,
  certificate,
  identity,
  version,
  versionCode,
) {
  const app = badging.match(
    /package: name='([^']+)' versionCode='([^']+)' versionName='([^']+)'/,
  );
  assert(app, "APK metadata missing");
  assert.equal(app[1], identity.applicationId, "Wrong applicationId");
  assert.equal(app[2], String(versionCode), "Wrong versionCode");
  assert.equal(app[3], version, "Wrong versionName");
  assert(
    !/^application-debuggable/m.test(badging),
    "Refusing to publish a debuggable APK",
  );
  const pins = [
    ...certificate.matchAll(/certificate SHA-256 digest:\s*([a-fA-F0-9:]+)/g),
  ].map((m) => m[1].replaceAll(":", "").toLowerCase());
  assert.equal(pins.length, 1, "Expected exactly one signing certificate");
  assert.match(identity.certificateSha256, /^[a-f0-9]{64}$/);
  assert.equal(
    pins[0],
    identity.certificateSha256,
    "Signing certificate mismatch: stop, never change the key/pin to bypass this check",
  );
}
export function androidTools(env = process.env) {
  const sdk = env.ANDROID_HOME || env.ANDROID_SDK_ROOT;
  assert(sdk, "Set ANDROID_HOME");
  const dirs = readdirSync(join(sdk, "build-tools"))
    .filter((s) => /^\d+(\.\d+)+$/.test(s))
    .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
  assert(dirs.length, "Android build-tools not installed");
  const bin = join(sdk, "build-tools", dirs[0]);
  return {
    aapt: join(bin, process.platform === "win32" ? "aapt.exe" : "aapt"),
    apksigner: join(bin, "lib", "apksigner.jar"),
    zipalign: join(
      bin,
      process.platform === "win32" ? "zipalign.exe" : "zipalign",
    ),
  };
}
export function main(apk) {
  assert(apk, "Usage: node scripts/verify-android-release.mjs <apk>");
  const identity = JSON.parse(
    readFileSync(join(root, "android/signing-identity.json"), "utf8"),
  );
  const version = JSON.parse(
    readFileSync(join(root, "package.json"), "utf8"),
  ).version;
  const gradle = readFileSync(join(root, "android/app/build.gradle"), "utf8");
  const versionCode = Number(gradle.match(/versionCode\s+(\d+)/)[1]);
  const tools = androidTools();
  const java = process.env.JAVA_HOME
    ? join(
        process.env.JAVA_HOME,
        "bin",
        process.platform === "win32" ? "java.exe" : "java",
      )
    : "java";
  const signature = execFileSync(
    java,
    [
      "-jar",
      tools.apksigner,
      "verify",
      "--verbose",
      "--print-certs",
      resolve(apk),
    ],
    { encoding: "utf8" },
  );
  const metadata = execFileSync(tools.aapt, ["dump", "badging", resolve(apk)], {
    encoding: "utf8",
  });
  verifyIdentity(metadata, signature, identity, version, versionCode);
  execFileSync(tools.zipalign, ["-c", "-P", "16", "4", resolve(apk)]);
  console.log(
    `Verified ${identity.applicationId} ${version} (${versionCode}); pinned certificate ${identity.certificateSha256}; release is not debuggable.`,
  );
}
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  try {
    main(process.argv[2]);
  } catch (e) {
    console.error(e.message);
    process.exitCode = 1;
  }
}

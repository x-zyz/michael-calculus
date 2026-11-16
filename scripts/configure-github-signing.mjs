// Owner-only, one-time bootstrap. Secret values only enter gh via stdin, never argv or logs.
import { readFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync, spawnSync } from "node:child_process";
import assert from "node:assert/strict";
const folder = resolve(
  process.argv[2] || dirname(fileURLToPath(import.meta.url)),
);
try {
  const config = JSON.parse(
    readFileSync(join(folder, "signing-config.json"), "utf8"),
  );
  assert.equal(config.repository, "x-zyz/michael-calculus");
  const password = readFileSync(join(folder, "password.txt"), "utf8").trim();
  const key = readFileSync(join(folder, "keystore.jks"));
  const keytool = process.env.JAVA_HOME
    ? join(
        process.env.JAVA_HOME,
        "bin",
        process.platform === "win32" ? "keytool.exe" : "keytool",
      )
    : "keytool";
  const result = execFileSync(
    keytool,
    [
      "-list",
      "-v",
      "-J-Duser.language=en",
      "-keystore",
      join(folder, "keystore.jks"),
      "-alias",
      config.alias,
      "-storepass:env",
      "MC_SETUP_PASSWORD",
    ],
    { encoding: "utf8", env: { ...process.env, MC_SETUP_PASSWORD: password } },
  );
  const actual = result
    .match(/SHA256:\s*([A-Fa-f0-9:]+)/)?.[1]
    .replaceAll(":", "")
    .toLowerCase();
  assert.equal(
    actual,
    config.certificateSha256,
    "Key does not match the fixed project identity; stopping",
  );
  const checkout = process.argv[3];
  if (checkout) {
    const pin = join(resolve(checkout), "android", "signing-identity.json");
    assert(existsSync(pin), "Not a project checkout");
    assert.equal(
      JSON.parse(readFileSync(pin, "utf8")).certificateSha256,
      actual,
      "Repository fingerprint does not match backup",
    );
  }
  execFileSync(
    "gh",
    ["api", `repos/${config.repository}/actions/secrets/public-key`],
    { stdio: ["ignore", "ignore", "pipe"] },
  );
  const secrets = {
    MC_ANDROID_KEYSTORE_BASE64: key.toString("base64"),
    MC_ANDROID_KEYSTORE_PASSWORD: password,
    MC_ANDROID_KEY_ALIAS: config.alias,
    MC_ANDROID_KEY_PASSWORD: password,
  };
  for (const [name, value] of Object.entries(secrets)) {
    const r = spawnSync(
      "gh",
      ["secret", "set", name, "--repo", config.repository],
      { input: value, encoding: "utf8" },
    );
    if (r.status !== 0)
      throw Error(
        `Could not configure ${name}. Sign in to gh as the repository owner with Actions Secrets write permission. No secret values were printed.`,
      );
    console.log(`Configured ${name}`);
  }
  if (config.initialReleaseTag) {
    assert.match(config.initialReleaseTag, /^v[0-9]+\.[0-9]+\.[0-9]+$/);
    const version = config.initialReleaseTag.slice(1);
    const existing = spawnSync(
      "gh",
      [
        "release",
        "view",
        config.initialReleaseTag,
        "--repo",
        config.repository,
        "--json",
        "assets",
      ],
      { encoding: "utf8" },
    );
    const alreadyPublished =
      existing.status === 0 &&
      JSON.parse(existing.stdout).assets.some(
        (a) => a.name === `Michael-calculus-${version}.apk`,
      );
    if (!alreadyPublished) {
      const trigger = spawnSync(
        "gh",
        [
          "workflow",
          "run",
          "release.yml",
          "--repo",
          config.repository,
          "--ref",
          "main",
          "-f",
          `release_tag=${config.initialReleaseTag}`,
        ],
        { encoding: "utf8" },
      );
      if (trigger.status !== 0)
        console.log(
          `Signing secrets are configured. Start the Release Android APK workflow manually with release_tag=${config.initialReleaseTag}.`,
        );
      else
        console.log(
          `Started the fixed-signature build for ${config.initialReleaseTag}. Follow it in GitHub Actions; it will publish only after certificate verification.`,
        );
    }
  }
  console.log(
    "One-time signing setup complete. Keep this private backup outside the public repository. Future releases must use the fixed fingerprint; never create another key.",
  );
} catch (e) {
  console.error(
    "Signing setup failed. Check JDK 21, GitHub CLI login and repository Actions Secrets write permission. Details:",
    e.message.split("\n")[0],
  );
  process.exitCode = 1;
}

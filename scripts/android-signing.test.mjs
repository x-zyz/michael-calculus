import { test } from "node:test";
import assert from "node:assert/strict";
import { verifyIdentity } from "./verify-android-release.mjs";
import { readFileSync } from "node:fs";
const pin = JSON.parse(
  readFileSync(
    new URL("../android/signing-identity.json", import.meta.url),
    "utf8",
  ),
);
const metadata =
  "package: name='com.michael.calculus' versionCode='7' versionName='0.6.1'";
const cert = `Signer #1 certificate SHA-256 digest: ${pin.certificateSha256}`;
test("accepts the one canonical non-debuggable release identity", () =>
  assert.doesNotThrow(() => verifyIdentity(metadata, cert, pin, "0.6.1", 7)));
test("rejects the previous randomly signed APK and multiple signers", () => {
  assert.throws(
    () =>
      verifyIdentity(
        metadata,
        "certificate SHA-256 digest: " + "a".repeat(64),
        pin,
        "0.6.1",
        7,
      ),
    /mismatch/,
  );
  assert.throws(
    () => verifyIdentity(metadata, cert + "\n" + cert, pin, "0.6.1", 7),
    /one signing/,
  );
});
test("rejects wrong package, version, code and debuggable releases", () => {
  for (const text of [
    metadata.replace("com.michael.calculus", "com.michael.calculus.dev"),
    metadata.replace("'7'", "'6'"),
    metadata.replace("0.6.1", "0.6.0"),
    metadata + "\napplication-debuggable",
  ])
    assert.throws(() => verifyIdentity(text, cert, pin, "0.6.1", 7));
});

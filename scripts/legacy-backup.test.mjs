import { test } from "node:test";
import assert from "node:assert/strict";
import { readBackupFromWebView } from "./export-legacy-android-data.mjs";
class Socket extends EventTarget {
  constructor(response) {
    super();
    this.response = response;
    queueMicrotask(() => this.dispatchEvent(new Event("open")));
  }
  send(raw) {
    const message = JSON.parse(raw);
    assert.equal(message.method, "Runtime.evaluate");
    assert(!message.params.expression.includes("setItem"));
    assert(!message.params.expression.includes("removeItem"));
    queueMicrotask(() =>
      this.dispatchEvent(
        new MessageEvent("message", {
          data: JSON.stringify({ id: 1, ...this.response }),
        }),
      ),
    );
  }
  close() {
    this.closed = true;
    this.dispatchEvent(new Event("close"));
  }
}
test("legacy export reads only the old app storage without modifying it", async () => {
  const backup = {
    backupVersion: 1,
    applicationId: "com.michael.calculus",
    exportedAt: "2026-11-15T12:00:00Z",
    storage: {
      "mc-theme": "dark",
      "mc-learning-v1": "{}",
      "mc-formula-v1": null,
    },
  };
  const socket = new Socket({
    result: { result: { value: JSON.stringify(backup) } },
  });
  assert.deepEqual(await readBackupFromWebView(socket), backup);
  assert(socket.closed);
});
test("legacy export rejects browser exceptions and empty snapshots", async () => {
  await assert.rejects(
    readBackupFromWebView(
      new Socket({ result: { exceptionDetails: { text: "Denied" } } }),
    ),
    /could not be read/,
  );
  await assert.rejects(
    readBackupFromWebView(
      new Socket({
        result: {
          result: {
            value: JSON.stringify({
              applicationId: "com.michael.calculus",
              storage: {
                "mc-theme": null,
                "mc-learning-v1": null,
                "mc-formula-v1": null,
              },
            }),
          },
        },
      }),
    ),
    /No learning/,
  );
});

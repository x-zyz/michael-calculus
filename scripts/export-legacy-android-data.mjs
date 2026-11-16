// Read-only export from an OLD debuggable Capacitor APK via its own WebView.
// Does not install, uninstall, stop the app, modify app storage, or delete anything.
import { execFileSync } from "node:child_process";
import { existsSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
const pkg = "com.michael.calculus";
const sdk = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT;
const adb = sdk
  ? join(
      sdk,
      "platform-tools",
      process.platform === "win32" ? "adb.exe" : "adb",
    )
  : "adb";
const output = resolve(
  process.argv[2] || "Michael-calculus-learning-backup.json",
);
const keys = ["mc-learning-v1", "mc-formula-v1", "mc-theme"];
function call(args) {
  return execFileSync(adb, args, { encoding: "utf8" }).trim();
}
export async function readBackupFromWebView(ws, timeout = 15000) {
  return await new Promise((done, reject) => {
    const timer = setTimeout(() => {
      reject(Error("WebView did not answer in time"));
      ws.close();
    }, timeout);
    const fail = (e) => {
      clearTimeout(timer);
      reject(e);
      ws.close();
    };
    ws.addEventListener(
      "error",
      () => fail(Error("Cannot connect to old app WebView")),
      { once: true },
    );
    ws.addEventListener(
      "close",
      () => {
        clearTimeout(timer);
        reject(Error("WebView disconnected before exporting"));
      },
      { once: true },
    );
    ws.addEventListener(
      "open",
      () =>
        ws.send(
          JSON.stringify({
            id: 1,
            method: "Runtime.evaluate",
            params: {
              expression: `JSON.stringify({backupVersion:1,applicationId:${JSON.stringify(pkg)},exportedAt:new Date().toISOString(),storage:Object.fromEntries(${JSON.stringify(keys)}.map(k=>[k,localStorage.getItem(k)]))})`,
              returnByValue: true,
            },
          }),
        ),
      { once: true },
    );
    ws.addEventListener("message", (e) => {
      try {
        const msg = JSON.parse(String(e.data));
        if (msg.id !== 1) return;
        if (msg.error || msg.result?.exceptionDetails)
          throw Error("Old app storage could not be read");
        const data = JSON.parse(msg.result.result.value);
        if (
          data.applicationId !== pkg ||
          !data.storage ||
          !keys.some((k) => data.storage[k] !== null)
        )
          throw Error(
            "No learning or theme data found; open the old app first",
          );
        clearTimeout(timer);
        done(data);
        ws.close();
      } catch (e) {
        fail(e);
      }
    });
  });
}
async function main() {
  if (existsSync(output))
    throw Error(
      "Backup file already exists. Choose a different output filename; nothing was overwritten.",
    );
  const pid = call(["shell", "pidof", "-s", pkg]);
  if (!/^\d+$/.test(pid))
    throw Error("Open the old Michael calculus app on the phone, then retry.");
  const port = call([
    "forward",
    "tcp:0",
    `localabstract:webview_devtools_remote_${pid}`,
  ]);
  if (!/^\d+$/.test(port)) throw Error("Could not forward the app WebView");
  try {
    const targets = await (
      await fetch(`http://127.0.0.1:${port}/json/list`, {
        signal: AbortSignal.timeout(10000),
      })
    ).json();
    const target = targets.find(
      (t) =>
        t.webSocketDebuggerUrl && /^https?:\/\/localhost(?:[/:]|$)/.test(t.url),
    );
    if (!target)
      throw Error(
        "No open old-app page found, or this APK has WebView debugging disabled.",
      );
    const url = new URL(target.webSocketDebuggerUrl);
    url.hostname = "127.0.0.1";
    url.port = port;
    const backup = await readBackupFromWebView(new WebSocket(url));
    writeFileSync(output, JSON.stringify(backup, null, 2) + "\n", {
      flag: "wx",
      mode: 0o600,
    });
    console.log(
      `Backup saved: ${output}. Keep this file private. Verify it before any one-time migration. Nothing on the phone was deleted.`,
    );
  } finally {
    call(["forward", "--remove", `tcp:${port}`]);
  }
}
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
)
  main().catch((e) => {
    console.error(e.message);
    process.exitCode = 1;
  });

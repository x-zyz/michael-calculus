import { Capacitor, registerPlugin } from "@capacitor/core";
import { useState } from "react";
import { version } from "../../../package.json";
import { Button, Card, Sheet } from "../../components/ui";

type Update = { version: string; size: number; sequence: number };
type UpdateCheck = Partial<Update> & { installed: string; status: string };
type PluginError = { code?: string; message?: string };

const updates = registerPlugin<{
  check(): Promise<UpdateCheck>;
  install(options: { version: string; sequence: string }): Promise<{ state: "permission" | "installer" }>;
}>("AppUpdates");
const releasePage = "https://github.com/x-zyz/michael-calculus/releases/latest";

export default function UpdateCard() {
  const [open, setOpen] = useState(false);
  const [latest, setLatest] = useState<Update>();
  const [busy, setBusy] = useState<"check" | "install">();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [permission, setPermission] = useState(false);
  const android = Capacitor.getPlatform() === "android" && Capacitor.isPluginAvailable("AppUpdates");

  async function check() {
    setBusy("check");
    setLatest(undefined);
    setMessage("");
    setError(false);
    setPermission(false);
    try {
      const result = await updates.check();
      if (result.version && result.size && result.sequence) {
        setLatest({ version: result.version, size: result.size, sequence: result.sequence });
      } else if (result.status === "unpublished") setMessage("更新服务暂未发布正式版。");
      else if (result.status === "paused") setMessage("正式版更新已暂停。");
      else if (result.status === "incompatible") setMessage("此版本需要先手动安装过渡版本。");
      else setMessage("已是最新正式版。");
    } catch (e) {
      setError(true);
      setMessage((e as PluginError).message || "检查更新失败，请重试。");
    } finally {
      setBusy(undefined);
    }
  }

  async function install(update: Update) {
    setBusy("install");
    setMessage("");
    setError(false);
    try {
      const result = await updates.install({ version: update.version, sequence: String(update.sequence) });
      setPermission(result.state === "permission");
      setMessage(result.state === "permission"
        ? "请在系统设置中允许来自本应用的安装，然后返回并点「继续安装」。"
        : "请在 Android 安装界面确认更新。");
    } catch (e) {
      const failure = e as PluginError;
      if (failure.code === "RELEASE_CHANGED") {
        setLatest(undefined);
        setPermission(false);
      }
      setError(true);
      setMessage(failure.message || "安装更新失败，请重试。");
    } finally {
      setBusy(undefined);
    }
  }

  return (
    <Card>
      <h2>应用更新</h2>
      <p>当前版本 v{version}</p>
      <div className="learning-actions">
        <Button onClick={() => {
          setOpen(true);
          if (android && !busy && !latest) void check();
        }}>检查更新</Button>
      </div>
      <Sheet open={open} title="应用更新" onClose={() => setOpen(false)}>
        {android ? (
          <>
            <p>当前版本 v{version}</p>
            {latest && <p>发现 v{latest.version} · {(latest.size / 1024 / 1024).toFixed(1)} MB</p>}
            {busy && <p role="status">{busy === "check" ? "正在检查正式版…" : "正在准备并校验安装包…"}</p>}
            {message && <p role={error ? "alert" : "status"}>{message}</p>}
            <div className="learning-actions">
              {latest ? (
                <Button variant="primary" disabled={Boolean(busy)} onClick={() => void install(latest)}>
                  {permission ? "继续安装" : "下载并安装"}
                </Button>
              ) : (
                <Button variant="primary" disabled={Boolean(busy)} onClick={() => void check()}>
                  检查正式版
                </Button>
              )}
            </div>
          </>
        ) : (
          <>
            <p>应用内安装适用于 Android 正式版。</p>
            <a href={releasePage}>查看 GitHub 正式版</a>
          </>
        )}
      </Sheet>
    </Card>
  );
}

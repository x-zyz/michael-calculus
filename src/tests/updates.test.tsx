import { readFileSync } from "node:fs";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import UpdateCard from "../features/settings/UpdateCard";

const state = vi.hoisted(() => ({ platform: "android" as "android" | "web" }));
const plugin = vi.hoisted(() => ({ check: vi.fn(), install: vi.fn() }));
vi.mock("@capacitor/core", () => ({
  Capacitor: {
    getPlatform: () => state.platform,
    isPluginAvailable: () => state.platform === "android",
  },
  registerPlugin: () => plugin,
}));

describe("Android and PWA update UI", () => {
  beforeEach(() => {
    state.platform = "android";
    vi.resetAllMocks();
  });

  it("confirms an available release and resumes after opening installation settings", async () => {
    plugin.check.mockResolvedValue({ installed: "0.8.0", version: "0.8.1", size: 4194304, sequence: 13, status: "release" });
    plugin.install.mockResolvedValueOnce({ state: "permission" }).mockResolvedValueOnce({ state: "installer" });
    render(<UpdateCard />);
    fireEvent.click(screen.getByRole("button", { name: "检查更新" }));
    expect(await screen.findByText("发现 v0.8.1 · 4.0 MB")).toBeVisible();
    expect(plugin.install).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "下载并安装" }));
    expect(await screen.findByText(/允许来自本应用的安装/)).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "继续安装" }));
    expect(await screen.findByText("请在 Android 安装界面确认更新。")).toBeVisible();
    expect(plugin.install).toHaveBeenNthCalledWith(2, { version: "0.8.1", sequence: "13" });
  });

  it("shows the current-version result without offering an APK", async () => {
    plugin.check.mockResolvedValue({ installed: "0.8.0", status: "current" });
    render(<UpdateCard />);
    fireEvent.click(screen.getByRole("button", { name: "检查更新" }));
    expect(await screen.findByText("已是最新正式版。")).toBeVisible();
    expect(screen.queryByRole("button", { name: "下载并安装" })).not.toBeInTheDocument();
  });

  it("supports Web PWA install prompt and offline manifest metadata", async () => {
    state.platform = "web";
    const manifest = JSON.parse(readFileSync("public/manifest.webmanifest", "utf8")) as {
      display: string;
      start_url: string;
      icons: Array<{ sizes: string; purpose?: string }>;
    };
    expect(manifest.display).toBe("standalone");
    expect(manifest.start_url).toBe("./");
    expect(manifest.icons.some((i) => i.sizes === "192x192")).toBe(true);
    expect(manifest.icons.some((i) => i.sizes === "512x512" && i.purpose === "maskable")).toBe(true);

    render(<UpdateCard />);
    const prompt = vi.fn().mockResolvedValue(undefined);
    const event = Object.assign(new Event("beforeinstallprompt", { cancelable: true }), {
      prompt,
      userChoice: Promise.resolve({ outcome: "accepted" as const }),
    });
    window.dispatchEvent(event);

    const installBtn = await screen.findByRole("button", { name: "安装桌面应用 (PWA)" });
    fireEvent.click(installBtn);
    expect(prompt).toHaveBeenCalledTimes(1);
    expect(await screen.findByText("已添加到主屏幕，可离线独立运行。")).toBeVisible();
  });
});

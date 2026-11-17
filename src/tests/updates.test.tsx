import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import UpdateCard from "../features/settings/UpdateCard";

const plugin = vi.hoisted(() => ({ check: vi.fn(), install: vi.fn() }));
vi.mock("@capacitor/core", () => ({
  Capacitor: { getPlatform: () => "android", isPluginAvailable: () => true },
  registerPlugin: () => plugin,
}));

describe("Android update UI", () => {
  beforeEach(() => vi.resetAllMocks());

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
});

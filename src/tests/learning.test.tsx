import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../app/App";
import {
  checkAnswer,
  experimentValue,
  secantSlope,
} from "../data/learning";
import { learningKey } from "../db/learning";
function mount(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}
describe("limit and derivative learning", () => {
  it("accepts restricted numeric answers and rejects invalid or unsafe input", () => {
    expect(checkAnswer("3/5", 3 / 5)).toBe(true);
    expect(checkAnswer("0.666667", 2 / 3)).toBe(true);
    expect(checkAnswer("-6", -6)).toBe(true);
    expect(checkAnswer("−6", -6)).toBe(true);
    expect(checkAnswer("1/0", 2)).toBe(null);
    expect(checkAnswer("Math.random()", 2)).toBe(null);
    expect(checkAnswer("", 0)).toBe(null);
    expect(checkAnswer("0", 2)).toBe(false);
  });
  it("keeps holes undefined and distinguishes jump limits and new limit models", () => {
    expect(experimentValue("hole", 1)).toBe(null);
    expect(experimentValue("sine", 0)).toBe(null);
    expect(experimentValue("euler", 0)).toBe(null);
    expect(experimentValue("euler", -1)).toBe(null);
    expect(experimentValue("infinitesimal", 0)).toBe(null);
    expect(experimentValue("hole", 0.9999)).toBeCloseTo(1.9999);
    expect(experimentValue("sine", -0.001)).toBeCloseTo(1, 6);
    expect(experimentValue("euler", 0.0001)).toBeCloseTo(Math.E, 3);
    expect(experimentValue("infinitesimal", 0.0001)).toBeCloseTo(0.5, 6);
    expect(experimentValue("jump", -0.001)).toBe(0);
    expect(experimentValue("jump", 0.001)).toBe(1);
  });
  it("keeps difference quotient undefined at h = 0 and converges to tangent slope", () => {
    expect(secantSlope("square", 0)).toBe(null);
    expect(secantSlope("cubic", 0)).toBe(null);
    expect(secantSlope("sqrt", 0)).toBe(null);
    expect(secantSlope("square", 0.001)).toBeCloseTo(2.001, 6);
    expect(secantSlope("square", -0.001)).toBeCloseTo(1.999, 6);
    expect(secantSlope("cubic", 0.0001)).toBeCloseTo(2, 3);
    expect(secantSlope("sqrt", 0.0001)).toBeCloseTo(0.5, 4);
  });
  it("links each lesson to its matching experiment including secant/tangent for derivative", () => {
    const v = mount("/curriculum?lesson=euler");
    fireEvent.click(screen.getByRole("tab", { name: "实验" }));
    expect(screen.getByLabelText("选择实验函数")).toHaveValue("euler");
    v.unmount();

    const v2 = mount("/curriculum?lesson=derivative");
    fireEvent.click(screen.getByRole("tab", { name: "实验" }));
    expect(
      screen.getByRole("heading", { level: 2, name: "割线与切线逼近实验" }),
    ).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: /左侧逼近/ }));
    expect(screen.getByTestId("secant-slope")).toHaveTextContent(
      "割线斜率 Δy / h =",
    );
    v2.unmount();
  });
  it("grades new second-important-limit, infinitesimal, and derivative problems", () => {
    const v = mount("/practice?problem=p8");
    fireEvent.change(screen.getByLabelText("请输入指数 k 的数值或分数"), {
      target: { value: "-6" },
    });
    fireEvent.click(screen.getByRole("button", { name: "检查答案" }));
    expect(screen.getByRole("status")).toHaveTextContent("✓ 回答正确");
    v.unmount();

    const v2 = mount("/practice?problem=p12");
    fireEvent.change(screen.getByLabelText("请输入数值或分数"), {
      target: { value: "1/2" },
    });
    fireEvent.click(screen.getByRole("button", { name: "检查答案" }));
    expect(screen.getByRole("status")).toHaveTextContent("✓ 回答正确");
    v2.unmount();
  });
  it("persists a completed lesson across closing and reopening", () => {
    const v = mount("/curriculum");
    fireEvent.click(screen.getByRole("button", { name: "标记已完成阅读" }));
    v.unmount();
    mount("/curriculum");
    expect(screen.getByRole("button", { name: "✓ 已完成阅读" })).toBeVisible();
    expect(JSON.parse(localStorage.getItem(learningKey)!).completed).toContain(
      "limit",
    );
  });
  it("records mistakes, restores them after reopening, and resolves them after a correct retry", () => {
    const v = mount("/practice?problem=p3");
    fireEvent.change(screen.getByLabelText("角度使用弧度；请输入数值或分数"), {
      target: { value: "5/3" },
    });
    fireEvent.click(screen.getByRole("button", { name: "检查答案" }));
    expect(screen.getByRole("status")).toHaveTextContent("这次还不对");
    fireEvent.click(
      within(screen.getByRole("status")).getByRole("link", {
        name: /查看错题/,
      }),
    );
    expect(screen.getByRole("link", { name: "重新练习" })).toBeVisible();
    v.unmount();
    const reopened = mount("/review");
    expect(screen.getByRole("link", { name: "重新练习" })).toBeVisible();
    fireEvent.click(screen.getByRole("link", { name: "重新练习" }));
    fireEvent.change(screen.getByLabelText("角度使用弧度；请输入数值或分数"), {
      target: { value: "3/5" },
    });
    fireEvent.click(screen.getByRole("button", { name: "检查答案" }));
    fireEvent.click(
      within(screen.getByRole("status")).getByRole("link", {
        name: /查看错题/,
      }),
    );
    expect(
      screen.queryByRole("link", { name: "重新练习" }),
    ).not.toBeInTheDocument();
    expect(
      JSON.parse(localStorage.getItem(learningKey)!).attempts,
    ).toHaveLength(2);
    reopened.unmount();
  });
  it("does not record invalid submissions or duplicate the same submission", () => {
    mount("/practice");
    const input = screen.getByLabelText("请输入数值或分数");
    fireEvent.change(input, { target: { value: "1/0" } });
    fireEvent.click(screen.getByRole("button", { name: "检查答案" }));
    expect(screen.getByRole("alert")).toBeVisible();
    expect(localStorage.getItem(learningKey)).toBeNull();
    fireEvent.change(input, { target: { value: "2" } });
    fireEvent.click(screen.getByRole("button", { name: "检查答案" }));
    fireEvent.click(screen.getByRole("button", { name: "检查答案" }));
    expect(
      JSON.parse(localStorage.getItem(learningKey)!).attempts,
    ).toHaveLength(1);
  });
  it("warns when persistence is unavailable", () => {
    const spy = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new Error("quota");
      });
    mount("/curriculum");
    fireEvent.click(screen.getByRole("button", { name: "标记已完成阅读" }));
    expect(screen.getByRole("alert")).toHaveTextContent("无法保存");
    spy.mockRestore();
  });
});

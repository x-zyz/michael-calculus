import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../app/App";
import {
  checkAnswer,
  computeMastery,
  experimentValue,
  lessons,
  linearApprox,
  problems,
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
    expect(secantSlope("chain", 0)).toBe(null);
    expect(secantSlope("chain", 0.0001)).toBeCloseTo(4, 3);
  });
  it("computes differential linear approximation dy and higher-order error o(h)", () => {
    expect(linearApprox("square", 0)?.errorRatio).toBe(null);
    expect(linearApprox("sqrt", -2)).toBe(null);
    const coarse = linearApprox("square", 0.1)!;
    const fine = linearApprox("square", 0.01)!;
    expect(coarse.dy).toBeCloseTo(0.2, 6);
    expect(coarse.deltaY).toBeCloseTo(0.21, 6);
    expect(coarse.error).toBeCloseTo(0.01, 6);
    expect(coarse.errorRatio).toBeCloseTo(0.1, 6);
    expect(fine.errorRatio!).toBeLessThan(coarse.errorRatio! / 5);
  });
  it("provides all 9 lessons across chapters 1 and 2 and 18 practice problems", () => {
    expect(lessons).toHaveLength(9);
    expect(lessons.filter((l) => l.chapter === 1)).toHaveLength(5);
    expect(lessons.filter((l) => l.chapter === 2).map((l) => l.id)).toEqual([
      "derivative",
      "rules",
      "chain",
      "differential",
    ]);
    expect(problems).toHaveLength(18);
  });
  it("links each lesson to its matching experiment including secant/tangent and linear approx for chapter 2", () => {
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
    expect(screen.getByTestId("linear-approx")).toHaveTextContent(
      "微分线性近似 dy =",
    );
    v2.unmount();

    const v3 = mount("/curriculum?lesson=chain");
    fireEvent.click(screen.getByRole("tab", { name: "实验" }));
    expect(screen.getByLabelText("选择导数实验函数")).toHaveValue("chain");
    v3.unmount();
  });
  it("grades new derivative rules, chain rule, and differential problems", () => {
    const v = mount("/practice?problem=p14");
    fireEvent.change(screen.getByLabelText("请输入导数值的数值或分数"), {
      target: { value: "1" },
    });
    fireEvent.click(screen.getByRole("button", { name: "检查答案" }));
    expect(screen.getByRole("status")).toHaveTextContent("✓ 回答正确");
    v.unmount();

    const v2 = mount("/practice?problem=p16");
    fireEvent.change(screen.getByLabelText("请输入数值或分数"), {
      target: { value: "3/4" },
    });
    fireEvent.click(screen.getByRole("button", { name: "检查答案" }));
    expect(screen.getByRole("status")).toHaveTextContent("✓ 回答正确");
    v2.unmount();

    const v3 = mount("/practice?problem=p18");
    fireEvent.change(screen.getByLabelText("请输入线性近似值的数值或分数"), {
      target: { value: "2.01" },
    });
    fireEvent.click(screen.getByRole("button", { name: "检查答案" }));
    expect(screen.getByRole("status")).toHaveTextContent("✓ 回答正确");
    v3.unmount();
  });
  it("filters practice and review by chapter and errorTag and computes mastery stats", () => {
    const stats = computeMastery([
      { problemId: "p1", correct: true },
      { problemId: "p15", correct: false },
    ]);
    expect(stats.chapters[0].mastered).toBe(1);
    expect(stats.chapters[1].pending).toBe(1);

    const v = mount("/practice");
    fireEvent.click(screen.getByRole("button", { name: "第二章：导数与微分" }));
    expect(
      screen.getByRole("heading", { level: 2, name: "用导数定义求切线斜率" }),
    ).toBeVisible();
    fireEvent.change(screen.getByLabelText("按错因标签筛选"), {
      target: { value: "chain_rule" },
    });
    expect(
      screen.getByRole("heading", { level: 2, name: "复合幂函数的链式求导" }),
    ).toBeVisible();
    fireEvent.change(screen.getByLabelText("请输入导数值的数值或分数"), {
      target: { value: "3" },
    });
    fireEvent.click(screen.getByRole("button", { name: "检查答案" }));
    v.unmount();

    const rev = mount("/review");
    expect(screen.getByTestId("review-mastery")).toHaveTextContent(
      "第二章 · 导数与微分",
    );
    fireEvent.change(screen.getByLabelText("筛选错因分类"), {
      target: { value: "chain_rule" },
    });
    expect(
      screen.getByRole("heading", { level: 3, name: "复合幂函数的链式求导" }),
    ).toBeVisible();
    rev.unmount();
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

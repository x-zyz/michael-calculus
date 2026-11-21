import katex from "katex";
import tongjiInventory from "../../docs/tongji/inventory.json";
import { riemannSum, accumulationSlope } from "../data/integrals";
import {chooseSelect,completeReading} from './ui';
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../app/App";
import { checkAnswer, computeMastery, derivativeAppState, experimentValue, lessons, linearApprox, problems, secantSlope } from "../data/learning";
import { textbookSections } from "../data/textbookSections";
import { formulas } from "../data/formulas";
import { learningKey } from "../db/learning";
function mount(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}
describe("limit and derivative learning", () => {
  it("filters challenge questions without falling back to unrelated lessons", () => {
    mount("/practice?lesson=continuity");
    fireEvent.click(screen.getByRole("button", { name: "题目列表" }));
    const sheet = screen.getByRole("dialog");
    fireEvent.click(within(sheet).getByRole("button", { name: "挑战" }));
    expect(within(sheet).getByText(/求使分段函数在 2 连续/)).toBeVisible();
    expect(within(sheet).queryByText(/参数曲线的二阶导数/)).toBeNull();
    fireEvent.click(within(sheet).getByRole("button", { name: /第八章：/ }));
    expect(within(sheet).queryByText(/求使分段函数在 2 连续/)).toBeNull();
    fireEvent.keyDown(sheet, { key: "Escape" });
    expect(screen.getByRole("heading", { name: "没有匹配的题目" })).toBeVisible();
  });
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
  it("computes MVT, L'Hopital (undefined at x = 0), and extrema derivative application states", () => {
    const mvtAtC = derivativeAppState("mvt", 1)!;
    const mvtOff = derivativeAppState("mvt", 0.5)!;
    expect(mvtAtC.secantSlope).toBeCloseTo(2, 6);
    expect(mvtAtC.tangentSlope).toBeCloseTo(2, 6);
    expect(mvtAtC.slopeDiff).toBeCloseTo(0, 6);
    expect(mvtOff.tangentSlope).toBeCloseTo(1, 6);
    expect(mvtOff.slopeDiff).toBeCloseTo(1, 6);

    expect(derivativeAppState("lhopital", 0)).toBe(null);
    const lhop = derivativeAppState("lhopital", 0.001)!;
    expect(lhop.ratio).toBeCloseTo(0.5, 3);
    expect(lhop.derivativeRatio).toBeCloseTo(0.5, 3);
    expect(lhop.limit).toBe(0.5);

    const maxPt = derivativeAppState("extrema", -1)!;
    const minPt = derivativeAppState("extrema", 1)!;
    const decPt = derivativeAppState("extrema", 0)!;
    expect(maxPt.fx).toBeCloseTo(2, 6);
    expect(maxPt.dfx).toBeCloseTo(0, 6);
    expect(maxPt.d2fx).toBeCloseTo(-6, 6);
    expect(maxPt.monotone).toBe("极大值驻点");
    expect(minPt.fx).toBeCloseTo(-2, 6);
    expect(minPt.dfx).toBeCloseTo(0, 6);
    expect(minPt.d2fx).toBeCloseTo(6, 6);
    expect(minPt.monotone).toBe("极小值驻点");
    expect(decPt.dfx).toBeCloseTo(-3, 6);
    expect(decPt.monotone).toBe("单调递减");
  });
  it("places each lesson and its practice in the correct textbook section", () => {
    const listed = Object.entries(textbookSections).flatMap(([chapter, sections]) =>
      sections.flatMap((section, index) => {
        expect(section.number).toBe(`${chapter}.${index + 1}`);
        expect(section.lessons.length).toBeGreaterThan(0);
        return section.lessons.map((id) => ({ id, chapter: Number(chapter) }));
      }),
    );
    expect(listed).toHaveLength(lessons.length);
    expect(new Set(listed.map(({ id }) => id)).size).toBe(lessons.length);
    const byId = new Map(lessons.map((lesson) => [lesson.id, lesson]));
    for (const { id, chapter } of listed) {
      expect(byId.get(id)?.chapter).toBe(chapter);
      expect(problems.some((problem) => problem.lessonId === id)).toBe(true);
    }
    for (const formula of formulas) {
      if (formula.lessonId) expect(formula.chapter).toBe(byId.get(formula.lessonId)?.chapter);
    }
    expect(textbookSections[4].map(({ lessons }) => lessons)).toEqual([
      ["antiderivative"], ["substitution"], ["integration-by-parts"], ["rational-integrals"],
    ]);
    expect(textbookSections[5][0].lessons).toEqual(["riemann"]);
    expect(textbookSections[5][1].lessons).toEqual(["fundamental-theorem"]);
    expect(textbookSections[5][4].lessons).toContain("integral-area");
  });
  it("links each lesson to its matching experiment across chapters 1, 2, and 3", () => {
    const v = mount("/curriculum?lesson=euler");
    fireEvent.click(screen.getByRole("tab", { name: "实验" }));
    expect(screen.getByLabelText("选择实验函数")).toHaveAttribute("data-value","euler");
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
    expect(screen.getByLabelText("选择导数实验函数")).toHaveAttribute("data-value","chain");
    v3.unmount();

    const v4 = mount("/curriculum?lesson=lhopital");
    fireEvent.click(screen.getByRole("tab", { name: "实验" }));
    expect(screen.getByTestId("derivative-app-experiment")).toBeVisible();
    expect(screen.getByLabelText("选择导数应用实验")).toHaveAttribute("data-value","lhopital");
    v4.unmount();
  });
  it("grades derivative rules, chain rule, differential, MVT, L'Hopital, and extrema problems", () => {
    const v = mount("/practice?problem=p14");
    fireEvent.change(screen.getByLabelText("请输入导数值的数值或分数"), {
      target: { value: "1" },
    });
    fireEvent.click(screen.getByRole("button", { name: "检查答案" }));
    expect(screen.getByRole("status")).toHaveTextContent("✓ 回答正确");
    v.unmount();

    const v2 = mount("/practice?problem=p19");
    fireEvent.change(screen.getByLabelText("请输入中值点 ξ 的数值或分数"), {
      target: { value: "3" },
    });
    fireEvent.click(screen.getByRole("button", { name: "检查答案" }));
    expect(screen.getByRole("status")).toHaveTextContent("✓ 回答正确");
    v2.unmount();

    const v3 = mount("/practice?problem=p21");
    fireEvent.change(screen.getByLabelText("请输入极限值的数值或分数"), {
      target: { value: "1/2" },
    });
    fireEvent.click(screen.getByRole("button", { name: "检查答案" }));
    expect(screen.getByRole("status")).toHaveTextContent("✓ 回答正确");
    v3.unmount();

    const v4 = mount("/practice?problem=p23");
    fireEvent.change(screen.getByLabelText("请输入极大值的数值或分数"), {
      target: { value: "2" },
    });
    fireEvent.click(screen.getByRole("button", { name: "检查答案" }));
    expect(screen.getByRole("status")).toHaveTextContent("✓ 回答正确");
    v4.unmount();
  });
  it("filters practice and review by chapter and errorTag and computes mastery stats with weakTags", () => {
    const stats = computeMastery([
      { problemId: "p1", correct: true },
      { problemId: "p15", correct: false },
      { problemId: "p21", correct: false },
    ]);
    expect(stats.chapters).toHaveLength(8);
    expect(stats.chapters[0].mastered).toBe(1);
    expect(stats.chapters[0].attempted).toBe(1);
    expect(stats.chapters[1].pending).toBe(1);
    expect(stats.chapters[1].weakTags).toContain("复合函数链式法则");
    expect(stats.chapters[2].pending).toBe(1);
    expect(stats.chapters[2].weakTags).toContain("洛必达法则与未定式");

    const v = mount("/practice");
    fireEvent.click(screen.getByRole("button",{name:"题目列表"}));
    fireEvent.click(
      screen.getByRole("button", { name: "第三章：微分中值定理与导数应用" }),
    );
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "拉格朗日中值定理求中值点",
      }),
    ).toBeVisible();
    fireEvent.click(within(screen.getByRole("group",{name:"按错因标签筛选"})).getByRole("button",{name:"洛必达法则与未定式"}));
    fireEvent.click(screen.getByRole("button",{name:"关闭题目列表"}));
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "洛必达法则求指数型 0/0 极限",
      }),
    ).toBeVisible();
    fireEvent.change(screen.getByLabelText("请输入极限值的数值或分数"), {
      target: { value: "99" },
    });
    fireEvent.click(screen.getByRole("button", { name: "检查答案" }));
    v.unmount();

    const rev = mount("/review");
    expect(screen.getByTestId("review-mastery")).toHaveTextContent(
      "第三章 · 微分中值定理与导数应用",
    );
    expect(screen.getByTestId("review-mastery")).toHaveTextContent(
      "薄弱考点：洛必达法则与未定式",
    );
    chooseSelect("筛选错因分类","lhopital_rule");
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "洛必达法则求指数型 0/0 极限",
      }),
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
    const v = mount("/curriculum/limit");
    completeReading();
    v.unmount();
    mount("/curriculum/limit");
    expect(screen.getByText(/已完成阅读/)).toBeVisible();
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
    mount("/curriculum/limit");
    completeReading();
    expect(screen.getByRole("alert")).toHaveTextContent("无法保存");
    spy.mockRestore();
  });
});

describe("integral experiments", () => {
  it("computes rectangle sums and preserves signed area", () => {
    expect(riemannSum(2, "left").sum).toBe(1 / 8);
    expect(riemannSum(2, "right").sum).toBe(5 / 8);
    expect(riemannSum(2, "mid").sum).toBe(5 / 16);
    expect(riemannSum(8, "mid", true).sum).toBe(0);
    expect(riemannSum(64, "mid").sum).toBeCloseTo(1 / 3, 4);
    expect(accumulationSlope(0.5, 0)).toBeNull();
    expect(accumulationSlope(-0.5, 0.00001)).toBeCloseTo(0.25, 4);
  });

  it("opens the accumulation experiment directly from the matching lesson", () => {
    mount("/curriculum/fundamental-theorem");
    fireEvent.click(screen.getByRole("tab", { name: "实验" }));
    expect(screen.getByRole("slider", { name: "积分上限" })).toBeVisible();
    fireEvent.change(screen.getByRole("slider", { name: "累积差商步长" }), { target: { value: "0" } });
    expect(screen.getByText(/在 h = 0 时未定义/)).toBeVisible();
  });
});

it("links the fifth chapter to its own volume experiment and chapter practice", () => {
  mount("/curriculum/integral-volume");
  fireEvent.click(screen.getByRole("tab", { name: "实验" }));
  const inner = screen.getByRole("slider", { name: "内外半径比" });
  fireEvent.change(inner, { target: { value: "1" } });
  expect(screen.getByText("右端截面积 0.0000 · 累积体积 0.0000")).toBeVisible();
  fireEvent.click(screen.getByRole("tab", { name: "练习" }));
  fireEvent.click(screen.getByRole("link", { name: /开始练习/ }));
  expect(screen.getByText("第 1 / 4 题 · 第5章")).toBeVisible();
  expect(screen.getByRole("heading", { name: "由截面积函数求体积" })).toBeVisible();
});

it("reveals a reference plot and records only an explicit written self-assessment", () => {
  mount("/practice?problem=p220");
  expect(screen.queryByRole("textbox", { name: /数值/ })).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "查看分步解析" }));
  expect(screen.getByRole("img", { name: /四次函数参考图/ })).toBeVisible();
  expect(screen.queryByRole("tab", { name: /错题 \(1\)/ })).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "加入错题" }));
  fireEvent.click(screen.getByRole("tab", { name: /错题 \(1\)/ }));
  fireEvent.click(screen.getByRole("button", { name: "最近 20 次作答" }));
  expect(screen.getByText(/你的答案：自评：还需复习/)).toBeVisible();
});

it("assigns each written exercise to a real lesson and error topic", () => {
  const written = problems.filter((problem) => "kind" in problem);
  expect(written.length).toBeGreaterThan(40);
  for (const problem of written) {
    expect(lessons.some(({ id }) => id === problem.lessonId), problem.id).toBe(true);
    expect(problem.errorLabel, problem.id).toBeTruthy();
  }
  expect(new Set(problems.map(({ id }) => id)).size).toBe(problems.length);
});



it("reconciles the Tongji inventory with the installed bank and KaTeX output", () => {
  const { sections, items } = tongjiInventory;
  expect(new Set(sections.map(({ id }) => id)).size).toBe(sections.length);
  expect(new Set(items.map(({ id }) => id)).size).toBe(items.length);
  for (const item of items) {
    expect(sections.find(({ id }) => id === item.section)?.inventory, item.id).toBe("enumerated");
    expect(item.appIds.length > 0, item.id).toBe(item.status === "integrated");
  }
  const integrated = items.filter(({ status }) => status === "integrated");
  const exercises = problems.filter(({ id }) => id.startsWith("jc935-"));
  expect(exercises.map(({ id }) => id).sort()).toEqual(integrated.flatMap(({ appIds }) => appIds).sort());
  for (const p of exercises) {
    if (!("kind" in p)) throw new Error("Missing written exercise " + p.id);
    expect(p.source, p.id).toBeTruthy();
    if (/^jc935-1-[45]-/.test(p.id)) expect(p.commonMistake, p.id).toBeTruthy();
    for (const formula of [p.formula, p.solution]) {
      expect(() => katex.renderToString(formula, { throwOnError: true, strict: "error" }), p.id).not.toThrow();
    }
  }
  expect(integrated.filter(({ section }) => section === "1-4")).toHaveLength(33);
  expect(integrated.filter(({ section }) => section === "1-5")).toHaveLength(29);
});

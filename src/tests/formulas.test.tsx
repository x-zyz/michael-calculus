import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import katex from "katex";
import App from "../app/App";
import { formulas } from "../data/formulas";
import { problems } from "../data/learning";
import {
  cards,
  emptyStore,
  recordReview,
  addDays,
  localDay,
  validateStore,
  level,
  queue,
  markStuck,
  counters,
  weak,
  choices,
} from "../features/formulas/engine";
import { formulaKey } from "../db/formulas";
const day = (n: number) => new Date(2026, 10, n, 12);
function reviewedToL4() {
  let s = emptyStore();
  for (const id of [
    "sin-limit:cloze:0",
    "sin-limit:recall",
    "sin-limit:condition",
  ])
    s = recordReview(s, id, "good", "learn", [], day(1));
  s = recordReview(s, "sin-limit:recall", "good", "due", [], day(2));
  return s;
}
function mount(path = "/review/formulas") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}
describe("formula content and spaced reviews", () => {
  it("has unique valid cards, correct formula references and renderable KaTeX", () => {
    expect(formulas.length).toBeGreaterThanOrEqual(40);
    expect(new Set(formulas.map((f) => f.id)).size).toBe(formulas.length);
    expect(new Set(cards.map((c) => c.id)).size).toBe(cards.length);
    for (const f of formulas) {
      expect(f.cloze.length).toBeGreaterThan(0);
      expect(() =>
        katex.renderToString(f.latex, { throwOnError: true }),
      ).not.toThrow();
      for (const c of f.cloze) {
        expect(c.latex).toContain("boxed");
        expect(() =>
          katex.renderToString(c.latex, { throwOnError: true }),
        ).not.toThrow();
      }
    }
    for (const p of problems)
      for (const id of p.formulaIds ?? [])
        expect(formulas.some((f) => f.id === id)).toBe(true);
    expect(new Set(choices("sin-limit")).size).toBe(4);
  });
  it("advances and caps boxes, and schedules fuzzy/forgot for tomorrow", () => {
    let s = emptyStore();
    for (let i = 0; i < 8; i++)
      s = recordReview(s, "sin-limit:recall", "good", "due", [], day(1));
    expect(s.cards["sin-limit:recall"]).toMatchObject({
      box: 6,
      due: addDays(localDay(day(1)), 30),
    });
    s = recordReview(s, "sin-limit:recall", "fuzzy", "due", [], day(1));
    expect(s.cards["sin-limit:recall"]).toMatchObject({
      box: 6,
      due: "2026-11-02",
    });
    s = recordReview(s, "sin-limit:recall", "forgot", "due", ["sign"], day(1));
    expect(s.cards["sin-limit:recall"]).toMatchObject({
      box: 1,
      lapses: 1,
      due: "2026-11-02",
    });
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
    expect(addDays("2028-02-28", 1)).toBe("2028-02-29");
  });
  it("requires sequential and cross-day evidence, reads practice results and downgrades", () => {
    let s = emptyStore();
    expect(level("sin-limit", s, [], day(2))).toBe(0);
    s = recordReview(s, "sin-limit:recall", "good", "learn", [], day(1));
    expect(level("sin-limit", s, [], day(2))).toBe(1);
    s = recordReview(s, "sin-limit:cloze:0", "good", "learn", [], day(1));
    s = recordReview(s, "sin-limit:recall", "good", "learn", [], day(1));
    expect(level("sin-limit", s, [], day(2))).toBe(2);
    s = recordReview(s, "sin-limit:recall", "good", "due", [], day(2));
    expect(level("sin-limit", s, [], day(2))).toBe(3);
    s = recordReview(s, "sin-limit:condition", "good", "due", [], day(2));
    expect(level("sin-limit", s, [], day(2))).toBe(4);
    for (const n of [1, 2])
      s = recordReview(s, "sin-limit:recognize:p3", "good", "due", [], day(n));
    expect(level("sin-limit", s, [], day(2))).toBe(4);
    const a = {
      problemId: "p3",
      answer: "3/5",
      correct: true,
      hints: 0,
      at: day(2).toISOString(),
    };
    expect(level("sin-limit", s, [a], day(2))).toBe(5);
    expect(level("sin-limit", s, [{ ...a, correct: false }], day(2))).toBe(4);
    s = markStuck(s, "sin-limit", "p3", day(2));
    expect(level("sin-limit", s, [a], day(15))).toBe(4);
    expect(level("sin-limit", s, [a], day(16))).toBe(5);
    s = recordReview(s, "sin-limit:cloze:0", "forgot", "due", [], day(16));
    expect(level("sin-limit", s, [a], day(16))).toBe(1);
  });
  it("limits daily new formulas, resumes unfinished cards, pauses new learning in backlog and restricts spots", () => {
    let s = emptyStore();
    const items = queue(s, "due", [], day(1));
    expect(items.length).toBeLessThanOrEqual(20);
    expect(
      new Set(items.map((i) => i.cardId.split(":")[0])).size,
    ).toBeLessThanOrEqual(5);
    s.settings.newPerDay = 1;
    expect(
      new Set(queue(s, "due", [], day(1)).map((i) => i.cardId.split(":")[0]))
        .size,
    ).toBe(1);
    s = recordReview(s, "sin-limit:cloze:0", "good", "learn", [], day(1));
    expect(counters(s, day(1)).newToday).toBe(1);
    expect(
      queue(s, "due", [], day(1)).every((i) =>
        i.cardId.startsWith("sin-limit:"),
      ),
    ).toBe(true);
    for (const c of cards.slice(0, 41))
      s.cards[c.id] = {
        box: 1,
        lapses: 0,
        due: "2026-10-01",
        lastResult: "good",
      };
    expect(queue(s, "due", [], day(1))).toHaveLength(20);
    expect(queue(s, "due", [], day(1)).every((i) => i.mode === "due")).toBe(
      true,
    );
    expect(queue(emptyStore(), "spot", [], day(2))).toHaveLength(0);
    expect(queue(reviewedToL4(), "spot", [], day(2), () => 0)).toHaveLength(1);
  });
  it("validates malformed stores, discards unknown IDs, bounds histories and flags weak formulas", () => {
    expect(validateStore({ version: 9 })).toEqual(emptyStore());
    const base = recordReview(
      emptyStore(),
      "sin-limit:recall",
      "forgot",
      "learn",
      [],
      day(1),
    );
    const raw = {
      ...base,
      cards: {
        ...base.cards,
        unknown: { box: 2, due: "2026-11-01", lapses: 0 },
        "sin-limit:cloze:0": { box: 8, due: "2026-02-30", lapses: -1 },
      },
      reviews: Array(2005).fill(base.reviews[0]),
    };
    const s = validateStore(raw);
    expect(Object.keys(s.cards)).toEqual(["sin-limit:recall"]);
    expect(s.reviews).toHaveLength(2000);
    expect(weak("sin-limit", s, day(1))).toBe(true);
    expect(validateStore(null)).toEqual(emptyStore());
  });
});
describe("formula UI integration", () => {
  it("reveals answers before rating, records optional error tags, repeats forgotten cards once and summarizes", () => {
    const s = emptyStore();
    s.settings.newPerDay = 0;
    s.cards["sin-limit:cloze:0"] = { box: 1, due: "2000-01-01", lapses: 0 };
    localStorage.setItem(formulaKey, JSON.stringify(s));
    mount();
    fireEvent.click(screen.getByRole("button", { name: "开始今日复习" }));
    expect(
      screen.queryByRole("button", { name: "记住了" }),
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "显示答案" }));
    fireEvent.click(screen.getByRole("button", { name: "忘记了" }));
    fireEvent.click(screen.getByRole("checkbox", { name: "系数" }));
    fireEvent.click(screen.getByRole("button", { name: /保存并继续/ }));
    expect(screen.getByText(/第 2 \/ 2 张/)).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "显示答案" }));
    fireEvent.click(screen.getByRole("button", { name: "记住了" }));
    expect(screen.getByRole("heading", { name: "本轮小结" })).toBeVisible();
    const stored = JSON.parse(localStorage.getItem(formulaKey)!);
    expect(stored.reviews).toHaveLength(2);
    expect(stored.reviews[0].errorTags).toEqual(["coef"]);
  });
  it("reports stuck manually without rewriting learning data", () => {
    const v = mount("/practice?problem=p3");
    const before = localStorage.getItem("mc-learning-v1");
    fireEvent.click(screen.getByRole("button", { name: "卡在公式上了" }));
    fireEvent.click(screen.getByRole("button", { name: "第一个重要极限" }));
    expect(screen.getByText(/已加入今日公式复习/)).toBeVisible();
    expect(localStorage.getItem("mc-learning-v1")).toBe(before);
    v.unmount();
    mount();
    expect(screen.getByText(/今日到期/)).toBeVisible();
    expect(JSON.parse(localStorage.getItem(formulaKey)!).stuck).toHaveLength(1);
  });
  it("grades recognition choices and preserves all six navigation links on nested route", () => {
    let s = reviewedToL4();
    s.settings.newPerDay = 0;
    s = markStuck(s, "sin-limit", "p3");
    localStorage.setItem(formulaKey, JSON.stringify(s));
    mount();
    const nav = screen.getByRole("navigation", { name: "主导航" });
    expect(within(nav).getAllByRole("link")).toHaveLength(6);
    expect(
      within(nav).getByRole("link", { name: "错题与复习" }),
    ).toHaveAttribute("aria-current", "page");
    fireEvent.change(screen.getByLabelText("复习模式"), {
      target: { value: "recognize" },
    });
    fireEvent.click(screen.getByRole("button", { name: "开始今日复习" }));
    fireEvent.click(screen.getByRole("button", { name: /第一个重要极限/ }));
    expect(screen.getByRole("heading", { name: "选择正确" })).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "记录并继续" }));
    expect(
      JSON.parse(localStorage.getItem(formulaKey)!).reviews.at(-1).result,
    ).toBe("good");
  });
  it("shows a warning if storage writes fail", () => {
    mount();
    const spy = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw Error("quota");
      });
    fireEvent.change(screen.getByLabelText(/每天最多加入/), {
      target: { value: "4" },
    });
    expect(
      screen
        .getAllByRole("alert")
        .some((e) => e.textContent?.includes("无法保存")),
    ).toBe(true);
    spy.mockRestore();
  });
});

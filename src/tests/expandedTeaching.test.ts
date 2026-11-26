import { problems, expandedTeaching, teachingByProblem } from "./bankFixture";
import katex from "katex";
import { expect, it } from "vitest";
import { lessons } from "../data/learning";

import { focusedPracticeLesson } from "../features/practice/focusedPracticeRollout";

const bank = new Map(problems.map((problem) => [problem.id, problem]));

it("registers all 797 exercises across chapters one, two, and three", () => {
  const scope = new Set(lessons.filter(({ chapter }) => chapter <= 3).map(({ id }) => id));
  const mvtCore = new Set(["p19", "p20", "p134", "p181", "p216", "p217"]);
  const isSection31 = ({ id, lessonId }: (typeof problems)[number]) =>
    lessonId === "mvt" && (mvtCore.has(id) || id.startsWith("jc935-3-1-"));
  const lhopitalCore = new Set(["p21", "p22", "p135", "p182"]);
  const isSection32 = ({ id, lessonId }: (typeof problems)[number]) =>
    lessonId === "lhopital" && (lhopitalCore.has(id) || id.startsWith("jc935-3-2-"));
  const isSection33 = ({ id }: (typeof problems)[number]) => id.startsWith("jc935-3-3-");
  const isSection34 = ({ id }: (typeof problems)[number]) => id.startsWith("jc935-3-4-");
  const registered = problems.filter((p) => scope.has(p.lessonId));
  const expected = registered.map(({ id }) => id);

  expect(expected).toHaveLength(797);
  expect(problems.filter((p) => p.chapter === 1)).toHaveLength(344);
  expect(problems.filter((p) => p.chapter === 2)).toHaveLength(258);
  expect(problems.filter((p) => p.chapter === 3)).toHaveLength(195);
  expect(problems.filter(isSection31)).toHaveLength(22);
  expect(problems.filter(isSection32)).toHaveLength(23);
  expect(problems.filter(isSection33)).toHaveLength(15);
  expect(problems.filter(isSection34)).toHaveLength(38);
  expect(Object.keys(teachingByProblem).sort()).toEqual(expected.sort());
  expect(Object.keys(expandedTeaching)).toHaveLength(797);
  const registeredIds = new Set(expected);
  for (const problem of problems) {
    expect(Boolean(focusedPracticeLesson(problem)), problem.id).toBe(registeredIds.has(problem.id));
  }
});

it("gives each new exercise a valid understanding check and a renderable worked transfer", () => {
  for (const [id, lesson] of Object.entries(expandedTeaching)) {
    const problem = bank.get(id);
    expect(problem, id).toBeDefined();
    if (id !== "p8" && problem && "answer" in problem) expect(lesson.referenceAnswer, id).toBe(problem.answer);
    expect(lesson.steps.length, id).toBeGreaterThan(0);
    expect(new Set(lesson.steps.map((step) => step.id)).size, id).toBe(lesson.steps.length);
    const checks = lesson.steps.flatMap(({ check }) => check ? [check] : []);
    expect(checks.length, id).toBeGreaterThan(0);
    for (const check of checks) {
      expect(check.prompt.trim(), id).toBeTruthy();
      expect(check.prerequisite.trim(), id).toBeTruthy();
      expect(new Set(check.choices).size, id).toBe(check.choices.length);
      expect(check.choices.length, id).toBeGreaterThanOrEqual(2);
      expect(check.choices[check.correct], id).toBeTruthy();
      expect(check.feedback, id).toHaveLength(check.choices.length);
      expect(check.feedback.every((message) => message.trim()), id).toBe(true);
    }
    const transfers = lesson.steps.flatMap(({ transfer }) => transfer ? [transfer] : []);
    expect(transfers, id).toHaveLength(1);
    for (const transfer of transfers) {
      expect(Number.isFinite(transfer.answer), id).toBe(true);
      expect(transfer.answer, id).not.toBe(lesson.referenceAnswer);
      expect(transfer.prompt.trim(), id).toBeTruthy();
      if (id !== "p8") expect(transfer.solution?.trim(), id).toBeTruthy();
      expect(transfer.remediation.trim(), id).toBeTruthy();
    }
    for (const formula of [lesson.solution, ...lesson.steps.map(({ formula }) => formula),
      ...transfers.flatMap(({ solution, promptFormula }) => [solution, promptFormula])]) {
      if (!formula) continue;
      expect.soft(() => katex.renderToString(formula, { throwOnError: true, strict: "error" }), id).not.toThrow();
    }
  }
});

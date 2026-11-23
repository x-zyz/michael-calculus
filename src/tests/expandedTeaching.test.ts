import katex from "katex";
import { expect, it } from "vitest";
import { lessons, problems } from "../data/learning";
import { expandedTeaching, teachingByProblem } from "../data/teaching";
import { focusedPracticeLesson } from "../features/practice/focusedPracticeRollout";

const bank = new Map(problems.map((problem) => [problem.id, problem]));

it("registers full teaching for all chapter-one and chapter-two exercises only", () => {
  const scope = new Set(lessons.filter(({ chapter }) => chapter <= 2).map(({ id }) => id));
  const expected = problems.filter(({ lessonId }) => scope.has(lessonId)).map(({ id }) => id);

  expect(expected).toHaveLength(602);
  expect(Object.keys(teachingByProblem).sort()).toEqual(expected.sort());
  expect(Object.keys(expandedTeaching)).toHaveLength(561);
  for (const problem of problems) {
    expect(Boolean(focusedPracticeLesson(problem)), problem.id).toBe(scope.has(problem.lessonId));
  }
});

it("gives each new exercise a valid understanding check and a renderable worked transfer", () => {
  for (const [id, lesson] of Object.entries(expandedTeaching)) {
    const problem = bank.get(id);
    expect(problem, id).toBeDefined();
    if (problem && "answer" in problem) expect(lesson.referenceAnswer, id).toBe(problem.answer);
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
      expect(transfer.solution?.trim(), id).toBeTruthy();
      expect(transfer.remediation.trim(), id).toBeTruthy();
    }
    for (const formula of [lesson.solution, ...lesson.steps.map(({ formula }) => formula),
      ...transfers.flatMap(({ solution, promptFormula }) => [solution, promptFormula])]) {
      if (!formula) continue;
      expect.soft(() => katex.renderToString(formula, { throwOnError: true, strict: "error" }), id).not.toThrow();
    }
  }
});

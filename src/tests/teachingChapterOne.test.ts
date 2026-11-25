import { readFileSync } from "node:fs";
import katex from "katex";
import { expect, it } from "vitest";
import cases from "../../scripts/eli5-chapter-one-cases.json";
import { lessons, parseAnswer, problems } from "../data/learning";
import { teachingByProblem } from "../data/teaching";

const chapterOnePilotTeaching = Object.fromEntries(
  Object.keys(cases).map((id) => [id, teachingByProblem[id]!]),
);

it("lists every chapter-one problem once in the classification", () => {
  const chapter = new Set(lessons.filter((lesson) => lesson.chapter === 1).map((lesson) => lesson.id));
  const expected = problems.filter((problem) => chapter.has(problem.lessonId)).map((problem) => problem.id);
  const report = readFileSync("docs/eli5-chapter-one-classification.md", "utf8");
  const listed = Array.from(report.matchAll(/^\| ((?:p\d+|jc935-[\w-]+)) \|/gm), (row) => row[1]);
  expect(listed.sort()).toEqual(expected.sort());
});

for (const [id, lesson] of Object.entries(chapterOnePilotTeaching)) {
  it(`${id} matches the verified math pair and satisfies the teaching contract`, () => {
    const [strategy, original, transferAnswer] = cases[id as keyof typeof cases];
    const problem = problems.find((item) => item.id === id);
    expect(problem && "answer" in problem && problem.answer).toBe(parseAnswer(String(original)));
    expect(lesson.referenceAnswer).toBe(parseAnswer(String(original)));
    expect(lesson.strategy).toBe(strategy);
    expect(lesson.target?.trim()).not.toBe("");
    expect(lesson.prerequisites?.every((item) => item.trim())).toBe(true);
    expect(new Set(lesson.steps.map((item) => item.id)).size).toBe(lesson.steps.length);
    const transfers = lesson.steps.flatMap((item) => item.transfer ? [item.transfer] : []);
    expect(transfers).toHaveLength(1);
    expect(transfers[0].answer).toBe(parseAnswer(String(transferAnswer)));
    expect(transfers[0].answer).not.toBe(lesson.referenceAnswer);
    expect(transfers[0].remediation.trim()).not.toBe("");
    const checks = lesson.steps.flatMap((item) => item.check ? [item.check] : []);
    expect(checks.length).toBeGreaterThan(0);
    for (const check of checks) {
      expect(new Set(check.choices).size).toBe(check.choices.length);
      expect(check.choices[check.correct]).toBeTruthy();
      expect(check.feedback).toHaveLength(check.choices.length);
      expect(new Set(check.feedback).size).toBe(check.choices.length);
      expect(check.feedback.every((item) => item.trim())).toBe(true);
      expect(check.prerequisite.trim()).not.toBe("");
    }
    for (const formula of [lesson.solution, ...lesson.steps.map((item) => item.formula), transfers[0].solution]) {
      expect(formula).toBeTruthy();
      expect(() => katex.renderToString(formula!, { throwOnError: true, strict: "error" })).not.toThrow();
    }
  });
}

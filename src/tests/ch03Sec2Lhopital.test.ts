import { problems, teachingByProblem } from "./bankFixture";
import katex from "katex";
import { describe, expect, it } from "vitest";
import { formulaById } from "../data/formulas";
import { lessons, parseAnswer } from "../data/learning";

import { problemIndex } from "../data/bank";

const expectedSec2Ids = [
  "p21",
  "p22",
  "p135",
  "p182",
  "jc935-3-2-1-1",
  "jc935-3-2-1-2",
  "jc935-3-2-1-3",
  "jc935-3-2-1-4",
  "jc935-3-2-1-5",
  "jc935-3-2-1-6",
  "jc935-3-2-1-7",
  "jc935-3-2-1-8",
  "jc935-3-2-1-9",
  "jc935-3-2-1-10",
  "jc935-3-2-1-11",
  "jc935-3-2-1-12",
  "jc935-3-2-1-13",
  "jc935-3-2-1-14",
  "jc935-3-2-1-15",
  "jc935-3-2-1-16",
  "jc935-3-2-2",
  "jc935-3-2-3",
  "jc935-3-2-4",
] as const;

const problemById = new Map(problems.map((problem) => [problem.id, problem]));
const lessonChapter = new Map(lessons.map((lesson) => [lesson.id, lesson.chapter]));
const normalizeText = (value: string) => value.normalize("NFKC").replace(/\s+/g, "").trim();

describe("Ch1-Ch2 formulaIds coverage & Chapter 3 Section 3.2 (L'Hopital) pedagogy gate", () => {
  it("provides valid, non-empty formulaIds for all 602 Ch1-Ch2 problems and all 23 Section 3.2 problems", () => {
    const ch12Ids = problems.filter((p) => (lessonChapter.get(p.lessonId) ?? 99) <= 2).map((p) => p.id);
    expect(ch12Ids).toHaveLength(602);
    expect(problemIndex).toHaveLength(1693);

    for (const id of [...ch12Ids, ...expectedSec2Ids]) {
      const problem = problemById.get(id);
      expect(problem, id).toBeDefined();
      expect(problem?.formulaIds?.length ?? 0, `${id} formulaIds`).toBeGreaterThan(0);
      for (const fid of problem!.formulaIds!) {
        expect(formulaById.has(fid), `${id} invalid formulaId ${fid}`).toBe(true);
      }
    }
  });

  it("reconciles exact runtime lessonId='lhopital' partition (32 total = 23 Section 3.2 + 9 non-3.2)", () => {
    const allLhopitalIds = problems.filter((p) => p.lessonId === "lhopital").map((p) => p.id);
    const sec2Set = new Set<string>(expectedSec2Ids);
    const nonSec2Ids = allLhopitalIds.filter((id) => !sec2Set.has(id));

    expect(allLhopitalIds).toHaveLength(32);
    expect(expectedSec2Ids).toHaveLength(23);
    expect(nonSec2Ids).toHaveLength(9);
    for (const id of expectedSec2Ids) {
      expect(allLhopitalIds).toContain(id);
    }
  });

  it("covers all 23 Section 3.2 exercises in both guidedHints and ELI5 teaching with strict P0 gate", () => {
    const counts = [0, 0, 0];
    let totalChecks = 0;
    const affirmativePrefix = /^(对|找对了)/;

    for (const id of expectedSec2Ids) {
      const problem = problemById.get(id)!;
      expect(problem.guidedHints?.length ?? 0, `${id} guidedHints`).toBeGreaterThanOrEqual(3);
      for (const hint of problem.guidedHints!) {
        expect(hint.change.trim(), id).toBeTruthy();
        expect(hint.text.trim(), id).toBeTruthy();
        expect(() => katex.renderToString(hint.formula, { throwOnError: true, strict: "error" }), id).not.toThrow();
      }

      const lesson = teachingByProblem[id]!;
      if ("answer" in problem) {
        expect(lesson.referenceAnswer, id).toBe(problem.answer);
      }
      expect(lesson.steps.length, id).toBe(3);
      expect(new Set(lesson.steps.map((s) => s.id)).size, id).toBe(3);

      for (const step of lesson.steps) {
        expect(() => katex.renderToString(step.formula, { throwOnError: true, strict: "error" }), `${id}/${step.id}`).not.toThrow();
        const check = step.check;
        if (check) {
          totalChecks += 1;
          expect(check.choices, `${id}/${step.id}`).toHaveLength(3);
          expect(check.correct).toBeGreaterThanOrEqual(0);
          expect(check.correct).toBeLessThan(3);
          counts[check.correct] += 1;

          const normChoices = check.choices.map(normalizeText);
          expect(normChoices.every(Boolean), `${id}/${step.id} blank choice`).toBe(true);
          expect(new Set(normChoices).size, `${id}/${step.id} duplicate choice`).toBe(3);

          expect(check.feedback, `${id}/${step.id} feedback length`).toHaveLength(3);
          const normFeedback = check.feedback.map(normalizeText);
          expect(normFeedback.every(Boolean), `${id}/${step.id} blank feedback`).toBe(true);
          expect(new Set(normFeedback).size, `${id}/${step.id} duplicate feedback`).toBe(3);

          for (let i = 0; i < 3; i++) {
            const msg = check.feedback[i].trim();
            if (i === check.correct) {
              expect(affirmativePrefix.test(msg), `${id}/${step.id} correct feedback must confirm`).toBe(true);
            } else {
              expect(affirmativePrefix.test(msg), `${id}/${step.id} distractor ${i} must not confirm`).toBe(false);
            }
          }

          if ("answer" in problem) {
            const parsed = parseAnswer(check.choices[check.correct]);
            if (parsed !== null) {
              expect(
                Math.abs(parsed - problem.answer) <= 1e-6,
                `${id}/${step.id} check leaks original numeric answer ${problem.answer}`,
              ).toBe(false);
            }
          }
        }
      }

      expect(() => katex.renderToString(lesson.solution, { throwOnError: true, strict: "error" }), `${id}/solution`).not.toThrow();
      const transfers = lesson.steps.flatMap((s) => (s.transfer ? [s.transfer] : []));
      expect(transfers, `${id} transfer count`).toHaveLength(1);
      const transfer = transfers[0];
      expect(Number.isFinite(transfer.answer), `${id} transfer finite`).toBe(true);
      if ("answer" in problem) {
        expect(transfer.answer, `${id} transfer must differ from original`).not.toBe(problem.answer);
      }
      expect(transfer.prompt.trim(), id).toBeTruthy();
      expect(transfer.solution?.trim(), id).toBeTruthy();
      expect(() => katex.renderToString(transfer.solution!, { throwOnError: true, strict: "error" }), `${id}/transfer`).not.toThrow();
    }

    expect(totalChecks).toBe(46);
    for (const [slot, count] of counts.entries()) {
      const share = count / totalChecks;
      expect(share, `slot ${slot} share (${count}/${totalChecks})`).toBeGreaterThanOrEqual(0.2);
      expect(share, `slot ${slot} share (${count}/${totalChecks})`).toBeLessThanOrEqual(0.5);
    }
  });
});

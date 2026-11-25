import { problems, teachingByProblem } from "./bankFixture";
import katex from "katex";
import { describe, expect, it } from "vitest";
import { formulaById } from "../data/formulas";

const sec3Ids = problems.filter((p) => p.id.startsWith("jc935-3-3-")).map((p) => p.id);
const sec4Ids = problems.filter((p) => p.id.startsWith("jc935-3-4-")).map((p) => p.id);
const targetIds = [...sec3Ids, ...sec4Ids];

const problemById = new Map(problems.map((p) => [p.id, p]));
const normalizeText = (value: string) => value.normalize("NFKC").replace(/\s+/g, "").trim();

describe("Chapter 3 Sections 3.3 (Taylor) & 3.4 (Monotonicity & Concavity) pedagogy gate", () => {
  it("covers all 15 Section 3.3 and all 38 Section 3.4 exercises with formulaIds, guidedHints, and hands-on ELI5", () => {
    expect(sec3Ids).toHaveLength(15);
    expect(sec4Ids).toHaveLength(38);
    expect(targetIds).toHaveLength(53);

    for (const id of targetIds) {
      const problem = problemById.get(id)!;
      expect(problem.formulaIds?.length ?? 0, `${id} formulaIds`).toBeGreaterThan(0);
      expect(problem.formulaIds!.every((fid) => formulaById.has(fid)), `${id} valid formulaIds`).toBe(true);
      expect(problem.guidedHints?.length ?? 0, `${id} guidedHints`).toBe(3);
      for (const hint of problem.guidedHints!) {
        expect(hint.change.trim(), id).toBeTruthy();
        expect(hint.text.trim(), id).toBeTruthy();
        expect(() => katex.renderToString(hint.formula, { throwOnError: true, strict: "error" }), `${id}/hint`).not.toThrow();
      }
      expect(teachingByProblem[id], `${id} teaching`).toBeDefined();
    }
  });

  it("enforces 2-check 3-choice hands-on ELI5 quality, balanced slots, affirmative alignment, strict KaTeX, and valid transfers across all 53 problems", () => {
    const counts = [0, 0, 0];
    let totalChecks = 0;
    const affirmativePrefix = /^(对|找对了)/;

    for (const id of targetIds) {
      const lesson = teachingByProblem[id]!;
      expect(lesson.steps, id).toHaveLength(3);
      expect(new Set(lesson.steps.map((s) => s.id)).size, id).toBe(3);
      expect(() => katex.renderToString(lesson.solution, { throwOnError: true, strict: "error" }), `${id}/solution`).not.toThrow();

      for (const step of lesson.steps) {
        expect(() => katex.renderToString(step.formula, { throwOnError: true, strict: "error" }), `${id}/${step.id}`).not.toThrow();
        const check = step.check;
        if (!check) continue;
        totalChecks += 1;
        expect(check.choices, `${id}/${step.id}`).toHaveLength(3);
        expect(check.feedback, `${id}/${step.id}`).toHaveLength(3);
        expect(check.correct).toBeGreaterThanOrEqual(0);
        expect(check.correct).toBeLessThan(3);
        counts[check.correct] += 1;

        const normChoices = check.choices.map(normalizeText);
        expect(normChoices.every(Boolean), `${id}/${step.id} blank choice`).toBe(true);
        expect(new Set(normChoices).size, `${id}/${step.id} dup choice`).toBe(3);

        const normFeedback = check.feedback.map(normalizeText);
        expect(normFeedback.every(Boolean), `${id}/${step.id} blank feedback`).toBe(true);
        expect(new Set(normFeedback).size, `${id}/${step.id} dup feedback`).toBe(3);

        for (let i = 0; i < 3; i++) {
          expect(affirmativePrefix.test(check.feedback[i].trim()), `${id}/${step.id}/${i}`).toBe(i === check.correct);
        }
      }

      const transfers = lesson.steps.flatMap((s) => (s.transfer ? [s.transfer] : []));
      expect(transfers, `${id} transfer count`).toHaveLength(1);
      expect(Number.isFinite(transfers[0].answer), `${id} transfer finite`).toBe(true);
      expect(() => katex.renderToString(transfers[0].solution!, { throwOnError: true, strict: "error" }), `${id}/transfer`).not.toThrow();
    }

    expect(totalChecks).toBe(106);
    for (const [slot, count] of counts.entries()) {
      const share = count / totalChecks;
      expect(share, `slot ${slot} share (${count}/${totalChecks})`).toBeGreaterThanOrEqual(0.2);
      expect(share, `slot ${slot} share (${count}/${totalChecks})`).toBeLessThanOrEqual(0.5);
    }
  });
});

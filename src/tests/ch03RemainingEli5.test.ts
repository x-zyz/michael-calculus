import { problems, teachingByProblem } from "./bankFixture";
import katex from "katex";
import { describe, expect, it } from "vitest";
import { formulaById } from "../data/formulas";
import { parseAnswer } from "../data/learning";

const milestone1Ids = [
  "p23", "p24", "p42", "p43", "p136", "p137", "p138", "p184", "p185",
  "p218", "p219", "p220", "p221", "p222", "p223", "jc935-1-4-8",
  "jc935-3-5-1-1", "jc935-3-5-1-2", "jc935-3-5-1-3", "jc935-3-5-1-4", "jc935-3-5-1-5",
  "jc935-3-5-1-6", "jc935-3-5-1-7", "jc935-3-5-1-8", "jc935-3-5-1-9", "jc935-3-5-1-10",
  "jc935-3-5-2", "jc935-3-5-3", "jc935-3-5-4-1", "jc935-3-5-4-2", "jc935-3-5-5",
  "jc935-3-5-6-1", "jc935-3-5-6-2", "jc935-3-5-6-3", "jc935-3-5-7", "jc935-3-5-8-1",
  "jc935-3-5-8-2", "jc935-3-5-9", "jc935-3-5-10", "jc935-3-5-11", "jc935-3-5-12",
  "jc935-3-5-13", "jc935-3-5-14", "jc935-3-5-15", "jc935-3-5-16", "jc935-3-5-17",
  "jc935-3-5-18",
  "jc935-3-6-1", "jc935-3-6-2", "jc935-3-6-3", "jc935-3-6-4", "jc935-3-6-5",
] as const;

const milestone2Ids = [
  "jc935-3-7-1", "jc935-3-7-2", "jc935-3-7-3", "jc935-3-7-4", "jc935-3-7-5",
  "jc935-3-7-6", "jc935-3-7-7", "jc935-3-7-8", "jc935-3-7-9", "jc935-3-7-10",
  "jc935-3-7-11",
  "jc935-3-8-1", "jc935-3-8-2", "jc935-3-8-3", "jc935-3-8-4",
  "jc935-3-review-1", "jc935-3-review-2-1", "jc935-3-review-2-2",
  "jc935-3-review-3", "jc935-3-review-4", "jc935-3-review-5", "jc935-3-review-6",
  "jc935-3-review-7", "jc935-3-review-8", "jc935-3-review-9",
  "jc935-3-review-10-1", "jc935-3-review-10-2", "jc935-3-review-10-3", "jc935-3-review-10-4",
  "jc935-3-review-11-1", "jc935-3-review-11-2", "jc935-3-review-11-3", "jc935-3-review-11-4",
  "jc935-3-review-12-1", "jc935-3-review-12-2", "jc935-3-review-12-3",
  "jc935-3-review-13", "jc935-3-review-14", "jc935-3-review-15", "jc935-3-review-16",
  "jc935-3-review-17", "jc935-3-review-18", "jc935-3-review-19", "jc935-3-review-20",
  "jc935-3-review-21",
] as const;

const allNewIds = [...milestone1Ids, ...milestone2Ids];
const problemById = new Map(problems.map((p) => [p.id, p]));
const normalizeText = (value: string) => value.normalize("NFKC").replace(/\s+/g, "").trim();

function verifyPedagogyBatch(ids: readonly string[], expectedCheckCount: number) {
  const counts = [0, 0, 0];
  let totalChecks = 0;
  const affirmativePrefix = /^(对|找对了)/;

  for (const id of ids) {
    const problem = problemById.get(id);
    expect(problem, id).toBeDefined();
    expect(problem!.formulaIds?.length ?? 0, `${id} formulaIds`).toBeGreaterThan(0);
    expect(problem!.formulaIds!.every((fid) => formulaById.has(fid)), `${id} valid formulaIds`).toBe(true);
    expect(problem!.guidedHints?.length ?? 0, `${id} guidedHints`).toBe(3);

    for (const hint of problem!.guidedHints!) {
      expect(hint.change.trim(), id).toBeTruthy();
      expect(hint.text.trim(), id).toBeTruthy();
      expect(() => katex.renderToString(hint.formula, { throwOnError: true, strict: "error" }), `${id}/hint`).not.toThrow();
    }

    const lesson = teachingByProblem[id];
    expect(lesson, `${id} teaching`).toBeDefined();
    expect(lesson!.steps, id).toHaveLength(3);
    expect(new Set(lesson!.steps.map((s) => s.id)).size, id).toBe(3);
    expect(() => katex.renderToString(lesson!.solution, { throwOnError: true, strict: "error" }), `${id}/solution`).not.toThrow();

    if ("answer" in problem!) {
      expect(lesson!.referenceAnswer, id).toBe(problem!.answer);
    }

    for (const [idx, step] of lesson!.steps.entries()) {
      expect(step.id, `${id} step id`).toBe(`${id}-${idx + 1}`);
      expect(() => katex.renderToString(step.formula, { throwOnError: true, strict: "error" }), `${id}/${step.id}`).not.toThrow();
      const check = step.check;
      if (idx < 2) {
        expect(check, `${id}/${step.id} check`).toBeDefined();
        totalChecks += 1;
        expect(check!.choices, `${id}/${step.id}`).toHaveLength(3);
        expect(check!.feedback, `${id}/${step.id}`).toHaveLength(3);
        expect(check!.correct).toBeGreaterThanOrEqual(0);
        expect(check!.correct).toBeLessThan(3);
        counts[check!.correct] += 1;

        const normChoices = check!.choices.map(normalizeText);
        expect(normChoices.every(Boolean), `${id}/${step.id} blank choice`).toBe(true);
        expect(new Set(normChoices).size, `${id}/${step.id} dup choice`).toBe(3);

        const normFeedback = check!.feedback.map(normalizeText);
        expect(normFeedback.every(Boolean), `${id}/${step.id} blank feedback`).toBe(true);
        expect(new Set(normFeedback).size, `${id}/${step.id} dup feedback`).toBe(3);

        for (let i = 0; i < 3; i++) {
          expect(affirmativePrefix.test(check!.feedback[i].trim()), `${id}/${step.id}/${i}`).toBe(i === check!.correct);
        }

        if ("answer" in problem!) {
          const parsed = parseAnswer(check!.choices[check!.correct]);
          if (parsed !== null) {
            expect(
              Math.abs(parsed - problem!.answer) <= 1e-6,
              `${id}/${step.id} check leaks original numeric answer ${problem!.answer}`,
            ).toBe(false);
          }
        }
      } else {
        expect(check, `${id}/${step.id} unexpected check on step 3`).toBeUndefined();
      }
    }

    const transfers = lesson!.steps.flatMap((s) => (s.transfer ? [s.transfer] : []));
    expect(transfers, `${id} transfer count`).toHaveLength(1);
    const transfer = transfers[0];
    expect(Number.isFinite(transfer.answer), `${id} transfer finite`).toBe(true);
    if ("answer" in problem!) {
      expect(transfer.answer, `${id} transfer must differ from original`).not.toBe(problem!.answer);
    }
    expect(transfer.prompt.trim(), id).toBeTruthy();
    expect(transfer.solution?.trim(), id).toBeTruthy();
    expect(() => katex.renderToString(transfer.solution!, { throwOnError: true, strict: "error" }), `${id}/transfer`).not.toThrow();
    if (transfer.promptFormula) {
      expect(() => katex.renderToString(transfer.promptFormula!, { throwOnError: true, strict: "error" }), `${id}/transferPrompt`).not.toThrow();
    }
  }

  expect(totalChecks).toBe(expectedCheckCount);
  for (const [slot, count] of counts.entries()) {
    const share = count / totalChecks;
    expect(share, `slot ${slot} share (${count}/${totalChecks})`).toBeGreaterThanOrEqual(0.2);
    expect(share, `slot ${slot} share (${count}/${totalChecks})`).toBeLessThanOrEqual(0.5);
  }
}

describe("Chapter 3 Remaining 97 Problems (§3.5–§3.8, Core, Review) ELI5 Pedagogy Gate", () => {
  it("reaches 100% coverage across all 195 Chapter 3 problems in formulaIds, guidedHints, and ELI5 teaching", () => {
    expect(milestone1Ids).toHaveLength(52);
    expect(milestone2Ids).toHaveLength(45);
    expect(new Set(allNewIds).size).toBe(97);

    const ch3Problems = problems.filter((p) => p.chapter === 3);
    expect(ch3Problems).toHaveLength(195);
    for (const p of ch3Problems) {
      expect(p.formulaIds?.length ?? 0, `${p.id} missing formulaIds`).toBeGreaterThan(0);
      expect(p.guidedHints?.length ?? 0, `${p.id} missing guidedHints`).toBeGreaterThanOrEqual(3);
      expect(teachingByProblem[p.id], `${p.id} missing ELI5`).toBeDefined();
    }
  });

  it("enforces strict P0 quality across Milestone 1 (52 problems: §3.5, §3.6, Ch3 core)", () => {
    verifyPedagogyBatch(milestone1Ids, 104);
  });

  it("enforces strict P0 quality across Milestone 2 (45 problems: §3.7, §3.8, Review)", () => {
    verifyPedagogyBatch(milestone2Ids, 90);
  });

  it("enforces combined slot balance and strict KaTeX across all 97 new problems", () => {
    verifyPedagogyBatch(allNewIds, 194);
  });
});

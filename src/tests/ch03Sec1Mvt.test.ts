import katex from "katex";
import { describe, expect, it } from "vitest";
import { parseAnswer, problems } from "../data/learning";
import { formulaById } from "../data/formulas";
import { guidedHintsById } from "../data/guidedHints";
import { ch3Sec1GuidedHints } from "../data/guidedHints/ch3Sec1";
import { chapterThreeSec1MvtTeaching } from "../data/eli5Drafts/ch03Sec1Mvt";
import { chainRuleRemediationModule } from "../data/eli5Drafts/chainRuleRemediation";
import {
  remediationModulesById,
  resolveRemediationForObstacle,
} from "../data/eli5Drafts/remediationModules";

const expectedSec1Ids = [
  "p19",
  "p20",
  "p134",
  "p181",
  "p216",
  "p217",
  "jc935-3-1-1",
  "jc935-3-1-2",
  "jc935-3-1-3",
  "jc935-3-1-4",
  "jc935-3-1-5",
  "jc935-3-1-6",
  "jc935-3-1-7",
  "jc935-3-1-8",
  "jc935-3-1-9",
  "jc935-3-1-10",
  "jc935-3-1-11-1",
  "jc935-3-1-11-2",
  "jc935-3-1-12",
  "jc935-3-1-13",
  "jc935-3-1-14",
  "jc935-3-1-15",
] as const;

const problemById = new Map(problems.map((problem) => [problem.id, problem]));
const normalizeText = (value: string) => value.normalize("NFKC").replace(/\s+/g, "").trim();

describe("Chapter 3 Section 3.1 (MVT) guidedHints & ELI5 pedagogy gate", () => {
  it("covers all 22 Section 3.1 exercises in both guidedHints and ELI5 teaching", () => {
    expect(Object.keys(ch3Sec1GuidedHints).sort()).toEqual([...expectedSec1Ids].sort());
    expect(Object.keys(chapterThreeSec1MvtTeaching).sort()).toEqual([...expectedSec1Ids].sort());

    for (const id of expectedSec1Ids) {
      const problem = problemById.get(id);
      expect(problem, id).toBeDefined();
      expect(problem?.lessonId, id).toBe("mvt");
      expect(problem?.formulaIds?.length ?? 0, id).toBeGreaterThan(0);
      expect(problem?.formulaIds?.every((formulaId) => formulaById.has(formulaId)), id).toBe(true);
      expect(guidedHintsById[id]?.length ?? 0, `${id} guidedHints`).toBeGreaterThanOrEqual(3);

      for (const hint of ch3Sec1GuidedHints[id]) {
        expect(hint.change.trim(), id).toBeTruthy();
        expect(hint.text.trim(), id).toBeTruthy();
        expect(() => katex.renderToString(hint.formula, { throwOnError: true, strict: "error" }), id).not.toThrow();
      }
    }
  });

  it("reconciles exact runtime lessonId='mvt' partition (51 total = 22 Section 3.1 + 29 non-3.1)", () => {
    const allMvtIds = problems.filter((p) => p.lessonId === "mvt").map((p) => p.id);
    const sec1Set = new Set<string>(expectedSec1Ids);
    const nonSec1Ids = allMvtIds.filter((id) => !sec1Set.has(id));

    expect(allMvtIds).toHaveLength(51);
    expect(expectedSec1Ids).toHaveLength(22);
    expect(nonSec1Ids).toHaveLength(29);
    for (const id of expectedSec1Ids) {
      expect(allMvtIds).toContain(id);
    }
  });

  it("enforces P0 choice balance (allowing natural consecutive repeats), affirmative-feedback alignment, non-spoiler numeric checks, and valid transfers", () => {
    const counts = [0, 0, 0];
    let totalChecks = 0;
    const affirmativePrefix = /^(对|找对了)/;

    for (const [id, lesson] of Object.entries(chapterThreeSec1MvtTeaching)) {
      const problem = problemById.get(id)!;
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

    expect(totalChecks).toBe(44);
    for (const [slot, count] of counts.entries()) {
      const share = count / totalChecks;
      expect(share, `slot ${slot} share (${count}/${totalChecks})`).toBeGreaterThanOrEqual(0.2);
      expect(share, `slot ${slot} share (${count}/${totalChecks})`).toBeLessThanOrEqual(0.5);
    }
  });

  it("validates the 3-step chain-rule prerequisite remediation module (P1-1)", () => {
    const affirmativePrefix = /^(对|找对了)/;
    expect(chainRuleRemediationModule.steps).toHaveLength(3);
    expect(() => katex.renderToString(chainRuleRemediationModule.solution, { throwOnError: true, strict: "error" })).not.toThrow();

    const slots = chainRuleRemediationModule.steps.map((s) => s.check?.correct);
    expect(slots).toEqual([0, 1, 2]);

    for (const step of chainRuleRemediationModule.steps) {
      expect(() => katex.renderToString(step.formula, { throwOnError: true, strict: "error" }), step.id).not.toThrow();
      const check = step.check!;
      expect(check.choices).toHaveLength(3);
      expect(check.feedback).toHaveLength(3);
      for (let i = 0; i < 3; i++) {
        expect(affirmativePrefix.test(check.feedback[i].trim()), `${step.id}/${i}`).toBe(i === check.correct);
      }
    }

    const transfer = chainRuleRemediationModule.steps[2].transfer!;
    expect(transfer.answer).toBe(-0.5);
    expect(() => katex.renderToString(transfer.solution!, { throwOnError: true, strict: "error" })).not.toThrow();

    // Obstacle-specific triggering: triggers on chain-rule/implicit obstacles only, never misfires on Rolle/MVT conditions
    expect(remediationModulesById["chain-rule"].lesson).toBe(chainRuleRemediationModule);
    expect(resolveRemediationForObstacle({ stepId: "p181-2" })?.id).toBe("chain-rule");
    expect(resolveRemediationForObstacle({ stepId: "jc935-3-1-6-1" })?.id).toBe("chain-rule");
    expect(resolveRemediationForObstacle({ errorTag: "chain_rule" })?.id).toBe("chain-rule");
    expect(resolveRemediationForObstacle({ errorTag: "implicit_derivative" })?.id).toBe("chain-rule");
    expect(resolveRemediationForObstacle({ stepId: "p20-1" })).toBeUndefined();
    expect(resolveRemediationForObstacle({ stepId: "p19-1" })).toBeUndefined();
    expect(resolveRemediationForObstacle({ errorTag: "mean_value_theorem" })).toBeUndefined();
  });
});

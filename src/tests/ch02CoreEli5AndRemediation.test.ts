import { problems, teachingByProblem } from "./bankFixture";
import katex from "katex";
import { describe, expect, it } from "vitest";
import { parseAnswer } from "../data/learning";
import {
  remediationModulesById,
  resolveRemediationForObstacle,
} from "../data/remediation/remediationModules";

const expectedCh2CoreIds = [
  "p11", "p12", "p13", "p14", "p15", "p16", "p18", "p40", "p41", "p129",
  "p130", "p131", "p132", "p133", "p175", "p176", "p177", "p178", "p179", "p180",
  "p213", "p214", "p215",
  "jc935-2-2-6-1", "jc935-2-2-6-3", "jc935-2-2-6-4", "jc935-2-2-6-5", "jc935-2-2-6-8", "jc935-2-2-6-10", "jc935-2-2-10-1",
  "jc935-2-3-1-1", "jc935-2-3-1-2", "jc935-2-3-1-4", "jc935-2-3-1-6", "jc935-2-3-2", "jc935-2-3-9-1",
  "jc935-2-4-1-1", "jc935-2-4-1-2", "jc935-2-4-1-3", "jc935-2-4-1-4", "jc935-2-4-5-1", "jc935-2-4-5-3", "jc935-2-4-6-1", "jc935-2-4-9-1",
  "jc935-2-5-1-2", "jc935-2-5-4-4", "jc935-2-5-4-6", "jc935-2-5-7-1", "jc935-2-5-8-1", "jc935-2-5-9-1",
] as const;

const problemById = new Map(problems.map((p) => [p.id, p]));
const normalizeText = (value: string) => value.normalize("NFKC").replace(/\s+/g, "").trim();

describe("Chapter 2 Core 50 Hands-On ELI5 & Extended Remediation Gate", () => {
  it("enforces 2-check 3-choice hands-on ELI5 quality, balanced slots, non-spoiler numeric checks, strict KaTeX, and valid transfers across all 50 upgraded Ch2 problems", () => {
    const counts = [0, 0, 0];
    let totalChecks = 0;
    const affirmativePrefix = /^(对|找对了)/;

    for (const id of expectedCh2CoreIds) {
      const problem = problemById.get(id);
      const lesson = teachingByProblem[id];
      expect(problem, id).toBeDefined();
      expect(lesson, id).toBeDefined();
      expect(lesson!.steps, id).toHaveLength(3);

      if ("answer" in problem!) {
        expect(lesson!.referenceAnswer, id).toBe(problem!.answer);
      }

      expect(() => katex.renderToString(lesson!.solution, { throwOnError: true, strict: "error" }), `${id}/solution`).not.toThrow();

      for (const step of lesson!.steps) {
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
          const msg = check.feedback[i].trim();
          expect(affirmativePrefix.test(msg), `${id}/${step.id}/${i}`).toBe(i === check.correct);
        }

        if ("answer" in problem!) {
          const parsed = parseAnswer(check.choices[check.correct]);
          if (parsed !== null) {
            expect(
              Math.abs(parsed - problem!.answer) <= 1e-6,
              `${id}/${step.id} check leaks original numeric answer ${problem!.answer}`,
            ).toBe(false);
          }
        }
      }

      const transfers = lesson!.steps.flatMap((s) => (s.transfer ? [s.transfer] : []));
      expect(transfers, `${id} transfer count`).toHaveLength(1);
      const transfer = transfers[0];
      expect(Number.isFinite(transfer.answer), `${id} transfer finite`).toBe(true);
      if ("answer" in problem!) {
        expect(transfer.answer, `${id} transfer must differ from original`).not.toBe(problem!.answer);
      }
      expect(() => katex.renderToString(transfer.solution!, { throwOnError: true, strict: "error" }), `${id}/transfer`).not.toThrow();
    }

    expect(totalChecks).toBe(100);
    for (const [slot, count] of counts.entries()) {
      const share = count / totalChecks;
      expect(share, `slot ${slot} share (${count}/${totalChecks})`).toBeGreaterThanOrEqual(0.2);
      expect(share, `slot ${slot} share (${count}/${totalChecks})`).toBeLessThanOrEqual(0.5);
    }
  });

  it("validates all 3 prerequisite remediation modules (chain-rule, rolle-conditions, lagrange-mvt) and precise obstacle routing", () => {
    const affirmativePrefix = /^(对|找对了)/;
    const moduleIds = Object.keys(remediationModulesById);
    expect(moduleIds).toEqual(["chain-rule", "rolle-conditions", "lagrange-mvt"]);

    for (const mod of Object.values(remediationModulesById)) {
      expect(mod.lesson.steps, mod.id).toHaveLength(3);
      expect(() => katex.renderToString(mod.lesson.solution, { throwOnError: true, strict: "error" }), mod.id).not.toThrow();
      const slots = mod.lesson.steps.map((s) => s.check?.correct);
      expect(slots, mod.id).toEqual([0, 1, 2]);

      for (const step of mod.lesson.steps) {
        expect(() => katex.renderToString(step.formula, { throwOnError: true, strict: "error" }), step.id).not.toThrow();
        const check = step.check!;
        expect(check.choices).toHaveLength(3);
        expect(check.feedback).toHaveLength(3);
        for (let i = 0; i < 3; i++) {
          expect(affirmativePrefix.test(check.feedback[i].trim()), `${step.id}/${i}`).toBe(i === check.correct);
        }
      }

      const transfer = mod.lesson.steps[2].transfer!;
      expect(Number.isFinite(transfer.answer), `${mod.id} transfer`).toBe(true);
      expect(() => katex.renderToString(transfer.solution!, { throwOnError: true, strict: "error" }), `${mod.id} transfer`).not.toThrow();
    }

    // Ch2 implicit/chain obstacle routing
    expect(resolveRemediationForObstacle({ stepId: "p179-1" })?.id).toBe("chain-rule");
    expect(resolveRemediationForObstacle({ stepId: "p214-1" })?.id).toBe("chain-rule");
    expect(resolveRemediationForObstacle({ stepId: "jc935-2-4-1-1-1" })?.id).toBe("chain-rule");
    // Ch3 Rolle & Lagrange obstacle routing
    expect(resolveRemediationForObstacle({ stepId: "p20-1" })?.id).toBe("rolle-conditions");
    expect(resolveRemediationForObstacle({ stepId: "jc935-3-1-1-1" })?.id).toBe("rolle-conditions");
    expect(resolveRemediationForObstacle({ stepId: "jc935-3-1-9-1" })?.id).toBe("lagrange-mvt");
    expect(resolveRemediationForObstacle({ stepId: "jc935-3-1-14-1" })?.id).toBe("lagrange-mvt");
    // Non-obstacle steps must NOT misfire
    expect(resolveRemediationForObstacle({ stepId: "p19-1" })).toBeUndefined();
    expect(resolveRemediationForObstacle({ stepId: "p11-1" })).toBeUndefined();
  });
});

import katex from "katex";
import { describe, expect, it } from "vitest";
import plan from "../../docs/eli5-production/chapter-one.json";
import cases from "../../scripts/eli5-chapter-one-cases.json";
import { parseAnswer, problems } from "../data/learning";
import { initialTeachingProgress, teachingByProblem, type TeachingLesson } from "../data/teaching";

const chapterOneBatch01Drafts: Record<string, TeachingLesson> = Object.fromEntries(
  plan.items
    .filter((row) => row.batch === 1)
    .map(({ id }) => [id, teachingByProblem[id]!]),
);
const chapterOnePilotTeaching: Record<string, TeachingLesson> = Object.fromEntries(
  Object.keys(cases).map((id) => [id, teachingByProblem[id]!]),
);

const problemById = new Map(problems.map((problem) => [problem.id, problem]));

const normalizeText = (value: string) => value.normalize("NFKC").replace(/\s+/g, "").trim();

/**
 * Automated P0 data quality gate.
 *
 * Scope & explicit manual-review boundary:
 * - Automated checks verify structural integrity, deterministic ordering, duplicate choice text,
 *   missing/blank feedback, affirmative/distractor feedback alignment, and known spoiler patterns.
 * - Automated checks CANNOT judge the mathematical nuance of distractor explanations or true
 *   learning effectiveness (balanced choice slots prevent mechanical guessing only; they are NOT
 *   evidence of learning effectiveness). Those remain flagged for human pedagogical review.
 */
describe("ELI5 P0 quality gate", () => {
  it("keeps deterministic, balanced choice ordering across Batch 1 without polluting TeachingProgress", () => {
    const counts = [0, 0, 0];
    let totalChecks = 0;

    for (const [id, lesson] of Object.entries(chapterOneBatch01Drafts)) {
      let prevCorrect: number | null = null;
      for (const step of lesson.steps) {
        if (!step.check) continue;
        totalChecks += 1;
        expect(step.check.choices).toHaveLength(3);
        expect(step.check.correct).toBeGreaterThanOrEqual(0);
        expect(step.check.correct).toBeLessThan(3);
        counts[step.check.correct] += 1;
        if (prevCorrect !== null) {
          expect(step.check.correct, `${id}/${step.id} should not repeat previous slot`).not.toBe(prevCorrect);
        }
        prevCorrect = step.check.correct;
      }
    }

    expect(totalChecks).toBe(63);
    // Guard against fixed-slot bias (not a claim of learning effectiveness)
    for (const [slot, count] of counts.entries()) {
      const share = count / totalChecks;
      expect(share, `slot ${slot} share (${count}/${totalChecks})`).toBeGreaterThanOrEqual(0.2);
      expect(share, `slot ${slot} share (${count}/${totalChecks})`).toBeLessThanOrEqual(0.5);
    }

    // Legacy learning-record compatibility: TeachingProgress stores no choice-shuffle metadata
    expect(Object.keys(initialTeachingProgress).sort()).toEqual([
      "checksPassed",
      "checksSkipped",
      "stepsSeen",
      "wrongChecks",
    ]);
  });

  it("forbids duplicate choice texts, blank/missing feedback, and misaligned answer-feedback mapping across all 41 Ch1 lessons + p17", () => {
    const auditedLessons = [
      ...Object.entries(chapterOneBatch01Drafts),
      ...Object.entries(chapterOnePilotTeaching),
      ["p8", teachingByProblem.p8!],
      ["p17", teachingByProblem.p17!],
    ] as const;

    const affirmativePrefix = /^(对|找对了)/;

    for (const [id, lesson] of auditedLessons) {
      for (const step of lesson.steps) {
        const check = step.check;
        if (!check) continue;

        // No empty or duplicate choice texts (even after NFKC / whitespace normalization)
        const normalizedChoices = check.choices.map(normalizeText);
        expect(normalizedChoices.every(Boolean), `${id}/${step.id} has blank choice`).toBe(true);
        expect(new Set(normalizedChoices).size, `${id}/${step.id} has duplicate choice text`).toBe(check.choices.length);

        // No missing, blank, or duplicate feedback strings
        expect(check.feedback, `${id}/${step.id} feedback length mismatch`).toHaveLength(check.choices.length);
        const normalizedFeedback = check.feedback.map(normalizeText);
        expect(normalizedFeedback.every(Boolean), `${id}/${step.id} has blank feedback`).toBe(true);
        expect(new Set(normalizedFeedback).size, `${id}/${step.id} has duplicate feedback`).toBe(check.choices.length);

        // Affirmative confirmation must align strictly with the correct choice index
        for (let i = 0; i < check.choices.length; i++) {
          const message = check.feedback[i].trim();
          if (i === check.correct) {
            expect(affirmativePrefix.test(message), `${id}/${step.id} correct feedback must confirm`).toBe(true);
          } else {
            expect(affirmativePrefix.test(message), `${id}/${step.id} distractor ${i} must not confirm`).toBe(false);
          }
        }
      }
    }
  });

  it("prevents Batch 1 numeric lessons from asking the original final answer in their final check", () => {
    for (const [id, lesson] of Object.entries(chapterOneBatch01Drafts)) {
      const problem = problemById.get(id);
      if (!problem || !("answer" in problem)) continue;
      const lastStep = lesson.steps.at(-1);
      const check = lastStep?.check;
      if (!check) continue;
      const correctChoice = check.choices[check.correct];
      const parsed = parseAnswer(correctChoice);
      if (parsed !== null) {
        expect(
          Math.abs(parsed - problem.answer) <= 1e-6,
          `${id}/${lastStep.id} final check "${correctChoice}" leaks original answer ${problem.answer}`,
        ).toBe(false);
      }
    }
  });

  it("eliminates known P0 plain-text spoilers before understanding checks", () => {
    const forbiddenBeforeCheck: ReadonlyArray<readonly [id: string, stepIndex: number, snippet: string]> = [
      ["p168", 0, "0/8=0"],
      ["jc935-1-8-3-4", 1, "跳跃间断点"],
      ["jc935-1-8-3-4", 1, "左连续"],
      ["jc935-1-8-3-1", 2, "无穷间断点"],
      ["p172", 0, "1+x+x²+x³"],
      ["p172", 1, "趋于 4"],
      ["p171", 0, "3x"],
      ["p171", 1, "9x²"],
      ["p170", 0, "等于每对的和 n"],
      ["p39", 0, "3 减去 1/n"],
      ["p165", 0, "严格大于 0"],
      ["p166", 0, "−1 和 1 之间"],
      ["jc935-1-5-1-9", 0, "(−5)×(−2)"],
    ];

    for (const [id, stepIndex, snippet] of forbiddenBeforeCheck) {
      const lesson = chapterOneBatch01Drafts[id as keyof typeof chapterOneBatch01Drafts];
      const step = lesson.steps[stepIndex];
      expect(step.plain, `${id}/${step.id} plain should not spoil "${snippet}"`).not.toContain(snippet);
    }
  });

  it("verifies zero-limit transfers stay algebraically authentic with reasoning checks, and p171 stays non-degenerate", () => {
    const zeroLimitIds = ["jc935-1-5-1-2", "jc935-1-5-1-3", "jc935-1-5-1-8"] as const;

    for (const id of zeroLimitIds) {
      const lesson = teachingByProblem[id];
      expect(lesson, id).toBeDefined();
      const lastStep = lesson!.steps.at(-1)!;
      const transfer = lastStep.transfer;
      expect(transfer, id).toBeDefined();
      expect(transfer?.answer, id).toBe(0);
      // No artificial constant padding like "2 + (...)"
      expect(transfer?.prompt, `${id} should not pad with artificial leading constant`).not.toMatch(/\b\d+\s*\+\s*\(/);
      // Step 2 must use a reasoning check (not a trivial "0" numeric choice) to prevent blind guessing
      expect(lastStep.check?.choices[lastStep.check.correct], `${id} step 2 check should test reasoning`).not.toBe("0");
      expect(() => katex.renderToString(transfer!.solution!, { throwOnError: true, strict: "error" })).not.toThrow();
    }

    const p171Transfer = teachingByProblem.p171?.steps.find((step) => step.transfer)?.transfer;
    expect(p171Transfer?.answer).toBe(16);
    expect(p171Transfer?.prompt).toContain("cos(8x)");
    expect(p171Transfer?.prompt).toContain("sin(2x)");
    expect(() => katex.renderToString(p171Transfer!.solution!, { throwOnError: true, strict: "error" })).not.toThrow();
  });
});

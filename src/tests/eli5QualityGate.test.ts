import katex from "katex";
import { describe, expect, it } from "vitest";
import { parseAnswer, problems } from "../data/learning";
import { chapterOneBatch01Drafts } from "../data/eli5Drafts/ch01Batch01";
import { teachingByProblem } from "../data/teaching";

const problemById = new Map(problems.map((problem) => [problem.id, problem]));

describe("ELI5 P0 quality gate", () => {
  it("distributes correct choice indices evenly across Batch 1 without consecutive repeats", () => {
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
    // No single position may dominate (>= 50%) or starve (< 20%)
    for (const [slot, count] of counts.entries()) {
      const share = count / totalChecks;
      expect(share, `slot ${slot} share (${count}/${totalChecks})`).toBeGreaterThanOrEqual(0.2);
      expect(share, `slot ${slot} share (${count}/${totalChecks})`).toBeLessThanOrEqual(0.5);
    }
  });

  it("keeps correct-choice and distractor-feedback mapping aligned after deterministic ordering", () => {
    for (const [id, lesson] of Object.entries(chapterOneBatch01Drafts)) {
      for (const step of lesson.steps) {
        const check = step.check;
        if (!check) continue;
        expect(check.feedback).toHaveLength(check.choices.length);
        for (let i = 0; i < check.choices.length; i++) {
          const message = check.feedback[i].trim();
          expect(message, `${id}/${step.id} choice ${i}`).toBeTruthy();
          if (i === check.correct) {
            expect(message.startsWith("对"), `${id}/${step.id} correct feedback must confirm`).toBe(true);
          } else {
            expect(message.startsWith("对"), `${id}/${step.id} distractor ${i} must not confirm`).toBe(false);
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

  it("verifies P0 repaired transfer items are non-degenerate and render cleanly in strict KaTeX", () => {
    const expectedTransfers: Record<string, number> = {
      "jc935-1-5-1-2": 2,
      "jc935-1-5-1-3": 5,
      "jc935-1-5-1-8": 4,
      p171: 16,
    };

    for (const [id, expectedAnswer] of Object.entries(expectedTransfers)) {
      const lesson = teachingByProblem[id];
      expect(lesson, id).toBeDefined();
      const transfer = lesson?.steps.find((step) => step.transfer)?.transfer;
      expect(transfer, id).toBeDefined();
      expect(transfer?.answer, id).toBe(expectedAnswer);
      expect(transfer?.answer, `${id} transfer must not be blind-0`).not.toBe(0);
      expect(transfer?.solution, id).toBeTruthy();
      expect(() => katex.renderToString(transfer!.solution!, { throwOnError: true, strict: "error" })).not.toThrow();
    }

    // Verify p171 transfer preserves non-canceling angles (8x vs 2x)
    const p171Transfer = teachingByProblem.p171?.steps.find((step) => step.transfer)?.transfer;
    expect(p171Transfer?.prompt).toContain("cos(8x)");
    expect(p171Transfer?.prompt).toContain("sin(2x)");
  });
});

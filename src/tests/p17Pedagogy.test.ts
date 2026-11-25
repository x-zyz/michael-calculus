import { problems, teachingByProblem } from "./bankFixture";
import katex from "katex";
import { expect, it } from "vitest";



it("p17 teaches condition-to-formula mapping (x0, Delta x -> dx) without leaking the transfer answer", () => {
  const problem = problems.find((item) => item.id === "p17");
  const lesson = teachingByProblem.p17;

  expect(problem).toBeDefined();
  expect(lesson).toBeDefined();
  if (!lesson || !problem || !("answer" in problem)) return;

  expect(problem.answer).toBe(0.4);
  expect(lesson.referenceAnswer).toBe(0.4);
  expect(lesson.steps).toHaveLength(4);

  const combinedText = [
    lesson.target ?? "",
    ...(lesson.prerequisites ?? []),
    ...lesson.steps.flatMap((step) => [step.goal, step.plain, step.detail]),
  ].join("\n");

  expect(combinedText).toContain("dx = Δx");
  expect(combinedText).toContain("x₀=2");
  expect(combinedText).toContain("Δx=0.1");
  expect(combinedText).toContain("Δy");

  const transferStep = lesson.steps.find((step) => step.transfer);
  expect(transferStep?.transfer).toBeDefined();
  if (transferStep?.transfer) {
    expect(transferStep.transfer.answer).toBe(0.6);
    expect(transferStep.transfer.promptFormula).toContain("x=3");
    expect(transferStep.transfer.promptFormula).toContain("dx=0.1");
    // Ensure transfer answer 0.6 is never leaked before submission
    const preTransferText = [
      transferStep.goal,
      transferStep.plain,
      transferStep.transfer.prompt,
      transferStep.transfer.promptFormula ?? "",
      transferStep.transfer.remediation,
    ].join("\n");
    expect(preTransferText).not.toContain("0.6");
  }

  // Ensure every step formula, solution, and transfer formula renders cleanly in strict KaTeX
  for (const formula of [
    lesson.solution,
    ...lesson.steps.map((step) => step.formula),
    transferStep?.transfer?.promptFormula,
    transferStep?.transfer?.solution,
  ]) {
    if (!formula) continue;
    expect(() => katex.renderToString(formula, { throwOnError: true, strict: "error" })).not.toThrow();
  }
});

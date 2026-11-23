import { problems } from "../learning";
import type { TeachingLesson, TeachingTransfer } from "../teaching";

type Check = readonly [question: string, right: string, wrong: string, reason: string, prerequisite: string];
type Transfer = readonly [prompt: string, answer: number, solution: string, hint: string];
export type GuidedTeachingRow = readonly [id: string, strategy: string, check: Check, transfer: Transfer];

const bank = new Map(problems.map((problem) => [problem.id, problem]));

export function createGuidedTeaching(rows: readonly GuidedTeachingRow[]): Record<string, TeachingLesson> {
  return Object.fromEntries(rows.map(([id, strategy, check, transfer], rowIndex) => {
    const problem = bank.get(id);
    if (!problem?.guidedHints?.length) throw new Error(`Missing guided solution for ${id}`);
    const [question, right, wrong, reason, prerequisite] = check;
    const [prompt, answer, solution, hint] = transfer;
    const alternate = rowIndex % 2 === 1;
    const practice: TeachingTransfer = {
      prompt,
      answer,
      solution,
      signFeedback: hint,
      remediation: hint,
    };

    return [id, {
      target: problem.title,
      strategy,
      prerequisites: [prerequisite],
      ...("answer" in problem ? { referenceAnswer: problem.answer } : {}),
      solution: "solution" in problem ? problem.solution : problem.guidedHints.at(-1)!.formula,
      solutionExplanation: problem.explanation,
      solutionSteps: "steps" in problem ? problem.steps : undefined,
      steps: problem.guidedHints.map(({ change, text, formula }, index, steps) => ({
        id: `${id}-${index + 1}`,
        goal: index === 0 ? "确定解题依据" : change,
        plain: index === 0 ? "先对照原题，判断从哪条关系开始推导。" : text,
        formula,
        detail: index === 0 ? text : "",
        ...(index === 0 && { check: {
          prompt: question,
          choices: alternate ? [wrong, right] : [right, wrong],
          correct: alternate ? 1 : 0,
          feedback: alternate ? [prerequisite, reason] : [reason, prerequisite],
          prerequisite,
        } }),
        ...(index === steps.length - 1 && { transfer: practice }),
      })),
    } satisfies TeachingLesson];
  }));
}

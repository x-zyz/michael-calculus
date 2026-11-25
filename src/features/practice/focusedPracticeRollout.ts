import type { UnifiedProblem } from "../../data/bank";

export const firstFocusedPracticeBatch = new Set([
  "p8", "p37", "p128", "p173", "p6", "p169",
  "jc935-1-5-1-5", "jc935-1-6-2-2", "jc935-1-8-3-1", "jc935-1-8-3-4",
]);

export function focusedPracticeLesson(problem: UnifiedProblem) {
  return problem.teaching;
}

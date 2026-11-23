import { lessons, type Problem } from "../../data/learning";
import { teachingByProblem, type TeachingLesson } from "../../data/teaching";

export const firstFocusedPracticeBatch = new Set([
  "p8", "p37", "p128", "p173", "p6", "p169",
  "jc935-1-5-1-5", "jc935-1-6-2-2", "jc935-1-8-3-1", "jc935-1-8-3-4",
]);

const rolloutLessons = new Set(lessons
  .filter(({ chapter }) => chapter === 1 || chapter === 2)
  .map(({ id }) => id));

export function focusedPracticeLesson(problem: Problem): TeachingLesson | undefined {
  return rolloutLessons.has(problem.lessonId) ? teachingByProblem[problem.id] : undefined;
}

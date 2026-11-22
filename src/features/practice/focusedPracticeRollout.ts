import { lessons, type Problem } from "../../data/learning";
import { teachingByProblem } from "../../data/teaching";

export const firstFocusedPracticeBatch = new Set([
  "p8", "p37", "p128", "p173", "p6", "p169",
  "jc935-1-5-1-5", "jc935-1-6-2-2", "jc935-1-8-3-1", "jc935-1-8-3-4",
]);

const chapterOne = new Set(lessons.filter((lesson) => lesson.chapter === 1).map((lesson) => lesson.id));

export function focusedPracticeLesson(problem: Problem) {
  return chapterOne.has(problem.lessonId) ? teachingByProblem[problem.id] : undefined;
}

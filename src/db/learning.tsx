import { createContext, useContext, useState, type ReactNode } from "react";
import { lessons } from "../data/learning";
import { problemIndexById } from "../data/bank";
import { firstLessonId } from "../data/textbookSections";
import type { TeachingProgress } from "../data/teaching";
export interface Attempt {
  problemId: string;
  correct: boolean;
  answer: string;
  at: string;
  hints: number;
  teaching?: TeachingProgress;
}
export interface LearningState {
  completed: string[];
  attempts: Attempt[];
  lastLesson: string;
}
const empty: LearningState = {
  completed: [],
  attempts: [],
  lastLesson: firstLessonId,
};
export const learningKey = "mc-learning-v1";
function read(): LearningState {
  try {
    const x = JSON.parse(localStorage.getItem(learningKey) || "null");
    if (!x) return empty;
    return {
      completed: Array.isArray(x.completed)
        ? x.completed.filter((id: unknown) => lessons.some((l) => l.id === id))
        : [],
      lastLesson: lessons.some((l) => l.id === x.lastLesson)
        ? x.lastLesson
        : "limit",
      attempts: Array.isArray(x.attempts)
        ? x.attempts
            .filter(
              (a: Attempt) =>
                a &&
                problemIndexById.has(a.problemId) &&
                typeof a.correct === "boolean" &&
                typeof a.answer === "string" &&
                typeof a.at === "string" &&
                Number.isFinite(a.hints),
            )
            .slice(-500)
        : [],
    };
  } catch {
    return empty;
  }
}
const Context = createContext<{
  state: LearningState;
  save: (s: LearningState) => void;
  storageError: boolean;
} | null>(null);
export function LearningProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(read);
  const [storageError, setStorageError] = useState(() => {
    try {
      localStorage.getItem(learningKey);
      return false;
    } catch {
      return true;
    }
  });
  function save(next: LearningState) {
    setState(next);
    try {
      localStorage.setItem(learningKey, JSON.stringify(next));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }
  return (
    <Context.Provider value={{ state, save, storageError }}>
      {children}
    </Context.Provider>
  );
}
// Shared context hook is kept with its provider for this small feature.
// eslint-disable-next-line react-refresh/only-export-components
export function useLearning() {
  const value = useContext(Context);
  if (!value) throw new Error("Missing learning provider");
  return value;
}

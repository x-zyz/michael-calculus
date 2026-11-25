import { useEffect, useState } from "react";
import { getLoadedProblem, loadProblemById } from ".";
import type { UnifiedProblem } from "./schema";

export function useBankProblem(id: string | undefined) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<{ id: string; attempt: number; problem?: UnifiedProblem }>();
  const cached = id ? getLoadedProblem(id) : undefined;
  const current = result?.id === id && result?.attempt === attempt ? result : undefined;

  useEffect(() => {
    if (!id || cached || current) return;
    let active = true;
    void loadProblemById(id).then(
      (problem) => { if (active) setResult({ id, attempt, problem }); },
      () => { if (active) setResult({ id, attempt }); },
    );
    return () => { active = false; };
  }, [id, cached, attempt, current]);

  const problem = cached ?? current?.problem;
  return {
    problem,
    failed: Boolean(current && !problem),
    retry: () => setAttempt((value) => value + 1),
  };
}

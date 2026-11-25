
export interface TeachingProgress {
  stepsSeen: number;
  checksPassed: number;
  checksSkipped: number;
  wrongChecks: number;
  transfer?: { firstResult: "correct" | "incorrect" | "skipped"; resolved: boolean };
}

export const initialTeachingProgress: TeachingProgress = {
  stepsSeen: 1, checksPassed: 0, checksSkipped: 0, wrongChecks: 0,
};

export interface TeachingCheck {
  prompt: string;
  choices: string[];
  correct: number;
  feedback: string[];
  prerequisite: string;
}

export interface TeachingTransfer {
  prompt: string;
  promptFormula?: string;
  answer: number;
  signFeedback: string;
  remediation: string;
  solution?: string;
}

export interface TeachingStep {
  id: string;
  goal: string;
  formula: string;
  plain: string;
  detail: string;
  check?: TeachingCheck;
  transfer?: TeachingTransfer;
}

export interface TeachingLesson {
  steps: TeachingStep[];
  solution: string;
  solutionExplanation?: string;
  solutionSteps?: readonly string[];
  target?: string;
  prerequisites?: string[];
  strategy?: string;
  referenceAnswer?: number;
}

export function p8Diagnostic(value: number) {
  if (value === 6) return "有可能是配分母时漏了负号。用下面的小题检查。";
  if (value === -3) return "有可能漏乘了原来的分子 2。用下面的小题检查。";
  return "先用下面的小题检查配分母，再把同一个方法用到原来的指数。";
}

export function teachingEvidence(attempts: readonly {
  problemId: string; correct: boolean; hints: number; at: string;
}[], problemId: string) {
  const matching = attempts.filter((attempt) => attempt.problemId === problemId);
  const latest = matching.at(-1);
  if (!latest) return "未尝试";
  if (!latest.correct) return "待复习";
  if (latest.hints > 0) return "提示辅助完成";
  const previous = matching.slice(0, -1).reverse().find((attempt) => attempt.correct && attempt.hints === 0);
  if (previous && Date.parse(latest.at) - Date.parse(previous.at) >= 86400000) return "延迟复习成功";
  return "独立完成";
}

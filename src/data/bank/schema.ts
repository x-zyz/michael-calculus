import type { ChapterId, GuidedHint, PracticeDifficulty } from "../learning";
import type { TeachingLesson } from "../teaching";

export interface ProblemMeta {
  /** 一句话通俗昵称，便于学生按印象检索 */
  nickname?: string;
  /** 核心定理标签（如 ["拉格朗日中值定理", "链式法则"]） */
  theorems?: string[];
  /** 解题套路标签（如 ["取对数降幂", "通分合并"]） */
  techniques?: string[];
  /** 是否易错坑题 */
  isTrap?: boolean;
  /** 一句话避坑提示 */
  trapNote?: string;
}

export interface UnifiedProblemBase {
  id: string;
  chapter: ChapterId;
  lessonId: string;
  title: string;
  formula: string;
  hints: string[];
  guidedHints?: GuidedHint[];
  explanation: string;
  errorTag: string;
  errorLabel: string;
  difficulty?: PracticeDifficulty;
  formulaIds?: string[];
  source?: string;
  commonMistake?: string;
  teaching?: TeachingLesson;
  meta?: ProblemMeta;
}

export interface UnifiedNumericProblem extends UnifiedProblemBase {
  answer: number;
  unit?: string;
}

export interface UnifiedWrittenProblem extends UnifiedProblemBase {
  kind: "推导题" | "证明题" | "概念题" | "应用题";
  prompt: string;
  steps: string[];
  solution: string;
}

export type UnifiedProblem = UnifiedNumericProblem | UnifiedWrittenProblem;

export interface ProblemIndexEntry {
  id: string;
  ch: ChapterId;
  lessonId: string;
  title: string;
  source?: string;
  kind: "数值题" | "推导题" | "证明题" | "概念题" | "应用题";
  difficulty: PracticeDifficulty;
  errorTag: string;
  hasHints: boolean;
  hasEli5: boolean;
  formulaCount: number;
  nickname?: string;
  theorems?: string[];
  techniques?: string[];
  isTrap?: boolean;
  searchText: string;
}

export interface BankIndexFile {
  version: 1;
  total: number;
  order: string[];
  entries: ProblemIndexEntry[];
}

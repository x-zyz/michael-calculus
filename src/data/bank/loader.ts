import type { TeachingLesson } from "../teaching";
import type { UnifiedProblem } from "./schema";
import { problemIndex } from "./index";
import { attachProblemGraphs } from "./graphs";
import ch01 from "./ch01.json";
import ch02 from "./ch02.json";
import ch03 from "./ch03.json";
import ch04 from "./ch04.json";
import ch05 from "./ch05.json";
import ch06 from "./ch06.json";
import ch07 from "./ch07.json";
import ch08 from "./ch08.json";

const byId = new Map<string, UnifiedProblem>();
for (const list of [ch01, ch02, ch03, ch04, ch05, ch06, ch07, ch08] as unknown as UnifiedProblem[][]) {
  for (const item of list) {
    byId.set(item.id, attachProblemGraphs(item));
  }
}

/**
 * 同步全量题库视图（按派生索引的全局顺序组装），用于保持既有同步调用方与测试 100% 兼容。
 * 新页面/搜索筛选与按需加载请优先使用 `./index.ts` 的 `problemIndex`、`searchProblemIndex` 与 `loadChapter`。
 */
export const unifiedProblems: UnifiedProblem[] = problemIndex.map((entry) => byId.get(entry.id)!);

export const unifiedTeachingByProblem: Partial<Record<string, TeachingLesson>> = Object.fromEntries(
  unifiedProblems
    .filter((p): p is UnifiedProblem & { teaching: TeachingLesson } => Boolean(p.teaching))
    .map((p) => [p.id, p.teaching]),
);

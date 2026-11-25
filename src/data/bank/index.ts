import type { ChapterId } from "../learning";
import type { BankIndexFile, ProblemIndexEntry, UnifiedProblem } from "./schema";
import { attachProblemGraphs } from "./graphs";
import rawIndex from "./index.generated.json";

export type { BankIndexFile, ProblemIndexEntry, UnifiedProblem, ProblemMeta } from "./schema";

const indexData = rawIndex as unknown as BankIndexFile;

/** 轻量级全库搜索/筛选索引（构建期由 ch01..ch08.json 自动派生，同步可用） */
export const problemIndex: readonly ProblemIndexEntry[] = indexData.entries;
export const problemIndexById: ReadonlyMap<string, ProblemIndexEntry> = new Map(
  problemIndex.map((entry) => [entry.id, entry]),
);

const chapterCache = new Map<ChapterId, UnifiedProblem[]>();

const chapterImporters: Record<ChapterId, () => Promise<{ default: UnifiedProblem[] }>> = {
  1: () => import("./ch01.json") as unknown as Promise<{ default: UnifiedProblem[] }>,
  2: () => import("./ch02.json") as unknown as Promise<{ default: UnifiedProblem[] }>,
  3: () => import("./ch03.json") as unknown as Promise<{ default: UnifiedProblem[] }>,
  4: () => import("./ch04.json") as unknown as Promise<{ default: UnifiedProblem[] }>,
  5: () => import("./ch05.json") as unknown as Promise<{ default: UnifiedProblem[] }>,
  6: () => import("./ch06.json") as unknown as Promise<{ default: UnifiedProblem[] }>,
  7: () => import("./ch07.json") as unknown as Promise<{ default: UnifiedProblem[] }>,
  8: () => import("./ch08.json") as unknown as Promise<{ default: UnifiedProblem[] }>,
};

/** 按章异步懒加载完整题面（供 Vite 代码分割与按需加载） */
export async function loadChapter(chapter: ChapterId): Promise<readonly UnifiedProblem[]> {
  const cached = chapterCache.get(chapter);
  if (cached) return cached;
  const mod = await chapterImporters[chapter]();
  const hydrated = mod.default.map(attachProblemGraphs);
  chapterCache.set(chapter, hydrated);
  return hydrated;
}

/** 按题号异步加载单题完整数据（自动定位所属章节并缓存） */
export async function loadProblemById(id: string): Promise<UnifiedProblem | undefined> {
  const meta = problemIndexById.get(id);
  if (!meta) return undefined;
  const list = await loadChapter(meta.ch);
  return list.find((item) => item.id === id);
}

export interface ProblemSearchFilter {
  query?: string;
  chapter?: ChapterId;
  lessonId?: string;
  tag?: string;
  onlyEli5?: boolean;
  onlyHints?: boolean;
  onlyTrap?: boolean;
}

/** 基于轻量派生索引的即时搜索与多维筛选（零异步延迟） */
export function searchProblemIndex(filter: ProblemSearchFilter): ProblemIndexEntry[] {
  const q = filter.query?.trim().normalize("NFKC").toLowerCase() ?? "";
  const tokens = q ? q.split(/\s+/).filter(Boolean) : [];
  const tag = filter.tag?.trim().normalize("NFKC").toLowerCase();

  return problemIndex.filter((entry) => {
    if (filter.chapter !== undefined && entry.ch !== filter.chapter) return false;
    if (filter.lessonId && entry.lessonId !== filter.lessonId) return false;
    if (filter.onlyEli5 && !entry.hasEli5) return false;
    if (filter.onlyHints && !entry.hasHints) return false;
    if (filter.onlyTrap && !entry.isTrap) return false;
    if (tag) {
      const tagHit =
        entry.errorTag.toLowerCase() === tag ||
        entry.theorems?.some((t) => t.toLowerCase().includes(tag)) ||
        entry.techniques?.some((t) => t.toLowerCase().includes(tag));
      if (!tagHit) return false;
    }
    if (tokens.length > 0 && !tokens.every((tok) => entry.searchText.includes(tok))) {
      return false;
    }
    return true;
  });
}

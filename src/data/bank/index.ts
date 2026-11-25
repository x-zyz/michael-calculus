import type { ChapterId } from "../learning";
import type { BankIndexFile, ProblemIndexEntry, UnifiedProblem } from "./schema";
import { attachProblemGraphs } from "./graphs";
import rawIndex from "./index.generated.json" with { type: "json" };

export type { BankIndexFile, ProblemIndexEntry, UnifiedProblem, ProblemMeta } from "./schema";

const indexData = rawIndex as unknown as BankIndexFile;

/** 轻量级全库搜索/筛选索引（构建期由 ch01..ch08.json 自动派生，同步可用） */
export const problemIndex: readonly ProblemIndexEntry[] = indexData.entries;
export const problemIndexById: ReadonlyMap<string, ProblemIndexEntry> = new Map(
  problemIndex.map((entry) => [entry.id, entry]),
);

export const problemNumberById: ReadonlyMap<string, number> = new Map(
  problemIndex.map(({ id }, index) => [id, index + 1]),
);

const chapterCache = new Map<ChapterId, ReadonlyMap<string, UnifiedProblem>>();
const pendingChapters = new Map<ChapterId, Promise<ReadonlyMap<string, UnifiedProblem>>>();

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

function getChapter(chapter: ChapterId): Promise<ReadonlyMap<string, UnifiedProblem>> {
  const cached = chapterCache.get(chapter);
  if (cached) return Promise.resolve(cached);
  const pending = pendingChapters.get(chapter);
  if (pending) return pending;
  const request = chapterImporters[chapter]().then(({ default: problems }) => {
    const hydrated = new Map(problems.map((problem) => [problem.id, attachProblemGraphs(problem)]));
    chapterCache.set(chapter, hydrated);
    return hydrated;
  }).finally(() => pendingChapters.delete(chapter));
  pendingChapters.set(chapter, request);
  return request;
}

export async function loadChapter(chapter: ChapterId): Promise<readonly UnifiedProblem[]> {
  return [...(await getChapter(chapter)).values()];
}

export function getLoadedProblem(id: string): UnifiedProblem | undefined {
  const entry = problemIndexById.get(id);
  return entry && chapterCache.get(entry.ch)?.get(id);
}

export async function loadProblemById(id: string): Promise<UnifiedProblem | undefined> {
  const entry = problemIndexById.get(id);
  return entry && (await getChapter(entry.ch)).get(id);
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

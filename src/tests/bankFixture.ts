import type { TeachingLesson } from "../data/teaching";
import type { UnifiedProblem } from "../data/bank/schema";
import { problemIndex } from "../data/bank";
import { attachProblemGraphs } from "../data/bank/graphs";
import ch01 from "../data/bank/ch01.json" with { type: "json" };
import ch02 from "../data/bank/ch02.json" with { type: "json" };
import ch03 from "../data/bank/ch03.json" with { type: "json" };
import ch04 from "../data/bank/ch04.json" with { type: "json" };
import ch05 from "../data/bank/ch05.json" with { type: "json" };
import ch06 from "../data/bank/ch06.json" with { type: "json" };
import ch07 from "../data/bank/ch07.json" with { type: "json" };
import ch08 from "../data/bank/ch08.json" with { type: "json" };

const byId = new Map<string, UnifiedProblem>();
for (const list of [ch01, ch02, ch03, ch04, ch05, ch06, ch07, ch08] as unknown as UnifiedProblem[][]) {
  for (const item of list) {
    byId.set(item.id, attachProblemGraphs(item));
  }
}

export const problems: UnifiedProblem[] = problemIndex.map((entry) => byId.get(entry.id)!);

export const teachingByProblem: Partial<Record<string, TeachingLesson>> = Object.fromEntries(
  problems
    .filter((p): p is UnifiedProblem & { teaching: TeachingLesson } => Boolean(p.teaching))
    .map((p) => [p.id, p.teaching]),
);

export const expandedTeaching = teachingByProblem as Readonly<Record<string, TeachingLesson>>;

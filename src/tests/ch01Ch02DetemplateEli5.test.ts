import { problems, teachingByProblem } from "./bankFixture";
import katex from "katex";
import { describe, expect, it } from "vitest";

const ch1DetemplateIds = [
  "p204", "p205", "p206", "p207", "p208", "p209", "p210",
  "jc935-1-1-1-1", "jc935-1-1-1-2", "jc935-1-1-1-3", "jc935-1-1-1-4", "jc935-1-1-1-5",
  "jc935-1-1-1-6", "jc935-1-1-1-7", "jc935-1-1-1-8", "jc935-1-1-1-9", "jc935-1-1-1-10",
  "jc935-1-1-2-1", "jc935-1-1-2-2", "jc935-1-1-2-3", "jc935-1-1-2-4", "jc935-1-1-3",
  "jc935-1-1-4-1", "jc935-1-1-4-2", "jc935-1-1-5-1", "jc935-1-1-5-2", "jc935-1-1-6-1",
  "jc935-1-1-6-2", "jc935-1-1-7", "jc935-1-1-8-1", "jc935-1-1-8-2", "jc935-1-1-9-1",
  "jc935-1-1-9-2", "jc935-1-1-9-3", "jc935-1-1-9-4", "jc935-1-1-9-5", "jc935-1-1-9-6",
  "jc935-1-1-10-1", "jc935-1-1-10-2", "jc935-1-1-10-3", "jc935-1-1-10-4", "jc935-1-1-10-5",
  "jc935-1-1-11-1", "jc935-1-1-11-2", "jc935-1-1-11-3", "jc935-1-1-11-4", "jc935-1-1-11-5",
  "jc935-1-1-11-6", "jc935-1-1-12-1", "jc935-1-1-12-2", "jc935-1-1-12-3", "jc935-1-1-12-4",
  "jc935-1-1-12-5", "jc935-1-1-13-1", "jc935-1-1-13-2", "jc935-1-1-13-3", "jc935-1-1-13-4",
  "jc935-1-1-14-1", "jc935-1-1-14-2", "jc935-1-1-15", "jc935-1-1-16", "jc935-1-1-17-1",
  "jc935-1-1-17-2", "jc935-1-1-18",
  "jc935-1-2-1-1", "jc935-1-2-1-2", "jc935-1-2-1-3", "jc935-1-2-1-4", "jc935-1-2-1-5",
  "jc935-1-2-1-6", "jc935-1-2-1-7", "jc935-1-2-1-8", "jc935-1-2-2-1", "jc935-1-2-2-2",
  "jc935-1-2-2-3", "jc935-1-2-3-1", "jc935-1-2-3-2", "jc935-1-2-3-3", "jc935-1-2-3-4",
  "jc935-1-2-4", "jc935-1-2-5-1", "jc935-1-2-5-2", "jc935-1-2-5-3", "jc935-1-2-5-4",
  "jc935-1-2-6", "jc935-1-2-7", "jc935-1-2-8",
  "jc935-1-3-1-1", "jc935-1-3-1-2", "jc935-1-3-1-3", "jc935-1-3-2-1", "jc935-1-3-2-2",
  "jc935-1-3-2-3", "jc935-1-3-2-4", "jc935-1-3-2-5", "jc935-1-3-2-6", "jc935-1-3-3-1",
  "jc935-1-3-3-2", "jc935-1-3-3-3", "jc935-1-3-3-4", "jc935-1-3-3-5", "jc935-1-3-3-6",
  "jc935-1-3-3-7", "jc935-1-3-3-8", "jc935-1-3-4-1", "jc935-1-3-4-2", "jc935-1-3-5-1",
  "jc935-1-3-5-2", "jc935-1-3-5-3", "jc935-1-3-5-4", "jc935-1-3-6-1", "jc935-1-3-6-2",
  "jc935-1-3-7", "jc935-1-3-8", "jc935-1-3-9", "jc935-1-3-10", "jc935-1-3-11", "jc935-1-3-12",
  "jc935-1-4-1", "jc935-1-4-2-1", "jc935-1-4-2-2", "jc935-1-4-3", "jc935-1-4-4-1",
  "jc935-1-4-4-2", "jc935-1-4-5-1", "jc935-1-4-5-2", "jc935-1-4-5-3", "jc935-1-4-5-4",
  "jc935-1-4-5-5", "jc935-1-4-5-6", "jc935-1-4-5-7", "jc935-1-4-5-8", "jc935-1-4-5-9",
  "jc935-1-4-5-10", "jc935-1-4-5-11", "jc935-1-4-5-12", "jc935-1-4-5-13", "jc935-1-4-5-14",
  "jc935-1-4-5-15", "jc935-1-4-5-16", "jc935-1-4-5-17", "jc935-1-4-5-18", "jc935-1-4-5-19",
  "jc935-1-4-5-20", "jc935-1-4-5-21", "jc935-1-4-5-22", "jc935-1-4-5-23", "jc935-1-4-5-24",
  "jc935-1-4-6", "jc935-1-4-7",
  "jc935-1-5-1-6", "jc935-1-5-1-10", "jc935-1-5-1-11", "jc935-1-5-1-12", "jc935-1-5-1-13",
  "jc935-1-5-1-14", "jc935-1-5-2-1", "jc935-1-5-2-2", "jc935-1-5-2-3", "jc935-1-5-3-1",
  "jc935-1-5-3-2", "jc935-1-5-4-1", "jc935-1-5-4-2", "jc935-1-5-4-3", "jc935-1-5-4-4",
  "jc935-1-5-5-1", "jc935-1-5-5-2", "jc935-1-5-5-3", "jc935-1-5-5-4", "jc935-1-5-6", "jc935-1-5-7",
  "jc935-1-6-1-1", "jc935-1-6-1-3", "jc935-1-6-1-4", "jc935-1-6-1-5", "jc935-1-6-1-6",
  "jc935-1-6-2-1", "jc935-1-6-2-3", "jc935-1-6-2-4", "jc935-1-6-3", "jc935-1-6-4-1",
  "jc935-1-6-4-2", "jc935-1-6-4-3", "jc935-1-6-4-4", "jc935-1-6-5", "jc935-1-6-6",
  "jc935-1-7-1", "jc935-1-7-2", "jc935-1-7-3-1", "jc935-1-7-3-2", "jc935-1-7-4-1",
  "jc935-1-7-4-2", "jc935-1-7-5-1", "jc935-1-7-5-2", "jc935-1-7-5-3", "jc935-1-7-5-4",
  "jc935-1-7-6-1", "jc935-1-7-6-2", "jc935-1-7-6-3",
  "jc935-1-8-1", "jc935-1-8-2-1", "jc935-1-8-2-2", "jc935-1-8-3-2", "jc935-1-8-3-3",
  "jc935-1-8-4", "jc935-1-8-5-1", "jc935-1-8-5-2", "jc935-1-8-6", "jc935-1-8-7-1",
  "jc935-1-8-7-2", "jc935-1-8-8",
  "jc935-1-9-1", "jc935-1-9-2", "jc935-1-9-3-1", "jc935-1-9-3-2", "jc935-1-9-3-3",
  "jc935-1-9-3-4", "jc935-1-9-3-5", "jc935-1-9-3-6", "jc935-1-9-3-7", "jc935-1-9-3-8",
  "jc935-1-9-4-1", "jc935-1-9-4-2", "jc935-1-9-4-3", "jc935-1-9-4-4", "jc935-1-9-4-5",
  "jc935-1-9-4-6", "jc935-1-9-4-7", "jc935-1-9-4-8", "jc935-1-9-4-9", "jc935-1-9-4-10",
  "jc935-1-9-5-1", "jc935-1-9-5-2", "jc935-1-9-5-3", "jc935-1-9-5-4", "jc935-1-9-6",
  "jc935-1-10-1", "jc935-1-10-2", "jc935-1-10-3", "jc935-1-10-4", "jc935-1-10-5",
  "jc935-1-10-6", "jc935-1-10-7", "jc935-1-10-8", "jc935-1-10-9",
  "jc935-1-review-1-1", "jc935-1-review-1-2", "jc935-1-review-1-3", "jc935-1-review-1-4",
  "jc935-1-review-2", "jc935-1-review-3-1", "jc935-1-review-3-2", "jc935-1-review-4-1",
  "jc935-1-review-4-2", "jc935-1-review-4-3", "jc935-1-review-4-4", "jc935-1-review-5-1",
  "jc935-1-review-5-2", "jc935-1-review-5-3", "jc935-1-review-5-4", "jc935-1-review-6-1",
  "jc935-1-review-6-2", "jc935-1-review-6-3", "jc935-1-review-7", "jc935-1-review-8",
  "jc935-1-review-9-1", "jc935-1-review-9-2", "jc935-1-review-9-3", "jc935-1-review-9-4",
  "jc935-1-review-9-5", "jc935-1-review-9-6", "jc935-1-review-9-7", "jc935-1-review-9-8",
  "jc935-1-review-10", "jc935-1-review-11", "jc935-1-review-12", "jc935-1-review-13",
  "jc935-1-review-14-1", "jc935-1-review-14-2", "jc935-1-review-14-3",
  "jc935-exam-1-1", "jc935-exam-1-2", "jc935-exam-1-3", "jc935-exam-1-4", "jc935-exam-1-5",
  "jc935-exam-1-6", "jc935-exam-1-7", "jc935-exam-1-8", "jc935-exam-1-9", "jc935-exam-1-10",
  "jc935-exam-1-11", "jc935-exam-1-12", "jc935-exam-1-13", "jc935-exam-1-14", "jc935-exam-1-15",
  "jc935-exam-1-16", "jc935-exam-1-17", "jc935-exam-1-18", "jc935-exam-1-19", "jc935-exam-1-20",
  "jc935-exam-1-21", "jc935-exam-1-22", "jc935-exam-1-23",
] as const;

const ch2DetemplateIds = [
  "p211", "p212",
  "jc935-2-1-1", "jc935-2-1-2", "jc935-2-1-3-1", "jc935-2-1-3-2", "jc935-2-1-4", "jc935-2-1-5",
  "jc935-2-1-6-1", "jc935-2-1-6-2", "jc935-2-1-6-3", "jc935-2-1-7", "jc935-2-1-8",
  "jc935-2-1-9-1", "jc935-2-1-9-2", "jc935-2-1-9-3", "jc935-2-1-9-4", "jc935-2-1-9-5",
  "jc935-2-1-9-6", "jc935-2-1-9-7", "jc935-2-1-10", "jc935-2-1-11-1", "jc935-2-1-11-2",
  "jc935-2-1-11-3", "jc935-2-1-12-1", "jc935-2-1-12-2", "jc935-2-1-13", "jc935-2-1-14",
  "jc935-2-1-15", "jc935-2-1-16-1", "jc935-2-1-16-2", "jc935-2-1-17", "jc935-2-1-18",
  "jc935-2-1-19", "jc935-2-1-20",
  "jc935-2-2-1-1", "jc935-2-2-1-2", "jc935-2-2-2-1", "jc935-2-2-2-2", "jc935-2-2-2-3",
  "jc935-2-2-2-4", "jc935-2-2-2-5", "jc935-2-2-2-6", "jc935-2-2-2-7", "jc935-2-2-2-8",
  "jc935-2-2-2-9", "jc935-2-2-2-10", "jc935-2-2-3-1", "jc935-2-2-3-2", "jc935-2-2-3-3",
  "jc935-2-2-4-1", "jc935-2-2-4-2", "jc935-2-2-5", "jc935-2-2-6-2", "jc935-2-2-6-6",
  "jc935-2-2-6-7", "jc935-2-2-6-9", "jc935-2-2-7-1", "jc935-2-2-7-2", "jc935-2-2-7-3",
  "jc935-2-2-7-4", "jc935-2-2-7-5", "jc935-2-2-7-6", "jc935-2-2-7-7", "jc935-2-2-7-8",
  "jc935-2-2-7-9", "jc935-2-2-7-10", "jc935-2-2-8-1", "jc935-2-2-8-2", "jc935-2-2-8-3",
  "jc935-2-2-8-4", "jc935-2-2-8-5", "jc935-2-2-8-6", "jc935-2-2-8-7", "jc935-2-2-8-8",
  "jc935-2-2-8-9", "jc935-2-2-8-10", "jc935-2-2-9", "jc935-2-2-10-2", "jc935-2-2-10-3",
  "jc935-2-2-11-1", "jc935-2-2-11-2", "jc935-2-2-11-3", "jc935-2-2-11-4", "jc935-2-2-11-5",
  "jc935-2-2-11-6", "jc935-2-2-11-7", "jc935-2-2-11-8", "jc935-2-2-11-9", "jc935-2-2-11-10",
  "jc935-2-2-12-1", "jc935-2-2-12-2", "jc935-2-2-12-3", "jc935-2-2-12-4", "jc935-2-2-12-5",
  "jc935-2-2-12-6", "jc935-2-2-12-7", "jc935-2-2-12-8", "jc935-2-2-12-9", "jc935-2-2-12-10",
  "jc935-2-2-13", "jc935-2-2-14",
  "jc935-2-3-1-3", "jc935-2-3-1-5", "jc935-2-3-1-7", "jc935-2-3-1-8", "jc935-2-3-1-9",
  "jc935-2-3-1-10", "jc935-2-3-1-11", "jc935-2-3-1-12", "jc935-2-3-3-1", "jc935-2-3-3-2",
  "jc935-2-3-4-1", "jc935-2-3-4-2", "jc935-2-3-5", "jc935-2-3-6", "jc935-2-3-7",
  "jc935-2-3-8", "jc935-2-3-9-2", "jc935-2-3-10-1", "jc935-2-3-10-2", "jc935-2-3-10-3",
  "jc935-2-3-10-4", "jc935-2-3-11",
  "jc935-2-4-2", "jc935-2-4-3", "jc935-2-4-4-1", "jc935-2-4-4-2", "jc935-2-4-4-3",
  "jc935-2-4-4-4", "jc935-2-4-5-2", "jc935-2-4-5-4", "jc935-2-4-6-2", "jc935-2-4-7",
  "jc935-2-4-8-1", "jc935-2-4-8-2", "jc935-2-4-9-2", "jc935-2-4-9-3", "jc935-2-4-9-4",
  "jc935-2-4-10-1", "jc935-2-4-10-2", "jc935-2-4-11", "jc935-2-4-12", "jc935-2-4-13",
  "jc935-2-5-1-1", "jc935-2-5-1-3", "jc935-2-5-2-1", "jc935-2-5-2-2", "jc935-2-5-2-3",
  "jc935-2-5-2-4", "jc935-2-5-3-1", "jc935-2-5-3-2", "jc935-2-5-3-3", "jc935-2-5-3-4",
  "jc935-2-5-3-5", "jc935-2-5-3-6", "jc935-2-5-3-7", "jc935-2-5-3-8", "jc935-2-5-3-9",
  "jc935-2-5-3-10", "jc935-2-5-4-1", "jc935-2-5-4-2", "jc935-2-5-4-3", "jc935-2-5-4-5",
  "jc935-2-5-4-7", "jc935-2-5-4-8", "jc935-2-5-5", "jc935-2-5-6-1", "jc935-2-5-6-2",
  "jc935-2-5-7-2", "jc935-2-5-8-2", "jc935-2-5-9-2", "jc935-2-5-9-3", "jc935-2-5-9-4",
  "jc935-2-5-10-1", "jc935-2-5-10-2", "jc935-2-5-11", "jc935-2-5-12",
  "jc935-2-review-1-1", "jc935-2-review-1-2", "jc935-2-review-1-3", "jc935-2-review-2",
  "jc935-2-review-3", "jc935-2-review-4", "jc935-2-review-5", "jc935-2-review-6-1",
  "jc935-2-review-6-2", "jc935-2-review-7", "jc935-2-review-8-1", "jc935-2-review-8-2",
  "jc935-2-review-8-3", "jc935-2-review-8-4", "jc935-2-review-8-5", "jc935-2-review-9-1",
  "jc935-2-review-9-2", "jc935-2-review-10-1", "jc935-2-review-10-2", "jc935-2-review-11",
  "jc935-2-review-12", "jc935-2-review-13-1", "jc935-2-review-13-2", "jc935-2-review-14",
  "jc935-2-review-15", "jc935-2-review-16", "jc935-2-review-17", "jc935-2-review-18",
  "jc935-2-review-19",
] as const;

const formerIrrationalTransferIds = [
  "jc935-1-7-3-1",
  "p211", "p212",
  "jc935-2-2-1-2", "jc935-2-2-2-2", "jc935-2-2-2-3", "jc935-2-2-2-6",
  "jc935-2-2-2-8", "jc935-2-2-2-9", "jc935-2-2-3-1", "jc935-2-2-6-2",
  "jc935-2-2-6-7", "jc935-2-2-6-9", "jc935-2-2-7-2", "jc935-2-2-7-6",
  "jc935-2-2-8-1", "jc935-2-2-8-3", "jc935-2-2-8-4", "jc935-2-2-8-7",
  "jc935-2-2-8-8", "jc935-2-2-8-9", "jc935-2-2-8-10", "jc935-2-2-11-2",
  "jc935-2-2-11-3", "jc935-2-2-11-6", "jc935-2-2-11-7", "jc935-2-2-11-8",
  "jc935-2-2-11-9", "jc935-2-2-12-1", "jc935-2-2-12-4", "jc935-2-2-12-7",
  "jc935-2-2-12-10", "jc935-2-3-4-1", "jc935-2-4-10-2", "jc935-2-5-3-4",
  "jc935-2-review-8-3", "jc935-2-review-9-2",
] as const;

const allUpgradedIds = [...ch1DetemplateIds, ...ch2DetemplateIds];
const problemById = new Map(problems.map((p) => [p.id, p]));
const normalizeText = (value: string) => value.normalize("NFKC").replace(/\s+/g, "").trim();

const BANNED_TEMPLATE_PHRASES = [
  "确定解题依据",
  "先对照原题，判断从哪条关系开始推导",
  "把这一步用到一题新题",
  "先用刚才的办法处理新式子",
  "换一道题，自己走一遍",
  "写下决定解法的那一步",
  "保留到六位",
  "保留六位",
  "近处半径",
  "远处门槛",
  "输出容差",
  "输入距离",
  "输出误差",
] as const;

const BOILERPLATE_DETAILS = new Set(["完成。", "证毕。", "验证完毕。", "完成", "证毕", "验证完毕"]);

function isCleanRationalOrTerminating(value: number): boolean {
  if (!Number.isFinite(value)) return false;
  if (Math.abs(value - Math.round(value)) < 1e-9) return true;
  if (Math.abs(value * 1000 - Math.round(value * 1000)) < 1e-7) return true;
  for (let denom = 2; denom <= 24; denom++) {
    if (Math.abs(value * denom - Math.round(value * denom)) < 1e-9) return true;
  }
  return false;
}

function verifyDetemplateBatch(ids: readonly string[], expectedCheckCount: number) {
  const counts = [0, 0, 0];
  let totalChecks = 0;
  const affirmativePrefix = /^(对|找对了)/;

  for (const id of ids) {
    const problem = problemById.get(id);
    expect(problem, id).toBeDefined();

    const lesson = teachingByProblem[id];
    expect(lesson, `${id} teaching`).toBeDefined();
    expect(lesson!.target?.trim(), `${id} target`).toBeTruthy();
    expect(lesson!.strategy?.trim(), `${id} strategy`).toBeTruthy();
    expect(lesson!.solutionExplanation?.trim(), `${id} solutionExplanation`).toBeTruthy();
    expect(lesson!.prerequisites?.length ?? 0, `${id} prerequisites`).toBeGreaterThan(0);
    expect(lesson!.steps, id).toHaveLength(3);
    expect(new Set(lesson!.steps.map((s) => s.id)).size, id).toBe(3);
    expect(() => katex.renderToString(lesson!.solution, { throwOnError: true, strict: "error" }), `${id}/solution`).not.toThrow();

    for (const [idx, step] of lesson!.steps.entries()) {
      expect(step.id, `${id} step id`).toBe(`${id}-${idx + 1}`);
      expect(step.goal.trim(), `${id}/${step.id} goal`).toBeTruthy();
      expect(step.plain.trim(), `${id}/${step.id} plain`).toBeTruthy();
      const det = step.detail.trim();
      expect(det.length, `${id}/${step.id} detail len`).toBeGreaterThanOrEqual(10);
      expect(BOILERPLATE_DETAILS.has(det), `${id}/${step.id} boilerplate detail`).toBe(false);
      expect(() => katex.renderToString(step.formula, { throwOnError: true, strict: "error" }), `${id}/${step.id}`).not.toThrow();

      if (idx < 2) {
        expect(step.transfer, `${id}/${step.id} unexpected transfer`).toBeUndefined();
        const check = step.check;
        expect(check, `${id}/${step.id} check`).toBeDefined();
        totalChecks += 1;
        expect(check!.prompt.trim(), `${id}/${step.id} check.prompt`).toBeTruthy();
        expect(check!.prerequisite.trim(), `${id}/${step.id} check.prerequisite`).toBeTruthy();
        expect(check!.choices, `${id}/${step.id}`).toHaveLength(3);
        expect(check!.feedback, `${id}/${step.id}`).toHaveLength(3);
        expect(check!.correct).toBeGreaterThanOrEqual(0);
        expect(check!.correct).toBeLessThan(3);
        counts[check!.correct] += 1;

        const normChoices = check!.choices.map(normalizeText);
        expect(normChoices.every(Boolean), `${id}/${step.id} blank choice`).toBe(true);
        expect(new Set(normChoices).size, `${id}/${step.id} dup choice`).toBe(3);

        const normFeedback = check!.feedback.map(normalizeText);
        expect(normFeedback.every(Boolean), `${id}/${step.id} blank feedback`).toBe(true);
        expect(new Set(normFeedback).size, `${id}/${step.id} dup feedback`).toBe(3);

        for (let i = 0; i < 3; i++) {
          expect(affirmativePrefix.test(check!.feedback[i].trim()), `${id}/${step.id}/${i}`).toBe(i === check!.correct);
        }
      } else {
        expect(step.check, `${id}/${step.id} unexpected check on step 3`).toBeUndefined();
      }
    }

    const transfers = lesson!.steps.flatMap((s) => (s.transfer ? [s.transfer] : []));
    expect(transfers, `${id} transfer count`).toHaveLength(1);
    const transfer = transfers[0];
    expect(Number.isFinite(transfer.answer), `${id} transfer finite`).toBe(true);
    expect(transfer.prompt.trim(), id).toBeTruthy();
    expect(transfer.signFeedback.trim(), id).toBeTruthy();
    expect(transfer.remediation.trim(), id).toBeTruthy();
    expect(transfer.solution?.trim(), id).toBeTruthy();
    expect(() => katex.renderToString(transfer.solution!, { throwOnError: true, strict: "error" }), `${id}/transfer`).not.toThrow();
    if (transfer.promptFormula) {
      expect(() => katex.renderToString(transfer.promptFormula!, { throwOnError: true, strict: "error" }), `${id}/transferPrompt`).not.toThrow();
    }
  }

  expect(totalChecks).toBe(expectedCheckCount);
  for (const [slot, count] of counts.entries()) {
    const share = count / totalChecks;
    expect(share, `slot ${slot} share (${count}/${totalChecks})`).toBeGreaterThanOrEqual(0.2);
    expect(share, `slot ${slot} share (${count}/${totalChecks})`).toBeLessThanOrEqual(0.5);
  }
}

describe("Ch1-Ch2 510 Problems De-templating & Ch1-Ch3 100% Bespoke ELI5 Gate", () => {
  it("tracks exact counts (303 Ch1 + 207 Ch2 = 510 upgraded, 37 clean transfers)", () => {
    expect(ch1DetemplateIds).toHaveLength(303);
    expect(ch2DetemplateIds).toHaveLength(207);
    expect(new Set(allUpgradedIds).size).toBe(510);
    expect(formerIrrationalTransferIds).toHaveLength(37);
    expect(new Set(formerIrrationalTransferIds).size).toBe(37);
  });

  it("enforces Ch3 gold-standard bespoke 3-step ELI5 across all 303 Ch1 upgraded problems", () => {
    verifyDetemplateBatch(ch1DetemplateIds, 606);
  });

  it("enforces Ch3 gold-standard bespoke 3-step ELI5 across all 207 Ch2 upgraded problems", () => {
    verifyDetemplateBatch(ch2DetemplateIds, 414);
  });

  it("enforces combined slot balance and strict KaTeX across all 510 upgraded problems", () => {
    verifyDetemplateBatch(allUpgradedIds, 1020);
  });

  it("ensures all 37 formerly-irrational transfer questions now have clean integer, terminating, or simple rational answers", () => {
    for (const id of formerIrrationalTransferIds) {
      const lesson = teachingByProblem[id];
      expect(lesson, id).toBeDefined();
      const transfer = lesson!.steps[2]?.transfer;
      expect(transfer, `${id} transfer`).toBeDefined();
      expect(isCleanRationalOrTerminating(transfer!.answer), `${id} non-clean transfer ${transfer!.answer}`).toBe(true);
    }
  });

  it("reaches 100% bespoke ELI5 coverage with zero banned template phrases and zero blank details across all 797 Ch1-Ch3 problems", () => {
    const ch1to3 = problems.filter((p) => p.chapter <= 3);
    expect(ch1to3).toHaveLength(797);
    expect(ch1to3.filter((p) => p.chapter === 1)).toHaveLength(344);
    expect(ch1to3.filter((p) => p.chapter === 2)).toHaveLength(258);
    expect(ch1to3.filter((p) => p.chapter === 3)).toHaveLength(195);

    for (const p of ch1to3) {
      const lesson = teachingByProblem[p.id];
      expect(lesson, `${p.id} missing teaching`).toBeDefined();
      const raw = JSON.stringify(lesson);
      for (const banned of BANNED_TEMPLATE_PHRASES) {
        expect(raw, `${p.id} contains banned phrase ${banned}`).not.toContain(banned);
      }
      for (const step of lesson!.steps) {
        expect(step.detail.trim().length, `${p.id}/${step.id} blank detail`).toBeGreaterThan(0);
      }
    }
  });
});

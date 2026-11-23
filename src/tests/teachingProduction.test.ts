
import { existsSync } from "node:fs";
import katex from "katex";
import { expect, it } from "vitest";
import plan from "../../docs/eli5-production/chapter-one.json";
import { lessons, problems } from "../data/learning";
import { expandedTeaching, teachingByProblem, type TeachingLesson } from "../data/teaching";
import { chapterOneProductionTeaching } from "../data/teachingProduction";

const chapterLessons = new Set(lessons.filter((lesson) => lesson.chapter === 1).map((lesson) => lesson.id));
const chapter = problems.filter((problem) => chapterLessons.has(problem.lessonId));
const chapterById = new Map(chapter.map((problem) => [problem.id, problem]));
const rows = plan.items as Array<(typeof plan.items)[number] & {
  mathEvidence?: string;
  reviewEvidence?: string;
  transferEvidence?: string;
}>;

it("keeps the production inventory aligned with every live chapter-one ID and batch", () => {
  expect(rows.map(({ id }) => id).sort()).toEqual(chapter.map(({ id }) => id).sort());
  expect(new Set(rows.map(({ category }) => category)).size).toBe(16);
  expect(rows.filter((row) => row.batch === 0)).toHaveLength(11);
  for (const batch of plan.batches) {
    expect(rows.filter((row) => row.batch === batch.number)).toHaveLength(batch.size);
  }
  const pending = rows.filter((row) => row.batch > 0);
  expect(pending.filter((row) => row.track === "template")).toHaveLength(181);
  expect(pending.filter((row) => row.track === "individual")).toHaveLength(152);
});

it("only registers reviewed production lessons and preserves the eleven pilot lessons", () => {
  const integrated = rows.filter((row) => row.eli5 === "integrated");
  const originalRegistration = Object.keys(teachingByProblem).filter((id) => !expandedTeaching[id]);
  expect(originalRegistration.sort()).toEqual(integrated.map(({ id }) => id).sort());
  expect(Object.keys(chapterOneProductionTeaching).sort()).toEqual(
    integrated.filter((row) => row.batch > 0).map(({ id }) => id).sort(),
  );
  for (const row of integrated.filter((item) => item.batch > 0)) {
    expect(row.review, row.id).toBe("approved");
    expect(["symbolic", "manual"], row.id).toContain(row.math);
    expect(row.transfer, row.id).toBe("validated");
    for (const path of [row.mathEvidence, row.reviewEvidence, row.transferEvidence]) {
      expect(path && existsSync(path.split("#")[0]), row.id).toBe(true);
    }
    expect(chapterOneProductionTeaching[row.id].strategy, row.id).toBe(row.strategy);
  }
});

function verifyLesson(id: string, lesson: TeachingLesson) {
  const problem = chapterById.get(id);
  expect(problem, id).toBeDefined();
  if (problem && "answer" in problem) expect(lesson.referenceAnswer, id).toBe(problem.answer);
  for (const value of [lesson.target, lesson.strategy, lesson.solution]) expect(value?.trim(), id).toBeTruthy();
  expect(lesson.prerequisites?.length, id).toBeGreaterThan(0);
  expect(lesson.prerequisites?.every((text) => text.trim()), id).toBe(true);
  expect(lesson.steps.length, id).toBeGreaterThan(0);
  expect(new Set(lesson.steps.map((step) => step.id)).size, id).toBe(lesson.steps.length);
  expect(lesson.steps.some((step) => step.check), id).toBe(true);
  const transfers = lesson.steps.flatMap((step) => step.transfer ? [step.transfer] : []);
  expect(transfers, id).toHaveLength(1);
  for (const transfer of transfers) {
    expect(Number.isFinite(transfer.answer), id).toBe(true);
    expect(transfer.answer, id).not.toBe(lesson.referenceAnswer);
    expect.soft(transfer.prompt, id + " use promptFormula for displayed TeX").not.toMatch(/\\[a-zA-Z]+|\^\{|_\{/);
    for (const value of [transfer.prompt, transfer.remediation, transfer.signFeedback, transfer.solution]) {
      expect(value?.trim(), id).toBeTruthy();
    }
  }
  for (const step of lesson.steps) {
    const label = id + "/" + step.id;
    for (const value of [step.id, step.goal, step.plain, step.detail, step.formula]) {
      expect(value?.trim(), label).toBeTruthy();
    }
    const check = step.check;
    if (!check) continue;
    expect(new Set(check.choices).size, label).toBe(check.choices.length);
    expect(check.choices.length, label).toBeGreaterThanOrEqual(2);
    const correctChoice = check.choices[check.correct];
    expect.soft(Number.isInteger(check.correct) && Boolean(correctChoice), label + " correct choice index").toBe(true);
    expect.soft(Array.isArray(check.feedback), label + " ordered choice feedback").toBe(true);
    if (Array.isArray(check.feedback)) {
      expect.soft(check.feedback, label).toHaveLength(check.choices.length);
      expect.soft(new Set(check.feedback).size, label).toBe(check.choices.length);
      expect.soft(check.feedback.every((text) => text.trim()), label).toBe(true);
    }
    expect(check.prerequisite.trim(), label).toBeTruthy();
    const normalize = (value: string) => value.normalize("NFKC").replace(/\s+/g, "").replace(/[−–]/g, "-");
    const correct = normalize(correctChoice ?? "");
    if (correct.length >= 8) {
      const beforeReveal = [lesson.target ?? "", ...(lesson.prerequisites ?? []), step.goal, step.plain, check.prompt, check.prerequisite];
      expect.soft(beforeReveal.some((value) => normalize(value).includes(correct)), label + " direct answer overlap").toBe(false);
    }
  }
  for (const formula of [lesson.solution, ...lesson.steps.map((step) => step.formula), ...transfers.flatMap((t) => [t.solution!, ...(t.promptFormula ? [t.promptFormula] : [])])]) {
    expect.soft(() => katex.renderToString(formula, { throwOnError: true, strict: "error" }), id).not.toThrow();
  }
}

for (const [id, lesson] of Object.entries(chapterOneProductionTeaching)) {
  it(id + " satisfies the production lesson contract", () => verifyLesson(id, lesson));
}

const batches = import.meta.glob<Record<string, Record<string, TeachingLesson>>>("../data/eli5Drafts/ch01Batch*.ts", { eager: true });
for (const [path, data] of Object.entries(batches)) {
  const suffix = path.match(/Batch(\d+)\.ts$/)?.[1] ?? "";
  const batch = Number(suffix);
  const draft = data["chapterOneBatch" + suffix + "Drafts"] ?? {};
  it(path + " includes exactly the expected problem IDs", () => {
    expect(plan.batches.some(({ number }) => number === batch)).toBe(true);
    expect(Object.keys(draft).sort()).toEqual(rows.filter((row) => row.batch === batch).map(({ id }) => id).sort());
  });
  for (const [id, lesson] of Object.entries(draft)) {
    it(id + " satisfies the draft lesson contract", () => verifyLesson(id, lesson));
  }
}

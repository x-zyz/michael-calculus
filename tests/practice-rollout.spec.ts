
import { expect, test, type Page } from "@playwright/test";
import { problems } from "../src/data/learning";
import { expandedTeaching } from "../src/data/teaching";
import { firstFocusedPracticeBatch, focusedPracticeLesson } from "../src/features/practice/focusedPracticeRollout";

const batch = problems.filter((problem) => focusedPracticeLesson(problem) && !expandedTeaching[problem.id]);
const firstBatch = batch.filter((problem) => firstFocusedPracticeBatch.has(problem.id));

async function checkFormulas(page: Page) {
  await expect(page.locator(".katex-error:visible")).toHaveCount(0);
  const clipped = await page.locator(".formula:visible").evaluateAll((items) => items
    .filter((item) => item.scrollWidth > item.clientWidth + 1)
    .map((item) => item.querySelector("annotation")?.textContent));
  expect(clipped).toEqual([]);
}

test("first rollout batch contains six numerical and four written registered lessons", () => {
  expect(firstBatch).toHaveLength(10);
  expect(firstBatch.filter((problem) => "answer" in problem)).toHaveLength(6);
  expect(batch).toHaveLength(41);
  expect(batch.filter((problem) => "answer" in problem)).toHaveLength(29);
});

const expandedExamples = new Set([
  "jc935-1-1-1-2", "jc935-1-3-2-6", "jc935-1-10-1",
  "p12", "p129", "jc935-2-4-9-1", "jc935-2-5-10-1", "jc935-2-review-11",
]);
for (const problem of [...batch, ...problems.filter(({ id }) => expandedExamples.has(id))]) {
  const lesson = focusedPracticeLesson(problem)!;
  test(problem.id + " completes the four-state flow at 360px", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto("/#/practice?problem=" + problem.id);
    const paper = page.locator(".practice-focus-paper");
    const initialFormula = await paper.locator(".formula annotation").first().textContent();
    await checkFormulas(page);
    await paper.getByRole("button", { name: "一步一步教我" }).click();
    const original = page.getByRole("region", { name: "原题" });
    await expect(original.locator("annotation")).toHaveText(initialFormula!);
    const guide = page.getByRole("region", { name: "ELI5 教学步骤" });
    for (const [index, step] of lesson.steps.entries()) {
      const reveal = guide.getByLabel("本步完整算式");
      if (step.check) {
        await expect(reveal).toHaveCount(0);
        await guide.getByRole("button", { name: step.check.choices[step.check.correct], exact: true }).click();
      }
      if (step.transfer) {
        await expect(reveal).toHaveCount(0);
        const transfer = guide.getByRole("form", { name: "迁移小题" });
        const answer = Number(step.transfer.answer.toFixed(12));
        await transfer.getByRole("textbox").fill(String(answer));
        await transfer.getByRole("button", { name: "检查迁移题" }).click();
        await expect(transfer.getByRole("status")).toContainText("答对了");
      }
      await expect(original).toBeInViewport();
      await expect(reveal).toBeVisible();
      await checkFormulas(page);
      const last = index === lesson.steps.length - 1;
      await guide.getByRole("button", { name: last ? "结束教学" : "下一步", exact: true }).click();
    }
    await paper.getByRole("button", { name: "查看完整解法" }).click();
    await checkFormulas(page);
    if ("answer" in problem) {
      await paper.getByRole("button", { name: "回去作答" }).click();
      await paper.getByRole("textbox").fill(String(problem.answer));
      await paper.getByRole("button", { name: "检查答案" }).click();
    } else {
      await expect(paper.getByRole("textbox")).toHaveCount(0);
      await paper.getByRole("button", { name: "核对后确认完成" }).click();
    }
    await expect(paper.getByRole("heading", { name: "提示辅助完成" })).toBeVisible();
    await paper.getByRole("button", { name: "重新练习" }).click();
    await expect(paper.getByRole("heading", { name: problem.title })).toBeVisible();
  });
}

test("written self-assessment can be independent or record a review without numeric grading", async ({ page }) => {
  await page.goto("/#/practice?problem=jc935-1-5-1-5");
  const paper = page.locator(".practice-focus-paper");
  await expect(paper.getByRole("textbox")).toHaveCount(0);
  await paper.getByRole("button", { name: "我独立完成了" }).click();
  await expect(paper.getByRole("heading", { name: "独立完成" })).toBeVisible();
  await paper.getByRole("button", { name: "重新练习" }).click();
  await paper.getByRole("button", { name: "查看完整解法" }).click();
  await expect(paper.getByRole("button", { name: "我独立完成了" })).toHaveCount(0);
  await paper.getByRole("button", { name: "还需复习" }).click();
  await expect(paper.getByRole("heading", { name: "需要复习" })).toBeVisible();
  await paper.getByRole("link", { name: "查看错题" }).click();
  await expect(page.getByRole("heading", { name: "保留差商里的一次变化" })).toBeVisible();
});

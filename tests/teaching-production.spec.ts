import { teachingByProblem } from "../src/tests/bankFixture";

import { expect, test, type Page } from "@playwright/test";
import plan from "../docs/eli5-production/chapter-one.json" with { type: "json" };


const chapterOneProductionTeaching = Object.fromEntries(
  plan.items
    .filter((row) => row.batch > 0 && row.eli5 === "integrated")
    .map(({ id }) => [id, teachingByProblem[id]!]),
);

async function checkVisibleMath(page: Page) {
  await expect(page.locator(".katex-error:visible")).toHaveCount(0);
  expect(await page.locator(".formula:visible").evaluateAll((nodes) =>
    nodes.filter((node) => node.scrollWidth > node.clientWidth + 1).map((node) => node.textContent),
  )).toEqual([]);
}

for (const [id, lesson] of Object.entries(chapterOneProductionTeaching)) {
  test(id + " keeps each reveal and transfer usable at 360px", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 780 });
    await page.goto("/#/practice?ui=classic&problem=" + id);
    await page.getByRole("button", { name: "ELI5 教学", exact: true }).click();
    const region = page.getByRole("region", { name: "ELI5 教学步骤" });
    const formula = region.getByLabel("本步完整算式");
    for (const [index, step] of lesson.steps.entries()) {
      if (step.check) {
        await expect(formula).toHaveCount(0);
        const checks = region.getByRole("group", { name: "理解检查" });
        const wrong = step.check.correct === 0 ? 1 : 0;
        await checks.getByRole("button", { name: step.check.choices[wrong], exact: true }).click();
        await expect(checks.getByRole("status")).toHaveText(step.check.feedback[wrong]);
        await expect(formula).toHaveCount(0);
        await checks.getByRole("button", { name: step.check.choices[step.check.correct], exact: true }).click();
      }
      if (step.transfer) {
        const transfer = region.getByRole("form", { name: "迁移小题" });
        await expect(formula).toHaveCount(0);
        await expect(transfer.getByLabel("迁移题解式")).toHaveCount(0);
        await checkVisibleMath(page);
        const answer = transfer.getByRole("textbox");
        const grade = transfer.getByRole("button", { name: "检查迁移题" });
        await answer.fill(String(step.transfer.answer + 1));
        await grade.click();
        await expect(transfer.getByRole("status")).toBeVisible();
        await expect(transfer.getByLabel("迁移题解式")).toHaveCount(0);
        await answer.fill(String(step.transfer.answer));
        await grade.click();
        await expect(transfer.getByLabel("迁移题解式")).toBeVisible();
      }
      await expect(formula).toBeVisible();
      await checkVisibleMath(page);
      const last = index === lesson.steps.length - 1;
      await region.getByRole("button", { name: last ? "结束教学" : "下一步", exact: true }).click();
    }
    await expect(region.getByText(/教学步骤已结束/)).toBeVisible();
  });
}

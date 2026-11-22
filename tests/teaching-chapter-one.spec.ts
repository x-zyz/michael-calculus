import { expect, test, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";

const cases = JSON.parse(readFileSync("scripts/eli5-chapter-one-cases.json", "utf8")) as Record<string, [string, string | number, string | number]>;

async function expectFormulasToFit(page: Page) {
  await expect(page.locator(".katex-error:visible")).toHaveCount(0);
  expect(await page.locator(".formula:visible").evaluateAll((nodes) =>
    nodes.filter((node) => node.scrollWidth > node.clientWidth + 1).map((node) => node.textContent),
  )).toEqual([]);
}

for (const [id, [, , answer]] of Object.entries(cases)) {
  test(`${id} delays worked formulas and grades its transfer at 360px`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 780 });
    await page.goto(`/#/practice?ui=classic&problem=${id}`);
    await page.getByRole("button", { name: "查看完整解析" }).click();
    await expectFormulasToFit(page);
    await page.getByRole("button", { name: "ELI5 教学" }).click();
    const lesson = page.getByRole("region", { name: "ELI5 教学步骤" });
    await expect(lesson.locator(".formula")).toHaveCount(0);
    await expect(lesson.getByRole("button", { name: "查看详细原理" })).toHaveCount(0);
    await lesson.getByRole("button", { name: "跳过检查" }).click();
    await expect(lesson.getByLabel("本步完整算式")).toBeVisible();
    await expectFormulasToFit(page);
    await lesson.getByRole("button", { name: "下一步", exact: true }).click();
    const transfer = lesson.getByRole("form", { name: "迁移小题" });
    await expect(lesson.getByLabel("本步完整算式")).toHaveCount(0);
    await expect(transfer.locator(".formula")).toHaveCount(0);
    await transfer.getByRole("textbox").fill("999");
    await transfer.getByRole("button", { name: "检查迁移题" }).click();
    await expect(transfer.getByRole("status")).toBeVisible();
    await expect(transfer.getByLabel("迁移题解式")).toHaveCount(0);
    await transfer.getByRole("textbox").fill(String(answer));
    await transfer.getByRole("button", { name: "检查迁移题" }).click();
    await expect(transfer.getByText(/答对了/)).toBeVisible();
    await expect(transfer.getByLabel("迁移题解式")).toBeVisible();
    await expectFormulasToFit(page);
  });
}

test("skipping a pilot transfer never reveals the transfer answer", async ({ page }) => {
  await page.goto("/#/practice?ui=classic&problem=p9");
  await page.getByRole("button", { name: "ELI5 教学" }).click();
  await page.getByRole("button", { name: "跳过检查" }).click();
  await page.getByRole("button", { name: "下一步", exact: true }).click();
  await page.getByRole("button", { name: "跳过迁移题" }).click();
  await expect(page.getByLabel("迁移题解式")).toHaveCount(0);
  await expect(page.getByLabel("本步完整算式")).toBeVisible();
});

import type { Page } from "@playwright/test";
export async function chooseSelect(page: Page, label: string, value: string) {
  await page.getByRole("combobox", { name: label, exact: true }).click();
  await page.locator(`[role="option"][data-value="${value}"]`).click();
}
export async function formulaMode(page: Page, value: string) {
  const names: Record<string, string> = {
    due: "今日复习",
    cloze: "填空",
    recall: "完整默写",
    spot: "随机抽查（L3 及以上）",
    recognize: "反向识别",
  };
  await page.getByRole("button", { name: "设置", exact: true }).click();
  await page.getByRole("tab", { name: names[value], exact: true }).click();
  await page.getByRole("button", { name: "完成设置" }).click();
}
export async function chooseProblem(page: Page, index: number) {
  await page.getByRole("button", { name: "题目列表" }).click();
  await page
    .getByRole("button", { name: new RegExp(`^[○✓✕] 第 ${index} 题`) })
    .click();
}

import { test, expect } from "@playwright/test";
test("previews an old backup, requires confirmation, and restores records after reload", async ({
  page,
  isMobile,
}) => {
  if (isMobile) await page.setViewportSize({ width: 360, height: 740 });
  await page.goto("/#/settings");
  await page.getByText("学习数据恢复 / 导入旧版备份", { exact: true }).click();
  const backup = {
    backupVersion: 1,
    applicationId: "com.michael.calculus",
    exportedAt: "2026-11-15T12:00:00Z",
    storage: {
      "mc-learning-v1": JSON.stringify({
        completed: ["sine"],
        lastLesson: "sine",
        attempts: [
          {
            problemId: "p3",
            correct: true,
            answer: "3/5",
            at: "2026-11-15T12:00:00Z",
            hints: 1,
          },
        ],
      }),
      "mc-theme": "dark",
      "mc-formula-v1": null,
    },
  };
  await page
    .getByLabel("选择 Michael calculus JSON 备份")
    .setInputFiles({
      name: "learning-backup.json",
      mimeType: "application/json",
      buffer: Buffer.from(JSON.stringify(backup)),
    });
  await expect(page.getByText(/已读课程 1 节/)).toBeVisible();
  await expect(
    page.getByRole("button", { name: "确认导入并重新载入" }),
  ).toBeDisabled();
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "确认导入并重新载入" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.goto("/#/");
  await expect(page.getByText("已学 1 / 12 节", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: /继续学习/ })).toHaveAttribute("href", /curriculum\/sine$/);
  expect(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem("mc-learning-v1")!).attempts[0].answer,
    ),
  ).toBe("3/5");
});

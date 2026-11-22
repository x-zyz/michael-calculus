import { expect, test } from "@playwright/test";

test("P8 teaching and standard solution fit a 360px phone", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await page.goto("/#/practice?problem=p8");
  await page.getByRole("button", { name: "查看完整解析" }).click();
  const solution = page.getByLabel("完整解析");
  await expect(solution.locator(".katex-error")).toHaveCount(0);
  expect(await solution.locator(".formula").evaluate((node) => node.scrollWidth <= node.clientWidth + 1)).toBe(true);
  if (process.env.ELI5_SCREENSHOTS) {
    await solution.screenshot({ path: testInfo.outputPath("p8-standard.png"), style: ".topbar, .mobile-nav { visibility: hidden }" });
  }
  await page.getByRole("button", { name: "ELI5 教学" }).click();
  const region = page.getByRole("region", { name: "ELI5 教学步骤" });
  for (let step = 1; step <= 4; step++) {
    await expect(region.getByText(`第 ${step} 步，共 4 步`)).toBeVisible();
    const clipped = await page.locator(".formula:visible").evaluateAll((nodes) =>
      nodes.filter((node) => node.scrollWidth > node.clientWidth + 1).map((node) => node.textContent),
    );
    expect(clipped).toEqual([]);
    await expect(region.locator(".katex-error")).toHaveCount(0);
    if (step === 2 && process.env.ELI5_SCREENSHOTS) {
      await region.screenshot({ path: testInfo.outputPath("p8-eli5.png"), style: ".topbar, .mobile-nav { visibility: hidden }" });
    }
    await region.getByRole("button", { name: "跳过检查" }).click();
  }
  await expect(region.getByText(/教学步骤已结束/)).toBeVisible();
});

test("P8 ELI5 loads from the production cache after going offline", async ({ page, context }) => {
  test.skip(!process.env.ELI5_OFFLINE_TEST, "Run with the built PWA served by Vite preview.");
  await page.goto("/#/practice?problem=p8");
  await expect(page.getByRole("button", { name: "ELI5 教学" })).toBeVisible();
  await page.waitForFunction(() => Boolean(navigator.serviceWorker?.controller));
  const exerciseUrl = page.url();
  await context.setOffline(true);
  const offline = await context.newPage();
  await offline.goto(exerciseUrl);
  await expect(offline).toHaveURL(/problem=p8$/);
  await offline.getByRole("button", { name: "ELI5 教学" }).click();
  await offline.getByRole("button", { name: "−3x", exact: true }).click();
  await expect(offline.getByText(/找对了/)).toBeVisible();
  await offline.getByRole("button", { name: "下一步", exact: true }).click();
  await expect(offline.getByText("第 2 步，共 4 步")).toBeVisible();
});

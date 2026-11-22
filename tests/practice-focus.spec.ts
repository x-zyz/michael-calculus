
import { expect, test, type Page } from "@playwright/test";

const url = "/#/practice?problem=p8&ui=study";

async function expectReadable(page: Page) {
  expect(await page.locator(".formula:visible").evaluateAll((items) =>
    items.filter((item) => item.scrollWidth > item.clientWidth + 1).map((item) => item.textContent),
  )).toEqual([]);
  await expect(page.locator(".katex-error:visible")).toHaveCount(0);
  expect(await page.locator(".practice-focus .btn-primary:visible").count()).toBeLessThanOrEqual(1);
}

test("P8 keeps the draft answer and runs all four steps without early reveal", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto(url);
  const entry = page.getByRole("textbox");
  await entry.fill("-6");
  await expectReadable(page);
  await page.getByRole("button", { name: "一步一步教我" }).click();
  const guide = page.getByRole("region", { name: "ELI5 教学步骤" });
  await expect(entry).toBeHidden();
  await page.getByRole("button", { name: "查看原题" }).click();
  await expectReadable(page);
  await page.getByRole("button", { name: "收起原题" }).click();
  await expect(guide.getByLabel("本步完整算式")).toHaveCount(0);
  await guide.getByRole("button", { name: "x", exact: true }).click();
  await expect(guide.getByText(/x 确实趋近零/)).toBeVisible();
  await guide.getByRole("button", { name: "1−3x", exact: true }).click();
  await expect(guide.getByText(/先试个小数/)).toBeVisible();
  await page.getByRole("button", { name: "返回题目" }).click();
  await expect(entry).toHaveValue("-6");
  await page.getByRole("button", { name: "继续引导教学" }).click();
  await expect(guide.getByText(/先试个小数/)).toBeVisible();
  await guide.getByRole("button", { name: "−3x", exact: true }).click();
  await expectReadable(page);
  await guide.getByRole("button", { name: "下一步", exact: true }).click();
  await guide.getByRole("button", { name: "−6", exact: true }).click();
  const transfer = guide.getByRole("form", { name: "迁移小题" });
  await expect(guide.getByLabel("本步完整算式")).toHaveCount(0);
  await transfer.getByRole("textbox").fill("8");
  await transfer.getByRole("button", { name: "检查迁移题" }).click();
  await expect(transfer.getByText(/大小对了/)).toBeVisible();
  await expect(transfer.getByLabel("迁移题解式")).toHaveCount(0);
  await transfer.getByRole("textbox").fill("-8");
  await transfer.getByRole("button", { name: "检查迁移题" }).click();
  await expect(transfer.getByText(/答对了/)).toBeVisible();
  await expectReadable(page);
  await guide.getByRole("button", { name: "下一步", exact: true }).click();
  await guide.getByRole("button", { name: "内外指数相乘" }).click();
  await expectReadable(page);
  await guide.getByRole("button", { name: "下一步", exact: true }).click();
  await guide.getByRole("button", { name: "5", exact: true }).click();
  await expectReadable(page);
  await guide.getByRole("button", { name: "结束教学" }).click();
  await expect(entry).toHaveValue("-6");
  await page.getByRole("button", { name: "检查答案" }).click();
  await expect(page.getByRole("heading", { name: "提示辅助完成" })).toBeVisible();
  await page.getByRole("button", { name: "下一题" }).click();
  await expect(page).toHaveURL(/problem=p9$/);
  await expect(page.getByRole("button", { name: "ELI5 教学" })).toBeVisible();
});

test("viewing a solution before trying counts as assistance even after retry", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto(url);
  await page.getByRole("button", { name: "查看完整解法" }).click();
  await expect(page.getByRole("textbox")).toHaveCount(0);
  await expect(page.getByLabel("完整解析")).toBeVisible();
  await expectReadable(page);
  await page.getByRole("button", { name: "重新练习" }).click();
  await page.getByRole("textbox").fill("-6");
  await page.getByRole("button", { name: "检查答案" }).click();
  await expect(page.getByRole("heading", { name: "提示辅助完成" })).toBeVisible();
});

test("P8 can finish independently or enter review after a wrong answer", async ({ page }) => {
  await page.goto(url);
  await page.getByRole("textbox").fill("6");
  await page.getByRole("button", { name: "检查答案" }).click();
  await expect(page.getByRole("heading", { name: "需要复习" })).toBeVisible();
  await page.getByRole("button", { name: "重新练习" }).click();
  await page.getByRole("textbox").fill("-6");
  await page.getByRole("button", { name: "检查答案" }).click();
  await expect(page.getByRole("heading", { name: "独立完成" })).toBeVisible();
});

test("P8 focus preview works offline after loading the production build", async ({ page, context }) => {
  test.skip(!process.env.ELI5_OFFLINE_TEST, "Use the built PWA preview.");
  await page.goto(url);
  await expect(page.getByRole("button", { name: "一步一步教我" })).toBeVisible();
  await page.waitForFunction(() => Boolean(navigator.serviceWorker?.controller));
  await context.setOffline(true);
  const offline = await context.newPage();
  const response = await offline.goto(url);
  expect(response?.fromServiceWorker()).toBe(true);
  await offline.getByRole("button", { name: "一步一步教我" }).click();
  await offline.getByRole("button", { name: "−3x", exact: true }).click();
  await expect(offline.getByLabel("本步完整算式")).toBeVisible();
  await expectReadable(offline);
});

test("a Chapter 2 legacy hint and a written proof still use their existing flows", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto("/#/practice?problem=p12&ui=study");
  await expect(page.getByRole("button", { name: "一步一步教我" })).toHaveCount(0);
  await page.getByRole("button", { name: /看下一步/ }).click();
  await expect(page.getByText("分子分母同乘共轭根式")).toBeVisible();
  await expectReadable(page);

  await page.goto("/#/practice?problem=p204&ui=study");
  await expect(page.getByText("证明这个数列收敛，并写出极限。")).toBeVisible();
  await page.getByRole("button", { name: "查看分步解析" }).click();
  await expect(page.getByRole("heading", { name: "参考解析" })).toBeVisible();
  await expectReadable(page);
  await page.getByRole("button", { name: "我独立做对了" }).click();
  await expect(page.getByText("已记录自评通过。")).toBeVisible();
});

test("the sample stores a new P8 attempt alongside old learning records", async ({ page }) => {
  const prior = {
    completed: ["limit"],
    lastLesson: "limit",
    attempts: [{ problemId: "p3", correct: false, answer: "1", at: "2026-11-01T08:00:00.000Z", hints: 2 }],
  };
  await page.addInitScript((data) => {
    if (localStorage.getItem("mc-learning-v1") === null) localStorage.setItem("mc-learning-v1", JSON.stringify(data));
  }, prior);
  await page.goto(url);
  await page.getByRole("textbox").fill("-6");
  await page.getByRole("button", { name: "检查答案" }).click();
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("mc-learning-v1")!));
  expect(saved.completed).toEqual(prior.completed);
  expect(saved.lastLesson).toBe(prior.lastLesson);
  expect(saved.attempts[0]).toEqual(prior.attempts[0]);
  expect(saved.attempts[1]).toMatchObject({ problemId: "p8", correct: true, hints: 0 });
});


test("desktop dark mode keeps the full solution and return action separate", async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 900 });
  await page.goto(url);
  await page.getByRole("button", { name: "切换深色主题" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "查看完整解法" }).click();
  await expect(page.getByLabel("完整解析")).toBeVisible();
  await expect(page.getByRole("region", { name: "ELI5 教学步骤" })).toHaveCount(0);
  await expectReadable(page);
  await page.getByRole("button", { name: "回去作答" }).click();
  await expect(page.getByRole("button", { name: "检查答案" })).toBeVisible();
});

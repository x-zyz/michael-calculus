import { expect, test, type Locator, type Page } from "@playwright/test";
import { chapterThreeSec1MvtTeaching } from "../src/data/eli5Drafts/ch03Sec1Mvt";
import { chapters, lessons, problems } from "../src/data/learning";

const focusedUrl = "/#/practice?problem=p181";

test.beforeEach(async ({ page, isMobile }) => {
  await page.setViewportSize(isMobile ? { width: 360, height: 740 } : { width: 1280, height: 860 });
});

function referenceOn(page: Page, mobile: boolean) {
  return page.getByRole(mobile ? "dialog" : "region", { name: "公式表", exact: true });
}

async function expectReadable(reference: Locator) {
  await expect(reference.locator(".katex-error")).toHaveCount(0);
  expect(await reference.locator(".formula").evaluateAll(async (items) => {
    await document.fonts.ready;
    return items.filter((item) => item.scrollWidth > item.clientWidth + 1).map((item) => item.textContent);
  })).toEqual([]);
  expect(await reference.getByRole("tab").evaluateAll((items) =>
    items.every((item) => item.getBoundingClientRect().height >= 44 && parseFloat(getComputedStyle(item).fontSize) >= 12),
  )).toBe(true);
}

test("formula reference preserves the draft, the ELI5 step and its answered check", async ({ page, isMobile, context }) => {
  await page.goto(focusedUrl);
  const trigger = page.getByRole("button", { name: /^公式表(?:（\d+）)?$/ });
  const reference = referenceOn(page, isMobile);
  await expect(trigger).toBeVisible();
  await expect(trigger).toBeInViewport({ ratio: 1 });
  await expect(trigger).toHaveText("公式表（4）");
  await expect(trigger).toHaveClass(/btn-secondary/);
  expect((await trigger.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  const answer = page.locator("#answer");
  await answer.fill("7/9");
  await context.setOffline(true);
  const before = await page.evaluate(() => [localStorage.getItem("mc-learning-v1"), localStorage.getItem("mc-theme")]);

  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(reference.getByText("罗尔定理", { exact: true })).toBeVisible();
  await expect(reference.getByText("拉格朗日中值定理", { exact: true })).toHaveCount(0);
  await reference.getByRole("tab", { name: "本章常用公式" }).click();
  await expect(reference.getByText("拉格朗日中值定理", { exact: true })).toBeVisible();
  await expect(reference.getByText("链式法则", { exact: true })).toBeVisible();
  await expectReadable(reference);
  if (!isMobile) {
    const answerBox = await answer.boundingBox();
    const referenceBox = await reference.boundingBox();
    expect(answerBox!.x + answerBox!.width).toBeLessThan(referenceBox!.x);
    await answer.fill("5/9");
  }
  if (isMobile) await page.keyboard.press("Escape");
  else await reference.getByRole("button", { name: "关闭公式表" }).click();
  await expect(reference).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(answer).toHaveValue(isMobile ? "7/9" : "5/9");

  await page.getByRole("button", { name: "一步一步教我" }).click();
  await expect(trigger).toBeInViewport({ ratio: 1 });
  const guide = page.getByRole("region", { name: "ELI5 教学步骤" });
  const steps = chapterThreeSec1MvtTeaching.p181.steps;
  for (const step of steps.slice(0, 2)) {
    const check = step.check!;
    await guide.getByRole("button", { name: check.choices[check.correct], exact: true }).click();
    if (step === steps[0]) await guide.getByRole("button", { name: "下一步", exact: true }).click();
  }
  const check = steps[1].check!;
  const feedback = guide.getByText(check.feedback[check.correct], { exact: true });
  await expect(feedback).toBeVisible();
  await trigger.click();
  await expect(reference.getByRole("tab", { name: "本题公式" })).toHaveAttribute("aria-selected", "true");
  await reference.getByRole("button", { name: "关闭公式表" }).click();
  await expect(trigger).toBeFocused();
  await expect(guide.getByText(/第 2 步，共/)).toBeVisible();
  await expect(feedback).toBeVisible();
  await page.getByRole("button", { name: "返回题目" }).click();
  await expect(answer).toHaveValue(isMobile ? "7/9" : "5/9");
  expect(await page.evaluate(() => [localStorage.getItem("mc-learning-v1"), localStorage.getItem("mc-theme")])).toEqual(before);
});

test("classic numeric and written practice use explicit formulas and lesson fallback", async ({ page, isMobile }) => {
  const reference = referenceOn(page, isMobile);
  const trigger = page.getByRole("button", { name: /^公式表(?:（\d+）)?$/ });
  await page.goto("/#/practice?problem=p19&ui=classic");
  await expect(page.locator(".practice-question")).toBeVisible();
  await expect(trigger).toBeInViewport({ ratio: 1 });
  await page.locator("#answer").fill("12");
  await trigger.click();
  await expect(reference.getByText("拉格朗日中值定理", { exact: true })).toBeVisible();
  await expect(reference.getByText("罗尔定理", { exact: true })).toHaveCount(0);
  await reference.getByRole("button", { name: "关闭公式表" }).click();
  await expect(page.locator("#answer")).toHaveValue("12");

  await page.goto("/#/practice?problem=jc935-3-3-1&ui=classic");
  await expect(page.locator(".practice-question")).toBeVisible();
  await expect(page.getByRole("button", { name: "查看分步解析" })).toBeVisible();
  await expect(trigger).toBeInViewport({ ratio: 1 });
  await trigger.click();
  await expect(reference.getByText("罗尔定理", { exact: true })).toBeVisible();
  await expect(reference.getByText("拉格朗日中值定理", { exact: true })).toBeVisible();
  await expect(reference.getByText("柯西中值定理", { exact: true })).toBeVisible();
  await expectReadable(reference);
  await reference.getByRole("button", { name: "关闭公式表" }).click();
  await expect(trigger).toBeFocused();
  await expect(page.getByRole("button", { name: "查看分步解析" })).toBeVisible();
});

test("every chapter's reference formulas fit the available width", async ({ page, isMobile }) => {
  const reference = referenceOn(page, isMobile);
  for (const chapter of chapters) {
    const lessonIds = new Set(lessons.filter((lesson) => lesson.chapter === chapter.id).map(({ id }) => id));
    const problem = problems.find(({ lessonId }) => lessonIds.has(lessonId))!;
    await page.goto("/#/practice?problem=" + problem.id);
    await page.getByRole("button", { name: /^公式表(?:（\d+）)?$/ }).click();
    await reference.getByRole("tab", { name: "本章常用公式" }).click();
    await expect(reference.locator(".katex").first()).toBeVisible();
    await expectReadable(reference);
  }
});

test("the production PWA can reopen a problem and its reference offline", async ({ page, context, isMobile }) => {
  test.skip(!process.env.ELI5_OFFLINE_TEST, "Use the built PWA preview.");
  await page.goto(focusedUrl);
  await page.waitForFunction(() => Boolean(navigator.serviceWorker?.controller));
  await context.setOffline(true);
  const offline = await context.newPage();
  await offline.setViewportSize(page.viewportSize()!);
  const response = await offline.goto(focusedUrl);
  expect(response?.fromServiceWorker()).toBe(true);
  await offline.getByRole("button", { name: /^公式表(?:（\d+）)?$/ }).click();
  const reference = referenceOn(offline, isMobile);
  await expect(reference.getByText("罗尔定理", { exact: true })).toBeVisible();
  await expectReadable(reference);
});

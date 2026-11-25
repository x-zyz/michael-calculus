import { expect, test } from "@playwright/test";
import { problemIndex } from "../src/data/bank";

const exercise = problemIndex.find(({ id }) => id === "jc935-3-2-1-10")!;
const chapterChunk = /\/assets\/(ch0[1-8])-[^/]+\.js$/;

test.beforeEach(async ({ page, isMobile }) => {
  if (isMobile) await page.setViewportSize({ width: 360, height: 740 });
});

test("search combines chapter, teaching and method filters before opening a question", async ({ page }) => {
  await page.goto("/#/practice");
  await page.getByRole("button", { name: "题目列表" }).click();
  const dialog = page.getByRole("dialog", { name: "题目列表" });
  const search = dialog.getByRole("searchbox", { name: "搜索题目" });
  await search.fill("ＪＣ９３５-３-２-１-１０");
  await expect(dialog.getByRole("status")).toHaveText("找到 1 道题");
  await expect(dialog.getByRole("button", { name: new RegExp(exercise.title) })).toBeVisible();
  await dialog.getByRole("button", { name: /^第二章：/ }).click();
  await expect(dialog.getByRole("status")).toHaveText("找到 0 道题");
  await dialog.getByRole("button", { name: /^第三章：/ }).click();
  await dialog.getByRole("button", { name: "有 ELI5", exact: true }).click();
  await dialog.getByRole("button", { name: "有逐步提示", exact: true }).click();
  await dialog.getByRole("group", { name: "按错因标签筛选" })
    .getByRole("button", { name: "洛必达法则与未定式" }).click();
  await expect(dialog.getByRole("status")).toHaveText("找到 1 道题");
  await search.fill(exercise.source!);
  await expect(dialog.getByRole("status")).toHaveText("找到 1 道题");
  await expect(search).toBeVisible();
  expect(await search.evaluate((el) => el.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44);
  expect(await dialog.evaluate((el) => el.scrollWidth - el.clientWidth)).toBeLessThanOrEqual(1);
  await dialog.getByRole("button", { name: new RegExp(exercise.title) }).click();
  await expect(page.getByRole("heading", { name: exercise.title, exact: true })).toBeVisible();
  await expect(page).toHaveURL(/problem=jc935-3-2-1-10/);
  await expect(page.getByRole("button", { name: "一步一步教我" })).toBeVisible();
});

test.describe("production chapter chunks", () => {
  test.skip(!process.env.ELI5_OFFLINE_TEST, "Use the built PWA preview.");
  test.use({ serviceWorkers: "block" });

  test("the home page and search do not load any unselected chapter", async ({ page }) => {
    const requested = new Set<string>();
    page.on("request", (request) => {
      const match = new URL(request.url()).pathname.match(chapterChunk);
      if (match) requested.add(match[1]);
    });
    await page.goto("/#/");
    await expect(page.locator('nav a[href="#/practice"]:visible').first()).toBeVisible();
    expect([...requested]).toEqual([]);
    await page.goto("/#/practice");
    await expect(page.getByRole("heading", { name: problemIndex[0].title })).toBeVisible();
    expect([...requested]).toEqual(["ch01"]);
    await page.getByRole("button", { name: "题目列表" }).click();
    const dialog = page.getByRole("dialog", { name: "题目列表" });
    await dialog.getByRole("searchbox").fill(exercise.id);
    await expect(dialog.getByRole("status")).toHaveText("找到 1 道题");
    expect([...requested]).toEqual(["ch01"]);
    await dialog.getByRole("button", { name: new RegExp(exercise.title) }).click();
    await expect(page.getByRole("heading", { name: exercise.title })).toBeVisible();
    expect([...requested].sort()).toEqual(["ch01", "ch03"]);
  });
});

test("the PWA precaches every chapter and can navigate between them offline", async ({ page, context }) => {
  test.skip(!process.env.ELI5_OFFLINE_TEST, "Use the built PWA preview.");
  await page.goto("/#/");
  await page.waitForFunction(() => Boolean(navigator.serviceWorker.controller));
  const chapters = await page.evaluate(async (pattern) => {
    const urls = (await Promise.all((await caches.keys()).map(async (key) => (await caches.open(key)).keys()))).flat();
    return [...new Set(urls.map(({ url }) => new URL(url).pathname.match(new RegExp(pattern))?.[1]).filter(Boolean))].sort();
  }, chapterChunk.source);
  expect(chapters).toEqual(["ch01", "ch02", "ch03", "ch04", "ch05", "ch06", "ch07", "ch08"]);
  await context.setOffline(true);
  const offline = await context.newPage();
  for (const ch of [1, 3, 8]) {
    const entry = problemIndex.find((p) => p.ch === ch)!;
    await offline.goto("/#/practice?problem=" + entry.id);
    await expect(offline.getByRole("heading", { name: entry.title, exact: true })).toBeVisible();
    await expect(offline.locator(".formula .katex").first()).toBeVisible();
  }
});

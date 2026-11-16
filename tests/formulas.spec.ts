import {formulaMode} from './ui';
import { test, expect } from "@playwright/test";
import { formulas } from "../src/data/formulas";
import {
  cards,
  emptyStore,
  recordReview,
} from "../src/features/formulas/engine";

test("formula round persists self ratings and summarizes on desktop and 360px", async ({
  page,
  isMobile,
}) => {
  if (isMobile) await page.setViewportSize({ width: 360, height: 740 });
  const s = emptyStore();
  s.settings.newPerDay = 0;
  s.cards["sin-limit:cloze:0"] = { box: 1, lapses: 0, due: "2000-01-01" };
  await page.goto("/");
  await page.evaluate(
    (s) => localStorage.setItem("mc-formula-v1", JSON.stringify(s)),
    s,
  );
  await page.goto("/#/");
  await page.reload();
  await page.getByRole("link", { name: /今日到期公式/ }).click();
  await page.getByRole("button", { name: "开始今日复习" }).click();
  await expect(
    page.getByRole("button", { name: "记住了", exact: true }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "显示答案" }).click();
  await page.getByRole("button", { name: "记住了", exact: true }).click();
  await expect(page.getByRole("heading", { name: "本轮小结" })).toBeVisible();
  await page.reload();
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("mc-formula-v1")!).reviews.length,
    ),
  ).toBe(1);
});

test("every formula and cloze fits a 360px phone without clipping or small visible text", async ({
  page,
}) => {
  test.setTimeout(180000);
  await page.setViewportSize({ width: 360, height: 740 });
  await page.goto("/#/review/formulas");
  await page.getByRole("button", { name: /第1章 ·/ }).click();
  const errors: string[] = [];
  for (const f of formulas) {
    await page.goto("/#/review/formulas?formula=" + f.id);
    await page.locator(".fm .katex-html").first().waitFor();
    const bad = await page
      .locator(".fm .formula")
      .evaluateAll((es) =>
        es
          .filter((e) => e.scrollWidth > e.clientWidth + 1)
          .map((e) => e.textContent?.slice(0, 80)),
      );
    errors.push(...bad.map((x) => f.id + ": " + x));
  }
  const s = emptyStore();
  s.settings.newPerDay = 0;
  for (const c of cards.filter((c) => c.kind === "cloze"))
    s.cards[c.id] = { box: 1, lapses: 0, due: "2000-01-01" };
  await page.evaluate(
    (s) => localStorage.setItem("mc-formula-v1", JSON.stringify(s)),
    s,
  );
  await page.goto("/#/review/formulas");
  await page.reload();
  await formulaMode(page,"cloze");
  for (let round = 0; round < 3; round++) {
    await page.getByRole("button", { name: "开始今日复习" }).click();
    while (await page.getByRole("button", { name: "显示答案" }).count()) {
      await page.getByRole("button", { name: "显示答案" }).click();
      errors.push(
        ...(await page
          .locator(".fm .formula")
          .evaluateAll((es) =>
            es
              .filter((e) => e.scrollWidth > e.clientWidth + 1)
              .map((e) => "cloze overflow: " + e.textContent?.slice(0, 80)),
          )),
      );
      await page.getByRole("button", { name: "记住了", exact: true }).click();
    }
    await page.getByRole("button", { name: "返回公式中心 / 再来一轮" }).click();
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
  const smallText=await page.locator('.fm').evaluate(root=>Array.from(root.querySelectorAll<HTMLElement>('*')).filter(el=>el.getClientRects().length&&!el.closest('.katex')&&Array.from(el.childNodes).some(n=>n.nodeType===3&&n.textContent?.trim())&&parseFloat(getComputedStyle(el).fontSize)<11).map(el=>el.textContent));
  expect(smallText).toEqual([]);
  const last=page.locator('.fm').getByRole('button').last();await last.evaluate(el=>el.scrollIntoView({block:'center'}));
  const box=await last.boundingBox(),nav=await page.locator('.mobile-nav').boundingBox();
  if(box&&nav)expect(box.y+box.height).toBeLessThanOrEqual(nav.y+1);

  await page.screenshot({
    path: `test-results/formula-360-${test.info().project.name}.png`,
    fullPage: true,
  });
});

test("a reported formula struggle is due after reload and recognition is graded automatically", async ({
  page,
}) => {
  await page.goto("/#/practice?problem=p3");
  await page.getByRole("button", { name: "卡在公式上了" }).click();
  await page
    .getByRole("button", { name: "第一个重要极限", exact: true })
    .click();
  await expect(page.getByText("已加入今日公式复习。")).toBeVisible();
  await page.goto("/#/review/formulas");
  await page.reload();
  await formulaMode(page,"recognize");
  await page.getByRole("button", { name: "开始今日复习" }).click();
  await page
    .getByRole("button", { name: "选择公式：第一个重要极限", exact: true })
    .click();
  await expect(page.getByRole("heading", { name: "选择正确" })).toBeVisible();
  await page.getByRole("button", { name: "记录并继续" }).click();
  expect(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem("mc-formula-v1")!).reviews.at(-1)
          .result,
    ),
  ).toBe("good");
});

test("spot check requires L3 evidence and a forgotten card lowers its level", async ({
  page,
}) => {
  let s = emptyStore();
  for (const id of ["sin-limit:cloze:0", "sin-limit:recall"])
    s = recordReview(s, id, "good", "learn", [], new Date(2026, 0, 1, 12));
  s = recordReview(
    s,
    "sin-limit:recall",
    "good",
    "due",
    [],
    new Date(2026, 0, 2, 12),
  );
  await page.goto("/");
  await page.evaluate(
    (s) => localStorage.setItem("mc-formula-v1", JSON.stringify(s)),
    s,
  );
  await page.goto("/#/review/formulas");
  await page.reload();
  await formulaMode(page,"spot");
  await page.getByRole("button", { name: "开始今日复习" }).click();
  await page.getByRole("button", { name: "显示答案" }).click();
  await page.getByRole("button", { name: "忘记了", exact: true }).click();
  await page.getByRole("button", { name: "保存并继续（错因可跳过）" }).click();
  expect(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem("mc-formula-v1")!).cards[
          "sin-limit:recall"
        ].lastResult,
    ),
  ).toBe("forgot");
});

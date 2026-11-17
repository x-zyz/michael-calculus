import {formulaMode} from './ui';
import { test, expect } from "@playwright/test";
import { formulas } from "../src/data/formulas";
import {
  cards,
  emptyStore,
  recordReview,
} from "../src/features/formulas/engine";

test("formula round persists keyboard grades and summarizes on desktop and 360px", async ({
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
  const keyboard = page.getByRole("group", { name: "数学键盘", exact: true });
  const submit = page.getByRole("button", { name: "提交答案" });
  await expect(submit).toBeDisabled();
  await keyboard.getByRole("button", { name: "2", exact: true }).click();
  await submit.click();
  await expect(page.getByRole("heading", { name: "答案未匹配" })).toBeVisible();
  await page.getByRole("checkbox", { name: "系数" }).check();
  await page.getByRole("button", { name: "记录并继续" }).click();
  await expect(page.getByText(/第 2 \/ 2 张/)).toBeVisible();
  await keyboard.getByRole("button", { name: "1", exact: true }).click();
  await submit.click();
  await expect(page.getByRole("heading", { name: "公式正确" })).toBeVisible();
  await page.getByRole("button", { name: "记录并继续" }).click();
  await expect(page.getByRole("heading", { name: "本轮小结" })).toBeVisible();
  await page.reload();
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("mc-formula-v1")!).reviews.map((review: { result: string; errorTags: string[] }) => [review.result, review.errorTags]),
    ),
  ).toEqual([["forgot", ["coef"]], ["good", []]]);
});

test("builds a full derivative with the touch keyboard and advances recall evidence", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  const store = emptyStore();
  store.settings.newPerDay = 0;
  store.cards["diff-log:recall"] = { box: 1, lapses: 0, due: "2000-01-01" };
  await page.addInitScript((value) => {
    if (!localStorage.getItem("mc-formula-v1")) {
      localStorage.setItem("mc-formula-v1", JSON.stringify(value));
    }
  }, store);
  await page.goto("/#/review/formulas");
  await formulaMode(page, "recall");
  await page.getByRole("button", { name: "开始今日复习" }).click();

  const keyboard = page.getByRole("group", { name: "数学键盘", exact: true });
  const press = (name: string) => keyboard.getByRole("button", { name, exact: true }).click();
  await press("(");
  await press("ln");
  for (const token of ["x", ")", "导数符号", "=", "分数", "1"]) await press(token);
  await expect(page.getByRole("button", { name: "提交答案" })).toBeDisabled();
  await page.getByRole("button", { name: "向下" }).click();
  await press("x");
  await expect(page.locator("math-field")).toBeVisible();
  await page.getByRole("button", { name: "提交答案" }).click();
  await expect(page.getByRole("heading", { name: "公式正确" })).toBeVisible();
  await page.getByRole("button", { name: "记录并继续" }).click();
  const review = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("mc-formula-v1")!).reviews.at(-1),
  );
  expect(review).toMatchObject({ cardId: "diff-log:recall", result: "good" });
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
  let index = 0;
  const answers = cards.filter((c) => c.kind === "cloze").map((c) => formulas.find((f) => f.id === c.formulaId)!.cloze[c.index!].answer);
  while (index < answers.length) {
    await page.getByRole("button", { name: "开始今日复习" }).click();
    while (await page.getByRole("button", { name: "提交答案" }).count()) {
      await page.locator("math-field").evaluate((node, value) => {
        (node as HTMLElement & { value: string }).value = value;
        node.dispatchEvent(new Event("input"));
      }, answers[index++]);
      await page.getByRole("button", { name: "提交答案" }).click();
      await expect(page.getByRole("heading", { name: "公式正确" })).toBeVisible();
      errors.push(
        ...(await page
          .locator(".fm .formula")
          .evaluateAll((es) =>
            es
              .filter((e) => e.scrollWidth > e.clientWidth + 1)
              .map((e) => "cloze overflow: " + e.textContent?.slice(0, 80)),
          )),
      );
      await page.getByRole("button", { name: "记录并继续", exact: true }).click();
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
  await page.getByRole("button", { name: "跳过并看答案" }).click();
  await page.getByRole("button", { name: "记录并继续" }).click();
  expect(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem("mc-formula-v1")!).cards[
          "sin-limit:recall"
        ].lastResult,
    ),
  ).toBe("forgot");
});

test("can review a single formula before it is due and update its five lights", async ({ page }) => {
  const store = emptyStore();
  store.settings.newPerDay = 0;
  store.cards["sin-limit:cloze:0"] = {
    due: "2099-01-01", box: 1, lapses: 1, lastResult: "forgot",
  };
  store.cards["euler-zero:cloze:0"] = { due: "2000-01-01", box: 1, lapses: 0 };
  await page.addInitScript((initial) => {
    if (!localStorage.getItem("mc-formula-v1")) {
      localStorage.setItem("mc-formula-v1", JSON.stringify(initial));
    }
  }, store);
  await page.goto("/#/review/formulas");
  await page.getByRole("button", { name: /第1章 ·/ }).click();
  const row = page.getByRole("button", { name: "第一个重要极限", exact: true });
  await expect(row.locator(".fm-lights > span")).toHaveCount(5);
  await expect(row.locator('[data-lit="true"]')).toHaveCount(1);
  await row.click();
  await page.getByRole("button", { name: "复习这条公式" }).click();
  await expect(page.getByRole("heading", { name: "第一个重要极限 · 填空" })).toBeVisible();
  await page.getByRole("group", { name: "数学键盘", exact: true }).getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "提交答案" }).click();
  await page.getByRole("button", { name: "记录并继续" }).click();
  await expect(page.getByRole("heading", { name: "第一个重要极限 · 完整默写" })).toBeVisible();
  await page.getByRole("button", { name: /结束本轮/ }).click();
  await expect(page.getByRole("heading", { name: "第一个重要极限", exact: true })).toBeVisible();
  await expect(page.getByRole("img", { name: "掌握度 2 / 5" })).toBeVisible();
});

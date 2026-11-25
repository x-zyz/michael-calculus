import { teachingByProblem } from "../src/tests/bankFixture";
import { expect, test, type Locator } from "@playwright/test";
import { chainRuleRemediationModule } from "../src/data/remediation/chainRuleRemediation";


const chapterThreeSec1MvtTeaching = {
  p181: teachingByProblem.p181!,
  p20: teachingByProblem.p20!,
};

const entryLabel = "先补 2 分钟链式法则前置";
const sheetTitle = "链式法则前置速通";

test.beforeEach(async ({ page, isMobile }) => {
  await page.setViewportSize(isMobile ? { width: 360, height: 740 } : { width: 1280, height: 860 });
});

async function expectSheetLayout(sheet: Locator) {
  await expect(sheet).toBeVisible();
  const issues = await sheet.evaluate((dialog) => {
    const formulas = [...dialog.querySelectorAll<HTMLElement>(".formula")];
    const controls = [...dialog.querySelectorAll<HTMLElement>("button,input")];
    return [
      ...formulas.filter((item) => item.scrollWidth > item.clientWidth + 1),
      ...controls.filter((item) => {
        const rect = item.getBoundingClientRect();
        return rect.height < 43.9 || rect.width < 43.9;
      }),
      ...[...dialog.querySelectorAll<HTMLElement>("p,h2,h3,h4,li,label,button,input")]
        .filter((item) => parseFloat(getComputedStyle(item).fontSize) < 12),
    ].map((item) => item.textContent);
  });
  expect(issues).toEqual([]);
}

test("a registered wrong understanding check offers remediation and returns to the same step and draft", async ({ page }) => {
  await page.goto("/#/practice?problem=p181");
  await page.getByRole("textbox").fill("7");
  await page.getByRole("button", { name: "一步一步教我" }).click();
  const guide = page.getByRole("region", { name: "ELI5 教学步骤" });
  const steps = chapterThreeSec1MvtTeaching.p181.steps;
  const answerCheck = (stepIndex: number, right: boolean) => {
    const check = steps[stepIndex].check!;
    const choice = right ? check.correct : (check.correct + 1) % check.choices.length;
    return guide.getByRole("button", { name: check.choices[choice], exact: true }).click();
  };
  await answerCheck(0, true);
  await guide.getByRole("button", { name: "下一步", exact: true }).click();
  await expect(guide.getByRole("button", { name: entryLabel })).toHaveCount(0);
  await answerCheck(1, false);
  const trigger = guide.getByRole("button", { name: entryLabel });
  await expect(trigger).toBeVisible();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  const snapshot = await page.evaluate(() => [localStorage.getItem("mc-learning-v1"), localStorage.getItem("mc-theme")]);
  await trigger.click();
  const sheet = page.getByRole("dialog", { name: sheetTitle });
  await expectSheetLayout(sheet);
  await page.keyboard.press("Escape");
  await expect(sheet).toHaveCount(0);
  await expect(trigger).toBeFocused();

  await trigger.click();
  for (const [index, step] of chainRuleRemediationModule.steps.entries()) {
    const check = step.check!;
    await sheet.getByRole("button", { name: check.choices[check.correct], exact: true }).click();
    if (step.transfer) {
      await sheet.getByRole("textbox").fill(String(step.transfer.answer));
      await sheet.getByRole("button", { name: "检查迁移题" }).click();
    }
    await expectSheetLayout(sheet);
    await sheet.getByRole("button", {
      name: index === chainRuleRemediationModule.steps.length - 1 ? "完成补救并返回" : "下一步",
      exact: true,
    }).click();
  }
  await expect(sheet).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(guide.getByText(/第 2 步，共/)).toBeVisible();
  expect(await page.evaluate(() => [localStorage.getItem("mc-learning-v1"), localStorage.getItem("mc-theme")])).toEqual(snapshot);
  await answerCheck(1, true);
  await expect(trigger).toHaveCount(0);
  await page.getByRole("button", { name: "返回题目" }).click();
  await expect(page.getByRole("textbox")).toHaveValue("7");
});

test("a Rolle condition mistake and a non-3.1 MVT exercise stay outside remediation", async ({ page }) => {
  await page.goto("/#/practice?problem=p20");
  await page.getByRole("button", { name: "一步一步教我" }).click();
  const check = chapterThreeSec1MvtTeaching.p20.steps[0].check!;
  await page.getByRole("button", { name: check.choices[(check.correct + 1) % check.choices.length], exact: true }).click();
  await expect(page.getByRole("button", { name: entryLabel })).toHaveCount(0);
  await page.goto("/#/practice?problem=jc935-3-3-1");
  await expect(page.locator(".practice-question")).toBeVisible();
  await expect(page.getByRole("button", { name: "一步一步教我" })).toHaveCount(0);
});

for (const { id, correct, classic } of [
  { id: "p15", correct: "6", classic: false },
  { id: "p15", correct: "6", classic: true },
  { id: "p179", correct: "-2", classic: false },
]) {
  test(`${id}: two wrong numeric attempts offer a secondary entry (${classic ? "classic" : "focused"})`, async ({ page }) => {
    await page.goto(`/#/practice?problem=${id}` + (classic ? "&ui=classic" : ""));
    async function answer(value: string) {
      await page.getByRole("textbox").fill(value);
      await page.getByRole("button", { name: "检查答案", exact: true }).click();
    }
    await answer("999");
    const entry = page.getByRole("button", { name: entryLabel });
    await expect(entry).toHaveCount(0);
    await page.getByRole("button", { name: classic ? "再做一次" : "我再试一次" }).click();
    await answer("999");
    await expect(entry).toBeVisible();
    await expect(entry).toHaveClass(/btn-ghost/);
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await entry.click();
    const sheet = page.getByRole("dialog", { name: sheetTitle });
    await sheet.getByRole("button", { name: `关闭${sheetTitle}` }).click();
    await expect(entry).toBeFocused();
    await page.getByRole("button", { name: classic ? "再做一次" : "我再试一次" }).click();
    await answer(correct);
    await expect(entry).toHaveCount(0);
  });
}

test("course entries are available only on the two registered lessons", async ({ page }) => {
  for (const id of ["chain", "advanced-derivatives", "mvt"]) {
    await page.goto(`/#/curriculum?lesson=${id}`);
    const entry = page.getByRole("button", { name: entryLabel });
    if (id === "mvt") {
      await expect(entry).toHaveCount(0);
      continue;
    }
    await entry.click();
    const sheet = page.getByRole("dialog", { name: sheetTitle });
    await expectSheetLayout(sheet);
    await sheet.getByRole("button", { name: `关闭${sheetTitle}` }).click();
    await expect(entry).toBeFocused();
    await expect(page.getByRole("tab", { name: "直觉" })).toHaveAttribute("aria-selected", "true");
  }
});

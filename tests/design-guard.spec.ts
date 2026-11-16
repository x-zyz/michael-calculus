import { test, expect } from "@playwright/test";
const routes = [
  "/",
  "/curriculum",
  "/curriculum/limit",
  "/practice",
  "/review",
  "/review/formulas",
  "/experiments",
  "/experiments/limits",
  "/experiments/secant",
  "/experiments/derivatives",
  "/assistant",
  "/settings",
];
test("design tokens, one primary action, shared controls and first-screen tasks", async ({
  page,
  isMobile,
}) => {
  test.setTimeout(120000);
  await page.setViewportSize(
    isMobile ? { width: 360, height: 740 } : { width: 1280, height: 860 },
  );
  const issues: string[] = [];
  for (const theme of ["light", "dark"]) {
    await page.addInitScript((t) => localStorage.setItem("mc-theme", t), theme);
    for (const route of routes) {
      await page.goto("/#" + route);
      await page.reload();
      await page.locator("h1").waitFor();
      const errors = await page.evaluate(() => {
        const out: string[] = [];
        const valid = new Set([12, 14, 15, 16, 20, 24, 32]);
        if (document.documentElement.scrollWidth > innerWidth)
          out.push("horizontal page overflow");
        for (const el of document.querySelectorAll<HTMLElement>("body *")) {
          if (
            el.closest(".katex") ||
            !el.getClientRects().length ||
            !Array.from(el.childNodes).some(
              (n) => n.nodeType === 3 && n.textContent?.trim(),
            )
          )
            continue;
          const size = parseFloat(getComputedStyle(el).fontSize);
          if (!valid.has(size))
            out.push(`font ${size}: ${el.textContent?.slice(0, 25)}`);
        }
        for (const f of document.querySelectorAll<HTMLElement>(".formula"))
          if (f.getClientRects().length && f.scrollWidth > f.clientWidth + 1)
            out.push("clipped formula");
        for (const el of document.querySelectorAll<HTMLElement>(
          "a,button,input",
        )) {
          if (!el.getClientRects().length || el.closest("[hidden]")) continue;
          const r = el.getBoundingClientRect();
          if (el instanceof HTMLInputElement && el.type === "checkbox") {
            const label = el.closest("label")?.getBoundingClientRect();
            if (!label || label.height < 44) out.push("small checkbox target");
          } else if (r.width < 43.9 || r.height < 43.9)
            out.push(
              `small target ${r.width}×${r.height}: ${el.textContent?.slice(0, 25)}`,
            );
        }
        return out;
      });
      issues.push(...errors.map((e) => `${theme} ${route}: ${e}`));
      expect(
        await page.locator(".btn-primary:visible").count(),
        route,
      ).toBeLessThanOrEqual(1);
      await expect(
        page.locator("main select,main details,main input[type=number]"),
      ).toHaveCount(0);
      if (isMobile) {
        const target =
          route === "/practice"
            ? page.locator("#answer")
            : route === "/curriculum/limit"
              ? page.getByTestId("lesson-content").locator("p").first()
              : route === "/review/formulas"
                ? page.getByRole("button", { name: "开始今日复习" })
                : route.startsWith("/experiments/")
                  ? page.getByRole("img").first()
                  : null;
        if (target) {
          await expect(target).toBeVisible();
          const box = await target.boundingBox();
          expect(box?.y, route).toBeLessThan(740);
        }
      }
    }
  }
  expect(issues).toEqual([]);
});

test("explanations stay inside the phone and never submit the answer form", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await page.goto("/#/practice");
  const tip = page.getByRole("button", { name: "判分说明", exact: true });
  await tip.click();
  const dialog = page.getByRole("dialog", { name: "判分说明", exact: true });
  await expect(dialog).toBeVisible();
  const box = await dialog.boundingBox();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(360);
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(tip).toBeFocused();
  await expect(page.getByText(/^请输入有效的数值或分数/)).toHaveCount(0);
  expect(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem("mc-learning-v1") || '{"attempts":[]}')
          .attempts.length,
    ),
  ).toBe(0);
});

import { test } from '@playwright/test';

// Visual acceptance helper: captures every main screen for manual review.
// Run with: SCREENSHOTS=1 npx playwright test tests/screens.spec.ts --project=desktop
test.skip(!process.env.SCREENSHOTS, 'Set SCREENSHOTS=1 to capture review screenshots.');

const routes = [
  ['home', '/#/'],
  ['curriculum', '/#/curriculum?lesson=limit'],
  ['practice', '/#/practice'],
  ['review', '/#/review'],
  ['experiments', '/#/experiments'],
  ['assistant', '/#/assistant'],
] as const;

const tabs = ['直觉', '实验', '定义', '例题', '练习'];

for (const [width, height, label] of [[360, 740, 'phone360'], [1280, 860, 'desktop']] as const) {
  for (const theme of ['light', 'dark'] as const) {
    test(`screens ${label} ${theme}`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.addInitScript(t => localStorage.setItem('mc-theme', t), theme);
      const out = (name: string) => `test-results/screens/${label}-${theme}-${name}.png`;
      for (const [name, url] of routes) {
        await page.goto(url);
        await page.waitForTimeout(250);
        await page.screenshot({ path: out(name), fullPage: true });
      }
      for (const lesson of ['limit', 'sine', 'euler', 'infinitesimal', 'continuity', 'derivative', 'rules', 'chain', 'differential']) {
        await page.goto(`/#/curriculum?lesson=${lesson}`);
        for (const tab of tabs) {
          await page.getByRole('tab', { name: tab }).click();
          await page.waitForTimeout(150);
          await page.screenshot({ path: out(`lesson-${lesson}-${tab}`), fullPage: true });
        }
      }
      await page.goto('/#/practice');
      for (let i = 1; i <= 18; i++) {
        await page.getByRole('button', { name: `第 ${i} 题`, exact: true }).click();
        await page.screenshot({ path: out(`problem-${i}`), fullPage: true });
      }
      await page.goto('/#/experiments');
      for (const kind of ['hole', 'sine', 'euler', 'infinitesimal', 'jump']) {
        await page.getByLabel('选择实验函数').selectOption(kind);
        await page.screenshot({ path: out(`exp-${kind}`), fullPage: true });
      }
    });
  }
}

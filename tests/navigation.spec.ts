import { test, expect } from '@playwright/test';
const pages = ['课程中心', '数学实验室', '练习中心', '错题与复习', 'AI 教师', '学习首页'];
test('all modules remain reachable on desktop and mobile', async ({ page, isMobile }) => {
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: isMobile ? '移动导航' : '主导航', exact: true });
  const mobileLabels = ['课程', '实验', '练习', '复习', '教师', '首页'];
  for (let index = 0; index < pages.length; index++) {
    await nav.getByRole('link', { name: isMobile ? mobileLabels[index] : pages[index], exact: true }).click();
    await expect(nav.getByRole('link')).toHaveCount(6);
    if (pages[index] !== '学习首页') await expect(page.getByRole('heading', { level: 1, name: pages[index], exact: true })).toBeVisible();
    else await expect(page.getByRole('heading', { level: 1, name: /今天/ })).toBeVisible();
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
test('theme survives a page reload', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '切换深色主题' }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: '切换浅色主题' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

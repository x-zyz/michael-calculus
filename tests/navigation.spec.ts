import { test, expect } from '@playwright/test';

const pages = [
  { heading: '课程中心', mobile: '课程' },
  { heading: '数学图像', mobile: '图像' },
  { heading: '练习中心', mobile: '练习' },
  { heading: '公式记忆中心', mobile: '公式' },
  { heading: '学习首页', mobile: '首页' },
];

test('learning navigation shows available tools and keeps the AI status reachable from home', async ({ page, isMobile }) => {
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: isMobile ? '移动导航' : '主导航', exact: true });
  await expect(nav.getByRole('link')).toHaveCount(pages.length);
  for (const { heading, mobile } of pages) {
    await nav.getByRole('link', { name: isMobile ? mobile : heading, exact: true }).click();
    await expect(page.getByRole('heading', { level: 1, name: heading, exact: true })).toBeVisible();
  }
  await page.getByRole('link', { name: 'AI 教师 · 尚未开放 →' }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'AI 教师' })).toBeVisible();
  await expect(page.getByText('尚未开放。本版本尚未提供 AI 问答。')).toBeVisible();
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

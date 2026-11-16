import { test, expect, type Page } from '@playwright/test';

// Browser acceptance for the limit & derivative learning loops (desktop + phone projects).

const allLessons = ['limit', 'sine', 'euler', 'infinitesimal', 'continuity', 'derivative', 'rules', 'chain', 'differential', 'mvt', 'lhopital', 'extrema'];
const tabs = ['直觉', '实验', '定义', '例题', '练习'];

async function layoutProblems(page: Page) {
  return page.evaluate(() => {
    const out: string[] = [];
    const vw = document.documentElement.clientWidth;
    if (document.documentElement.scrollWidth > vw) out.push(`page overflow ${document.documentElement.scrollWidth}>${vw}`);
    document.querySelectorAll<HTMLElement>('.formula').forEach(f => {
      if (f.scrollWidth > f.clientWidth + 1) out.push(`formula clipped: ${f.querySelector('annotation')?.textContent}`);
    });
    if (vw <= 760) {
      document.querySelectorAll<HTMLElement>('body *').forEach(el => {
        const own = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent!.trim());
        if (!own || el.closest('svg,.katex') || !el.getClientRects().length) return;
        const fs = parseFloat(getComputedStyle(el).fontSize);
        if (fs > 0 && fs < 11) out.push(`text ${fs}px: ${el.textContent!.trim().slice(0, 20)}`);
      });
    }
    return out;
  });
}

test.describe('phone layout', () => {
  test.beforeEach(async ({ page }) => page.setViewportSize({ width: 360, height: 740 }));

  test('pages, all 12 lessons and all 24 problems fit a 360px screen with readable text', async ({ page }) => {
    const issues: string[] = [];
    for (const url of ['/#/', '/#/experiments', '/#/practice', '/#/review', '/#/assistant']) {
      await page.goto(url);
      issues.push(...(await layoutProblems(page)).map(p => `${url} ${p}`));
    }
    for (const lesson of allLessons) {
      await page.goto(`/#/curriculum?lesson=${lesson}`);
      for (const tab of tabs) {
        await page.getByRole('tab', { name: tab }).click();
        issues.push(...(await layoutProblems(page)).map(p => `${lesson}/${tab} ${p}`));
      }
    }
    await page.goto('/#/practice');
    for (let i = 1; i <= 24; i++) {
      await page.getByRole('button', { name: `第 ${i} 题`, exact: true }).click();
      issues.push(...(await layoutProblems(page)).map(p => `problem ${i} ${p}`));
    }
    expect(issues).toEqual([]);
  });

  test('bottom navigation never covers the last control', async ({ page }) => {
    for (const url of ['/#/', '/#/curriculum', '/#/experiments', '/#/practice', '/#/review']) {
      await page.goto(url);
      const covered = await page.evaluate(async () => {
        window.scrollTo(0, document.documentElement.scrollHeight);
        await new Promise(r => requestAnimationFrame(r));
        const navTop = document.querySelector('.mobile-nav')!.getBoundingClientRect().top;
        const controls = [...document.querySelectorAll<HTMLElement>('main a, main button, main input')];
        const last = controls[controls.length - 1];
        return last.getBoundingClientRect().bottom > navTop ? last.textContent : null;
      });
      expect(covered, url).toBeNull();
    }
  });
});

test('full learning loop persists across reloads', async ({ page }) => {
  await page.goto('/#/curriculum?lesson=limit');
  await expect(page.getByRole('heading', { level: 2, name: '函数极限' })).toBeVisible();
  for (const tab of ['定义', '例题']) {
    await page.getByRole('tab', { name: tab }).click();
    await expect(page.locator('.formula .katex').first()).toBeVisible();
  }
  await page.getByRole('button', { name: '标记已完成阅读' }).click();
  await expect(page.getByRole('button', { name: '✓ 已完成阅读' })).toBeVisible();

  await page.getByRole('tab', { name: '练习' }).click();
  await page.getByRole('link', { name: /开始本节练习/ }).click();
  await expect(page.getByRole('heading', { level: 2, name: '约分后再求极限' })).toBeVisible();

  // Invalid input is rejected without recording an attempt.
  await page.getByLabel('请输入数值或分数').fill('x+1');
  await page.getByRole('button', { name: '检查答案' }).click();
  await expect(page.getByRole('alert')).toContainText('请输入有效的数值或分数');

  await page.getByRole('button', { name: /给我提示/ }).click();
  await expect(page.getByText('这是 0/0 型未定式。')).toBeVisible();
  await page.getByLabel('请输入数值或分数').fill('0');
  await page.getByRole('button', { name: '检查答案' }).click();
  await expect(page.getByRole('status')).toContainText('此题已加入待复习');

  await page.reload();
  await page.goto('/#/review');
  await expect(page.getByText('累计作答 1 次 · 答对 0 次 · 待复习 1 题')).toBeVisible();
  await expect(page.getByText('你的答案：0 · 使用提示 1 次', { exact: false })).toBeVisible();

  await page.getByRole('link', { name: '重新练习' }).click();
  await page.getByLabel('请输入数值或分数').fill('4/2');
  await page.getByRole('button', { name: '检查答案' }).click();
  await expect(page.getByRole('status')).toContainText('✓ 回答正确');

  await page.reload();
  await page.goto('/#/review');
  await expect(page.getByText('累计作答 2 次 · 答对 1 次 · 待复习 0 题')).toBeVisible();
  await expect(page.getByText('目前没有待复习错题')).toBeVisible();

  await page.goto('/#/');
  await expect(page.getByText('已学 1 / 12 节', { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: /继续学习/ })).toBeVisible();
});

test('data written by 0.2.0 is kept after an upgrade', async ({ page }) => {
  await page.addInitScript(() => {
    if (sessionStorage.getItem('seeded')) return;
    sessionStorage.setItem('seeded', '1');
    localStorage.setItem('mc-theme', 'dark');
    localStorage.setItem('mc-learning-v1', JSON.stringify({
      completed: ['limit', 'sine'],
      lastLesson: 'sine',
      attempts: [{ problemId: 'p3', correct: false, answer: '1', at: '2026-11-01T08:00:00.000Z', hints: 2 }],
    }));
  });
  await page.goto('/#/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByText('已学 2 / 12 节', { exact: true })).toBeVisible();
  await page.getByRole('link', { name: /继续学习/ }).click();
  await expect(page.getByRole('heading', { level: 2, name: '第一个重要极限' })).toBeVisible();
  await page.goto('/#/review');
  await expect(page.getByRole('heading', { level: 3, name: '配齐自变量与分母' })).toBeVisible();
});

test('limit and secant experiments react to controls and match each lesson', async ({ page }) => {
  await page.goto('/#/experiments');
  const left = page.getByTestId('left-value');
  const right = page.getByTestId('right-value');
  await page.getByLabel(/逼近距离/).fill('10');
  await expect(left).toContainText('x = 0.9000');
  await expect(left).toContainText('左侧 f(x) = 1.900000');
  await page.getByLabel(/逼近距离/).fill('40');
  await expect(left).toContainText('左侧 f(x) = 1.999900');
  await expect(right).toContainText('右侧 f(x) = 2.000100');

  await page.getByLabel('选择实验函数').selectOption('euler');
  await expect(left).toContainText('左侧 f(x) = 2.718418');
  await expect(right).toContainText('右侧 f(x) = 2.718146');

  await page.getByLabel('选择实验函数').selectOption('infinitesimal');
  await expect(left).toContainText('左侧 f(x) = 0.500000');
  await expect(right).toContainText('右侧 f(x) = 0.500000');

  await page.getByLabel('选择实验函数').selectOption('jump');
  await expect(left).toContainText('左侧 f(x) = 0.000000');
  await expect(right).toContainText('右侧 f(x) = 1.000000');
  await expect(page.getByText('双侧极限不存在').first()).toBeVisible();

  // Secant-to-tangent and differential linear approximation experiment
  const secant = page.getByTestId('secant-slope');
  const approx = page.getByTestId('linear-approx');
  await page.getByLabel(/步长 h =/).fill('40');
  await expect(secant).toContainText('割线斜率 Δy / h = 2.001900');
  await expect(approx).toContainText('微分线性近似 dy = f\'(x₀)h = 0.003800');
  await expect(approx).toContainText('高阶误差比 |Δy − dy| / |h| = 0.001900');
  await page.getByRole('button', { name: /左侧逼近/ }).click();
  await expect(secant).toContainText('割线斜率 Δy / h = 1.998100');

  for (const [lesson, kind] of [
    ['limit', 'hole'],
    ['sine', 'sine'],
    ['euler', 'euler'],
    ['infinitesimal', 'infinitesimal'],
    ['continuity', 'jump'],
  ]) {
    await page.goto(`/#/curriculum?lesson=${lesson}`);
    await page.getByRole('tab', { name: '实验' }).click();
    await expect(page.getByLabel('选择实验函数')).toHaveValue(kind);
  }
  for (const [lesson, kind] of [
    ['derivative', 'square'],
    ['rules', 'cubic'],
    ['chain', 'chain'],
    ['differential', 'sqrt'],
  ]) {
    await page.goto(`/#/curriculum?lesson=${lesson}`);
    await page.getByRole('tab', { name: '实验' }).click();
    await expect(page.getByTestId('secant-experiment')).toBeVisible();
    await expect(page.getByLabel('选择导数实验函数')).toHaveValue(kind);
  }
  for (const [lesson, kind] of [
    ['mvt', 'mvt'],
    ['lhopital', 'lhopital'],
    ['extrema', 'extrema'],
  ]) {
    await page.goto(`/#/curriculum?lesson=${lesson}`);
    await page.getByRole('tab', { name: '实验' }).click();
    await expect(page.getByTestId('derivative-app-experiment')).toBeVisible();
    await expect(page.getByLabel('选择导数应用实验')).toHaveValue(kind);
  }
});

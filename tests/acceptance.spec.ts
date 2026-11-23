import {chooseSelect} from './ui';
import { test, expect, type Page } from '@playwright/test';

import { lessons, problems } from "../src/data/learning";

async function layoutProblems(page: Page) {
  return page.evaluate(() => {
    const out: string[] = [];
    const vw = document.documentElement.clientWidth;
    if (document.documentElement.scrollWidth > vw) out.push(`page overflow ${document.documentElement.scrollWidth}>${vw}`);
    document.querySelectorAll<HTMLElement>('.formula').forEach(f => {
      if (f.getClientRects().length && f.scrollWidth > f.clientWidth + 1) out.push(`formula clipped: ${f.querySelector('annotation')?.textContent}`);
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

  test('pages and all lesson steps fit a 360px screen with readable text', async ({ page }) => {
    test.setTimeout(600000);
    const issues: string[] = [];
    for (const url of ['/#/', '/#/experiments', '/#/practice', '/#/review', '/#/assistant']) {
      await page.goto(url);
      issues.push(...(await layoutProblems(page)).map(p => `${url} ${p}`));
    }
    for (const { id: lesson } of lessons) {
      await page.goto(`/#/curriculum?lesson=${lesson}`);
      await expect(page.getByRole('tab', { name: '直觉' })).toBeVisible();
      const tabs = await page.getByLabel('学习环节').getByRole('tab').allTextContents();
      for (const tab of tabs) {
        await page.getByRole('tab', { name: tab, exact: true }).click();
        issues.push(...(await layoutProblems(page)).map(p => `${lesson}/${tab} ${p}`));
      }
    }
    expect(issues).toEqual([]);
  });

  const batchSize = 250;
  for (let start = 0; start < problems.length; start += batchSize) {
    const batch = problems.slice(start, start + batchSize);
    test(`problems ${start + 1}–${start + batch.length} fit a 360px screen`, async ({ page }) => {
      test.setTimeout(180000);
      const issues: string[] = [];
      for (const problem of batch) {
        await page.goto(`/#/practice?ui=classic&problem=${problem.id}`);
        const exercise = page.locator(".practice-question");
        await exercise.getByRole("heading", { name: problem.title, exact: true }).waitFor();
        if ("kind" in problem) {
          await exercise.getByRole("button", { name: "查看分步解析" }).dispatchEvent("click");
          await expect(exercise.locator(".answer-feedback")).toBeVisible();
          await expect(exercise.locator(".katex-error")).toHaveCount(0);
        }
        issues.push(...(await layoutProblems(page)).map((issue) => `${problem.id}: ${issue}`));
      }
      expect(issues).toEqual([]);
    });
  }

  test('guided algebra hints fit at 360px and explain every change', async ({ page }) => {
    await page.goto('/#/practice?ui=classic&problem=p128');
    const next = page.getByRole('button', { name: /看下一步/ });
    const hints = page.getByRole('list', { name: '已展开的提示' });
    for (let step = 1; step <= 6; step++) {
      await next.click();
      await expect(hints.getByRole('listitem')).toHaveCount(step);
      const latest = hints.getByRole('listitem').last();
      await expect(latest.getByText('这一步的变化')).toBeVisible();
      await expect(latest.getByText('怎么算的')).toBeVisible();
    }
    await expect(next).toBeDisabled();
    await expect(hints.locator('.katex-error')).toHaveCount(0);
    expect(await layoutProblems(page)).toEqual([]);
  });

  test('bottom navigation never covers the last control', async ({ page }) => {
    for (const url of ['/#/', '/#/curriculum', '/#/experiments', '/#/practice', '/#/review']) {
      await page.goto(url);
      const covered = await page.evaluate(async () => {
        window.scrollTo(0, document.documentElement.scrollHeight);
        await new Promise(r => requestAnimationFrame(r));
        const navTop = document.querySelector('.mobile-nav')!.getBoundingClientRect().top;
        const controls = [...document.querySelectorAll<HTMLElement>('main a, main button, main input')];
        const visible=controls.filter(el=>el.getClientRects().length);
        const last = visible[visible.length - 1];
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
  await page.getByRole('tab',{name:'练习',exact:true}).click();
  await expect(page.getByText(/已完成阅读/)).toBeVisible();

  await page.getByRole('tab', { name: '练习' }).click();
  await page.getByRole('link', { name: /完成阅读，开始练习/ }).click();
  await expect(page.getByRole('heading', { name: '约分后再求极限', exact: true })).toBeVisible();

  // Invalid input is rejected without recording an attempt.
  await page.getByLabel('请输入数值或分数').fill('x+1');
  await page.getByRole('button', { name: '检查答案' }).click();
  await expect(page.getByRole('alert')).toContainText('请输入有效的数值或分数');

  await page.getByRole('button', { name: '一步一步教我' }).click();
  await page.getByRole('button', { name: '返回题目' }).click();
  await page.getByLabel('请输入数值或分数').fill('0');
  await page.getByRole('button', { name: '检查答案' }).click();
  await expect(page.getByRole('status')).toContainText('已加入错题');
  await page.getByRole('link', { name: '查看错题' }).click();
  await page.reload();
  await expect(page).toHaveURL(/#\/practice\/mistakes$/);
  await expect(page.getByText('累计作答 1 次 · 答对 0 次 · 待复习 1 题')).toBeVisible();
  await page.getByRole('button',{name:'最近 20 次作答',exact:true}).click();
  await expect(page.getByText('你的答案：0 · 使用提示 1 次', { exact: false })).toBeVisible();

  await page.getByRole('link', { name: '重新练习' }).click();
  await page.getByLabel('请输入数值或分数').fill('4/2');
  await page.getByRole('button', { name: '检查答案' }).click();
  await expect(page.getByRole('status')).toContainText('回答正确');

  await page.reload();
  await page.goto('/#/review');
  await expect(page.getByText('累计作答 2 次 · 答对 1 次 · 待复习 0 题')).toBeVisible();
  await expect(page.getByText('目前没有待复习错题')).toBeVisible();

  await page.goto('/#/');
  await expect(page.getByText(`已学 1 / ${lessons.length} 节`, { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: /继续学习/ })).toBeVisible();
});

test('chapter six connects textbook sections, practice, and formula review', async ({ page }) => {
  await page.goto('/#/curriculum');
  const outline = page.getByRole('complementary', { name: '课程大纲' });
  await outline.getByRole('button', { name: /多元函数微积分/ }).click();
  await expect(outline.getByRole('heading', { name: '§6.10 二重积分的变量代换法' })).toBeVisible();
  await expect(outline.getByRole('link', { name: /无界区域上的反常二重积分.*选学/ })).toBeVisible();
  await outline.getByRole('link', { name: '方向导数与梯度' }).click();
  await page.getByRole('tab', { name: '定义' }).click();
  await page.getByRole('link', { name: /背这节的公式/ }).click();
  await expect(page.getByRole('button', { name: /第6章 · 2 个公式/ })).toBeVisible();
  await page.goBack();
  await page.getByRole('tab', { name: '练习' }).click();
  await page.getByRole('link', { name: /完成阅读，开始练习/ }).click();
  await expect(page.getByRole('heading', { name: /求沿向量/ })).toBeVisible();
  await page.getByLabel('请输入数值或分数').fill('-3');
  await page.getByRole('button', { name: '检查答案' }).click();
  await expect(page.getByRole('status')).toContainText('✓ 回答正确');
});

test('chapters seven and eight connect the textbook outline to worked practice', async ({ page }) => {
  await page.goto('/#/curriculum');
  const outline = page.getByRole('complementary', { name: '课程大纲' });
  await outline.getByRole('button', { name: /无穷级数/ }).click();
  await outline.getByRole('button', { name: /常微分方程及差分方程/ }).click();
  await expect(outline.getByRole('heading', { name: '*§7.6 幂级数的简单应用' })).toBeVisible();
  await expect(outline.getByRole('link', { name: '二阶常系数线性差分方程 · 选学' })).toBeVisible();
  await outline.getByRole('link', { name: '泰勒公式与函数的幂级数展开' }).click();
  await page.getByRole('tab', { name: '定义' }).click();
  await page.getByRole('link', { name: /背这节的公式/ }).click();
  await expect(page.getByRole('button', { name: /第7章 · 2 个公式/ })).toBeVisible();
  await page.goBack();
  await page.getByRole('tab', { name: '练习' }).click();
  await page.getByRole('link', { name: /完成阅读，开始练习/ }).click();
  await expect(page.getByRole('heading', { name: /sin x 的 x³ 项系数/ })).toBeVisible();
  await page.getByLabel('请输入数值或分数').fill('-1/6');
  await page.getByRole('button', { name: '检查答案' }).click();
  await expect(page.getByRole('status')).toContainText('✓ 回答正确');

  await page.goto('/#/curriculum');
  await outline.getByRole('button', { name: /常微分方程及差分方程/ }).click();
  await outline.getByRole('link', { name: '差分方程在经济分析中的应用' }).click();
  await page.getByRole('tab', { name: '练习' }).click();
  await page.getByRole('link', { name: /完成阅读，开始练习/ }).click();
  await expect(page.getByRole('heading', { name: '求市场的均衡价格' })).toBeVisible();
  await page.getByLabel('请输入数值或分数').fill('5');
  await page.getByRole('button', { name: '检查答案' }).click();
  await expect(page.getByRole('status')).toContainText('✓ 回答正确');
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
  await expect(page.getByText(`已学 2 / ${lessons.length} 节`, { exact: true })).toBeVisible();
  await page.getByRole('link', { name: /继续学习/ }).click();
  await expect(page.getByRole('heading', { level: 2, name: '第一个重要极限' })).toBeVisible();
  await page.goto('/#/review');
  await expect(page.getByRole('heading', { level: 3, name: '配齐自变量与分母' })).toBeVisible();
});

test('limit and secant experiments react to controls and match each lesson', async ({ page }) => {
  await page.goto('/#/experiments/limits');
  const left = page.getByTestId('left-value');
  const right = page.getByTestId('right-value');
  await page.getByLabel(/逼近距离/).fill('10');
  await expect(left).toContainText('x = 0.9000');
  await expect(left).toContainText('左侧 f(x) = 1.900000');
  await page.getByLabel(/逼近距离/).fill('40');
  await expect(left).toContainText('左侧 f(x) = 1.999900');
  await expect(right).toContainText('右侧 f(x) = 2.000100');

  await chooseSelect(page,'选择实验函数','euler');
  await expect(left).toContainText('左侧 f(x) = 2.718418');
  await expect(right).toContainText('右侧 f(x) = 2.718146');

  await chooseSelect(page,'选择实验函数','infinitesimal');
  await expect(left).toContainText('左侧 f(x) = 0.500000');
  await expect(right).toContainText('右侧 f(x) = 0.500000');

  await chooseSelect(page,'选择实验函数','jump');
  await expect(left).toContainText('左侧 f(x) = 0.000000');
  await expect(right).toContainText('右侧 f(x) = 1.000000');
  await expect(page.getByText('双侧极限不存在').first()).toBeVisible();

  await page.goto('/#/experiments/secant');
  await page.getByRole('button',{name:'详细数值',exact:true}).click();
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
    await expect(page.getByLabel('选择实验函数')).toHaveAttribute('data-value',kind);
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
    await expect(page.getByLabel('选择导数实验函数')).toHaveAttribute('data-value',kind);
  }
  for (const [lesson, kind] of [
    ['mvt', 'mvt'],
    ['lhopital', 'lhopital'],
    ['extrema', 'extrema'],
  ]) {
    await page.goto(`/#/curriculum?lesson=${lesson}`);
    await page.getByRole('tab', { name: '实验' }).click();
    await expect(page.getByTestId('derivative-app-experiment')).toBeVisible();
    await expect(page.getByLabel('选择导数应用实验')).toHaveAttribute('data-value',kind);
  }
});

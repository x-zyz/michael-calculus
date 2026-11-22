# 第四章后段（习题 4-5 与总习题四）原创同构题库复核报告

## 覆盖范围与清点结果

- **4-5（积分表的使用）**：共 25 题（第 1 题至第 25 题，均无小题），全部集成于 `src/data/bankChapterFourTail.ts`（`jc935-4-5-1` 至 `jc935-4-5-25`）。
- **4-review（第四章总习题）**：共 45 题（第 1 题 2 小题、第 2 题 2 小题、第 3 题 1 题、第 4 题 40 小题），全部集成于 `src/data/bankChapterFourTail.ts`（`jc935-4-review-1-1` 至 `jc935-4-review-4-40`）。
- **合计**：70 题（69 题 SymPy 符号求导验算 + 1 题概念辨析人工复核）。

## 校验方式

1. **符号验证（69 题）**：运行 `python scripts/check-bank-4-5-4-review.py`，对全部 69 道可计算不定积分与初值问题逐一验证 $\frac{\mathrm{d}}{\mathrm{d}x}F(x) - f(x) = 0$，并对 `jc935-4-review-2-1` 额外验证初值条件 $f(1)=2$。
2. **人工复核（1 题）**：
   - `jc935-4-review-2-2`（微分与不定积分互逆关系辨析）：设 $g(x)$ 可微，
     - (A) $\int g'(x)\,\mathrm{d}x = g(x)+C$，缺 $+C$ 故不恒成立；
     - (B) $\int \mathrm{d}g(x) = g(x)+C$，缺 $+C$ 故不恒成立；
     - (C) $\mathrm{d}\!\int g(x)\,\mathrm{d}x = \left(\frac{\mathrm{d}}{\mathrm{d}x}\!\int g(x)\,\mathrm{d}x\right)\mathrm{d}x = g(x)\,\mathrm{d}x$，恒成立；
     - (D) $\frac{\mathrm{d}}{\mathrm{d}x}\!\int g(x)\,\mathrm{d}x = g(x)$，右端不应带 $\mathrm{d}x$，故不成立。
     逻辑严密无误。
3. **原创同构性与格式校验**：
   - 全部 70 题均采用原创系数、函数或变形结构，保持与对应考点一致的方法与难度，不含任何非中性命名或原题照搬。
   - 全部 `formula` 与 `solution` 通过 KaTeX `strict: "error"` 渲染检查，宽公式采用 `\begin{gathered}...\end{gathered}` 分行以保证 360px 移动端不裁剪，非 LaTeX 字段不含 `\,`。
   - TypeScript `tsc --noEmit` 编译通过。

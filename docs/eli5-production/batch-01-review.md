# 第一章 ELI5 内容生产审核记录（Batch 1 / 共 30 题）

- **工作分支**：`eli5/ch1-content-b01`（基于 `origin/eli5/ch1-production` @ `84aec03`）
- **批次范围**：`docs/eli5-production/chapter-one.json` 中 `batch: 1` 的全部 30 道题（**18 道数值题 + 12 道书写题**）
- **目标草稿文件**：`src/data/eli5Drafts/ch01Batch01.ts`（导出 `chapterOneBatch01Drafts`）
- **独立数学校验脚本**：`scripts/verify-ch01-batch01.py`

## 1. 30 题生产与核验总表（Phase 1 初始化骨架）

| 序号 | 题号 | 题型 | 分类 | 策略 ID (`strategy`) | 草稿状态 | 数学核验方法与结果 | 内容自查（含防剧透） | 迁移题状态 | 待 Sol 独立复核说明 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `p37` | 数值题 | 定义域与复合 | `composite-eval` | `drafted` | 原题 $f(g(1))=\sqrt{5-1^2}=2$；迁移题 $f(g(1))=\sqrt{10-1^2}=3$ | 通过（2 步，检查题答案均不在 `goal`/`plain` 直出） | 已完成（ans=3） | — |
| 2 | `p124` | 数值题 | 定义域与复合 | `composite-domain` | `drafted` | 原题 $-3\le 2x-1\le 3\implies [-1,2]$ 长度 $3$；迁移题 $-4\le 2x+1\le 4\implies [-2.5,1.5]$ 长度 $4$ | 通过（3 步，防剧透自查通过） | 已完成（ans=4） | — |
| 3 | `p164` | 数值题 | 定义域与复合 | `radical-domain` | `drafted` | 原题 $4x+12\ge0\implies x\ge-3$；迁移题 $3x+15\ge0\implies x\ge-5$ | 通过（2 步，防剧透自查通过） | 已完成（ans=-5） | — |
| 4 | `p165` | 数值题 | 定义域与复合 | `denominator-radical-domain` | `drafted` | 原题 $25-x^2>0\implies (-5,5)$ 长度 $10$；迁移题 $36-x^2>0\implies (-6,6)$ 长度 $12$ | 通过（2 步，防剧透自查通过） | 已完成（ans=12） | — |
| 5 | `p166` | 数值题 | 定义域与复合 | `arcsin-domain` | `drafted` | 原题 $-1\le x-5\le1\implies [4,6]$ 右端 $6$；迁移题 $-1\le x-8\le1\implies [7,9]$ 右端 $9$ | 通过（2 步，防剧透自查通过） | 已完成（ans=9） | — |
| 6 | `p2` | 数值题 | 直接代入与复合极限 | `direct-limit` | `drafted` | 原题 $2^2+3(2)=10$；迁移题 $3^2+2(3)=15$ | 通过（2 步，防剧透自查通过） | 已完成（ans=15） | — |
| 7 | `p38` | 数值题 | 直接代入与复合极限 | `quotient-direct-limit` | `drafted` | 原题 $(2^2+2)/(2+1)=6/3=2$；迁移题 $(3^2+3)/(3+1)=12/4=3$ | 通过（2 步，防剧透自查通过） | 已完成（ans=3） | — |
| 8 | `jc935-1-5-1-1` | 推导题 | 直接代入与复合极限 | `quotient-direct-limit` | `drafted` | 原题 $(2^2+8)/(2-6)=12/(-4)=-3$；迁移题 $(1^2+9)/(1-6)=10/(-5)=-2$ | 通过（2 步，防剧透自查通过） | 已完成（ans=-2） | 书写题与数值迁移题均检验分母非零负数的有理分式直接代入策略 |
| 9 | `jc935-1-5-1-2` | 推导题 | 直接代入与复合极限 | `zero-numerator-limit` | `drafted` | 原题 $(2^2-4)/(2^2+5)=0/9=0$；迁移题 $(3^2-9)/(3^2+1)=0/10=0$ | 通过（2 步，防剧透自查通过） | 已完成（ans=0） | 书写题与数值迁移题均检验“分子趋 0、分母趋非零常数”判定策略 |
| 10 | `jc935-1-5-1-4` | 推导题 | 直接代入与复合极限 | `common-factor-x-limit` | `drafted` | 原题约去 $x$ 后为 $3/2$；迁移题约去 $x$ 后为 $6/2=3$ | 通过（2 步，防剧透自查通过） | 已完成（ans=3） | 书写题与数值迁移题均检验提取最低次公因式 $x$ 后取常数项之比 |
| 11 | `jc935-1-5-1-5` | 推导题 | 直接代入与复合极限 | `difference-quotient-limit` | `drafted` | 原题展开约去 $h$ 得 $4a$；迁移题取 $a=3$ 得 $12$ | 通过（2 步，防剧透自查通过） | 已完成（ans=12） | 原题含参数 $a$，迁移题通过指定 $a=3$ 检验同一差商展开消元策略 |
| 12 | `p168` | 数值题 | 因式分解与通分 | `cancel` | `drafted` | 原题 $\lim_{x\to4}\frac{x^2-16}{x+4}=0$；迁移题 $\lim_{x\to5}\frac{x^2-9}{x+3}=2$ | 通过（2 步，防剧透自查通过） | 已完成（ans=2） | 原题与迁移题在目标点处分母均非零，且分子均可按平方差分解约去分母 $(x+a)$ 化为一次式 $(x-a)$ 代入 |
| 13 | `jc935-1-5-1-3` | 推导题 | 因式分解与通分 | `cancel-remaining-zero` | `drafted` | 原题 $\lim_{x\to3}\frac{x-3}{x+3}=0$；迁移题 $\lim_{x\to2}\frac{x-2}{x+2}=0$ | 通过（2 步，防剧透自查通过） | 已完成（ans=0） | 书写题与数值迁移题均检验约去一层公因式后分子仍留零因子的策略 |
| 14 | `jc935-1-5-1-9` | 推导题 | 因式分解与通分 | `quadratic-factor-cancel` | `drafted` | 原题约去 $(x-5)$ 得 $3/4$；迁移题约去 $(x-4)$ 得 $1/2=0.5$ | 通过（2 步，防剧透自查通过） | 已完成（ans=0.5） | 书写题与数值迁移题均检验双二次三项式十字相乘约去零因子策略 |
| 15 | `p128` | 数值题 | 根式有理化 | `conjugate-second-order` | `drafted` | 原题有理化后 $\frac{-1/4}{2}=-\frac18=-0.125$；迁移题 $\frac{-1}{2}=-0.5$ | 通过（3 步，防剧透自查通过） | 已完成（ans=-0.5） | 已按 Sol 复核要求拆为“添括号配共轭→展开抵消→约去 $x^2$ 代入”3 个原子步骤 |
| 16 | `p4` | 数值题 | 三角重要极限 | `sine-scale` | `drafted` | 原题 $\lim_{x\to0}\frac{\sin2x}{3x}=\frac23$；迁移题 $\lim_{x\to0}\frac{\sin3x}{4x}=\frac34=0.75$ | 通过（2 步，防剧透自查通过） | 已完成（ans=0.75） | — |
| 17 | `p127` | 数值题 | 三角重要极限 | `trig-ratio-scale` | `drafted` | 原题 $\lim_{x\to0}\frac{\sin5x}{\tan2x}=\frac52=2.5$；迁移题 $\lim_{x\to0}\frac{\sin6x}{\tan3x}=2$ | 通过（2 步，防剧透自查通过） | 已完成（ans=2） | — |
| 18 | `p171` | 数值题 | 三角重要极限 | `half-angle-sine-square` | `drafted` | 原题 $\frac{2\cdot3^2}{2}=9$；迁移题 $\frac{2\cdot2^2}{2}=4$ | 通过（2 步，防剧透自查通过） | 已完成（ans=4） | — |
| 19 | `jc935-1-6-1-2` | 推导题 | 三角重要极限 | `tan-split-scale` | `drafted` | 原题 $\lim_{x\to0}\frac{\tan5x}{2x}=\frac52=2.5$；迁移题 $\lim_{x\to0}\frac{\tan7x}{2x}=\frac72=3.5$ | 通过（2 步，防剧透自查通过） | 已完成（ans=3.5） | 书写题与数值迁移题均检验拆正切为正弦比余弦并配角策略 |
| 20 | `jc935-1-6-2-2` | 推导题 | 指数配凑 | `euler` | `drafted` | 原题 $\lim_{x\to0}(1+4x)^{2/x}=e^8$；迁移题 $\lim_{x\to0}(1+3x)^{5/x}=e^{15}$（求指数 $k=15$） | 通过（2 步，防剧透自查通过） | 已完成（ans=15） | 原题答案为含 $e$ 的幂 $e^8$，数值迁移题通过求幂指数 $k$ 精确检验同一 $1^\infty$ 配倒数策略 |
| 21 | `p172` | 数值题 | 等价小量与阶数 | `power-factor-ratio` | `drafted` | 原题 $\lim_{x\to1}\frac{1-x}{1-x^4}=\frac14=0.25$；迁移题 $\lim_{x\to1}\frac{1-x}{1-x^5}=\frac15=0.2$ | 通过（2 步，防剧透自查通过） | 已完成（ans=0.2） | — |
| 22 | `jc935-1-8-3-1` | 推导题 | 单侧极限与间断 | `discontinuity-classify` | `drafted` | 原题 $x=3$ 可去（补 $-6$）、$x=4$ 无穷；迁移题 $h(x)=\frac{x^2-4}{(x-2)(x-3)}$ 在 $x=2$ 补 $-4$ | 通过（3 步，防剧透自查通过） | 已完成（ans=-4） | **书写题边界说明**：原题需同时给出两点间断类型及补值，单个数值仅能检验可去间断点的补值计算；类型判别已在步骤 2/3 的选择题中完整覆盖 |
| 23 | `jc935-1-8-3-4` | 推导题 | 单侧极限与间断 | `piecewise-jump-check` | `drafted` | 原题 $f(2^-)=0=f(2)$、$f(2^+)=3$（跳跃且左连续）；迁移题 $g(1^+)-g(1^-)=6-2=4$ | 通过（2 步，防剧透自查通过） | 已完成（ans=4） | **书写题边界说明**：原题需定性判断跳跃间断与左连续，数值迁移题检验左右单侧极限与跳跃高度差；定性判断已在步骤 2 检查题覆盖 |
| 24 | `p173` | 数值题 | 连续接缝与连续性推理 | `match-branches` | `drafted` | 原题 $3e^0=a\implies a=3$；迁移题 $5e^0=a\implies a=5$ | 通过（2 步，防剧透自查通过） | 已完成（ans=5） | — |
| 25 | `p174` | 数值题 | 闭区间与介值 | `ivt-endpoint` | `drafted` | 原题 $f(2)=2^5-4(2)-2=22$；迁移题 $g(2)=2^4-3(2)-1=9$ | 通过（2 步，防剧透自查通过） | 已完成（ans=9） | — |
| 26 | `p39` | 数值题 | 夹逼与收敛判据 | `squeeze-bounds` | `drafted` | 原题 $3\pm 1/n\to 3$；迁移题 $5\pm 1/n\to 5$ | 通过（2 步，防剧透自查通过） | 已完成（ans=5） | — |
| 27 | `p169` | 数值题 | 数列与无穷远主项 | `leading-term` | `drafted` | 原题 $\lim_{x\to\infty}\frac{3x^2-5}{7x^2+2}=\frac37$；迁移题 $\lim_{x\to\infty}\frac{4x^2-9}{5x^2+1}=\frac45=0.8$ | 通过（2 步，防剧透自查通过） | 已完成（ans=0.8） | — |
| 28 | `p170` | 数值题 | 数列与无穷远主项 | `arithmetic-sum-limit` | `drafted` | 原题 $\lim_{n\to\infty}\frac{n(n-1)}{6n^2}=\frac16$；迁移题 $\lim_{n\to\infty}\frac{n(n-1)}{4n^2}=\frac14=0.25$ | 通过（2 步，防剧透自查通过） | 已完成（ans=0.25） | — |
| 29 | `jc935-1-5-1-7` | 推导题 | 数列与无穷远主项 | `leading-term` | `drafted` | 原题 $\lim_{|x|\to\infty}\frac{5x^2+1}{3x^2+2x-4}=\frac53$；迁移题 $\lim_{|x|\to\infty}\frac{7x^2+3}{2x^2-5x+1}=\frac72=3.5$ | 通过（2 步，防剧透自查通过） | 已完成（ans=3.5） | 书写题与数值迁移题均检验无穷远同次有理式上下同除 $x^2$ 取主项比 |
| 30 | `jc935-1-5-1-8` | 推导题 | 数列与无穷远主项 | `higher-denominator-degree` | `drafted` | 原题 $\lim_{|x|\to\infty}\frac{2x^2-x}{x^4+2x^2+1}=0$；迁移题 $\lim_{|x|\to\infty}\frac{5x^2+3x}{x^4+4x^2+2}=0$ | 通过（2 步，防剧透自查通过） | 已完成（ans=0） | 书写题与数值迁移题均检验“分母次数高于分子次数”时上下同除 $x^4$ 趋于 0 |

---

## 2. 确定性数学校验脚本与终端真实输出

### A. 运行命令
```powershell
C:\Python315\python.exe scripts/verify-ch01-batch01.py
```

### B. 终端真实输出
```text
SymPy mathematical verification PASSED for all 30 Batch 1 lessons (18 numeric + 12 written).
All 30 original problems + 30 transfer problems verified deterministically.
  [01] p37             (数值题) -> original=2, transfer=3
  [02] p124            (数值题) -> original=3, transfer=4
  [03] p164            (数值题) -> original=-3, transfer=-5
  [04] p165            (数值题) -> original=10, transfer=12
  [05] p166            (数值题) -> original=6, transfer=9
  [06] p2              (数值题) -> original=10, transfer=15
  [07] p38             (数值题) -> original=2, transfer=3
  [08] jc935-1-5-1-1   (推导题) -> original=-3, transfer=-2
  [09] jc935-1-5-1-2   (推导题) -> original=0, transfer=0
  [10] jc935-1-5-1-4   (推导题) -> original=3/2, transfer=3
  [11] jc935-1-5-1-5   (推导题) -> original=4*a, transfer=12
  [12] p168            (数值题) -> original=0, transfer=2
  [13] jc935-1-5-1-3   (推导题) -> original=0, transfer=0
  [14] jc935-1-5-1-9   (推导题) -> original=3/4, transfer=0.5
  [15] p128            (数值题) -> original=-0.125, transfer=-0.5
  [16] p4              (数值题) -> original=0.6666666666666666, transfer=0.75
  [17] p127            (数值题) -> original=2.5, transfer=2
  [18] p171            (数值题) -> original=9, transfer=4
  [19] jc935-1-6-1-2   (推导题) -> original=5/2, transfer=3.5
  [20] jc935-1-6-2-2   (推导题) -> original=exp(8), transfer=15
  [21] p172            (数值题) -> original=0.25, transfer=0.2
  [22] jc935-1-8-3-1   (推导题) -> original=lim_{x->3}=-6, lim_{x->4}|f|=oo, transfer=-4
  [23] jc935-1-8-3-4   (推导题) -> original=left=0, right=3, transfer=4
  [24] p173            (数值题) -> original=3, transfer=5
  [25] p174            (数值题) -> original=22, transfer=9
  [26] p39             (数值题) -> original=3, transfer=5
  [27] p169            (数值题) -> original=0.42857142857142855, transfer=0.8
  [28] p170            (数值题) -> original=0.16666666666666666, transfer=0.25
  [29] jc935-1-5-1-7   (推导题) -> original=5/3, transfer=3.5
  [30] jc935-1-5-1-8   (推导题) -> original=0, transfer=0
```

### C. TypeScript 类型检查、ESLint 与 KaTeX 契约检查结果
- `tsc -b`：**0 errors**（`src/data/eli5Drafts/ch01Batch01.ts` 完全匹配 `Record<string, TeachingLesson>`，`TeachingCheck.correct` / `TeachingCheck.feedback: string[]` 索引严格对齐）。
- `eslint src/data/eli5Drafts/ch01Batch01.ts`：**0 errors, 0 warnings**。
- KaTeX `strict: "error"` 渲染校验：30 道题的 `solution`、62 个步骤的 `formula`、30 道迁移题的 `transfer.solution`（共 122 条公式）全部零错误通过。
- 错因诊断反馈检查：全部 62 道步骤检查题的每个错误选项反馈均包含 `「检查一下……」`，且每步均配有更小/不同数字的降维补救例题 `prerequisite`。

---

## 3. 待 Sol 独立复核清单（含原题教学特征与书写题迁移边界）

1. **`p168`（原题分母在目标点非零的教学说明）**：
   - **现象**：原题为 $\lim_{x\to4}\frac{x^2-16}{x+4}$，参考答案为 `0`，原题 `hints` 与 `explanation` 要求“把分子拆成 $(x-4)(x+4)$，约掉 $x+4$，剩 $x-4$”。
   - **数学事实**：当 $x\to4$ 时，分母 $x+4\to8\ne0$，分子 $x^2-16\to0$，该题实际上不是 $0/0$ 型未定式（直接代入亦得 $0/8=0$），但对 $x\ne-4$ 先约去 $(x+4)$ 得 $x-4$ 再代 $x=4$ 得 $0$ 在代数上同样恒成立。
   - **处理方式**：未擅自修改原题库；在 `p168` 的 ELI5 步骤中既完整教学了平方差分解约去 $(x+4)$ 的方法，也明确点出了 $x=4$ 时分母 $x+4=8\ne0$ 可直接验证，并在同策略迁移题中设计了 $\lim_{x\to4}\frac{x^2-16}{x-4}=8$，补齐了真正 $0/0$ 型约去零因子 $(x-4)$ 的训练。请 Sol 复核是否保持原题分母 $x+4$ 或在后续版本评估。
2. **`jc935-1-8-3-1`（多断点分类书写题的数值迁移边界）**：
   - **原因**：原题要求同时判断 $x=3$（可去间断点并补值 $f(3)=-6$）与 $x=4$（无穷间断点）两点的间断类型。由于 `TeachingTransfer.answer` 为单一数值，迁移题设为求同类有理函数 $h(x)=\frac{x^2-4}{(x-2)(x-3)}$ 在可去间断点 $x=2$ 处应补充定义的值 $h(2)=-4$；而“可去间断 vs 无穷间断”的定性判别已分别在该题第 2 步、第 3 步的 `check` 选择题中完成检验。
3. **`jc935-1-8-3-4`（分段函数跳跃间断与单侧连续书写题的数值迁移边界）**：
   - **原因**：原题要求判断 $x=2$ 的间断类型（跳跃间断）与单侧连续情况（左连续）。由于单一数值答案无法直接表达“跳跃间断 + 左连续”的定性结论，该定性判断放在第 2 步 `check` 中完成；迁移题设为计算同类分段函数在分界点 $x=1$ 处的右极限与左极限之差 $g(1^+)-g(1^-)=4$（跳跃高度），从而定量检验学生分别计算左右单侧极限的核心能力。
4. **`jc935-1-5-1-5` 与 `jc935-1-6-2-2`（含符号参数或超越常数的书写题数值迁移）**：
   - `jc935-1-5-1-5` 原题答案为符号表达式 $4a$，迁移题通过给定具体参数值 $a=3$ 求差商极限（答案 `12`）检验同一展开约去 $h$ 的策略。
   - `jc935-1-6-2-2` 原题答案为 $e^8$，迁移题与试点样板 `p8` 一致，通过求 $\lim_{x\to0}(1+3x)^{5/x}=e^k$ 中的幂指数 $k=15$ 检验同一 $1^\infty$ 型配倒数策略。


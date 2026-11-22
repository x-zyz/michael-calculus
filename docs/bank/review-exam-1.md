# 考研专题一（函数、极限与连续）题库复核记录

- **范围**：考研专题一（印刷页 p.331–342 / PDF p.340–351），至专题二（一元函数微分学）前止。
- **题量统计**：共 23 题（第 1–23 题，无小题拆分）。
- **代码文件**：`src/data/bankExamLimits.ts`（导出 `bankExamLimits`）。
- **验证脚本**：`scripts/check-bank-exam-1.py`（SymPy 符号验证，20 题符号验算 + 3 题证明题辅助代算，全部 exit code 0 通过）。

## 逐题核对表

| ID | 题源 | App 课时 | 题型与方法 | 验证方式 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `jc935-exam-1-1` | 考研专题一第1题 | `limit` | 收敛数列零极限反例与单调唯一性证明 | `manual` | 常数列反例 $x_n=2,1$ + $f'(a)=2+\frac{1}{1+a^2}>0$ 人工逐行复核（脚本同步验根与导数） |
| `jc935-exam-1-2` | 考研专题一第2题 | `limit-laws` | 无穷远泰勒展开反求线性参数 $a,b$ | `symbolic` | $\lim_{x\to+\infty}[(3x-1)e^{2/x}-3x]=5$ |
| `jc935-exam-1-3` | 考研专题一第3题 | `continuity` | 分段函数在原点连续求参数积 $ab$ | `symbolic` | $\lim_{x\to 0^+}\frac{1-\cos\sqrt{3x}}{ax}=\frac{3}{2a}\Rightarrow ab=\frac{3}{2}$ |
| `jc935-exam-1-4` | 考研专题一第4题 | `infinitesimal` | 反三角差式 $2x-\arcsin(2x)$ 同阶阶数 | `symbolic` | $k=3$，比值极限 $-\frac{4}{3}$ |
| `jc935-exam-1-5` | 考研专题一第5题 | `infinitesimal` | 变上限积分 $\int_0^{x^3}\ln(1+t^2)dt$ 阶数比较 | `symbolic` | 9 阶无穷小（系数 $\frac{1}{3}$），为 $x^8$ 高阶 |
| `jc935-exam-1-6` | 考研专题一第6题 | `euler` | $1^\infty$ 型极限反求二阶展开参数 $a,b$ | `symbolic` | $a=1, b=-2$ 代回极限等于 $e^3$ |
| `jc935-exam-1-7` | 考研专题一第7题 | `infinitesimal` | 三组变上限积分无穷小阶数排序 | `symbolic` | $I_1$ 4 阶、$I_2$ 3 阶、$I_3$ 6 阶，最高为 $I_3$ |
| `jc935-exam-1-8` | 考研专题一第8题 | `continuity` | 两分段函数之和在 $\mathbb{R}$ 上连续 | `symbolic` | 在 $x=-1,1$ 处联立解得 $a=3, b=-5$ |
| `jc935-exam-1-9` | 考研专题一第9题 | `continuity` | 间断点全分类与第二类间断点计数 | `symbolic` | $x=0$ 可去；$x=-\frac{1}{2},1,2$ 第二类（共 3 个） |
| `jc935-exam-1-10` | 考研专题一第10题 | `euler` | 三角分式 $1^\infty$ 型极限反求 $k$ | `symbolic` | $k=2$ 代回极限等于 $e^2$ |
| `jc935-exam-1-11` | 考研专题一第11题 | `infinitesimal` | $\infty-\infty$ 型通分二阶展开 | `symbolic` | $\lim_{x\to 0}(\frac{1}{\sin x}-\frac{1}{\ln(1+x)})=-\frac{1}{2}$ |
| `jc935-exam-1-12` | 考研专题一第12题 | `limit-criteria` | 中值定理配合夹逼准则求极限 | `symbolic` | $\lim_{x\to+\infty}x^2[\arctan(x+3)-\arctan x]=3$ |
| `jc935-exam-1-13` | 考研专题一第13题 | `continuity` | 数列极限定义函数的显式表达与间断点 | `symbolic` | $x\neq 1$ 时 $\frac{2}{x-1}$，$x=1$ 时 $0$，间断点 $x=1$ |
| `jc935-exam-1-14` | 考研专题一第14题 | `continuity` | 等价无穷小替换求分段连续参数 $a$ | `symbolic` | 右极限为 $6$，故 $a=6$ |
| `jc935-exam-1-15` | 考研专题一第15题 | `sine` | 含 $\arctan(3/x)$ 曲线的斜渐近线 | `symbolic` | $k=2, b=3$，斜渐近线 $y=2x+3$ |
| `jc935-exam-1-16` | 考研专题一第16题 | `euler` | 指数底数型 $1^\infty$ 极限 | `symbolic` | $\lim_{x\to 0}(2x+3^x)^{3/x}=27e^6$ |
| `jc935-exam-1-17` | 考研专题一第17题 | `infinitesimal` | 拆项结合变上限积分求极限 | `symbolic` | 两部分极限 $\frac{1}{2}+1=\frac{3}{2}$ |
| `jc935-exam-1-18` | 考研专题一第18题 | `euler` | 幂指型曲线 $y=x^{1+x}/(2+x)^x$ 斜渐近线 | `symbolic` | $k=e^{-2}, b=2e^{-2}$，斜渐近线 $y=\frac{x}{e^2}+\frac{2}{e^2}$ |
| `jc935-exam-1-19` | 考研专题一第19题 | `euler` | $(1+\frac{2}{n})^n-e^2$ 的等价无穷小主部 | `symbolic` | $a=1, b=-2e^2$，比值极限为 $1$ |
| `jc935-exam-1-20` | 考研专题一第20题 | `limit` | 绝对值与 $\arctan(1/x)$ 双侧极限存在性 | `symbolic` | 左右极限相等解得 $a=\frac{e^{-2}-e^2}{\pi}$ |
| `jc935-exam-1-21` | 考研专题一第21题 | `continuity` | 分段函数连续与可去间断的参数分界 | `symbolic` | $a=2$ 连续，$a=4$ 可去间断 |
| `jc935-exam-1-22` | 考研专题一第22题 | `limit-criteria` | 根式递推数列单调有界收敛证明与求极限 | `manual` | AM-GM 归纳有界 $0<x_n\le\frac{5}{2}$ + 单调递增人工复核（脚本同步验不动点 $\frac{5}{2}$ 与数值迭代） |
| `jc935-exam-1-23` | 考研专题一第23题 | `limit-criteria` | 隐式指数递推数列单调收敛证明与求极限 | `manual` | 拉格朗日中值定理证 $0<x_{n+1}<x_n$ + $h'(t)=4te^{2t}>0$ 唯一解 $0$ 人工复核（脚本同步验导数与迭代） |

## 人工证明复核要点

1. **`jc935-exam-1-1`**：常数列 $x_n=2$ 与 $x_n=1$ 显然收敛且分别使 $2x_n-x_n^2=0$、$x_n-\sqrt{|x_n|}=0$，极限均非零；对 $f(a)=2a+\arctan a$，$f'(a)=2+\frac{1}{1+a^2}\ge 2>0$ 严格递增且 $f(0)=0$，由连续性得 $f(\lim x_n)=0\implies \lim x_n=0$。
2. **`jc935-exam-1-22`**：由 $0<x_1<5$ 得 $x_1>0, 5-x_1>0$，均值不等式给出 $0<x_2\le\frac{5}{2}$；归纳保持 $0<x_n\le\frac{5}{2}$（$n\ge 2$）。此时 $5-2x_n\ge 0$，分子有理化得 $x_{n+1}-x_n\ge 0$ 单调增，故极限 $A\ge x_2>0$ 存在，由 $2A^2-5A=0$ 唯一得 $A=\frac{5}{2}$。
3. **`jc935-exam-1-23`**：由 $x_1>0$，对 $g(t)=e^{2t}$ 在 $[0,x_1]$ 用拉格朗日中值定理得 $\frac{e^{2x_1}-1}{2x_1}=e^{2\xi}$ 且 $0<\xi<x_1$，由指数严格单调得 $0<x_2=\xi<x_1$；归纳得 $0<x_{n+1}<x_n$，单调递减有下界 $0$，极限 $A\ge 0$ 存在且满足 $h(A)=2Ae^{2A}-e^{2A}+1=0$。因 $h'(t)=4te^{2t}>0$（$t>0$）且 $h(0)=0$，故 $A=0$。

## 质量检查

- 全部 23 题均为独立原创同构变式，无原书题干或数据照搬，无任何品牌敏感词。
- 全部 23 题公式与解答通过 KaTeX `strict: "error"` 校验，宽行均已使用 `\begin{gathered}...\end{gathered}` 换行适配 360px 窄屏。
- TypeScript `tsc --noEmit` 零错误通过。

import type { GuidedHint } from "../learning";

const math = String.raw;

export const ch1Sec2to3GuidedHints: Record<string, GuidedHint[]> = {
  "jc935-1-2-1-1": [
    {
      change: "改写为正指数分式",
      text: "把负指数写成倒数形式，就能直接看清分母随 n 增大的趋势。",
      formula: math`a_n=\frac{1}{3^n}`,
    },
    {
      change: "比较相邻两项的大小",
      text: "用后一项除以当前项，因为每项都大于 0 且比值恒小于 1，可以判断数列严格递减。",
      formula: math`\begin{gathered}
a_n>0\\[4pt]
\frac{a_{n+1}}{a_n}=\frac{1}{3}<1
\end{gathered}`,
    },
    {
      change: "考察分母趋向与收敛结论",
      text: "当 n 无限增大时，分母 3ⁿ 无限增大，分式被压向 0。请结合递减方向写出最终收敛结论并对照参考解答。",
      formula: math`\begin{gathered}
3^n\to+\infty\\[4pt]
\lim_{n\to\infty}\frac{1}{3^n}=\;?
\end{gathered}`,
    },
  ],

  "jc935-1-2-1-2": [
    {
      change: "按奇偶下标拆开观察",
      text: "由于 (−1)ⁿ 在 +1 和 −1 之间切换，先分别写出偶数项和奇数项，确认数列在 0 两侧交替出现。",
      formula: math`\begin{gathered}
a_{2k}=\frac{4}{(2k)^2}>0\\[4pt]
a_{2k-1}=-\frac{4}{(2k-1)^2}<0
\end{gathered}`,
    },
    {
      change: "取绝对值消去正负号",
      text: "离原点的远近只看绝对值，取绝对值后 (−1)ⁿ 变成 1，只剩纯粹递减的正分式。",
      formula: math`|a_n|=\frac{4}{n^2}`,
    },
    {
      change: "用绝对值趋零推出原数列趋向",
      text: "随着 n 增大，分母 n² 无限增大，4/n² 严格递减趋于 0。请说明正负两侧如何一起逼近并写出极限。",
      formula: math`\begin{gathered}
|a_n|=\frac{4}{n^2}\to 0\\[4pt]
\lim_{n\to\infty}a_n=\;?
\end{gathered}`,
    },
  ],

  "jc935-1-2-1-3": [
    {
      change: "拆成常数与变化部分",
      text: "把通项看成固定高度 5 加上正的余项 2/n²，方便单独分析变化部分。",
      formula: math`a_n-5=\frac{2}{n^2}>0`,
    },
    {
      change: "检验变化部分的单调性",
      text: "把 n 换成 n+1，分母变大而分子不变，因此余项逐项变小，整个数列严格递减。",
      formula: math`\frac{2}{(n+1)^2}<\frac{2}{n^2}`,
    },
    {
      change: "求余项极限并确定逼近方向",
      text: "当 n 趋向无穷时，正余项 2/n² 趋向 0。请据此说明数列从哪一侧趋近并写出极限。",
      formula: math`\begin{gathered}
\frac{2}{n^2}\to 0\\[4pt]
\lim_{n\to\infty}\left(5+\frac{2}{n^2}\right)=\;?
\end{gathered}`,
    },
  ],

  "jc935-1-2-1-4": [
    {
      change: "分子配出与分母相同的因子",
      text: "把分子的 n−2 改写成 (n+2)−4，为拆出常数 1 做准备。",
      formula: math`a_n=\frac{(n+2)-4}{n+2}`,
    },
    {
      change: "把分式拆成 1 减真分式",
      text: "分子两项分别除以分母 n+2（因 n≥1 时分母不为 0），把通项写成常数减去小尾巴。",
      formula: math`a_n=1-\frac{4}{n+2}`,
    },
    {
      change: "判断尾巴的正负与单调性",
      text: "尾巴 4/(n+2) 始终为正且随 n 增大而减小，因此减掉的量越来越少，数列严格递增。",
      formula: math`0<\frac{4}{n+3}<\frac{4}{n+2}`,
    },
    {
      change: "考察尾巴趋零后的极限",
      text: "当 n 趋向无穷时，4/(n+2) 趋向 0。请结合单调递增的方向写出完整结论并对照参考解答。",
      formula: math`\begin{gathered}
\frac{4}{n+2}\to 0\\[4pt]
\lim_{n\to\infty}\left(1-\frac{4}{n+2}\right)=\;?
\end{gathered}`,
    },
  ],

  "jc935-1-2-1-5": [
    {
      change: "写出偶数下标子数列",
      text: "令 n=2k（k 为正整数），此时 (−1)^(2k)=1，先看偶数项的变化趋势。",
      formula: math`a_{2k}=2(2k)(+1)=4k`,
    },
    {
      change: "写出奇数下标子数列",
      text: "令 n=2k−1，此时 (−1)^(2k−1)=−1，再看奇数项的变化趋势。",
      formula: math`a_{2k-1}=2(2k-1)(-1)=2-4k`,
    },
    {
      change: "比较两条子数列的趋势",
      text: "当 k 趋向无穷时，偶数项冲向正无穷，奇数项冲向负无穷。请据此给出原数列是否收敛的结论。",
      formula: math`\begin{gathered}
a_{2k}=4k\to+\infty\\[4pt]
a_{2k-1}=2-4k\to-\infty
\end{gathered}`,
    },
  ],

  "jc935-1-2-1-6": [
    {
      change: "把分子两项分别除以分母",
      text: "因为 5ⁿ 恒大于 0，可以把分式拆成两个等比项之差。",
      formula: math`a_n=\left(\frac{3}{5}\right)^n-\left(\frac{1}{5}\right)^n`,
    },
    {
      change: "给通项建立上下界",
      text: "对所有 n≥1，都有 3ⁿ>1 且 1/5ⁿ>0，因此通项被夹在 0 与 (3/5)ⁿ 之间。",
      formula: math`0\le a_n\le\left(\frac{3}{5}\right)^n`,
    },
    {
      change: "由公比绝对值小于 1 判定上界",
      text: "底数 3/5 满足 0<3/5<1，幂次越大越接近 0。请用夹逼或直接取极限写出最终结论。",
      formula: math`\begin{gathered}
\left(\frac{3}{5}\right)^n\to 0\\[4pt]
\lim_{n\to\infty}a_n=\;?
\end{gathered}`,
    },
  ],

  "jc935-1-2-1-7": [
    {
      change: "控制被减掉的尾巴上界",
      text: "对任意正整数 n≥1，都有 1/n≤1，因此被减掉的 3/n 不会超过 3。",
      formula: math`0<\frac{3}{n}\le 3\quad(n\ge 1)`,
    },
    {
      change: "写出通项的线性下界",
      text: "把被减去的量换成更大的常数 3，不等号方向变成大于等于，得到一个更简单的下界。",
      formula: math`a_n=2n-\frac{3}{n}\ge 2n-3`,
    },
    {
      change: "由下界无界推出发散",
      text: "当 n 无限增大时，下界 2n−3 趋向正无穷，把 aₙ 一起推向正无穷。请据此写出收敛性判断。",
      formula: math`\begin{gathered}
2n-3\to+\infty\\[4pt]
a_n\ge 2n-3\implies a_n\to\;?
\end{gathered}`,
    },
  ],

  "jc935-1-2-1-8": [
    {
      change: "计算奇数下标的子数列",
      text: "当 n=2k−1 为奇数时，(−1)ⁿ=−1，括号 1+(−1)ⁿ 恰好为 0，整项直接归零。",
      formula: math`\begin{gathered}
n=2k-1:\\[4pt]
a_{2k-1}=(1-1)\frac{n+2}{n}=0
\end{gathered}`,
    },
    {
      change: "化简偶数下标的子数列",
      text: "当 n=2k 为偶数时，(−1)ⁿ=1，括号等于 2，再把分式拆成常数加余项。",
      formula: math`\begin{gathered}
a_{2k}=2\cdot\frac{2k+2}{2k}\\[4pt]
=2+\frac{2}{k}
\end{gathered}`,
    },
    {
      change: "比较两条子数列的极限",
      text: "奇数项恒为 0，偶数项随 k 增大趋于 2。两条子数列极限不同，请据此写出原数列的最终判断。",
      formula: math`\begin{gathered}
\lim_{k\to\infty}a_{2k-1}=0\\[4pt]
\lim_{k\to\infty}a_{2k}=2
\end{gathered}`,
    },
  ],

  "jc935-1-2-2-1": [
    {
      change: "在定义中固定误差为 1",
      text: "设 aₙ 收敛到 L，在收敛定义中专门取 ε=1，便存在正整数 N，使第 N 项之后都落在 L 的 1 邻域内。",
      formula: math`\begin{gathered}
\exists N\in\mathbb{N}^+:\ n>N\\[4pt]
\implies |a_n-L|<1
\end{gathered}`,
    },
    {
      change: "用三角不等式罩住后面所有项",
      text: "对 n>N 的项应用三角不等式 |aₙ|=|(aₙ−L)+L|≤|aₙ−L|+|L|，把所有靠后的项统一界在 |L|+1 以内。",
      formula: math`\begin{gathered}
|a_n|\le|a_n-L|+|L|\\[4pt]
<|L|+1
\end{gathered}`,
    },
    {
      change: "合并前面有限项构造统一上界",
      text: "前 N 项只有有限个数，把它们的绝对值与 |L|+1 一起取最大值 M，即可对一切 n 成立 |aₙ|≤M。",
      formula: math`\begin{gathered}
M=\max(|a_1|,\dots,|a_N|,|L|+1)\\[4pt]
\forall n,\ |a_n|\le M
\end{gathered}`,
    },
    {
      change: "检验逆命题判断条件类型",
      text: "上面证了收敛必有界；反过来有界数列如 (−1)ⁿ 并不收敛。请据此说明有界对收敛是必要、充分还是充要条件。",
      formula: math`\begin{gathered}
\text{convergent}\implies\text{bounded}\\[4pt]
\text{bounded}\not\implies\text{convergent}
\end{gathered}`,
    },
  ],

  "jc935-1-2-2-2": [
    {
      change: "反设数列收敛",
      text: "用反证法：先假设该无界数列收敛于某个有限数 L。",
      formula: math`\begin{gathered}
\text{Assume }\exists L\in\mathbb{R}:\\[4pt]
a_n\to L
\end{gathered}`,
    },
    {
      change: "引用收敛数列的有界性",
      text: "根据收敛必有界，假设收敛就会推出存在常数 M>0，使全体项的绝对值都不超过 M。",
      formula: math`\exists M>0,\ \forall n:\ |a_n|\le M`,
    },
    {
      change: "对照无界条件得出矛盾",
      text: "这与题设 sup |aₙ|=∞（无界）直接矛盾。请据此写明反证法得出的最终结论。",
      formula: math`\begin{gathered}
\sup_n|a_n|\le M<\infty\\[4pt]
\text{vs. }\sup_n|a_n|=\infty
\end{gathered}`,
    },
  ],

  "jc935-1-2-2-3": [
    {
      change: "计算通项绝对值验证有界",
      text: "对任意正整数 n，(−1)ⁿ 的绝对值恒为 1，因此所有项的绝对值都被常数 3 控制。",
      formula: math`|a_n|=|3(-1)^n|=3\le 3`,
    },
    {
      change: "分奇偶下标拆出两条子数列",
      text: "分别写出偶数项和奇数项，发现它们各自恒为不同的常数。",
      formula: math`\begin{gathered}
a_{2k}=3\\[4pt]
a_{2k-1}=-3
\end{gathered}`,
    },
    {
      change: "由子数列极限不同说明发散",
      text: "两条子数列分别趋于 3 与 −3，不相等。请把“有界”与“发散”合在一起写出反例结论。",
      formula: math`\begin{gathered}
\lim_{k\to\infty}a_{2k}=3\\[4pt]
\lim_{k\to\infty}a_{2k-1}=-3
\end{gathered}`,
    },
  ],

  "jc935-1-2-3-1": [
    {
      change: "发现条件缺少绝对值",
      text: "收敛定义要求 |aₙ−2|<ε（两侧同时受控），而题给只有单侧不等式 aₙ−2<ε，允许 aₙ 跑到 2 左边很远的地方。",
      formula: math`a_n-2<\varepsilon\quad(\text{no }|\cdot|)`,
    },
    {
      change: "构造恒小于 2 的常数列反例",
      text: "取一个固定的负常数，例如令 aₙ=−3，检验它对任意 ε>0 是否都满足题给条件。",
      formula: math`\begin{gathered}
a_n=-3\\[4pt]
a_n-2=-5<0<\varepsilon
\end{gathered}`,
    },
    {
      change: "对照反例极限与目标 2",
      text: "该常数列满足题给条件，但它的真实极限是 −3 而不是 2。请据此写出能否推出的最终结论。",
      formula: math`\lim_{n\to\infty}a_n=-3\ne 2`,
    },
  ],

  "jc935-1-2-3-2": [
    {
      change: "区分无限多项与最终每一项",
      text: "收敛定义要求从某个 N 起每一项都落入邻域，而题给只要求有无限多项落入，其余项可以远离 3。",
      formula: math`\begin{gathered}
|a_n-3|<\varepsilon\text{ i.o.}\\[4pt]
\not\implies\forall n>N
\end{gathered}`,
    },
    {
      change: "构造一半为 3 一半为 0 的数列",
      text: "令偶数项恒为 3、奇数项恒为 0。对任意 ε>0，所有偶数项都满足 |a_{2k}−3|=0<ε，共有无穷多项。",
      formula: math`\begin{gathered}
a_{2k}=3,\ |a_{2k}-3|=0\\[4pt]
a_{2k-1}=0
\end{gathered}`,
    },
    {
      change: "检查奇数项与 3 的距离",
      text: "所有奇数项到 3 的距离恒为 3，无法小于 ε=1。请据此说明原条件能否推出收敛到 3。",
      formula: math`|a_{2k-1}-3|=3\not\to 0`,
    },
  ],

  "jc935-1-2-3-3": [
    {
      change: "任取目标容许误差",
      text: "要按标准定义证 aₙ→4，先任取最终想要的误差 ε>0，目标是让 |aₙ−4|<ε。",
      formula: math`\begin{gathered}
\text{Given }\varepsilon>0,\\[4pt]
\text{want }|a_n-4|<\varepsilon
\end{gathered}`,
    },
    {
      change: "把输入容差缩小为三分之一",
      text: "因为题给条件对一切正数都成立，把其中的正数选成 δ=ε/3>0，即可得到对应的门槛 N。",
      formula: math`\begin{gathered}
\delta=\frac{\varepsilon}{3}>0\\[4pt]
n>N\implies|a_n-4|<3\delta
\end{gathered}`,
    },
    {
      change: "代回 3δ 还原为 ε",
      text: "计算 3δ=3(ε/3)=ε，恰好得到标准收敛定义中的不等式。请据此写出完整证明结论。",
      formula: math`\begin{gathered}
n>N\implies\\[4pt]
|a_n-4|<3\cdot\frac{\varepsilon}{3}=\varepsilon
\end{gathered}`,
    },
  ],

  "jc935-1-2-3-4": [
    {
      change: "先任取目标容许误差",
      text: "要按定义证 aₙ→5，先任给正数 ε>0，想法用一把比 ε 更小的尺 2/m 来过渡。",
      formula: math`\begin{gathered}
\text{Want }m\in\mathbb{N}^+:\\[4pt]
\frac{2}{m}<\varepsilon
\end{gathered}`,
    },
    {
      change: "选取足够大的正整数 m",
      text: "解不等式 2/m<ε 得 m>2/ε，取正整数 m=⌊2/ε⌋+1 即可保证 2/m<ε。",
      formula: math`\begin{gathered}
m=\lfloor 2/\varepsilon\rfloor+1\\[4pt]
\implies\frac{2}{m}<\varepsilon
\end{gathered}`,
    },
    {
      change: "套用题给条件传递不等式",
      text: "对这个选定的 m 使用题给条件得到 N，使 n>N 时误差小于 2/m，进而小于 ε。请据此写出最终证明结论。",
      formula: math`\begin{gathered}
n>N\implies\\[4pt]
|a_n-5|<\frac{2}{m}<\varepsilon
\end{gathered}`,
    },
  ],

  "jc935-1-2-4": [
    {
      change: "用余弦有界性放大绝对值",
      text: "因为 |cos(nπ/3)|≤1 对所有整数 n 成立，可以把振荡因子放大为 1，从而看出数列趋于 0。",
      formula: math`\begin{gathered}
|a_n-0|=\frac{2}{n}\left|\cos\frac{n\pi}{3}\right|\\[4pt]
\le\frac{2}{n}
\end{gathered}`,
    },
    {
      change: "由放大的上界倒推 n 的门槛",
      text: "只要让更简单的上界 2/n 小于 ε，就能保证 |aₙ|<ε。解这个不等式得到 n 的下限。",
      formula: math`\frac{2}{n}<\varepsilon\iff n>\frac{2}{\varepsilon}`,
    },
    {
      change: "取整数门槛 N(ε)",
      text: "为了保证 N 为正整数且 n>N 时必有 n>2/ε，取下取整与 1 的较大值。",
      formula: math`N=\max\bigl(1,\lfloor 2/\varepsilon\rfloor\bigr)`,
    },
    {
      change: "代入 ε=0.01 计算具体 N",
      text: "把 ε=0.01 代入 2/ε，算出具体门槛，并把极限值与两个 N 一起整理作答。",
      formula: math`\frac{2}{0.01}=\;?`,
    },
  ],

  "jc935-1-2-5-1": [
    {
      change: "写出误差表达式并化简",
      text: "任给 ε>0，先写出第 n 项与 0 的距离。因为 n≥1，4/n² 为正，绝对值可直接去掉。",
      formula: math`|a_n-0|=\frac{4}{n^2}`,
    },
    {
      change: "解不等式得到 n 的下限",
      text: "令 4/n²<ε，两边同乘正数 n² 再除以正数 ε，开平方得到对 n 的要求。",
      formula: math`\begin{gathered}
\frac{4}{n^2}<\varepsilon\iff n^2>\frac{4}{\varepsilon}\\[4pt]
\iff n>\frac{2}{\sqrt{\varepsilon}}
\end{gathered}`,
    },
    {
      change: "构造正整数 N 并检验定义",
      text: "取 N=max(1, ⌊2/√ε⌋)，当整数 n>N 时必有 n>2/√ε，从而 4/n²<ε。请据此完成定义证明的收尾陈述。",
      formula: math`\begin{gathered}
N=\max\bigl(1,\lfloor 2/\sqrt{\varepsilon}\rfloor\bigr)\\[4pt]
n>N\implies|a_n-0|<\varepsilon
\end{gathered}`,
    },
  ],

  "jc935-1-2-5-2": [
    {
      change: "通分计算与 5/3 的差",
      text: "任给 ε>0，先把 aₙ 减去 5/3 并通分，分子里 15n 会相互抵消，只剩常数。",
      formula: math`\begin{gathered}
\left|\frac{5n+1}{3n+1}-\frac{5}{3}\right|\\[4pt]
=\left|\frac{3(5n+1)-5(3n+1)}{3(3n+1)}\right|\\[4pt]
=\frac{2}{3(3n+1)}
\end{gathered}`,
    },
    {
      change: "缩小分母放大误差便于解 n",
      text: "因为 3n+1>3n>0，把分母里的 +1 扔掉会让分数变大，从而得到更简洁的上界 2/(9n)。",
      formula: math`\frac{2}{3(3n+1)}<\frac{2}{9n}`,
    },
    {
      change: "由简化上界解出 n 的要求",
      text: "只要让 2/(9n)<ε，就能通过传递性保证原误差小于 ε。",
      formula: math`\frac{2}{9n}<\varepsilon\iff n>\frac{2}{9\varepsilon}`,
    },
    {
      change: "写出门槛 N 完成定义验证",
      text: "令 N=max(1, ⌊2/(9ε)⌋)，当 n>N 时上述不等式链依次成立。请据此写明完整的 ε–N 证明结论。",
      formula: math`\begin{gathered}
N=\max\bigl(1,\lfloor 2/(9\varepsilon)\rfloor\bigr)\\[4pt]
n>N\implies\left|a_n-\frac{5}{3}\right|<\varepsilon
\end{gathered}`,
    },
  ],

  "jc935-1-2-5-3": [
    {
      change: "通分写出与 1 的差",
      text: "任给 ε>0，先算 aₙ−1 并合并分母；因为 √(n²+8)>n，差为正，绝对值可直接去掉。",
      formula: math`|a_n-1|=\frac{\sqrt{n^2+8}-n}{n}`,
    },
    {
      change: "分子有理化消去根号差",
      text: "分子分母同乘共轭 √(n²+8)+n，利用平方差把分子化简成常数 8。",
      formula: math`\begin{gathered}
|a_n-1|=\frac{(n^2+8)-n^2}{n(\sqrt{n^2+8}+n)}\\[4pt]
=\frac{8}{n(\sqrt{n^2+8}+n)}
\end{gathered}`,
    },
    {
      change: "缩小分母得到简明上界",
      text: "由于 √(n²+8)>n，分母中括号大于 2n，因此整个分数严格小于 8/(2n²)=4/n²。",
      formula: math`\begin{gathered}
\frac{8}{n(\sqrt{n^2+8}+n)}\\[4pt]
<\frac{8}{n(n+n)}=\frac{4}{n^2}
\end{gathered}`,
    },
    {
      change: "解出门槛 N 并验证定义",
      text: "令 4/n²<ε 得 n>2/√ε，据此取正整数 N=max(1, ⌊2/√ε⌋)。请据此整理最终证明结论。",
      formula: math`\begin{gathered}
N=\max\bigl(1,\lfloor 2/\sqrt{\varepsilon}\rfloor\bigr)\\[4pt]
n>N\implies|a_n-1|<\varepsilon
\end{gathered}`,
    },
  ],

  "jc935-1-2-5-4": [
    {
      change: "写出通项到 2 的距离",
      text: "任给 ε>0，把 aₙ 减去 2 后取绝对值，负号消去，只剩正指数项 10⁻ⁿ。",
      formula: math`|a_n-2|=|-10^{-n}|=10^{-n}`,
    },
    {
      change: "转化为对数不等式",
      text: "要使 10⁻ⁿ<ε，即 10ⁿ>1/ε。因为以 10 为底的对数严格递增，两边取 log₁₀ 不等号方向不变。",
      formula: math`\begin{gathered}
10^{-n}<\varepsilon\iff 10^n>\frac{1}{\varepsilon}\\[4pt]
\iff n>\log_{10}\frac{1}{\varepsilon}
\end{gathered}`,
    },
    {
      change: "选定正整数 N 完成证明",
      text: "当 ε≥1 时 log₁₀(1/ε)≤0，所以用 max(1, ⌊log₁₀(1/ε)⌋) 保证 N 为正整数。请据此写明 ε–N 证明收尾。",
      formula: math`\begin{gathered}
N=\max\bigl(1,\lfloor\log_{10}(1/\varepsilon)\rfloor\bigr)\\[4pt]
n>N\implies|a_n-2|<\varepsilon
\end{gathered}`,
    },
  ],

  "jc935-1-2-6": [
    {
      change: "写出反三角不等式控制新误差",
      text: "要证 |aₙ|→|L|，先用反三角不等式把新误差 ||aₙ|−|L|| 压在原误差 |aₙ−L| 之下。",
      formula: math`\bigl||a_n|-|L|\bigr|\le|a_n-L|`,
    },
    {
      change: "套用已知极限的门槛 N",
      text: "任给 ε>0，因为 aₙ→L，存在 N 使 n>N 时 |aₙ−L|<ε，从而 ||aₙ|−|L||<ε，前半部分得证。",
      formula: math`\begin{gathered}
n>N\implies\\[4pt]
\bigl||a_n|-|L|\bigr|\le|a_n-L|<\varepsilon
\end{gathered}`,
    },
    {
      change: "构造正负交替反例检验逆命题",
      text: "令 aₙ=4(−1)ⁿ，它的绝对值恒等于 4（收敛到 4），但原数列在 4 与 −4 间来回跳动。请据此写出逆命题不成立的完整说明。",
      formula: math`\begin{gathered}
a_n=4(-1)^n,\ |a_n|=4\\[4pt]
a_{2k}=4,\ a_{2k-1}=-4
\end{gathered}`,
    },
  ],

  "jc935-1-2-7": [
    {
      change: "用有界性放大乘积的绝对值",
      text: "任给 ε>0，先算 |aₙbₙ−0|=|aₙ||bₙ|，再把 |aₙ| 换成已知常数上界 6。",
      formula: math`|a_n b_n-0|=|a_n|\,|b_n|\le 6|b_n|`,
    },
    {
      change: "对 bₙ 使用缩小后的容差",
      text: "为了使 6|bₙ|<ε，只需让 |bₙ|<ε/6。因 bₙ→0 且 ε/6>0，存在对应的下标门槛 N。",
      formula: math`\exists N:\ n>N\implies|b_n|<\frac{\varepsilon}{6}`,
    },
    {
      change: "合并两步不等式得出结论",
      text: "当 n>N 时，把 |bₙ|<ε/6 代回第一步的放缩式，即可得到 |aₙbₙ|<ε。请据此完成极限定义证明。",
      formula: math`\begin{gathered}
n>N\implies\\[4pt]
|a_n b_n|\le 6|b_n|<6\cdot\frac{\varepsilon}{6}=\varepsilon
\end{gathered}`,
    },
  ],

  "jc935-1-2-8": [
    {
      change: "分别取两条子数列的门槛",
      text: "任给 ε>0，由偶子列与奇子列都收敛于 3，分别得到各自的门槛 K₁ 与 K₂。",
      formula: math`\begin{gathered}
k>K_1\implies|a_{2k}-3|<\varepsilon\\[4pt]
k>K_2\implies|a_{2k-1}-3|<\varepsilon
\end{gathered}`,
    },
    {
      change: "合并成统一的子列门槛 K",
      text: "令 K=max(K₁, K₂)，只要 k>K，就同时满足 k>K₁ 和 k>K₂，奇偶两列都落入误差内。",
      formula: math`K=\max(K_1,K_2)`,
    },
    {
      change: "把原下标 n 对应到子列下标 k",
      text: "取 N=2K。当 n>2K 时：若 n=2k 为偶，有 k=n/2>K；若 n=2k−1 为奇，有 2k=n+1>2K+1，也有 k>K。",
      formula: math`\begin{gathered}
N=2K,\ n>N\\[4pt]
\implies k>K\text{ (even \& odd)}
\end{gathered}`,
    },
    {
      change: "汇总两种情形完成证明",
      text: "无论 n 是奇数还是偶数，只要 n>2K 就有 |aₙ−3|<ε。请据此写出完整的收尾结论。",
      formula: math`n>2K\implies|a_n-3|<\varepsilon`,
    },
  ],

  "jc935-1-3-1-1": [
    {
      change: "沿 x=−3 左侧斜线读左极限",
      text: "在图像中让 x 从 −3 的左边逐渐靠近 −3，对应的斜线段向上贴近空心点 (−3, 2)，因此左极限为 2。",
      formula: math`\lim_{x\to-3^-}f(x)=2`,
    },
    {
      change: "沿 x=−3 右侧斜线读右极限",
      text: "再让 x 从 −3 的右边逐渐靠近 −3，右侧斜线段也向上贴近同一个空心点 (−3, 2)，因此右极限为 2。",
      formula: math`\lim_{x\to-3^+}f(x)=2`,
    },
    {
      change: "比较左右极限得出双侧结论",
      text: "左右极限存在且相等；空心点说明 x=−3 处无定义，但不影响极限。请据此写出最终双侧极限。",
      formula: math`\begin{gathered}
\lim_{x\to-3^-}f(x)=2\\[4pt]
=\lim_{x\to-3^+}f(x)
\end{gathered}`,
    },
  ],

  "jc935-1-3-1-2": [
    {
      change: "沿 x=−1 左侧斜线读左极限",
      text: "当 x 从 −1 的左边趋近 −1 时，图像沿下降斜线走向点 (−1, −2)，因此左极限为 −2。",
      formula: math`\lim_{x\to-1^-}f(x)=-2`,
    },
    {
      change: "沿 x=−1 右侧水平线读右极限",
      text: "当 x 从 −1 的右边趋近 −1 时，图像一直在高度 −2 的水平线上，因此右极限也为 −2。",
      formula: math`\lim_{x\to-1^+}f(x)=-2`,
    },
    {
      change: "核对尖角处两侧是否同高",
      text: "虽然图像在 x=−1 处有折角，但左右两侧到达的高度完全一致。请据此写出双侧极限结论。",
      formula: math`\begin{gathered}
\lim_{x\to-1^-}f(x)=-2\\[4pt]
=\lim_{x\to-1^+}f(x)
\end{gathered}`,
    },
  ],

  "jc935-1-3-1-3": [
    {
      change: "读取 x=1 左侧水平线高度",
      text: "当 x 从 1 的左边靠近 1 时，图像一直保持在高度 −2，得到左极限为 −2。",
      formula: math`\lim_{x\to 1^-}f(x)=-2`,
    },
    {
      change: "读取 x=1 右侧水平线高度",
      text: "当 x 从 1 的右边靠近 1 时，图像一直保持在高度 3，得到右极限为 3（x=1 处的实心点 (1, 0) 不参与极限）。",
      formula: math`\lim_{x\to 1^+}f(x)=3`,
    },
    {
      change: "比较左右极限判断存在性",
      text: "左极限 −2 与右极限 3 不相等，不满足双侧极限存在的充要条件。请据此写出最终判断与理由。",
      formula: math`\begin{gathered}
\lim_{x\to 1^-}f(x)=-2\\[4pt]
\ne 3=\lim_{x\to 1^+}f(x)
\end{gathered}`,
    },
  ],

  "jc935-1-3-2-1": [
    {
      change: "先遮住孤立实心点看左极限",
      text: "求 x→0 的极限时只看 x≠0 的附近，不看实心点 (0, 3)。左侧斜线 y=x 靠近 0 时高度趋向 0。",
      formula: math`\lim_{x\to 0^-}g(x)=0`,
    },
    {
      change: "再沿右侧斜线读右极限",
      text: "右侧斜线 y=−x 在 x 从右边靠近 0 时，高度同样贴近空心点 (0, 0)，故右极限也为 0。",
      formula: math`\lim_{x\to 0^+}g(x)=0`,
    },
    {
      change: "对照题中陈述判断真假",
      text: "左右极限相等都为 0，说明双侧极限存在且为 0。请据此判断“极限不存在”这一陈述是否正确。",
      formula: math`\begin{gathered}
\lim_{x\to 0^-}g(x)=0\\[4pt]
=\lim_{x\to 0^+}g(x)
\end{gathered}`,
    },
  ],

  "jc935-1-3-2-2": [
    {
      change: "沿左侧斜线趋近原点",
      text: "在 x<0 一侧靠近 0 时，图像沿上升直线贴近原点处的空心点，左极限为 0。",
      formula: math`\lim_{x\to 0^-}g(x)=0`,
    },
    {
      change: "沿右侧斜线趋近原点",
      text: "在 x>0 一侧靠近 0 时，图像沿下降直线同样贴近原点处的空心点，右极限为 0。",
      formula: math`\lim_{x\to 0^+}g(x)=0`,
    },
    {
      change: "合成双侧极限并判断陈述",
      text: "两个单侧极限存在且都等于 0（与实心点 g(0)=3 无关）。请据此说明题给陈述是否正确。",
      formula: math`\begin{gathered}
\lim_{x\to 0^-}g(x)=0\\[4pt]
=\lim_{x\to 0^+}g(x)
\end{gathered}`,
    },
  ],

  "jc935-1-3-2-3": [
    {
      change: "区分函数值与附近趋势",
      text: "先读出实心点 (0, 3)，它表示函数在 x=0 处的取值 g(0)=3，而不是极限。",
      formula: math`g(0)=3`,
    },
    {
      change: "读取 x=0 两侧曲线的趋近高度",
      text: "在 0 的左右去心邻域内，两条斜线都贴近空心点 (0, 0)，所以左右极限都为 0。",
      formula: math`\begin{gathered}
\lim_{x\to 0^-}g(x)=0\\[4pt]
\lim_{x\to 0^+}g(x)=0
\end{gathered}`,
    },
    {
      change: "比较极限与题给数值 3",
      text: "双侧极限是 0 而不是 3。请据此写出题给陈述是否正确以及原因。",
      formula: math`\lim_{x\to 0}g(x)=0\ne 3`,
    },
  ],

  "jc935-1-3-2-4": [
    {
      change: "读取 x=2 左侧的逼近高度",
      text: "在 x<2 一侧靠近 2 时，下降直线指向空心点 (2, −2)，因此左极限为 −2。",
      formula: math`\lim_{x\to 2^-}g(x)=-2`,
    },
    {
      change: "读取 x=2 右侧的逼近高度",
      text: "在 x>2 一侧靠近 2 时，上升直线指向实心点 (2, 0)，因此右极限为 0。",
      formula: math`\lim_{x\to 2^+}g(x)=0`,
    },
    {
      change: "由左右不等判断陈述真假",
      text: "左极限 −2 与右极限 0 不同，双侧极限根本不存在，更不等于 0。请据此写出完整判断。",
      formula: math`\begin{gathered}
\lim_{x\to 2^-}g(x)=-2\\[4pt]
\ne 0=\lim_{x\to 2^+}g(x)
\end{gathered}`,
    },
  ],

  "jc935-1-3-2-5": [
    {
      change: "先求 x=2 处的左极限",
      text: "让 x 从小于 2 的一侧靠近 2，图像沿下降直线贴近高度 −2，左极限为 −2。",
      formula: math`\lim_{x\to 2^-}g(x)=-2`,
    },
    {
      change: "再求 x=2 处的右极限",
      text: "让 x 从大于 2 的一侧靠近 2，图像沿右侧直线贴近高度 0，右极限为 0。",
      formula: math`\lim_{x\to 2^+}g(x)=0`,
    },
    {
      change: "比对双侧极限存在条件",
      text: "因为左右极限不相等，双侧极限确实不存在。请据此判断“does not exist”这一陈述是否正确。",
      formula: math`\begin{gathered}
\lim_{x\to 2^-}g(x)=-2\\[4pt]
\ne 0=\lim_{x\to 2^+}g(x)
\end{gathered}`,
    },
  ],

  "jc935-1-3-2-6": [
    {
      change: "检查左半区间 (−2,0) 任意点",
      text: "当 a 在 (−2, 0) 内时，a 附近图像是一整段连续直线 y=x，两侧都趋向 a，故极限存在且等于 a。",
      formula: math`\begin{gathered}
a\in(-2,0):\\[4pt]
\lim_{x\to a}g(x)=a
\end{gathered}`,
    },
    {
      change: "检查右半区间 (0, 2) 内任意点",
      text: "当 a 在 (0, 2) 内时，a 附近图像是连续直线 y=−x，两侧都趋向 −a，故极限存在且等于 −a。",
      formula: math`\begin{gathered}
a\in(0,2):\\[4pt]
\lim_{x\to a}g(x)=-a
\end{gathered}`,
    },
    {
      change: "单独核对特殊点 a=0",
      text: "在 a=0 处虽有孤立实心点 (0, 3)，但左右两侧斜线都趋向 0，极限仍存在且为 0。请据此综合判断陈述真假。",
      formula: math`\begin{gathered}
a=0:\ \lim_{x\to 0}g(x)=0\\[4pt]
\forall a\in(-2,2):\ \lim_{x\to a}g(x)=-|a|
\end{gathered}`,
    },
  ],

  "jc935-1-3-3-1": [
    {
      change: "识别右上角加号的方向",
      text: "x→−2⁺ 表示只从 −2 的右侧（x>−2）逐渐靠近 −2，正好落在定义域内。",
      formula: math`x>-2,\quad x\to-2^+`,
    },
    {
      change: "沿抛物线读出逼近高度",
      text: "在 −2 右侧图像是抛物线，越靠近 −2 越贴近空心点 (−2, 3)；空心点不影响单侧极限。",
      formula: math`\lim_{x\to-2^+}h(x)=3`,
    },
    {
      change: "对照题给陈述下结论",
      text: "读出的右极限与题给数值 3 一致。请据此写出陈述是否正确的最终说明。",
      formula: math`\lim_{x\to-2^+}h(x)=3\quad(\text{check})`,
    },
  ],

  "jc935-1-3-3-2": [
    {
      change: "识别右上角减号的方向",
      text: "x→−2⁻ 要求从 −2 的左侧（x<−2）去心邻域内取点靠近 −2。",
      formula: math`x<-2,\quad x\to-2^-`,
    },
    {
      change: "检查 −2 左侧是否有定义",
      text: "由图像可知 h 的定义域从 −2 右侧开始，在 x<−2 上完全没有图像。",
      formula: math`x<-2:\ h(x)\text{ undefined}`,
    },
    {
      change: "依据定义域缺失判断陈述",
      text: "在 −2 左侧找不到可逼近的定义域点，因此左极限不存在。请据此判断原陈述是否正确。",
      formula: math`\lim_{x\to-2^-}h(x)\text{ DNE}`,
    },
  ],

  "jc935-1-3-3-3": [
    {
      change: "忽略孤立点读取左极限",
      text: "让 x 从 0 的左边沿抛物线靠近 0，曲线底部贴近空心点 (0, 1)，左极限为 1。",
      formula: math`\lim_{x\to 0^-}h(x)=1`,
    },
    {
      change: "沿右侧抛物线读取右极限",
      text: "让 x 从 0 的右边沿抛物线靠近 0，曲线同样贴近空心点 (0, 1)，右极限为 1。",
      formula: math`\lim_{x\to 0^+}h(x)=1`,
    },
    {
      change: "合成双侧极限并对照陈述",
      text: "左右极限相等都为 1，实心点 (0, 4) 不改变极限。请据此说明题给陈述是否正确。",
      formula: math`\begin{gathered}
\lim_{x\to 0^-}h(x)=1\\[4pt]
=\lim_{x\to 0^+}h(x)
\end{gathered}`,
    },
  ],

  "jc935-1-3-3-4": [
    {
      change: "先读出 x=0 处的函数值",
      text: "实心点 (0, 4) 给出的是该点函数值 h(0)=4，而非附近的极限趋势。",
      formula: math`h(0)=4`,
    },
    {
      change: "沿两侧抛物线读出极限高度",
      text: "在 x≠0 的左右附近，抛物线都靠近空心点 (0, 1)，故双侧极限为 1。",
      formula: math`\begin{gathered}
\lim_{x\to 0^-}h(x)=1\\[4pt]
\lim_{x\to 0^+}h(x)=1
\end{gathered}`,
    },
    {
      change: "比较极限值与题给的 4",
      text: "极限是 1 而不是 4。请据此判断陈述是否正确并说明理由。",
      formula: math`\lim_{x\to 0}h(x)=1\ne 4`,
    },
  ],

  "jc935-1-3-3-5": [
    {
      change: "锁定 x=2 的左侧分支",
      text: "x→2⁻ 只考察小于 2 的一侧，图像在 (−2, 2) 上是一段抛物线。",
      formula: math`x<2,\quad x\to 2^-`,
    },
    {
      change: "读取抛物线右端的空心高度",
      text: "顺着抛物线向右走向 x=2，曲线贴近空心点 (2, 3)，说明左极限等于 3。",
      formula: math`\lim_{x\to 2^-}h(x)=3`,
    },
    {
      change: "核对陈述并写出理由",
      text: "左极限只看左侧抛物线，不受右侧水平线或实心点 (2, 0) 影响。请据此给出最终判断。",
      formula: math`\lim_{x\to 2^-}h(x)=3\quad(\text{check})`,
    },
  ],

  "jc935-1-3-3-6": [
    {
      change: "锁定 x=2 的右侧分支",
      text: "x→2⁺ 只考察大于 2 的一侧，图像在 (2, 4] 上是贴着横轴的水平线段。",
      formula: math`2<x\le 4\implies h(x)=0`,
    },
    {
      change: "求水平线段的右极限",
      text: "在 2 的右侧附近函数值恒为 0，因此当 x 从右边靠近 2 时，右极限为 0。",
      formula: math`\lim_{x\to 2^+}h(x)=0`,
    },
    {
      change: "对照题给陈述写出判断",
      text: "右极限与题中给出的 0 一致。请据此写出陈述是否正确的结论。",
      formula: math`\lim_{x\to 2^+}h(x)=0\quad(\text{check})`,
    },
  ],

  "jc935-1-3-3-7": [
    {
      change: "锁定右端点 x=4 的左侧",
      text: "x→4⁻ 表示从小于 4 的定义域内侧靠近 4，这一段是横轴上的水平线。",
      formula: math`2<x<4\implies h(x)=0`,
    },
    {
      change: "读取水平线上的左极限",
      text: "因为靠近 4 的左侧所有点高度都为 0，所以左极限等于 0，不需要看 x>4 是否有定义。",
      formula: math`\lim_{x\to 4^-}h(x)=0`,
    },
    {
      change: "对照陈述写出最终判断",
      text: "左极限恰好为 0。请据此说明题给陈述是否正确。",
      formula: math`\lim_{x\to 4^-}h(x)=0\quad(\text{check})`,
    },
  ],

  "jc935-1-3-3-8": [
    {
      change: "先检查 x=4 处的左极限",
      text: "从 4 的左侧沿水平线段靠近，函数值恒为 0，所以左极限存在且为 0。",
      formula: math`\lim_{x\to 4^-}h(x)=0`,
    },
    {
      change: "再检查 x=4 右侧有无定义",
      text: "图像在 x=4 处结束，x>4 上没有定义，因此不存在右极限。",
      formula: math`x>4:\ h(x)\text{ undefined}`,
    },
    {
      change: "用双侧极限存在条件作判断",
      text: "本节约定双侧极限存在必须左右极限都存在且相等，缺少右极限则双侧极限不存在。请据此判断原陈述是否正确。",
      formula: math`\lim_{x\to 4^+}h(x)\text{ DNE}`,
    },
  ],

  "jc935-1-3-4-1": [
    {
      change: "利用 x≠2 约掉公共因子",
      text: "求 x→2 的极限时只考虑 x≠2 的点，此时 x−2≠0，可以合法约去分子分母的 x−2。",
      formula: math`\begin{gathered}
x\ne 2:\\[4pt]
f(x)=\frac{3(x-2)}{x-2}=3
\end{gathered}`,
    },
    {
      change: "分别求左右单侧极限",
      text: "无论从左边（x<2）还是右边（x>2）靠近 2，函数值都恒为常数 3，因此左右极限都是 3。",
      formula: math`\begin{gathered}
\lim_{x\to 2^-}f(x)=3\\[4pt]
\lim_{x\to 2^+}f(x)=3
\end{gathered}`,
    },
    {
      change: "比较左右极限判断双侧极限",
      text: "两个单侧极限存在且相等。请据此写出双侧极限是否存在及其数值。",
      formula: math`\begin{gathered}
\lim_{x\to 2^-}f(x)=3\\[4pt]
=\lim_{x\to 2^+}f(x)
\end{gathered}`,
    },
  ],

  "jc935-1-3-4-2": [
    {
      change: "在 x<4 一侧去掉绝对值",
      text: "当 x<4 时，x−4<0，因此 |x−4|=−(x−4)。约掉非零因子 x−4 得到常数 −2。",
      formula: math`\begin{gathered}
x<4:\ |x-4|=-(x-4)\\[4pt]
f(x)=\frac{-2(x-4)}{x-4}=-2
\end{gathered}`,
    },
    {
      change: "在 x>4 一侧去掉绝对值",
      text: "当 x>4 时，x−4>0，因此 |x−4|=x−4。约掉非零因子 x−4 得到常数 2。",
      formula: math`\begin{gathered}
x>4:\ |x-4|=x-4\\[4pt]
f(x)=\frac{2(x-4)}{x-4}=2
\end{gathered}`,
    },
    {
      change: "分别取左右极限并比较",
      text: "由两段常数直接读出左极限为 −2、右极限为 2。二者不相等，请据此说明双侧极限是否存在。",
      formula: math`\begin{gathered}
\lim_{x\to 4^-}f(x)=-2\\[4pt]
\lim_{x\to 4^+}f(x)=2
\end{gathered}`,
    },
  ],

  "jc935-1-3-5-1": [
    {
      change: "整理输出误差并提取系数",
      text: "任给 ε>0，先算 |f(x)−5|，合并常数项后把公共因数 4 提到绝对值外面。",
      formula: math`\begin{gathered}
|(4x-3)-5|=|4x-8|\\[4pt]
=4|x-2|
\end{gathered}`,
    },
    {
      change: "由输出误差倒推输入容差",
      text: "要使 4|x−2|<ε，两边同除以 4 即可得到对 |x−2| 的控制要求。",
      formula: math`\begin{gathered}
4|x-2|<\varepsilon\\[4pt]
\iff|x-2|<\frac{\varepsilon}{4}
\end{gathered}`,
    },
    {
      change: "选定 δ 并回代验证",
      text: "取 δ=ε/4>0，当 0<|x−2|<δ 时输出误差小于 4δ=ε。请据此写明完整的 ε–δ 证明。",
      formula: math`\begin{gathered}
\delta=\frac{\varepsilon}{4},\ 0<|x-2|<\delta\\[4pt]
\implies|(4x-3)-5|<\varepsilon
\end{gathered}`,
    },
  ],

  "jc935-1-3-5-2": [
    {
      change: "整理输出误差并提出 −6",
      text: "任给 ε>0，计算 |(2−6x)−8|，把常数合并成 −6 后提公因式，注意 |−6|=6。",
      formula: math`\begin{gathered}
|(2-6x)-8|=|-6x-6|\\[4pt]
=|-6|\,|x+1|=6|x+1|
\end{gathered}`,
    },
    {
      change: "把误差要求改写成 |x+1| 的界",
      text: "令 6|x+1|<ε，两边同除以 6 得到输入距离 |x+1| 需要满足的门槛。",
      formula: math`\begin{gathered}
6|x+1|<\varepsilon\\[4pt]
\iff|x+1|<\frac{\varepsilon}{6}
\end{gathered}`,
    },
    {
      change: "取定 δ 完成定义验证",
      text: "令 δ=ε/6>0，当 0<|x+1|<δ 时即有 |(2−6x)−8|<6δ=ε。请据此完成收尾陈述。",
      formula: math`\begin{gathered}
\delta=\frac{\varepsilon}{6},\ 0<|x+1|<\delta\\[4pt]
\implies|(2-6x)-8|<\varepsilon
\end{gathered}`,
    },
  ],

  "jc935-1-3-5-3": [
    {
      change: "在 x≠−3 时分解并约分",
      text: "ε–δ 定义考察 0<|x+3|<δ，保证 x≠−3，因此可以把分子按平方差分解后约掉 x+3。",
      formula: math`\begin{gathered}
x\ne -3:\\[4pt]
\frac{x^2-9}{x+3}=\frac{(x-3)(x+3)}{x+3}\\[4pt]
=x-3
\end{gathered}`,
    },
    {
      change: "计算化简后的输出误差",
      text: "用化简后的 x−3 减去目标极限 −6，得到输出误差恰好等于输入距离 |x+3|。",
      formula: math`|(x-3)-(-6)|=|x+3|`,
    },
    {
      change: "选定 δ 并回代验证",
      text: "因为输出误差与输入距离倍率是 1，直接取 δ=ε 即可。请据此写出完整的 ε–δ 证明收尾。",
      formula: math`\begin{gathered}
\delta=\varepsilon,\ 0<|x+3|<\delta\\[4pt]
\implies\left|\frac{x^2-9}{x+3}+6\right|<\varepsilon
\end{gathered}`,
    },
  ],

  "jc935-1-3-5-4": [
    {
      change: "分子用平方差分解并约分",
      text: "当 x≠−1/3 时 3x+1≠0，把 1−9x² 分解为 (1−3x)(1+3x) 后约掉分母 3x+1。",
      formula: math`\begin{gathered}
x\ne-\frac{1}{3}:\\[4pt]
\frac{1-9x^2}{3x+1}=\frac{(1-3x)(1+3x)}{3x+1}\\[4pt]
=1-3x
\end{gathered}`,
    },
    {
      change: "把误差化为 |x+1/3| 倍数",
      text: "计算 |(1−3x)−2|=|−1−3x|，再把公因数 3 提到绝对值外，显露出与 −1/3 的距离。",
      formula: math`\begin{gathered}
|(1-3x)-2|=|-3x-1|\\[4pt]
=3\left|x+\frac{1}{3}\right|
\end{gathered}`,
    },
    {
      change: "倒推 δ 并检验定义",
      text: "令 3|x+1/3|<ε 得 |x+1/3|<ε/3，取 δ=ε/3>0 即可。请据此完成 ε–δ 证明。",
      formula: math`\begin{gathered}
\delta=\frac{\varepsilon}{3},\ 0<\left|x+\frac{1}{3}\right|<\delta\\[4pt]
\implies|f(x)-2|<\varepsilon
\end{gathered}`,
    },
  ],

  "jc935-1-3-6-1": [
    {
      change: "拆出常数 1/4 写出输出误差",
      text: "任给 ε>0，在 x≠0 时把分式拆成 1/4+1/(2x³)，减去 1/4 后取绝对值。",
      formula: math`\begin{gathered}
\frac{2+x^3}{4x^3}-\frac{1}{4}=\frac{1}{2x^3}\\[4pt]
\left|\frac{2+x^3}{4x^3}-\frac{1}{4}\right|=\frac{1}{2|x|^3}
\end{gathered}`,
    },
    {
      change: "解不等式求 |x| 的下限",
      text: "令 1/(2|x|³)<ε，整理得 |x|³>1/(2ε)，再开立方求出对 |x| 的要求。",
      formula: math`\begin{gathered}
\frac{1}{2|x|^3}<\varepsilon\iff|x|^3>\frac{1}{2\varepsilon}\\[4pt]
\iff|x|>\left(\frac{1}{2\varepsilon}\right)^{1/3}
\end{gathered}`,
    },
    {
      change: "取定 X 完成无穷远定义证明",
      text: "令 X=(1/(2ε))^(1/3)>0，只要 |x|>X 就能保证输出误差小于 ε。请据此写明完整的证明结论。",
      formula: math`\begin{gathered}
X=\left(\frac{1}{2\varepsilon}\right)^{1/3},\ |x|>X\\[4pt]
\implies\left|\frac{2+x^3}{4x^3}-\frac{1}{4}\right|<\varepsilon
\end{gathered}`,
    },
  ],

  "jc935-1-3-6-2": [
    {
      change: "用 |cos x|≤1 放大输出误差",
      text: "任给 ε>0，考察 x>0。利用 |cos x|≤1 把振荡分子放大成常数 3，得到单调递减的上界。",
      formula: math`\begin{gathered}
x>0:\\[4pt]
\left|\frac{3\cos x}{\sqrt{x}}-0\right|\le\frac{3}{\sqrt{x}}
\end{gathered}`,
    },
    {
      change: "由放大的上界解出 x 的下限",
      text: "令 3/√x<ε，得到 √x>3/ε；两边都是正数，平方后不等号方向不变。",
      formula: math`\begin{gathered}
\frac{3}{\sqrt{x}}<\varepsilon\iff\sqrt{x}>\frac{3}{\varepsilon}\\[4pt]
\iff x>\left(\frac{3}{\varepsilon}\right)^2
\end{gathered}`,
    },
    {
      change: "选定 X 并验证不等式链",
      text: "取 X=(3/ε)²>0，当 x>X 时有 3/√x<ε，从而原误差小于 ε。请据此完成定义证明。",
      formula: math`\begin{gathered}
X=\left(\frac{3}{\varepsilon}\right)^2,\ x>X\\[4pt]
\implies\left|\frac{3\cos x}{\sqrt{x}}\right|<\varepsilon
\end{gathered}`,
    },
  ],

  "jc935-1-3-7": [
    {
      change: "把 x²−9 因式分解",
      text: "先按平方差把 |x²−9| 拆成 |x−3| 与 |x+3| 的乘积，分离出我们要控制的因子 |x−3|。",
      formula: math`|x^2-9|=|x-3|\,|x+3|`,
    },
    {
      change: "先限制 |x−3|<1 控住因子",
      text: "先要求 δ≤1，此时 2<x<4，从而 5<x+3<7，额外因子 |x+3| 被常数 7 罩住。",
      formula: math`\begin{gathered}
|x-3|<1\implies 2<x<4\\[4pt]
\implies|x+3|<7
\end{gathered}`,
    },
    {
      change: "把 |x+3|<7 代回得到线性上界",
      text: "在 |x−3|<1 的前提下，原式小于 7|x−3|，接下来只需让 7|x−3|<0.014。",
      formula: math`|x^2-9|<7|x-3|`,
    },
    {
      change: "解出 δ 并与 1 取较小值",
      text: "算出 0.014/7，再检查它是否不超过预限制 1，从而写出一个满足要求的 δ。",
      formula: math`\delta=\min\left(1,\frac{0.014}{7}\right)=\;?`,
    },
  ],

  "jc935-1-3-8": [
    {
      change: "绝对值内部先通分相减",
      text: "把括号里的分式减 1 通分，分子中的 x² 抵消，只剩常数 −9；取绝对值后负号消去。",
      formula: math`\begin{gathered}
\left|\frac{x^2-2}{x^2+7}-1\right|\\[4pt]
=\left|\frac{-9}{x^2+7}\right|=\frac{9}{x^2+7}
\end{gathered}`,
    },
    {
      change: "去掉分母的 +7 放大分式",
      text: "对 x≠0，分母 x²+7>x²>0，把分母缩小为 x² 会让分式变大，得到更容易解的上界 9/x²。",
      formula: math`\frac{9}{x^2+7}<\frac{9}{x^2}\quad(x\ne 0)`,
    },
    {
      change: "由 9/x²≤0.01 反解门槛",
      text: "因为前面已经是严格小于号，只要让 9/x²≤0.01（即 x²≥900），就足以保证原误差严格小于 0.01。请算出 X 并完成作答。",
      formula: math`\begin{gathered}
\frac{9}{x^2}\le 0.01\iff x^2\ge 900\\[4pt]
\implies|x|>\;?
\end{gathered}`,
    },
  ],

  "jc935-1-3-9": [
    {
      change: "化简输出误差到 0 的距离",
      text: "任给 ε>0，先写 ||3(x−2)|−0|；因为绝对值本身非负，提出常数 3 后直接等于 3|x−2|。",
      formula: math`\bigl||3(x-2)|-0\bigr|=3|x-2|`,
    },
    {
      change: "反解输入距离 |x−2| 的要求",
      text: "令 3|x−2|<ε，两边同除以 3 得到需要满足的 δ 门槛。",
      formula: math`\begin{gathered}
3|x-2|<\varepsilon\\[4pt]
\iff|x-2|<\frac{\varepsilon}{3}
\end{gathered}`,
    },
    {
      change: "选定 δ 完成定义证明",
      text: "取 δ=ε/3>0，当 0<|x−2|<δ 时即有 |f(x)−0|<3δ=ε。请据此写出完整的证明收尾。",
      formula: math`\begin{gathered}
\delta=\frac{\varepsilon}{3},\ 0<|x-2|<\delta\\[4pt]
\implies\bigl||3(x-2)|-0\bigr|<\varepsilon
\end{gathered}`,
    },
  ],

  "jc935-1-3-10": [
    {
      change: "分别写出左右远端的门槛",
      text: "任给 ε>0，由左右两端极限都等于 2，分别存在正数 X₋ 与 X₊ 控制两端。",
      formula: math`\begin{gathered}
x<-X_-\implies|f(x)-2|<\varepsilon\\[4pt]
x>X_+\implies|f(x)-2|<\varepsilon
\end{gathered}`,
    },
    {
      change: "取两道门槛中更大的一个",
      text: "令 X=max(X₋, X₊)>0，这样既满足 X≥X₋ 又满足 X≥X₊。",
      formula: math`X=\max(X_-,X_+)`,
    },
    {
      change: "把 |x|>X 拆成左右两种情形",
      text: "当 |x|>X 时，要么 x>X≥X₊，要么 x<−X≤−X₋，两种情形下都有 |f(x)−2|<ε。请据此写出最终证明结论。",
      formula: math`\begin{gathered}
|x|>X\implies x>X_+\text{ or }x<-X_-\\[4pt]
\implies|f(x)-2|<\varepsilon
\end{gathered}`,
    },
  ],

  "jc935-1-3-11": [
    {
      change: "由双侧极限推出两个单侧极限",
      text: "先证必要性（⇒）：任给 ε>0，由双侧极限存在 δ>0，在 0<|x−2|<δ 上误差小于 ε，分别限制到 2−δ<x<2 与 2<x<2+δ 立即得到左右极限均为 −3。",
      formula: math`\begin{gathered}0<|x-2|<\delta\\\implies|f(x)+3|<\varepsilon\\\implies\lim_{x\to 2^\pm}f(x)=-3\end{gathered}`,
    },
    {
      change: "由左右极限分别取各自邻域半径",
      text: "再证充分性（⇐）：任给 ε>0，由左、右极限分别为 −3，各存在正数 δ₋ 与 δ₊ 控制各自一侧。",
      formula: math`\begin{gathered}2-\delta_-<x<2\\\implies|f(x)+3|<\varepsilon\\2<x<2+\delta_+\\\implies|f(x)+3|<\varepsilon\end{gathered}`,
    },
    {
      change: "取较小半径同时管住左右两侧",
      text: "令 δ=min(δ₋, δ₊)>0。当 0<|x−2|<δ 时，x 必落入上面两段之一，故 |f(x)+3|<ε。请据此完整写出等价证明结论。",
      formula: math`\begin{gathered}\delta=\min(\delta_-,\delta_+)\\0<|x-2|<\delta\\\implies|f(x)+3|<\varepsilon\end{gathered}`,
    },
  ],

  "jc935-1-3-12": [
    {
      change: "在无穷远极限定义中取 ε=1",
      text: "因为 |x|→∞ 时 f(x)→3，专门取 ε=1，存在正数 X>0，使 |x|>X 时 f(x) 离 3 不到 1。",
      formula: math`\begin{gathered}
\exists X>0:\ |x|>X\\[4pt]
\implies|f(x)-3|<1
\end{gathered}`,
    },
    {
      change: "用三角不等式把 |f(x)| 拆开",
      text: "把 f(x) 写成 (f(x)−3)+3，再应用三角不等式 |a+b|≤|a|+|b|。",
      formula: math`\begin{gathered}
|f(x)|=|(f(x)-3)+3|\\[4pt]
\le|f(x)-3|+3
\end{gathered}`,
    },
    {
      change: "代入误差上界确定常数 M",
      text: "当 |x|>X 时，|f(x)−3|<1，代回上式得到 |f(x)|<1+3。请据此给出可用的常数 M 并完成证明陈述。",
      formula: math`|x|>X\implies|f(x)|<1+3=\;?`,
    },
  ],
};

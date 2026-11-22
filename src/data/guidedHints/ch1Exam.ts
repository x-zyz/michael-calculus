import type { GuidedHint } from "../learning";

const math = String.raw;

export const ch1ExamGuidedHints: Record<string, GuidedHint[]> = {
  "jc935-exam-1-1": [
    {
      change: "设极限为 a，化为代数方程",
      text: "题目已知数列 {x_n} 收敛，可设它的极限为 a。因为三个式子都是关于 x_n 的连续函数，把极限号移进去，三个条件分别等价于对应的代数方程。",
      formula: math`\begin{gathered}
        \lim_{n\to\infty}x_n=a\\[4pt]
        2a-a^2=0,\quad a-\sqrt{|a|}=0\\[4pt]
        2a+\arctan a=0
      \end{gathered}`,
    },
    {
      change: "解前两个方程，找出非零实根",
      text: "解 2a−a²=a(2−a)=0 得 a=0 或 a=2；解 a−√|a|=0（需 a≥0）得 a=0 或 a=1。只要取对应非零根的常数列，就能让组合极限为 0 而数列极限不为 0。",
      formula: math`\begin{gathered}
        2a-a^2=0\implies a=0\text{ 或 }2\\[4pt]
        a-\sqrt{|a|}=0\implies a=0\text{ 或 }1
      \end{gathered}`,
    },
    {
      change: "对第三个方程构造函数并求导",
      text: "设 f(a)=2a+arctan a。对它求导，发现导数在全体实数上恒大于 0，因此 f(a) 在 R 上严格单调递增。",
      formula: math`\begin{gathered}
        f(a)=2a+\arctan a\\[4pt]
        f'(a)=2+\frac{1}{1+a^2}>0
      \end{gathered}`,
    },
    {
      change: "结合 f(0)=0 锁定唯一实根",
      text: "严格单调函数最多只有一个零点，而代入 a=0 恰好满足 f(0)=0。请把前两问的常数列反例与第三问的唯一零点推理整理成完整证明，再对照参考解答。",
      formula: math`\begin{gathered}
        f(0)=0,\quad f'(a)>0\\[4pt]
        f(a)=0\iff a=\;?
      \end{gathered}`,
    },
  ],

  "jc935-exam-1-2": [
    {
      change: "令 t=1/x，把无穷远化到 0⁺",
      text: "当 x→+∞ 时，指数上的 2/x 趋近 0。令 t=1/x，则 t→0⁺ 且 x=1/t，这样可以直接套用 t→0 时的麦克劳林展开。",
      formula: math`\begin{gathered}
        t=\frac{1}{x}\to 0^+\\[4pt]
        \lim_{t\to 0^+}\left[\left(\frac{a}{t}+b\right)e^{2t}-\frac{3}{t}\right]=5
      \end{gathered}`,
    },
    {
      change: "将 e^{2t} 展开到一阶余项",
      text: "外层有 1/t，所以把 e^{2t} 展开到 t 的一次项即可：e^{2t} = 1 + 2t + o(t)。其余部分暂时保持原样。",
      formula: math`\begin{gathered}
        e^{2t}=1+2t+o(t)\\[4pt]
        \left(\frac{a}{t}+b\right)(1+2t+o(t))-\frac{3}{t}
      \end{gathered}`,
    },
    {
      change: "展开括号并按 t 的幂次合并",
      text: "把括号逐项乘开：注意 (a/t)·(2t) = 2a 是常数项，不要漏掉；(a/t)·o(t) = o(1)，2bt 也是 o(1)。按 1/t 项与常数项分组整理。",
      formula: math`\begin{gathered}
        \frac{a-3}{t}+(2a+b)+o(1)
      \end{gathered}`,
    },
    {
      change: "由极限有限且为 5 列方程组",
      text: "当 t→0⁺ 时 1/t→+∞，要让极限有限，1/t 的系数必须为 0；消去发散项后，剩下的常数项必须等于目标极限 5。",
      formula: math`\begin{cases}
        a-3=0\\
        2a+b=5
      \end{cases}`,
    },
    {
      change: "解出参数 a 和 b 并核对",
      text: "先由第一个方程得出 a，再代入第二个方程算出 b。写出最终的 a、b 值后对照参考解答。",
      formula: math`\begin{gathered}
        a=3\\[4pt]
        b=5-2a=\;?
      \end{gathered}`,
    },
  ],

  "jc935-exam-1-3": [
    {
      change: "先由 x≤0 段读出左极限与 f(0)",
      text: "函数在 x=0 处连续，要求左极限、右极限与函数值 f(0) 三者相等。因为 x≤0 时 f(x) 恒为常数 b，左极限与 f(0) 直接等于 b。",
      formula: math`\lim_{x\to 0^-}f(x)=f(0)=b`,
    },
    {
      change: "对 x→0⁺ 分子用等价无穷小",
      text: "当 x→0⁺ 时，u=√(3x)→0⁺。分子是独立因子，可用 1−cos u ~ u²/2 替换；注意 (√(3x))² = 3x，不要多平方一次。分母 ax 不变。",
      formula: math`\begin{gathered}
        1-\cos\sqrt{3x}\sim\frac{(\sqrt{3x})^2}{2}=\frac{3x}{2}\\[4pt]
        \lim_{x\to 0^+}\frac{3x/2}{ax}
      \end{gathered}`,
    },
    {
      change: "约去公因子 x 算出右极限",
      text: "在 x→0⁺ 的过程中始终有 x > 0（不等于 0），可以合法约去分子分母中的 x，右极限化为仅含 a 的常数分式。",
      formula: math`\lim_{x\to 0^+}f(x)=\frac{3}{2a}`,
    },
    {
      change: "令右极限等于 f(0) 整理出 ab",
      text: "根据连续条件把右极限与 b 划等号，两边同乘非零常数 a 即可直接得到 ab 的值。请写出结论并对照参考解答。",
      formula: math`\frac{3}{2a}=b\implies ab=\;?`,
    },
  ],

  "jc935-exam-1-4": [
    {
      change: "看清减法抵消，需泰勒展开",
      text: "当 x→0 时 arcsin(2x) 与 2x 是一阶等价的，若在减法中直接替换，分子会误算成 0。必须把 arcsin u 展开到出现非零主部为止。",
      formula: math`\lim_{x\to 0}\frac{2x-\arcsin(2x)}{x^k}`,
    },
    {
      change: "展开 arcsin u 并代入 u=2x",
      text: "利用三阶泰勒展开 arcsin u = u + u³/6 + o(u³)（u→0）。令 u=2x 代入，注意 (2x)³ = 8x³，化简系数 8/6 = 4/3。",
      formula: math`\begin{gathered}
        \arcsin u=u+\frac{u^3}{6}+o(u^3)\\[4pt]
        \arcsin(2x)=2x+\frac{4}{3}x^3+o(x^3)
      \end{gathered}`,
    },
    {
      change: "做减法消去 2x，留下分子主部",
      text: "用 2x 减去展开后的 arcsin(2x)，一次项刚好抵消，分子只剩三次主部与高阶余项 o(x³)。",
      formula: math`2x-\arcsin(2x)=-\frac{4}{3}x^3+o(x^3)`,
    },
    {
      change: "对比 x^k 确定阶数 k 与比值",
      text: "要让分子与 x^k 为同阶无穷小（比值极限为非零常数），k 必须等于主部的幂次。请读出 k 并算出对应比值极限，再对照参考解答。",
      formula: math`\lim_{x\to 0}\frac{-\frac{4}{3}x^3+o(x^3)}{x^k}`,
    },
  ],

  "jc935-exam-1-5": [
    {
      change: "确认 0/0 型，准备对 I(x) 求导",
      text: "当 x→0 时积分上限 x³→0，故 I(x)→0。比较 I(x) 与 x^k 的阶数可用洛必达法则，先把变上限积分的导数 I'(x) 算出来。",
      formula: math`I(x)=\int_0^{x^3}\ln(1+t^2)\,dt`,
    },
    {
      change: "用变上限求导公式并乘上限导数",
      text: "把上限 x³ 代入被积函数中的 t，得到 ln(1+(x³)²)=ln(1+x⁶)；再由链式法则乘以上限的导数 (x³)'=3x²，切勿漏乘。",
      formula: math`I'(x)=\ln(1+x^6)\cdot 3x^2`,
    },
    {
      change: "用等价无穷小化简导数 I'(x)",
      text: "当 x→0 时 x⁶→0，而 ln(1+x⁶) 是独立乘积因子，可等价替换为 x⁶。于是 I'(x) 化为一个单项幂函数主部。",
      formula: math`\begin{gathered}
        \ln(1+x^6)\sim x^6\\[4pt]
        I'(x)\sim 3x^8
      \end{gathered}`,
    },
    {
      change: "用洛必达定出精确阶数并比 x⁸",
      text: "由洛必达法则，I(x)/x⁹ 与 I'(x)/(9x⁸) 同极限，而 I(x)/x⁸ 与 I'(x)/(8x⁷) 同极限。算出这两个比值，写出 I(x) 的阶数及与 x⁸ 的关系后对照参考解答。",
      formula: math`\begin{gathered}
        \lim_{x\to 0}\frac{I(x)}{x^9}=\lim_{x\to 0}\frac{3x^8}{9x^8}\\[4pt]
        \lim_{x\to 0}\frac{I(x)}{x^8}=\lim_{x\to 0}\frac{3x^8}{8x^7}
      \end{gathered}`,
    },
  ],

  "jc935-exam-1-6": [
    {
      change: "改写为 e 的指数极限等式",
      text: "当 x→0 时底数趋于 e⁰=1，指数 1/x²→+∞，是 1^∞ 型。写成 exp(…) 形式后，两边取对数等价于指数部分的极限等于 3。",
      formula: math`\lim_{x\to 0}\frac{\ln(e^{2x}+ax^2+bx)}{x^2}=3`,
    },
    {
      change: "将 e^{2x} 展开到 x² 阶",
      text: "因为分母是 x²，括号内的底数至少要展开到 x² 阶。当 x→0 时 e^{2x} = 1 + 2x + (2x)²/2! + o(x²)，注意二次项系数是 2 不是 1。",
      formula: math`e^{2x}=1+2x+2x^2+o(x^2)`,
    },
    {
      change: "合并同类项写成 1+u 的形式",
      text: "把展开式代入底数，按 x 和 x² 合并系数，记 1 后面的无穷小整体为 u(x)。",
      formula: math`\begin{gathered}e^{2x}+ax^2+bx=1+u(x)\\u(x)=(b+2)x+(a\\+2)x^2+o(x^2)\end{gathered}`,
    },
    {
      change: "由极限存在先消去一次项",
      text: "当 x→0 时 u(x)→0，有 ln(1+u) ~ u。若一次项系数 b+2≠0，则 u/x² ~ (b+2)/x 会发散，故必有 b+2=0；此时 u=(a+2)x²+o(x²)。",
      formula: math`\begin{gathered}
        b+2=0\\[4pt]
        \lim_{x\to 0}\frac{(a+2)x^2+o(x^2)}{x^2}=3
      \end{gathered}`,
    },
    {
      change: "约去 x²，解出常数 a 和 b",
      text: "在 x≠0 处约去 x²，得到关于 a 的一次方程。结合 b+2=0 算出 a、b 的值，再对照参考解答。",
      formula: math`\begin{cases}
        b+2=0\\
        a+2=3
      \end{cases}`,
    },
  ],

  "jc935-exam-1-7": [
    {
      change: "求 I₁(x) 的导数与等价主部",
      text: "当 x→0⁺ 时，对 I₁(x) 求导得 e^{x³}−1 ~ x³。积分还原（或用洛必达比 x⁴）可知 I₁(x) 是 4 阶无穷小，主部为 x⁴/4。",
      formula: math`\begin{gathered}
        I_1'(x)=e^{x^3}-1\sim x^3\\[4pt]
        I_1(x)\sim\frac{1}{4}x^4
      \end{gathered}`,
    },
    {
      change: "求 I₂(x) 的导数与等价主部",
      text: "对 I₂(x) 求导并乘上限导数 (tan x)'=sec²x。当 x→0⁺ 时 tan x ~ x、sec²x→1，故 I₂'(x) ~ x²，对应主部为 x³/3（3 阶）。",
      formula: math`\begin{gathered}
        I_2'(x)=\sin(\tan^2 x)\sec^2 x\sim x^2\\[4pt]
        I_2(x)\sim\frac{1}{3}x^3
      \end{gathered}`,
    },
    {
      change: "求 I₃(x) 的导数并等价替换",
      text: "对 I₃(x) 求导要乘上限导数 2sin 2x。注意当 x→0⁺ 时 1−cos 2x ~ (2x)²/2 = 2x²，再平方变成 4x⁴，乘上 2sin 2x ~ 4x 得 16x⁵。",
      formula: math`\begin{gathered}
        I_3'(x)=\sin^2(1-\cos 2x)\cdot 2\sin 2x\\[4pt]
        I_3'(x)\sim(2x^2)^2\cdot 4x=16x^5
      \end{gathered}`,
    },
    {
      change: "还原 I₃ 主部并比较三者阶数",
      text: "由 I₃'(x) ~ 16x⁵ 积分得 I₃(x) ~ (16/6)x⁶ = (8/3)x⁶。请分别写出三个积分的阶数并指出最高阶者，再对照参考解答。",
      formula: math`\begin{gathered}
        I_1\sim\frac{1}{4}x^4,\quad I_2\sim\frac{1}{3}x^3\\[4pt]
        I_3\sim\frac{8}{3}x^6
      \end{gathered}`,
    },
  ],

  "jc935-exam-1-8": [
    {
      change: "按分界点 −1 和 1 合并 h(x)",
      text: "f(x) 在 x=1 分段，g(x) 在 x=−1 和 x=1 分段。把实数轴划为 x≤−1、−1<x<1、x≥1 三段，分别把两式相加得到 h(x)=f(x)+g(x)。",
      formula: math`h(x)=\begin{cases}
        ax-1,&x\le -1\\
        2x-2,&-1<x<1\\
        2x+b+3,&x\ge 1
      \end{cases}`,
    },
    {
      change: "在接缝 x=−1 处列连续方程",
      text: "每段内部都是一次函数，天然连续，只需保证两个接缝处左右极限相等。先在 x=−1 处令第一段与第二段的值相等。",
      formula: math`\begin{gathered}
        \lim_{x\to -1^-}h(x)=h(-1)=-a-1\\[4pt]
        \lim_{x\to -1^+}h(x)=2(-1)-2=-4
      \end{gathered}`,
    },
    {
      change: "在接缝 x=1 处列连续方程",
      text: "再在右侧接缝 x=1 处，令第二段的左极限等于第三段的右极限（兼点值 h(1)）。",
      formula: math`\begin{gathered}
        \lim_{x\to 1^-}h(x)=2(1)-2=0\\[4pt]
        \lim_{x\to 1^+}h(x)=h(1)=b+5
      \end{gathered}`,
    },
    {
      change: "分别解出常数 a 和 b",
      text: "由两个接缝的等式得到两个独立的一次方程，分别算出 a、b 的值并对照参考解答。",
      formula: math`\begin{cases}
        -a-1=-4\\
        b+5=0
      \end{cases}`,
    },
  ],

  "jc935-exam-1-9": [
    {
      change: "找齐全部 4 个无定义点",
      text: "间断点来自三处限制：分母 (e^{3x}−1)(x−1)=0 给 x=0 和 x=1；指数分母 x−2=0 给 x=2；对数真数 |1+2x|=0 给 x=−1/2。切勿遗漏后两处。",
      formula: math`x\in\left\{-\frac{1}{2},\;0,\;1,\;2\right\}`,
    },
    {
      change: "算 x→0 处的极限判断类型",
      text: "当 x→0 时，非零因子 e^{1/(x−2)}→e^{−1/2}、x−1→−1 直接代入；乘积因子 ln|1+2x| ~ 2x、e^{3x}−1 ~ 3x 替换后在 x≠0 处约去 x，极限有限存在。",
      formula: math`\begin{gathered}
        \lim_{x\to 0}f(x)
        =\lim_{x\to 0}\frac{e^{-1/2}\cdot 2x}{3x\cdot(-1)}\\[4pt]
        =-\frac{2}{3\sqrt{e}}
      \end{gathered}`,
    },
    {
      change: "检查 x=−1/2 与 x=1 处的极限",
      text: "当 x→−1/2 时，分子 ln|1+2x|→−∞，其余因子均趋于有限非零数；当 x→1 时，分母 x−1→0 而其余部分有限非零，故两处均有 |f(x)|→+∞。",
      formula: math`\begin{gathered}
        \lim_{x\to -1/2}|f(x)|=+\infty\\[4pt]
        \lim_{x\to 1}|f(x)|=+\infty
      \end{gathered}`,
    },
    {
      change: "检查 x=2 处的单侧极限",
      text: "当 x→2⁺ 时 1/(x−2)→+∞，故 e^{1/(x−2)}→+∞，其余因子趋于有限非零常数，右极限为 +∞。只要有一侧极限为无穷大，该点就属于第二类间断点。",
      formula: math`\lim_{x\to 2^+}f(x)=+\infty`,
    },
    {
      change: "汇总分类并数出第二类个数",
      text: "对比 4 个点的极限结果：极限有限存在的是可去间断点（第一类），单侧或双侧极限为无穷大的是第二类间断点。请写出逐点分类与第二类总个数，再对照参考解答。",
      formula: math`\begin{gathered}
        x=0:\text{ 极限有限}\\[4pt]
        x=-\frac{1}{2},1,2:\text{ 至少一侧为 }\infty
      \end{gathered}`,
    },
  ],

  "jc935-exam-1-10": [
    {
      change: "将底数改写成 1 加无穷小",
      text: "当 x→0 时底数趋于 1、指数趋于 ∞，属于 1^∞ 型。用分子减去分母把底数写成 1+u，注意 (1+sin 2x)−(1−sin 2x) = 2sin 2x，不要漏掉系数 2。",
      formula: math`\frac{1+\sin 2x}{1-\sin 2x}=1+\frac{2\sin 2x}{1-\sin 2x}`,
    },
    {
      change: "套用 1^∞ 公式写出指数极限",
      text: "对 (1+u)^v（u→0, v→∞），极限等于 exp(lim u·v)。原等式等于 e²，即要求指数部分的极限等于 2。",
      formula: math`\lim_{x\to 0}\frac{2\sin 2x}{(1-\sin 2x)\tan(kx)}=2`,
    },
    {
      change: "对乘积因子等价替换并约去 x",
      text: "当 x→0 时，1−sin 2x→1，乘积因子 sin 2x ~ 2x、tan(kx) ~ kx（k≠0）。替换后在 x≠0 处合法约去 x。",
      formula: math`\lim_{x\to 0}\frac{2\cdot(2x)}{1\cdot(kx)}=\frac{4}{k}`,
    },
    {
      change: "令指数极限等于 2 解出 k",
      text: "把化简后的指数极限 4/k 与 2 划等号，解出非零常数 k 并对照参考解答。",
      formula: math`\frac{4}{k}=2\implies k=\;?`,
    },
  ],

  "jc935-exam-1-11": [
    {
      change: "先通分，把 ∞−∞ 化为 0/0 型",
      text: "当 x→0 时两项各自趋于无穷，不能直接相减。先通分成一个分式，此时分子分母都趋于 0。",
      formula: math`\lim_{x\to 0}\frac{\ln(1+x)-\sin x}{\sin x\cdot\ln(1+x)}`,
    },
    {
      change: "分母是乘积，先等价替换为 x²",
      text: "分母 sin x·ln(1+x) 是乘积形式，x→0 时 sin x ~ x、ln(1+x) ~ x，可以合法整体换成 x²。分子是减法，切勿直接等价替换。",
      formula: math`\lim_{x\to 0}\frac{\ln(1+x)-\sin x}{x^2}`,
    },
    {
      change: "分子两项各展开到 x² 阶相减",
      text: "分母是 x²，所以把分子展开到 x² 阶：ln(1+x) = x − x²/2 + o(x²)，sin x = x + o(x²)。相减时一次项 x 刚好抵消。",
      formula: math`\begin{gathered}
        \ln(1+x)-\sin x\\[4pt]
        =\left(x-\frac{x^2}{2}\right)-x+o(x^2)\\[4pt]
        =-\frac{1}{2}x^2+o(x^2)
      \end{gathered}`,
    },
    {
      change: "约去 x² 并求出最终极限",
      text: "代回分式并在 x≠0 处同除以 x²，余项 o(x²)/x² 趋于 0。算出剩下的常数值并对照参考解答。",
      formula: math`\lim_{x\to 0}\frac{-\frac{1}{2}x^2+o(x^2)}{x^2}=\;?`,
    },
  ],

  "jc935-exam-1-12": [
    {
      change: "对 arctan t 用拉格朗日中值定理",
      text: "当 x→+∞ 时原式是 ∞·0 型。对 f(t)=arctan t 在 [x, x+3] 上应用拉格朗日中值定理，因 f'(t)=1/(1+t²)，可把差式改写为含中值 ξ 的分式。",
      formula: math`\begin{gathered}
        \arctan(x+3)-\arctan x=\frac{3}{1+\xi^2}\\[4pt]
        x<\xi<x+3
      \end{gathered}`,
    },
    {
      change: "利用 x<ξ<x+3 放大与缩小分式",
      text: "当 x>0 时，0 < x < ξ < x+3，平方加 1 后取倒数会反转不等号方向，从而把 3/(1+ξ²) 夹在两个不含 ξ 的分式之间。",
      formula: math`\frac{3}{1+(x+3)^2}<\frac{3}{1+\xi^2}<\frac{3}{1+x^2}`,
    },
    {
      change: "不等式三边同乘正数 x²",
      text: "因为 x>0 时 x²>0，不等式三边同乘 x² 不改变不等号方向，中间项恰好还原为原题表达式。",
      formula: math`\begin{gathered}\frac{3x^2}{1+(x+3)^2}
        <x^2\Bigl[\arctan(x\\+3)-\arctan x\Bigr]\\<\frac{3x^2}{1+x^2}\end{gathered}`,
    },
    {
      change: "算左右两端极限并套夹逼准则",
      text: "对左右两端的有理分式，分子分母同除以 x² 即可看出 x→+∞ 时的极限。算出两端极限值并用夹逼准则写出最终结论，再对照参考解答。",
      formula: math`\begin{gathered}
        \lim_{x\to+\infty}\frac{3}{1/x^2+(1+3/x)^2}\\[4pt]
        \lim_{x\to+\infty}\frac{3}{1/x^2+1}
      \end{gathered}`,
    },
  ],

  "jc935-exam-1-13": [
    {
      change: "先单独讨论 x=1 处的函数值",
      text: "对 n 取极限时，x 看作固定参数。因为分母中 n 的系数是 (x−1)²，必须先看它是否为 0：当 x=1 时分子恒为 0、分母恒为 3，直接得 f(1)=0。",
      formula: math`x=1:\quad f(1)=\lim_{n\to\infty}\frac{0}{0+3}=0`,
    },
    {
      change: "当 x≠1 时分子分母同除以 n",
      text: "当 x≠1 时 (x−1)² > 0，分子分母都是关于 n 的一次式。在 n>0 时上下同除以 n，把 1/n 和 3/n 移到趋于 0 的位置。",
      formula: math`\begin{gathered}
        x\ne 1:\\[4pt]
        f(x)=\lim_{n\to\infty}\frac{(2+1/n)(x-1)}{(x-1)^2+3/n}
      \end{gathered}`,
    },
    {
      change: "取极限并约去一份 (x−1)",
      text: "当 n→∞ 时 1/n→0、3/n→0。因为此时 x≠1，可以合法约去上下共有的因子 (x−1)，写出完整的分段表达式。",
      formula: math`f(x)=\begin{cases}
        \dfrac{2}{x-1},&x\ne 1\\[6pt]
        0,&x=1
      \end{cases}`,
    },
    {
      change: "检查接缝 x=1 处的极限判间断",
      text: "当 x≠1 时 2/(x−1) 分母非零，处处连续；只需检查 x=1 处的极限。算出 x→1 时 f(x) 的极限，写出分段表达式与间断点结论，再对照参考解答。",
      formula: math`\lim_{x\to 1}f(x)=\lim_{x\to 1}\frac{2}{x-1}`,
    },
  ],

  "jc935-exam-1-14": [
    {
      change: "由 x≤0 分支算左极限与 f(0)",
      text: "x=0 落在第二段 a cos x 内，直接代入 x=0，可得左极限和函数值 f(0) 都等于 a。",
      formula: math`\lim_{x\to 0^-}f(x)=f(0)=a\cos 0=a`,
    },
    {
      change: "对 x→0⁺ 分子连用两次等价替换",
      text: "当 x→0⁺ 时 sin 2x→0，分子作为独立因子可先用 e^u−1 ~ u 得 sin 2x，再用 sin 2x ~ 2x。分母暂时保留。",
      formula: math`\begin{gathered}
        e^{\sin 2x}-1\sim\sin 2x\sim 2x\\[4pt]
        \lim_{x\to 0^+}\frac{2x}{\arctan(x/3)}
      \end{gathered}`,
    },
    {
      change: "对分母用等价无穷小并约去 x",
      text: "当 x→0⁺ 时 x/3→0，分母 arctan(x/3) ~ x/3。替换后在 x>0 处合法约去 x，注意除以 1/3 等于乘以 3。",
      formula: math`\lim_{x\to 0^+}\frac{2x}{x/3}=\frac{2}{1/3}`,
    },
    {
      change: "令右极限等于 f(0) 得出 a",
      text: "由在 x=0 处连续的条件，右极限必须等于 f(0)=a。算出上述比值写出 a，再对照参考解答。",
      formula: math`a=\frac{2}{1/3}=\;?`,
    },
  ],

  "jc935-exam-1-15": [
    {
      change: "按定义写出斜渐近线斜率 k",
      text: "斜渐近线 y=kx+b 的斜率由 k = lim_{x→∞} y/x 给出。先将 y 除以 x（x≠0），约掉外层的 x。",
      formula: math`k=\lim_{x\to\infty}\frac{y}{x}=\lim_{x\to\infty}\left(2+\arctan\frac{3}{x}\right)`,
    },
    {
      change: "利用 3/x→0 算出斜率 k",
      text: "当 x→∞ 时 3/x→0，因 arctan 在 0 处连续且 arctan 0 = 0，直接算出斜率 k = 2。",
      formula: math`k=2+\arctan 0=2`,
    },
    {
      change: "再按定义写出截距 b 的极限",
      text: "截距由 b = lim_{x→∞} (y−kx) 确定。代入 k=2 后 2x 恰好消去，剩下 ∞·0 型极限 x·arctan(3/x)。",
      formula: math`b=\lim_{x\to\infty}(y-2x)=\lim_{x\to\infty}x\arctan\frac{3}{x}`,
    },
    {
      change: "令 t=3/x 化为标准极限求 b",
      text: "记 t=3/x，则 x→∞ 时 t→0 且 x=3/t。利用 lim_{t→0}(arctan t)/t = 1 算出 b，再把 k、b 拼成斜渐近线方程并对照参考解答。",
      formula: math`\begin{gathered}
        t=\frac{3}{x}\to 0\\[4pt]
        b=\lim_{t\to 0}3\cdot\frac{\arctan t}{t}
      \end{gathered}`,
    },
  ],

  "jc935-exam-1-16": [
    {
      change: "确认 1^∞ 型，化为 e 的指数极限",
      text: "当 x→0 时底数 2x+3^x→1、指数 3/x→∞，是 1^∞ 型。把底数写成 1+(2x+3^x−1)，转化为先求指数部分的极限。",
      formula: math`\begin{gathered}
        \lim_{x\to 0}(2x+3^x)^{\frac{3}{x}}=\exp(L)\\[4pt]
        L=\lim_{x\to 0}\frac{3(2x+3^x-1)}{x}
      \end{gathered}`,
    },
    {
      change: "把指数分式拆成两项",
      text: "在 x≠0 时把分子里的 2x 与 3^x−1 拆开分别除以 x，第一项直接约成常数 2，第二项是常见基本极限。",
      formula: math`L=\lim_{x\to 0}3\left(2+\frac{3^x-1}{x}\right)`,
    },
    {
      change: "套用基本极限 (3^x−1)/x→ln 3",
      text: "由常用极限 lim_{x→0}(a^x−1)/x = ln a（a>0），这里 a=3，故极限为 ln 3。代入算出指数 L。",
      formula: math`L=3(2+\ln 3)=6+3\ln 3`,
    },
    {
      change: "还原到 e 的幂并化简 3ln 3",
      text: "把 L 代回 e^L，利用指数加法拆成 e^6 · e^{ln(3^3)}。把 3^3 算出来写成最简形式，再对照参考解答。",
      formula: math`e^{6+3\ln 3}=e^6\cdot e^{\ln(3^3)}=\;?`,
    },
  ],

  "jc935-exam-1-17": [
    {
      change: "拆项：分离常数 1 与变上限积分",
      text: "整块通分再求导运算量很大。把第一个分式的分子拆成 1 和积分两部分，拆开后若两块各自极限存在，就能分别计算再相加。",
      formula: math`\begin{gathered}
        \left(\frac{1}{\ln(1+x)}-\frac{1}{\tan x}\right)\\[4pt]
        +\frac{\int_0^x\cos(t^2)\,dt}{\ln(1+x)}
      \end{gathered}`,
    },
    {
      change: "第一部分通分并等价替换分母",
      text: "把第一部分通分，分母乘积 ln(1+x)·tan x 在 x→0 时等价于 x²。分子是减法，暂时原样保留等待展开。",
      formula: math`L_1=\lim_{x\to 0}\frac{\tan x-\ln(1+x)}{x^2}`,
    },
    {
      change: "将第一部分分子展开到 x² 阶",
      text: "利用 tan x = x + o(x²) 与 ln(1+x) = x − x²/2 + o(x²)，相减消去 x 后分子主部为 x²/2，约去 x² 得 L₁ = 1/2。",
      formula: math`\begin{gathered}
        \tan x-\ln(1+x)=\frac{1}{2}x^2+o(x^2)\\[4pt]
        L_1=\frac{1}{2}
      \end{gathered}`,
    },
    {
      change: "第二部分用等价替换与洛必达",
      text: "第二部分是 0/0 型，先将分母 ln(1+x) 等价替换为 x，再对分子变上限积分与分母 x 用一次洛必达法则。",
      formula: math`\begin{gathered}
        L_2=\lim_{x\to 0}\frac{\int_0^x\cos(t^2)\,dt}{x}\\[4pt]
        =\lim_{x\to 0}\cos(x^2)=1
      \end{gathered}`,
    },
    {
      change: "两部分均收敛，相加得最终极限",
      text: "既然 L₁ 和 L₂ 都有限存在，按极限加法法则将两者相加即可。算出最终分数并对照参考解答。",
      formula: math`L_1+L_2=\frac{1}{2}+1=\;?`,
    },
  ],

  "jc935-exam-1-18": [
    {
      change: "先算斜渐近线斜率 k = lim y/x",
      text: "在 x>0 时将 y 除以 x，得到 x^x/(2+x)^x = (1+2/x)^{−x}。由第二个重要极限，当 x→+∞ 时斜率 k = e^{−2}。",
      formula: math`\begin{gathered}
        k=\lim_{x\to+\infty}\frac{x^x}{(2+x)^x}\\[4pt]
        =\lim_{x\to+\infty}\left(1+\frac{2}{x}\right)^{-x}=e^{-2}
      \end{gathered}`,
    },
    {
      change: "写出截距 b 并令 t=1/x→0⁺",
      text: "截距 b = lim_{x→+∞}(y − kx) = lim_{x→+∞} x[(1+2/x)^{−x} − e^{−2}]。令 t=1/x→0⁺，把式子整理成 0/0 型分式。",
      formula: math`b=\lim_{t\to 0^+}\frac{(1+2t)^{-1/t}-e^{-2}}{t}`,
    },
    {
      change: "化幂指为 e 指数并二阶展开 ln",
      text: "把 (1+2t)^{−1/t} 改写成 exp(−ln(1+2t)/t)。因外层还要除以 t，ln(1+2t) 必须展开到 t² 阶：2t − 2t² + o(t²)。",
      formula: math`\begin{gathered}
        -\frac{\ln(1+2t)}{t}
        =-\frac{2t-2t^2+o(t^2)}{t}\\[4pt]
        =-2+2t+o(t)
      \end{gathered}`,
    },
    {
      change: "提公因子 e^{−2} 并用 e^u−1~u",
      text: "将展开式代回分子，拆出公因子 e^{−2}。当 t→0⁺ 时括号里 e^{2t+o(t)}−1 ~ 2t。",
      formula: math`\begin{gathered}
        e^{-2+2t+o(t)}-e^{-2}\\[4pt]
        =e^{-2}\left(e^{2t+o(t)}-1\right)\sim 2t\,e^{-2}
      \end{gathered}`,
    },
    {
      change: "约去 t 算出 b 并写出渐近线",
      text: "把分子主部代回极限式并在 t>0 处约去 t，得到截距 b。把 k 与 b 代入 y = kx + b 写出最终方程，再对照参考解答。",
      formula: math`\begin{gathered}
        b=\lim_{t\to 0^+}\frac{2t\,e^{-2}}{t}=\frac{2}{e^2}\\[4pt]
        y=kx+b=\;?
      \end{gathered}`,
    },
  ],

  "jc935-exam-1-19": [
    {
      change: "把 (1+2/n)^n 改写成 e 的指数",
      text: "当 n→∞ 时 (1+2/n)^n→e²，与后面的 −e² 会互相抵消，不能直接替换。先改写成 exp(n ln(1+2/n))。",
      formula: math`\left(1+\frac{2}{n}\right)^n-e^2=e^{n\ln(1+2/n)}-e^2`,
    },
    {
      change: "将 ln(1+2/n) 展开到 1/n² 阶",
      text: "当 n→∞ 时 u=2/n→0，利用 ln(1+u) = u − u²/2 + o(u²) 展开，再乘上前面的 n，得到指数的精确展开。",
      formula: math`\begin{gathered}
        n\ln\left(1+\frac{2}{n}\right)
        =n\left(\frac{2}{n}-\frac{2}{n^2}+o\!\left(\frac{1}{n^2}\right)\right)\\[4pt]
        =2-\frac{2}{n}+o\!\left(\frac{1}{n}\right)
      \end{gathered}`,
    },
    {
      change: "提取公因子 e² 并用 e^u−1~u",
      text: "把 exp(2 − 2/n + o(1/n)) 写成 e²·exp(−2/n + o(1/n))，提出公因子 e² 后，对括号用等价无穷小 e^u − 1 ~ u。",
      formula: math`\begin{gathered}
        e^2\left(e^{-2/n+o(1/n)}-1\right)\\[4pt]
        \sim e^2\left(-\frac{2}{n}\right)=-\frac{2e^2}{n}
      \end{gathered}`,
    },
    {
      change: "对照 b/n^a 读出参数 a 和 b",
      text: "把求出的主部与题目给出的 b/n^a 逐项对比，注意保留负号与因子 e²。写出 a、b 的值并对照参考解答。",
      formula: math`-\frac{2e^2}{n}\sim\frac{b}{n^a}`,
    },
  ],

  "jc935-exam-1-20": [
    {
      change: "因双侧行为不同，拆成左右极限",
      text: "当 x 从 0 的左右两侧趋近时，1/x 的正负号相反，|x| 的展开符号也相反。双侧极限存在当且仅当左极限与右极限都有限且相等。",
      formula: math`L_+=\lim_{x\to 0^+}f(x),\quad L_-=\lim_{x\to 0^-}f(x)`,
    },
    {
      change: "计算 x→0⁺ 时的右极限",
      text: "当 x→0⁺ 时 1/x→+∞，故 arctan(1/x)→π/2；同时 |x|=x，由重要极限得 (1+2x)^{1/x}→e²。",
      formula: math`L_+=\frac{\pi}{2}a+e^2`,
    },
    {
      change: "计算 x→0⁻ 时的左极限",
      text: "当 x→0⁻ 时 1/x→−∞，故 arctan(1/x)→−π/2；同时 |x|=−x，因此 (1+2|x|)^{1/x} = (1−2x)^{1/x} → e^{−2}，切勿漏掉负号。",
      formula: math`L_-=-\frac{\pi}{2}a+e^{-2}`,
    },
    {
      change: "令左右极限相等，移项解出 a",
      text: "令 L_+ = L_-，把含 a 的项移到左边合并成 πa，把指数项移到右边。两边同除以 π 写出 a 的值，再对照参考解答。",
      formula: math`\begin{gathered}
        \frac{\pi}{2}a+e^2=-\frac{\pi}{2}a+e^{-2}\\[4pt]
        \pi a=e^{-2}-e^2
      \end{gathered}`,
    },
  ],

  "jc935-exam-1-21": [
    {
      change: "用等价无穷小求 x→0⁻ 左极限",
      text: "当 x→0⁻ 时，分子 ln(1+ax³) ~ ax³；分母由 sin x = x − x³/6 + o(x³) 得 x−sin x ~ x³/6。约去 x³（x<0）即得左极限。",
      formula: math`\begin{gathered}
        \lim_{x\to 0^-}\frac{\ln(1+ax^3)}{x-\sin x}
        =\lim_{x\to 0^-}\frac{ax^3}{x^3/6}\\[4pt]
        =6a
      \end{gathered}`,
    },
    {
      change: "把 x→0⁺ 分子展开到 x² 阶",
      text: "右侧分母 x sin(x/2) ~ x²/2 是二阶无穷小，所以把分子里的 e^{ax} 展开到 x² 阶：1 + ax + a²x²/2 + o(x²)，常数项与一次项刚好消掉。",
      formula: math`\begin{gathered}
        e^{ax}+4x^2-ax-1\\[4pt]
        =\left(\frac{a^2}{2}+4\right)x^2+o(x^2)
      \end{gathered}`,
    },
    {
      change: "约去 x² 算出 x→0⁺ 的右极限",
      text: "分母等价替换为 x²/2，与化简后的分子在 x>0 处约去 x²，得到右极限。",
      formula: math`\begin{gathered}
        \lim_{x\to 0^+}\frac{(a^2/2+4)x^2+o(x^2)}{x^2/2}\\[4pt]
        =a^2+8
      \end{gathered}`,
    },
    {
      change: "令左右极限相等解出候选 a",
      text: "无论是连续还是可去间断点，都首先要求 x=0 处的双侧极限存在，即左极限等于右极限。解这个一元二次方程得到两个候选值。",
      formula: math`\begin{gathered}
        a^2+8=6a\\[4pt]
        (a-2)(a-4)=0
      \end{gathered}`,
    },
    {
      change: "与 f(0)=12 对比区分两种情况",
      text: "把候选值 a=2 和 a=4 分别代回极限值 6a：若极限等于 f(0)=12 则函数在 x=0 连续；若不等于 12 则为可去间断点。写出两问结论并对照参考解答。",
      formula: math`\begin{gathered}
        a=2:\;6a=12\stackrel{?}{=}f(0)\\[4pt]
        a=4:\;6a=24\stackrel{?}{=}f(0)
      \end{gathered}`,
    },
  ],

  "jc935-exam-1-22": [
    {
      change: "用均值不等式证 n≥2 时有上界 5/2",
      text: "因 0<x₁<5，故 x₂>0 且由均值不等式 √[x₁(5−x₁)] ≤ (x₁+5−x₁)/2 = 5/2。同理归纳可知对一切 n≥2 都有 0 < x_n ≤ 5/2。",
      formula: math`\begin{gathered}x_{n+1}=\sqrt{x_n(5-x_n)}\\\le\frac{x_n+(5-x_n)}{2}\\0<x_n\le\frac{5}{2}\quad(n\ge 2)\end{gathered}`,
    },
    {
      change: "做差并提公因子 √x_n",
      text: "注意 x₁ 可能大于 5/2，所以从 n≥2 起判断单调性。把差值 x_{n+1}−x_n 提出公共正因子 √x_n，化成两个根号相减。",
      formula: math`x_{n+1}-x_n=\sqrt{x_n}\left(\sqrt{5-x_n}-\sqrt{x_n}\right)`,
    },
    {
      change: "分子有理化，利用 x_n≤5/2 判单调",
      text: "对括号乘共轭因子做分子有理化，分子变成 5−2x_n。当 n≥2 时 x_n ≤ 5/2，故 5−2x_n ≥ 0，从而数列从第 2 项起单调递增。",
      formula: math`\begin{gathered}
        x_{n+1}-x_n
        =\frac{\sqrt{x_n}(5-2x_n)}{\sqrt{5-x_n}+\sqrt{x_n}}\ge 0\\[4pt]
        (n\ge 2)
      \end{gathered}`,
    },
    {
      change: "由单调有界准则设极限 A 列方程",
      text: "数列从第 2 项起单调递增且有上界 5/2，故极限 A 存在且 A ≥ x₂ > 0。对递推式两边取极限并平方整理。",
      formula: math`\begin{gathered}
        A=\sqrt{A(5-A)}\\[4pt]
        2A^2-5A=0
      \end{gathered}`,
    },
    {
      change: "用下界 A≥x₂>0 舍去 0，得极限",
      text: "方程 2A²−5A=A(2A−5)=0 有两个根，结合 A ≥ x₂ > 0 舍去 A=0，写出最终极限并对照参考解答。",
      formula: math`A(2A-5)=0,\quad A\ge x_2>0`,
    },
  ],

  "jc935-exam-1-23": [
    {
      change: "改写成差商形式，准备用中值定理",
      text: "由 x₁>0，先把递推式两边同除以 2x_n，写成 (e^{2x_n}−1)/(2x_n)，把 e^{2x_{n+1}} 单独留在左边。",
      formula: math`e^{2x_{n+1}}=\frac{e^{2x_n}-1}{2x_n}`,
    },
    {
      change: "对 e^{2t} 用拉格朗日中值定理",
      text: "设 g(t)=e^{2t}，在 [0, x_n]（x_n>0）上用拉格朗日中值定理，因 g'(t)=2e^{2t}，存在 ξ∈(0, x_n) 使右边正好等于 e^{2ξ}。",
      formula: math`\begin{gathered}
        \frac{e^{2x_n}-e^0}{x_n-0}=2e^{2\xi}\\[4pt]
        e^{2x_{n+1}}=e^{2\xi},\quad 0<\xi<x_n
      \end{gathered}`,
    },
    {
      change: "推出严格单调递减且有下界 0",
      text: "因为指数函数 e^{2t} 严格单调递增，由 e^{2x_{n+1}}=e^{2ξ} 立刻得 x_{n+1}=ξ，于是 0 < x_{n+1} < x_n。数学归纳可知 {x_n} 严格递减且有下界 0，极限 A≥0 存在。",
      formula: math`\begin{gathered}
        0<x_{n+1}<x_n\quad(n\ge 1)\\[4pt]
        A=\lim_{n\to\infty}x_n\ge 0
      \end{gathered}`,
    },
    {
      change: "对递推式取极限并构造辅助函数",
      text: "令 n→∞ 得极限方程 2Ae^{2A}=e^{2A}−1。移项构造函数 h(t)=2te^{2t}−e^{2t}+1（t≥0），需要证明它没有正根而不能只代入验证 t=0。",
      formula: math`\begin{gathered}
        2Ae^{2A}=e^{2A}-1\\[4pt]
        h(t)=2te^{2t}-e^{2t}+1\quad(t\ge 0)
      \end{gathered}`,
    },
    {
      change: "对 h(t) 求导证唯一非负解为 0",
      text: "求导得 h'(t)=2e^{2t}+4te^{2t}−2e^{2t}=4te^{2t}，当 t>0 时恒大于 0，说明 h(t) 在 [0,+∞) 上严格递增，且 h(0)=0。请据此写出完整收敛与极限结论，再对照参考解答。",
      formula: math`\begin{gathered}
        h'(t)=4te^{2t}>0\quad(t>0)\\[4pt]
        h(0)=0\implies A=\;?
      \end{gathered}`,
    },
  ],
};

import type { GuidedHint } from "../learning";

const math = String.raw;

export const ch1ReviewGuidedHints: Record<string, GuidedHint[]> = {
  "jc935-1-review-1-1": [
    {
      change: "对收敛数列取 ε=1 控制尾巴",
      text: "先检验正向命题“收敛必有界”。假设 aₙ→3，按数列极限定义取容差 ε=1，就能找到某个编号 N，使 N 之后的所有项都落在 3 的单位邻域内。",
      formula: math`\begin{gathered}
        \exists N\in\mathbb{N}^*:\;n>N\\
        \implies |a_n-3|<1
      \end{gathered}`,
    },
    {
      change: "用三角不等式圈住尾巴的绝对值",
      text: "对所有 n>N 的项，利用三角不等式把 |aₙ| 拆成 |aₙ−3| 与 |3| 之和，从而得到尾巴项的统一上界 4。",
      formula: math`\begin{gathered}
        n>N:\\
        |a_n|\le|a_n-3|+3<4
      \end{gathered}`,
    },
    {
      change: "把前 N 项与尾巴合并成总上界 M",
      text: "编号从 1 到 N 只有有限多项，取它们绝对值与 4 中的最大值记作 M，就能同时管住全部项，正向命题成立。",
      formula: math`\begin{gathered}
        M=\max\{|a_1|,\dots,|a_N|,4\}\\
        \forall n,\;|a_n|\le M
      \end{gathered}`,
    },
    {
      change: "构造有界反例，检查奇偶两支极限",
      text: "再检验逆命题“有界必收敛”。取 aₙ=3(−1)ⁿ，所有项都满足 |aₙ|=3≤4，但奇数项和偶数项分别停在两个不同高度。请据此写出两个命题的真假结论并核对参考解答。",
      formula: math`\begin{gathered}
        a_n=3(-1)^n,\quad |a_n|=3\le4\\
        a_{2k}=3,\quad a_{2k-1}=-3
      \end{gathered}`,
    },
  ],

  "jc935-1-review-1-2": [
    {
      change: "假设有限极限存在，取 ε=1 写定义",
      text: "先看正向：假设 x→2 时 f(x) 有有限极限 L。在极限定义中任取 ε=1，就存在一个去心邻域，使其中每一点的函数值离 L 不超过 1。",
      formula: math`\begin{gathered}
        \exists\delta>0:\;0<|x-2|<\delta\\
        \implies |f(x)-L|<1
      \end{gathered}`,
    },
    {
      change: "用三角不等式得到局部上界",
      text: "在该去心邻域内，用三角不等式放缩 |f(x)|，可见函数值都被常数 |L|+1 围住，因此正向“有有限极限必局部有界”成立。",
      formula: math`\begin{gathered}
        0<|x-2|<\delta:\\
        |f(x)|\le|f(x)-L|+|L|\\
        <|L|+1
      \end{gathered}`,
    },
    {
      change: "取有界振荡函数检验逆命题",
      text: "再看逆向：构造 f(x)=sin(1/(x−2))。因为正弦值恒在 −1 与 1 之间，它在 2 的任意去心邻域内都满足 |f(x)|≤1，是有界的。",
      formula: math`\begin{gathered}
        f(x)=\sin\!\left(\frac{1}{x-2}\right)\\
        |f(x)|\le 1\quad(x\ne 2)
      \end{gathered}`,
    },
    {
      change: "沿两条靠近 2 的点列比较函数值",
      text: "取两条从右侧趋近 2 的点列 xₖ、yₖ，使 1/(x−2) 分别落在正弦的波峰与波谷，得到两个不同的常数值。请据此写出蕴含方向的最终结论。",
      formula: math`\begin{gathered}
        x_k=2+\frac{1}{\pi/2+2k\pi},\;f(x_k)=1\\[4pt]
        y_k=2+\frac{1}{3\pi/2+2k\pi},\;f(y_k)=-1
      \end{gathered}`,
    },
  ],

  "jc935-1-review-1-3": [
    {
      change: "写出绝对值趋于正无穷的定义",
      text: "先看正向：若 x→3 时 |f(x)|→+∞，则对任意给定的高度门槛 M>0，都存在足够小的半径 δ_M，使该去心邻域内所有点都超过 M。",
      formula: math`\begin{gathered}
        \forall M>0,\;\exists\delta_M>0:\\
        0<|x-3|<\delta_M\implies |f(x)|>M
      \end{gathered}`,
    },
    {
      change: "说明任意去心邻域内必能超过 M",
      text: "对任意给定的去心邻域 0<|x−3|<δ，只要取点满足 0<|x−3|<min(δ, δ_M)，就有 |f(x)|>M，所以正向“趋于无穷必局部无界”成立。",
      formula: math`\begin{gathered}
        0<|x-3|<\min(\delta,\delta_M)\\
        \implies |f(x)|>M
      \end{gathered}`,
    },
    {
      change: "构造反例，用波峰列验证无界",
      text: "再看逆向：取 f(x)=sin(1/(x−3))/(x−3)。沿峰值点列 xₖ→3⁺，sin 恒为 1 而分母趋零，函数值随 k 无限增大，说明它在 3 的任意去心邻域内无界。",
      formula: math`\begin{gathered}
        f(x)=\frac{\sin(1/(x-3))}{x-3}\\
        x_k=3+\frac{1}{2k\pi+\pi/2}\\
        f(x_k)=2k\pi+\frac{\pi}{2}\to+\infty
      \end{gathered}`,
    },
    {
      change: "沿零点列观察函数值恒为零",
      text: "但沿零点列 yₖ→3⁺，正弦因子恒为 0，所以 f(yₖ) 始终等于 0，并没有所有点都越来越大。请据此总结正向与逆向的蕴含关系。",
      formula: math`\begin{gathered}
        y_k=3+\frac{1}{k\pi}\to 3\\
        f(y_k)=0\quad(\forall k\in\mathbb{N}^*)
      \end{gathered}`,
    },
  ],

  "jc935-1-review-1-4": [
    {
      change: "先证必要性：写出双侧极限定义",
      text: "假设双侧极限为 −3。对任意 ε>0，存在 δ>0，只要 0<|x−1|<δ，就有 |f(x)−(−3)|<ε（注意不涉及 x=1 处的函数值）。",
      formula: math`\begin{gathered}\forall\varepsilon>0,\;\exists\delta>0:\\0<|x-1|<\delta\\\implies |f(x)+3|<\varepsilon\end{gathered}`,
    },
    {
      change: "把去心邻域拆成左右两半",
      text: "去心邻域 0<|x−1|<δ 正好由左半段 1−δ<x<1 与右半段 1<x<1+δ 组成。把原条件分别限制到左右两侧，同一 δ 立刻给出左右极限均为 −3。",
      formula: math`\begin{gathered}
        1-\delta<x<1\implies |f(x)+3|<\varepsilon\\
        1<x<1+\delta\implies |f(x)+3|<\varepsilon
      \end{gathered}`,
    },
    {
      change: "再证充分性：分别取左右控制半径",
      text: "反过来，若左、右极限都等于 −3，对任意 ε>0，可以分别找到控制左侧的 δ₋>0 和控制右侧的 δ₊>0，使各自半邻域内误差小于 ε。",
      formula: math`\begin{gathered}1-\delta_-<x<1\\\implies |f(x)+3|<\varepsilon\\1<x<1+\delta_+\\\implies |f(x)+3|<\varepsilon\end{gathered}`,
    },
    {
      change: "取两者的较小值作为公共半径 δ",
      text: "令 δ=min(δ₋, δ₊)>0。任意满足 0<|x−1|<δ 的点，若在 1 的左边必满足 1−δ₋<x<1，若在右边必满足 1<x<1+δ₊，因此误差都小于 ε。请据此完整表述充要结论。",
      formula: math`\begin{gathered}\delta=\min(\delta_-,\delta_+)>0\\0<|x-1|<\delta\\\implies |f(x)+3|<\varepsilon\end{gathered}`,
    },
  ],

  "jc935-1-review-2": [
    {
      change: "写出零点连续条件并确认底数为正",
      text: "要使 f 在 x=0 连续，需满足极限等于点值 f(0)=a。当 0<|x|<π/4 时，|2x|<π/2，所以底数 cos(2x)>0，可以合法取自然对数。",
      formula: math`\begin{gathered}
        \lim_{x\to 0}f(x)=f(0)=a\\
        0<|x|<\frac{\pi}{4}\implies\cos(2x)>0
      \end{gathered}`,
    },
    {
      change: "把幂指函数改写成自然指数形式",
      text: "利用 u^v = e^{v ln u}（u>0），把底数和指数都放进 e 的指数位置，方便单独计算指数极限。",
      formula: math`(\cos 2x)^{-3x^2}=e^{-3x^2\ln(\cos 2x)}`,
    },
    {
      change: "先算指数部分在 x→0 时的极限",
      text: "当 x→0 时，cos(2x)→1，由对数函数连续性得 ln(cos(2x))→ln 1=0；同时 −3x²→0，两个趋零因子相乘的极限为 0。",
      formula: math`\begin{gathered}
        \lim_{x\to 0}\bigl[-3x^2\ln(\cos 2x)\bigr]\\
        =0\times\ln 1=0
      \end{gathered}`,
    },
    {
      change: "代回指数函数并与 f(0)=a 对照",
      text: "因为指数函数 e^u 在 u=0 处连续，把指数极限 0 代回即可得到 x→0 时的函数极限，再令它等于 a 写出最终结果。",
      formula: math`\lim_{x\to 0}f(x)=e^0=a`,
    },
  ],

  "jc935-1-review-3-1": [
    {
      change: "写出比较无穷小阶的比值极限",
      text: "判断 x→0 时 f(x) 与 x 是否同阶或等价，核心是计算比值 f(x)/x 的极限：有限非零为同阶，等于 1 才叫等价。",
      formula: math`\lim_{x\to 0}\frac{4^x+5^x-2}{x}`,
    },
    {
      change: "把常数 −2 拆成 −1−1 配给两项",
      text: "把 −2 分成两个 −1，分别与 4ˣ、5ˣ 组合，就能把原分式拆成两个标准指数差商之和。",
      formula: math`\lim_{x\to 0}\left(\frac{4^x-1}{x}+\frac{5^x-1}{x}\right)`,
    },
    {
      change: "套用标准极限 (aˣ−1)/x → ln a",
      text: "当 x→0 时，(4ˣ−1)/x→ln 4 且 (5ˣ−1)/x→ln 5，两个极限都存在，可以直接拆开相加。",
      formula: math`\begin{gathered}
        \lim_{x\to 0}\frac{a^x-1}{x}=\ln a\\[4pt]
        \lim_{x\to 0}\frac{f(x)}{x}=\ln 4+\ln 5
      \end{gathered}`,
    },
    {
      change: "合并对数并与 0 和 1 比较",
      text: "利用对数加法法则 ln 4 + ln 5 = ln(4×5) = ln 20。检查这个比值是否为非零有限数、以及是否等于 1，写出同阶与等价的最终判断。",
      formula: math`\lim_{x\to 0}\frac{f(x)}{x}=\ln 20`,
    },
  ],

  "jc935-1-review-3-2": [
    {
      change: "先确定左右趋近时 2/x 的方向",
      text: "函数在 x=0 处无定义，要判断间断类型需分别求左、右极限。从左侧靠近 0 时 2/x→−∞，从右侧靠近 0 时 2/x→+∞。",
      formula: math`\begin{gathered}
        x\to 0^-\implies \frac{2}{x}\to-\infty\\
        x\to 0^+\implies \frac{2}{x}\to+\infty
      \end{gathered}`,
    },
    {
      change: "左侧利用 e^(2/x)→0 直接求极限",
      text: "当 x→0⁻ 时，e^(2/x)→0，分子趋于 −3，分母趋于 3（非零），直接代入即可算出左极限。",
      formula: math`\lim_{x\to 0^-}\frac{e^{2/x}-3}{e^{2/x}+3}=\frac{0-3}{0+3}`,
    },
    {
      change: "右侧上下同除 e^(2/x) 消除 ∞/∞",
      text: "当 x→0⁺ 时，e^(2/x)→+∞，不能直接相除。因为 e^(2/x)>0，分子分母同除 e^(2/x)，把无穷大变成趋零的负指数。",
      formula: math`\lim_{x\to 0^+}\frac{1-3e^{-2/x}}{1+3e^{-2/x}}`,
    },
    {
      change: "代入 e^(−2/x)→0，比较两侧极限",
      text: "右侧 e^(−2/x)→0，分式趋于 (1−0)/(1+0)。把算出的左右极限放在一起比较，判断是否有限、是否相等，从而定出间断点类型。",
      formula: math`\begin{gathered}
        \lim_{x\to 0^-}f(x)=-1\\
        \lim_{x\to 0^+}f(x)=\frac{1-0}{1+0}
      \end{gathered}`,
    },
  ],

  "jc935-1-review-4-1": [
    {
      change: "把内层 2ˣ 放进外层定义域 [0,4]",
      text: "复合函数 g(x)=f(2ˣ) 有定义，要求内层 2ˣ 的输出落在外层 f 的允许区间 [0,4] 内。",
      formula: math`0\le 2^x\le 4`,
    },
    {
      change: "利用 2ˣ>0 消去左侧自动条件",
      text: "对全体实数 x 都有 2ˣ>0，因此左侧不等式 0≤2ˣ 自动满足，只需保留右侧约束 2ˣ≤4。",
      formula: math`2^x\le 4=2^2`,
    },
    {
      change: "用指数函数单调性解出 x 的范围",
      text: "因为底数 2>1，指数函数 2ˣ 严格单调递增，两边去掉底数 2 后不等号方向不变，据此写出定义域区间 D_g。",
      formula: math`x\le 2`,
    },
  ],

  "jc935-1-review-4-2": [
    {
      change: "列出内层定义域与外层范围限制",
      text: "先确保内层 ln x 有意义（要求 x>0），再要求它的输出落在外层定义域 [−1,2] 内。",
      formula: math`\begin{gathered}
        x>0\\
        -1\le\ln x\le 2
      \end{gathered}`,
    },
    {
      change: "三边同时取以 e 为底的指数",
      text: "指数函数 e^u 在实数轴上严格递增，对不等式三边同取指数不改变不等号方向，并把中间的 ln x 还原成 x。",
      formula: math`e^{-1}\le e^{\ln x}\le e^2`,
    },
    {
      change: "核对 x>0 并写出最终闭区间",
      text: "化简中间项得 e⁻¹≤x≤e²。因为 e⁻¹>0，该区间自动满足 x>0 且两端点可取，请写成区间形式的 D_g。",
      formula: math`e^{-1}\le x\le e^2`,
    },
  ],

  "jc935-1-review-4-3": [
    {
      change: "写出 arctan x 需满足的区间条件",
      text: "内层 arctan x 对所有实数有定义，值域为 (−π/2, π/2)。外层要求其输出落在 [0, π/3] 内，该区间完全包含在主值值域中。",
      formula: math`0\le\arctan x\le\frac{\pi}{3}`,
    },
    {
      change: "在主值区间内三边同取正切",
      text: "在 (−π/2, π/2) 上，正切函数 tan u 严格单调递增，对三边同取正切不改变不等号方向，并把中间还原为 x。",
      formula: math`\tan 0\le x\le\tan\frac{\pi}{3}`,
    },
    {
      change: "算出两个特殊角的正切值定出区间",
      text: "计算 tan 0 与 tan(π/3) 的具体数值，两端点都可以取到，据此写出闭区间 D_g。",
      formula: math`0\le x\le\sqrt{3}`,
    },
  ],

  "jc935-1-review-4-4": [
    {
      change: "利用余弦值域化简外层不等式",
      text: "外层要求 −2≤cos(2x)≤0。因为余弦恒满足 −1≤cos(2x)≤1，下界 −2 自动成立，条件简化为 cos(2x)≤0。",
      formula: math`\begin{gathered}
        -2\le\cos(2x)\le 0\\
        \iff \cos(2x)\le 0
      \end{gathered}`,
    },
    {
      change: "先解出角度 2x 在每个周期的范围",
      text: "在一个周期 [0, 2π) 内，余弦非正的角度是 [π/2, 3π/2]。加上 2kπ（k∈ℤ）覆盖所有周期。",
      formula: math`\begin{gathered}
        \frac{\pi}{2}+2k\pi\le 2x\le\frac{3\pi}{2}+2k\pi\\
        (k\in\mathbb{Z})
      \end{gathered}`,
    },
    {
      change: "三边同除 2（含周期项）整理并集",
      text: "把不等式三边同时除以正数 2，注意周期项 2kπ 除以 2 变成 kπ。两端点可取，请用并集符号写出完整定义域 D_g。",
      formula: math`\begin{gathered}
        \frac{\pi}{4}+k\pi\le x\le\frac{3\pi}{4}+k\pi\\
        (k\in\mathbb{Z})
      \end{gathered}`,
    },
  ],

  "jc935-1-review-5-1": [
    {
      change: "把内层 f(x) 代入外层规则",
      text: "复合 f∘f 就是把第一次的输出 f(x) 当作输入再送进 f 一次，先原样写出复合表达式。",
      formula: math`f(f(x))=\max\bigl(0,\,f(x)-1\bigr)`,
    },
    {
      change: "找出让外层取正值的分界点 x=2",
      text: "外层取正值当且仅当 f(x)−1>0，即 max(0, x−1)>1。因为 0 不可能大于 1，所以等价于 x−1>1，即 x>2。",
      formula: math`\begin{gathered}
        f(x)>1\iff \max(0,x-1)>1\\
        \iff x>2
      \end{gathered}`,
    },
    {
      change: "分 x≤2 与 x>2 两段化简并合并",
      text: "当 x≤2 时 f(x)−1≤0，结果为 0；当 x>2 时 f(x)=x−1，再减 1 得 x−2。把两段合并成单个 max 式，并说明从何处开始取正值。",
      formula: math`f(f(x))=\begin{cases}0,&x\le 2\\x-2,&x>2\end{cases}`,
    },
  ],

  "jc935-1-review-5-2": [
    {
      change: "先判断内层输出 g(x) 的符号",
      text: "无论 x 取何实数，平方项 (max(0, x−1))² 都非负，前面加上负号后，第一次输出恒满足 g(x)≤0。",
      formula: math`\begin{gathered}
        \bigl(\max(0,x-1)\bigr)^2\ge 0\\
        \implies g(x)\le 0
      \end{gathered}`,
    },
    {
      change: "把 g(x) 代入外层表达式",
      text: "将 t=g(x) 送进外层函数 g，写出复合后的完整式子。",
      formula: math`g(g(x))=-\bigl(\max(0,\,g(x)-1)\bigr)^2`,
    },
    {
      change: "利用 g(x)−1<0 简化内层 max",
      text: "由 g(x)≤0 可得 g(x)−1≤−1<0，因此 max(0, g(x)−1) 对一切实数 x 都等于 0。据此写出 g(g(x)) 的最终结果。",
      formula: math`\begin{gathered}
        g(x)-1\le -1<0\\
        \implies \max\bigl(0,\,g(x)-1\bigr)=0
      \end{gathered}`,
    },
  ],

  "jc935-1-review-5-3": [
    {
      change: "确定内层输出 g(x) 恒非正",
      text: "复合 f∘g 要先算括号里的 g(x)。因为平方非负，取相反数后对任意实数 x 都有 g(x)≤0。",
      formula: math`g(x)=-\bigl(\max(0,x-1)\bigr)^2\le 0`,
    },
    {
      change: "将 g(x) 代入外层函数 f",
      text: "按 f(t)=max(0, t−1) 的定义，把 t 换成 g(x)。",
      formula: math`f(g(x))=\max\bigl(0,\,g(x)-1\bigr)`,
    },
    {
      change: "判断 g(x)−1 的正负得出结果",
      text: "因为 g(x)≤0，所以 g(x)−1≤−1<0，0 与负数取最大值恒为 0。请据此写出 f(g(x)) 的化简结论。",
      formula: math`\begin{gathered}
        g(x)-1\le -1<0\\
        \implies f(g(x))=\max(0,\text{负数})
      \end{gathered}`,
    },
  ],

  "jc935-1-review-5-4": [
    {
      change: "先把内层 f(x) 代入外层 g",
      text: "g∘f 是先算 f(x)=max(0, x−1)，再把结果送进 g(t)=−(max(0, t−1))²。",
      formula: math`g(f(x))=-\bigl(\max(0,\,f(x)-1)\bigr)^2`,
    },
    {
      change: "以 x=2 为界对 f(x)−1 分段",
      text: "当 x≤2 时 f(x)≤1，于是 f(x)−1≤0，外层截断为 0；当 x>2 时 f(x)=x−1，所以 f(x)−1=x−2>0。",
      formula: math`g(f(x))=\begin{cases}0,&x\le 2\\-(x-2)^2,&x>2\end{cases}`,
    },
    {
      change: "合并分段并与 f∘g=0 对比",
      text: "把两段合成 −(max(0, x−2))²，再取具体点如 x=3 分别计算 g(f(3)) 与 f(g(3))，写出两者是否相等的结论。",
      formula: math`\begin{gathered}
        g(f(x))=-\bigl(\max(0,x-2)\bigr)^2\\
        x=3:\;g(f(3))=-1,\;f(g(3))=0
      \end{gathered}`,
    },
  ],

  "jc935-1-review-6-1": [
    {
      change: "先确定基础波 sin(2x) 的周期与零点",
      text: "先不看绝对值，画基础正弦波 y=sin(2x)。角频率为 2，所以周期是 2π/2=π，零点出现在 2x=kπ 即 x=kπ/2。",
      formula: math`\begin{gathered}
        y=\sin(2x),\quad T_0=\pi\\
        \text{零点:}\;x=\frac{k\pi}{2}\;(k\in\mathbb{Z})
      \end{gathered}`,
    },
    {
      change: "外层绝对值把负半波翻到横轴上方",
      text: "绝对值套在函数外面，只改变纵坐标符号：横轴上方的部分保持不变，低于横轴的负半波沿 x 轴对称翻折到上方，零点位置不变。",
      formula: math`g(x)=|\sin(2x)|\ge 0`,
    },
    {
      change: "标出翻折后的新周期与波峰位置",
      text: "翻折后原来的谷变成了高度为 1 的峰，所有峰都在 x=π/4+kπ/2，相邻两峰间隔缩短为 π/2。请据此画出两个周期并标出峰与零点。",
      formula: math`\begin{gathered}
        T=\frac{\pi}{2},\quad \text{峰值}=1\\
        \text{峰:}\;x=\frac{\pi}{4}+\frac{k\pi}{2}
      \end{gathered}`,
    },
  ],

  "jc935-1-review-6-2": [
    {
      change: "先确定右半轴 x≥0 的图像",
      text: "绝对值套在自变量 x 上。当 x≥0 时 |x|=x，因此右半边的图像就是普通的 y=sin(2x)。",
      formula: math`x\ge 0:\;g(x)=\sin(2x)`,
    },
    {
      change: "验证偶函数对称性，沿纵轴复制到左侧",
      text: "把 x 换成 −x 后，|−x|=|x|，故 g(−x)=g(x)。因此左半边只需把右半边沿 y 轴左右镜像复制，纵坐标高度不变。",
      formula: math`\begin{gathered}
        g(-x)=\sin(2|-x|)\\
        =\sin(2|x|)=g(x)
      \end{gathered}`,
    },
    {
      change: "在右半边找一个波谷判断是否有负值",
      text: "因为左右镜像不改变纵坐标正负，右半边 sin(2x) 的波谷依然保留。例如取 x=3π/4 算出函数值，完成作图并回答是否可能取负值。",
      formula: math`g\!\left(\frac{3\pi}{4}\right)=\sin\!\left(\frac{3\pi}{2}\right)=-1`,
    },
  ],

  "jc935-1-review-6-3": [
    {
      change: "读出振幅 A 与角频率 ω，算出周期",
      text: "对照标准正弦波 A sin(ωx)，外面的系数 3 决定振幅 A=3，里面的 1/3 决定 ω=1/3，周期按 T=2π/ω 计算。",
      formula: math`\begin{gathered}
        A=3,\quad \omega=\frac{1}{3}\\
        T=\frac{2\pi}{1/3}=6\pi
      \end{gathered}`,
    },
    {
      change: "用五点法把相位 x/3 换算回 x",
      text: "让内层角度 x/3 依次走过 0, π/2, π, 3π/2, 2π，两边同乘 3 得到一整个周期里的五个关键横坐标。",
      formula: math`\begin{gathered}
        \frac{x}{3}=0,\,\frac{\pi}{2},\,\pi,\,\frac{3\pi}{2},\,2\pi\\
        x=0,\,\frac{3\pi}{2},\,3\pi,\,\frac{9\pi}{2},\,6\pi
      \end{gathered}`,
    },
    {
      change: "配出五个关键点高度并连成波形",
      text: "五个关键点对应的纵坐标依次是 0, 3, 0, −3, 0。请据此画出一整个周期的曲线，并写明振幅、周期与相邻极大极小的位置。",
      formula: math`\begin{gathered}
        g\!\left(\frac{3\pi}{2}\right)=3,\quad g\!\left(\frac{9\pi}{2}\right)=-3\\
        g(0)=g(3\pi)=g(6\pi)=0
      \end{gathered}`,
    },
  ],

  "jc935-1-review-7": [
    {
      change: "用扇形弧长等于底面周长求底半径 r",
      text: "扇形半径 R=4、圆心角为 θ，其弧长是 4θ。卷成圆锥后，这段弧正好围成底面圆周 2πr，由此解出 r 关于 θ 的表达式。",
      formula: math`\begin{gathered}
        2\pi r=4\theta\\
        \implies r=\frac{2\theta}{\pi}
      \end{gathered}`,
    },
    {
      change: "用母线 4 和底半径 r 求出圆锥高 h",
      text: "扇形半径成为圆锥母线 l=4，与底面半径 r、高 h 构成直角三角形。因 0<θ<2π 保证 0<r<4，由勾股定理得 h。",
      formula: math`\begin{gathered}
        r^2+h^2=4^2\\
        \implies h=\sqrt{16-r^2}
      \end{gathered}`,
    },
    {
      change: "把 r 与 h 代入圆锥体积公式",
      text: "圆锥体积公式为 V=πr²h/3。把前面求出的 r=2θ/π 与 h=√(16−r²) 一起代进去，整理成关于 θ 的表达式即可。",
      formula: math`\begin{gathered}
        V=\frac{\pi r^2}{3}\sqrt{16-r^2}\\
        r=\frac{2\theta}{\pi}\quad(0<\theta<2\pi)
      \end{gathered}`,
    },
  ],

  "jc935-1-review-8": [
    {
      change: "在 x≠4 时分解分子并约去 x−4",
      text: "极限只考察去心邻域内 x≠4 的点，此时 x−4≠0。先把分子因式分解为 (x−4)(x+3)，再合法约去公因式 x−4。",
      formula: math`\begin{gathered}
        \frac{x^2-x-12}{x-4}=\frac{(x-4)(x+3)}{x-4}\\
        =x+3\quad(x\ne 4)
      \end{gathered}`,
    },
    {
      change: "化简输出误差 |f(x)−7|",
      text: "把化简后的 f(x)=x+3 代入误差绝对值，发现输出误差刚好等于输入到 4 的距离 |x−4|。",
      formula: math`|f(x)-7|=|(x+3)-7|=|x-4|`,
    },
    {
      change: "反推 δ=ε 并按定义写出证明",
      text: "任给 ε>0，要使 |f(x)−7|<ε，只需 |x−4|<ε，因此取 δ=ε 即可。请按“∀ε>0，取 δ=ε，则当 0<|x−4|<δ 时…”的标准格式写完证明。",
      formula: math`\begin{gathered}\text{取 }\delta=\varepsilon>0:\\0<|x-4|<\delta\\\implies |f(x)-7|<\varepsilon\end{gathered}`,
    },
  ],

  "jc935-1-review-9-1": [
    {
      change: "先分别检查分子和分母的极限",
      text: "把 x=2 试代进分子得 2²−2+2=4，代进分母得 (2−2)²=0。这是“非零常数除以零”的结构，商的绝对值会趋于无穷。",
      formula: math`\begin{gathered}
        \lim_{x\to 2}(x^2-x+2)=4\\
        \lim_{x\to 2}(x-2)^2=0
      \end{gathered}`,
    },
    {
      change: "确定分子局部正下界与分母正号",
      text: "因为分子趋于正数 4，在 x=2 足够小的去心邻域内必有 x²−x+2>2；而分母是平方，无论 x 从左侧还是右侧靠近 2，恒有 (x−2)²>0。",
      formula: math`\begin{gathered}
        x^2-x+2>2>0\\
        (x-2)^2>0\quad(x\ne 2)
      \end{gathered}`,
    },
    {
      change: "用下界分式比较并写出符号理由",
      text: "由上一步得到原分式大于 2/(x−2)²，而分母从正侧趋于 0。请据此写出极限结果，并说明为何两侧符号一致。",
      formula: math`\frac{x^2-x+2}{(x-2)^2}>\frac{2}{(x-2)^2}\to\;?`,
    },
  ],

  "jc935-1-review-9-2": [
    {
      change: "给根号差乘共轭，改写成分式",
      text: "x→+∞ 时属于 ∞·(∞−∞) 型。分子分母同乘共轭因式 √(x²+6)+x，括号外原有的系数 x 保持不变。",
      formula: math`\begin{gathered}
        \lim_{x\to+\infty}x\bigl(\sqrt{x^2+6}-x\bigr)\\
        \cdot\frac{\sqrt{x^2+6}+x}{\sqrt{x^2+6}+x}
      \end{gathered}`,
    },
    {
      change: "用平方差公式化简分子中的根号",
      text: "根号差乘共轭后化为 (x²+6)−x²=6，再乘上外面的 x 得到分子 6x，分母暂时保留。",
      formula: math`\lim_{x\to+\infty}\frac{6x}{\sqrt{x^2+6}+x}`,
    },
    {
      change: "利用 x>0 上下同除 x",
      text: "因为 x→+∞ 时 x>0，所以把 x 放进根号里是 √(x²)=x（不带负号）。分子分母同除 x 后，把无穷大化成了趋零项 6/x²。",
      formula: math`\lim_{x\to+\infty}\frac{6}{\sqrt{1+6/x^2}+1}`,
    },
    {
      change: "代入 6/x²→0，只剩数字计算",
      text: "当 x→+∞ 时 6/x²→0，分母趋于非零常数 √1+1，直接算出这个分数并写清理由即可。",
      formula: math`\frac{6}{\sqrt{1+0}+1}=\;?`,
    },
  ],

  "jc935-1-review-9-3": [
    {
      change: "把底数拆成 1 加上一个趋零小量",
      text: "x→+∞ 时底数趋于 1、指数趋于 +∞，属于 1^∞ 型未定式。把分子 x+5 写成 (x+2)+3，将底数改写成 1+3/(x+2)。",
      formula: math`\lim_{x\to+\infty}\left(1+\frac{3}{x+2}\right)^{x+3}`,
    },
    {
      change: "令 u=3/(x+2)，在指数上配出 1/u",
      text: "记 u=3/(x+2)，当 x→+∞ 时 u→0 且底数为正。把指数 x+3 改写成 (1/u)·u(x+3)，凑出第二个重要极限的结构。",
      formula: math`\begin{gathered}
        u=\frac{3}{x+2}\to 0\\[4pt]
        \lim_{x\to+\infty}\Bigl[(1+u)^{1/u}\Bigr]^{u(x+3)}
      \end{gathered}`,
    },
    {
      change: "单独求外部指数 u(x+3) 的极限",
      text: "中括号内部 (1+u)^(1/u)→e。再算外部指数 3(x+3)/(x+2) 在 x→+∞ 时的极限，分子分母同除 x。",
      formula: math`\lim_{x\to+\infty}\frac{3(1+3/x)}{1+2/x}`,
    },
    {
      change: "把指数极限放回 e 的幂次上",
      text: "当 x→+∞ 时 3/x 与 2/x 都趋于 0，外部指数趋于 3。请把底数极限 e 与指数极限合起来写出最终结果。",
      formula: math`e^{\lim u(x+3)}=e^{3/1}`,
    },
  ],

  "jc935-1-review-9-4": [
    {
      change: "提出公因式 sin(3x)，把差化为积",
      text: "这是 0/0 型，但分子是两个一阶等价量相减，不能直接把 tan(3x) 和 sin(3x) 都换成 3x。先写 tan(3x)=sin(3x)/cos(3x) 并提出公因式 sin(3x)。",
      formula: math`\lim_{x\to 0}\frac{\sin(3x)\bigl(1-\cos(3x)\bigr)}{x^3\cos(3x)}`,
    },
    {
      change: "在乘除结构中替换等价无穷小",
      text: "现在分子分母全是乘除因子，可以合法做等价替换：当 x→0 时，sin(3x)∼3x，1−cos(3x)∼(3x)²/2=9x²/2，分母的 cos(3x) 暂时保留。",
      formula: math`\begin{gathered}
        \sin(3x)\sim 3x\\
        1-\cos(3x)\sim\frac{9}{2}x^2\\[4pt]
        \lim_{x\to 0}\frac{3x\cdot\frac{9}{2}x^2}{x^3\cos(3x)}
      \end{gathered}`,
    },
    {
      change: "合并分子中的 x³ 并与分母约分",
      text: "分子相乘得到 (27/2)x³。求极限时 x≠0，因此可以合法约去上下共同的 x³。",
      formula: math`\lim_{x\to 0}\frac{27/2}{\cos(3x)}`,
    },
    {
      change: "代入 x=0，分母 cos 0=1 非零",
      text: "约分后不再是 0/0 型，分母 cos(3x)→1，直接代入算出最终结果并写明替换依据。",
      formula: math`\frac{27/2}{\cos 0}=\;?`,
    },
  ],

  "jc935-1-review-9-5": [
    {
      change: "先取自然对数，把 1^∞ 化为 0/0",
      text: "x→0 时底数趋于 (1+1+1)/3=1、指数趋于 ∞，属于 1^∞ 型。记原式为 A(x)，先取对数算 ln A(x) 的极限，最后再取指数还原。",
      formula: math`\ln A(x)=\frac{1}{x}\ln\!\left(\frac{2^x+5^x+20^x}{3}\right)`,
    },
    {
      change: "把底数写成 1+u，拆出三个 aˣ−1",
      text: "令 u=(2ˣ+5ˣ+20ˣ)/3−1，把 −1 拆成三个 −1/3 分别配给三项。当 x→0 时 u→0，对数式改写成 [ln(1+u)/u]·(u/x)。",
      formula: math`\begin{gathered}u=\tfrac13\bigl[(2^x-1)+(5^x-1)\\+(20^x-1)\bigr]\\\ln A(x)=\frac{\ln(1+u)}{u}\cdot\frac{u}{x}\end{gathered}`,
    },
    {
      change: "套用对数与指数标准极限合并",
      text: "当 x→0 时 u→0，第一因子趋于 1；第二因子逐项套用 (aˣ−1)/x→ln a，合并对数之和为乘积的对数。",
      formula: math`\begin{gathered}
        \lim_{x\to 0}\ln A(x)=\frac{\ln 2+\ln 5+\ln 20}{3}\\
        =\frac{1}{3}\ln(2\times 5\times 20)
      \end{gathered}`,
    },
    {
      change: "把对数极限放回 e 的指数并化简",
      text: "算得 2×5×20=200，所以 ln A(x)→(1/3)ln 200。再通过 e^{(1/3)ln 200} 还原回原极限 A(x)，写出最简根式结果。",
      formula: math`\lim_{x\to 0}A(x)=e^{\frac{1}{3}\ln 200}`,
    },
  ],

  "jc935-1-review-9-6": [
    {
      change: "确认底数为正，改写成自然指数",
      text: "在 x=0 附近 cos x>0，底数趋于 1 而 cot x→∞，属于 1^∞ 型未定式。先把它写成 e 的指数形式，专心求指数的极限。",
      formula: math`(\cos x)^{\cot x}=e^{\cot x\cdot\ln(\cos x)}`,
    },
    {
      change: "拆开 cot x 并替换等价无穷小",
      text: "指数部分写成 (cos x / sin x)·ln(1+(cos x−1))。当 x→0 时，cos x−1→0，所以 ln(cos x)∼cos x−1∼−x²/2，且 sin x∼x。",
      formula: math`\begin{gathered}
        \ln(\cos x)\sim -\frac{x^2}{2},\quad \sin x\sim x\\[4pt]
        \lim_{x\to 0}\frac{\cos x\cdot(-x^2/2)}{x}
      \end{gathered}`,
    },
    {
      change: "约去公因式 x，算出指数极限",
      text: "在 x≠0 时约去一个 x，剩下的 −(x cos x)/2 在 x→0 时直接代入得 0，说明底数趋于 1 的速度比指数变大更快。",
      formula: math`\lim_{x\to 0}\left(-\frac{x\cos x}{2}\right)=0`,
    },
    {
      change: "将指数极限 0 代回 e^u 得出原极限",
      text: "由指数函数的连续性，把指数极限 0 放回 e 的幂次上，算出最终数值并核对理由。",
      formula: math`\lim_{x\to 0}(\cos x)^{\cot x}=e^0`,
    },
  ],

  "jc935-1-review-9-7": [
    {
      change: "用对数减法公式合并分子",
      text: "直接代入 x=4 是 0/0 型。利用 ln A−ln B=ln(A/B)，把分子合并成单个对数 ln(x/4)。",
      formula: math`\lim_{x\to 4}\frac{\ln(x/4)}{x-4}`,
    },
    {
      change: "令 u=(x−4)/4 凑出 1+u",
      text: "为了套用标准极限 ln(1+u)/u→1，令 u=(x−4)/4，这样 x/4=1+u，同时分母 x−4=4u。",
      formula: math`\begin{gathered}
        u=\frac{x-4}{4}\to 0,\quad x-4=4u\\[4pt]
        \lim_{u\to 0}\frac{\ln(1+u)}{4u}
      \end{gathered}`,
    },
    {
      change: "提出常数 1/4，套用标准对数极限",
      text: "把常数因子 1/4 提到极限号外面，里面正好是标准极限 lim_{u→0} ln(1+u)/u=1。算出最终分数即可。",
      formula: math`\frac{1}{4}\lim_{u\to 0}\frac{\ln(1+u)}{u}=\frac{1}{4}\times 1`,
    },
  ],

  "jc935-1-review-9-8": [
    {
      change: "分母有理化，化出平方差 −3x²",
      text: "x→0 时为 0/0 型。分子分母同乘分母的共轭因式 √(1−3x²)+1，分母化为 (1−3x²)−1=−3x²，注意保留负号。",
      formula: math`\lim_{x\to 0}\frac{x\tan(2x)\bigl(\sqrt{1-3x^2}+1\bigr)}{-3x^2}`,
    },
    {
      change: "乘法中把 tan(2x) 换成 2x",
      text: "分子是纯乘积结构，且 x→0 时 2x→0，可以合法用 tan(2x)∼2x 替换，其余因子保持不变。",
      formula: math`\lim_{x\to 0}\frac{x\cdot 2x(\sqrt{1-3x^2}+1)}{-3x^2}`,
    },
    {
      change: "约去上下共同的因式 x²",
      text: "求极限时 x≠0，把分子合并出的 2x² 与分母的 −3x² 中的 x² 合法约去。",
      formula: math`\lim_{x\to 0}\frac{2\bigl(\sqrt{1-3x^2}+1\bigr)}{-3}`,
    },
    {
      change: "代入 x=0，只剩带负号的数字运算",
      text: "分母已经是常数 −3，直接把 x=0 代入分子算出结果，注意检查负号来源。",
      formula: math`\frac{2(\sqrt{1-0}+1)}{-3}=\;?`,
    },
  ],

  "jc935-1-review-10": [
    {
      change: "锁定唯一需要检查的接缝点 x=2",
      text: "在 u<0 和 u>0 两段内部，表达式都是初等函数，各自连续。因此全轴连续等价于在分界点 u=0（即 x=2）处左右极限都等于点值 f(2)。",
      formula: math`\lim_{u\to 0^-}f=\lim_{u\to 0^+}f=f(2)`,
    },
    {
      change: "直接算出左极限与点值 f(2)",
      text: "当 u≤0 时表达式为多项式 a+u²，直接代入 u=0 得到左极限与点值都等于 a。",
      formula: math`\lim_{u\to 0^-}(a+u^2)=f(2)=a`,
    },
    {
      change: "用夹逼不等式压住右侧振荡项",
      text: "当 u→0⁺ 时 cos(1/u) 剧烈摆动但有界，满足 |cos(1/u)|≤1。两边同乘正数 3u，得到夹逼不等式。",
      formula: math`0\le\bigl|3u\cos(1/u)\bigr|\le 3u\quad(u>0)`,
    },
    {
      change: "由夹逼定出右极限，与左极限联立",
      text: "当 u→0⁺ 时 3u→0，由夹逼准则知右极限为 0。令左极限、点值与右极限相等，即可写出参数 a 的值。",
      formula: math`\lim_{u\to 0^+}3u\cos(1/u)=0=a`,
    },
  ],

  "jc935-1-review-11": [
    {
      change: "按 |x/2| 与 1 的大小分成三类",
      text: "固定 x 后，(x/2)^{2n}=((x/2)^2)^n 是等比数列。底数小于 1 时趋于 0，等于 1 时恒为 1，大于 1 时趋于 +∞。",
      formula: math`\lim_{n\to\infty}\left(\frac{x}{2}\right)^{2n}=\begin{cases}0,&|x|<2\\1,&|x|=2\\+\infty,&|x|>2\end{cases}`,
    },
    {
      change: "代回原式写出 G(x) 的分段表达式",
      text: "把三类结果分别代入 (2+x)/(1+(x/2)^{2n})，得到分段函数 G(x)。特别算一下两个端点：G(−2)=0，G(2)=2。",
      formula: math`G(x)=\begin{cases}2+x,&|x|<2\\(2+x)/2,&|x|=2\\0,&|x|>2\end{cases}`,
    },
    {
      change: "检查左分界点 x=−2 的左右极限",
      text: "在 x=−2 处，左极限来自外段恒为 0，右极限来自内段 2+x 趋于 0，且点值 G(−2)=0，三者相等，说明左门处连续。",
      formula: math`\begin{gathered}
        \lim_{x\to -2^-}G(x)=0,\quad G(-2)=0\\
        \lim_{x\to -2^+}G(x)=\lim_{x\to -2^+}(2+x)=0
      \end{gathered}`,
    },
    {
      change: "检查右分界点 x=2 的左右极限并分类",
      text: "在 x=2 处，左极限来自内段 2+x，右极限来自外段 0。比较这两个有限单侧极限是否相等，据此写出全部间断点及类型。",
      formula: math`\begin{gathered}
        \lim_{x\to 2^-}G(x)=2+2=4\\
        \lim_{x\to 2^+}G(x)=0
      \end{gathered}`,
    },
  ],

  "jc935-1-review-12": [
    {
      change: "给每一项的分母夹出统一上下界",
      text: "求和指标 k 从 1 走到 n，因此 0<3k≤3n。由此把每个分母 √(n²+3k) 夹在最小可能值 √(n²)=n 与最大可能值 √(n²+3n) 之间。",
      formula: math`\begin{gathered}
        1\le k\le n:\\
        n<\sqrt{n^2+3k}\le\sqrt{n^2+3n}
      \end{gathered}`,
    },
    {
      change: "取倒数翻转不等号，得到单项估计",
      text: "正数取倒数时不等号方向要翻转：最大分母给出最小单项，最小分母给出最大单项。",
      formula: math`\frac{1}{\sqrt{n^2+3n}}\le\frac{1}{\sqrt{n^2+3k}}<\frac{1}{n}`,
    },
    {
      change: "把 n 项不等式相加构造夹逼桥梁",
      text: "从 k=1 到 n 一共有 n 项，左右两端都与 k 无关，相加就是各自乘以 n，从而把整个和 Sₙ 夹住。",
      formula: math`\frac{n}{\sqrt{n^2+3n}}\le S_n\le\frac{n}{n}=1`,
    },
    {
      change: "下界上下同除 n，验证两端极限同为 1",
      text: "把下界分子分母同除正数 n 化为 1/√(1+3/n)。当 n→∞ 时 3/n→0，上下界极限相同，请套用夹逼准则写出最终证明。",
      formula: math`\begin{gathered}
        \frac{1}{\sqrt{1+3/n}}\le S_n\le 1\\
        \lim_{n\to\infty}\frac{1}{\sqrt{1+3/n}}=1
      \end{gathered}`,
    },
  ],

  "jc935-1-review-13": [
    {
      change: "移项构造辅助函数 F(x)",
      text: "把方程 2sin x+x=1 改写成一端为零的形式，定义 F(x)=2sin x+x−1，原方程的实根就对应 F(x) 的零点。",
      formula: math`F(x)=2\sin x+x-1`,
    },
    {
      change: "确认 F(x) 在闭区间上连续",
      text: "正弦函数与一次多项式都在全体实数上连续，因此 F(x) 在闭区间 [−π/2, π/2] 上连续，满足零点定理的前提。",
      formula: math`F\in C\bigl[-\tfrac{\pi}{2},\,\tfrac{\pi}{2}\bigr]`,
    },
    {
      change: "计算两端点函数值并判断符号",
      text: "分别把 x=−π/2 和 x=π/2 代入 F(x)，利用 sin(−π/2)=−1 与 sin(π/2)=1，判断两端值的正负。",
      formula: math`\begin{gathered}
        F(-\pi/2)=-3-\frac{\pi}{2}<0\\[4pt]
        F(\pi/2)=1+\frac{\pi}{2}>0
      \end{gathered}`,
    },
    {
      change: "由端点异号调用零点定理",
      text: "左端为负、右端为正，F(−π/2)·F(π/2)<0。请据此引用闭区间连续函数的零点定理，写出开区间内至少存在一个实根的结论。",
      formula: math`F\!\left(-\frac{\pi}{2}\right)\cdot F\!\left(\frac{\pi}{2}\right)<0`,
    },
  ],

  "jc935-1-review-14-1": [
    {
      change: "写出曲线上点到直线的距离公式",
      text: "把直线写成一般式 kx−y+b=0。曲线上任一点 (x, f(x)) 到该直线的最短距离，等于竖直差绝对值除以常数 √(1+k²)。",
      formula: math`d(x)=\frac{|f(x)-kx-b|}{\sqrt{1+k^2}}`,
    },
    {
      change: "把距离趋零等价转化为竖直差趋零",
      text: "因为 √(1+k²) 是固定正数，所以 d(x)→0 严格等价于 f(x)−kx−b→0，也就是 lim[f(x)−kx]=b。",
      formula: math`\begin{gathered}
        \lim_{x\to+\infty}d(x)=0\\
        \iff \lim_{x\to+\infty}\bigl[f(x)-kx\bigr]=b
      \end{gathered}`,
    },
    {
      change: "证正向：由竖直差趋零推出斜率极限",
      text: "若 d(x)→0，已知 f(x)−kx→b（有限）。把该式两边同除 x，利用常数除以无穷趋于 0，即可推出 f(x)/x→k。",
      formula: math`\begin{gathered}
        \frac{f(x)}{x}-k=\frac{f(x)-kx}{x}\to 0\\
        \implies \lim_{x\to+\infty}\frac{f(x)}{x}=k
      \end{gathered}`,
    },
    {
      change: "证逆向：由两条有限极限还原距离趋零",
      text: "反过来，若已知两条有限极限，第二条直接说明 f(x)−kx−b→0，再除以 √(1+k²) 即得 d(x)→0。请梳理双向推演完成证明。",
      formula: math`\begin{gathered}
        f(x)-kx\to b\\
        \implies d(x)=\frac{|f(x)-kx-b|}{\sqrt{1+k^2}}\to 0
      \end{gathered}`,
    },
  ],

  "jc935-1-review-14-2": [
    {
      change: "先用 f(x)/x 求斜渐近线斜率 k",
      text: "按斜渐近线公式，先求 x→+∞ 时 f(x)/x 的极限。把 x 除进一次因子 (3x−2) 中，得到 (3−2/x)e^(2/x)。",
      formula: math`\begin{gathered}
        k=\lim_{x\to+\infty}\frac{f(x)}{x}\\
        =\lim_{x\to+\infty}\left(3-\frac{2}{x}\right)e^{2/x}=3
      \end{gathered}`,
    },
    {
      change: "把 f(x)−3x 拆成两项",
      text: "再求截距 b=lim[f(x)−3x]。不能直接把 e^(2/x) 换成 1，先把 (3x−2)e^(2/x)−3x 展开并合并含 3x 的项。",
      formula: math`f(x)-3x=3x\bigl(e^{2/x}-1\bigr)-2e^{2/x}`,
    },
    {
      change: "令 u=2/x 凑出 (eᵘ−1)/u",
      text: "当 x→+∞ 时令 u=2/x→0，于是 3x=6/u。把表达式写成只含 u 的标准极限形式。",
      formula: math`\begin{gathered}
        u=\frac{2}{x}\to 0,\quad 3x=\frac{6}{u}\\[4pt]
        b=\lim_{u\to 0}\left(6\cdot\frac{e^u-1}{u}-2e^u\right)
      \end{gathered}`,
    },
    {
      change: "套用 (eᵘ−1)/u→1 算出截距并写直线",
      text: "当 u→0 时 (eᵘ−1)/u→1 且 eᵘ→1，算出截距 b 后与斜率 k=3 合写成斜渐近线方程 y=kx+b。",
      formula: math`b=6\times 1-2\times 1`,
    },
  ],

  "jc935-1-review-14-3": [
    {
      change: "解对数真数大于零，找出全部边界点",
      text: "先求定义域：要求 3+2/x=(3x+2)/x>0，解得 (−∞, −2/3)∪(0, +∞)。有两个有限边界点 x=−2/3 与 x=0 需要分别检查。",
      formula: math`\begin{gathered}
        3+\frac{2}{x}=\frac{3x+2}{x}>0\\
        D_f=\left(-\infty,-\frac{2}{3}\right)\cup(0,+\infty)
      \end{gathered}`,
    },
    {
      change: "区分两个边界点：仅 −2/3 是竖直渐近线",
      text: "当 x→−2/3⁻ 时 3+2/x→0⁺，ln 趋于 −∞，乘以负数 x 后趋于 +∞；而 x→0⁺ 时改写为 x ln(3x+2)−x ln x，利用 x ln x→0 得极限为 0，故 0 不是竖直渐近线。",
      formula: math`\begin{gathered}
        \lim_{x\to -2/3^-}f(x)=+\infty\\
        \lim_{x\to 0^+}x\bigl[\ln(3x+2)-\ln x\bigr]=0
      \end{gathered}`,
    },
    {
      change: "求 x→±∞ 时的斜率 k",
      text: "在正负无穷远处，2/x 都趋于 0，因此 f(x)/x=ln(3+2/x) 在两端有相同的有限极限 ln 3。",
      formula: math`\begin{gathered}
        k=\lim_{x\to\pm\infty}\frac{f(x)}{x}\\
        =\lim_{x\to\pm\infty}\ln\!\left(3+\frac{2}{x}\right)=\ln 3
      \end{gathered}`,
    },
    {
      change: "合并对数差求截距 b 并汇总渐近线",
      text: "计算 f(x)−x ln 3 = x ln(1+2/(3x))。令 u=2/(3x)→0，改写成 (2/3)·ln(1+u)/u 算出截距 b，再汇总全部竖直与斜渐近线方程。",
      formula: math`\begin{gathered}
        f(x)-x\ln 3=x\ln\!\left(1+\frac{2}{3x}\right)\\
        u=\frac{2}{3x}\to 0:\;\frac{2}{3}\lim_{u\to 0}\frac{\ln(1+u)}{u}
      \end{gathered}`,
    },
  ],
};

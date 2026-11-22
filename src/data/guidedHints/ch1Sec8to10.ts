import type { GuidedHint } from "../learning";

const math = String.raw;

export const ch1Sec8to10GuidedHints: Record<string, GuidedHint[]> = {
  "jc935-1-8-1": [
    {
      change: "区分空心点与实心点的含义",
      text: "在函数图像上，空心点标出曲线左右靠近的极限高度，实心点才是该处真正取到的函数值。先圈出图上所有出现空心点、错位实心点或断层的位置。",
      formula: math`\begin{gathered}
        \text{空心点} \leftrightarrow \lim_{x\to x_0} f(x)\\[4pt]
        \text{实心点} \leftrightarrow f(x_0)
      \end{gathered}`,
    },
    {
      change: "读出 −2、1、3 处的双侧极限",
      text: "在 x=−2、1、3 这三处，曲线从左侧和右侧都逼近同一个空心点，只是该点缺值或实心点被挪到了别处（比如 x=1 处实心点在 4，但曲线两边靠近的是 1）。",
      formula: math`\begin{gathered}
        \lim_{x\to -2}f(x)=0,\quad \lim_{x\to 1}f(x)=1\\[4pt]
        \lim_{x\to 3}f(x)=1
      \end{gathered}`,
    },
    {
      change: "比较 x=0 处的左右极限",
      text: "在 x=0 处，左支曲线靠近高度 2，右支曲线靠近高度 0，两侧极限虽然都有限但不相等，只改一个点的函数值无法让两条支线接上。",
      formula: math`\begin{gathered}
        \lim_{x\to 0^-}f(x)=2\\[4pt]
        \lim_{x\to 0^+}f(x)=0
      \end{gathered}`,
    },
    {
      change: "核对端点并汇总可补与不可补的点",
      text: "闭区间 [−4,4] 的两个端点只按区间内部一侧的单侧极限判断，均与端点值吻合。请根据以上极限分别写出哪些间断点可去（并给出补值）、哪一点不可补，再对照参考解答。",
      formula: math`\begin{gathered}
        x\in\{-2,1,3\}:\ \lim_{x\to x_0^-}f=\lim_{x\to x_0^+}f\\[4pt]
        x=0:\ \lim_{x\to 0^-}f\ne\lim_{x\to 0^+}f
      \end{gathered}`,
    },
  ],

  "jc935-1-8-2-1": [
    {
      change: "先看两段内部的多项式连续性",
      text: "在 [0,2) 上 f(x)=x² 是多项式，在 (2,6] 上 f(x)=6−x 也是多项式，它们在各自内部自然连续。唯一可能出问题的是接缝 x=2，以及两个闭端点的单侧连续性。",
      formula: math`\begin{gathered}
        [0,2):\ f(x)=x^2\\[4pt]
        (2,6]:\ f(x)=6-x
      \end{gathered}`,
    },
    {
      change: "算接缝 x=2 的左极限与点值",
      text: "因为 x=2 落在第一段 0≤x≤2 内，所以左极限和函数值 f(2) 都用第一段 x² 来算。",
      formula: math`\begin{gathered}
        \lim_{x\to 2^-}f(x)=\lim_{x\to 2^-}x^2=2^2\\[4pt]
        f(2)=2^2
      \end{gathered}`,
    },
    {
      change: "算接缝 x=2 的右极限",
      text: "从 x>2 一侧靠近 2 时，函数按第二段 6−x 取值，把 2 代入这一段求出右极限。",
      formula: math`\lim_{x\to 2^+}f(x)=\lim_{x\to 2^+}(6-x)=6-2`,
    },
    {
      change: "对比三者并检查端点单侧连续",
      text: "算出左极限、右极限和 f(2) 的具体数值，看三者是否相等（注意：两段斜率不同形成拐角不影响连续）。再确认 0 处右连续、6 处左连续，写出在 [0,6] 上是否连续的结论并对照参考解答。",
      formula: math`\begin{gathered}
        \lim_{x\to 2^-}f(x)\stackrel{?}{=}\lim_{x\to 2^+}f(x)\stackrel{?}{=}f(2)
      \end{gathered}`,
    },
  ],

  "jc935-1-8-2-2": [
    {
      change: "把绝对值不等式拆成三段区间",
      text: "先把 |x|≤2 写成 −2≤x≤2，把 |x|>2 写成 x<−2 或 x>2。这样能清楚看到两个分段接缝：x=−2 和 x=2，每段内部都是多项式或常数，必然连续。",
      formula: math`f(x)=\begin{cases}
        3,&x<-2\\
        x+1,&-2\le x\le 2\\
        3,&x>2
      \end{cases}`,
    },
    {
      change: "检查左侧接缝 x=−2 的极限与点值",
      text: "在 x=−2 处，左侧用常函数 3，右侧和点值本身都落在中间段 x+1（因为 −2 满足 |x|≤2）。分别算出左极限、右极限和 f(−2)。",
      formula: math`\begin{gathered}
        \lim_{x\to -2^-}f(x)=3\\[4pt]
        \lim_{x\to -2^+}f(x)=f(-2)=-2+1
      \end{gathered}`,
    },
    {
      change: "检查右侧接缝 x=2 的极限与点值",
      text: "在 x=2 处，左侧和点值落在中间段 x+1，右侧落在常函数 3。分别代入比较两侧极限和点值。",
      formula: math`\begin{gathered}
        \lim_{x\to 2^-}f(x)=f(2)=2+1\\[4pt]
        \lim_{x\to 2^+}f(x)=3
      \end{gathered}`,
    },
    {
      change: "根据对比结果判断间断点与单侧连续",
      text: "算出上面两个接缝的数值后，你会发现只有一个接缝没接上。请指出哪个点是间断点、属于哪种类型，并看它的点值与哪一侧极限相等，写出单侧连续性结论后对照参考解答。",
      formula: math`\begin{gathered}
        x=-2:\ 3\ne -1\\[4pt]
        x=2:\ 3=3
      \end{gathered}`,
    },
  ],

  "jc935-1-8-3-1": [
    {
      change: "把分子写成平方差形式",
      text: "x=3 和 x=4 使分母为零，所以函数在这两点无定义。先把分子 x²−9 因式分解，看看哪些因子能与分母抵消。",
      formula: math`f(x)=\frac{(x-3)(x+3)}{(x-3)(x-4)}`,
    },
    {
      change: "在 x≠3,4 时约掉公因式 x−3",
      text: "求极限时只考察去心邻域，因此当 x≠3 且 x≠4 时可以合法约去 x−3。注意：原函数在 x=3 依然无定义，化简式只用来算极限。",
      formula: math`f(x)=\frac{x+3}{x-4}\quad(x\ne 3,\,4)`,
    },
    {
      change: "计算 x→3 时的极限",
      text: "把 x=3 代入化简后的分式，分母 3−4≠0，因此存在有限的双侧极限，说明 x=3 是可去间断点。",
      formula: math`\lim_{x\to 3}f(x)=\frac{3+3}{3-4}=\;?`,
    },
    {
      change: "分析 x→4 时的分子分母趋势",
      text: "当 x→4 时，化简后分子趋近非零常数 7，分母 x−4 趋近 0，因此 |f(x)|→+∞。请算出上一步的具体补值，并分别写明 x=3 与 x=4 的间断类型，再对照参考解答。",
      formula: math`\begin{gathered}
        x\to 4:\ x+3\to 7,\quad x-4\to 0\\[4pt]
        \lim_{x\to 4}|f(x)|=+\infty
      \end{gathered}`,
    },
  ],

  "jc935-1-8-3-2": [
    {
      change: "用正余弦改写原分式",
      text: "在原函数有定义的区域内（即 sin(2x)≠0 且 cos(2x)≠0），把 tan(2x) 写成 sin(2x)/cos(2x)，分母翻上去得到更直观的形式。",
      formula: math`f(x)=\frac{x\cos(2x)}{\sin(2x)}`,
    },
    {
      change: "单独求 x=0 处的极限",
      text: "x=0 时分子分母同时趋于 0。把式子凑成基本极限 2x/sin(2x)→1 的形式，再乘上余下的常数 1/2 和 cos(2x)→1。",
      formula: math`\begin{gathered}
        f(x)=\frac{1}{2}\cdot\frac{2x}{\sin(2x)}\cdot\cos(2x)\\[4pt]
        \lim_{x\to 0}f(x)=\frac{1}{2}\cdot 1\cdot 1=\;?
      \end{gathered}`,
    },
    {
      change: "分析其余 kπ/2 (k≠0) 处的趋势",
      text: "当 x→kπ/2 且 k≠0 时，2x→kπ，于是 sin(2x)→0，而分子 x cos(2x) 趋近非零数 (kπ/2)(−1)ᵏ，整个分式的绝对值趋于无穷大。",
      formula: math`\begin{gathered}
        x\to\frac{k\pi}{2}\ (k\ne 0):\\[4pt]
        x\cos(2x)\to\frac{k\pi}{2}(-1)^k\ne 0\\[4pt]
        \sin(2x)\to 0
      \end{gathered}`,
    },
    {
      change: "分析 x=π/4+kπ/2 处的极限",
      text: "当 x→π/4+kπ/2 时，2x→π/2+kπ，此时 cos(2x)→0，而分母 sin(2x)→(−1)ᵏ≠0，所以极限存在且有限。请整理三类点的间断类型与可去点的补值，再对照参考解答。",
      formula: math`\begin{gathered}x\to\frac{\pi}{4}+\frac{k\pi}{2}:\\\cos(2x)\to 0,\\\sin(2x)\to (-1)^k\ne 0\end{gathered}`,
    },
  ],

  "jc935-1-8-3-3": [
    {
      change: "观察 x→0 时角度 2/x 的变化",
      text: "当 x 从右侧趋近 0 时，2/x 趋向 +∞，cos²(2/x) 会在 0 和 1 之间无限次来回摆动。要严格说明极限不存在，可以构造两串都趋于 0⁺ 的点列。",
      formula: math`x\to 0^+\Longrightarrow \frac{2}{x}\to +\infty`,
    },
    {
      change: "构造让函数恒为 1 的点列",
      text: "令角度 2/xₙ = nπ（n 为正整数），解出 xₙ = 2/(nπ)。当 n→∞ 时 xₙ→0⁺，而 cos(nπ)=±1，平方后恒等于 1。",
      formula: math`\begin{gathered}
        x_n=\frac{2}{n\pi}\to 0^+\\[4pt]
        f(x_n)=\cos^2(n\pi)=1
      \end{gathered}`,
    },
    {
      change: "构造让函数恒为 0 的点列",
      text: "再令角度 2/zₙ = (n+1/2)π，解出 zₙ = 2/[(n+1/2)π]。同样有 zₙ→0⁺，但此时 cos((n+1/2)π)=0，平方后恒等于 0。",
      formula: math`\begin{gathered}
        z_n=\frac{2}{(n+\tfrac12)\pi}\to 0^+\\[4pt]
        f(z_n)=\cos^2\!\left(\left(n+\tfrac12\right)\pi\right)=0
      \end{gathered}`,
    },
    {
      change: "比较两串点列的函数值极限",
      text: "两串点列都从右侧趋向 0，但对应的函数值极限一个是 1、一个是 0，说明连右极限都不存在。请据此写出 x=0 的间断类型，再对照参考解答。",
      formula: math`\lim_{n\to\infty}f(x_n)=1\ne 0=\lim_{n\to\infty}f(z_n)`,
    },
  ],

  "jc935-1-8-3-4": [
    {
      change: "由左分支求左极限和点值",
      text: "因为 x=2 包含在 x≤2 这一段内，所以左极限和点值 f(2) 都由 2x−4 直接代入计算。",
      formula: math`\begin{gathered}\lim_{x\to 2^-}f(x)\\=\lim_{x\to 2^-}(2x-4)=2\cdot 2-4\\f(2)=2\cdot 2-4\end{gathered}`,
    },
    {
      change: "由右分支求右极限",
      text: "当 x 从大于 2 的一侧靠近 2 时，函数遵循第二段 5−x，把 2 代入这一段得到右极限。",
      formula: math`\lim_{x\to 2^+}f(x)=\lim_{x\to 2^+}(5-x)=5-2`,
    },
    {
      change: "比较左右极限与点值下结论",
      text: "分别算出左极限、右极限和 f(2) 的值。两侧极限都有限但不相等时属于哪类间断？点值与哪一侧极限一致？请写明间断类型和单侧连续性，再对照参考解答。",
      formula: math`\begin{gathered}
        \lim_{x\to 2^-}f(x)=0,\quad \lim_{x\to 2^+}f(x)=3\\[4pt]
        f(2)=0
      \end{gathered}`,
    },
  ],

  "jc935-1-8-4": [
    {
      change: "固定 x 并引入非负底数 t=|x|/2",
      text: "求逐点极限时先把 x 固定，再让 n→∞。由于指数 2n 是偶数，(x/2)^(2n) = (|x|/2)^(2n)。令 t=|x|/2≥0，按 t<1、t=1、t>1 三种情况讨论。",
      formula: math`\begin{gathered}
        t=\frac{|x|}{2}\ge 0\\[4pt]
        G(x)=\lim_{n\to\infty}\frac{2-t^{2n}}{1+t^{2n}}
      \end{gathered}`,
    },
    {
      change: "计算 t<1 与 t=1 两种情形",
      text: "当 t<1（即 |x|<2）时，t^(2n)→0，直接代入得 2/1=2；当 t=1（即 |x|=2）时，t^(2n) 恒为 1，直接算出常数比值。",
      formula: math`\begin{gathered}
        |x|<2:\ G(x)=\frac{2-0}{1+0}=2\\[4pt]
        |x|=2:\ G(x)=\frac{2-1}{1+1}=\frac12
      \end{gathered}`,
    },
    {
      change: "t>1 时上下同除 t^(2n)",
      text: "当 t>1（即 |x|>2）时，t^(2n)→+∞，是 ∞/∞ 型。分子分母同除以最高幂 t^(2n)，利用 1/t^(2n)→0 求出极限。",
      formula: math`\begin{gathered}
        |x|>2:\ G(x)=\lim_{n\to\infty}\frac{2t^{-2n}-1}{t^{-2n}+1}\\[4pt]
        =\frac{0-1}{0+1}=-1
      \end{gathered}`,
    },
    {
      change: "写出分段式并检验 x=±2 处的左右极限",
      text: "把三段拼成完整的 G(x) 后，每段内部都是常函数，只需检查接缝 x=−2 和 x=2。请比较这两点两侧的极限高度，写明间断点与分类，再对照参考解答。",
      formula: math`G(x)=\begin{cases}
        2,&|x|<2\\
        1/2,&|x|=2\\
        -1,&|x|>2
      \end{cases}`,
    },
  ],

  "jc935-1-8-5-1": [
    {
      change: "写出目标误差并提出常数 2",
      text: "要证 2|f(x)| 在 x=2 连续，先写出它与点值 2|f(2)| 的距离，并把正系数 2 提到最外层绝对值外面。",
      formula: math`\begin{gathered}
        \big|2|f(x)|-2|f(2)|\big|\\[4pt]
        =2\big||f(x)|-|f(2)|\big|
      \end{gathered}`,
    },
    {
      change: "用反三角不等式去掉内层绝对值",
      text: "对任意实数 a、b，反三角不等式给出 ||a|−|b|| ≤ |a−b|。把它用到 |f(x)| 和 |f(2)| 上，就把目标误差转化成了 f 自身的误差。",
      formula: math`2\big||f(x)|-|f(2)|\big|\le 2|f(x)-f(2)|`,
    },
    {
      change: "用 f 在 2 处的连续性控制右边",
      text: "任给 ε>0，为了让 2|f(x)−f(2)| < ε，只需要让 |f(x)−f(2)| < ε/2。因为 f 在 x=2 连续，对正数 ε/2 必存在对应的 δ>0。",
      formula: math`\begin{gathered}
        \exists\delta>0,\ |x-2|<\delta\\[4pt]
        \Longrightarrow |f(x)-f(2)|<\frac{\varepsilon}{2}
      \end{gathered}`,
    },
    {
      change: "把两步不等式串起来完成证明",
      text: "把第 2 步的放缩和第 3 步的控制拼在一起，就能得到 |2|f(x)|−2|f(2)|| < ε。请用规范的 ε–δ 语言整理完整证明，再对照参考解答。",
      formula: math`\begin{gathered}
        \big|2|f(x)|-2|f(2)|\big|\\[4pt]
        \le 2|f(x)-f(2)|<\varepsilon
      \end{gathered}`,
    },
  ],

  "jc935-1-8-5-2": [
    {
      change: "先算原函数 f 在 3 处的左右极限",
      text: "检验命题“若 |f| 在 3 连续，则 f 在 3 连续”，先看原函数 f 在 x=3 处是否连续。左右两支分别是常数 −2 和 2。",
      formula: math`\begin{gathered}
        \lim_{x\to 3^-}f(x)=-2\\[4pt]
        \lim_{x\to 3^+}f(x)=2
      \end{gathered}`,
    },
    {
      change: "再对两支分别取绝对值",
      text: "计算 |f(x)|：当 x<3 时 |−2|=2；当 x≥3 时 |2|=2。两支取绝对值后合成了同一个常函数。",
      formula: math`|f(x)|=\begin{cases}
        |-2|=2,&x<3\\
        |2|=2,&x\ge 3
      \end{cases}=2`,
    },
    {
      change: "对比 f 与 |f| 在 3 处的连续性",
      text: "常函数 |f(x)|≡2 在 x=3 处显然连续，但原函数 f 在 x=3 处左右极限不等。请据此判断原命题真假并写出反例说明，再对照参考解答。",
      formula: math`\begin{gathered}
        |f|\ \text{在 }3\text{ 连续}\\[4pt]
        f\ \text{在 }3\text{ 跳跃间断}
      \end{gathered}`,
    },
  ],

  "jc935-1-8-6": [
    {
      change: "计算目标上界与点值的距离",
      text: "已知 f(2)=−4，要让 f(x) 严格小于 −2，也就是不让 f(x) 从 −4 往上漂移超过 2 个单位。因此可以选定 ε = (−2)−(−4) = 2。",
      formula: math`\begin{gathered}\varepsilon=(-2)-f(2)\\=(-2)-(-4)=2\end{gathered}`,
    },
    {
      change: "对 ε=2 套用连续性定义",
      text: "因为 f 在 x=2 连续，对选定的 ε=2，必然存在某个 δ>0，使得只要 |x−2|<δ，输出偏差 |f(x)−f(2)| 就小于 2。",
      formula: math`\begin{gathered}
        \exists\delta>0,\ |x-2|<\delta\\[4pt]
        \Longrightarrow |f(x)+4|<2
      \end{gathered}`,
    },
    {
      change: "展开绝对值不等式读出上界",
      text: "把 |f(x)+4|<2 写成双向不等式，再把各边同时减去 4，右侧就给出目标结论。请补齐最终推导步骤，再对照参考解答。",
      formula: math`\begin{gathered}
        -2<f(x)+4<2\\[4pt]
        \Longrightarrow f(x)<2-4
      \end{gathered}`,
    },
  ],

  "jc935-1-8-7-1": [
    {
      change: "先确定点值 f(0)",
      text: "0 是有理数，所以按有理分支 f(x)=3x 计算，得到 f(0)=0。",
      formula: math`0\in\mathbb Q\Longrightarrow f(0)=3\cdot 0=0`,
    },
    {
      change: "给两类输入找统一误差上界",
      text: "因为 0 的任意邻域里既有有理数又有无理数，必须同时控制两支。有理数时 |f(x)|=3|x|，无理数时 |f(x)|=|x|≤3|x|，因此对所有实数 x 都有同一个上界。",
      formula: math`\begin{gathered}
        |f(x)-f(0)|=|f(x)|\le 3|x|\\[4pt]
        (\forall x\in\mathbb R)
      \end{gathered}`,
    },
    {
      change: "由 3|x|<ε 反解出 δ",
      text: "任给 ε>0，只要让更大的上界 3|x| 小于 ε，就能保证 |f(x)−f(0)|<ε。请解出 δ 的取法并写出完整的 ε–δ 证明，再对照参考解答。",
      formula: math`3|x|<\varepsilon\Longleftrightarrow |x|<\frac{\varepsilon}{3}`,
    },
  ],

  "jc935-1-8-7-2": [
    {
      change: "在非零点 a 附近各取一串数列",
      text: "有理数和无理数在实数轴上都是稠密的。对任意 a≠0，可以分别取一串有理数列 rₙ→a 和一串无理数列 sₙ→a（每项都不等于 a）。",
      formula: math`\begin{gathered}
        r_n\in\mathbb Q,\ r_n\to a\\[4pt]
        s_n\notin\mathbb Q,\ s_n\to a
      \end{gathered}`,
    },
    {
      change: "分别求两串数列对应的函数值极限",
      text: "把两串数列分别代入各自对应的规则：有理数列走 3x，无理数列走 x，得到两个极限值。",
      formula: math`\begin{gathered}
        \lim_{n\to\infty}f(r_n)=\lim_{n\to\infty}3r_n=3a\\[4pt]
        \lim_{n\to\infty}f(s_n)=\lim_{n\to\infty}s_n=a
      \end{gathered}`,
    },
    {
      change: "利用 a≠0 比较两个极限",
      text: "因为已知 a≠0，所以 3a−a=2a≠0，两串趋向 a 的数列给出的函数值极限不同。请据此用海涅定理说明 lim_{x→a}f(x) 不存在、从而 f 在 a 处不连续，再对照参考解答。",
      formula: math`a\ne 0\Longrightarrow 3a\ne a`,
    },
  ],

  "jc935-1-8-8": [
    {
      change: "把任意点的增量写成 F(h)−2",
      text: "任取实数 x 和步长 h，把 y=h 代入函数方程 F(x+y)=F(x)+F(y)−2，再把 F(x) 移到左边，发现增量只和 h 有关。",
      formula: math`F(x+h)-F(x)=F(h)-2`,
    },
    {
      change: "把 x=1 代入得到同样的右边",
      text: "把上面等式里的 x 换成已知连续的点 1，右边仍然是 F(h)−2。",
      formula: math`F(1+h)-F(1)=F(h)-2`,
    },
    {
      change: "把任意点的变化与 1 处的变化划等号",
      text: "两式右边完全相同，因此任意点 x 处的高度变化等于 1 处走同一步长 h 的高度变化。",
      formula: math`\begin{gathered}F(x+h)-F(x)\\=F(1+h)-F(1)\end{gathered}`,
    },
    {
      change: "令 h→0 并利用 1 处的连续性",
      text: "已知 F 在 x=1 连续，说明 h→0 时右边趋于 0。请据此推出任意 x 处都有 lim_{h→0}F(x+h)=F(x)，完成处处连续的证明并对照参考解答。",
      formula: math`\begin{gathered}
        \lim_{h\to 0}\bigl(F(x+h)-F(x)\bigr)\\[4pt]
        =\lim_{h\to 0}\bigl(F(1+h)-F(1)\bigr)=0
      \end{gathered}`,
    },
  ],

  "jc935-1-9-1": [
    {
      change: "先划掉分母零点确定连续区间",
      text: "原函数是有理函数，在分母不为零的每个开区间上都连续。分母 (x+5)(x−3)=0 的根是 −5 和 3，因此定义域和连续区间分成三段（注意：约分后 −5 仍不在原定义域内）。",
      formula: math`(-\infty,-5),\quad (-5,3),\quad (3,+\infty)`,
    },
    {
      change: "在 x≠−5,3 时约掉公因式 x+5",
      text: "求极限时只需看去心邻域，因此当 x≠−5 且 x≠3 时，可以约掉分子分母共同的因子 x+5。",
      formula: math`f(x)=\frac{x^2-4}{x-3}\quad(x\ne -5,\,3)`,
    },
    {
      change: "代入计算 x=0 与 x→−5 的极限",
      text: "化简后的分式在 0 和 −5 处分母都不为零，可直接代入计算极限（x=0 本身在连续区间内，极限就是 f(0)）。",
      formula: math`\begin{gathered}
        \lim_{x\to 0}f(x)=\frac{0^2-4}{0-3}=\;?\\[4pt]
        \lim_{x\to -5}f(x)=\frac{(-5)^2-4}{-5-3}=\;?
      \end{gathered}`,
    },
    {
      change: "按左右侧符号判断 x→3 的趋势",
      text: "当 x→3 时，分子 x²−4→5>0，而分母 x−3 在 3 左侧为负、右侧为正。请算出上一步的两个分数，并分别写出 x→3⁻ 与 x→3⁺ 的单侧极限及双侧极限结论，再对照参考解答。",
      formula: math`\begin{gathered}
        x\to 3^-:\ \frac{\to 5}{\to 0^-}\\[4pt]
        x\to 3^+:\ \frac{\to 5}{\to 0^+}
      \end{gathered}`,
    },
  ],

  "jc935-1-9-2": [
    {
      change: "用平均值与半差距改写 M 和 m",
      text: "任意两个数的较大值等于它们的平均值加上差距的一半，较小值等于平均值减去差距的一半。先把 M 和 m 写成不含 max/min 的代数式。",
      formula: math`\begin{gathered}
        M=\frac{f+g+|f-g|}{2}\\[4pt]
        m=\frac{f+g-|f-g|}{2}
      \end{gathered}`,
    },
    {
      change: "分两种大小关系逐点验证等式",
      text: "对任意点 x，若 f(x)≥g(x)，则 |f(x)−g(x)|=f(x)−g(x)，代入得 M(x)=f(x)、m(x)=g(x)；若 f(x)<g(x)，则 |f(x)−g(x)|=g(x)−f(x)，代入得 M(x)=g(x)、m(x)=f(x)。",
      formula: math`\begin{gathered}
        f\ge g:\ \frac{f+g+(f-g)}{2}=f\\[4pt]
        f<g:\ \frac{f+g+(g-f)}{2}=g
      \end{gathered}`,
    },
    {
      change: "由连续函数的四则与复合运算收尾",
      text: "已知 f、g 在 x=2 连续，所以 f+g、f−g 在 x=2 连续；又因为绝对值函数连续，复合后的 |f−g| 也在 x=2 连续。请据此说明 M、m 在 x=2 连续，再对照参考解答。",
      formula: math`\begin{gathered}
        f+g,\ |f-g|\ \text{在 }x=2\text{ 连续}\\[4pt]
        \Longrightarrow M,\ m\ \text{在 }x=2\text{ 连续}
      \end{gathered}`,
    },
  ],

  "jc935-1-9-3-1": [
    {
      change: "先求根号内多项式的极限",
      text: "外层是平方根函数，内层是多项式 x²−4x+7。多项式处处连续，先把 x=1 代入根号内部算出内层极限。",
      formula: math`\begin{gathered}\lim_{x\to 1}(x^2-4x+7)\\=1^2-4\cdot 1+7=4\end{gathered}`,
    },
    {
      change: "确认根号内正数与外层连续性",
      text: "内层极限 4>0，说明在 x=1 的某个邻域内 x²−4x+7 恒为正，并且平方根函数 √u 在 u=4 处连续，可以把极限符号移入根号内。",
      formula: math`\begin{gathered}
        \lim_{x\to 1}\sqrt{x^2-4x+7}\\[4pt]
        =\sqrt{\lim_{x\to 1}(x^2-4x+7)}
      \end{gathered}`,
    },
    {
      change: "代入内层极限算出结果",
      text: "把内层极限 4 放进根号里，算出算术平方根并写清复合连续性理由，再对照参考解答。",
      formula: math`\sqrt{4}=\;?`,
    },
  ],

  "jc935-1-9-3-2": [
    {
      change: "先算最内层角度 3t 的极限",
      text: "这是一个三层复合函数：t → 3t → sin(3t) → [sin(3t)]⁵。从最里层开始，当 t→π/6 时先算线性函数 3t 的极限。",
      formula: math`\lim_{t\to \pi/6}(3t)=3\cdot\frac{\pi}{6}=\frac{\pi}{2}`,
    },
    {
      change: "由正弦连续性求 sin(3t) 的极限",
      text: "正弦函数在 π/2 处连续，因此可以把极限放进 sin 里面，算出中间层的极限值。",
      formula: math`\lim_{t\to \pi/6}\sin(3t)=\sin\frac{\pi}{2}=1`,
    },
    {
      change: "由五次幂连续性完成最后一步",
      text: "幂函数 v⁵ 在 v=1 处连续，把极限符号移入五次幂内部。请算出最终数值并写明每层用到的连续性，再对照参考解答。",
      formula: math`\bigl(\sin\tfrac{\pi}{2}\bigr)^5=1^5=\;?`,
    },
  ],

  "jc935-1-9-3-3": [
    {
      change: "先求对数内部的极限",
      text: "内层是 4cos(2x)。当 x→π/6 时，2x→π/3，利用余弦函数的连续性先算出内层 4cos(2x) 趋向的数值。",
      formula: math`\begin{gathered}
        \lim_{x\to \pi/6}(2x)=\frac{\pi}{3}\\[4pt]
        \lim_{x\to \pi/6}4\cos(2x)=4\cos\frac{\pi}{3}=4\cdot\frac{1}{2}
      \end{gathered}`,
    },
    {
      change: "确认对数入口为正且连续",
      text: "内层极限等于 2>0，因此在 π/6 的某个邻域内 4cos(2x)>0，满足实对数定义域要求；同时 ln u 在 u=2 处连续，可以把极限放进对数内。",
      formula: math`\begin{gathered}
        \lim_{x\to \pi/6}\ln\bigl(4\cos(2x)\bigr)\\[4pt]
        =\ln\Bigl(\lim_{x\to \pi/6}4\cos(2x)\Bigr)
      \end{gathered}`,
    },
    {
      change: "代入内层结果得到对数值",
      text: "把内层极限代进 ln 中，化简后写出最终极限并附上定义域与连续性理由，再对照参考解答。",
      formula: math`\ln\!\left(4\cdot\frac{1}{2}\right)=\;?`,
    },
  ],

  "jc935-1-9-3-4": [
    {
      change: "分子分母同乘共轭根式",
      text: "直接代入 x=0 得到 0/0 型未定式。为了消去分子的平方根，分子分母同时乘上共轭式 √(1+6x)+1（在 0 附近它大于 0，不为零）。",
      formula: math`\begin{gathered}
        \lim_{x\to 0}\frac{\sqrt{1+6x}-1}{x}\\[4pt]
        \cdot\frac{\sqrt{1+6x}+1}{\sqrt{1+6x}+1}
      \end{gathered}`,
    },
    {
      change: "分子用平方差化简",
      text: "把分子按 (a−b)(a+b)=a²−b² 展开，得到 (1+6x)−1=6x，分母暂时保持不动。",
      formula: math`\lim_{x\to 0}\frac{6x}{x(\sqrt{1+6x}+1)}`,
    },
    {
      change: "在 x≠0 时约去公因式 x",
      text: "求极限时 x 靠近 0 但不等于 0，可以合法约掉分子和分母里的 x。",
      formula: math`\lim_{x\to 0}\frac{6}{\sqrt{1+6x}+1}`,
    },
    {
      change: "利用连续性代入 x=0",
      text: "约分后分母在 x=0 处连续且不为零，直接把 x=0 代入即可。请算出最终数值并写清理由，再对照参考解答。",
      formula: math`\frac{6}{\sqrt{1+0}+1}=\;?`,
    },
  ],

  "jc935-1-9-3-5": [
    {
      change: "分子分母同乘两根号之和",
      text: "代入 x=1 得 0/0 型。分子是两个平方根之差，分子分母同乘共轭式 √(7x−6)+√x（在 1 附近为正）。",
      formula: math`\begin{gathered}
        \lim_{x\to 1}\frac{\sqrt{7x-6}-\sqrt{x}}{x-1}\\[4pt]
        \cdot\frac{\sqrt{7x-6}+\sqrt{x}}{\sqrt{7x-6}+\sqrt{x}}
      \end{gathered}`,
    },
    {
      change: "展开分子并提取公因数 6",
      text: "分子用平方差化为 (7x−6)−x = 6x−6，再把公因数 6 提出来，显出与分母相同的因子 x−1。",
      formula: math`\lim_{x\to 1}\frac{6(x-1)}{(x-1)(\sqrt{7x-6}+\sqrt{x})}`,
    },
    {
      change: "在 x≠1 时约去公因式 x−1",
      text: "在 x=1 的去心邻域内 x−1≠0，合法约掉 x−1，消除了 0/0 未定式。",
      formula: math`\lim_{x\to 1}\frac{6}{\sqrt{7x-6}+\sqrt{x}}`,
    },
    {
      change: "利用连续性代入 x=1",
      text: "此时分母在 x=1 处连续且等于 √1+√1≠0，可直接代入计算。请算出结果并对照参考解答。",
      formula: math`\frac{6}{\sqrt{7\cdot 1-6}+\sqrt{1}}=\;?`,
    },
  ],

  "jc935-1-9-3-6": [
    {
      change: "对分子用正弦差的和差化积",
      text: "代入 x=a 得 0/0 型。用恒等式 sin α − sin β = 2 cos((α+β)/2) sin((α−β)/2)，令 α=2x、β=2a，和角一半是 x+a，差角一半是 x−a。",
      formula: math`\begin{gathered}\sin(2x)-\sin(2a)\\=2\cos(x+a)\sin(x-a)\\\lim_{x\to a}\frac{2\cos(x+a)\sin(x-a)}{x-a}\end{gathered}`,
    },
    {
      change: "把分式拆成稳定因子与基本极限",
      text: "把 sin(x−a) 与分母 x−a 配成一组，前面留下 2cos(x+a)。",
      formula: math`\lim_{x\to a}\left(2\cos(x+a)\cdot\frac{\sin(x-a)}{x-a}\right)`,
    },
    {
      change: "分别求两因子的极限再相乘",
      text: "令 u=x−a→0，由基本极限 sin u / u → 1；同时由余弦连续性 cos(x+a)→cos(2a)。请把两个极限相乘写出最终表达式，再对照参考解答。",
      formula: math`2\cos(a+a)\cdot 1=\;?`,
    },
  ],

  "jc935-1-9-3-7": [
    {
      change: "乘以共轭根式把差变成分式",
      text: "x→+∞ 时两根号都趋于 +∞，属于 ∞−∞ 型未定式。给原式乘上 (√(x²+3x)+√(x²−x)) 并除以它本身。",
      formula: math`\begin{gathered}
        \lim_{x\to +\infty}\bigl(\sqrt{x^2+3x}-\sqrt{x^2-x}\bigr)\\[4pt]
        \cdot\frac{\sqrt{x^2+3x}+\sqrt{x^2-x}}{\sqrt{x^2+3x}+\sqrt{x^2-x}}
      \end{gathered}`,
    },
    {
      change: "分子用平方差合并同类项",
      text: "分子化为 (x²+3x)−(x²−x)=4x，高次项 x² 互相抵消了。",
      formula: math`\lim_{x\to +\infty}\frac{4x}{\sqrt{x^2+3x}+\sqrt{x^2-x}}`,
    },
    {
      change: "利用 x>0 从分母根号中提出 x 并约分",
      text: "因为 x→+∞，可以只看 x>0，此时 √(x²)=|x|=x。从分母每个根号里提出 x，再与分子的 x 约掉。",
      formula: math`\lim_{x\to +\infty}\frac{4}{\sqrt{1+\tfrac{3}{x}}+\sqrt{1-\tfrac{1}{x}}}`,
    },
    {
      change: "令 1/x→0 并由根式连续性求值",
      text: "当 x→+∞ 时，3/x→0、1/x→0，分母根号内部都趋向正数 1。请算出最终数值并写清 x>0 的理由，再对照参考解答。",
      formula: math`\frac{4}{\sqrt{1+0}+\sqrt{1-0}}=\;?`,
    },
  ],

  "jc935-1-9-3-8": [
    {
      change: "确认 0/0 型与乘除结构",
      text: "x→0 时分子 (1−3x²)^(2/3)−1→0，分母 x ln(1+2x)→0，且分子是整体、分母是两因子乘积，可以合法做等价无穷小代换。",
      formula: math`\begin{gathered}
        (1+u)^\alpha-1\sim \alpha u\quad(u\to 0)\\[4pt]
        \ln(1+v)\sim v\quad(v\to 0)
      \end{gathered}`,
    },
    {
      change: "分别写出分子和分母的等价无穷小",
      text: "分子中取 u=−3x²、α=2/3，得 (1−3x²)^(2/3)−1 ~ (2/3)(−3x²)=−2x²；分母中 ln(1+2x) ~ 2x，别漏掉外面的因子 x。",
      formula: math`\begin{gathered}(1-3x^2)^{2/3}-1\sim \frac{2}{3}(-3x^2)\\=-2x^2\\x\ln(1+2x)\sim x\cdot 2x=2x^2\end{gathered}`,
    },
    {
      change: "代入主项并约去 x²",
      text: "在去心邻域内 x²≠0，把等价无穷小代入原分式并约掉 x²。请算出最终常数比值，再对照参考解答。",
      formula: math`\lim_{x\to 0}\frac{-2x^2}{2x^2}=\frac{-2}{2}=\;?`,
    },
  ],

  "jc935-1-9-4-1": [
    {
      change: "先判断指数 3/x 在两端的趋势",
      text: "记号 |x|→∞ 表示 x→+∞ 和 x→−∞ 两个方向都要考察。无论 x 趋向正无穷还是负无穷，3/x 都趋向同一个数 0。",
      formula: math`\lim_{|x|\to\infty}\frac{3}{x}=0`,
    },
    {
      change: "利用指数函数在 0 处的连续性",
      text: "外层函数 eᵘ 在 u=0 处连续，因此可以把极限符号直接放进指数里（注意指数趋于 0 不代表整个指数函数趋于 0）。",
      formula: math`\lim_{|x|\to\infty}e^{3/x}=e^{\lim_{|x|\to\infty}(3/x)}`,
    },
    {
      change: "代入指数极限算出结果",
      text: "把 0 代入 eᵘ 中算出最终数值，并写明两端趋势一致和连续性理由，再对照参考解答。",
      formula: math`e^0=\;?`,
    },
  ],

  "jc935-1-9-4-2": [
    {
      change: "先用基本极限求对数内部极限",
      text: "令 u=3x，当 x→0 时 u→0，由正弦基本极限 sin u / u → 1，得到对数里面的分式趋近 1。",
      formula: math`\lim_{x\to 0}\frac{\sin(3x)}{3x}=1`,
    },
    {
      change: "确认内层为正且不能拆开对数",
      text: "因为内层极限 1>0，在 x=0 的去心邻域内 sin(3x)/(3x)>0，可以直接取对数；不要拆成 ln sin(3x)−ln(3x)，否则 x<0 时两项都没有实对数。",
      formula: math`\begin{gathered}
        \lim_{x\to 0}\ln\!\left(\frac{\sin(3x)}{3x}\right)\\[4pt]
        =\ln\!\left(\lim_{x\to 0}\frac{\sin(3x)}{3x}\right)
      \end{gathered}`,
    },
    {
      change: "由对数在 1 处连续算出结果",
      text: "自然对数 ln v 在 v=1 处连续，代入内层极限 1。请写出最终数值并对照参考解答。",
      formula: math`\ln 1=\;?`,
    },
  ],

  "jc935-1-9-4-3": [
    {
      change: "令 u=2/x 把底数化为 1+u",
      text: "x→+∞ 时底数 1+2/x→1、指数 3x/4→+∞，是 1^∞ 型。令 u=2/x，则 u→0⁺，且 x=2/u。",
      formula: math`u=\frac{2}{x}\to 0^+,\quad x=\frac{2}{u}`,
    },
    {
      change: "把原指数改写成 1/u 的倍数",
      text: "把 x=2/u 代入原指数 3x/4，整理成 (1/u) 乘上一个常数，凑出标准极限 (1+u)^(1/u)。",
      formula: math`\frac{3x}{4}=\frac{3}{4}\cdot\frac{2}{u}=\frac{1}{u}\cdot\frac{3}{2}`,
    },
    {
      change: "写成外层幂复合标准极限的形式",
      text: "因为 u>0 时底数 1+u>0，可以把指数拆成两层幂。",
      formula: math`\lim_{u\to 0^+}\Bigl[(1+u)^{1/u}\Bigr]^{3/2}`,
    },
    {
      change: "利用标准极限与幂函数连续性收尾",
      text: "中括号内 (1+u)^(1/u)→e，外层幂函数 v^(3/2) 在 v=e 处连续。请代入得出最终结果，再对照参考解答。",
      formula: math`\Bigl[\lim_{u\to 0^+}(1+u)^{1/u}\Bigr]^{3/2}=e^{\;?}`,
    },
  ],

  "jc935-1-9-4-4": [
    {
      change: "令 u=2tan²x 化底数为 1+u",
      text: "当 x→0（x≠0）时，2tan²x→0⁺，3cot²x→+∞，是 1^∞ 型。令 u=2tan²x，则 u→0⁺ 且 tan²x=u/2。",
      formula: math`u=2\tan^2 x\to 0^+,\quad \tan^2 x=\frac{u}{2}`,
    },
    {
      change: "用 cot²x=1/tan²x 改写指数",
      text: "把 tan²x=u/2 代入 3cot²x=3/tan²x，算出指数是 1/u 的多少倍（别漏掉 2 与 3 相乘）。",
      formula: math`3\cot^2 x=\frac{3}{\tan^2 x}=\frac{3}{u/2}=\frac{6}{u}`,
    },
    {
      change: "凑出标准极限 (1+u)^(1/u)",
      text: "把 6/u 拆成 (1/u)·6，写成标准极限的六次方形式。",
      formula: math`\lim_{u\to 0^+}\Bigl[(1+u)^{1/u}\Bigr]^6`,
    },
    {
      change: "由标准极限与六次幂连续性得出结果",
      text: "内层 (1+u)^(1/u)→e，外层 v⁶ 在 v=e 处连续。请写出最终结果并对照参考解答。",
      formula: math`\Bigl[\lim_{u\to 0^+}(1+u)^{1/u}\Bigr]^6=e^{\;?}`,
    },
  ],

  "jc935-1-9-4-5": [
    {
      change: "把分式底数拆成 1+u",
      text: "x→+∞ 时底数 (x+4)/(x+7)→1、指数 2x+1→+∞，是 1^∞ 型。先把分子凑成 (x+7)−3，读出底数比 1 少的部分 u。",
      formula: math`\begin{gathered}
        \frac{x+4}{x+7}=1-\frac{3}{x+7}\\[4pt]
        u=-\frac{3}{x+7}\to 0
      \end{gathered}`,
    },
    {
      change: "凑出 [(1+u)^(1/u)] 的形式",
      text: "对足够大的 x，底数 1+u>0，把指数写成 (1/u)·u(2x+1)，拆出标准极限部分。",
      formula: math`\Bigl[(1+u)^{1/u}\Bigr]^{u(2x+1)}`,
    },
    {
      change: "单独求外层指数 u(2x+1) 的极限",
      text: "把 u=−3/(x+7) 代入 u(2x+1)，分子分母同除以 x 求出指数极限（注意保留负号）。",
      formula: math`\begin{gathered}
        u(2x+1)=\frac{-3(2x+1)}{x+7}\\[4pt]
        =\frac{-6-\tfrac{3}{x}}{1+\tfrac{7}{x}}\to -6
      \end{gathered}`,
    },
    {
      change: "结合底数极限 e 与指数极限收尾",
      text: "内层 (1+u)^(1/u)→e，外层指数趋于 −6，利用指数与对数复合函数的连续性即可写出结果。请整理最终答案并对照参考解答。",
      formula: math`e^{\lim_{x\to+\infty}u(2x+1)}=e^{\;?}`,
    },
  ],

  "jc935-1-9-4-6": [
    {
      change: "先有理化分子 A",
      text: "x→0 时 A→0、B→0。不要把 tan x 和 sin x 直接换成 x 相减，那会丢掉主项。先把 A 分子分母同乘共轭根式和，分母在 0 处趋于 2。",
      formula: math`\begin{gathered}
        A=\frac{\tan x-\sin x}{\sqrt{1+\tan x}+\sqrt{1+\sin x}}\\[4pt]
        \sqrt{1+\tan x}+\sqrt{1+\sin x}\to 2
      \end{gathered}`,
    },
    {
      change: "提取 sin x 找出 A 的主项",
      text: "把 tan x−sin x 写成 sin x (1−cos x)/cos x，再用 sin x ~ x、1−cos x ~ x²/2、cos x→1，算出 A 的等价无穷小。",
      formula: math`\begin{gathered}\tan x-\sin x\\=\frac{\sin x(1-\cos x)}{\cos x}\sim \frac{x^3}{2}\\A\sim \frac{x^3/2}{2}=\frac{x^3}{4}\end{gathered}`,
    },
    {
      change: "再有理化分母 B 并求其主项",
      text: "同样给 B 里的根式差乘共轭，得到 4x sin²x / (√(1+4sin²x)+1)。分母趋于 2，分子用 sin²x ~ x²，求出 B 的主项。",
      formula: math`\begin{gathered}
        B=\frac{4x\sin^2 x}{\sqrt{1+4\sin^2 x}+1}\\[4pt]
        B\sim \frac{4x\cdot x^2}{2}=2x^3
      \end{gathered}`,
    },
    {
      change: "求主项之比并约去 x³",
      text: "A 和 B 都是三阶无穷小，在 x≠0 时约掉 x³ 就得到最终比值。请算出具体分数并对照参考解答。",
      formula: math`\lim_{x\to 0}\frac{A}{B}=\lim_{x\to 0}\frac{x^3/4}{2x^3}=\;?`,
    },
  ],

  "jc935-1-9-4-7": [
    {
      change: "把分子的对数差合并为商的对数",
      text: "x→3 时分子分母都趋于 0。利用对数性质 ln x − ln 3 = ln(x/3)，把对数内部变成趋近 1 的形式。",
      formula: math`\lim_{x\to 3}\frac{\ln(x/3)}{x-3}`,
    },
    {
      change: "令 u=(x−3)/3 凑出 ln(1+u)",
      text: "把 x/3 写成 1+(x−3)/3，于是令 u=(x−3)/3。当 x→3 时 u→0，同时注意分母 x−3=3u，不能漏掉系数 3。",
      formula: math`\begin{gathered}
        u=\frac{x-3}{3}\to 0\\[4pt]
        \frac{x}{3}=1+u,\quad x-3=3u
      \end{gathered}`,
    },
    {
      change: "提出常数 1/3 并用基本对数极限",
      text: "代入 u 后把常数 1/3 提到前面，剩下的 ln(1+u)/u 在 u→0 时趋于 1。请算出最终结果并对照参考解答。",
      formula: math`\lim_{u\to 0}\frac{1}{3}\cdot\frac{\ln(1+u)}{u}=\frac{1}{3}\cdot 1=\;?`,
    },
  ],

  "jc935-1-9-4-8": [
    {
      change: "把分子 A 分组因式分解",
      text: "x→0 时 A→0、B→0。把 e^(5x) 看成 e^(3x)·e^(2x)，把四项两两分组，拆成两个乘积因子，方便后续用等价无穷小。",
      formula: math`\begin{gathered}
        A=e^{3x}(e^{2x}-1)-(e^{2x}-1)\\[4pt]
        =(e^{3x}-1)(e^{2x}-1)
      \end{gathered}`,
    },
    {
      change: "对分子的每个因子做等价代换",
      text: "在乘积中可以逐因子使用 eᵘ−1 ~ u（u→0）：e^(3x)−1 ~ 3x，e^(2x)−1 ~ 2x，因此分子 A 是二阶无穷小。",
      formula: math`A\sim (3x)(2x)=6x^2`,
    },
    {
      change: "对分母 B 用幂函数等价无穷小",
      text: "利用 (1+u)^α − 1 ~ αu，这里 u=−4x²、α=1/3（别丢掉负号），算出分母 B 的主项。",
      formula: math`\begin{gathered}
        B=(1-4x^2)^{1/3}-1\\[4pt]
        \sim \frac{1}{3}(-4x^2)=-\frac{4}{3}x^2
      \end{gathered}`,
    },
    {
      change: "约去 x² 计算常数比值",
      text: "分子分母同为 x² 阶，在 x≠0 时约去 x²。请算出最后的分数并对照参考解答。",
      formula: math`\lim_{x\to 0}\frac{6x^2}{-\tfrac{4}{3}x^2}=\frac{6}{-4/3}=\;?`,
    },
  ],

  "jc935-1-9-4-9": [
    {
      change: "令 u=2/x 把无穷远换成靠近 0",
      text: "x→+∞ 时 x→+∞ 而 e^(2/x)−1→0，属于 ∞·0 型。令 u=2/x，则 u→0⁺，且外面的因子 x=2/u。",
      formula: math`u=\frac{2}{x}\to 0^+,\quad x=\frac{2}{u}`,
    },
    {
      change: "代入 u 凑出标准指数极限",
      text: "把 x=2/u 和 2/x=u 代回原式，把常数 2 提到前面，剩下的正是标准极限 (eᵘ−1)/u。",
      formula: math`\lim_{u\to 0^+}2\cdot\frac{e^u-1}{u}`,
    },
    {
      change: "利用 (eᵘ−1)/u→1 算出极限",
      text: "当 u→0⁺ 时 (eᵘ−1)/u→1。请算出最终数值并写清换元理由，再对照参考解答。",
      formula: math`2\cdot 1=\;?`,
    },
  ],

  "jc935-1-9-4-10": [
    {
      change: "在 x≠2 时先约去前面分式的公因式",
      text: "在 x=2 的去心邻域内，把 x²−4 分解为 (x−2)(x+2) 并约去 x−2。前半部分趋近正数 4，真正决定左右差异的是后面的指数因子。",
      formula: math`\begin{gathered}
        \frac{x^2-4}{x-2}e^{1/(x-2)}=(x+2)e^{1/(x-2)}\\[4pt]
        (x\ne 2),\quad x+2\to 4
      \end{gathered}`,
    },
    {
      change: "求左侧极限 x→2⁻",
      text: "当 x 从小于 2 的一侧靠近 2 时，x−2→0⁻，所以 1/(x−2)→−∞，从而指数 e^(1/(x−2))→0，与趋于 4 的因子相乘得 0。",
      formula: math`\begin{gathered}
        x\to 2^-:\ \frac{1}{x-2}\to -\infty\\[4pt]
        \lim_{x\to 2^-}(x+2)e^{1/(x-2)}=4\cdot 0=0
      \end{gathered}`,
    },
    {
      change: "求右侧极限 x→2⁺",
      text: "当 x 从大于 2 的一侧靠近 2 时，x−2→0⁺，所以 1/(x−2)→+∞，指数 e^(1/(x−2))→+∞，乘上正数 4 仍趋于 +∞。",
      formula: math`\begin{gathered}
        x\to 2^+:\ \frac{1}{x-2}\to +\infty\\[4pt]
        \lim_{x\to 2^+}(x+2)e^{1/(x-2)}=+\infty
      \end{gathered}`,
    },
    {
      change: "对比两侧极限判断双侧极限是否存在",
      text: "左极限是 0，右极限是 +∞，两者不相等（且右极限不存在有限值）。请写出双侧极限是否存在的结论与两个单侧极限，再对照参考解答。",
      formula: math`\lim_{x\to 2^-}f(x)=0\ne +\infty=\lim_{x\to 2^+}f(x)`,
    },
  ],

  "jc935-1-9-5-1": [
    {
      change: "先确认外层 φ 确有间断点",
      text: "先核对题设条件：在 t=0 处，φ 的左极限为 −1，右极限为 4，两侧不等，所以 φ 在 t=0 确有跳跃间断点。",
      formula: math`\lim_{t\to 0^-}\phi(t)=-1\ne 4=\lim_{t\to 0^+}\phi(t)`,
    },
    {
      change: "求内层 f(x)=e^(2x) 的值域",
      text: "对任意实数 x，指数函数 e^(2x) 恒严格大于 0，也就是说内层的输出永远不会触及 t=0 或负半轴。",
      formula: math`\forall x\in\mathbb R:\quad f(x)=e^{2x}>0`,
    },
    {
      change: "把值域代回 φ 写出复合函数",
      text: "因为 t=f(x)>0 永远落在 φ 的第二段 t≥0 内，复合函数 φ(f(x)) 对所有实数 x 恒等于常数值 4。请据此判断原命题是否成立，再对照参考解答。",
      formula: math`\phi\bigl(f(x)\bigr)=\phi(e^{2x})=4\quad(\forall x\in\mathbb R)`,
    },
  ],

  "jc935-1-9-5-2": [
    {
      change: "说明 φ 在任意点都间断",
      text: "对任意实数 a，它的任何邻域里既有有理数也有无理数。沿有理数列趋近 a 时 φ 输出 3，沿无理数列趋近 a 时 φ 输出 −3，因此 φ 在任一点都没有极限，处处间断。",
      formula: math`\begin{gathered}
        r_n\in\mathbb Q,\ r_n\to a:\ \phi(r_n)=3\\[4pt]
        s_n\notin\mathbb Q,\ s_n\to a:\ \phi(s_n)=-3
      \end{gathered}`,
    },
    {
      change: "对两个分支分别取平方",
      text: "计算 φ(x)²：有理数分支得到 3²=9，无理数分支得到 (−3)²=9。平方把正负号的差别完全抹平了。",
      formula: math`\phi(x)^2=\begin{cases}
        3^2=9,&x\in\mathbb Q\\
        (-3)^2=9,&x\notin\mathbb Q
      \end{cases}=9`,
    },
    {
      change: "对比平方前后的连续性下结论",
      text: "φ 处处间断，而 φ² 恒等于常数 9、处处连续。请据此回答原命题是否正确并简述理由，再对照参考解答。",
      formula: math`\phi(x)^2\equiv 9\ \text{在 }\mathbb R\text{ 上处处连续}`,
    },
  ],

  "jc935-1-9-5-3": [
    {
      change: "先确认内层 φ 在 0 处间断",
      text: "在 x=0 处，φ 的左极限是 −2，右极限是 2，因此 φ 在 0 处有跳跃间断。",
      formula: math`\lim_{x\to 0^-}\phi(x)=-2\ne 2=\lim_{x\to 0^+}\phi(x)`,
    },
    {
      change: "分别把两支的值代入外层 f(t)=t²+1",
      text: "当 x<0 时 φ(x)=−2，代入 f 得 f(−2)=(−2)²+1；当 x≥0 时 φ(x)=2，代入 f 得 f(2)=2²+1。",
      formula: math`\begin{gathered}
        f(-2)=(-2)^2+1=5\\[4pt]
        f(2)=2^2+1=5
      \end{gathered}`,
    },
    {
      change: "写出复合结果并说明处处连续",
      text: "两支经过外层函数后合并成同一个常数 5，因此 f∘φ 是常函数、处处连续。请整理完整说明并对照参考解答。",
      formula: math`f\bigl(\phi(x)\bigr)=5\quad(\forall x\in\mathbb R)`,
    },
  ],

  "jc935-1-9-5-4": [
    {
      change: "先确认定义域并设反证假设",
      text: "因为 f 在实数轴上处处非零，商 g=φ/f 在整个实数轴上都有定义。采用反证法：假设 g 在实数轴上处处连续。",
      formula: math`\begin{gathered}f(x)\ne 0\Longrightarrow g(x)\\=\frac{\phi(x)}{f(x)}\ \text{在 }\mathbb R\text{ 有定义}\\\text{假设 }g\text{ 在 }\mathbb R\text{ 处处连续}\end{gathered}`,
    },
    {
      change: "把 φ 改写成 g 与 f 的乘积",
      text: "两边同时乘以 f(x)，就把原函数 φ 写成了两个函数的乘积。",
      formula: math`\phi(x)=g(x)\,f(x)`,
    },
    {
      change: "用连续函数乘积定理导出矛盾",
      text: "在反证假设下，g 和 f 都在实数轴上处处连续，由连续函数的乘积定理，它们的乘积 φ=gf 也必须处处连续——这与题设“φ 有间断点”矛盾。请据此写明反证结论，再对照参考解答。",
      formula: math`\begin{gathered}
        g,\ f\text{ 处处连续}\\[4pt]
        \Longrightarrow \phi=gf\text{ 处处连续（矛盾）}
      \end{gathered}`,
    },
  ],

  "jc935-1-9-6": [
    {
      change: "先说明两段内部各自连续",
      text: "在 x<3 上 e^(2(x−3)) 是基本初等函数的复合，在 x>3 上 a+(x−3)² 是多项式，它们在各自开区间上都连续。因此整个实数轴上的连续性只取决于接缝 x=3。",
      formula: math`\begin{gathered}
        (-\infty,3):\ e^{2(x-3)}\\[4pt]
        (3,+\infty):\ a+(x-3)^2
      \end{gathered}`,
    },
    {
      change: "计算 x=3 处的左极限",
      text: "当 x→3⁻ 时，2(x−3)→0，由指数函数连续性得到左极限。",
      formula: math`\lim_{x\to 3^-}f(x)=\lim_{x\to 3^-}e^{2(x-3)}=e^0=1`,
    },
    {
      change: "计算 x=3 处的右极限与点值",
      text: "因为 x=3 落在第二段 x≥3，右极限和点值 f(3) 都由 a+(x−3)² 代入 3 得到。",
      formula: math`\begin{gathered}\lim_{x\to 3^+}f(x)\\=f(3)=a+(3-3)^2=a\end{gathered}`,
    },
    {
      change: "令左右极限与点值相等解出 a",
      text: "函数在 x=3 连续当且仅当左极限、右极限和点值三者相等。请写出方程并得出所有满足条件的 a，再对照参考解答。",
      formula: math`\begin{gathered}
        \lim_{x\to 3^-}f(x)=\lim_{x\to 3^+}f(x)=f(3)\\[4pt]
        \Longrightarrow a=\;?
      \end{gathered}`,
    },
  ],

  "jc935-1-10-1": [
    {
      change: "构造差函数 g(x)=f(x)−x",
      text: "找不动点 f(c)=c，等价于找差函数 g(x)=f(x)−x 的零点。因为 f 和 x 都在 [2,5] 连续，所以 g 在 [2,5] 上连续。",
      formula: math`g(x)=f(x)-x,\quad x\in[2,5]`,
    },
    {
      change: "用值域 [2,5] 判断两端点符号",
      text: "题目给定 f 把 [2,5] 映回 [2,5]，所以对所有 x 都有 2≤f(x)≤5。特别地，在左端点 f(2)≥2，在右端点 f(5)≤5。",
      formula: math`\begin{gathered}
        g(2)=f(2)-2\ge 0\\[4pt]
        g(5)=f(5)-5\le 0
      \end{gathered}`,
    },
    {
      change: "先把端点恰好为零的情形单独处理",
      text: "注意端点不等式带等号，不能直接断言严格异号。如果 g(2)=0 或 g(5)=0，那 c=2 或 c=5 本身就是不动点。",
      formula: math`\begin{gathered}g(2)=0\ \text{或}\ g(5)\\=0\Longrightarrow \text{端点即不动点}\end{gathered}`,
    },
    {
      change: "其余情形用零点定理在开区间找根",
      text: "若两处都不为零，则必有 g(2)>0 且 g(5)<0，两端严格异号。请结合 g 在 [2,5] 连续套用零点定理完成证明，再对照参考解答。",
      formula: math`\begin{gathered}
        g(2)>0>g(5)\\[4pt]
        \Longrightarrow \exists c\in(2,5):\ g(c)=0
      \end{gathered}`,
    },
  ],

  "jc935-1-10-2": [
    {
      change: "把方程改写成 f(x)=0 并说明连续性",
      text: "移项构造 f(x)=x⁵−2x−4。它是多项式函数，因此在闭区间 [1,2] 上连续，满足使用零点定理的前提。",
      formula: math`f(x)=x^5-2x-4,\quad x\in[1,2]`,
    },
    {
      change: "计算两个端点的函数值",
      text: "把 x=1 和 x=2 分别代入 f(x)，算出两端点的具体数值并观察正负号。",
      formula: math`\begin{gathered}
        f(1)=1^5-2\cdot 1-4=-5\\[4pt]
        f(2)=2^5-2\cdot 2-4=24
      \end{gathered}`,
    },
    {
      change: "由两端严格异号套用零点定理",
      text: "f(1)<0<f(2)，两端函数值严格异号，且 f 在闭区间 [1,2] 连续。请据此写出零点定理的结论（注意根落在开区间 (1,2) 内），再对照参考解答。",
      formula: math`\begin{gathered}
        f(1)\cdot f(2)<0\\[4pt]
        \Longrightarrow \exists c\in(1,2):\ f(c)=0
      \end{gathered}`,
    },
  ],

  "jc935-1-10-3": [
    {
      change: "移项构造辅助函数 F(x)",
      text: "把右边移到左边，令 F(x)=x−a sin(2x)−b。它是初等函数，在闭区间 [0,a+b] 上处处连续（因 a,b>0，故 a+b>0）。",
      formula: math`\begin{gathered}F(x)=x-a\sin(2x)-b,\\x\in[0,a+b]\end{gathered}`,
    },
    {
      change: "计算左端点 x=0 的符号",
      text: "代入 x=0，由 sin 0=0 和已知 b>0，可知左端点严格为负。",
      formula: math`F(0)=0-a\sin 0-b=-b<0`,
    },
    {
      change: "用 sin≤1 估计右端点",
      text: "代入 x=a+b，化简出 a[1−sin(2(a+b))]。因为 sin(2(a+b))≤1 且 a>0，右端点一定非负。",
      formula: math`\begin{gathered}
        F(a+b)=a\bigl[1-\sin(2(a+b))\bigr]\\[4pt]
        \sin(2(a+b))\le 1\Longrightarrow F(a+b)\ge 0
      \end{gathered}`,
    },
    {
      change: "分 F(a+b)=0 与 >0 两种情形收尾",
      text: "若 F(a+b)=0，直接取 c=a+b>0；若 F(a+b)>0，则由零点定理存在 c∈(0,a+b) 使 F(c)=0。请合并两种情况写出完整结论（注意范围是 (0,a+b]），再对照参考解答。",
      formula: math`\begin{gathered}F(a+b)=0\Rightarrow c=a+b\\F(a+b)>0\\\Rightarrow \exists c\in(0,a+b):\ F(c)=0\end{gathered}`,
    },
  ],

  "jc935-1-10-4": [
    {
      change: "提出最高次项 x^(2m+1)",
      text: "因为最高项系数 b_{2m+1}≠0，在 x≠0 时把最高次幂 x^(2m+1) 提出来，观察远离原点时谁主导符号。",
      formula: math`\begin{gathered}
        P(x)=x^{2m+1}\cdot\\[4pt]
        \left(b_{2m+1}+\frac{b_{2m}}{x}+\cdots+\frac{b_0}{x^{2m+1}}\right)
      \end{gathered}`,
    },
    {
      change: "利用 |x|→∞ 确定括号的符号",
      text: "当 |x|→∞ 时，括号内所有含 1/xᵏ 的项都趋于 0，因此整个括号趋向非零常数 b_{2m+1}。按极限保号性，存在足够大的 R>0，使得括号在 x=R 和 x=−R 处都与 b_{2m+1} 同号。",
      formula: math`\lim_{|x|\to\infty}\frac{P(x)}{x^{2m+1}}=b_{2m+1}\ne 0`,
    },
    {
      change: "用奇次幂证两端异号",
      text: "2m+1 是奇数，所以 R^(2m+1)>0 而 (−R)^(2m+1)=−R^(2m+1)<0。乘上同号的括号后，P(R) 与 P(−R) 必然一正一负。",
      formula: math`P(R)\cdot P(-R)<0`,
    },
    {
      change: "在闭区间 [−R,R] 上套用零点定理",
      text: "多项式 P 在闭区间 [−R,R] 上连续，且两端点值异号。请套用零点定理完成存在实根的证明，再对照参考解答。",
      formula: math`\begin{gathered}
        P\ \text{在 }[-R,R]\text{ 连续}\\[4pt]
        \Longrightarrow \exists c\in(-R,R):\ P(c)=0
      \end{gathered}`,
    },
  ],

  "jc935-1-10-5": [
    {
      change: "算六个关键整数点的函数值",
      text: "三次多项式 P(x)=x³−7x+2 在整个实数轴上连续。先代入几个简单整数 −3、−2、0、1、2、3，寻找正负号交替的位置。",
      formula: math`\begin{gathered}
        P(-3)=-4,\quad P(-2)=8\\[4pt]
        P(0)=2,\quad P(1)=-4\\[4pt]
        P(2)=-4,\quad P(3)=8
      \end{gathered}`,
    },
    {
      change: "在三个互不相交区间分别用零点定理",
      text: "观察符号变化：(−3,−2)、(0,1)、(2,3) 这三个开区间互不重叠，而且每个区间的两端函数值都严格异号，因此每段内至少有一个实根。",
      formula: math`\begin{gathered}
        P(-3)P(-2)<0,\quad P(0)P(1)<0\\[4pt]
        P(2)P(3)<0
      \end{gathered}`,
    },
    {
      change: "结合多项式次数上限得出“恰有三根”",
      text: "三个互不相交区间保证了至少有 3 个互不相同的实根；另一方面，非零三次多项式至多只有 3 个实根。请把“至少 3 个”与“至多 3 个”合在一起写出最终结论，再对照参考解答。",
      formula: math`3\le\text{实根个数}\le 3`,
    },
  ],

  "jc935-1-10-6": [
    {
      change: "记三个样本值的最小值与最大值",
      text: "不需要知道 f 在整段区间上的最值，只需比较三个样本点处的函数值。令 m₀ 为三者中的最小值，M₀ 为三者中的最大值。",
      formula: math`\begin{gathered}
        m_0=\min\{f(x_1),f(x_2),f(x_3)\}\\[4pt]
        M_0=\max\{f(x_1),f(x_2),f(x_3)\}
      \end{gathered}`,
    },
    {
      change: "先处理三值全相等的特殊情况",
      text: "如果 m₀=M₀，说明三个样本值完全相同，此时加权平均 M 就等于 f(x₂)。而 x₂ 严格落在 (x₁,x₃) 内部，直接取 c=x₂ 即可。",
      formula: math`\begin{gathered}m_0=M_0\Longrightarrow f(x_2)\\=M,\ x_2\in(x_1,x_3)\end{gathered}`,
    },
    {
      change: "不全等时证 m₀<M<M₀",
      text: "若 m₀<M₀，因为三个权重 1/4、2/4、1/4 全为正且和为 1，把三项分别放缩成 m₀ 或 M₀ 时，至少有一项是严格不等号，因此 M 严格介于 m₀ 与 M₀ 之间。",
      formula: math`\begin{gathered}
        M=\frac{1}{4}f(x_1)+\frac{2}{4}f(x_2)+\frac{1}{4}f(x_3)\\[4pt]
        m_0<M<M_0
      \end{gathered}`,
    },
    {
      change: "在取到 m₀、M₀ 的两个样本点间用介值定理",
      text: "设 u、v∈{x₁,x₂,x₃} 分别使 f(u)=m₀、f(v)=M₀。f 在以 u、v 为端点的闭区间上连续且 M 严格介于 f(u) 与 f(v) 之间，由介值定理可得严格位于 u、v 之间的 c（自然在 (x₁,x₃) 内）。请整理完整证明并对照参考解答。",
      formula: math`\begin{gathered}
        \exists c\ \text{严格介于 }u,v\text{ 之间}\\[4pt]
        c\in(x_1,x_3),\quad f(c)=M
      \end{gathered}`,
    },
  ],

  "jc935-1-10-7": [
    {
      change: "固定任意点 a 写出连续性所需的放缩",
      text: "先证 f 在 [1,4] 上连续。任取 a∈[1,4]，在题给不等式 |f(x)−f(y)|≤3|x−y| 中令 y=a，得到输出差由输入差直接控制。",
      formula: math`\begin{gathered}|f(x)-f(a)|\le 3|x-a|\\(\forall x\in[1,4])\end{gathered}`,
    },
    {
      change: "选 δ=ε/3 证明 [1,4] 上连续",
      text: "任给 ε>0，取 δ=ε/3。只要 x∈[1,4] 且 |x−a|<δ，就有 |f(x)−f(a)|≤3|x−a|<ε（端点 1、4 自动按区间内部一侧理解），这就证明了 f 在闭区间 [1,4] 连续。",
      formula: math`\begin{gathered}
        \delta=\frac{\varepsilon}{3},\quad |x-a|<\delta\\[4pt]
        \Longrightarrow |f(x)-f(a)|<3\cdot\frac{\varepsilon}{3}=\varepsilon
      \end{gathered}`,
    },
    {
      change: "结合端点异号套用零点定理",
      text: "现在已经同时具备“f 在 [1,4] 上连续”和“f(1)<0<f(4)”两个条件。请套用零点定理写出存在 c∈(1,4) 使 f(c)=0 的结论，再对照参考解答。",
      formula: math`\begin{gathered}
        f\ \text{在 }[1,4]\text{ 连续},\quad f(1)<0<f(4)\\[4pt]
        \Longrightarrow \exists c\in(1,4):\ f(c)=0
      \end{gathered}`,
    },
  ],

  "jc935-1-10-8": [
    {
      change: "用极限定义分别控制左右两条尾巴",
      text: "对左右两个极限都取 ε=1：存在 R₁>0 使 x<−R₁ 时 |f(x)+2|<1（从而 |f(x)|<3）；存在 R₂>0 使 x>R₂ 时 |f(x)−3|<1（从而 |f(x)|<4）。",
      formula: math`\begin{gathered}
        x<-R_1\Longrightarrow |f(x)|<2+1=3\\[4pt]
        x>R_2\Longrightarrow |f(x)|<3+1=4
      \end{gathered}`,
    },
    {
      change: "合并半径把尾巴归到 [−R,R] 之外",
      text: "取 R=max(R₁,R₂)，则只要 |x|>R，不管在左尾还是右尾，都统一满足 |f(x)|≤4。",
      formula: math`\begin{gathered}
        R=\max(R_1,R_2)\\[4pt]
        |x|>R\Longrightarrow |f(x)|\le 4
      \end{gathered}`,
    },
    {
      change: "用闭区间有界定理控制中间段 [−R,R]",
      text: "实数轴本身不是闭区间，但中间段 [−R,R] 是有界闭区间。因为 f 在 [−R,R] 上连续，由闭区间有界性定理，存在常数 M>0 使该段上 |f(x)|≤M。",
      formula: math`x\in[-R,R]\Longrightarrow |f(x)|\le M`,
    },
    {
      change: "取两者的较大值得到全轴统一上界",
      text: "把中间段上界 M 和两端尾巴上界 4 取较大值，就能覆盖所有实数 x。请写出最终的统一不等式并对照参考解答。",
      formula: math`\forall x\in\mathbb R:\quad |f(x)|\le \max(M,4)`,
    },
  ],

  "jc935-1-10-9": [
    {
      change: "先证充分性：补齐端点成闭区间连续函数",
      text: "若 L₁=lim_{x→2⁺}f(x) 与 L₂=lim_{x→5⁻}f(x) 都存在且有限，把 f 延拓到闭区间 [2,5]：令 F(2)=L₁、F(5)=L₂，内部保持 F(x)=f(x)。则 F 在闭区间 [2,5] 连续，由康托定理 F 在 [2,5] 一致连续，因而在子区间 (2,5) 也一致连续。",
      formula: math`F(x)=\begin{cases}
        L_1,&x=2\\
        f(x),&2<x<5\\
        L_2,&x=5
      \end{cases}`,
    },
    {
      change: "再证必要性：一致连续保持柯西数列",
      text: "反过来设 f 在 (2,5) 一致连续，任取趋于 2⁺ 的数列 {xₙ}⊂(2,5)。收敛数列必是柯西数列；由一致连续性，当 |xₙ−xₘ|<δ 时 |f(xₙ)−f(xₘ)|<ε，因此像数列 {f(xₙ)} 也是柯西数列，必有有限极限。",
      formula: math`\begin{gathered}
        x_n\to 2^+\Longrightarrow \{f(x_n)\}\ \text{是柯西数列}\\[4pt]
        \Longrightarrow \lim_{n\to\infty}f(x_n)\text{ 存在}
      \end{gathered}`,
    },
    {
      change: "把两条数列交错说明极限与选法无关",
      text: "要得到函数极限，还须确认不同数列给出同一极限。任取 xₙ→2⁺ 和 yₙ→2⁺，把它们交错排成 z=(x₁,y₁,x₂,y₂,…)，则 zₖ→2⁺，由上一步 {f(zₖ)} 收敛，故它的奇偶子列 {f(xₙ)} 与 {f(yₙ)} 必有相同极限。",
      formula: math`\begin{gathered}
        z=(x_1,y_1,x_2,y_2,\dots)\to 2^+\\[4pt]
        \Longrightarrow \lim_{n\to\infty}f(x_n)=\lim_{n\to\infty}f(y_n)
      \end{gathered}`,
    },
    {
      change: "由海涅定理收尾并对称处理右端点",
      text: "任意趋于 2⁺ 的数列其像都趋向同一个有限数，由海涅归结原则即得 lim_{x→2⁺}f(x) 存在且有限；对右端点 5⁻ 完全同理。请整理充分性与必要性的完整表述，再对照参考解答。",
      formula: math`\begin{gathered}
        \lim_{x\to 2^+}f(x)\ \text{存在且有限}\\[4pt]
        \lim_{x\to 5^-}f(x)\ \text{存在且有限}
      \end{gathered}`,
    },
  ],
};

import type { GuidedHint } from "../learning";

const math = String.raw;

export const ch1Sec6to7GuidedHints: Record<string, GuidedHint[]> = {
  "jc935-1-6-1-1": [
    {
      change: "令 t=x−2，把趋近点移到 0",
      text: "当 x→2 时，括号里的 x−2 趋近于 0。设新变量 t=x−2，当 x→2 时 t→0，把极限改写成关于 t 的标准形式。",
      formula: math`\begin{gathered}
        t=x-2\to 0\\[4pt]
        \lim_{t\to 0}\frac{\sin(at)}{t}
      \end{gathered}`,
    },
    {
      change: "先单独讨论 a=0 的情形",
      text: "后面要给分母乘上 a 来凑出 at，但 a=0 时不能除以 a，所以必须先分开看：若 a=0，分子 sin(0) 恒为 0，在 t≠0 时商恒为 0。",
      formula: math`\begin{gathered}
        a=0,\;t\ne 0:\\[4pt]
        \frac{\sin(0\cdot t)}{t}=0\\[4pt]
        \implies\text{极限为 }0
      \end{gathered}`,
    },
    {
      change: "a≠0 时分子分母同乘 a",
      text: "当 a≠0 且 t≠0 时，给分母配出和正弦里一样的 at，同时在外面乘一个常数 a 保持原式不变。",
      formula: math`\begin{gathered}
        a\ne 0:\\[4pt]
        \lim_{t\to 0}\left(a\cdot\frac{\sin(at)}{at}\right)
      \end{gathered}`,
    },
    {
      change: "套用第一重要极限并合并两种情形",
      text: "把常数 a 提到极限外面，令 u=at→0，由第一重要极限得 sin u / u → 1。请算出 a≠0 时的结果，再对比 a=0 时的 0，写出对任意实数 a 都统一的结论并对照参考解答。",
      formula: math`\begin{gathered}
        u=at\to 0\\[4pt]
        a\cdot\lim_{u\to 0}\frac{\sin u}{u}\\[4pt]
        =a\times 1=\;?
      \end{gathered}`,
    },
  ],

  "jc935-1-6-1-2": [
    {
      change: "把 tan(5x) 拆成正弦比余弦",
      text: "x→0 时这是 0/0 型未定式。第一重要极限是关于 sin 的，所以先把 tan(5x) 改写成 sin(5x)/cos(5x)，分母 2x 先不动。",
      formula: math`\lim_{x\to 0}\frac{\sin(5x)}{2x\cos(5x)}`,
    },
    {
      change: "给正弦配出分母 5x，外面补 5/2",
      text: "正弦里面的角度是 5x，我们在 x≠0 时把分母的 2x 凑成 (2/5)·(5x)，也就是把常数因子 5/2 和 1/cos(5x) 单独拆出来。",
      formula: math`\begin{gathered}
        \frac{5}{2}\cdot\lim_{x\to 0}\left(\frac{\sin(5x)}{5x}\cdot\frac{1}{\cos(5x)}\right)
      \end{gathered}`,
    },
    {
      change: "分别看两个含 x 因子的极限",
      text: "令 u=5x，当 x→0 时 u→0，于是 sin(5x)/(5x) → 1；同时 cos(5x) 在 0 处连续，趋近于 cos 0 = 1（非零）。",
      formula: math`\begin{gathered}
        \lim_{x\to 0}\frac{\sin(5x)}{5x}=1\\[4pt]
        \lim_{x\to 0}\cos(5x)=1
      \end{gathered}`,
    },
    {
      change: "代入各因子极限并写出结论",
      text: "各因子极限都存在且分母极限不为 0，可以用极限的四则运算法则直接代入相乘。请算出最终分数并对照参考解答。",
      formula: math`\frac{5}{2}\cdot 1\cdot\frac{1}{1}=\;?`,
    },
  ],

  "jc935-1-6-1-3": [
    {
      change: "分别给分子分母配齐各自角度",
      text: "x→0 时分子分母都趋近 0。在 x≠0 时，给 sin(3x) 配上分母 3x，给 sin(7x) 配上分母 7x，再在旁边乘回 3x/(7x) 保持原式不变。",
      formula: math`\lim_{x\to 0}\frac{\frac{\sin(3x)}{3x}\cdot 3x}{\frac{\sin(7x)}{7x}\cdot 7x}`,
    },
    {
      change: "约去 x 并把常数 3/7 提到前面",
      text: "趋近过程中 x≠0，把 3x/(7x) 里的 x 约掉，剩下的常数 3/7 可以移到极限外面。",
      formula: math`\frac{3}{7}\cdot\lim_{x\to 0}\frac{\sin(3x)/(3x)}{\sin(7x)/(7x)}`,
    },
    {
      change: "分别确认上下两个正弦比趋于 1",
      text: "当 x→0 时，3x→0 且 7x→0，由第一重要极限，分子和分母里的两个标准正弦比都趋近于 1，且分母极限非零。",
      formula: math`\begin{gathered}
        \lim_{x\to 0}\frac{\sin(3x)}{3x}=1\\[4pt]
        \lim_{x\to 0}\frac{\sin(7x)}{7x}=1
      \end{gathered}`,
    },
    {
      change: "用商的极限法则算出结果",
      text: "应用商的极限法则把两个 1 代入，算出最终分数并写明理由，再对照参考解答。",
      formula: math`\frac{3}{7}\cdot\frac{1}{1}=\;?`,
    },
  ],

  "jc935-1-6-1-4": [
    {
      change: "把 cot(4x) 改写成 cos/sin",
      text: "x→0 时 x→0 而 cot(4x)→∞，这是 0·∞ 型未定式，不能直接算成 0。先把余切写成余弦除以正弦，转化成分式。",
      formula: math`\lim_{x\to 0}\frac{x\cos(4x)}{\sin(4x)}`,
    },
    {
      change: "凑出 4x/sin(4x)，外面补 1/4",
      text: "正弦里面的角度是 4x。在 x≠0 时给分子补一个 4、外面乘 1/4，并把 cos(4x) 拆成单独因子。",
      formula: math`\frac{1}{4}\cdot\lim_{x\to 0}\left(\frac{4x}{\sin(4x)}\cdot\cos(4x)\right)`,
    },
    {
      change: "把 4x/sin(4x) 写成标准比的倒数",
      text: "当 x→0 时 4x→0，标准比 sin(4x)/(4x) → 1 ≠ 0，所以它的倒数 4x/sin(4x) 也趋近于 1；同时 cos(4x) → cos 0 = 1。",
      formula: math`\begin{gathered}
        \frac{4x}{\sin(4x)}=\frac{1}{\sin(4x)/(4x)}\to 1\\[4pt]
        \cos(4x)\to 1
      \end{gathered}`,
    },
    {
      change: "代入各因子极限写出结论",
      text: "把常数 1/4 与两个极限值相乘，完成最后一步运算并对照参考解答。",
      formula: math`\frac{1}{4}\cdot 1\cdot 1=\;?`,
    },
  ],

  "jc935-1-6-1-5": [
    {
      change: "用半角公式改写分子 1−cos(4x)",
      text: "x→0 时这是 0/0 型。记住半角公式 1−cos(2θ)=2sin²θ，这里 2θ=4x，即 θ=2x，不要漏掉平方前的系数 2。",
      formula: math`\begin{gathered}
        1-\cos(4x)=2\sin^2(2x)\\[4pt]
        \lim_{x\to 0}\frac{2\sin^2(2x)}{x\sin(2x)}
      \end{gathered}`,
    },
    {
      change: "在去心邻域内约掉一份 sin(2x)",
      text: "在 0 附近的去心邻域（如 0<|x|<π/2）内，sin(2x)≠0，可以合法约去分子分母各一份 sin(2x)。",
      formula: math`\lim_{x\to 0}\frac{2\sin(2x)}{x}`,
    },
    {
      change: "分母配成 2x，常数变成 4",
      text: "正弦里面是 2x，把分母 x 乘 2 变成 2x，同时分子再乘 2，外面的常数系数由 2 变成 4。",
      formula: math`\lim_{x\to 0}\left(4\cdot\frac{\sin(2x)}{2x}\right)`,
    },
    {
      change: "用第一重要极限完成最后计算",
      text: "当 x→0 时 2x→0，sin(2x)/(2x) → 1。把常数 4 乘上去，得出最终极限并对照参考解答。",
      formula: math`4\cdot 1=\;?`,
    },
  ],

  "jc935-1-6-1-6": [
    {
      change: "先单独看参数 b=0 的情形",
      text: "后面需要除以 b 来凑出标准型，因此先把 b=0 单独处理：当 b=0 时，每一项都是 5ⁿ·sin 0 = 0，数列恒为 0。",
      formula: math`\begin{gathered}
        b=0:\\[4pt]
        5^n\sin\frac{0}{5^n}=0\\[4pt]
        \implies\text{极限为 }0
      \end{gathered}`,
    },
    {
      change: "b≠0 时令 t=b/5ⁿ 并反解 5ⁿ",
      text: "当 b≠0 时，把正弦里面的整体设为 t=b/5ⁿ。因为 5ⁿ→+∞，所以 n→∞ 时 t→0（且 t≠0），同时有 5ⁿ=b/t。",
      formula: math`\begin{gathered}
        t=\frac{b}{5^n}\to 0\\[4pt]
        5^n=\frac{b}{t}
      \end{gathered}`,
    },
    {
      change: "把原数列写成 b·(sin t / t)",
      text: "将 5ⁿ=b/t 代回原式，不能把 5ⁿ 和正弦分开求极限，而是合成一个标准正弦比再乘常数 b。",
      formula: math`b\cdot\lim_{n\to\infty}\frac{\sin(b/5^n)}{b/5^n}`,
    },
    {
      change: "用第一重要极限并合并结论",
      text: "当 n→∞ 时 t=b/5ⁿ→0，由第一重要极限得 sin t / t → 1。算出 b≠0 时的结果，再结合 b=0 时的 0，写出对所有实数 b 都成立的统一答案并对照参考解答。",
      formula: math`\begin{gathered}
        b\cdot\lim_{t\to 0}\frac{\sin t}{t}\\[4pt]
        =b\times 1=\;?
      \end{gathered}`,
    },
  ],

  "jc935-1-6-2-1": [
    {
      change: "确认 1^∞ 型并令 u=−3x",
      text: "x→0 时底数 1−3x → 1（且在 |x|<1/3 时底数恒正），指数 1/x → ∞，属于 1^∞ 型。锁定底数中趋零的部分 u=−3x，注意负号要一并带进 u。",
      formula: math`\begin{gathered}
        u=-3x\to 0\\[4pt]
        1-3x=1+u>0\\[2pt]
        (|x|<\tfrac{1}{3})
      \end{gathered}`,
    },
    {
      change: "把指数 1/x 改写成 1/u 的倍数",
      text: "由 u=−3x 得 x=−u/3，所以指数 1/x = −3/u = (1/u)·(−3)。这样就能配出标准形式 (1+u)^(1/u)。",
      formula: math`\frac{1}{x}=\frac{1}{u}\cdot(-3)`,
    },
    {
      change: "把原式写成标准结构的 −3 次幂",
      text: "利用幂的乘方把底数和 1/u 打包进中括号，外层保留常数指数 −3。",
      formula: math`\lim_{u\to 0}\left[(1+u)^{\frac{1}{u}}\right]^{-3}`,
    },
    {
      change: "把中括号换成 e，写出结论",
      text: "由第二重要极限，u→0 时 (1+u)^(1/u) → e。再由幂函数连续性，请写出最终的指数形式并对照参考解答。",
      formula: math`\begin{gathered}
        \lim_{u\to 0}(1+u)^{\frac{1}{u}}=e\\[4pt]
        \text{原极限}=e^{\;?}
      \end{gathered}`,
    },
  ],

  "jc935-1-6-2-2": [
    {
      change: "判别 1^∞ 型并令 u=4x",
      text: "x→0 时底数 1+4x → 1（在 |x|<1/4 内恒正），指数 2/x → ∞，属于 1^∞ 型未定式。设底数中的趋零项 u=4x。",
      formula: math`\begin{gathered}
        u=4x\to 0\\[4pt]
        \lim_{x\to 0}(1+4x)^{\frac{2}{x}}
      \end{gathered}`,
    },
    {
      change: "把指数 2/x 换算成 1/u 的倍数",
      text: "因为 u=4x，所以 x=u/4，代入指数得 2/x = 2/(u/4) = 8/u。注意这里系数是 2×4=8，不是 4。",
      formula: math`\frac{2}{x}=\frac{8}{u}=\frac{1}{u}\cdot 8`,
    },
    {
      change: "打包成 [(1+u)^(1/u)]⁸",
      text: "把 1/u 留给底数构成第二重要极限，把常数 8 放到最外层指数。",
      formula: math`\lim_{u\to 0}\left[(1+u)^{\frac{1}{u}}\right]^8`,
    },
    {
      change: "代入第二重要极限 e，写出结果",
      text: "当 u→0 时中括号内趋于 e，外层 8 次幂是连续函数。请写出最终结果并对照参考解答。",
      formula: math`\begin{gathered}
        (1+u)^{\frac{1}{u}}\to e\\[4pt]
        \text{原极限}=e^{\;?}
      \end{gathered}`,
    },
  ],

  "jc935-1-6-2-3": [
    {
      change: "把分式底数拆成 1+3/x",
      text: "先用分子除以分母，把 (x+3)/x 写成 1+3/x。当 x→+∞ 时，底数趋近 1、指数 2x→+∞，认出是 1^∞ 型。",
      formula: math`\lim_{x\to+\infty}\left(1+\frac{3}{x}\right)^{2x}`,
    },
    {
      change: "令 u=3/x，把指数 2x 换成 u",
      text: "当 x→+∞ 时，u=3/x → 0（且 x>0 时底数为正）。由 x=3/u，把指数改写成 2x = 6/u = (1/u)·6。",
      formula: math`\begin{gathered}
        u=\frac{3}{x}\to 0\\[4pt]
        2x=\frac{6}{u}=\frac{1}{u}\cdot 6
      \end{gathered}`,
    },
    {
      change: "改写成第二重要极限的 6 次幂",
      text: "把 1/u 与底数 1+u 配对放进中括号，常数 6 留在外层指数。",
      formula: math`\lim_{u\to 0}\left[(1+u)^{\frac{1}{u}}\right]^6`,
    },
    {
      change: "用第二重要极限写出最终答案",
      text: "u→0 时中括号趋近 e，结合幂函数连续性写出最终的 e 的幂次并对照参考解答。",
      formula: math`\begin{gathered}
        (1+u)^{\frac{1}{u}}\to e\\[4pt]
        \text{原极限}=e^{\;?}
      \end{gathered}`,
    },
  ],

  "jc935-1-6-2-4": [
    {
      change: "确认底数为正，令 u=−2/x",
      text: "当 x→+∞ 时，取 x>2 即可保证底数 1−2/x > 0。把底数写成 1+u，其中 u=−2/x → 0（不要丢掉负号）。",
      formula: math`\begin{gathered}
        x>2\implies 1-\frac{2}{x}>0\\[4pt]
        u=-\frac{2}{x}\to 0
      \end{gathered}`,
    },
    {
      change: "把指数 kx 改写成 1/u 的倍数",
      text: "由 u=−2/x 得 x=−2/u，因此指数 kx = (−2k)/u。参数 k 是固定实数，换元后照常保留。",
      formula: math`kx=\frac{-2k}{u}=\frac{1}{u}\cdot(-2k)`,
    },
    {
      change: "打包成 [(1+u)^(1/u)]^(−2k)",
      text: "把 1/u 配给 1+u，外层保留指数 −2k（注意当 k=0 时原式恒为 1=e⁰，同样符合该形式）。",
      formula: math`\lim_{u\to 0}\left[(1+u)^{\frac{1}{u}}\right]^{-2k}`,
    },
    {
      change: "代入第二重要极限并写出含 k 结论",
      text: "当 u→0 时中括号趋近于 e，外层幂函数在 e 处连续。请写出对任意固定实数 k 成立的极限并对照参考解答。",
      formula: math`\begin{gathered}
        (1+u)^{\frac{1}{u}}\to e\\[4pt]
        \text{原极限}=e^{\;?}
      \end{gathered}`,
    },
  ],

  "jc935-1-6-3": [
    {
      change: "任给 ε>0，写出 g 和 h 的邻域",
      text: "按函数极限的 ε–δ 定义，任取 ε>0：由 lim g(x)=5 可找到 δ₁>0，由 lim h(x)=5 可找到 δ₂>0，使它们在各自去心邻域内都落在 (5−ε, 5+ε) 里面。",
      formula: math`\begin{gathered}
        0<|x-2|<\delta_1:\\[2pt]
        |g(x)-5|<\varepsilon\\[4pt]
        0<|x-2|<\delta_2:\\[2pt]
        |h(x)-5|<\varepsilon
      \end{gathered}`,
    },
    {
      change: "记下夹逼不等式成立的半径 δ₀",
      text: "题目只说不等式 g(x)≤f(x)≤h(x) 在 2 的某个去心邻域成立，设这个邻域的半径为 δ₀>0，不能漏掉这一条。",
      formula: math`\begin{gathered}
        0<|x-2|<\delta_0:\\[4pt]
        g(x)\le f(x)\le h(x)
      \end{gathered}`,
    },
    {
      change: "取公共半径 δ=min(δ₀,δ₁,δ₂)",
      text: "为了让上述三条结论在同一个点 x 上同时成立，必须取三个正半径里最小的一个作为 δ。",
      formula: math`\delta=\min\{\delta_0,\delta_1,\delta_2\}>0`,
    },
    {
      change: "把三条不等式串成一条链并收尾",
      text: "当 0<|x−2|<δ 时，同时有 5−ε<g(x)、g(x)≤f(x)≤h(x) 和 h(x)<5+ε。把它们连在一起，就能得到 |f(x)−5|<ε。请补写最后一句 ε–δ 结论并对照参考解答。",
      formula: math`\begin{gathered}
        5-\varepsilon<g(x)\le f(x)\\[4pt]
        f(x)\le h(x)<5+\varepsilon\\[4pt]
        \implies |f(x)-5|<\;?
      \end{gathered}`,
    },
  ],

  "jc935-1-6-4-1": [
    {
      change: "先确认根号里面的数大于 1",
      text: "对任意正整数 n，都有 3/n > 0，所以根号里面的 t=1+3/n > 1。当 t≥1 时，开平方不会把数变大，反而有 1 ≤ √t ≤ t。",
      formula: math`\begin{gathered}
        t=1+\frac{3}{n}>1\\[4pt]
        t\ge 1\implies 1\le\sqrt{t}\le t
      \end{gathered}`,
    },
    {
      change: "代入 t=1+3/n 写出夹逼不等式",
      text: "把 t 换回 1+3/n，就得到了夹住根式的左右两道简单边界，不需要直接开根号。",
      formula: math`1\le\sqrt{1+\frac{3}{n}}\le 1+\frac{3}{n}`,
    },
    {
      change: "分别求左右两道边界的极限",
      text: "左边是常数列 1，极限为 1；右边当 n→∞ 时 3/n → 0，所以 1+3/n 也趋近于 1。",
      formula: math`\begin{gathered}
        \lim_{n\to\infty}1=1\\[4pt]
        \lim_{n\to\infty}\left(1+\frac{3}{n}\right)=1
      \end{gathered}`,
    },
    {
      change: "用夹逼准则得出最终结论",
      text: "左右两道边界都趋近同一个数。请引用数列夹逼准则，写出 √(1+3/n) 的极限并对照参考解答。",
      formula: math`\lim_{n\to\infty}\sqrt{1+\frac{3}{n}}=\;?`,
    },
  ],

  "jc935-1-6-4-2": [
    {
      change: "找出求和里分母的最小与最大范围",
      text: "求和指标 j 从 1 取到 n，所以每个分母 n²+5j 都满足 n² < n²+5j ≤ n²+5n（两端都取与 j 无关的统一边界）。",
      formula: math`\begin{gathered}
        1\le j\le n:\\[4pt]
        n^2<n^2+5j\le n^2+5n
      \end{gathered}`,
    },
    {
      change: "取倒数，注意不等号方向反转",
      text: "分母都是正数，分母越大倒数越小，所以取倒数后左右两端要对调位置。",
      formula: math`\frac{1}{n^2+5n}\le\frac{1}{n^2+5j}<\frac{1}{n^2}`,
    },
    {
      change: "把 n 项相加再乘外面的 n",
      text: "一共有 n 项，把每项的统一上下界各加 n 次（即乘 n），别忘了求和号外面还乘着一个 n，合起来一共乘了 n²。",
      formula: math`\begin{gathered}
        n\cdot\frac{n}{n^2+5n}\le S_n\le n\cdot\frac{n}{n^2}\\[4pt]
        \frac{n}{n+5}\le S_n\le 1
      \end{gathered}`,
    },
    {
      change: "求左右两界的极限并用夹逼收尾",
      text: "左界 n/(n+5) 分子分母同除以 n 得 1/(1+5/n) → 1，右界恒为 1。请写出左右极限并由夹逼准则给出 Sₙ 的极限，再对照参考解答。",
      formula: math`\begin{gathered}
        \lim_{n\to\infty}\frac{n}{n+5}=1\\[4pt]
        \lim_{n\to\infty}1=1\\[4pt]
        \lim_{n\to\infty}S_n=\;?
      \end{gathered}`,
    },
  ],

  "jc935-1-6-4-3": [
    {
      change: "令 t=1+2x，分 t>1 与 0<t<1 两类",
      text: "设 t=1+2x。在 x > −1/2 时 t > 0，四次根有定义。因为开四次方会把大于 1 的数拉小、把 (0,1) 里的数拉大，必须按 x 的正负分两侧夹逼。",
      formula: math`\begin{gathered}
        t=1+2x>0\;(x>-\tfrac{1}{2})\\[4pt]
        x>0\iff t>1\\[4pt]
        -\tfrac{1}{2}<x<0\iff 0<t<1
      \end{gathered}`,
    },
    {
      change: "写出右侧 x>0 时的夹逼不等式",
      text: "当 x>0 时 t=1+2x>1，此时 1 ≤ t^(1/4) ≤ t（若把三边同时四次方即得 1 ≤ t ≤ t⁴，显然成立）。",
      formula: math`\begin{gathered}
        x>0:\\[4pt]
        1\le\sqrt[4]{1+2x}\le 1+2x
      \end{gathered}`,
    },
    {
      change: "写出左侧 −1/2<x<0 时的夹逼不等式",
      text: "当 −1/2<x<0 时 0<t<1，此时 t⁴ < t < 1，开四次方后不等号方向与右侧相反：t ≤ t^(1/4) ≤ 1。",
      formula: math`\begin{gathered}
        -\tfrac{1}{2}<x<0:\\[4pt]
        1+2x\le\sqrt[4]{1+2x}\le 1
      \end{gathered}`,
    },
    {
      change: "分别对两侧取极限并合成双侧极限",
      text: "当 x→0⁺ 与 x→0⁻ 时，1+2x 都趋近于 1。请分别用夹逼准则得到右极限和左极限，再由左右极限相等得出双侧极限，最后对照参考解答。",
      formula: math`\begin{gathered}
        \lim_{x\to 0^+}(1+2x)=1\\[4pt]
        \lim_{x\to 0^-}(1+2x)=1\\[4pt]
        \lim_{x\to 0}\sqrt[4]{1+2x}=\;?
      \end{gathered}`,
    },
  ],

  "jc935-1-6-4-4": [
    {
      change: "写出下取整的基本夹逼不等式",
      text: "下取整 ⌊t⌋ 表示不超过 t 的最大整数，它最多比 t 小不到 1，因此对任意实数 t 都有 t−1 < ⌊t⌋ ≤ t。把 t=3/x 代入。",
      formula: math`\begin{gathered}
        t-1<\lfloor t\rfloor\le t\\[4pt]
        \frac{3}{x}-1<\left\lfloor\frac{3}{x}\right\rfloor\le\frac{3}{x}
      \end{gathered}`,
    },
    {
      change: "利用 x>0，三边同乘正数 x",
      text: "题目是右极限 x→0⁺，因此 x>0。不等式三边同乘正数 x 时，不等号方向完全保持不变。",
      formula: math`\begin{gathered}
        x>0:\\[4pt]
        x\left(\frac{3}{x}-1\right)<x\left\lfloor\frac{3}{x}\right\rfloor\le 3
      \end{gathered}`,
    },
    {
      change: "化简左右两道边界",
      text: "把左端的括号展开并约去 x，得到关于原式的简洁上下界。",
      formula: math`3-x<x\left\lfloor\frac{3}{x}\right\rfloor\le 3`,
    },
    {
      change: "对两界取 x→0⁺ 极限并收尾",
      text: "当 x→0⁺ 时，左界 3−x → 3，右界恒为 3。请引用夹逼准则写出最终极限并对照参考解答。",
      formula: math`\begin{gathered}
        \lim_{x\to 0^+}(3-x)=3\\[4pt]
        \lim_{x\to 0^+}3=3\\[4pt]
        \lim_{x\to 0^+}x\left\lfloor\frac{3}{x}\right\rfloor=\;?
      \end{gathered}`,
    },
  ],

  "jc935-1-6-5": [
    {
      change: "用数学归纳法证明有界 0<aₙ<4",
      text: "先找上界：起点 a₁=2 满足 0<a₁<4。假设 0<aₙ<4，则 12<12+aₙ<16，开平方后立刻有 0<aₙ₊₁<√16=4，故对一切 n 都有 0<aₙ<4。",
      formula: math`\begin{gathered}
        a_1=2\in(0,4)\\[4pt]
        0<a_n<4\\[2pt]
        \implies 0<\sqrt{12+a_n}<4
      \end{gathered}`,
    },
    {
      change: "比较平方差，证明数列单调递增",
      text: "为了去掉根号，比较 aₙ₊₁² − aₙ²。分解因式后利用 0<aₙ<4 判号；因为各项为正，平方大就意味着本身更大。",
      formula: math`\begin{gathered}
        a_{n+1}^2-a_n^2=12+a_n-a_n^2\\[4pt]
        =(4-a_n)(a_n+3)>0\\[4pt]
        \implies a_{n+1}>a_n
      \end{gathered}`,
    },
    {
      change: "由单调有界准则确认极限存在",
      text: "数列严格递增且有上界 4，根据单调有界准则，极限 L=lim aₙ 必然存在，并且满足 2=a₁ ≤ L ≤ 4。这一步必须先于代入递推方程。",
      formula: math`\lim_{n\to\infty}a_n=L\quad(2\le L\le 4)`,
    },
    {
      change: "对递推式取极限并解方程定出 L",
      text: "对 aₙ₊₁=√(12+aₙ) 两边同时令 n→∞，得 L=√(12+L)，平方移项并因式分解。请解出两个根，再用 2≤L≤4 舍去不合题意的根，写出完整结论并对照参考解答。",
      formula: math`\begin{gathered}
        L^2-L-12=0\\[4pt]
        (L-4)(L+3)=0\\[4pt]
        \implies L=\;?
      \end{gathered}`,
    },
  ],

  "jc935-1-6-6": [
    {
      change: "用归纳法确认每项都在 (0, π/2)",
      text: "已知 0<a₁<π/2。若 0<aₙ<π/2，则 0<sin aₙ<1，于是 0<aₙ₊₁=(1/2)sin aₙ<1/2<π/2，所以整个数列始终落在 (0, π/2) 内且恒正。",
      formula: math`\begin{gathered}
        0<a_n<\frac{\pi}{2}\\[4pt]
        \implies 0<\sin a_n<1\\[4pt]
        \implies 0<a_{n+1}<\frac{1}{2}<\frac{\pi}{2}
      \end{gathered}`,
    },
    {
      change: "用 sin t<t 证递减并得半缩不等式",
      text: "在 (0, π/2) 上有基本不等式 0<sin t<t。代入 t=aₙ，得到 aₙ₊₁ < aₙ/2 < aₙ，说明数列严格递减且每步至少缩掉一半。",
      formula: math`0<a_{n+1}=\frac{1}{2}\sin a_n<\frac{a_n}{2}`,
    },
    {
      change: "反复递推，写出等比上界",
      text: "把 aₖ₊₁ ≤ aₖ/2 从 k=n−1 一路往下套到 k=1，总共乘了 n−1 次 1/2，就把 aₙ 夹在了 0 和等比数列之间。",
      formula: math`0<a_n\le\frac{a_1}{2^{n-1}}`,
    },
    {
      change: "对等比上界取极限并用夹逼收尾",
      text: "当 n→∞ 时 1/2^(n−1) → 0，所以右界趋近于 0。请引用夹逼准则写出数列收敛及极限值（并说明严格递减），再对照参考解答。",
      formula: math`\begin{gathered}
        \lim_{n\to\infty}\frac{a_1}{2^{n-1}}=0\\[4pt]
        \lim_{n\to\infty}a_n=\;?
      \end{gathered}`,
    },
  ],

  "jc935-1-7-1": [
    {
      change: "先确认两式都是趋零无穷小",
      text: "当 x→0 时，多项式 α(x)=3x+x² → 0，β(x)=2x²−x³ → 0，两者都是无穷小。要比较阶数，写出它们的比值 β(x)/α(x)。",
      formula: math`\begin{gathered}
        \lim_{x\to 0}\frac{\beta(x)}{\alpha(x)}\\[4pt]
        =\lim_{x\to 0}\frac{2x^2-x^3}{3x+x^2}
      \end{gathered}`,
    },
    {
      change: "上下提公因式 x 并合法约分",
      text: "分子提出 x 得 x(2x−x²)=x²(2−x)，分母提出 x 得 x(3+x)。在 0 的去心邻域内 x≠0，可以约去一个公因式 x。",
      formula: math`\lim_{x\to 0}\frac{x(2-x)}{3+x}`,
    },
    {
      change: "代入 x=0 算比值并判断高阶关系",
      text: "约分后分母在 x=0 处为 3≠0，可直接代入算出比值极限。根据“若 β/α → 0，则 β 是 α 的高阶无穷小”，请算出极限并写出谁是谁的高阶无穷小，再对照参考解答。",
      formula: math`\frac{0\cdot(2-0)}{3+0}=\;?`,
    },
  ],

  "jc935-1-7-2": [
    {
      change: "用半角公式改写 α(x)，保留外层平方",
      text: "先化简括号里的 1−cos(2x)=2sin²x，再对外面做一次平方：(2sin²x)² = 4sin⁴x，千万别漏掉外层平方。",
      formula: math`\begin{gathered}
        1-\cos(2x)=2\sin^2 x\\[4pt]
        \alpha(x)=(2\sin^2 x)^2=4\sin^4 x
      \end{gathered}`,
    },
    {
      change: "写出比值 α/β 并约去 sin²x",
      text: "在 0 的去心邻域（如 0<|x|<π）内 sin²x≠0，把 α(x)=4sin⁴x 除以 β(x)=sin²x，约去一份 sin²x。",
      formula: math`\begin{gathered}
        \frac{\alpha(x)}{\beta(x)}=\frac{4\sin^4 x}{\sin^2 x}\\[4pt]
        =4\sin^2 x
      \end{gathered}`,
    },
    {
      change: "取 x→0 极限并判断高阶关系",
      text: "当 x→0 时 sin x → 0，算出 4sin²x 的极限，据此判断 α 与 β 中哪一个是另一个的高阶无穷小，再对照参考解答。",
      formula: math`\lim_{x\to 0}4\sin^2 x=\;?`,
    },
  ],

  "jc935-1-7-3-1": [
    {
      change: "确认都是无穷小并写出比值",
      text: "当 x→2 时，α(x)=x−2 → 0，β(x)=x³−8 → 0，都是无穷小。比较它们是否同阶、是否等价，先求极限 lim α/β。",
      formula: math`\begin{gathered}
        \lim_{x\to 2}\frac{\alpha(x)}{\beta(x)}\\[4pt]
        =\lim_{x\to 2}\frac{x-2}{x^3-8}
      \end{gathered}`,
    },
    {
      change: "用立方差分解分母并约去 x−2",
      text: "立方差公式给出 x³−8=(x−2)(x²+2x+4)。在 x≠2 的去心邻域内，合法约去公因式 x−2。",
      formula: math`\begin{gathered}
        x^3-8=(x-2)(x^2+2x+4)\\[4pt]
        \lim_{x\to 2}\frac{1}{x^2+2x+4}
      \end{gathered}`,
    },
    {
      change: "代入 x=2 算比值并分别作答",
      text: "分母在 x=2 处非零，直接代入计算。记住：比值为有限非零常数说明“同阶”，只有比值恰好等于 1 才算“等价”。请算出结果并回答两问，再对照参考解答。",
      formula: math`\frac{1}{2^2+2\cdot 2+4}=\;?`,
    },
  ],

  "jc935-1-7-3-2": [
    {
      change: "用平方差分解 β(x) 的分子",
      text: "x→2 时 α(x)=x−2 和 β(x)=(x²−4)/4 都趋近于 0。先把 β(x) 的分子拆成平方差，保留分母里的常数 4。",
      formula: math`\beta(x)=\frac{(x-2)(x+2)}{4}`,
    },
    {
      change: "写出 α/β 并约去公因式 x−2",
      text: "在 x≠2 时计算 α(x)/β(x)，把除以 1/4 变成乘 4，再约去分子分母共同的 x−2。",
      formula: math`\begin{gathered}
        \frac{\alpha(x)}{\beta(x)}=\frac{x-2}{(x-2)(x+2)/4}\\[4pt]
        =\frac{4}{x+2}\quad(x\ne 2)
      \end{gathered}`,
    },
    {
      change: "代入 x=2 求极限并判断同阶与等价",
      text: "分母在 x=2 处为 4≠0，直接代入算出比值极限。根据结果是否非零、是否等于 1，同时回答“是否同阶”与“是否等价”，再对照参考解答。",
      formula: math`\begin{gathered}
        \lim_{x\to 2}\frac{4}{x+2}\\[4pt]
        =\frac{4}{2+2}=\;?
      \end{gathered}`,
    },
  ],

  "jc935-1-7-4-1": [
    {
      change: "写出证明等价所需的目标极限",
      text: "根据等价无穷小定义，要证明 x→0 时 arctan(4x) ~ 4x，就是证明两者的比值极限等于 1。",
      formula: math`\lim_{x\to 0}\frac{\arctan(4x)}{4x}=1`,
    },
    {
      change: "令 t=arctan(4x) 并反解出 4x",
      text: "用换元法把反三角函数变成熟悉的三角函数：令 t=arctan(4x)，则 4x=tan t，且当 x→0 时 t→0（去心邻域内 t≠0）。",
      formula: math`\begin{gathered}
        t=\arctan(4x)\to 0\\[4pt]
        4x=\tan t
      \end{gathered}`,
    },
    {
      change: "把 t/tan t 拆成标准正弦比与余弦",
      text: "将比值换成 t/tan t，再把 tan t 写成 sin t / cos t，得到两个容易求极限的因子相乘。",
      formula: math`\begin{gathered}
        \lim_{t\to 0}\frac{t}{\tan t}\\[4pt]
        =\lim_{t\to 0}\left(\frac{t}{\sin t}\cdot\cos t\right)
      \end{gathered}`,
    },
    {
      change: "代入两个极限完成等价证明",
      text: "由第一重要极限，t/sin t = 1/(sin t/t) → 1，且 cos t → 1。算出乘积验证等于 1，即可完成证明并对照参考解答。",
      formula: math`1\cdot 1=\;?`,
    },
  ],

  "jc935-1-7-4-2": [
    {
      change: "把 sec(3x)−1 通分成 1−cos(3x) 的商",
      text: "要证 sec(3x)−1 ~ (9/2)x²，先利用 sec u = 1/cos u 通分，把差写成一个分式。",
      formula: math`\sec(3x)-1=\frac{1-\cos(3x)}{\cos(3x)}`,
    },
    {
      change: "分子用半角公式化成正弦平方",
      text: "对分子应用 1−cos(3x)=2sin²(3x/2)，注意角度减半成 3x/2，前面系数是 2。",
      formula: math`\sec(3x)-1=\frac{2\sin^2(3x/2)}{\cos(3x)}`,
    },
    {
      change: "除以 (9/2)x² 并配成标准正弦比的平方",
      text: "写出目标比值，分母里的 (9/2)x² 除以分子的 2 恰好变成 (9/4)x²=(3x/2)²，正好与 sin²(3x/2) 配成平方。",
      formula: math`\begin{gathered}
        \frac{\sec(3x)-1}{\frac{9}{2}x^2}\\[4pt]
        =\frac{\sin^2(3x/2)}{\frac{9}{4}x^2\cos(3x)}\\[4pt]
        =\left[\frac{\sin(3x/2)}{3x/2}\right]^2\cdot\frac{1}{\cos(3x)}
      \end{gathered}`,
    },
    {
      change: "取 x→0 极限验证比值为 1",
      text: "当 x→0 时 3x/2 → 0，括号内的标准正弦比趋于 1，分母 cos(3x) 也趋于 1。请代入算出极限并完成等价关系的证明，再对照参考解答。",
      formula: math`1^2\cdot\frac{1}{1}=\;?`,
    },
  ],

  "jc935-1-7-5-1": [
    {
      change: "确认是单独乘除因子，找等价量",
      text: "x→0 时这是 0/0 型，且分子 tan(7x) 是整个分式的单独分子因子（不是加减项的一部分）。令 u=7x→0，由 tan u ~ u 得 tan(7x) ~ 7x。",
      formula: math`\begin{gathered}
        u=7x\to 0\\[4pt]
        \tan(7x)\sim 7x
      \end{gathered}`,
    },
    {
      change: "在比值中把 tan(7x) 替换成 7x",
      text: "乘除中的整个等价无穷小因子可以直接替换，分母 4x 照抄不动（注意系数 7 不能漏掉）。",
      formula: math`\begin{gathered}
        \lim_{x\to 0}\frac{\tan(7x)}{4x}\\[4pt]
        =\lim_{x\to 0}\frac{7x}{4x}
      \end{gathered}`,
    },
    {
      change: "在 x≠0 时约去 x，写出结果",
      text: "趋近过程中 x≠0，把分子分母的 x 约掉，剩下的常数比就是最终极限。请写出答案与理由并对照参考解答。",
      formula: math`\lim_{x\to 0}\frac{7}{4}=\;?`,
    },
  ],

  "jc935-1-7-5-2": [
    {
      change: "分别找分子和分母的等价无穷小",
      text: "n、m 是正整数，x→0⁺ 时 2xⁿ→0 且 x→0。分子和分母都是独立的乘除因子，由 sin u ~ u 得 sin(2xⁿ) ~ 2xⁿ，分母 (sin x)ᵐ ~ xᵐ。",
      formula: math`\begin{gathered}
        x\to 0^+:\;\sin(2x^n)\sim 2x^n\\[4pt]
        (\sin x)^m\sim x^m
      \end{gathered}`,
    },
    {
      change: "等价替换并合并 x 的幂次",
      text: "在乘除中整体替换后，用同底数幂相除法则把 2xⁿ/xᵐ 化简成 2x^(n−m)。",
      formula: math`\begin{gathered}
        \lim_{x\to 0^+}\frac{2x^n}{x^m}\\[4pt]
        =\lim_{x\to 0^+}2x^{n-m}
      \end{gathered}`,
    },
    {
      change: "按 n−m 的正、零、负分三类讨论",
      text: "当 n>m 时指数为正；当 n=m 时 x⁰=1；当 n<m 时指数为负，且因 x→0⁺ 保证 x>0，负幂趋于 +∞（若双侧极限且 n−m 为奇数则不一定是 +∞）。请分别写出三类极限并对照参考解答。",
      formula: math`\lim_{x\to 0^+}2x^{n-m}=\begin{cases}
        ?,&n>m\\
        ?,&n=m\\
        ?,&n<m
      \end{cases}`,
    },
  ],

  "jc935-1-7-5-3": [
    {
      change: "分子是相减项，先提公因子 sin(2x)",
      text: "注意不能把 tan(2x) 和 sin(2x) 直接都换成 2x，那样相减会得 0，把真正起作用的高阶项抵消掉了！先把 tan(2x)=sin(2x)sec(2x) 里的公因子 sin(2x) 提出来。",
      formula: math`\begin{gathered}
        \tan(2x)-\sin(2x)\\[4pt]
        =\sin(2x)\big(\sec(2x)-1\big)
      \end{gathered}`,
    },
    {
      change: "把分子分母三个乘除因子分别替换",
      text: "现在全是乘除因子，可以安全替换：x→0 时 sin(2x) ~ 2x，由 sec u − 1 ~ u²/2 得 sec(2x)−1 ~ (2x)²/2 = 2x²，分母 sin³x ~ x³。",
      formula: math`\begin{gathered}
        \sin(2x)\sim 2x\\[4pt]
        \sec(2x)-1\sim\frac{(2x)^2}{2}=2x^2\\[4pt]
        \sin^3 x\sim x^3
      \end{gathered}`,
    },
    {
      change: "代入替换结果并合并分子的幂次",
      text: "把三个等价无穷小代回分式，分子相乘变成 (2x)(2x²)=4x³，与分母同为三次幂。",
      formula: math`\begin{gathered}
        \lim_{x\to 0}\frac{(2x)(2x^2)}{x^3}\\[4pt]
        =\lim_{x\to 0}\frac{4x^3}{x^3}
      \end{gathered}`,
    },
    {
      change: "在 x≠0 时约去 x³，写出结果",
      text: "趋近过程中 x≠0，约去上下共同的 x³，就能看出最终极限。请写出答案并对照参考解答。",
      formula: math`\lim_{x\to 0}\frac{4x^3}{x^3}=\;?`,
    },
  ],

  "jc935-1-7-5-4": [
    {
      change: "说明分子不可直接替换，先提公因子",
      text: "x→0 时 sin(2x) 和 tan(2x) 的一阶等价主部都是 2x，若直接两项替换会得 2x−2x=0 而丢失真正的主部。先提出公因子 sin(2x)，把差改写成乘积。",
      formula: math`\begin{gathered}
        \sin(2x)-\tan(2x)\\[4pt]
        =\sin(2x)\big(1-\sec(2x)\big)
      \end{gathered}`,
    },
    {
      change: "求分子两个乘积因子的等价无穷小",
      text: "现在分子是乘积形式：sin(2x) ~ 2x，且 1−sec(2x) = −(sec(2x)−1) ~ −(2x)²/2 = −2x²（注意负号），两者相乘等价于 −4x³。",
      formula: math`\begin{gathered}
        \sin(2x)\sim 2x\\[4pt]
        1-\sec(2x)\sim -2x^2\\[4pt]
        \text{分子}\sim (2x)(-2x^2)=-4x^3
      \end{gathered}`,
    },
    {
      change: "用 (1+u)^a−1 ~ au 求分母两因子",
      text: "x→0 时 2x²→0 且 3sin x→0，分别套用幂型等价无穷小 (1+u)^a−1 ~ au，再把 sin x 换成 x，求出 A(x) 与 B(x) 的等价主部。",
      formula: math`\begin{gathered}
        A(x)=(1+2x^2)^{\frac{1}{3}}-1\sim\frac{2}{3}x^2\\[4pt]
        B(x)=(1+3\sin x)^{\frac{1}{2}}-1\\[2pt]
        \sim\frac{3}{2}\sin x\sim\frac{3}{2}x
      \end{gathered}`,
    },
    {
      change: "合并分母乘积并约去 x³ 得出结论",
      text: "把 A(x)B(x) 替换成 (2/3)x²·(3/2)x = x³，与分子 −4x³ 作比并在 x≠0 时约去 x³。请算出最终结果并完整说明分子不能直接替换的理由，再对照参考解答。",
      formula: math`\begin{gathered}
        A(x)B(x)\sim\frac{2}{3}x^2\cdot\frac{3}{2}x=x^3\\[4pt]
        \lim_{x\to 0}\frac{-4x^3}{x^3}=\;?
      \end{gathered}`,
    },
  ],

  "jc935-1-7-6-1": [
    {
      change: "写出证明自反性所需的定义目标",
      text: "要证明 x→2 时 α ~ α，按照等价无穷小的定义，必须检验比值 α(x)/α(x) 在 x→2 时的极限是否等于 1。",
      formula: math`\text{目标：}\lim_{x\to 2}\frac{\alpha(x)}{\alpha(x)}=1`,
    },
    {
      change: "利用去心邻域内 α(x)≠0 合法作商",
      text: "虽然 α(x)→0，但题目假设在 2 的某个去心邻域内 α(x)≠0，所以在这个邻域里可以把 α(x) 放到分母上，且比值恒等于 1。",
      formula: math`\begin{gathered}
        0<|x-2|<\delta:\;\alpha(x)\ne 0\\[4pt]
        \frac{\alpha(x)}{\alpha(x)}=1
      \end{gathered}`,
    },
    {
      change: "对常数 1 取极限并写出结论",
      text: "在 2 的去心邻域内商恒为常函数 1，取 x→2 的极限即得 1。请补写完整的推理句与自反性结论，再对照参考解答。",
      formula: math`\begin{gathered}
        \lim_{x\to 2}\frac{\alpha(x)}{\alpha(x)}\\[4pt]
        =\lim_{x\to 2}1=\;?
      \end{gathered}`,
    },
  ],

  "jc935-1-7-6-2": [
    {
      change: "把已知 α~β 翻译成比值极限",
      text: "要证对称性（由 α~β 推出 β~α），先把已知条件改写成极限形式：当 x→2 时，α(x)/β(x) 的极限是 1。",
      formula: math`\begin{gathered}
        \alpha\sim\beta\\[4pt]
        \iff\lim_{x\to 2}\frac{\alpha(x)}{\beta(x)}=1
      \end{gathered}`,
    },
    {
      change: "说明商在去心邻域非零并取倒数",
      text: "因为 α(x)/β(x) 的极限是 1≠0，由极限的局部保号性，在 2 的某个去心邻域内 α(x)/β(x)≠0，因此可以把 β/α 写成 1/(α/β)。",
      formula: math`\frac{\beta(x)}{\alpha(x)}=\frac{1}{\alpha(x)/\beta(x)}`,
    },
    {
      change: "用倒数的极限法则算出 β/α 的极限",
      text: "分母 α(x)/β(x) 的极限为 1≠0，满足商的极限法则条件。请代入求出 lim(β/α) 并据此写出对称性结论 β~α，再对照参考解答。",
      formula: math`\begin{gathered}
        \lim_{x\to 2}\frac{\beta(x)}{\alpha(x)}
        =\frac{1}{\lim_{x\to 2}\frac{\alpha(x)}{\beta(x)}}\\[4pt]
        =\frac{1}{1}=\;?
      \end{gathered}`,
    },
  ],

  "jc935-1-7-6-3": [
    {
      change: "写出已知的两个比值极限与目标",
      text: "已知 x→2 时 α~β 且 β~γ，也就是 α/β→1 与 β/γ→1。我们要证明 α~γ，即证明比值 α/γ 的极限等于 1。",
      formula: math`\begin{gathered}
        \lim_{x\to 2}\frac{\alpha(x)}{\beta(x)}=1,\quad
        \lim_{x\to 2}\frac{\beta(x)}{\gamma(x)}=1\\[4pt]
        \text{目标：}\lim_{x\to 2}\frac{\alpha(x)}{\gamma(x)}=1
      \end{gathered}`,
    },
    {
      change: "在去心邻域内把 α/γ 拆成两个比值相乘",
      text: "在相关比值有定义的去心邻域内 β(x)≠0、γ(x)≠0，可以引入中间量 β(x)，把 α/γ 改写成 (α/β)·(β/γ)。",
      formula: math`\frac{\alpha(x)}{\gamma(x)}=\frac{\alpha(x)}{\beta(x)}\cdot\frac{\beta(x)}{\gamma(x)}`,
    },
    {
      change: "应用乘积的极限法则完成证明",
      text: "两个因子的极限都存在且等于 1，应用极限的乘法法则将两极限相乘即可。请算出结果并写出传递性结论 α~γ，再对照参考解答。",
      formula: math`\begin{gathered}
        \lim_{x\to 2}\frac{\alpha(x)}{\gamma(x)}\\[4pt]
        =\left(\lim_{x\to 2}\frac{\alpha}{\beta}\right)
         \left(\lim_{x\to 2}\frac{\beta}{\gamma}\right)\\[4pt]
        =1\times 1=\;?
      \end{gathered}`,
    },
  ],
};

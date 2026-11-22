import type { GuidedHint } from "../learning";

const math = String.raw;

export const ch2Sec1GuidedHints: Record<string, GuidedHint[]> = {
  "jc935-2-1-1": [
    {
      change: "写出 t=1 到 1+h 的角度增量",
      text: "按导数定义，先算从 t=1 到 t=1+h 这段时间里转台多转了多少角度，把 1+h 和 1 分别代入角度公式相减。",
      formula: math`\begin{gathered}
        \theta(1+h)-\theta(1)\\[4pt]
        =\left[5(1+h)^2+(1+h)\right]-(5+1)
      \end{gathered}`,
    },
    {
      change: "展开平方项并合并同类项",
      text: "用 (1+h)² = 1+2h+h² 展开，再把常数项 5+1=6 与后面的 6 抵消，只保留含 h 的项。",
      formula: math`\begin{gathered}
        \theta(1+h)-\theta(1)\\[4pt]
        =(5+10h+5h^2+1+h)-6\\[4pt]
        =11h+5h^2
      \end{gathered}`,
    },
    {
      change: "除以 h 并约去公因子 h",
      text: "把角度增量除以时间间隔 h 得到平均角速度。在取极限的过程中 h≠0，可以把分子里的公因子 h 约掉。",
      formula: math`\begin{gathered}
        \frac{\theta(1+h)-\theta(1)}{h}
        =\frac{11h+5h^2}{h}\\[4pt]
        =11+5h\quad(h\ne 0)
      \end{gathered}`,
    },
    {
      change: "令 h→0 并写出带单位的结论",
      text: "11+5h 是关于 h 的多项式，直接令 h=0 就得到 t=1 秒的瞬时角速度。请算出数值并写上单位 rad/s，再对照参考解答。",
      formula: math`\begin{gathered}
        \theta'(1)=\lim_{h\to 0}(11+5h)\\[4pt]
        =11+5\cdot 0=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-1-2": [
    {
      change: "写出温差并消去常数 22",
      text: "先写第 2 分钟到第 2+h 分钟的温度增量 T(2+h)−T(2)。两项都有相同的室温常数 22，相减直接消掉。",
      formula: math`\begin{gathered}
        T(2+h)-T(2)\\[4pt]
        =\frac{36}{3+h}-\frac{36}{3}
      \end{gathered}`,
    },
    {
      change: "把两个分式通分合并",
      text: "先把 36/3 化简成 12，再把 36/(3+h) 与 12 通分到共同分母 3+h 上，化简分子。",
      formula: math`\begin{gathered}
        \frac{36}{3+h}-12
        =\frac{36-12(3+h)}{3+h}\\[4pt]
        =\frac{-12h}{3+h}
      \end{gathered}`,
    },
    {
      change: "除以 h 并约去公因子 h",
      text: "将温差除以时间间隔 h 构成差商。取极限时 h≠0，可以直接约掉分子分母中的 h。",
      formula: math`\begin{gathered}
        \frac{T(2+h)-T(2)}{h}
        =\frac{-12h}{h(3+h)}\\[4pt]
        =\frac{-12}{3+h}\quad(h\ne 0)
      \end{gathered}`,
    },
    {
      change: "令 h→0 并区分变化率与降温速率",
      text: "分母在 h=0 处为 3≠0，可直接代入求极限。注意温度变化率要保留负号，而题目追问的降温速率取正数，请写出两项结论并对照参考解答。",
      formula: math`\begin{gathered}
        T'(2)=\lim_{h\to 0}\frac{-12}{3+h}\\[4pt]
        =\frac{-12}{3+0}=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-1-3-1": [
    {
      change: "明确边际成本就是总成本的导数",
      text: "边际成本反映产量在当前水平附近增加一点点时总成本的变化率，也就是 C(x) 对 x 的导数 C′(x)，不是总成本除以产量。",
      formula: math`C(x)=1200+72x-\frac{x^2}{5}`,
    },
    {
      change: "逐项对总成本函数求导",
      text: "按求导的线性法则逐项求导：固定成本 1200 的导数是 0，72x 的导数是 72，−x²/5 的导数是 −2x/5。",
      formula: math`\begin{gathered}
        C'(x)=0+72-\frac{2x}{5}\\[4pt]
        =72-\frac{2x}{5}
      \end{gathered}`,
    },
    {
      change: "代入 x=60 并写出带单位的结果",
      text: "在求导之后再把产量 x=60 代入 C′(x)。请算出数值并写上单位“元/件”，再对照参考解答。",
      formula: math`\begin{gathered}
        C'(60)=72-\frac{2\times 60}{5}\\[4pt]
        =72-24=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-1-3-2": [
    {
      change: "写出第 61 件的实际新增成本",
      text: "第 61 件多花的钱等于做完 61 件的总成本减去做完 60 件的总成本，即 C(61)−C(60)。两项中的固定成本 1200 相减消去。",
      formula: math`\begin{gathered}
        C(61)-C(60)\\[4pt]
        =72(61-60)-\frac{61^2-60^2}{5}
      \end{gathered}`,
    },
    {
      change: "用平方差公式化简 61²−60²",
      text: "不必硬算两个大平方，用平方差公式 a²−b²=(a−b)(a+b) 直接把 61²−60² 写成 (61−60)(61+60)=121。",
      formula: math`\begin{gathered}
        61^2-60^2=(61-60)(61+60)=121\\[4pt]
        C(61)-C(60)=72-\frac{121}{5}
      \end{gathered}`,
    },
    {
      change: "算出实际新增成本并与边际成本比较",
      text: "把 72 化成分母为 5 的分数再相减，得到精确分数（或小数），再与上一问的 C′(60)=48 元/件比较差值并说明原因。",
      formula: math`\begin{gathered}
        C(61)-C(60)=\frac{360-121}{5}=\;?\\[4pt]
        \text{再与 }C'(60)=48\text{ 比较}
      \end{gathered}`,
    },
  ],

  "jc935-2-1-4": [
    {
      change: "确认 f(2)=0 并写出差商",
      text: "连乘里 k=1 的因子是 (x−2)/(x+2)，代入 x=2 时分子为 0，故 f(2)=0。因此 x=2 处的导数差商就是 f(x)/(x−2)。",
      formula: math`\begin{gathered}
        f(2)=0\\[4pt]
        f'(2)=\lim_{x\to 2}\frac{1}{x-2}
        \prod_{k=1}^{n}\frac{x-2k}{x+2k}
      \end{gathered}`,
    },
    {
      change: "拆出 k=1 项并约去 x−2",
      text: "把连乘拆成 k=1 这一项和 k=2 到 n 的其余项。取极限时 x≠2，正好把首项分子里的 x−2 与分母的 x−2 约掉。",
      formula: math`\begin{gathered}
        f'(2)=\lim_{x\to 2}\left(
        \frac{1}{x+2}\prod_{k=2}^{n}\frac{x-2k}{x+2k}
        \right)
      \end{gathered}`,
    },
    {
      change: "代入 x=2 并把分子提取负号",
      text: "约去零因子后每一项分母在 x=2 处都非零，可直接代入 x=2。把 k=2..n 每项分子分母同除 2 得 (1−k)/(1+k)，再把 n−1 个负号一起提到前面。",
      formula: math`\begin{gathered}
        f'(2)=\frac{1}{4}\prod_{k=2}^{n}\frac{1-k}{1+k}\\[4pt]
        =\frac{(-1)^{n-1}}{4}\prod_{k=2}^{n}\frac{k-1}{k+1}
      \end{gathered}`,
    },
    {
      change: "展开连乘逐项约分并核对 n=1",
      text: "把分子 1·2·…·(n−1) 与分母 3·4·…·(n+1) 对齐约去中间的 3 到 n−1，只剩头尾少数因子。请算出化简后的表达式，并检查 n=1（空乘积为 1）是否同样吻合。",
      formula: math`\begin{gathered}
        \frac{(-1)^{n-1}}{4}\cdot
        \frac{1\cdot 2\cdot 3\cdots(n-1)}{3\cdot 4\cdots n(n+1)}\\[4pt]
        =\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-1-5": [
    {
      change: "令 A=2x+π/4，写出导数定义差商",
      text: "题目要求不套三角求导公式，回到定义。记 A=2x+π/4，则把 x 换成 x+h 时角度增加 2h，即变成 A+2h。",
      formula: math`\begin{gathered}
        A=2x+\frac{\pi}{4}\\[4pt]
        f'(x)=\lim_{h\to 0}\frac{\cos(A+2h)-\cos A}{h}
      \end{gathered}`,
    },
    {
      change: "对分子应用余弦和差化积",
      text: "利用和差化积公式 cos α − cos β = −2sin((α+β)/2)sin((α−β)/2)，把分子化成含 sin h 的乘积。",
      formula: math`\begin{gathered}
        \cos(A+2h)-\cos A\\[4pt]
        =-2\sin(A+h)\sin h
      \end{gathered}`,
    },
    {
      change: "拆出第一重要极限因子 sin h / h",
      text: "把化积结果代回差商，将 −2sin(A+h) 和 sin h / h 拆成两个因子，方便分别取极限。",
      formula: math`\begin{gathered}
        f'(x)=\lim_{h\to 0}\left(
        -2\sin(A+h)\cdot\frac{\sin h}{h}
        \right)
      \end{gathered}`,
    },
    {
      change: "取极限并把 A 换回 2x+π/4",
      text: "当 h→0 时，sin(A+h) 连续趋于 sin A，且 sin h / h → 1。请代入两个极限并把 A 还原为 2x+π/4，再对照参考解答。",
      formula: math`\begin{gathered}
        f'(x)=-2\sin(A+0)\cdot 1\\[4pt]
        \text{代回 }A=2x+\frac{\pi}{4}\implies f'(x)=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-1-6-1": [
    {
      change: "找出输入的真实增量，令 k=−3h",
      text: "导数定义要求分母与自变量的位移完全一致。这里自变量从 2 变到 2−3h，真实位移是 −3h，所以设 k=−3h，当 h→0 时 k→0。",
      formula: math`\begin{gathered}
        k=-3h,\quad h=-\frac{k}{3}\\[4pt]
        h\to 0\iff k\to 0
      \end{gathered}`,
    },
    {
      change: "把分母换成 k 并提出常数因子",
      text: "把 h=−k/3 代入分母，除以 −k/3 相当于乘上 −3 再除以 k；常数 −3 可以提到极限符号前面。",
      formula: math`\begin{gathered}
        \lim_{h\to 0}\frac{f(2-3h)-f(2)}{h}\\[4pt]
        =-3\lim_{k\to 0}\frac{f(2+k)-f(2)}{k}
      \end{gathered}`,
    },
    {
      change: "识别 f′(2) 的定义并写出结论",
      text: "已知 f 在 2 处可导，后面这个标准差商极限正好等于 f′(2)。请乘上前面的常数并对照参考解答。",
      formula: math`-3\cdot\lim_{k\to 0}\frac{f(2+k)-f(2)}{k}=\;?`,
    },
  ],

  "jc935-2-1-6-2": [
    {
      change: "利用 f(−2)=0 在分子补出增量",
      text: "导数定义的分子是两点函数值之差。因为题目给了 f(−2)=0，可以在分子里白减一个 f(−2) 而不改变原式。",
      formula: math`\begin{gathered}
        f(-2)=0\\[4pt]
        \lim_{x\to -2}\frac{f(x)}{x+2}
        =\lim_{x\to -2}\frac{f(x)-f(-2)}{x+2}
      \end{gathered}`,
    },
    {
      change: "把分母改写成 x−(−2)",
      text: "把 x+2 写成 x−(−2)，这样分母就显式表示成自变量到定点 −2 的有向距离。",
      formula: math`\lim_{x\to -2}\frac{f(x)-f(-2)}{x-(-2)}`,
    },
    {
      change: "对照导数定义写出结果",
      text: "分子是 f(x)−f(x₀)，分母是 x−x₀，且 x→x₀（这里 x₀=−2）。因为 f 在 −2 处可导，请直接写出对应的导数记号并对照参考解答。",
      formula: math`\lim_{x\to x_0}\frac{f(x)-f(x_0)}{x-x_0}=f'(x_0),\quad x_0=-2`,
    },
  ],

  "jc935-2-1-6-3": [
    {
      change: "分子加减 f(1)，拆成两项增量",
      text: "分子里同时出现了 1+2h 和 1−2h，缺少基准点 f(1)。在分子里先减一个 f(1) 再加一个 f(1)，把原差商拆成两部分。",
      formula: math`\begin{gathered}
        \frac{f(1+2h)-f(1-2h)}{h}\\[4pt]
        =\frac{f(1+2h)-f(1)}{h}
        -\frac{f(1-2h)-f(1)}{h}
      \end{gathered}`,
    },
    {
      change: "给两项各自配上真实位移",
      text: "第一项位移是 2h，给分母配 2h 外面乘 2；第二项位移是 −2h，把减号并进分母凑成 −2h，外面同样补 2。",
      formula: math`\begin{gathered}
        2\cdot\frac{f(1+2h)-f(1)}{2h}\\[4pt]
        +\;2\cdot\frac{f(1-2h)-f(1)}{-2h}
      \end{gathered}`,
    },
    {
      change: "分别取极限并合并两项",
      text: "因为 f 在 1 处可导，当 h→0 时 2h→0 且 −2h→0，两个标准差商都趋于 f′(1)。请把两项相加写出最终结果并对照参考解答。",
      formula: math`2f'(1)+2f'(1)=\;?`,
    },
  ],

  "jc935-2-1-7": [
    {
      change: "先由含等号的左段算出 f(2)",
      text: "写分段函数在接缝点 x=2 的左右导数时，无论从哪边逼近，分子都要减去实际的 f(2)。由 x≤2 这一段算出 f(2)。",
      formula: math`f(2)=\frac{2^2}{2}=2`,
    },
    {
      change: "写出并化简 x→2⁻ 的左差商",
      text: "当 x<2 时用左段 x²/2，分子 x²/2 − 2 = (x²−4)/2 = (x−2)(x+2)/2。因 x≠2，约去 x−2 后得到连续表达式。",
      formula: math`\begin{gathered}
        f'_-(2)=\lim_{x\to 2^-}\frac{x^2/2-2}{x-2}\\[4pt]
        =\lim_{x\to 2^-}\frac{x+2}{2}
      \end{gathered}`,
    },
    {
      change: "写出并拆分 x→2⁺ 的右差商",
      text: "当 x>2 时用右段 x+3，但减去的仍是 f(2)=2，不是右极限 5！分子 (x+3)−2 = (x−2)+3，拆成两项看趋势。",
      formula: math`\begin{gathered}
        \frac{f(x)-f(2)}{x-2}
        =\frac{(x+3)-2}{x-2}\\[4pt]
        =1+\frac{3}{x-2}\quad(x>2)
      \end{gathered}`,
    },
    {
      change: "分别判断两侧极限并写出结论",
      text: "左侧直接代入 x=2 可算出有限值；右侧当 x→2⁺ 时 x−2→0⁺，故 3/(x−2)→+∞。请据此写出左右导数的最终判断并对照参考解答。",
      formula: math`\begin{gathered}
        f'_-(2)=\frac{2+2}{2}=\;?\\[4pt]
        \lim_{x\to 2^+}\left(1+\frac{3}{x-2}\right)=+\infty
      \end{gathered}`,
    },
  ],

  "jc935-2-1-8": [
    {
      change: "写出 F 在 0 处的差商并拆分",
      text: "先算 F(0)=f(0)(1+0)=f(0)。把 F(x) 展开成 f(x)+f(x)|sin 2x|，于是差商自然拆成 f 的差商与含绝对值的第二项。",
      formula: math`\begin{gathered}
        \frac{F(x)-F(0)}{x}\\[4pt]
        =\frac{f(x)-f(0)}{x}+f(x)\cdot\frac{|\sin 2x|}{x}
      \end{gathered}`,
    },
    {
      change: "分别求 |sin 2x|/x 的左右极限",
      text: "在 0 的充分小邻域内，x>0 时 sin 2x > 0，绝对值直接去掉；x<0 时 sin 2x < 0，去绝对值添负号。再用 sin(2x)/(2x)→1 求两侧极限。",
      formula: math`\begin{gathered}
        \lim_{x\to 0^+}\frac{|\sin 2x|}{x}
        =\lim_{x\to 0^+}\frac{\sin 2x}{x}=2\\[4pt]
        \lim_{x\to 0^-}\frac{|\sin 2x|}{x}
        =\lim_{x\to 0^-}\frac{-\sin 2x}{x}=-2
      \end{gathered}`,
    },
    {
      change: "写出 F 在 0 处的左右导数",
      text: "已知 f 在 0 处可导，所以 f 在 0 处也连续，即 f(x)→f(0)，且第一项差商趋于 f′(0)。代入上一步结果，写出左右导数。",
      formula: math`\begin{gathered}
        F'_+(0)=f'(0)+2f(0)\\[4pt]
        F'_-(0)=f'(0)-2f(0)
      \end{gathered}`,
    },
    {
      change: "令左右导数相等并总结充要条件",
      text: "F 在 0 处可导当且仅当左右导数存在且相等。请解方程 f′(0)+2f(0)=f′(0)−2f(0)，得出关于 f(0) 的充要条件并对照参考解答。",
      formula: math`\begin{gathered}
        F'_+(0)=F'_-(0)\\[4pt]
        \iff 2f(0)=-2f(0)\iff \;?
      \end{gathered}`,
    },
  ],

  "jc935-2-1-9-1": [
    {
      change: "把常数因子 3 提到求导外",
      text: "函数在全体实数上都有定义。利用数乘求导法则 (c·u)′ = c·u′，先把常数 3 留在外面。",
      formula: math`y'=3\cdot(x^5)'`,
    },
    {
      change: "对 x⁵ 套用幂函数求导公式",
      text: "按公式 (xⁿ)′ = n xⁿ⁻¹，把原指数 5 乘到前面，同时把指数减 1。",
      formula: math`y'=3\cdot 5x^{5-1}`,
    },
    {
      change: "化简系数与指数并写出结论",
      text: "把前面的 3×5 和指数 5−1 算清楚，即可得到定义域 R 上的导数，请写出结果并对照参考解答。",
      formula: math`y'=(3\times 5)\,x^{5-1}=\;?`,
    },
  ],

  "jc935-2-1-9-2": [
    {
      change: "令 u=∛x，统一覆盖正负实数",
      text: "实立方根对全体实数都有定义。记 u=∛x（即 u³=x），那么原函数写成 y=u⁴，可以同时处理 x>0 和 x<0，避免分数指数对负数产生歧义。",
      formula: math`\begin{gathered}
        u=\sqrt[3]{x}\iff u^3=x\\[4pt]
        y=u^4
      \end{gathered}`,
    },
    {
      change: "在 x≠0 处用链式法则求导",
      text: "当 x≠0 时 u≠0，由反函数或幂函数法则得 u′=1/(3u²)。对 y=u⁴ 用链式法则求导并约去 u²。",
      formula: math`\begin{gathered}
        u'=\frac{1}{3u^2}\quad(x\ne 0)\\[4pt]
        y'=4u^3\cdot\frac{1}{3u^2}=\frac{4}{3}u
      \end{gathered}`,
    },
    {
      change: "回到差商单独检查原点 x=0",
      text: "x=0 时 u′ 的分母为 0，不能套用上一步的公式，必须用导数定义直接算 [y(x)−y(0)]/x。",
      formula: math`\begin{gathered}
        \lim_{x\to 0}\frac{\sqrt[3]{x^4}-0}{x}
        =\lim_{x\to 0}\frac{u^4}{u^3}\\[4pt]
        =\lim_{x\to 0}\sqrt[3]{x}
      \end{gathered}`,
    },
    {
      change: "代回 ∛x 并合并原点结论",
      text: "请把 u=∛x 代回 x≠0 的导数，再算出原点差商的极限，看看公式在 x=0 处是否也刚好成立，并对照参考解答。",
      formula: math`\begin{gathered}
        x\ne 0:\;y'=\frac{4}{3}\sqrt[3]{x}\\[4pt]
        y'(0)=\lim_{x\to 0}\sqrt[3]{x}=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-1-9-3": [
    {
      change: "在 x>0 上套用幂函数求导公式",
      text: "题目限定 x>0，可以直接使用一般实指数的幂函数求导公式 (xᵃ)′ = a xᵃ⁻¹，这里 a=7/5。",
      formula: math`y'=\frac{7}{5}x^{\frac{7}{5}-1}`,
    },
    {
      change: "把指数里的 1 通分成 5/5",
      text: "注意是整个分数指数减 1，不是分子分母同时减 1。把 1 改写成 5/5 再与 7/5 相减。",
      formula: math`\frac{7}{5}-1=\frac{7}{5}-\frac{5}{5}=\;?`,
    },
    {
      change: "写出化简后的导数表达式",
      text: "把算好的新指数填回系数 7/5 的右侧，写明 x>0 时的导数结果并对照参考解答。",
      formula: math`y'=\frac{7}{5}x^{\;?},\quad x>0`,
    },
  ],

  "jc935-2-1-9-4": [
    {
      change: "先确定定义域 x>0",
      text: "偶次根号要求被开方数 x≥0，又因为 √x 在分母上不能等于 0，所以原函数定义域为 x>0。",
      formula: math`\sqrt{x}>0\implies x>0`,
    },
    {
      change: "把分母的根号写成负分数指数",
      text: "在 x>0 时，1/√x 就是 x 的 −1/2 次幂，改写后就可以直接套用幂函数求导公式。",
      formula: math`y=\frac{2}{\sqrt{x}}=2x^{-1/2}`,
    },
    {
      change: "套用幂函数求导公式并化简",
      text: "把原指数 −1/2 乘到系数 2 前面，指数减 1 变成 −1/2−1。请算出最终系数与指数，并注明定义域 x>0，再对照参考解答。",
      formula: math`\begin{gathered}
        y'=2\cdot\left(-\frac{1}{2}\right)x^{-\frac{1}{2}-1}\\[4pt]
        =\;?,\quad x>0
      \end{gathered}`,
    },
  ],

  "jc935-2-1-9-5": [
    {
      change: "注明 x≠0 并改写成负指数幂",
      text: "分母 x³ 不能为 0，所以定义域是 x≠0。把 1/x³ 写成 x⁻³，方便用幂函数求导公式。",
      formula: math`y=\frac{5}{x^3}=5x^{-3}\quad(x\ne 0)`,
    },
    {
      change: "套用幂函数求导公式",
      text: "把原指数 −3 乘到 5 前面，同时把指数再减 1（注意负指数减 1 会变得更负，是 −3−1）。",
      formula: math`y'=5\cdot(-3)x^{-3-1}`,
    },
    {
      change: "算清系数指数并改回分式",
      text: "算出 5×(−3) 与新指数 −3−1，再把负指数放回分母并保留定义域 x≠0，最后对照参考解答。",
      formula: math`y'=-15\,x^{\;?},\quad x\ne 0`,
    },
  ],

  "jc935-2-1-9-6": [
    {
      change: "令 u=⁵√x，合并成单一幂",
      text: "实五次根对全体实数都有定义。记 u=⁵√x（即 x=u⁵），把 x² 和 ⁵√(x³) 都写成 u 的整数次幂再相乘。",
      formula: math`\begin{gathered}
        u=\sqrt[5]{x}\iff x=u^5\\[4pt]
        y=(u^5)^2\cdot u^3=u^{13}
      \end{gathered}`,
    },
    {
      change: "在 x≠0 处用链式法则求导",
      text: "当 x≠0 时 u≠0，由 u⁵=x 得 u′=1/(5u⁴)。对 y=u¹³ 用链式法则求导，再约去 u⁴。",
      formula: math`\begin{gathered}
        u'=\frac{1}{5u^4}\quad(x\ne 0)\\[4pt]
        y'=13u^{12}\cdot\frac{1}{5u^4}=\frac{13}{5}u^8
      \end{gathered}`,
    },
    {
      change: "用差商定义单独检查原点 x=0",
      text: "原点处不能除以 u⁴，必须回到定义。把 y=u¹³、x=u⁵ 代入原点差商并约去 u⁵。",
      formula: math`\begin{gathered}
        \lim_{x\to 0}\frac{y(x)-y(0)}{x}
        =\lim_{x\to 0}\frac{u^{13}}{u^5}\\[4pt]
        =\lim_{x\to 0}u^8
      \end{gathered}`,
    },
    {
      change: "代回 ⁵√x 并写出完整结论",
      text: "把 u=⁵√x 代回 x≠0 的导数，再算出原点差商极限（当 x→0 时 u→0），确认两处结论一致并对照参考解答。",
      formula: math`\begin{gathered}
        x\ne 0:\;y'=\frac{13}{5}\sqrt[5]{x^8}\\[4pt]
        y'(0)=\lim_{x\to 0}\sqrt[5]{x^8}=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-1-9-7": [
    {
      change: "核对定义域并全改成 x 的幂",
      text: "分母有偶次根号 √(x⁵) 且分母不能为 0，所以必须满足 x>0。在 x>0 下把立方根和平方根都改成分数指数。",
      formula: math`\begin{gathered}
        x>0\\[4pt]
        y=\frac{x^3\cdot x^{1/3}}{x^{5/2}}
      \end{gathered}`,
    },
    {
      change: "用同底数幂法则合并总指数",
      text: "同底数幂相乘指数相加、相除指数相减。把 3、1/3、−5/2 通分到分母 6 上合成一个指数。",
      formula: math`\begin{gathered}
        3+\frac{1}{3}-\frac{5}{2}
        =\frac{18+2-15}{6}=\frac{5}{6}\\[4pt]
        y=x^{5/6}\quad(x>0)
      \end{gathered}`,
    },
    {
      change: "对单个幂求导并保留 x>0",
      text: "对化简后的 y=x⁵ᐟ⁶ 套用幂函数求导公式，算出新指数 5/6−1，别忘了保留定义域 x>0，再对照参考解答。",
      formula: math`y'=\frac{5}{6}x^{\frac{5}{6}-1}=\;?,\quad x>0`,
    },
  ],

  "jc935-2-1-10": [
    {
      change: "明确瞬时速度是位移的导数",
      text: "题目求的是 t=3 秒这一瞬间的速度，不是平均速度 s(3)/3，所以要先求位移函数 s(t) 的导数 v(t)=s′(t)。",
      formula: math`v(t)=s'(t),\quad s(t)=2t^3-t`,
    },
    {
      change: "逐项求导得到速度函数",
      text: "利用幂函数与线性求导法则：2t³ 的导数是 6t²，−t 的导数是 −1。",
      formula: math`v(t)=2\cdot 3t^2-1=6t^2-1`,
    },
    {
      change: "代入 t=3 并写出带单位的结果",
      text: "把 t=3 代入速度函数 v(t)，算出数值并写上单位 m/s，再对照参考解答。",
      formula: math`v(3)=6\cdot 3^2-1=\;?`,
    },
  ],

  "jc935-2-1-11-1": [
    {
      change: "写出 f′(−x) 的差商定义",
      text: "要证明 f′ 是偶函数，就要验证 f′(−x)=f′(x)。先从定义出发写出 f′(−x) 的差商极限。",
      formula: math`f'(-x)=\lim_{h\to 0}\frac{f(-x+h)-f(-x)}{h}`,
    },
    {
      change: "利用奇函数性质把变量换回 x 附近",
      text: "把 −x+h 写成 −(x−h)，再用奇性 f(−u)=−f(u) 把分子两项都转到 x 附近，提出共同的负号。",
      formula: math`\begin{gathered}
        f(-x+h)-f(-x)\\[4pt]
        =f(-(x-h))-f(-x)\\[4pt]
        =-f(x-h)+f(x)=-[f(x-h)-f(x)]
      \end{gathered}`,
    },
    {
      change: "把负号移到分母并令 k=−h",
      text: "把分子的负号放进分母，分母变成 −h。令 k=−h，当 h→0 时 k→0，差商立刻变成标准形式。",
      formula: math`\begin{gathered}
        k=-h\to 0\\[4pt]
        f'(-x)=\lim_{k\to 0}\frac{f(x+k)-f(x)}{k}
      \end{gathered}`,
    },
    {
      change: "认出 f′(x) 并写出证明结论",
      text: "因为 f 在该对称开区间内可导，上式右端正是 f′(x)。请据此写出 f′(−x) 与 f′(x) 的关系，说明 f′ 是偶函数并对照参考解答。",
      formula: math`f'(-x)=\lim_{k\to 0}\frac{f(x+k)-f(x)}{k}=\;?`,
    },
  ],

  "jc935-2-1-11-2": [
    {
      change: "写出 g′(−x) 的差商定义",
      text: "要证明 g′ 是奇函数，需要证明 g′(−x)=−g′(x)。先从导数定义写出 g′(−x)。",
      formula: math`g'(-x)=\lim_{h\to 0}\frac{g(-x+h)-g(-x)}{h}`,
    },
    {
      change: "用偶函数性质把分子换到 x 附近",
      text: "把 −x+h 写成 −(x−h)，由偶性 g(−u)=g(u) 直接去掉括号里的负号，分子变成 g(x−h)−g(x)。",
      formula: math`\begin{gathered}
        g(-x+h)-g(-x)\\[4pt]
        =g(-(x-h))-g(-x)=g(x-h)-g(x)
      \end{gathered}`,
    },
    {
      change: "令 k=−h，注意分母变成 −k",
      text: "令 k=−h，则 h=−k，且 h→0 时 k→0。把分母的负号提到极限外面。",
      formula: math`\begin{gathered}
        k=-h\to 0\\[4pt]
        g'(-x)=-\lim_{k\to 0}\frac{g(x+k)-g(x)}{k}
      \end{gathered}`,
    },
    {
      change: "认出 −g′(x) 并完成奇性证明",
      text: "因为 g 在该对称开区间内可导，极限部分等于 g′(x)。请写出 g′(−x) 的最终表达式，说明 g′ 是奇函数并对照参考解答。",
      formula: math`g'(-x)=-\lim_{k\to 0}\frac{g(x+k)-g(x)}{k}=\;?`,
    },
  ],

  "jc935-2-1-11-3": [
    {
      change: "写出原点差商 Q(h) 并比较 Q(−h)",
      text: "题目只保证 g 在 0 处可导，不能直接套用整个区间上的导函数奇偶性，必须回到原点差商 Q(h)。利用偶性 g(−h)=g(h) 计算 Q(−h)。",
      formula: math`\begin{gathered}
        Q(h)=\frac{g(h)-g(0)}{h}\\[4pt]
        Q(-h)=\frac{g(-h)-g(0)}{-h}=-Q(h)
      \end{gathered}`,
    },
    {
      change: "令 h→0 得到关于 g′(0) 的方程",
      text: "因为 g 在 0 处可导，当 h→0 时 −h→0，于是 Q(h) 和 Q(−h) 都趋于同一个有限数 g′(0)。对 Q(−h)=−Q(h) 两边取极限。",
      formula: math`\begin{gathered}
        \lim_{h\to 0}Q(-h)=\lim_{h\to 0}\bigl(-Q(h)\bigr)\\[4pt]
        \implies g'(0)=-g'(0)
      \end{gathered}`,
    },
    {
      change: "解出 g′(0) 并构造原点尖角反例",
      text: "从 g′(0)=−g′(0) 立即解出 g′(0)。再举一个轴对称但在原点折出尖角的偶函数（如 g(x)=2|x|），算出它在原点的左右导数以完成反例说明，最后对照参考解答。",
      formula: math`\begin{gathered}
        g'(0)=-g'(0)\implies g'(0)=\;?\\[4pt]
        \text{反例：}g(x)=2|x|,\;\frac{2|h|}{h}=\pm 2
      \end{gathered}`,
    },
  ],

  "jc935-2-1-12-1": [
    {
      change: "对 y=2cos x 求导得斜率函数",
      text: "切线斜率由导数给出，不是函数值。记住 (cos x)′ = −sin x，别丢掉负号。",
      formula: math`y'=(2\cos x)'=-2\sin x`,
    },
    {
      change: "代入 x=π/6 并写出 sin(π/6)",
      text: "把指定横坐标 x=π/6 代入导数表达式，利用特殊角正弦值 sin(π/6)=1/2。",
      formula: math`k=-2\sin\frac{\pi}{6}=-2\cdot\frac{1}{2}`,
    },
    {
      change: "算出切线斜率并写出结论",
      text: "完成最后一步乘法运算，保留负号，写出该处的切线斜率并对照参考解答。",
      formula: math`k=-2\cdot\frac{1}{2}=\;?`,
    },
  ],

  "jc935-2-1-12-2": [
    {
      change: "写出导函数 y′=−2sin x",
      text: "与上一问同一条曲线，先写出切线斜率公式 y′=−2sin x。",
      formula: math`y'=-2\sin x`,
    },
    {
      change: "确定 x=3π/2 处的正弦值",
      text: "在单位圆上，3π/2 位于纵轴负半轴，所以该点的正弦值是 −1（余弦才是 0）。",
      formula: math`\sin\frac{3\pi}{2}=-1`,
    },
    {
      change: "代入导数并注意负负得正",
      text: "把 sin(3π/2)=−1 代入 y′=−2sin x，两个负号相乘得正数。请算出结果并对照参考解答。",
      formula: math`k=-2\cdot(-1)=\;?`,
    },
  ],

  "jc935-2-1-13": [
    {
      change: "求导并代入 x=π 得切线斜率",
      text: "先对 y=3sin x 求导得 y′=3cos x，再代入点 P(π,0) 的横坐标 x=π，利用 cos π = −1 算出切线斜率。",
      formula: math`\begin{gathered}
        y'=3\cos x\\[4pt]
        k_{\text{切}}=3\cos\pi=-3
      \end{gathered}`,
    },
    {
      change: "由垂直关系求法线斜率",
      text: "法线与切线互相垂直，且切线斜率不为 0，满足 k_切 · k_法 = −1，所以法线斜率是切线斜率的负倒数。",
      formula: math`k_{\text{法}}=-\frac{1}{k_{\text{切}}}=\frac{1}{3}`,
    },
    {
      change: "用点斜式写出切线与法线方程",
      text: "切线和法线都经过点 P(π,0)。把 (x₀,y₀)=(π,0) 与两个斜率分别代入 y−y₀=k(x−x₀)，写出两条直线方程并对照参考解答。",
      formula: math`\begin{gathered}
        \text{切线：}y-0=(-3)(x-\pi)\\[4pt]
        \text{法线：}y-0=\frac{1}{3}(x-\pi)
      \end{gathered}`,
    },
  ],

  "jc935-2-1-14": [
    {
      change: "先算 x=0 处的切点坐标",
      text: "写切线方程需要切点和斜率。把 x=0 代入原函数 y=2e²ˣ，利用 e⁰=1 算出纵坐标。",
      formula: math`\begin{gathered}
        y(0)=2e^{2\cdot 0}=2\\[4pt]
        \text{切点为 }(0,2)
      \end{gathered}`,
    },
    {
      change: "用链式法则求导并算 x=0 斜率",
      text: "对 e²ˣ 求导时，除了照抄 e²ˣ，还要乘上内层指数 2x 的导数 2。再代入 x=0 得到切线斜率。",
      formula: math`\begin{gathered}
        y'=2\cdot e^{2x}\cdot 2=4e^{2x}\\[4pt]
        k=y'(0)=4e^0=4
      \end{gathered}`,
    },
    {
      change: "代入点斜式并整理切线方程",
      text: "把切点 (0,2) 和斜率 k=4 代入点斜式 y−y₀=k(x−x₀)，整理成 y=kx+b 的形式并对照参考解答。",
      formula: math`y-2=4(x-0)\implies y=\;?`,
    },
  ],

  "jc935-2-1-15": [
    {
      change: "算出割线两端点与割线斜率",
      text: "把 x=−1 和 x=5 代入抛物线 y=2x²+1，得到两点 (−1,3) 和 (5,51)，再用两点斜率公式求割线斜率。",
      formula: math`\begin{gathered}
        y(-1)=3,\quad y(5)=51\\[4pt]
        k_{\text{割}}=\frac{51-3}{5-(-1)}=\frac{48}{6}=8
      \end{gathered}`,
    },
    {
      change: "令切线斜率等于割线斜率求 x",
      text: "两直线平行说明斜率相等。对 y=2x²+1 求导得切线斜率 y′=4x，令它等于割线斜率 8 解出横坐标 x。",
      formula: math`\begin{gathered}
        y'=4x\\[4pt]
        4x=8\implies x=2
      \end{gathered}`,
    },
    {
      change: "代回原曲线求纵坐标并写出切点",
      text: "切点必须在原抛物线上。把 x=2 代回 y=2x²+1 算出纵坐标，写出完整的点坐标 P 并对照参考解答。",
      formula: math`\begin{gathered}
        y(2)=2\cdot 2^2+1=\;?\\[4pt]
        P=(2,\;?)
      \end{gathered}`,
    },
  ],

  "jc935-2-1-16-1": [
    {
      change: "先判断 x=0 处的连续性",
      text: "先算函数值 f(0)=|sin 0|=0。因为 sin 3x 与绝对值函数都连续，当 x→0 时 |sin 3x|→0=f(0)，所以函数在 0 处连续。",
      formula: math`\lim_{x\to 0}|\sin 3x|=0=f(0)`,
    },
    {
      change: "按 x 的正负拆开绝对值写左右差商",
      text: "在 0 的充分小邻域（如 |3x|<π）内，x>0 时 sin 3x > 0，x<0 时 sin 3x < 0。分别写出右差商和左差商。",
      formula: math`\begin{gathered}
        x>0:\;\frac{f(x)-f(0)}{x}=\frac{\sin 3x}{x}\\[4pt]
        x<0:\;\frac{f(x)-f(0)}{x}=\frac{-\sin 3x}{x}
      \end{gathered}`,
    },
    {
      change: "求左右导数并判断双侧可导性",
      text: "把 sin(3x)/x 写成 3·[sin(3x)/(3x)]，由第一重要极限得两侧极限分别是 3 和 −3。比较这两个值并写出是否可导的结论，再对照参考解答。",
      formula: math`\begin{gathered}
        f'_+(0)=3\lim_{x\to 0^+}\frac{\sin 3x}{3x}=\;?\\[4pt]
        f'_-(0)=-3\lim_{x\to 0^-}\frac{\sin 3x}{3x}=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-1-16-2": [
    {
      change: "用 |cos(2/x)|≤1 估计函数证连续",
      text: "虽然 cos(2/x) 在 0 附近剧烈振荡，但绝对值总不超过 1。于是 x≠0 时 0≤|f(x)|≤|x|³，由夹逼准则得 f(x)→0=f(0)，故连续。",
      formula: math`\begin{gathered}
        0\le\left|x^3\cos\frac{2}{x}\right|\le |x|^3\\[4pt]
        \implies \lim_{x\to 0}f(x)=0=f(0)
      \end{gathered}`,
    },
    {
      change: "写出 x=0 处的差商并约去 x",
      text: "因为 f(0)=0，且取极限时 x≠0，把 f(x)=x³cos(2/x) 代入差商并约去一个 x。",
      formula: math`\begin{gathered}
        \frac{f(x)-f(0)}{x}
        =\frac{x^3\cos(2/x)}{x}\\[4pt]
        =x^2\cos\frac{2}{x}\quad(x\ne 0)
      \end{gathered}`,
    },
    {
      change: "再次用 |cos(2/x)|≤1 放缩差商",
      text: "差商外面还留着 x²，再次利用 |cos(2/x)|≤1 把差商的绝对值夹在 0 和 x² 之间。",
      formula: math`0\le\left|x^2\cos\frac{2}{x}\right|\le x^2`,
    },
    {
      change: "由夹逼准则写出连续与可导结论",
      text: "当 x→0 时 x²→0，由夹逼准则可确定差商的极限。请写出 f 在 0 处是否连续、是否可导以及 f′(0) 的值，再对照参考解答。",
      formula: math`\lim_{x\to 0}x^2=0\implies f'(0)=\;?`,
    },
  ],

  "jc935-2-1-17": [
    {
      change: "由连续性建立第一个方程",
      text: "光滑拼接首先要接上。由左段（含等号）得 f(2)=2³/2=4，右极限是 2a+b，连续要求它们相等。",
      formula: math`\begin{gathered}
        f(2)=\frac{2^3}{2}=4\\[4pt]
        \lim_{x\to 2^+}(ax+b)=2a+b=4
      \end{gathered}`,
    },
    {
      change: "分别求 x=2 处的左导数与右导数",
      text: "左段是多项式 x³/2，左导数为 (3/2)x² 在 x=2 处的值；在已满足 2a+b=4 的前提下，右差商 (ax+b−4)/(x−2)=a(x−2)/(x−2)=a。",
      formula: math`\begin{gathered}
        f'_-(2)=\left.\frac{3}{2}x^2\right|_{x=2}=6\\[4pt]
        f'_+(2)=\lim_{x\to 2^+}\frac{ax+b-(2a+b)}{x-2}=a
      \end{gathered}`,
    },
    {
      change: "令左右导数相等并回代求 b",
      text: "可导要求 f′₊(2)=f′₋(2)，由此立刻定出 a，再代回连续方程 2a+b=4 算出 b。请写出 a、b 的值并对照参考解答。",
      formula: math`\begin{gathered}
        a=6\\[4pt]
        2\cdot 6+b=4\implies b=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-1-18": [
    {
      change: "由右段（含等号）算出 f(1)",
      text: "写左右差商前先看分段条件：x≥1 这一段包含 x=1，把 x=1 代入 (x−1)² 得 f(1)=0。",
      formula: math`f(1)=(1-1)^2=0`,
    },
    {
      change: "写出并化简 x→1⁻ 的左差商",
      text: "当 x<1 时用左段 −2(x−1)，扣除 f(1)=0 后除以 x−1；因 x≠1，直接约去 x−1。",
      formula: math`\begin{gathered}
        \frac{f(x)-f(1)}{x-1}
        =\frac{-2(x-1)-0}{x-1}\\[4pt]
        =-2\quad(x<1)
      \end{gathered}`,
    },
    {
      change: "写出并化简 x→1⁺ 的右差商",
      text: "当 x>1 时用右段 (x−1)²，扣除 f(1)=0 后除以 x−1，约去一份 x−1。",
      formula: math`\begin{gathered}
        \frac{f(x)-f(1)}{x-1}
        =\frac{(x-1)^2-0}{x-1}\\[4pt]
        =x-1\quad(x>1)
      \end{gathered}`,
    },
    {
      change: "求两侧极限并判断双侧导数",
      text: "分别令 x→1⁻ 和 x→1⁺ 算出左右导数，比较两者是否相等，再给出双侧导数是否存在的结论并对照参考解答。",
      formula: math`\begin{gathered}
        f'_-(1)=\lim_{x\to 1^-}(-2)=\;?\\[4pt]
        f'_+(1)=\lim_{x\to 1^+}(x-1)=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-1-19": [
    {
      change: "先对 x<0 和 x>0 两段内部求导",
      text: "在不含接缝点的开区间 (−∞,0) 和 (0,+∞) 上，直接套用基本求导法则即可，接缝点 x=0 留到下一步单独查。",
      formula: math`\begin{gathered}
        x<0:\;f'(x)=3\cos(3x)\\[4pt]
        x>0:\;f'(x)=3+2x
      \end{gathered}`,
    },
    {
      change: "计算 x=0 处的左差商极限",
      text: "由右段知 f(0)=0。当 x<0 时用左段 sin(3x)，配成 3·[sin(3x)/(3x)]，由第一重要极限算出左导数。",
      formula: math`\begin{gathered}
        f(0)=0\\[4pt]
        f'_-(0)=\lim_{x\to 0^-}\frac{\sin(3x)}{x}
        =3\lim_{x\to 0^-}\frac{\sin(3x)}{3x}=3
      \end{gathered}`,
    },
    {
      change: "计算 x=0 处的右差商极限",
      text: "当 x>0 时用右段 3x+x²，除以 x（x≠0）约去公因子 x 后再令 x→0⁺。",
      formula: math`\begin{gathered}
        f'_+(0)=\lim_{x\to 0^+}\frac{3x+x^2}{x}\\[4pt]
        =\lim_{x\to 0^+}(3+x)=3
      \end{gathered}`,
    },
    {
      change: "合并 x=0 处的导数写出分段结果",
      text: "左导数与右导数都等于 3，所以 f′(0)=3 存在。注意到 3+2x（以及 3cos(3x)）在 x=0 处也等于 3，请把 x=0 并入分段表达式并对照参考解答。",
      formula: math`\begin{gathered}
        f'_-(0)=f'_+(0)=3\implies f'(0)=3\\[4pt]
        \text{写出全体实数上的分段 }f'(x)
      \end{gathered}`,
    },
  ],

  "jc935-2-1-20": [
    {
      change: "写成 y=12/x 并求切点处斜率",
      text: "在 a≠0 的任意切点附近，双曲线可写成显函数 y=12x⁻¹。求导后代入 x=a 得到切线斜率。",
      formula: math`\begin{gathered}
        y=\frac{12}{x}\implies y'=-\frac{12}{x^2}\\[4pt]
        k=y'(a)=-\frac{12}{a^2}
      \end{gathered}`,
    },
    {
      change: "用点斜式写出切线方程",
      text: "把切点 P(a, 12/a) 与斜率 k=−12/a² 代入点斜式，展开右边整理一下，方便求截距。",
      formula: math`\begin{gathered}
        y-\frac{12}{a}=-\frac{12}{a^2}(x-a)\\[4pt]
        y=-\frac{12}{a^2}x+\frac{24}{a}
      \end{gathered}`,
    },
    {
      change: "求切线的纵截距与横截距",
      text: "令 x=0 立刻得纵截距 24/a；令 y=0 解方程 (12/a²)x = 24/a 得横截距 2a。",
      formula: math`\begin{gathered}
        x=0\implies y_{\text{截}}=\frac{24}{a}\\[4pt]
        y=0\implies x_{\text{截}}=2a
      \end{gathered}`,
    },
    {
      change: "取截距绝对值代入三角形面积公式",
      text: "当 a<0（第三象限）时截距为负，直角边长必须取绝对值。把两条边长代入 S=(1/2)|x_截|·|y_截|，约去 |a| 得出恒定面积并对照参考解答。",
      formula: math`\begin{gathered}
        S=\frac{1}{2}\,|2a|\cdot\left|\frac{24}{a}\right|\\[4pt]
        =\frac{1}{2}\cdot 2|a|\cdot\frac{24}{|a|}=\;?
      \end{gathered}`,
    },
  ],
};

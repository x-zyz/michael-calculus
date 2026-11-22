import type { GuidedHint } from "../learning";

const math = String.raw;

export const ch2ReviewGuidedHints: Record<string, GuidedHint[]> = {
  "jc935-2-review-1-1": [
    {
      change: "把函数增量写成差商乘增量",
      text: "当 x ≠ a 时，分子分母同乘并除以 x−a 是合法的恒等变形，这样就能把差商 [g(x)−g(a)]/(x−a) 显露出来。",
      formula: math`\begin{gathered}
        g(x)-g(a)\\[4pt]
        =\frac{g(x)-g(a)}{x-a}\cdot(x-a)
      \end{gathered}`,
    },
    {
      change: "两边令 x 趋近 a 取极限",
      text: "若 g 在 a 处可导，则差商极限为有限数 g'(a)，而 x−a 趋近 0，乘积极限为 0，从而 lim_{x→a} g(x)=g(a)，即在 a 处连续。",
      formula: math`\begin{gathered}
        \lim_{x\to a}\bigl[g(x)-g(a)\bigr]\\[4pt]
        =g'(a)\cdot 0=0
      \end{gathered}`,
    },
    {
      change: "构造绝对值反例检验逆命题",
      text: "取 g(x)=|x−a|，它在 x=a 处满足 lim_{x→a} |x−a|=0=g(a) 故连续；但左差商恒为 −1、右差商恒为 1，左右导数不相等，不可导。",
      formula: math`\begin{gathered}
        g(x)=|x-a|\\[4pt]
        g'_-(a)=-1,\quad g'_+(a)=1
      \end{gathered}`,
    },
    {
      change: "汇总正反两向，定出条件名称",
      text: "正向“可导 ⇒ 连续”恒成立，反向“连续 ⇏ 可导”有反例。据此用“充分”“必要”写出两者的逻辑关系，再对照参考解答。",
      formula: math`\begin{gathered}
        \text{可导}\;\Longrightarrow\;\text{连续}\\[4pt]
        \text{连续}\;\not\Longrightarrow\;\text{可导}
      \end{gathered}`,
    },
  ],

  "jc935-2-review-1-2": [
    {
      change: "写出导数的双侧极限定义",
      text: "函数 g 在点 a 处可导，按定义就是差商 [g(x)−g(a)]/(x−a) 当 x→a 时的双侧极限存在且有限。",
      formula: math`g'(a)=\lim_{x\to a}\frac{g(x)-g(a)}{x-a}`,
    },
    {
      change: "写出左导数与右导数的定义",
      text: "左导数与右导数分别是同一差商在 x→a⁻ 和 x→a⁺ 时的单侧极限。",
      formula: math`\begin{gathered}
        g'_-(a)=\lim_{x\to a^-}\frac{g(x)-g(a)}{x-a}\\[6pt]
        g'_+(a)=\lim_{x\to a^+}\frac{g(x)-g(a)}{x-a}
      \end{gathered}`,
    },
    {
      change: "套用双侧极限存在充要定理",
      text: "由函数极限基本定理，双侧极限存在当且仅当左右极限都存在且相等。据此在“充分”“必要”“充分必要”中选择并写出结论。",
      formula: math`\begin{gathered}
        g'(a)\text{ 存在}\\[4pt]
        \Longleftrightarrow\;g'_-(a)=g'_+(a)\text{ 且有限}
      \end{gathered}`,
    },
  ],

  "jc935-2-review-1-3": [
    {
      change: "写出可微定义并两边除以 Δx",
      text: "若 h 在 c 处可微，则增量 Δh = AΔx + o(Δx)（Δx→0）。对 Δx ≠ 0 两边同除以 Δx，以便过渡到差商。",
      formula: math`\begin{gathered}
        \Delta h=A\Delta x+o(\Delta x)\\[4pt]
        \frac{\Delta h}{\Delta x}=A+\frac{o(\Delta x)}{\Delta x}
      \end{gathered}`,
    },
    {
      change: "令 Δx 趋近 0 证“可微推可导”",
      text: "因为 o(Δx)/Δx → 0，令 Δx→0 取极限即得 h'(c) 存在且等于常数 A。",
      formula: math`\lim_{\Delta x\to 0}\frac{\Delta h}{\Delta x}=A=h'(c)`,
    },
    {
      change: "由可导反推出可微展开式",
      text: "反之，若 h'(c) 存在，则由极限与无穷小的关系可写 Δh/Δx = h'(c)+α（α→0），两边同乘 Δx 即得线性主部加高阶无穷小。",
      formula: math`\begin{gathered}
        \frac{\Delta h}{\Delta x}=h'(c)+\alpha(\Delta x)\\[4pt]
        \Delta h=h'(c)\Delta x+o(\Delta x)
      \end{gathered}`,
    },
    {
      change: "汇总双向等价与系数关系",
      text: "双向推导均成立，且线性主部系数 A 与导数完全一致。据此写出最终条件名称及微分表达式，再核对参考解答。",
      formula: math`\begin{gathered}
        \text{可导}\;\Longleftrightarrow\;\text{可微}\\[4pt]
        A=h'(c),\quad \mathrm{d}h=A\,\mathrm{d}x
      \end{gathered}`,
    },
  ],

  "jc935-2-review-2": [
    {
      change: "先算出中心点函数值 f(1)",
      text: "把 x=1 代入连乘式，第一个因子 1−1=0，因此整串乘积直接等于 0。",
      formula: math`f(1)=(1-1)(1-2)\cdots(1-n)=0`,
    },
    {
      change: "写出差商并约去首因子 x−1",
      text: "求导数极限时 x→1 且 x ≠ 1，可以合法约去分子分母公因子 (x−1)，免去展开多项式的麻烦。",
      formula: math`\begin{gathered}
        f'(1)=\lim_{x\to 1}\frac{f(x)-f(1)}{x-1}\\[4pt]
        =\lim_{x\to 1}(x-2)(x-3)\cdots(x-n)
      \end{gathered}`,
    },
    {
      change: "把 x=1 代入连续多项式",
      text: "剩下的 n−1 个一次因子乘积是多项式，在 x=1 处连续，直接把 x 换成 1。",
      formula: math`\begin{gathered}
        f'(1)=(1-2)(1-3)\cdots(1-n)\\[4pt]
        =(-1)(-2)\cdots\bigl[-(n-1)\bigr]
      \end{gathered}`,
    },
    {
      change: "数清负号个数并整理阶乘",
      text: "从 −1 到 −(n−1) 一共有 n−1 个负因子，把每个负号提出来与正整数连乘分开，即可写出最简闭合式。",
      formula: math`\begin{gathered}
        (-1)^{n-1}\cdot 1\cdot 2\cdots(n-1)\\[4pt]
        =\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-review-3": [
    {
      change: "检查 (A) 中 1/t 的逼近方向",
      text: "令 u=1/t。当 t→−∞ 时 u 只能保持负号趋近 0（即 u→0⁻），因此 (A) 只能推出左导数 f'₋(b) 存在，无法保证右导数存在。",
      formula: math`\begin{gathered}
        t\to-\infty\;\Longrightarrow\;u=\frac{1}{t}\to 0^-\\[4pt]
        \text{(A) 仅得 }f'_-(b)
      \end{gathered}`,
    },
    {
      change: "用反例分别排除 (B) 与 (C)",
      text: "(B) 根本没用到 f(b)，把 b 点函数值改掉不影响极限；(C) 是对称差商，取尖点函数 |x−b| 时分子恒为 0 但该点不可导。",
      formula: math`\begin{gathered}
        \text{(B) 反例：}f(x)=1\,(x\neq b),\,f(b)=0\\[4pt]
        \text{(C) 反例：}f(x)=|x-b|
      \end{gathered}`,
    },
    {
      change: "对 (D) 作变量代换 u=−2h",
      text: "当 h 双侧趋于 0 时，u=−2h 既取正值也取负值，同样双侧趋于 0，且固定了中心点 f(b)。",
      formula: math`\begin{gathered}
        \text{令 }u=-2h\,(u\to 0)\\[4pt]
        \lim_{h\to 0}\frac{f(b-2h)-f(b)}{-2h}\\[4pt]
        =\lim_{u\to 0}\frac{f(b+u)-f(b)}{u}
      \end{gathered}`,
    },
    {
      change: "对照导数定义锁定正确选项",
      text: "经过代换后，只有一项完全还原出双侧导数定义 f'(b)。请据此写出最终选项并整理其余三项的反例理由。",
      formula: math`\lim_{u\to 0}\frac{f(b+u)-f(b)}{u}=f'(b)`,
    },
  ],

  "jc935-2-review-4": [
    {
      change: "写出小区间上的平均线密度",
      text: "区间 [x₀, x₀+Δx] 内的电荷增量是 Δq = q(x₀+Δx)−q(x₀)，除以小段长度 Δx 即为该段平均电荷线密度。",
      formula: math`\bar{\lambda}=\frac{q(x_0+\Delta x)-q(x_0)}{\Delta x}`,
    },
    {
      change: "令 Δx 趋近 0 得到瞬时线密度",
      text: "把区间长度 Δx 缩到 0，平均线密度的极限正是累计电荷量 q(x) 在 x₀ 处的导数。",
      formula: math`\begin{gathered}
        \lambda(x_0)=\lim_{\Delta x\to 0}\frac{\Delta q}{\Delta x}\\[4pt]
        =q'(x_0)=\left.\frac{\mathrm{d}q}{\mathrm{d}x}\right|_{x=x_0}
      \end{gathered}`,
    },
    {
      change: "对 q(x)=3x²+2x 逐项求导",
      text: "套用幂函数求导法则，(3x²)'=6x、(2x)'=2，得到任意位置 x 处的线密度函数。",
      formula: math`q'(x)=3\cdot 2x+2=6x+2`,
    },
    {
      change: "代入 x₀=4 算出数值并带单位",
      text: "把 x=4 代入 q'(x)=6x+2，算出最终数值并注明单位 C/m，再与参考解答核对。",
      formula: math`\lambda(4)=6\times 4+2=\;?\ \mathrm{C/m}`,
    },
  ],

  "jc935-2-review-5": [
    {
      change: "按导数定义写出差商极限",
      text: "题目要求不直接套求导公式，先用定义写出 [f(x+h)−f(x)]/h，并保持 x ≠ −1/2。",
      formula: math`f'(x)=\lim_{h\to 0}\frac{\dfrac{1}{2(x+h)+1}-\dfrac{1}{2x+1}}{h}`,
    },
    {
      change: "把分子中的两个分式通分",
      text: "先处理分子差：公分母为 (2x+2h+1)(2x+1)，分子相减时注意 2(x+h)+1=2x+2h+1，不要漏乘系数 2。",
      formula: math`\begin{gathered}
        \frac{(2x+1)-(2x+2h+1)}{(2x+2h+1)(2x+1)}\\[6pt]
        =\frac{-2h}{(2x+2h+1)(2x+1)}
      \end{gathered}`,
    },
    {
      change: "约去上下公因子 h",
      text: "在 h→0 的过程中 h ≠ 0，可以把分子里的 h 与分母的 h 约掉，消除 0/0 未定式。",
      formula: math`f'(x)=\lim_{h\to 0}\frac{-2}{(2x+2h+1)(2x+1)}`,
    },
    {
      change: "令 h 趋近 0 并合并分母",
      text: "因为 x ≠ −1/2，当 h→0 时分母趋近 (2x+1)(2x+1) ≠ 0，直接代入 h=0 并整理成最简分式即可。",
      formula: math`\frac{-2}{(2x+0+1)(2x+1)}=\;?`,
    },
  ],

  "jc935-2-review-6-1": [
    {
      change: "先由右段确定 f(0) 的值",
      text: "x=0 落在 x ≥ 0 这一段，必须用右段表达式 e^(2x)−1 计算中心点函数值 f(0)。",
      formula: math`f(0)=\mathrm{e}^{2\cdot 0}-1=0`,
    },
    {
      change: "写出左导数并凑出标准极限",
      text: "x→0⁻ 时取左段 tan(2x)，分子分母同乘 2 凑出 (tan 2x)/(2x)，令 u=2x→0⁻ 可用重要极限。",
      formula: math`\begin{gathered}
        f'_-(0)=\lim_{x\to 0^-}\frac{\tan 2x-0}{x}\\[4pt]
        =\lim_{x\to 0^-}2\cdot\frac{\tan 2x}{2x}
      \end{gathered}`,
    },
    {
      change: "写出右导数并凑出标准极限",
      text: "x→0⁺ 时取右段 e^(2x)−1，同样凑出 (e^(2x)−1)/(2x)，利用 eᵘ−1 ~ u（u→0）即可求极限。",
      formula: math`\begin{gathered}
        f'_+(0)=\lim_{x\to 0^+}\frac{\mathrm{e}^{2x}-1-0}{x}\\[4pt]
        =\lim_{x\to 0^+}2\cdot\frac{\mathrm{e}^{2x}-1}{2x}
      \end{gathered}`,
    },
    {
      change: "比较左右导数并判断可导性",
      text: "两侧标准极限都等于 1，分别算出 f'₋(0) 与 f'₊(0) 后比较它们是否相等，再写出 f'(0) 是否存在的结论。",
      formula: math`\begin{gathered}
        f'_-(0)=2\times 1,\quad f'_+(0)=2\times 1\\[4pt]
        f'_-(0)\stackrel{?}{=}f'_+(0)
      \end{gathered}`,
    },
  ],

  "jc935-2-review-6-2": [
    {
      change: "化简 x=0 处的差商表达式",
      text: "因为 f(0)=0，对任意 x ≠ 0，差商 [f(x)−f(0)]/x 可直接约去因子 x。",
      formula: math`\frac{f(x)-f(0)}{x}=\frac{3}{1+\mathrm{e}^{-2/x}}`,
    },
    {
      change: "判断 x→0⁻ 时指数项的趋向",
      text: "当 x 从负半轴趋近 0 时，−2/x 为正且无限增大，即 −2/x → +∞，于是 e^(−2/x) → +∞，分母冲向 +∞。",
      formula: math`\begin{gathered}
        x\to 0^-\;\Longrightarrow\;-\frac{2}{x}\to +\infty\\[4pt]
        f'_-(0)=\lim_{x\to 0^-}\frac{3}{1+\mathrm{e}^{-2/x}}
      \end{gathered}`,
    },
    {
      change: "判断 x→0⁺ 时指数项的趋向",
      text: "当 x 从正半轴趋近 0 时，−2/x 为负且绝对值无限增大，即 −2/x → −∞，于是 e^(−2/x) → 0。",
      formula: math`\begin{gathered}
        x\to 0^+\;\Longrightarrow\;-\frac{2}{x}\to -\infty\\[4pt]
        f'_+(0)=\lim_{x\to 0^+}\frac{3}{1+\mathrm{e}^{-2/x}}
      \end{gathered}`,
    },
    {
      change: "算出单侧导数并比较是否相等",
      text: "左极限分母趋于 +∞，右极限分母趋于 1+0。分别写出 f'₋(0) 与 f'₊(0) 的值，再判定 f'(0) 是否存在。",
      formula: math`\begin{gathered}
        f'_-(0)=0,\quad f'_+(0)=\frac{3}{1+0}\\[4pt]
        f'_-(0)\stackrel{?}{=}f'_+(0)
      \end{gathered}`,
    },
  ],

  "jc935-2-review-7": [
    {
      change: "用有界性夹逼检验连续性",
      text: "因为对任意 x ≠ 0 都有 |cos(2/x)| ≤ 1，可得 0 ≤ |x cos(2/x)| ≤ |x|。当 x→0 时两端都趋于 0，由夹逼准则知 lim_{x→0} f(x)=0=f(0)。",
      formula: math`\begin{gathered}
        0\le\left|x\cos\frac{2}{x}\right|\le |x|\\[4pt]
        \Longrightarrow\;\lim_{x\to 0}f(x)=0=f(0)
      \end{gathered}`,
    },
    {
      change: "写出 x=0 处的差商函数",
      text: "检验可导性必须回到定义：对 x ≠ 0，把 [f(x)−f(0)]/x 约去 x，只剩下高频振荡因子 cos(2/x)。",
      formula: math`\frac{f(x)-f(0)}{x}=\cos\frac{2}{x}\quad(x\neq 0)`,
    },
    {
      change: "取两条趋于 0 的点列算差商",
      text: "构造两组趋于 0 的点列 x_m 与 y_m，使 2/x_m 落在偶数倍 π、2/y_m 落在奇数倍 π，观察余弦值。",
      formula: math`\begin{gathered}
        x_m=\frac{2}{2m\pi}\to 0:\;\cos\frac{2}{x_m}=1\\[4pt]
        y_m=\frac{2}{(2m+1)\pi}\to 0:\;\cos\frac{2}{y_m}=-1
      \end{gathered}`,
    },
    {
      change: "由归结原则汇总两项结论",
      text: "两条趋于 0 的点列给出不同的极限值 1 与 −1，说明差商极限不存在。请综合第 1 步与第 3 步写出连续性与可导性结论。",
      formula: math`\begin{gathered}
        \lim_{x\to 0}f(x)=f(0)\\[4pt]
        \lim_{x\to 0}\cos\frac{2}{x}\text{ 不存在}
      \end{gathered}`,
    },
  ],

  "jc935-2-review-8-1": [
    {
      change: "套用反余弦的链式求导法则",
      text: "设 u = cos x，由 (arccos u)' = −u'/√(1−u²) 对外层求导并乘以内层导数 u'。",
      formula: math`y'=-\frac{(\cos x)'}{\sqrt{1-\cos^2 x}}`,
    },
    {
      change: "算出内层导数并整理负号",
      text: "因为 (cos x)' = −sin x，与前面的负号相乘得正号，分子变成 sin x。",
      formula: math`y'=\frac{\sin x}{\sqrt{1-\cos^2 x}}`,
    },
    {
      change: "用平方关系化简根号内部",
      text: "利用恒等式 1−cos²x = sin²x，把分母改写成 √(sin²x)。",
      formula: math`y'=\frac{\sin x}{\sqrt{\sin^2 x}}`,
    },
    {
      change: "开算术平方根必须带绝对值",
      text: "注意 √(sin²x) 恒非负，等于 |sin x| 而不能直接写成 sin x（因为 sin x 可正可负）。在 x ≠ kπ 上分母非零，据此写出最简结果。",
      formula: math`\sqrt{\sin^2 x}=|\sin x|\quad(x\neq k\pi)`,
    },
  ],

  "jc935-2-review-8-2": [
    {
      change: "设内层分式 u 并用商法则求 u'",
      text: "设 u=(2−x)/(1+2x)（x ≠ −1/2），按商法则 (p/q)'=(p'q−pq')/q² 计算 u'，注意分子里两个负号合并。",
      formula: math`\begin{gathered}
        u'=\frac{(-1)(1+2x)-(2-x)\cdot 2}{(1+2x)^2}\\[6pt]
        =\frac{-5}{(1+2x)^2}
      \end{gathered}`,
    },
    {
      change: "通分展开分母因子 1+u²",
      text: "为了套用 (arctan u)' = u'/(1+u²)，把 1+u² 统一通分到公分母 (1+2x)²，并展开分子的两个完全平方。",
      formula: math`\begin{gathered}
        1+u^2=\frac{(1+2x)^2+(2-x)^2}{(1+2x)^2}\\[6pt]
        =\frac{(1+4x+4x^2)+(4-4x+x^2)}{(1+2x)^2}
      \end{gathered}`,
    },
    {
      change: "抵消交叉项并提取公因子 5",
      text: "分子里 +4x 与 −4x 正好抵消，剩下 5+5x²，提出公因子 5 便于下一步约分。",
      formula: math`1+u^2=\frac{5(1+x^2)}{(1+2x)^2}`,
    },
    {
      change: "代入链式法则约去公因子",
      text: "把 u' 与 1+u² 代入 y' = u'/(1+u²)，分子分母同时约去 5/(1+2x)² 即可写出最终导数（注明 x ≠ −1/2）。",
      formula: math`y'=\frac{-5/(1+2x)^2}{5(1+x^2)/(1+2x)^2}=\;?`,
    },
  ],

  "jc935-2-review-8-3": [
    {
      change: "对第一项套用复合求导法则",
      text: "令 α = π/4 + x/2，对 ln(tan α) 逐层求导，别忘了最内层 (x/2)' = 1/2。",
      formula: math`\begin{gathered}
        \bigl[\ln\tan\alpha\bigr]'=\frac{\sec^2\alpha}{\tan\alpha}\cdot\frac{1}{2}\\[4pt]
        \left(\alpha=\frac{\pi}{4}+\frac{x}{2}\right)
      \end{gathered}`,
    },
    {
      change: "用二倍角公式化简第一项导数",
      text: "把 sec²α 与 tan α 都化成正弦和余弦，分母出现 2 sin α cos α = sin(2α) = sin(π/2 + x) = cos x。",
      formula: math`\begin{gathered}
        \frac{1}{2\sin\alpha\cos\alpha}
        =\frac{1}{\sin\left(\frac{\pi}{2}+x\right)}\\[6pt]
        =\frac{1}{\cos x}=\sec x
      \end{gathered}`,
    },
    {
      change: "对第二项用乘积与链式法则",
      text: "把 sin x·ln(cot x) 按乘积法则拆成两项，注意 (cot x)' = −csc²x 带有负号。",
      formula: math`\begin{gathered}
        \bigl(\sin x\ln\cot x\bigr)'\\[4pt]
        =\cos x\ln\cot x+\sin x\cdot\frac{-\csc^2 x}{\cot x}
      \end{gathered}`,
    },
    {
      change: "化简第二项尾部的三角分式",
      text: "在 0 < x < π/2 上正余弦均非零，把 csc²x = 1/sin²x 与 cot x = cos x/sin x 代入约分，正好得到 −sec x。",
      formula: math`\begin{gathered}
        \sin x\cdot\frac{-1/\sin^2 x}{\cos x/\sin x}\\[4pt]
        =-\frac{1}{\cos x}=-\sec x
      \end{gathered}`,
    },
    {
      change: "合并两项导数并抵消 sec x",
      text: "把第一项与第二项的导数相加，正负 sec x 恰好抵消，写出剩下的最简表达式即可。",
      formula: math`\begin{gathered}
        y'=\sec x+\cos x\ln\cot x-\sec x\\[4pt]
        =\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-review-8-4": [
    {
      change: "设对数内层为 u 并计算 u'",
      text: "令 u = e^(2x) + √(e^(4x)+4)，分别对两项求导：注意 (e^(2x))'=2e^(2x)，而 (e^(4x))'=4e^(4x)。",
      formula: math`\begin{gathered}
        u'=2\mathrm{e}^{2x}+\frac{4\mathrm{e}^{4x}}{2\sqrt{\mathrm{e}^{4x}+4}}\\[6pt]
        =2\mathrm{e}^{2x}+\frac{2\mathrm{e}^{4x}}{\sqrt{\mathrm{e}^{4x}+4}}
      \end{gathered}`,
    },
    {
      change: "把 u' 的两项通分合并",
      text: "为了看出它与 u 的公因子，把 u' 通分到同一分母 √(e^(4x)+4) 上。",
      formula: math`u'=\frac{2\mathrm{e}^{2x}\sqrt{\mathrm{e}^{4x}+4}+2\mathrm{e}^{4x}}{\sqrt{\mathrm{e}^{4x}+4}}`,
    },
    {
      change: "在分子提取公因子 2e^(2x)",
      text: "因为 e^(4x) = e^(2x)·e^(2x)，提出 2e^(2x) 后括号里恰好重现整块 u。",
      formula: math`\begin{gathered}
        u'=\frac{2\mathrm{e}^{2x}\bigl(\sqrt{\mathrm{e}^{4x}+4}+\mathrm{e}^{2x}\bigr)}{\sqrt{\mathrm{e}^{4x}+4}}\\[6pt]
        =\frac{2\mathrm{e}^{2x}\cdot u}{\sqrt{\mathrm{e}^{4x}+4}}
      \end{gathered}`,
    },
    {
      change: "代入 y'=u'/u 约去整块 u",
      text: "因为 u > 0 恒成立，将 u' 除以 u 时可以把整块因子 u 直接约掉，写出最简的 y'。",
      formula: math`\begin{gathered}
        y'=\frac{u'}{u}\\[4pt]
        =\frac{2\mathrm{e}^{2x}\cdot u}{u\sqrt{\mathrm{e}^{4x}+4}}=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-review-8-5": [
    {
      change: "两边取自然对数化掉幂指结构",
      text: "当 x > 0 时底数 2x > 0 且 y > 0，可以对等式两边同时取自然对数，把指数 1/x 提到前面。",
      formula: math`\ln y=\frac{1}{x}\ln(2x)=\frac{\ln(2x)}{x}`,
    },
    {
      change: "两边对 x 求导（右侧用商法则）",
      text: "左边把 y 看成 x 的函数，(ln y)' = y'/y；右边对 ln(2x)/x 套用商法则。",
      formula: math`\frac{y'}{y}=\frac{[\ln(2x)]'\cdot x-\ln(2x)\cdot 1}{x^2}`,
    },
    {
      change: "算出 [ln(2x)]' 并化简分子",
      text: "由链式法则 [ln(2x)]' = 2/(2x) = 1/x（不是 2/x），与 x 相乘恰好得 1。",
      formula: math`\begin{gathered}
        \frac{y'}{y}=\frac{\frac{1}{x}\cdot x-\ln(2x)}{x^2}\\[6pt]
        =\frac{1-\ln(2x)}{x^2}
      \end{gathered}`,
    },
    {
      change: "两边同乘 y 还原出 y'",
      text: "千万别停在 y'/y：把 y = (2x)^(1/x) 乘到等式右边，即可得到最终导数表达式。",
      formula: math`y'=y\cdot\frac{1-\ln(2x)}{x^2}=\;?`,
    },
  ],

  "jc935-2-review-9-1": [
    {
      change: "用乘积与链式法则求一阶导 y'",
      text: "把 y 看作 sin²(2x) 与 ln x 的乘积，求 [sin²(2x)]' 时依次经过外层平方、正弦和内层 2x，得到 4 sin(2x)cos(2x)。",
      formula: math`\begin{gathered}
        y'=2\sin(2x)\cos(2x)\cdot 2\ln x\\[4pt]
        +\frac{\sin^2(2x)}{x}
      \end{gathered}`,
    },
    {
      change: "用二倍角公式化简 y'",
      text: "利用 2 sin(2x)cos(2x) = sin(4x)，把第一项系数合并成 2 sin(4x)，能大幅减轻二阶求导的计算量。",
      formula: math`y'=2\sin(4x)\ln x+\frac{\sin^2(2x)}{x}`,
    },
    {
      change: "对 y' 的第一项再求一次导",
      text: "对 2 sin(4x)·ln x 用乘积法则，注意 [sin(4x)]' = 4 cos(4x)。",
      formula: math`\begin{gathered}
        \bigl[2\sin(4x)\ln x\bigr]'\\[4pt]
        =8\cos(4x)\ln x+\frac{2\sin(4x)}{x}
      \end{gathered}`,
    },
    {
      change: "对 y' 的第二项用商法则求导",
      text: "分子 [sin²(2x)]' 已经算过是 2 sin(4x)，用商法则展开后再拆成两项分式。",
      formula: math`\begin{gathered}
        \left[\frac{\sin^2(2x)}{x}\right]'
        =\frac{2x\sin(4x)-\sin^2(2x)}{x^2}\\[6pt]
        =\frac{2\sin(4x)}{x}-\frac{\sin^2(2x)}{x^2}
      \end{gathered}`,
    },
    {
      change: "相加并合并同类项 sin(4x)/x",
      text: "把第 3、4 两步的结果相加，中间出现两个相同的 2 sin(4x)/x，合并后即可写出最终 y''。",
      formula: math`\begin{gathered}
        y''=8\cos(4x)\ln x+\frac{2\sin(4x)}{x}\\[4pt]
        +\frac{2\sin(4x)}{x}-\frac{\sin^2(2x)}{x^2}
      \end{gathered}`,
    },
  ],

  "jc935-2-review-9-2": [
    {
      change: "用商法则求一阶导数 y'",
      text: "把分子 x 与分母 √(4+x²) 代入商法则，注意 [√(4+x²)]' = x/√(4+x²)。",
      formula: math`y'=\frac{\sqrt{4+x^2}-x\cdot\dfrac{x}{\sqrt{4+x^2}}}{4+x^2}`,
    },
    {
      change: "分子通分并抵消 x² 项",
      text: "分子分母同乘 √(4+x²)，分子变为 (4+x²)−x² = 4，分母合为 (4+x²)^(3/2)。",
      formula: math`\begin{gathered}
        y'=\frac{(4+x^2)-x^2}{(4+x^2)\sqrt{4+x^2}}\\[6pt]
        =\frac{4}{(4+x^2)^{3/2}}
      \end{gathered}`,
    },
    {
      change: "改写成负分数幂再求二阶导",
      text: "把 y' 写成 4(4+x²)^(−3/2) 比再套商法则省事得多；用幂函数链式法则求导，别忘乘内层导数 2x。",
      formula: math`\begin{gathered}
        y'=4(4+x^2)^{-3/2}\\[4pt]
        y''=4\left(-\frac{3}{2}\right)(4+x^2)^{-5/2}\cdot 2x
      \end{gathered}`,
    },
    {
      change: "合并常数系数并改回分式",
      text: "把常数因子 4×(−3/2)×2 算清楚，再把负指数放回分母，即可写出最终的 y''。",
      formula: math`y''=\frac{4\cdot\left(-\frac{3}{2}\right)\cdot 2x}{(4+x^2)^{5/2}}=\;?`,
    },
  ],

  "jc935-2-review-10-1": [
    {
      change: "把 k 次根式改写为分数幂",
      text: "因为 2x+1 > 0，把根式统一写成幂函数形式，方便连续求导找规律。",
      formula: math`y=(2x+1)^{\frac{1}{k}}`,
    },
    {
      change: "算出一阶导 y' 并留出因子 2",
      text: "套用幂函数链式法则，指数 1/k 掉到前面，同时内层 (2x+1)' 吐出一个因子 2。",
      formula: math`y'=2\cdot\frac{1}{k}(2x+1)^{\frac{1}{k}-1}`,
    },
    {
      change: "算出二阶导 y'' 观察递推规律",
      text: "再求一次导，当前指数 (1/k−1) 掉到前面，幂次再减 1，又多乘一个因子 2。",
      formula: math`\begin{gathered}
        y''=2^2\cdot\frac{1}{k}\left(\frac{1}{k}-1\right)\\[4pt]
        \cdot(2x+1)^{\frac{1}{k}-2}
      \end{gathered}`,
    },
    {
      change: "归纳到第 n 阶并核对末项",
      text: "求导 n 次共乘出 2ⁿ、幂次减掉 n；前 n 个指数因子从 1/k 一直乘到 1/k−(n−1)（注意不是 1/k−n），据此写出 y⁽ⁿ⁾。",
      formula: math`\begin{gathered}
        \text{系数：}2^n\cdot\frac{1}{k}\left(\frac{1}{k}-1\right)\cdots
        \left(\frac{1}{k}-n+1\right)\\[4pt]
        \text{幂次：}(2x+1)^{\frac{1}{k}-n}
      \end{gathered}`,
    },
  ],

  "jc935-2-review-10-2": [
    {
      change: "分离常数把假分式化简",
      text: "把分子 2x+5 凑成 (2x−1)+6，拆成常数 1 加上一个最简真分式，对 n ≥ 1 常数项求导直接为 0。",
      formula: math`\begin{gathered}
        y=\frac{(2x-1)+6}{2x-1}\\[4pt]
        =1+6(2x-1)^{-1}
      \end{gathered}`,
    },
    {
      change: "算出一阶与二阶导找规律",
      text: "每次求导除了指数掉到前面变号外，内层 2x−1 还会吐出一个因子 2。",
      formula: math`\begin{gathered}
        y'=6\cdot(-1)\cdot 2(2x-1)^{-2}\\[4pt]
        y''=6\cdot(-1)^2\cdot 2^2\cdot 2!(2x-1)^{-3}
      \end{gathered}`,
    },
    {
      change: "归纳 (2x−1)⁻¹ 的 n 阶导公式",
      text: "求导 n 次后，符号为 (−1)ⁿ，数字因子累积为 n! 与 2ⁿ，幂次降到 −(n+1)。",
      formula: math`\begin{gathered}
        \bigl[(2x-1)^{-1}\bigr]^{(n)}\\[4pt]
        =(-1)^n 2^n n!(2x-1)^{-(n+1)}
      \end{gathered}`,
    },
    {
      change: "乘回系数 6 并写成标准分式",
      text: "常数 1 的 n 阶导（n ≥ 1）为 0，将上式乘以 6 并把负指数放回分母，即可写出最终 y⁽ⁿ⁾。",
      formula: math`y^{(n)}=6(-1)^n 2^n n!(2x-1)^{-(n+1)}=\;?`,
    },
  ],

  "jc935-2-review-11": [
    {
      change: "代入 x=0 先求对应的 y(0)",
      text: "要算 x=0 处的导数值，必须先知道该点对应的 y 值。把 x=0 代入原方程即可解出 y(0)。",
      formula: math`\begin{gathered}
        \mathrm{e}^{y(0)}+3\cdot 0\cdot y(0)=\mathrm{e}\\[4pt]
        \Longrightarrow\;y(0)=1
      \end{gathered}`,
    },
    {
      change: "方程两边对 x 求一次导",
      text: "把 y 看作 x 的函数：左边 eʸ 求导得 eʸ y'，3xy 用乘积法则得 3y+3xy'，右边常数 e 的导数为 0。",
      formula: math`\mathrm{e}^y y'+3y+3xy'=0`,
    },
    {
      change: "代入 x=0, y=1 算出 y'(0)",
      text: "先不忙解出 y' 的显式公式，直接把 x=0, y=1 代入一阶导方程即可快速求出 y'(0)。",
      formula: math`\begin{gathered}
        \mathrm{e}\cdot y'(0)+3\cdot 1+0=0\\[4pt]
        \Longrightarrow\;y'(0)=-\frac{3}{\mathrm{e}}
      \end{gathered}`,
    },
    {
      change: "对一阶导方程再对 x 求一次导",
      text: "对 eʸ y' 和 3xy' 都要用乘积法则，注意 3y 的导数与 3xy' 中的 3y' 合并成 6y'。",
      formula: math`\begin{gathered}
        \mathrm{e}^y(y')^2+\mathrm{e}^y y''\\[4pt]
        +6y'+3xy''=0
      \end{gathered}`,
    },
    {
      change: "代入已知值解出 y''(0)",
      text: "把 x=0、y(0)=1 和 y'(0)=−3/e 全部代入二阶导方程，整理即可解出 y''(0)。",
      formula: math`\begin{gathered}
        \mathrm{e}\left(-\frac{3}{\mathrm{e}}\right)^2+\mathrm{e}\,y''(0)
        +6\left(-\frac{3}{\mathrm{e}}\right)=0\\[6pt]
        \mathrm{e}\,y''(0)-\frac{9}{\mathrm{e}}=0
      \end{gathered}`,
    },
  ],

  "jc935-2-review-12": [
    {
      change: "代入 t=0 确定 x(0) 与 y(0)",
      text: "先把 t=0 分别代入两个方程，算出对应的 x 与 y，供后续隐函数求导代入。",
      formula: math`\begin{gathered}
        \mathrm{e}^x=1\;\Longrightarrow\;x(0)=0\\[4pt]
        -y+\frac{\pi}{3}=0\;\Longrightarrow\;y(0)=\frac{\pi}{3}
      \end{gathered}`,
    },
    {
      change: "对第一个方程求导算出 dx/dt",
      text: "把 x 看成 t 的函数，两边对 t 求导后代入 t=0, x=0。",
      formula: math`\begin{gathered}
        \mathrm{e}^x\frac{\mathrm{d}x}{\mathrm{d}t}=4t+3\\[4pt]
        \left.\frac{\mathrm{d}x}{\mathrm{d}t}\right|_{t=0}=3
      \end{gathered}`,
    },
    {
      change: "对第二个方程两边对 t 求导",
      text: "把 y 看成 t 的函数，对 t cos y 用乘积法则与链式法则，常数 π/3 求导为 0。",
      formula: math`\cos y-t\sin y\frac{\mathrm{d}y}{\mathrm{d}t}-\frac{\mathrm{d}y}{\mathrm{d}t}=0`,
    },
    {
      change: "代入 t=0, y=π/3 算出 dy/dt",
      text: "含因子 t 的项在 t=0 时直接消去，立刻得出 dy/dt 在 t=0 处的值。",
      formula: math`\begin{gathered}
        \cos\frac{\pi}{3}-\left.\frac{\mathrm{d}y}{\mathrm{d}t}\right|_{t=0}=0\\[4pt]
        \Longrightarrow\;\left.\frac{\mathrm{d}y}{\mathrm{d}t}\right|_{t=0}=\frac{1}{2}
      \end{gathered}`,
    },
    {
      change: "用参数求导公式相除得 dy/dx",
      text: "因为 dx/dt|_{t=0} = 3 ≠ 0，把 dy/dt 与 dx/dt 相除即可算出最终导数值。",
      formula: math`\left.\frac{\mathrm{d}y}{\mathrm{d}x}\right|_{t=0}=\frac{1/2}{3}=\;?`,
    },
  ],

  "jc935-2-review-13-1": [
    {
      change: "分别对参数 t 求 dx/dt 和 dy/dt",
      text: "用幂函数与三角函数链式法则分别求导，注意 (cos t)' = −sin t 带来负号。",
      formula: math`\begin{gathered}
        \frac{\mathrm{d}x}{\mathrm{d}t}=3a\sin^2 t\cos t\\[4pt]
        \frac{\mathrm{d}y}{\mathrm{d}t}=-3b\cos^2 t\sin t
      \end{gathered}`,
    },
    {
      change: "两式相除并约分化简 dy/dx",
      text: "因为 0 < t < π/2，sin t > 0 且 cos t > 0，可以合法约去 3 sin t cos t，得到简洁的一阶导数。",
      formula: math`\begin{gathered}
        \frac{\mathrm{d}y}{\mathrm{d}x}
        =\frac{-3b\cos^2 t\sin t}{3a\sin^2 t\cos t}\\[6pt]
        =-\frac{b}{a}\cot t
      \end{gathered}`,
    },
    {
      change: "把一阶导 dy/dx 再对 t 求导",
      text: "准备求二阶导：先算分子 d/dt(dy/dx)，利用 (cot t)' = −csc²t，负负得正。",
      formula: math`\frac{\mathrm{d}}{\mathrm{d}t}\left(-\frac{b}{a}\cot t\right)=\frac{b}{a}\csc^2 t`,
    },
    {
      change: "再除以 dx/dt 套用二阶导公式",
      text: "参数方程求二阶导切忌漏掉分母 dx/dt，必须写成 [d/dt(dy/dx)] / (dx/dt)。",
      formula: math`\frac{\mathrm{d}^2y}{\mathrm{d}x^2}=\frac{\dfrac{b}{a}\csc^2 t}{3a\sin^2 t\cos t}`,
    },
    {
      change: "改写为 csc t 与 sec t 的乘积",
      text: "把分母中的 1/sin²t 写成 csc²t、1/cos t 写成 sec t，合并系数与幂次即可写出最终的 d²y/dx²（连同一阶导一并作答）。",
      formula: math`\begin{gathered}
        \frac{\mathrm{d}^2y}{\mathrm{d}x^2}
        =\frac{b}{3a^2}\csc^2 t\cdot\csc^2 t\cdot\sec t\\[4pt]
        =\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-review-13-2": [
    {
      change: "分别对 t 求导并把 dy/dt 通分",
      text: "算完 (arctan t)' = 1/(1+t²) 后立刻把 dy/dt 通分，可以清楚看到两式有相同的分母 1+t²。",
      formula: math`\begin{gathered}
        \frac{\mathrm{d}x}{\mathrm{d}t}=\frac{2t}{1+t^2}\\[6pt]
        \frac{\mathrm{d}y}{\mathrm{d}t}=1-\frac{1}{1+t^2}=\frac{t^2}{1+t^2}
      \end{gathered}`,
    },
    {
      change: "相除约分得到一阶导数 dy/dx",
      text: "因为 t ≠ 0，分母 1+t² 与一个因子 t 都可以约掉，一阶导化简得非常干净。",
      formula: math`\begin{gathered}
        \frac{\mathrm{d}y}{\mathrm{d}x}=\frac{t^2/(1+t^2)}{2t/(1+t^2)}\\[4pt]
        =\frac{t}{2}
      \end{gathered}`,
    },
    {
      change: "套用参数二阶导公式",
      text: "先对 dy/dx = t/2 关于 t 求导得 1/2，再务必除以 dx/dt = 2t/(1+t²)。",
      formula: math`\begin{gathered}
        \frac{\mathrm{d}^2y}{\mathrm{d}x^2}=\frac{\frac{\mathrm{d}}{\mathrm{d}t}(t/2)}{\mathrm{d}x/\mathrm{d}t}\\[6pt]
        =\frac{1/2}{\dfrac{2t}{1+t^2}}
      \end{gathered}`,
    },
    {
      change: "把繁分式化简为最简分式",
      text: "除以分式等于乘以它的倒数，把常数与 t 合并到分母，即可写出最终的 d²y/dx²（连同一阶导一起呈现）。",
      formula: math`\frac{\mathrm{d}^2y}{\mathrm{d}x^2}=\frac{1}{2}\cdot\frac{1+t^2}{2t}=\;?`,
    },
  ],

  "jc935-2-review-14": [
    {
      change: "代入 t=0 算出切点坐标",
      text: "参数 t=0 不是横坐标 x=0，必须把 t=0 代入参数方程求出切点 (x(0), y(0))。",
      formula: math`\begin{gathered}
        x(0)=3\mathrm{e}^0=3,\quad y(0)=2\mathrm{e}^0=2\\[4pt]
        \text{切点为 }(3,\,2)
      \end{gathered}`,
    },
    {
      change: "求参数导数并代入 t=0",
      text: "分别对 x(t) 与 y(t) 求导，再代入 t=0 得到该点处的速度分量。",
      formula: math`\begin{gathered}
        x'(t)=6\mathrm{e}^{2t}\;\Longrightarrow\;x'(0)=6\\[4pt]
        y'(t)=-2\mathrm{e}^{-t}\;\Longrightarrow\;y'(0)=-2
      \end{gathered}`,
    },
    {
      change: "算出切线斜率与法线斜率",
      text: "切线斜率 k = y'(0)/x'(0)；法线与切线垂直，斜率为负倒数 −1/k（切勿漏掉负号）。",
      formula: math`\begin{gathered}
        k_{\text{切}}=\frac{-2}{6}=-\frac{1}{3}\\[4pt]
        k_{\text{法}}=-\frac{1}{k_{\text{切}}}=3
      \end{gathered}`,
    },
    {
      change: "用点斜式写出两直线并整理",
      text: "把切点 (3, 2) 与两条斜率分别代入点斜式，去分母并移项整理成一般式 Ax+By+C=0 即可。",
      formula: math`\begin{gathered}
        \text{切线：}y-2=-\frac{1}{3}(x-3)\\[4pt]
        \text{法线：}y-2=3(x-3)
      \end{gathered}`,
    },
  ],

  "jc935-2-review-15": [
    {
      change: "令 x→0 由连续性定出 f(2)",
      text: "因为 f 在 x=2 处连续，且 x→0 时 tan x→0，对已知恒等式两边取极限即可先锁定 f(2) 的值。",
      formula: math`\begin{gathered}
        f(2)-2f(2)=0\\[4pt]
        \Longrightarrow\;f(2)=0
      \end{gathered}`,
    },
    {
      change: "两边除以 x 并引入 u=tan x",
      text: "对 x ≠ 0 两边同除以 x，再乘以并除以 u = tan x，把高阶无穷小 o(x)/x 分离出来（它趋于 0）。",
      formula: math`\begin{gathered}
        \frac{f(2+u)-2f(2-u)}{u}\cdot\frac{\tan x}{x}\\[6pt]
        =9+\frac{o(x)}{x}\quad(u=\tan x)
      \end{gathered}`,
    },
    {
      change: "把分子拆成两个标准差商",
      text: "利用 f(2)=0 添项减项；注意第二项中自变量增量是 −u，把 −2/u 改写成 +2/(−u) 才会变成加号。",
      formula: math`\begin{gathered}
        \frac{f(2+u)-f(2)}{u}\\[4pt]
        +2\cdot\frac{f(2-u)-f(2)}{-u}
      \end{gathered}`,
    },
    {
      change: "令 x→0 求出导数值 f'(2)",
      text: "因为 lim_{x→0} (tan x)/x = 1 且 f 在 x=2 可导，两边取极限得 f'(2)+2f'(2)=9，从而求出 f'(2)。",
      formula: math`\begin{gathered}
        \bigl[f'(2)+2f'(2)\bigr]\cdot 1=9\\[4pt]
        \Longrightarrow\;f'(2)=3
      \end{gathered}`,
    },
    {
      change: "用周期 4 平移到 x=6 写切线",
      text: "由周期为 4 知 f(6)=f(2)=0 且 f'(6)=f'(2)=3。代入点斜式并整理成一般式，再核对参考解答。",
      formula: math`\begin{gathered}
        f(6)=0,\quad f'(6)=3\\[4pt]
        y-0=3(x-6)
      \end{gathered}`,
    },
  ],

  "jc935-2-review-16": [
    {
      change: "用起点条件立刻定出 c 与 d",
      text: "先求导得 y' = 3ax²+2bx+c。把 x=0 代入 y(0)=0 和 y'(0)=0，马上消掉两个未知数 d 与 c。",
      formula: math`\begin{gathered}
        y(0)=0\Rightarrow d=0\\[4pt]
        y'(0)=0\Rightarrow c=0\\[4pt]
        y=ax^3+bx^2
      \end{gathered}`,
    },
    {
      change: "代入终点条件列线性方程组",
      text: "把 x=L 代入 y=ax³+bx² 与 y'=3ax²+2bx，利用高架平台高度 H 和水平接入条件 y'(L)=0 列方程。",
      formula: math`\begin{cases}
        aL^3+bL^2=H,\\[4pt]
        3aL^2+2bL=0
      \end{cases}`,
    },
    {
      change: "消元解出系数 a 与 b",
      text: "因为 L > 0，由第二式约去 L 得 b = −(3/2)aL，代入第一式得 −(1/2)aL³ = H，依次解出 a 与 b。",
      formula: math`\begin{gathered}
        b=-\frac{3}{2}aL\;\Longrightarrow\;-\frac{1}{2}aL^3=H\\[6pt]
        a=-\frac{2H}{L^3},\quad b=\frac{3H}{L^2}
      \end{gathered}`,
    },
    {
      change: "代回多项式并改写为 x/L 形式",
      text: "把 a, b 代回 y = ax³+bx²，提出公因子 H 并把 x/L 整理成幂次形式，即得无量纲过渡曲线方程。",
      formula: math`y=\frac{3H}{L^2}x^2-\frac{2H}{L^3}x^3=\;?`,
    },
  ],

  "jc935-2-review-17": [
    {
      change: "建立坐标系写出距离函数 s(t)",
      text: "以 9:00 时甲艇位置为原点，向东为正 x、向北为正 y：t 小时后甲在 (0, 6t)、乙在 (18−10t, 0)，由勾股定理得间距。",
      formula: math`s(t)=\sqrt{(18-10t)^2+(6t)^2}`,
    },
    {
      change: "用链式法则对时间 t 求导",
      text: "先对根号求导，再乘以根号内部对 t 的导数；注意 (18−10t)' = −10 带有负号。",
      formula: math`\begin{gathered}
        \frac{\mathrm{d}s}{\mathrm{d}t}\\[4pt]
        =\frac{2(18-10t)(-10)+2(6t)\cdot 6}{2\sqrt{(18-10t)^2+(6t)^2}}
      \end{gathered}`,
    },
    {
      change: "约去分子分母的公因子 2",
      text: "把上下共有的因子 2 约掉，得到简洁的速率表达式，切忌提前把 t=1 代入原函数再求导。",
      formula: math`\frac{\mathrm{d}s}{\mathrm{d}t}=\frac{-10(18-10t)+36t}{\sqrt{(18-10t)^2+(6t)^2}}`,
    },
    {
      change: "代入 t=1 计算结果并带单位",
      text: "t=1 时东西距 18−10=8、南北距 6、间距 √(8²+6²)=10，算出最终小数并注明单位 km/h（负号表示正在靠近）。",
      formula: math`\begin{gathered}
        \left.\frac{\mathrm{d}s}{\mathrm{d}t}\right|_{t=1}
        =\frac{-10\times 8+36}{\sqrt{8^2+6^2}}\\[4pt]
        =\;?\ \mathrm{km/h}
      \end{gathered}`,
    },
  ],

  "jc935-2-review-18": [
    {
      change: "选定函数、基准点与增量",
      text: "把 1.03 拆成 1+0.03，设 f(x)=(1+x)^(1/5)，取容易口算的基准点 x₀=0、微小增量 Δx=0.03。",
      formula: math`\begin{gathered}
        f(x)=(1+x)^{\frac{1}{5}}\\[4pt]
        x_0=0,\quad \Delta x=0.03,\quad f(0)=1
      \end{gathered}`,
    },
    {
      change: "求导并算出基准点斜率 f'(0)",
      text: "由幂函数求导法则得 f'(x)，再代入 x=0 得到切线斜率。",
      formula: math`\begin{gathered}
        f'(x)=\frac{1}{5}(1+x)^{-\frac{4}{5}}\\[4pt]
        f'(0)=\frac{1}{5}
      \end{gathered}`,
    },
    {
      change: "写出 x=0 处的线性近似式",
      text: "在微小增量下用微分 f'(0)Δx 近似代替函数增量 Δf，得到五次方根的常用近似公式。",
      formula: math`\begin{gathered}
        f(0+\Delta x)\approx f(0)+f'(0)\Delta x\\[4pt]
        =1+\frac{1}{5}\Delta x
      \end{gathered}`,
    },
    {
      change: "代入增量 Δx=0.03 算出近似值",
      text: "把 Δx=0.03 代入线性近似式（注意不是代入 1.03），算出最后一步小数即可。",
      formula: math`\sqrt[5]{1.03}\approx 1+\frac{0.03}{5}=\;?`,
    },
  ],

  "jc935-2-review-19": [
    {
      change: "改写为幂函数并对 m 求微分",
      text: "劲度系数 k 是常数，把 T 写成 (2π/√k)·m^(1/2) 再对质量 m 求微分，系数 2 与 1/2 正好约去。",
      formula: math`\begin{gathered}
        T=\frac{2\pi}{\sqrt{k}}\,m^{\frac{1}{2}}\\[6pt]
        \mathrm{d}T=\frac{2\pi}{\sqrt{k}}\cdot\frac{1}{2}m^{-\frac{1}{2}}\,\mathrm{d}m
        =\frac{\pi}{\sqrt{km}}\,\mathrm{d}m
      \end{gathered}`,
    },
    {
      change: "用增量近似微分并反解 Δm",
      text: "在微小变动下取 ΔT ≈ dT、Δm ≈ dm，把 Δm 单独解到等式左边。",
      formula: math`\begin{gathered}
        \Delta T\approx\frac{\pi}{\sqrt{km}}\Delta m\\[6pt]
        \Longrightarrow\;\Delta m\approx\frac{\sqrt{km}}{\pi}\Delta T
      \end{gathered}`,
    },
    {
      change: "代入 k=100, m=4 先算根号",
      text: "先算出 √(km) = √(100×4) = 20，再把 ΔT = 0.02 代入公式。",
      formula: math`\begin{gathered}
        \sqrt{km}=\sqrt{100\times 4}=20\\[4pt]
        \Delta m\approx\frac{20\times 0.02}{\pi}
      \end{gathered}`,
    },
    {
      change: "化简分数并估算近似小数",
      text: "把分子 20×0.02 = 0.4 化为最简分数 2/5，写出精确的含 π 表达式及三位小数近似值（单位 kg）。",
      formula: math`\Delta m\approx\frac{0.4}{\pi}=\frac{2}{5\pi}\approx\;?\ \mathrm{kg}`,
    },
  ],
};

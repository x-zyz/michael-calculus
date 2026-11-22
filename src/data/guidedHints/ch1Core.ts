import type { GuidedHint } from "../learning";

const math = String.raw;

export const ch1CoreGuidedHints: Record<string, GuidedHint[]> = {
  p1: [
    {
      change: "先试代入，确认是 0/0 型",
      text: "直接把 x=1 代入分子和分母，得到 1²−1=0、1−1=0。这是 0/0 型未定式，不能直接做除法，要先想办法消去公因式 x−1。",
      formula: math`\begin{gathered}
        x=1:\;x^2-1=0,\;x-1=0\\[4pt]
        \lim_{x\to1}\frac{x^2-1}{x-1}
      \end{gathered}`,
    },
    {
      change: "把分子用平方差拆成两项相乘",
      text: "分子 x²−1 是平方差结构，可以写成 (x−1)(x+1)。分母暂时原样保留。",
      formula: math`\lim_{x\to1}\frac{(x-1)(x+1)}{x-1}`,
    },
    {
      change: "约掉上下共同的因式 x−1",
      text: "求极限时只看 x 靠近 1 但还不等于 1 的点，所以 x−1 ≠ 0，可以把分子和分母里的 x−1 合法约去。",
      formula: math`\lim_{x\to1}(x+1)`,
    },
    {
      change: "把 x 换成 1，只剩加法",
      text: "多项式 x+1 在 x=1 处连续，分母已经消失，可以直接代入 x=1 算出结果。",
      formula: math`1+1=\;?`,
    },
  ],

  p2: [
    {
      change: "确认多项式连续，可直接代入",
      text: "x²+3x 是多项式函数，没有分母也没有根号限制，在全体实数上处处连续，因此极限值就等于该点的函数值。",
      formula: math`\lim_{x\to2}(x^2+3x)`,
    },
    {
      change: "把式子里的 x 都换成 2",
      text: "将 x=2 代入每一项，得到纯数字的乘方与乘法算式。",
      formula: math`2^2+3\times 2`,
    },
    {
      change: "先算乘方和乘法，再做加法",
      text: "2²=4，3×2=6。把两项加起来，就是最终的极限值。",
      formula: math`4+6=\;?`,
    },
  ],

  p3: [
    {
      change: "锁定正弦里面的 3x",
      text: "x→0 时分子分母都趋近 0，属于 0/0 型。想用第一个重要极限 sin t / t → 1，关键是让分母也出现和 sin 里面一模一样的 3x。",
      formula: math`\lim_{x\to0}\frac{\sin 3x}{5x}`,
    },
    {
      change: "分子分母同乘 3，配出 3x",
      text: "在 x ≠ 0 时，把分母 5x 拆成 5·(3x)/3，也就是在外面补一个系数 3/5，保持原式大小不变。",
      formula: math`\lim_{x\to0}\left(\frac{3}{5}\cdot\frac{\sin 3x}{3x}\right)`,
    },
    {
      change: "常数提出来，令 t=3x",
      text: "把常数因子 3/5 移到极限号外面。当 x→0 时，新变量 t=3x 也趋近 0，里面正好变成标准型。",
      formula: math`\frac{3}{5}\cdot\lim_{t\to0}\frac{\sin t}{t}`,
    },
    {
      change: "把重要极限换成 1，完成计算",
      text: "由第一个重要极限可知 lim(sin t / t) = 1，只剩下常数乘法。",
      formula: math`\frac{3}{5}\times 1=\;?`,
    },
  ],

  p4: [
    {
      change: "认出正弦自变量是 2x",
      text: "x→0 时这是 0/0 型未定式。正弦里面是 2x，所以我们要把分母的 3x 改写成带 2x 的形式。",
      formula: math`\lim_{x\to0}\frac{\sin 2x}{3x}`,
    },
    {
      change: "凑出分母 2x，外面补系数 2/3",
      text: "对 x ≠ 0，分子分母同乘 2 再把常数 2/3 单独拆开，原式与配凑后的式子完全相等。",
      formula: math`\lim_{x\to0}\left(\frac{2}{3}\cdot\frac{\sin 2x}{2x}\right)`,
    },
    {
      change: "常数提外，令 t=2x→0",
      text: "把 2/3 提到极限外面，记 t=2x。当 x→0 时 t→0，可以直接套用第一个重要极限。",
      formula: math`\frac{2}{3}\cdot\lim_{t\to0}\frac{\sin t}{t}`,
    },
    {
      change: "代入重要极限 1，写出分数",
      text: "核心分式的极限是 1，把乘积算出来填进答案框（可写分数或小数）。",
      formula: math`\frac{2}{3}\times 1=\;?`,
    },
  ],

  p5: [
    {
      change: "写出在 x=1 处连续的条件",
      text: "函数在 x=1 连续，要求该点的极限存在且正好等于函数值 f(1)。题目给出 f(1)=c，因此先求 x→1 时的极限。",
      formula: math`\lim_{x\to1}f(x)=f(1)=c`,
    },
    {
      change: "趋近 1 时只用 x ≠ 1 的那一段",
      text: "求极限时只考察 x 靠近 1 但不等于 1 的点，所以把 f(x) 换成第一段表达式 x+1。",
      formula: math`c=\lim_{x\to1}(x+1)`,
    },
    {
      change: "把 x=1 代入，算出 c",
      text: "x+1 是连续多项式，直接把 x 换成 1，就能得到让函数接上的 c。",
      formula: math`c=1+1=\;?`,
    },
  ],

  p6: [
    {
      change: "看清趋近方向：从 0 的左侧靠近",
      text: "记号 x→0⁻ 表示 x 始终比 0 小、从数轴左边向 0 靠近，即满足 x < 0。",
      formula: math`x\to 0^-\implies x<0`,
    },
    {
      change: "选定 x < 0 对应的分支表达式",
      text: "在 x < 0 的区域里，f(x) 恒等于 0。x ≥ 0 那一段（包括 f(0)=1）不参与左极限的计算。",
      formula: math`\lim_{x\to0^-}f(x)=\lim_{x\to0^-}0`,
    },
    {
      change: "常函数的极限就是常数本身",
      text: "无论 x 多靠近 0，函数值一直保持不变，直接读出这个常数值即可。",
      formula: math`\lim_{x\to0^-}0=\;?`,
    },
  ],

  p7: [
    {
      change: "识别 1^∞ 型，锁定趋零项 u=2x",
      text: "当 x→0 时底数 1+2x→1、指数 3/x→∞，这是 1^∞ 型未定式。底数中趋近 0 的部分是 u=2x。",
      formula: math`\begin{gathered}
        1+2x\to 1,\quad \frac{3}{x}\to\infty\\[4pt]
        u=2x\to 0
      \end{gathered}`,
    },
    {
      change: "把指数 3/x 配出倒数 1/(2x)",
      text: "为了套用第二个重要极限 (1+u)^(1/u)→e，在 x ≠ 0 时把指数 3/x 写成 [1/(2x)] 乘以修正因子。",
      formula: math`\frac{3}{x}=\frac{1}{2x}\cdot\left(2x\cdot\frac{3}{x}\right)`,
    },
    {
      change: "约去外层 x，写成幂的乘方",
      text: "修正因子里的 x 约掉后剩下 2×3，把原式改写成“标准型整体再做外层乘方”的结构。",
      formula: math`\lim_{x\to0}\left[(1+2x)^{\frac{1}{2x}}\right]^{2\times 3}`,
    },
    {
      change: "内层趋向 e，对比 e^k 算出 k",
      text: "当 x→0 时中括号里趋近 e，由幂函数连续性可得极限为 e^(2×3)。对比 e^k，算出乘法就得到 k。",
      formula: math`\begin{gathered}
        e^{2\times 3}=e^k\\[4pt]
        k=2\times 3=\;?
      \end{gathered}`,
    },
  ],

  p8: [
    {
      change: "把底数写成 1+u，带着负号认出 u",
      text: "1−3x 要改写成 1+(−3x)，所以趋零项是 u=−3x（负号千万别丢）。x→0 时仍是 1^∞ 型。",
      formula: math`\begin{gathered}
        1-3x=1+(-3x)\\[4pt]
        u=-3x\to 0
      \end{gathered}`,
    },
    {
      change: "把指数配出倒数 1/(−3x)",
      text: "为了和底数的 −3x 互为倒数，在指数里先乘 −3x 再除 −3x，把 2/x 拆成 1/(−3x) 与修正因子的乘积。",
      formula: math`\frac{2}{x}=\frac{1}{-3x}\cdot\left(-3x\cdot\frac{2}{x}\right)`,
    },
    {
      change: "化简外层指数，整理成标准结构",
      text: "修正因子中 x ≠ 0 约去后剩下 (−3)×2。把中括号凑成 (1+u)^(1/u) 的标准形态。",
      formula: math`\lim_{x\to0}\left[(1-3x)^{\frac{1}{-3x}}\right]^{(-3)\times 2}`,
    },
    {
      change: "内层趋向 e，算出带符号的 k",
      text: "中括号在 x→0 时趋向 e，对比 e^k 只需计算外层指数的乘法。",
      formula: math`\begin{gathered}
        e^{(-3)\times 2}=e^k\\[4pt]
        k=(-3)\times 2=\;?
      \end{gathered}`,
    },
  ],

  p9: [
    {
      change: "确认 0/0 型且分子是独立因子",
      text: "x→0 时 1−cos 2x → 0、x² → 0，属于 0/0 型。整个分子是单独的商因子，可以安全使用等价无穷小替换。",
      formula: math`\lim_{x\to0}\frac{1-\cos 2x}{x^2}`,
    },
    {
      change: "对 u=2x 套用余弦等价无穷小",
      text: "当 u→0 时有 1−cos u ~ u²/2。把 u=2x 代进去，注意 2 也要跟着一起平方。",
      formula: math`\begin{gathered}
        1-\cos u\sim\frac{u^2}{2}\\[4pt]
        1-\cos 2x\sim\frac{(2x)^2}{2}=\frac{4x^2}{2}
      \end{gathered}`,
    },
    {
      change: "替换原式分子，化为幂函数之比",
      text: "用等价无穷小 4x²/2 替换整个分子，分母 x² 保持不变。",
      formula: math`\lim_{x\to0}\frac{4x^2}{2x^2}`,
    },
    {
      change: "约去 x²，只剩数字除法",
      text: "趋近 0 时 x ≠ 0，可以把上下共同的 x² 约去，算出最后的整数比值即可。",
      formula: math`\frac{4}{2}=\;?`,
    },
  ],

  p10: [
    {
      change: "确认 0/0 型，乘除因子可整体替换",
      text: "x→0 时分子 ln(1+3x)→0、分母 sin 2x→0。分子和分母各自是完整因子（没有加减抵消），可以直接做等价无穷小替换。",
      formula: math`\lim_{x\to0}\frac{\ln(1+3x)}{\sin 2x}`,
    },
    {
      change: "分别写出分子和分母的等价无穷小",
      text: "当 u→0 时，ln(1+u)~u 且 sin u~u。分别取 u=3x 和 u=2x，得到两个简单的一次式。",
      formula: math`\begin{gathered}
        \ln(1+3x)\sim 3x\\[4pt]
        \sin 2x\sim 2x
      \end{gathered}`,
    },
    {
      change: "把分子分母同时换成一次式",
      text: "将等价无穷小代回极限式，三角函数和对数就都消失了。",
      formula: math`\lim_{x\to0}\frac{3x}{2x}`,
    },
    {
      change: "约去公因式 x，留下常数比值",
      text: "求极限时 x ≠ 0，约掉上下共同的 x，直接把分数或小数填入答案框。",
      formula: math`\frac{3}{2}=\;?`,
    },
  ],

  p37: [
    {
      change: "按由内向外的顺序，先算 g(1)",
      text: "计算复合函数 f(g(1)) 要先算出最里层的输入值 g(1)，把 x=1 代入 g(x)=5−x²。",
      formula: math`g(1)=5-1^2`,
    },
    {
      change: "算出内层函数值 g(1)=4",
      text: "先算 1²=1，再用 5 减 1 得到 4。接下来把这个 4 作为外层函数 f 的输入。",
      formula: math`g(1)=4`,
    },
    {
      change: "把 4 代入外层函数 f(u)=√u",
      text: "算术平方根取非负值，求出 √4 就完成了整个复合求值。",
      formula: math`f(g(1))=f(4)=\sqrt{4}=\;?`,
    },
  ],

  p38: [
    {
      change: "先检验分母的极限是否为 0",
      text: "使用商的极限法则前，必须先确认分母极限不等于 0。把 x=2 代入连续多项式 x+1，得到 3 ≠ 0，可以放心拆分。",
      formula: math`\lim_{x\to2}(x+1)=2+1=3\ne 0`,
    },
    {
      change: "用商的极限法则把分子分母拆开",
      text: "分子和分母极限都存在且分母非零，商的极限等于极限的商。",
      formula: math`\frac{\lim_{x\to2}(x^2+2)}{\lim_{x\to2}(x+1)}`,
    },
    {
      change: "分别代入 x=2，做最后一步除法",
      text: "分子 2²+2=6，分母 2+1=3。把 6 除以 3 算出结果即可。",
      formula: math`\frac{2^2+2}{2+1}=\frac{6}{3}=\;?`,
    },
  ],

  p39: [
    {
      change: "利用余弦的有界性给分子定界",
      text: "n 增大时 cos n 来回振荡没有极限，但它永远不会跑出 [−1, 1] 这个范围。",
      formula: math`-1\le \cos n\le 1`,
    },
    {
      change: "同除以 n 再加 3，夹住整个通项",
      text: "因为 n > 0，不等式三边同时除以 n 不改变不等号方向，再同时加上 3，就把原数列夹在两条简单曲线中间。",
      formula: math`\begin{gathered}
        3-\frac{1}{n}\le 3+\frac{\cos n}{n}\\[4pt]
        3+\frac{\cos n}{n}\le 3+\frac{1}{n}
      \end{gathered}`,
    },
    {
      change: "两端取极限，用夹逼准则读出结果",
      text: "当 n→∞ 时 1/n→0，左右两边的极限都是 3+0。由夹逼准则，夹在中间的数列也趋向同一个数。",
      formula: math`\begin{gathered}
        \lim_{n\to\infty}\left(3-\frac{1}{n}\right)=3-0\\[4pt]
        \lim_{n\to\infty}\left(3+\frac{1}{n}\right)=3+0=\;?
      \end{gathered}`,
    },
  ],

  p124: [
    {
      change: "先求外层根号对输入 t 的要求",
      text: "f(t)=√(9−t²) 要求根号里面大于等于 0，即 9−t² ≥ 0，解出 t 必须落在 [−3, 3] 内。",
      formula: math`\begin{gathered}
        9-t^2\ge 0\\[4pt]
        -3\le t\le 3
      \end{gathered}`,
    },
    {
      change: "把内层 g(x)=2x−1 代入 t 的范围",
      text: "复合函数 f(g(x)) 有意义，要求内层输出 2x−1 落在外层允许的区间里。",
      formula: math`-3\le 2x-1\le 3`,
    },
    {
      change: "三边先加 1 再除以 2，解出 x 区间",
      text: "先给三边同时加 1 得 −2 ≤ 2x ≤ 4，再同时除以正数 2（不等号不变向），得到定义域的左右端点。",
      formula: math`\begin{gathered}
        -2\le 2x\le 4\\[4pt]
        -1\le x\le 2
      \end{gathered}`,
    },
    {
      change: "右端点减去左端点，求区间长度",
      text: "区间长度等于右端点减左端点，注意减去负数相当于加上它的相反数。",
      formula: math`2-(-1)=\;?`,
    },
  ],

  p125: [
    {
      change: "先试代入，确认 0/0 型且含根号差",
      text: "把 x=3 代入得到 (√9−3)/(3−3)=0/0。分子是“根号减常数”，用乘共轭式有理化来消去根号。",
      formula: math`\lim_{x\to3}\frac{\sqrt{x+6}-3}{x-3}`,
    },
    {
      change: "分子分母同乘共轭式 √(x+6)+3",
      text: "在 x 靠近 3 时 √(x+6)+3 > 0，上下同乘它既不改变分式大小，又能凑出平方差。",
      formula: math`\lim_{x\to3}\frac{(\sqrt{x+6}-3)(\sqrt{x+6}+3)}{(x-3)(\sqrt{x+6}+3)}`,
    },
    {
      change: "分子展开平方差，化简成 x−3",
      text: "利用 (a−b)(a+b)=a²−b²，分子变成 (x+6)−9=x−3，正好和分母里的因式对齐。分母先不展开。",
      formula: math`\lim_{x\to3}\frac{x-3}{(x-3)(\sqrt{x+6}+3)}`,
    },
    {
      change: "约掉公因式 x−3",
      text: "求极限时只看 x ≠ 3 的点，所以 x−3 ≠ 0，可以把上下共同的 x−3 约掉，分子留下 1。",
      formula: math`\lim_{x\to3}\frac{1}{\sqrt{x+6}+3}`,
    },
    {
      change: "把 x=3 代入，只剩数字分数",
      text: "现在分母不再趋近 0，直接把 x 换成 3，算出 √9+3 后写出分数即可。",
      formula: math`\frac{1}{\sqrt{3+6}+3}=\frac{1}{3+3}=\;?`,
    },
  ],

  p126: [
    {
      change: "用 x < 2 分支求左极限",
      text: "从 2 的左侧靠近时满足 x < 2，使用第一段 ax+4，直接把 x=2 代入得到用 a 表示的左极限。",
      formula: math`\begin{gathered}
        \lim_{x\to2^-}f(x)=\lim_{x\to2^-}(ax+4)\\[4pt]
        =2a+4
      \end{gathered}`,
    },
    {
      change: "用 x ≥ 2 分支求右极限与点值",
      text: "从右侧靠近以及在 x=2 本身都用第二段 x²+a，代入 x=2 得到右极限和 f(2)。",
      formula: math`\begin{gathered}
        \lim_{x\to2^+}f(x)=f(2)\\[4pt]
        =2^2+a=4+a
      \end{gathered}`,
    },
    {
      change: "令左极限等于右极限，列出方程",
      text: "函数在 x=2 连续，要求左极限、右极限与函数值三者相等，于是得到关于 a 的一次方程。",
      formula: math`2a+4=4+a`,
    },
    {
      change: "移项合并同类项，解出 a",
      text: "把右边的 a 移到左边，把左边的 4 移到右边，直接算出 a 的值。",
      formula: math`2a-a=4-4\implies a=\;?`,
    },
  ],

  p127: [
    {
      change: "把正切写成正弦除以余弦",
      text: "x→0 时这是 0/0 型。先用 tan(2x)=sin(2x)/cos(2x) 把分母改写，再把繁分式翻上去变成乘积。",
      formula: math`\begin{gathered}
        \tan(2x)=\frac{\sin(2x)}{\cos(2x)}\\[4pt]
        \lim_{x\to0}\frac{\sin(5x)\cos(2x)}{\sin(2x)}
      \end{gathered}`,
    },
    {
      change: "为两个正弦分别配齐对应的角",
      text: "对 x ≠ 0，给 sin(5x) 配上分母 5x，给分母的 sin(2x) 配上分子 2x，再在最前面补上系数 5/2 保持恒等。",
      formula: math`\begin{gathered}
        \lim_{x\to0}\left(\frac{5}{2}\cdot\frac{\sin(5x)}{5x}\right.\\[4pt]
        \left.\cdot\frac{2x}{\sin(2x)}\cdot\cos(2x)\right)
      \end{gathered}`,
    },
    {
      change: "三个因子分别趋于 1，只剩系数",
      text: "x→0 时 sin(5x)/(5x)→1、2x/sin(2x)→1，且 cos(2x)→cos 0=1。算出最后的乘积即可。",
      formula: math`\frac{5}{2}\times 1\times 1\times 1=\;?`,
    },
  ],

  p164: [
    {
      change: "写出偶次根号的非负条件",
      text: "实数范围内，平方根里面的表达式不能是负数，因此被开方数 4x+12 必须大于等于 0。",
      formula: math`4x+12\ge 0`,
    },
    {
      change: "移项把常数 12 移到不等号右边",
      text: "两边同时减去 12，把含 x 的项单独留在左边。",
      formula: math`4x\ge -12`,
    },
    {
      change: "两边同除以 4，读出定义域左端",
      text: "除以正数 4 不改变不等号方向，算出的下界就是定义域的左端点。",
      formula: math`x\ge\frac{-12}{4}=\;?`,
    },
  ],

  p165: [
    {
      change: "根号在分母，要求被开方数严格大于 0",
      text: "不仅根号里面不能为负，分母还不能为 0，所以 25−x² 必须严格大于 0（不能取等号）。",
      formula: math`25-x^2>0`,
    },
    {
      change: "解二次不等式，找出开区间端点",
      text: "移项得 x² < 25，也就是 |x| < 5，因此定义域是开区间 (−5, 5)。",
      formula: math`x^2<25\iff -5<x<5`,
    },
    {
      change: "用右端点减去左端点求区间长度",
      text: "虽然两个端点都取不到，但开区间 (a, b) 的长度依然是 b−a。算出差值即可。",
      formula: math`5-(-5)=\;?`,
    },
  ],

  p166: [
    {
      change: "写出反正弦函数的输入范围",
      text: "因为正弦值始终落在 [−1, 1] 之间，所以反正弦 arcsin 的自变量 x−5 也必须满足 −1 ≤ x−5 ≤ 1。",
      formula: math`-1\le x-5\le 1`,
    },
    {
      change: "三边同时加 5，解出 x 的区间",
      text: "不等式三边同时加上 5，把中间单独化为 x，得到定义域的左右两个端点。",
      formula: math`-1+5\le x\le 1+5`,
    },
    {
      change: "只取右端点，完成加法",
      text: "题目问的是定义域的右端，算出右边的不等式上界即可。",
      formula: math`x_{\max}=1+5=\;?`,
    },
  ],

  p167: [
    {
      change: "用 x > 2 的分支求右极限",
      text: "x→2⁺ 表示从 2 的右侧靠近，满足 x > 2，因此用第三段 x+3。点值 f(2)=3 不参与极限计算。",
      formula: math`\begin{gathered}
        \lim_{x\to2^+}f(x)=\lim_{x\to2^+}(x+3)\\[4pt]
        =2+3=5
      \end{gathered}`,
    },
    {
      change: "用 x < 2 的分支求左极限",
      text: "x→2⁻ 表示从 2 的左侧靠近，满足 x < 2，因此用第一段 x−4，直接代入 x=2。",
      formula: math`\begin{gathered}
        \lim_{x\to2^-}f(x)=\lim_{x\to2^-}(x-4)\\[4pt]
        =2-4=-2
      \end{gathered}`,
    },
    {
      change: "用右极限减去左极限",
      text: "把刚才算出的两个单侧极限相减，注意减去 −2 时符号要变成加 2。",
      formula: math`5-(-2)=\;?`,
    },
  ],

  p168: [
    {
      change: "把分子写成平方差乘积",
      text: "注意到 16=4²，分子 x²−16 可以因式分解为 (x−4)(x+4)，正好包含分母里的 x+4。",
      formula: math`\lim_{x\to4}\frac{(x-4)(x+4)}{x+4}`,
    },
    {
      change: "约掉不为 0 的公因式 x+4",
      text: "当 x 靠近 4 时，x+4 靠近 8，不等于 0，因此可以合法约去上下共同的 x+4。",
      formula: math`\lim_{x\to4}(x-4)`,
    },
    {
      change: "把 x=4 代入，完成减法",
      text: "剩下的 x−4 处处连续，直接代入 x=4 算出结果。",
      formula: math`4-4=\;?`,
    },
  ],

  p169: [
    {
      change: "识别 ∞/∞ 型，找出最高次幂 x²",
      text: "当 x→∞ 时分子和分母都趋向无穷，属于 ∞/∞ 型。两边的最高次项都是 x²。",
      formula: math`\lim_{x\to\infty}\frac{3x^2-5}{7x^2+2}`,
    },
    {
      change: "分子分母同时除以最高次 x²",
      text: "在 x ≠ 0 时，把分子和分母的每一项都除以 x²，把低次项变成趋向 0 的分式。",
      formula: math`\lim_{x\to\infty}\frac{3-\frac{5}{x^2}}{7+\frac{2}{x^2}}`,
    },
    {
      change: "让 1/x² 项归零，留下首项系数比",
      text: "当 x→∞ 时 5/x²→0 且 2/x²→0，分母趋近 7 ≠ 0，直接算出剩下的分数即可。",
      formula: math`\frac{3-0}{7+0}=\;?`,
    },
  ],

  p170: [
    {
      change: "用等差求和公式改写分子",
      text: "分子 1+2+⋯+(n−1) 是首项为 1、末项为 n−1、共 n−1 项的等差数列，首尾配对求和得 n(n−1)/2。",
      formula: math`1+2+\cdots+(n-1)=\frac{n(n-1)}{2}`,
    },
    {
      change: "代回原式，合并分母系数",
      text: "把分子换成 n(n−1)/2，分母的 2 与原来的 3n² 相乘变成 6n²。",
      formula: math`\lim_{n\to\infty}\frac{n(n-1)}{6n^2}`,
    },
    {
      change: "分子分母同除以最高次 n²",
      text: "将 n(n−1)=n²−n 的每一项都除以 n²，分母 6n² 除以 n² 后只剩常数 6。",
      formula: math`\lim_{n\to\infty}\frac{1-\frac{1}{n}}{6}`,
    },
    {
      change: "令 1/n→0，算出最终分数",
      text: "当 n→∞ 时 1/n→0，代入后只剩简单的分数运算。",
      formula: math`\frac{1-0}{6}=\;?`,
    },
  ],

  p171: [
    {
      change: "用倍角公式把分子改写成正弦平方",
      text: "x→0 时这是 0/0 型。利用倍角公式 1−cos(2θ)=2sin²θ，取 θ=3x，把分子变成乘积形式。",
      formula: math`\begin{gathered}
        1-\cos(6x)=2\sin^2(3x)\\[4pt]
        \lim_{x\to0}\frac{2\sin^2(3x)}{x\sin(2x)}
      \end{gathered}`,
    },
    {
      change: "写出分子分母各因子的等价无穷小",
      text: "现在分子和分母完全由乘积因子组成，没有加减抵消，可以安全使用 sin u ~ u。",
      formula: math`\begin{gathered}
        \sin(3x)\sim 3x\\[4pt]
        \sin(2x)\sim 2x
      \end{gathered}`,
    },
    {
      change: "整体替换乘除因子并展开平方",
      text: "把 sin(3x) 换成 3x、sin(2x) 换成 2x，注意分子里 3x 平方后系数是 9，再乘 2 得 18。",
      formula: math`\begin{gathered}
        \lim_{x\to0}\frac{2(3x)^2}{x\cdot 2x}\\[4pt]
        =\lim_{x\to0}\frac{18x^2}{2x^2}
      \end{gathered}`,
    },
    {
      change: "约掉 x²，只剩数字除法",
      text: "趋近 0 时 x ≠ 0，约去上下共同的 x²，算出最后的商即可。",
      formula: math`\frac{18}{2}=\;?`,
    },
  ],

  p172: [
    {
      change: "确认 0/0 型，分解分母 1−x⁴",
      text: "x→1 时分子分母都为 0。用公式 1−x⁴=(1−x)(1+x+x²+x³)（或连续两次平方差）把公因式 1−x 提出来。",
      formula: math`\begin{gathered}
        1-x^4=(1-x)(1+x+x^2+x^3)\\[4pt]
        \lim_{x\to1}\frac{1-x}{(1-x)(1+x+x^2+x^3)}
      \end{gathered}`,
    },
    {
      change: "约去公因式 1−x",
      text: "求极限时只看 x ≠ 1 的点，所以 1−x ≠ 0，可以合法约去，分子留下 1。",
      formula: math`\lim_{x\to1}\frac{1}{1+x+x^2+x^3}`,
    },
    {
      change: "把 x=1 代入分母的四项",
      text: "分母现在不再为 0，把 x 换成 1，四项都变成 1，算出分母后写出分数即可。",
      formula: math`\frac{1}{1+1+1+1}=\;?`,
    },
  ],

  p173: [
    {
      change: "用 x < 0 分支求左极限",
      text: "接缝在 x=0。从左侧靠近时用第一段 3e^x，因为指数函数连续，直接代入 x=0，记住 e⁰=1。",
      formula: math`\begin{gathered}
        \lim_{x\to0^-}f(x)=\lim_{x\to0^-}3e^x\\[4pt]
        =3e^0=3\times 1
      \end{gathered}`,
    },
    {
      change: "用 x ≥ 0 分支求右极限与点值",
      text: "从右侧靠近以及在 x=0 本身都用第二段 a+2x，代入 x=0 得到右极限和 f(0) 都是 a。",
      formula: math`\lim_{x\to0^+}f(x)=f(0)=a+0=a`,
    },
    {
      change: "令左右两侧相等，算出 a",
      text: "要让两段曲线在 x=0 处接上，左极限必须等于右极限与点值，算出右边的乘积即可。",
      formula: math`a=3\times 1=\;?`,
    },
  ],

  p174: [
    {
      change: "把 x=2 代入多项式的每一项",
      text: "先照着 f(x)=x⁵−4x−2 的结构，把所有的 x 都替换成 2。",
      formula: math`f(2)=2^5-4\times 2-2`,
    },
    {
      change: "先分别算出乘方和乘法",
      text: "按运算顺序先算 2⁵=32 和 4×2=8，减号和常数 −2 先保持不动。",
      formula: math`2^5=32,\quad 4\times 2=8`,
    },
    {
      change: "整理成纯减法，算出右端值",
      text: "把结果代回原式做减法，算完后可以顺便观察它与 f(1)=−5 异号，说明 (1, 2) 内必有零点。",
      formula: math`f(2)=32-8-2=\;?`,
    },
  ],

  p204: [
    {
      change: "先取绝对值，消去正负交替",
      text: "只看 aₙ 到 0 的距离时，|(-1)ⁿ|=1，且 2n+1 > 0，于是绝对值可以化简为简单的正分式。",
      formula: math`|a_n|=\left|\frac{3(-1)^n}{2n+1}\right|=\frac{3}{2n+1}`,
    },
    {
      change: "缩小分母，找到更简单的上界",
      text: "因为 2n+1 > 2n > 0，把分母变小会让整个分数变大，从而得到容易求极限的上界 3/(2n)。",
      formula: math`0<\frac{3}{2n+1}<\frac{3}{2n}`,
    },
    {
      change: "去掉绝对值，写成双边夹逼式",
      text: "由 |aₙ| < 3/(2n) 可把 aₙ 夹在对称的负上界和正上界之间。",
      formula: math`-\frac{3}{2n}<a_n<\frac{3}{2n}`,
    },
    {
      change: "求出左右两端的极限，准备收尾",
      text: "当 n→∞ 时左右两边都趋向 0。请你由夹逼准则写出 aₙ 收敛及最终极限结论，再核对参考答案。",
      formula: math`\begin{gathered}
        \lim_{n\to\infty}\left(-\frac{3}{2n}\right)=0\\[4pt]
        \lim_{n\to\infty}\frac{3}{2n}=0
      \end{gathered}`,
    },
  ],

  p205: [
    {
      change: "抽出偶数项子列 n=2k",
      text: "把下标取成偶数 n=2k（k=1, 2, ⋯），此时 (−1)^(2k)=1，偶数项恒为同一个常数。",
      formula: math`a_{2k}=4+2(-1)^{2k}=4+2=6`,
    },
    {
      change: "抽出奇数项子列 n=2k−1",
      text: "再把下标取成奇数 n=2k−1（k=1, 2, ⋯），此时 (−1)^(2k−1)=−1，奇数项恒为另一个常数。",
      formula: math`a_{2k-1}=4+2(-1)^{2k-1}=4-2=2`,
    },
    {
      change: "对比两条子列的极限，引出矛盾",
      text: "两条子列分别趋向 6 和 2，彼此不相等。请你结合“若数列收敛，则任意子列必收敛到同一极限”写出完整结论，再核对参考答案。",
      formula: math`\begin{gathered}
        \lim_{k\to\infty}a_{2k}=6\\[4pt]
        \lim_{k\to\infty}a_{2k-1}=2,\quad 6\ne 2
      \end{gathered}`,
    },
  ],

  p206: [
    {
      change: "先把分子的公因数 2 提到绝对值外",
      text: "因为 |2x−6|=|2(x−3)|=2|x−3|，提取 2 后更容易按 x−3 的正负分类去掉绝对值。",
      formula: math`\frac{|2x-6|}{x-3}=\frac{2|x-3|}{x-3}`,
    },
    {
      change: "从左侧靠近 3：x < 3 时去绝对值加负号",
      text: "当 x→3⁻ 时 x−3 < 0，所以 |x−3|=−(x−3)。约去不为 0 的 x−3 后得到左极限。",
      formula: math`\begin{gathered}
        \lim_{x\to3^-}\frac{-2(x-3)}{x-3}\\[4pt]
        =\lim_{x\to3^-}(-2)=-2
      \end{gathered}`,
    },
    {
      change: "从右侧靠近 3：x > 3 时直接去绝对值",
      text: "当 x→3⁺ 时 x−3 > 0，所以 |x−3|=x−3。约去 x−3 后得到右极限。",
      formula: math`\begin{gathered}
        \lim_{x\to3^+}\frac{2(x-3)}{x-3}\\[4pt]
        =\lim_{x\to3^+}2=2
      \end{gathered}`,
    },
    {
      change: "比较左右极限，准备写出判断",
      text: "左极限与右极限都存在但不相等。请你据此写出双侧极限是否存在的结论，再核对参考答案。",
      formula: math`\begin{gathered}
        \lim_{x\to3^-}f(x)=-2\\[4pt]
        \lim_{x\to3^+}f(x)=2
      \end{gathered}`,
    },
  ],

  p207: [
    {
      change: "用最大和最小分母夹住每一项",
      text: "对 k=1, 2, ⋯, n，有 n² < n²+2k ≤ n²+2n。分母越大分数越小，由此给通项定出上下界。",
      formula: math`\frac{n}{n^2+2n}\le\frac{n}{n^2+2k}\le\frac{n}{n^2}`,
    },
    {
      change: "把 n 项的不等式相加，夹住总和 Sₙ",
      text: "求和号里共有 n 项，把上下界各自加 n 次（即乘以 n），就能夹住整个和式 Sₙ。",
      formula: math`n\cdot\frac{n}{n^2+2n}\le S_n\le n\cdot\frac{n}{n^2}`,
    },
    {
      change: "化简左右两端的分式",
      text: "左边分子分母同约去 n 得到 n/(n+2)，右边直接约成常数 1。",
      formula: math`\frac{n}{n+2}\le S_n\le 1`,
    },
    {
      change: "求左端极限，与右端 1 对齐",
      text: "左端上下同除以 n 后当 n→∞ 趋于 1，与右端常数 1 相同。请你由夹逼准则写出 Sₙ 收敛及极限结论，再核对参考答案。",
      formula: math`\begin{gathered}
        \lim_{n\to\infty}\frac{n}{n+2}\\[4pt]
        =\lim_{n\to\infty}\frac{1}{1+\frac{2}{n}}=1
      \end{gathered}`,
    },
  ],

  p208: [
    {
      change: "用数学归纳法证明数列单调递增",
      text: "先算 a₂=√7 > 1=a₁。假设 aₙ ≥ aₙ₋₁，因为 √(6+t) 单调递增，两边加 6 再开方即得 aₙ₊₁ ≥ aₙ。",
      formula: math`\begin{gathered}
        a_2=\sqrt{7}>1=a_1\\[4pt]
        a_n\ge a_{n-1}\implies a_{n+1}\ge a_n
      \end{gathered}`,
    },
    {
      change: "用数学归纳法证明数列有上界 3",
      text: "首项 a₁=1 < 3。假设 aₙ < 3，代入递推式得 aₙ₊₁=√(6+aₙ) < √(6+3)=3。由此数列单调递增且有上界。",
      formula: math`\begin{gathered}
        a_1=1<3\\[4pt]
        a_n<3\implies a_{n+1}<\sqrt{6+3}=3
      \end{gathered}`,
    },
    {
      change: "先确认极限 L 存在，再对递推式取极限",
      text: "由单调有界准则，极限 L 一定存在。对 aₙ₊₁=√(6+aₙ) 两边令 n→∞，平方后化为关于 L 的二次方程。",
      formula: math`\begin{gathered}
        L=\sqrt{6+L}\\[4pt]
        L^2-L-6=0
      \end{gathered}`,
    },
    {
      change: "因式分解并结合 L ≥ 1 筛选根",
      text: "方程有两个根，但数列从 a₁=1 往上递增，极限必满足 L ≥ 1。请你舍去增根写出最终极限 L，再核对参考答案。",
      formula: math`(L-3)(L+2)=0,\quad L\ge 1`,
    },
  ],

  p209: [
    {
      change: "情况一：|x|<1 时 x^(2n)→0",
      text: "当 |x| < 1 时底数 x² < 1，反复相乘越来越小，n→∞ 时 x^(2n)→0，直接代入即可算出这一段的极限。",
      formula: math`\begin{gathered}
        |x|<1:\;x^{2n}\to 0\\[4pt]
        \lim_{n\to\infty}\frac{2-x^{2n}}{2+x^{2n}}\\[4pt]
        =\frac{2-0}{2+0}=1
      \end{gathered}`,
    },
    {
      change: "情况二：|x|=1 时 x^(2n) 恒为 1",
      text: "当 x=1 或 x=−1 时，偶数次幂 x^(2n)=(x²)ⁿ=1ⁿ=1 恒成立，分式变成常数列。",
      formula: math`\begin{gathered}
        |x|=1:\;x^{2n}=1\\[4pt]
        \lim_{n\to\infty}\frac{2-1}{2+1}=\frac{1}{3}
      \end{gathered}`,
    },
    {
      change: "情况三：|x|>1 时同除以 x^(2n)",
      text: "当 |x| > 1 时 x^(2n)→∞，属于 ∞/∞ 型。分子分母同除以 x^(2n)，利用 2/x^(2n)→0 求出这一段的极限。",
      formula: math`\begin{gathered}
        |x|>1:\;\frac{2}{x^{2n}}\to 0\\[4pt]
        \lim_{n\to\infty}\frac{\frac{2}{x^{2n}}-1}{\frac{2}{x^{2n}}+1}\\[4pt]
        =\frac{0-1}{0+1}=-1
      \end{gathered}`,
    },
    {
      change: "汇总分段函数，准备判断间断点",
      text: "把三段拼成完整的极限函数 g(x)。请你分别比较 x=1 和 x=−1 处的左右极限，写出间断点位置及类型，再核对参考答案。",
      formula: math`g(x)=\begin{cases}1,&|x|<1\\1/3,&|x|=1\\-1,&|x|>1\end{cases}`,
    },
  ],

  p210: [
    {
      change: "确认多项式连续，先算左侧测试点",
      text: "f(x)=x³−4x+1 是多项式，在全体实数上连续，可以在任意闭区间上使用零点定理。先代入 x=−3 和 x=−2 看符号。",
      formula: math`\begin{gathered}
        f(-3)=-27+12+1=-14<0\\[4pt]
        f(-2)=-8+8+1=1>0
      \end{gathered}`,
    },
    {
      change: "再算 0、1、2 处的函数值与符号",
      text: "继续试探几个小整数点，观察函数值如何多次穿过横轴（正负交替）。",
      formula: math`\begin{gathered}
        f(0)=1>0,\quad f(1)=-2<0\\[4pt]
        f(2)=8-8+1=1>0
      \end{gathered}`,
    },
    {
      change: "列出三段互不相交的异号区间",
      text: "在 (−3, −2)、(0, 1)、(1, 2) 这三段互不相交的开区间端点处函数值均异号。请你结合零点定理与“三次多项式最多有三个实根”完成最终证明，再核对参考答案。",
      formula: math`\begin{gathered}
        f(-3)f(-2)<0\\[4pt]
        f(0)f(1)<0,\quad f(1)f(2)<0
      \end{gathered}`,
    },
  ],
};

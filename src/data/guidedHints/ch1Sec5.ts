import type { GuidedHint } from "../learning";

const math = String.raw;

export const ch1Sec5GuidedHints: Record<string, GuidedHint[]> = {
  "jc935-1-5-1-1": [
    {
      change: "先检查分母在 x=2 时是否为零",
      text: "遇到分式极限，第一步永远是把目标点 x=2 代进分母看它会不会变成 0。这里 2−6=−4 ≠ 0，分母没有挡路，不需要约分或变形。",
      formula: math`\begin{gathered}
        x=2:\;x-6=2-6=-4\ne 0\\[4pt]
        \lim_{x\to 2}\frac{x^2+8}{x-6}
      \end{gathered}`,
    },
    {
      change: "分子分母分别取极限",
      text: "分子 x²+8 和分母 x−6 都是多项式，在 x=2 处极限都存在，且分母极限非零，因此可以合法套用商的极限法则。",
      formula: math`\frac{\lim_{x\to 2}(x^2+8)}{\lim_{x\to 2}(x-6)}`,
    },
    {
      change: "把 x 换成 2，只剩整数运算",
      text: "将 x=2 分别代入分子和分母。请算出分子与分母的数值并做除法（注意分母带负号），写出最终答案后对照参考解答。",
      formula: math`\frac{2^2+8}{2-6}=\;?`,
    },
  ],

  "jc935-1-5-1-2": [
    {
      change: "分别代入试探，确认不是 0/0 型",
      text: "先别急着因式分解！把 x=2 分别代入分子和分母：分子 2²−4=0，但分母 2²+5=9 ≠ 0。分子趋零而分母稳定非零，这并不是未定式。",
      formula: math`\begin{gathered}
        x=2:\;x^2-4=0,\\[2pt]
        x^2+5=9\ne 0
      \end{gathered}`,
    },
    {
      change: "分母极限非零，应用商的极限法则",
      text: "因为分子和分母的极限都存在，且分母的极限不为 0，可以直接把极限拆成“分子的极限除以分母的极限”。",
      formula: math`\frac{\lim_{x\to 2}(x^2-4)}{\lim_{x\to 2}(x^2+5)}`,
    },
    {
      change: "把 x=2 代入，算出最终商",
      text: "将 x=2 代入多项式，只剩下 0 除以一个正数。请完成最后的除法，写出结论并对照参考解答。",
      formula: math`\frac{2^2-4}{2^2+5}=\;?`,
    },
  ],

  "jc935-1-5-1-3": [
    {
      change: "先试代入，确认是 0/0 型",
      text: "把 x=3 代入分子得 (3−3)²=0，代入分母得 3²−9=0。这是 0/0 型未定式，不能直接用商的极限法则，要先找出共同的零因子 x−3。",
      formula: math`\begin{gathered}
        x=3:\;(x-3)^2=0,\;x^2-9=0\\[4pt]
        \lim_{x\to 3}\frac{(x-3)^2}{x^2-9}
      \end{gathered}`,
    },
    {
      change: "把分母用平方差公式拆开",
      text: "分母 x²−9 可以分解为 (x−3)(x+3)，这样公因子 x−3 就显露出来了。分子 (x−3)² 暂时原样保留。",
      formula: math`\lim_{x\to 3}\frac{(x-3)^2}{(x-3)(x+3)}`,
    },
    {
      change: "在 x≠3 时约掉一份 x−3",
      text: "求 x→3 的极限只看靠近 3 但不等于 3 的点，此时 x−3 ≠ 0，可以合法约去一份 x−3。注意分子原本是平方，约掉一份后还剩一份 x−3。",
      formula: math`\lim_{x\to 3}\frac{x-3}{x+3}`,
    },
    {
      change: "分母极限非零，代入 x=3",
      text: "现在分母在 x=3 处等于 6 ≠ 0，不再是未定式，可以直接代入分子和分母。请算出结果并对照参考解答。",
      formula: math`\frac{3-3}{3+3}=\;?`,
    },
  ],

  "jc935-1-5-1-4": [
    {
      change: "先试代入 x=0，确认是 0/0 型",
      text: "当 x=0 时，分子和分母的每一项都含 x，结果都是 0。这是 0/0 型未定式，需要把上下共同的因子 x 提出来消掉。",
      formula: math`\lim_{x\to 0}\frac{5x^3-x^2+3x}{4x^2+2x}`,
    },
    {
      change: "分子和分母同时提取公因子 x",
      text: "把分子写成 x(5x²−x+3)，分母写成 x(4x+2)，先不要急着约分，确认每一项提掉一次 x 后的次数都正确。",
      formula: math`\lim_{x\to 0}\frac{x(5x^2-x+3)}{x(4x+2)}`,
    },
    {
      change: "在 x≠0 的去心邻域约掉 x",
      text: "求极限时 x 趋近 0 但不等于 0，因此 x ≠ 0，可以把分子和分母共有的因子 x 合法约去。",
      formula: math`\lim_{x\to 0}\frac{5x^2-x+3}{4x+2}`,
    },
    {
      change: "把 x=0 代入剩下的分式",
      text: "约分后分母在 x=0 处等于 2 ≠ 0，可以直接套用商的极限法则代入 x=0。请算出最终分数并对照参考解答。",
      formula: math`\frac{5\cdot 0^2-0+3}{4\cdot 0+2}=\;?`,
    },
  ],

  "jc935-1-5-1-5": [
    {
      change: "确认变量是 h，且为 0/0 型",
      text: "这里趋近 0 的变量是 h，字母 a 当作固定常数。代入 h=0 时分子是 a²−a²=0，分母也是 0，属于 0/0 型未定式，要先展开分子化简。",
      formula: math`\lim_{h\to 0}\frac{(a+2h)^2-a^2}{h}`,
    },
    {
      change: "展开完全平方 (a+2h)²",
      text: "按 (u+v)²=u²+2uv+v² 展开分子第一项，注意中间项是 2·a·2h=4ah，不要漏掉其中一个 2。其余部分照抄。",
      formula: math`\lim_{h\to 0}\frac{a^2+4ah+4h^2-a^2}{h}`,
    },
    {
      change: "抵消 a² 并提取公因子 h",
      text: "分子里的 a² 与 −a² 正好抵消，剩下 4ah+4h²，再把公共因子 h 提出来。",
      formula: math`\lim_{h\to 0}\frac{h(4a+4h)}{h}`,
    },
    {
      change: "在 h≠0 时约掉分母的 h",
      text: "求 h→0 的极限只考察 h ≠ 0 的点，可以把上下共同的因子 h 合法约去，分母消失。",
      formula: math`\lim_{h\to 0}(4a+4h)`,
    },
    {
      change: "把 h 换成 0，保留常数 a",
      text: "现在是关于 h 的一次多项式，可以直接把 h=0 代入。请化简结果并对照参考解答。",
      formula: math`4a+4\cdot 0=\;?`,
    },
  ],

  "jc935-1-5-1-6": [
    {
      change: "分别观察两个分式项的趋势",
      text: "当 |x| 无限增大时，分母 x 和 x² 的绝对值都无限增大，所以 2/x 和 5/x² 都会趋近 0，而常数 4 保持不变。",
      formula: math`\begin{gathered}
        |x|\to\infty:\;\frac{2}{x}\to 0,\;\frac{5}{x^2}\to 0\\[4pt]
        \lim_{|x|\to\infty}\left(4+\frac{2}{x}-\frac{5}{x^2}\right)
      \end{gathered}`,
    },
    {
      change: "三项极限都存在，拆开取极限",
      text: "因为三项各自都有有限极限，根据极限的加减运算法则，可以把整个极限拆成三项极限的加减。",
      formula: math`\begin{gathered}
        \lim_{|x|\to\infty}4
        +\lim_{|x|\to\infty}\frac{2}{x}\\[4pt]
        -\lim_{|x|\to\infty}\frac{5}{x^2}
      \end{gathered}`,
    },
    {
      change: "代入各项极限值完成运算",
      text: "把三项的极限值分别代入（注意原式本身并不恒等于 4，等号只在取极限后成立）。请算出结果并对照参考解答。",
      formula: math`4+0-0=\;?`,
    },
  ],

  "jc935-1-5-1-7": [
    {
      change: "认出 ∞/∞ 型，锁定最高次 x²",
      text: "当 |x|→∞ 时分子和分母都趋于无穷，是 ∞/∞ 型未定式。分子和分母的最高次都是 x²，处理这类分式的标准做法是上下同除以最高次幂 x²。",
      formula: math`\lim_{|x|\to\infty}\frac{5x^2+1}{3x^2+2x-4}`,
    },
    {
      change: "分子分母同除以 x²",
      text: "当 x ≠ 0 时，把分子和分母的每一项都除以 x²，分式的值保持不变，最高次项变成常数，其余项变成 1/x 或 1/x² 的倍数。",
      formula: math`\lim_{|x|\to\infty}\frac{5+\frac{1}{x^2}}{3+\frac{2}{x}-\frac{4}{x^2}}`,
    },
    {
      change: "确认分子和分母的极限并套用法则",
      text: "当 |x|→∞ 时，1/x 和 1/x² 都趋近 0，所以分子趋于 5，分母趋于 3 ≠ 0。由商的极限法则，直接写出两者的商即可。",
      formula: math`\frac{5+0}{3+0-0}=\;?`,
    },
  ],

  "jc935-1-5-1-8": [
    {
      change: "锁定分母的最高次幂 x⁴",
      text: "这是 |x|→∞ 时的 ∞/∞ 型未定式。注意分母的最高次是四次 x⁴，比分子的 x² 更高，所以要按分母的最高次 x⁴ 来同除。",
      formula: math`\lim_{|x|\to\infty}\frac{2x^2-x}{x^4+2x^2+1}`,
    },
    {
      change: "分子分母每一项同除以 x⁴",
      text: "在 x ≠ 0 时，分子分母同时除以 x⁴，确保分母里出现常数 1，而分子各项都变成负幂。",
      formula: math`\lim_{|x|\to\infty}\frac{\frac{2}{x^2}-\frac{1}{x^3}}{1+\frac{2}{x^2}+\frac{1}{x^4}}`,
    },
    {
      change: "检查分子分母极限并写出商",
      text: "当 |x|→∞ 时，1/x²、1/x³、1/x⁴ 都趋近 0。因此分母极限为 1 ≠ 0，可以应用商的极限法则。请算出最后的商并对照参考解答。",
      formula: math`\frac{0-0}{1+0+0}=\;?`,
    },
  ],

  "jc935-1-5-1-9": [
    {
      change: "试代入 x=5，确认是 0/0 型",
      text: "把 x=5 代入分子得 25−35+10=0，代入分母得 25−30+5=0。两者在 x=5 都为零，说明分子和分母一定都含有公因式 x−5。",
      formula: math`\lim_{x\to 5}\frac{x^2-7x+10}{x^2-6x+5}`,
    },
    {
      change: "分别把分子和分母因式分解",
      text: "用十字相乘分解两个二次多项式：分子的两根是 5 和 2，分母的两根是 5 和 1，不要把另一个根弄混。",
      formula: math`\lim_{x\to 5}\frac{(x-5)(x-2)}{(x-5)(x-1)}`,
    },
    {
      change: "在 x≠5 时约去公因式 x−5",
      text: "求 x→5 的极限只在去心邻域内进行，此时 x−5 ≠ 0，可以把分子和分母共同的因子 x−5 合法约去。",
      formula: math`\lim_{x\to 5}\frac{x-2}{x-1}`,
    },
    {
      change: "分母非零，代入 x=5 算结果",
      text: "约分后分母在 x=5 处等于 4 ≠ 0，可以直接代入 x=5。请算出最终分数并对照参考解答。",
      formula: math`\frac{5-2}{5-1}=\;?`,
    },
  ],

  "jc935-1-5-1-10": [
    {
      change: "先看第一个括号的极限",
      text: "乘积极限定理要求先确认每个因子各自都有有限极限。当 |x|→∞ 时 3/x → 0，所以第一个括号趋于 2。",
      formula: math`\lim_{|x|\to\infty}\left(2-\frac{3}{x}\right)=2-0=2`,
    },
    {
      change: "再看第二个括号的极限",
      text: "同理，当 |x|→∞ 时 1/x² → 0，所以第二个括号也存在有限极限，趋于 5。",
      formula: math`\lim_{|x|\to\infty}\left(5+\frac{1}{x^2}\right)=5+0=5`,
    },
    {
      change: "套用乘积极限定理并相乘",
      text: "两个因子都各自存在有限极限，因此原式的极限等于这两个极限的乘积。请完成最后的乘法并对照参考解答。",
      formula: math`\begin{gathered}
        \lim_{|x|\to\infty}\left(2-\frac{3}{x}\right)\\[2pt]
        \cdot\lim_{|x|\to\infty}\left(5+\frac{1}{x^2}\right)\\[4pt]
        =2\times 5=\;?
      \end{gathered}`,
    },
  ],

  "jc935-1-5-1-11": [
    {
      change: "展开几项，认出等比数列与项数",
      text: "把求和号展开来看：首项是 3⁰=1，公比 q=1/3。特别注意下标从 k=0 到 n，一共有 n+1 项而不是 n 项。",
      formula: math`\begin{gathered}
        \sum_{k=0}^{n}3^{-k}\\[4pt]
        =1+\frac{1}{3}+\cdots+\left(\frac{1}{3}\right)^{n}
      \end{gathered}`,
    },
    {
      change: "套用有限等比数列求和公式",
      text: "用首项为 1、公比为 1/3、项数为 n+1 的等比求和公式，把整串和缩成一个分式，避免直接对无限多项用加法法则。",
      formula: math`\lim_{n\to\infty}\frac{1-\left(\frac{1}{3}\right)^{n+1}}{1-\frac{1}{3}}`,
    },
    {
      change: "判断尾巴项 (1/3)^(n+1) 的极限",
      text: "因为底数 1/3 满足 0 < 1/3 < 1，当 n→∞ 时 (1/3)^(n+1) → 0。分母 1−1/3 是非零常数，可以直接代入极限值。",
      formula: math`\frac{1-0}{1-\frac{1}{3}}=\;?`,
    },
  ],

  "jc935-1-5-1-12": [
    {
      change: "提取分子的 2，看清末项是 n−1",
      text: "分子各项都是偶数，先把公因子 2 提出来。注意最后一项是 2(n−1)，提取 2 后括号里是从 1 加到 n−1，不是加到 n。",
      formula: math`\lim_{n\to\infty}\frac{2\bigl(1+2+\cdots+(n-1)\bigr)}{5n^2}`,
    },
    {
      change: "用等差求和公式化简分子",
      text: "前 n−1 个正整数的和为 (n−1)n/2，乘以外面的 2 正好消去分母 2，分子变成 n(n−1)。",
      formula: math`\begin{gathered}
        2\cdot\frac{(n-1)n}{2}=n(n-1)\\[4pt]
        \lim_{n\to\infty}\frac{n(n-1)}{5n^2}
      \end{gathered}`,
    },
    {
      change: "分子分母同除以 n²",
      text: "对 n ≥ 1，把分子 n(n−1)=n²−n 和分母 5n² 同除以 n²，消掉 ∞/∞ 结构。",
      formula: math`\lim_{n\to\infty}\frac{1-\frac{1}{n}}{5}`,
    },
    {
      change: "利用 1/n→0 写出算式",
      text: "当 n→∞ 时 1/n → 0，分母恒为 5 ≠ 0，应用极限四则运算法则即可。请算出结果并对照参考解答。",
      formula: math`\frac{1-0}{5}=\;?`,
    },
  ],

  "jc935-1-5-1-13": [
    {
      change: "把分母的 n³ 拆成三份配给每个括号",
      text: "分子是三个含 n 的一次括号相乘，不要急着全部展开。把分母的 7n³ 拆成 7·n·n·n，正好给每个括号分一个 n。",
      formula: math`\begin{gathered}
        \lim_{n\to\infty}\frac{1}{7}\cdot\frac{n+2}{n}\\[4pt]
        \cdot\frac{n+4}{n}\cdot\frac{n+6}{n}
      \end{gathered}`,
    },
    {
      change: "把每个分式拆成 1+c/n",
      text: "对每个括号里的分式逐项除以 n，变成三个形如 1+c/n 的简单因子，常数 1/7 留在前面。",
      formula: math`\begin{gathered}
        \lim_{n\to\infty}\frac{1}{7}\left(1+\frac{2}{n}\right)\\[4pt]
        \cdot\left(1+\frac{4}{n}\right)\left(1+\frac{6}{n}\right)
      \end{gathered}`,
    },
    {
      change: "各因子极限存在，相乘求结果",
      text: "当 n→∞ 时，2/n、4/n、6/n 都趋于 0，因此三个括号各自都趋于 1。由乘积极限定理，直接把各极限相乘，请写出答案并对照参考解答。",
      formula: math`\frac{1}{7}\cdot 1\cdot 1\cdot 1=\;?`,
    },
  ],

  "jc935-1-5-1-14": [
    {
      change: "认出 ∞−∞ 型，先分解 8−x³",
      text: "x→2 时两个分式都趋于无穷，属于 ∞−∞ 型未定式，绝不能直接相减得 0。先用立方差公式把 8−x³ 分解，方便找公分母。",
      formula: math`\begin{gathered}
        8-x^3=(2-x)(x^2+2x+4)\\[4pt]
        \lim_{x\to 2}\left(\frac{1}{2-x}\right.\\[2pt]
        \left.-\frac{12}{(2-x)(x^2+2x+4)}\right)
      \end{gathered}`,
    },
    {
      change: "通分合并成一个分式并整理分子",
      text: "以 (2−x)(x²+2x+4) 为公分母通分，把第一项的分子乘上 x²+2x+4，再减去 12，合并常数项得 x²+2x−8。",
      formula: math`\lim_{x\to 2}\frac{x^2+2x-8}{(2-x)(x^2+2x+4)}`,
    },
    {
      change: "把分子分解出因子 x−2",
      text: "通分后 x=2 仍是 0/0 型，将分子 x²+2x−8 因式分解为 (x−2)(x+4)。注意分子里是 x−2，分母里是 2−x，两者互为相反数。",
      formula: math`\lim_{x\to 2}\frac{(x-2)(x+4)}{(2-x)(x^2+2x+4)}`,
    },
    {
      change: "在 x≠2 时约掉 2−x 并保留负号",
      text: "在 x ≠ 2 的去心邻域内，利用 (x−2)/(2−x) = −1 约去零因子，负号放到分数前面。",
      formula: math`\lim_{x\to 2}\frac{-(x+4)}{x^2+2x+4}`,
    },
    {
      change: "分母非零，代入 x=2 算商",
      text: "此时分母在 x=2 处等于 4+4+4=12 ≠ 0，可以直接把 x=2 代入。请完成最后的约分计算并对照参考解答。",
      formula: math`-\frac{2+4}{2^2+2\cdot 2+4}=\;?`,
    },
  ],

  "jc935-1-5-2-1": [
    {
      change: "分别看分子和分母的极限与符号",
      text: "当 x→3 时，分子 x³+x² 趋于 27+9=36 > 0；分母 (x−3)² 趋于 0，并且因为带平方，无论从 3 的左侧还是右侧靠近，分母都严格大于 0。",
      formula: math`\begin{gathered}
        x^3+x^2\to 36>0\\[4pt]
        (x-3)^2\to 0^+
      \end{gathered}`,
    },
    {
      change: "用保号性给分子找一个正下界",
      text: "因为分子趋于 36，由极限的局部保号性，只要 x 足够靠近 3（在某个去心邻域内），就一定有 x³+x² > 18。",
      formula: math`x^3+x^2>18\quad(0<|x-3|<\delta)`,
    },
    {
      change: "放缩成更简单的下界并判断走势",
      text: "两边同除以正数 (x−3)²，不等号方向不变。当 x→3 时，右侧分母趋于 0⁺ 而分子为正常数 18，请据此写出原极限的最终结论并对照参考解答。",
      formula: math`\frac{x^3+x^2}{(x-3)^2}>\frac{18}{(x-3)^2}\to +\infty`,
    },
  ],

  "jc935-1-5-2-2": [
    {
      change: "认出 ∞/∞ 型，上下同除以 x",
      text: "当 x→+∞ 时分子分母都趋于正无穷，不能只看“两者都大”就下结论。对 x > 0，把分子分母同除以分母的最高次 x。",
      formula: math`\frac{x^2}{3x+5}=\frac{x}{3+\frac{5}{x}}\quad(x>0)`,
    },
    {
      change: "给分母找一个正的常数上界",
      text: "当 x→+∞ 时，分母 3+5/x 趋于 3。例如只要取 x > 5，就有 5/x < 1，从而分母满足 0 < 3+5/x < 4。",
      formula: math`0<3+\frac{5}{x}<4\quad(x>5)`,
    },
    {
      change: "用下界比较得出趋向",
      text: "分母变大，正分式反而变小，因此在 x > 5 时原分式严格大于 x/4。请结合 x/4 在 x→+∞ 时的趋势写出最终结论，并对照参考解答。",
      formula: math`\frac{x^2}{3x+5}>\frac{x}{4}\quad(x>5)`,
    },
  ],

  "jc935-1-5-2-3": [
    {
      change: "提出最高次幂 x³ 并拆开绝对值",
      text: "多项式本身在 x→+∞ 和 x→−∞ 时符号不同，但题目加了绝对值。先在 x ≠ 0 时提出最高次 x³，把绝对值拆成两个因子的乘积。",
      formula: math`\begin{gathered}
        |3x^3-2x+5|\\[4pt]
        =|x|^3\left|3-\frac{2}{x^2}+\frac{5}{x^3}\right|
      \end{gathered}`,
    },
    {
      change: "给第二个因子找一个正下界",
      text: "当 |x|→∞ 时，2/x² 和 5/x³ 都趋于 0，因此第二个因子趋于 3。由局部保号性，当 |x| 足够大（超过某个 M）时，它一定严格大于 2。",
      formula: math`\left|3-\frac{2}{x^2}+\frac{5}{x^3}\right|>2\quad(|x|>M)`,
    },
    {
      change: "得到正下界 2|x|³ 并下结论",
      text: "两边同乘非负的 |x|³，得到一个只含 |x|³ 的简单下界。当 |x|→∞ 时 2|x|³ 趋于正无穷，请据此写出最终结论并对照参考解答。",
      formula: math`|3x^3-2x+5|>2|x|^3\quad(|x|>M)`,
    },
  ],

  "jc935-1-5-3-1": [
    {
      change: "先取绝对值，避免误用乘法法则",
      text: "当 x→0 时 cos(2/x) 剧烈振荡、没有极限，不能把原式拆成两个极限相乘。改用夹逼思路，先在 x ≠ 0 时给整个表达式加上绝对值。",
      formula: math`\left|4x^2\cos\frac{2}{x}\right|=4x^2\left|\cos\frac{2}{x}\right|`,
    },
    {
      change: "用 |cos t|≤1 放缩掉振荡因子",
      text: "无论 2/x 取什么实数，余弦的绝对值都不超过 1。把振荡因子放大成 1，就得到一条两边夹住的不等式。",
      formula: math`0\le\left|4x^2\cos\frac{2}{x}\right|\le 4x^2`,
    },
    {
      change: "检查两端极限，准备套用夹逼准则",
      text: "当 x→0 时，左端常数为 0，右端 4x² 也趋近 0。请由夹逼准则说明绝对值（进而原式）的极限，写出完整结论后对照参考解答。",
      formula: math`\lim_{x\to 0}0=0,\quad\lim_{x\to 0}4x^2=0`,
    },
  ],

  "jc935-1-5-3-2": [
    {
      change: "先用反正切的有界性给出分子上界",
      text: "注意 arctan x 在 |x|→∞ 时不会无限长大，它的值域被严格限制在 (−π/2, π/2) 内，因此对所有实数 x 都有 |arctan x| < π/2。",
      formula: math`|\arctan x|<\frac{\pi}{2}\quad(x\in\mathbb{R})`,
    },
    {
      change: "对整个分式取绝对值并放缩",
      text: "在 x ≠ 0 时对原分式取绝对值，再把分子里的 |arctan x| 放大成 π/2，约去分子分母的 2，就得到不含反正切的简单上界。",
      formula: math`0\le\left|\frac{2\arctan x}{3x}\right|<\frac{\pi}{3|x|}`,
    },
    {
      change: "检查两端在 |x|→∞ 时的极限",
      text: "当 |x|→∞ 时，左端为 0，右端 π/(3|x|) 也趋于 0。请应用夹逼准则写出最终结论，并对照参考解答。",
      formula: math`\lim_{|x|\to\infty}\frac{\pi}{3|x|}=0`,
    },
  ],

  "jc935-1-5-4-1": [
    {
      change: "区分“最终成立”与“对每个 n 成立”",
      text: "由极限保号性只能推出：从某个充分大的下标 N 起有 aₙ < bₙ。但极限管不到开头几项，因此题目问“是否对每个 n 都成立”，应优先尝试举反例推翻。",
      formula: math`\begin{gathered}
        a_n\to 0,\;b_n\to 2\\[4pt]
        \forall n\ge 1,\;a_n<b_n\;?
      \end{gathered}`,
    },
    {
      change: "构造满足非负与极限条件的两列数",
      text: "让 aₙ 从大于 2 的数降向 0，同时让 bₙ 从小于 2 的正数升向 2，例如取下面的具体通项。先确认对所有 n ≥ 1 都有 aₙ ≥ 0、bₙ ≥ 0，且极限分别为 0 和 2。",
      formula: math`\begin{gathered}
        a_n=\frac{3}{n}\to 0\\[4pt]
        b_n=2-\frac{1}{n}\to 2
      \end{gathered}`,
    },
    {
      change: "代入 n=1 检验第一项的大小关系",
      text: "要推翻全称命题，只需找到一个反例下标。把 n=1 代入算出 a₁ 和 b₁，比较两者大小后写出最终结论，并对照参考解答。",
      formula: math`a_1=\frac{3}{1},\quad b_1=2-\frac{1}{1}`,
    },
  ],

  "jc935-1-5-4-2": [
    {
      change: "明确目标：找一个下标违反 bₙ < cₙ",
      text: "即使 cₙ 最终会冲向正无穷，它在开头几项也可以取很小的值；只要找到某一个 n 满足 bₙ ≥ cₙ，就能推翻“对每个 n 都有 bₙ < cₙ”。",
      formula: math`\begin{gathered}
        b_n\to 2,\;c_n\to +\infty\\[4pt]
        \exists\,n:\;b_n\ge c_n\;?
      \end{gathered}`,
    },
    {
      change: "构造起点相反的两列非负数",
      text: "让 bₙ 从高于 2 的位置慢慢降向 2，让 cₙ 从 1 起步线性增大到正无穷。检查两列对一切 n ≥ 1 都非负，且满足题给极限条件。",
      formula: math`\begin{gathered}
        b_n=2+\frac{4}{n}\to 2\\[4pt]
        c_n=n\to +\infty
      \end{gathered}`,
    },
    {
      change: "算出 n=1 时的值并比较",
      text: "把 n=1 代入两式算出 b₁ 和 c₁，看看是不是出现了 b₁ > c₁。请据此写出反例结论并对照参考解答。",
      formula: math`b_1=2+\frac{4}{1},\quad c_1=1`,
    },
  ],

  "jc935-1-5-4-3": [
    {
      change: "识别 0·∞ 未定式，准备举反例",
      text: "aₙ→0 而 cₙ→+∞ 时，乘积 aₙcₙ 是 0·∞ 型未定式，不能把 0 和无穷直接相乘。题目问“是否一定没有有限极限”，只要举出一对反例让乘积收敛到有限数就能推翻。",
      formula: math`\begin{gathered}
        a_n\to 0,\;c_n\to +\infty\\[4pt]
        a_n c_n\text{ finite limit?}
      \end{gathered}`,
    },
    {
      change: "让 aₙ 缩得比 cₙ 长得更快",
      text: "不妨令 cₙ=n，再挑一个分母增长更快的 aₙ=1/n²。检查两列都非负，且极限确实分别是 0 和 +∞。",
      formula: math`\begin{gathered}
        a_n=\frac{1}{n^2}\to 0\\[4pt]
        c_n=n\to +\infty
      \end{gathered}`,
    },
    {
      change: "先化简乘积，再判断它的极限",
      text: "把 aₙ 和 cₙ 乘在一起约分化简，再取 n→∞ 的极限。请算出该极限并说明它如何推翻原判断，最后对照参考解答。",
      formula: math`a_n c_n=\frac{1}{n^2}\cdot n=\frac{1}{n}\to\;?`,
    },
  ],

  "jc935-1-5-4-4": [
    {
      change: "用 bₙ→2 找出 bₙ>1 的门槛 N₁",
      text: "要证明 bₙcₙ→+∞，关键是先确保 bₙ 不会把 cₙ 拉小。因为 bₙ→2，取 ε=1，由数列极限定义存在 N₁，使从 N₁ 起 bₙ 与 2 的距离小于 1，从而 bₙ > 1。",
      formula: math`\begin{gathered}
        \exists\,N_1,\;\forall n\ge N_1:\\[2pt]
        b_n>2-1=1
      \end{gathered}`,
    },
    {
      change: "任给 M>0，用 cₙ→+∞ 找门槛 N₂",
      text: "按照正无穷极限的定义，先任取任意大的正数 M > 0。因为 cₙ→+∞，存在门槛 N₂，使从 N₂ 起 cₙ 严格大于 M。",
      formula: math`\begin{gathered}
        \forall M>0,\;\exists\,N_2:\\[2pt]
        n\ge N_2\implies c_n>M
      \end{gathered}`,
    },
    {
      change: "取较大门槛 N，合并两条不等式",
      text: "令 N=max(N₁, N₂)，则当 n ≥ N 时两条不等式同时成立，且 cₙ > M > 0，把 bₙ > 1 两边同乘 cₙ 即可得到关键放大。请补齐定义语言并对照参考解答。",
      formula: math`\begin{gathered}
        N=\max(N_1,N_2)\\[4pt]
        n\ge N\Longrightarrow b_n c_n>1\cdot c_n>M
      \end{gathered}`,
    },
  ],

  "jc935-1-5-5-1": [
    {
      change: "采用反证法：先假设 f+g 有有限极限",
      text: "不能直接对没有极限的 g 套用加法法则。改用反证法：假设 f(x)+g(x) 在 x→2 时存在有限极限 L，看看会推导出什么矛盾。",
      formula: math`\text{Assume }\lim_{x\to 2}\bigl(f(x)+g(x)\bigr)=L`,
    },
    {
      change: "把 g 改写成两个收敛函数的差",
      text: "恒等变形 g(x) = [f(x)+g(x)] − f(x)。现在等号右边的两部分在 x→2 时都各自有有限极限（分别是 L 和 4），可以合法使用减法极限法则。",
      formula: math`g(x)=\bigl(f(x)+g(x)\bigr)-f(x)`,
    },
    {
      change: "套用减法法则，指出矛盾",
      text: "由极限的减法运算法则，可推出 g(x) 在 x→2 时的有限极限等于 L−4，这与题给“g 没有有限极限”直接矛盾。请写出完整反证结论并对照参考解答。",
      formula: math`\lim_{x\to 2}g(x)=L-4`,
    },
  ],

  "jc935-1-5-5-2": [
    {
      change: "构造两列趋近 2 的特殊点列",
      text: "在 x→2 时，1/(x−2) 会冲向无穷，余弦在 −1 与 1 之间不断往返。选两列都趋近 2 的点，让 1/(x−2) 分别落在 2kπ 和 (2k+1)π 上。",
      formula: math`\begin{gathered}
        x_k=2+\frac{1}{2k\pi}\to 2\\[4pt]
        y_k=2+\frac{1}{(2k+1)\pi}\to 2
      \end{gathered}`,
    },
    {
      change: "代入算出两列点上的函数值",
      text: "在这两列点上，cos(2kπ)=1 而 cos((2k+1)π)=−1，所以 f 分别恒取 3 和 −3，g 分别恒取 −3 和 3。趋近同一点却得到不同极限值，说明 f 和 g 都没有有限极限。",
      formula: math`\begin{gathered}
        f(x_k)=3,\;f(y_k)=-3\\[4pt]
        g(x_k)=-3,\;g(y_k)=3
      \end{gathered}`,
    },
    {
      change: "把 f 与 g 在 x≠2 处直接相加",
      text: "虽然两个分量各自剧烈振荡，但在 x ≠ 2 的去心邻域内把它们直接相加，振荡部分恰好完全抵消。请写出 f、g 与 f+g 的最终结论并对照参考解答。",
      formula: math`\begin{gathered}
        x\ne 2:\;f(x)+g(x)\\[4pt]
        =3\cos\frac{1}{x-2}-3\cos\frac{1}{x-2}=0
      \end{gathered}`,
    },
  ],

  "jc935-1-5-5-3": [
    {
      change: "先求多项式 f(x) 的极限",
      text: "f(x)=(x−2)² 是多项式函数，在 x=2 处连续，直接代入就能看出它有有限极限 0。",
      formula: math`\lim_{x\to 2}f(x)=\lim_{x\to 2}(x-2)^2=0`,
    },
    {
      change: "分左右两侧考察 g(x) 的极限",
      text: "当 x 从右侧趋近 2 时 x−2 → 0⁺，倒数趋于 +∞；从左侧趋近 2 时 x−2 → 0⁻，倒数趋于 −∞。因此 g(x) 在 x→2 时没有有限极限。",
      formula: math`\begin{gathered}
        \lim_{x\to 2^+}\frac{1}{x-2}=+\infty\\[4pt]
        \lim_{x\to 2^-}\frac{1}{x-2}=-\infty
      \end{gathered}`,
    },
    {
      change: "在 x≠2 时先把乘积约分化简",
      text: "g 没有极限，所以不能把乘积极限拆开算，但可以先在 x ≠ 2 的去心邻域把乘积化简，再对化简后的表达式求极限。请算出极限并总结三者的结论，最后对照参考解答。",
      formula: math`\begin{gathered}x\ne 2:\\f(x)g(x)\\=(x-2)^2\cdot\frac{1}{x-2}=x-2\\\lim_{x\to 2}(x-2)=\;?\end{gathered}`,
    },
  ],

  "jc935-1-5-5-4": [
    {
      change: "先确认 f(x) 不会为零，倒数有意义",
      text: "定义倒数 g(x)=1/f(x) 之前，必须先检查分母会不会变成 0。因为 sin 的值总在 [−1, 1] 之间，所以 f(x) 恒落在 [1, 3] 内，在 x ≠ 1 时绝不为零。",
      formula: math`1\le 2+\sin\frac{1}{x-1}\le 3\quad(x\ne 1)`,
    },
    {
      change: "取两列趋近 1 的点暴露振荡",
      text: "让 1/(x−1) 分别取 2kπ+π/2 和 2kπ+3π/2，得到两列都从右侧趋近 1 的点列。此时 sin 分别取 1 和 −1，f 分别取 3 和 1，g 分别取 1/3 和 1，可见两者均无有限极限。",
      formula: math`\begin{gathered}
        x_k=1+\frac{1}{2k\pi+\pi/2}\\[2pt]
        \implies f(x_k)=3,\;g(x_k)=\frac{1}{3}\\[4pt]
        y_k=1+\frac{1}{2k\pi+3\pi/2}\\[2pt]
        \implies f(y_k)=1,\;g(y_k)=1
      \end{gathered}`,
    },
    {
      change: "在 x≠1 时直接化简乘积 f(x)g(x)",
      text: "对所有 x ≠ 1，因为 f(x) ≠ 0，互为倒数的两个函数相乘恒等于常数 1。请据此写出 f、g 和 fg 各自的极限结论，并对照参考解答。",
      formula: math`\begin{gathered}
        x\ne 1:\\[2pt]
        f(x)g(x)=f(x)\cdot\frac{1}{f(x)}=1
      \end{gathered}`,
    },
  ],

  "jc935-1-5-6": [
    {
      change: "移项构造非负的辅助数列 dₙ",
      text: "为了方便套用“非负数列的极限非负”这一基本性质，把不等式 aₙ ≥ bₙ+2 全部移到左边，记作新数列 dₙ=aₙ−bₙ−2，则当 n ≥ N 时有 dₙ ≥ 0。",
      formula: math`\begin{gathered}
        d_n=a_n-b_n-2\\[4pt]
        n\ge N\Longrightarrow d_n\ge 0
      \end{gathered}`,
    },
    {
      change: "用极限的四则运算求 dₙ 的极限",
      text: "因为 aₙ→A、bₙ→B 都存在有限极限，而 2 是常数，由加减法的极限运算法则，可以直接写出 dₙ 的极限。",
      formula: math`\begin{gathered}
        \lim_{n\to\infty}d_n=\lim_{n\to\infty}(a_n-b_n-2)\\[4pt]
        =A-B-2
      \end{gathered}`,
    },
    {
      change: "套用保号性得出不等式并移项",
      text: "从某项起恒非负的收敛数列，其极限也必然非负（注意这里保住的是 ≥，不能随便改成严格大于）。请把下面的不等式移项写出最终结论，并对照参考解答。",
      formula: math`A-B-2\ge 0`,
    },
  ],

  "jc935-1-5-7": [
    {
      change: "先用局部有界性给 |f(x)| 找上界",
      text: "因为 f(x)→A，取 ε₀=1，存在 δ₀ > 0 使当 0 < |x−3| < δ₀ 时 |f(x)−A| < 1。由三角不等式可把 |f(x)| 固定在一个常数上界 |A|+1 内，避免后面的误差系数随 x 失控。",
      formula: math`\begin{gathered}0<|x-3|<\delta_0\\\implies |f(x)-A|<1\\|f(x)|\le |A|+1\end{gathered}`,
    },
    {
      change: "给积差加减 f(x)B 并用三角不等式拆开",
      text: "在 f(x)g(x)−AB 中间添减 f(x)B，把两个变量的变化拆成两段，再套用三角不等式与上一步的 |f(x)| ≤ |A|+1。",
      formula: math`\begin{gathered}
        |f(x)g(x)-AB|\\[2pt]
        =\bigl|f(x)(g(x)-B)\\[2pt]
        \quad+B(f(x)-A)\bigr|\\[2pt]
        \le (|A|+1)|g(x)-B|\\[2pt]
        \quad+|B||f(x)-A|
      \end{gathered}`,
    },
    {
      change: "分别把两段误差压到 ε/2 以下",
      text: "任给 ε > 0。分别利用 g(x)→B 和 f(x)→A，找 δ₁、δ₂ > 0 控制两段误差。第二段分母写成 |B|+1 而不是 |B|，是为了防止 B=0 时出现除零。",
      formula: math`\begin{gathered}
        0<|x-3|<\delta_1:\\[2pt]
        |g(x)-B|<\frac{\varepsilon}{2(|A|+1)}\\[4pt]
        0<|x-3|<\delta_2:\\[2pt]
        |f(x)-A|<\frac{\varepsilon}{2(|B|+1)}
      \end{gathered}`,
    },
    {
      change: "取三个 δ 的最小值合并总误差",
      text: "令 δ=min(δ₀, δ₁, δ₂)，则当 0 < |x−3| < δ 时上面三个估计同时生效。请把两段误差代回总不等式，写出 ε/2 + ε/2 = ε 的收尾证明并对照参考解答。",
      formula: math`\begin{gathered}
        \delta=\min(\delta_0,\delta_1,\delta_2)\\[4pt]
        |f(x)g(x)-AB|<\frac{\varepsilon}{2}+\frac{\varepsilon}{2}
      \end{gathered}`,
    },
  ],
};

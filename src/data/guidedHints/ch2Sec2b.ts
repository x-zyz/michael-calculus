import type { GuidedHint } from "../learning";

const math = String.raw;

export const ch2Sec2bGuidedHints: Record<string, GuidedHint[]> = {
  "jc935-2-2-7-10": [
    {
      change: "令 u=3x，搭好外层对数求导框架",
      text: "题目给定真数 csc(3x)−cot(3x)>0 且 sin(3x)≠0。先设中间变量 u=3x，按外层自然对数的链式法则，把真数放到分母，再乘真数对 u 的导数与 u 对 x 的导数。",
      formula: math`\begin{gathered}
        u=3x\\[4pt]
        y'=\frac{(\csc u-\cot u)'_u}{\csc u-\cot u}\cdot u'
      \end{gathered}`,
    },
    {
      change: "分别算出 csc u、cot u 和 3x 的导数",
      text: "记住 (csc u)′=−csc u cot u，(cot u)′=−csc²u。中间原本是减号，减去 −csc²u 后负负得正变成 +csc²u；最内层 u′=3 乘在后面。",
      formula: math`\begin{gathered}
        (\csc u-\cot u)'_u=-\csc u\cot u+\csc^2 u\\[4pt]
        y'=\frac{-\csc u\cot u+\csc^2 u}{\csc u-\cot u}\cdot 3
      \end{gathered}`,
    },
    {
      change: "分子提出公因式 csc u，准备约分回代",
      text: "分子两项都含有 csc u，把它提出来后括号内恰好与分母完全相同。在真数 csc u−cot u>0 的前提下可以合法约去这个公因式。请完成约分并把 u=3x 代回，写出最终的 y′ 与可导条件，再对照参考解答。",
      formula: math`\begin{gathered}
        \csc u-\cot u>0\\[4pt]
        y'=\frac{\csc u(\csc u-\cot u)}{\csc u-\cot u}\cdot 3
      \end{gathered}`,
    },
  ],

  "jc935-2-2-8-1": [
    {
      change: "先对最外层平方求导",
      text: "这个函数从外到内是“平方 → 反正弦 → x/3”三层复合。先对外层平方求导，把指数 2 落下来，里面的 arcsin(x/3) 原样保留，再乘上中内层的导数。",
      formula: math`\begin{gathered}
        y'=2\arcsin\frac{x}{3}\\[4pt]
        \cdot\left(\arcsin\frac{x}{3}\right)'
      \end{gathered}`,
    },
    {
      change: "对中层反正弦求导",
      text: "在 |x|<3 时有 |x/3|<1，反正弦可导。套用 (arcsin u)′=1/√(1−u²)，把 u=x/3 代入，再保留最内层 (x/3)′。",
      formula: math`\begin{gathered}
        y'=2\arcsin\frac{x}{3}\\[4pt]
        \cdot\frac{1}{\sqrt{1-(x/3)^2}}\cdot\left(\frac{x}{3}\right)'
      \end{gathered}`,
    },
    {
      change: "乘上最内层 x/3 的导数 1/3",
      text: "最内层 (x/3)′=1/3，把三层因子合成一个分式，分母中出现 3√(1−x²/9)。",
      formula: math`y'=\frac{2\arcsin(x/3)}{3\sqrt{1-x^2/9}}`,
    },
    {
      change: "把分母的 3 平方后送进根号",
      text: "因为 3>0，可以把 3 写成 √9 并送进根号内相乘，去掉根号里的分母。请把根号内展开化简，写出最终的 y′ 并注明 |x|<3，再对照参考解答。",
      formula: math`\begin{gathered}
        3\sqrt{1-\frac{x^2}{9}}=\sqrt{9\left(1-\frac{x^2}{9}\right)}\\[4pt]
        y'=\frac{2\arcsin(x/3)}{\sqrt{9(1-x^2/9)}}
      \end{gathered}`,
    },
  ],

  "jc935-2-2-8-2": [
    {
      change: "令 u=x/3，写开外层对数导数",
      text: "在定义域 tan(x/3)>0 内，设 u=x/3。先对外层自然对数求导得到 1/tan u，再乘 tan u 对 u 的导数和 u 对 x 的导数。",
      formula: math`\begin{gathered}
        u=\frac{x}{3}\\[4pt]
        y'=\frac{1}{\tan u}\cdot(\tan u)'_u\cdot u'
      \end{gathered}`,
    },
    {
      change: "代入 tan u 与 x/3 的导数",
      text: "由基本求导公式得 (tan u)′=sec²u，而内层 u′=1/3，直接代进乘积里。",
      formula: math`y'=\frac{\sec^2 u}{\tan u}\cdot\frac{1}{3}`,
    },
    {
      change: "把 sec u 和 tan u 统一改写成正余弦",
      text: "利用 sec u=1/cos u 与 tan u=sin u/cos u，把分式里的一份 cos u 约掉，化成 sin u cos u 在分母的清爽形式。",
      formula: math`\begin{gathered}
        \frac{\sec^2 u}{\tan u}=\frac{1/\cos^2 u}{\sin u/\cos u}\\[4pt]
        =\frac{1}{\sin u\cos u}\\[4pt]
        y'=\frac{1}{3\sin u\cos u}
      \end{gathered}`,
    },
    {
      change: "分子分母同乘 2，凑出倍角正弦",
      text: "题目要求用倍角正弦化简：在分子分母同乘 2，分母就出现 2sin u cos u。请套用 2sin u cos u=sin(2u) 并把 u=x/3 代回，写出最终导数与定义域，再对照参考解答。",
      formula: math`\begin{gathered}
        y'=\frac{2}{3(2\sin u\cos u)}\\[4pt]
        u=\frac{x}{3},\quad \tan\frac{x}{3}>0
      \end{gathered}`,
    },
  ],

  "jc935-2-2-8-3": [
    {
      change: "先对最外层平方根求导",
      text: "在 x>0 时根号内 4+(ln x)²≥4>0，外层平方根处处可导。套用 (√w)′=1/(2√w)，再乘根号内部的导数。",
      formula: math`\begin{gathered}
        y'=\frac{1}{2\sqrt{4+(\ln x)^2}}\\[4pt]
        \cdot\bigl(4+(\ln x)^2\bigr)'
      \end{gathered}`,
    },
    {
      change: "对中层 (ln x)² 求导，常数 4 导数为 0",
      text: "常数 4 求导得 0；对 (ln x)² 用幂函数链式法则得 2(ln x)·(ln x)′，注意先把内层 (ln x)′ 写出来不要漏掉。",
      formula: math`\begin{gathered}
        y'=\frac{1}{2\sqrt{4+(\ln x)^2}}\\[4pt]
        \cdot 2(\ln x)\cdot(\ln x)'
      \end{gathered}`,
    },
    {
      change: "代入 (ln x)′=1/x，准备约去因子 2",
      text: "在 x>0 时 (ln x)′=1/x，把所有因子乘成一个分式。请约去分子分母公共的常数因子 2，写出最终结果并注明 x>0，再对照参考解答。",
      formula: math`y'=\frac{2\ln x}{2x\sqrt{4+(\ln x)^2}}\quad(x>0)`,
    },
  ],

  "jc935-2-2-8-4": [
    {
      change: "最外层指数求导保留原式",
      text: "外层是自然指数函数 e^w，求导后先照抄原式 e^(arctan√(2x))，再乘指数部分对 x 的导数。",
      formula: math`\begin{gathered}
        y'=e^{\arctan\sqrt{2x}}\\[4pt]
        \cdot\bigl(\arctan\sqrt{2x}\bigr)'
      \end{gathered}`,
    },
    {
      change: "对中层反正切求导",
      text: "套用 (arctan u)′=1/(1+u²)，把 u=√(2x) 代入，得到 1/(1+(√(2x))²)=1/(1+2x)，后面继续接上最内层 (√(2x))′。",
      formula: math`\begin{gathered}
        y'=e^{\arctan\sqrt{2x}}\\[4pt]
        \cdot\frac{1}{1+2x}\cdot\bigl(\sqrt{2x}\bigr)'
      \end{gathered}`,
    },
    {
      change: "算出最内层 √(2x) 的导数",
      text: "在 x>0 时对 √(2x) 用链式法则：外层给 1/(2√(2x))，内层 2x 给 2，分子分母的 2 正好约掉。请把三层因子合并成一个分式并注明 x>0，再对照参考解答。",
      formula: math`\begin{gathered}
        \bigl(\sqrt{2x}\bigr)'=\frac{2}{2\sqrt{2x}}=\frac{1}{\sqrt{2x}}\\[4pt]
        y'=e^{\arctan\sqrt{2x}}\\[4pt]
        \cdot\frac{1}{1+2x}\cdot\frac{1}{\sqrt{2x}}
      \end{gathered}`,
    },
  ],

  "jc935-2-2-8-5": [
    {
      change: "先对乘积套用乘积法则",
      text: "函数是 sinⁿ(2x) 与 cos(2nx) 的乘积，先按 (uv)′=u′v+uv′ 拆成两项，各自留待下一步用链式法则。",
      formula: math`\begin{gathered}
        y'=\bigl(\sin^n(2x)\bigr)'\cos(2nx)\\[4pt]
        +\sin^n(2x)\bigl(\cos(2nx)\bigr)'
      \end{gathered}`,
    },
    {
      change: "分别用链式法则算出两项导数",
      text: "第一项依次剥开 n 次幂、sin 和 2x，得 2n sinⁿ⁻¹(2x)cos(2x)；第二项 cos(2nx) 求导带负号且内层导数是 2n，得 −2n sin(2nx)。",
      formula: math`\begin{gathered}
        \bigl(\sin^n(2x)\bigr)'=2n\sin^{n-1}(2x)\cos(2x)\\[4pt]
        \bigl(\cos(2nx)\bigr)'=-2n\sin(2nx)
      \end{gathered}`,
    },
    {
      change: "代回并提取公因式 2n sinⁿ⁻¹(2x)",
      text: "两项都带有公因式 2n sinⁿ⁻¹(2x)（第二项把 sinⁿ(2x) 拆出 sinⁿ⁻¹(2x)·sin(2x)）。提出公因式后，括号内出现经典的余弦差积结构。",
      formula: math`\begin{gathered}
        y'=2n\sin^{n-1}(2x)\\[4pt]
        \cdot\bigl[\cos(2x)\cos(2nx)-\sin(2x)\sin(2nx)\bigr]
      \end{gathered}`,
    },
    {
      change: "识别括号里的余弦和角公式",
      text: "对照 cos A cos B−sin A sin B=cos(A+B)，令 A=2x、B=2nx。请把括号合并成一个余弦函数并整理角度，写出最终化简结果，再对照参考解答。",
      formula: math`\begin{gathered}
        \cos A\cos B-\sin A\sin B=\cos(A+B)\\[4pt]
        A=2x,\quad B=2nx
      \end{gathered}`,
    },
  ],

  "jc935-2-2-8-6": [
    {
      change: "对外层反正切求导，保留内层导数",
      text: "在定义域 x≠2 内，把分式 (x+2)/(x−2) 当作整体 u，套用 (arctan u)′=1/(1+u²)，后面乘上内层分式的导数。",
      formula: math`\begin{gathered}
        y'=\frac{1}{1+\left(\frac{x+2}{x-2}\right)^2}\\[4pt]
        \cdot\left(\frac{x+2}{x-2}\right)'
      \end{gathered}`,
    },
    {
      change: "用商法则算出内层分式的导数",
      text: "对 (x+2)/(x−2) 套用商法则，分子是 1·(x−2)−(x+2)·1=−4，分母是 (x−2)²。",
      formula: math`\begin{gathered}
        \left(\frac{x+2}{x-2}\right)'=\frac{(x-2)-(x+2)}{(x-2)^2}\\[4pt]
        =\frac{-4}{(x-2)^2}
      \end{gathered}`,
    },
    {
      change: "外层通分后与内层相乘，约去 (x−2)²",
      text: "把外层分子分母同乘 (x−2)²，再与内层导数相乘。因为 x≠2，(x−2)²≠0，可以合法约掉。",
      formula: math`\begin{gathered}
        y'=\frac{(x-2)^2}{(x-2)^2+(x+2)^2}\\[4pt]
        \cdot\frac{-4}{(x-2)^2}=\frac{-4}{(x-2)^2+(x+2)^2}
      \end{gathered}`,
    },
    {
      change: "展开分母平方和，准备约去 2",
      text: "把分母两项分别展开，一次交叉项 −4x 与 +4x 正好抵消，剩下 2x²+8。请把分子分母同除以 2 完成约分，并别忘注明原定义域 x≠2，再对照参考解答。",
      formula: math`\begin{gathered}
        (x-2)^2+(x+2)^2=2x^2+8\\[4pt]
        y'=\frac{-4}{2x^2+8}\quad(x\ne 2)
      \end{gathered}`,
    },
  ],

  "jc935-2-2-8-7": [
    {
      change: "先算出分子和分母各自的导数",
      text: "在 |x|<2 时，|x/2|<1，两个反三角函数都可导。链式求导时把 2 送进根号：2√(1−x²/4)=√(4−x²)，两者导数正好互为相反数。",
      formula: math`\begin{gathered}
        \left(\arcsin\frac{x}{2}\right)'=\frac{1}{\sqrt{4-x^2}}\\[4pt]
        \left(\arccos\frac{x}{2}\right)'=-\frac{1}{\sqrt{4-x^2}}
      \end{gathered}`,
    },
    {
      change: "套用商法则，注意负负得正",
      text: "按 (u/v)′=(u′v−uv′)/v² 代入。由于分母导数带负号，分子中的减号遇到负号变成加号。",
      formula: math`\begin{gathered}
        y'=\frac{1}{\arccos^2(x/2)}\\[4pt]
        \cdot\left(\frac{\arccos(x/2)}{\sqrt{4-x^2}}+\frac{\arcsin(x/2)}{\sqrt{4-x^2}}\right)
      \end{gathered}`,
    },
    {
      change: "整理成单分式，分子合并两反三角之和",
      text: "把分子里公共的分母 √(4−x²) 落到总分母中，分子就只剩 arccos(x/2)+arcsin(x/2)。",
      formula: math`y'=\frac{\arccos(x/2)+\arcsin(x/2)}{\sqrt{4-x^2}\,\arccos^2(x/2)}`,
    },
    {
      change: "套用互余角恒等式化简分子",
      text: "对任意 |u|≤1，反正弦与反余弦之和恒等于 π/2。请把分子替换成常数 π/2 并整理成标准单分式，同时注明可导区间 |x|<2，再对照参考解答。",
      formula: math`\begin{gathered}
        \arcsin\frac{x}{2}+\arccos\frac{x}{2}=\frac{\pi}{2}\\[4pt]
        |x|<2
      \end{gathered}`,
    },
  ],

  "jc935-2-2-8-8": [
    {
      change: "由三层真数都为正定出可导区间",
      text: "最外层对数要求 ln(ln(2x))>0，逐层解不等式：ln(2x)>1，即 2x>e，因此定义域与可导区间是 x>e/2。",
      formula: math`\begin{gathered}
        \ln\bigl(\ln(2x)\bigr)>0\iff \ln(2x)>1\\[4pt]
        \iff 2x>e\iff x>\frac{e}{2}
      \end{gathered}`,
    },
    {
      change: "从外向内剥开前两层对数",
      text: "每一层 ln w 求导都把自己的输入 w 放进分母，再乘里面的导数。剥开前两层后，只剩最内层 (ln(2x))′。",
      formula: math`\begin{gathered}
        y'=\frac{1}{\ln(\ln(2x))}\cdot\frac{1}{\ln(2x)}\\[4pt]
        \cdot\bigl(\ln(2x)\bigr)'
      \end{gathered}`,
    },
    {
      change: "算出最内层 (ln(2x))′=1/x",
      text: "对 ln(2x) 用链式法则得 2/(2x)=1/x（系数 2 约掉）。请把三个分式相乘合并成一个分式，并写明 x>e/2，再对照参考解答。",
      formula: math`\begin{gathered}
        \bigl(\ln(2x)\bigr)'=\frac{2}{2x}=\frac{1}{x}\\[4pt]
        y'=\frac{1}{\ln(\ln(2x))}\\[4pt]
        \cdot\frac{1}{\ln(2x)}\cdot\frac{1}{x}
      \end{gathered}`,
    },
  ],

  "jc935-2-2-8-9": [
    {
      change: "先分子有理化，上下同乘两根之和",
      text: "直接对原式用商法则计算量大。题目提示先做分子有理化：在 |x|<4 时 √(4+x)+√(4−x)>0，分子分母同乘两根之和。",
      formula: math`\begin{gathered}
        y=\frac{\sqrt{4+x}-\sqrt{4-x}}{\sqrt{4+x}+\sqrt{4-x}}\\[4pt]
        \cdot\frac{\sqrt{4+x}+\sqrt{4-x}}{\sqrt{4+x}+\sqrt{4-x}}
      \end{gathered}`,
    },
    {
      change: "展开分子分母并约去 2，给原式瘦身",
      text: "分子用平方差得 (4+x)−(4−x)=2x；分母展开为 (4+x)+(4−x)+2√(16−x²)=8+2√(16−x²)，上下约去 2 就清爽多了。",
      formula: math`\begin{gathered}
        y=\frac{2x}{8+2\sqrt{16-x^2}}=\frac{x}{4+\sqrt{16-x^2}}
      \end{gathered}`,
    },
    {
      change: "令 v=√(16−x²)，对瘦身后的式子用商法则",
      text: "记 v=√(16−x²)，在 |x|<4 时 v>0 且 v′=−2x/(2v)=−x/v。对 y=x/(4+v) 用商法则。",
      formula: math`\begin{gathered}
        v=\sqrt{16-x^2},\quad v'=-\frac{x}{v}\\[4pt]
        y'=\frac{1\cdot(4+v)-x(-x/v)}{(4+v)^2}
      \end{gathered}`,
    },
    {
      change: "分子通分并代入 v²+x²=16",
      text: "分子通分为 (4v+v²+x²)/v，而 v²+x²=(16−x²)+x²=16，所以分子化为 4v+16=4(4+v)。请约去公因子 4+v 并把 v=√(16−x²) 代回，写出最终导数与 |x|<4，再对照参考解答。",
      formula: math`\begin{gathered}
        v^2+x^2=16\\[4pt]
        y'=\frac{4v+16}{v(4+v)^2}=\frac{4(4+v)}{v(4+v)^2}
      \end{gathered}`,
    },
  ],

  "jc935-2-2-8-10": [
    {
      change: "令 v=(2−x)/(2+x)，先算 1−v 与 v′",
      text: "把里面的分式记作中间变量 v。在 0<x<2 时满足 0<v<1，且 2+x>0。先算出 1−v 和商法则导数 v′，后面代入更整洁。",
      formula: math`\begin{gathered}
        v=\frac{2-x}{2+x},\quad 1-v=\frac{2x}{2+x}\\[4pt]
        v'=\frac{-(2+x)-(2-x)}{(2+x)^2}=\frac{-4}{(2+x)^2}
      \end{gathered}`,
    },
    {
      change: "对外两层 arcsin(√v) 用链式法则",
      text: "最外层反正弦给 1/√(1−v)，中层平方根给 1/(2√v)，乘起来再乘 v′，可以合并写成 v′/[2√(v(1−v))]。",
      formula: math`\begin{gathered}
        y'=\frac{1}{\sqrt{1-v}}\cdot\frac{1}{2\sqrt{v}}\cdot v'\\[4pt]
        =\frac{v'}{2\sqrt{v(1-v)}}
      \end{gathered}`,
    },
    {
      change: "代回 v 与 1−v，把 2+x 提出根号",
      text: "因为 0<x<2 时 2+x>0，所以 √((2+x)²)=2+x，可以把分母里的 (2+x)² 开根放到分子。再乘上 v′=−4/(2+x)²，请约去一份 (2+x) 并化简系数 −4/(2√2)，写出最终结果并注明 0<x<2，再对照参考解答。",
      formula: math`\begin{gathered}
        \sqrt{v(1-v)}=\frac{\sqrt{2x(2-x)}}{2+x}\\[4pt]
        y'=\frac{2+x}{2\sqrt{2x(2-x)}}\cdot\frac{-4}{(2+x)^2}
      \end{gathered}`,
    },
  ],

  "jc935-2-2-9": [
    {
      change: "先对最外层平方根求导",
      text: "题目已知 2u²(x)+3v²(x)>0，根号外层可导。先按 (√w)′=1/(2√w) 写出外层导数，再乘根号内部对 x 的导数。",
      formula: math`\begin{gathered}
        y'=\frac{1}{2\sqrt{2u^2(x)+3v^2(x)}}\\[4pt]
        \cdot\bigl(2u^2(x)+3v^2(x)\bigr)'
      \end{gathered}`,
    },
    {
      change: "对根号内两项分别用链式法则",
      text: "u(x) 和 v(x) 都是关于 x 的可导函数，对平方求导时别忘了乘上抽象导数：(u²)′=2uu′，(v²)′=2vv′。",
      formula: math`\begin{gathered}
        \bigl(2u^2(x)+3v^2(x)\bigr)'\\[4pt]
        =4u(x)u'(x)+6v(x)v'(x)
      \end{gathered}`,
    },
    {
      change: "代回乘积，准备约去公因子 2",
      text: "把内层导数放到分子上，观察到分子两项的系数 4 和 6 都能与分母的 2 约分。请把分子分母同除以 2，写出最终化简后的导数，再对照参考解答。",
      formula: math`y'=\frac{4u(x)u'(x)+6v(x)v'(x)}{2\sqrt{2u^2(x)+3v^2(x)}}`,
    },
  ],

  "jc935-2-2-10-1": [
    {
      change: "设 u=x³+1，写出链式法则",
      text: "这是典型的抽象复合函数求导。先令中间变量 u=x³+1，外层对 u 求导写成 f′(u)，再乘内层 u 对 x 的导数 du/dx。",
      formula: math`\begin{gathered}
        u=x^3+1\\[4pt]
        \frac{dy}{dx}=f'(u)\cdot\frac{du}{dx}
      \end{gathered}`,
    },
    {
      change: "算出内层多项式的导数 du/dx",
      text: "对 u=x³+1 关于 x 求导，常数 1 的导数为 0，得到 du/dx=3x²。",
      formula: math`\frac{du}{dx}=(x^3+1)'=3x^2`,
    },
    {
      change: "相乘并准备把 u 换回 x³+1",
      text: "切记 f′(u) 必须在原位置 u=x³+1 处取值，绝不能把括号里写成 3x²。请把 u=x³+1 代回，写出最终的 dy/dx，再对照参考解答。",
      formula: math`\frac{dy}{dx}=3x^2 f'(u),\quad u=x^3+1`,
    },
  ],

  "jc935-2-2-10-2": [
    {
      change: "分别对两项套用抽象链式法则",
      text: "按求导线性法则逐项求导，每一项外层都是 f′ 在原自变量处取值，再各自乘上括号内三角平方对 x 的导数。",
      formula: math`\begin{gathered}
        \frac{dy}{dx}=f'\bigl(\sin^2(2x)\bigr)\bigl(\sin^2(2x)\bigr)'\\[4pt]
        -f'\bigl(\cos^2(2x)\bigr)\bigl(\cos^2(2x)\bigr)'
      \end{gathered}`,
    },
    {
      change: "算出两个内层三角平方的导数",
      text: "第一项逐层求导得 2sin(2x)·cos(2x)·2=4sin(2x)cos(2x)；第二项因 (cos(2x))′=−2sin(2x) 带负号，得 −4cos(2x)sin(2x)。",
      formula: math`\begin{gathered}
        \bigl(\sin^2(2x)\bigr)'=4\sin(2x)\cos(2x)\\[4pt]
        \bigl(\cos^2(2x)\bigr)'=-4\cos(2x)\sin(2x)
      \end{gathered}`,
    },
    {
      change: "用倍角公式 2sin(2x)cos(2x)=sin(4x) 化简",
      text: "题目要求用倍角公式化简系数，把 4sin(2x)cos(2x) 写成 2·[2sin(2x)cos(2x)]=2sin(4x)。",
      formula: math`\begin{gathered}
        \bigl(\sin^2(2x)\bigr)'=2\sin(4x)\\[4pt]
        \bigl(\cos^2(2x)\bigr)'=-2\sin(4x)
      \end{gathered}`,
    },
    {
      change: "代回导数式，注意负负得正",
      text: "原式中间的减号遇上第二项导数的负号变成加号，两项正好都有公因式 2sin(4x)。请提取公因式 2sin(4x) 写出最终结果，再对照参考解答。",
      formula: math`\begin{gathered}
        \frac{dy}{dx}=2\sin(4x)\,f'\bigl(\sin^2(2x)\bigr)\\[4pt]
        +2\sin(4x)\,f'\bigl(\cos^2(2x)\bigr)
      \end{gathered}`,
    },
  ],

  "jc935-2-2-10-3": [
    {
      change: "分别用链式法则求分子和分母的导数",
      text: "分子 f(e²ˣ) 外层是 f、内层是 e²ˣ，导数为 f′(e²ˣ)·2e²ˣ；分母 e²ᶠ⁽ˣ⁾ 外层是指数、内层是 2f(x)，导数为 e²ᶠ⁽ˣ⁾·2f′(x)。注意 f′(e²ˣ) 与 f′(x) 取值点不同。",
      formula: math`\begin{gathered}
        \bigl(f(e^{2x})\bigr)'=2e^{2x}f'(e^{2x})\\[4pt]
        \bigl(e^{2f(x)}\bigr)'=2f'(x)e^{2f(x)}
      \end{gathered}`,
    },
    {
      change: "套用商法则写出完整分式",
      text: "按 (u/v)′=(u′v−uv′)/v² 代入，分母平方后是 (e²ᶠ⁽ˣ⁾)²。",
      formula: math`\begin{gathered}
        \frac{dy}{dx}=\frac{2e^{2x}f'(e^{2x})e^{2f(x)}}{\bigl(e^{2f(x)}\bigr)^2}\\[4pt]
        -\frac{2f'(x)f(e^{2x})e^{2f(x)}}{\bigl(e^{2f(x)}\bigr)^2}
      \end{gathered}`,
    },
    {
      change: "合并分子并提取公因式 2e²ᶠ⁽ˣ⁾",
      text: "分子两项都含 2e²ᶠ⁽ˣ⁾，把它提出来；因为指数函数恒大于 0，可以合法与分母约掉一份 e²ᶠ⁽ˣ⁾。请完成约分并把分母的 e²ᶠ⁽ˣ⁾ 写成 e⁻²ᶠ⁽ˣ⁾，对照参考解答。",
      formula: math`\begin{gathered}
        \frac{dy}{dx}=\frac{2e^{2f(x)}}{e^{2f(x)}\cdot e^{2f(x)}}\\[4pt]
        \cdot\bigl(e^{2x}f'(e^{2x})-f'(x)f(e^{2x})\bigr)
      \end{gathered}`,
    },
  ],

  "jc935-2-2-11-1": [
    {
      change: "对乘积套用乘积法则",
      text: "函数是负指数 e⁻²ˣ 与二次多项式 (x²−x+1) 的乘积，先按 (uv)′=u′v+uv′ 拆成两项。",
      formula: math`\begin{gathered}
        y'=(e^{-2x})'(x^2-x+1)\\[4pt]
        +e^{-2x}(x^2-x+1)'
      \end{gathered}`,
    },
    {
      change: "分别算出指数和多项式的导数",
      text: "由链式法则 (e⁻²ˣ)′=−2e⁻²ˣ，多项式 (x²−x+1)′=2x−1，代入原式。",
      formula: math`\begin{gathered}
        y'=-2e^{-2x}(x^2-x+1)\\[4pt]
        +e^{-2x}(2x-1)
      \end{gathered}`,
    },
    {
      change: "提取公因式 e⁻²ˣ 并展开括号",
      text: "把公共的 e⁻²ˣ 提到最前面，注意 −2 乘进 (x²−x+1) 时每一项都要变号：−2x²+2x−2。请把括号内的同类项合并，写出最终的 y′，再对照参考解答。",
      formula: math`\begin{gathered}
        y'=e^{-2x}\bigl(-2x^2+2x-2\\[4pt]
        +2x-1\bigr)
      \end{gathered}`,
    },
  ],

  "jc935-2-2-11-2": [
    {
      change: "先对乘积套用乘积法则",
      text: "先按 (uv)′=u′v+uv′ 把求导任务分给两个因子，避免把两个“平方”混在一起。",
      formula: math`\begin{gathered}
        y'=(\cos^2 x)'\cos(x^2)\\[4pt]
        +\cos^2 x\cdot\bigl(\cos(x^2)\bigr)'
      \end{gathered}`,
    },
    {
      change: "求第一个因子 (cos²x)′",
      text: "cos²x 是“平方在外、余弦在内”，先对平方求导得 2cos x，再乘 (cos x)′=−sin x，顺手用倍角公式合为 −sin(2x)。",
      formula: math`\begin{gathered}
        (\cos^2 x)'=2\cos x(-\sin x)\\[4pt]
        =-\sin(2x)
      \end{gathered}`,
    },
    {
      change: "求第二个因子 [cos(x²)]′",
      text: "cos(x²) 是“余弦在外、平方在内”，先对余弦求导得 −sin(x²)，再乘内层 (x²)′=2x。",
      formula: math`\bigl(\cos(x^2)\bigr)'=-\sin(x^2)\cdot 2x=-2x\sin(x^2)`,
    },
    {
      change: "代回乘积法则框架并整理符号",
      text: "把刚刚算出的两个导数分别放回乘积法则的两项里。请整理好正负号与系数位置，写出最终的 y′，再对照参考解答。",
      formula: math`\begin{gathered}
        y'=\bigl(-\sin(2x)\bigr)\cos(x^2)\\[4pt]
        +\cos^2 x\cdot\bigl(-2x\sin(x^2)\bigr)
      \end{gathered}`,
    },
  ],

  "jc935-2-2-11-3": [
    {
      change: "先对最外层平方求导",
      text: "函数是“平方 → 反正切 → x/3”三层复合，在全体实数上可导。先对外层平方求导，落出系数 2。",
      formula: math`\begin{gathered}
        y'=2\arctan\frac{x}{3}\\[4pt]
        \cdot\left(\arctan\frac{x}{3}\right)'
      \end{gathered}`,
    },
    {
      change: "对中层反正切与内层 x/3 依次求导",
      text: "反正切导数给出 1/(1+(x/3)²)，最内层 x/3 的导数是 1/3，全部连乘在一起。",
      formula: math`\begin{gathered}
        y'=2\arctan\frac{x}{3}\\[4pt]
        \cdot\frac{1}{1+x^2/9}\cdot\frac{1}{3}
      \end{gathered}`,
    },
    {
      change: "对分数分母 1+x²/9 通分整理",
      text: "把 1/(1+x²/9) 上下同乘 9 化为 9/(9+x²)。请把前面的常数因子 2、9 与 1/3 约分相乘，写出最终的 y′，再对照参考解答。",
      formula: math`\begin{gathered}
        \frac{1}{1+x^2/9}=\frac{9}{9+x^2}\\[4pt]
        y'=2\cdot\frac{9}{9+x^2}\cdot\frac{1}{3}\arctan\frac{x}{3}
      \end{gathered}`,
    },
  ],

  "jc935-2-2-11-4": [
    {
      change: "分别算出分子和分母的导数",
      text: "在定义域 x>0 内，分子 [ln(2x)]′=2/(2x)=1/x（系数 2 约掉），分母 (xⁿ)′=nxⁿ⁻¹。",
      formula: math`\begin{gathered}
        \bigl(\ln(2x)\bigr)'=\frac{2}{2x}=\frac{1}{x}\\[4pt]
        (x^n)'=nx^{n-1}
      \end{gathered}`,
    },
    {
      change: "套用商法则写出分式",
      text: "按 (u/v)′=(u′v−uv′)/v² 代入，注意留在对数里的仍然是 ln(2x)，不要误改成 ln x。",
      formula: math`y'=\frac{\frac{1}{x}\cdot x^n-nx^{n-1}\ln(2x)}{(x^n)^2}`,
    },
    {
      change: "分子化出公因式 xⁿ⁻¹，准备约分",
      text: "第一项 (1/x)·xⁿ=xⁿ⁻¹，于是分子两项都含有 xⁿ⁻¹；分母 (xⁿ)²=x²ⁿ。因为 x>0，xⁿ⁻¹≠0，请约去 xⁿ⁻¹ 并写出最终导数与 x>0，再对照参考解答。",
      formula: math`y'=\frac{x^{n-1}\bigl(1-n\ln(2x)\bigr)}{x^{2n}}\quad(x>0)`,
    },
  ],

  "jc935-2-2-11-5": [
    {
      change: "记分子为 u、分母为 v，发现互为导数",
      text: "直接对分式求导前，先记 u=e²ᵗ−e⁻²ᵗ、v=e²ᵗ+e⁻²ᵗ。分别对 t 求导会发现 u′=2e²ᵗ+2e⁻²ᵗ=2v，v′=2e²ᵗ−2e⁻²ᵗ=2u，结构非常对称。",
      formula: math`\begin{gathered}
        u=e^{2t}-e^{-2t},\quad v=e^{2t}+e^{-2t}\\[4pt]
        u'=2v,\quad v'=2u
      \end{gathered}`,
    },
    {
      change: "套用商法则并提取常数 2",
      text: "把 u′=2v、v′=2u 代入商法则 (u′v−uv′)/v²，分子立刻变成 2(v²−u²)。",
      formula: math`y'=\frac{u'v-uv'}{v^2}=\frac{2(v^2-u^2)}{v^2}`,
    },
    {
      change: "用平方差算出 v²−u²=4",
      text: "利用平方差 v²−u²=(v+u)(v−u)=(2e²ᵗ)(2e⁻²ᵗ)=4，指数项全部抵消成常数！请算出分子 2×4 并代回 v=e²ᵗ+e⁻²ᵗ，写出最终结果，再对照参考解答。",
      formula: math`\begin{gathered}
        v^2-u^2=(2e^{2t})(2e^{-2t})=4\\[4pt]
        y'=\frac{2\times 4}{(e^{2t}+e^{-2t})^2}
      \end{gathered}`,
    },
  ],

  "jc935-2-2-11-6": [
    {
      change: "令 u=2/x，写开外两层链式导数",
      text: "在定义域 sin(2/x)>0（且 x≠0）内，设 u=2/x。外层对数给 1/sin u，中层正弦给 cos u，两者相乘就是 cot u。",
      formula: math`\begin{gathered}
        u=\frac{2}{x}\\[4pt]
        y'=\frac{1}{\sin u}\cdot\cos u\cdot u'=\cot u\cdot u'
      \end{gathered}`,
    },
    {
      change: "把 2/x 写成幂函数算出 u′",
      text: "把 u=2/x 看成 2x⁻¹，按幂函数求导得 −2x⁻²=−2/x²，注意负号不要丢。",
      formula: math`u'=(2x^{-1})'=-2x^{-2}=-\frac{2}{x^2}`,
    },
    {
      change: "相乘并准备把 u=2/x 代回",
      text: "把 cot u 与 u′=−2/x² 乘在一起。请把 u 换回 2/x，整理系数和负号并注明定义域 sin(2/x)>0，再对照参考解答。",
      formula: math`\begin{gathered}
        y'=-\frac{2}{x^2}\cot u\\[4pt]
        u=\frac{2}{x},\quad \sin\frac{2}{x}>0
      \end{gathered}`,
    },
  ],

  "jc935-2-2-11-7": [
    {
      change: "令 u=2/x，先对外层指数求导",
      text: "在 x≠0 处，设 u=2/x。最外层指数求导保留原式 e^(−cos²u)，再乘指数部分对 u 的导数和 u 对 x 的导数。",
      formula: math`\begin{gathered}
        u=\frac{2}{x}\\[4pt]
        y'=e^{-\cos^2 u}\cdot(-\cos^2 u)'_u\cdot u'
      \end{gathered}`,
    },
    {
      change: "对指数 −cos²u 关于 u 求导并合倍角",
      text: "对 −cos²u 求 u 的导数：平方落出 2，cos u 求导带负号，两个负号相抵变成 +2sin u cos u=sin(2u)。",
      formula: math`\begin{gathered}
        (-\cos^2 u)'_u=-2\cos u(-\sin u)\\[4pt]
        =2\sin u\cos u=\sin(2u)
      \end{gathered}`,
    },
    {
      change: "乘上内层导数 u′=−2/x²，准备回代",
      text: "内层 u′=(2/x)′=−2/x² 又带出一个负号，所以最终总符号为负。请把 u=2/x（注意 2u=4/x）代回，写出最终化简的 y′ 并注明 x≠0，再对照参考解答。",
      formula: math`\begin{gathered}
        y'=-\frac{2}{x^2}\sin(2u)\,e^{-\cos^2 u}\\[4pt]
        u=\frac{2}{x}\quad(x\ne 0)
      \end{gathered}`,
    },
  ],

  "jc935-2-2-11-8": [
    {
      change: "先对最外层大平方根求导",
      text: "在 x>0 时两层根号内都严格为正。先对大外层平方根套用 (√w)′=1/(2√w)，后面接上内部 2x+√(2x) 的导数。",
      formula: math`\begin{gathered}
        y'=\frac{1}{2\sqrt{2x+\sqrt{2x}}}\\[4pt]
        \cdot\bigl(2x+\sqrt{2x}\bigr)'
      \end{gathered}`,
    },
    {
      change: "分别算出内部两项的导数",
      text: "2x 的导数是 2；小根号 √(2x) 用链式法则得 2/(2√(2x))=1/√(2x)，注意分子分母的 2 已经约掉。",
      formula: math`\begin{gathered}
        \bigl(2x+\sqrt{2x}\bigr)'=2+\frac{2}{2\sqrt{2x}}\\[4pt]
        =2+\frac{1}{\sqrt{2x}}
      \end{gathered}`,
    },
    {
      change: "把内部导数通分，准备与外层相乘",
      text: "把 2+1/√(2x) 通分为 (2√(2x)+1)/√(2x)，再与外层分式相乘。请合并成一个分式并注明 x>0，再对照参考解答。",
      formula: math`\begin{gathered}
        y'=\frac{1}{2\sqrt{2x+\sqrt{2x}}}\\[4pt]
        \cdot\frac{2\sqrt{2x}+1}{\sqrt{2x}}\quad(x>0)
      \end{gathered}`,
    },
  ],

  "jc935-2-2-11-9": [
    {
      change: "对第一项 x arcsin(x/3) 用乘积法则",
      text: "在 |x|<3 时两项均可导。第一项是乘积结构，按 (uv)′=u′v+uv′ 展开，并顺手对 arcsin(x/3) 用链式法则。",
      formula: math`\begin{gathered}
        \left(x\arcsin\frac{x}{3}\right)'=\arcsin\frac{x}{3}\\[4pt]
        +x\cdot\frac{1}{\sqrt{1-x^2/9}}\cdot\frac{1}{3}
      \end{gathered}`,
    },
    {
      change: "把系数 3 送进根号化简第一项导数",
      text: "由 3√(1−x²/9)=√(9−x²)，第一项导数化成清爽的 arcsin(x/3)+x/√(9−x²)。",
      formula: math`\begin{gathered}
        \left(x\arcsin\frac{x}{3}\right)'\\[4pt]
        =\arcsin\frac{x}{3}+\frac{x}{\sqrt{9-x^2}}
      \end{gathered}`,
    },
    {
      change: "对第二项 √(9−x²) 用链式法则求导",
      text: "外层根号给 1/(2√(9−x²))，内层 9−x² 给 −2x，约去 2 后正好与第一项里冒出的分式互为相反数。",
      formula: math`\begin{gathered}
        \left(\sqrt{9-x^2}\right)'=\frac{-2x}{2\sqrt{9-x^2}}\\[4pt]
        =-\frac{x}{\sqrt{9-x^2}}
      \end{gathered}`,
    },
    {
      change: "两项导数相加，抵消根式分式",
      text: "把两项导数加在一起，一正一负的两个根式分式正好相互抵消。请写出最终极简的 y′ 并注明可导区间 |x|<3，再对照参考解答。",
      formula: math`\begin{gathered}
        y'=\arcsin\frac{x}{3}\\[4pt]
        +\frac{x}{\sqrt{9-x^2}}-\frac{x}{\sqrt{9-x^2}}\quad(|x|<3)
      \end{gathered}`,
    },
  ],

  "jc935-2-2-11-10": [
    {
      change: "先化简外层根号里的 1−u²",
      text: "记 u=4t/(4+t²)。先把外层反正弦导数分母根号内的 1−u² 通分整理，分子展开后正好是一个完全平方 (4−t²)²。",
      formula: math`\begin{gathered}
        1-\left(\frac{4t}{4+t^2}\right)^2=\frac{(4+t^2)^2-16t^2}{(4+t^2)^2}\\[4pt]
        =\frac{(4-t^2)^2}{(4+t^2)^2}
      \end{gathered}`,
    },
    {
      change: "开平方根时必须保留绝对值",
      text: "这是本题最关键的易错点：4+t² 恒大于 0 可以直接出根号，但 4−t² 在 |t|<2 与 |t|>2 时符号相反，所以 √((4−t²)²)=|4−t²|，且 t=±2 处分母为零不可导。",
      formula: math`\begin{gathered}
        \sqrt{1-\left(\frac{4t}{4+t^2}\right)^2}=\frac{|4-t^2|}{4+t^2}\\[4pt]
        t\ne\pm 2
      \end{gathered}`,
    },
    {
      change: "用商法则算出内层分式的导数",
      text: "对 4t/(4+t²) 关于 t 套用商法则，分子化简为 4(4+t²)−8t²=4(4−t²)。",
      formula: math`\begin{gathered}
        \left(\frac{4t}{4+t^2}\right)'=\frac{4(4+t^2)-4t(2t)}{(4+t^2)^2}\\[4pt]
        =\frac{4(4-t^2)}{(4+t^2)^2}
      \end{gathered}`,
    },
    {
      change: "内外层相乘约分，按 |t|<2 与 |t|>2 分段",
      text: "把外层倒数与内层导数相乘，约去一份 4+t² 后剩下带 (4−t²)/|4−t²| 的式子。请分别在 |t|<2（4−t²>0）与 |t|>2（4−t²<0）两种情况下去绝对值，写出分段导数，再对照参考解答。",
      formula: math`\begin{gathered}
        y'=\frac{4+t^2}{|4-t^2|}\cdot\frac{4(4-t^2)}{(4+t^2)^2}\\[4pt]
        =\frac{4-t^2}{|4-t^2|}\cdot\frac{4}{4+t^2}\quad(t\ne\pm 2)
      \end{gathered}`,
    },
  ],

  "jc935-2-2-12-1": [
    {
      change: "先对最外层双曲正弦求导",
      text: "由 (sinh w)′=cosh w，先把最外层 sinh 换成 cosh，里面的 cosh(2x) 原样不动，再乘中内层的导数。",
      formula: math`\begin{gathered}
        y'=\cosh\bigl(\cosh(2x)\bigr)\\[4pt]
        \cdot\bigl(\cosh(2x)\bigr)'
      \end{gathered}`,
    },
    {
      change: "对中层双曲余弦求导（无负号）",
      text: "双曲函数和三角函数不同，(cosh u)′=+sinh u 不带负号。接着乘上最内层 2x 的导数。",
      formula: math`\bigl(\cosh(2x)\bigr)'=\sinh(2x)\cdot(2x)'`,
    },
    {
      change: "代入内层导数 2 并整理乘积",
      text: "最内层 (2x)′=2。请把常数 2 和 sinh(2x) 写到前面，整理出最终的 y′，再对照参考解答。",
      formula: math`\begin{gathered}
        y'=\cosh\bigl(\cosh(2x)\bigr)\\[4pt]
        \cdot\sinh(2x)\cdot 2
      \end{gathered}`,
    },
  ],

  "jc935-2-2-12-2": [
    {
      change: "先对乘积套用乘积法则",
      text: "函数是 cosh x 与 e^(sinh x) 的乘积，先按 (uv)′=u′v+uv′ 拆成两项。",
      formula: math`\begin{gathered}
        y'=(\cosh x)'e^{\sinh x}\\[4pt]
        +\cosh x\cdot\bigl(e^{\sinh x}\bigr)'
      \end{gathered}`,
    },
    {
      change: "分别算出两个因子的导数",
      text: "第一项 (cosh x)′=sinh x；第二项用链式法则，指数照抄原式再乘内层 (sinh x)′=cosh x。",
      formula: math`\begin{gathered}
        (\cosh x)'=\sinh x\\[4pt]
        \bigl(e^{\sinh x}\bigr)'=e^{\sinh x}\cosh x
      \end{gathered}`,
    },
    {
      change: "代回乘积法则，准备提取公因式",
      text: "把两个导数代回后，第二项两个 cosh x 合成 cosh²x，两项都含有公共因子 e^(sinh x)。请提取 e^(sinh x) 写出最终的 y′，再对照参考解答。",
      formula: math`\begin{gathered}
        y'=\sinh x\cdot e^{\sinh x}\\[4pt]
        +\cosh^2 x\cdot e^{\sinh x}
      \end{gathered}`,
    },
  ],

  "jc935-2-2-12-3": [
    {
      change: "令 u=ln(3x)，对外层双曲正切求导",
      text: "在定义域 x>0 内设 u=ln(3x)。套用题目给出的公式 (tanh u)′=1/cosh²u，再乘内层导数 u′。",
      formula: math`\begin{gathered}
        u=\ln(3x)\quad(x>0)\\[4pt]
        y'=\frac{1}{\cosh^2 u}\cdot u'
      \end{gathered}`,
    },
    {
      change: "算出内层对数的导数 u′=1/x",
      text: "对 ln(3x) 用链式法则得 3/(3x)=1/x，系数 3 在导数中约去，但 u 本身仍是 ln(3x)。",
      formula: math`u'=\bigl(\ln(3x)\bigr)'=\frac{3}{3x}=\frac{1}{x}`,
    },
    {
      change: "相乘并准备把 u=ln(3x) 代回",
      text: "把外层和内层导数乘成一个分式。请把 u 换回 ln(3x)，写出最终的 y′ 并注明 x>0，再对照参考解答。",
      formula: math`y'=\frac{1}{x\cosh^2 u},\quad u=\ln(3x)`,
    },
  ],

  "jc935-2-2-12-4": [
    {
      change: "用链式法则求第一项 (cosh³x)′",
      text: "先对三次幂求导得 3cosh²x，再乘内层 (cosh x)′=+sinh x（注意双曲余弦求导没有负号）。",
      formula: math`\begin{gathered}
        (\cosh^3 x)'=3\cosh^2 x\cdot(\cosh x)'\\[4pt]
        =3\cosh^2 x\sinh x
      \end{gathered}`,
    },
    {
      change: "用链式法则求第二项 (sinh²x)′",
      text: "先对平方求导得 2sinh x，再乘内层 (sinh x)′=cosh x。",
      formula: math`\begin{gathered}
        (\sinh^2 x)'=2\sinh x\cdot(\sinh x)'\\[4pt]
        =2\sinh x\cosh x
      \end{gathered}`,
    },
    {
      change: "两项相加，观察公因式并因式分解",
      text: "题目要求因式分解。两项导数都带有公共因子 sinh x cosh x，请把它提出来写出因式分解后的最终结果，再对照参考解答。",
      formula: math`\begin{gathered}
        y'=3\cosh^2 x\sinh x\\[4pt]
        +2\sinh x\cosh x
      \end{gathered}`,
    },
  ],

  "jc935-2-2-12-5": [
    {
      change: "令 u=2−3x²，对外层双曲正切求导",
      text: "设内层二次式为 u=2−3x²，外层按 (tanh u)′=1/cosh²u 求导，再乘 u′。",
      formula: math`\begin{gathered}
        u=2-3x^2\\[4pt]
        y'=\frac{1}{\cosh^2 u}\cdot u'
      \end{gathered}`,
    },
    {
      change: "算出内层二次式的导数 u′",
      text: "常数 2 求导为 0，−3x² 求导得 −6x，注意不要漏掉负号。",
      formula: math`u'=(2-3x^2)'=-6x`,
    },
    {
      change: "相乘并准备把 u=2−3x² 代回",
      text: "把 −6x 乘到分子上。请把分母里的 u 换回 2−3x²，写出最终的 y′，再对照参考解答。",
      formula: math`y'=-\frac{6x}{\cosh^2 u},\quad u=2-3x^2`,
    },
  ],

  "jc935-2-2-12-6": [
    {
      change: "令 u=2x²+1，套用反双曲正弦求导公式",
      text: "因为 1+u²≥1>0，函数在全体实数上可导。设 u=2x²+1，按 (arsinh u)′=1/√(1+u²) 写出链式求导式。",
      formula: math`\begin{gathered}
        u=2x^2+1\\[4pt]
        y'=\frac{1}{\sqrt{1+u^2}}\cdot u'
      \end{gathered}`,
    },
    {
      change: "算出内层导数 u′=4x 并代回 u",
      text: "内层 (2x²+1)′=4x，把 u=2x²+1 和 u′=4x 一起代进分式里。",
      formula: math`y'=\frac{4x}{\sqrt{1+(2x^2+1)^2}}`,
    },
    {
      change: "展开根号内的完全平方",
      text: "把 (2x²+1)² 展开为 4x⁴+4x²+1，注意不要漏掉交叉项 4x²。请把根号内的常数项 1+1 合并，写出最终的 y′，再对照参考解答。",
      formula: math`\begin{gathered}
        1+(2x^2+1)^2=1+(4x^4+4x^2+1)\\[4pt]
        y'=\frac{4x}{\sqrt{1+4x^4+4x^2+1}}
      \end{gathered}`,
    },
  ],

  "jc935-2-2-12-7": [
    {
      change: "先由 u=e³ˣ>1 确定有限导数区间",
      text: "反双曲余弦的导数公式要求 u>1（u=1 时分母根号为零）。由 e³ˣ>1 解得 x>0，这就是可导区间。",
      formula: math`e^{3x}>1\iff 3x>0\iff x>0`,
    },
    {
      change: "对外层反双曲余弦求导",
      text: "在 x>0 时套用 (arcosh u)′=1/√(u²−1)，把 u=e³ˣ 代入，再保留内层导数 (e³ˣ)′。",
      formula: math`y'=\frac{1}{\sqrt{(e^{3x})^2-1}}\cdot(e^{3x})'`,
    },
    {
      change: "算出内层导数并化简 (e³ˣ)²",
      text: "内层 (e³ˣ)′=3e³ˣ，且根号内 (e³ˣ)²=e⁶ˣ。请把两项合成一个分式并注明 x>0，再对照参考解答。",
      formula: math`\begin{gathered}
        (e^{3x})'=3e^{3x},\quad (e^{3x})^2=e^{6x}\\[4pt]
        y'=\frac{1}{\sqrt{e^{6x}-1}}\cdot 3e^{3x}\quad(x>0)
      \end{gathered}`,
    },
  ],

  "jc935-2-2-12-8": [
    {
      change: "外层反正切与内层双曲正切依次求导",
      text: "外层反正切给出 1/[1+tanh²(2x)]，内层 tanh(2x) 给出 [1/cosh²(2x)]·2=2/cosh²(2x)。",
      formula: math`\begin{gathered}
        y'=\frac{1}{1+\tanh^2(2x)}\\[4pt]
        \cdot\frac{2}{\cosh^2(2x)}
      \end{gathered}`,
    },
    {
      change: "把分母乘开，消去 tanh",
      text: "将 cosh²(2x) 乘进括号，利用 tanh(2x)=sinh(2x)/cosh(2x)，分母化为 cosh²(2x)+sinh²(2x)。注意这里是加号，不等于 1。",
      formula: math`\begin{gathered}
        \bigl(1+\tanh^2(2x)\bigr)\cosh^2(2x)\\[4pt]
        =\cosh^2(2x)+\sinh^2(2x)
      \end{gathered}`,
    },
    {
      change: "写成单分式并对照双曲倍角公式",
      text: "双曲余弦的倍角公式是 cosh(2u)=cosh²u+sinh²u。请令 u=2x 把分母合成一个双曲余弦函数，写出最终的 y′，再对照参考解答。",
      formula: math`\begin{gathered}
        y'=\frac{2}{\cosh^2(2x)+\sinh^2(2x)}\\[4pt]
        \cosh(2u)=\cosh^2 u+\sinh^2 u
      \end{gathered}`,
    },
  ],

  "jc935-2-2-12-9": [
    {
      change: "对第一项 ln cosh(2x) 用链式法则求导",
      text: "因为 cosh(2x)≥1>0，函数在全体实数上可导。第一项依次剥开对数、cosh 和 2x，得 2sinh(2x)/cosh(2x)。",
      formula: math`\bigl(\ln\cosh(2x)\bigr)'=\frac{2\sinh(2x)}{\cosh(2x)}`,
    },
    {
      change: "把第二项写成负幂再求导",
      text: "把 1/[2cosh²(2x)] 改写成 (1/2)cosh⁻²(2x)，依次对 −2 次幂、cosh 和 2x 求导：系数 (1/2)·(−2)·2=−2。",
      formula: math`\begin{gathered}
        \left(\frac{1}{2}\cosh^{-2}(2x)\right)'\\[4pt]
        =-\cosh^{-3}(2x)\cdot 2\sinh(2x)\\[4pt]
        =-\frac{2\sinh(2x)}{\cosh^3(2x)}
      \end{gathered}`,
    },
    {
      change: "两项通分并提取分子公因式",
      text: "把第一项分子分母同乘 cosh²(2x) 通分，再提取分子的公共因子 2sinh(2x)。",
      formula: math`\begin{gathered}
        y'=\frac{2\sinh(2x)\cosh^2(2x)-2\sinh(2x)}{\cosh^3(2x)}\\[4pt]
        =\frac{2\sinh(2x)\bigl(\cosh^2(2x)-1\bigr)}{\cosh^3(2x)}
      \end{gathered}`,
    },
    {
      change: "用 cosh²u−1=sinh²u 替换括号",
      text: "由双曲恒等式 cosh²(2x)−sinh²(2x)=1 可得 cosh²(2x)−1=sinh²(2x)。代入后分子分母都是三次幂，请用 tanh(2x)=sinh(2x)/cosh(2x) 写出最终结果，再对照参考解答。",
      formula: math`\begin{gathered}
        \cosh^2(2x)-1=\sinh^2(2x)\\[4pt]
        y'=\frac{2\sinh^3(2x)}{\cosh^3(2x)}
      \end{gathered}`,
    },
  ],

  "jc935-2-2-12-10": [
    {
      change: "令 u=(x−2)/(x+2)，对外两层求导",
      text: "在定义域 x≠−2 内设 u=(x−2)/(x+2)。对外两层 sinh²u 求导，先落出指数 2，再乘 (sinh u)′=cosh u，最后接上 u′。",
      formula: math`\begin{gathered}
        u=\frac{x-2}{x+2}\quad(x\ne -2)\\[4pt]
        y'=2\sinh u\cosh u\cdot u'
      \end{gathered}`,
    },
    {
      change: "用双曲倍角公式把 2sinh u cosh u 合并",
      text: "题目要求用双曲倍角公式化简：2sinh u cosh u=sinh(2u)，先合并掉外两层的乘积。",
      formula: math`\begin{gathered}
        2\sinh u\cosh u=\sinh(2u)\\[4pt]
        y'=\sinh(2u)\cdot u'
      \end{gathered}`,
    },
    {
      change: "用商法则算出内层分式的导数 u′",
      text: "对 u=(x−2)/(x+2) 套用商法则，分子是 1·(x+2)−(x−2)·1=4，分母是 (x+2)²。",
      formula: math`\begin{gathered}
        u'=\frac{(x+2)-(x-2)}{(x+2)^2}\\[4pt]
        =\frac{4}{(x+2)^2}
      \end{gathered}`,
    },
    {
      change: "相乘并准备把 2u 换回关于 x 的分式",
      text: "把 u′ 与 sinh(2u) 相乘，并写出 2u=2(x−2)/(x+2)。请把 2(x−2) 展开代入 sinh 里，写出最终导数并注明 x≠−2，再对照参考解答。",
      formula: math`\begin{gathered}
        y'=\frac{4}{(x+2)^2}\sinh(2u)\\[4pt]
        2u=\frac{2(x-2)}{x+2}\quad(x\ne -2)
      \end{gathered}`,
    },
  ],

  "jc935-2-2-13": [
    {
      change: "不能套乘积法则，回到导数定义写差商",
      text: "题目只说 g 在 x=1 处连续，并未保证 g′(1) 存在，所以绝不能直接套乘积求导法则！必须回到导数定义，先利用 f(1)=0 算出 h(1)=f(1)g(1)=0，再写出差商。",
      formula: math`\begin{gathered}
        h(1)=f(1)g(1)=0\\[4pt]
        \frac{h(x)-h(1)}{x-1}=\frac{f(x)g(x)}{x-1}
      \end{gathered}`,
    },
    {
      change: "补回 f(1)=0，把差商拆成两个因子的乘积",
      text: "因为 f(1)=0，可以把分子的 f(x) 改写成 f(x)−f(1)，再把分母 x−1 配给它，拆成“f 的差商”乘以 g(x)。",
      formula: math`\frac{h(x)-h(1)}{x-1}=\frac{f(x)-f(1)}{x-1}\cdot g(x)`,
    },
    {
      change: "分别写出两个因子在 x→1 时的极限",
      text: "因 f 在 x=1 可导，前一个因子极限为 f′(1)；因 g 在 x=1 连续，后一个因子极限为 g(1)。请由极限乘积法则说明差商极限存在，写出 h 在 x=1 可导及 h′(1) 的最终结论，再对照参考解答。",
      formula: math`\begin{gathered}
        \lim_{x\to 1}\frac{f(x)-f(1)}{x-1}=f'(1)\\[4pt]
        \lim_{x\to 1}g(x)=g(1)
      \end{gathered}`,
    },
  ],

  "jc935-2-2-14": [
    {
      change: "先单独验证恒零函数 f≡0 的情况",
      text: "后面需要除以非零函数值 f(x₀)，所以必须先分情况讨论：如果 f 在 ℝ 上恒等于 0，那么它显然处处可导且 f′(x)=0，等式 f′(x)=2f(x)f′(0) 自动成立。",
      formula: math`\begin{gathered}
        f(x)\equiv 0\implies f'(x)=0\\[4pt]
        2f(x)f'(0)=0
      \end{gathered}`,
    },
    {
      change: "当 f≢0 时，令 y=0 求出 f(0)=1/2",
      text: "若 f 不恒为零，则存在某点 x₀ 使 f(x₀)≠0。在函数方程中取 x=x₀、y=0，两边合法约去非零的 f(x₀)，得到 f(0)=1/2（注意不是 1）。",
      formula: math`\begin{gathered}
        f(x_0+0)=2f(x_0)f(0),\; f(x_0)\ne 0\\[4pt]
        \implies 1=2f(0)\implies f(0)=\frac{1}{2}
      \end{gathered}`,
    },
    {
      change: "写出任意点 x 的差商并用函数方程改写",
      text: "对任意 x∈ℝ 与 h≠0，写出差商 [f(x+h)−f(x)]/h，利用函数方程把 f(x+h) 替换成 2f(x)f(h)。",
      formula: math`\frac{f(x+h)-f(x)}{h}=\frac{2f(x)f(h)-f(x)}{h}`,
    },
    {
      change: "提取 2f(x) 并把 1/2 换回 f(0)",
      text: "从分子提出 2f(x)，括号内剩 f(h)−1/2，而 1/2 正好等于 f(0)，于是把任意点的差商平移成了原点处的差商！请令 h→0，利用 f 在 0 处可导得出最终结论，再对照参考解答。",
      formula: math`\begin{gathered}
        \frac{f(x+h)-f(x)}{h}\\[4pt]
        =2f(x)\cdot\frac{f(0+h)-f(0)}{h}
      \end{gathered}`,
    },
  ],
};

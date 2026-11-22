import type { GuidedHint } from "../learning";

const math = String.raw;

export const ch2Sec3to4GuidedHints: Record<string, GuidedHint[]> = {
  "jc935-2-3-1-1": [
    {
      change: "逐项求出一阶导数 y′",
      text: "因为 x>0，ln x 可导且导数为 1/x。把多项式项 3x³ 与对数项 −2ln x 分开求导，得到一阶导数 y′。",
      formula: math`\begin{gathered}
        y=3x^3-2\ln x\quad (x>0)\\[4pt]
        y'=9x^2-\frac{2}{x}
      \end{gathered}`,
    },
    {
      change: "把倒数项改写成负一次幂",
      text: "为了第二次求导更不容易弄错符号，把 −2/x 改写成 −2x⁻¹，前面的 9x² 先保持不动。",
      formula: math`y'=9x^2-2x^{-1}`,
    },
    {
      change: "对 y′ 逐项再求一次导",
      text: "对 9x² 求导得 18x；对 −2x⁻¹ 用幂函数法则，把指数 −1 乘下来并把指数减 1 变成 −2，注意负负得正。",
      formula: math`y''=18x-2(-1)x^{-2}`,
    },
    {
      change: "化简符号并改回分式形式",
      text: "算出 −2×(−1)=2，再把 x⁻² 写回 1/x²，即可写出最终的二阶导数 y″，并与参考解答核对。",
      formula: math`y''=18x+2x^{-2}=\;?`,
    },
  ],

  "jc935-2-3-1-2": [
    {
      change: "用链式法则求一阶导数",
      text: "把 3x+2 看作内层函数，外层指数 eᵘ 求导仍为 eᵘ，再乘以内层导数 (3x+2)′=3。",
      formula: math`\begin{gathered}
        y'=e^{3x+2}\cdot (3x+2)'\\[4pt]
        =3e^{3x+2}
      \end{gathered}`,
    },
    {
      change: "提出常数 3 对指数再求导",
      text: "一阶导数仍是常数 3 乘以同一个指数函数 e^(3x+2)。求二阶导数时先把常数 3 保留在外，再对 e^(3x+2) 套一次链式法则。",
      formula: math`y''=3\cdot\bigl(e^{3x+2}\cdot (3x+2)'\bigr)`,
    },
    {
      change: "合并两次乘出的系数",
      text: "内层导数再次给出因子 3。把前面的两个常数因子相乘，即可得到最终的 y″，再对照参考解答。",
      formula: math`y''=3\cdot 3e^{3x+2}=\;?`,
    },
  ],

  "jc935-2-3-1-3": [
    {
      change: "用乘积法则求一阶导数",
      text: "把 y=2x·sin x 看作 2x 与 sin x 的乘积，按 (uv)′=u′v+uv′ 展开，注意两项都要保留。",
      formula: math`\begin{gathered}
        y'=(2x)'\sin x+2x(\sin x)'\\[4pt]
        =2\sin x+2x\cos x
      \end{gathered}`,
    },
    {
      change: "拆成两项分别准备再求导",
      text: "求二阶导数时，第一项 2sin x 直接求导得 2cos x；第二项 2x·cos x 仍是乘积，必须再次使用乘积法则。",
      formula: math`\begin{gathered}
        y''=(2\sin x)'\\[4pt]
        +\bigl[(2x)'\cos x+2x(\cos x)'\bigr]
      \end{gathered}`,
    },
    {
      change: "算出各导数并展开括号",
      text: "代入 (2x)′=2 和 (cos x)′=−sin x，注意乘积第二项会带出一个负号。",
      formula: math`\begin{gathered}
        y''=2\cos x\\[4pt]
        +(2\cos x-2x\sin x)
      \end{gathered}`,
    },
    {
      change: "合并同类余弦项",
      text: "把两个 2cos x 合并成一项，−2x sin x 保持不变，写出最简结果并与参考解答核对。",
      formula: math`y''=(2+2)\cos x-2x\sin x=\;?`,
    },
  ],

  "jc935-2-3-1-4": [
    {
      change: "用乘积与链式法则求 y′",
      text: "把 y=e^(2t)·cos 2t 看作两项乘积。注意内层都是 2t，求导时 (e^(2t))′=2e^(2t)，(cos 2t)′=−2sin 2t。",
      formula: math`\begin{gathered}
        y'=2e^{2t}\cos 2t\\[4pt]
        +e^{2t}(-2\sin 2t)
      \end{gathered}`,
    },
    {
      change: "提取公因式 2e^(2t)",
      text: "两项都含有 2e^(2t)，先把它提出来，这样第二次求导只需做一次乘积法则，不易漏项。",
      formula: math`y'=2e^{2t}(\cos 2t-\sin 2t)`,
    },
    {
      change: "对提取后的乘积再求导",
      text: "把 2e^(2t) 与 (cos 2t−sin 2t) 作为两个因子再套乘积法则，两个因子内部求导都要再乘系数 2。",
      formula: math`\begin{gathered}
        y''=4e^{2t}(\cos 2t-\sin 2t)\\[4pt]
        +2e^{2t}(-2\sin 2t-2\cos 2t)
      \end{gathered}`,
    },
    {
      change: "提取 4e^(2t) 并合并同类项",
      text: "把公因式 4e^(2t) 提到外面，看看括号里 cos 2t 与 sin 2t 各自合并后剩下什么，写出结果再对照参考解答。",
      formula: math`\begin{gathered}
        y''=4e^{2t}\bigl[(\cos 2t-\sin 2t)\\[4pt]
        -(\sin 2t+\cos 2t)\bigr]=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-3-1-5": [
    {
      change: "用链式法则求一阶导数",
      text: "因 b>0，b²+x² 恒正。用 (√u)′=u′/(2√u) 求导，内层 (b²+x²)′=2x，分子分母的 2 可以立刻约去。",
      formula: math`\begin{gathered}
        y'=\frac{2x}{2\sqrt{b^2+x^2}}\\[4pt]
        =\frac{x}{\sqrt{b^2+x^2}}
      \end{gathered}`,
    },
    {
      change: "对一阶分式套用商法则",
      text: "把 y′ 写成商 x / √(b²+x²)，套用 (f/g)′=(f′g−fg′)/g²。其中 g′ 恰好就是刚才算过的 y′=x/√(b²+x²)。",
      formula: math`\begin{gathered}
        y''=\frac{1\cdot\sqrt{b^2+x^2}-x\cdot\frac{x}{\sqrt{b^2+x^2}}}{b^2+x^2}
      \end{gathered}`,
    },
    {
      change: "分子通分消去繁分式",
      text: "分子分母同乘正数 √(b²+x²)，分子变成 (b²+x²)−x²，分母的次幂变为 (b²+x²)¹·(b²+x²)^(1/2)。",
      formula: math`y''=\frac{(b^2+x^2)-x^2}{(b^2+x^2)\sqrt{b^2+x^2}}`,
    },
    {
      change: "化简分子并合并分母指数",
      text: "分子中的 x² 与 −x² 相互抵消，分母指数相加 1+1/2=3/2。请写出最终的 y″ 并与参考解答核对。",
      formula: math`y''=\frac{b^2}{(b^2+x^2)^{1+1/2}}=\;?`,
    },
  ],

  "jc935-2-3-1-6": [
    {
      change: "用链式法则求一阶导数",
      text: "因为 x²+3 恒大于 0，对 ln(x²+3) 求导得 u′/u，其中 u=x²+3、u′=2x。",
      formula: math`y'=\frac{(x^2+3)'}{x^2+3}=\frac{2x}{x^2+3}`,
    },
    {
      change: "对分式 y′ 套用商法则",
      text: "对 2x/(x²+3) 用商法则 (f′g−fg′)/g²，注意分子是“上导下不导减上不导下导”，不要颠倒减法顺序。",
      formula: math`\begin{gathered}
        y''=\\[4pt]
        \frac{2(x^2+3)-2x\cdot 2x}{(x^2+3)^2}
      \end{gathered}`,
    },
    {
      change: "展开分子并合并同类项",
      text: "分母 (x²+3)² 保持不动，把分子展开成 2x²+6−4x²，合并 x² 项后再提取公因数 2。",
      formula: math`\begin{gathered}
        y''=\frac{2x^2+6-4x^2}{(x^2+3)^2}\\[4pt]
        =\frac{6-2x^2}{(x^2+3)^2}=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-3-1-7": [
    {
      change: "用链式法则求一阶导数",
      text: "在 2x≠kπ 处，利用 (cot u)′=−csc²u，再乘以内层导数 (2x)′=2，得到 y′。",
      formula: math`\begin{gathered}
        y'=(-\csc^2 2x)\cdot (2x)'\\[4pt]
        =-2\csc^2 2x
      \end{gathered}`,
    },
    {
      change: "把平方写成复合幂函数",
      text: "把 −2csc²(2x) 写成 −2(csc 2x)²，看作外层平方与内层 csc 2x 的复合，先对外层平方求导。",
      formula: math`\begin{gathered}
        y''=-2\cdot 2\csc 2x\cdot (\csc 2x)'\\[4pt]
        =-4\csc 2x\cdot (\csc 2x)'
      \end{gathered}`,
    },
    {
      change: "代入余割的链式导数",
      text: "记住 (csc u)′=−csc u cot u，别忘了还要再乘一次内层导数 (2x)′=2。",
      formula: math`\begin{gathered}
        (\csc 2x)'=-2\csc 2x\cot 2x\\[4pt]
        y''=-4\csc 2x(-2\csc 2x\cot 2x)
      \end{gathered}`,
    },
    {
      change: "合并符号系数与同名因子",
      text: "算出 −4×(−2)=8，并把两个 csc 2x 合并成 csc²2x，写出最终 y″ 再对照参考解答。",
      formula: math`y''=(-4)(-2)\csc^2 2x\cot 2x=\;?`,
    },
  ],

  "jc935-2-3-1-8": [
    {
      change: "改写为负一次幂求 y′",
      text: "在 x³≠−2 处，把 y=(x³+2)⁻¹ 按复合幂函数求导，外层出 −(x³+2)⁻²，再乘内层导数 3x²。",
      formula: math`\begin{gathered}
        y=(x^3+2)^{-1}\\[4pt]
        y'=-1\cdot (x^3+2)^{-2}\cdot 3x^2\\[4pt]
        =-\frac{3x^2}{(x^3+2)^2}
      \end{gathered}`,
    },
    {
      change: "对一阶分式套用商法则",
      text: "把负号留在分子 −3x² 里，对 −3x² / (x³+2)² 用商法则，分母平方变成 (x³+2)⁴。",
      formula: math`\begin{gathered}
        y''=\frac{1}{(x^3+2)^4}\Bigl[-6x(x^3+2)^2\\[4pt]
        -(-3x^2)\cdot 2(x^3+2)\cdot 3x^2\Bigr]
      \end{gathered}`,
    },
    {
      change: "分子分母先约去 (x³+2)",
      text: "因 x³+2≠0，分子两项与分母都含公因式 (x³+2)，先上下同除以它，分母降为三次方，分子大幅简化。",
      formula: math`\begin{gathered}
        y''=\frac{-6x(x^3+2)+18x^4}{(x^3+2)^3}
      \end{gathered}`,
    },
    {
      change: "合并分子并提取公因式",
      text: "把分子展开成 −6x⁴−12x+18x⁴，合并同类项后提取公因式 12x，写出最简分式并与参考解答核对。",
      formula: math`y''=\frac{12x^4-12x}{(x^3+2)^3}=\;?`,
    },
  ],

  "jc935-2-3-1-9": [
    {
      change: "用乘积法则求一阶导数",
      text: "把 y=(1+4x²)·arctan 2x 看作乘积求导。注意 (arctan 2x)′=2/[1+(2x)²]=2/(1+4x²)，别漏掉内层导数 2。",
      formula: math`\begin{gathered}
        y'=8x\arctan 2x\\[4pt]
        +(1+4x^2)\cdot\frac{2}{1+4x^2}
      \end{gathered}`,
    },
    {
      change: "约简分式把 y′ 彻底化简",
      text: "因为 1+4x² 恒大于 0，第二项分子分母的 (1+4x²) 直接约掉，变成简单常数 2。",
      formula: math`y'=8x\arctan 2x+2`,
    },
    {
      change: "对化简后的 y′ 再求导",
      text: "常数 2 求导为 0，只需对 8x·arctan 2x 再用一次乘积法则，同样注意 (arctan 2x)′=2/(1+4x²)。",
      formula: math`\begin{gathered}
        y''=8\arctan 2x\\[4pt]
        +8x\cdot\frac{2}{1+4x^2}+0
      \end{gathered}`,
    },
    {
      change: "整理系数写出二阶导数",
      text: "把第二项分子的 8x·2 合并为 16x，即可得到最终的 y″，再与参考解答核对。",
      formula: math`\begin{gathered}
        y''=8\arctan 2x\\[4pt]
        +\frac{8x\cdot 2}{1+4x^2}=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-3-1-10": [
    {
      change: "用商法则求 y′ 并提公因子",
      text: "在 x≠0 处对 e^(2x)/x 用商法则，注意 (e^(2x))′=2e^(2x)，把公因子 e^(2x) 提到分子前面。",
      formula: math`\begin{gathered}
        y'=\frac{2e^{2x}\cdot x-e^{2x}\cdot 1}{x^2}\\[4pt]
        =\frac{(2x-1)e^{2x}}{x^2}
      \end{gathered}`,
    },
    {
      change: "先单独算出新分子的导数",
      text: "准备对 y′ 再用商法则前，先把分子 (2x−1)e^(2x) 的导数算清，避免一长串式子写乱。",
      formula: math`\begin{gathered}
        \bigl[(2x-1)e^{2x}\bigr]'\\[4pt]
        =\bigl[2+2(2x-1)\bigr]e^{2x}=4xe^{2x}
      \end{gathered}`,
    },
    {
      change: "对 y′ 套用商法则并约去 x",
      text: "套商法则后，分子两项都含 x 与 e^(2x)，因 x≠0，分子分母先同除以 x，分母从 x⁴ 降为 x³。",
      formula: math`\begin{gathered}
        y''=\frac{4xe^{2x}\cdot x^2-(2x-1)e^{2x}\cdot 2x}{x^4}\\[4pt]
        =\frac{e^{2x}\bigl[4x^2-2(2x-1)\bigr]}{x^3}
      \end{gathered}`,
    },
    {
      change: "展开括号并提取公因数 2",
      text: "展开中括号内的 4x²−4x+2，提取公因数 2 到最前面，即可写出最终 y″ 并核对参考解答。",
      formula: math`y''=\frac{e^{2x}(4x^2-4x+2)}{x^3}=\;?`,
    },
  ],

  "jc935-2-3-1-11": [
    {
      change: "用乘积法则求 y′ 并提公因子",
      text: "对 x·e^(−x²) 用乘积法则，其中 (e^(−x²))′=−2x·e^(−x²)。把 e^(−x²) 提出来合并多项式。",
      formula: math`\begin{gathered}
        y'=1\cdot e^{-x^2}+x(-2x)e^{-x^2}\\[4pt]
        =(1-2x^2)e^{-x^2}
      \end{gathered}`,
    },
    {
      change: "对化简后的乘积再求导",
      text: "把 (1−2x²) 和 e^(−x²) 看作两项乘积再求导，第一项导数为 −4x，第二项导数仍是 −2x·e^(−x²)。",
      formula: math`\begin{gathered}
        y''=(-4x)e^{-x^2}\\[4pt]
        +(1-2x^2)(-2x)e^{-x^2}
      \end{gathered}`,
    },
    {
      change: "提取 e^(−x²) 并合并同类项",
      text: "把公因子 e^(−x²) 提出来，展开括号内的 −4x−2x+4x³，合并一次项。",
      formula: math`\begin{gathered}
        y''=(-4x-2x+4x^3)e^{-x^2}\\[4pt]
        =(4x^3-6x)e^{-x^2}
      \end{gathered}`,
    },
    {
      change: "从多项式中提取公因式 2x",
      text: "把 4x³−6x 提取公因式 2x 写成因式分解形式，得到最终 y″ 再与参考解答核对。",
      formula: math`y''=2x(\;\text{?}\;)e^{-x^2}=\;?`,
    },
  ],

  "jc935-2-3-1-12": [
    {
      change: "用链式法则写出 y′",
      text: "对所有实数 x 都有 x+√(x²+4)>0。对 ln u 求导得 u′/u，这里 u′=1+2x/[2√(x²+4)]=1+x/√(x²+4)。",
      formula: math`y'=\frac{1+\frac{x}{\sqrt{x^2+4}}}{x+\sqrt{x^2+4}}`,
    },
    {
      change: "分子通分并约去整块公因式",
      text: "把分子通分成 [√(x²+4)+x]/√(x²+4)，它与外层分母 x+√(x²+4) 完全相同且恒正，直接整体约掉。",
      formula: math`\begin{gathered}
        y'=\frac{\frac{\sqrt{x^2+4}+x}{\sqrt{x^2+4}}}{x+\sqrt{x^2+4}}\\[4pt]
        =\frac{1}{\sqrt{x^2+4}}
      \end{gathered}`,
    },
    {
      change: "改写为负分数幂再求导",
      text: "把 y′=(x²+4)^(-1/2) 用复合幂函数法则求导，外层出 −(1/2)(x²+4)^(-3/2)，再乘内层导数 2x。",
      formula: math`\begin{gathered}
        y'=(x^2+4)^{-1/2}\\[4pt]
        y''=-\frac{1}{2}(x^2+4)^{-3/2}\cdot 2x
      \end{gathered}`,
    },
    {
      change: "约去 2 并写成正指数分式",
      text: "把系数 −(1/2)·2 约成 −1，把负指数 (x²+4)^(-3/2) 放回分母，写出最终 y″ 并对照参考解答。",
      formula: math`y''=-x(x^2+4)^{-3/2}=\;?`,
    },
  ],

  "jc935-2-3-2": [
    {
      change: "求一阶与二阶导数 f′、f″",
      text: "必须先求完三阶导函数再代入 x=4。每次对 (2x−5)ᵏ 求导，都要把指数 k 乘下来，同时再乘内层导数 2。",
      formula: math`\begin{gathered}
        f'(x)=5(2x-5)^4\cdot 2=10(2x-5)^4\\[4pt]
        f''(x)=10\cdot 4(2x-5)^3\cdot 2\\[4pt]
        =80(2x-5)^3
      \end{gathered}`,
    },
    {
      change: "再求一次导得到三阶导数 f‴(x)",
      text: "对 80(2x−5)³ 再用一次链式法则，乘出指数 3 与内层导数 2，指数降为 2。",
      formula: math`\begin{gathered}
        f'''(x)=80\cdot 3(2x-5)^2\cdot 2\\[4pt]
        =480(2x-5)^2
      \end{gathered}`,
    },
    {
      change: "代入 x=4 计算最终数值",
      text: "把 x=4 代入三阶导数表达式，先算括号内 2×4−5=3，再算平方并与 480 相乘，最后对照参考解答。",
      formula: math`f'''(4)=480(2\cdot 4-5)^2=480\cdot 3^2=\;?`,
    },
  ],

  "jc935-2-3-3-1": [
    {
      change: "用链式法则求一阶导数",
      text: "把 x³ 当作内层变量，对 y=f(x³) 求导时外层写成 f′(x³)，再乘以内层导数 (x³)′=3x²。",
      formula: math`\frac{\mathrm dy}{\mathrm dx}=f'(x^3)\cdot 3x^2=3x^2 f'(x^3)`,
    },
    {
      change: "对一阶导数套用乘积法则",
      text: "一阶导数是 3x² 与 f′(x³) 的乘积。求二阶导数时按 (uv)′=u′v+uv′ 展开，先把 [f′(x³)]′ 保留着。",
      formula: math`\begin{gathered}
        \frac{\mathrm d^2 y}{\mathrm dx^2}=(3x^2)'f'(x^3)\\[4pt]
        +3x^2\cdot\bigl[f'(x^3)\bigr]'
      \end{gathered}`,
    },
    {
      change: "对 f′(x³) 再次使用链式法则",
      text: "f′(x³) 仍是关于 x³ 的复合函数，对 x 求导得 f″(x³)·(x³)′=3x²f″(x³)，别漏掉这第二次的 3x²。",
      formula: math`\begin{gathered}
        \bigl[f'(x^3)\bigr]'=f''(x^3)\cdot 3x^2\\[4pt]
        \frac{\mathrm d^2 y}{\mathrm dx^2}=6xf'(x^3)\\[4pt]
        +3x^2\cdot 3x^2 f''(x^3)=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-3-3-2": [
    {
      change: "用链式法则求一阶导数",
      text: "外层指数 eᵘ 的导数仍是 eᵘ，内层是 f(x)，因此一阶导数多乘出一个 f′(x)。",
      formula: math`\frac{\mathrm dy}{\mathrm dx}=e^{f(x)}\cdot f'(x)`,
    },
    {
      change: "对乘积 f′(x)e^(f(x)) 再求导",
      text: "按乘积法则展开二阶导数：第一项对 f′(x) 求导得 f″(x)，第二项对 e^(f(x)) 再套一次链式法则。",
      formula: math`\begin{gathered}
        \frac{\mathrm d^2 y}{\mathrm dx^2}=f''(x)e^{f(x)}\\[4pt]
        +f'(x)\cdot\bigl[e^{f(x)}f'(x)\bigr]
      \end{gathered}`,
    },
    {
      change: "合并平方项并提取公因子",
      text: "第二项中的两个 f′(x) 相乘记作 [f′(x)]²（注意不是 f′(x²)），提取公因子 e^(f(x)) 即可写出结果并核对参考解答。",
      formula: math`\begin{gathered}
        \frac{\mathrm d^2 y}{\mathrm dx^2}=f''(x)e^{f(x)}\\[4pt]
        +[f'(x)]^2 e^{f(x)}=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-3-4-1": [
    {
      change: "把对 u 求导转为对 t 求导",
      text: "已知 dt/du=1/g′(t) 是关于 t 的表达式，而 t 是 u 的函数。再对 u 求导时必须用链式法则：先对 t 求导，再乘 dt/du。",
      formula: math`\frac{\mathrm d^2 t}{\mathrm du^2}=\frac{\mathrm d}{\mathrm dt}\!\left(\frac{1}{g'(t)}\right)\cdot\frac{\mathrm dt}{\mathrm du}`,
    },
    {
      change: "算出倒数导数并代回 dt/du",
      text: "由倒数求导公式，(1/g′(t)) 对 t 的导数是 −g″(t)/[g′(t)]²，再乘以 dt/du=1/g′(t)，合并分母得到反函数二阶导公式。",
      formula: math`\begin{gathered}
        \frac{\mathrm d^2 t}{\mathrm du^2}=-\frac{g''(t)}{[g'(t)]^2}\cdot\frac{1}{g'(t)}\\[4pt]
        =-\frac{g''(t)}{[g'(t)]^3}
      \end{gathered}`,
    },
    {
      change: "算出 g(t)=t³+2t 在 t=1 的各阶导",
      text: "对具体函数 g(t)=t³+2t 依次求一阶、二阶导数，再把 t=1 代入，确认 g′(1)≠0。",
      formula: math`\begin{gathered}
        g'(t)=3t^2+2\implies g'(1)=5\\[4pt]
        g''(t)=6t\implies g''(1)=6
      \end{gathered}`,
    },
    {
      change: "代入反函数二阶导公式求值",
      text: "把 g′(1)=5 与 g″(1)=6 代入刚才推出的公式 −g″(1)/[g′(1)]³，算出最简分数并与参考解答核对。",
      formula: math`\left.\frac{\mathrm d^2 t}{\mathrm du^2}\right|_{t=1}=-\frac{6}{5^3}=\;?`,
    },
  ],

  "jc935-2-3-4-2": [
    {
      change: "对二阶导式套用链式法则",
      text: "要求 d³t/du³，把二阶导数表达式 −g″/(g′)³ 先对 t 求导，再乘换变量因子 dt/du=1/g′。",
      formula: math`\frac{\mathrm d^3 t}{\mathrm du^3}=\frac{\mathrm d}{\mathrm dt}\!\left(-\frac{g''}{(g')^3}\right)\cdot\frac{1}{g'}`,
    },
    {
      change: "用商法则求对 t 的导数",
      text: "对 −g″/(g′)³ 用商法则，注意分母 (g′)³ 对 t 的导数是 3(g′)²g″，外面的负号保留在括号前。",
      formula: math`\begin{gathered}
        \frac{\mathrm d}{\mathrm dt}\!\left(-\frac{g''}{(g')^3}\right)=\\[4pt]
        -\frac{g'''(g')^3-g''\cdot 3(g')^2 g''}{(g')^6}
      \end{gathered}`,
    },
    {
      change: "约去 (g′)² 并乘以 1/g′",
      text: "因 g′≠0，分子分母先约去 (g′)²，再把负号乘进分子翻转减法顺序，最后乘上 1/g′ 使分母升为 (g′)⁵。",
      formula: math`\begin{gathered}
        \frac{\mathrm d^3 t}{\mathrm du^3}=\frac{3(g'')^2-g'g'''}{(g')^4}\cdot\frac{1}{g'}\\[4pt]
        =\frac{3(g'')^2-g'g'''}{(g')^5}
      \end{gathered}`,
    },
    {
      change: "求 g(t)=eᵗ+t 在 t=0 的各阶导并代入",
      text: "依次求导得 g′(t)=eᵗ+1、g″(t)=eᵗ、g‴(t)=eᵗ，在 t=0 处分别为 2, 1, 1。代入通式算出分数并与参考解答核对。",
      formula: math`\begin{gathered}
        g'(0)=2,\;g''(0)=1,\;g'''(0)=1\\[4pt]
        \left.\frac{\mathrm d^3 t}{\mathrm du^3}\right|_{t=0}=\frac{3\cdot 1^2-2\cdot 1}{2^5}=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-3-5": [
    {
      change: "求位移对时间的一阶导数（速度）",
      text: "对 x(t)=B cos(ωt+φ) 关于 t 求导，B、ω、φ 均为常数。内层 (ωt+φ)′=ω，(cos u)′=−sin u。",
      formula: math`\begin{gathered}
        v(t)=\frac{\mathrm dx}{\mathrm dt}\\[4pt]
        =-B\omega\sin(\omega t+\varphi)
      \end{gathered}`,
    },
    {
      change: "对速度再求导得加速度 a(t)",
      text: "常数 −Bω 保留在外，对 sin(ωt+φ) 再用一次链式法则，又乘出一个 ω，且 sin 变回 cos。",
      formula: math`\begin{gathered}
        a(t)=\frac{\mathrm d^2 x}{\mathrm dt^2}\\[4pt]
        =-B\omega\cdot\omega\cos(\omega t+\varphi)\\[4pt]
        =-B\omega^2\cos(\omega t+\varphi)
      \end{gathered}`,
    },
    {
      change: "代入微分方程左侧完成验证",
      text: "把刚算出的 d²x/dt² 与原式 x(t) 代入 d²x/dt²+ω²x，观察两项系数是否恰好相反，写出验证结论并对照参考解答。",
      formula: math`\begin{gathered}
        \frac{\mathrm d^2 x}{\mathrm dt^2}+\omega^2 x\\[4pt]
        =-B\omega^2\cos(\omega t+\varphi)\\[4pt]
        +\omega^2 B\cos(\omega t+\varphi)=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-3-6": [
    {
      change: "用链式法则把加速度改写经由 h",
      text: "速度 v=k/h 给的是关于深度 h 的函数，而不是直接关于 t 的函数。求加速度 a=dv/dt 时，先对 h 求导再乘 dh/dt。",
      formula: math`a=\frac{\mathrm d^2 h}{\mathrm dt^2}=\frac{\mathrm dv}{\mathrm dt}=\frac{\mathrm dv}{\mathrm dh}\cdot\frac{\mathrm dh}{\mathrm dt}`,
    },
    {
      change: "算出速度对深度的导数 dv/dh",
      text: "在 h>0 时把 v=kh⁻¹ 对 h 求导，得到 dv/dh=−k/h²。",
      formula: math`\frac{\mathrm dv}{\mathrm dh}=\frac{\mathrm d}{\mathrm dh}(kh^{-1})=-\frac{k}{h^2}`,
    },
    {
      change: "乘回 dh/dt 并给出反比结论",
      text: "把 dv/dh=−k/h² 与已知 dh/dt=k/h 相乘，化简后因 k≠0 知 −k² 为非零常数，从而说明 a 与 h³ 成反比，最后对照参考解答。",
      formula: math`a=\left(-\frac{k}{h^2}\right)\cdot\frac{k}{h}=\;?`,
    },
  ],

  "jc935-2-3-7": [
    {
      change: "用链式法则把加速度拆成两段",
      text: "已知速度 v=ds/dt=[g(s)]² 是位置 s 的函数。对时间 t 再求导得加速度时，要先对 s 求导，再乘 ds/dt。",
      formula: math`\begin{gathered}
        a=\frac{\mathrm d^2 s}{\mathrm dt^2}\\[4pt]
        =\frac{\mathrm d}{\mathrm ds}\bigl([g(s)]^2\bigr)\cdot\frac{\mathrm ds}{\mathrm dt}
      \end{gathered}`,
    },
    {
      change: "对 [g(s)]² 关于 s 求导",
      text: "把 [g(s)]² 看作外层平方与内层 g(s) 的复合函数，对 s 求导得到 2g(s)g′(s)。",
      formula: math`\frac{\mathrm d}{\mathrm ds}\bigl([g(s)]^2\bigr)=2g(s)g'(s)`,
    },
    {
      change: "代回 ds/dt=[g(s)]² 并合并幂次",
      text: "把上面两因子相乘并把 g(s) 与 [g(s)]² 合并成三次方，即可写出加速度公式并对照参考解答。",
      formula: math`a=2g(s)g'(s)\cdot [g(s)]^2=\;?`,
    },
  ],

  "jc935-2-3-8": [
    {
      change: "先用 x=0 处的连续性定出 c",
      text: "二阶可导必先连续。令 x→0⁺ 的右极限等于函数值 f(0)=e⁰+sin 0，直接定出常数 c。",
      formula: math`\begin{gathered}
        f(0)=e^0+\sin 0=1\\[4pt]
        \lim_{x\to 0^+}f(x)=c\implies c=1
      \end{gathered}`,
    },
    {
      change: "用左右导数相等定出 b",
      text: "把 c=1 代入后，在 x=0 处用导数定义（或左右导数极限）分别计算左导数 f′₋(0) 与右导数 f′₊(0)，令两者相等求 b。",
      formula: math`\begin{gathered}
        f'_-(0)=\lim_{x\to 0^-}\frac{e^{2x}-1+\sin x}{x}=2+1=3\\[4pt]
        f'_+(0)=b\implies b=3
      \end{gathered}`,
    },
    {
      change: "写出各区间上的一阶导函数 f′(x)",
      text: "现在 f′(x) 在全实数轴上存在且在 x=0 处连续，写出左右两段的一阶导数表达式，准备求 x=0 处的二阶左右导数。",
      formula: math`f'(x)=\begin{cases}2e^{2x}+\cos x,&x\le 0\\2ax+3,&x>0\end{cases}`,
    },
    {
      change: "用二阶左右导数相等定出 a",
      text: "在 x=0 处求 f′(x) 的左右导数：左端由极限 (2e^(2x)+cos x−3)/x 得 4，右端为 2a。令两者相等解出 a，汇总结论并对照参考解答。",
      formula: math`\begin{gathered}
        f''_-(0)=\lim_{x\to 0^-}\frac{2(e^{2x}-1)-(1-\cos x)}{x}=4\\[4pt]
        f''_+(0)=2a=4\implies a=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-3-9-1": [
    {
      change: "写出 n=4 的莱布尼茨展开式",
      text: "令 u=e^(2x)、v=sin x。按二项式系数 1, 4, 6, 4, 1 写出四阶导数的五项展开式。",
      formula: math`\begin{gathered}
        y^{(4)}=u^{(4)}v+4u'''v'\\[4pt]
        +6u''v''+4u'v'''+uv^{(4)}
      \end{gathered}`,
    },
    {
      change: "列出 u 和 v 的 0 到 4 阶导数",
      text: "e^(2x) 每求导一次多乘一个 2；sin x 的各阶导数按 sin, cos, −sin, −cos, sin 循环，先把两列导数写齐。",
      formula: math`\begin{gathered}
        u^{(k)}=2^k e^{2x}\quad (k=0,1,2,3,4)\\[4pt]
        v'=\cos x,\;v''=-\sin x\\[4pt]
        v'''=-\cos x,\;v^{(4)}=\sin x
      \end{gathered}`,
    },
    {
      change: "逐项代入并提取公因子 e^(2x)",
      text: "把上面的导数与系数 1, 4, 6, 4, 1 逐项相乘，公共的 e^(2x) 提到括号外面，注意负号位置。",
      formula: math`\begin{gathered}
        y^{(4)}=e^{2x}\bigl(16\sin x+32\cos x\\[4pt]
        -24\sin x-8\cos x+\sin x\bigr)
      \end{gathered}`,
    },
    {
      change: "分别合并 cos x 与 sin x 的系数",
      text: "把余弦项 32−8 与正弦项 16−24+1 各自算清，即可写出最终 y⁽⁴⁾ 并对照参考解答。",
      formula: math`\begin{gathered}
        y^{(4)}=e^{2x}\bigl[(32-8)\cos x\\[4pt]
        +(16-24+1)\sin x\bigr]=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-3-9-2": [
    {
      change: "选定 u、v 并截断莱布尼茨展开",
      text: "令 u=cos 3x、v=x²。因为 v′=2x、v″=2，而三阶及以上导数全为 0，20 阶莱布尼茨展开只剩下 k=0, 1, 2 三项。",
      formula: math`\begin{gathered}
        y^{(20)}=\binom{20}{0}u^{(20)}x^2\\[4pt]
        +\binom{20}{1}u^{(19)}(2x)+\binom{20}{2}u^{(18)}\cdot 2
      \end{gathered}`,
    },
    {
      change: "算清三项的组合系数与高阶导公式",
      text: "代入 C(20,1)=20、C(20,2)=190，并写出 (cos 3x)⁽ⁿ⁾=3ⁿ cos(3x+nπ/2) 在 n=20, 19, 18 时的表达式。",
      formula: math`\begin{gathered}
        y^{(20)}=x^2\cdot 3^{20}\cos(3x+10\pi)\\[4pt]
        +40x\cdot 3^{19}\cos\!\left(3x+\frac{19\pi}{2}\right)\\[4pt]
        +380\cdot 3^{18}\cos(3x+9\pi)
      \end{gathered}`,
    },
    {
      change: "用诱导公式化简三个相位",
      text: "利用周期 2π 化简：10π≡0 故为 cos 3x；19π/2=8π+3π/2 故 cos(3x+3π/2)=+sin 3x；9π=8π+π 故为 −cos 3x。",
      formula: math`\begin{gathered}
        y^{(20)}=3^{20}x^2\cos 3x\\[4pt]
        +40\cdot 3^{19}x\sin 3x-380\cdot 3^{18}\cos 3x
      \end{gathered}`,
    },
    {
      change: "提取 3¹⁸ 并合并 cos 3x 项",
      text: "把 3²⁰ 写成 9·3¹⁸、把 40·3¹⁹ 写成 120·3¹⁸，提取公因子 3¹⁸ 并合并两个余弦项，写出最终结果再对照参考解答。",
      formula: math`\begin{gathered}
        y^{(20)}=3^{18}(9x^2-380)\cos 3x\\[4pt]
        +(40\cdot 3)\cdot 3^{18}x\sin 3x=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-3-10-1": [
    {
      change: "把原函数拆成两部分求 n 阶导",
      text: "把 y 拆成 (2x+1)ⁿ 与后半部分多项式 P(x)=c₁xⁿ⁻¹+…+cₙ。因为 P(x) 次数不超过 n−1，求 n 次导后必恒为 0。",
      formula: math`\begin{gathered}
        P(x)=c_1 x^{n-1}+\cdots+c_n\\[4pt]
        P^{(n)}(x)=0\implies y^{(n)}=\bigl[(2x+1)^n\bigr]^{(n)}
      \end{gathered}`,
    },
    {
      change: "写出前两阶导数观察递推规律",
      text: "对 (2x+1)ⁿ 逐次求导，每次既把当前幂次乘下来，又乘出内层系数 2。",
      formula: math`\begin{gathered}
        \bigl[(2x+1)^n\bigr]'=2n(2x+1)^{n-1}\\[4pt]
        \bigl[(2x+1)^n\bigr]''=2^2 n(n-1)(2x+1)^{n-2}
      \end{gathered}`,
    },
    {
      change: "连求 n 次导并整理为阶乘",
      text: "连续求导 n 次后，一共乘出 n 个 2 以及 n(n−1)⋯2·1，而 (2x+1)⁰=1。请用阶乘记号写出最终 y⁽ⁿ⁾ 并对照参考解答。",
      formula: math`\begin{gathered}
        y^{(n)}=2^n\cdot n(n-1)\cdots 2\cdot 1\\[4pt]
        \cdot (2x+1)^0=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-3-10-2": [
    {
      change: "用倍角降幂公式消去平方",
      text: "直接对 cos²(2x) 连求 n 阶导很复杂。先用降幂公式 cos²α=(1+cos 2α)/2（取 α=2x），把平方变成一次余弦。",
      formula: math`y=\cos^2(2x)=\frac{1+\cos 4x}{2}=\frac{1}{2}+\frac{1}{2}\cos 4x`,
    },
    {
      change: "套用余弦的 n 阶导标准公式",
      text: "对 n≥1，常数 1/2 的 n 阶导数为 0；对 cos 4x 套用 (cos ax)⁽ⁿ⁾=aⁿ cos(ax+nπ/2)（这里 a=4）。",
      formula: math`\begin{gathered}
        y^{(n)}=0+\frac{1}{2}\cdot 4^n\cos\!\left(4x+\frac{n\pi}{2}\right)\\[4pt]
        (n\ge 1)
      \end{gathered}`,
    },
    {
      change: "把 4ⁿ/2 统一改写为 2 的幂",
      text: "将 4ⁿ=(2²)ⁿ=2^(2n)，再除以 2 使指数减 1，即可写出最简通式并对照参考解答。",
      formula: math`\begin{gathered}
        \frac{4^n}{2}=\frac{2^{2n}}{2}=\;?\\[4pt]
        y^{(n)}=\frac{4^n}{2}\cos\!\left(4x+\frac{n\pi}{2}\right)=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-3-10-3": [
    {
      change: "先求一阶与二阶导数消去对数",
      text: "在 x>1/2 上，用乘积与链式法则求 y′，注意 (2x−1)·2/(2x−1)=2；再求一次导，对数彻底消失，变成简单分式。",
      formula: math`\begin{gathered}
        y'=2\ln(2x-1)+2\\[4pt]
        y''=\frac{4}{2x-1}=2^2(2x-1)^{-1}
      \end{gathered}`,
    },
    {
      change: "再算三阶、四阶导观察规律",
      text: "对 y″=2²(2x−1)⁻¹ 继续求导，每次乘出当前负指数和内层系数 2，留意符号交替、2 的幂次和阶乘。",
      formula: math`\begin{gathered}
        y'''=-2^3\cdot 1!(2x-1)^{-2}\\[4pt]
        y^{(4)}=2^4\cdot 2!(2x-1)^{-3}
      \end{gathered}`,
    },
    {
      change: "由 y″ 再求 n−2 次导写通式",
      text: "从 y″ 到 y⁽ⁿ⁾（n≥2）还需再求 n−2 次导：符号产生 (−1)^(n−2)=(−1)ⁿ，2 的幂次升到 2ⁿ，阶乘为 (n−2)!，分母次幂为 n−1。请核对 n=2, 3, 4 后写出最终通式并对照参考解答。",
      formula: math`\begin{gathered}
        y^{(n)}=(-1)^{n-2}2^2\cdot 2^{n-2}\\[4pt]
        \cdot\frac{(n-2)!}{(2x-1)^{n-1}}=\;?\quad (n\ge 2)
      \end{gathered}`,
    },
  ],

  "jc935-2-3-10-4": [
    {
      change: "选定 u、v 写出莱布尼茨截断式",
      text: "令 u=e^(3x)、v=x。因为 v′=1 且 v⁽ᵏ⁾=0（k≥2），莱布尼茨公式对任意 n≥1 都只保留 k=0 与 k=1 两项。",
      formula: math`y^{(n)}=\binom{n}{0}u^{(n)}x+\binom{n}{1}u^{(n-1)}\cdot 1`,
    },
    {
      change: "代入指数函数的高阶导数",
      text: "对 u=e^(3x) 有 u⁽ᵐ⁾=3ᵐe^(3x)，把 m=n 与 m=n−1 分别代入上面两项。",
      formula: math`\begin{gathered}
        y^{(n)}=x\cdot 3^n e^{3x}\\[4pt]
        +n\cdot 3^{n-1}e^{3x}
      \end{gathered}`,
    },
    {
      change: "提取公因子 3^(n−1)e^(3x)",
      text: "把 3ⁿ 写成 3·3^(n−1)，提取公因子 3^(n−1)e^(3x) 到括号外，写出最简结果并对照参考解答。",
      formula: math`y^{(n)}=3^{n-1}(3x+\;\text{?}\;)e^{3x}=\;?`,
    },
  ],

  "jc935-2-3-11": [
    {
      change: "写出 u=ln(1+2x) 的 m 阶导数",
      text: "令 u=ln(1+2x)、v=x²。先逐阶求导得 u′=2(1+2x)⁻¹、u″=−2²(1+2x)⁻²，由此归纳出 m≥1 时的 u⁽ᵐ⁾(x) 及其在 x=0 的值。",
      formula: math`\begin{gathered}
        u^{(m)}(x)=\frac{(-1)^{m-1}2^m(m-1)!}{(1+2x)^m}\\[4pt]
        u^{(m)}(0)=(-1)^{m-1}2^m(m-1)!
      \end{gathered}`,
    },
    {
      change: "在 x=0 处截断莱布尼茨展开",
      text: "对 v=x²，在 x=0 处有 v(0)=0、v′(0)=0、v″(0)=2，且 k≥3 时 v⁽ᵏ⁾≡0。因此当 n≥3 时，莱布尼茨展开中只有 k=2 一项非零。",
      formula: math`\begin{gathered}
        f^{(n)}(0)=\binom{n}{2}u^{(n-2)}(0)\cdot v''(0)\\[4pt]
        =\frac{n(n-1)}{2}\cdot u^{(n-2)}(0)\cdot 2
      \end{gathered}`,
    },
    {
      change: "代入 m=n−2 时的 u⁽ⁿ⁻²⁾(0)",
      text: "分子分母的 2 先约掉，再把 m=n−2 代入 u⁽ᵐ⁾(0) 的通式，注意 (−1)^(n−3)=(−1)^(n−1)。",
      formula: math`\begin{gathered}
        f^{(n)}(0)=n(n-1)\cdot (-1)^{n-3}\\[4pt]
        \cdot 2^{n-2}(n-3)!
      \end{gathered}`,
    },
    {
      change: "把 n(n−1)(n−3)! 改写成阶乘分式",
      text: "分子分母同乘 (n−2)，即可把 n(n−1)(n−2)(n−3)! 合成 n!，整理符号与分母写出最终答案并对照参考解答。",
      formula: math`\begin{gathered}
        n(n-1)(n-3)!=\frac{n!}{n-2}\\[4pt]
        f^{(n)}(0)=(-1)^{n-3}2^{n-2}\cdot\frac{n!}{n-2}\\[4pt]
        =\;?\quad (n\ge 3)
      \end{gathered}`,
    },
  ],

  "jc935-2-4-1-1": [
    {
      change: "方程两边同时对 x 求导",
      text: "把 y 看作 x 的函数：y² 对 x 求导得 2yy′；−4xy 必须用乘积法则得 −4y−4xy′；常数 5 的导数为 0。",
      formula: math`2yy'-4y-4xy'=0`,
    },
    {
      change: "把含 y′ 的项聚到左侧并移项",
      text: "将不含 y′ 的 −4y 移到等号右侧，左侧提取公因子 y′。",
      formula: math`(2y-4x)y'=4y`,
    },
    {
      change: "除以系数并约去公因数 2",
      text: "由已知 y≠2x，可知 2y−4x=2(y−2x)≠0，可以合法地两边同除以它并约去分子分母的 2，写出最终 dy/dx 并对照参考解答。",
      formula: math`\frac{dy}{dx}=\frac{4y}{2(y-2x)}=\;?`,
    },
  ],

  "jc935-2-4-1-2": [
    {
      change: "方程两边对 x 逐项求导",
      text: "b 为常数，y 是 x 的函数：x³ 导数为 3x²，y³ 导数为 3y²y′，−6bxy 用乘积法则得 −6by−6bxy′。",
      formula: math`3x^2+3y^2 y'-6by-6bxy'=0`,
    },
    {
      change: "两边同除以 3 并分离 y′",
      text: "各项系数都能被 3 整除，先整体除以 3 减小数字，再把含 y′ 的项留在左侧、其余移到右侧。",
      formula: math`\begin{gathered}
        x^2+y^2 y'-2by-2bxy'=0\\[4pt]
        (y^2-2bx)y'=2by-x^2
      \end{gathered}`,
    },
    {
      change: "由分母非零条件解出 dy/dx",
      text: "题目已知 y²≠2bx，两边同除以 (y²−2bx) 即可解出 dy/dx，请写出最终分式并与参考解答核对。",
      formula: math`\frac{dy}{dx}=\frac{2by-x^2}{\;\text{?}\;}=\;?`,
    },
  ],

  "jc935-2-4-1-3": [
    {
      change: "两边分别用乘积与链式法则求导",
      text: "左边 xy 用乘积法则得 y+xy′；右边 e^(2x+y) 是复合函数，求导得 e^(2x+y)·(2x+y)′=e^(2x+y)(2+y′)。",
      formula: math`y+xy'=e^{2x+y}(2+y')`,
    },
    {
      change: "展开右边并把 y′ 项移到左侧",
      text: "把右边展开成 2e^(2x+y)+e^(2x+y)y′，将含 y′ 的项全部移到左侧并提取公因子 y′，不含 y′ 的项移到右侧。",
      formula: math`\begin{gathered}
        y+xy'=2e^{2x+y}+e^{2x+y}y'\\[4pt]
        \bigl(x-e^{2x+y}\bigr)y'=2e^{2x+y}-y
      \end{gathered}`,
    },
    {
      change: "除以非零系数解出 dy/dx",
      text: "题目给定 x≠e^(2x+y)，两边同除以 x−e^(2x+y) 即可得到 dy/dx，请写出最终表达式并与参考解答核对。",
      formula: math`\frac{dy}{dx}=\frac{2e^{2x+y}-y}{\;\text{?}\;}=\;?`,
    },
  ],

  "jc935-2-4-1-4": [
    {
      change: "方程两边同时对 x 求导",
      text: "左边为 y′；右边常数 2 求导为 0，对 −xe^(2y) 用乘积法则与链式法则，注意 (e^(2y))′=2e^(2y)y′ 且前面整体带负号。",
      formula: math`\begin{gathered}
        y'=0-\bigl(1\cdot e^{2y}+x\cdot 2e^{2y}y'\bigr)\\[4pt]
        =-e^{2y}-2xe^{2y}y'
      \end{gathered}`,
    },
    {
      change: "移项合并含 y′ 的项",
      text: "把 −2xe^(2y)y′ 移到等号左侧，提取公因子 y′。",
      formula: math`\bigl(1+2xe^{2y}\bigr)y'=-e^{2y}`,
    },
    {
      change: "两边同除系数解出 dy/dx",
      text: "已知 1+2xe^(2y)≠0，两边同除以它即可解出 dy/dx（留意负号），写出结果并对照参考解答。",
      formula: math`\frac{dy}{dx}=\frac{-e^{2y}}{\;\text{?}\;}=\;?`,
    },
  ],

  "jc935-2-4-2": [
    {
      change: "隐函数求导写出 y′ 表达式",
      text: "b>0 为常数，故右端 5b^(2/3) 的导数为 0。两边对 x 求导，约去 2/3 并解出 y′。",
      formula: math`\begin{gathered}
        \frac{2}{3}x^{-1/3}+\frac{2}{3}y^{-1/3}y'=0\\[4pt]
        y'=-\frac{x^{-1/3}}{y^{-1/3}}=-\left(\frac{y}{x}\right)^{1/3}
      \end{gathered}`,
    },
    {
      change: "代入切点 (8b, b) 算切线斜率",
      text: "把 x=8b、y=b 代入 y′，b>0 上下约去，算出切点处的切线斜率 k。",
      formula: math`k=\left.y'\right|_{(8b,b)}=-\left(\frac{b}{8b}\right)^{1/3}=-\frac{1}{2}`,
    },
    {
      change: "由切线斜率确定法线斜率",
      text: "法线与切线垂直，因为 k=−1/2≠0，所以法线斜率是切线斜率的负倒数 k_n=−1/k=2。",
      formula: math`k_{\text{切}}=-\frac{1}{2},\quad k_{\text{法}}=-\frac{1}{k_{\text{切}}}=2`,
    },
    {
      change: "用点斜式写出切线与法线方程",
      text: "把切点 (8b, b) 与两个斜率分别代入点斜式 y−y₀=m(x−x₀)，再化简为一般式 Ax+By+C=0 并对照参考解答。",
      formula: math`\begin{gathered}
        \text{切线：}y-b=-\frac{1}{2}(x-8b)\implies\;?\\[4pt]
        \text{法线：}y-b=2(x-8b)\implies\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-4-3": [
    {
      change: "隐函数求导并因式分解分子分母",
      text: "对 x²y+xy²=16 两边对 x 求导，分别整理不含 y′ 与含 y′ 的项，再解出 y′ 并提取公因式，方便判断零点。",
      formula: math`\begin{gathered}
        (2xy+y^2)+(x^2+2xy)y'=0\\[4pt]
        y'=-\frac{y(2x+y)}{x(x+2y)}
      \end{gathered}`,
    },
    {
      change: "求水平切线：令分子为 0 并回代原方程",
      text: "水平切线要求 y′=0（分子为 0 且分母非 0）。y=0 代入原方程得 0=16 不成立，故只能 y=−2x。代入原方程解出 x 与 y，再验算分母非零。",
      formula: math`\begin{gathered}
        y=-2x\implies x^2(-2x)+x(4x^2)=16\\[4pt]
        2x^3=16\implies x=2,\;y=-4
      \end{gathered}`,
    },
    {
      change: "求铅直切线：令分母为 0 并回代原方程",
      text: "铅直切线要求 dx/dy=0（即 y′ 的分母为 0 且分子非 0）。x=0 不满足原方程，故只能 x=−2y。代入原方程解出 y 与 x，并验算分子非零。",
      formula: math`\begin{gathered}
        x=-2y\implies (-2y)^2y+(-2y)y^2=16\\[4pt]
        2y^3=16\implies y=\;?,\;x=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-4-4-1": [
    {
      change: "两边对 x 求导解出一阶导 y′",
      text: "p、q 为正常数，右端 p²q² 导数为 0。两边对 x 求导得 2q²yy′−2p²x=0，因 y≠0 可解出 y′。",
      formula: math`\begin{gathered}
        2q^2 yy'-2p^2 x=0\\[4pt]
        y'=\frac{p^2 x}{q^2 y}
      \end{gathered}`,
    },
    {
      change: "对 y′ 用商法则求二阶导数",
      text: "把常数因子 p²/q² 提在外面，对 x/y 关于 x 用商法则，别忘了 y 对 x 求导会出 y′。",
      formula: math`\frac{d^2 y}{dx^2}=\frac{p^2}{q^2}\cdot\frac{1\cdot y-x\cdot y'}{y^2}`,
    },
    {
      change: "把 y′ 代入分子并通分",
      text: "将第一步的 y′=p²x/(q²y) 代入分子，分子分母同乘 q²y，让分子出现 q²y²−p²x²。",
      formula: math`\begin{gathered}
        \frac{d^2 y}{dx^2}=\frac{p^2}{q^2}\cdot\frac{y-x\cdot\frac{p^2 x}{q^2 y}}{y^2}\\[4pt]
        =\frac{p^2(q^2 y^2-p^2 x^2)}{q^4 y^3}
      \end{gathered}`,
    },
    {
      change: "代回原方程彻底消去 x",
      text: "原方程直接给出 q²y²−p²x²=p²q²。把它代进分子并约去 q²，即可得到极简结果，最后对照参考解答。",
      formula: math`\frac{d^2 y}{dx^2}=\frac{p^2\cdot p^2 q^2}{q^4 y^3}=\;?`,
    },
  ],

  "jc935-2-4-4-2": [
    {
      change: "求导并用 sec²=1+tan² 消去三角函数",
      text: "对 y=tan(x−y) 两边求导得 y′=sec²(x−y)(1−y′)。利用恒等式 sec²(x−y)=1+tan²(x−y)=1+y²，立刻把三角式变成纯 y 的多项式。",
      formula: math`\begin{gathered}
        y'=\sec^2(x-y)(1-y')\\[4pt]
        =(1+y^2)(1-y')
      \end{gathered}`,
    },
    {
      change: "解出 y′ 并拆成最易再求导的形式",
      text: "展开移项得 (2+y²)y′=1+y²，因 2+y²>0 可解出 y′，再分离常数写成 1−1/(2+y²)，第二次求导就省去了商法则。",
      formula: math`\begin{gathered}
        (2+y^2)y'=1+y^2\\[4pt]
        y'=\frac{1+y^2}{2+y^2}=1-\frac{1}{2+y^2}
      \end{gathered}`,
    },
    {
      change: "对 y′ 再次关于 x 求导",
      text: "常数 1 导数为 0；对 −(2+y²)⁻¹ 关于 x 求导，外层负负得正，再乘内层 (2+y²)′=2yy′。",
      formula: math`\frac{d^2 y}{dx^2}=\frac{2yy'}{(2+y^2)^2}`,
    },
    {
      change: "回代 y′=(1+y²)/(2+y²) 并整理",
      text: "把 y′ 的表达式代入上式，合并分母为 (2+y²)³，写出只含 y 的最终结果并对照参考解答。",
      formula: math`\frac{d^2 y}{dx^2}=\frac{2y}{(2+y^2)^2}\cdot\frac{1+y^2}{2+y^2}=\;?`,
    },
  ],

  "jc935-2-4-4-3": [
    {
      change: "两边求导解出一阶导数 y′",
      text: "对 y=2−xe^y 两边对 x 求导，移项合并 y′，利用 1+xe^y≠0 解出 y′。",
      formula: math`\begin{gathered}
        y'=-e^y-xe^y y'\\[4pt]
        y'=-\frac{e^y}{1+xe^y}
      \end{gathered}`,
    },
    {
      change: "对 y′ 套用商法则并化简分子",
      text: "保留最前面的负号，对 e^y/(1+xe^y) 用商法则。注意分母 (1+xe^y) 对 x 的导数是 e^y+xe^y y′，展开后两项 ±xe^(2y)y′ 恰好抵消。",
      formula: math`\begin{gathered}
        y''=-\frac{e^y y'(1+xe^y)-e^y(e^y+xe^y y')}{(1+xe^y)^2}\\[4pt]
        =\frac{e^{2y}-e^y y'}{(1+xe^y)^2}
      \end{gathered}`,
    },
    {
      change: "把 y′ 代入分子并通分",
      text: "将 y′=−e^y/(1+xe^y) 代入分子中的 −e^y y′，负负得正变成 +e^(2y)/(1+xe^y)，再整体通分到 (1+xe^y)³。",
      formula: math`\begin{gathered}
        y''=\frac{e^{2y}+\frac{e^{2y}}{1+xe^y}}{(1+xe^y)^2}\\[4pt]
        =\frac{e^{2y}\bigl[(1+xe^y)+1\bigr]}{(1+xe^y)^3}=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-4-4-4": [
    {
      change: "两边求导整理出整式关系",
      text: "在 x+y>0 上两边对 x 求导，右端用乘积法则，注意 (x+y)·(1+y′)/(x+y)=1+y′。把含 y′ 的项移到左侧。",
      formula: math`\begin{gathered}
        2y'-1=(1+y')\ln(x+y)+(1+y')\\[4pt]
        y'\bigl[1-\ln(x+y)\bigr]=\ln(x+y)+2
      \end{gathered}`,
    },
    {
      change: "先算出简洁的 1+y′ 备用",
      text: "由 ln(x+y)≠1 解出 y′，顺手算出 1+y′，分子中的 ln(x+y) 正负抵消，只剩常数 3，后面代入非常爽快。",
      formula: math`\begin{gathered}
        y'=\frac{\ln(x+y)+2}{1-\ln(x+y)}\\[4pt]
        1+y'=\frac{3}{1-\ln(x+y)}
      \end{gathered}`,
    },
    {
      change: "直接对一阶整式两边再求导",
      text: "不要对分式 y′ 硬用商法则，直接对 y′[1−ln(x+y)]=ln(x+y)+2 两边再对 x 求导，把右移项合并。",
      formula: math`\begin{gathered}
        y''\bigl[1-\ln(x+y)\bigr]-y'\cdot\frac{1+y'}{x+y}=\frac{1+y'}{x+y}\\[4pt]
        y''\bigl[1-\ln(x+y)\bigr]=\frac{(1+y')^2}{x+y}
      \end{gathered}`,
    },
    {
      change: "代入 1+y′ 并解出二阶导数",
      text: "把第二步的 1+y′=3/[1−ln(x+y)] 代入上式，两边同除以 1−ln(x+y)，整理出最终结果并对照参考解答。",
      formula: math`\begin{gathered}
        y''=\frac{1}{(x+y)\bigl[1-\ln(x+y)\bigr]}\\[4pt]
        \cdot\left(\frac{3}{1-\ln(x+y)}\right)^2=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-4-5-1": [
    {
      change: "两边取自然对数把指数拉下来",
      text: "因为 x>0，底数 x/(x+2)>0，从而 y>0。两边取 ln，把幂指函数的指数 x 拉到前面，并把商的对数拆成对数之差。",
      formula: math`\begin{gathered}
        \ln y=x\ln\frac{x}{x+2}\\[4pt]
        =x\bigl[\ln x-\ln(x+2)\bigr]
      \end{gathered}`,
    },
    {
      change: "两边对 x 求导（乘积法则）",
      text: "左边 (ln y)′=y′/y；右边对 x 与 [ln x−ln(x+2)] 用乘积法则。",
      formula: math`\begin{gathered}
        \frac{y'}{y}=\ln\frac{x}{x+2}\\[4pt]
        +x\left(\frac{1}{x}-\frac{1}{x+2}\right)
      \end{gathered}`,
    },
    {
      change: "化简括号内的分式差",
      text: "把 x 乘进括号得 1−x/(x+2)，通分后化简为 2/(x+2)。",
      formula: math`\begin{gathered}
        x\left(\frac{1}{x}-\frac{1}{x+2}\right)=1-\frac{x}{x+2}=\frac{2}{x+2}\\[4pt]
        \frac{y'}{y}=\ln\frac{x}{x+2}+\frac{2}{x+2}
      \end{gathered}`,
    },
    {
      change: "两边同乘回原函数 y",
      text: "别忘了把分母上的 y 乘回等式右端，并换回原表达式 (x/(x+2))ˣ，写出最终 y′ 并对照参考解答。",
      formula: math`\begin{gathered}
        y'=y\left(\ln\frac{x}{x+2}+\frac{2}{x+2}\right)\\[4pt]
        =\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-4-5-2": [
    {
      change: "把嵌套根式改写为分数指数再取对数",
      text: "当 x>2 时分子分母均正，故 y>0。外层三次根号是指数 1/3，内层四次根号再套在里面是指数 (1/3)·(1/4)=1/12。",
      formula: math`\begin{gathered}
        y=(x-2)^{1/3}(x^2+3)^{-1/12}\\[4pt]
        \ln y=\frac{1}{3}\ln(x-2)-\frac{1}{12}\ln(x^2+3)
      \end{gathered}`,
    },
    {
      change: "两边对 x 逐项求导",
      text: "左边得 y′/y；右边第二项对 ln(x²+3) 求导得 2x/(x²+3)，注意 2/12 可以约分为 1/6。",
      formula: math`\begin{gathered}
        \frac{y'}{y}=\frac{1}{3(x-2)}-\frac{1}{12}\cdot\frac{2x}{x^2+3}\\[4pt]
        =\frac{1}{3(x-2)}-\frac{x}{6(x^2+3)}
      \end{gathered}`,
    },
    {
      change: "两边同乘回原函数 y",
      text: "将原根式 y 乘到等式右端，写出最终的 y′ 表达式并与参考解答核对。",
      formula: math`\begin{gathered}
        y'=y\left[\frac{1}{3(x-2)}-\frac{x}{6(x^2+3)}\right]\\[4pt]
        =\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-4-5-3": [
    {
      change: "两边取对数把乘除幂拆成加减",
      text: "在 −2<x<4 上，x+3、4−x、x+2 全部严格大于 0，因此 y>0。两边取 ln，分子因子带正号、分母因子带负号。",
      formula: math`\begin{gathered}
        \ln y=\frac{1}{2}\ln(x+3)\\[4pt]
        +3\ln(4-x)-4\ln(x+2)
      \end{gathered}`,
    },
    {
      change: "两边对 x 逐项求导",
      text: "左边为 y′/y；右边逐项求导时特别留意第二项：(ln(4−x))′=−1/(4−x)，内层 −x 会把正号翻成负号。",
      formula: math`\begin{gathered}
        \frac{y'}{y}=\frac{1}{2(x+3)}\\[4pt]
        +3\cdot\frac{-1}{4-x}-\frac{4}{x+2}
      \end{gathered}`,
    },
    {
      change: "整理符号并乘回原函数 y",
      text: "把第二项写成 −3/(4−x)，再把原分式 y 乘到等式右端，写出最终导数并对照参考解答。",
      formula: math`\begin{gathered}
        y'=y\left[\frac{1}{2(x+3)}-\frac{3}{4-x}-\frac{4}{x+2}\right]\\[4pt]
        =\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-4-5-4": [
    {
      change: "逐层剥开根号取自然对数",
      text: "在 0<x<π/2 上，x、cos x、1+e^(2x) 均严格为正，故 y>0。外层平方根给所有因子乘 1/2，内层平方根再乘 1/2 变成 1/4。",
      formula: math`\begin{gathered}
        \ln y=\frac{1}{2}\ln x+\frac{1}{2}\ln(\cos x)\\[4pt]
        +\frac{1}{4}\ln(1+e^{2x})
      \end{gathered}`,
    },
    {
      change: "两边对 x 逐项求导",
      text: "分别求导：(ln cos x)′=−sin x/cos x=−tan x；(ln(1+e^(2x)))′=2e^(2x)/(1+e^(2x))，别漏乘内层因子 2。",
      formula: math`\begin{gathered}
        \frac{y'}{y}=\frac{1}{2x}-\frac{1}{2}\tan x\\[4pt]
        +\frac{1}{4}\cdot\frac{2e^{2x}}{1+e^{2x}}
      \end{gathered}`,
    },
    {
      change: "提取公因子 1/2 并乘回原函数 y",
      text: "第三项 2/4 约成 1/2 后，三项都有公因子 1/2。把它提出来再乘回原根式 y，写出最终 y′ 并对照参考解答。",
      formula: math`\begin{gathered}
        y'=\frac{1}{2}y\left(\frac{1}{x}-\tan x+\frac{e^{2x}}{1+e^{2x}}\right)\\[4pt]
        =\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-4-6-1": [
    {
      change: "分别求 x 和 y 对参数 t 的导数",
      text: "p、q 为常数，分别对 x=pt³ 和 y=qt⁴ 关于 t 求导。",
      formula: math`\frac{dx}{dt}=3pt^2,\quad \frac{dy}{dt}=4qt^3`,
    },
    {
      change: "套用参数方程一阶求导公式",
      text: "由 p≠0 且 t≠0 可知 dx/dt=3pt²≠0，按 dy/dx=(dy/dt)/(dx/dt) 写出分式，注意 dy/dt 在分子。",
      formula: math`\frac{dy}{dx}=\frac{4qt^3}{3pt^2}`,
    },
    {
      change: "约去分子分母的公因子 t²",
      text: "因 t≠0，约去公因子 t² 即可得到最简的一阶导数，写出结果并对照参考解答。",
      formula: math`\frac{dy}{dx}=\frac{4q}{3p}\cdot\frac{t^3}{t^2}=\;?`,
    },
  ],

  "jc935-2-4-6-2": [
    {
      change: "用乘积法则求 dx/dθ",
      text: "把 x=θ(1+cos θ) 看作 θ 与 (1+cos θ) 的乘积对 θ 求导，注意 (cos θ)′=−sin θ。",
      formula: math`\begin{gathered}
        \frac{dx}{d\theta}=1\cdot(1+\cos\theta)+\theta(-\sin\theta)\\[4pt]
        =1+\cos\theta-\theta\sin\theta
      \end{gathered}`,
    },
    {
      change: "用乘积法则求 dy/dθ",
      text: "对 y=θsin θ 同样用乘积法则关于 θ 求导。",
      formula: math`\frac{dy}{d\theta}=\sin\theta+\theta\cos\theta`,
    },
    {
      change: "两式作商写出 dy/dx",
      text: "题目已知分母 1+cos θ−θsin θ≠0，按 dy/dx=(dy/dθ)/(dx/dθ) 写出最终分式并与参考解答核对。",
      formula: math`\frac{dy}{dx}=\frac{dy/d\theta}{dx/d\theta}=\;?`,
    },
  ],

  "jc935-2-4-7": [
    {
      change: "用乘积法则分别求 dx/dt 与 dy/dt",
      text: "注意 (e^(2t))′=2e^(2t)，分别对 x 和 y 求导并把公因子 e^(2t) 提取出来。",
      formula: math`\begin{gathered}
        \frac{dx}{dt}=e^{2t}(2\cos t-\sin t)\\[4pt]
        \frac{dy}{dt}=e^{2t}(2\sin t+\cos t)
      \end{gathered}`,
    },
    {
      change: "作商并约去恒正因子 e^(2t)",
      text: "因为 e^(2t)>0 恒成立，在 dy/dx=(dy/dt)/(dx/dt) 中直接约去 e^(2t)。",
      formula: math`\frac{dy}{dx}=\frac{2\sin t+\cos t}{2\cos t-\sin t}`,
    },
    {
      change: "代入 t=π/4 计算数值",
      text: "当 t=π/4 时，sin(π/4)=cos(π/4)=√2/2≠0，分子分母同除以 √2/2 后立刻化为整数比值，算出结果并对照参考解答。",
      formula: math`\left.\frac{dy}{dx}\right|_{t=\frac{\pi}{4}}=\frac{2\cdot\frac{\sqrt{2}}{2}+\frac{\sqrt{2}}{2}}{2\cdot\frac{\sqrt{2}}{2}-\frac{\sqrt{2}}{2}}=\;?`,
    },
  ],

  "jc935-2-4-8-1": [
    {
      change: "代入 t=π/6 求出切点坐标",
      text: "先确定曲线上对应的切点 (x₀, y₀)，不要把参数值 π/6 直接当作横坐标。",
      formula: math`\begin{gathered}
        x_0=2\cos\frac{\pi}{6}=\sqrt{3}\\[4pt]
        y_0=2\sin\frac{\pi}{3}=\sqrt{3}
      \end{gathered}`,
    },
    {
      change: "求参数导数并代入 t=π/6 得斜率",
      text: "分别求 dx/dt=−2sin t 和 dy/dt=4cos 2t（别漏乘内层系数 2），作商后代入 t=π/6 算出切线斜率 k。",
      formula: math`\begin{gathered}
        \frac{dy}{dx}=\frac{4\cos 2t}{-2\sin t}=-\frac{2\cos 2t}{\sin t}\\[4pt]
        k=\left.\frac{dy}{dx}\right|_{t=\frac{\pi}{6}}=-\frac{2\cdot\frac{1}{2}}{\frac{1}{2}}=-2
      \end{gathered}`,
    },
    {
      change: "用点斜式写出切线与法线方程",
      text: "切线斜率为 k=−2，法线斜率为 −1/k=1/2。把切点 (√3, √3) 分别代入点斜式并化为一般式，再对照参考解答。",
      formula: math`\begin{gathered}
        \text{切线：}y-\sqrt{3}=-2(x-\sqrt{3})\implies\;?\\[4pt]
        \text{法线：}y-\sqrt{3}=\frac{1}{2}(x-\sqrt{3})\implies\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-4-8-2": [
    {
      change: "代入 t=2 求出切点坐标",
      text: "先算分母 1+2³=9，它刚好把分子里的常数 9 约掉，得到简洁的切点坐标。",
      formula: math`\begin{gathered}
        x_0=\frac{9b\cdot 2}{1+2^3}=2b\\[4pt]
        y_0=\frac{9b\cdot 2^2}{1+2^3}=4b
      \end{gathered}`,
    },
    {
      change: "用商法则求 dx/dt 与 dy/dt",
      text: "把常数 9b 提在外面对 t/(1+t³) 和 t²/(1+t³) 分别用商法则求导。",
      formula: math`\begin{gathered}
        \frac{dx}{dt}=9b\cdot\frac{(1+t^3)-t\cdot 3t^2}{(1+t^3)^2}=\frac{9b(1-2t^3)}{(1+t^3)^2}\\[4pt]
        \frac{dy}{dt}=9b\cdot\frac{2t(1+t^3)-t^2\cdot 3t^2}{(1+t^3)^2}=\frac{9b(2t-t^4)}{(1+t^3)^2}
      \end{gathered}`,
    },
    {
      change: "约去公共因子并代入 t=2 算斜率",
      text: "因为 b≠0 且 1+t³≠0，作商时 9b/(1+t³)² 整块约掉，再代入 t=2 算出切线斜率 k。",
      formula: math`\begin{gathered}
        \frac{dy}{dx}=\frac{2t-t^4}{1-2t^3}\\[4pt]
        k=\frac{4-16}{1-16}=\frac{-12}{-15}=\frac{4}{5}
      \end{gathered}`,
    },
    {
      change: "用点斜式写出切线与法线方程",
      text: "切线斜率 k=4/5，法线斜率 −1/k=−5/4。把切点 (2b, 4b) 代入点斜式并整理为一般式，再对照参考解答。",
      formula: math`\begin{gathered}
        \text{切线：}y-4b=\frac{4}{5}(x-2b)\implies\;?\\[4pt]
        \text{法线：}y-4b=-\frac{5}{4}(x-2b)\implies\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-4-9-1": [
    {
      change: "先求一阶导数 dy/dx",
      text: "分别求 dx/dt=2t/3、dy/dt=2。在 t≠0 处作商并化简繁分式，得到简洁的一阶导数 3/t。",
      formula: math`\begin{gathered}
        \frac{dx}{dt}=\frac{2t}{3},\quad \frac{dy}{dt}=2\\[4pt]
        \frac{dy}{dx}=\frac{2}{2t/3}=\frac{3}{t}
      \end{gathered}`,
    },
    {
      change: "把 dy/dx 再对参数 t 求导",
      text: "将一阶导数 3/t=3t⁻¹ 关于 t 求导，得到 −3/t²。注意这还不是最终二阶导，只是二阶导公式的分子。",
      formula: math`\frac{d}{dt}\!\left(\frac{dy}{dx}\right)=\frac{d}{dt}(3t^{-1})=-\frac{3}{t^2}`,
    },
    {
      change: "除以 dx/dt 换算成对 x 的二阶导",
      text: "由参数方程二阶导公式，把刚才的结果再除以 dx/dt=2t/3，整理分数即得 d²y/dx²，最后对照参考解答。",
      formula: math`\frac{d^2 y}{dx^2}=\frac{-3/t^2}{2t/3}=\;?`,
    },
  ],

  "jc935-2-4-9-2": [
    {
      change: "求一阶导数并化简为正切",
      text: "分别求 dx/dt=p cos t、dy/dt=−q sin t。在 p≠0 且 cos t≠0 时作商，把 sin t/cos t 简写为 tan t。",
      formula: math`\begin{gathered}
        \frac{dx}{dt}=p\cos t,\quad \frac{dy}{dt}=-q\sin t\\[4pt]
        \frac{dy}{dx}=-\frac{q\sin t}{p\cos t}=-\frac{q}{p}\tan t
      \end{gathered}`,
    },
    {
      change: "对一阶导数关于 t 求导",
      text: "记住 (tan t)′=sec²t=1/cos²t，先把 dy/dx 对 t 求导。",
      formula: math`\frac{d}{dt}\!\left(-\frac{q}{p}\tan t\right)=-\frac{q}{p}\sec^2 t=-\frac{q}{p\cos^2 t}`,
    },
    {
      change: "再除以 dx/dt=p cos t 得到二阶导",
      text: "把上面结果除以 dx/dt=p cos t，把分母中的 p 与 cos t 分别合并幂次，写出最终 d²y/dx² 并对照参考解答。",
      formula: math`\frac{d^2 y}{dx^2}=\frac{-q/(p\cos^2 t)}{p\cos t}=\;?`,
    },
  ],

  "jc935-2-4-9-3": [
    {
      change: "求一阶导数并合并指数",
      text: "分别求 dx/dt=4e^(2t)（别漏乘 2）和 dy/dt=−5e^(−t)，作商时指数相减 (−t)−2t=−3t。",
      formula: math`\begin{gathered}
        \frac{dx}{dt}=4e^{2t},\quad \frac{dy}{dt}=-5e^{-t}\\[4pt]
        \frac{dy}{dx}=\frac{-5e^{-t}}{4e^{2t}}=-\frac{5}{4}e^{-3t}
      \end{gathered}`,
    },
    {
      change: "将 dy/dx 关于 t 再求一次导",
      text: "对 −(5/4)e^(−3t) 关于 t 求导，乘出内层系数 −3，负负得正。",
      formula: math`\frac{d}{dt}\!\left(-\frac{5}{4}e^{-3t}\right)=\frac{15}{4}e^{-3t}`,
    },
    {
      change: "除以 dx/dt=4e^(2t) 并合并指数",
      text: "把结果再除以 dx/dt=4e^(2t)，系数分母乘 4，指数再减 2t（−3t−2t=−5t），写出最终 d²y/dx² 并对照参考解答。",
      formula: math`\frac{d^2 y}{dx^2}=\frac{\frac{15}{4}e^{-3t}}{4e^{2t}}=\;?`,
    },
  ],

  "jc935-2-4-9-4": [
    {
      change: "分别求 dx/dt 与 dy/dt",
      text: "对 x=3g′(t) 求导得 3g″(t)；对 y=2tg′(t)−2g(t)+1 求导时，第一项用乘积法则，注意 2g′(t) 与 −2g′(t) 恰好抵消。",
      formula: math`\begin{gathered}
        \frac{dx}{dt}=3g''(t)\\[4pt]
        \frac{dy}{dt}=2g'(t)+2tg''(t)-2g'(t)=2tg''(t)
      \end{gathered}`,
    },
    {
      change: "约去非零因子 g″(t) 得一阶导",
      text: "题目已知 g″(t)≠0，作商后公因子 g″(t) 直接约掉，一阶导数化成了极其简单的 2t/3。",
      formula: math`\frac{dy}{dx}=\frac{2tg''(t)}{3g''(t)}=\frac{2}{3}t`,
    },
    {
      change: "对 t 求导后再除以 dx/dt 得二阶导",
      text: "对 2t/3 关于 t 求导得常数 2/3，再除以 dx/dt=3g″(t)，整理分母写出最终 d²y/dx² 并对照参考解答。",
      formula: math`\frac{d^2 y}{dx^2}=\frac{d/dt(2t/3)}{3g''(t)}=\frac{2/3}{3g''(t)}=\;?`,
    },
  ],

  "jc935-2-4-10-1": [
    {
      change: "求一阶导数并拆成幂函数之和",
      text: "由 dx/dt=2t、dy/dt=3t²+3，在 t≠0 处作商并把分子逐项除以 2t，拆成幂函数方便连续求导。",
      formula: math`\begin{gathered}
        \frac{dx}{dt}=2t,\quad \frac{dy}{dt}=3t^2+3\\[4pt]
        \frac{dy}{dx}=\frac{3t^2+3}{2t}=\frac{3}{2}t+\frac{3}{2}t^{-1}
      \end{gathered}`,
    },
    {
      change: "求二阶导数并继续拆成幂函数",
      text: "把 dy/dx 对 t 求导得 3/2−(3/2)t⁻²，再除以 dx/dt=2t，同样拆开写成负幂之和。",
      formula: math`\begin{gathered}
        \frac{d^2 y}{dx^2}=\frac{\frac{3}{2}-\frac{3}{2}t^{-2}}{2t}\\[4pt]
        =\frac{3}{4}t^{-1}-\frac{3}{4}t^{-3}
      \end{gathered}`,
    },
    {
      change: "对二阶导求导并再除以 2t 得三阶导",
      text: "对 (3/4)(t⁻¹−t⁻³) 关于 t 求导（注意 −t⁻³ 求导得 +3t⁻⁴），再除以 dx/dt=2t。",
      formula: math`\frac{d^3 y}{dx^3}=\frac{-\frac{3}{4}t^{-2}+\frac{9}{4}t^{-4}}{2t}`,
    },
    {
      change: "通分并提取分子公因式",
      text: "把分子写成 (−3t²+9)/(4t⁴) 再除以 2t，提取公因数 3 写出最简分式并与参考解答核对。",
      formula: math`\frac{d^3 y}{dx^3}=\frac{9-3t^2}{8t^5}=\;?`,
    },
  ],

  "jc935-2-4-10-2": [
    {
      change: "求 dx/dt、dy/dt 并化简一阶导",
      text: "注意 (2arctan(t/2))′=2·(1/2)/(1+t²/4)=4/(4+t²)。通分后分子为 t²，作商时公因子 4+t² 约去，一阶导仅剩 t/2。",
      formula: math`\begin{gathered}
        \frac{dx}{dt}=\frac{2t}{4+t^2},\quad \frac{dy}{dt}=1-\frac{4}{4+t^2}=\frac{t^2}{4+t^2}\\[4pt]
        \frac{dy}{dx}=\frac{t^2/(4+t^2)}{2t/(4+t^2)}=\frac{t}{2}
      \end{gathered}`,
    },
    {
      change: "求二阶导数并拆成两项",
      text: "对 t/2 关于 t 求导得 1/2，再除以 dx/dt=2t/(4+t²)（即乘以倒数 (4+t²)/(2t)），拆开写成 t⁻¹+t/4。",
      formula: math`\begin{gathered}
        \frac{d^2 y}{dx^2}=\frac{1/2}{2t/(4+t^2)}=\frac{4+t^2}{4t}\\[4pt]
        =t^{-1}+\frac{1}{4}t
      \end{gathered}`,
    },
    {
      change: "再对 t 求导并除以 dx/dt 得三阶导",
      text: "对 t⁻¹+t/4 关于 t 求导得 −t⁻²+1/4=(t²−4)/(4t²)，再乘以 dx/dt 的倒数 (4+t²)/(2t)。",
      formula: math`\begin{gathered}
        \frac{d^3 y}{dx^3}=\left(-\frac{1}{t^2}+\frac{1}{4}\right)\cdot\frac{4+t^2}{2t}\\[4pt]
        =\frac{t^2-4}{4t^2}\cdot\frac{t^2+4}{2t}
      \end{gathered}`,
    },
    {
      change: "用平方差公式合并分子",
      text: "分子 (t²−4)(t²+4) 按平方差公式展开，分母乘出 8t³，写出最终三阶导并与参考解答核对。",
      formula: math`\frac{d^3 y}{dx^3}=\frac{(t^2-4)(t^2+4)}{8t^3}=\;?`,
    },
  ],

  "jc935-2-4-11": [
    {
      change: "对面积公式 S=πr² 两边对 t 求导",
      text: "半径 r(t) 与面积 S(t) 都是时间 t 的函数。对 S=πr² 两边关于 t 用链式法则求导，把面积变化率与半径变化率联系起来。",
      formula: math`\frac{dS}{dt}=2\pi r\cdot\frac{dr}{dt}`,
    },
    {
      change: "算出 t=3 s 时刻的瞬时半径 r",
      text: "半径从 r(0)=0 开始以恒定速率 dr/dt=4 cm/s 增大，因此 t=3 s 时半径 r(3)=4×3=12 cm。",
      formula: math`r(3)=0+4\times 3=12\ \mathrm{cm}`,
    },
    {
      change: "代入 r 与 dr/dt 算出面积速率",
      text: "把 r=12 cm 与 dr/dt=4 cm/s 代入第一步的关系式，算出结果并注明单位 cm²/s，再对照参考解答。",
      formula: math`\left.\frac{dS}{dt}\right|_{t=3}=2\pi\cdot 12\cdot 4=\;?`,
    },
  ],

  "jc935-2-4-12": [
    {
      change: "用相似三角形把半径 r 换成水深 h",
      text: "注意上口直径 6 m 对应的半径是 R=3 m（不要直接用直径）。由轴截面相似三角形得 r/R=h/H，从而用 h 表示水面半径 r。",
      formula: math`\frac{r}{3}=\frac{h}{12}\implies r=\frac{h}{4}`,
    },
    {
      change: "写出只含水深 h 的体积公式",
      text: "把 r=h/4 代入圆锥体积公式 V=(1/3)πr²h，先化简系数，暂时不要代入 h=4。",
      formula: math`V=\frac{1}{3}\pi\left(\frac{h}{4}\right)^2 h=\frac{\pi}{48}h^3`,
    },
    {
      change: "对时间 t 求导并解出 dh/dt",
      text: "两边同时对 t 求导，别忘了右端要乘链式因子 dh/dt，再把 dh/dt 单独解出来。",
      formula: math`\begin{gathered}
        \frac{dV}{dt}=\frac{\pi}{48}\cdot 3h^2\frac{dh}{dt}=\frac{\pi}{16}h^2\frac{dh}{dt}\\[4pt]
        \frac{dh}{dt}=\frac{16}{\pi h^2}\cdot\frac{dV}{dt}
      \end{gathered}`,
    },
    {
      change: "代入 h=4 与 dV/dt=3 求最终速率",
      text: "把瞬时水深 h=4 m 与注水速率 3 m³/min 代入上式，约去 16 并写明单位 m/min，再对照参考解答。",
      formula: math`\left.\frac{dh}{dt}\right|_{h=4}=\frac{16}{\pi\cdot 4^2}\cdot 3=\;?`,
    },
  ],

  "jc935-2-4-13": [
    {
      change: "用相似三角形写出漏斗剩余体积",
      text: "漏斗上口直径 10 cm，故半径为 5 cm，高 15 cm。由相似三角形得液面半径 r=5H/15=H/3，写出漏斗内剩余液体体积。",
      formula: math`\begin{gathered}
        \frac{r}{5}=\frac{H}{15}\implies r=\frac{H}{3}\\[4pt]
        V_{\text{漏}}=\frac{1}{3}\pi\left(\frac{H}{3}\right)^2 H=\frac{\pi}{27}H^3
      \end{gathered}`,
    },
    {
      change: "由总体积守恒建立 H 与 h 的方程",
      text: "量筒底面直径 8 cm，故半径为 4 cm，底面积为 16π。液体总量 V₀ 守恒：漏斗剩余体积加量筒内体积等于常数 V₀。",
      formula: math`V_0-\frac{\pi}{27}H^3=16\pi h`,
    },
    {
      change: "两边对时间 t 求导并解出 dh/dt",
      text: "常数 V₀ 求导为 0，两边同时对 t 求导并约去 π，解出 dh/dt 关于 H 和 dH/dt 的表达式。",
      formula: math`\begin{gathered}
        -\frac{\pi}{9}H^2\frac{dH}{dt}=16\pi\frac{dh}{dt}\\[4pt]
        \frac{dh}{dt}=-\frac{H^2}{144}\frac{dH}{dt}
      \end{gathered}`,
    },
    {
      change: "代入 H=9 与 dH/dt=−2 计算速率",
      text: "液面下降意味着 dH/dt=−2 cm/min（带负号！）。把 H=9 与 dH/dt=−2 代入并约分，注明单位 cm/min，再对照参考解答。",
      formula: math`\left.\frac{dh}{dt}\right|_{H=9}=-\frac{9^2}{144}\cdot(-2)=\;?`,
    },
  ],
};

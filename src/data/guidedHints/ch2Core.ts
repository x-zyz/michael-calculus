import type { GuidedHint } from "../learning";

const math = String.raw;

export const ch2CoreGuidedHints: Record<string, GuidedHint[]> = {
  p11: [
    {
      change: "展开分子里的完全平方",
      text: "先用完全平方公式把 (3+h)² 展开为 9+6h+h²，其余部分和极限号先原样保留。",
      formula: math`\lim_{h\to0}\frac{9+6h+h^2-9}{h}`,
    },
    {
      change: "抵消分子里的 9 与 −9",
      text: "分子中的常数项 9 和 −9 相加等于 0，化简后只剩下都含 h 的两项。",
      formula: math`\lim_{h\to0}\frac{6h+h^2}{h}`,
    },
    {
      change: "提取并约去公因式 h",
      text: "求极限时 h 只是靠近 0 而不等于 0，因此 h ≠ 0，可以把分子的 6h+h² 写成 h(6+h) 再与分母的 h 约掉。",
      formula: math`\begin{gathered}
        \lim_{h\to0}\frac{h(6+h)}{h}\\[4pt]
        =\lim_{h\to0}(6+h)
      \end{gathered}`,
    },
    {
      change: "把 h 换成 0，只剩加法",
      text: "分母已经消去，6+h 是关于 h 的多项式，在 h=0 处连续，直接代入 h=0 即可算出切线斜率。",
      formula: math`6+0=\;?`,
    },
  ],

  p12: [
    {
      change: "分子分母同乘共轭根式",
      text: "直接令 h=0 会得到 0/0 型未定式。为了消去分子里的根号差，分子分母同乘 √(1+h)+1（在 h 靠近 0 时它趋近 2，不为 0）。",
      formula: math`\begin{gathered}
        \lim_{h\to0}\frac{(\sqrt{1+h}-1)(\sqrt{1+h}+1)}{h(\sqrt{1+h}+1)}
      \end{gathered}`,
    },
    {
      change: "用平方差去掉分子根号",
      text: "分子符合 (a−b)(a+b)=a²−b²，因此 (√(1+h))²−1² 变成 (1+h)−1，分母保持乘积形式不要展开。",
      formula: math`\lim_{h\to0}\frac{(1+h)-1}{h(\sqrt{1+h}+1)}`,
    },
    {
      change: "化简分子中的常数项",
      text: "分子里 1−1=0，只剩下一个 h，正好与分母里的因子 h 对应。",
      formula: math`\lim_{h\to0}\frac{h}{h(\sqrt{1+h}+1)}`,
    },
    {
      change: "约掉上下共同的因子 h",
      text: "在 h→0 的过程中 h ≠ 0，可以合法约去分子分母的公因子 h，消除 0/0 未定式。",
      formula: math`\lim_{h\to0}\frac{1}{\sqrt{1+h}+1}`,
    },
    {
      change: "把 h 换成 0，算出分数值",
      text: "此时分母在 h=0 处趋近 2 ≠ 0，函数连续，直接把 h=0 代入即可得到瞬时变化率。",
      formula: math`\frac{1}{\sqrt{1+0}+1}=\;?`,
    },
  ],

  p13: [
    {
      change: "按和差法则拆成三项求导",
      text: "多项式可以逐项求导：把 x³、−4x 和常数 2 分别求导，再按原来的加减号连接。",
      formula: math`f'(x)=(x^3)'-(4x)'+(2)'`,
    },
    {
      change: "套用幂函数与常数求导公式",
      text: "由 (xⁿ)'=nxⁿ⁻¹ 得 (x³)'=3x²、(4x)'=4，常数项 2 的导数为 0，合起来就得到导函数。",
      formula: math`f'(x)=3x^2-4`,
    },
    {
      change: "把 x=2 代入导函数",
      text: "题目要求的是 x=2 处的导数值，将导函数表达式中的 x 替换为 2。",
      formula: math`f'(2)=3\times 2^2-4`,
    },
    {
      change: "先算乘方和乘法，再做减法",
      text: "2²=4，3×4=12，把最后一步减法算完就是 f'(2)。",
      formula: math`12-4=\;?`,
    },
  ],

  p14: [
    {
      change: "套用乘积求导法则",
      text: "f(x)=x ln x 是两个函数 u=x 与 v=ln x 的乘积，必须用 (uv)'=u'v+uv'，不能直接把两个导数相乘。",
      formula: math`f'(x)=(x)'\ln x+x(\ln x)'`,
    },
    {
      change: "分别写出两部分的导数",
      text: "由基本求导公式知 (x)'=1，且在定义域 x>0 上 (ln x)'=1/x，代入上式。",
      formula: math`f'(x)=1\cdot\ln x+x\cdot\frac{1}{x}`,
    },
    {
      change: "化简 x 与 1/x 的乘积",
      text: "对数定义域要求 x>0，因此 x·(1/x)=1，得到简洁的导函数。",
      formula: math`f'(x)=\ln x+1`,
    },
    {
      change: "代入 x=1 并用 ln 1=0",
      text: "把 x=1 代入导函数，因为 ln 1=0，式子化为简单的加法。",
      formula: math`f'(1)=\ln 1+1=0+1=\;?`,
    },
  ],

  p15: [
    {
      change: "识别内外层，写出链式法则",
      text: "把括号整体看作内层 u=2x+1，外层是 u³。链式法则要求外层先对 u 求导得 3u²，再乘以内层 u 对 x 的导数。",
      formula: math`\begin{gathered}
        u=2x+1,\;(u^3)'=3u^2\cdot u'\\[4pt]
        f'(x)=3(2x+1)^2\cdot(2x+1)'
      \end{gathered}`,
    },
    {
      change: "算出内层导数 (2x+1)'=2",
      text: "2x+1 对 x 求导等于 2，别忘了把这个因子乘在后面。",
      formula: math`f'(x)=3(2x+1)^2\cdot 2`,
    },
    {
      change: "合并前面的常数因子",
      text: "把外层系数 3 与内层导数 2 相乘得到 6，化简导函数。",
      formula: math`f'(x)=6(2x+1)^2`,
    },
    {
      change: "代入 x=0，只剩数字运算",
      text: "把 x=0 代入 6(2x+1)²，括号内变成 1，算出乘积即可。",
      formula: math`\begin{gathered}
        6\times(2\times 0+1)^2\\[4pt]
        =6\times 1^2=\;?
      \end{gathered}`,
    },
  ],

  p16: [
    {
      change: "拆出内外层并套用链式法则",
      text: "令内层 u=3x+1，外层为 ln u。外层求导得 1/u，再乘以内层导数 u'。",
      formula: math`\begin{gathered}
        u=3x+1,\;(\ln u)'=\frac{1}{u}\cdot u'\\[4pt]
        f'(x)=\frac{1}{3x+1}\cdot(3x+1)'
      \end{gathered}`,
    },
    {
      change: "算出内层导数并写成分式",
      text: "(3x+1)'=3，乘到分子上就得到完整的导函数。",
      formula: math`f'(x)=\frac{3}{3x+1}`,
    },
    {
      change: "把 x=1 代入导函数",
      text: "将 x=1 代入分母 3x+1（此时分母为正，函数在 x=1 处有定义且可导）。",
      formula: math`f'(1)=\frac{3}{3\times 1+1}`,
    },
    {
      change: "整理分母，算出最终分数值",
      text: "分母 3×1+1 变成 3+1，算出这个分数（或对应小数）即可。",
      formula: math`\frac{3}{3+1}=\;?`,
    },
  ],

  p17: [
    {
      change: "写出微分定义式 dy=f'(x₀)Δx",
      text: "微分 dy 表示沿切线前进 Δx 时的高度增量，等于该点导数乘以自变量增量 Δx。",
      formula: math`\left.dy\right|_{x=2}=f'(2)\Delta x`,
    },
    {
      change: "先求函数 f(x)=x² 的导函数",
      text: "由幂函数求导公式 (x²)'=2x，得到任意点 x 处的切线斜率。",
      formula: math`f'(x)=2x`,
    },
    {
      change: "代入 x₀=2 算出该点斜率",
      text: "把 x=2 代入 f'(x)=2x，得到切线在 x₀=2 处的斜率 f'(2)=4。",
      formula: math`f'(2)=2\times 2=4`,
    },
    {
      change: "把斜率与 Δx=0.1 相乘",
      text: "将 f'(2)=4 和 Δx=0.1 代入 dy=f'(2)Δx，完成最后一步乘法。",
      formula: math`4\times 0.1=\;?`,
    },
  ],

  p18: [
    {
      change: "先算起点函数值 f(4)",
      text: "线性近似 f(4)+f'(4)Δx 由起点高度和切线增量两部分组成，先求出 f(4)=√4=2。",
      formula: math`f(4)=\sqrt{4}=2`,
    },
    {
      change: "把根式写成幂函数并求导",
      text: "√x=x^(1/2)，用幂函数求导公式得 (x^(1/2))'=(1/2)x^(−1/2)=1/(2√x)（x>0）。",
      formula: math`f'(x)=\frac{1}{2\sqrt{x}}`,
    },
    {
      change: "代入 x₀=4 算出起点斜率",
      text: "把 x=4 代入导函数，由 √4=2 得 f'(4)=1/4。",
      formula: math`f'(4)=\frac{1}{2\sqrt{4}}=\frac{1}{4}`,
    },
    {
      change: "算出切线增量 f'(4)Δx",
      text: "把斜率 1/4（即 0.25）乘以步长 Δx=0.04，得到切线预测的变化量 0.01。",
      formula: math`f'(4)\Delta x=\frac{1}{4}\times 0.04=0.01`,
    },
    {
      change: "把起点值与切线增量相加",
      text: "将 f(4)=2 与切线增量 0.01 相加，即可写出近似值。",
      formula: math`2+0.01=\;?`,
    },
  ],

  p40: [
    {
      change: "写出参数方程求导公式",
      text: "当 dx/dt ≠ 0 时，参数曲线的斜率 y'(x) 等于 y 对 t 的导数除以 x 对 t 的导数。",
      formula: math`y'(x)=\frac{dy/dt}{dx/dt}`,
    },
    {
      change: "分别对参数 t 求导并代入",
      text: "由幂函数求导公式得 dy/dt=(t³)'=3t²，dx/dt=(t²)'=2t，代入商式。",
      formula: math`y'(x)=\frac{3t^2}{2t}`,
    },
    {
      change: "约去分子分母的公因子 t",
      text: "在 t=2 附近 t ≠ 0，因此可以约去一份 t，把斜率公式化简为一次式。",
      formula: math`y'(x)=\frac{3t}{2}`,
    },
    {
      change: "代入 t=2，完成最后算术",
      text: "把 t=2 代入化简后的斜率公式，直接算出切线斜率。",
      formula: math`\frac{3\times 2}{2}=\;?`,
    },
  ],

  p41: [
    {
      change: "写出需求价格弹性定义式",
      text: "需求价格弹性定义为 E(p)=−p·Q'(p)/Q(p)，前面的负号让正常商品的弹性取正值。",
      formula: math`E(p)=-\frac{p\,Q'(p)}{Q(p)}`,
    },
    {
      change: "求导数 Q'(p) 和需求量 Q(10)",
      text: "对 Q(p)=120−3p 求导得 Q'(p)=−3；把 p=10 代入得 Q(10)=120−3×10=90。",
      formula: math`\begin{gathered}
        Q'(p)=-3\\[4pt]
        Q(10)=120-3\times 10=90
      \end{gathered}`,
    },
    {
      change: "把 p、Q'(10)、Q(10) 代入公式",
      text: "将 p=10、Q'(10)=−3、Q(10)=90 全部代入弹性公式，注意保留最前面的负号。",
      formula: math`E(10)=-\frac{10\times(-3)}{90}`,
    },
    {
      change: "负负得正，化简最终分数",
      text: "分子 −10×(−3)=30，把 30/90 约分即可得到 E(10)。",
      formula: math`\frac{30}{90}=\;?`,
    },
  ],

  p129: [
    {
      change: "把括号记作 u，套用链式法则",
      text: "令内层 u=2x²+x，外层是 u³。外层求导得 3u²，再乘以内层 u 对 x 的导数。",
      formula: math`\begin{gathered}
        u=2x^2+x\\[4pt]
        f'(x)=3(2x^2+x)^2\cdot(2x^2+x)'
      \end{gathered}`,
    },
    {
      change: "求出内层导数 4x+1",
      text: "对多项式 2x²+x 逐项求导得 4x+1，代入上式得到完整导函数。",
      formula: math`f'(x)=3(2x^2+x)^2(4x+1)`,
    },
    {
      change: "把 x=1 代入两个括号",
      text: "当 x=1 时，内层 2×1²+1=3，内层导数 4×1+1=5，代入导函数表达式。",
      formula: math`\begin{gathered}
        2(1)^2+1=3,\;4(1)+1=5\\[4pt]
        f'(1)=3\times 3^2\times 5
      \end{gathered}`,
    },
    {
      change: "先算平方，再连乘得结果",
      text: "3²=9，把 3×9×5 算出来就是 x=1 处的切线斜率。",
      formula: math`3\times 9\times 5=\;?`,
    },
  ],

  p130: [
    {
      change: "先用参数法写出斜率 y'",
      text: "二阶导数需要先有一阶导数 y'=dy/dx=(dy/dt)/(dx/dt)。分别求导得 dy/dt=3t²、dx/dt=2t。",
      formula: math`y'=\frac{dy/dt}{dx/dt}=\frac{3t^2}{2t}`,
    },
    {
      change: "利用 t>0 约去公因子 t",
      text: "题目已知 t>0，所以 t ≠ 0，可以把分子分母各约掉一个 t，得到简洁的一阶导数。",
      formula: math`y'=\frac{3}{2}t`,
    },
    {
      change: "写出参数二阶导数公式",
      text: "二阶导数是 y' 对 x 的导数，不是直接对 t 求导！必须把 d(y')/dt 再除以 dx/dt。",
      formula: math`\frac{d^2y}{dx^2}=\frac{d(y')/dt}{dx/dt}`,
    },
    {
      change: "算出 d(y')/dt 并除以 dx/dt",
      text: "对 y'=(3/2)t 求 t 的导数得 3/2，再除以 dx/dt=2t，合并分母得到 3/(4t)。",
      formula: math`\begin{gathered}
        \frac{d^2y}{dx^2}=\frac{3/2}{2t}=\frac{3}{4t}
      \end{gathered}`,
    },
    {
      change: "把 t=2 代入二阶导数公式",
      text: "将 t=2 代入 3/(4t)，算出分母即可得到最终分数（或小数）。",
      formula: math`\frac{3}{4\times 2}=\;?`,
    },
  ],

  p131: [
    {
      change: "对整体分式套用商的求导法则",
      text: "把分子记作 u=xeˣ、分母记作 v=1+x，按 (u/v)'=(u'v−uv')/v² 展开。",
      formula: math`\begin{gathered}
        f'(x)=\\[4pt]
        \frac{(xe^x)'(1+x)-xe^x(1+x)'}{(1+x)^2}
      \end{gathered}`,
    },
    {
      change: "分别求分子和分母的导数",
      text: "分子 xeˣ 用乘积法则求导得 1·eˣ+x·eˣ=eˣ(1+x)；分母 1+x 的导数是 1。",
      formula: math`\begin{gathered}
        (xe^x)'=e^x+xe^x=e^x(1+x)\\[4pt]
        (1+x)'=1
      \end{gathered}`,
    },
    {
      change: "代回商式得到导函数",
      text: "把刚求出的两个导数代回上一步的分子，此时 (1+x) 与 (1+x) 合并成平方。",
      formula: math`f'(x)=\frac{e^x(1+x)^2-xe^x}{(1+x)^2}`,
    },
    {
      change: "代入 x=0，化简每一项",
      text: "当 x=0 时，e⁰=1、1+0=1，且减号后面的 0·e⁰=0，分母 (1+0)²=1 ≠ 0。",
      formula: math`f'(0)=\frac{1\times(1+0)^2-0}{(1+0)^2}`,
    },
    {
      change: "完成最后一步简单除法",
      text: "分子为 1−0，分母为 1²，算出这个分数值即可。",
      formula: math`\frac{1-0}{1^2}=\;?`,
    },
  ],

  p132: [
    {
      change: "写出微分估算公式 df=f'(x₀)dx",
      text: "微分 df 用起点 x₀ 处的切线斜率乘以步长 dx，来近似函数的变化量。",
      formula: math`df=f'(x_0)\,dx`,
    },
    {
      change: "求出 f(x)=√x 的导函数",
      text: "把 √x 看作 x^(1/2)，由幂函数求导公式得 f'(x)=1/(2√x)（x>0）。",
      formula: math`f'(x)=\frac{1}{2\sqrt{x}}`,
    },
    {
      change: "代入 x₀=25 算出切线斜率",
      text: "把 x₀=25 代入导函数，由 √25=5 得到 f'(25)=1/10。",
      formula: math`f'(25)=\frac{1}{2\sqrt{25}}=\frac{1}{10}`,
    },
    {
      change: "乘以步长 dx=1 得到 df",
      text: "将斜率 1/10 与 dx=1 相乘，写出分数或小数形式的结果。",
      formula: math`\frac{1}{10}\times 1=\;?`,
    },
  ],

  p133: [
    {
      change: "写出总收益导数与弹性的关系",
      text: "对 R(p)=pQ(p) 用乘积法则得 R'(p)=Q(p)+pQ'(p)，提出 Q(p) 就得到经典弹性公式 R'(p)=Q(p)(1−E(p))。",
      formula: math`\begin{gathered}
        R'(p)=Q(p)+pQ'(p)\\[4pt]
        =Q(p)\bigl(1-E(p)\bigr)
      \end{gathered}`,
    },
    {
      change: "算出 p=30 时的需求量与导数",
      text: "代入 p=30 得 Q(30)=150−3×30=60；对 Q(p)=150−3p 求导得 Q'(p)=−3。",
      formula: math`\begin{gathered}
        Q(30)=150-3\times 30=60\\[4pt]
        Q'(30)=-3
      \end{gathered}`,
    },
    {
      change: "计算 p=30 处的需求弹性 E(30)",
      text: "代入弹性公式 E(p)=−pQ'(p)/Q(p)，得到 E(30)=90/60=3/2（大于 1，富有弹性）。",
      formula: math`\begin{gathered}
        E(30)=-\frac{30\times(-3)}{60}\\[4pt]
        =\frac{90}{60}=\frac{3}{2}
      \end{gathered}`,
    },
    {
      change: "代入 R'=Q(1−E)，只剩乘法",
      text: "把 Q(30)=60 和 E(30)=3/2 代入公式，先算括号内 1−3/2=−1/2，再做乘法即可。",
      formula: math`\begin{gathered}
        60\times\left(1-\frac{3}{2}\right)\\[4pt]
        =60\times\left(-\frac{1}{2}\right)=\;?
      \end{gathered}`,
    },
  ],

  p175: [
    {
      change: "角速度即转角对时间的导数",
      text: "想知道 t=2 秒时转得多快，需要求 θ(t) 的导数。按加法求导法则把两项拆开分别求导。",
      formula: math`\theta'(t)=(2t^2)'+(t)'`,
    },
    {
      change: "套用幂函数公式写出导函数",
      text: "2t² 求导得 2×2t=4t，t 求导得 1，合起来就是任意时刻的角速度公式。",
      formula: math`\theta'(t)=4t+1`,
    },
    {
      change: "把时间 t=2 代入角速度公式",
      text: "题目问的是两秒时的角速度，把导函数里的 t 替换成 2。",
      formula: math`\theta'(2)=4\times 2+1`,
    },
    {
      change: "先算乘法，再做加法",
      text: "4×2=8，再加 1 就是两秒时的角速度。",
      formula: math`8+1=\;?`,
    },
  ],

  p176: [
    {
      change: "写出 x=0 处的左导数定义",
      text: "左导数只从 x<0 的一侧逼近 0，按定义写作 x→0⁻ 时的差商极限。",
      formula: math`f'_-(0)=\lim_{x\to0^-}\frac{f(x)-f(0)}{x-0}`,
    },
    {
      change: "按分段区间分别读出 f(0) 与 f(x)",
      text: "x=0 落在 x≥0 这一段，所以 f(0)=2×0²=0；当 x→0⁻ 时始终有 x<0，因此 f(x) 必须取左侧分支 −3x。",
      formula: math`\begin{gathered}
        f(0)=2\cdot 0^2=0\\[4pt]
        x<0:\;f(x)=-3x
      \end{gathered}`,
    },
    {
      change: "把两段表达式代入差商",
      text: "将 f(x)=−3x 和 f(0)=0 代入差商分子，分母为 x。",
      formula: math`f'_-(0)=\lim_{x\to0^-}\frac{-3x-0}{x}`,
    },
    {
      change: "约去非零因子 x，读出常值极限",
      text: "因为 x<0，所以 x ≠ 0，分子分母可以直接约去 x，只剩下常数，常数的极限就是它本身。",
      formula: math`\lim_{x\to0^-}(-3)=\;?`,
    },
  ],

  p177: [
    {
      change: "拆出内外层并套用链式法则",
      text: "设内层角度 u=4x，外层是 cot u。由基本导数公式 (cot u)'=−1/sin²u，再乘以内层导数 u'。",
      formula: math`\begin{gathered}
        u=4x,\;(\cot u)'=-\frac{1}{\sin^2 u}\cdot u'\\[4pt]
        f'(x)=-\frac{1}{\sin^2(4x)}\cdot(4x)'
      \end{gathered}`,
    },
    {
      change: "算出内层导数 (4x)'=4",
      text: "角度 4x 随 x 以 4 倍速度变化，将内层导数 4 乘到分子上。",
      formula: math`f'(x)=-\frac{4}{\sin^2(4x)}`,
    },
    {
      change: "代入 x=π/8，算出角度 4x",
      text: "把 x=π/8 代入导函数，括号内的角度变为 4×(π/8)=π/2。",
      formula: math`f'\!\left(\frac{\pi}{8}\right)=-\frac{4}{\sin^2(\pi/2)}`,
    },
    {
      change: "代入 sin(π/2)=1，算出结果",
      text: "因为 sin(π/2)=1，分母 1²=1 ≠ 0，算出最后这个带负号的数即可。",
      formula: math`-\frac{4}{1^2}=\;?`,
    },
  ],

  p178: [
    {
      change: "先求一阶导数 f'(x)",
      text: "逐项求导：(3x²)'=6x，(2 ln x)'=2/x（x>0），先得到一阶导函数。",
      formula: math`f'(x)=6x+\frac{2}{x}`,
    },
    {
      change: "把 2/x 改写为幂次再求一次导",
      text: "把 2/x 看作 2x⁻¹，再求导得 (6x)'=6，(2x⁻¹)'=−2x⁻²=−2/x²，得到二阶导数 f''(x)。",
      formula: math`\begin{gathered}
        f'(x)=6x+2x^{-1}\\[4pt]
        f''(x)=6-\frac{2}{x^2}
      \end{gathered}`,
    },
    {
      change: "把 x=2 代入二阶导数",
      text: "将 x=2 代入 f''(x)=6−2/x²，注意分母先平方。",
      formula: math`f''(2)=6-\frac{2}{2^2}`,
    },
    {
      change: "化简分数 2/4，完成减法",
      text: "2/2²=2/4=1/2，计算 6−1/2（分数或小数皆可）就是 f''(2)。",
      formula: math`6-\frac{1}{2}=\;?`,
    },
  ],

  p179: [
    {
      change: "方程两边同时对 x 求导",
      text: "把 y 看作 x 的隐函数 y(x)，对等号两边每一项同时关于 x 求导，右边常数 0 的导数仍为 0。",
      formula: math`(y^2)'-2(xy)'+(8)'=0`,
    },
    {
      change: "分别展开 y² 和 xy 的导数",
      text: "y² 是复合函数，求导得 2yy'；xy 是乘积，求导得 y+xy'；常数 8 求导得 0。注意括号前的 −2 要分配到两项。",
      formula: math`2yy'-2y-2xy'=0`,
    },
    {
      change: "把含 y' 的项合并到左边",
      text: "将 −2y 移到等号右边变为 2y，左边把公因子 2y' 提出来。",
      formula: math`2(y-x)y'=2y`,
    },
    {
      change: "两边同除以 2(y−x) 解出 y'",
      text: "在点 (3,2) 处 y−x=2−3=−1 ≠ 0，可以安全除以 2(y−x) 约去系数 2，得到斜率公式。",
      formula: math`y'=\frac{y}{y-x}`,
    },
    {
      change: "代入点 (x,y)=(3,2) 算出斜率",
      text: "把 x=3、y=2 代入 y/(y−x)，完成最后一步除法。",
      formula: math`\frac{2}{2-3}=\frac{2}{-1}=\;?`,
    },
  ],

  p180: [
    {
      change: "写出真实增量 Δy 的定义",
      text: "从 x=1 走 Δx=1/2 到 x=3/2，真实高度变化 Δy 是终点函数值减去起点函数值。",
      formula: math`\Delta y=f\!\left(\frac{3}{2}\right)-f(1)`,
    },
    {
      change: "分别算出终点与起点函数值",
      text: "f(3/2)=(3/2)³−2(3/2)=27/8−3=3/8，f(1)=1³−2(1)=−1，相减得 Δy=3/8−(−1)=11/8。",
      formula: math`\begin{gathered}
        f\!\left(\frac{3}{2}\right)=\frac{3}{8},\;f(1)=-1\\[4pt]
        \Delta y=\frac{3}{8}-(-1)=\frac{11}{8}
      \end{gathered}`,
    },
    {
      change: "求导并算出起点 x=1 的斜率",
      text: "由 f(x)=x³−2x 求导得 f'(x)=3x²−2，代入 x=1 得切线斜率 f'(1)=1。",
      formula: math`\begin{gathered}
        f'(x)=3x^2-2\\[4pt]
        f'(1)=3(1)^2-2=1
      \end{gathered}`,
    },
    {
      change: "用斜率乘步长算出微分 dy",
      text: "切线预测的变化量 dy=f'(1)Δx，把斜率 1 和步长 1/2 相乘得 dy=1/2。",
      formula: math`dy=1\times\frac{1}{2}=\frac{1}{2}`,
    },
    {
      change: "通分后计算 Δy−dy",
      text: "把 1/2 通分成 4/8，再与真实变化 11/8 相减，就是真实变化比切线预测多出的部分。",
      formula: math`\frac{11}{8}-\frac{1}{2}=\frac{11}{8}-\frac{4}{8}=\;?`,
    },
  ],

  p211: [
    {
      change: "按乘积法则拆成两项",
      text: "x³ ln x 是 u=x³ 与 v=ln x 的乘积。用 (uv)'=u'v+uv'，让两个因子轮流求导。",
      formula: math`\begin{gathered}
        (x^3\ln x)'\\[4pt]
        =(x^3)'\ln x+x^3(\ln x)'
      \end{gathered}`,
    },
    {
      change: "分别代入两个基本导数",
      text: "由幂函数公式得 (x³)'=3x²；题目给出 x>0，因此 (ln x)'=1/x 有定义。",
      formula: math`3x^2\ln x+x^3\cdot\frac{1}{x}`,
    },
    {
      change: "化简第二项并提公因式收尾",
      text: "因为 x>0，x³·(1/x)=x²。接下来请把两项的公因式 x² 提出来，写出最简乘积形式并与参考解答对照。",
      formula: math`3x^2\ln x+x^2=x^2(\cdots)`,
    },
  ],

  p212: [
    {
      change: "写出三因子乘积求导法则",
      text: "三个函数相乘求导时，每次只让一个因子求导，其余两个原样保留，最后把三项加起来。",
      formula: math`\begin{gathered}
        (uvw)'=u'vw+uv'w+uvw'\\[4pt]
        (x^3)'\ln x\sin x\\[2pt]
        +x^3(\ln x)'\sin x\\[2pt]
        +x^3\ln x(\sin x)'
      \end{gathered}`,
    },
    {
      change: "代入三个因子的各自导数",
      text: "分别用 (x³)'=3x²、(ln x)'=1/x（x>0）和 (sin x)'=cos x 替换，保留其余因子不变。",
      formula: math`\begin{gathered}
        3x^2\ln x\sin x\\[2pt]
        +x^3\cdot\frac{1}{x}\sin x\\[2pt]
        +x^3\ln x\cos x
      \end{gathered}`,
    },
    {
      change: "化简中间项里的 x³·(1/x)",
      text: "因为 x>0，中间项 x³·(1/x) 约成 x²，前两项都带有公因式 x² sin x。",
      formula: math`\begin{gathered}
        3x^2\ln x\sin x+x^2\sin x\\[4pt]
        +x^3\ln x\cos x
      \end{gathered}`,
    },
    {
      change: "合并前两项并写出完整结果",
      text: "把前两项的公因式 x² sin x 提出来，再加上第三项，就能得到简洁的最终导数，写完后请与参考解答核对。",
      formula: math`\begin{gathered}
        x^2(\cdots)\sin x+x^3\ln x\cos x
      \end{gathered}`,
    },
  ],

  p213: [
    {
      change: "用乘积与链式法则求一阶导数",
      text: "先求 f'(x)：对 x cos(2x) 用乘积法则，其中 (cos(2x))' 要乘内层 (2x)'=2，得到 −2sin(2x)。",
      formula: math`\begin{gathered}
        f'(x)=(x)'\cos(2x)\\[2pt]
        +x\bigl(\cos(2x)\bigr)'\\[4pt]
        =\cos(2x)-2x\sin(2x)
      \end{gathered}`,
    },
    {
      change: "把一阶导数拆成两项再求导",
      text: "求二阶导数 f''(x) 时，对 cos(2x) 和 −2x sin(2x) 分别求导，把常数系数 −2 先提在外面。",
      formula: math`\begin{gathered}
        f''(x)=\bigl(\cos(2x)\bigr)'\\[4pt]
        -2\bigl(x\sin(2x)\bigr)'
      \end{gathered}`,
    },
    {
      change: "分别算出两部分的导数",
      text: "第一项 (cos(2x))'=−2sin(2x)；第二项用乘积法则并乘内层导数 2，得 (x sin(2x))'=sin(2x)+2x cos(2x)。",
      formula: math`\begin{gathered}
        \bigl(\cos(2x)\bigr)'=-2\sin(2x)\\[4pt]
        \bigl(x\sin(2x)\bigr)'\\[2pt]
        =\sin(2x)+2x\cos(2x)
      \end{gathered}`,
    },
    {
      change: "去括号并合并同类正弦项",
      text: "把两部分代回 f''(x)，把括号前的 −2 分配进去，再把两个含 sin(2x) 的同类项合并，即可写出最终答案并与参考解答对照。",
      formula: math`\begin{gathered}
        f''(x)=-2\sin(2x)\\[4pt]
        -2\bigl(\sin(2x)+2x\cos(2x)\bigr)
      \end{gathered}`,
    },
  ],

  p214: [
    {
      change: "椭圆方程两边同时对 x 求导",
      text: "把 y 视作 x 的隐函数，x² 求导得 2x，3y² 按链式法则求导得 6yy'，右边常数 28 的导数为 0。",
      formula: math`2x+6yy'=0`,
    },
    {
      change: "移项把含 y' 的项留在左边",
      text: "将 2x 移到等号右边变成 −2x，为解出 y' 做准备。",
      formula: math`6yy'=-2x`,
    },
    {
      change: "利用 y≠0 两边同除以 6y",
      text: "题目限定 y ≠ 0，所以可以合法除以 6y，把分子分母的公因子 2 约掉就能得到斜率公式。",
      formula: math`y'=-\frac{2x}{6y}`,
    },
    {
      change: "化简公式并代入点 (1,3)",
      text: "先将 −2x/(6y) 约分得到 y' 的通用公式，再把 x=1、y=3 代入算出该点斜率，写完两项结论后对照参考解答。",
      formula: math`\begin{gathered}
        y'=-\frac{x}{3y}\\[4pt]
        y'(1)=-\frac{1}{3\times 3}
      \end{gathered}`,
    },
  ],

  p215: [
    {
      change: "展开真实增量 Δy 的代数式",
      text: "由 y=x²，真实增量 Δy=(x+Δx)²−x²，用完全平方展开并抵消 x²，看出它由一次项和二次项组成。",
      formula: math`\begin{gathered}
        \Delta y=(x+\Delta x)^2-x^2\\[4pt]
        =2x\Delta x+(\Delta x)^2
      \end{gathered}`,
    },
    {
      change: "分出微分 dy 与余项 Δy−dy",
      text: "因为 y'=2x，微分 dy=2xΔx 正好是展开式里的一次主部，切线漏掉的误差 Δy−dy 就是多出来的 (Δx)²。",
      formula: math`\begin{gathered}
        dy=2x\Delta x\\[4pt]
        \Delta y-dy=(\Delta x)^2
      \end{gathered}`,
    },
    {
      change: "把 x=3 与 Δx=0.02 代入两式",
      text: "将 x=3 和 Δx=0.02 分别代入 dy 和 Δy−dy 的表达式，注意 (0.02)² 的小数位数。",
      formula: math`\begin{gathered}
        dy=2\times 3\times 0.02\\[4pt]
        \Delta y-dy=(0.02)^2
      \end{gathered}`,
    },
    {
      change: "算出三项数值并核对关系",
      text: "先分别算出 dy 与 Δy−dy，再把二者相加得到真实增量 Δy=dy+(Δx)²，写出完整三项结果并与参考解答核对。",
      formula: math`\Delta y=dy+(\Delta x)^2`,
    },
  ],
};

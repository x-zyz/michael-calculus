import type { GuidedHint } from "../learning";

const math = String.raw;

export const ch2Sec5GuidedHints: Record<string, GuidedHint[]> = {
  "jc935-2-5-1-1": [
    {
      change: "写出一般步长 Δx 的真实增量",
      text: "在 x=1 处有 y(1)=1³+2×1=3。先把 x 换成 1+Δx，写出真实增量 Δy=y(1+Δx)−y(1)，暂不代入 Δx=1，方便看清一次项和高次项。",
      formula: math`\begin{gathered}
        y(1)=1^3+2\cdot 1=3\\[4pt]
        \Delta y=(1+\Delta x)^3+2(1+\Delta x)-3
      \end{gathered}`,
    },
    {
      change: "展开三次方并合并同类项",
      text: "用 (1+Δx)³=1+3Δx+3(Δx)²+(Δx)³ 展开，再与 2+2Δx−3 合并，常数项 1+2−3 刚好抵消。",
      formula: math`\begin{gathered}
        \Delta y=1+3\Delta x+3(\Delta x)^2+(\Delta x)^3\\[4pt]
        +2+2\Delta x-3\\[4pt]
        =5\Delta x+3(\Delta x)^2+(\Delta x)^3
      \end{gathered}`,
    },
    {
      change: "求导写出 x=1 处的微分 dy",
      text: "对 y=x³+2x 求导得 y′=3x²+2，代入 x=1 得斜率 5，因此微分 dy=y′(1)Δx=5Δx，恰好是 Δy 中的一次主部。",
      formula: math`\begin{gathered}
        y'=3x^2+2,\quad y'(1)=5\\[4pt]
        dy=5\Delta x
      \end{gathered}`,
    },
    {
      change: "代入 Δx=1 分别算出 Δy 与 dy",
      text: "把大步长 Δx=1 分别代入 Δy 和 dy 的表达式。请完成最后一步算术，比较两者在大步长下的差距，再对照参考解答。",
      formula: math`\begin{gathered}
        \Delta y=5\cdot 1+3\cdot 1^2+1^3=\;?\\[4pt]
        dy=5\cdot 1=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-5-1-2": [
    {
      change: "写出 x=1 处的 Δy 与 dy 公式",
      text: "与步长大小无关，y=x³+2x 在 x=1 处展开真实增量得 Δy=5Δx+3(Δx)²+(Δx)³，同时由 y′(1)=5 得微分 dy=5Δx。",
      formula: math`\begin{gathered}
        \Delta y=5\Delta x+3(\Delta x)^2+(\Delta x)^3\\[4pt]
        dy=5\Delta x
      \end{gathered}`,
    },
    {
      change: "算出步长 Δx=0.1 的各次幂",
      text: "先把 Δx=0.1 的平方和立方算清楚，避免小数点错位：(0.1)²=0.01，(0.1)³=0.001。",
      formula: math`\begin{gathered}
        \Delta x=0.1\\[4pt]
        (\Delta x)^2=0.01,\quad (\Delta x)^3=0.001
      \end{gathered}`,
    },
    {
      change: "代回表达式并保留一次项与高次项",
      text: "把各次幂分别代进 Δy 和 dy。请按小数位对齐相加算出 Δy 与 dy，体会步长缩为 0.1 后误差明显缩小，再对照参考解答。",
      formula: math`\begin{gathered}
        \Delta y=5(0.1)+3(0.01)+0.001=\;?\\[4pt]
        dy=5(0.1)=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-5-1-3": [
    {
      change: "复用 x=1 处的 Δy 与 dy 表达式",
      text: "在 x=1 处仍有 y′(1)=5，因此微分 dy=5Δx，真实增量 Δy=5Δx+3(Δx)²+(Δx)³，高次项为 3(Δx)²+(Δx)³。",
      formula: math`\begin{gathered}
        \Delta y=5\Delta x+3(\Delta x)^2+(\Delta x)^3\\[4pt]
        dy=5\Delta x
      \end{gathered}`,
    },
    {
      change: "核对极小步长 0.01 的平方与立方",
      text: "步长缩小到 0.01 后，平方变 4 位小数、立方变 6 位小数，先单独写出以免漏零。",
      formula: math`\begin{gathered}
        (\Delta x)^2=(0.01)^2=0.0001\\[4pt]
        (\Delta x)^3=(0.01)^3=0.000001
      \end{gathered}`,
    },
    {
      change: "代入算出 Δy 与 dy 并对比误差",
      text: "把各项代入即可算出 dy 与 Δy。请按小数位对齐完成加法，并观察 Δy−dy 远小于步长 0.01，再对照参考解答。",
      formula: math`\begin{gathered}
        \Delta y=0.05+0.0003+0.000001=\;?\\[4pt]
        dy=5\times 0.01=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-5-2-1": [
    {
      change: "求切点斜率并写出切线增量 dy",
      text: "对 f(x)=x² 求导得 f′(x)=2x，在 x₀=1 处切线斜率为 f′(1)=2。因此当 Δx>0 时，切线纵坐标增量 dy=2Δx。",
      formula: math`\begin{gathered}
        f'(x)=2x,\quad f'(1)=2\\[4pt]
        dy=2\Delta x
      \end{gathered}`,
    },
    {
      change: "展开真实增量 Δy",
      text: "真实增量是曲线从 (1,1) 到 (1+Δx,(1+Δx)²) 的高度差，展开平方即可消去常数 1。",
      formula: math`\begin{gathered}
        \Delta y=(1+\Delta x)^2-1\\[4pt]
        =2\Delta x+(\Delta x)^2
      \end{gathered}`,
    },
    {
      change: "作差 Δy−dy 并结合图形判符号",
      text: "用 Δy 减去 dy 得到差值 (Δx)²。因为 Δx>0，请据此依次判断 dy、Δy 与 Δy−dy 的正负，并在图中标出曲线位于切线上方，再对照参考解答。",
      formula: math`\begin{gathered}
        \Delta y-dy=(\Delta x)^2\\[4pt]
        \Delta x>0\implies dy,\;\Delta y,\;\Delta y-dy\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-5-2-2": [
    {
      change: "求导写出切线增量 dy",
      text: "对 f(x)=√x 求导得 f′(x)=1/(2√x)，在 x₀=1 处斜率为 f′(1)=1/2，所以切线增量为 dy=Δx/2。",
      formula: math`\begin{gathered}
        f'(x)=\frac{1}{2\sqrt{x}},\quad f'(1)=\frac{1}{2}\\[4pt]
        dy=\frac{\Delta x}{2}
      \end{gathered}`,
    },
    {
      change: "写出真实增量 Δy 与差值表达式",
      text: "真实增量是 Δy=√(1+Δx)−1。先保留根号形式，写出带符号的差值 Δy−dy。",
      formula: math`\begin{gathered}
        \Delta y=\sqrt{1+\Delta x}-1\\[4pt]
        \Delta y-dy=\sqrt{1+\Delta x}-\left(1+\frac{\Delta x}{2}\right)
      \end{gathered}`,
    },
    {
      change: "分子有理化把差值化成单分式",
      text: "把差值视为 A−B，分子分母同乘正数 A+B（因 Δx>0 时两项皆正，不会乘 0），利用 A²−B² 化简分子。",
      formula: math`\begin{gathered}
        \Delta y-dy=\\[4pt]
        \frac{(1+\Delta x)-\left(1+\frac{\Delta x}{2}\right)^2}{\sqrt{1+\Delta x}+1+\frac{\Delta x}{2}}
      \end{gathered}`,
    },
    {
      change: "化简分子并判断三者符号",
      text: "展开分子得 −(Δx)²/4，而分母恒为正。请结合 Δx>0 写出 dy、Δy 与 Δy−dy 的正负号，并在图中标出曲线落在切线下方，再对照参考解答。",
      formula: math`\begin{gathered}
        \Delta y-dy=\frac{-(\Delta x)^2}{4\left(\sqrt{1+\Delta x}+1+\frac{\Delta x}{2}\right)}\\[4pt]
        \Delta x>0\implies dy,\;\Delta y,\;\Delta y-dy\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-5-2-3": [
    {
      change: "求切点斜率并写出微分 dy",
      text: "对 f(x)=4−x² 求导得 f′(x)=−2x，在 x₀=1 处切线斜率为 f′(1)=−2，故切线增量 dy=−2Δx。",
      formula: math`\begin{gathered}
        f'(x)=-2x,\quad f'(1)=-2\\[4pt]
        dy=-2\Delta x
      \end{gathered}`,
    },
    {
      change: "展开真实增量 Δy",
      text: "在 x₀=1 处 f(1)=3，写出 Δy=f(1+Δx)−f(1) 并展开括号合并同类项。",
      formula: math`\begin{gathered}
        \Delta y=\left[4-(1+\Delta x)^2\right]-3\\[4pt]
        =-2\Delta x-(\Delta x)^2
      \end{gathered}`,
    },
    {
      change: "作差 Δy−dy 并注意负数符号",
      text: "计算带符号的差值 Δy−dy=−(Δx)²。因为 Δx>0，请依次判断 dy、Δy 与 Δy−dy 的正负，注意曲线降得比切线更低，再对照参考解答。",
      formula: math`\begin{gathered}
        \Delta y-dy=-(\Delta x)^2\\[4pt]
        \Delta x>0\implies dy,\;\Delta y,\;\Delta y-dy\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-5-2-4": [
    {
      change: "求导写出切线增量 dy",
      text: "把 f(x)=2/x 写成 2x⁻¹ 求导得 f′(x)=−2/x²，在 x₀=1 处斜率为 f′(1)=−2，故 dy=−2Δx。",
      formula: math`\begin{gathered}
        f'(x)=-\frac{2}{x^2},\quad f'(1)=-2\\[4pt]
        dy=-2\Delta x
      \end{gathered}`,
    },
    {
      change: "通分写出真实增量 Δy",
      text: "在 x₀=1 处 f(1)=2，写出 Δy=2/(1+Δx)−2 并通分（Δx>0 保证分母 1+Δx>1≠0）。",
      formula: math`\begin{gathered}
        \Delta y=\frac{2}{1+\Delta x}-2\\[4pt]
        =\frac{-2\Delta x}{1+\Delta x}
      \end{gathered}`,
    },
    {
      change: "通分计算带符号差值 Δy−dy",
      text: "注意减去负数 −2Δx 相当于加上 2Δx，再与第一项通分合并分子。",
      formula: math`\begin{gathered}
        \Delta y-dy=\frac{-2\Delta x}{1+\Delta x}+2\Delta x\\[4pt]
        =\frac{-2\Delta x+2\Delta x(1+\Delta x)}{1+\Delta x}
      \end{gathered}`,
    },
    {
      change: "化简分子并判断三者正负",
      text: "分子中 −2Δx 与 +2Δx 抵消，只剩 2(Δx)²。请结合 Δx>0 判断 dy、Δy 与 Δy−dy 的符号，说明为何下降曲线反而在切线上方，再对照参考解答。",
      formula: math`\begin{gathered}
        \Delta y-dy=\frac{2(\Delta x)^2}{1+\Delta x}\\[4pt]
        \Delta x>0\implies dy,\;\Delta y,\;\Delta y-dy\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-5-3-1": [
    {
      change: "把分式和根式改写成幂形式",
      text: "在 x>0 的条件下，把 3/x 写成 3x⁻¹，把 4√x 写成 4x^(1/2)，方便统一套用幂函数求导法则。",
      formula: math`y=3x^{-1}-4x^{1/2}\quad (x>0)`,
    },
    {
      change: "逐项套用幂函数求导法则",
      text: "利用 (xⁿ)′=nxⁿ⁻¹ 对两项分别求导，注意 −1−1=−2 与 1/2−1=−1/2。",
      formula: math`\begin{gathered}
        y'=3(-1)x^{-2}-4\cdot\frac{1}{2}x^{-1/2}\\[4pt]
        =-3x^{-2}-2x^{-1/2}
      \end{gathered}`,
    },
    {
      change: "改回分式根式并乘以 dx",
      text: "把负幂改回分式与根式形式，再套用 dy=y′dx，记得用括号把整个导数括起来再乘 dx，最后对照参考解答。",
      formula: math`\begin{gathered}
        y'=-\frac{3}{x^2}-\frac{2}{\sqrt{x}}\\[4pt]
        dy=y'\,dx=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-5-3-2": [
    {
      change: "按乘积法则展开 y′",
      text: "把 y=xcos(3x) 看成 u=x 与 v=cos(3x) 的乘积，用 (uv)′=u′v+uv′ 拆成两项，先留着 (cos 3x)′ 下一步再求。",
      formula: math`y'=(x)'\cos 3x+x(\cos 3x)'`,
    },
    {
      change: "用链式法则算出两项导数",
      text: "第一项 (x)′=1；第二项对 cos(3x) 求导先出 −sin(3x)，再乘内层 (3x)′=3。",
      formula: math`\begin{gathered}
        (\cos 3x)'=-\sin 3x\cdot 3=-3\sin 3x\\[4pt]
        y'=\cos 3x-3x\sin 3x
      \end{gathered}`,
    },
    {
      change: "套用 dy=y′dx 写出微分",
      text: "把整个导数用括号括起来并乘以 dx，请写出最终微分 dy 再对照参考解答。",
      formula: math`dy=y'\,dx=\;?`,
    },
  ],

  "jc935-2-5-3-3": [
    {
      change: "先单独算出分母根式的导数",
      text: "记分母 v=√(x²+4)=(x²+4)^(1/2)。按链式法则对外层开方与内层 x²+4 依次求导，约去因子 2。",
      formula: math`\begin{gathered}
        v=\sqrt{x^2+4}\\[4pt]
        v'=\frac{1}{2\sqrt{x^2+4}}\cdot 2x=\frac{x}{\sqrt{x^2+4}}
      \end{gathered}`,
    },
    {
      change: "对商函数套用商法则",
      text: "分子 u=x、u′=1，代入 (u/v)′=(u′v−uv′)/v²，注意 v²=x²+4>0。",
      formula: math`\begin{gathered}
        y'=\frac{1\cdot\sqrt{x^2+4}-x\cdot\frac{x}{\sqrt{x^2+4}}}{x^2+4}
      \end{gathered}`,
    },
    {
      change: "分子分母同乘 √(x²+4) 化简",
      text: "为了消掉分子里的小分母，把大分数上下同乘 √(x²+4)，分母指数变为 1+1/2=3/2，分子中的 x² 刚好抵消。",
      formula: math`\begin{gathered}
        y'=\frac{(x^2+4)-x^2}{(x^2+4)\sqrt{x^2+4}}\\[4pt]
        =\frac{4}{(x^2+4)^{3/2}}
      \end{gathered}`,
    },
    {
      change: "乘以 dx 写出最终微分",
      text: "导数已经化成最简分式，请套用 dy=y′dx 写出完整微分，再对照参考解答。",
      formula: math`dy=y'\,dx=\;?`,
    },
  ],

  "jc935-2-5-3-4": [
    {
      change: "拆清三层复合结构",
      text: "当 x<2 时 2−x>0，对数有意义。把 y=ln²(2−x) 从外到内拆成三层：w=u²、u=ln v、v=2−x。",
      formula: math`\begin{gathered}
        y=u^2,\quad u=\ln v\\[4pt]
        v=2-x>0
      \end{gathered}`,
    },
    {
      change: "由外向内逐层写出导数并连乘",
      text: "外层 (u²)′=2u，中层 (ln v)′=1/v，最内层 (2−x)′=−1，切记不要漏掉最后的负号。",
      formula: math`\begin{gathered}
        y'=2\ln(2-x)\cdot\frac{1}{2-x}\cdot(-1)
      \end{gathered}`,
    },
    {
      change: "把负号吸收进分母并乘以 dx",
      text: "利用 −1/(2−x)=1/(x−2) 把负号整理进分母，再乘以 dx 写出微分 dy，最后对照参考解答。",
      formula: math`\begin{gathered}
        y'=\frac{2\ln(2-x)}{x-2}\\[4pt]
        dy=y'\,dx=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-5-3-5": [
    {
      change: "按乘积法则拆成两项",
      text: "把 y=x²e^(3x) 看作 x² 与 e^(3x) 的乘积，用乘积法则展开，暂不化简。",
      formula: math`y'=(x^2)'e^{3x}+x^2(e^{3x})'`,
    },
    {
      change: "算出幂函数与复合指数的导数",
      text: "第一项 (x²)′=2x；第二项按链式法则得 (e^(3x))′=e^(3x)·3=3e^(3x)。",
      formula: math`y'=2xe^{3x}+3x^2e^{3x}`,
    },
    {
      change: "提取公因子并乘以 dx",
      text: "两项都含有公因子 xe^(3x)，先提公因子把导数写紧凑，再套用 dy=y′dx 写出最终微分，最后对照参考解答。",
      formula: math`\begin{gathered}
        y'=x(2+3x)e^{3x}\\[4pt]
        dy=y'\,dx=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-5-3-6": [
    {
      change: "对乘积两头分别准备求导",
      text: "把 y=e^(−2x)cos(4−x) 按乘积法则拆成两项，指数和余弦都是复合函数，下面分别算清内层系数。",
      formula: math`\begin{gathered}
        y'=(e^{-2x})'\cos(4-x)\\[4pt]
        +e^{-2x}[\cos(4-x)]'
      \end{gathered}`,
    },
    {
      change: "分别用链式法则算清负号",
      text: "前一项 (e^(−2x))′=−2e^(−2x)；后一项 cos 求导出负号，内层 (4−x)′=−1 再出负号，负负得正变成 +sin(4−x)。",
      formula: math`\begin{gathered}
        (e^{-2x})'=-2e^{-2x}\\[4pt]
        [\cos(4-x)]'=-\sin(4-x)\cdot(-1)\\[4pt]
        =\sin(4-x)
      \end{gathered}`,
    },
    {
      change: "提公因子 e^(−2x) 并乘以 dx",
      text: "把上面两项代回并提取公因子 e^(−2x)，再乘以 dx 得到完整微分 dy，请整理后对照参考解答。",
      formula: math`\begin{gathered}
        y'=e^{-2x}[\sin(4-x)-2\cos(4-x)]\\[4pt]
        dy=y'\,dx=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-5-3-7": [
    {
      change: "设中间变量并算内层导数",
      text: "记 u=√(1−4x²)。当 0<|x|<1/2 时，1−4x²>0 且 u∈(0,1)，满足反余弦可导条件。先求 u′。",
      formula: math`\begin{gathered}
        u=\sqrt{1-4x^2}\\[4pt]
        u'=\frac{-8x}{2\sqrt{1-4x^2}}=\frac{-4x}{\sqrt{1-4x^2}}
      \end{gathered}`,
    },
    {
      change: "化简反余弦求导的分母 √(1−u²)",
      text: "套用 (arccos u)′=−u′/√(1−u²) 前先算 √(1−u²)。关键细节：开平方得到的是绝对值 2|x|，不能直接写成 2x。",
      formula: math`\begin{gathered}
        \sqrt{1-u^2}=\sqrt{1-(1-4x^2)}\\[4pt]
        =\sqrt{4x^2}=2|x|
      \end{gathered}`,
    },
    {
      change: "代入链式法则并约去因子 2",
      text: "把 u′ 与 √(1−u²)=2|x| 代入 y′=−u′/√(1−u²)，两个负号抵消，分子分母约去 2，留下符号因子 x/|x|。",
      formula: math`\begin{gathered}
        y'=-\frac{1}{2|x|}\cdot\frac{-4x}{\sqrt{1-4x^2}}\\[4pt]
        =\frac{x}{|x|}\cdot\frac{2}{\sqrt{1-4x^2}}
      \end{gathered}`,
    },
    {
      change: "按 x 的正负去绝对值并乘 dx",
      text: "在 0<x<1/2 上 x/|x|=1，在 −1/2<x<0 上 x/|x|=−1。请分段写出微分 dy（注意 x=0 不可导），再对照参考解答。",
      formula: math`\begin{gathered}
        \frac{x}{|x|}=\begin{cases}
          -1, & -\frac{1}{2}<x<0\\
          1, & 0<x<\frac{1}{2}
        \end{cases}\\[4pt]
        dy=y'\,dx=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-5-3-8": [
    {
      change: "识别三层复合结构",
      text: "在 2+3x²≠π/2+kπ 的定义区间内，把 y=tan²(2+3x²) 拆成外层 u²、中层 tan v、内层 v=2+3x²。",
      formula: math`\begin{gathered}
        y=u^2,\quad u=\tan v\\[4pt]
        v=2+3x^2
      \end{gathered}`,
    },
    {
      change: "由外到内写出三层导数并连乘",
      text: "外层导数 2u，中层导数 sec²v，内层导数 6x，按链式法则把三者相乘。",
      formula: math`\begin{gathered}
        y'=2\tan(2+3x^2)\\[4pt]
        \cdot\sec^2(2+3x^2)\cdot 6x
      \end{gathered}`,
    },
    {
      change: "合并数字系数并乘以 dx",
      text: "把系数 2 与 6x 合并，再套用 dy=y′dx 写出完整微分，最后对照参考解答。",
      formula: math`\begin{gathered}
        y'=12x\tan(2+3x^2)\sec^2(2+3x^2)\\[4pt]
        dy=y'\,dx=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-5-3-9": [
    {
      change: "设中间变量并化简 1+u²",
      text: "记 u=(4−x²)/(4+x²)。要套用 (arctan u)′=u′/(1+u²)，先通分算 1+u²，注意展开后交叉项 +8x² 与 −8x² 刚好抵消。",
      formula: math`\begin{gathered}
        u=\frac{4-x^2}{4+x^2}\\[4pt]
        1+u^2=\frac{(4+x^2)^2+(4-x^2)^2}{(4+x^2)^2}\\[4pt]
        =\frac{2(16+x^4)}{(4+x^2)^2}
      \end{gathered}`,
    },
    {
      change: "用商法则计算 u′",
      text: "对 u=(4−x²)/(4+x²) 用商法则，分子里 −2x³ 与 +2x³ 再次抵消，只剩一次项 −16x。",
      formula: math`\begin{gathered}
        u'=\frac{-2x(4+x^2)-(4-x^2)(2x)}{(4+x^2)^2}\\[4pt]
        =\frac{-16x}{(4+x^2)^2}
      \end{gathered}`,
    },
    {
      change: "把 u′ 与 1+u² 相除约分",
      text: "计算 y′=u′/(1+u²)，两者的分母 (4+x²)² 恒正可以直接约掉，再把 −16 与 2 约分。",
      formula: math`\begin{gathered}
        y'=\frac{-16x}{(4+x^2)^2}\cdot\frac{(4+x^2)^2}{2(16+x^4)}\\[4pt]
        =-\frac{8x}{16+x^4}
      \end{gathered}`,
    },
    {
      change: "乘以 dx 得到最简微分",
      text: "把最简导数乘上 dx 即得微分 dy，请写出最终表达式再对照参考解答。",
      formula: math`dy=y'\,dx=\;?`,
    },
  ],

  "jc935-2-5-3-10": [
    {
      change: "区分自变量 t 与常数参数",
      text: "题中 B、ω、θ₀ 都是常数，只有 t 是自变量。先把常数因子 B 提到求导号外，内层 ωt+θ₀ 关于 t 的导数就是 ω。",
      formula: math`\begin{gathered}
        s=B\cos(\omega t+\theta_0)\\[4pt]
        \frac{d}{dt}(\omega t+\theta_0)=\omega
      \end{gathered}`,
    },
    {
      change: "按链式法则求 s′(t)",
      text: "对余弦求导得 −sin(ωt+θ₀)，再乘内层导数 ω 和前面的常数 B。",
      formula: math`s'(t)=-B\omega\sin(\omega t+\theta_0)`,
    },
    {
      change: "乘以时间微分 dt 写出 ds",
      text: "注意自变量是 t，微分应写成 ds=s′(t)dt 而非 dx。请写出最终结果并对照参考解答。",
      formula: math`ds=s'(t)\,dt=\;?`,
    },
  ],

  "jc935-2-5-4-1": [
    {
      change: "把凑微分转化为找原函数",
      text: "等式 d(F(x))=5dx 等价于寻找满足 F′(x)=5 的函数 F(x)。",
      formula: math`d(F(x))=F'(x)\,dx=5\,dx\iff F'(x)=5`,
    },
    {
      change: "利用一次函数微分凑出 5dx",
      text: "因为 (x)′=1、d(x)=dx，把常数 5 放进微分号内即得 d(5x)=5dx。",
      formula: math`5\,dx=5\,d(x)=d(5x)`,
    },
    {
      change: "补上任意常数 C 完成一般形式",
      text: "任意常数 C 的导数为 0，因此 5x+C 的微分同样是 5dx。请填入括号并反向求导检验，再对照参考解答。",
      formula: math`d(5x+C)=\;?`,
    },
  ],

  "jc935-2-5-4-2": [
    {
      change: "从 x² 的微分出发对比系数",
      text: "因为 (x²)′=2x，所以 d(x²)=2xdx，比单因子 xdx 多了系数 2。",
      formula: math`d(x^2)=2x\,dx`,
    },
    {
      change: "两边同除以 2 配出 xdx",
      text: "把常数 1/2 放进微分号内，消掉因子 2，得到标准配凑式 d((1/2)x²)=xdx。",
      formula: math`d\!\left(\frac{1}{2}x^2\right)=x\,dx`,
    },
    {
      change: "同乘 5 并补上任意常数 C",
      text: "把 d((1/2)x²)=xdx 两边同乘 5 就能凑出 5xdx，再加上导数为 0 的任意常数 C。请写出完整括号内容并检验，再对照参考解答。",
      formula: math`d\!\left(\frac{5}{2}x^2+C\right)=\;?`,
    },
  ],

  "jc935-2-5-4-3": [
    {
      change: "回忆余弦函数的微分公式",
      text: "因为 (cos t)′=−sin t，所以直接对 cos t 求微分会带有一个负号。",
      formula: math`d(\cos t)=-\sin t\,dt`,
    },
    {
      change: "两边同乘 −1 消去右边负号",
      text: "把负号移进微分号内，得到 d(−cos t)=sin t dt，与目标右边完全一致。",
      formula: math`d(-\cos t)=\sin t\,dt`,
    },
    {
      change: "补上任意常数 C 并反向核对",
      text: "在 −cos t 后面加上导数为 0 的任意常数 C。请写出完整括号内容并反向求导核对，再对照参考解答。",
      formula: math`d(-\cos t+C)=\;?`,
    },
  ],

  "jc935-2-5-4-4": [
    {
      change: "先试求 d(sin kx) 看多余系数",
      text: "由链式法则，(sin kx)′=kcos(kx)，因此 d(sin kx) 会比目标 cos(kx)dx 多出一个常数因子 k。",
      formula: math`d(\sin kx)=k\cos(kx)\,dx`,
    },
    {
      change: "利用 k≠0 两边同除以 k",
      text: "题目已知 k≠0，可以合法地把等式两边同除以 k，把常数 1/k 放进微分号内。",
      formula: math`d\!\left(\frac{1}{k}\sin kx\right)=\cos(kx)\,dx`,
    },
    {
      change: "补上任意常数 C 完成一般解",
      text: "在括号内补上导数为 0 的任意常数 C，反向求导核对系数 1/k 与 k 是否刚好抵消，再对照参考解答。",
      formula: math`d\!\left(\frac{1}{k}\sin kx+C\right)=\;?`,
    },
  ],

  "jc935-2-5-4-5": [
    {
      change: "把 dx 改写成内层线性式 d(3+x)",
      text: "因为 (3+x)′=1，所以 d(3+x)=dx。令 u=3+x，在 x>−3 处有 u>0，目标式变成标准分式 du/u。",
      formula: math`\begin{gathered}
        u=3+x>0,\quad du=d(3+x)=dx\\[4pt]
        \frac{1}{3+x}\,dx=\frac{du}{u}
      \end{gathered}`,
    },
    {
      change: "套用对数微分公式 d(ln u)=du/u",
      text: "当 u>0 时，(ln u)′=1/u，故 du/u=d(ln u)=d(ln(3+x))。",
      formula: math`\frac{1}{3+x}\,dx=d(\ln(3+x))`,
    },
    {
      change: "补上任意常数 C 得到一般括号表达式",
      text: "在 ln(3+x) 后加上任意常数 C，请写出完整等式并求导核对，再对照参考解答。",
      formula: math`d(\ln(3+x)+C)=\;?`,
    },
  ],

  "jc935-2-5-4-6": [
    {
      change: "先求 d(e^(−3x)) 看吐出的系数",
      text: "按链式法则求微分，d(e^(−3x))=−3e^(−3x)dx，比目标多了系数 −3。",
      formula: math`d(e^{-3x})=-3e^{-3x}\,dx`,
    },
    {
      change: "同乘 −1/3 消去多余系数",
      text: "等式两边同乘 −1/3，把 −1/3 放进微分号里，右边正好变成 e^(−3x)dx。",
      formula: math`d\!\left(-\frac{1}{3}e^{-3x}\right)=e^{-3x}\,dx`,
    },
    {
      change: "补上任意常数 C 并反向核对",
      text: "在括号内补上任意常数 C，求导检查负号与 3 是否同时消掉，再对照参考解答。",
      formula: math`d\!\left(-\frac{1}{3}e^{-3x}+C\right)=\;?`,
    },
  ],

  "jc935-2-5-4-7": [
    {
      change: "写出算术平方根 √x 的微分",
      text: "当 x>0 时 (√x)′=1/(2√x)，直接求微分会带有分母 2。",
      formula: math`d(\sqrt{x})=\frac{1}{2\sqrt{x}}\,dx`,
    },
    {
      change: "两边同乘 2 凑出单位根式微分",
      text: "把常数 2 放进微分号内消去分母 2，得到 d(2√x)=dx/√x。",
      formula: math`d(2\sqrt{x})=\frac{1}{\sqrt{x}}\,dx`,
    },
    {
      change: "两边同乘 3 并补上任意常数 C",
      text: "把 d(2√x)=dx/√x 两边同乘 3 凑出 (3/√x)dx，系数 2×3=6，再补上任意常数 C。请写出完整等式并检验，再对照参考解答。",
      formula: math`d(6\sqrt{x}+C)=\;?`,
    },
  ],

  "jc935-2-5-4-8": [
    {
      change: "先求 d(tan 4x) 找多余系数",
      text: "在 cos(4x)≠0 处，(tan u)′=sec²u，由链式法则得 d(tan 4x)=4sec²(4x)dx，多出因子 4。",
      formula: math`d(\tan 4x)=4\sec^2(4x)\,dx`,
    },
    {
      change: "两边同除以 4 配出 sec²(4x)dx",
      text: "把常数 1/4 放进微分号内消掉系数 4，右边即化为目标式 sec²(4x)dx。",
      formula: math`d\!\left(\frac{1}{4}\tan 4x\right)=\sec^2(4x)\,dx`,
    },
    {
      change: "补上任意常数 C 并反向求导核对",
      text: "在括号内补上任意常数 C。请写出完整微分等式并求导检验，再对照参考解答。",
      formula: math`d\!\left(\frac{1}{4}\tan 4x+C\right)=\;?`,
    },
  ],

  "jc935-2-5-5": [
    {
      change: "展开括号并认清自变量与常数",
      text: "跨度 L 固定不变，只有拱高 h 在变化。先展开括号并约去一个 L，把 s 写成关于 h 的二次多项式。",
      formula: math`s=L+\frac{8h^2}{3L}\quad (L\text{ const})`,
    },
    {
      change: "对拱高 h 求导得变化率 ds/dh",
      text: "常数 L 的导数为 0，第二项把 8/(3L) 当常数系数保留，仅对 h² 求导得 2h。",
      formula: math`\frac{ds}{dh}=0+\frac{8}{3L}\cdot 2h=\frac{16h}{3L}`,
    },
    {
      change: "用微分 ds 近似弧长变化 Δs",
      text: "当 Δh 很小时，利用 Δs≈ds=(ds/dh)Δh 即可写出弧长变化量的一阶近似，请整理后对照参考解答。",
      formula: math`\Delta s\approx\frac{ds}{dh}\,\Delta h=\;?`,
    },
  ],

  "jc935-2-5-6-1": [
    {
      change: "固定半径 R 写出面积微分 dS",
      text: "扇形面积 S=(1/2)R²α 中 R 为常数、α 为变量，对 α 求微分得 dS=(1/2)R²Δα（注意 S 对 α 本身是线性的）。",
      formula: math`\begin{gathered}
        S=\frac{1}{2}R^2\alpha\\[4pt]
        \Delta S\approx dS=\frac{1}{2}R^2\Delta\alpha
      \end{gathered}`,
    },
    {
      change: "把 −20′ 换算成弧度",
      text: "弧长与扇形面积公式必须使用弧度制。1°=60′，故 20′=(1/3)°，再乘 π/180 换算为弧度，注意“减少”对应负号。",
      formula: math`\begin{gathered}
        \Delta\alpha=-20'=-\frac{1}{3}^\circ\\[4pt]
        =-\frac{1}{3}\cdot\frac{\pi}{180}=-\frac{\pi}{540}
      \end{gathered}`,
    },
    {
      change: "代入 R=60 与 Δα 算出面积变化",
      text: "把 R=60 cm 与 Δα=−π/540 代入 dS。请先约分算出含 π 的精确值，再求两位小数近似值（带上单位 cm²），最后对照参考解答。",
      formula: math`\begin{gathered}
        \Delta S\approx\frac{1}{2}\cdot 60^2\cdot\left(-\frac{\pi}{540}\right)\\[4pt]
        =1800\cdot\left(-\frac{\pi}{540}\right)=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-5-6-2": [
    {
      change: "固定圆心角 α 对半径 R 求微分",
      text: "圆心角 α 不变、半径 R 变化，对 S=(1/2)αR² 关于 R 求导得 dS/dR=αR，因此 ΔS≈dS=αRΔR。",
      formula: math`\begin{gathered}
        \frac{dS}{dR}=\alpha R\\[4pt]
        \Delta S\approx dS=\alpha R\Delta R
      \end{gathered}`,
    },
    {
      change: "将 α=45° 换算为弧度",
      text: "先把圆心角 α=45° 换成弧度 π/4，再列出已知量 R=60 cm、ΔR=0.5 cm。",
      formula: math`\begin{gathered}
        \alpha=45^\circ=\frac{\pi}{4}\\[4pt]
        R=60\;\text{cm},\quad \Delta R=0.5\;\text{cm}
      \end{gathered}`,
    },
    {
      change: "代入数值算出含 π 与小数近似",
      text: "把 α、R、ΔR 代入 dS=αRΔR。请先化简成含 π 的分数，再估算成两位小数（单位 cm²），最后对照参考解答。",
      formula: math`\Delta S\approx\frac{\pi}{4}\cdot 60\cdot 0.5=\;?`,
    },
  ],

  "jc935-2-5-7-1": [
    {
      change: "选基准点 30° 并全部换成弧度",
      text: "取 f(x)=sin x，找离 31° 最近的特殊角 x₀=30°=π/6，增量 Δx=1°=π/180。三角求导公式只在弧度制下成立，必须换弧度。",
      formula: math`\begin{gathered}
        f(x)=\sin x\\[4pt]
        x_0=\frac{\pi}{6},\quad \Delta x=\frac{\pi}{180}
      \end{gathered}`,
    },
    {
      change: "算出基准点的函数值与导数值",
      text: "f′(x)=cos x，分别算出基准点 x₀=π/6 处的正弦值与余弦值。",
      formula: math`\begin{gathered}
        f\!\left(\frac{\pi}{6}\right)=\sin\frac{\pi}{6}=\frac{1}{2}\\[4pt]
        f'\!\left(\frac{\pi}{6}\right)=\cos\frac{\pi}{6}=\frac{\sqrt{3}}{2}
      \end{gathered}`,
    },
    {
      change: "代入线性近似公式并计算小数",
      text: "代入 f(x₀+Δx)≈f(x₀)+f′(x₀)Δx。请化简含 π 的精确式并算到五位小数，再对照参考解答。",
      formula: math`\sin 31^\circ\approx\frac{1}{2}+\frac{\sqrt{3}}{2}\cdot\frac{\pi}{180}=\;?`,
    },
  ],

  "jc935-2-5-7-2": [
    {
      change: "选基准点 120° 并换成弧度",
      text: "取 f(x)=tan x，最近的特殊角是 x₀=120°=2π/3，增量 Δx=1°=π/180。",
      formula: math`\begin{gathered}
        f(x)=\tan x\\[4pt]
        x_0=\frac{2\pi}{3},\quad \Delta x=\frac{\pi}{180}
      \end{gathered}`,
    },
    {
      change: "算出 120° 处的函数值与导数",
      text: "第二象限正切为负：tan(2π/3)=−√3。又 f′(x)=sec²x=1/cos²x，因 cos(2π/3)=−1/2，平方后得导数 4。",
      formula: math`\begin{gathered}
        f\!\left(\frac{2\pi}{3}\right)=-\sqrt{3}\\[4pt]
        f'\!\left(\frac{2\pi}{3}\right)=\frac{1}{(-1/2)^2}=4
      \end{gathered}`,
    },
    {
      change: "代入线性近似公式并求五位小数",
      text: "代入 tan x₀+sec²(x₀)Δx 并约分 4/180。请化简含 π 的式子并算出近似小数（保留五位小数），再对照参考解答。",
      formula: math`\tan 121^\circ\approx -\sqrt{3}+4\cdot\frac{\pi}{180}=\;?`,
    },
  ],

  "jc935-2-5-8-1": [
    {
      change: "选定基准点 x₀=0.5 与负增量",
      text: "设 f(x)=arcsin x，0.4997 最接近熟悉点 x₀=0.5=1/2，增量 Δx=0.4997−0.5=−0.0003，注意负号不能丢。",
      formula: math`\begin{gathered}
        f(x)=\arcsin x\\[4pt]
        x_0=\frac{1}{2},\quad \Delta x=-0.0003
      \end{gathered}`,
    },
    {
      change: "算出基准值与导数值",
      text: "arcsin(1/2)=π/6；由 f′(x)=1/√(1−x²)，代入 x₀=1/2 得 1/√(3/4)=2/√3。",
      formula: math`\begin{gathered}
        f\!\left(\frac{1}{2}\right)=\frac{\pi}{6}\\[4pt]
        f'\!\left(\frac{1}{2}\right)=\frac{1}{\sqrt{1-1/4}}=\frac{2}{\sqrt{3}}
      \end{gathered}`,
    },
    {
      change: "代入线性近似公式并有理化",
      text: "代入 f(x₀)+f′(x₀)Δx，把 −0.0003 写成 −3/10000 便于与 2/√3 约分有理化。请化简并算出最终小数（保留五位小数），再对照参考解答。",
      formula: math`\begin{gathered}
        \arcsin 0.4997\\[4pt]
        \approx\frac{\pi}{6}+\frac{2}{\sqrt{3}}\left(-\frac{3}{10000}\right)=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-5-8-2": [
    {
      change: "选基准点 x₀=−0.5 与正增量",
      text: "设 f(x)=arccos x，−0.4994 比 −0.5 略大，因此取 x₀=−0.5、增量 Δx=−0.4994−(−0.5)=+0.0006。",
      formula: math`\begin{gathered}
        f(x)=\arccos x\\[4pt]
        x_0=-\frac{1}{2},\quad \Delta x=0.0006
      \end{gathered}`,
    },
    {
      change: "算出基准值与负导数值",
      text: "arccos 值域在 [0,π]，故 arccos(−1/2)=2π/3；反余弦导数自带负号 f′(x)=−1/√(1−x²)，代入 x₀=−1/2 得 −2/√3。",
      formula: math`\begin{gathered}
        f\!\left(-\frac{1}{2}\right)=\frac{2\pi}{3}\\[4pt]
        f'\!\left(-\frac{1}{2}\right)=-\frac{1}{\sqrt{1-1/4}}=-\frac{2}{\sqrt{3}}
      \end{gathered}`,
    },
    {
      change: "代入线性近似公式并有理化",
      text: "把 0.0006 写成 6/10000 与 −2/√3 相乘化简。请完成约分有理化与小数计算（保留五位小数），再对照参考解答。",
      formula: math`\begin{gathered}
        \arccos(-0.4994)\\[4pt]
        \approx\frac{2\pi}{3}-\frac{2}{\sqrt{3}}\cdot\frac{6}{10000}=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-5-9-1": [
    {
      change: "构造 f(x)=sin(2x) 算零点值与导数",
      text: "设 f(x)=sin(2x)，在基准点 x₀=0 处算 f(0)=0；按链式法则求导得 f′(x)=2cos(2x)，故 f′(0)=2。",
      formula: math`\begin{gathered}
        f(x)=\sin(2x),\quad f(0)=0\\[4pt]
        f'(x)=2\cos(2x),\quad f'(0)=2
      \end{gathered}`,
    },
    {
      change: "由零点线性近似证得 sin(2x)≈2x",
      text: "当 |x| 很小时，代入一阶线性近似 f(x)≈f(0)+f′(0)x，立即证得近似公式 sin(2x)≈2x。",
      formula: math`\begin{gathered}
        \sin(2x)\approx f(0)+f'(0)x\\[4pt]
        =0+2x=2x
      \end{gathered}`,
    },
    {
      change: "把 36′ 换算为弧度并对应到 2x",
      text: "将 36′ 换成度数 36/60=0.6°，再乘 π/180 换算为弧度 π/300。注意公式里自变量整体是 2x=36′（即 x=18′=π/600）。",
      formula: math`\begin{gathered}
        2x=36'=0.6^\circ\\[4pt]
        =0.6\cdot\frac{\pi}{180}=\frac{\pi}{300}
      \end{gathered}`,
    },
    {
      change: "代回近似公式求五位小数",
      text: "直接把 2x=π/300 代入 sin(2x)≈2x。请写出证明结论并算出五位小数近似值，再对照参考解答。",
      formula: math`\sin 36'\approx\frac{\pi}{300}\approx\;?`,
    },
  ],

  "jc935-2-5-9-2": [
    {
      change: "设 f(x)=ln(1+2x) 算 f(0) 与 f′(0)",
      text: "取基准点 x₀=0，有 f(0)=ln 1=0；按链式法则求导得 f′(x)=2/(1+2x)，代入 x=0 得 f′(0)=2。",
      formula: math`\begin{gathered}
        f(x)=\ln(1+2x),\quad f(0)=0\\[4pt]
        f'(x)=\frac{2}{1+2x},\quad f'(0)=2
      \end{gathered}`,
    },
    {
      change: "套用零点线性近似证得公式",
      text: "当 |x| 很小时，由 f(x)≈f(0)+f′(0)x 即证得 ln(1+2x)≈2x。",
      formula: math`\ln(1+2x)\approx 0+2x=2x`,
    },
    {
      change: "令 1+2x=1.006 解出 x 并估算",
      text: "对照 ln 1.006 与 ln(1+2x)，解得 2x=0.006（即 x=0.003，满足 |x| 很小）。请代入公式写出证明与估算结果，再对照参考解答。",
      formula: math`\begin{gathered}
        1+2x=1.006\implies x=0.003\\[4pt]
        \ln 1.006\approx 2\times 0.003=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-5-9-3": [
    {
      change: "改写为幂形式并算零点函数值",
      text: "设 f(x)=(1−x)^(1/n)（n 为正整数）。在 x₀=0 附近 1−x>0，先算出 f(0)=1^(1/n)=1。",
      formula: math`\begin{gathered}
        f(x)=(1-x)^{1/n}\\[4pt]
        f(0)=1^{1/n}=1
      \end{gathered}`,
    },
    {
      change: "按链式法则求导并算 f′(0)",
      text: "外层幂函数求导出系数 1/n，内层 (1−x)′=−1 给出负号，切记不要漏掉。再令 x=0 得 f′(0)=−1/n。",
      formula: math`\begin{gathered}
        f'(x)=\frac{1}{n}(1-x)^{\frac{1}{n}-1}\cdot(-1)\\[4pt]
        f'(0)=-\frac{1}{n}
      \end{gathered}`,
    },
    {
      change: "代入零点线性近似完成证明",
      text: "把 f(0) 与 f′(0) 代入一阶线性近似 f(x)≈f(0)+f′(0)x，请写出最终近似公式并对照参考解答。",
      formula: math`\begin{gathered}
        \sqrt[n]{1-x}\approx f(0)+f'(0)x\\[4pt]
        =1+\left(-\frac{1}{n}\right)x=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-5-9-4": [
    {
      change: "设 f(x)=e^(kx) 并算零点函数值",
      text: "取基准点 x₀=0，先算出 f(0)=e⁰=1（注意 e⁰=1，不是 0）。",
      formula: math`\begin{gathered}
        f(x)=e^{kx}\\[4pt]
        f(0)=e^0=1
      \end{gathered}`,
    },
    {
      change: "用链式法则求导并算 f′(0)",
      text: "对 e^(kx) 求导需乘内层系数 k，得 f′(x)=ke^(kx)，代入 x=0 得斜率 f′(0)=k。",
      formula: math`\begin{gathered}
        f'(x)=ke^{kx}\\[4pt]
        f'(0)=ke^0=k
      \end{gathered}`,
    },
    {
      change: "代入零点线性近似得出结论",
      text: "当 |x| 很小时，将 f(0)=1、f′(0)=k 代入 f(x)≈f(0)+f′(0)x。请写出完整证明结论再对照参考解答。",
      formula: math`e^{kx}\approx f(0)+f'(0)x=\;?`,
    },
  ],

  "jc935-2-5-10-1": [
    {
      change: "提取最接近的完全立方数 125",
      text: "124 最接近 5³=125。把 125 从立方根里提出来变成 5，里面就化成 (1−1/125)^(1/3)，确保偏差 1/125 很小。",
      formula: math`\begin{gathered}
        \sqrt[3]{124}=\sqrt[3]{125-1}\\[4pt]
        =5\left(1-\frac{1}{125}\right)^{1/3}
      \end{gathered}`,
    },
    {
      change: "套用根式一阶近似公式",
      text: "利用 (1−x)^(1/3)≈1−x/3（这里 x=1/125 很小），先把括号内展开成一次近似，外面的 5 暂保留。",
      formula: math`\begin{gathered}
        \left(1-\frac{1}{125}\right)^{1/3}\approx 1-\frac{1}{3\times 125}\\[4pt]
        \sqrt[3]{124}\approx 5\left(1-\frac{1}{375}\right)
      \end{gathered}`,
    },
    {
      change: "乘进系数 5 并算出分数与小数",
      text: "把 5 乘进括号得 5−1/75。请通分成最简分数，再算到五位小数，最后对照参考解答。",
      formula: math`\sqrt[3]{124}\approx 5-\frac{1}{75}=\;?`,
    },
  ],

  "jc935-2-5-10-2": [
    {
      change: "提取最接近的四次方数 81",
      text: "82 最接近 3⁴=81。把 81 提出四次根号得 3（注意不是 9），把原式改写成 3(1+1/81)^(1/4)。",
      formula: math`\begin{gathered}
        \sqrt[4]{82}=\sqrt[4]{81+1}\\[4pt]
        =3\left(1+\frac{1}{81}\right)^{1/4}
      \end{gathered}`,
    },
    {
      change: "套用四次根式一阶近似",
      text: "利用 (1+x)^(1/4)≈1+x/4（其中 x=1/81 很小），替换括号内的根式，外面的 3 保持不动。",
      formula: math`\begin{gathered}
        \left(1+\frac{1}{81}\right)^{1/4}\approx 1+\frac{1}{4\times 81}\\[4pt]
        \sqrt[4]{82}\approx 3\left(1+\frac{1}{324}\right)
      \end{gathered}`,
    },
    {
      change: "乘进系数 3 并算出分数与小数",
      text: "把 3 乘进括号约分得 3+1/108。请通分成最简分数并保留五位小数，再对照参考解答。",
      formula: math`\sqrt[4]{82}\approx 3+\frac{1}{108}=\;?`,
    },
  ],

  "jc935-2-5-11": [
    {
      change: "对容积公式求微分 dV",
      text: "把 V=(2/3)πr³ 对半径 r 求导得 dV/dr=2πr²，因此容积的绝对误差可用微分近似为 dV=2πr²Δr。",
      formula: math`\begin{gathered}
        V=\frac{2}{3}\pi r^3\\[4pt]
        dV=2\pi r^2\Delta r
      \end{gathered}`,
    },
    {
      change: "化简相对误差 |dV/V|",
      text: "用 dV 除以 V 并取绝对值（r>0），π 与 r² 全部约掉，只剩下半径相对误差的 3 倍。",
      formula: math`\begin{gathered}
        \left|\frac{dV}{V}\right|=\frac{2\pi r^2|\Delta r|}{\frac{2}{3}\pi r^3}\\[4pt]
        =3\left|\frac{\Delta r}{r}\right|
      \end{gathered}`,
    },
    {
      change: "代入上限 1.5% 解出半径相对误差",
      text: "令 3|Δr/r|≤1.5%，两边同除以 3 即可得到测量半径 r 的相对误差上限，请写出最终不等式再对照参考解答。",
      formula: math`3\left|\frac{\Delta r}{r}\right|\le 1.5\%\implies\left|\frac{\Delta r}{r}\right|\le\;?`,
    },
  ],

  "jc935-2-5-12": [
    {
      change: "对 α=2arcsin(l/(2R)) 关于 l 求导",
      text: "半径 R 为常数，把 u=l/(2R) 作为内层函数按链式法则求导，因子 2 与内层 1/(2R) 约去 2，只剩 1/R。",
      formula: math`\begin{gathered}
        \frac{d\alpha}{dl}=2\cdot\frac{1}{\sqrt{1-\left(\frac{l}{2R}\right)^2}}\cdot\frac{1}{2R}\\[4pt]
        =\frac{1}{R\sqrt{1-\left(\frac{l}{2R}\right)^2}}
      \end{gathered}`,
    },
    {
      change: "代入 α=60° 算出分母里的根式",
      text: "由弦长关系 l/(2R)=sin(α/2)，在 α=60° 时 sin 30°=1/2，因此 √[1−(1/2)²]=√3/2，再代入 R=150 mm。",
      formula: math`\begin{gathered}
        \frac{l}{2R}=\sin 30^\circ=\frac{1}{2}\\[4pt]
        \frac{d\alpha}{dl}=\frac{1}{150\cdot\frac{\sqrt{3}}{2}}=\frac{\sqrt{3}}{225}
      \end{gathered}`,
    },
    {
      change: "乘以弦长误差 δ_l 算角度误差",
      text: "利用误差传播公式 δ_α=|dα/dl|·δ_l，把 δ_l=0.15=3/20 mm 代入。请约分写出含 √3 的精确弧度值及五位小数近似值，再对照参考解答。",
      formula: math`\delta_\alpha=\frac{\sqrt{3}}{225}\times\frac{3}{20}=\;?`,
    },
  ],
};

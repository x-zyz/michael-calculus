import type { GuidedHint } from "../learning";

const math = String.raw;

export const ch2Sec2aGuidedHints: Record<string, GuidedHint[]> = {
  "jc935-2-2-1-1": [
    {
      change: "把余切改写成余弦除以正弦",
      text: "记内层 u=3x+1。在 sin u≠0 的点上，把陌生的余切改写成余弦与正弦的商，方便直接套用商法则。",
      formula: math`\begin{gathered}
        u=3x+1,\quad \sin u\ne 0\\[4pt]
        y=\cot u=\frac{\cos u}{\sin u}
      \end{gathered}`,
    },
    {
      change: "对中间变量 u 套用商法则",
      text: "先把 u 当作自变量，对 cos u / sin u 用商法则 (f/g)′=(f′g−fg′)/g²，其中 (cos u)′=−sin u、(sin u)′=cos u。",
      formula: math`\begin{gathered}
        \frac{dy}{du}=\\[4pt]
        \frac{(-\sin u)\sin u-\cos u\cos u}{\sin^2 u}
      \end{gathered}`,
    },
    {
      change: "用平方和公式化简分子",
      text: "分子提取负号后出现 sin²u+cos²u=1，整个分式立刻化简为 −1/sin²u，也就是 −csc²u。",
      formula: math`\begin{gathered}
        \frac{dy}{du}=\frac{-(\sin^2 u+\cos^2 u)}{\sin^2 u}\\[4pt]
        =-\frac{1}{\sin^2 u}=-\csc^2 u
      \end{gathered}`,
    },
    {
      change: "乘以内层导数并回代 3x+1",
      text: "由链式法则 y′=(dy/du)·u′，内层 u=3x+1 的导数是 3。请把两项相乘并把 u 换回 3x+1，同时注明可导条件 sin(3x+1)≠0，再对照参考解答。",
      formula: math`\begin{gathered}
        u'=(3x+1)'=3\\[4pt]
        y'=(-\csc^2 u)\cdot 3\Big|_{u=3x+1}=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-2-1-2": [
    {
      change: "把余割改写成正弦的倒数",
      text: "记内层 u=2x−1。在 sin u≠0 处，把 csc u 改写成 1/sin u，准备套用倒数求导公式。",
      formula: math`\begin{gathered}
        u=2x-1,\quad \sin u\ne 0\\[4pt]
        y=\csc u=\frac{1}{\sin u}
      \end{gathered}`,
    },
    {
      change: "对 u 套用倒数求导公式",
      text: "利用 (1/g)′=−g′/g²，这里 g(u)=sin u、g′(u)=cos u，注意倒数求导自带负号。",
      formula: math`\frac{dy}{du}=-\frac{\cos u}{\sin^2 u}`,
    },
    {
      change: "把分式拆成余割乘余切",
      text: "把分母 sin²u 拆成 sin u·sin u，分成 −(1/sin u)(cos u/sin u)，就能改写成更紧凑的 −csc u·cot u。",
      formula: math`\begin{gathered}
        \frac{dy}{du}=-\frac{1}{\sin u}\cdot\frac{\cos u}{\sin u}\\[4pt]
        =-\csc u\cot u
      \end{gathered}`,
    },
    {
      change: "乘以内层导数并回代 2x−1",
      text: "内层 u=2x−1 的导数是 2。请按链式法则把 dy/du 与 u′ 相乘、把 u 换回 2x−1，并注明 sin(2x−1)≠0，再对照参考解答。",
      formula: math`\begin{gathered}
        u'=(2x-1)'=2\\[4pt]
        y'=(-\csc u\cot u)\cdot 2\Big|_{u=2x-1}=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-2-2-1": [
    {
      change: "把分式项改写成负整数幂",
      text: "在定义域 x≠0 内，把 5/x³ 写成 5x⁻³，把 −4/x 写成 −4x⁻¹，这样四项就能统一套用幂函数求导法则。",
      formula: math`y=2x^4+5x^{-3}-4x^{-1}+9`,
    },
    {
      change: "逐项套用幂函数与常数法则",
      text: "线性组合可以逐项求导，常数 9 的导数为 0。注意负指数求导后指数还要再减 1：−3−1=−4，−1−1=−2。",
      formula: math`\begin{gathered}
        y'=2\cdot 4x^3+5(-3)x^{-4}\\[4pt]
        -4(-1)x^{-2}+0
      \end{gathered}`,
    },
    {
      change: "算清符号并把负幂改回分式",
      text: "算出每项系数（注意 −4×(−1) 负负得正），再把 x⁻⁴、x⁻² 改回分式形式并注明 x≠0，最后对照参考解答。",
      formula: math`y'=8x^3-15x^{-4}+4x^{-2}=\;?`,
    },
  ],

  "jc935-2-2-2-2": [
    {
      change: "分清幂函数与指数函数",
      text: "先辨认自变量 x 的位置：第一项 4x³ 是幂函数（x 在底数），后两项 3ˣ 和 eˣ 是指数函数（x 在指数），不能混用公式。",
      formula: math`y=\underbrace{4x^3}_{\text{幂}}-\underbrace{3^x}_{\text{指数}}+\underbrace{2e^x}_{\text{指数}}`,
    },
    {
      change: "分别写出三项的导数",
      text: "第一项用 (xⁿ)′=nxⁿ⁻¹ 得 12x²；第二项用 (aˣ)′=aˣ ln a 得 3ˣ ln 3；第三项 (eˣ)′=eˣ 保持不变。",
      formula: math`\begin{gathered}
        (4x^3)'=12x^2\\[4pt]
        (3^x)'=3^x\ln 3,\quad (2e^x)'=2e^x
      \end{gathered}`,
    },
    {
      change: "按原式正负号线性合并",
      text: "请按原式的“第一项减第二项加第三项”把上面三个导数拼在一起，写出完整导函数 y′，再对照参考解答。",
      formula: math`y'=(4x^3)'-(3^x)'+(2e^x)'=\;?`,
    },
  ],

  "jc935-2-2-2-3": [
    {
      change: "确认可导范围并拆成三项",
      text: "tan x 和 sec x 的分母都是 cos x，因此只在 cos x≠0 处可导。原式是线性组合，可以对三项分别求导。",
      formula: math`\begin{gathered}
        \cos x\ne 0\\[4pt]
        y'=3(\tan x)'-2(\sec x)'+(7)'
      \end{gathered}`,
    },
    {
      change: "分别套用基本三角导数公式",
      text: "代入 (tan x)′=sec²x、(sec x)′=sec x tan x，以及常数 (7)′=0，前面的系数 3 和 −2 保持不动。",
      formula: math`\begin{gathered}
        y'=3(\sec^2 x)\\[4pt]
        -2(\sec x\tan x)+0
      \end{gathered}`,
    },
    {
      change: "去掉零项并写出最终导数",
      text: "请去掉末尾的 +0，整理出最终导数并注明 cos x≠0，再对照参考解答。",
      formula: math`y'=3\sec^2 x-2\sec x\tan x+0=\;?`,
    },
  ],

  "jc935-2-2-2-4": [
    {
      change: "用二倍角公式合并乘积",
      text: "因为 sin(2x)=2sin x cos x，所以 sin x cos x = (1/2)sin(2x)。先把乘积合成单个正弦函数，求导更省事。",
      formula: math`y=\frac{3}{2}\sin(2x)`,
    },
    {
      change: "外层正弦求导并保留内层 2x",
      text: "把 2x 看作内层，外层 sin(2x) 求导得 cos(2x)，前面系数 3/2 照抄，再乘以内层导数 (2x)′。",
      formula: math`y'=\frac{3}{2}\cos(2x)\cdot(2x)'`,
    },
    {
      change: "乘出内层导数 2 并约分",
      text: "内层 (2x)′=2。请把 3/2 与 2 相乘约分，得到单个三角函数形式的导数，再对照参考解答。",
      formula: math`y'=\frac{3}{2}\cos(2x)\cdot 2=\;?`,
    },
  ],

  "jc935-2-2-2-5": [
    {
      change: "按乘积法则拆成两项之和",
      text: "定义域为 x>0。把 x³ 和 ln x 看作两个因子，套用乘积法则 (uv)′=u′v+uv′，轮流对其中一个求导。",
      formula: math`y'=(x^3)'\ln x+x^3(\ln x)'`,
    },
    {
      change: "分别代入两个因子的导数",
      text: "代入 (x³)′=3x² 和 (ln x)′=1/x，然后化简第二项的乘积 x³·(1/x)=x²（因为 x>0）。",
      formula: math`\begin{gathered}
        y'=3x^2\ln x+x^3\cdot\frac{1}{x}\\[4pt]
        =3x^2\ln x+x^2
      \end{gathered}`,
    },
    {
      change: "提取公共因子 x²",
      text: "两项都含有公因式 x²。请把 x² 提到括号外面完成化简，并注明定义域 x>0，再对照参考解答。",
      formula: math`y'=x^2(\;?)`,
    },
  ],

  "jc935-2-2-2-6": [
    {
      change: "按乘积法则写成两项之和",
      text: "把 2eˣ 与 sin x 看作两个相乘的因子，套用 (uv)′=u′v+uv′，先展开结构再分别求导。",
      formula: math`y'=(2e^x)'\sin x+2e^x(\sin x)'`,
    },
    {
      change: "分别算出两项的导数",
      text: "指数函数求导不变：(2eˣ)′=2eˣ；正弦求导变余弦：(sin x)′=cos x。代回后两项都带着 2eˣ。",
      formula: math`y'=2e^x\sin x+2e^x\cos x`,
    },
    {
      change: "提取公共因子 2eˣ",
      text: "请把两项共同的 2eˣ 提到括号外面，整理出最终导数，再对照参考解答。",
      formula: math`y'=2e^x(\;?)`,
    },
  ],

  "jc935-2-2-2-7": [
    {
      change: "按商法则写出分子与分母",
      text: "在定义域 x>0 内，令分子 u=ln x、分母 v=x²，套用 (u/v)′=(u′v−uv′)/v²，注意分母变成 (x²)²=x⁴。",
      formula: math`y'=\frac{(\ln x)'x^2-\ln x(x^2)'}{(x^2)^2}`,
    },
    {
      change: "代入导数并化简分子第一项",
      text: "代入 (ln x)′=1/x 与 (x²)′=2x，其中 (1/x)·x²=x，分母写成 x⁴。",
      formula: math`\begin{gathered}
        y'=\frac{\frac{1}{x}\cdot x^2-2x\ln x}{x^4}\\[4pt]
        =\frac{x-2x\ln x}{x^4}
      \end{gathered}`,
    },
    {
      change: "分子提 x 并与分母约分",
      text: "分子提取公因式 x 得到 x(1−2ln x)。因为 x>0 不为零，请上下同约去一个 x 写出最简分式，再对照参考解答。",
      formula: math`y'=\frac{x(1-2\ln x)}{x^4}=\;?`,
    },
  ],

  "jc935-2-2-2-8": [
    {
      change: "先确认常数 ln 5 导数为 0",
      text: "ln 5 不含自变量 x，是一个固定常数，它的导数是 0（不是 1/5）。接下来只需在 x≠0 处对 eˣ/x³ 求导。",
      formula: math`y'=\left(\frac{e^x}{x^3}\right)'+0`,
    },
    {
      change: "对 eˣ/x³ 套用商法则",
      text: "令 u=eˣ、v=x³，按 (u/v)′=(u′v−uv′)/v² 展开，分母为 (x³)²=x⁶。",
      formula: math`\begin{gathered}
        y'=\frac{(e^x)'x^3-e^x(x^3)'}{(x^3)^2}\\[4pt]
        =\frac{e^x x^3-3x^2 e^x}{x^6}
      \end{gathered}`,
    },
    {
      change: "分子提取公因式 x²eˣ",
      text: "分子两项都含有 x²eˣ，先把公因式提出来，方便下一步和分母的 x⁶ 约分。",
      formula: math`y'=\frac{x^2 e^x(x-3)}{x^6}`,
    },
    {
      change: "在 x≠0 时上下约去 x²",
      text: "在定义域 x≠0 内 x²≠0，可以合法约去分子分母的 x²。请写出约分后的结果并注明 x≠0，再对照参考解答。",
      formula: math`y'=\frac{x^2 e^x(x-3)}{x^6}=\;?`,
    },
  ],

  "jc935-2-2-2-9": [
    {
      change: "套用三因子乘积法则",
      text: "在定义域 x>0 内，三个因子相乘时每次只对其中一个求导、另外两个照抄，再把三项加起来。",
      formula: math`\begin{gathered}
        y'=(x)'\ln x\sin x\\[4pt]
        +x(\ln x)'\sin x+x\ln x(\sin x)'
      \end{gathered}`,
    },
    {
      change: "代入三个因子的导数并约分",
      text: "代入 (x)′=1、(ln x)′=1/x、(sin x)′=cos x。第二项中 x·(1/x)=1（x>0），直接化简成 sin x。",
      formula: math`\begin{gathered}
        y'=\ln x\sin x+\sin x\\[4pt]
        +x\ln x\cos x
      \end{gathered}`,
    },
    {
      change: "合并前两项的公因式 sin x",
      text: "前两项都带有 sin x。请把 sin x 提出来合并前两项，并注明定义域 x>0，再对照参考解答。",
      formula: math`\begin{gathered}
        y'=(\;?\;)\sin x\\[4pt]
        +x\ln x\cos x
      \end{gathered}`,
    },
  ],

  "jc935-2-2-2-10": [
    {
      change: "先求分子与分母各自的导数",
      text: "因为 |cos x|≤1，分母 2+cos x≥1>0 对全体实数恒正。先分别算出分子和分母的导数，注意 (cos x)′ 带负号。",
      formula: math`\begin{gathered}
        (2+\sin x)'=\cos x\\[4pt]
        (2+\cos x)'=-\sin x
      \end{gathered}`,
    },
    {
      change: "代入商法则并处理负负得正",
      text: "套用 (u/v)′=(u′v−uv′)/v²。商法则自带减号，乘上分母导数 −sin x 后负负得正，分母保持 (2+cos x)²。",
      formula: math`\begin{gathered}
        y'=\frac{\cos x(2+\cos x)}{(2+\cos x)^2}\\[4pt]
        +\frac{(2+\sin x)\sin x}{(2+\cos x)^2}
      \end{gathered}`,
    },
    {
      change: "展开分子并归拢平方项",
      text: "把分子合并到同一个分母下并展开括号，正好把 cos²x 和 sin²x 凑到了一起。",
      formula: math`\begin{gathered}
        \text{分子}=2\cos x+\cos^2 x\\
        +2\sin x+\sin^2 x\\[4pt]
        \text{分母}=(2+\cos x)^2
      \end{gathered}`,
    },
    {
      change: "用平方和公式替换 cos²x+sin²x",
      text: "利用恒等式 cos²x+sin²x=1。请把分子里的平方和换成 1 并整理顺序，再对照参考解答。",
      formula: math`\begin{gathered}
        \cos^2 x+\sin^2 x=1\\[4pt]
        y'=\frac{2\cos x+2\sin x+\;?}{(2+\cos x)^2}
      \end{gathered}`,
    },
  ],

  "jc935-2-2-3-1": [
    {
      change: "先求出通用的导函数 y′(x)",
      text: "求某一点的导数必须先求导函数再代点，不能先代点。逐项求导得 (2sin x)′=2cos x、(cos x)′=−sin x。",
      formula: math`y'(x)=2\cos x-\sin x`,
    },
    {
      change: "把 x=0 代入导函数",
      text: "把 x=0 代进 y′(x)=2cos x−sin x，利用 cos 0=1、sin 0=0 写出算式。",
      formula: math`y'(0)=2\cos 0-\sin 0=2\cdot 1-0`,
    },
    {
      change: "再把 x=π/3 代入并算出两值",
      text: "把 x=π/3 代进同一个导函数，记住 cos(π/3)=1/2、sin(π/3)=√3/2。请算出这两个导数值，再对照参考解答。",
      formula: math`\begin{gathered}
        y'(0)=2\cdot 1-0=\;?\\[4pt]
        y'\!\left(\frac{\pi}{3}\right)=2\cdot\frac{1}{2}-\frac{\sqrt{3}}{2}=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-2-3-2": [
    {
      change: "对 θsin θ 套用乘积法则",
      text: "这里自变量是 θ。第一项 θsin θ 是两个含 θ 因子的乘积，按乘积法则求导得 1·sin θ+θcos θ。",
      formula: math`(\theta\sin\theta)'=\sin\theta+\theta\cos\theta`,
    },
    {
      change: "加上第二项导数并合并同类项",
      text: "第二项 (2cos θ)′=−2sin θ。把两部分相加，合并同类项 sin θ−2sin θ=−sin θ。",
      formula: math`\begin{gathered}
        \frac{d\rho}{d\theta}=\sin\theta+\theta\cos\theta-2\sin\theta\\[4pt]
        =\theta\cos\theta-\sin\theta
      \end{gathered}`,
    },
    {
      change: "代入 θ=π/2 计算导数值",
      text: "把 θ=π/2 代入化简后的导函数，利用 cos(π/2)=0、sin(π/2)=1。请算出最终数值，再对照参考解答。",
      formula: math`\left.\frac{d\rho}{d\theta}\right|_{\theta=\pi/2}=\frac{\pi}{2}\cdot 0-1=\;?`,
    },
  ],

  "jc935-2-2-3-3": [
    {
      change: "把第一项改写成负一次幂",
      text: "在 x≠6 处，把 4/(6−x) 写成 4(6−x)⁻¹，第二项写成 (1/4)x²，方便直接求导。",
      formula: math`f(x)=4(6-x)^{-1}+\frac{1}{4}x^2`,
    },
    {
      change: "逐项求导并抵消两个负号",
      text: "第一项外层导数是 −4(6−x)⁻²，乘以内层 (6−x)′=−1 后负负得正；第二项 (x²/4)′=x/2。",
      formula: math`\begin{gathered}
        f'(x)=-4(6-x)^{-2}(-1)+\frac{x}{2}\\[4pt]
        =\frac{4}{(6-x)^2}+\frac{x}{2}
      \end{gathered}`,
    },
    {
      change: "分别代入 x=0 和 x=2 计算",
      text: "把 x=0 与 x=2 依次代入 f′(x)。请完成这两组分数运算并约分，再对照参考解答。",
      formula: math`\begin{gathered}
        f'(0)=\frac{4}{6^2}+0=\;?\\[4pt]
        f'(2)=\frac{4}{4^2}+\frac{2}{2}=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-2-4-1": [
    {
      change: "明确速度是高度对时间的导数",
      text: "在物理上，竖直瞬时速度 v(t) 就是高度函数 s(t) 对时间 t 的一阶导数 ds/dt。",
      formula: math`\begin{gathered}
        v(t)=s'(t)\\[4pt]
        =\frac{d}{dt}\left(5+18t-\frac{9}{2}t^2\right)
      \end{gathered}`,
    },
    {
      change: "逐项对时间 t 求导",
      text: "常数 5 导数为 0，一次项 18t 导数为 18，二次项 −(9/2)t² 按幂函数法则求导得 −(9/2)·2t。",
      formula: math`v(t)=0+18-\frac{9}{2}\cdot 2t`,
    },
    {
      change: "约分整理并标明速度单位",
      text: "请把 −(9/2)·2t 约分整理，写出最终速度函数 v(t) 并加上单位 m/s，再对照参考解答。",
      formula: math`v(t)=18-\frac{9}{2}\cdot 2t=\;?`,
    },
  ],

  "jc935-2-2-4-2": [
    {
      change: "先写出竖直速度函数 v(t)",
      text: "对高度函数 s(t)=5+18t−(9/2)t² 求导，得到任意时刻的竖直速度 v(t)=18−9t。",
      formula: math`v(t)=s'(t)=18-9t`,
    },
    {
      change: "令速度为零列出方程",
      text: "小球飞到最高点那一瞬间刚好停止上升、准备下落，竖直速度为零，即 v(t)=0。",
      formula: math`18-9t=0`,
    },
    {
      change: "解出时刻并验证上升转下落",
      text: "请解出方程的时刻 t（带单位 s），并确认该时刻之前 v(t)>0（上升）、之后 v(t)<0（下落）且此时 s(t)>0 仍在空中，再对照参考解答。",
      formula: math`\begin{gathered}
        18-9t=0\Longrightarrow t=\;?\\[4pt]
        \text{检验：}s(t)>0\text{ 且 }v\text{ 由正变负}
      \end{gathered}`,
    },
  ],

  "jc935-2-2-5": [
    {
      change: "先代 x=0 求出切点坐标",
      text: "把 x=0 代入原曲线方程，算出 y(0)=2·0²+3sin 0=0，因此切点正好是原点 (0,0)。",
      formula: math`y(0)=2\cdot 0^2+3\sin 0=0`,
    },
    {
      change: "求导并代入 x=0 得切线斜率",
      text: "先求导函数 y′=4x+3cos x，再把 x=0 代入得到切线斜率 k=y′(0)=3。",
      formula: math`\begin{gathered}
        y'=4x+3\cos x\\[4pt]
        k=y'(0)=4\cdot 0+3\cos 0=3
      \end{gathered}`,
    },
    {
      change: "用负倒数写出法线斜率",
      text: "法线与切线在切点处垂直，因为切线斜率 k=3≠0，所以法线斜率为负倒数 k_⊥=−1/k。",
      formula: math`k_{\perp}=-\frac{1}{k}=-\frac{1}{3}`,
    },
    {
      change: "套用点斜式写出两条直线",
      text: "切线和法线都过点 (0,0)。请把斜率 3 和 −1/3 分别代入点斜式 y−0=m(x−0)，化简写出切线与法线方程，再对照参考解答。",
      formula: math`\begin{gathered}
        \text{切线：}y-0=3(x-0)\\[4pt]
        \text{法线：}y-0=-\frac{1}{3}(x-0)
      \end{gathered}`,
    },
  ],

  "jc935-2-2-6-1": [
    {
      change: "拆清外层五次幂和内层一次式",
      text: "令内层 u=3x−2，原函数就是外层幂函数 y=u⁵，两层复合清晰分开。",
      formula: math`u=3x-2,\quad y=u^5`,
    },
    {
      change: "分别求外层与内层的导数",
      text: "外层对 u 求导得 dy/du=5u⁴；内层对 x 求导得 u′=3。",
      formula: math`\frac{dy}{du}=5u^4,\quad u'=3`,
    },
    {
      change: "相乘并把 u 换回 3x−2",
      text: "按链式法则 y′=(dy/du)·u′ 把两项相乘并回代 u=3x−2。请算出最终系数，再对照参考解答。",
      formula: math`y'=5(3x-2)^4\cdot 3=\;?`,
    },
  ],

  "jc935-2-2-6-2": [
    {
      change: "拆清外层余弦和内层一次式",
      text: "令内层 u=5−4x，外层为 y=cos u。求导过程中括号里的角度 5−4x 原样保留，不要改动。",
      formula: math`u=5-4x,\quad y=\cos u`,
    },
    {
      change: "分别求外层与内层的导数",
      text: "外层 (cos u)′=−sin u 自带一个负号，内层 u′=(5−4x)′=−4 又带一个负号。",
      formula: math`\frac{dy}{du}=-\sin u,\quad u'=-4`,
    },
    {
      change: "相乘回代并处理负负得正",
      text: "按链式法则相乘并把 u 换回 5−4x。请把两个负号抵消并整理系数，再对照参考解答。",
      formula: math`y'=\bigl(-\sin(5-4x)\bigr)\cdot(-4)=\;?`,
    },
  ],

  "jc935-2-2-6-3": [
    {
      change: "拆清外层指数和内层二次式",
      text: "指数头上不是单纯的 x，而是 u=−4x²，外层为 y=eᵘ。",
      formula: math`u=-4x^2,\quad y=e^u`,
    },
    {
      change: "分别求外层与内层的导数",
      text: "外层指数求导保持不变：dy/du=eᵘ；内层对 x 求导得 u′=−8x。",
      formula: math`\frac{dy}{du}=e^u,\quad u'=-8x`,
    },
    {
      change: "按链式法则相乘并回代 u",
      text: "把 eᵘ 与 −8x 相乘，再把 u 换回 −4x²。请把系数因子放到前面整理出标准形式，再对照参考解答。",
      formula: math`y'=e^{-4x^2}\cdot(-8x)=\;?`,
    },
  ],

  "jc935-2-2-6-4": [
    {
      change: "确认真数恒正并拆出内外层",
      text: "因为 3x²≥0，所以 u=4+3x²≥4>0 对全体实数恒正，原函数在实数集上处处可导；外层为 y=ln u。",
      formula: math`u=4+3x^2>0,\quad y=\ln u`,
    },
    {
      change: "分别求外层对数与内层导数",
      text: "外层对数求导把真数翻到分母：dy/du=1/u；内层求导得 u′=(4+3x²)′=6x。",
      formula: math`\frac{dy}{du}=\frac{1}{u},\quad u'=6x`,
    },
    {
      change: "相乘并把 u 换回 4+3x²",
      text: "按链式法则把 1/u 与 6x 相乘，并把 u 换回 4+3x²。请合并成单个分式，再对照参考解答。",
      formula: math`y'=\frac{1}{4+3x^2}\cdot 6x=\;?`,
    },
  ],

  "jc935-2-2-6-5": [
    {
      change: "看清三层复合的先后顺序",
      text: "sin²(2x) 表示 [sin(2x)]²：最外层是平方 w²，中间层是正弦 w=sin u，最内层是 u=2x。",
      formula: math`y=\bigl[\sin(2x)\bigr]^2`,
    },
    {
      change: "逐层求导并连乘三项",
      text: "平方层给出 2sin(2x)，正弦层给出 cos(2x)，最内层 2x 给出 2，三层依次相乘得 4sin(2x)cos(2x)。",
      formula: math`\begin{gathered}
        y'=2\sin(2x)\cdot\cos(2x)\cdot 2\\[4pt]
        =4\sin(2x)\cos(2x)
      \end{gathered}`,
    },
    {
      change: "用二倍角公式化简乘积",
      text: "把 4sin(2x)cos(2x) 写成 2·[2sin(2x)cos(2x)]。请套用 2sin θ cos θ=sin(2θ)（令 θ=2x）化简成单个正弦函数，再对照参考解答。",
      formula: math`y'=2\cdot\bigl[2\sin(2x)\cos(2x)\bigr]=\;?`,
    },
  ],

  "jc935-2-2-6-6": [
    {
      change: "改写成二分之一次幂并定区间",
      text: "令 u=16−4x²。在开区间 |x|<2 内 u>0，原式写成 y=u¹ᐟ²（端点 x=±2 处切线竖直，无有限导数）。",
      formula: math`\begin{gathered}
        u=16-4x^2>0\quad(|x|<2)\\[4pt]
        y=u^{1/2}
      \end{gathered}`,
    },
    {
      change: "分别求外层根式与内层导数",
      text: "外层 √u 求导得 dy/du=1/(2√u)，内层 u′=(16−4x²)′=−8x。",
      formula: math`\frac{dy}{du}=\frac{1}{2\sqrt{u}},\quad u'=-8x`,
    },
    {
      change: "相乘约分并注明可导区间",
      text: "按链式法则相乘并回代 u=16−4x²。请把分子的 −8x 与分母的 2 约分，并注明 |x|<2，再对照参考解答。",
      formula: math`y'=\frac{1}{2\sqrt{16-4x^2}}\cdot(-8x)=\;?`,
    },
  ],

  "jc935-2-2-6-7": [
    {
      change: "拆清外层正切与内层平方",
      text: "令内层 u=3x²。在 cos(3x²)≠0 的可导点上，外层为 y=tan u。",
      formula: math`\begin{gathered}
        u=3x^2,\quad \cos(3x^2)\ne 0\\[4pt]
        y=\tan u
      \end{gathered}`,
    },
    {
      change: "分别求外层与内层的导数",
      text: "外层 (tan u)′=sec²u，内层 u′=(3x²)′=6x。注意 6x 只能乘在外面，不能改动括号里的 3x²。",
      formula: math`\frac{dy}{du}=\sec^2 u,\quad u'=6x`,
    },
    {
      change: "相乘回代并注明可导条件",
      text: "请把 sec²(3x²) 与 6x 相乘整理成规范顺序，并注明 cos(3x²)≠0，再对照参考解答。",
      formula: math`y'=\sec^2(3x^2)\cdot 6x=\;?`,
    },
  ],

  "jc935-2-2-6-8": [
    {
      change: "设内层 u=e²ˣ 拆开复合结构",
      text: "令 u=e²ˣ，外层是 y=arctan u。无论 x 取何实数，1+u² 恒大于 1，函数在实数集上处处可导。",
      formula: math`u=e^{2x},\quad y=\arctan u`,
    },
    {
      change: "对外层反正切求导并回代 u",
      text: "由 (arctan u)′=1/(1+u²)，把 u=e²ˣ 代回时注意 (e²ˣ)²=e⁴ˣ（指数相乘）。",
      formula: math`\frac{dy}{du}=\frac{1}{1+u^2}=\frac{1}{1+e^{4x}}`,
    },
    {
      change: "再求内层 u=e²ˣ 的导数",
      text: "e²ˣ 本身仍是复合函数：指数层照抄 e²ˣ，再乘指数 2x 的导数 2。",
      formula: math`u'=e^{2x}\cdot(2x)'=2e^{2x}`,
    },
    {
      change: "把外层和内层导数乘在一起",
      text: "请按链式法则把 1/(1+e⁴ˣ) 与 2e²ˣ 合并成一个分式，再对照参考解答。",
      formula: math`y'=\frac{1}{1+e^{4x}}\cdot 2e^{2x}=\;?`,
    },
  ],

  "jc935-2-2-6-9": [
    {
      change: "分清外层立方与内层反正弦",
      text: "令内层 u=arcsin x，外层为 y=u³。反正弦在开区间 (−1,1) 内可导，端点 x=±1 处根号分母为零。",
      formula: math`\begin{gathered}
        u=\arcsin x\quad(-1<x<1)\\[4pt]
        y=u^3
      \end{gathered}`,
    },
    {
      change: "分别求外层与内层的导数",
      text: "外层立方求导得 dy/du=3u²=3(arcsin x)²，内层反正弦求导得 u′=1/√(1−x²)。",
      formula: math`\begin{gathered}
        \frac{dy}{du}=3(\arcsin x)^2\\[4pt]
        u'=\frac{1}{\sqrt{1-x^2}}
      \end{gathered}`,
    },
    {
      change: "按链式法则相乘并注明区间",
      text: "请把两项乘成一个分式，并写明可导区间 −1<x<1，再对照参考解答。",
      formula: math`y'=3(\arcsin x)^2\cdot\frac{1}{\sqrt{1-x^2}}=\;?`,
    },
  ],

  "jc935-2-2-6-10": [
    {
      change: "先确认对数定义域并分层",
      text: "对数要求真数严格为正，因此定义域是 cos(3x)>0。原式有三层：外层 ln u，中层 u=cos(3x)，内层 3x。",
      formula: math`\begin{gathered}
        u=\cos(3x)>0\\[4pt]
        y=\ln u
      \end{gathered}`,
    },
    {
      change: "逐层求导并连乘三项",
      text: "外层 ln u 给出 1/cos(3x)，中层 cos(3x) 给出 −sin(3x)，最内层 3x 给出 3。",
      formula: math`\begin{gathered}
        y'=\frac{1}{\cos(3x)}\cdot\bigl(-\sin(3x)\bigr)\cdot 3\\[4pt]
        =-\frac{3\sin(3x)}{\cos(3x)}
      \end{gathered}`,
    },
    {
      change: "化简成正切并保留原定义域",
      text: "请利用 sin θ/cos θ=tan θ 化简该分式，并特别注明结果仍限制在原定义域 cos(3x)>0 内，再对照参考解答。",
      formula: math`y'=-\frac{3\sin(3x)}{\cos(3x)}=\;?`,
    },
  ],

  "jc935-2-2-7-1": [
    {
      change: "由 |2−3x|<1 确定可导区间",
      text: "令 u=2−3x。反正弦在 |u|<1 内可导，解不等式 −1<2−3x<1 得到开区间 1/3<x<1。",
      formula: math`\begin{gathered}
        u=2-3x,\quad |u|<1\\[4pt]
        \frac{1}{3}<x<1
      \end{gathered}`,
    },
    {
      change: "分别求外层反正弦与内层导数",
      text: "外层 (arcsin u)′=1/√(1−u²)=1/√(1−(2−3x)²)，内层 u′=(2−3x)′=−3。",
      formula: math`\begin{gathered}
        \frac{dy}{du}=\frac{1}{\sqrt{1-(2-3x)^2}}\\[4pt]
        u'=-3
      \end{gathered}`,
    },
    {
      change: "按链式法则相乘并注明区间",
      text: "请把外层导数与 −3 相乘写成单个分式，并注明可导区间 1/3<x<1，再对照参考解答。",
      formula: math`y'=\frac{1}{\sqrt{1-(2-3x)^2}}\cdot(-3)=\;?`,
    },
  ],

  "jc935-2-2-7-2": [
    {
      change: "改写成负二分之一次幂",
      text: "分母根式要求 9−x²>0，即开区间 |x|<3。把原式改写成 (9−x²)⁻¹ᐟ²，比套商法则更简洁。",
      formula: math`\begin{gathered}
        |x|<3\\[4pt]
        y=(9-x^2)^{-1/2}
      \end{gathered}`,
    },
    {
      change: "对外层幂函数求导",
      text: "令 u=9−x²，外层按幂函数法则求导：−(1/2)u⁻³ᐟ²，注意指数 −1/2 减 1 变成 −3/2。",
      formula: math`\frac{dy}{du}=-\frac{1}{2}(9-x^2)^{-3/2}`,
    },
    {
      change: "乘以内层 9−x² 的导数",
      text: "内层 u′=(9−x²)′=−2x。乘到外层导数后面，外层的负号和 −2x 的负号恰好相抵。",
      formula: math`y'=-\frac{1}{2}(9-x^2)^{-3/2}\cdot(-2x)`,
    },
    {
      change: "约去系数 2 并改回分式",
      text: "请把 −(1/2) 与 −2x 相乘约去 2，再把 (9−x²)⁻³ᐟ² 写回分母并注明 |x|<3，再对照参考解答。",
      formula: math`y'=-\frac{1}{2}(9-x^2)^{-3/2}\cdot(-2x)=\;?`,
    },
  ],

  "jc935-2-2-7-3": [
    {
      change: "先按乘积法则拆成两项",
      text: "原式是 e⁻ˣᐟ³ 与 cos(2x) 的乘积，先按 (uv)′=u′v+uv′ 展开，再分别处理各自的内层系数。",
      formula: math`\begin{gathered}
        y'=\bigl(e^{-x/3}\bigr)'\cos(2x)\\[4pt]
        +e^{-x/3}\bigl(\cos(2x)\bigr)'
      \end{gathered}`,
    },
    {
      change: "用链式法则分别求两个导数",
      text: "指数层内层导数为 −1/3，得 −(1/3)e⁻ˣᐟ³；余弦层内层导数为 2，得 −2sin(2x)，两个系数都别漏乘。",
      formula: math`\begin{gathered}
        \bigl(e^{-x/3}\bigr)'=-\frac{1}{3}e^{-x/3}\\[4pt]
        \bigl(\cos(2x)\bigr)'=-2\sin(2x)
      \end{gathered}`,
    },
    {
      change: "代回并提取公共因子 −e⁻ˣᐟ³",
      text: "代回后两项都带有 −e⁻ˣᐟ³。请把 −e⁻ˣᐟ³ 提到括号外面整理出最终形式，再对照参考解答。",
      formula: math`\begin{gathered}
        y'=-\frac{1}{3}e^{-x/3}\cos(2x)\\[4pt]
        -2e^{-x/3}\sin(2x)=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-2-7-4": [
    {
      change: "用链式法则写出外层乘内层",
      text: "在 |x|>2 时有 |2/x|<1。外层反余弦求导得 −1/√(1−4/x²)，内层 (2/x)′=−2/x²，两个负号相抵为正。",
      formula: math`\begin{gathered}
        y'=\left(-\frac{1}{\sqrt{1-\frac{4}{x^2}}}\right)\left(-\frac{2}{x^2}\right)\\[4pt]
        =\frac{2}{x^2\sqrt{1-\frac{4}{x^2}}}
      \end{gathered}`,
    },
    {
      change: "根号内通分并开出 |x|",
      text: "根号内通分为 (x²−4)/x²。注意开平方 √(x²)=|x|，绝对值不能丢，否则在 x<−2 一侧符号会错。",
      formula: math`\begin{gathered}
        \sqrt{1-\frac{4}{x^2}}=\frac{\sqrt{x^2-4}}{|x|}\\[4pt]
        y'=\frac{2|x|}{x^2\sqrt{x^2-4}}
      \end{gathered}`,
    },
    {
      change: "利用 x²=|x|² 约去一个 |x|",
      text: "因为 x²=|x|² 且 |x|>2>0，分子分母可以约去一个 |x|。请写出约分后的结果并注明 |x|>2，再对照参考解答。",
      formula: math`y'=\frac{2|x|}{|x|^2\sqrt{x^2-4}}=\;?`,
    },
  ],

  "jc935-2-2-7-5": [
    {
      change: "设 u=ln x 化为关于 u 的分式",
      text: "定义域要求 x>0 且分母 2+ln x≠0（即 x≠e⁻²）。令 u=ln x，原式写成 y=(2−u)/(2+u)。",
      formula: math`\begin{gathered}
        u=\ln x\quad(x>0,\ x\ne e^{-2})\\[4pt]
        y=\frac{2-u}{2+u}
      \end{gathered}`,
    },
    {
      change: "对中间变量 u 套用商法则",
      text: "分子对 u 求导得 −1，分母对 u 求导得 1，代入商法则写出 dy/du。",
      formula: math`\frac{dy}{du}=\frac{-(2+u)-(2-u)}{(2+u)^2}`,
    },
    {
      change: "化简分子消去变量 u",
      text: "分子展开为 −2−u−2+u=−4，含 u 的项恰好抵消，只剩常数 −4。",
      formula: math`\frac{dy}{du}=-\frac{4}{(2+u)^2}`,
    },
    {
      change: "乘以内层导数 1/x 并回代",
      text: "内层 u′=(ln x)′=1/x。请把 dy/du 与 1/x 相乘、把 u 换回 ln x，并注明 x>0 且 x≠e⁻²，再对照参考解答。",
      formula: math`y'=-\frac{4}{(2+\ln x)^2}\cdot\frac{1}{x}=\;?`,
    },
  ],

  "jc935-2-2-7-6": [
    {
      change: "分别求分子和分母的导数",
      text: "定义域为 x≠0。分子 sin(3x) 用链式法则求导得 3cos(3x)，分母 x 的导数是 1。",
      formula: math`\begin{gathered}
        \bigl(\sin(3x)\bigr)'=3\cos(3x)\\[4pt]
        (x)'=1
      \end{gathered}`,
    },
    {
      change: "代入商法则写出分式",
      text: "套用 (u/v)′=(u′v−uv′)/v²，把分子和分母的导数放进对应位置，分母变成 x²。",
      formula: math`y'=\frac{3\cos(3x)\cdot x-\sin(3x)\cdot 1}{x^2}`,
    },
    {
      change: "整理分子顺序并注明 x≠0",
      text: "请把第一项里的 x 移到 cos(3x) 前面、去掉乘 1，并注明定义域 x≠0，再对照参考解答。",
      formula: math`y'=\frac{3\cos(3x)\cdot x-\sin(3x)}{x^2}=\;?`,
    },
  ],

  "jc935-2-2-7-7": [
    {
      change: "对外层反正弦求导",
      text: "在 0<x<2 时有 0<x/2<1。令 u=√(x/2)，外层反正弦的导数是 1/√(1−u²)=1/√(1−x/2)。",
      formula: math`\begin{gathered}
        u=\sqrt{\frac{x}{2}}\quad(0<x<2)\\[4pt]
        \frac{dy}{du}=\frac{1}{\sqrt{1-\frac{x}{2}}}
      \end{gathered}`,
    },
    {
      change: "对内层平方根求导",
      text: "把内层写成 u=(1/√2)x¹ᐟ²，按幂函数求导得 u′=(1/√2)·(1/(2√x))=1/(2√(2x))。",
      formula: math`u'=\frac{1}{\sqrt{2}}\cdot\frac{1}{2\sqrt{x}}=\frac{1}{2\sqrt{2x}}`,
    },
    {
      change: "把两个根式合并到同一根号",
      text: "链式法则把两项相乘，两个非负根式相乘可以并进同一个根号。请展开根号里的 2x(1−x/2) 并注明 0<x<2，再对照参考解答。",
      formula: math`\begin{gathered}
        y'=\frac{1}{\sqrt{1-\frac{x}{2}}}\cdot\frac{1}{2\sqrt{2x}}\\[4pt]
        =\frac{1}{2\sqrt{2x\left(1-\frac{x}{2}\right)}}=\;?
      \end{gathered}`,
    },
  ],

  "jc935-2-2-7-8": [
    {
      change: "确认真数恒正并求根式导数",
      text: "因为 √(9+4x²)>|2x|≥−2x，真数对全体实数恒正。记 v=√(9+4x²)，先用链式法则算出 v′=8x/(2v)=4x/v。",
      formula: math`\begin{gathered}
        v=\sqrt{9+4x^2}\\[4pt]
        v'=\frac{8x}{2v}=\frac{4x}{v}
      \end{gathered}`,
    },
    {
      change: "求真数导数并通分提公因式",
      text: "真数 2x+v 的导数是 2+v′=2+4x/v。通分并提取分子里的 2，冒出了和原真数一样的因子 v+2x。",
      formula: math`\begin{gathered}
        (2x+v)'=2+\frac{4x}{v}\\[4pt]
        =\frac{2v+4x}{v}=\frac{2(v+2x)}{v}
      \end{gathered}`,
    },
    {
      change: "除以原真数并整体约分",
      text: "对数求导等于真数导数除以真数。因为 2x+v>0，请把分子分母共同的 2x+v 整体约掉，再把 v 换回 √(9+4x²)，最后对照参考解答。",
      formula: math`y'=\frac{2(v+2x)}{v(2x+v)}=\;?`,
    },
  ],

  "jc935-2-2-7-9": [
    {
      change: "设 u=2x，先求真数对 u 的导数",
      text: "在 sec(2x)+tan(2x)>0 且 cos(2x)≠0 处，令 u=2x。真数 sec u+tan u 对 u 求导得 sec u tan u+sec²u。",
      formula: math`\begin{gathered}
        u=2x\\[4pt]
        \frac{d}{du}(\sec u+\tan u)\\[2pt]
        =\sec u\tan u+\sec^2 u
      \end{gathered}`,
    },
    {
      change: "提取真数导数的公因式 sec u",
      text: "两项都有公因式 sec u，提出来变成 sec u(tan u+sec u)，括号里正好与原真数完全相同。",
      formula: math`\sec u\tan u+\sec^2 u=\sec u(\tan u+\sec u)`,
    },
    {
      change: "与分母约分再乘内层导数 2",
      text: "外层对数给出 dy/du = sec u(tan u+sec u)/(sec u+tan u) = sec u（真数恒正可合法约分）。请再乘以内层导数 u′=2 并回代 u=2x，注明原定义域，再对照参考解答。",
      formula: math`\begin{gathered}
        \frac{dy}{du}=\frac{\sec u(\tan u+\sec u)}{\sec u+\tan u}\\[4pt]
        =\sec u,\quad y'=\sec u\cdot 2\Big|_{u=2x}=\;?
      \end{gathered}`,
    },
  ],
};

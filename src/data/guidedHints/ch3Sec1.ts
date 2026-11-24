import type { GuidedHint } from "../learning";

const math = String.raw;

/**
 * 第三章 3.1 微分中值定理（罗尔定理、拉格朗日中值定理、柯西中值定理）全量逐步提示。
 * 覆盖核心与题库 4 道数值题（p19, p20, p134, p181）、2 道书主题（p216, p217）
 * 及上册习题 3-1 全部 16 题（jc935-3-1-1 至 jc935-3-1-15），共 22 题。
 */
export const ch3Sec1GuidedHints: Record<string, GuidedHint[]> = {
  p19: [
    {
      change: "核对闭区间连续、开区间可导前提",
      text: "f(x)=x² 是多项式，在闭区间 [1, 5] 上连续，在开区间 (1, 5) 内可导，满足拉格朗日中值定理的条件。",
      formula: math`f(x)=x^2,\quad x\in[1,5]`,
    },
    {
      change: "计算区间 [1, 5] 上的平均变化率（割线斜率）",
      text: "先算出两个端点的函数值 f(5)=25 和 f(1)=1，再求差商 [f(5)−f(1)]/(5−1)。",
      formula: math`\frac{f(5)-f(1)}{5-1}=\frac{25-1}{4}=6`,
    },
    {
      change: "求导并令瞬时斜率等于平均变化率",
      text: "由幂函数求导法则得 f'(x)=2x，令中值点 ξ 处的导数 f'(ξ)=2ξ 等于割线斜率 6。",
      formula: math`f'(\xi)=2\xi=6`,
    },
    {
      change: "解出 ξ 并核对是否落在开区间 (1, 5) 内",
      text: "两边同除以 2 即可解出 ξ，并确认结果严格介于 1 和 5 之间。",
      formula: math`\xi=\frac{6}{2}=\;?`,
    },
  ],

  p20: [
    {
      change: "核对连续性、可导性与两端点等高条件",
      text: "多项式 f(x)=x²−4x+3 在 [1, 3] 连续、在 (1, 3) 可导；代入端点得 f(1)=1−4+3=0，f(3)=9−12+3=0，满足罗尔定理全部三条前提。",
      formula: math`f(1)=0=f(3)`,
    },
    {
      change: "对 f(x) 逐项求导",
      text: "按多项式求导法则算出导函数 f'(x)=2x−4。",
      formula: math`f'(x)=2x-4`,
    },
    {
      change: "令导数为零并验证驻点位置",
      text: "由罗尔定理结论令 f'(ξ)=2ξ−4=0，解出 ξ 后检查它确实严格落在开区间 (1, 3) 内。",
      formula: math`2\xi-4=0\implies \xi=\;?`,
    },
  ],

  p134: [
    {
      change: "核对前提并计算 [0, 3] 上的割线斜率",
      text: "f(x)=x³ 在 [0, 3] 连续且在 (0, 3) 可导。先算端点连线的平均斜率 [f(3)−f(0)]/(3−0)。",
      formula: math`\frac{f(3)-f(0)}{3-0}=\frac{27-0}{3}=9`,
    },
    {
      change: "写出切线斜率并列中值方程",
      text: "由 f'(x)=3x²，令中值点 c 处的切线斜率等于割线斜率 9。",
      formula: math`f'(c)=3c^2=9`,
    },
    {
      change: "解出 c² 并确认正根落在 (0, 3) 内",
      text: "两边同除以 3 得 c² 的值；正根 c=√3≈1.732 确实在 (0, 3) 内，注意题目直接问的是 c²。",
      formula: math`c^2=\frac{9}{3}=\;?`,
    },
  ],

  p181: [
    {
      change: "核对真数正性与两端点函数值相等",
      text: "当 x∈[π/12, 5π/12] 时，2x∈[π/6, 5π/6]，有 sin(2x)≥1/2>0，故 f(x)=ln(sin(2x)) 在闭区间连续、开区间可导，且 f(π/12)=ln(1/2)=f(5π/12)。",
      formula: math`\begin{gathered} 2x\in\left[\frac{\pi}{6},\frac{5\pi}{6}\right],\\ \sin(2x)\ge\frac{1}{2}>0 \end{gathered}`,
    },
    {
      change: "用链式法则对复合函数求导",
      text: "把 u=sin(2x) 看作内层，先对外层 ln u 求导得 1/u，再乘内层导数 (sin(2x))'=2cos(2x)。",
      formula: math`f'(x)=\frac{2\cos(2x)}{\sin(2x)}=2\cot(2x)`,
    },
    {
      change: "令导数为零并解出 c 与 c/π",
      text: "因 sin(2c)>0，f'(c)=0 等价于 cos(2c)=0。在 2c∈(π/6, 5π/6) 内唯一解是 2c=π/2，即 c=π/4，最后按题目要求写出 c/π。",
      formula: math`2c=\frac{\pi}{2}\implies \frac{c}{\pi}=\;?`,
    },
  ],

  p216: [
    {
      change: "先检验拉格朗日中值定理的两条前提",
      text: "二次多项式 f(x)=3x²−2x 在闭区间 [1, 5] 上连续，在开区间 (1, 5) 内可导，满足定理前提。",
      formula: math`f(x)=3x^2-2x,\quad x\in[1,5]`,
    },
    {
      change: "计算两端点连线的平均斜率",
      text: "先算 f(1)=3−2=1，f(5)=75−10=65，再求平均变化率 [f(5)−f(1)]/(5−1)。",
      formula: math`\frac{f(5)-f(1)}{5-1}=\frac{65-1}{4}=16`,
    },
    {
      change: "解方程 f'(c)=16 并检查 c∈(1, 5)",
      text: "求导得 f'(x)=6x−2，令 6c−2=16 解得 c=3，且 3∈(1, 5)，此时切线与割线平行。",
      formula: math`6c-2=16\implies c=3\in(1,5)`,
    },
  ],

  p217: [
    {
      change: "先找出 f(x)=0 的四个互异实零点",
      text: "不用把多项式展开，直接从因式分解形式读出 f(x) 的四个零点 −3, −1, 2, 4，它们把数轴分成三段相邻闭区间。",
      formula: math`f(-3)=f(-1)=f(2)=f(4)=0`,
    },
    {
      change: "在三段相邻闭区间上分别用罗尔定理",
      text: "多项式处处连续可导，在 [−3, −1]、[−1, 2]、[2, 4] 上各用一次罗尔定理，得到三个互不相同的开区间内至少各有一个导数零点。",
      formula: math`\begin{gathered} \exists\,\xi_1\in(-3,-1),\ \xi_2\in(-1,2),\\ \xi_3\in(2,4),\ f'(\xi_k)=0 \end{gathered}`,
    },
    {
      change: "用导函数次数把“至少三个”收紧为“恰好三个”",
      text: "f(x) 是四次多项式，因此 f'(x) 是三次多项式，代数上至多有 3 个实根。结合上一步“至少 3 个”，即证 f'=0 恰有 3 个不同实零点。",
      formula: math`\deg f'=3\implies \text{恰有 }3\text{ 个不同实零点}`,
    },
  ],

  "jc935-3-1-1": [
    {
      change: "先确认对数真数 cos x 在闭区间上恒正",
      text: "当 x∈[−π/3, π/3] 时，cos x≥1/2>0，因此 f(x)=ln(cos x) 在闭区间连续、在开区间 (−π/3, π/3) 可导。",
      formula: math`\cos x\ge\frac{1}{2}>0\quad \left(x\in\left[-\frac{\pi}{3},\frac{\pi}{3}\right]\right)`,
    },
    {
      change: "核对两端点函数值相等（罗尔第三条件）",
      text: "因为余弦是偶函数，f(−π/3)=ln(1/2)=f(π/3)，满足罗尔定理的全部条件。",
      formula: math`f\left(-\frac{\pi}{3}\right)=\ln\frac{1}{2}=f\left(\frac{\pi}{3}\right)`,
    },
    {
      change: "用链式法则求导并筛选开区间内的解",
      text: "求导得 f'(x)=(−sin x)/cos x=−tan x。令 −tan ξ=0 得 ξ=kπ，落在开区间 (−π/3, π/3) 内的唯一解为 ξ=0。",
      formula: math`f'(\xi)=-\tan\xi=0\implies \xi=0\in\left(-\frac{\pi}{3},\frac{\pi}{3}\right)`,
    },
  ],

  "jc935-3-1-2": [
    {
      change: "核对条件并求 [0, 1] 上的割线斜率",
      text: "三次多项式在 [0, 1] 连续、在 (0, 1) 可导。算出 f(0)=1、f(1)=3−4+2+1=2，平均变化率为 (2−1)/(1−0)=1。",
      formula: math`\frac{f(1)-f(0)}{1-0}=\frac{2-1}{1}=1`,
    },
    {
      change: "列出一元二次中值方程",
      text: "求导得 f'(x)=9x²−8x+2，令 f'(ξ)=1，移项整理为 9ξ²−8ξ+1=0。",
      formula: math`9\xi^2-8\xi+2=1\implies 9\xi^2-8\xi+1=0`,
    },
    {
      change: "用求根公式求解并逐一核对是否落在 (0, 1) 内",
      text: "由求根公式得 ξ=(4±√7)/9。因 2<√7<3，有 (4−√7)/9∈(0, 1) 且 (4+√7)/9∈(0, 1)，两个根都符合要求。",
      formula: math`\xi=\frac{4\pm\sqrt{7}}{9}\in(0,1)`,
    },
  ],

  "jc935-3-1-3": [
    {
      change: "核对柯西中值定理的三个前提（含 g'(x)≠0）",
      text: "f(x)=cos x 与 g(x)=x−sin x 在 [0, π/2] 连续、在 (0, π/2) 可导，且 g'(x)=1−cos x>0（处处不为零），满足柯西中值定理条件。",
      formula: math`g'(x)=1-\cos x>0\quad \left(x\in\left(0,\frac{\pi}{2}\right)\right)`,
    },
    {
      change: "写出增量比与导数比，并用半角公式化简",
      text: "左边增量比为 [0−1]/[(π/2−1)−0]=−2/(π−2)；右边导数比 −sin ξ/(1−cos ξ) 用半角公式化为 −cot(ξ/2)。",
      formula: math`\begin{gathered} \frac{-2}{\pi-2}=\frac{-\sin\xi}{1-\cos\xi}=-\cot\frac{\xi}{2}\\ \implies \tan\frac{\xi}{2}=\frac{\pi-2}{2} \end{gathered}`,
    },
    {
      change: "解出 ξ 并验证其落在 (0, π/2) 内",
      text: "因为 0<(π−2)/2<1，故 0<arctan((π−2)/2)<π/4，乘以 2 后 ξ 严格落在 (0, π/2) 内。",
      formula: math`\xi=2\arctan\frac{\pi-2}{2}\in\left(0,\frac{\pi}{2}\right)`,
    },
  ],

  "jc935-3-1-4": [
    {
      change: "计算任意区间 [c, d] 上的平均变化率",
      text: "二次函数在 [c, d] 连续、在 (c, d) 可导。展开 f(d)−f(c)=α(d²−c²)+β(d−c)，提取公因子 (d−c) 后除以 (d−c)。",
      formula: math`\frac{f(d)-f(c)}{d-c}=\alpha(c+d)+\beta`,
    },
    {
      change: "令导数 f'(ξ) 等于平均变化率",
      text: "求导得 f'(ξ)=2αξ+β，与平均变化率相等后两边消去 β。",
      formula: math`2\alpha\xi+\beta=\alpha(c+d)+\beta\implies 2\alpha\xi=\alpha(c+d)`,
    },
    {
      change: "利用 α≠0 两边同除以 2α 得到中点",
      text: "题目给定 α≠0，因此可以安全除以 2α，唯一解 ξ=(c+d)/2 恒为区间中点（若 α=0 则任意点皆满足，不唯一）。",
      formula: math`\xi=\frac{c+d}{2}\quad (\alpha\neq 0)`,
    },
  ],

  "jc935-3-1-5": [
    {
      change: "直接读出原四次多项式的四个零点",
      text: "不展开原式，直接看出 f(x)=0 的四个互异实根为 −2, 1, 4, 7。",
      formula: math`f(-2)=f(1)=f(4)=f(7)=0`,
    },
    {
      change: "在三段相邻闭区间上套用罗尔定理",
      text: "在 [−2, 1]、[1, 4]、[4, 7] 上分别满足罗尔定理条件，于是 f'(x)=0 在 (−2, 1)、(1, 4)、(4, 7) 内至少各有一个实根。",
      formula: math`\begin{gathered} \exists\,\xi_1\in(-2,1),\ \xi_2\in(1,4),\\ \xi_3\in(4,7),\ f'(\xi_k)=0 \end{gathered}`,
    },
    {
      change: "结合三次导数最多三个实根确定“恰好”",
      text: "因为 f'(x) 是三次多项式，至多有 3 个实根，所以导方程恰有 3 个实根，且分别落在上述三个开区间内。",
      formula: math`\deg f'=3\implies \text{恰有 }3\text{ 个实根}`,
    },
  ],

  "jc935-3-1-6": [
    {
      change: "构造待证恒等式左边的函数并限定单个区间",
      text: "设 f(x)=arctan x+arctan(1/x)，明确只在单个连通区间 (0, +∞) 上讨论（因为零导数推论要求定义在单个区间上）。",
      formula: math`f(x)=\arctan x+\arctan\frac{1}{x}\quad (x>0)`,
    },
    {
      change: "用链式法则求导并化简证明 f'(x)≡0",
      text: "对 arctan(1/x) 求导时别漏乘内层导数 (1/x)'=−1/x²，化简分母后两项恰好抵消。",
      formula: math`\begin{gathered} f'(x)=\frac{1}{1+x^2}+\frac{1}{1+1/x^2}\cdot\left(-\frac{1}{x^2}\right)\\ =\frac{1}{1+x^2}-\frac{1}{x^2+1}=0 \end{gathered}`,
    },
    {
      change: "用中值定理推论并代特殊点 x=1 定常数",
      text: "因 f'(x)≡0 在区间 (0, +∞) 上成立，故 f(x) 恒为常数 C；取 x=1 得 C=π/4+π/4=π/2。",
      formula: math`f(x)\equiv f(1)=\frac{\pi}{4}+\frac{\pi}{4}=\frac{\pi}{2}`,
    },
  ],

  "jc935-3-1-7": [
    {
      change: "把原方程左边定义为多项式函数 f(x)",
      text: "记 f(x)=b₀xⁿ+b₁xⁿ⁻¹+⋯+bₙ₋₁x，多项式在任意闭区间连续且在开区间可导。",
      formula: math`f(x)=b_0x^n+b_1x^{n-1}+\cdots+b_{n-1}x`,
    },
    {
      change: "发掘隐藏零点 f(0)=0 与已知负根 f(−r)=0",
      text: "因为原式没有常数项，代入 x=0 立刻得 f(0)=0；结合已知负根 −r（r>0），在 [−r, 0] 上两端点同为零。",
      formula: math`f(-r)=0=f(0)\quad (r>0)`,
    },
    {
      change: "在 [−r, 0] 上应用罗尔定理得出导方程负根",
      text: "由罗尔定理存在 ξ∈(−r, 0) 使 f'(ξ)=0，而 f'(x)=0 正是题目要证的导方程，从而在 (−r, 0) 内至少有一负根。",
      formula: math`\exists\,\xi\in(-r,0),\quad f'(\xi)=0`,
    },
  ],

  "jc935-3-1-8": [
    {
      change: "对 G(x) 在 [−1, 2] 上第一次应用罗尔定理",
      text: "G(x)=(x+1)²g(x) 在 [−1, 2] 二阶可导，且 G(−1)=0、G(2)=9g(2)=0，故存在 η∈(−1, 2) 使 G'(η)=0。",
      formula: math`G(-1)=G(2)=0\implies \exists\,\eta\in(-1,2),\ G'(\eta)=0`,
    },
    {
      change: "用乘积法则求 G'(x) 并算出 G'(−1)=0",
      text: "写出 G'(x)=2(x+1)g(x)+(x+1)²g'(x)。因为两项都含因子 (x+1)，代入 x=−1 得 G'(−1)=0。",
      formula: math`\begin{gathered} G'(x)=2(x+1)g(x)+(x+1)^2g'(x),\\ G'(-1)=0 \end{gathered}`,
    },
    {
      change: "对 G'(x) 在 [−1, η] 上第二次应用罗尔定理",
      text: "G'(x) 在 [−1, η] 连续、在 (−1, η) 可导且 G'(−1)=G'(η)=0，故存在 ξ∈(−1, η)⊂(−1, 2) 使 G''(ξ)=0。",
      formula: math`\exists\,\xi\in(-1,\eta)\subset(-1,2),\quad G''(\xi)=0`,
    },
  ],

  "jc935-3-1-9": [
    {
      change: "构造幂函数并在 [v, u] 上应用拉格朗日中值定理",
      text: "令 f(x)=xᵖ，由 u>v>0 知 f 在 [v, u] 连续、在 (v, u) 可导，存在 ξ∈(v, u) 使 uᵖ−vᵖ=pξᵖ⁻¹(u−v)。",
      formula: math`u^p-v^p=p\xi^{p-1}(u-v),\quad \xi\in(v,u)`,
    },
    {
      change: "利用指数 p−1<0 判断导函数的单调方向",
      text: "因为 0<p<1，所以 p−1<0，幂函数 xᵖ⁻¹ 在 (0, +∞) 上严格递减。由 0<v<ξ<u 推出不等号反向。",
      formula: math`0<v<\xi<u\implies u^{p-1}<\xi^{p-1}<v^{p-1}`,
    },
    {
      change: "两边同乘正数 p(u−v) 得到目标双边不等式",
      text: "因为 p>0 且 u−v>0，同乘 p(u−v) 不改变不等号方向，代回 pξᵖ⁻¹(u−v)=uᵖ−vᵖ 即证。",
      formula: math`\begin{gathered} pu^{p-1}(u-v)<u^p-v^p\\ <pv^{p-1}(u-v) \end{gathered}`,
    },
  ],

  "jc935-3-1-10": [
    {
      change: "把商的对数拆成对数差，识别目标函数",
      text: "将 ln[(1+x)/(1+y)] 改写为 ln(1+x)−ln(1+y)，自然对应函数 f(t)=ln(1+t) 在 [y, x] 上的增量。",
      formula: math`\ln\frac{1+x}{1+y}=\ln(1+x)-\ln(1+y)`,
    },
    {
      change: "在 [y, x] 上应用拉格朗日中值定理",
      text: "因 x>y>−1，有 1+t>0，f(t)=ln(1+t) 在 [y, x] 连续、在 (y, x) 可导，存在 ξ∈(y, x) 使差值等于 (x−y)/(1+ξ)。",
      formula: math`\ln(1+x)-\ln(1+y)=\frac{x-y}{1+\xi},\quad \xi\in(y,x)`,
    },
    {
      change: "确认正性后取倒数并同乘正数 x−y",
      text: "由 0<1+y<1+ξ<1+x 取倒数得 1/(1+x)<1/(1+ξ)<1/(1+y)，再同乘 x−y>0 即得结论。",
      formula: math`\frac{x-y}{1+x}<\ln\frac{1+x}{1+y}<\frac{x-y}{1+y}`,
    },
  ],

  "jc935-3-1-11-1": [
    {
      change: "先单独处理 u=v 的退化情形",
      text: "中值定理要求非退化闭区间，因此先说明当 u=v 时两边均为 0，不等式显然成立。",
      formula: math`u=v\implies 0\le 0`,
    },
    {
      change: "当 u≠v 时对 f(t)=sin(2t) 用拉格朗日中值定理",
      text: "在 u 与 v 构成的闭区间上应用定理，注意链式法则给出 f'(t)=2cos(2t)，别漏掉因子 2。",
      formula: math`\sin(2u)-\sin(2v)=2\cos(2\xi)(u-v)`,
    },
    {
      change: "取绝对值并用余弦有界性放缩",
      text: "两边取绝对值并利用 |cos(2ξ)|≤1，即得利普希茨不等式。",
      formula: math`|\sin(2u)-\sin(2v)|=2|\cos(2\xi)||u-v|\le 2|u-v|`,
    },
  ],

  "jc935-3-1-11-2": [
    {
      change: "选准区间端点 [2, x] 并应用拉格朗日中值定理",
      text: "观察到 x=2 时两边都等于 e²，因此在 [2, x] 上对 f(t)=eᵗ 应用拉格朗日中值定理。",
      formula: math`e^x-e^2=e^\xi(x-2),\quad \xi\in(2,x)`,
    },
    {
      change: "利用指数单调性把 e^ξ 放缩为 e²",
      text: "因为 ξ>2 且 eᵗ 严格递增，有 e^ξ>e²；再乘以正数 x−2>0 得 eˣ−e²>e²(x−2)。",
      formula: math`e^\xi>e^2\implies e^x-e^2>e^2(x-2)`,
    },
    {
      change: "移项合并同类项完成证明",
      text: "两边同加 e²，右边 e²(x−2)+e²=e²x−e²=e²(x−1)，即证。",
      formula: math`e^x>e^2(x-2)+e^2=e^2(x-1)`,
    },
  ],

  "jc935-3-1-12": [
    {
      change: "先用零点定理证明存在性（至少一个正根）",
      text: "设 f(x)=x³+3x−2，它在 [0, 1] 连续且 f(0)=−2<0、f(1)=2>0，由零点定理知 (0, 1) 内至少有一个正根 x₁。",
      formula: math`f(0)=-2<0,\ f(1)=2>0\implies \exists\,x_1\in(0,1),\ f(x_1)=0`,
    },
    {
      change: "用罗尔定理反证法证明唯一性（至多一个正根）",
      text: "假设存在另一正根 x₂≠x₁，在两者构成的闭区间上对 f 应用罗尔定理，必存在 ξ 使 f'(ξ)=0。",
      formula: math`f(x_1)=f(x_2)=0\implies \exists\,\xi,\ f'(\xi)=0`,
    },
    {
      change: "指出导数恒正产生矛盾，合拢存在与唯一",
      text: "但 f'(x)=3x²+3≥3>0 处处成立，与 f'(ξ)=0 矛盾，故方程在 (0, +∞) 内有且仅有一个正实根。",
      formula: math`f'(x)=3x^2+3\ge 3>0\quad (\text{矛盾})`,
    },
  ],

  "jc935-3-1-13": [
    {
      change: "把行列式一列的端点换成动点 x 构造辅助函数",
      text: "固定含 b 的列，令 Φ(x)=u(b)v(x)−v(b)u(x)，它正是以 (u(b), v(b)) 与 (u(x), v(x)) 为两列的二阶行列式。",
      formula: math`\Phi(x)=\begin{vmatrix} u(b) & u(x) \\ v(b) & v(x) \end{vmatrix}=u(b)v(x)-v(b)u(x)`,
    },
    {
      change: "计算端点值 Φ(b) 与 Φ(a)，留意列序符号",
      text: "两列相同时 Φ(b)=0；而 Φ(a)=u(b)v(a)−v(b)u(a)，正好等于目标左边行列式的相反数。",
      formula: math`\Phi(b)=0,\quad -\Phi(a)=\begin{vmatrix} u(a) & u(b) \\ v(a) & v(b) \end{vmatrix}`,
    },
    {
      change: "对 Φ(x) 在 [a, b] 上应用拉格朗日中值定理",
      text: "Φ(x) 在 [a, b] 连续、在 (a, b) 可导，且 Φ'(x)=u(b)v'(x)−v(b)u'(x)。代入 Φ(b)−Φ(a)=(b−a)Φ'(ξ) 即得结论。",
      formula: math`\Phi(b)-\Phi(a)=(b-a)\begin{vmatrix} u(b) & u'(\xi) \\ v(b) & v'(\xi) \end{vmatrix}`,
    },
  ],

  "jc935-3-1-14": [
    {
      change: "构造不含除零风险的辅助函数 F(x)=f(x)e⁻³ˣ",
      text: "不要直接写 f'/f=3（未证明 f(x)≠0），改乘反向指数因子 e⁻³ˣ 构造 F(x)=f(x)e⁻³ˣ，处处可导。",
      formula: math`F(x)=f(x)e^{-3x}`,
    },
    {
      change: "用乘积法则求导并代入条件 f'(x)=3f(x)",
      text: "求导得 F'(x)=f'(x)e⁻³ˣ−3f(x)e⁻³ˣ=[f'(x)−3f(x)]e⁻³ˣ，代入已知恒等于 0。",
      formula: math`F'(x)=[f'(x)-3f(x)]e^{-3x}\equiv 0`,
    },
    {
      change: "由零导数推论和初值 f(0)=2 锁定表达式",
      text: "在 (−∞, +∞) 上 F'(x)≡0 推出 F(x)≡C；代 x=0 得 C=F(0)=f(0)e⁰=2，故 f(x)=2e³ˣ。",
      formula: math`F(x)\equiv F(0)=2\implies f(x)=2e^{3x}`,
    },
  ],

  "jc935-3-1-15": [
    {
      change: "把目标式写成商，配对 f(t) 与 (t−a)ⁿ 首次套用柯西中值定理",
      text: "利用 f(a)=0 把 f(x)/(x−a)ⁿ 写成 [f(x)−f(a)]/[(x−a)ⁿ−0]，在 a 与 x 之间应用柯西中值定理，同时对分子分母求导一次。",
      formula: math`\frac{f(x)}{(x-a)^n}=\frac{f'(\xi_1)}{n(\xi_1-a)^{n-1}}`,
    },
    {
      change: "利用高阶导数在 a 处为零，连续降阶 n−1 次",
      text: "每一步都补上 −f⁽ᵏ⁾(a)=0，再在 a 与 ξₖ 之间套用柯西中值定理，分母依次产生因子 n, n−1, …, 1，最终化为 n!。",
      formula: math`\frac{f'(\xi_1)}{n(\xi_1-a)^{n-1}}=\cdots=\frac{f^{(n)}(\xi_n)}{n!}`,
    },
    {
      change: "把落在 a 与 x 之间的 ξₙ 写成参数形式 a+θ(x−a)",
      text: "因为 ξₙ 严格介于 a 与 x 之间，令 θ=(ξₙ−a)/(x−a) 必满足 0<θ<1，于是 ξₙ=a+θ(x−a)，证毕。",
      formula: math`\xi_n=a+\theta(x-a)\quad (0<\theta<1)`,
    },
  ],
};

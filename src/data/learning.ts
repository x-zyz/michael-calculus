import { integralLessons } from "./integrals";
import { applicationLessons } from "./integralApplications";
import { textbookLessons } from "./textbookLessons";
import { multivariableLessons } from "./multivariable";
import { seriesLessons } from "./series";
import { differentialEquationsLessons } from "./differentialEquations";
import { problemIndex, type ProblemIndexEntry } from "./bank";
export type ChapterId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface Lesson {
  definitionExplanation: string;
  id: string;
  chapter: ChapterId;
  optional?: boolean;
  title: string;
  intuition: string;
  definition: string;
  condition: string;
  example: string;
  steps: string[];
  takeaway: string;
}
export const lessons: Lesson[] = [
  {
    id: "limit",
    definitionExplanation: "式子读作「当 x 无限靠近 a 时，f(x) 无限靠近 L」。它只关心 x 在 a 附近左右两侧的走势，至于 x 恰好等于 a 时函数值是多少、甚至有没有定义，都不在讨论范围内。",
    chapter: 1,
    title: "函数极限",
    intuition:
      "想象你沿着曲线 y = f(x) 走近横坐标 x = a。比如 (x² − 1)/(x − 1) 在 x = 1 处分母为零、根本算不出函数值（图像上是一个空心洞），但只要 x ≠ 1，约分后就是直线 x + 1，越靠近 1 函数值就越贴近 2——这个只看附近走势的收敛值就是极限。",
    definition: String.raw`\lim_{x\to a}f(x)=L`,
    condition:
      "直观上看，只要 x 足够贴近 a（但不取 x = a），f(x) 就能任意贴近 L；严格 ε-δ 语言把这种靠近量化为：对任意误差上限 ε > 0，总能找到距离门槛 δ > 0，使 0 < |x − a| < δ 时都有 |f(x) − L| < ε。只有左、右极限都存在且相等时，双侧极限才存在；数列极限则要求 n > N 时 |aₙ − L| < ε（如 1/n → 0）。",
    example: String.raw`\lim_{x\to1}\frac{x^2-1}{x-1}=2`,
    steps: [
      "先判断：直接代入会得到 0/0，它不是答案。",
      "当 x ≠ 1 时，x² − 1 = (x − 1)(x + 1)，所以原式可以约成 x + 1。",
      "求极限只考察 x ≠ 1 的邻近点，因此约分完全合法。",
      "x + 1 在 x = 1 连续，极限为 1 + 1 = 2。",
    ],
    takeaway:
      "极限描述附近的趋势。0/0 是未定式，既不能当作 0，也不能直接判定极限不存在。",
  },
  {
    id: "sine",
    definitionExplanation: "当角 x 用弧度表示且趋近于 0 时，sin x 的大小几乎和 x 本身相等，因此比值 sin x / x 的极限等于 1。如果 sin 里面带有倍数，必须先把分母配成和它一模一样的趋零整体再套用公式。",
    chapter: 1,
    title: "第一个重要极限",
    intuition:
      "在单位圆上，当圆心角 x（弧度）缩到非常小时，它所对的垂直正弦线 sin x 和一段短圆弧 x 几乎重合在一起，于是比值 sin x / x 从正负两侧趋近 0 时都贴近 1。平时近似计算中常用的“小角度下 sin x ≈ x”正源于此。",
    definition: String.raw`\lim_{x\to0}\frac{\sin x}{x}=1`,
    condition:
      "角度 x 必须使用弧度制（若换成角度制，极限值会带入 π/180 因子）。严格推导基于 0 < |x| < π/2 时的几何不等式 cos x ≤ sin x / x ≤ 1 配合夹逼准则。解题关键在于配凑同一趋零变量：凡是出现 sin(u(x)) 且 u(x) → 0，要同时在分母凑出完整的 u(x)。",
    example: String.raw`\lim_{x\to0}\frac{\sin 3x}{5x}=\frac35`,
    steps: [
      "目标是把分母配成正弦中的 3x。",
      "对 x ≠ 0，sin(3x)/(5x) = (3/5) · sin(3x)/(3x)。",
      "令 t = 3x。当 x → 0 时，t → 0。",
      "应用 sin t / t → 1，得到结果 3/5。",
    ],
    takeaway:
      "系数不能凭感觉抵消；先把正弦的自变量和分母配齐，再使用重要极限。",
  },
  {
    id: "euler",
    definitionExplanation: "当底数是 1 加上一个趋零小量 u、同时指数恰好是它的倒数 1/u 时，整个式子在「底数略大于 1」和「连乘无穷次」之间达到平衡，收敛到无理数 e ≈ 2.71828。",
    chapter: 1,
    title: "第二个重要极限",
    intuition:
      "用银行复利看最直观：本金 1 元按年利率 100% 计息，一年结一次拿到 2 元；每半年结一次变成 (1 + 1/2)² = 2.25 元；结算拆成越来越多、越来越密集的 n 期时，(1 + 1/n)ⁿ 不会无限暴涨，而是稳定逼近常数 e。把离散的 1/n 换成连续趋零量，就得到 (1 + x)^(1/x) → e。",
    definition: String.raw`\begin{gathered}\lim_{x\to0}(1+x)^{\frac1x}=e\\[4pt]\lim_{n\to\infty}\left(1+\frac1n\right)^n=e\end{gathered}`,
    condition:
      "核心特征是 1^∞ 型未定式（先确认底数趋于 1、指数趋于无穷）。把底数写成 1 + u(x)（要求 u(x) → 0 且 u(x) ≠ 0），再将指数改写成 [1/u(x)] · k，最终结果就是 e^k；若底数极限不等于 1，不能直接套用。金融中按年利率 r、每年复利 m 次时，t 年本息为 P(1 + r/m)^(mt)，取 m → ∞ 即得连续复利公式 Pe^(rt)。",
    example: String.raw`\lim_{x\to0}(1+2x)^{\frac{3}{x}}=e^6`,
    steps: [
      "先判别类型：x → 0 时底数 1 + 2x → 1，指数 3/x → ∞，属于 1^∞ 型未定式。",
      "识别底数中的趋零项 u(x) = 2x，需要把指数配出 1/(2x)。",
      "对 x ≠ 0，将指数改写为 3/x = [1/(2x)] · 6，原式化为 [(1 + 2x)^(1/(2x))]⁶。",
      "当 x → 0 时括号内趋向 e，结合幂函数连续性得极限为 e⁶。",
    ],
    takeaway:
      "遇到 1^∞ 型先锁定底数中趋向 0 的项 u(x)，把指数配成 [1/u(x)] · k，再化为 e^k。",
  },
  {
    id: "infinitesimal",
    definitionExplanation: "当 α(x) 和 β(x) 在同一极限过程中都趋近于 0，并且两者比值的极限等于 1 时，说明它们在最主要的趋零阶数上完全一致，互称等价无穷小。在纯乘除结构里把复杂的无穷小替换成简单同阶项，不会改变最终极限。",
    chapter: 1,
    title: "等价无穷小替换",
    intuition:
      "当 x 足够靠近 0 时，sin x、tan x、ln(1 + x)、eˣ − 1 的曲线在原点附近几乎都贴在直线 y = x 上，而 1 − cos x 则贴近抛物线 x²/2。看清每个无穷小的「主角是谁」，就能把一团三角、对数、指数的乘除瞬间简化成简单的幂函数比值。",
    definition: String.raw`\begin{gathered}\lim_{x\to a}\frac{\alpha(x)}{\beta(x)}=1\iff\alpha(x)\sim\beta(x)\\[4pt]x\to0:\;\sin x\sim x,\;\ln(1+x)\sim x\\[2pt]1-\cos x\sim\tfrac12x^2,\;e^x-1\sim x\end{gathered}`,
    condition:
      "当 u(x) → 0 时，sin u ~ u、tan u ~ u、ln(1 + u) ~ u、eᵘ − 1 ~ u、1 − cos u ~ u²/2。同一过程中若 α/β → 0，则 α 是比 β 高阶的无穷小；若比值趋于有限非零数，则两者同阶（比值为 1 时等价）。注意：等价替换只对乘积或商的整体因子安全；如果放在加减法里恰好把一阶主项相消了（如 tan x − sin x），直接各自代换会算错。",
    example: String.raw`\lim_{x\to0}\frac{1-\cos 2x}{x\sin x}=2`,
    steps: [
      "当 x → 0 时分子分母均趋于 0，属于 0/0 型未定式，且分子、分母均为乘积因子。",
      "令 u = 2x → 0，由 1 − cos u ~ u²/2 得 1 − cos 2x ~ (2x)² / 2 = 2x²。",
      "分母中 sin x ~ x，故 x · sin x ~ x²。",
      "将乘除因子整体替换：原极限 = lim (2x² / x²) = 2。",
    ],
    takeaway:
      "等价无穷小只对乘除因子整体代换安全；加减法若发生主部抵消，直接替换会出错。",
  },
  {
    id: "continuity",
    definitionExplanation: "函数在一点连续，直白来说就是图像在这里既不断裂也不错位：从左边靠过来的极限、从右边靠过来的极限，必须存在且正好等于该点自己画出来的函数值 f(a)。",
    chapter: 1,
    title: "连续性与左右极限",
    intuition:
      "有些分段函数看似在分界点「能代入算出一个数」，但如果左半段和右半段在那里落不到同一高度，或者该点的实心点被挪去了别处，整条曲线仍然在这个点断开。连续性检查的正是曲线的左右走势和点本身是否严丝合缝地接上。",
    definition: String.raw`\lim_{x\to a}f(x)=f(a)`,
    condition:
      "在定义域内点 a 连续要求三件事全成立：f(a) 有定义、双侧极限存在、且极限值等于 f(a)（区间端点用对应单侧极限）。分类上看，左右极限都有限且相等但与点值不符或无定义，叫可去间断；左右极限有限但不相等，叫跳跃间断；只要至少一侧极限不存在或为无穷，就是第二类间断。连续性在四则运算（分母非零）与复合下保持；闭区间上的连续函数一定有界、能取到最大最小值，并能取遍介于两者之间的每个值。",
    example: String.raw`f(x)=\begin{cases}0&x<0\\1&x\ge0\end{cases}`,
    steps: [
      "当 x 从左侧趋近 0 时，f(x) 恒为 0，左极限为 0。",
      "当 x 从右侧趋近 0 时，f(x) 恒为 1，右极限为 1。",
      "左右极限不相等，因此双侧极限不存在。",
      "虽然 f(0) = 1 有定义，函数仍在 0 处不连续，这是跳跃间断点。",
    ],
    takeaway: "有函数值不等于连续；必须同时检查左右极限和函数值。",
  },
  {
    id: "derivative",
    definitionExplanation: "先把函数值的改变量除以自变量的步长 h，算出这一小段上的平均斜率（割线斜率）；再把步长 h 不断缩向 0，若从左右缩拢时比值收敛到同一个有限数，那就是曲线在该点的瞬时变化率——导数。",
    chapter: 2,
    title: "导数的定义与切线",
    intuition:
      "平均车速只看整段路的总时间与总路程，想测出经过某一根路灯柱那一刹那的瞬时速度，得把测量时间段无限缩短。几何上，连接定点 x₀ 与邻近点 x₀ + h 的割线会在 h → 0 时绕定点转动并贴近极限位置，那条贴着曲线的直线就是切线，它的斜率就是导数。",
    definition: String.raw`f'(x_0)=\lim_{h\to0}\frac{f(x_0+h)-f(x_0)}{h}`,
    condition:
      "差商 [f(x₀ + h) − f(x₀)] / h 是平均变化率，在 h = 0 处本身无意义；只有当 h → 0⁻ 与 h → 0⁺ 的左右差商极限都存在且相等时，函数才在 x₀ 可导。可导必然连续，但连续未必可导（比如有尖角的 |x|）。常见底线结果：常数函数导数为 0，一次函数导数为其斜率；按差商定义展开平方差可直接算出 (x²)′ = 2x。",
    example: String.raw`\begin{gathered}f(x)=x^2\\[4pt]f'(1)=\lim_{h\to0}\frac{(1+h)^2-1}{h}=2\end{gathered}`,
    steps: [
      "写出 x₀ = 1 处的差商：Δy / h = [(1 + h)² − 1] / h（h ≠ 0）。",
      "展开分子：(1 + 2h + h² − 1) / h = (2h + h²) / h。",
      "趋近过程中 h ≠ 0，约去公因子 h，得到割线斜率 2 + h。",
      "令 h → 0，得到切线斜率 f'(1) = 2，切线方程为 y − 1 = 2(x − 1)。",
    ],
    takeaway:
      "导数是差商的极限：先在 h ≠ 0 下化简割线斜率，再取 h → 0 的极限得到切线斜率。",
  },
  {
    id: "rules",
    definitionExplanation: "当两个函数相乘 u · v 时，两项都会随 x 产生小变动，一阶总变动来自「u 在变而 v 按原值乘上」和「v 在变而 u 按原值乘上」这两部分的相加，因此乘积导数是 u′v + uv′，不能把各自导数直接相乘。",
    chapter: 2,
    title: "基本求导法则与初等函数导数",
    intuition:
      "每次都回到差商定义算极限太慢了。把幂、指数、对数、三角函数等基本积木的导数固定下来，再配和、差、积、商求导法则，绝大多数初等函数都能拆成机械组合；关键是盯紧最外层到底是乘积还是商，别乱拆法则。",
    definition: String.raw`\begin{gathered}(x^\alpha)'=\alpha x^{\alpha-1},\;(e^x)'=e^x\\[4pt](\ln x)'=\tfrac1x,\;(\sin x)'=\cos x\\[4pt](\cos x)'=-\sin x\\[4pt](uv)'=u'v+uv'\\[4pt]\left(\frac uv\right)'=\frac{u'v-uv'}{v^2}\end{gathered}`,
    condition:
      "四则求导法则要求 u(x)、v(x) 在考察点都可导，使用商的法则时还要求分母 v(x) ≠ 0。线性组合 (au + bv)' = au' + bv' 可直接拆项求导，但乘积和商必须严守对应公式。若 f 存在可导的反函数且 f'(x) ≠ 0，由 f⁻¹(f(x)) = x 两端求导即可推出反函数导数公式 (f⁻¹)'(f(x)) = 1/f'(x)。",
    example: String.raw`\begin{gathered}f(x)=x\ln x\\[4pt]f'(1)=1\end{gathered}`,
    steps: [
      "识别结构：f(x) = x ln x 是两个可导函数 u = x 与 v = ln x（x > 0）的乘积。",
      "应用乘积求导法则：f'(x) = u'v + uv' = (x)' · ln x + x · (ln x)'。",
      "代入基本导数公式：(x)' = 1，(ln x)' = 1/x，故 f'(x) = ln x + x · (1/x) = ln x + 1。",
      "代入 x = 1，由 ln 1 = 0 得 f'(1) = 0 + 1 = 1。",
    ],
    takeaway:
      "乘积求导口诀是「前导后不导 + 前不导后导」，切勿误写成 (uv)' = u'v'。",
  },
  {
    id: "chain",
    definitionExplanation: "对于 f(g(x)) 这类层层嵌套的复合函数，求导就像剥洋葱：先对最外层 f 求导（括号里的内层表达式 g(x) 保持原封不动），最后别忘了再乘以内层 g'(x) 的导数，把每一层的变化倍率连乘起来。",
    chapter: 2,
    title: "复合函数求导（链式法则）",
    intuition:
      "如果 y 对中间变量 u 的变化率是 2 倍，而 u 对自变量 x 的变化率是 3 倍，那么 x 每变动一点点，影响沿着链条传下去就会放大成 2 × 3 = 6 倍。链式法则做的就是由外向内把复合结构拆成单层，再逐层乘出总导数。",
    definition: String.raw`\begin{gathered}y=f(g(x)),\;u=g(x)\\[4pt]\frac{dy}{dx}=\frac{dy}{du}\cdot\frac{du}{dx}=f'(g(x))g'(x)\end{gathered}`,
    condition:
      "需要内层 u = g(x) 在点 x 可导，且外层 y = f(u) 在对应值 u = g(x) 处可导。做题时对外层求导务必要把内层 g(x) 原样留着，然后只在末尾乘一次 g'(x)，最常见的丢分点正是忘了乘内层导数。",
    example: String.raw`\begin{gathered}f(x)=(2x+1)^3\\[4pt]f'(0)=6\end{gathered}`,
    steps: [
      "拆解复合层次：令内层 u = g(x) = 2x + 1，外层为幂函数 y = u³。",
      "先对外层关于 u 求导：dy/du = 3u² = 3(2x + 1)²。",
      "再求内层关于 x 的导数：du/dx = (2x + 1)' = 2，相乘得 f'(x) = 6(2x + 1)²。",
      "代入 x = 0，得 f'(0) = 6 × 1² = 6。",
    ],
    takeaway:
      "链式法则由外向内逐层剥开，最常见的失误是只对外层求导而漏乘内层导数 g'(x)。",
  },
  {
    id: "differential",
    definitionExplanation: "把曲线在切点附近放大，它和切线几乎重合。自变量挪动一小步 Δx 时，沿着切线直直走出来的那段高度增量就是微分 dy = f'(x₀)Δx——它抓住了一阶线性主要部分，和真实高度改变量 Δy 的差是更高阶的小量。",
    chapter: 2,
    title: "微分的概念与线性近似",
    intuition:
      "直接算复杂函数在 x₀ + Δx 处的增量 Δy 常常不好算；当步长 |Δx| 很小时，用切线的斜率乘步长写出 dy = f'(x₀)Δx，就相当于在局部拿一条更好算的直线顶替弯曲的曲线来做近似估算。",
    definition: String.raw`\begin{gathered}dy=f'(x_0)\Delta x=f'(x_0)dx\\[4pt]\Delta y=f(x_0+\Delta x)-f(x_0)\\[4pt]\Delta y=dy+o(\Delta x)\end{gathered}`,
    condition:
      "对一元函数来说，在点 x₀ 可微和可导等价。线性近似 f(x₀ + Δx) ≈ f(x₀) + f'(x₀)Δx 仅在 |Δx| 很小时准确，步长变大时弯曲误差 o(Δx) 不能忽略。微分的四则运算规则直接跟着导数走；同时具有「一阶微分形式不变性」：即使 u 是中间变量 u(x)，y = f(u) 的微分依然能写成 dy = f'(u)du。",
    example: String.raw`\begin{gathered}f(x)=x^2,\;x_0=2,\;\Delta x=0.1\\[4pt]dy=f'(2)\Delta x=0.4\end{gathered}`,
    steps: [
      "求基准点导数：由 f(x) = x² 得 f'(x) = 2x，在 x₀ = 2 处切线斜率 f'(2) = 4。",
      "计算微分（切线增量）：dy = f'(2)Δx = 4 × 0.1 = 0.4。",
      "对比真实增量：Δy = 2.1² − 2² = 4.41 − 4 = 0.41。",
      "观察误差：|Δy − dy| = 0.01 = (Δx)²，当 Δx → 0 时是比 Δx 更高阶的无穷小。",
    ],
    takeaway:
      "微分 dy 是切线高度增量，真实增量 Δy 是曲线高度增量；两者的差是 Δx 的高阶无穷小 o(Δx)。",
  },
  {
    id: "mvt",
    definitionExplanation: "拉格朗日中值定理说的是：只要曲线在闭区间连续且在内部光滑可导，中途就至少存在一点 ξ，使该点切线的斜率 f'(ξ) 恰好等于两端点连线（弦）的平均斜率 [f(b) − f(a)]/(b − a)；当两端点同高时，这条水平切线结论就是罗尔定理。",
    chapter: 3,
    title: "罗尔、拉格朗日与柯西中值定理",
    intuition:
      "开车一小时走完 12 公里，全程平均时速是 12 公里每小时；只要行驶过程既没有瞬移断崖，途中的瞬时速度也一直存在，车上就必然至少有某一时刻的瞬时速度正好指向 12。在函数图上，两端等高时（罗尔定理）对应平顶或平谷；两端高低不同（拉格朗日中值定理），中途一定找得到一条与两端弦平行的切线。",
    definition: String.raw`\begin{gathered}f(a)=f(b)\implies f'(\xi)=0\\[4pt]f'(\xi)=\frac{f(b)-f(a)}{b-a}\\[4pt]\xi\in(a,b)\end{gathered}`,
    condition:
      "三个定理都要求：在闭区间 [a, b] 上连续，且在开区间 (a, b) 内可导。哪怕内部只漏出一个间断点或尖角（例如 |x| 在 x = 0 处），定理结论都可能落空。柯西中值定理把横坐标换成了另一个满足条件且导数 g'(x) ≠ 0 的函数 g(x)，得到 [f(b) − f(a)]/[g(b) − g(a)] = f'(ξ)/g'(ξ)，取 g(x) = x 就退回拉格朗日。",
    example: String.raw`\begin{gathered}f(x)=x^2,\;x\in[1,5]\\[4pt]f'(\xi)=\frac{25-1}{5-1}=6\\[4pt]\xi=3\end{gathered}`,
    steps: [
      "检验条件：多项式 f(x) = x² 在 [1, 5] 上连续，在 (1, 5) 内可导，满足拉格朗日中值定理。",
      "计算端点连线（弦）的平均变化率：[f(5) − f(1)] / (5 − 1) = (25 − 1) / 4 = 6。",
      "写出中值点的导数方程：f'(ξ) = 2ξ = 6。",
      "解得 ξ = 3，位于 (1, 5) 内，在该点切线与端点弦平行。",
    ],
    takeaway:
      "拉格朗日中值定理建立了“区间整体增量 Δy”与“内部某点导数 f'(ξ)”之间的桥梁。",
  },
  {
    id: "lhopital",
    definitionExplanation: "遇到 0/0 或 ∞/∞ 这类直接比不出结果的未定式时，若符合局部求导条件，可以把分子和分母分别求导；只要新分式的极限存在（或为无穷），原来的极限就等于变化率之比 f'(x)/g'(x) 的极限。",
    chapter: 3,
    title: "洛必达法则与未定式极限",
    intuition:
      "当分子与分母同时滑向 0（或者同时冲向无穷）时，光看数值本身已经比不出大小；决定比值最终走向的，是在靠近目标的过程中分子与分母各自变化的速度谁更快——把两者同时换成导数就是在比速率。",
    definition: String.raw`\begin{gathered}\lim_{x\to a}f(x)=0,\;\lim_{x\to a}g(x)=0\\[4pt]\lim_{x\to a}\frac{f(x)}{g(x)}=\lim_{x\to a}\frac{f'(x)}{g'(x)}\end{gathered}`,
    condition:
      "必须先核实是 0/0 型或 ∞/∞ 型未定式，同时在 a 的去心邻域内 f'(x)、g'(x) 存在且 g'(x) ≠ 0，并且求导后的比值极限存在（或为无穷）。切记是对分子分母分别各自求导，绝对不能用商的求导法则！遇到 0·∞ 或 ∞−∞ 先化为商式；正底数的 1^∞、0^0、∞^0 型则先取对数转化。",
    example: String.raw`\begin{gathered}\lim_{x\to0}\frac{e^x-1-x}{x^2}\\[4pt]=\lim_{x\to0}\frac{e^x-1}{2x}=\frac12\end{gathered}`,
    steps: [
      "先判别未定式类型：x → 0 时分子 eˣ − 1 − x → 0，分母 x² → 0，属于 0/0 型。",
      "第一次应用洛必达法则：分子分母分别求导，化为 lim (eˣ − 1) / (2x)。",
      "此时仍为 0/0 型，可继续求导得 lim eˣ / 2（或用等价无穷小 eˣ − 1 ~ x）。",
      "代入 x → 0 得 e⁰ / 2 = 1/2。",
    ],
    takeaway:
      "每次使用洛必达法则前都必须先确认仍是 0/0 或 ∞/∞ 型；非未定式盲目求导会算出错误结果。",
  },
  {
    id: "extrema",
    definitionExplanation: "一阶导数 f'(x) 的正负号控制函数是向上涨还是往下掉；在切线变平的驻点处，若先涨后跌（或 f''(x₀) < 0 向下弯曲）就成极大值，先跌后涨则成极小值。但切线平了也不一定有极值，比如山腰平了一下继续往上爬，必须看导数两侧是否真变了号。",
    chapter: 3,
    title: "函数的单调性、极值与拐点",
    intuition:
      "如果说一阶导数管的是曲线「往哪走」（递增还是递减），那二阶导数管的就是曲线「怎么弯」（向上凹还是向下凸）。把这两把尺子拼在一起，就能精准定位函数的山峰（极大值）、谷底（极小值）和弯曲方向发生切换的拐点。",
    definition: String.raw`\begin{gathered}f'(x)>0\Rightarrow\text{单调递增}\\[4pt]f'(x)<0\Rightarrow\text{单调递减}\\[4pt]f'(x_0)=0,\;f''(x_0)<0\Rightarrow\text{极大}\\[4pt]f'(x_0)=0,\;f''(x_0)>0\Rightarrow\text{极小}\end{gathered}`,
    condition:
      "f'(x₀) = 0 的点叫驻点。可导函数的极值点必是驻点，但反过来不成立（比如 f(x) = x³ 在 x = 0 处 f'(0) = 0，但两侧导数同正，不是极值）。极值既可以用一阶导数在点两侧是否变号来判别，也可以在驻点处结合 f''(x₀) 的正负判别。二阶导数为正区间向上弯，为负区间向下弯，连续且两侧凹凸切换的点叫拐点（如例题中 f''(x) = 6x，故 (0, 0) 为拐点）。",
    example: String.raw`\begin{gathered}f(x)=x^3-3x\\[4pt]f'(x)=3(x^2-1)\\[4pt]f(-1)=2,\;f(1)=-2\end{gathered}`,
    steps: [
      "求一阶导数并找驻点：f'(x) = 3x² − 3 = 3(x + 1)(x − 1)，令 f'(x) = 0 得驻点 x = −1 和 x = 1。",
      "分析单调区间：x < −1 或 x > 1 时 f'(x) > 0（递增）；−1 < x < 1 时 f'(x) < 0（递减）。",
      "判别极值：在 x = −1 处导数由正变负（且 f''(−1) = −6 < 0），取极大值 f(−1) = 2。",
      "在 x = 1 处导数由负变正（且 f''(1) = 6 > 0），取极小值 f(1) = −2。",
    ],
    takeaway:
      "求极值先找驻点 f'(x) = 0 与不可导点，再用一阶导数变号或二阶导数正负来严格判别。",
  },
  ...integralLessons,
  ...applicationLessons,
  ...textbookLessons,
  ...multivariableLessons,
  ...seriesLessons,
  ...differentialEquationsLessons,
];
export const practiceDifficultyLabels = {
  basic: "基础",
  applied: "提高",
  challenge: "挑战",
} as const;
export type PracticeDifficulty = keyof typeof practiceDifficultyLabels;

export interface GuidedHint {
  change: string;
  text: string;
  formula: string;
}

interface ProblemDetails {
  guidedHints?: GuidedHint[];
  difficulty?: PracticeDifficulty;
  formulaIds?: string[];
  id: string;
  lessonId: string;
  title: string;
  formula: string;
  hints: string[];
  explanation: string;
  errorTag: string;
  errorLabel: string;
}
export type NumericProblem = ProblemDetails & { answer: number; unit: string };
export const writtenProblemKinds = ["证明题", "作图题", "推导题"] as const;
export type WrittenProblem = ProblemDetails & {
  kind: (typeof writtenProblemKinds)[number];
  prompt: string;
  source?: string;
  commonMistake?: string;
  steps: [string, string, string];
  solution: string;
  graph?: PracticeGraph;
  questionGraph?: PracticeGraph;
};
export type PracticeGraph = {
  bounds: [number, number, number, number];
  branches: [start: number, end: number, fn: (x: number) => number][];
  points?: [x: number, y: number, included: boolean][];
  ticks?: { x: number[]; y: number[]; xLabels?: Record<number, string> };
  description: string;
};
export type Problem = NumericProblem | WrittenProblem;


export const chapters = [
  {
    id: 1 as const,
    title: "第一章 · 函数、极限与连续",
    short: "第一章：极限与连续",
  },
  {
    id: 2 as const,
    title: "第二章 · 导数与微分",
    short: "第二章：导数与微分",
  },
  {
    id: 3 as const,
    title: "第三章 · 微分中值定理与导数应用",
    short: "第三章：微分中值定理与导数应用",
  },
  { id: 4 as const, title: "第四章 · 不定积分", short: "第四章：不定积分" },
  { id: 5 as const, title: "第五章 · 定积分及其应用", short: "第五章：定积分及其应用" },
  { id: 6 as const, title: "第六章 · 多元函数微积分", short: "第六章：多元函数微积分" },
  { id: 7 as const, title: "第七章 · 无穷级数", short: "第七章：无穷级数" },
  { id: 8 as const, title: "第八章 · 常微分方程及差分方程", short: "第八章：常微分方程及差分方程" },
];
export const errorTags = Array.from(
  new Map(
    problemIndex.map((p) => {
      const chapter = p.ch;
      return [p.errorTag, { tag: p.errorTag, label: p.errorLabel, chapter }];
    }),
  ).values(),
);
export function computeMastery(
  attempts: { problemId: string; correct: boolean }[],
) {
  const latest = new Map<string, boolean>();
  for (const a of attempts) latest.set(a.problemId, a.correct);
  const summarize = (list: readonly ProblemIndexEntry[]) => {
    const attempted = list.filter((p) => latest.has(p.id)).length;
    const mastered = list.filter((p) => latest.get(p.id) === true).length;
    const pending = list.filter((p) => latest.get(p.id) === false).length;
    const weakTags = Array.from(
      new Set(
        list
          .filter((p) => latest.get(p.id) === false)
          .map((p) => p.errorLabel),
      ),
    );
    return {
      total: list.length,
      attempted,
      mastered,
      pending,
      weakTags,
      rate: list.length ? Math.round((mastered / list.length) * 100) : 0,
    };
  };
  return {
    chapters: chapters.map((c) => {
      return {
        ...c,
        ...summarize(problemIndex.filter((p) => p.ch === c.id)),
      };
    }),
    tags: errorTags.map((t) => ({
      ...t,
      ...summarize(problemIndex.filter((p) => p.errorTag === t.tag)),
    })),
  };
}
export function parseAnswer(raw: string): number | null {
  const s = raw.trim().replaceAll("−", "-").replaceAll("／", "/");
  const n = "[+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+)";
  if (!new RegExp(`^${n}(?:\\s*/\\s*${n})?$`).test(s)) return null;
  const parts = s.split("/").map(Number);
  if (parts.length === 2 && parts[1] === 0) return null;
  const value = parts.length === 2 ? parts[0] / parts[1] : parts[0];
  return Number.isFinite(value) ? value : null;
}
export function checkAnswer(raw: string, answer: number): boolean | null {
  const n = parseAnswer(raw);
  return n === null ? null : Math.abs(n - answer) <= 1e-6;
}
export type ExperimentKind =
  | "hole"
  | "sine"
  | "euler"
  | "infinitesimal"
  | "jump";
/** Default limit experiment shown inside each limit lesson's 实验 tab. */
export const lessonExperiment: Record<string, ExperimentKind> = {
  limit: "hole",
  sine: "sine",
  euler: "euler",
  infinitesimal: "infinitesimal",
  continuity: "jump",
};
/** One-sided limit values used for reference lines (observation aid only). */
export const experimentLimits: Record<
  ExperimentKind,
  { a: number; left: number; right: number; label?: string }
> = {
  hole: { a: 1, left: 2, right: 2 },
  sine: { a: 0, left: 1, right: 1 },
  euler: { a: 0, left: Math.E, right: Math.E, label: "e" },
  infinitesimal: { a: 0, left: 0.5, right: 0.5, label: "0.5" },
  jump: { a: 0, left: 0, right: 1 },
};
export function experimentValue(
  kind: ExperimentKind,
  x: number,
): number | null {
  if (kind === "hole") return x === 1 ? null : x + 1;
  if (kind === "sine") return x === 0 ? null : Math.sin(x) / x;
  if (kind === "euler")
    return x === 0 || x <= -1 ? null : Math.pow(1 + x, 1 / x);
  if (kind === "infinitesimal") {
    if (x === 0) return null;
    const half = Math.sin(x / 2);
    return (2 * half * half) / (x * x);
  }
  return x < 0 ? 0 : 1;
}
export type SecantKind = "square" | "cubic" | "sqrt" | "chain";
export const lessonSecant: Record<string, SecantKind> = {
  derivative: "square",
  rules: "cubic",
  chain: "chain",
  differential: "sqrt",
};
export const secantModels: Record<
  SecantKind,
  {
    label: string;
    x0: number;
    y0: number;
    derivative: number;
    range: [number, number, number, number];
    fn: (x: number) => number;
  }
> = {
  square: {
    label: "二次函数：f(x) = x²（在 x₀ = 1 处）",
    x0: 1,
    y0: 1,
    derivative: 2,
    range: [0, 2.2, -0.3, 4.5],
    fn: (x) => x * x,
  },
  cubic: {
    label: "三次函数：f(x) = x³ − x（在 x₀ = 1 处）",
    x0: 1,
    y0: 0,
    derivative: 2,
    range: [0, 2.0, -0.8, 4.2],
    fn: (x) => x * x * x - x,
  },
  sqrt: {
    label: "根式函数：f(x) = √x（在 x₀ = 1 处）",
    x0: 1,
    y0: 1,
    derivative: 0.5,
    range: [0, 2.4, 0, 1.8],
    fn: (x) => Math.sqrt(x),
  },
  chain: {
    label: "复合函数：f(x) = (2x − 1)²（在 x₀ = 1 处）",
    x0: 1,
    y0: 1,
    derivative: 4,
    range: [0.2, 1.9, -0.2, 5.2],
    fn: (x) => (2 * x - 1) * (2 * x - 1),
  },
};
/** Difference quotient [f(x0 + h) - f(x0)] / h; undefined (null) at h = 0. */
export function secantSlope(kind: SecantKind, h: number): number | null {
  if (h === 0) return null;
  const m = secantModels[kind];
  if (!m || (m.x0 + h < 0 && kind === "sqrt")) return null;
  return (m.fn(m.x0 + h) - m.y0) / h;
}
export interface LinearApproxResult {
  dy: number;
  deltaY: number;
  error: number;
  errorRatio: number | null;
}
/** Differential linear approximation dy = f'(x0)h vs true increment deltaY. */
export function linearApprox(
  kind: SecantKind,
  h: number,
): LinearApproxResult | null {
  const m = secantModels[kind];
  if (!m || (m.x0 + h < 0 && kind === "sqrt")) return null;
  const dy = m.derivative * h;
  const deltaY = m.fn(m.x0 + h) - m.y0;
  const error = Math.abs(deltaY - dy);
  return {
    dy,
    deltaY,
    error,
    errorRatio: h === 0 ? null : error / Math.abs(h),
  };
}
export type DerivativeAppKind = "mvt" | "lhopital" | "extrema";
export const lessonDerivativeApp: Record<string, DerivativeAppKind> = {
  mvt: "mvt",
  lhopital: "lhopital",
  extrema: "extrema",
};
export const derivativeAppModels: Record<
  DerivativeAppKind,
  {
    label: string;
    range: [number, number, number, number];
    minX: number;
    maxX: number;
    stepX: number;
    defaultX: number;
  }
> = {
  mvt: {
    label: "拉格朗日中值定理：f(x) = x² 在 [0, 2] 上寻找平行切线点 ξ",
    range: [-0.2, 2.2, -0.4, 4.4],
    minX: 0.1,
    maxX: 1.9,
    stepX: 0.05,
    defaultX: 1,
  },
  lhopital: {
    label: "洛必达法则未定式：(eˣ − 1 − x) / x² 与导数比 (eˣ − 1) / (2x)",
    range: [-1.5, 1.5, 0.2, 1.0],
    minX: -1.2,
    maxX: 1.2,
    stepX: 0.05,
    defaultX: 0.4,
  },
  extrema: {
    label: "单调性与极值判别：f(x) = x³ − 3x 的一阶导数符号与驻点凹凸性",
    range: [-2.1, 2.1, -3.5, 3.5],
    minX: -1.8,
    maxX: 1.8,
    stepX: 0.05,
    defaultX: -1,
  },
};
export interface DerivativeAppState {
  x: number;
  fx: number;
  dfx: number;
  d2fx: number;
  secantSlope: number;
  tangentSlope: number;
  slopeDiff: number;
  c: number;
  ratio: number;
  derivativeRatio: number;
  limit: number;
  monotone: "单调递增" | "单调递减" | "极大值驻点" | "极小值驻点";
}
/**
 * Evaluates Chapter 3 derivative application models.
 * Returns null at undefined points (such as x = 0 for L'Hopital 0/0 ratio).
 */
export function derivativeAppState(
  kind: DerivativeAppKind,
  x: number,
): DerivativeAppState | null {
  if (kind === "lhopital") {
    if (x === 0) return null;
    const ratio =
      Math.abs(x) < 1e-3
        ? 0.5 + x / 6 + (x * x) / 24 + (x * x * x) / 120
        : (Math.exp(x) - 1 - x) / (x * x);
    const derivativeRatio =
      Math.abs(x) < 1e-4
        ? 0.5 + x / 4 + (x * x) / 12
        : (Math.exp(x) - 1) / (2 * x);
    return {
      x,
      fx: ratio,
      dfx: derivativeRatio,
      d2fx: 0.5,
      secantSlope: 0.5,
      tangentSlope: derivativeRatio,
      slopeDiff: Math.abs(ratio - 0.5),
      c: 0,
      ratio,
      derivativeRatio,
      limit: 0.5,
      monotone: x > 0 ? "单调递增" : "单调递增",
    };
  }
  if (kind === "mvt") {
    const fx = x * x;
    const dfx = 2 * x;
    const secantSlope = (2 * 2 - 0) / (2 - 0);
    return {
      x,
      fx,
      dfx,
      d2fx: 2,
      secantSlope,
      tangentSlope: dfx,
      slopeDiff: Math.abs(dfx - secantSlope),
      c: 1,
      ratio: dfx,
      derivativeRatio: secantSlope,
      limit: secantSlope,
      monotone: "单调递增",
    };
  }
  const fx = x * x * x - 3 * x;
  const dfx = 3 * x * x - 3;
  const d2fx = 6 * x;
  const monotone =
    Math.abs(dfx) < 1e-6
      ? d2fx < 0
        ? "极大值驻点"
        : "极小值驻点"
      : dfx > 0
        ? "单调递增"
        : "单调递减";
  return {
    x,
    fx,
    dfx,
    d2fx,
    secantSlope: 0,
    tangentSlope: dfx,
    slopeDiff: Math.abs(dfx),
    c: -1,
    ratio: fx,
    derivativeRatio: dfx,
    limit: 0,
    monotone,
  };
}

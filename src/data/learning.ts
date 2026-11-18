import { integralLessons, integralProblems } from "./integrals";
import { applicationLessons, applicationProblems } from "./integralApplications";
export type ChapterId = 1 | 2 | 3 | 4 | 5;
export interface Lesson {
  id: string;
  chapter: ChapterId;
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
    chapter: 1,
    title: "函数极限",
    intuition:
      "想象你沿着曲线走向 x = 1。我们关心的是附近的函数值走向哪里，而不是这个点本身有没有定义。例如 (x² − 1)/(x − 1) 在 x = 1 没有定义，但附近的函数值会靠近 2。",
    definition: String.raw`\lim_{x\to a}f(x)=L`,
    condition:
      "直观含义：当 x 充分接近 a（但不等于 a）时，f(x) 可以任意接近 L。严格定义：对任意 ε > 0，存在 δ > 0，使 0 < |x − a| < δ 时都有 |f(x) − L| < ε。左右极限存在且相等时，双侧极限才存在。",
    example: String.raw`\lim_{x\to1}\frac{x^2-1}{x-1}=2`,
    steps: [
      "先判断：直接代入会得到 0/0，它不是答案。",
      "当 x ≠ 1 时，x² − 1 = (x − 1)(x + 1)，所以原式可以约成 x + 1。",
      "趋近过程中只需要考察 x ≠ 1 的点，因此约分合法。",
      "x + 1 在 x = 1 连续，极限为 1 + 1 = 2。",
    ],
    takeaway:
      "极限描述附近的趋势。0/0 是未定式，不能当作 0，也不能当作极限不存在的结论。",
  },
  {
    id: "sine",
    chapter: 1,
    title: "第一个重要极限",
    intuition:
      "角度以弧度计量时，很小的 x 与 sin x 十分接近。比值 sin x / x 从左右两侧趋向 1。数值和图形帮助建立直觉，但它们本身不是证明。",
    definition: String.raw`\lim_{x\to0}\frac{\sin x}{x}=1`,
    condition:
      "角度必须使用弧度。使用该结论时，正弦的自变量与分母要配成同一个趋近于 0 的量。",
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
    chapter: 1,
    title: "第二个重要极限",
    intuition:
      "把本金 1 元按年利率 100% 复利计息：拆成 n 期时本息和为 (1 + 1/n)ⁿ。结算越密集，结果不会冲向无穷，而是稳定逼近无理数 e ≈ 2.71828。推广到连续自变量，x → 0 时 (1 + x)^(1/x) 从左右两侧都趋向 e。",
    definition: String.raw`\begin{gathered}\lim_{x\to0}(1+x)^{\frac1x}=e\\[4pt]\lim_{n\to\infty}\left(1+\frac1n\right)^n=e\end{gathered}`,
    condition:
      "核心特征是 1^∞ 型未定式：底数写成 1 + u(x)，其中 u(x) → 0 且 u(x) ≠ 0，再把指数配成 1 / u(x) 的倍数。若底数极限不是 1，不能直接套用。",
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
    chapter: 1,
    title: "等价无穷小替换",
    intuition:
      "当 x 非常接近 0 时，sin x、tan x、ln(1 + x)、eˣ − 1 的曲线在原点附近几乎都贴在直线 y = x 上，而 1 − cos x 则贴近抛物线 x²/2。抓住无穷小量的主要部分，可以把复杂的乘除极限化为简单的幂函数比值。",
    definition: String.raw`\begin{gathered}\lim_{x\to a}\frac{\alpha(x)}{\beta(x)}=1\iff\alpha(x)\sim\beta(x)\\[4pt]x\to0:\;\sin x\sim x,\;\ln(1+x)\sim x\\[2pt]1-\cos x\sim\tfrac12x^2,\;e^x-1\sim x\end{gathered}`,
    condition:
      "当 u(x) → 0 时，sin u ~ u，tan u ~ u，ln(1 + u) ~ u，eᵘ − 1 ~ u，1 − cos u ~ u²/2。整个乘除因子可以直接替换；但加减项中若一阶主部相互抵消，不能直接替换。",
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
    chapter: 1,
    title: "连续性与左右极限",
    intuition:
      "在一点连续，意味着从附近靠近时，曲线走向的高度正好就是该点的函数值。如果左右走向不同的高度，即使函数在该点有值，也不连续。",
    definition: String.raw`\lim_{x\to a}f(x)=f(a)`,
    condition:
      "在定义域的内点 a 连续需要：f(a) 有定义；双侧极限存在；极限等于 f(a)。定义域端点使用相应单侧极限。",
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
    chapter: 2,
    title: "导数的定义与切线",
    intuition:
      "在曲线上取定点 x₀ 与邻近点 x₀ + h，连线就是割线。当步长 h 逐渐缩小趋向 0 时，两点无限靠近，割线绕定点旋转并趋向极限位置——切线。割线斜率的极限就是函数在该点的瞬时变化率（导数）。",
    definition: String.raw`f'(x_0)=\lim_{h\to0}\frac{f(x_0+h)-f(x_0)}{h}`,
    condition:
      "差商 [f(x₀ + h) − f(x₀)] / h 表示割线斜率（平均变化率），在 h = 0 处未定义。仅当 h → 0⁻ 与 h → 0⁺ 的左右差商极限都存在且相等时，f(x) 在 x₀ 处才可导。可导必连续，但连续不一定可导。",
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
    chapter: 2,
    title: "基本求导法则与初等函数导数",
    intuition:
      "每次都回到差商定义求极限会很繁琐。先对幂函数、三角函数、指数与对数函数建立基本导数公式，再配合和、差、积、商求导法则，就能像搭积木一样求常见初等函数的导数。注意乘积求导不是导数直接相乘，而是两项变化率的叠加。",
    definition: String.raw`\begin{gathered}(x^\alpha)'=\alpha x^{\alpha-1},\;(e^x)'=e^x\\[4pt](\ln x)'=\tfrac1x,\;(\sin x)'=\cos x\\[4pt](\cos x)'=-\sin x\\[4pt](uv)'=u'v+uv'\\[4pt]\left(\frac uv\right)'=\frac{u'v-uv'}{v^2}\end{gathered}`,
    condition:
      "参与运算的函数 u(x)、v(x) 在该点均可导，商的求导法则还要求分母 v(x) ≠ 0。线性组合 (au + bv)' = au' + bv' 可直接逐项求导，但乘积与商必须使用对应法则，不能把因子各自求导后直接相乘或相除。",
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
    chapter: 2,
    title: "复合函数求导（链式法则）",
    intuition:
      "若因变量 y 随中间变量 u 的变化率是 2 倍，而 u 随自变量 x 的变化率是 3 倍，那么 x 每变化一点点，y 的变化率就会通过链条放大为 2 × 3 = 6 倍。复合函数求导就是由外层向内层逐层求导，再把各层变化率相乘。",
    definition: String.raw`\begin{gathered}y=f(g(x)),\;u=g(x)\\[4pt]\frac{dy}{dx}=\frac{dy}{du}\cdot\frac{du}{dx}=f'(g(x))g'(x)\end{gathered}`,
    condition:
      "若内层函数 u = g(x) 在点 x 可导，且外层函数 y = f(u) 在对应点 u = g(x) 可导，则复合函数 y = f(g(x)) 在点 x 可导。对外层求导时要保持内层表达式 g(x) 整体不变，最后再乘以内层导数 g'(x)。",
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
    chapter: 2,
    title: "微分的概念与线性近似",
    intuition:
      "光滑曲线在切点附近局部放大看几乎是一条直线（切线）。当自变量发生微小改变 Δx 时，曲线的真实高度增量 Δy 可能不易直接计算，但沿着切线走出的高度增量 dy = f'(x₀)Δx 只是一次函数。当 |Δx| → 0 时，切线近似与真实增量的误差比 Δx 更快地趋近于 0。",
    definition: String.raw`\begin{gathered}dy=f'(x_0)\Delta x=f'(x_0)dx\\[4pt]\Delta y=f(x_0+\Delta x)-f(x_0)\\[4pt]\Delta y=dy+o(\Delta x)\end{gathered}`,
    condition:
      "一元函数在点 x₀ 可微与可导等价。微分 dy 是真实增量 Δy 的线性主部；线性近似公式 f(x₀ + Δx) ≈ f(x₀) + f'(x₀)Δx 仅在 |Δx| 很小时精度较高，步长较大时高阶项不可忽略。",
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
    chapter: 3,
    title: "罗尔定理与拉格朗日中值定理",
    intuition:
      "在一段光滑起伏的山路上，如果起点与终点海拔相同（罗尔定理），途中至少有一处山顶或谷底的切线是水平的；如果把整段路倾斜过来（拉格朗日中值定理），途中至少有一点 ξ 的瞬时坡度 f'(ξ) 恰好等于整段路的平均坡度 [f(b) − f(a)] / (b − a)。",
    definition: String.raw`\begin{gathered}f(a)=f(b)\implies f'(\xi)=0\\[4pt]f'(\xi)=\frac{f(b)-f(a)}{b-a}\\[4pt]\xi\in(a,b)\end{gathered}`,
    condition:
      "函数 f(x) 必须同时满足两条假设：在闭区间 [a, b] 上连续，且在开区间 (a, b) 内可导。若区间内存在间断点或不可导的尖点（如 |x| 在 x = 0 处），定理结论可能不成立。",
    example: String.raw`\begin{gathered}f(x)=x^2,\;x\in[1,5]\\[4pt]f'(\xi)=\frac{25-1}{5-1}=6\\[4pt]\xi=3\end{gathered}`,
    steps: [
      "检验条件：多项式 f(x) = x² 在 [1, 5] 上连续，在 (1, 5) 内可导，满足拉格朗日中值定理。",
      "计算端点连线（弦）的平均变化率：[f(5) − f(1)] / (5 − 1) = (25 − 1) / 4 = 6。",
      "写出中值点的导数方程：f'(ξ) = 2ξ = 6。",
      "解得 ξ = 3 ∈ (1, 5)，在该点切线与端点弦平行。",
    ],
    takeaway:
      "拉格朗日中值定理建立了「区间整体增量 Δy」与「内部某点导数 f'(ξ)」之间的桥梁。",
  },
  {
    id: "lhopital",
    chapter: 3,
    title: "洛必达法则与未定式极限",
    intuition:
      "当分子 f(x) 与分母 g(x) 在 x → a 时同时趋近于 0，直接代入得到 0/0。此时两者都从 0 出发，它们比值的极限取决于谁变化得更快——即分子导数 f'(x) 与分母导数 g'(x) 在附近的比值极限。",
    definition: String.raw`\begin{gathered}\lim_{x\to a}f(x)=0,\;\lim_{x\to a}g(x)=0\\[4pt]\lim_{x\to a}\frac{f(x)}{g(x)}=\lim_{x\to a}\frac{f'(x)}{g'(x)}\end{gathered}`,
    condition:
      "仅适用于 0/0 型或 ∞/∞ 型未定式；要求在 a 的去心邻域内 f'(x)、g'(x) 存在且 g'(x) ≠ 0，并且求导后的比值极限存在（或为无穷大）。注意：对分子和分母分别求导，不是对分式整体用商的求导法则！",
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
    chapter: 3,
    title: "函数的单调性与极值判别",
    intuition:
      "导数 f'(x) 的正负决定了曲线的走向：f'(x) > 0 时曲线向上爬升（单调递增），f'(x) < 0 时曲线向下滑落（单调递减）。当导数在驻点 x₀ 处由正变负（或二阶导数 f''(x₀) < 0，曲线向下弯）时，就形成了局部极大值。",
    definition: String.raw`\begin{gathered}f'(x)>0\Rightarrow\text{单调递增}\\[4pt]f'(x)<0\Rightarrow\text{单调递减}\\[4pt]f'(x_0)=0,\;f''(x_0)<0\Rightarrow\text{极大}\\[4pt]f'(x_0)=0,\;f''(x_0)>0\Rightarrow\text{极小}\end{gathered}`,
    condition:
      "f'(x₀) = 0 的点称为驻点。可导函数的极值点必为驻点，但驻点不一定是极值点（例如 f(x) = x³ 在 x = 0 处 f'(0) = 0，但左右导数同为正，不是极值点）。",
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
];
export interface Problem {
  formulaIds?: string[];
  id: string;
  lessonId: string;
  title: string;
  formula: string;
  answer: number;
  unit: string;
  hints: string[];
  explanation: string;
  errorTag: string;
  errorLabel: string;
}
export const problems: Problem[] = [
  {
    id: "p1",
    lessonId: "limit",
    title: "约分后再求极限",
    formula: String.raw`\lim_{x\to1}\frac{x^2-1}{x-1}`,
    answer: 2,
    unit: "请输入数值或分数",
    hints: [
      "这是 0/0 型未定式。",
      "利用平方差公式分解分子。",
      "x ≠ 1 时可以约成 x + 1，再求极限。",
    ],
    explanation: "x ≠ 1 时，原式等于 x + 1，因此极限是 2。",
    errorTag: "factorization",
    errorLabel: "因式分解与约分",
  },
  {
    id: "p2",
    lessonId: "limit",
    title: "连续函数的极限",
    formula: String.raw`\lim_{x\to2}(x^2+3x)`,
    answer: 10,
    unit: "请输入数值或分数",
    hints: [
      "多项式在实数范围内连续。",
      "可以直接代入 x = 2。",
      "2² + 3 × 2 = 4 + 6。",
    ],
    explanation: "多项式连续，直接代入得到 4 + 6 = 10。",
    errorTag: "substitution",
    errorLabel: "连续函数代入",
  },
  {
    id: "p3",
    formulaIds: ['sin-limit'],
    lessonId: "sine",
    title: "配齐自变量与分母",
    formula: String.raw`\lim_{x\to0}\frac{\sin3x}{5x}`,
    answer: 3 / 5,
    unit: "角度使用弧度；请输入数值或分数",
    hints: [
      "使用第一个重要极限。",
      "将分母配成 3x。",
      "原式 = (3/5) · sin(3x)/(3x)。",
    ],
    explanation: "原式 = (3/5) · sin(3x)/(3x)，后者趋向 1，结果为 3/5。",
    errorTag: "sine_coefficients",
    errorLabel: "重要极限系数变形",
  },
  {
    id: "p4",
    formulaIds: ['sin-limit'],
    lessonId: "sine",
    title: "再练一次重要极限",
    formula: String.raw`\lim_{x\to0}\frac{\sin2x}{3x}`,
    answer: 2 / 3,
    unit: "角度使用弧度；请输入数值或分数",
    hints: [
      "先观察 sin 的自变量。",
      "把分母中的 3x 换写为与 2x 匹配的形式。",
      "原式 = (2/3) · sin(2x)/(2x)。",
    ],
    explanation: "配成 (2/3) · sin(2x)/(2x)，结果为 2/3。",
    errorTag: "sine_coefficients",
    errorLabel: "重要极限系数变形",
  },
  {
    id: "p5",
    formulaIds: ['continuity'],
    lessonId: "continuity",
    title: "求连续时的函数值",
    formula: String.raw`f(x)=\begin{cases}x+1&x\ne1\\c&x=1\end{cases}`,
    answer: 2,
    unit: "若在 x = 1 连续，c 应为多少？",
    hints: [
      "连续要求函数值等于极限。",
      "附近的表达式是 x + 1。",
      "当 x → 1 时，x + 1 → 2。",
    ],
    explanation: "x → 1 时极限为 2。要连续，f(1) = c 必须等于 2。",
    errorTag: "continuity_value",
    errorLabel: "极限与函数值",
  },
  {
    id: "p6",
    lessonId: "continuity",
    title: "单侧极限",
    formula: String.raw`\begin{gathered}f(x)=\begin{cases}0&x<0\\1&x\ge0\end{cases}\\[4pt]\lim_{x\to0^-}f(x)=\,?\end{gathered}`,
    answer: 0,
    unit: "请输入左极限的值",
    hints: [
      "0⁻ 表示从 0 的左侧趋近。",
      "左侧有 x < 0。",
      "在 x < 0 的区间，f(x) 恒等于 0。",
    ],
    explanation:
      "从左侧趋近时使用 x < 0 的分支，所以左极限为 0。f(0) = 1 不影响左极限。",
    errorTag: "one_sided",
    errorLabel: "左右极限区分",
  },
  {
    id: "p7",
    formulaIds: ['euler-zero'],
    lessonId: "euler",
    title: "第二个重要极限的指数配凑",
    formula: String.raw`\begin{gathered}\lim_{x\to0}(1+2x)^{\frac{3}{x}}=e^k\\[4pt]k=\,?\end{gathered}`,
    answer: 6,
    unit: "请输入指数 k 的数值或分数",
    hints: [
      "这是 1^∞ 型未定式，底数中的趋零项为 u = 2x。",
      "把指数配成 [1/(2x)] · 6，使底数与指数互为倒数结构。",
      "原式 = [(1 + 2x)^(1/(2x))]⁶ → e⁶，因此 k = 6。",
    ],
    explanation:
      "令 u = 2x → 0，则 3/x = 6 · [1/(2x)]，原式趋向 e⁶，故指数 k = 6。",
    errorTag: "euler_exponent",
    errorLabel: "1^∞ 型极限配凑",
  },
  {
    id: "p8",
    formulaIds: ['euler-zero'],
    lessonId: "euler",
    title: "含负号的第二个重要极限",
    formula: String.raw`\begin{gathered}\lim_{x\to0}(1-3x)^{\frac{2}{x}}=e^k\\[4pt]k=\,?\end{gathered}`,
    answer: -6,
    unit: "请输入指数 k 的数值或分数",
    hints: [
      "将底数写成 1 + u，其中 u = −3x → 0。",
      "指数 2/x 需要配出 1/(−3x)，即 2/x = [1/(−3x)] · (−6)。",
      "当 x → 0 时 (1 − 3x)^(−1/(3x)) → e，因此结果为 e⁻⁶，k = −6。",
    ],
    explanation:
      "底数趋零项为 −3x，指数 2/x = (−6) · [1/(−3x)]，极限为 e⁻⁶，故 k = −6。",
    errorTag: "euler_exponent",
    errorLabel: "1^∞ 型极限配凑",
  },
  {
    id: "p9",
    formulaIds: ['small-cos'],
    lessonId: "infinitesimal",
    title: "余弦型等价无穷小",
    formula: String.raw`\lim_{x\to0}\frac{1-\cos 2x}{x^2}`,
    answer: 2,
    unit: "角度使用弧度；请输入数值或分数",
    hints: [
      "当 u → 0 时，1 − cos u ~ u² / 2。",
      "这里 u = 2x → 0，因此 1 − cos 2x ~ (2x)² / 2 = 2x²。",
      "与分母 x² 约分后得到极限值 2。",
    ],
    explanation: "x → 0 时 1 − cos 2x ~ (2x)² / 2 = 2x²，除以 x² 得极限 2。",
    errorTag: "infinitesimal_replace",
    errorLabel: "等价无穷小替换",
  },
  {
    id: "p10",
    formulaIds: ['small-log', 'small-sin'],
    lessonId: "infinitesimal",
    title: "乘除因子的等价替换",
    formula: String.raw`\lim_{x\to0}\frac{\ln(1+3x)}{\sin 2x}`,
    answer: 3 / 2,
    unit: "角度使用弧度；请输入数值或分数",
    hints: [
      "当 u → 0 时，ln(1 + u) ~ u，sin u ~ u。",
      "分子 ln(1 + 3x) ~ 3x，分母 sin 2x ~ 2x。",
      "乘除因子整体替换后，3x / (2x) = 3/2。",
    ],
    explanation:
      "x → 0 时 ln(1 + 3x) ~ 3x，sin 2x ~ 2x，比值极限为 3/2（即 1.5）。",
    errorTag: "infinitesimal_replace",
    errorLabel: "等价无穷小替换",
  },
  {
    id: "p11",
    formulaIds: ['derivative'],
    lessonId: "derivative",
    title: "用导数定义求切线斜率",
    formula: String.raw`\begin{gathered}f(x)=x^2\\[4pt]f'(3)=\lim_{h\to0}\frac{(3+h)^2-9}{h}=\,?\end{gathered}`,
    answer: 6,
    unit: "请输入切线斜率的数值或分数",
    hints: [
      "展开分子：(3 + h)² − 9 = 6h + h²。",
      "当 h ≠ 0 时，差商化简为 (6h + h²) / h = 6 + h。",
      "令 h → 0，得到切线斜率 f'(3) = 6。",
    ],
    explanation:
      "差商 (6h + h²)/h 在 h ≠ 0 时等于 6 + h，当 h → 0 时极限为 6。",
    errorTag: "derivative_definition",
    errorLabel: "导数定义与差商化简",
  },
  {
    id: "p12",
    formulaIds: ['derivative'],
    lessonId: "derivative",
    title: "根式函数的瞬时变化率",
    formula: String.raw`\begin{gathered}f(x)=\sqrt{x}\\[4pt]f'(1)=\lim_{h\to0}\frac{\sqrt{1+h}-1}{h}=\,?\end{gathered}`,
    answer: 1 / 2,
    unit: "请输入数值或分数",
    hints: [
      "分子有理化：分子分母同乘 (√(1 + h) + 1)。",
      "分子化为 (1 + h) − 1 = h，约去 h ≠ 0 后得 1 / (√(1 + h) + 1)。",
      "令 h → 0，得到 1 / (1 + 1) = 1/2。",
    ],
    explanation:
      "有理化后差商等于 1 / (√(1 + h) + 1)，当 h → 0 时极限为 1/2（即 0.5）。",
    errorTag: "derivative_definition",
    errorLabel: "导数定义与差商化简",
  },
  {
    id: "p13",
    formulaIds: ['diff-power', 'sum'],
    lessonId: "rules",
    title: "多项式与幂函数求导",
    formula: String.raw`\begin{gathered}f(x)=x^3-4x+2\\[4pt]f'(2)=\,?\end{gathered}`,
    answer: 8,
    unit: "请输入导数值的数值或分数",
    hints: [
      "利用和差求导法则逐项求导，常数项 2 的导数为 0。",
      "由幂函数求导公式得 (x³)' = 3x²，(−4x)' = −4。",
      "f'(x) = 3x² − 4，代入 x = 2 得 3 × 4 − 4 = 8。",
    ],
    explanation: "逐项求导得 f'(x) = 3x² − 4，代入 x = 2 得 f'(2) = 12 − 4 = 8。",
    errorTag: "derivative_rules",
    errorLabel: "基本求导法则与乘积商法则",
  },
  {
    id: "p14",
    formulaIds: ['product'],
    lessonId: "rules",
    title: "乘积求导法则应用",
    formula: String.raw`\begin{gathered}f(x)=x\ln x\\[4pt]f'(1)=\,?\end{gathered}`,
    answer: 1,
    unit: "请输入导数值的数值或分数",
    hints: [
      "f(x) 是 u = x 与 v = ln x 的乘积，使用 (uv)' = u'v + uv'。",
      "(x)' = 1，(ln x)' = 1/x，故 f'(x) = ln x + x · (1/x) = ln x + 1。",
      "代入 x = 1，由 ln 1 = 0 得 f'(1) = 0 + 1 = 1。",
    ],
    explanation:
      "由乘积求导法则得 f'(x) = ln x + 1，代入 x = 1 得 f'(1) = 1。切勿误算为 (x)' · (ln x)'。",
    errorTag: "derivative_rules",
    errorLabel: "基本求导法则与乘积商法则",
  },
  {
    id: "p15",
    formulaIds: ['chain'],
    lessonId: "chain",
    title: "复合幂函数的链式求导",
    formula: String.raw`\begin{gathered}f(x)=(2x+1)^3\\[4pt]f'(0)=\,?\end{gathered}`,
    answer: 6,
    unit: "请输入导数值的数值或分数",
    hints: [
      "设内层函数 u = 2x + 1，外层函数为 u³。",
      "外层对 u 求导得 3u² = 3(2x + 1)²，再乘以内层导数 u' = 2。",
      "f'(x) = 6(2x + 1)²，代入 x = 0 得 6 × 1² = 6。",
    ],
    explanation:
      "由链式法则 f'(x) = 3(2x + 1)² · 2 = 6(2x + 1)²，在 x = 0 处导数为 6（漏乘内层导数 2 会误得 3）。",
    errorTag: "chain_rule",
    errorLabel: "复合函数链式法则",
  },
  {
    id: "p16",
    formulaIds: ['chain'],
    lessonId: "chain",
    title: "复合对数函数的导数",
    formula: String.raw`\begin{gathered}f(x)=\ln(3x+1)\\[4pt]f'(1)=\,?\end{gathered}`,
    answer: 3 / 4,
    unit: "请输入数值或分数",
    hints: [
      "令内层 u = 3x + 1，外层为 ln u，外层导数为 1/u。",
      "乘以内层导数 u' = 3，得 f'(x) = 3 / (3x + 1)。",
      "代入 x = 1，得 f'(1) = 3 / (3 + 1) = 3/4。",
    ],
    explanation:
      "由链式法则得 f'(x) = 3 / (3x + 1)，代入 x = 1 得 3/4（即 0.75）。",
    errorTag: "chain_rule",
    errorLabel: "复合函数链式法则",
  },
  {
    id: "p17",
    formulaIds: ['differential'],
    lessonId: "differential",
    title: "计算函数的微分 dy",
    formula: String.raw`\begin{gathered}f(x)=x^2,\;x_0=2,\;\Delta x=0.1\\[4pt]\left.dy\right|_{x=2}=\,?\end{gathered}`,
    answer: 0.4,
    unit: "请输入微分 dy 的数值或分数",
    hints: [
      "微分定义为 dy = f'(x₀)Δx，表示切线高度增量。",
      "由 f(x) = x² 得 f'(x) = 2x，在 x₀ = 2 处 f'(2) = 4。",
      "代入 Δx = 0.1，得 dy = 4 × 0.1 = 0.4（即 2/5）。",
    ],
    explanation:
      "f'(2) = 4，故微分 dy = f'(2)Δx = 4 × 0.1 = 0.4（真实增量 Δy = 0.41，仅相差 0.01）。",
    errorTag: "linear_approximation",
    errorLabel: "微分与线性近似",
  },
  {
    id: "p18",
    formulaIds: ['linear'],
    lessonId: "differential",
    title: "用微分作根式线性近似",
    formula: String.raw`\begin{gathered}f(x)=\sqrt{x},\;x_0=4,\;\Delta x=0.04\\[4pt]f(4)+f'(4)\Delta x=\,?\end{gathered}`,
    answer: 2.01,
    unit: "请输入线性近似值的数值或分数",
    hints: [
      "线性近似公式为 f(x₀ + Δx) ≈ f(x₀) + f'(x₀)Δx。",
      "f(4) = 2，且 f'(x) = 1 / (2√x)，故 f'(4) = 1/4 = 0.25。",
      "切线增量 dy = 0.25 × 0.04 = 0.01，近似值为 2 + 0.01 = 2.01。",
    ],
    explanation:
      "f(4) = 2，f'(4) = 1/4，线性近似值为 2 + (1/4) × 0.04 = 2.01（即 201/100）。",
    errorTag: "linear_approximation",
    errorLabel: "微分与线性近似",
  },
  {
    id: "p19",
    formulaIds: ['lagrange'],
    lessonId: "mvt",
    title: "拉格朗日中值定理求中值点",
    formula: String.raw`\begin{gathered}f(x)=x^2,\;x\in[1,5]\\[4pt]f'(\xi)=\frac{f(5)-f(1)}{5-1},\;\xi=\,?\end{gathered}`,
    answer: 3,
    unit: "请输入中值点 ξ 的数值或分数",
    hints: [
      "先算区间 [1, 5] 上的平均变化率：[f(5) − f(1)] / (5 − 1) = (25 − 1) / 4 = 6。",
      "由 f(x) = x² 得导数 f'(ξ) = 2ξ。",
      "令 2ξ = 6，解得 ξ = 3 ∈ (1, 5)。",
    ],
    explanation:
      "端点连线斜率为 (25 − 1)/(5 − 1) = 6，令 f'(ξ) = 2ξ = 6 得中值点 ξ = 3。",
    errorTag: "mean_value_theorem",
    errorLabel: "中值定理条件与中值点",
  },
  {
    id: "p20",
    formulaIds: ['rolle'],
    lessonId: "mvt",
    title: "罗尔定理求驻点",
    formula: String.raw`\begin{gathered}f(x)=x^2-4x+3,\;x\in[1,3]\\[4pt]f'(\xi)=0,\;\xi=\,?\end{gathered}`,
    answer: 2,
    unit: "请输入驻点 ξ 的数值或分数",
    hints: [
      "先验证端点值：f(1) = 0，f(3) = 0，满足罗尔定理条件 f(1) = f(3)。",
      "求导得 f'(x) = 2x − 4。",
      "令 f'(ξ) = 2ξ − 4 = 0，解得 ξ = 2 ∈ (1, 3)。",
    ],
    explanation:
      "f(1) = f(3) = 0 且多项式连续可导，由 f'(ξ) = 2ξ − 4 = 0 得 ξ = 2。",
    errorTag: "mean_value_theorem",
    errorLabel: "中值定理条件与中值点",
  },
  {
    id: "p21",
    formulaIds: ['lhopital'],
    lessonId: "lhopital",
    title: "洛必达法则求指数型 0/0 极限",
    formula: String.raw`\lim_{x\to0}\frac{e^x-1-x}{x^2}=\,?`,
    answer: 1 / 2,
    unit: "请输入极限值的数值或分数",
    hints: [
      "x → 0 时分子 eˣ − 1 − x → 0，分母 x² → 0，属于 0/0 型未定式。",
      "分子分母分别对 x 求导，化为 lim (eˣ − 1) / (2x)。",
      "再求导一次（或用 eˣ − 1 ~ x）得 lim eˣ / 2 = 1/2。",
    ],
    explanation:
      "连续使用两次洛必达法则：原极限 = lim (eˣ − 1)/(2x) = lim eˣ/2 = 1/2（即 0.5）。",
    errorTag: "lhopital_rule",
    errorLabel: "洛必达法则与未定式",
  },
  {
    id: "p22",
    formulaIds: ['lhopital'],
    lessonId: "lhopital",
    title: "三角与幂函数差商的未定式极限",
    formula: String.raw`\lim_{x\to0}\frac{x-\sin x}{x^3}=\,?`,
    answer: 1 / 6,
    unit: "角度使用弧度；请输入极限值的数值或分数",
    hints: [
      "x − sin x 是加减抵消项，一阶主部 x 与 x 抵消，不能直接把 sin x 替换为 x！",
      "使用洛必达法则：分子分母分别求导得 lim (1 − cos x) / (3x²)。",
      "由 1 − cos x ~ x²/2（或继续洛必达求导），得 (x²/2) / (3x²) = 1/6。",
    ],
    explanation:
      "应用洛必达法则化为 lim (1 − cos x)/(3x²)，再结合 1 − cos x ~ x²/2 得极限为 1/6。",
    errorTag: "lhopital_rule",
    errorLabel: "洛必达法则与未定式",
  },
  {
    id: "p23",
    formulaIds: ['first-extrema', 'second-extrema', 'monotone'],
    lessonId: "extrema",
    title: "三次函数的局部极大值",
    formula: String.raw`\begin{gathered}f(x)=x^3-3x\\[4pt]x=-1\;\text{处的极大值}\;f(-1)=\,?\end{gathered}`,
    answer: 2,
    unit: "请输入极大值的数值或分数",
    hints: [
      "求导得 f'(x) = 3x² − 3 = 3(x + 1)(x − 1)，驻点为 x = −1 和 x = 1。",
      "在 x = −1 处二阶导数 f''(−1) = −6 < 0（左侧递增、右侧递减），确为极大值点。",
      "将 x = −1 代入原函数：f(−1) = (−1)³ − 3(−1) = −1 + 3 = 2。",
    ],
    explanation:
      "x = −1 是极大值点，极大值是原函数高度 f(−1) = (−1)³ − 3×(−1) = 2（注意区分极值点 x = −1 与极值 f(−1) = 2）。",
    errorTag: "monotonicity_extrema",
    errorLabel: "单调性与极值判别",
  },
  {
    id: "p24",
    formulaIds: ['second-extrema'],
    lessonId: "extrema",
    title: "用二阶导数判别极小值",
    formula: String.raw`\begin{gathered}f(x)=x^2-6x+8\\[4pt]\text{极小值}\;\min f(x)=\,?\end{gathered}`,
    answer: -1,
    unit: "请输入极小值的数值或分数",
    hints: [
      "求一阶导数 f'(x) = 2x − 6，令 f'(x) = 0 得唯一驻点 x = 3。",
      "二阶导数 f''(3) = 2 > 0，故 x = 3 为极小值点。",
      "代入原函数计算极小值：f(3) = 3² − 6×3 + 8 = 9 − 18 + 8 = −1。",
    ],
    explanation:
      "由 f'(x) = 2x − 6 = 0 得驻点 x = 3，f''(3) = 2 > 0，极小值为 f(3) = −1。",
    errorTag: "monotonicity_extrema",
    errorLabel: "单调性与极值判别",
  },
  ...integralProblems,
  ...applicationProblems,
];
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
    title: "第三章 · 中值定理与导数的应用",
    short: "第三章：中值定理与导数应用",
  },
  { id: 4 as const, title: "第四章 · 不定积分与定积分", short: "第四章：积分" },
  { id: 5 as const, title: "第五章 · 定积分的应用", short: "第五章：积分应用" },
];
export const errorTags = Array.from(
  new Map(
    problems.map((p) => {
      const chapter = lessons.find((l) => l.id === p.lessonId)?.chapter ?? 1;
      return [p.errorTag, { tag: p.errorTag, label: p.errorLabel, chapter }];
    }),
  ).values(),
);
export function computeMastery(
  attempts: { problemId: string; correct: boolean }[],
) {
  const latest = new Map<string, boolean>();
  for (const a of attempts) latest.set(a.problemId, a.correct);
  const summarize = (list: Problem[]) => {
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
      const lessonIds = new Set(
        lessons.filter((l) => l.chapter === c.id).map((l) => l.id),
      );
      return {
        ...c,
        ...summarize(problems.filter((p) => lessonIds.has(p.lessonId))),
      };
    }),
    tags: errorTags.map((t) => ({
      ...t,
      ...summarize(problems.filter((p) => p.errorTag === t.tag)),
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

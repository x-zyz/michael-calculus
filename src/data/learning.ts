export interface Lesson {
  id: string;
  chapter: 1 | 2;
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
];
export interface Problem {
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
];
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
export type SecantKind = "square" | "cubic" | "sqrt";
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
};
/** Difference quotient [f(x0 + h) - f(x0)] / h; undefined (null) at h = 0. */
export function secantSlope(kind: SecantKind, h: number): number | null {
  if (h === 0) return null;
  const m = secantModels[kind];
  if (m.x0 + h < 0 && kind === "sqrt") return null;
  return (m.fn(m.x0 + h) - m.y0) / h;
}

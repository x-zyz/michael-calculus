import type { Lesson, Problem } from "./learning";

export const integralLessons = [
  {
    id: "antiderivative", chapter: 4, title: "原函数与不定积分",
    definitionExplanation: "若 F(x) 求导正好得到 f(x)，就把 F(x) 叫做 f(x) 的一个原函数；因为常数的导数是 0，所以把曲线整体上下平移都不会改变斜率，加上任意常数 C 才算写全所有的原函数。",
    intuition: "如果把求导看作「已知路程函数求瞬时速度」，那不定积分就是反过来「已知每一刻的速度 f(x)，倒推回整族只差一个初始起点的路程函数 F(x) + C」。",
    definition: "F'(x)=f(x)\\quad\\Longrightarrow\\quad\\int f(x)\\,dx=F(x)+C",
    condition: "在同一区间上，若 F′ = f，则该区间内的所有原函数都能写成 F + C。幂函数积分法则为指数加 1 再除以新指数，唯一例外是 x⁻¹ 对应 ∫(1/x)dx = ln|x| + C（所取区间不能跨过原点）。不定积分满足线性性，拆项提取常数后最后只需合并成一个总常数 C。",
    example: "\\int(3x^2-2)\\,dx=x^3-2x+C",
    steps: ["3x² 的一个原函数是 x³，常数 −2 的一个原函数是 −2x。", "把两项相加，再写上任意常数 C。", "对结果求导验算，正好得到 3x² − 2。"],
    takeaway: "求出原函数后随时可以求导验算；题目给了初值条件时再用初值定出 C。",
  },
  {
    id: "riemann", chapter: 5, title: "定积分与黎曼和",
    definitionExplanation: "把曲线与横轴之间不规则的曲边区域，竖着等分成 n 根窄长条，每根都用一条小矩形来近似；当分割越来越细（n → ∞）时，如果矩形面积之和收敛到同一个数，就定义为定积分，横轴下面的部分记负号。",
    intuition: "圆面积和直边图形能直接套公式，碰到一般曲边梯形就没办法硬算了。黎曼和的思路就是「化曲为直、先分后加再取极限」：分得越密，顶部参差的锯齿误差就越消失。",
    definition: "\\begin{gathered}\\Delta x=\\frac{b-a}{n}\\\\\\int_a^b f(x)\\,dx=\\lim_{n\\to\\infty}\\sum_{i=1}^{n}f(\\xi_i)\\Delta x\\end{gathered}",
    condition: "将 [a, b] 分成 n 段，第 i 段内任取采样点 ξᵢ 决定矩形高。只要 f 在 [a, b] 连续，不管采样点选左端点、右端点还是中点，分割无限加细后都会收敛到同一极限。注意积分算出的是带正负号的「净累积量」，若要算纯几何面积必须对横轴下方部分取反号。定积分还具有线性、区间可加与保序性，交换上下限会改变符号。",
    example: "\\begin{gathered}f(x)=x^2,\\quad [a,b]=[0,1]\\\\R_2=\\tfrac12\\big[(\\tfrac12)^2+1^2\\big]=\\tfrac58\\end{gathered}",
    steps: ["等分成两段，每段宽 1/2。", "用右端点 1/2 和 1，矩形高度分别为 1/4 和 1。", "乘上宽度再求和，得到近似值 5/8。"],
    takeaway: "写黎曼和先盯准区间宽度 Δx 和每段的采样高度 f(ξᵢ)，累加后再看 n → ∞ 的趋势。",
  },
  {
    id: "fundamental-theorem", chapter: 5, title: "微积分基本定理",
    definitionExplanation: "第一式指出：从定点 a 累积到变动上限 x 的带符号面积 A(x)，它在此刻增加的速率 A'(x) 就等于右边界高度 f(x)；第二式（牛顿—莱布尼茨公式）直接把整段定积分简化为「找一个原函数 F，算上限 F(b) 减下限 F(a)」。",
    intuition: "没有基本定理之前，算一个定积分得拿黎曼和硬求无穷极限；微积分基本定理一下子把「求和极限」与「逆求导」接通——累积总量长得有多快，看的正是右端边界函数的瞬时高度，于是算区间净累积只需要算出两端的差值。",
    definition: "\\begin{gathered}A(x)=\\int_a^x f(t)\\,dt,\\quad A'(x)=f(x)\\\\\\int_a^b f(x)\\,dx=F(b)-F(a)\\end{gathered}",
    condition: "若 f 在区间上连续，变上限积分 A(x) 就处处可导且导数为 f(x)；遇到上限是函数 g(x) 的情况，求导时必须按链式法则再乘 g'(x)。使用牛顿—莱布尼茨公式时，F 可以取任意一个原函数（积分常数 C 会在相减 F(b) − F(a) 中自动抵消），并留意交换上下限时积分变号。",
    example: "\\int_1^2 2x\\,dx=2^2-1^2=3",
    steps: ["先找被积函数的一个原函数 F(x) = x²。", "分别代入上限 2 和下限 1。", "用上限值减去下限值得到 3（常数项在差中互相抵消）。"],
    takeaway: "算定积分用上限减下限；对变上限积分求导时别漏乘上限函数的导数。",
  },
] satisfies Lesson[];

export const integralProblems = [
  {
    id: "p25", lessonId: "antiderivative", formulaIds: ["integral-power"],
    title: "幂函数积分的系数", formula: "\\int x^2\\,dx=kx^3+C,\\quad k=?", answer: 1 / 3,
    hints: ["原函数求导后应等于 x²。", "对 kx³ 求导得 3kx²。", "比较系数，3k = 1。"],
    explanation: "求导得到 3kx²，所以 k = 1/3。",
    errorTag: "integral_power", errorLabel: "幂函数积分",
  },
  {
    id: "p26", lessonId: "antiderivative", formulaIds: ["integral-family"],
    title: "用初值确定积分常数", formula: "\\begin{gathered}F'(x)=2x,\\quad F(1)=4\\\\F(x)=x^2+C,\\quad C=?\\end{gathered}", answer: 3,
    hints: ["任意常数都不会改变导数。", "将 x = 1 代入原函数。", "解 1 + C = 4。"],
    explanation: "初值确定了这一族函数中的唯一成员，C = 3。",
    errorTag: "integral_constant", errorLabel: "积分常数与初值",
  },
  {
    id: "p27", lessonId: "riemann",
    title: "计算右端点黎曼和", formula: "\\begin{gathered}f(x)=x,\\quad [0,2],\\quad n=2\\\\R_2=?\\end{gathered}", answer: 3,
    hints: ["两段等宽，每段宽 1。", "右端点分别是 1 和 2。", "矩形高度乘宽再求和，得到 1×1 + 2×1。"],
    explanation: "两个矩形的面积分别是 1 和 2，右端点和是 3。",
    errorTag: "riemann_sample", errorLabel: "黎曼和采样与宽度",
  },
  {
    id: "p28", lessonId: "riemann", formulaIds: ["integral-reverse"],
    title: "交换上下限", formula: "\\begin{gathered}\\int_0^2 f(x)\\,dx=3\\\\\\int_2^0 f(x)\\,dx=?\\end{gathered}", answer: -3,
    hints: ["检查两个式子的被积函数。", "只交换了积分上下限。", "交换上下限会使定积分变号。"],
    explanation: "积分方向反转，故结果为 −3。",
    errorTag: "integral_orientation", errorLabel: "积分方向",
  },
  {
    id: "p29", lessonId: "fundamental-theorem", formulaIds: ["newton-leibniz"],
    title: "原函数的上限值减下限值", formula: "\\int_1^3 x^2\\,dx=?", answer: 26 / 3,
    hints: ["先找 x² 的一个原函数。", "取 F(x) = x³/3。", "计算 F(3) − F(1) = 9 − 1/3。"],
    explanation: "牛顿—莱布尼茨公式给出 (27 − 1)/3 = 26/3。",
    errorTag: "integral_endpoints", errorLabel: "牛顿—莱布尼茨公式",
  },
  {
    id: "p30", lessonId: "fundamental-theorem", formulaIds: ["integral-derivative"],
    title: "变上限积分的导数", formula: "\\begin{gathered}A(x)=\\int_0^{x^2}t\\,dt\\\\A'(2)=?\\end{gathered}", answer: 16,
    hints: ["先把上限看成一个独立变量 u。", "累积函数对 u 的导数是 u。", "代入 u = x² 并乘 u′ = 2x，得到 2x³。"],
    explanation: "应用微积分基本定理和链式法则，A′(x) = 2x³，所以 A′(2) = 16。",
    errorTag: "integral_chain", errorLabel: "变上限积分与链式法则",
  },
].map((problem) => ({ ...problem, unit: "请输入数值或分数" })) satisfies Problem[];

export function integralModeForLesson(id: string): IntegralMode {
  if (id === "antiderivative") return "primitive";
  if (id === "fundamental-theorem") return "accumulation";
  return "riemann";
}

export type IntegralMode = "primitive" | "riemann" | "accumulation";
export type SamplePoint = "left" | "mid" | "right";

export function riemannSum(n: number, method: SamplePoint, signed = false) {
  const step = 1 / n;
  const offset = { left: 0, mid: 0.5, right: 1 }[method];
  const f = signed ? (x: number) => 2 * x - 1 : (x: number) => x * x;
  const rectangles = Array.from({ length: n }, (_, i) => ({
    x: i * step,
    height: f((i + offset) * step),
  }));
  return { rectangles, step, sum: rectangles.reduce((sum, r) => sum + r.height * step, 0), exact: signed ? 0 : 1 / 3 };
}

export function accumulationSlope(x: number, h: number) {
  return h === 0 ? null : x * x + x * h + h * h / 3;
}

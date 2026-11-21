import type { Lesson, Problem } from "./learning";

export const integralLessons = [
  {
    id: "antiderivative", chapter: 4, title: "原函数与不定积分",
    definitionExplanation: "两张一样的滑梯图，一张画在纸的上方，一张画在下方。它们每个位置的坡度都一样。给你坡度，让你画出原来的曲线，就是找原函数；上下挪多少，用 C 表示。",
    intuition: "知道速度，就能反推位移怎么变化。起点位置不确定时，得到的是一族相差常数的位移函数。求原函数正是把求导倒过来。",
    definition: "F'(x)=f(x)\\quad\\Longrightarrow\\quad\\int f(x)\\,dx=F(x)+C",
    condition: "在同一区间上，若 F′ = f，则所有原函数都可写成 F + C。幂函数积分把指数加 1 再除以新指数。指数 −1 要单独处理，∫1/x dx = ln|x| + C，区间不能跨过 0。不定积分具有线性性质，允许逐项积分并将常数因子提出，最后合并为一个积分常数。",
    example: "\\int(3x^2-2)\\,dx=x^3-2x+C",
    steps: ["3x² 的一个原函数是 x³，常数 −2 的一个原函数是 −2x。", "把两项相加，再写上任意常数 C。", "对结果求导，得到 3x² − 2。"],
    takeaway: "求出原函数后可以求导验算。有初值时用初值确定 C。",
  },
  {
    id: "riemann", chapter: 5, title: "定积分与黎曼和",
    definitionExplanation: "一片形状弯弯的草地没法直接用长乘宽。把它切成一排窄条，每条先当作小长方形，再把面积加起来。窄条越来越细时，和若靠近同一个数，就是积分给出的值。图在横轴下的部分记负。",
    intuition: "把曲边区域切成窄条，用矩形近似每条的面积。矩形宽度越细，累加值越接近定积分。横轴下方的部分以负号计入。",
    definition: "\\begin{gathered}\\Delta x=\\frac{b-a}{n}\\\\\\int_a^b f(x)\\,dx=\\lim_{n\\to\\infty}\\sum_{i=1}^{n}f(\\xi_i)\\Delta x\\end{gathered}",
    condition: "当 a < b 时，将 [a,b] 等分，第 i 段任取一个采样点 ξᵢ。对连续函数，分割加细时不同取样给出同一个极限。求几何面积时，要把横轴下方的部分取正。定积分具有线性、区间可加性与保序性，交换上下限时变号。若 m≤f(x)≤M，则积分介于 m(b−a) 与 M(b−a) 之间；若 f 连续，存在 ξ 使积分等于 f(ξ)(b−a)。",
    example: "\\begin{gathered}f(x)=x^2,\\quad [a,b]=[0,1]\\\\R_2=\\tfrac12\\big[(\\tfrac12)^2+1^2\\big]=\\tfrac58\\end{gathered}",
    steps: ["等分成两段，每段宽 1/2。", "用右端点 1/2 和 1，矩形高度分别为 1/4 和 1。", "乘上宽度再求和，得到近似值 5/8。"],
    takeaway: "写黎曼和先明确区间、宽度和采样点，最后乘以宽度。",
  },
  {
    id: "fundamental-theorem", chapter: 5, title: "微积分基本定理",
    definitionExplanation: "打开水龙头并记下总共接了多少水。总量此刻长得有多快，就看水龙头此刻的流速。反过来，只要知道两个时刻各接了多少水，用后面的读数减前面的读数，就知道中间接了多少。",
    intuition: "设 A(x) 是从固定起点累积到 x 的带符号面积。右端点移动一点时，新增薄条的平均高度会趋向 f(x)，因此 A 的导数就是 f。",
    definition: "\\begin{gathered}A(x)=\\int_a^x f(t)\\,dt,\\quad A'(x)=f(x)\\\\\\int_a^b f(x)\\,dx=F(b)-F(a)\\end{gathered}",
    condition: "若 f 在区间上连续，则累积函数在区间内部可导。第二式是牛顿—莱布尼茨公式，F 是 f 的任一原函数。交换上下限，定积分变号。变上限是 g(x) 时，还要乘 g′(x)。",
    example: "\\int_1^2 2x\\,dx=2^2-1^2=3",
    steps: ["找一个原函数 F(x) = x²。", "分别代入上限 2 和下限 1。", "用上限值减下限值。积分常数会在差中抵消。"],
    takeaway: "定积分用上限减下限。变上限求导时检查是否需要链式法则。",
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

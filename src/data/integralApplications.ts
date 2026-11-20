import type { Lesson, Problem } from "./learning";

export const applicationLessons = [
  {
    id: "integral-area", chapter: 5, title: "平面图形的面积",
    definitionExplanation: "把图形切成竖直细条，每条的高度是上边界减下边界。若两条曲线交叉，就用交点分段，分别确定谁在上。",
    intuition: "把两条曲线围成的区域切成竖直窄条。每条的高度是上边界减下边界。若两条曲线中途交换上下位置，就在交点处分段。",
    definition: "S=\\int_a^b (f(x)-g(x))\\,dx",
    condition: "这里 f(x) ≥ g(x)，两条边界在 [a,b] 上连续。若上下位置交换，要分段或对差取绝对值。面积与横轴的上下位置无关。",
    example: "\\int_0^1(x-x^2)\\,dx=\\frac{1}{6}",
    steps: ["联立 x = x²，得到交点的横坐标 0 和 1。", "在 0 < x < 1 时，x 在上，x² 在下。", "积分得到 1/2 − 1/3 = 1/6。"],
    takeaway: "先定交点和上下边界，再写每条的非负高度。",
  },
  {
    id: "integral-volume", chapter: 5, title: "截面法与旋转体体积",
    definitionExplanation: "把立体切成薄片，每片体积近似等于截面积乘厚度。旋转产生圆环时，截面积是外圆面积减内圆面积。",
    intuition: "沿旋转轴把立体切成薄片，体积就是截面积乘厚度后累加。横截面若有空洞，要用大圆的面积减去小圆的面积。",
    definition: "\\begin{gathered}V=\\int_a^b A(x)\\,dx\\\\A(x)=\\pi(R(x)^2-r(x)^2)\\end{gathered}",
    condition: "截面垂直于切片方向。垫片法中，R 和 r 分别是外边界、内边界到旋转轴的距离，且 0 ≤ r ≤ R。实心圆盘取 r = 0。",
    example: "V=\\pi\\int_0^1 x^2\\,dx=\\frac{\\pi}{3}",
    steps: ["把 0 ≤ x ≤ 1 内，y = x 和横轴围成的区域绕横轴旋转。", "在 x 处切开，得到半径 x 的圆盘，截面积是 πx²。", "对截面积积分，体积为 π/3。"],
    takeaway: "先写截面积。垫片用半径的平方差，不能把半径差直接平方。",
  },
  {
    id: "integral-arc", chapter: 5, title: "平面曲线的弧长",
    definitionExplanation: "用许多短直线拼接曲线。每小段同时有水平和竖直变化，按勾股定理量长，再把所有小段累加。",
    intuition: "用折线贴近曲线。每段长度同时取决于横向和竖向的变化。分割加细后，可用导数把小段长度写成横向步长乘一个伸长因子。",
    definition: "L=\\int_a^b \\sqrt{1+f'(x)^2}\\,dx",
    condition: "对 y = f(x)，若 f 在 [a,b] 上连续可导，就可以使用此式。折线段长度来自勾股定理，因此根号内是 1 加上斜率的平方。",
    example: "\\int_0^2 \\sqrt{1+3^2}\\,dx=2\\sqrt{10}",
    steps: ["直线 y = 3x 的导数恒为 3。", "每单位横向距离对应 √10 的弧长。", "横向区间长为 2，因此总长是 2√10。"],
    takeaway: "弧长至少是横向跨度，水平线段恰好等于跨度。",
  },
] satisfies Lesson[];

export const applicationProblems = [
  {
    id: "p31", lessonId: "integral-area", formulaIds: ["area-between-curves"],
    title: "直线和抛物线围成的面积",
    formula: "\\begin{gathered}y=2x,\\quad y=x^2,\\quad 0\\le x\\le2\\\\S=?\\end{gathered}", answer: 4 / 3,
    hints: ["在 0 到 2 之间比较 2x 和 x²。", "窄条高度是 2x − x²。", "把两个原函数在 2 和 0 处分别代入。"],
    explanation: "在区间内 2x ≥ x²，积分得到 4 − 8/3 = 4/3。",
    errorTag: "area_bounds", errorLabel: "面积与上下边界",
  },
  {
    id: "p32", lessonId: "integral-area", formulaIds: ["area-between-curves"],
    title: "跨过横轴时求面积",
    formula: "\\begin{gathered}y=x,\\quad -1\\le x\\le1\\\\\\text{与横轴围成的面积 }S=?\\end{gathered}", answer: 1,
    hints: ["左半边的图形也贡献正面积。", "在 x = 0 处分段。", "两块直角三角形的面积各为 1/2。"],
    explanation: "几何面积是 ∫|x| dx，左右分别贡献 1/2，总面积为 1。",
    errorTag: "area_split", errorLabel: "分段计算面积",
  },
  {
    id: "p33", lessonId: "integral-volume", formulaIds: ["cross-section-volume"],
    title: "由截面积函数求体积",
    formula: "\\begin{gathered}A(x)=3x^2,\\quad 0\\le x\\le2\\\\V=?\\end{gathered}", answer: 8,
    hints: ["A(x) 已经是截面积。", "将截面积在 0 到 2 上积分。", "3x² 的一个原函数是 x³。"],
    explanation: "截面积积分为 2³ − 0³ = 8。",
    errorTag: "volume_slices", errorLabel: "截面积与体积",
  },
  {
    id: "p34", lessonId: "integral-volume", formulaIds: ["washer-area"],
    title: "有空洞的旋转体",
    formula: "\\begin{gathered}R=2,\\quad r=1,\\quad 0\\le x\\le2\\\\V=k\\pi,\\quad k=?\\end{gathered}", answer: 6,
    hints: ["外圆面积为 4π。", "减去内圆面积 π。", "截面积恒为 3π，厚度方向总长为 2。"],
    explanation: "垫片面积是 π(4 − 1) = 3π，所以体积为 6π。",
    errorTag: "volume_washer", errorLabel: "垫片半径平方差",
  },
  {
    id: "p35", lessonId: "integral-arc", formulaIds: ["arc-length"],
    title: "用弧长公式验算直线段",
    formula: "\\begin{gathered}y=\\tfrac34x,\\quad 0\\le x\\le4\\\\L=?\\end{gathered}", answer: 5,
    hints: ["斜率恒为 3/4。", "伸长因子是 √(1 + 9/16) = 5/4。", "乘横向区间长度 4。"],
    explanation: "弧长为 4 × 5/4 = 5，也可用端点的水平差 4 和垂直差 3 验算。",
    errorTag: "arc_slope", errorLabel: "弧长与斜率",
  },
  {
    id: "p36", lessonId: "integral-arc", formulaIds: ["arc-length"],
    title: "可化简的曲线弧长",
    formula: "\\begin{gathered}y=\\tfrac23x^{3/2},\\quad 0\\le x\\le3\\\\L=?\\end{gathered}", answer: 14 / 3,
    hints: ["先求导，得到 √x。", "弧长被积函数化成 √(1 + x)。", "原函数可取 2(1 + x)^(3/2)/3。"],
    explanation: "代入两端得 2(8 − 1)/3 = 14/3。",
    errorTag: "arc_integrand", errorLabel: "弧长被积函数",
  },
].map((problem) => ({ ...problem, unit: "请输入数值或分数" })) satisfies Problem[];

export type ApplicationMode = "area" | "volume" | "arc";

export function applicationModeForLesson(id: string): ApplicationMode {
  if (id === "integral-volume") return "volume";
  if (id === "integral-arc") return "arc";
  return "area";
}

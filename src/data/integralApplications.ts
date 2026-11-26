import type { Lesson, Problem } from "./learning";

export const applicationLessons = [
  {
    id: "integral-area", chapter: 5, title: "平面图形的面积",
    definitionExplanation: "把上下两条曲线围出的区域竖着切开，在位置 x 处微元长条的高等于「上方函数减下方函数」，把所有宽度为 dx 的细长条积分累加就得到面积；若两条曲线中途交叉换位，必须从交点拆开保证高始终非负。",
    intuition: "定积分默认在横轴下方记负号，所以直接积分并不一定就是面积。计算两条曲线之间的净面积时，把微元方向看准「上减下」（或横向看「右减左」），微元高度为 f(x) − g(x) ≥ 0，就能无视图像是不是落在了横轴下面。",
    definition: "S=\\int_a^b (f(x)-g(x))\\,dx",
    condition: "公式要求在 [a, b] 上始终有 f(x) ≥ g(x) 且两条边界连续。遇到两条曲线交错或者跨过横轴求与轴围成面积时，要先联立求出交点，按交点拆分段落保证上边界减下边界非负（或用 |f(x) − g(x)| 分段求）。",
    example: "\\int_0^1(x-x^2)\\,dx=\\frac{1}{6}",
    steps: ["联立 x = x²，得到交点的横坐标 0 和 1。", "在 0 < x < 1 时，x 在上，x² 在下。", "积分得到 1/2 − 1/3 = 1/6。"],
    takeaway: "先定交点和上下边界，再写每条的非负高度。",
  },
  {
    id: "integral-volume", chapter: 5, title: "截面法与旋转体体积",
    definitionExplanation: "沿坐标轴把立体切开成无数片极薄的平行薄片，每一片的微元体积就等于该处横截面积 A(x) 乘以厚度 dx，积分后就是总体积；对于空心旋转体，截面是个圆环，面积是大圆 πR² 减内孔 πr²。",
    intuition: "不论立体外壳怎么起伏，只要能把垂直于某条轴线 x 处的截面面积函数 A(x) 写出来，体积微元就是 A(x)dx。绕 x 轴旋转得到的实心体横截面是半径为 R(x) 的圆盘，中间镂空时则是外半径 R(x) 减内半径 r(x) 的垫片圆环。",
    definition: "\\begin{gathered}V=\\int_a^b A(x)\\,dx\\\\A(x)=\\pi(R(x)^2-r(x)^2)\\end{gathered}",
    condition: "截面必须垂直于切片的积分变量 x。使用垫片法时，R(x) 与 r(x) 分别是外边界、内边界到旋转轴的垂直距离，且满足 0 ≤ r(x) ≤ R(x)；若内侧直接贴紧旋转轴则 r = 0。特别当心：是“先平方再做差”的 R² − r²，切勿写成 (R − r)²。",
    example: "V=\\pi\\int_0^1 x^2\\,dx=\\frac{\\pi}{3}",
    steps: ["把 0 ≤ x ≤ 1 内，y = x 和横轴围成的区域绕横轴旋转。", "在 x 处切开，得到半径 x 的圆盘，截面积是 πx²。", "对截面积积分，体积为 π/3。"],
    takeaway: "先写截面积。垫片用半径的平方差，不能把半径差直接平方。",
  },
  {
    id: "integral-arc", chapter: 5, title: "平面曲线的弧长",
    definitionExplanation: "把弯弯的曲线拆成无数极短的微元线段，每小段水平走过 dx、竖直升高 dy ≈ y'dx，用勾股定理算出斜边微元长度 √(1 + y'²) dx，全部积分起来就是整条曲线的弧长。",
    intuition: "曲线没法拿直尺一把量到底，只能像微元折线那样一小段一小段逼近。把小直角三角形的水平边 dx 提出来，斜边长 √(dx² + dy²) 就成了 √(1 + y'²) dx——这相当于横向每迈一小步，实际沿着斜坡走过的伸长倍率。",
    definition: "L=\\int_a^b \\sqrt{1+f'(x)^2}\\,dx",
    condition: "要求函数 f 在闭区间 [a, b] 上一阶导数连续（光滑曲线）。因为根号里对斜率做了平方，即使曲线向下走，弧长微元依然严格大于等于横向微元 dx；对于水平直线 f'(x) = 0，弧长恰好退化成区间长度 b − a。",
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

import type { WrittenProblem } from "./learning";

const math = String.raw;

export const bankIntegralGeometry = [
  // ==================== 习题 6-2 定积分的几何应用 (44 题) ====================
  {
    id: "jc935-6-2-1-1",
    source: "上册习题 6-2 第 1 题（1）",
    lessonId: "integral-area",
    errorTag: "area_bounds",
    kind: "推导题",
    difficulty: "basic",
    title: "根式曲线与直线围成的面积",
    prompt: "求曲线 y = 2√x 与直线 y = x 所围成封闭平面图形的面积。",
    formula: math`\begin{gathered}
y = 2\sqrt{x},\quad y = x \\
\text{求所围封闭图形的面积 } A
\end{gathered}`,
    solution: math`\begin{gathered}
A = \int_0^4 (2\sqrt{x} - x)\,dx \\
= \left[\frac{4}{3}x^{\frac{3}{2}} - \frac{1}{2}x^2\right]_0^4 = \frac{8}{3}
\end{gathered}`,
    explanation: "把两条线夹出的弯月切成一条条竖直窄纸带，每条高度都是上面的 2√x 减去下面的 x。",
    commonMistake: "容易把积分上限误写成 2（忘记对 √x = x/2 两边平方得 x = 4），或上下边界相减顺序写反。",
    hints: [
      "联立 2√x = x，解出交点横坐标 x = 0 与 x = 4。",
      "在区间 [0, 4] 内比较大小，确认 2√x ≥ x。",
      "写出面积积分 ∫₀⁴ (2√x - x) dx 并用牛顿-莱布尼茨公式求值。",
    ],
    steps: [
      "联立方程 2√x = x，得交点 (0, 0) 与 (4, 4)，确定积分区间为 [0, 4]。",
      "在 [0, 4] 上有 2√x ≥ x，故面积微元为 (2√x - x)dx。",
      "计算定积分 [(4/3)x^(3/2) - (1/2)x²]₀⁴ = 32/3 - 8 = 8/3。",
    ],
  },
  {
    id: "jc935-6-2-1-2",
    source: "上册习题 6-2 第 1 题（2）",
    lessonId: "integral-area",
    errorTag: "area_bounds",
    kind: "推导题",
    difficulty: "basic",
    title: "指数曲线与水平线围成的面积",
    prompt: "求曲线 y = e^(2x)、水平直线 y = e² 与 y 轴所围成平面图形的面积。",
    formula: math`\begin{gathered}
y = e^{2x},\quad y = e^2,\quad x = 0 \\
\text{求所围图形的面积 } A
\end{gathered}`,
    solution: math`\begin{gathered}
A = \int_0^1 (e^2 - e^{2x})\,dx \\
= \left[e^2 x - \frac{1}{2}e^{2x}\right]_0^1 = \frac{e^2 + 1}{2}
\end{gathered}`,
    explanation: "从 y 轴向右到交点 x = 1，水平天花板 y = e² 一直在指数曲线上方，积分它们的高度差即可。",
    commonMistake: "求 ∫ e^(2x) dx 时容易漏乘系数 1/2，或在代入下限 x = 0 时误把 e⁰ 当成 0。",
    hints: [
      "解方程 e^(2x) = e²，得到交点横坐标 x = 1。",
      "在 [0, 1] 上，上边界是 y = e²，下边界是 y = e^(2x)。",
      "积分时注意 ∫ e^(2x) dx = (1/2)e^(2x) + C，且 e⁰ = 1。",
    ],
    steps: [
      "由 e^(2x) = e² 解得交点 (1, e²)，积分区间为 x ∈ [0, 1]。",
      "列出面积积分 A = ∫₀¹ (e² - e^(2x)) dx。",
      "代入上下限得 (e² - e²/2) - (0 - 1/2) = (e² + 1)/2。",
    ],
  },
  {
    id: "jc935-6-2-1-3",
    source: "上册习题 6-2 第 1 题（3）",
    lessonId: "integral-area",
    errorTag: "area_bounds",
    kind: "推导题",
    difficulty: "basic",
    title: "开口向下抛物线与直线面积",
    prompt: "求抛物线 y = 4 - x² 与直线 y = 3x 所围成平面图形的面积。",
    formula: math`\begin{gathered}
y = 4 - x^2,\quad y = 3x \\
\text{求所围封闭图形的面积 } A
\end{gathered}`,
    solution: math`\begin{gathered}
A = \int_{-4}^1 (4 - x^2 - 3x)\,dx \\
= \left[4x - \frac{1}{3}x^3 - \frac{3}{2}x^2\right]_{-4}^1 = \frac{125}{6}
\end{gathered}`,
    explanation: "先找两个交点定出左右边界，在区间内抛物线拱在直线上面，按 x 方向切片最省事。",
    commonMistake: "代入负下限 x = -4 时，三次方与平方的符号容易混淆出错。",
    hints: [
      "解方程 4 - x² = 3x，因式分解 (x + 4)(x - 1) = 0 得交点横坐标。",
      "取区间内测试点 x = 0，确认 4 - x² > 3x。",
      "计算 ∫₋₄¹ (4 - 3x - x²) dx，小心处理下限 -4 的符号。",
    ],
    steps: [
      "联立 4 - x² = 3x 得 x² + 3x - 4 = 0，解得交点横坐标 x = -4 与 x = 1。",
      "在 [-4, 1] 上抛物线位于直线上方，A = ∫₋₄¹ (4 - 3x - x²) dx。",
      "求原函数并代入上下限：[4 - 3/2 - 1/3] - [-16 - 24 + 64/3] = 125/6。",
    ],
  },
  {
    id: "jc935-6-2-1-4",
    source: "上册习题 6-2 第 1 题（4）",
    lessonId: "integral-area",
    errorTag: "area_bounds",
    kind: "推导题",
    difficulty: "basic",
    title: "开口向上抛物线与直线面积",
    prompt: "求抛物线 y = x² 与直线 y = 2x + 8 所围成平面图形的面积。",
    formula: math`\begin{gathered}
y = x^2,\quad y = 2x + 8 \\
\text{求所围封闭图形的面积 } A
\end{gathered}`,
    solution: math`\begin{gathered}
A = \int_{-2}^4 (2x + 8 - x^2)\,dx \\
= \left[x^2 + 8x - \frac{1}{3}x^3\right]_{-2}^4 = 36
\end{gathered}`,
    explanation: "开口向上的抛物线被斜直线截出一个碗状区域，直线上边界减去抛物线下边界再积分即可。",
    commonMistake: "因式分解 x² - 2x - 8 = 0 时容易把根的符号写反，误得 x = 2 与 x = -4。",
    hints: [
      "令 x² = 2x + 8，解得 (x - 4)(x + 2) = 0，交点在 x = -2 和 x = 4。",
      "在 [-2, 4] 内，直线 2x + 8 始终高于抛物线 x²。",
      "积分 ∫₋₂⁴ (2x + 8 - x²) dx 并仔细合并分数。",
    ],
    steps: [
      "联立 x² = 2x + 8 得交点 (-2, 4) 与 (4, 16)，积分区间为 [-2, 4]。",
      "上边界为 y = 2x + 8，下边界为 y = x²，列式 A = ∫₋₂⁴ (2x + 8 - x²) dx。",
      "计算原函数差值：(16 + 32 - 64/3) - (4 - 16 + 8/3) = 36。",
    ],
  },
  {
    id: "jc935-6-2-2-1",
    source: "上册习题 6-2 第 2 题（1）",
    lessonId: "integral-area",
    errorTag: "area_split",
    kind: "推导题",
    difficulty: "applied",
    title: "抛物线分割圆盘的两部分面积",
    prompt: "抛物线 y = x² 将圆盘 x² + y² ≤ 2 分成上下两部分，求这两部分的面积 A₁（上方）与 A₂（下方）。",
    formula: math`\begin{gathered}
y = x^2,\quad x^2 + y^2 = 2 \\
\text{求被分割的两部分面积 } A_1,\; A_2
\end{gathered}`,
    solution: math`\begin{gathered}
A_1 = 2\int_0^1 \left(\sqrt{2 - x^2} - x^2\right)dx = \frac{\pi}{2} + \frac{1}{3} \\
A_2 = 2\pi - A_1 = \frac{3\pi}{2} - \frac{1}{3}
\end{gathered}`,
    explanation: "先用圆弧减抛物线算出上半块 A₁，再用整圆面积 2π 减去 A₁ 就立刻得到下半块 A₂。",
    commonMistake: "计算 ∫₀¹ √(2 - x²) dx 时忘记换元 x = √2 sin t 的上下限变换，或误把圆面积写成 4π。",
    hints: [
      "把 x² = y 代入圆方程得 y² + y - 2 = 0，解得交点 (±1, 1)。",
      "利用偶函数对称性，A₁ = 2∫₀¹ (√(2 - x²) - x²) dx，其中 √(2 - x²) 用三角换元 x = √2 sin t。",
      "下半部分直接用圆面积 π(√2)² = 2π 减去 A₁。",
    ],
    steps: [
      "联立 y = x² 与 x² + y² = 2，得 y = 1、x = ±1，交点为 (-1, 1) 与 (1, 1)。",
      "由对称性 A₁ = 2∫₀¹ (√(2 - x²) - x²) dx = [x√(2 - x²) + 2arcsin(x/√2) - (2/3)x³]₀¹ = π/2 + 1/3。",
      "整圆面积为 2π，故下方区域面积 A₂ = 2π - (π/2 + 1/3) = 3π/2 - 1/3。",
    ],
  },
  {
    id: "jc935-6-2-2-2",
    source: "上册习题 6-2 第 2 题（2）",
    lessonId: "integral-area",
    errorTag: "area_bounds",
    kind: "推导题",
    difficulty: "basic",
    title: "反比例曲线与两直线围成面积",
    prompt: "求曲线 y = 2/x、直线 y = 2x 与直线 x = 3 在第一象限所围成平面图形的面积。",
    formula: math`\begin{gathered}
y = \frac{2}{x},\quad y = 2x,\quad x = 3 \\
\text{求第一象限所围面积 } A
\end{gathered}`,
    solution: math`\begin{gathered}
A = \int_1^3 \left(2x - \frac{2}{x}\right)dx \\
= \left[x^2 - 2\ln x\right]_1^3 = 8 - 2\ln 3
\end{gathered}`,
    explanation: "两条曲线在 x = 1 处相交，之后直线一路上升而反比例曲线下降，从 1 积到 3 即可。",
    commonMistake: "容易漏掉求交点 x = 1，误从 x = 0 开始积分导致 1/x 发散。",
    hints: [
      "在第一象限联立 2/x = 2x，得左端交点 x = 1。",
      "在 [1, 3] 上有 2x ≥ 2/x。",
      "注意 ln 1 = 0，计算 [x² - 2ln x]₁³。",
    ],
    steps: [
      "令 2/x = 2x (x > 0)，解得交点 (1, 2)，积分区间为 [1, 3]。",
      "在 [1, 3] 上直线在反比例曲线上方，A = ∫₁³ (2x - 2/x) dx。",
      "求值：[x² - 2ln x]₁³ = (9 - 2ln 3) - (1 - 0) = 8 - 2ln 3。",
    ],
  },
  {
    id: "jc935-6-2-2-3",
    source: "上册习题 6-2 第 2 题（3）",
    lessonId: "integral-area",
    errorTag: "area_bounds",
    kind: "推导题",
    difficulty: "basic",
    title: "正负指数曲线与竖直线面积",
    prompt: "求曲线 y = e^(2x)、y = e^(-2x) 与直线 x = 1 所围成平面图形的面积。",
    formula: math`\begin{gathered}
y = e^{2x},\quad y = e^{-2x},\quad x = 1 \\
\text{求所围图形的面积 } A
\end{gathered}`,
    solution: math`\begin{gathered}
A = \int_0^1 \left(e^{2x} - e^{-2x}\right)dx \\
= \left[\frac{1}{2}e^{2x} + \frac{1}{2}e^{-2x}\right]_0^1 = \frac{e^2 + e^{-2}}{2} - 1
\end{gathered}`,
    explanation: "e^(2x) 与 e^(-2x) 在 x = 0 处交汇，在右侧 e^(2x) 更高，把高度差从 0 积到 1 即可。",
    commonMistake: "对 -e^(-2x) 积分时容易把符号写成 -(1/2)e^(-2x)，漏掉负负得正。",
    hints: [
      "令 e^(2x) = e^(-2x) 得交点 x = 0，故积分区间为 [0, 1]。",
      "在 [0, 1] 上 e^(2x) ≥ e^(-2x)。",
      "原函数为 (1/2)e^(2x) + (1/2)e^(-2x)，代入 0 时值为 1。",
    ],
    steps: [
      "解 e^(2x) = e^(-2x) 得交点 (0, 1)，确定区间 [0, 1]。",
      "列式 A = ∫₀¹ (e^(2x) - e^(-2x)) dx。",
      "计算 [(1/2)(e^(2x) + e^(-2x))]₀¹ = (e² + e⁻²)/2 - 1。",
    ],
  },
  {
    id: "jc935-6-2-2-4",
    source: "上册习题 6-2 第 2 题（4）",
    lessonId: "integral-area",
    errorTag: "area_bounds",
    kind: "推导题",
    difficulty: "basic",
    title: "以 y 为积分变量求对数曲线面积",
    prompt: "求曲线 y = ln(2x)、y 轴与水平直线 y = ln p、y = ln q（q > p > 0）所围成图形的面积。",
    formula: math`\begin{gathered}
y = \ln(2x),\quad x = 0 \\
y = \ln p,\quad y = \ln q\;(q > p > 0)
\end{gathered}`,
    solution: math`\begin{gathered}
x = \frac{1}{2}e^y,\quad y \in [\ln p,\, \ln q] \\
A = \int_{\ln p}^{\ln q} \frac{1}{2}e^y\,dy = \frac{q - p}{2}
\end{gathered}`,
    explanation: "把区域改成水平窄条，右边界直接解出 x = (1/2)e^y，一步积分就避开了 ln x 的分部积分。",
    commonMistake: "若硬选 x 为积分变量需要分段并用分部积分，容易在端点 p/2、q/2 处算错。",
    hints: [
      "将 y = ln(2x) 反解为 x = (1/2)e^y。",
      "选 y 为积分变量，y 从 ln p 变到 ln q。",
      "利用 e^(ln q) = q 与 e^(ln p) = p 化简。",
    ],
    steps: [
      "由 y = ln(2x) 得右边界 x = (1/2)e^y，左边界为 y 轴 x = 0。",
      "以 y 为积分变量，面积 A = ∫_{ln p}^{ln q} (1/2)e^y dy。",
      "计算 [(1/2)e^y]_{ln p}^{ln q} = (q - p)/2。",
    ],
  },
  {
    id: "jc935-6-2-3",
    source: "上册习题 6-2 第 3 题",
    lessonId: "integral-area",
    errorTag: "area_split",
    kind: "推导题",
    difficulty: "applied",
    title: "抛物线与两条切线围成的面积",
    prompt: "求抛物线 y = -x² + 6x - 5 及其在点 (1, 0) 和 (5, 0) 处的两条切线所围成平面图形的面积。",
    formula: math`\begin{gathered}
y = -x^2 + 6x - 5 \\
\text{在 }(1,0)\text{ 与 }(5,0)\text{ 处的切线所围面积 } A
\end{gathered}`,
    solution: math`\begin{gathered}
\text{切线：}y = 4x - 4,\; y = -4x + 20 \\
\text{交点 }(3,8),\; A = \int_1^3 (x-1)^2\,dx \\
+ \int_3^5 (x-5)^2\,dx = \frac{16}{3}
\end{gathered}`,
    explanation: "两条切线在 x = 3 处形成尖顶，把区域从尖顶竖直劈成左右两半，每半的被积函数刚好是完全平方。",
    commonMistake: "容易忘记在两条切线的交点 x = 3 处分段，直接用单条切线从 1 积到 5。",
    hints: [
      "先求导 y' = -2x + 6，分别写出过 (1, 0) 与 (5, 0) 的切线方程。",
      "联立两条切线求交点横坐标 x = 3。",
      "分 [1, 3] 和 [3, 5] 两段积分，发现被积函数分别化简为 (x - 1)² 与 (x - 5)²。",
    ],
    steps: [
      "求导 y' = -2x + 6，在 x = 1、5 处斜率为 4、-4，切线为 y = 4x - 4 与 y = -4x + 20。",
      "联立两切线得交点 (3, 8)，在 x = 3 处分段积分。",
      "计算 A = ∫₁³ (x - 1)² dx + ∫₃⁵ (x - 5)² dx = 8/3 + 8/3 = 16/3。",
    ],
  },
  {
    id: "jc935-6-2-4",
    source: "上册习题 6-2 第 4 题",
    lessonId: "integral-area",
    errorTag: "area_bounds",
    kind: "推导题",
    difficulty: "applied",
    title: "抛物线与其法线围成的面积",
    prompt: "求抛物线 y² = 2px（p > 0）及其在点 (2p, 2p) 处的法线所围成平面图形的面积。",
    formula: math`\begin{gathered}
y^2 = 2px\;(p > 0),\;\text{过 }(2p, 2p)\text{ 的法线} \\
\text{求所围封闭图形的面积 } A
\end{gathered}`,
    solution: math`\begin{gathered}
\text{法线：}x = 3p - \frac{y}{2},\quad y \in [-3p,\, 2p] \\
A = \int_{-3p}^{2p}\!\left(3p - \frac{y}{2} - \frac{y^2}{2p}\right)dy = \frac{125}{12}p^2
\end{gathered}`,
    explanation: "先用隐函数求导得到法线斜率 -2，再改以 y 为积分变量，右边界减左边界一条积分就能算完。",
    commonMistake: "容易把法线斜率误写成切线斜率 1/2，或者忘记负倒数关系 k_法 = -1/k_切。",
    hints: [
      "对 y² = 2px 求导得 2yy' = 2p，在 (2p, 2p) 处切线斜率为 1/2，故法线斜率为 -2。",
      "写出法线 x = 3p - y/2，与 x = y²/(2p) 联立得 y = -3p 和 y = 2p。",
      "以 y 为积分变量，在 [-3p, 2p] 上对右边界减左边界积分。",
    ],
    steps: [
      "隐函数求导得 y' = p/y，在 (2p, 2p) 处切线斜率 1/2，法线斜率 -2，方程为 y - 2p = -2(x - 2p) 即 x = 3p - y/2。",
      "联立 y²/(2p) = 3p - y/2 得 y² + py - 6p² = 0，解得交点纵坐标 y = -3p 与 y = 2p。",
      "积分 A = ∫_{-3p}^{2p} (3p - y/2 - y²/(2p)) dy = [3py - y²/4 - y³/(6p)]_{-3p}^{2p} = (125/12)p²。",
    ],
  },
  {
    id: "jc935-6-2-5",
    source: "上册习题 6-2 第 5 题",
    lessonId: "integral-area",
    errorTag: "area_split",
    kind: "推导题",
    difficulty: "challenge",
    title: "按比例分割余弦区域的待定参数",
    prompt: "曲线 y = cos x（0 ≤ x ≤ π/2）与两坐标轴围成面积为 1 的区域。求正数 k、m（k > m > 0），使曲线 y = k sin x 与 y = m sin x 将该区域面积按 1 : 2 : 1 分割（从左到右）。",
    formula: math`\begin{gathered}
y = \cos x\;(0 \le x \le \tfrac{\pi}{2}),\\y = k\sin x,\; y = m\sin x \\
\text{按 } 1:2:1 \text{ 分割面积，求 } k,\; m
\end{gathered}`,
    solution: math`\begin{gathered}
\sqrt{1+k^2} - k = \frac{1}{4} \implies k = \frac{15}{8} \\
m + 1 - \sqrt{1+m^2} = \frac{1}{4} \implies m = \frac{7}{24}
\end{gathered}`,
    explanation: "把左右两块各占总面积 1/4 的区域分别用交点横坐标 arctan(1/k) 和 arctan(1/m) 积出来，再解根式方程即可。",
    commonMistake: "把 sin(arctan(1/k)) 与 cos(arctan(1/k)) 代换回代数式时，容易把分子 1 和 k 写颠倒。",
    hints: [
      "总面积 ∫₀^(π/2) cos x dx = 1，左侧区域面积为 1/4，右侧靠近 x 轴区域面积也为 1/4。",
      "设 y = cos x 与 y = k sin x 交于 x₁ = arctan(1/k)，用直角三角形得 sin x₁ = 1/√(1+k²)、cos x₁ = k/√(1+k²)。",
      "列出 √(1+k²) - k = 1/4 与 m + 1 - √(1+m²) = 1/4，移项平方求解。",
    ],
    steps: [
      "左侧面积 A₁ = ∫₀^{arctan(1/k)} (cos x - k sin x) dx = [sin x + k cos x]₀^{x₁} = √(1+k²) - k。",
      "令 √(1+k²) - k = 1/4，移项平方得 1 = k/2 + 1/16，解得 k = 15/8。",
      "右侧面积 A₃ = ∫₀^{x₂} m sin x dx + ∫_{x₂}^{π/2} cos x dx = m + 1 - √(1+m²) = 1/4，解得 m = 7/24。",
    ],
  },
  {
    id: "jc935-6-2-6-1",
    source: "上册习题 6-2 第 6 题（1）",
    lessonId: "integral-area",
    errorTag: "definite_substitution",
    kind: "推导题",
    difficulty: "basic",
    title: "极坐标圆所围图形的面积",
    prompt: "求极坐标曲线 r = 4a sin θ（a > 0）所围成平面图形的面积。",
    formula: math`\begin{gathered}
r = 4a\sin\theta\;(a > 0) \\
\text{求所围封闭图形的面积 } A
\end{gathered}`,
    solution: math`\begin{gathered}
A = \frac{1}{2}\int_0^\pi (4a\sin\theta)^2\,d\theta \\
= 8a^2\int_0^\pi \frac{1 - \cos 2\theta}{2}\,d\theta = 4\pi a^2
\end{gathered}`,
    explanation: "极坐标里把图形切成无数小扇形，每块面积是 (1/2)r² dθ，注意这个圆在 θ 从 0 到 π 就画完一整圈。",
    commonMistake: "容易把积分区间误写成 [0, 2π]，导致同一个圆被重复扫过两次，结果多出一倍。",
    hints: [
      "令 r = 4a sin θ ≥ 0，确定完整描出圆周的极角范围是 [0, π]。",
      "套用极坐标面积公式 A = (1/2)∫ r² dθ。",
      "用降幂公式 sin²θ = (1 - cos 2θ)/2 积分，也可用半径 2a 的圆面积验算。",
    ],
    steps: [
      "由 r = 4a sin θ ≥ 0 确定极角范围为 θ ∈ [0, π]（对应圆心 (0, 2a)、半径 2a 的圆）。",
      "由极坐标面积公式得 A = (1/2)∫₀^π 16a² sin²θ dθ = 8a²∫₀^π sin²θ dθ。",
      "利用降幂公式积分得 8a² · (π/2) = 4πa²。",
    ],
  },
  {
    id: "jc935-6-2-6-2",
    source: "上册习题 6-2 第 6 题（2）",
    lessonId: "integral-area",
    errorTag: "definite_substitution",
    kind: "推导题",
    difficulty: "applied",
    title: "参数方程星形线变体的面积",
    prompt: "求参数曲线 x = 2a cos³t，y = a sin³t（a > 0，0 ≤ t ≤ 2π）所围成平面图形的面积。",
    formula: math`\begin{gathered}
x = 2a\cos^3 t,\quad y = a\sin^3 t\;(a > 0) \\
\text{求所围封闭图形的面积 } A
\end{gathered}`,
    solution: math`\begin{gathered}
A = 4\int_0^{2a} y\,dx = 24a^2\int_0^{\frac{\pi}{2}} \sin^4 t\cos^2 t\,dt \\
= 24a^2 \cdot \frac{3\cdot 1\cdot 1}{6\cdot 4\cdot 2}\cdot\frac{\pi}{2} = \frac{3}{4}\pi a^2
\end{gathered}`,
    explanation: "图形关于两坐标轴对称，先算第一象限再乘 4；把 x 从 0 到 2a 换元成参数 t 从 π/2 到 0 即可。",
    commonMistake: "参数换元时容易把上下限写成 0 到 π/2 却忘记 dx = -6a cos²t sin t dt 中的负号，算成负面积。",
    hints: [
      "利用对称性，总面积为第一象限面积的 4 倍：A = 4∫₀^(2a) y dx。",
      "当 x 从 0 变到 2a 时，参数 t 从 π/2 变到 0，且 dx = -6a cos²t sin t dt。",
      "将 ∫₀^(π/2) sin⁴t cos²t dt 化为 (sin⁴t - sin⁶t) 或直接用华里士公式计算。",
    ],
    steps: [
      "由对称性，A = 4∫₀^(2a) y dx；代入参数方程，x: 0 → 2a 对应 t: π/2 → 0。",
      "计算 dx = -6a cos²t sin t dt，得 A = 4∫_{π/2}^0 a sin³t (-6a cos²t sin t) dt = 24a²∫₀^(π/2) sin⁴t cos²t dt。",
      "用华里士公式得 ∫₀^(π/2) (sin⁴t - sin⁶t) dt = (3/8 - 5/16)·(π/2) = π/32，故 A = (3/4)πa²。",
    ],
  },
  {
    id: "jc935-6-2-6-3",
    source: "上册习题 6-2 第 6 题（3）",
    lessonId: "integral-area",
    errorTag: "definite_substitution",
    kind: "推导题",
    difficulty: "applied",
    title: "极坐标蚶线所围图形的面积",
    prompt: "求极坐标曲线 r = a(3 + sin θ)（a > 0）所围成平面图形的面积。",
    formula: math`\begin{gathered}
r = a(3 + \sin\theta)\;(a > 0) \\
\text{求所围封闭图形的面积 } A
\end{gathered}`,
    solution: math`\begin{gathered}
A = \frac{1}{2}\int_0^{2\pi} a^2(9 + 6\sin\theta + \sin^2\theta)\,d\theta \\
= \frac{a^2}{2}(18\pi + 0 + \pi) = \frac{19}{2}\pi a^2
\end{gathered}`,
    explanation: "因为 3 + sin θ 恒大于 0，极角转满一圈 [0, 2π] 画出封闭蚶线，其中 sin θ 的整周期积分为 0。",
    commonMistake: "套用极坐标面积公式时容易漏掉最前面的系数 1/2，把结果算成 19πa²。",
    hints: [
      "展开被积式 (3 + sin θ)² = 9 + 6sin θ + sin²θ。",
      "在 [0, 2π] 上，∫₀^(2π) sin θ dθ = 0，∫₀^(2π) sin²θ dθ = π。",
      "最后别忘乘以极坐标面积公式里的 1/2。",
    ],
    steps: [
      "由于 r = a(3 + sin θ) > 0 恒成立，极角范围取 [0, 2π]。",
      "列式 A = (a²/2)∫₀^(2π) (9 + 6sin θ + sin²θ) dθ。",
      "分别积分得 (a²/2)(18π + 0 + π) = (19/2)πa²。",
    ],
  },
  {
    id: "jc935-6-2-7",
    source: "上册习题 6-2 第 7 题",
    lessonId: "integral-area",
    errorTag: "definite_substitution",
    kind: "推导题",
    difficulty: "applied",
    title: "伸长摆线一拱与横轴的面积",
    prompt: "求参数曲线 x = 2a(t - sin t)，y = a(1 - cos t)（a > 0，0 ≤ t ≤ 2π）的一拱与 x 轴所围成图形的面积。",
    formula: math`\begin{gathered}
x = 2a(t - \sin t),\quad y = a(1 - \cos t) \\
0 \le t \le 2\pi,\;\text{与 } x \text{ 轴所围面积 } A
\end{gathered}`,
    solution: math`\begin{gathered}
A = \int_0^{2\pi} a(1 - \cos t)\cdot 2a(1 - \cos t)\,dt \\
= 2a^2\int_0^{2\pi} (1 - 2\cos t + \cos^2 t)\,dt = 6\pi a^2
\end{gathered}`,
    explanation: "把面积 ∫ y dx 换成对参数 t 的积分，dx 刚好也含因子 (1 - cos t)，展开后利用周期性一算就出。",
    commonMistake: "容易漏乘 x(t) 前面的系数 2，或者把 ∫₀^(2π) cos²t dt 误算成 2π。",
    hints: [
      "当 t 从 0 变到 2π 时，x 从 0 单调增至 4πa，且 y ≥ 0。",
      "计算 dx = 2a(1 - cos t) dt，代入 A = ∫ y dx。",
      "在 [0, 2π] 上，∫ 1 dt = 2π，∫ cos t dt = 0，∫ cos²t dt = π。",
    ],
    steps: [
      "计算微分 dx = 2a(1 - cos t) dt，且 t ∈ [0, 2π] 时 y ≥ 0。",
      "代入参数面积公式：A = ∫₀^(2π) 2a²(1 - cos t)² dt = 2a²∫₀^(2π) (1 - 2cos t + cos²t) dt。",
      "逐项积分得 2a²(2π - 0 + π) = 6πa²。",
    ],
  },
  {
    id: "jc935-6-2-8",
    source: "上册习题 6-2 第 8 题",
    lessonId: "integral-area",
    errorTag: "area_bounds",
    kind: "推导题",
    difficulty: "applied",
    title: "对数螺线扫过的扇形面积",
    prompt: "求对数螺线 r = a e^(2θ)（a > 0，0 ≤ θ ≤ π）与极轴正半轴及射线 θ = π 所围成扇形区域的面积。",
    formula: math`\begin{gathered}
r = a e^{2\theta}\;(a > 0,\; 0 \le \theta \le \pi) \\
\text{求所围扇形区域的面积 } A
\end{gathered}`,
    solution: math`\begin{gathered}
A = \frac{1}{2}\int_0^\pi \left(a e^{2\theta}\right)^2 d\theta \\
= \frac{a^2}{2}\left[\frac{1}{4}e^{4\theta}\right]_0^\pi = \frac{a^2}{8}\left(e^{4\pi} - 1\right)
\end{gathered}`,
    explanation: "极径随角度指数放大，先平方得到 a² e^(4θ)，再套用扇形面积微元 (1/2)r² dθ 积分即可。",
    commonMistake: "把 (e^(2θ))² 误写成 e^(2θ²) 或漏掉积分后除以 4 的系数。",
    hints: [
      "先化简 r² = a² e^(4θ)。",
      "套用极坐标面积公式 A = (1/2)∫₀^π r² dθ。",
      "代入下限 θ = 0 时注意 e⁰ = 1，不能忽略。",
    ],
    steps: [
      "由 r = a e^(2θ) 得 r² = a² e^(4θ)。",
      "列出极坐标面积积分 A = (1/2)∫₀^π a² e^(4θ) dθ。",
      "求原函数并代入上下限得 (a²/8)(e^(4π) - 1)。",
    ],
  },
  {
    id: "jc935-6-2-9-1",
    source: "上册习题 6-2 第 9 题（1）",
    lessonId: "integral-area",
    errorTag: "area_split",
    kind: "推导题",
    difficulty: "challenge",
    title: "圆与心形线公共部分的面积",
    prompt: "求极坐标下圆 r = 2cos θ 与心形线 r = 2(1 - cos θ) 所围成图形公共部分的面积。",
    formula: math`\begin{gathered}
r = 2\cos\theta,\quad r = 2(1 - \cos\theta) \\
\text{求两曲线公共部分的面积 } A
\end{gathered}`,
    solution: math`\begin{gathered}
A = \int_0^{\frac{\pi}{3}} 4(1 - \cos\theta)^2\,d\theta + \int_{\frac{\pi}{3}}^{\frac{\pi}{2}} 4\cos^2\theta\,d\theta \\
= \frac{7\pi}{3} - 4\sqrt{3}
\end{gathered}`,
    explanation: "从极点往外发射射线，在交点 θ = π/3 前先撞到心形线，过了 π/3 先撞到圆，所以要按较小的 r 分段积分。",
    commonMistake: "公共部分要取内侧（较小）的极径积分，常有同学误把两极径直接相减或选成外侧极径。",
    hints: [
      "联立 2cos θ = 2(1 - cos θ) 得 cos θ = 1/2，在第一象限交点为 θ = π/3。",
      "由关于极轴对称，总面积是上半部分面积的 2 倍（正好抵消极坐标公式中的 1/2）。",
      "在 [0, π/3] 用心形线 r = 2(1 - cos θ)，在 [π/3, π/2] 用圆 r = 2cos θ。",
    ],
    steps: [
      "联立两曲线方程得 cos θ = 1/2，交点极角为 θ = ±π/3；图形关于极轴对称。",
      "在 [0, π/3] 内心形线更靠近极点，在 [π/3, π/2] 内圆更靠近极点，故 A = 2·(1/2)[∫₀^(π/3) 4(1-cos θ)² dθ + ∫_{π/3}^{π/2} 4cos²θ dθ]。",
      "分别积分得 (2π - 4√3 + √3/2) + (π/3 - √3/2) = 7π/3 - 4√3。",
    ],
  },
  {
    id: "jc935-6-2-9-2",
    source: "上册习题 6-2 第 9 题（2）",
    lessonId: "integral-area",
    errorTag: "area_split",
    kind: "推导题",
    difficulty: "challenge",
    title: "单位圆与双纽线公共部分面积",
    prompt: "求单位圆 r = 1 与双纽线 r² = 2cos 2θ 所围成图形公共部分的面积。",
    formula: math`\begin{gathered}
r = 1,\quad r^2 = 2\cos 2\theta \\
\text{求两曲线公共部分的面积 } A
\end{gathered}`,
    solution: math`\begin{gathered}
A = 4\left[\frac{1}{2}\int_0^{\frac{\pi}{6}} 1\,d\theta + \frac{1}{2}\int_{\frac{\pi}{6}}^{\frac{\pi}{4}} 2\cos 2\theta\,d\theta\right] \\
= \frac{\pi}{3} + 2 - \sqrt{3}
\end{gathered}`,
    explanation: "两图形关于 x 轴、y 轴都对称，只算第一象限再乘 4；在 π/6 前圆在内，之后双纽线缩回极点在内。",
    commonMistake: "容易把双纽线收拢到极点的角度误写成 π/2（实际 cos 2θ = 0 对应 θ = π/4），或忘记双纽线有左右两叶共 4 份对称块。",
    hints: [
      "联立 2cos 2θ = 1 得 2θ = π/3，即第一象限交点在 θ = π/6。",
      "双纽线在第一象限的范围是 [0, π/4]，整个公共区域由 4 个全等象限块组成。",
      "在 [0, π/6] 取 r² = 1，在 [π/6, π/4] 取 r² = 2cos 2θ。",
    ],
    steps: [
      "联立 r² = 1 与 r² = 2cos 2θ 得第一象限交角 θ = π/6；双纽线在 θ = π/4 处回到极点。",
      "利用四象限对称性，A = 4·(1/2)[∫₀^(π/6) 1 dθ + ∫_{π/6}^{π/4} 2cos 2θ dθ]。",
      "计算得 2[π/6 + (sin(π/2) - sin(π/3))] = π/3 + 2 - √3。",
    ],
  },
  {
    id: "jc935-6-2-10",
    source: "上册习题 6-2 第 10 题",
    lessonId: "integral-area",
    errorTag: "area_split",
    kind: "推导题",
    difficulty: "applied",
    title: "指数曲线与过原点切线的无界区域面积",
    prompt: "求位于曲线 y = e^(2x) 下方、该曲线过原点的切线左方以及 x 轴上方之间的无界平面图形面积。",
    formula: math`\begin{gathered}
y = e^{2x}\text{ 下方、过原点切线左方、}x\text{ 轴上方} \\
\text{求该无界区域的面积 } A
\end{gathered}`,
    solution: math`\begin{gathered}
\text{切点 }\!\left(\frac{1}{2}, e\right),\quad \text{切线 } y = 2ex \\
A = \int_{-\infty}^0 e^{2x}\,dx + \int_0^{\frac{1}{2}} (e^{2x} - 2ex)\,dx = \frac{e}{4}
\end{gathered}`,
    explanation: "先找到从原点出发与指数曲线相切的射线，再在 x = 0 处分成左半边反常积分与右半边定积分相加。",
    commonMistake: "容易漏掉 x < 0 那一块无界尾巴，或者把切点横坐标误算成 1。",
    hints: [
      "设切点为 (x₀, e^(2x₀))，切线斜率为 2e^(2x₀)，代入切线过原点得 e^(2x₀) = 2x₀ e^(2x₀)。",
      "解得切点 (1/2, e)，切线方程为 y = 2ex。",
      "区域分 (-∞, 0]（下界为 x 轴）与 [0, 1/2]（下界为切线）两段积分。",
    ],
    steps: [
      "设切点 (x₀, e^(2x₀))，由过原点条件 e^(2x₀) = 2e^(2x₀)·x₀ 解得 x₀ = 1/2，切线为 y = 2ex。",
      "在 x = 0 处分段：A = ∫_{-∞}^0 e^(2x) dx + ∫₀^(1/2) (e^(2x) - 2ex) dx。",
      "计算两段积分：1/2 + [(1/2)e^(2x) - ex²]₀^(1/2) = 1/2 + (e/2 - e/4 - 1/2) = e/4。",
    ],
  },
  {
    id: "jc935-6-2-11",
    source: "上册习题 6-2 第 11 题",
    lessonId: "integral-area",
    errorTag: "area_split",
    kind: "推导题",
    difficulty: "applied",
    title: "使两块夹持面积之和最小的分点",
    prompt: "在区间 [0, 1] 上求一点 c，使得曲线 y = e^x 与水平线 y = 1（在 [0, c] 上）及 y = e（在 [c, 1] 上）所围两块区域面积之和 A(c) 最小。",
    formula: math`\begin{gathered}
A(c) = \int_0^c (e^x - 1)\,dx + \int_c^1 (e - e^x)\,dx \\
c \in [0, 1],\;\text{求使 } A(c) \text{ 最小的 } c
\end{gathered}`,
    solution: math`\begin{gathered}
A'(c) = (e^c - 1) - (e - e^c)\\= 2e^c - e - 1 = 0 \\
c = \ln\frac{e + 1}{2},\quad A''(c) = 2e^c > 0
\end{gathered}`,
    explanation: "利用变限积分直接对 c 求导，根本不用先把积分算出来，当曲线高度正好走到上下两水平线的正中间时总面积最小。",
    commonMistake: "对下限含 c 的积分 ∫_c^1 (e - e^x) dx 求导时，容易忘记在前面添上负号。",
    hints: [
      "直接对变限积分 A(c) 求导，注意第二个积分的下限是 c，求导要变号。",
      "令 A'(c) = 2e^c - (e + 1) = 0 解出唯一驻点 c。",
      "再求二阶导数 A''(c) = 2e^c > 0，确认该点为最小值点。",
    ],
    steps: [
      "由变限积分求导公式得 A'(c) = (e^c - 1) - (e - e^c) = 2e^c - e - 1。",
      "令 A'(c) = 0，解得 e^c = (e + 1)/2，即 c = ln((e + 1)/2) ∈ (0, 1)。",
      "因为 A''(c) = 2e^c > 0 恒成立，故 c = ln((e + 1)/2) 使总面积 A(c) 取得最小值。",
    ],
  },
  {
    id: "jc935-6-2-12",
    source: "上册习题 6-2 第 12 题",
    lessonId: "integral-area",
    errorTag: "area_bounds",
    kind: "推导题",
    difficulty: "challenge",
    title: "相切抛物线与横轴围成的最大面积",
    prompt: "已知抛物线 y = px² + qx（p < 0，q > 0）在第一象限内与直线 x + y = 4 相切。问 p、q 为何值时，抛物线与 x 轴所围面积 A 达到最大？并求最大值。",
    formula: math`\begin{gathered}
y = px^2 + qx\;(p < 0,\, q > 0)\;\text{与 } x + y\\= 4 \text{ 相切} \\
\text{求与 } x \text{ 轴所围最大面积 } A_{\max}
\end{gathered}`,
    solution: math`\begin{gathered}
p = -\frac{(q+1)^2}{16},\quad A(q) = \frac{128q^3}{3(q+1)^4} \\
q = 3,\; p = -1 \text{ 时，} A_{\max} = \frac{9}{2}
\end{gathered}`,
    explanation: "先用积分写出面积关于 p、q 的公式，再用直线与抛物线相切的判别式 Δ = 0 消掉 p，化成一元函数求极值。",
    commonMistake: "容易忽略条件 p < 0 导致积分上限 -q/p 的符号弄反，或在求 A'(q) 时商的求导公式算错。",
    hints: [
      "抛物线与 x 轴交于 0 与 -q/p（因 p < 0, q > 0 故 -q/p > 0），积分得 A = q³/(6p²)。",
      "将 y = 4 - x 代入抛物线得 px² + (q + 1)x - 4 = 0，由相切条件 Δ = 0 解出 p = -(q + 1)²/16。",
      "代入 A(q) 并求导令 A'(q) = 0，解得 q = 3，再回代求 p 和 A_max。",
    ],
    steps: [
      "计算面积 A = ∫₀^{-q/p} (px² + qx) dx = q³/(6p²)。",
      "联立 y = 4 - x 与 y = px² + qx，由判别式 Δ = (q + 1)² + 16p = 0 得 p = -(q + 1)²/16。",
      "代入得 A(q) = 128q³/[3(q + 1)⁴]，求导 A'(q) = 128q²(3 - q)/[3(q + 1)⁵]，故 q = 3、p = -1 时 A_max = 9/2。",
    ],
  },
  {
    id: "jc935-6-2-13",
    source: "上册习题 6-2 第 13 题",
    lessonId: "integral-volume",
    errorTag: "volume_slices",
    kind: "推导题",
    difficulty: "basic",
    title: "抛物线区域分别绕两轴旋转的体积",
    prompt: "由曲线 y = x²、直线 x = 3 与 y = 0 所围成的平面图形分别绕 x 轴及 y 轴旋转一周，求所得两个旋转体的体积 Vₓ 与 Vᵧ。",
    formula: math`\begin{gathered}
y = x^2,\quad x = 3,\quad y = 0 \\
\text{分别绕 } x \text{ 轴与 } y \text{ 轴旋转，求 } V_x,\; V_y
\end{gathered}`,
    solution: math`\begin{gathered}
V_x = \pi\int_0^3 (x^2)^2\,dx = \frac{243}{5}\pi \\
V_y = 2\pi\int_0^3 x \cdot x^2\,dx = \frac{81}{2}\pi
\end{gathered}`,
    explanation: "绕 x 轴旋转直接切圆盘，半径就是 y = x²；绕 y 轴旋转用柱壳法（或圆柱减抛物面）最快捷。",
    commonMistake: "算 Vᵧ 时若套圆盘法容易忘记用外圆柱减去内空心，或误直接写成 π∫₀³ x² dx。",
    hints: [
      "绕 x 轴用圆盘法：Vₓ = π∫₀³ y² dx = π∫₀³ x⁴ dx。",
      "绕 y 轴可用柱壳法 Vᵧ = 2π∫₀³ x·y dx，也可用圆柱体积减去内腔体积 π·3²·9 - π∫₀⁹ y dy。",
      "分别积分并保留 π 因子。",
    ],
    steps: [
      "绕 x 轴旋转：横截面为半径 y = x² 的圆，Vₓ = π∫₀³ x⁴ dx = [πx⁵/5]₀³ = (243/5)π。",
      "绕 y 轴旋转：取柱壳微元 2πx·x² dx（或圆柱减空腔 π·9·9 - π∫₀⁹ y dy）。",
      "计算得 Vᵧ = 2π[x⁴/4]₀³ = (81/2)π。",
    ],
  },
  {
    id: "jc935-6-2-14",
    source: "上册习题 6-2 第 14 题",
    lessonId: "integral-volume",
    errorTag: "definite_substitution",
    kind: "推导题",
    difficulty: "applied",
    title: "参数星形线绕横轴旋转的体积",
    prompt: "把参数曲线 x = 2a cos³t，y = a sin³t（a > 0）所围成的平面图形绕 x 轴旋转一周，求所得旋转体的体积。",
    formula: math`\begin{gathered}
x = 2a\cos^3 t,\quad y = a\sin^3 t\;(a > 0) \\
\text{绕 } x \text{ 轴旋转一周，求体积 } V
\end{gathered}`,
    solution: math`\begin{gathered}
V = 2\pi\int_0^{2a} y^2\,dx\\= 12\pi a^3\int_0^{\frac{\pi}{2}} \sin^7 t\cos^2 t\,dt \\
= 12\pi a^3 \cdot \frac{6\cdot 4\cdot 2}{9\cdot 7\cdot 5\cdot 3} = \frac{64}{105}\pi a^3
\end{gathered}`,
    explanation: "旋转体左右对称，算右半边再乘 2；把 πy² dx 换成参数 t 后，用 sin⁷t cos²t = (1 - cos²t)³ sin t cos²t 或华里士公式一击即中。",
    commonMistake: "容易漏掉对称性的 2 倍因子，或把 ∫₀^(π/2) sin⁷t cos²t dt 的华里士公式多乘一个 π/2（奇数幂不含 π/2）。",
    hints: [
      "图形关于 y 轴对称，故 V = 2π∫₀^(2a) y² dx。",
      "换元 x = 2a cos³t（t 从 π/2 到 0），dx = -6a cos²t sin t dt。",
      "令 u = cos t 计算 ∫₀^(π/2) (1 - cos²t)³ cos²t sin t dt = ∫₀¹ (1 - u²)³ u² du。",
    ],
    steps: [
      "由左右对称性，V = 2π∫₀^(2a) y² dx = 2π∫_{π/2}^0 a² sin⁶t (-6a cos²t sin t) dt = 12πa³∫₀^(π/2) sin⁷t cos²t dt。",
      "令 u = cos t，积分化为 ∫₀¹ u²(1 - u²)³ du = ∫₀¹ (u² - 3u⁴ + 3u⁶ - u⁸) du。",
      "计算得 1/3 - 3/5 + 3/7 - 1/9 = 16/315，乘以 12πa³ 得 (64/105)πa³。",
    ],
  },
  {
    id: "jc935-6-2-15",
    source: "上册习题 6-2 第 15 题",
    lessonId: "integral-volume",
    errorTag: "volume_slices",
    kind: "证明题",
    difficulty: "applied",
    title: "用积分证明球台的体积公式",
    prompt: "用定积分证明：半径为 R 的球被两平行平面 y = a 与 y = b（-R ≤ a < b ≤ R）所截得的球台体积为 V = π(b - a)[R² - (a² + ab + b²)/3]。",
    formula: math`\begin{gathered}
x^2 + y^2 \le R^2,\quad -R \le a \le y \le b \le R \\
\text{证：} V = \pi(b - a)\!\left(R^2 - \frac{a^2 + ab + b^2}{3}\right)
\end{gathered}`,
    solution: math`\begin{gathered}
V = \pi\int_a^b (R^2 - y^2)\,dy = \pi\left[R^2 y - \frac{y^3}{3}\right]_a^b \\
= \pi(b - a)\!\left(R^2 - \frac{a^2 + ab + b^2}{3}\right)
\end{gathered}`,
    explanation: "把球台沿 y 轴切成一张张水平圆形薄片，在高度 y 处的圆半径平方正好是 R² - y²，积分后用立方差公式提公因式即得证。",
    commonMistake: "容易把水平截面半径误写成 R - y，忘记勾股定理给出的是 r² = R² - y²。",
    hints: [
      "该球台可视为圆弧 x = √(R² - y²)（a ≤ y ≤ b）绕 y 轴旋转所得。",
      "写出圆盘法积分 V = π∫_a^b (R² - y²) dy。",
      "代入上下限后利用立方差公式 b³ - a³ = (b - a)(b² + ab + a²) 提取公因式。",
    ],
    steps: [
      "在高度 y ∈ [a, b] 处，垂直于 y 轴的水平截面是半径为 √(R² - y²) 的圆，面积为 π(R² - y²)。",
      "由截面法积分：V = π∫_a^b (R² - y²) dy = π[R²(b - a) - (b³ - a³)/3]。",
      "利用 b³ - a³ = (b - a)(a² + ab + b²) 提取公因式，即得 V = π(b - a)[R² - (a² + ab + b²)/3]。",
    ],
  },
  {
    id: "jc935-6-2-16-1",
    source: "上册习题 6-2 第 16 题（1）",
    lessonId: "integral-volume",
    errorTag: "volume_washer",
    kind: "推导题",
    difficulty: "basic",
    title: "两抛物线围成区域绕 y 轴的垫片体积",
    prompt: "求抛物线 y = 2x² 与 x = 2y² 所围成的平面图形绕 y 轴旋转一周所得旋转体的体积。",
    formula: math`\begin{gathered}
y = 2x^2,\quad x = 2y^2 \\
\text{绕 } y \text{ 轴旋转一周，求体积 } V
\end{gathered}`,
    solution: math`\begin{gathered}
V = \pi\int_0^{\frac{1}{2}} \left[\left(\sqrt{\frac{y}{2}}\right)^2 - (2y^2)^2\right]dy \\
= \pi\left[\frac{y^2}{4} - \frac{4}{5}y^5\right]_0^{\frac{1}{2}} = \frac{3}{80}\pi
\end{gathered}`,
    explanation: "绕 y 轴旋转时中间有空洞，切出的水平薄片是垫片，面积用外半径平方减内半径平方。",
    commonMistake: "容易写成 π∫ (R - r)² dy（把差直接平方），或把交点误算成 (1, 1)。",
    hints: [
      "联立 y = 2x² 与 x = 2y² 得 y = 8y⁴，解得交点 (0, 0) 与 (1/2, 1/2)。",
      "在 y ∈ [0, 1/2] 内，外半径 R(y) = √(y/2)，内半径 r(y) = 2y²。",
      "套用垫片法 V = π∫₀^(1/2) (R² - r²) dy 计算。",
    ],
    steps: [
      "联立方程得 y = 2(2y²)² = 8y⁴，解得交点 (0, 0) 与 (1/2, 1/2)。",
      "绕 y 轴旋转，垫片外半径 x_外 = √(y/2)、内半径 x_内 = 2y²，V = π∫₀^(1/2) (y/2 - 4y⁴) dy。",
      "求值：π[y²/4 - (4/5)y⁵]₀^(1/2) = π(1/16 - 1/40) = (3/80)π。",
    ],
  },
  {
    id: "jc935-6-2-16-2",
    source: "上册习题 6-2 第 16 题（2）",
    lessonId: "integral-volume",
    errorTag: "volume_slices",
    kind: "推导题",
    difficulty: "applied",
    title: "反余弦曲线绕横轴旋转的体积",
    prompt: "求曲线 y = arccos x、y 轴与 x 轴在第一象限所围成的平面图形绕 x 轴旋转一周所得旋转体的体积。",
    formula: math`\begin{gathered}
y = \arccos x,\quad x = 0,\quad y = 0 \\
\text{绕 } x \text{ 轴旋转一周，求体积 } V
\end{gathered}`,
    solution: math`\begin{gathered}
V = \pi\int_0^1 (\arccos x)^2\,dx \\
\xlongequal{x = \cos t} \pi\int_0^{\frac{\pi}{2}} t^2\sin t\,dt \\
= \pi\bigl[-t^2\cos t + 2t\sin t + 2\cos t\bigr]_0^{\frac{\pi}{2}} \\
= \pi^2 - 2\pi
\end{gathered}`,
    explanation: "先令 x = cos t 把难缠的 arccos x 直接变成 t，再用两次分部积分就能把 t² sin t 轻松拿下。",
    commonMistake: "换元 x = cos t 时 dx = -sin t dt，容易漏掉负号或忘记把上下限从 [0, 1] 翻转为 [π/2, 0]。",
    hints: [
      "曲线与 x 轴交于 (1, 0)，故体积为 V = π∫₀¹ (arccos x)² dx。",
      "令 t = arccos x（即 x = cos t），积分化为 π∫₀^(π/2) t² sin t dt。",
      "连续使用两次分部积分求 ∫₀^(π/2) t² sin t dt。",
    ],
    steps: [
      "由圆盘法列式 V = π∫₀¹ (arccos x)² dx。",
      "令 x = cos t，dx = -sin t dt，x: 0 → 1 对应 t: π/2 → 0，得 V = π∫₀^(π/2) t² sin t dt。",
      "分部积分两次得 π[-t² cos t + 2t sin t + 2cos t]₀^(π/2) = π(π - 2) = π² - 2π。",
    ],
  },
  {
    id: "jc935-6-2-16-3",
    source: "上册习题 6-2 第 16 题（3）",
    lessonId: "integral-volume",
    errorTag: "volume_washer",
    kind: "推导题",
    difficulty: "applied",
    title: "圆盘绕外侧横轴旋转的环面体积",
    prompt: "求圆 x² + (y - 4)² = 9 所围成的平面图形绕 x 轴旋转一周所得环面（甜甜圈）的体积。",
    formula: math`\begin{gathered}
x^2 + (y - 4)^2 \le 9 \\
\text{绕 } x \text{ 轴旋转一周，求体积 } V
\end{gathered}`,
    solution: math`\begin{gathered}
V = \pi\int_{-3}^3 \Bigl[(4+\sqrt{9-x^2})^2 \\
- (4-\sqrt{9-x^2})^2\Bigr]\,dx \\
= 16\pi\int_{-3}^3 \sqrt{9 - x^2}\,dx = 72\pi^2
\end{gathered}`,
    explanation: "展开平方差后 4² 和 (9 - x²) 全部抵消，剩下的积分恰好是半径为 3 的半圆面积！",
    commonMistake: "容易把半径误当成 9（实际是 √9 = 3），或者在展开 (a + b)² - (a - b)² = 4ab 时少乘 2。",
    hints: [
      "把圆周拆成上半圆 y₁ = 4 + √(9 - x²) 与下半圆 y₂ = 4 - √(9 - x²)，x ∈ [-3, 3]。",
      "利用代数恒等式 (4 + u)² - (4 - u)² = 16u 化简垫片被积函数。",
      "识别 ∫₋₃³ √(9 - x²) dx 就是半径 3 的半圆面积 9π/2。",
    ],
    steps: [
      "圆盘上下边界为 y = 4 ± √(9 - x²)，x ∈ [-3, 3]，绕 x 轴旋转得垫片积分 V = π∫₋₃³ [(4 + √(9 - x²))² - (4 - √(9 - x²))²] dx。",
      "化简被积式得 V = 16π∫₋₃³ √(9 - x²) dx。",
      "由半圆面积几何意义 ∫₋₃³ √(9 - x²) dx = (1/2)π·3² = 9π/2，故 V = 16π · (9π/2) = 72π²。",
    ],
  },
  {
    id: "jc935-6-2-16-4",
    source: "上册习题 6-2 第 16 题（4）",
    lessonId: "integral-volume",
    errorTag: "volume_washer",
    kind: "推导题",
    difficulty: "challenge",
    title: "摆线一拱绕上方水平线旋转体积",
    prompt: "求摆线 x = a(t - sin t)，y = a(1 - cos t)（a > 0，0 ≤ t ≤ 2π）的一拱与 x 轴所围图形绕水平直线 y = 3a 旋转一周所得旋转体的体积。",
    formula: math`\begin{gathered}
x = a(t - \sin t),\\y = a(1 - \cos t)\;(0 \le t \le 2\pi) \\
\text{与 } x \text{ 轴所围图形绕 } y = 3a \text{ 旋转，求 } V
\end{gathered}`,
    solution: math`\begin{gathered}
V = \pi\int_0^{2\pi a} \left[(3a)^2 - (3a - y)^2\right]dx \\
= \pi a^3\int_0^{2\pi} \left[6(1-\cos t)^2 - (1-\cos t)^3\right]dt\\= 13\pi^2 a^3
\end{gathered}`,
    explanation: "转轴 y = 3a 在整拱摆线（最高点 2a）上方，所以外半径恒为 3a，内半径是 3a - y，用垫片法换元到 t 即可。",
    commonMistake: "容易把内半径错写成 y - 3a 漏看符号，或者忘记 (1 - cos t)³ 在 [0, 2π] 上积分等于 5π。",
    hints: [
      "摆线一拱满足 0 ≤ y ≤ 2a < 3a，绕 y = 3a 旋转的外半径为 3a，内半径为 3a - y。",
      "展开 (3a)² - (3a - y)² = 6ay - y²，再代入 y = a(1 - cos t) 与 dx = a(1 - cos t) dt。",
      "利用 ∫₀^(2π) (1 - cos t)² dt = 3π 与 ∫₀^(2π) (1 - cos t)³ dt = 5π 求值。",
    ],
    steps: [
      "由垫片法 V = π∫₀^(2πa) [(3a)² - (3a - y)²] dx = π∫₀^(2πa) (6ay - y²) dx。",
      "参数换元得 V = πa³∫₀^(2π) [6(1 - cos t)² - (1 - cos t)³] dt。",
      "由周期积分 ∫₀^(2π) (1 - cos t)² dt = 3π、∫₀^(2π) (1 - cos t)³ dt = 5π，得 V = πa³(18π - 5π) = 13π²a³。",
    ],
  },
  {
    id: "jc935-6-2-17",
    source: "上册习题 6-2 第 17 题",
    lessonId: "integral-volume",
    errorTag: "volume_washer",
    kind: "推导题",
    difficulty: "applied",
    title: "一般圆盘绕水平外轴的环面体积",
    prompt: "求圆盘 x² + y² ≤ r² 绕水平直线 y = c（c > r > 0）旋转一周所得旋转体的体积。",
    formula: math`\begin{gathered}
x^2 + y^2 \le r^2,\quad \text{绕 } y = c\;(c > r > 0)\text{ 旋转} \\
\text{求旋转体体积 } V
\end{gathered}`,
    solution: math`\begin{gathered}
V = \pi\int_{-r}^r \Bigl[(c+\sqrt{r^2-x^2})^2 \\
- (c-\sqrt{r^2-x^2})^2\Bigr]\,dx \\
= 4\pi c\int_{-r}^r \sqrt{r^2 - x^2}\,dx = 2\pi^2 r^2 c
\end{gathered}`,
    explanation: "外半径是圆心距 c 加半弦高，内半径是 c 减半弦高，平方差化简后正好印证帕普斯定理：圆面积 πr² 乘圆心轨迹周长 2πc。",
    commonMistake: "容易把外半径与内半径写反，算得负体积。",
    hints: [
      "圆盘下边界距轴 y = c 更远，外半径 R(x) = c + √(r² - x²)，内半径 r_内(x) = c - √(r² - x²)。",
      "用平方差化简 R² - r_内² = 4c√(r² - x²)。",
      "利用半径为 r 的半圆面积 ∫_{-r}^r √(r² - x²) dx = πr²/2 直接出结果。",
    ],
    steps: [
      "对任意 x ∈ [-r, r]，垫片外半径为 c + √(r² - x²)，内半径为 c - √(r² - x²)。",
      "列式并化简：V = π∫_{-r}^r 4c√(r² - x²) dx = 4πc∫_{-r}^r √(r² - x²) dx。",
      "代入半圆面积 πr²/2，得 V = 4πc · (πr²/2) = 2π²r²c。",
    ],
  },
  {
    id: "jc935-6-2-18",
    source: "上册习题 6-2 第 18 题",
    lessonId: "integral-volume",
    errorTag: "volume_slices",
    kind: "推导题",
    difficulty: "applied",
    title: "线性变截面矩形截锥体的体积",
    prompt: "设有一高为 h 的立体，其下底为边长 A、B 的矩形，上底为边长 a、b 的矩形，且距下底 z 处的水平截面均为边长随 z 线性变化的矩形。求该立体的体积。",
    formula: math`\begin{gathered}
u(z) = A + \frac{a - A}{h}z,\quad v(z) = B + \frac{b - B}{h}z \\
0 \le z \le h,\;\text{求体积 } V = \int_0^h u(z)v(z)\,dz
\end{gathered}`,
    solution: math`\begin{gathered}
V = \int_0^h \left(A + \frac{a-A}{h}z\right)\left(B + \frac{b-B}{h}z\right)dz \\
= \frac{h}{6}\left[2(AB + ab) + Ab + aB\right]
\end{gathered}`,
    explanation: "把截面长宽写成高度 z 的一次函数，乘积展开成关于 z 的二次多项式再从 0 积到 h，整理即得经典拟柱体公式。",
    commonMistake: "展开乘积并代入 z = h 后，通分合并 AB、Ab、aB、ab 的系数时容易算错分数。",
    hints: [
      "令 s = z/h ∈ [0, 1]，换元可把 h 直接提到积分号外面，大幅简化代数运算。",
      "写出 u(s) = A(1 - s) + as，v(s) = B(1 - s) + bs。",
      "利用 ∫₀¹ (1 - s)² ds = 1/3、∫₀¹ s² ds = 1/3、∫₀¹ s(1 - s) ds = 1/6 直接口算结果。",
    ],
    steps: [
      "作无量纲换元 s = z/h，截面边长为 u = A(1 - s) + as，v = B(1 - s) + bs。",
      "体积 V = h∫₀¹ [AB(1 - s)² + (Ab + aB)s(1 - s) + ab s²] ds。",
      "代入三个基本积分 1/3、1/6、1/3，整理得 V = (h/6)[2(AB + ab) + Ab + aB]。",
    ],
  },
  {
    id: "jc935-6-2-19",
    source: "上册习题 6-2 第 19 题",
    lessonId: "integral-volume",
    errorTag: "volume_slices",
    kind: "推导题",
    difficulty: "applied",
    title: "圆底正方形截面的立体体积",
    prompt: "一立体的底面是半径为 R 的圆，垂直于底面某条固定直径的所有横截面都是正方形，求该立体的体积。",
    formula: math`\begin{gathered}
\text{底面：}x^2 + y^2 \le R^2,\;\text{横截面为正方形} \\
\text{求该立体的体积 } V
\end{gathered}`,
    solution: math`\begin{gathered}
A(x) = \left(2\sqrt{R^2 - x^2}\right)^2 = 4(R^2 - x^2) \\
V = \int_{-R}^R 4(R^2 - x^2)\,dx = \frac{16}{3}R^3
\end{gathered}`,
    explanation: "以固定直径为 x 轴，在位置 x 处圆的弦长就是正方形的边长 2√(R² - x²)，平方得截面积后积分即可。",
    commonMistake: "常把正方形边长误写成半弦长 √(R² - x²)，导致结果少了 4 倍。",
    hints: [
      "以圆心为原点、固定直径为 x 轴建立坐标系，x ∈ [-R, R]。",
      "在 x 处圆的完整弦长为 2√(R² - x²)，故正方形截面积 A(x) = 4(R² - x²)。",
      "利用偶函数对称性，计算 V = 8∫₀^R (R² - x²) dx。",
    ],
    steps: [
      "以固定直径为 x 轴，x 处截面正方形的边长为圆的弦长 2√(R² - x²)。",
      "截面面积函数为 A(x) = (2√(R² - x²))² = 4(R² - x²)。",
      "积分得 V = 2∫₀^R 4(R² - x²) dx = 8[R²x - x³/3]₀^R = (16/3)R³。",
    ],
  },
  {
    id: "jc935-6-2-20",
    source: "上册习题 6-2 第 20 题",
    lessonId: "integral-volume",
    errorTag: "volume_slices",
    kind: "证明题",
    difficulty: "applied",
    title: "微元法证明偏移轴柱壳体积公式",
    prompt: "设连续函数 f(x) ≥ 0 定义在 [a, b]（a < b）上，常数 c ≤ a。用微元法证明：平面图形 a ≤ x ≤ b，0 ≤ y ≤ f(x) 绕竖直线 x = c 旋转一周所得旋转体体积为 V = 2π∫_a^b (x - c)f(x) dx。",
    formula: math`\begin{gathered}
a \le x \le b,\; 0 \le y \le f(x),\; c \le a \\
\text{证绕 } x = c \text{ 旋转体积 } V\\= 2\pi\int_a^b (x - c)f(x)\,dx
\end{gathered}`,
    solution: math`\begin{gathered}
\text{薄圆柱壳半径 } r = x - c,\;\text{高 } f(x),\;\text{厚 } dx \\
dV = 2\pi(x - c)f(x)\,dx\\\implies V = 2\pi\int_a^b (x - c)f(x)\,dx
\end{gathered}`,
    explanation: "把小竖条绕竖轴转一圈得到一只极薄的空心圆筒，剪开铺平就是一块长 2π(x - c)、高 f(x)、厚 dx 的薄纸片。",
    commonMistake: "容易把旋转半径写成 x 而忽略轴的平移量 c，或漏掉展开圆周长里的因子 2π。",
    hints: [
      "在 [a, b] 上任取微区间 [x, x + dx]，对应的窄矩形高约 f(x)、宽 dx。",
      "该窄条绕直线 x = c 旋转形成薄圆柱壳，内半径 x - c、外半径 x + dx - c。",
      "用外圆柱减内圆柱展开 π[(x + dx - c)² - (x - c)²]f(x)，略去高阶无穷小 (dx)²。",
    ],
    steps: [
      "在 [a, b] 上任取子区间 [x, x + dx]，其上窄曲边梯形绕 x = c 旋转近似为高 f(x) 的薄圆柱壳。",
      "该壳体积 ΔV ≈ π[(x + dx - c)² - (x - c)²]f(x) = [2π(x - c)dx + π(dx)²]f(x)，主部即体积微元 dV = 2π(x - c)f(x) dx。",
      "在区间 [a, b] 上对微元积分，即得旋转体体积公式 V = 2π∫_a^b (x - c)f(x) dx。",
    ],
  },
  {
    id: "jc935-6-2-21-1",
    source: "上册习题 6-2 第 21 题（1）",
    lessonId: "integral-volume",
    errorTag: "volume_slices",
    kind: "推导题",
    difficulty: "applied",
    title: "柱壳法求余弦区域绕 y 轴体积",
    prompt: "用柱壳法求曲线 y = cos x（0 ≤ x ≤ π/2）与两坐标轴所围成的平面图形绕 y 轴旋转一周所得旋转体的体积。",
    formula: math`\begin{gathered}
y = \cos x\;(0 \le x \le \tfrac{\pi}{2}),\; x = 0,\; y = 0 \\
\text{绕 } y \text{ 轴旋转一周，求体积 } V
\end{gathered}`,
    solution: math`\begin{gathered}
V = 2\pi\int_0^{\frac{\pi}{2}} x\cos x\,dx \\
= 2\pi\left[x\sin x + \cos x\right]_0^{\frac{\pi}{2}} = \pi^2 - 2\pi
\end{gathered}`,
    explanation: "用柱壳法避开求反函数 arccos y，只需对 x cos x 做一次简单的分部积分。",
    commonMistake: "计算 [x sin x + cos x]₀^(π/2) 时容易漏掉下限 x = 0 处的 cos 0 = 1。",
    hints: [
      "绕 y 轴旋转（c = 0），套用柱壳公式 V = 2π∫₀^(π/2) x cos x dx。",
      "用分部积分：∫ x cos x dx = x sin x - ∫ sin x dx = x sin x + cos x。",
      "仔细代入上下限 π/2 和 0。",
    ],
    steps: [
      "由柱壳法写出体积微元 dV = 2πx cos x dx，积分区间为 [0, π/2]。",
      "分部积分得 ∫₀^(π/2) x cos x dx = [x sin x + cos x]₀^(π/2) = π/2 - 1。",
      "乘以 2π 得旋转体体积 V = 2π(π/2 - 1) = π² - 2π。",
    ],
  },
  {
    id: "jc935-6-2-21-2",
    source: "上册习题 6-2 第 21 题（2）",
    lessonId: "integral-volume",
    errorTag: "volume_slices",
    kind: "推导题",
    difficulty: "applied",
    title: "柱壳法求余弦区域绕平移竖轴体积",
    prompt: "用柱壳法求曲线 y = cos x（0 ≤ x ≤ π/2）与两坐标轴所围成的平面图形绕直线 x = -π/2 旋转一周所得旋转体的体积。",
    formula: math`\begin{gathered}
y = \cos x\;(0 \le x \le \tfrac{\pi}{2}),\; x = 0,\; y = 0 \\
\text{绕 } x = -\frac{\pi}{2} \text{ 旋转一周，求体积 } V
\end{gathered}`,
    solution: math`\begin{gathered}
V = 2\pi\int_0^{\frac{\pi}{2}} \left(x + \frac{\pi}{2}\right)\cos x\,dx \\
= 2\pi\left(\frac{\pi}{2} - 1 + \frac{\pi}{2}\right) = 2\pi^2 - 2\pi
\end{gathered}`,
    explanation: "转轴向左移了 π/2，每个柱壳的半径从 x 变成 x + π/2，多出来的常数部分正好是 π/2 乘以区域面积 1。",
    commonMistake: "容易把旋转半径误写成 x - π/2，忘记到 x = -π/2 的距离是 x - (-π/2) = x + π/2。",
    hints: [
      "任一点 x ∈ [0, π/2] 到旋转轴 x = -π/2 的距离为 r = x + π/2。",
      "把积分拆成 2π∫₀^(π/2) x cos x dx + π²∫₀^(π/2) cos x dx。",
      "结合上一题结果与 ∫₀^(π/2) cos x dx = 1 直接相加。",
    ],
    steps: [
      "取柱壳半径 r = x - (-π/2) = x + π/2，列式 V = 2π∫₀^(π/2) (x + π/2)cos x dx。",
      "拆分为 2π∫₀^(π/2) x cos x dx + π²∫₀^(π/2) cos x dx。",
      "代入两个积分得 (π² - 2π) + π² = 2π² - 2π。",
    ],
  },
  {
    id: "jc935-6-2-22-1",
    source: "上册习题 6-2 第 22 题（1）",
    lessonId: "integral-volume",
    errorTag: "volume_slices",
    kind: "推导题",
    difficulty: "applied",
    title: "分段抛物线区域的两个旋转体体积",
    prompt: "设 0 < a < 3，抛物线 y = x²、直线 x = a、x = 3 及 y = 0 围成区域 D₁，y = x²、直线 x = a 及 y = 0 围成区域 D₂。求 D₁ 绕 x 轴的体积 V₁ 与 D₂ 绕 y 轴的体积 V₂。",
    formula: math`\begin{gathered}
D_1:\; a \le x \le 3,\; 0 \le y \le x^2\;\text{绕 } x \text{ 轴} \\
D_2:\; 0 \le x \le a,\\0 \le y \le x^2\;\text{绕 } y \text{ 轴，求 } V_1,\; V_2
\end{gathered}`,
    solution: math`\begin{gathered}
V_1 = \pi\int_a^3 x^4\,dx = \frac{\pi}{5}\left(243 - a^5\right) \\
V_2 = 2\pi\int_0^a x\cdot x^2\,dx = \frac{\pi}{2}a^4
\end{gathered}`,
    explanation: "右边 D₁ 绕 x 轴用圆盘法得到含 a⁵ 的表达式，左边 D₂ 绕 y 轴用柱壳法得到含 a⁴ 的表达式。",
    commonMistake: "算 V₂ 时若直接套圆盘法容易忘了是外圆柱减内抛物面，或者把柱壳法里的 2π 漏写成 π。",
    hints: [
      "D₁ 绕 x 轴旋转用圆盘法：V₁ = π∫_a^3 (x²)² dx。",
      "D₂ 绕 y 轴旋转用柱壳法：V₂ = 2π∫₀^a x·x² dx。",
      "注意 3⁵ = 243，分别积分化简。",
    ],
    steps: [
      "D₁ 绕 x 轴旋转：V₁ = π∫_a^3 x⁴ dx = (π/5)(3⁵ - a⁵) = (π/5)(243 - a⁵)。",
      "D₂ 绕 y 轴旋转：由柱壳法 V₂ = 2π∫₀^a x·x² dx = 2π[x⁴/4]₀^a。",
      "化简得 V₂ = (π/2)a⁴。",
    ],
  },
  {
    id: "jc935-6-2-22-2",
    source: "上册习题 6-2 第 22 题（2）",
    lessonId: "integral-volume",
    errorTag: "volume_slices",
    kind: "推导题",
    difficulty: "challenge",
    title: "两个旋转体体积之和的最大值",
    prompt: "承接上题，总体积 V(a) = V₁ + V₂ = (π/5)(243 - a⁵) + (π/2)a⁴（0 < a < 3）。问 a 为何值时 V(a) 取得最大值，并求此最大值。",
    formula: math`\begin{gathered}
V(a) = \frac{\pi}{5}(243 - a^5) + \frac{\pi}{2}a^4\;(0 < a < 3) \\
\text{求使 } V(a) \text{ 最大的 } a \text{ 与 } V_{\max}
\end{gathered}`,
    solution: math`\begin{gathered}
V'(a) = \pi a^3(2 - a) = 0 \implies a = 2 \\
V_{\max} = V(2) = \frac{251}{5}\pi
\end{gathered}`,
    explanation: "对参数 a 求导，正好把积分号还原成被积函数之差，唯一驻点 a = 2 左增右减，立刻锁定全局最大值。",
    commonMistake: "算出驻点 a = 2 后容易忘了检验单调性，或在代入 V(2) 时算错 243 - 32 + 40。",
    hints: [
      "对 V(a) 求导得 V'(a) = -πa⁴ + 2πa³ = πa³(2 - a)。",
      "在区间 (0, 3) 内解 V'(a) = 0 得唯一驻点 a = 2。",
      "判断 V'(a) 在 (0, 2) 正、在 (2, 3) 负，代入计算 V(2)。",
    ],
    steps: [
      "求导得 V'(a) = -πa⁴ + 2πa³ = πa³(2 - a)，在 (0, 3) 内唯一驻点为 a = 2。",
      "当 0 < a < 2 时 V'(a) > 0；当 2 < a < 3 时 V'(a) < 0，故 a = 2 为唯一极大值点即最大值点。",
      "代入得 V_max = (π/5)(243 - 32) + (π/2)·16 = (211/5 + 8)π = (251/5)π。",
    ],
  },
  {
    id: "jc935-6-2-23",
    source: "上册习题 6-2 第 23 题",
    lessonId: "integral-arc",
    errorTag: "arc_integrand",
    kind: "推导题",
    difficulty: "applied",
    title: "自然对数曲线的弧长计算",
    prompt: "计算曲线 y = ln x 上相应于 2√2 ≤ x ≤ √15 的一段弧的长度。",
    formula: math`\begin{gathered}
y = \ln x,\quad 2\sqrt{2} \le x \le \sqrt{15} \\
\text{求弧长 } s = \int_{2\sqrt{2}}^{\sqrt{15}} \sqrt{1 + \frac{1}{x^2}}\,dx
\end{gathered}`,
    solution: math`\begin{gathered}
\text{令 } u = \sqrt{x^2 + 1},\; s = \int_3^4 \frac{u^2}{u^2 - 1}\,du \\
= \left[u + \frac{1}{2}\ln\frac{u - 1}{u + 1}\right]_3^4 = 1 + \frac{1}{2}\ln\frac{6}{5}
\end{gathered}`,
    explanation: "端点 2√2 和 √15 刚好让 √(x² + 1) 变成整数 3 和 4，整体根式换元后化成简单有理分式。",
    commonMistake: "换元 u = √(x² + 1) 后，容易忘记把积分限同步换成 u ∈ [3, 4]，或把 (u - 1)/(u + 1) 的比值算反。",
    hints: [
      "由 y' = 1/x，弧长微元化为 [√(x² + 1)/x] dx。",
      "令 u = √(x² + 1)，则 x² = u² - 1，x dx = u du，x ∈ [2√2, √15] 对应 u ∈ [3, 4]。",
      "把 u²/(u² - 1) 拆成 1 + 1/(u² - 1) 再积分。",
    ],
    steps: [
      "求导 y' = 1/x，得 s = ∫_{2√2}^{√15} [√(x² + 1)/x] dx。",
      "令 u = √(x² + 1)，则 dx/x = u du/(u² - 1)，积分化为 ∫₃⁴ [1 + 1/(u² - 1)] du。",
      "求值：[u + (1/2)ln((u - 1)/(u + 1))]₃⁴ = (4 - 3) + (1/2)ln((3/5)/(2/4)) = 1 + (1/2)ln(6/5)。",
    ],
  },
  {
    id: "jc935-6-2-24",
    source: "上册习题 6-2 第 24 题",
    lessonId: "integral-arc",
    errorTag: "arc_slope",
    kind: "推导题",
    difficulty: "applied",
    title: "半立方抛物线被抛物线截得的弧长",
    prompt: "计算半立方抛物线 y² = (4/9)(x - 2)³ 被抛物线 y² = (4/27)x 截得的一段弧（含上下两支）的总长度。",
    formula: math`\begin{gathered}
y^2 = \frac{4}{9}(x - 2)^3,\quad y^2 = \frac{4}{27}x \\
\text{求所截弧段的总长度 } s
\end{gathered}`,
    solution: math`\begin{gathered}
\text{交点 } x = 3,\; y = \frac{2}{3}(x-2)^{\frac{3}{2}},\; y' = \sqrt{x-2} \\
s = 2\int_2^3 \sqrt{x - 1}\,dx = \frac{4}{3}\left(2\sqrt{2} - 1\right)
\end{gathered}`,
    explanation: "两曲线关于 x 轴对称，只算上半支再乘 2；半立方抛物线的导数平方刚好让 1 + (y')² 化成一个一次式 x - 1。",
    commonMistake: "容易忘记曲线有上下两支（漏乘 2），或在求 x 区间时把尖点起点误当成 x = 0（实际定义域 x ≥ 2）。",
    hints: [
      "联立 (4/9)(x - 2)³ = (4/27)x 得 3(x - 2)³ = x，观察验证 x = 3 为唯一实根。",
      "上半支方程为 y = (2/3)(x - 2)^(3/2)（2 ≤ x ≤ 3），求导得 y' = √(x - 2)。",
      "代入弧长公式 s = 2∫₂³ √(1 + (x - 2)) dx 计算。",
    ],
    steps: [
      "联立方程得 3(x - 2)³ = x，即 (x - 3)(3x² - 9x + 8) = 0，唯一实交点横坐标为 x = 3。",
      "由关于 x 轴对称，取上半支 y = (2/3)(x - 2)^(3/2)（2 ≤ x ≤ 3），得 y' = √(x - 2)，1 + (y')² = x - 1。",
      "积分得总弧长 s = 2∫₂³ √(x - 1) dx = (4/3)[(x - 1)^(3/2)]₂³ = (4/3)(2√2 - 1)。",
    ],
  },
  {
    id: "jc935-6-2-25",
    source: "上册习题 6-2 第 25 题",
    lessonId: "integral-arc",
    errorTag: "arc_integrand",
    kind: "推导题",
    difficulty: "applied",
    title: "抛物线从顶点到任一点的弧长",
    prompt: "计算抛物线 y = x²/(2p)（p > 0）从顶点 O(0, 0) 到曲线上第一象限一点 M(x, y)（x > 0）的弧长。",
    formula: math`\begin{gathered}
y = \frac{x^2}{2p}\;(p > 0),\;\text{从 } O(0,0)\text{ 到 } M(x,y) \\
\text{求弧长 } s = \int_0^x \sqrt{1 + \frac{t^2}{p^2}}\,dt
\end{gathered}`,
    solution: math`\begin{gathered}
s = \frac{1}{p}\int_0^x \sqrt{p^2 + t^2}\,dt \\
= \frac{x}{2p}\sqrt{p^2 + x^2} + \frac{p}{2}\ln\frac{x + \sqrt{p^2 + x^2}}{p}
\end{gathered}`,
    explanation: "求导得到斜率 t/p，提因子 1/p 后就变成标准根式积分 ∫ √(p² + t²) dt，直接套用基本积分公式。",
    commonMistake: "代入下限 t = 0 时，容易漏掉对数项 ln(0 + p) = ln p，导致结果缺少分母 p。",
    hints: [
      "求导 y' = t/p，把被积函数写成 (1/p)√(p² + t²)。",
      "套用标准积分公式 ∫ √(p² + t²) dt = (t/2)√(p² + t²) + (p²/2)ln(t + √(p² + t²))。",
      "代入上限 x 和下限 0，合并两个对数项。",
    ],
    steps: [
      "由 y = t²/(2p) 得 y' = t/p，弧长 s = (1/p)∫₀^x √(p² + t²) dt。",
      "应用标准积分公式得 s = (1/p)[(t/2)√(p² + t²) + (p²/2)ln(t + √(p² + t²))]₀^x。",
      "代入上下限并合并对数，得 s = [x/(2p)]√(p² + x²) + (p/2)ln[(x + √(p² + x²))/p]。",
    ],
  },
  {
    id: "jc935-6-2-26",
    source: "上册习题 6-2 第 26 题",
    lessonId: "integral-arc",
    errorTag: "arc_integrand",
    kind: "推导题",
    difficulty: "basic",
    title: "星形线的全周弧长",
    prompt: "计算星形线 x = 3a cos³t，y = 3a sin³t（a > 0，0 ≤ t ≤ 2π）的全长。",
    formula: math`\begin{gathered}
x = 3a\cos^3 t,\quad y = 3a\sin^3 t\;(a > 0) \\
\text{求星形线的全长 } s
\end{gathered}`,
    solution: math`\begin{gathered}
s = 4\int_0^{\frac{\pi}{2}} 9a\sin t\cos t\,dt \\
= 36a\left[\frac{1}{2}\sin^2 t\right]_0^{\frac{\pi}{2}} = 18a
\end{gathered}`,
    explanation: "先只算第一象限（sin t 和 cos t 都非负，开根号不用操心绝对值），再乘以 4 就得到整条星形线的周长。",
    commonMistake: "如果直接从 0 积到 2π 却不给 sin t cos t 加绝对值，正负抵消会荒谬地算出弧长为 0。",
    hints: [
      "先求导 x'(t) = -9a cos²t sin t，y'(t) = 9a sin²t cos t。",
      "化简 √(x'² + y'²) = 9a|sin t cos t|，利用四象限对称性取 t ∈ [0, π/2] 去掉绝对值。",
      "计算 4∫₀^(π/2) 9a sin t cos t dt。",
    ],
    steps: [
      "求导得 x' = -9a cos²t sin t，y' = 9a sin²t cos t，故 √(x'² + y'²) = 9a|sin t cos t|。",
      "由对称性，全长 s = 4∫₀^(π/2) 9a sin t cos t dt = 36a∫₀^(π/2) sin t d(sin t)。",
      "求值：36a · (1/2) = 18a。",
    ],
  },
  {
    id: "jc935-6-2-27",
    source: "上册习题 6-2 第 27 题",
    lessonId: "integral-arc",
    errorTag: "arc_integrand",
    kind: "推导题",
    difficulty: "basic",
    title: "圆的渐伸线弧长",
    prompt: "已知圆的渐伸线参数方程为 x = a(cos t + t sin t)，y = a(sin t - t cos t)（a > 0），计算相应于 0 ≤ t ≤ 2π 的一段弧的长度。",
    formula: math`\begin{gathered}
x = a(\cos t + t\sin t),\\y = a(\sin t - t\cos t) \\
0 \le t \le 2\pi,\;\text{求弧长 } s
\end{gathered}`,
    solution: math`\begin{gathered}
x' = at\cos t,\quad y' = at\sin t \\
s = \int_0^{2\pi} \sqrt{a^2 t^2(\cos^2 t + \sin^2 t)}\,dt = 2\pi^2 a
\end{gathered}`,
    explanation: "求导后多余的 sin t、cos t 项全部自动抵消，弧长微元竟然干净到只剩 at dt！",
    commonMistake: "对 t sin t 和 t cos t 求导时容易漏用乘法法则，导致无法消去前面项。",
    hints: [
      "用乘法求导法则算 x'(t) = a(-sin t + sin t + t cos t) = at cos t。",
      "同理算 y'(t) = a(cos t - cos t + t sin t) = at sin t。",
      "在 [0, 2π] 上 t ≥ 0，直接对 at 积分。",
    ],
    steps: [
      "分别求导：x'(t) = at cos t，y'(t) = at sin t。",
      "计算弧长微元：ds = √(x'² + y'²) dt = √(a²t²) dt = at dt（因 t ≥ 0）。",
      "积分得 s = ∫₀^(2π) at dt = [(a/2)t²]₀^(2π) = 2π²a。",
    ],
  },
  {
    id: "jc935-6-2-28",
    source: "上册习题 6-2 第 28 题",
    lessonId: "integral-arc",
    errorTag: "arc_integrand",
    kind: "推导题",
    difficulty: "challenge",
    title: "按弧长比例求摆线分点坐标",
    prompt: "在摆线 x = 2a(t - sin t)，y = 2a(1 - cos t)（a > 0，0 ≤ t ≤ 2π）的第一拱上，求将此拱弧长分成 3 : 1（从原点起占总长 3/4）的分点坐标。",
    formula: math`\begin{gathered}
x = 2a(t - \sin t),\quad y = 2a(1 - \cos t) \\
\text{求将第一拱弧长分成 } 3:1 \text{ 的分点坐标}
\end{gathered}`,
    solution: math`\begin{gathered}
s(t_0) = 8a\left(1 - \cos\frac{t_0}{2}\right) = \frac{3}{4}\cdot 16a\\\implies t_0 = \frac{4\pi}{3} \\
\text{分点坐标：}\left(\left(\frac{8\pi}{3} + \sqrt{3}\right)a,\; 3a\right)
\end{gathered}`,
    explanation: "先用半角公式把从 0 到 t₀ 的弧长积出来，解出占全拱 3/4 时的参数 t₀ = 4π/3，再代回参数方程即得坐标。",
    commonMistake: "把 sin(4π/3) 误算成 +√3/2（实际在第三象限为 -√3/2），导致 x 坐标里的根号项符号出错。",
    hints: [
      "先算 √(x'² + y'²) = 2a√(2 - 2cos t) = 4a sin(t/2)（t ∈ [0, 2π]）。",
      "积分得 s(t₀) = 8a(1 - cos(t₀/2))，全拱长 s(2π) = 16a。",
      "令 s(t₀) = 12a 得 cos(t₀/2) = -1/2，解出 t₀ = 4π/3 并代回求 (x, y)。",
    ],
    steps: [
      "计算 ds = 2a√((1 - cos t)² + sin²t) dt = 4a sin(t/2) dt，故 s(t₀) = ∫₀^{t₀} 4a sin(t/2) dt = 8a(1 - cos(t₀/2))。",
      "第一拱总长 s(2π) = 16a，由 8a(1 - cos(t₀/2)) = 12a 得 cos(t₀/2) = -1/2，解得 t₀ = 4π/3。",
      "代回参数方程：x = 2a(4π/3 - (-√3/2)) = (8π/3 + √3)a，y = 2a(1 - (-1/2)) = 3a。",
    ],
  },
  {
    id: "jc935-6-2-29",
    source: "上册习题 6-2 第 29 题",
    lessonId: "integral-arc",
    errorTag: "arc_integrand",
    kind: "推导题",
    difficulty: "basic",
    title: "极坐标对数螺线的弧长",
    prompt: "求对数螺线 r = 2e^(kθ)（k > 0）上相应于 0 ≤ θ ≤ α（α > 0）的一段弧的长度。",
    formula: math`\begin{gathered}
r = 2e^{k\theta}\;(k > 0,\; 0 \le \theta \le \alpha) \\
\text{求弧长 } s = \int_0^\alpha \sqrt{r^2 + (r')^2}\,d\theta
\end{gathered}`,
    solution: math`\begin{gathered}
s = \int_0^\alpha 2\sqrt{1 + k^2}\,e^{k\theta}\,d\theta \\
= \frac{2\sqrt{1 + k^2}}{k}\left(e^{k\alpha} - 1\right)
\end{gathered}`,
    explanation: "对数螺线的导数和自身只差一个常数倍 k，所以根号内提出公因子后变成极简的指数积分。",
    commonMistake: "套极坐标弧长公式时容易把 √(r² + r'²) 误写成 √(1 + r'²)，或在积分后漏除系数 k。",
    hints: [
      "先求导 r'(θ) = 2k e^(kθ)。",
      "代入极坐标弧长公式 √(r² + r'²) = 2√(1 + k²) e^(kθ)。",
      "积分后注意下限 θ = 0 处 e⁰ = 1。",
    ],
    steps: [
      "求导得 r' = 2k e^(kθ)，故 √(r² + (r')²) = 2√(1 + k²) e^(kθ)。",
      "列式 s = 2√(1 + k²) ∫₀^α e^(kθ) dθ。",
      "计算原函数并代入上下限得 [2√(1 + k²)/k](e^(kα) - 1)。",
    ],
  },
  {
    id: "jc935-6-2-30",
    source: "上册习题 6-2 第 30 题",
    lessonId: "integral-arc",
    errorTag: "arc_integrand",
    kind: "推导题",
    difficulty: "challenge",
    title: "双曲螺线的弧长计算",
    prompt: "求双曲螺线 rθ = 2 上相应于 5/12 ≤ θ ≤ 12/5 的一段弧的长度。",
    formula: math`\begin{gathered}
r\theta = 2,\quad \frac{5}{12} \le \theta \le \frac{12}{5} \\
\text{求弧长 } s = \int_{\frac{5}{12}}^{\frac{12}{5}} \frac{2\sqrt{1 + \theta^2}}{\theta^2}\,d\theta
\end{gathered}`,
    solution: math`\begin{gathered}
s = 2\left[-\frac{\sqrt{1+\theta^2}}{\theta} + \ln\left(\theta + \sqrt{1+\theta^2}\right)\right]_{\frac{5}{12}}^{\frac{12}{5}} \\
= \frac{91}{30} + 2\ln\frac{10}{3}
\end{gathered}`,
    explanation: "把 1/θ² dθ 凑成 -d(1/θ) 做一次分部积分，端点 5/12 和 12/5 是一组勾股数，根号全部开成有理数！",
    commonMistake: "对 1/θ² 凑微分时容易漏掉负号，或在代入端点 5/12 时把 √(1 + 25/144) = 13/12 除以 5/12 算错。",
    hints: [
      "由 r = 2/θ 得 r' = -2/θ²，弧长微元化为 2[√(1 + θ²)/θ²] dθ。",
      "把 dθ/θ² 凑成 -d(1/θ)，用分部积分化出 ∫ dθ/√(1 + θ²) = ln(θ + √(1 + θ²))。",
      "利用 5-12-13 勾股数分别算出两端点的根式值。",
    ],
    steps: [
      "求导 r' = -2/θ²，得 s = 2∫_{5/12}^{12/5} [√(1 + θ²)/θ²] dθ = -2∫_{5/12}^{12/5} √(1 + θ²) d(1/θ)。",
      "分部积分得 s = 2[-√(1 + θ²)/θ + ln(θ + √(1 + θ²))]_{5/12}^{12/5}。",
      "代入 θ = 12/5（√ = 13/5）与 θ = 5/12（√ = 13/12），得 2(13/5 - 13/12) + 2ln(5/(3/2)) = 91/30 + 2ln(10/3)。",
    ],
  },
] satisfies Omit<WrittenProblem, "errorLabel">[];

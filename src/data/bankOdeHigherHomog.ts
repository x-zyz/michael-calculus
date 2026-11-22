import type { WrittenProblem } from "./learning";

const math = String.raw;

export const bankOdeHigherHomog = [
  // ==================== 习题 7-6 高阶线性微分方程 (22 题) ====================
  {
    id: "jc935-7-6-1-1",
    source: "上册习题 7-6 第 1 题（1）",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "证明题",
    difficulty: "basic",
    title: "幂函数组线性无关判别",
    prompt: "判断函数组 y₁ = x² 与 y₂ = x³ 在区间 (-∞, +∞) 内是否线性无关。",
    formula: math`y_1=x^2,\quad y_2=x^3`,
    solution: math`\begin{gathered}
\frac{y_2}{y_1}=x\neq\text{常数} \\
\text{故 }x^2\text{ 与 }x^3\text{ 线性无关}
\end{gathered}`,
    explanation: "两个函数线性无关，就是它们不能互相乘以一个固定常数得到；比值是变量 x，说明二者步调不同。",
    commonMistake: "只代入 x = 0 看到两者都为 0，就误判为线性相关；线性相关性要在整个区间上恒成立。",
    hints: [
      "对两个函数构成的函数组，只需考察它们的比值是否为常数。",
      "在 x ≠ 0 处计算 y₂ / y₁ = x³ / x² = x。",
      "也可计算朗斯基行列式 W = x⁴，它不恒为零。",
    ],
    steps: [
      "设 c₁x² + c₂x³ ≡ 0 在 (-∞, +∞) 上恒成立。",
      "当 x ≠ 0 时，y₂ / y₁ = x 不是常数（朗斯基行列式 W(x) = x⁴ 不恒为零）。",
      "因此必有 c₁ = c₂ = 0，该函数组在 (-∞, +∞) 内线性无关。",
    ],
  },
  {
    id: "jc935-7-6-1-2",
    source: "上册习题 7-6 第 1 题（2）",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "证明题",
    difficulty: "basic",
    title: "常数倍幂函数组的线性相关",
    prompt: "判断函数组 y₁ = x² 与 y₂ = 5x² 在区间 (-∞, +∞) 内是否线性无关。",
    formula: math`y_1=x^2,\quad y_2=5x^2`,
    solution: math`\begin{gathered}
5y_1-y_2\equiv 0 \\
\text{故 }x^2\text{ 与 }5x^2\text{ 线性相关}
\end{gathered}`,
    explanation: "第二个函数只是把第一个函数整体放大 5 倍，信息完全重复，所以线性相关。",
    commonMistake: "看到 x² 本身不是常数函数，就误以为含 x² 的函数组都线性无关。",
    hints: [
      "直接观察 y₂ 是否等于某个常数乘以 y₁。",
      "写出非零常数线性组合 c₁y₁ + c₂y₂ = 0。",
      "取 c₁ = 5、c₂ = -1 即可验证恒等式。",
    ],
    steps: [
      "观察得 y₂ = 5y₁，对一切实数 x 均有 5x² - 1·(5x²) ≡ 0。",
      "存在不全为零的常数 c₁ = 5, c₂ = -1 使 c₁y₁ + c₂y₂ ≡ 0。",
      "故函数组 x² 与 5x² 在 (-∞, +∞) 内线性相关。",
    ],
  },
  {
    id: "jc935-7-6-1-3",
    source: "上册习题 7-6 第 1 题（3）",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "证明题",
    difficulty: "basic",
    title: "同指数函数的线性相关性",
    prompt: "判断函数组 y₁ = e^(3x) 与 y₂ = 4e^(3x) 在区间 (-∞, +∞) 内是否线性无关。",
    formula: math`y_1=e^{3x},\quad y_2=4e^{3x}`,
    solution: math`\begin{gathered}
\frac{y_2}{y_1}=4\;\text{(常数)} \\
\text{故 }e^{3x}\text{ 与 }4e^{3x}\text{ 线性相关}
\end{gathered}`,
    explanation: "两个函数指数部分完全相同，只差一个固定倍数 4，当然是线性相关的。",
    commonMistake: "把“指数函数恒正”错当成“两个指数函数必然线性无关”。",
    hints: [
      "因为 e^(3x) 恒不为零，可直接作比值 y₂ / y₁。",
      "比值为常数 4，说明满足 4y₁ - y₂ ≡ 0。",
      "朗斯基行列式 W = 0 也印证二者线性相关。",
    ],
    steps: [
      "对任意 x ∈ R，e^(3x) > 0，故 y₂ / y₁ = 4e^(3x) / e^(3x) = 4 为常数。",
      "等价地，4y₁ - y₂ ≡ 0，其中系数 4 与 -1 不全为零。",
      "因此函数组 e^(3x) 与 4e^(3x) 在 (-∞, +∞) 内线性相关。",
    ],
  },
  {
    id: "jc935-7-6-1-4",
    source: "上册习题 7-6 第 1 题（4）",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "证明题",
    difficulty: "basic",
    title: "异号指数函数组线性无关",
    prompt: "判断函数组 y₁ = e^(-2x) 与 y₂ = e^(2x) 在区间 (-∞, +∞) 内是否线性无关。",
    formula: math`y_1=e^{-2x},\quad y_2=e^{2x}`,
    solution: math`\begin{gathered}
\frac{y_2}{y_1}=e^{4x}\neq\text{常数} \\
\text{故 }e^{-2x}\text{ 与 }e^{2x}\text{ 线性无关}
\end{gathered}`,
    explanation: "一个随 x 增大指数衰减，一个指数增长，两者之比是 e^(4x)，绝不可能是常数。",
    commonMistake: "把 e^(-2x)·e^(2x) = 1 的乘积常数错当成比值常数，从而误判为线性相关。",
    hints: [
      "判别两个函数的线性相关性看的是比值 y₂ / y₁，不是乘积。",
      "计算 y₂ / y₁ = e^(2x) / e^(-2x) = e^(4x)。",
      "也可计算朗斯基行列式 W = 4 ≠ 0。",
    ],
    steps: [
      "由于 e^(-2x) 恒不为零，计算比值 y₂ / y₁ = e^(4x)。",
      "函数 e^(4x) 在 (-∞, +∞) 上不是常数（朗斯基行列式 W = 4 ≠ 0）。",
      "故函数组 e^(-2x) 与 e^(2x) 在 (-∞, +∞) 内线性无关。",
    ],
  },
  {
    id: "jc935-7-6-1-5",
    source: "上册习题 7-6 第 1 题（5）",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "证明题",
    difficulty: "basic",
    title: "同频正余弦函数的线性无关",
    prompt: "判断函数组 y₁ = cos 3x 与 y₂ = sin 3x 在区间 (-∞, +∞) 内是否线性无关。",
    formula: math`y_1=\cos 3x,\quad y_2=\sin 3x`,
    solution: math`\begin{gathered}
W=\begin{vmatrix}\cos 3x & \sin 3x \\ -3\sin 3x & 3\cos 3x\end{vmatrix}=3\neq 0 \\
\text{故 }\cos 3x\text{ 与 }\sin 3x\text{ 线性无关}
\end{gathered}`,
    explanation: "正弦和余弦相位相差四分之一个周期，比值 tan 3x 不断变化，彼此无法用常数倍替代。",
    commonMistake: "只看到 sin²(3x) + cos²(3x) = 1，误以为存在线性关系；那是平方关系而非线性关系。",
    hints: [
      "求比值 y₂ / y₁ = tan 3x，或直接计算朗斯基行列式 W。",
      "利用 sin²(3x) + cos²(3x) = 1 化简 W = 3。",
      "W 恒不为零，说明函数组线性无关。",
    ],
    steps: [
      "计算朗斯基行列式 W = cos 3x·(3cos 3x) - sin 3x·(-3sin 3x) = 3。",
      "或者在 cos 3x ≠ 0 处看到 y₂ / y₁ = tan 3x 不是常数。",
      "由此得出 cos 3x 与 sin 3x 在 (-∞, +∞) 内线性无关。",
    ],
  },
  {
    id: "jc935-7-6-1-6",
    source: "上册习题 7-6 第 1 题（6）",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "证明题",
    difficulty: "basic",
    title: "高斯型乘幂函数组判别",
    prompt: "判断函数组 y₁ = e^(-x²) 与 y₂ = x e^(-x²) 在区间 (-∞, +∞) 内是否线性无关。",
    formula: math`y_1=e^{-x^2},\quad y_2=xe^{-x^2}`,
    solution: math`\begin{gathered}
\frac{y_2}{y_1}=x\neq\text{常数} \\
\text{故 }e^{-x^2}\text{ 与 }xe^{-x^2}\text{ 线性无关}
\end{gathered}`,
    explanation: "两项虽共享同一个非零因子 e^(-x²)，但约去后比值仍是变量 x，不能合并成同一方向。",
    commonMistake: "把公因子 e^(-x²) 当作相关理由，忽略前面乘的是变量 x 而不是常数。",
    hints: [
      "因为 e^(-x²) 处处大于零，直接计算 y₂ / y₁。",
      "约去公因子 e^(-x²) 后得 y₂ / y₁ = x。",
      "比值不是常数，且 W = e^(-2x²) ≠ 0。",
    ],
    steps: [
      "对任意实数 x，e^(-x²) > 0，故比值 y₂ / y₁ = x。",
      "由于 x 在 (-∞, +∞) 上不是常数（且 W = e^(-2x²) > 0）。",
      "因此函数组 e^(-x²) 与 x e^(-x²) 线性无关。",
    ],
  },
  {
    id: "jc935-7-6-1-7",
    source: "上册习题 7-6 第 1 题（7）",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "证明题",
    difficulty: "basic",
    title: "倍角三角恒等式与线性相关",
    prompt: "判断函数组 y₁ = sin 4x 与 y₂ = sin 2x cos 2x 在区间 (-∞, +∞) 内是否线性无关。",
    formula: math`y_1=\sin 4x,\quad y_2=\sin 2x\cos 2x`,
    solution: math`\begin{gathered}
\sin 4x=2\sin 2x\cos 2x \\
y_1-2y_2\equiv 0,\;\text{故线性相关}
\end{gathered}`,
    explanation: "二倍角公式把 sin 4x 拆开正好是 2 sin 2x cos 2x，外观不同其实只是 2 倍关系。",
    commonMistake: "没想起二倍角公式，仅凭表达式形式不同就贸然断言线性无关。",
    hints: [
      "回忆正弦二倍角公式 sin(2θ) = 2 sin θ cos θ。",
      "令 θ = 2x，把 sin 4x 用 sin 2x 和 cos 2x 表示。",
      "得到 y₁ = 2y₂ 后即可直接判定线性相关。",
    ],
    steps: [
      "由二倍角公式知 sin 4x = 2 sin 2x cos 2x，即 y₁ = 2y₂。",
      "于是 y₁ - 2y₂ ≡ 0 在 (-∞, +∞) 上恒成立，系数 1 与 -2 不全为零。",
      "故该函数组在 (-∞, +∞) 内线性相关。",
    ],
  },
  {
    id: "jc935-7-6-1-8",
    source: "上册习题 7-6 第 1 题（8）",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "证明题",
    difficulty: "basic",
    title: "指数调制正余弦函数组判别",
    prompt: "判断函数组 y₁ = e^(2x) cos 3x 与 y₂ = e^(2x) sin 3x 在 (-∞, +∞) 内是否线性无关。",
    formula: math`\begin{gathered}
y_1=e^{2x}\cos 3x \\
y_2=e^{2x}\sin 3x
\end{gathered}`,
    solution: math`\begin{gathered}
W=3e^{4x}\neq 0 \\
\text{故该函数组线性无关}
\end{gathered}`,
    explanation: "两项乘了同一个恒正包络 e^(2x)，约去后仍是 cos 3x 与 sin 3x，依然线性无关。",
    commonMistake: "求导算朗斯基行列式时忘记用乘法求导法则，导致错算 W。",
    hints: [
      "在 cos 3x ≠ 0 处直接求比值 y₂ / y₁，公因子 e^(2x) 会消去。",
      "比值为 tan 3x，显然不是常数。",
      "若用朗斯基行列式，注意 (e^(2x) cos 3x)' = e^(2x)(2cos 3x - 3sin 3x)。",
    ],
    steps: [
      "在 cos 3x ≠ 0 的点处，y₂ / y₁ = (e^(2x) sin 3x) / (e^(2x) cos 3x) = tan 3x。",
      "也可计算朗斯基行列式得 W = 3e^(4x) > 0。",
      "因此该函数组在 (-∞, +∞) 内线性无关。",
    ],
  },
  {
    id: "jc935-7-6-1-9",
    source: "上册习题 7-6 第 1 题（9）",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "证明题",
    difficulty: "basic",
    title: "对数与幂乘积函数组判别",
    prompt: "判断函数组 y₁ = ln x 与 y₂ = x² ln x 在定义区间 (0, +∞) 内是否线性无关。",
    formula: math`y_1=\ln x,\quad y_2=x^2\ln x\;(x>0)`,
    solution: math`\begin{gathered}
\frac{y_2}{y_1}=x^2\;(x\neq 1)\neq\text{常数} \\
\text{故 }\ln x\text{ 与 }x^2\ln x\text{ 线性无关}
\end{gathered}`,
    explanation: "除去 x = 1 处的零点外，两函数之比等于 x²，随 x 变化，不可能互为常数倍。",
    commonMistake: "因为 x = 1 时两个函数同时为 0，就误以为它们线性相关。",
    hints: [
      "在 x > 0 且 x ≠ 1 时 ln x ≠ 0，可直接计算比值 y₂ / y₁。",
      "比值为 x²，不是常数。",
      "朗斯基行列式 W = 2x(ln x)² 在 (0, +∞) 上不恒为零。",
    ],
    steps: [
      "在区间 (0, +∞) 内取 x ≠ 1，则 ln x ≠ 0，且 y₂ / y₁ = x²。",
      "因 x² 不是常数（朗斯基行列式 W = 2x(ln x)² 不恒为零）。",
      "故 ln x 与 x² ln x 在 (0, +∞) 内线性无关。",
    ],
  },
  {
    id: "jc935-7-6-1-10",
    source: "上册习题 7-6 第 1 题（10）",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "证明题",
    difficulty: "basic",
    title: "含参异指数函数组线性无关",
    prompt: "设常数 a ≠ b，判断函数组 y₁ = e^(ax) 与 y₂ = e^(bx) 在 (-∞, +∞) 内是否线性无关。",
    formula: math`y_1=e^{ax},\quad y_2=e^{bx}\;(a\neq b)`,
    solution: math`\begin{gathered}
W=(b-a)e^{(a+b)x}\neq 0 \\
\text{故 }e^{ax}\text{ 与 }e^{bx}\text{ 线性无关}
\end{gathered}`,
    explanation: "只要指数系数 a 与 b 不相等，两函数增长率不同，比值 e^((b-a)x) 随 x 变化，必然线性无关。",
    commonMistake: "忽略题设条件 a ≠ b，没有说明 b - a ≠ 0 的关键作用。",
    hints: [
      "计算比值 y₂ / y₁ = e^((b-a)x)。",
      "利用条件 a ≠ b 说明 b - a ≠ 0，从而比值不是常数。",
      "用朗斯基行列式 W = (b - a)e^((a+b)x) 同样立得结论。",
    ],
    steps: [
      "因 e^(ax) > 0，计算比值 y₂ / y₁ = e^((b-a)x)。",
      "由题设 a ≠ b 得 b - a ≠ 0，故 e^((b-a)x) 不是常数（且 W = (b-a)e^((a+b)x) ≠ 0）。",
      "因此函数组 e^(ax) 与 e^(bx) 在 (-∞, +∞) 内线性无关。",
    ],
  },
  {
    id: "jc935-7-6-2",
    source: "上册习题 7-6 第 2 题",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "证明题",
    difficulty: "basic",
    title: "验证双曲函数解并写通解",
    prompt: "设常数 k > 0，验证 y₁ = cosh(kx) 与 y₂ = sinh(kx) 都是方程 y'' - k²y = 0 的解，并写出通解。",
    formula: math`y''-k^2y=0\;(k>0)`,
    solution: math`\begin{gathered}
y_i''=k^2y_i\;(i=1,2),\;W=k\neq 0 \\
y=C_1\cosh kx+C_2\sinh kx
\end{gathered}`,
    explanation: "双曲余弦与双曲正弦求导两次都会回到自身乘以 k²，且朗斯基行列式恒为 k ≠ 0，故线性组合就是通解。",
    commonMistake: "验证通解时只验证 y₁、y₂ 是方程的解，漏掉说明二者线性无关。",
    hints: [
      "分别求 y₁ = cosh(kx) 和 y₂ = sinh(kx) 的一阶、二阶导数。",
      "代入 y'' - k²y 验证左右两边均为 0。",
      "计算 y₂ / y₁ = tanh(kx) 或朗斯基行列式 W = k 说明线性无关，再写出通解。",
    ],
    steps: [
      "求导得 y₁' = k sinh(kx), y₁'' = k² cosh(kx) = k²y₁；同理 y₂'' = k²y₂，故均为方程的解。",
      "计算朗斯基行列式 W = k(cosh²(kx) - sinh²(kx)) = k > 0，故 y₁ 与 y₂ 线性无关。",
      "由二阶齐次线性方程通解结构得 y = C₁ cosh(kx) + C₂ sinh(kx)。",
    ],
  },
  {
    id: "jc935-7-6-3",
    source: "上册习题 7-6 第 3 题",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "证明题",
    difficulty: "applied",
    title: "变系数二阶方程解的验证",
    prompt: "验证 y₁ = e^(-x²) 与 y₂ = x e^(-x²) 都是方程 y'' + 4xy' + (4x² + 2)y = 0 的解，并写出通解。",
    formula: math`\begin{gathered}
y''+4xy'+(4x^2+2)y=0 \\
y_1=e^{-x^2},\quad y_2=xe^{-x^2}
\end{gathered}`,
    solution: math`\begin{gathered}
W(y_1,y_2)=e^{-2x^2}\neq 0 \\
y=(C_1+C_2x)e^{-x^2}
\end{gathered}`,
    explanation: "把两个候选解依次求二阶导并代回方程，系数恰好完全抵消为零；它们之比是变量 x，合成即得通解。",
    commonMistake: "对 x e^(-x²) 求二阶导时漏乘链式法则的 -2x，导致合并同类项不能消零。",
    hints: [
      "先算 y₁' = -2x e^(-x²) 与 y₁'' = (4x² - 2)e^(-x²)，代入方程化简。",
      "再算 y₂' = (1 - 2x²)e^(-x²) 与 y₂'' = (4x³ - 6x)e^(-x²)，代入方程化简。",
      "由 y₂ / y₁ = x ≠ 常数知线性无关，写出通解 y = (C₁ + C₂x)e^(-x²)。",
    ],
    steps: [
      "对 y₁ 求导并代入：[(4x² - 2) + 4x(-2x) + (4x² + 2)]e^(-x²) = 0。",
      "对 y₂ 求导并代入：[(4x³ - 6x) + 4x(1 - 2x²) + (4x² + 2)x]e^(-x²) = 0。",
      "因 y₂ / y₁ = x 不为常数，y₁ 与 y₂ 线性无关，故通解为 y = (C₁ + C₂x)e^(-x²)。",
    ],
  },
  {
    id: "jc935-7-6-4-1",
    source: "上册习题 7-6 第 4 题（1）",
    lessonId: "nonhomogeneous-second-order",
    errorTag: "nonhomogeneous_second_order",
    kind: "证明题",
    difficulty: "applied",
    title: "验证指数非齐次方程通解",
    prompt: "验证 y = C₁e^(-x) + C₂e^(2x) + (1/10)e^(4x) 是微分方程 y'' - y' - 2y = e^(4x) 的通解。",
    formula: math`\begin{gathered}
y''-y'-2y=e^{4x} \\
y=C_1e^{-x}+C_2e^{2x}+\frac{1}{10}e^{4x}
\end{gathered}`,
    solution: math`\begin{gathered}
y_1=e^{-x},\;y_2=e^{2x}\text{ 线性无关} \\
y^*=\frac{1}{10}e^{4x}\text{ 为特解，故为通解}
\end{gathered}`,
    explanation: "非齐次通解等于齐次通解加一个特解：分别确认两指数项是线性无关的齐次解，再确认尾巴项是特解。",
    commonMistake: "只把整个 y 代入原方程验算通过，却忘了说明两个齐次解线性无关。",
    hints: [
      "令 y₁ = e^(-x), y₂ = e^(2x), y* = (1/10)e^(4x)。",
      "验证 y₁、y₂ 满足齐次方程 y'' - y' - 2y = 0 且 y₂/y₁ = e^(3x) 不是常数。",
      "验证 (y*)'' - (y*)' - 2y* = (16 - 4 - 2)/10 · e^(4x) = e^(4x)。",
    ],
    steps: [
      "代入齐次方程：y₁'' - y₁' - 2y₁ = (1 + 1 - 2)e^(-x) = 0，y₂'' - y₂' - 2y₂ = (4 - 2 - 2)e^(2x) = 0。",
      "因 y₂ / y₁ = e^(3x) 非定值，y₁ 与 y₂ 线性无关，故 C₁y₁ + C₂y₂ 是齐次通解。",
      "又 (y*)'' - (y*)' - 2y* = (16 - 4 - 2)/10 · e^(4x) = e^(4x)，由叠加原理知 y 为通解。",
    ],
  },
  {
    id: "jc935-7-6-4-2",
    source: "上册习题 7-6 第 4 题（2）",
    lessonId: "nonhomogeneous-second-order",
    errorTag: "nonhomogeneous_second_order",
    kind: "证明题",
    difficulty: "applied",
    title: "验证振荡非齐次方程通解",
    prompt: "验证 y = C₁cos 2x + C₂sin 2x + (1/9)(3x cos x + 2sin x) 是方程 y'' + 4y = x cos x 的通解。",
    formula: math`\begin{gathered}
y''+4y=x\cos x \\
y=C_1\cos 2x+C_2\sin 2x \\
+\frac{1}{9}(3x\cos x+2\sin x)
\end{gathered}`,
    solution: math`\begin{gathered}y_1=\cos 2x,\\y_2=\sin 2x\text{ 为齐次基解}\\(y^*)''+4y^*=x\cos x,\text{ 故为通解}\end{gathered}`,
    explanation: "齐次部分是频率为 2 的简谐振动，特解部分把 x cos x 的二阶导与自身 4 倍组合，正好消掉多余的 sin x 项。",
    commonMistake: "对 x cos x 连续求两次导时漏掉中间交叉项 -2 sin x。",
    hints: [
      "记 y₁ = cos 2x, y₂ = sin 2x，验证 yᵢ'' + 4yᵢ = 0 且 W = 2 ≠ 0。",
      "记 y* = (1/9)(3x cos x + 2sin x)，先求 (y*)' = (1/9)(5cos x - 3x sin x)。",
      "再求 (y*)'' = (1/9)(-8sin x - 3x cos x)，与 4y* 相加得 x cos x。",
    ],
    steps: [
      "易验 y₁ = cos 2x 与 y₂ = sin 2x 满足 y'' + 4y = 0 且朗斯基行列式 W = 2 ≠ 0。",
      "对 y* = (1/9)(3x cos x + 2sin x) 求导得 (y*)' = (1/9)(5cos x - 3x sin x)，(y*)'' = (1/9)(-8sin x - 3x cos x)。",
      "代入得 (y*)'' + 4y* = (1/9)(9x cos x) = x cos x，故 y = C₁y₁ + C₂y₂ + y* 是原方程通解。",
    ],
  },
  {
    id: "jc935-7-6-4-3",
    source: "上册习题 7-6 第 4 题（3）",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "证明题",
    difficulty: "applied",
    title: "验证重根欧拉方程通解",
    prompt: "在区间 (0, +∞) 内，验证 y = C₁x³ + C₂x³ ln x 是微分方程 x²y'' - 5xy' + 9y = 0 的通解。",
    formula: math`\begin{gathered}
x^2y''-5xy'+9y=0\;(x>0) \\
y=C_1x^3+C_2x^3\ln x
\end{gathered}`,
    solution: math`\begin{gathered}
y_1=x^3,\;y_2=x^3\ln x\text{ 均为解} \\
W(y_1,y_2)=x^5\neq 0,\text{ 故为通解}
\end{gathered}`,
    explanation: "把 x³ 和 x³ ln x 分别代入方程都能精确消零，且它们的比值是 ln x 而非常数，构成完整解空间。",
    commonMistake: "对 x³ ln x 求二阶导时漏算乘积项，把 (3x² ln x + x²)' 错写成 6x ln x + 2x。",
    hints: [
      "记 y₁ = x³, y₂ = x³ ln x。",
      "算出 y₂' = 3x² ln x + x²，y₂'' = 6x ln x + 5x。",
      "代入方程验证均为 0，再由 y₂ / y₁ = ln x 说明线性无关。",
    ],
    steps: [
      "对 y₁ = x³：x²(6x) - 5x(3x²) + 9x³ = (6 - 15 + 9)x³ = 0。",
      "对 y₂ = x³ ln x：y₂' = 3x² ln x + x²，y₂'' = 6x ln x + 5x，代入得 x³[(6 - 15 + 9)ln x + (5 - 5)] = 0。",
      "又 y₂ / y₁ = ln x 不是常数（W = x⁵ > 0），故 C₁x³ + C₂x³ ln x 是通解。",
    ],
  },
  {
    id: "jc935-7-6-4-4",
    source: "上册习题 7-6 第 4 题（4）",
    lessonId: "nonhomogeneous-second-order",
    errorTag: "nonhomogeneous_second_order",
    kind: "证明题",
    difficulty: "applied",
    title: "验证非齐次欧拉方程通解",
    prompt: "在区间 (0, +∞) 内，验证 y = C₁x⁵ + C₂x - (1/4)x³ ln x 是方程 x²y'' - 5xy' + 5y = x³ ln x 的通解。",
    formula: math`\begin{gathered}
x^2y''-5xy'+5y=x^3\ln x \\
y=C_1x^5+C_2x-\frac{1}{4}x^3\ln x
\end{gathered}`,
    solution: math`\begin{gathered}
y_1=x^5,\;y_2=x\text{ 为齐次基解} \\
y^*=-\frac{1}{4}x^3\ln x\text{ 为特解}
\end{gathered}`,
    explanation: "幂函数 x⁵ 与 x 消掉齐次方程，而 -(1/4)x³ ln x 代入后常数项恰好抵消，正好留下右边 x³ ln x。",
    commonMistake: "对特解 -(1/4)x³ ln x 求导时弄错负号，导致结果相差一个负号。",
    hints: [
      "先验证 y₁ = x⁵ 与 y₂ = x 满足 x²y'' - 5xy' + 5y = 0 且 y₁/y₂ = x⁴ 非常数。",
      "对 y* = -(1/4)x³ ln x 求得 (y*)' = -(1/4)(3x² ln x + x²) 与 (y*)'' = -(1/4)(6x ln x + 5x)。",
      "代入左边合并 x³ ln x 与 x³ 两类系数，确认恰好等于 x³ ln x。",
    ],
    steps: [
      "对 y₁ = x⁵ 有 (20 - 25 + 5)x⁵ = 0；对 y₂ = x 有 (0 - 5 + 5)x = 0，且 W = -4x⁵ ≠ 0。",
      "对 y* = -(1/4)x³ ln x 代入左边得 -(1/4)x³[(6 - 15 + 5)ln x + (5 - 5)] = x³ ln x。",
      "由非齐次线性方程解的结构，y = C₁x⁵ + C₂x - (1/4)x³ ln x 是原方程通解。",
    ],
  },
  {
    id: "jc935-7-6-4-5",
    source: "上册习题 7-6 第 4 题（5）",
    lessonId: "nonhomogeneous-second-order",
    errorTag: "nonhomogeneous_second_order",
    kind: "证明题",
    difficulty: "applied",
    title: "验证含 1/x 因子非齐次通解",
    prompt: "在 x ≠ 0 处，验证 y = (C₁e^(2x) + C₂e^(-2x))/x + e^(2x)/4 是方程 xy'' + 2y' - 4xy = e^(2x) 的通解。",
    formula: math`\begin{gathered}
xy''+2y'-4xy=e^{2x}\;(x\neq 0) \\
y=\frac{C_1e^{2x}+C_2e^{-2x}}{x}+\frac{e^{2x}}{4}
\end{gathered}`,
    solution: math`\begin{gathered}
(xy)''-4(xy)=e^{2x} \\
y_1=\frac{e^{2x}}{x},\;y_2=\frac{e^{-2x}}{x}\text{ 线性无关}
\end{gathered}`,
    explanation: "注意到 xy'' + 2y' 恰好是 (xy)''，方程瞬间变身成常系数方程 (xy)'' - 4(xy) = e^(2x)，验算极其轻快。",
    commonMistake: "硬算 (e^(2x)/x)'' 容易在分母 x²、x³ 的符号上出错；活用 (xy)'' = xy'' + 2y' 更稳妥。",
    hints: [
      "利用恒等式 (xy)'' = xy'' + 2y'，把方程改写为 (xy)'' - 4(xy) = e^(2x)。",
      "分别令 z₁ = xy₁ = e^(2x)、z₂ = xy₂ = e^(-2x)，立得 zᵢ'' - 4zᵢ = 0 且 y₁/y₂ = e^(4x) 非常数。",
      "对 y* = e^(2x)/4，算得 z* = (1/4)x e^(2x)，验证 (z*)'' - 4z* = e^(2x)。",
    ],
    steps: [
      "注意到 (xy)'' = xy'' + 2y'，原方程等价于 (xy)'' - 4(xy) = e^(2x)。",
      "对 y₁ = e^(2x)/x 和 y₂ = e^(-2x)/x，xy₁ = e^(2x)、xy₂ = e^(-2x) 均满足 z'' - 4z = 0，且 y₁/y₂ = e^(4x) 非定值。",
      "对 y* = e^(2x)/4，xy* = (1/4)x e^(2x)，其二阶导为 (1 + x)e^(2x)，减 4xy* 恰得 e^(2x)，故为通解。",
    ],
  },
  {
    id: "jc935-7-6-4-6",
    source: "上册习题 7-6 第 4 题（6）",
    lessonId: "nonhomogeneous-second-order",
    errorTag: "nonhomogeneous_second_order",
    kind: "证明题",
    difficulty: "challenge",
    title: "验证四阶非齐次方程通解",
    prompt: "验证 y = C₁e^(2x) + C₂e^(-2x) + C₃cos 2x + C₄sin 2x - x³/16 是四阶方程 y^(4) - 16y = x³ 的通解。",
    formula: math`\begin{gathered}
y^{(4)}-16y=x^3 \\
y=C_1e^{2x}+C_2e^{-2x} \\
+C_3\cos 2x+C_4\sin 2x-\frac{x^3}{16}
\end{gathered}`,
    solution: math`\begin{gathered}
W(y_1,y_2,y_3,y_4)=-512\neq 0 \\
(y^*)^{(4)}-16y^*=x^3,\text{ 故为通解}
\end{gathered}`,
    explanation: "四个齐次解求四次导都等于自身乘 16，四阶朗斯基行列式恒为 -512 ≠ 0；三次多项式求四次导直接归零。",
    commonMistake: "忽略检验四个齐次解的线性无关性，仅凭两两线性无关就断定四个函数整体线性无关。",
    hints: [
      "记 y₁ = e^(2x), y₂ = e^(-2x), y₃ = cos 2x, y₄ = sin 2x，验证均有 yᵢ^(4) = 16yᵢ。",
      "在 x = 0 处计算四阶朗斯基行列式 W(0) = -512 ≠ 0，说明四函数线性无关。",
      "对 y* = -x³/16，因四阶导为 0，代入得 0 - 16(-x³/16) = x³。",
    ],
    steps: [
      "易验 y₁ = e^(2x), y₂ = e^(-2x), y₃ = cos 2x, y₄ = sin 2x 均满足 y^(4) - 16y = 0。",
      "在 x = 0 处计算朗斯基行列式得 W(0) = -512 ≠ 0，故这四个齐次解在 R 上线性无关。",
      "又 y* = -x³/16 满足 (y*)^(4) - 16y* = 0 - 16(-x³/16) = x³，故所给 y 为通解。",
    ],
  },
  {
    id: "jc935-7-6-5",
    source: "上册习题 7-6 第 5 题",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "推导题",
    difficulty: "challenge",
    title: "降阶法求变系数齐次通解",
    prompt: "已知 y₁(x) = e^(2x) 是齐次方程 (2x - 1)y'' - 4xy' + 4y = 0（x > 1/2）的一个解，用降阶法求通解。",
    formula: math`\begin{gathered}
(2x-1)y''-4xy'+4y=0 \\
y_1(x)=e^{2x}\;(x>1/2)
\end{gathered}`,
    solution: math`\begin{gathered}
y_2(x)=x \\
y=C_1x+C_2e^{2x}
\end{gathered}`,
    explanation: "设第二个解是已知解乘上未知函数 u(x)，代入后 u 本身全部消去，只剩 u' 的一阶可分离变量方程。",
    commonMistake: "代入 y = e^(2x)u 后若 u 项没有消干净，说明求导或合并系数一定算错了。",
    hints: [
      "设 y = e^(2x)u，算出 y' = e^(2x)(u' + 2u) 和 y'' = e^(2x)(u'' + 4u' + 4u)。",
      "代入原方程约去 e^(2x)，得 (2x - 1)u'' + (4x - 4)u' = 0。",
      "令 p = u' 分离变量求得 p = (2x - 1)e^(-2x)，再分部积分得 u = -x e^(-2x)。",
    ],
    steps: [
      "设 y = e^(2x)u，代入方程并约去 e^(2x) 得 (2x - 1)u'' + (4x - 4)u' = 0。",
      "令 p = u'，则 p'/p = -(4x - 4)/(2x - 1) = -2 + 2/(2x - 1)，积分取特解 p = (2x - 1)e^(-2x)。",
      "再积分得 u = ∫(2x - 1)e^(-2x)dx = -x e^(-2x)，故 y₂ = -x（取 x），通解为 y = C₁x + C₂e^(2x)。",
    ],
  },
  {
    id: "jc935-7-6-6",
    source: "上册习题 7-6 第 6 题",
    lessonId: "nonhomogeneous-second-order",
    errorTag: "nonhomogeneous_second_order",
    kind: "推导题",
    difficulty: "challenge",
    title: "降阶结合常数变易求通解",
    prompt: "已知 y₁ = x² 是齐次方程 x²y'' - 4xy' + 6y = 0（x > 0）的解，求非齐次方程 x²y'' - 4xy' + 6y = 2x⁴ 的通解。",
    formula: math`\begin{gathered}
x^2y''-4xy'+6y=2x^4 \\
y_1(x)=x^2\;(x>0)
\end{gathered}`,
    solution: math`\begin{gathered}
y_2=x^3,\quad W=x^4 \\
y=C_1x^2+C_2x^3+x^4
\end{gathered}`,
    explanation: "先用降阶法找出第二个齐次解 x³，再把方程化成首一标准形，套用常数变易公式积分即得特解 x⁴。",
    commonMistake: "套常数变易公式时忘记先除以首项系数 x²，把 f(x) 错当成 2x⁴ 而不是 2x²。",
    hints: [
      "对对齐次方程设 y₂ = x²u，代入得 x u'' = 0，取 u = x 得 y₂ = x³。",
      "将非齐次方程化为标准形 y'' - (4/x)y' + (6/x²)y = 2x²，记 f(x) = 2x²。",
      "算得 W = x⁴，代入 y* = -y₁∫(y₂f/W)dx + y₂∫(y₁f/W)dx。",
    ],
    steps: [
      "设 y₂ = x²u 代入齐次方程得 x⁴u'' = 0，取 u = x 得 y₂ = x³，朗斯基行列式 W = x⁴。",
      "化为标准形得 f(x) = 2x²，由常数变易法得 y* = -x²∫2x dx + x³∫2 dx = -x⁴ + 2x⁴ = x⁴。",
      "因此非齐次方程的通解为 y = C₁x² + C₂x³ + x⁴。",
    ],
  },
  {
    id: "jc935-7-6-7",
    source: "上册习题 7-6 第 7 题",
    lessonId: "nonhomogeneous-second-order",
    errorTag: "nonhomogeneous_second_order",
    kind: "推导题",
    difficulty: "applied",
    title: "常数变易法解正割非齐次方程",
    prompt: "已知齐次方程 y'' + 4y = 0 的通解为 Y = C₁cos 2x + C₂sin 2x，求非齐次方程 y'' + 4y = sec 2x 的通解。",
    formula: math`y''+4y=\sec 2x\;(\cos 2x\neq 0)`,
    solution: math`\begin{gathered}
y=C_1\cos 2x+C_2\sin 2x \\
+\frac{1}{4}\cos 2x\ln|\cos 2x|+\frac{1}{2}x\sin 2x
\end{gathered}`,
    explanation: "右边 sec 2x 不是待定系数法的适用类型，用常数变易法把 C₁、C₂ 换成函数，积分 tan 2x 与 1 即可搞定。",
    commonMistake: "忘记朗斯基行列式 W = 2，或积分 ∫ tan 2x dx 时漏掉系数 1/2 和负号。",
    hints: [
      "取 y₁ = cos 2x, y₂ = sin 2x，先算朗斯基行列式 W = 2。",
      "代入常数变易公式 y* = -y₁∫(y₂ sec 2x / 2)dx + y₂∫(y₁ sec 2x / 2)dx。",
      "分别计算 ∫(1/2)tan 2x dx = -(1/4)ln|cos 2x| 与 ∫(1/2)dx = x/2。",
    ],
    steps: [
      "取基解 y₁ = cos 2x, y₂ = sin 2x，算得朗斯基行列式 W = 2，自由项 f(x) = sec 2x。",
      "计算积分：∫(y₂f/W)dx = (1/2)∫tan 2x dx = -(1/4)ln|cos 2x|；∫(y₁f/W)dx = (1/2)∫dx = x/2。",
      "合成特解并加齐次通解得 y = C₁cos 2x + C₂sin 2x + (1/4)cos 2x ln|cos 2x| + (1/2)x sin 2x。",
    ],
  },
  {
    id: "jc935-7-6-8",
    source: "上册习题 7-6 第 8 题",
    lessonId: "nonhomogeneous-second-order",
    errorTag: "nonhomogeneous_second_order",
    kind: "推导题",
    difficulty: "challenge",
    title: "常数变易法解非齐次欧拉方程",
    prompt: "已知齐次方程 x²y'' - 3xy' + 4y = 0（x > 0）通解为 Y = C₁x² + C₂x² ln x，求 x²y'' - 3xy' + 4y = 2x² 的通解。",
    formula: math`x^2y''-3xy'+4y=2x^2\;(x>0)`,
    solution: math`\begin{gathered}
W=x^3,\quad y^*=x^2\ln^2 x \\
y=C_1x^2+C_2x^2\ln x+x^2\ln^2 x
\end{gathered}`,
    explanation: "先除以 x² 化出标准自由项 f = 2，再算朗斯基行列式 W = x³，常数变易后的两个积分都只是对 ln x 的简单凑微分。",
    commonMistake: "不化标准形直接把 2x² 代入常数变易公式，导致特解多出一个 x² 因子。",
    hints: [
      "先除以 x² 化为标准形 y'' - (3/x)y' + (4/x²)y = 2，得 f(x) = 2。",
      "计算基解 y₁ = x² 与 y₂ = x² ln x 的朗斯基行列式 W = x³。",
      "套常数变易公式，分别积分 ∫(2 ln x / x)dx = ln² x 和 ∫(2 / x)dx = 2 ln x。",
    ],
    steps: [
      "方程化为标准形后自由项 f(x) = 2；计算基解 y₁ = x², y₂ = x² ln x 的朗斯基行列式得 W = x³。",
      "求得 ∫(y₂f/W)dx = ∫(2 ln x / x)dx = ln² x，∫(y₁f/W)dx = ∫(2/x)dx = 2 ln x。",
      "得特解 y* = -x² ln² x + 2x² ln² x = x² ln² x，故通解为 y = C₁x² + C₂x² ln x + x² ln² x。",
    ],
  },

  // ==================== 习题 7-7 常系数齐次线性微分方程 (20 题) ====================
  {
    id: "jc935-7-7-1",
    source: "上册习题 7-7 第 1 题",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "推导题",
    difficulty: "basic",
    title: "由三阶通解反推微分方程",
    prompt: "已知某三阶常系数齐次线性微分方程的通解为 y = C₁e^(2x) + C₂cos 3x + C₃sin 3x，反求该微分方程。",
    formula: math`\begin{gathered}
y=C_1e^{2x}+C_2\cos 3x+C_3\sin 3x \\
\text{求对应的三阶常系数齐次方程}
\end{gathered}`,
    solution: math`\begin{gathered}(r-2)(r^2+9)\\=r^3-2r^2+9r-18=0\\y'''-2y''+9y'-18y=0\end{gathered}`,
    explanation: "通解里的每一块都对应特征方程的根：e^(2x) 对应实根 2，cos 3x 与 sin 3x 对应共轭虚根 ±3i，乘起来展开即可。",
    commonMistake: "把 cos 3x 与 sin 3x 对应的二次因子错写成 r² - 9 或 r² + 3。",
    hints: [
      "由 e^(2x) 读出单实根 r₁ = 2。",
      "由 cos 3x 与 sin 3x 读出共轭纯虚根 r₂,₃ = ±3i，对应因子 r² + 9。",
      "展开特征多项式 (r - 2)(r² + 9) = 0，把 r^k 对应回 k 阶导数 y^(k)。",
    ],
    steps: [
      "由通解结构读出特征根为 r₁ = 2，r₂,₃ = ±3i。",
      "构造特征方程 (r - 2)(r² + 9) = r³ - 2r² + 9r - 18 = 0。",
      "还原为三阶常系数齐次线性微分方程：y''' - 2y'' + 9y' - 18y = 0。",
    ],
  },
  {
    id: "jc935-7-7-2-1",
    source: "上册习题 7-7 第 2 题（1）",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "推导题",
    difficulty: "basic",
    title: "两异实根二阶齐次方程",
    prompt: "求常系数齐次线性微分方程 y'' - y' - 6y = 0 的通解。",
    formula: math`y''-y'-6y=0`,
    solution: math`\begin{gathered}
r_1=3,\quad r_2=-2 \\
y=C_1e^{3x}+C_2e^{-2x}
\end{gathered}`,
    explanation: "把导数阶数直接换成 r 的幂次，因式分解求出两个不同实根 3 和 -2，立刻拼出两个指数解。",
    commonMistake: "十字相乘因式分解时把符号弄反，误得出 r = -3 与 2。",
    hints: [
      "写出特征方程 r² - r - 6 = 0。",
      "因式分解为 (r - 3)(r + 2) = 0，解得 r₁ = 3, r₂ = -2。",
      "套用两不等实根通解公式 y = C₁e^(r₁x) + C₂e^(r₂x)。",
    ],
    steps: [
      "写出特征方程 r² - r - 6 = 0。",
      "因式分解得 (r - 3)(r + 2) = 0，特征根为 r₁ = 3, r₂ = -2。",
      "写出通解 y = C₁e^(3x) + C₂e^(-2x)。",
    ],
  },
  {
    id: "jc935-7-7-2-2",
    source: "上册习题 7-7 第 2 题（2）",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "推导题",
    difficulty: "basic",
    title: "含零特征根的二阶齐次方程",
    prompt: "求常系数齐次线性微分方程 y'' + 5y' = 0 的通解。",
    formula: math`y''+5y'=0`,
    solution: math`\begin{gathered}
r_1=0,\quad r_2=-5 \\
y=C_1+C_2e^{-5x}
\end{gathered}`,
    explanation: "方程缺少 y 项意味着特征方程提得出公因子 r，零根对应 e^(0x) = 1，所以通解里带一个常数项 C₁。",
    commonMistake: "把特征方程错写成 r² + 5 = 0，漏掉了一阶导数对应的 r。",
    hints: [
      "写出特征方程 r² + 5r = 0（注意不是 r² + 5 = 0）。",
      "提取公因子得 r(r + 5) = 0，解得 r₁ = 0, r₂ = -5。",
      "因为 e^(0x) = 1，故通解为 y = C₁ + C₂e^(-5x)。",
    ],
    steps: [
      "写出特征方程 r² + 5r = 0。",
      "解得特征根 r₁ = 0，r₂ = -5。",
      "代入通解公式得 y = C₁ + C₂e^(-5x)。",
    ],
  },
  {
    id: "jc935-7-7-2-3",
    source: "上册习题 7-7 第 2 题（3）",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "推导题",
    difficulty: "basic",
    title: "纯虚特征根的简谐方程",
    prompt: "求常系数齐次线性微分方程 y'' + 9y = 0 的通解。",
    formula: math`y''+9y=0`,
    solution: math`\begin{gathered}
r_{1,2}=\pm 3i \\
y=C_1\cos 3x+C_2\sin 3x
\end{gathered}`,
    explanation: "特征根是纯虚数 ±3i，实部为 0 说明没有指数衰减或增长，解就是角频率为 3 的纯粹正余弦振荡。",
    commonMistake: "忘了对 9 开平方，把通解里的角频率错写成 9x。",
    hints: [
      "写出特征方程 r² + 9 = 0。",
      "解得一对纯虚根 r₁,₂ = ±3i（α = 0, β = 3）。",
      "套用复根通解公式得 y = C₁cos 3x + C₂sin 3x。",
    ],
    steps: [
      "写出特征方程 r² + 9 = 0。",
      "解得特征根 r₁,₂ = ±3i。",
      "写出实数形式通解 y = C₁cos 3x + C₂sin 3x。",
    ],
  },
  {
    id: "jc935-7-7-2-4",
    source: "上册习题 7-7 第 2 题（4）",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "推导题",
    difficulty: "basic",
    title: "负实部共轭复根齐次方程",
    prompt: "求常系数齐次线性微分方程 y'' + 4y' + 13y = 0 的通解。",
    formula: math`y''+4y'+13y=0`,
    solution: math`\begin{gathered}
r_{1,2}=-2\pm 3i \\
y=e^{-2x}(C_1\cos 3x+C_2\sin 3x)
\end{gathered}`,
    explanation: "配方 (r + 2)² + 9 = 0 得到根 -2 ± 3i：实部 -2 控制指数衰减包络，虚部 3 控制正余弦振荡频率。",
    commonMistake: "把实部符号写反成 e^(2x)，或把虚部误写成 9。",
    hints: [
      "写出特征方程 r² + 4r + 13 = 0。",
      "配方为 (r + 2)² + 9 = 0，得 r₁,₂ = -2 ± 3i。",
      "套用公式 y = e^(αx)(C₁cos βx + C₂sin βx)，代入 α = -2, β = 3。",
    ],
    steps: [
      "写出特征方程 r² + 4r + 13 = 0，即 (r + 2)² = -9。",
      "求得共轭复根 r₁,₂ = -2 ± 3i。",
      "写出通解 y = e^(-2x)(C₁cos 3x + C₂sin 3x)。",
    ],
  },
  {
    id: "jc935-7-7-2-5",
    source: "上册习题 7-7 第 2 题（5）",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "推导题",
    difficulty: "basic",
    title: "二重实根的含时间齐次方程",
    prompt: "求微分方程 9 d²x/dt² - 12 dx/dt + 4x = 0 的通解。",
    formula: math`9\frac{d^2x}{dt^2}-12\frac{dx}{dt}+4x=0`,
    solution: math`\begin{gathered}
(3r-2)^2=0,\quad r_{1,2}=\frac{2}{3} \\
x=(C_1+C_2t)e^{\frac{2}{3}t}
\end{gathered}`,
    explanation: "特征方程是完全平方式，出现二重实根 2/3；为了凑足两个线性无关解，第二项必须多乘一个自变量 t。",
    commonMistake: "习惯性把自变量写成 x、因变量写成 y，或重根时漏乘 t。",
    hints: [
      "注意本题因变量是 x、自变量是 t，特征方程为 9r² - 12r + 4 = 0。",
      "化为完全平方 (3r - 2)² = 0，得二重实根 r₁ = r₂ = 2/3。",
      "套用二重实根通解公式 x = (C₁ + C₂t)e^((2/3)t)。",
    ],
    steps: [
      "写出特征方程 9r² - 12r + 4 = 0。",
      "配方得 (3r - 2)² = 0，解得二重实根 r₁ = r₂ = 2/3。",
      "写出通解 x = (C₁ + C₂t)e^((2/3)t)。",
    ],
  },
  {
    id: "jc935-7-7-2-6",
    source: "上册习题 7-7 第 2 题（6）",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "推导题",
    difficulty: "basic",
    title: "正实部共轭复根齐次方程",
    prompt: "求常系数齐次线性微分方程 y'' - 6y' + 10y = 0 的通解。",
    formula: math`y''-6y'+10y=0`,
    solution: math`\begin{gathered}
r_{1,2}=3\pm i \\
y=e^{3x}(C_1\cos x+C_2\sin x)
\end{gathered}`,
    explanation: "配方 (r - 3)² + 1 = 0 给出根 3 ± i，实部为正 3 表示振幅随 x 指数放大，虚部 1 表示单位角频率振荡。",
    commonMistake: "求根公式里漏除以 2，把实部错算成 6。",
    hints: [
      "写出特征方程 r² - 6r + 10 = 0。",
      "配方得 (r - 3)² + 1 = 0，求得 r₁,₂ = 3 ± i。",
      "代入 α = 3, β = 1 写出通解。",
    ],
    steps: [
      "写出特征方程 r² - 6r + 10 = 0。",
      "配方为 (r - 3)² = -1，解得 r₁,₂ = 3 ± i。",
      "写出通解 y = e^(3x)(C₁cos x + C₂sin x)。",
    ],
  },
  {
    id: "jc935-7-7-2-7",
    source: "上册习题 7-7 第 2 题（7）",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "推导题",
    difficulty: "applied",
    title: "四阶差平方型齐次方程",
    prompt: "求四阶常系数齐次线性微分方程 y^(4) - 16y = 0 的通解。",
    formula: math`y^{(4)}-16y=0`,
    solution: math`\begin{gathered}
r_{1,2}=\pm 2,\quad r_{3,4}=\pm 2i \\
y=C_1e^{2x}+C_2e^{-2x} \\
+C_3\cos 2x+C_4\sin 2x
\end{gathered}`,
    explanation: "利用平方差把 r⁴ - 16 拆成 (r² - 4)(r² + 4)，一组出实根 ±2，一组出纯虚根 ±2i，合起来正好四个独立常数。",
    commonMistake: "只写出实根 r = ±2，漏掉了复平面上的两个纯虚根 ±2i。",
    hints: [
      "写出四次特征方程 r⁴ - 16 = 0。",
      "用平方差分解为 (r² - 4)(r² + 4) = 0。",
      "解出四个单根 ±2 与 ±2i，分别写出对应的指数项和三角项。",
    ],
    steps: [
      "特征方程 r⁴ - 16 = 0 分解为 (r² - 4)(r² + 4) = 0。",
      "解得四个互异特征根 r₁,₂ = ±2，r₃,₄ = ±2i。",
      "写出通解 y = C₁e^(2x) + C₂e^(-2x) + C₃cos 2x + C₄sin 2x。",
    ],
  },
  {
    id: "jc935-7-7-2-8",
    source: "上册习题 7-7 第 2 题（8）",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "推导题",
    difficulty: "applied",
    title: "二重共轭纯虚根四阶方程",
    prompt: "求四阶常系数齐次线性微分方程 y^(4) + 8y'' + 16y = 0 的通解。",
    formula: math`y^{(4)}+8y''+16y=0`,
    solution: math`\begin{gathered}
(r^2+4)^2=0,\;r=\pm 2i\text{ (二重)} \\
y=(C_1+C_2x)\cos 2x \\
+(C_3+C_4x)\sin 2x
\end{gathered}`,
    explanation: "特征方程是 (r² + 4)² = 0，纯虚根 ±2i 各重复两次，因此 cos 2x 和 sin 2x 前面都配一次多项式系数。",
    commonMistake: "漏掉重虚根对应的 x cos 2x 和 x sin 2x 两项，只写出两个任意常数。",
    hints: [
      "把特征方程 r⁴ + 8r² + 16 = 0 写成完全平方 (r² + 4)² = 0。",
      "得到二重共轭纯虚根 r = ±2i。",
      "k = 2 重共轭复根对应 (C₁ + C₂x)cos 2x + (C₃ + C₄x)sin 2x。",
    ],
    steps: [
      "写出特征方程 r⁴ + 8r² + 16 = 0，即 (r² + 4)² = 0。",
      "解得二重共轭纯虚根 r₁,₂ = 2i，r₃,₄ = -2i。",
      "写出通解 y = (C₁ + C₂x)cos 2x + (C₃ + C₄x)sin 2x。",
    ],
  },
  {
    id: "jc935-7-7-2-9",
    source: "上册习题 7-7 第 2 题（9）",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "推导题",
    difficulty: "applied",
    title: "双重零根与重实根四阶方程",
    prompt: "求四阶常系数齐次线性微分方程 y^(4) + 4y''' + 4y'' = 0 的通解。",
    formula: math`y^{(4)}+4y'''+4y''=0`,
    solution: math`\begin{gathered}
r^2(r+2)^2=0 \\
y=C_1+C_2x+(C_3+C_4x)e^{-2x}
\end{gathered}`,
    explanation: "提出 r² 后正好是 r²(r + 2)² = 0：二重零根给一次多项式 C₁ + C₂x，二重根 -2 给 (C₃ + C₄x)e^(-2x)。",
    commonMistake: "看到 y'' 是最低阶导数时漏提 r²，把二重零根误当成单零根。",
    hints: [
      "写出特征方程 r⁴ + 4r³ + 4r² = 0。",
      "先提公因子 r²，再配方得 r²(r + 2)² = 0。",
      "分别写出二重根 0 和二重根 -2 对应的通解部分并相加。",
    ],
    steps: [
      "特征方程 r⁴ + 4r³ + 4r² = 0 因式分解为 r²(r + 2)² = 0。",
      "解得二重实根 r₁,₂ = 0 与二重实根 r₃,₄ = -2。",
      "写出通解 y = C₁ + C₂x + (C₃ + C₄x)e^(-2x)。",
    ],
  },
  {
    id: "jc935-7-7-2-10",
    source: "上册习题 7-7 第 2 题（10）",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "推导题",
    difficulty: "applied",
    title: "双二次特征方程四阶齐次解",
    prompt: "求四阶常系数齐次线性微分方程 y^(4) + 3y'' - 4y = 0 的通解。",
    formula: math`y^{(4)}+3y''-4y=0`,
    solution: math`\begin{gathered}
(r^2-1)(r^2+4)=0 \\
y=C_1e^x+C_2e^{-x} \\
+C_3\cos 2x+C_4\sin 2x
\end{gathered}`,
    explanation: "把 r² 看作整体做十字相乘，拆成 (r² - 1)(r² + 4) = 0，立刻读出实根 ±1 与纯虚根 ±2i。",
    commonMistake: "把 r² + 4 = 0 的虚根错写成 ±4i，忘记开平方。",
    hints: [
      "写出特征方程 r⁴ + 3r² - 4 = 0，视作关于 r² 的二次方程。",
      "因式分解为 (r² - 1)(r² + 4) = 0。",
      "解得 r₁,₂ = ±1 与 r₃,₄ = ±2i，拼出四项通解。",
    ],
    steps: [
      "特征方程 r⁴ + 3r² - 4 = 0 因式分解得 (r² - 1)(r² + 4) = 0。",
      "解得特征根 r₁,₂ = ±1，r₃,₄ = ±2i。",
      "写出通解 y = C₁e^x + C₂e^(-x) + C₃cos 2x + C₄sin 2x。",
    ],
  },
  {
    id: "jc935-7-7-3-1",
    source: "上册习题 7-7 第 3 题（1）",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "推导题",
    difficulty: "applied",
    title: "两正实根初值问题特解",
    prompt: "求微分方程 y'' - 5y' + 6y = 0 满足初值条件 y(0) = 5, y'(0) = 13 的特解。",
    formula: math`\begin{gathered}
y''-5y'+6y=0 \\
y(0)=5,\quad y'(0)=13
\end{gathered}`,
    solution: math`\begin{gathered}
C_1=2,\quad C_2=3 \\
y=2e^{2x}+3e^{3x}
\end{gathered}`,
    explanation: "先求通解 C₁e^(2x) + C₂e^(3x)，再把 x = 0 分别代入 y 和 y' 得到二元一次方程组，解出 C₁、C₂。",
    commonMistake: "把 y'(0) = 13 代入时忘记先对通解求导，误写成 C₁ + C₂ = 13。",
    hints: [
      "解特征方程 r² - 5r + 6 = 0 得 r₁ = 2, r₂ = 3。",
      "写出通解 y = C₁e^(2x) + C₂e^(3x) 及其导数 y' = 2C₁e^(2x) + 3C₂e^(3x)。",
      "代入 x = 0 解方程组 C₁ + C₂ = 5, 2C₁ + 3C₂ = 13。",
    ],
    steps: [
      "特征方程 (r - 2)(r - 3) = 0 得通解 y = C₁e^(2x) + C₂e^(3x)，导数 y' = 2C₁e^(2x) + 3C₂e^(3x)。",
      "代入初值条件得 C₁ + C₂ = 5 且 2C₁ + 3C₂ = 13，解得 C₁ = 2, C₂ = 3。",
      "故所求特解为 y = 2e^(2x) + 3e^(3x)。",
    ],
  },
  {
    id: "jc935-7-7-3-2",
    source: "上册习题 7-7 第 3 题（2）",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "推导题",
    difficulty: "applied",
    title: "二重负实根初值问题特解",
    prompt: "求微分方程 9y'' + 6y' + y = 0 满足初值条件 y(0) = 3, y'(0) = 1 的特解。",
    formula: math`\begin{gathered}
9y''+6y'+y=0 \\
y(0)=3,\quad y'(0)=1
\end{gathered}`,
    solution: math`\begin{gathered}
r_{1,2}=-\frac{1}{3},\;C_1=3,\;C_2=2 \\
y=(3+2x)e^{-\frac{x}{3}}
\end{gathered}`,
    explanation: "二重根 -1/3 给出通解 (C₁ + C₂x)e^(-x/3)；求导时用乘法法则，在 x = 0 处直接定出 C₁ = 3 与 C₂ = 2。",
    commonMistake: "对 (C₁ + C₂x)e^(-x/3) 求导时漏掉第一项的导数 C₂，错算成 y'(0) = -C₁/3。",
    hints: [
      "特征方程 (3r + 1)² = 0 给出二重根 r₁,₂ = -1/3。",
      "写出通解 y = (C₁ + C₂x)e^(-x/3) 并求导得 y' = [C₂ - (1/3)(C₁ + C₂x)]e^(-x/3)。",
      "由 y(0) = C₁ = 3 与 y'(0) = C₂ - C₁/3 = 1 解出 C₂ = 2。",
    ],
    steps: [
      "由 (3r + 1)² = 0 得二重根 r = -1/3，通解为 y = (C₁ + C₂x)e^(-x/3)。",
      "求导得 y' = (C₂ - C₁/3 - C₂x/3)e^(-x/3)，代入初值条件得 C₁ = 3，C₂ - 1 = 1。",
      "解得 C₁ = 3, C₂ = 2，故特解为 y = (3 + 2x)e^(-x/3)。",
    ],
  },
  {
    id: "jc935-7-7-3-3",
    source: "上册习题 7-7 第 3 题（3）",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "推导题",
    difficulty: "applied",
    title: "异号实根初值问题特解",
    prompt: "求微分方程 y'' - 2y' - 3y = 0 满足初值条件 y(0) = 0, y'(0) = 4 的特解。",
    formula: math`\begin{gathered}
y''-2y'-3y=0 \\
y(0)=0,\quad y'(0)=4
\end{gathered}`,
    solution: math`\begin{gathered}
r_1=-1,\quad r_2=3 \\
y=e^{3x}-e^{-x}
\end{gathered}`,
    explanation: "通解由衰减项 e^(-x) 和增长项 e^(3x) 组成，初值 y(0) = 0 让两系数互为相反数，初速度 4 决定它们恰好是 1 和 -1。",
    commonMistake: "解方程组时弄反 C₁ 与 C₂ 的正负号，写出 e^(-x) - e^(3x)（其 y'(0) = -4）。",
    hints: [
      "解特征方程 r² - 2r - 3 = (r + 1)(r - 3) = 0。",
      "写出通解 y = C₁e^(-x) + C₂e^(3x) 与 y' = -C₁e^(-x) + 3C₂e^(3x)。",
      "代入初值条件 C₁ + C₂ = 0, -C₁ + 3C₂ = 4 求解。",
    ],
    steps: [
      "由 (r + 1)(r - 3) = 0 得 r₁ = -1, r₂ = 3，通解 y = C₁e^(-x) + C₂e^(3x)。",
      "代入 y(0) = 0 与 y'(0) = 4 得 C₁ + C₂ = 0 且 -C₁ + 3C₂ = 4。",
      "解得 C₁ = -1, C₂ = 1，故特解为 y = e^(3x) - e^(-x)。",
    ],
  },
  {
    id: "jc935-7-7-3-4",
    source: "上册习题 7-7 第 3 题（4）",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "推导题",
    difficulty: "applied",
    title: "阻尼振荡初值问题特解",
    prompt: "求微分方程 y'' + 2y' + 17y = 0 满足初值条件 y(0) = 0, y'(0) = 8 的特解。",
    formula: math`\begin{gathered}
y''+2y'+17y=0 \\
y(0)=0,\quad y'(0)=8
\end{gathered}`,
    solution: math`\begin{gathered}
r_{1,2}=-1\pm 4i \\
y=2e^{-x}\sin 4x
\end{gathered}`,
    explanation: "方程描述欠阻尼衰减振动；由于初始位移为 0，余弦系数直接清零，只剩正弦项，再由初速度 8 定出振幅 2。",
    commonMistake: "对 e^(-x) sin 4x 求导时漏乘角频率 4，导致把振幅错算成 8。",
    hints: [
      "配方特征方程 (r + 1)² + 16 = 0，得 r₁,₂ = -1 ± 4i。",
      "写出通解 y = e^(-x)(C₁cos 4x + C₂sin 4x)，由 y(0) = 0 立即得 C₁ = 0。",
      "对 y = C₂e^(-x)sin 4x 求导并代入 y'(0) = 4C₂ = 8。",
    ],
    steps: [
      "由 (r + 1)² + 16 = 0 得 r₁,₂ = -1 ± 4i，通解为 y = e^(-x)(C₁cos 4x + C₂sin 4x)。",
      "由 y(0) = C₁ = 0 化简为 y = C₂e^(-x)sin 4x，求导得 y'(0) = 4C₂ = 8。",
      "解得 C₂ = 2，故特解为 y = 2e^(-x)sin 4x。",
    ],
  },
  {
    id: "jc935-7-7-3-5",
    source: "上册习题 7-7 第 3 题（5）",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "推导题",
    difficulty: "applied",
    title: "无阻尼简谐初值问题特解",
    prompt: "求微分方程 y'' + 16y = 0 满足初值条件 y(0) = 3, y'(0) = 8 的特解。",
    formula: math`\begin{gathered}
y''+16y=0 \\
y(0)=3,\quad y'(0)=8
\end{gathered}`,
    solution: math`\begin{gathered}
r_{1,2}=\pm 4i,\;C_1=3,\;C_2=2 \\
y=3\cos 4x+2\sin 4x
\end{gathered}`,
    explanation: "纯简谐振动通解为 C₁cos 4x + C₂sin 4x，初始位移直接就是 C₁，初始速度除以角频率 4 就是 C₂。",
    commonMistake: "忘记 sin 4x 求导会掉出因子 4，把 C₂ 误写成 8。",
    hints: [
      "解特征方程 r² + 16 = 0 得 r₁,₂ = ±4i。",
      "写出通解 y = C₁cos 4x + C₂sin 4x 与 y' = -4C₁sin 4x + 4C₂cos 4x。",
      "代入 x = 0 得 C₁ = 3 与 4C₂ = 8。",
    ],
    steps: [
      "特征方程 r² + 16 = 0 得 r₁,₂ = ±4i，通解为 y = C₁cos 4x + C₂sin 4x。",
      "求导得 y' = -4C₁sin 4x + 4C₂cos 4x，代入初值得 C₁ = 3, 4C₂ = 8。",
      "解得 C₂ = 2，故特解为 y = 3cos 4x + 2sin 4x。",
    ],
  },
  {
    id: "jc935-7-7-3-6",
    source: "上册习题 7-7 第 3 题（6）",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "推导题",
    difficulty: "applied",
    title: "增幅振荡初值问题特解",
    prompt: "求微分方程 y'' - 2y' + 5y = 0 满足初值条件 y(0) = 0, y'(0) = 6 的特解。",
    formula: math`\begin{gathered}
y''-2y'+5y=0 \\
y(0)=0,\quad y'(0)=6
\end{gathered}`,
    solution: math`\begin{gathered}
r_{1,2}=1\pm 2i \\
y=3e^x\sin 2x
\end{gathered}`,
    explanation: "特征根 1 ± 2i 给出指数放大振荡，初始值为 0 消去余弦分量，初导数 6 除以角频率 2 确定系数为 3。",
    commonMistake: "配方 (r - 1)² + 4 = 0 时把实部符号弄反成 -1。",
    hints: [
      "配方特征方程 (r - 1)² + 4 = 0，得 r₁,₂ = 1 ± 2i。",
      "由 y(0) = C₁ = 0 得 y = C₂e^x sin 2x。",
      "代入 y'(0) = 2C₂ = 6 解得 C₂ = 3。",
    ],
    steps: [
      "由 (r - 1)² + 4 = 0 得 r₁,₂ = 1 ± 2i，通解为 y = e^x(C₁cos 2x + C₂sin 2x)。",
      "代入 y(0) = 0 得 C₁ = 0；对 y = C₂e^x sin 2x 求导得 y'(0) = 2C₂ = 6。",
      "解得 C₂ = 3，故特解为 y = 3e^x sin 2x。",
    ],
  },
  {
    id: "jc935-7-7-4",
    source: "上册习题 7-7 第 4 题",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "推导题",
    difficulty: "challenge",
    title: "线性斥力与阻尼下的质点运动",
    prompt: "单位质量质点沿数轴运动，t = 0 时在原点且速度为 v₀ > 0，受与位移同向的斥力 αx（α > 0）和阻力 2βx'（β > 0），求位移 x(t)。",
    formula: math`\begin{gathered}
x''+2\beta x'-\alpha x=0 \\
x(0)=0,\quad x'(0)=v_0
\end{gathered}`,
    solution: math`\begin{gathered}
\gamma=\sqrt{\beta^2+\alpha} \\
x(t)=\frac{v_0}{\gamma}e^{-\beta t}\sinh(\gamma t)
\end{gathered}`,
    explanation: "斥力与位移同向导致特征方程常数项为负，判别式恒正，必得一正一负两个实根，结合初值可写成简洁的双曲正弦形式。",
    commonMistake: "把与初速度同向的斥力误写成恢复力 -αx，导致方程变成阻尼振动。",
    hints: [
      "由牛顿第二定律列方程 x'' = αx - 2βx'，移项得 x'' + 2βx' - αx = 0。",
      "解特征方程 r² + 2βr - α = 0 得 r₁,₂ = -β ± γ，其中 γ = √(β² + α)。",
      "由 x(0) = 0 得 C₁ = -C₂，再由 x'(0) = (r₁ - r₂)C₁ = 2γC₁ = v₀ 求解。",
    ],
    steps: [
      "列运动方程 x'' + 2βx' - αx = 0，初值 x(0) = 0, x'(0) = v₀。",
      "特征根为 r₁ = -β + γ, r₂ = -β - γ（γ = √(β² + α)），通解 x = C₁e^(r₁t) + C₂e^(r₂t)。",
      "代入初值得 C₁ = -C₂ = v₀/(2γ)，化简得 x(t) = (v₀/γ)e^(-βt)sinh(γt)。",
    ],
  },
  {
    id: "jc935-7-7-5",
    source: "上册习题 7-7 第 5 题",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "推导题",
    difficulty: "challenge",
    title: "过阻尼 RLC 串联电路放电过程",
    prompt: "电容 C = 1×10⁻⁶ F 先由 E = 15 V 电源充满，t = 0 时切入含 L = 0.25 H、R = 1250 Ω 的无源串联回路，求电压 u_C(t) 与电流 i(t)。",
    formula: math`\begin{gathered}
u_C''+5000u_C'+4\times 10^6 u_C=0 \\
u_C(0)=15,\quad u_C'(0)=0
\end{gathered}`,
    solution: math`\begin{gathered}
u_C(t)=20e^{-1000t}-5e^{-4000t}\;\text{(V)} \\
i(t)=0.02\left(e^{-4000t}-e^{-1000t}\right)\;\text{(A)}
\end{gathered}`,
    explanation: "大电阻使电路处于过阻尼状态，特征根是两个负实数 -1000 与 -4000，电压单调衰减回零，不发生来回振荡。",
    commonMistake: "忽略电感电流不能突变（即 i(0) = C u_C'(0) = 0），漏写第二个初值条件 u_C'(0) = 0。",
    hints: [
      "由回路电压定律 L di/dt + R i + u_C = 0 与 i = C du_C/dt，导出 u_C'' + (R/L)u_C' + u_C/(LC) = 0。",
      "代入数值算得 R/L = 5000，1/(LC) = 4×10⁶，特征根为 r₁ = -1000, r₂ = -4000。",
      "由 u_C(0) = 15, u_C'(0) = 0 定出 C₁ = 20, C₂ = -5，再算 i(t) = C u_C'(t)。",
    ],
    steps: [
      "列方程 u_C'' + (R/L)u_C' + (1/LC)u_C = 0，代入参数得 u_C'' + 5000u_C' + 4×10⁶u_C = 0。",
      "因式分解 (r + 1000)(r + 4000) = 0 得 u_C = C₁e^(-1000t) + C₂e^(-4000t)，由初值解得 C₁ = 20, C₂ = -5。",
      "求导乘以 C = 10⁻⁶ 得电流 i(t) = 0.02(e^(-4000t) - e^(-1000t)) A。",
    ],
  },
  {
    id: "jc935-7-7-6",
    source: "上册习题 7-7 第 6 题",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "推导题",
    difficulty: "applied",
    title: "圆柱浮标简谐振动求质量",
    prompt: "圆柱形浮标底面半径 R = 0.2 m，竖直浮于密度 ρ = 1000 kg/m³ 的水中。轻压释放后测得上下振动周期 T = 1.5 s，求浮标质量 m。",
    formula: math`\begin{gathered}
mx''=-\rho g\pi R^2 x \\
R=0.2\;\text{m},\quad T=1.5\;\text{s}
\end{gathered}`,
    solution: math`\begin{gathered}
\omega=\frac{2\pi}{T}=\frac{4\pi}{3} \\
m=\frac{45g}{2\pi}\approx 70.2\;\text{kg}
\end{gathered}`,
    explanation: "浮标多浸入一点就多受一份与深度成正比的浮力，和弹簧振子完全同构；周期直接锁死了角频率 ω，从而反推出质量 m。",
    commonMistake: "把题中给的半径 R 误当成直径再去除以 2，或漏掉浮力公式里的截面积 πR²。",
    hints: [
      "设向下偏离平衡位置的位移为 x(t)，恢复力大小等于排开额外水柱的重力 ρgπR²x。",
      "列简谐振动方程 x'' + ω²x = 0，其中 ω² = ρgπR² / m。",
      "由 T = 2π / ω = 1.5 得 ω = 4π/3，代入反解 m（取 g ≈ 9.8 m/s²）。",
    ],
    steps: [
      "由牛顿第二定律和阿基米德原理得 mx'' = -ρgπR²x，即 x'' + ω²x = 0，其中 ω² = ρgπR²/m。",
      "由周期 T = 2π/ω = 3/2 得 ω = 4π/3，从而 ω² = 16π²/9。",
      "反解质量 m = 1000gπ(0.2)² / (16π²/9) = 45g/(2π) ≈ 70.2 kg。",
    ],
  },
] satisfies Omit<WrittenProblem, "errorLabel">[];

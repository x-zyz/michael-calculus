import type { WrittenProblem } from "./learning";

const math = String.raw;

export const bankOdeEulerSystems = [
  // ==================== 习题 7-9 欧拉方程 (8 题) ====================
  {
    id: "jc935-7-9-1",
    source: "上册习题 7-9 第 1 题",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "推导题",
    difficulty: "basic",
    title: "二阶齐次欧拉方程通解",
    prompt: "求欧拉方程 x²y'' + xy' - 9y = 0 在 x > 0 上的通解。",
    formula: math`x^2 y'' + x y' - 9y = 0 \quad (x>0)`,
    solution: math`\begin{gathered}[D(D-1)+D-9]y=0\\\Rightarrow r=\pm 3\\y=C_1 x^3 + \frac{C_2}{x^3}\end{gathered}`,
    explanation: "令 x = e^t 把自变量从乘法尺度换成加法尺度，欧拉方程立刻变成熟悉的常系数线性方程。",
    commonMistake: "误把 x²y'' 直接写成 D²y，漏掉换元求导产生的 -Dy 项，导致特征方程错成 r²+r-9=0。",
    hints: [
      "作自变量变换 x = e^t（即 t = ln x），记 D = d/dt。",
      "代入算子公式 xy' = Dy 与 x²y'' = D(D-1)y。",
      "化简得到 (D² - 9)y = 0，解出 y(t) 后再回代 e^t = x。",
    ],
    steps: [
      "令 x = e^t，记 D = d/dt，将 xy' = Dy、x²y'' = D(D-1)y 代入方程，得 [D(D-1) + D - 9]y = 0，即 (D² - 9)y = 0。",
      "特征方程为 r² - 9 = 0，解得 r₁ = 3、r₂ = -3，故 y = C₁e^{3t} + C₂e^{-3t}。",
      "回代 e^t = x，得原方程通解为 y = C₁x³ + C₂/x³。",
    ],
  },
  {
    id: "jc935-7-9-2",
    source: "上册习题 7-9 第 2 题",
    lessonId: "nonhomogeneous-second-order",
    errorTag: "nonhomogeneous_second_order",
    kind: "推导题",
    difficulty: "applied",
    title: "重根共振型非齐次欧拉方程",
    prompt: "求欧拉方程 y'' + (3/x)y' + (1/x²)y = 4/x³ 在 x > 0 上的通解。",
    formula: math`y''+\frac{3}{x}y'+\frac{1}{x^2}y=\frac{4}{x^3} \quad (x>0)`,
    solution: math`\begin{gathered}
(D+1)^2 y = 4e^{-t},\quad r_{1,2}=-1 \\
y^* = 2t^2 e^{-t} \\
y=\frac{C_1+C_2\ln x+2\ln^2 x}{x}
\end{gathered}`,
    explanation: "两边先乘 x² 显出欧拉方程原型，换元后右端指数正好撞上二重特征根，所以特解要多乘 t² 避开重合。",
    commonMistake: "只乘了一个 t 设特解 y* = Ate^{-t}，没有注意到 -1 是特征方程的二重根而导致代入后左边恒为零。",
    hints: [
      "两边同乘 x² 化为标准欧拉方程 x²y'' + 3xy' + y = 4/x。",
      "令 x = e^t，化为 (D+1)²y = 4e^{-t}，特征根为二重根 r = -1。",
      "设特解 y* = At²e^{-t}，代入求出 A = 2，最后回代 t = ln x。",
    ],
    steps: [
      "两边同乘 x² 得 x²y'' + 3xy' + y = 4/x；令 x = e^t 并记 D = d/dt，方程化为 [D(D-1) + 3D + 1]y = 4e^{-t}，即 (D+1)²y = 4e^{-t}。",
      "对应齐次方程有二重特征根 r₁ = r₂ = -1，齐次通解为 Y = (C₁ + C₂t)e^{-t}；因 λ = -1 为二重根，设 y* = At²e^{-t}，代入得 2Ae^{-t} = 4e^{-t}，故 A = 2。",
      "叠加得 y = (C₁ + C₂t + 2t²)e^{-t}，回代 e^t = x 与 t = ln x，得 y = (C₁ + C₂ln x + 2ln²x)/x。",
    ],
  },
  {
    id: "jc935-7-9-3",
    source: "上册习题 7-9 第 3 题",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "推导题",
    difficulty: "applied",
    title: "三阶齐次欧拉方程通解",
    prompt: "求三阶欧拉方程 x³y''' + 2x²y'' - 8xy' + 12y = 0 在 x > 0 上的通解。",
    formula: math`\begin{gathered}
x^3 y'''+2x^2 y''-8xy'+12y=0 \\
(x>0)
\end{gathered}`,
    solution: math`\begin{gathered}
(r-2)^2(r+3)=0 \\
r_{1,2}=2,\quad r_3=-3 \\
y=x^2(C_1+C_2\ln x)+\frac{C_3}{x^3}
\end{gathered}`,
    explanation: "三阶欧拉方程把 x³y''' 换成 D(D-1)(D-2)y，整理后就是普通三次特征方程，重根对应多项式乘幂函数。",
    commonMistake: "把三阶换元公式误记成 D(D-1)(D+2) 或漏掉展开后的 -3D²+2D 项，导致特征多项式算错。",
    hints: [
      "使用三阶欧拉算子：x³y''' = D(D-1)(D-2)y，x²y'' = D(D-1)y，xy' = Dy。",
      "展开合并得特征方程 r³ - r² - 8r + 12 = 0。",
      "因式分解为 (r - 2)²(r + 3) = 0，写出 t 的通解后再回代 x = e^t。",
    ],
    steps: [
      "令 x = e^t、D = d/dt，将三阶算子代入得 [D(D-1)(D-2) + 2D(D-1) - 8D + 12]y = 0。",
      "展开得特征方程 r³ - r² - 8r + 12 = 0，因式分解为 (r - 2)²(r + 3) = 0，解得 r₁ = r₂ = 2，r₃ = -3。",
      "由此得 y = (C₁ + C₂t)e^{2t} + C₃e^{-3t}，回代 e^t = x 与 t = ln x，得 y = x²(C₁ + C₂ln x) + C₃/x³。",
    ],
  },
  {
    id: "jc935-7-9-4",
    source: "上册习题 7-9 第 4 题",
    lessonId: "nonhomogeneous-second-order",
    errorTag: "nonhomogeneous_second_order",
    kind: "推导题",
    difficulty: "applied",
    title: "对数多项式右端欧拉方程",
    prompt: "求欧拉方程 x²y'' - 3xy' + 3y = 3ln²x - 2ln x 在 x > 0 上的通解。",
    formula: math`\begin{gathered}
x^2 y''-3xy'+3y=3\ln^2 x-2\ln x \\
(x>0)
\end{gathered}`,
    solution: math`\begin{gathered}(D^2-4D+3)y=3t^2-2t\\y^*=t^2+2t+2\\y=C_1 x+C_2 x^3\\+\ln^2 x+2\ln x+2\end{gathered}`,
    explanation: "换元 t = ln x 后，右端的对数多项式立刻变成普通的 t 的二次多项式，直接用待定系数法设二次多项式特解即可。",
    commonMistake: "看到右端没有常数项就漏设特解里的常数项 C，结果比较系数时常数项无法抵消。",
    hints: [
      "令 x = e^t，方程化为 (D² - 4D + 3)y = 3t² - 2t。",
      "特征根为 r₁ = 1、r₂ = 3，因 λ = 0 不是特征根，设特解 y* = At² + Bt + C。",
      "代入比较系数求得 A = 1, B = 2, C = 2，回代 t = ln x。",
    ],
    steps: [
      "令 x = e^t（t = ln x），原方程化为 [D(D-1) - 3D + 3]y = 3t² - 2t，即 (D² - 4D + 3)y = 3t² - 2t。",
      "特征方程 r² - 4r + 3 = 0 的根为 r₁ = 1、r₂ = 3，齐次通解 Y = C₁e^t + C₂e^{3t}；设 y* = At² + Bt + C，代入得 3At² + (3B - 8A)t + (3C - 4B + 2A) = 3t² - 2t，解得 A = 1, B = 2, C = 2。",
      "故 y = C₁e^t + C₂e^{3t} + t² + 2t + 2，回代得 y = C₁x + C₂x³ + ln²x + 2ln x + 2。",
    ],
  },
  {
    id: "jc935-7-9-5",
    source: "上册习题 7-9 第 5 题",
    lessonId: "nonhomogeneous-second-order",
    errorTag: "nonhomogeneous_second_order",
    kind: "推导题",
    difficulty: "applied",
    title: "幂函数右端非齐次欧拉方程",
    prompt: "求欧拉方程 x²y'' + 2xy' - 6y = 14x⁴ 在 x > 0 上的通解。",
    formula: math`x^2 y''+2xy'-6y=14x^4 \quad (x>0)`,
    solution: math`\begin{gathered}
(D^2+D-6)y=14e^{4t} \\
r_1=2,\quad r_2=-3,\quad y^*=x^4 \\
y=C_1 x^2+\frac{C_2}{x^3}+x^4
\end{gathered}`,
    explanation: "幂函数 x⁴ 在换元后就是指数函数 e^{4t}；只要 4 不是特征根，直接设特解 y* = Ax⁴ 代回原方程最快。",
    commonMistake: "忘记检查 λ = 4 是否为特征根，或者把系数 (4² + 4 - 6) 误算成 (4² + 2·4 - 6) 而漏掉 D(D-1) 的减 1。",
    hints: [
      "令 x = e^t，方程化为 (D² + D - 6)y = 14e^{4t}。",
      "特征根为 r₁ = 2、r₂ = -3，而 λ = 4 不是特征根。",
      "设 y* = Ax⁴ 直接代入原方程，得 (12 + 8 - 6)Ax⁴ = 14x⁴，求得 A = 1。",
    ],
    steps: [
      "令 x = e^t，原方程化为 [D(D-1) + 2D - 6]y = 14e^{4t}，即 (D² + D - 6)y = 14e^{4t}。",
      "特征方程 r² + r - 6 = 0 的根为 r₁ = 2、r₂ = -3，齐次通解 Y = C₁x² + C₂/x³。",
      "因 λ = 4 不是特征根，设特解 y* = Ax⁴，代入原方程得 14Ax⁴ = 14x⁴，解得 A = 1，故通解 y = C₁x² + C₂/x³ + x⁴。",
    ],
  },
  {
    id: "jc935-7-9-6",
    source: "上册习题 7-9 第 6 题",
    lessonId: "nonhomogeneous-second-order",
    errorTag: "nonhomogeneous_second_order",
    kind: "推导题",
    difficulty: "challenge",
    title: "复特征根与三角对数右端欧拉方程",
    prompt: "求欧拉方程 x²y'' - 3xy' + 8y = 3x²cos(ln x) 在 x > 0 上的通解。",
    formula: math`\begin{gathered}
x^2 y''-3xy'+8y=3x^2\cos(\ln x) \\
(x>0)
\end{gathered}`,
    solution: math`\begin{gathered}(D^2-4D+8)y=3e^{2t}\cos t\\r_{1,2}=2\pm 2i,\quad y^*=x^2\cos(\ln x)\\y=x^2[C_1\cos(2\ln x)\\+C_2\sin(2\ln x)]\\+x^2\cos(\ln x)\end{gathered}`,
    explanation: "换元后 x²cos(ln x) 化作 e^{2t}cos t，虽然指数 2 与复特征根实部相同，但角频率 1 不等于虚部 2，所以不共振。",
    commonMistake: "只看到指数 2 等于特征根实部 2 就误判共振并多乘了 t；判断是否共振必须同时比较实部和虚部 2 + i 与 2 ± 2i。",
    hints: [
      "令 x = e^t，化为 (D² - 4D + 8)y = 3e^{2t}cos t。",
      "特征根为 r = 2 ± 2i，而右端对应复参数 λ + iω = 2 + i，不是特征根。",
      "设 y* = e^{2t}(A cos t + B sin t)，利用移位性质 (D-2)²(e^{2t}u) = e^{2t}D²u 迅速求得 A = 1, B = 0。",
    ],
    steps: [
      "令 x = e^t，原方程化为 [(D - 2)² + 4]y = 3e^{2t}cos t，特征根为 r = 2 ± 2i，齐次通解 Y = e^{2t}(C₁cos 2t + C₂sin 2t)。",
      "右端参数 2 + i 不是特征根，设 y* = e^{2t}(A cos t + B sin t)，代入得 e^{2t}(D² + 4)(A cos t + B sin t) = 3e^{2t}(A cos t + B sin t) = 3e^{2t}cos t，故 A = 1, B = 0。",
      "叠加并回代 e^t = x、t = ln x，得通解 y = x²[C₁cos(2ln x) + C₂sin(2ln x)] + x²cos(ln x)。",
    ],
  },
  {
    id: "jc935-7-9-7",
    source: "上册习题 7-9 第 7 题",
    lessonId: "nonhomogeneous-second-order",
    errorTag: "nonhomogeneous_second_order",
    kind: "推导题",
    difficulty: "challenge",
    title: "叠加原理与重根共振欧拉方程",
    prompt: "求欧拉方程 x²y'' - 5xy' + 9y = 4x + 6x³ln x 在 x > 0 上的通解。",
    formula: math`\begin{gathered}
x^2 y''-5xy'+9y=4x+6x^3\ln x \\
(x>0)
\end{gathered}`,
    solution: math`\begin{gathered}
(D-3)^2 y=4e^t+6te^{3t} \\
y_1^*=e^t,\quad y_2^*=t^3 e^{3t} \\
y=x^3(C_1+C_2\ln x)+x+x^3\ln^3 x
\end{gathered}`,
    explanation: "把右端拆成不共振的 4e^t 和撞上二重根的 6te^{3t} 两部分分别求特解再相加，重根共振使一次多项式抬升到三次。",
    commonMistake: "对 6te^{3t} 设特解时只写成 Bt³e^{3t} 而忘记验证低次项 Ct²e^{3t}，或者误把二重根当作单根少乘了一个 t。",
    hints: [
      "令 x = e^t，化为 (D - 3)²y = 4e^t + 6te^{3t}，特征根为二重根 r = 3。",
      "对 4e^t 设 y₁* = Ae^t；对 6te^{3t} 因 λ = 3 为二重根，设 y₂* = t²(Bt + C)e^{3t}。",
      "利用 (D - 3)²[u(t)e^{3t}] = u''(t)e^{3t}，得 6Bt + 2C = 6t，解得 B = 1, C = 0。",
    ],
    steps: [
      "令 x = e^t，原方程化为 (D² - 6D + 9)y = (D - 3)²y = 4e^t + 6te^{3t}，齐次通解 Y = (C₁ + C₂t)e^{3t}。",
      "分别求特解：对 4e^t，(1 - 3)²A = 4 得 y₁* = e^t；对 6te^{3t}，设 y₂* = (Bt³ + Ct²)e^{3t}，代入得 (6Bt + 2C)e^{3t} = 6te^{3t}，解得 B = 1, C = 0，即 y₂* = t³e^{3t}。",
      "由叠加原理并回代 e^t = x、t = ln x，得通解 y = x³(C₁ + C₂ln x) + x + x³ln³x。",
    ],
  },
  {
    id: "jc935-7-9-8",
    source: "上册习题 7-9 第 8 题",
    lessonId: "nonhomogeneous-second-order",
    errorTag: "nonhomogeneous_second_order",
    kind: "推导题",
    difficulty: "challenge",
    title: "三阶非齐次欧拉方程叠加求解",
    prompt: "求三阶欧拉方程 x³y''' + 4x²y'' + 3xy' + y = 8x ln x + 4/x 在 x > 0 上的通解。",
    formula: math`\begin{gathered}
x^3 y'''+4x^2 y''+3xy'+y \\
=8x\ln x+\frac{4}{x} \quad (x>0)
\end{gathered}`,
    solution: math`\begin{gathered}
(D+1)(D^2+1)y=8te^t+4e^{-t} \\
y^*=(2t-3)e^t+2te^{-t} \\
y=\frac{C_1+2\ln x}{x}+C_2\cos(\ln x) \\
+C_3\sin(\ln x)+x(2\ln x-3)
\end{gathered}`,
    explanation: "三阶欧拉算子展开后恰可因式分解为 (D+1)(D²+1)，右端一项不共振、一项撞上单根 -1，分段用待定系数法逐个击破。",
    commonMistake: "对 8te^t 漏设常数项 B 而只设 Ate^t，或者对共振项 4e^{-t} 忘记乘 t 写成 Ce^{-t}。",
    hints: [
      "令 x = e^t，展开算子得 (D³ + D² + D + 1)y = (D + 1)(D² + 1)y = 8te^t + 4e^{-t}。",
      "特征根为 r₁ = -1 与 r₂,₃ = ±i，写出齐次通解 Y = C₁e^{-t} + C₂cos t + C₃sin t。",
      "设 y₁* = (At + B)e^t 与 y₂* = Cte^{-t} 分别代入，求得 A = 2, B = -3, C = 2。",
    ],
    steps: [
      "令 x = e^t，将三阶算子代入并化简得 (D + 1)(D² + 1)y = 8te^t + 4e^{-t}，特征根为 r₁ = -1、r₂,₃ = ±i，齐次通解 Y = C₁e^{-t} + C₂cos t + C₃sin t。",
      "对 8te^t（λ = 1 非根），设 y₁* = (At + B)e^t，代入得 [4At + (6A + 4B)]e^t = 8te^t，解得 A = 2, B = -3；对 4e^{-t}（λ = -1 为单根），设 y₂* = Cte^{-t}，代入得 2Ce^{-t} = 4e^{-t}，解得 C = 2。",
      "叠加并回代 e^t = x、t = ln x，得通解 y = (C₁ + 2ln x)/x + C₂cos(ln x) + C₃sin(ln x) + x(2ln x - 3)。",
    ],
  },

  // ==================== 习题 7-10 常系数线性微分方程组 (12 题) ====================
  {
    id: "jc935-7-10-1-1",
    source: "上册习题 7-10 第 1 题（1）",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "推导题",
    difficulty: "basic",
    title: "简单耦合一阶齐次方程组",
    prompt: "求常系数线性微分方程组 dy/dx = 2z, dz/dx = 2y 的通解。",
    formula: math`\begin{cases}
\dfrac{dy}{dx}=2z, \\[6pt]
\dfrac{dz}{dx}=2y.
\end{cases}`,
    solution: math`\begin{cases}
y=C_1 e^{2x}+C_2 e^{-2x}, \\
z=C_1 e^{2x}-C_2 e^{-2x}.
\end{cases}`,
    explanation: "对第一式再求一次导就能把 z 消成 y，得到二阶常系数方程；求出 y 后直接代回第一式算 z，无需再积分。",
    commonMistake: "把 y 求出来后又去对第二式积分求 z，结果多出一个多余的任意常数 C₃。",
    hints: [
      "对第一式两端关于 x 求导，得 d²y/dx² = 2 dz/dx。",
      "将第二式 dz/dx = 2y 代入，得到 y'' - 4y = 0。",
      "解出 y = C₁e^{2x} + C₂e^{-2x} 后，由 z = (1/2)y' 直接写出 z。",
    ],
    steps: [
      "对第一式两端求导得 y'' = 2z'，代入第二式 z' = 2y，消去 z 得 y'' - 4y = 0。",
      "特征方程 r² - 4 = 0 的根为 r₁,₂ = ±2，故 y = C₁e^{2x} + C₂e^{-2x}。",
      "代回第一式得 z = (1/2)y' = C₁e^{2x} - C₂e^{-2x}。",
    ],
  },
  {
    id: "jc935-7-10-1-2",
    source: "上册习题 7-10 第 1 题（2）",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "推导题",
    difficulty: "applied",
    title: "二阶对称耦合微分方程组",
    prompt: "求微分方程组 d²x/dt² = 4y, d²y/dt² = 4x 的通解。",
    formula: math`\begin{cases}
\dfrac{d^2 x}{dt^2}=4y, \\[6pt]
\dfrac{d^2 y}{dt^2}=4x.
\end{cases}`,
    solution: math`\begin{gathered}
x=C_1 e^{2t}+C_2 e^{-2t} \\
+C_3\cos 2t+C_4\sin 2t, \\
y=C_1 e^{2t}+C_2 e^{-2t} \\
-C_3\cos 2t-C_4\sin 2t.
\end{gathered}`,
    explanation: "连续求两次导把 y'' 替换掉，方程升成四阶 r⁴ - 16 = 0，既有指数增长衰减，也有正余弦简谐振动。",
    commonMistake: "解 r⁴ = 16 时只写实根 ±2 而漏掉复根 ±2i，导致通解缺少两个任意常数。",
    hints: [
      "对第一式两端关于 t 求二阶导数，得 x^{(4)} = 4y''。",
      "代入第二式得四阶齐次方程 x^{(4)} - 16x = 0，特征方程为 r⁴ - 16 = 0。",
      "求得四根 ±2、±2i，写出 x(t) 后由 y = (1/4)x'' 直接求出 y(t)。",
    ],
    steps: [
      "对第一式求二阶导数并代入第二式，得 x^{(4)} - 16x = 0。",
      "特征方程 r⁴ - 16 = (r² - 4)(r² + 4) = 0 有根 r₁,₂ = ±2 与 r₃,₄ = ±2i，故 x = C₁e^{2t} + C₂e^{-2t} + C₃cos 2t + C₄sin 2t。",
      "由第一式 y = (1/4)x''，求导化简得 y = C₁e^{2t} + C₂e^{-2t} - C₃cos 2t - C₄sin 2t。",
    ],
  },
  {
    id: "jc935-7-10-1-3",
    source: "上册习题 7-10 第 1 题（3）",
    lessonId: "nonhomogeneous-second-order",
    errorTag: "nonhomogeneous_second_order",
    kind: "推导题",
    difficulty: "applied",
    title: "和差消元法解非齐次方程组",
    prompt: "求微分方程组 x' + y' = -2x + 2y + 8, x' - y' = 2x + 2y - 8 的通解。",
    formula: math`\begin{cases}
\dfrac{dx}{dt}+\dfrac{dy}{dt}=-2x+2y+8, \\[6pt]
\dfrac{dx}{dt}-\dfrac{dy}{dt}=2x+2y-8.
\end{cases}`,
    solution: math`\begin{cases}
x=C_1\cos 2t+C_2\sin 2t+4, \\
y=-C_1\sin 2t+C_2\cos 2t.
\end{cases}`,
    explanation: "两式先相加就能直接消去 y' 露出 y = (1/2)x'，再相减代入立刻化为简谐振动方程 x'' + 4x = 16。",
    commonMistake: "回代求 y 时忘记乘 1/2，或者把 (cos 2t)' = -2sin 2t 中的链式法则因子 2 漏掉。",
    hints: [
      "将两式相加得 2x' = 4y，即 y = (1/2)x'。",
      "将两式相减得 2y' = -4x + 16，即 y' = -2x + 8。",
      "把 y' = (1/2)x'' 代入得 x'' + 4x = 16，求通解后再算 y = (1/2)x'。",
    ],
    steps: [
      "两式相加得 2x' = 4y，即 y = (1/2)x'；两式相减得 2y' = -4x + 16，即 y' = -2x + 8。",
      "将 y' = (1/2)x'' 代入上式得 x'' + 4x = 16；特征根为 ±2i，特解 x* = 4，故 x = C₁cos 2t + C₂sin 2t + 4。",
      "代回 y = (1/2)x'，得 y = -C₁sin 2t + C₂cos 2t。",
    ],
  },
  {
    id: "jc935-7-10-1-4",
    source: "上册习题 7-10 第 1 题（4）",
    lessonId: "nonhomogeneous-second-order",
    errorTag: "nonhomogeneous_second_order",
    kind: "推导题",
    difficulty: "applied",
    title: "指数右端常系数微分方程组",
    prompt: "求微分方程组 x' + 4x + y = 4e^t, y' - 6x - 3y = 6e^{3t} 的通解。",
    formula: math`\begin{cases}
\dfrac{dx}{dt}+4x+y=4e^t, \\[6pt]
\dfrac{dy}{dt}-6x-3y=6e^{3t}.
\end{cases}`,
    solution: math`\begin{gathered}
x=C_1 e^{2t}+C_2 e^{-3t}+2e^t-e^{3t}, \\
y=-6C_1 e^{2t}-C_2 e^{-3t} \\
-6e^t+7e^{3t}.
\end{gathered}`,
    explanation: "把求导记成算子 D 后，方程组像二元一次代数方程一样用行列式消去 y，解出 x 再用第一式代数回代求 y。",
    commonMistake: "展开算子行列式 Δₓ 时忘记把算子 (D - 3) 真正作用到 4e^t 上，直接当作普通乘法写成了 -3·4e^t。",
    hints: [
      "记 D = d/dt，改写为 (D + 4)x + y = 4e^t 与 -6x + (D - 3)y = 6e^{3t}。",
      "算子行列式消去 y 得 (D² + D - 6)x = (D - 3)(4e^t) - 6e^{3t} = -8e^t - 6e^{3t}。",
      "特征根为 2 与 -3，设 x* = Ae^t + Be^{3t} 求得 x 后，由 y = 4e^t - (D + 4)x 得 y。",
    ],
    steps: [
      "记 D = d/dt，由算子消元得 [(D + 4)(D - 3) + 6]x = (D - 3)(4e^t) - 6e^{3t}，化简为 (D² + D - 6)x = -8e^t - 6e^{3t}。",
      "特征根为 r₁ = 2、r₂ = -3；设 x* = Ae^t + Be^{3t}，代入得 -4A = -8、6B = -6，即 A = 2、B = -1，故 x = C₁e^{2t} + C₂e^{-3t} + 2e^t - e^{3t}。",
      "代入第一式 y = 4e^t - (D + 4)x，整理得 y = -6C₁e^{2t} - C₂e^{-3t} - 6e^t + 7e^{3t}。",
    ],
  },
  {
    id: "jc935-7-10-1-5",
    source: "上册习题 7-10 第 1 题（5）",
    lessonId: "nonhomogeneous-second-order",
    errorTag: "nonhomogeneous_second_order",
    kind: "推导题",
    difficulty: "challenge",
    title: "多项式右端算子消元方程组",
    prompt: "求微分方程组 x' + 6x + y' + y = 2t, 8x + y' + 2y = 4t² 的通解。",
    formula: math`\begin{cases}
\dfrac{dx}{dt}+6x+\dfrac{dy}{dt}+y=2t, \\[6pt]
8x+\dfrac{dy}{dt}+2y=4t^2.
\end{cases}`,
    solution: math`\begin{gathered}y=C_1\cos 2t\\+C_2\sin 2t+6t^2-2t-3,\\x=-\frac{C_1+C_2}{4}\cos 2t\\+\frac{C_1-C_2}{4}\sin 2t-t^2-t+1.\end{gathered}`,
    explanation: "先消去只含一处导数的 x 更容易：算子行列式恰好消掉一阶项留下 (D²+4)y，求出 y 后从第二式一步反解 x。",
    commonMistake: "回代第二式求 x = (1/8)[4t² - (D + 2)y] 时漏掉乘 1/8，或忘记对 C₁cos 2t + C₂sin 2t 求导产生的符号变化。",
    hints: [
      "写成算子形式：(D + 6)x + (D + 1)y = 2t，8x + (D + 2)y = 4t²。",
      "消去 x 得 [(D + 6)(D + 2) - 8(D + 1)]y = (D + 6)(4t²) - 16t，即 (D² + 4)y = 24t² - 8t。",
      "求得 y = C₁cos 2t + C₂sin 2t + 6t² - 2t - 3 后，代入第二式解出 x。",
    ],
    steps: [
      "记 D = d/dt，算子消去 x 得 (D² + 4)y = (D + 6)(4t²) - 8(2t) = 24t² - 8t。",
      "齐次特征根为 ±2i；设 y* = At² + Bt + C，代入得 4At² + 4Bt + (2A + 4C) = 24t² - 8t，解得 A = 6, B = -2, C = -3，故 y = C₁cos 2t + C₂sin 2t + 6t² - 2t - 3。",
      "由第二式 x = (1/8)[4t² - (D + 2)y]，化简得 x = -(C₁ + C₂)/4·cos 2t + (C₁ - C₂)/4·sin 2t - t² - t + 1。",
    ],
  },
  {
    id: "jc935-7-10-1-6",
    source: "上册习题 7-10 第 1 题（6）",
    lessonId: "nonhomogeneous-second-order",
    errorTag: "nonhomogeneous_second_order",
    kind: "推导题",
    difficulty: "challenge",
    title: "双导数耦合三角右端方程组",
    prompt: "求微分方程组 x' - x + 2y' + 2y = 2cos t, 2x' + x + y' = -sin t 的通解。",
    formula: math`\begin{cases}
\dfrac{dx}{dt}-x+2\dfrac{dy}{dt}+2y=2\cos t, \\[6pt]
2\dfrac{dx}{dt}+x+\dfrac{dy}{dt}=-\sin t.
\end{cases}`,
    solution: math`\begin{gathered}
x=C_1 e^{-2t}+C_2 e^{-\frac{t}{3}} \\
+\frac{1}{25}\cos t-\frac{7}{25}\sin t, \\
y=-\frac{3}{2}C_1 e^{-2t}+C_2 e^{-\frac{t}{3}} \\
+\frac{16}{25}\cos t+\frac{13}{25}\sin t.
\end{gathered}`,
    explanation: "两式都含 y' 时，求出 x 后用“第一式减去二倍第二式”直接消去 y'，就能纯代数表达出 y 而不必积分。",
    commonMistake: "解出 x 后直接代入第二式对 y' 积分，不仅引入多余常数，还容易忘掉把该常数代回第一式检验。",
    hints: [
      "写成算子形式：(D - 1)x + (2D + 2)y = 2cos t，(2D + 1)x + Dy = -sin t。",
      "算子行列式消去 y 得 (3D² + 7D + 2)x = -2cos t，特征根为 r₁ = -2 与 r₂ = -1/3。",
      "求得 x 后，用第一式减去 2 倍第二式消去 y'，得 y = (1/2)[(3D + 3)x + 2cos t + 2sin t]。",
    ],
    steps: [
      "记 D = d/dt，算子消去 y 得 [-(3D² + 7D + 2)]x = D(2cos t) - (2D + 2)(-sin t) = 2cos t，即 (3D² + 7D + 2)x = -2cos t。",
      "特征方程 3r² + 7r + 2 = (3r + 1)(r + 2) = 0 得 r₁ = -2、r₂ = -1/3；设 x* = A cos t + B sin t，代入解得 A = 1/25, B = -7/25，故 x = C₁e^{-2t} + C₂e^{-t/3} + (1/25)cos t - (7/25)sin t。",
      "第一式减 2 倍第二式得 -(3D + 3)x + 2y = 2cos t + 2sin t，代入 x 化简得 y = -(3/2)C₁e^{-2t} + C₂e^{-t/3} + (16/25)cos t + (13/25)sin t。",
    ],
  },
  {
    id: "jc935-7-10-2-1",
    source: "上册习题 7-10 第 2 题（1）",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "推导题",
    difficulty: "basic",
    title: "简谐旋转系统初值问题",
    prompt: "求微分方程组 dx/dt = 3y, dy/dt = -3x 满足初值条件 x(0) = 2, y(0) = 0 的特解。",
    formula: math`\begin{cases}
\dfrac{dx}{dt}=3y, & x|_{t=0}=2, \\[6pt]
\dfrac{dy}{dt}=-3x, & y|_{t=0}=0.
\end{cases}`,
    solution: math`\begin{cases}
x=2\cos 3t, \\
y=-2\sin 3t.
\end{cases}`,
    explanation: "这是点以角速度 3 顺时针匀速圆周运动的方程，从 (2, 0) 出发转过角度 3t 后坐标就是 (2cos 3t, -2sin 3t)。",
    commonMistake: "把 y = (1/3)x' 的符号搞反，错写成 y = 2sin 3t，忽略了 cos 求导会产生负号。",
    hints: [
      "对第一式求导并代入第二式，得 x'' + 9x = 0。",
      "写出通解 x = C₁cos 3t + C₂sin 3t，再由 y = (1/3)x' 写出 y。",
      "代入 t = 0 时 x = 2、y = 0，解得 C₁ = 2, C₂ = 0。",
    ],
    steps: [
      "对第一式求导并代入第二式，消去 y 得 x'' + 9x = 0，解得 x = C₁cos 3t + C₂sin 3t。",
      "由第一式得 y = (1/3)x' = -C₁sin 3t + C₂cos 3t。",
      "代入初值 x(0) = 2、y(0) = 0，得 C₁ = 2、C₂ = 0，故特解为 x = 2cos 3t，y = -2sin 3t。",
    ],
  },
  {
    id: "jc935-7-10-2-2",
    source: "上册习题 7-10 第 2 题（2）",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "推导题",
    difficulty: "applied",
    title: "混合阶齐次方程组初值问题",
    prompt: "求微分方程组 x'' + 2y' - 4x = 0, x' + y = 0 满足 x(0) = 0, y(0) = -2 的特解。",
    formula: math`\begin{cases}
\dfrac{d^2 x}{dt^2}+2\dfrac{dy}{dt}-4x=0, & x|_{t=0}=0, \\[6pt]
\dfrac{dx}{dt}+y=0, & y|_{t=0}=-2.
\end{cases}`,
    solution: math`\begin{cases}
x=\sin 2t, \\
y=-2\cos 2t.
\end{cases}`,
    explanation: "虽然第一式含二阶导数，但第二式直接给出 y = -x'，代入后二阶项合并，仍是一个标准二阶谐振方程。",
    commonMistake: "看到 x'' 和 y' 就误以为消元后会得到三阶方程、需要三个初值条件，其实 y = -x' 恰好使方程保持二阶。",
    hints: [
      "由第二式直接解出 y = -x'，求导得 y' = -x''。",
      "代入第一式得 x'' - 2x'' - 4x = 0，即 x'' + 4x = 0。",
      "求得 x = C₁cos 2t + C₂sin 2t 与 y = -x'，再代入初值定出常数。",
    ],
    steps: [
      "由第二式得 y = -x'，故 y' = -x''；代入第一式化简得 x'' + 4x = 0。",
      "解得 x = C₁cos 2t + C₂sin 2t，从而 y = -x' = 2C₁sin 2t - 2C₂cos 2t。",
      "代入初值 x(0) = 0、y(0) = -2，得 C₁ = 0、C₂ = 1，故特解为 x = sin 2t，y = -2cos 2t。",
    ],
  },
  {
    id: "jc935-7-10-2-3",
    source: "上册习题 7-10 第 2 题（3）",
    lessonId: "homogeneous-second-order",
    errorTag: "homogeneous_second_order",
    kind: "推导题",
    difficulty: "applied",
    title: "相异实根齐次方程组初值问题",
    prompt: "求微分方程组 x' + 2x - y = 0, y' - 6x + y = 0 满足 x(0) = 2, y(0) = 1 的特解。",
    formula: math`\begin{cases}
\dfrac{dx}{dt}+2x-y=0, & x|_{t=0}=2, \\[6pt]
\dfrac{dy}{dt}-6x+y=0, & y|_{t=0}=1.
\end{cases}`,
    solution: math`\begin{cases}
x=e^t+e^{-4t}, \\
y=3e^t-2e^{-4t}.
\end{cases}`,
    explanation: "第一式直接把 y 表示成 x' + 2x，代入第二式得到二阶齐次方程，解出两个指数模态后再用初值配出权重。",
    commonMistake: "把 y = (D + 2)x 算成 C₁e^t + C₂e^{-4t} 的系数时，漏算 e^{-4t} 求导带来的 -4，把 -4 + 2 算错。",
    hints: [
      "由第一式得 y = x' + 2x，代入第二式得 x'' + 3x' - 4x = 0。",
      "特征根为 r₁ = 1、r₂ = -4，写出 x = C₁e^t + C₂e^{-4t} 与 y = 3C₁e^t - 2C₂e^{-4t}。",
      "代入初值解方程组 C₁ + C₂ = 2 与 3C₁ - 2C₂ = 1，得 C₁ = C₂ = 1。",
    ],
    steps: [
      "由第一式得 y = x' + 2x，代入第二式得 (D + 1)(D + 2)x - 6x = 0，即 x'' + 3x' - 4x = 0。",
      "特征方程 (r + 4)(r - 1) = 0 的根为 r₁ = 1、r₂ = -4，故 x = C₁e^t + C₂e^{-4t}，y = x' + 2x = 3C₁e^t - 2C₂e^{-4t}。",
      "代入 t = 0 得 C₁ + C₂ = 2、3C₁ - 2C₂ = 1，解得 C₁ = 1、C₂ = 1，故 x = e^t + e^{-4t}，y = 3e^t - 2e^{-4t}。",
    ],
  },
  {
    id: "jc935-7-10-2-4",
    source: "上册习题 7-10 第 2 题（4）",
    lessonId: "nonhomogeneous-second-order",
    errorTag: "nonhomogeneous_second_order",
    kind: "推导题",
    difficulty: "challenge",
    title: "指数驱动振荡方程组初值问题",
    prompt: "求微分方程组 2x' - 7x + y' - y = 8e^{2t}, x' + 3x + y = 0 满足 x(0) = 1, y(0) = 1 的特解。",
    formula: math`\begin{cases}
2\dfrac{dx}{dt}-7x+\dfrac{dy}{dt}-y=8e^{2t}, \\[6pt]
\dfrac{dx}{dt}+3x+y=0, \\[4pt]
x|_{t=0}=1,\quad y|_{t=0}=1.
\end{cases}`,
    solution: math`\begin{cases}
x=2\cos 2t-\sin 2t-e^{2t}, \\
y=-4\cos 2t+7\sin 2t+5e^{2t}.
\end{cases}`,
    explanation: "把第二式的 y = -(D+3)x 代入第一式，一阶导数项恰好抵消，化作含指数驱动的二阶简谐方程，最后定初值。",
    commonMistake: "在求齐次通解后直接拿 x(0) = 1 定 C₁，忘记必须先加上非齐次特解 -e^{2t} 再代入初值条件！",
    hints: [
      "由第二式得 y = -(D + 3)x，代入第一式得 -(D² + 4)x = 8e^{2t}，即 x'' + 4x = -8e^{2t}。",
      "求得通解 x = C₁cos 2t + C₂sin 2t - e^{2t}，再由 y = -x' - 3x 写出 y。",
      "将 t = 0 代入完整通解，解得 C₁ = 2、C₂ = -1。",
    ],
    steps: [
      "由第二式得 y = -(D + 3)x，代入第一式得 [(2D - 7) - (D - 1)(D + 3)]x = 8e^{2t}，化简为 (D² + 4)x = -8e^{2t}。",
      "齐次通解为 C₁cos 2t + C₂sin 2t，特解 x* = -e^{2t}，故 x = C₁cos 2t + C₂sin 2t - e^{2t}；由 y = -(D + 3)x 得 y = -(3C₁ + 2C₂)cos 2t + (2C₁ - 3C₂)sin 2t + 5e^{2t}。",
      "代入初值 x(0) = 1、y(0) = 1 得 C₁ - 1 = 1 与 -3C₁ - 2C₂ + 5 = 1，解得 C₁ = 2、C₂ = -1，即 x = 2cos 2t - sin 2t - e^{2t}，y = -4cos 2t + 7sin 2t + 5e^{2t}。",
    ],
  },
  {
    id: "jc935-7-10-2-5",
    source: "上册习题 7-10 第 2 题（5）",
    lessonId: "nonhomogeneous-second-order",
    errorTag: "nonhomogeneous_second_order",
    kind: "推导题",
    difficulty: "challenge",
    title: "阻尼振荡混合右端方程组初值",
    prompt: "求微分方程组 x' + 4x - y' = 20sin 2t, x' + y' + 4y = 4e^{-4t} 满足 x(0) = -4, y(0) = 0 的特解。",
    formula: math`\begin{cases}
\dfrac{dx}{dt}+4x-\dfrac{dy}{dt}=20\sin 2t, \\[6pt]
\dfrac{dx}{dt}+\dfrac{dy}{dt}+4y=4e^{-4t}, \\[4pt]
x|_{t=0}=-4,\quad y|_{t=0}=0.
\end{cases}`,
    solution: math`\begin{gathered}
x=-3\cos 2t+4\sin 2t \\
-e^{-4t}-e^{-2t}\sin 2t, \\
y=-\cos 2t-2\sin 2t+e^{-2t}\cos 2t.
\end{gathered}`,
    explanation: "消去 x 时算子 (D+4) 恰好把右端的 4e^{-4t} 湮灭成 0，使 y 的方程只剩单一三角驱动；随后两式相减消去 x' 即得 x。",
    commonMistake: "两式相减消去 x' 时符号出错，或者忘记把 e^{-4t} 项带回到 x 的表达式中。",
    hints: [
      "算子形式为 (D + 4)x - Dy = 20sin 2t 与 Dx + (D + 4)y = 4e^{-4t}。",
      "消去 x 得 2(D² + 4D + 8)y = (D + 4)(4e^{-4t}) - D(20sin 2t) = -40cos 2t，即 (D² + 4D + 8)y = -20cos 2t。",
      "求得 y 后，用第一式减第二式得 x = 5sin 2t - e^{-4t} + (1/2)(D + 2)y，最后代入初值。",
    ],
    steps: [
      "记 D = d/dt，算子消去 x 得 [(D + 4)² + D²]y = (D + 4)(4e^{-4t}) - D(20sin 2t) = -40cos 2t，即 (D² + 4D + 8)y = -20cos 2t。",
      "特征根为 -2 ± 2i，特解 y* = -cos 2t - 2sin 2t，故 y = e^{-2t}(C₁cos 2t + C₂sin 2t) - cos 2t - 2sin 2t；由第一式减第二式得 x = 5sin 2t - e^{-4t} + (1/2)(D + 2)y = e^{-2t}(C₂cos 2t - C₁sin 2t) - 3cos 2t + 4sin 2t - e^{-4t}。",
      "代入初值 x(0) = -4、y(0) = 0 得 C₂ - 4 = -4、C₁ - 1 = 0，解得 C₁ = 1、C₂ = 0，故 x = -3cos 2t + 4sin 2t - e^{-4t} - e^{-2t}sin 2t，y = -cos 2t - 2sin 2t + e^{-2t}cos 2t。",
    ],
  },
  {
    id: "jc935-7-10-2-6",
    source: "上册习题 7-10 第 2 题（6）",
    lessonId: "nonhomogeneous-second-order",
    errorTag: "nonhomogeneous_second_order",
    kind: "推导题",
    difficulty: "challenge",
    title: "降阶退化型微分方程组初值问题",
    prompt: "求微分方程组 x' - 2x + y' + 2y = 3e^{-t} - 2, x' + x + y' + 3y = 3e^{2t} + 4t 满足 x(0) = 2, y(0) = -4 的特解。",
    formula: math`\begin{cases}
\dfrac{dx}{dt}-2x+\dfrac{dy}{dt}+2y=3e^{-t}-2, \\[6pt]
\dfrac{dx}{dt}+x+\dfrac{dy}{dt}+3y=3e^{2t}+4t, \\[4pt]
x|_{t=0}=2,\quad y|_{t=0}=-4.
\end{cases}`,
    solution: math`\begin{cases}
x=e^{-4t}-e^{-t}+e^{2t}+t+1, \\
y=-3e^{-4t}+t-1.
\end{cases}`,
    explanation: "两式的导数部分完全相同，所以算子行列式里 D² 项相互抵消，方程组退化为一阶线性方程加一条代数约束，只需一个任意常数。",
    commonMistake: "以为两个一阶方程一定产生两个任意常数，没发现两式相减即可直接得到不含导数的代数关系 y = -3x + f₂ - f₁。",
    hints: [
      "写成算子形式：(D - 2)x + (D + 2)y = 3e^{-t} - 2，(D + 1)x + (D + 3)y = 3e^{2t} + 4t。",
      "算子行列式 Δ = (D - 2)(D + 3) - (D + 1)(D + 2) = -2(D + 4)，二阶项恰好消去！",
      "解一阶线性方程 (D + 4)x = -3e^{-t} + 6e^{2t} + 4t + 5，再由第一式减第二式直接求 y。",
    ],
    steps: [
      "记 D = d/dt，算子消去 y 得 [-2(D + 4)]x = (D + 3)(3e^{-t} - 2) - (D + 2)(3e^{2t} + 4t) = 6e^{-t} - 12e^{2t} - 8t - 10，即 (D + 4)x = -3e^{-t} + 6e^{2t} + 4t + 5。",
      "解此一阶线性方程得通解 x = Ce^{-4t} - e^{-t} + e^{2t} + t + 1；代入初值 x(0) = 2 得 C = 1，故 x = e^{-4t} - e^{-t} + e^{2t} + t + 1。",
      "第一式减第二式得 -3x - y = 3e^{-t} - 2 - 3e^{2t} - 4t，代回 x 解得 y = -3e^{-4t} + t - 1，且验证满足 y(0) = -4。",
    ],
  },
] satisfies Omit<WrittenProblem, "errorLabel">[];

import type { WrittenProblem } from "./learning";

const math = String.raw;

// 上册大学数学科学学院《高等数学习题全解指导（配第八版）上册》
// 注释标注纸书题号或相应主题，题面参数与分步解析为应用改编。
export const bankWrittenPractice = [
  // p13 · §1-2 1(2)
  {
    id: "p204", lessonId: "limit", errorTag: "limit_algebra", kind: "证明题", difficulty: "challenge",
    title: "正负交替也能靠近零",
    formula: math`a_n=\frac{3(-1)^n}{2n+1}`,
    prompt: "证明这个数列收敛，并写出极限。",
    explanation: "只关心离目标有多远时，正负号可以先放一边。",
    hints: ["先取绝对值。","找一个随 n 增大而变小的上界。","上下两边都要夹到 0。"],
    steps: [
      "到 0 的距离是 3/(2n+1)。",
      "这个距离小于 3/(2n)，所以 aₙ 夹在 −3/(2n) 和 3/(2n) 之间。",
      "两条边都趋近 0，夹在中间的 aₙ 也只能趋近 0。",
    ],
    solution: math`\lim_{n\to\infty}a_n=0`,
  },
  // p13 · §1-2 1(8)
  {
    id: "p205", lessonId: "limit", errorTag: "limit_algebra", kind: "证明题", difficulty: "challenge",
    title: "用两条路线证明数列不收敛",
    formula: math`a_n=4+2(-1)^n`,
    prompt: "证明这个数列不收敛。",
    explanation: "把数列按奇偶分成两排，再看两排各自走到哪里。",
    hints: ["先代入偶数下标。","再代入奇数下标。","如果全班都到同一站，两队就得去同一站。"],
    steps: [
      "偶数项的 (−1)ⁿ 等于 1，所以始终是 6。",
      "奇数项始终是 2。",
      "若全数列有极限，两条无限长的子数列必须有同一个极限。6 与 2 不同，产生矛盾。",
    ],
    solution: math`a_{2n}=6,\quad a_{2n-1}=2`,
  },
  // p17 · §1-3 4
  {
    id: "p206", lessonId: "limit", errorTag: "one_sided", kind: "证明题", difficulty: "challenge",
    title: "从左右两边看绝对值极限",
    formula: math`\lim_{x\to 3}\frac{|2x-6|}{x-3}`,
    prompt: "判断极限是否存在并说明原因。",
    explanation: "绝对值把负数翻成正数，所以分母换号时，两侧结果会不同。",
    hints: ["把分子改成 2|x−3|。","分别判断 x−3 的正负。","比较左右极限。"],
    steps: [
      "从左边靠近 3 时，分子是 −2(x−3)，约分得 −2。",
      "从右边靠近 3 时，分子是 2(x−3)，约分得 2。",
      "两侧值不同，双侧极限不存在。",
    ],
    solution: math`\begin{gathered}\lim_{x\to3^-}f(x)=-2\\\lim_{x\to3^+}f(x)=2\end{gathered}`,
  },
  // p29 · §1-6 4(2)
  {
    id: "p207", lessonId: "limit-laws", errorTag: "squeeze", kind: "证明题", difficulty: "challenge",
    title: "把一串分式夹在两个简单数之间",
    formula: math`S_n=\sum_{k=1}^{n}\frac{n}{n^2+2k}`,
    prompt: "证明 Sₙ 收敛并求极限。",
    explanation: "用最大的分母和最小的分母替换每一项，就能给总和定上下界。",
    hints: ["k 在 1 到 n 之间。","分母越大，整项越小。","总共有 n 项。"],
    steps: [
      "每项至少是 n/(n²+2n)，至多是 1/n。",
      "把两个界各加 n 次，得到 n/(n+2)≤Sₙ≤1。",
      "当 n 越来越大，两端都靠近 1。",
    ],
    solution: math`\lim_{n\to\infty}S_n=1`,
  },
  // p29 · §1-6 5
  {
    id: "p208", lessonId: "limit-laws", errorTag: "squeeze", kind: "证明题", difficulty: "challenge",
    title: "证明根号递推有极限",
    formula: math`\begin{gathered}a_1=1\\a_{n+1}=\sqrt{6+a_n}\end{gathered}`,
    prompt: "证明数列收敛并求极限。",
    explanation: "先证明它每步往上走，再找一个它永远跨不过去的高度。",
    hints: ["检查 a₂≥a₁。","若 aₙ≤3，下一项也≤3。","收敛后再解极限方程。"],
    steps: [
      "a₂=√7≥1。根号是递增的，所以用归纳法得到 aₙ₊₁≥aₙ。",
      "从 a₁≤3 出发，若 aₙ≤3，就有 aₙ₊₁≤√9=3。因此单调有界。",
      "设极限为 L，则 L=√(6+L)。解方程有 3 和 −2，但 L≥1，所以 L=3。",
    ],
    solution: math`L^2-L-6=0,\quad L=3`,
  },
  // p34 · §1-8 4
  {
    id: "p209", lessonId: "continuity", errorTag: "continuity_value", kind: "推导题", difficulty: "challenge",
    title: "分区间求一族函数的极限",
    formula: math`\lim_{n\to\infty}\frac{2-x^{2n}}{2+x^{2n}}`,
    prompt: "写出极限函数，并找出它的间断点。",
    explanation: "x 的绝对值决定反复相乘时是越乘越小，还是越乘越大。",
    hints: ["分成 |x|<1、|x|=1、|x|>1。","第三种情况分子和分母同除 x²ⁿ。","比较 ±1 处的左右值。"],
    steps: [
      "|x|<1 时，x²ⁿ 趋近 0，分式趋近 1。",
      "|x|=1 时，x²ⁿ 始终等于 1，代入得 1/3。",
      "|x|>1 时，同除 x²ⁿ 得极限 −1。由于 ±1 两侧不同，这两处都是跳跃间断点。",
    ],
    solution: math`g(x)=\begin{cases}1&|x|<1\\1/3&|x|=1\\-1&|x|>1\end{cases}`,
  },
  // p41 · §1-10 5
  {
    id: "p210", lessonId: "continuity", errorTag: "continuity_value", kind: "证明题", difficulty: "challenge",
    title: "不解三次方程也能数出根",
    formula: math`f(x)=x^3-4x+1`,
    prompt: "证明 f 有三个不同的实根。",
    explanation: "连续的曲线从横轴下方跑到上方，一定会穿过横轴。",
    hints: ["试 x=−3、−2、0、1、2。","找三段端点异号的区间。","用多项式的次数给根数设上限。"],
    steps: [
      "f(−3)=−14，f(−2)=1，所以第一根在 (−3,−2)。",
      "f(0)=1，f(1)=−2，f(2)=1，所以 (0,1) 和 (1,2) 各有一根。",
      "三个区间内部互不相交；三次多项式最多有三个不同实根，故恰有三个。",
    ],
    solution: math`(-3,-2),\quad(0,1),\quad(1,2)`,
  },
  // p58 · §2-2 2(5)
  {
    id: "p211", lessonId: "rules", errorTag: "derivative_rules", kind: "推导题", difficulty: "applied",
    title: "给幂和对数的乘积求导",
    formula: math`\frac{d}{dx}(x^3\ln x),\qquad x>0`,
    prompt: "写出完整导数。",
    explanation: "乘积里的两部分都会变：轮流固定其中一个，看另一个贡献了多少。",
    hints: ["先求 x³ 的导数。","再求 ln x 的导数。","两份贡献加起来。"],
    steps: [
      "x³ 变动贡献 3x²ln x。",
      "ln x 变动贡献 x³·1/x=x²。",
      "相加得到 x²(3ln x+1)。",
    ],
    solution: math`(x^3\ln x)'=x^2(3\ln x+1)`,
  },
  // p58 · §2-2 2(9)
  {
    id: "p212", lessonId: "rules", errorTag: "derivative_rules", kind: "推导题", difficulty: "applied",
    title: "三个因子轮流求导",
    formula: math`\frac{d}{dx}(x^3\ln x\sin x),\qquad x>0`,
    prompt: "写出导数。",
    explanation: "把三部分分别看成三个人轮流走一步，每次另外两人站着不动。",
    hints: ["幂函数、对数、正弦各贡献一项。","正弦求导得到余弦。","可以先把前两项合并以免式子太长。"],
    steps: [
      "x³ 求导贡献 3x²ln x sin x。",
      "ln x 求导贡献 x²sin x。",
      "sin x 求导贡献 x³ln x cos x，三项相加。",
    ],
    solution: math`\begin{gathered}x^2(3\ln x+1)\sin x\\+x^3\ln x\cos x\end{gathered}`,
  },
  // p65 · §2-3 1(3)
  {
    id: "p213", lessonId: "advanced-derivatives", errorTag: "higher_derivative", kind: "推导题", difficulty: "applied",
    title: "对乘积连续求两次导数",
    formula: math`f(x)=x\cos(2x)`,
    prompt: "求二阶导数。",
    explanation: "先完整地求一遍，再把得到的每一项当成新题目各求一次。",
    hints: ["第一遍用乘积法。","内层 2x 带来系数 2。","第二遍有两个含 sin(2x) 的项。"],
    steps: [
      "一次求导得到 cos(2x)−2xsin(2x)。",
      "再求导，前半部分得到 −2sin(2x)，后半部分得到 −2sin(2x)−4xcos(2x)。",
      "合并两个相同的正弦项。",
    ],
    solution: math`f''(x)=-4\sin(2x)-4x\cos(2x)`,
  },
  // p70 · §2-4 1
  {
    id: "p214", lessonId: "advanced-derivatives", errorTag: "implicit_derivative", kind: "推导题", difficulty: "applied",
    title: "从椭圆方程求切线斜率",
    formula: math`\begin{gathered}x^2+3y^2=28\\(x,y)=(1,3)\end{gathered}`,
    prompt: "先写出 y≠0 时的斜率公式，再求指定点的斜率。",
    explanation: "在方程里，y 会跟着 x 一起变。",
    hints: ["两边同时对 x 求导。","y² 求导时要乘 y′。","先解出 y′ 再代点。"],
    steps: [
      "左边得到 2x+6yy′，右侧常数求导为 0。",
      "移项并除以 6y，得到 y′=−x/(3y)。",
      "在 (1,3) 代入，斜率为 −1/9。",
    ],
    solution: math`y'=-\frac{x}{3y},\qquad y'(1)=-\frac19`,
  },
  // p78 · §2-5 1
  {
    id: "p215", lessonId: "differential", errorTag: "linear_approximation", kind: "推导题", difficulty: "applied",
    title: "看看微分漏掉了多少",
    formula: math`\begin{gathered}y=x^2,\quad x=3\\\Delta x=0.02\end{gathered}`,
    prompt: "求真实增量 Δy、微分 dy 和二者之差。",
    explanation: "把正方形边长拉长一点，会长出两条细边和一个小角。",
    hints: ["真实增量要把新平方减去旧平方。","微分只留 2xΔx。","小角面积是 (Δx)²。"],
    steps: [
      "展开 (3+0.02)²−9，得 0.1204。",
      "切线给出的变化量是 6·0.02=0.12。",
      "真实值多出 0.0004，就是小角面积。",
    ],
    solution: math`\begin{gathered}\Delta y=0.1204,\quad dy=0.12\\\Delta y-dy=0.0004\end{gathered}`,
  },
  // p92 · §3-1 4
  {
    formulaIds: ["lagrange", "diff-power"],
    id: "p216", lessonId: "mvt", errorTag: "mean_value_theorem", kind: "证明题", difficulty: "challenge",
    title: "找出与割线平行的切线",
    formula: math`\begin{gathered}f(x)=3x^2-2x\\x\in[1,5]\end{gathered}`,
    prompt: "确认中值定理的条件，并找出切线和端点连线同斜率的位置。",
    explanation: "先算整段的平均坡度，再找某一点恰好一样陡。",
    hints: ["多项式在全体实数上连续可导。","计算 [f(5)−f(1)]/(5−1)。","令 f′(c) 等于这个结果。"],
    steps: [
      "闭区间连续、开区间可导，满足中值定理。",
      "平均坡度为 (65−1)/4=16。",
      "瞬时坡度是 6c−2，解 6c−2=16，得 c=3。",
    ],
    solution: math`f'(3)=16`,
  },
  // p92 · §3-1 5
  {
    formulaIds: ["rolle"],
    id: "p217", lessonId: "mvt", errorTag: "mean_value_theorem", kind: "证明题", difficulty: "challenge",
    title: "用四个零点数出三个驻点",
    formula: math`f(x)=(x+3)(x+1)(x-2)(x-4)`,
    prompt: "证明 f′ 恰有三个不同的实零点。",
    explanation: "一条光滑曲线两次碰到同一高度，中间至少有一次切线是平的。",
    hints: ["先列出 f 的四个零点。","每对相邻零点之间用一次罗尔定理。","f′ 的次数是多少？"],
    steps: [
      "f 的零点是 −3、−1、2、4。",
      "在三段相邻零点之间，罗尔定理各给出一个驻点，三点互不相同。",
      "导函数是三次多项式，不能有第四个不同实零点。",
    ],
    solution: math`(-3,-1),\quad(-1,2),\quad(2,4)`,
  },
  // p105 · §3-4 3(2)
  {
    id: "p218", lessonId: "extrema", errorTag: "monotonicity_extrema", kind: "推导题", difficulty: "applied",
    title: "找到先降后升的分界",
    formula: math`\begin{gathered}f(x)=3x+\frac{12}{x}\\x>0\end{gathered}`,
    prompt: "求单调区间和最小值。",
    explanation: "导数可以当作路牌，负号是下坡，正号是上坡。",
    hints: ["先求导并整理符号。","只考虑 x>0。","斜率由负变正的位置最低。"],
    steps: [
      "f′=3−12/x²，在定义域内仅 x=2 时为零。",
      "0<x<2 时导数负，x>2 时导数正。",
      "曲线先降后升，最小值 f(2)=12。",
    ],
    solution: math`\min_{x>0} f(x)=f(2)=12`,
  },
  // p115 · §3-5 1(4)
  {
    id: "p219", lessonId: "extrema", errorTag: "monotonicity_extrema", kind: "推导题", difficulty: "applied",
    title: "根号端点也要比较",
    formula: math`\begin{gathered}f(x)=x+2\sqrt{4-x}\\x\in[0,4]\end{gathered}`,
    prompt: "求区间上的最大值和最小值。",
    explanation: "找最高和最低的位置时，山路的起点和终点也有资格。",
    hints: ["先在 (0,4) 内求导。","让 f′=0，再补上 x=0 和 x=4。","比较这三个函数值。"],
    steps: [
      "f′=1−1/√(4−x)，所以内点候选是 x=3。",
      "f(0)=4，f(3)=5，f(4)=4。",
      "最大值 5 在 x=3，最小值 4 在两个端点取得。",
    ],
    solution: math`f_{\max}=5,\quad f_{\min}=4`,
  },
  // p124 · §3-6 1
  {
    id: "p220", lessonId: "curve-sketch", errorTag: "asymptotes", kind: "作图题", difficulty: "challenge",
    title: "画出有两个谷底的四次曲线",
    formula: math`y=x^4-8x^2`,
    prompt: "画草图并标出极值点和零点。",
    explanation: "先给图钉上几个重要的点，再按上坡和下坡把它们连起来。",
    hints: ["偶函数左右镜像。","提取因子求零点，再求导找驻点。","比较驻点两边的导数符号。"],
    steps: [
      "f=x²(x²−8)，所以零点是 0、±2√2，图像关于 y 轴对称。",
      "f′=4x(x²−4)，分界点为 −2、0、2，导数依次为负、正、负、正。",
      "两边谷底是 (±2,−16)，中间局部峰在 (0,0)，最外两端向上伸展。",
    ],
    solution: math`\text{zeros: }0,\ \pm2\sqrt2`,
    graph: { bounds: [-3.2, 3.2, -19, 18], branches: [[-3.2, 3.2, (x) => x ** 4 - 8 * x ** 2]], description: "四次函数参考图，两个谷底在横坐标负二与二，原点是局部峰顶" },
  },
  // p124 · §3-6 2
  {
    id: "p221", lessonId: "curve-sketch", errorTag: "asymptotes", kind: "作图题", difficulty: "challenge",
    title: "画一条向横轴慢慢贴近的曲线",
    formula: math`y=\frac{3x}{1+x^2}`,
    prompt: "画草图并标出极值点和渐近线。",
    explanation: "远处先看图贴近哪条线，近处再由导数决定转弯位置。",
    hints: ["分母恒正，函数还是奇函数。","看导数分子里 1−x² 的符号。","让 x 趋向两端无穷远。"],
    steps: [
      "函数经过原点，左右两半绕原点成中心对称。",
      "f′=3(1−x²)/(1+x²)²，因此从 −1 到 1 递增，其余两段递减。",
      "最低点 (−1,−3/2)，最高点 (1,3/2)。无穷远两端都趋近 y=0。",
    ],
    solution: math`f(-1)=-\tfrac32,\quad f(1)=\tfrac32`,
    graph: { bounds: [-6, 6, -1.8, 1.8], branches: [[-6, 6, (x) => 3 * x / (1 + x ** 2)]], description: "有理函数参考图，过原点，两端贴近横轴，在负一和一处转弯" },
  },
  // p124 · §3-6 3
  {
    id: "p222", lessonId: "curve-sketch", errorTag: "asymptotes", kind: "作图题", difficulty: "challenge",
    title: "画出向右移动的钟形曲线",
    formula: math`y=2e^{-(x-2)^2}`,
    prompt: "画草图并找出峰顶、拐点、水平渐近线。",
    explanation: "离 x=2 越远，指数越负，曲线就越贴近地面。",
    hints: ["先找指数最大的地方。","求两次导数找凹凸分界。","看左右远端的指数。"],
    steps: [
      "图像绕 x=2 左右对称，峰顶 (2,2)。左侧递增，右侧递减。",
      "f″ 的符号与 2(x−2)²−1 一致，在 x=2±1/√2 处换号。",
      "两端指数趋负无穷，函数值趋 0，水平渐近线是 y=0。",
    ],
    solution: math`x_{\mathrm{inf}}=2\pm\frac1{\sqrt2}`,
    graph: { bounds: [-1, 5, -0.25, 2.3], branches: [[-1, 5, (x) => 2 * Math.exp(-((x - 2) ** 2))]], description: "钟形曲线参考图，以横坐标二为对称轴，最高点的纵坐标为二" },
  },
  // p124 · §3-6 4
  {
    id: "p223", lessonId: "curve-sketch", errorTag: "asymptotes", kind: "作图题", difficulty: "challenge",
    title: "分开画竖直渐近线两边的图",
    formula: math`y=x^2+\frac{2}{x}`,
    prompt: "画出两支曲线，标出垂直渐近线和右支最低点。",
    explanation: "遇到没定义的 x=0，画笔要抬起来。",
    hints: ["先看 2/x 在零左右的符号。","导数可以化成 2(x³−1)/x²。","两端无穷远都由 x² 主导。"],
    steps: [
      "左边靠近 0 时曲线冲向负无穷，右边冲向正无穷，故 x=0 是垂直渐近线。",
      "导数在负半轴恒负。正半轴上先负后正，所以右支最低点是 (1,3)。",
      "当 |x| 很大时，2/x 趋于 0，两支都向上，逐渐贴近抛物线 y=x²。",
    ],
    solution: math`x=0,\qquad f(1)=3`,
    graph: { bounds: [-3.5, 3.5, -7, 13], branches: [[-3.5, -0.025, (x) => x ** 2 + 2 / x], [0.025, 3.5, (x) => x ** 2 + 2 / x]], description: "两支分开的参考曲线，竖直渐近线是纵轴，右支的最低点为一逗号三" },
  },
  // p145 · §4-1 2(2)
  {
    id: "p224", lessonId: "antiderivative", errorTag: "integral_power", kind: "推导题", difficulty: "applied",
    title: "把根号和幂写成同一语言",
    formula: math`\int 4x^2\sqrt{x}\,dx,\qquad x>0`,
    prompt: "求完整不定积分。",
    explanation: "根号也可以写成幂，这样就能像加积木一样把两个指数加起来。",
    hints: ["把根号写成 x 的 1/2 次幂。","合并同底数的幂。","给指数加 1，再除以新指数。"],
    steps: [
      "被积函数是 4x⁵ᐟ²。",
      "加一次幂得到 x⁷ᐟ²，再乘 4÷(7/2)=8/7。",
      "最后加上 C，把所有仅差一个常数的原函数都写出来。",
    ],
    solution: math`\frac87 x^{7/2}+C`,
  },
  // p145 · §4-1 2(10)
  {
    id: "p225", lessonId: "antiderivative", errorTag: "integral_power", kind: "推导题", difficulty: "applied",
    title: "先拆开平方再逐项积分",
    formula: math`\int (2x^2+3)^2\,dx`,
    prompt: "求不定积分。",
    explanation: "把一大包放不进积分公式的东西先拆成几件熟悉的小东西。",
    hints: ["平方展开时有中间项。","把多项式逐项积分。","常数 9 的原函数是 9x。"],
    steps: [
      "平方展开得 4x⁴+12x²+9。",
      "前两项积分得 4x⁵/5 和 4x³。",
      "把三项加在一起，加上积分常数。",
    ],
    solution: math`\frac45 x^5+4x^3+9x+C`,
  },
  // p150 · §4-2 2(7)
  {
    id: "p226", lessonId: "substitution", errorTag: "substitution", kind: "推导题", difficulty: "applied",
    title: "看见指数的导数在外面",
    formula: math`\int 6x e^{-3x^2}\,dx`,
    prompt: "求不定积分。",
    explanation: "指数里面的东西变化得有多快，外面的因子刚好记了这件事。",
    hints: ["设 u=−3x²。","计算 du。","比较 du 和 6x dx 的符号。"],
    steps: [
      "du=−6x dx，恰好与外面的 6x dx 差一个负号。",
      "积分变成 −∫eᵘdu。",
      "积分后把 u 换回 −3x²，加上 C。",
    ],
    solution: math`-e^{-3x^2}+C`,
  },
  // p150 · §4-2 2(11)
  {
    id: "p227", lessonId: "substitution", errorTag: "substitution", kind: "推导题", difficulty: "applied",
    title: "分子和分母导数只差一个倍数",
    formula: math`\int\frac{3x+6}{x^2+4x+9}\,dx`,
    prompt: "求不定积分。",
    explanation: "分母是一个整体，分子像是它的变化速度，把整体换成单个字母就简单了。",
    hints: ["设 u 等于分母。","u 的导数等于 2x+4。","分子等于 u′ 的 3/2 倍。"],
    steps: [
      "令 u=x²+4x+9，则 3x+6=(3/2)u′。",
      "原积分变成 (3/2)∫du/u。",
      "由于 u=(x+2)²+5 恒正，写成 ln u 即可。",
    ],
    solution: math`\frac32\ln(x^2+4x+9)+C`,
  },
  // p150 · §4-2 2(15)
  {
    id: "p228", lessonId: "substitution", errorTag: "substitution", kind: "推导题", difficulty: "challenge",
    title: "正切的导数就在积分里",
    formula: math`\int 4\tan^6 x\sec^2 x\,dx`,
    prompt: "在不穿过正切极点的任一区间求不定积分。",
    explanation: "外面的 sec²x 正好负责把 dx 换成 d(tan x)。",
    hints: ["想起 tan x 的导数。","令 u=tan x。","求 4u⁶ 的积分。"],
    steps: [
      "du=sec²x dx。",
      "积分变为 4∫u⁶du，得到 4u⁷/7。",
      "把 u 换回 tan x，再加 C。",
    ],
    solution: math`\frac47\tan^7 x+C`,
  },
  // p157 · §4-3 2
  {
    id: "p229", lessonId: "integration-by-parts", errorTag: "parts", kind: "推导题", difficulty: "applied",
    title: "对数单独出现也能分部",
    formula: math`\int \ln(3x)\,dx,\qquad x>0`,
    prompt: "求不定积分。",
    explanation: "虽然只有一个对数，但可以给它配一个看不见的因子 1。",
    hints: ["让 u=ln(3x)。","让 dv=dx。","算完 uv 后，还要减掉 ∫vdu。"],
    steps: [
      "u 求导变成 1/x，dv 积分变成 x。",
      "乘起来时 x 和 1/x 刚好抵消，剩 ∫1 dx。",
      "所以结果是 xln(3x)−x+C。",
    ],
    solution: math`x\ln(3x)-x+C`,
  },
  // p158 · §4-3 5
  {
    id: "p230", lessonId: "integration-by-parts", errorTag: "parts", kind: "推导题", difficulty: "applied",
    title: "把立方与对数拆开积分",
    formula: math`\int x^3\ln x\,dx,\qquad x>0`,
    prompt: "求不定积分。",
    explanation: "把对数拿去求导，它会变成容易约分的 1/x。",
    hints: ["让 u=ln x。","令 dv=x³ dx，得到 v=x⁴/4。","vdu 里有一个 x 可以约掉。"],
    steps: [
      "分部积分先写出 uv=x⁴ln x/4。",
      "剩下要减的积分是 ∫(x⁴/4)(1/x)dx=∫x³/4 dx。",
      "积分得 x⁴/16，再带上减号和常数。",
    ],
    solution: math`\frac{x^4}{4}\ln x-\frac{x^4}{16}+C`,
  },
  // p158 · §4-3 6
  {
    id: "p231", lessonId: "integration-by-parts", errorTag: "parts", kind: "推导题", difficulty: "applied",
    title: "分部两次把原积分带回来",
    formula: math`\int e^{-2x}\cos x\,dx`,
    prompt: "求完整的原函数。",
    explanation: "分部两次之后会碰到原积分，给它一个名字，像解普通方程一样移项。",
    hints: ["记原积分为 I。","第一次分部会出现 e⁻²ˣsin x 的积分。","对后一个积分也分部，然后把含 I 的项移到一侧。"],
    steps: [
      "记 J=∫e⁻²ˣsin x dx。第一次分部给 I=−e⁻²ˣcos x/2−J/2。",
      "再分部得 J=−e⁻²ˣsin x/2+I/2。推导中可把积分常数留到末尾。",
      "代回可得 5I/4=e⁻²ˣ(sin x−2cos x)/4，解出 I 后加 C。",
    ],
    solution: math`\frac{e^{-2x}}5(\sin x-2\cos x)+C`,
  },
  // p162 · §4-4 4
  {
    id: "p232", lessonId: "rational-integrals", errorTag: "partial_fractions", kind: "推导题", difficulty: "applied",
    title: "把一个难分式拆成两份",
    formula: math`\int\frac{4}{x(x^2+4)}\,dx`,
    prompt: "在 x≠0 的各区间求原函数。",
    explanation: "拆成两个各自认识的小分式，比分母一整串时更容易积分。",
    hints: ["先试 1/x 和 x/(x²+4)。","通分检查分子的常数项。","第二项看作 x²+4 的导数的一半。"],
    steps: [
      "1/x−x/(x²+4) 通分后分子是 4，正好等于原式。",
      "第一项积分是 ln|x|。",
      "第二项因为分母的导数是 2x，积分是 ln(x²+4)/2，记得减掉。",
    ],
    solution: math`\ln|x|-\tfrac12\ln(x^2+4)+C`,
  },
  // p168 · §4-5 2
  {
    id: "p233", lessonId: "rational-integrals", errorTag: "partial_fractions", kind: "推导题", difficulty: "applied",
    title: "配方后认出反正切",
    formula: math`\int\frac{6\,dx}{x^2-4x+13}`,
    prompt: "求不定积分。",
    explanation: "有些分母看起来杂乱，配方后就会露出熟悉的 1+u²。",
    hints: ["先配成 (x−2)²+9。","取 u=(x−2)/3。","分母提出 9，dx 则换成 3du。"],
    steps: [
      "平方配好后令 u=(x−2)/3，所以分母是 9(1+u²)。",
      "常数倍率为 6·3/9=2。",
      "积分得到 2arctan u，代回后加 C。",
    ],
    solution: math`2\arctan\left(\frac{x-2}{3}\right)+C`,
  },
  // p183 · §5-1
  {
    id: "p234", lessonId: "riemann", errorTag: "riemann_sample", kind: "推导题", difficulty: "applied",
    title: "把越来越长的和看成面积",
    formula: math`\lim_{n\to\infty}\frac1n\sum_{k=1}^n\left(\frac{k}{n}\right)^3`,
    prompt: "写出对应的定积分并求值。",
    explanation: "每项是一根细柱的面积，柱子越来越细时就会拼出整块面积。",
    hints: ["每根柱宽 1/n。","柱高等于右端点的立方。","整体从 0 铺到 1。"],
    steps: [
      "把区间 [0,1] 分成 n 段，第 k 段右端点是 k/n。",
      "每根柱高 (k/n)³，原式就是 f(x)=x³ 的右端点黎曼和的极限。",
      "连续函数 x³ 可积，算 [x⁴/4] 从 0 到 1，得 1/4。",
    ],
    solution: math`\int_0^1 x^3\,dx=\frac14`,
  },
  // p189 · §5-2 1
  {
    id: "p235", lessonId: "fundamental-theorem", errorTag: "integral_chain", kind: "推导题", difficulty: "applied",
    title: "上下两端一起移动怎么办",
    formula: math`\frac{d}{dx}\int_{x}^{x^2}\cos(3t)\,dt`,
    prompt: "求导数。",
    explanation: "上端移动会加上一段面积，下端移动会拿走一段面积，要分别看两头各移动多快。",
    hints: ["把积分拆成两个从 0 出发的积分。","在两个上限分别代入 cos(3t)。","上限 x² 还要乘 2x。"],
    steps: [
      "拆成从 0 到 x² 的积分，减去从 0 到 x 的积分。",
      "第一项应用积分基本定理与链式法则，得 2xcos(3x²)。",
      "第二项导数是 cos(3x)，扣掉它。",
    ],
    solution: math`2x\cos(3x^2)-\cos(3x)`,
  },
  // p196 · §5-3
  {
    id: "p236", lessonId: "definite-methods", errorTag: "definite_substitution", kind: "推导题", difficulty: "applied",
    title: "换变量时把两个端点也换掉",
    formula: math`\int_0^2\frac{2x}{1+x^2}\,dx`,
    prompt: "用换元求值，并写出两个新端点。",
    explanation: "换了积分变量，就像换了坐标，起点和终点也要用新坐标写。",
    hints: ["令 u=1+x²。","把 x=0 和 x=2 代入 u。","现在可以直接在 u 的区间算完。"],
    steps: [
      "du=2x dx，同时 x=0 对应 u=1，x=2 对应 u=5。",
      "原式变成从 1 到 5 积分 du/u。",
      "算 ln5−ln1，得 ln5。",
    ],
    solution: math`\int_1^5\frac{du}{u}=\ln5`,
  },
  // p205 · §5-4
  {
    id: "p237", lessonId: "improper-integrals", errorTag: "improper_integrals", kind: "证明题", difficulty: "challenge",
    title: "无穷远的面积不一定无穷",
    formula: math`\int_2^\infty\frac{6}{x^3}\,dx`,
    prompt: "从截断定义判断收敛并求值。",
    explanation: "先拿一把有限长的尺量，再把尺的终点越推越远。",
    hints: ["先把上限写成有限的 R。","6/x³ 的原函数是 −3/x²。","最后让 R 走向无穷。"],
    steps: [
      "从 2 积到 R 得 3/4−3/R²。",
      "R 越大，被扣掉的 3/R² 越接近 0。",
      "极限是有限的 3/4，所以积分收敛。",
    ],
    solution: math`\lim_{R\to\infty}\left(\frac34-\frac3{R^2}\right)=\frac34`,
  },
  // p207 · §5-4 5
  {
    id: "p238", lessonId: "improper-integrals", errorTag: "improper_integrals", kind: "证明题", difficulty: "challenge",
    title: "对数在零点附近降得很深",
    formula: math`\int_0^1\ln(4x)\,dx`,
    prompt: "判断积分是否收敛并求值。",
    explanation: "图往下很深，但靠近零点的那些条带也越来越窄，得把两件事一起算。",
    hints: ["把左端换成 ε>0。","原函数是 xln(4x)−x。","计算 εln ε 的极限。"],
    steps: [
      "在 [ε,1] 上积分得 ln4−1−εln(4ε)+ε。",
      "εln ε 写成 ln ε/(1/ε)，洛必达给导数比 −ε，趋向 0。εln4 和 ε 也趋向 0。",
      "于是总极限等于 ln4−1，积分收敛。",
    ],
    solution: math`\int_0^1\ln(4x)\,dx=\ln4-1`,
  },
  // p222 · §6-2
  {
    id: "p239", lessonId: "integral-area", errorTag: "area_bounds", kind: "推导题", difficulty: "applied",
    title: "抛物线和直线之间的封闭面积",
    formula: math`\begin{gathered}y=x^2,\quad y=3x\end{gathered}`,
    prompt: "找出交点、判断上方曲线，再求面积。",
    explanation: "把整块区域切成细细的竖条，高度是上面减下面。",
    hints: ["令两个 y 相等。","在交点之间试一个 x。","把每条的高度积分起来。"],
    steps: [
      "x²=3x，交点的横坐标是 0 和 3。",
      "0<x<3 时 3x−x²=x(3−x)>0，直线在上。",
      "积 3x−x² 得 [3x²/2−x³/3]，代上下端点得到 9/2。",
    ],
    solution: math`A=\int_0^3(3x-x^2)\,dx=\frac92`,
  },
  // p225、229 · §6-2 旋转体
  {
    id: "p240", lessonId: "integral-volume", errorTag: "volume_slices", kind: "推导题", difficulty: "applied",
    title: "从一叠圆盘算旋转体的体积",
    formula: math`\begin{gathered}y=2\sqrt{x},\quad 0\le x\le 3\\\text{axis of rotation: }x\end{gathered}`,
    prompt: "将指定区间内曲线和横轴之间的区域绕 x 轴旋转，求所得立体的体积。",
    explanation: "每条竖线转一圈，会扫出一个圆盘。",
    hints: ["圆盘的半径就是 y。","圆盘面积是 π 乘半径的平方。","把圆盘面积从 0 加到 3。"],
    steps: [
      "在 x 处的半径是 2√x。",
      "截面积 π(2√x)²=4πx。",
      "沿 x 累加截面积，得到 [2πx²] 从 0 到 3，等于 18π。",
    ],
    solution: math`V=\int_0^3 4\pi x\,dx=18\pi`,
  },
  // p235 · §6-3 1
  {
    id: "p241", lessonId: "definite-methods", errorTag: "integral_work", kind: "推导题", difficulty: "applied",
    title: "弹簧越拉越吃力，功怎么加",
    formula: math`\begin{gathered}F(x)=50x\ \mathrm{N}\\0.1\le x\le 0.3\ \mathrm{m}\end{gathered}`,
    prompt: "求把弹簧从伸长 0.1 米拉到 0.3 米做的功。",
    explanation: "每拉一小段，用的力都不一样，所以一小段一小段地加。",
    hints: ["一小段功是 F(x)dx。","积分上下限是两次伸长量。","单位是焦耳。"],
    steps: [
      "把 F=50x 乘上一小段距离 dx，然后在 0.1 与 0.3 之间累加。",
      "∫50x dx 的原函数是 25x²。",
      "两头代入，算 25(0.09−0.01)，得到 2 焦耳。",
    ],
    solution: math`W=\int_{0.1}^{0.3}50x\,dx=2\ \mathrm J`,
  },
  // p248 · §7-1 2(3)
  {
    id: "p242", lessonId: "ode-basics", errorTag: "ode_basics", kind: "证明题", difficulty: "challenge",
    title: "验算这个函数是不是方程的解",
    formula: math`\begin{gathered}y=x^2e^{2x}\\y''-4y'+4y=0\end{gathered}`,
    prompt: "判断指定函数是否满足方程。",
    explanation: "就像把钥匙放进锁里试一下，把函数和它的导数实际代回去看看。",
    hints: ["先分别求 y′ 和 y″。","三项都有公共因子 e²ˣ。","约掉同类项后检查还剩什么。"],
    steps: [
      "y′=(2x+2x²)e²ˣ。",
      "再求一次导数，得到 y″=(2+8x+4x²)e²ˣ。",
      "代回后，x 和 x² 项都抵消，剩 2e²ˣ≠0，所以它不是这个方程的解。",
    ],
    solution: math`y''-4y'+4y=2e^{2x}`,
  },
  // p251 · §7-2 1(1)
  {
    id: "p243", lessonId: "separable-odes", errorTag: "separable_odes", kind: "推导题", difficulty: "applied",
    title: "分离变量时留住常数解",
    formula: math`\begin{gathered}xy'=2y\ln y\\x>0,\quad y>0\end{gathered}`,
    prompt: "求通解。",
    explanation: "与其除以可能为零的 ln y，不如直接给 ln y 起个新名字，常数解也会一起留下。",
    hints: ["令 u=ln y，则 u′=y′/y。","新方程能整理成 (x⁻²u)′=0。","最后做指数运算换回 y。"],
    steps: [
      "由于 y>0，方程可以除以 y，得到 xu′=2u。",
      "由乘积求导，(x⁻²u)′=x⁻²(u′−2u/x)=0，因此 u=Cx²。",
      "y=eᵘ，所以 y=e^(Cx²)，C=0 时也包含 y=1。",
    ],
    solution: math`y=e^{Cx^2},\quad C\in\mathbb R`,
  },
  // p251 · §7-2 1(9)
  {
    id: "p244", lessonId: "separable-odes", errorTag: "separable_odes", kind: "推导题", difficulty: "challenge",
    title: "把左边认成一个整体的导数",
    formula: math`(y+2)^2 y'+4x^3=0`,
    prompt: "求隐式通解，并说明它在哪些开区间能解出可导的 y。",
    explanation: "看到 (y+2)²y′，就像看到一个立方用链式法则拆开。",
    hints: ["(y+2)³ 求导会多出一个 3。","4x³ 是 x⁴ 的导数。","若 y=−2，回原方程检查。"],
    steps: [
      "原式就是对 (y+2)³/3+x⁴ 求导等于 0。",
      "积分得到 (y+2)³=C−3x⁴，取实立方根即可。",
      "在 C−3x⁴ 不为零的开区间可以直接求导。若等于零且 x≠0，原方程要求 4x³=0，矛盾；C=0 且 x=0 时，实立方根解在零点仍可导。",
    ],
    solution: math`(y+2)^3=C-3x^4`,
  },
  // p266 · §7-4 1(1)
  {
    id: "p245", lessonId: "linear-first-order", errorTag: "linear_first_order", kind: "推导题", difficulty: "challenge",
    title: "乘一个因子让左侧变成一整项",
    formula: math`y'+2y=e^{-2x}`,
    prompt: "求通解。",
    explanation: "给每一项乘上同一个因子，左边就能合成一个乘积的导数。",
    hints: ["常系数 2 对应积分因子 e²ˣ。","右侧的指数会抵消。","对乘积积分之后，再除回去。"],
    steps: [
      "两边乘 e²ˣ，左边变成 (e²ˣy)′。",
      "右侧变成 1，于是 e²ˣy=x+C。",
      "两边除 e²ˣ，就得到所有解。",
    ],
    solution: math`y=(x+C)e^{-2x}`,
  },
  // p266 · §7-4 1(2)
  {
    id: "p246", lessonId: "linear-first-order", errorTag: "linear_first_order", kind: "推导题", difficulty: "applied",
    title: "认出方程里藏着乘积法则",
    formula: math`xy'+y=3x^2+4x+5`,
    prompt: "在 x≠0 的区间求通解。",
    explanation: "左边有 xy′ 也有 y，这两项刚好是把 xy 求导得到的。",
    hints: ["写出 (xy)′。","积分右边的三个多项式项。","得到 xy 后再除以 x。"],
    steps: [
      "把左边整体写成 (xy)′。",
      "右边逐项积分，得到 x³+2x²+5x+C。",
      "除以 x，得 y=x²+2x+5+C/x。",
    ],
    solution: math`y=x^2+2x+5+\frac Cx`,
  },
  // p266 · §7-4 1(7)
  {
    id: "p247", lessonId: "linear-first-order", errorTag: "linear_first_order", kind: "推导题", difficulty: "applied",
    title: "指数因子恰好配上右边",
    formula: math`y'+4xy=12x`,
    prompt: "求通解。",
    explanation: "想办法把左边凑成一整个导数，再看右边能不能也凑成。",
    hints: ["4x 的原函数是 2x²。","积分因子是 e^(2x²)。","乘完后右边是该因子导数的三倍。"],
    steps: [
      "方程乘 e^(2x²)，左边是 (e^(2x²)y)′。",
      "右边 12xe^(2x²) 等于 3(e^(2x²))′。",
      "积分并除回因子后，常数项 3 留在外面。",
    ],
    solution: math`y=3+Ce^{-2x^2}`,
  },
  // p275 · §7-5 1(1)
  {
    id: "p248", lessonId: "ode-order-reduction", errorTag: "ode_order_reduction", kind: "推导题", difficulty: "applied",
    title: "把二阶导数往回走两步",
    formula: math`y''=6x+4\sin x`,
    prompt: "求通解。",
    explanation: "二阶导数记录了两次变化，往回积分两次，每次都会留下一个自由常数。",
    hints: ["先积分得到 y′。","sin x 积分得到 −cos x。","第二次积分时，一次积分的常数会变成一次项。"],
    steps: [
      "第一次积分得 y′=3x²−4cos x+C₁。",
      "第二次把三项分别积分，得到 x³−4sin x+C₁x。",
      "再加 C₂，两个常数一起保留。",
    ],
    solution: math`y=x^3-4\sin x+C_1x+C_2`,
  },
  // p275 · §7-5 1(4)
  {
    id: "p249", lessonId: "ode-order-reduction", errorTag: "ode_order_reduction", kind: "推导题", difficulty: "applied",
    title: "先把斜率当成新未知量",
    formula: math`y''=2(1+(y')^2)`,
    prompt: "求局部通解。",
    explanation: "方程只问斜率怎么变，所以先解斜率，再把它积分成原来的函数。",
    hints: ["令 p=y′。","对 p′=2(1+p²) 分离变量。","写出 tan 的原函数，注意绝对值。"],
    steps: [
      "换成 p 后，积分给 arctan p=2x+C₁，于是 p=tan(2x+C₁)。",
      "积分 tan 时，凑出 −ln|cos|。",
      "内层导数是 2，所以要乘 1/2，且解在 cos 不为零的区间上成立。",
    ],
    solution: math`y=-\tfrac12\ln|\cos(2x+C_1)|+C_2`,
  },
  // p275 · §7-5 1(6)
  {
    id: "p250", lessonId: "ode-order-reduction", errorTag: "ode_order_reduction", kind: "推导题", difficulty: "applied",
    title: "先积分出斜率，再积分出函数",
    formula: math`xy''+2y'=0,\qquad x>0`,
    prompt: "求通解。",
    explanation: "先找一个整体，其导数能和左边对应，这样可以少解一次新方程。",
    hints: ["乘上 x。","看左边能否写成 (x²y′)′。","再积分 x⁻²。"],
    steps: [
      "乘 x 后得到 x²y″+2xy′=0，正是 (x²y′)′=0。",
      "所以 y′=C₁/x²。",
      "再积分得到 −C₁/x+C₂，把 −C₁ 重命名为常数 A。",
    ],
    solution: math`y=\frac Ax+B`,
  },
  // p289 · §7-7 2(1)
  {
    id: "p251", lessonId: "homogeneous-second-order", errorTag: "homogeneous_second_order", kind: "推导题", difficulty: "applied",
    title: "两个不同实根各带来一个解",
    formula: math`y''-7y'+12y=0`,
    prompt: "求通解。",
    explanation: "对指数求导只会把指数前面多乘一个数，所以可以先解关于那个数的二次方程。",
    hints: ["试 y=e^(rx)。","特征方程是 r²−7r+12=0。","两个根对应两个独立的指数解。"],
    steps: [
      "代入指数试探解，约掉 e^(rx)，得特征方程。",
      "分解成 (r−3)(r−4)，得根 3 与 4。",
      "e³ˣ 和 e⁴ˣ 线性无关，按任意比例相加就是通解。",
    ],
    solution: math`y=C_1e^{3x}+C_2e^{4x}`,
  },
  // p289 · §7-7 2(4)
  {
    id: "p252", lessonId: "homogeneous-second-order", errorTag: "homogeneous_second_order", kind: "推导题", difficulty: "applied",
    title: "用衰减的正弦和余弦写通解",
    formula: math`y''+4y'+13y=0`,
    prompt: "求实通解。",
    explanation: "复根的实部管整体衰减，虚部管波形振得多快。",
    hints: ["写出特征方程。","配成 (r+2)²+9。","实部是 −2，虚部的绝对值是 3。"],
    steps: [
      "特征方程 (r+2)²+9=0 给 r=−2±3i。",
      "共轭指数解的实部与虚部，分别是 e⁻²ˣcos(3x) 和 e⁻²ˣsin(3x)。",
      "两者独立，乘任意实常数后相加。",
    ],
    solution: math`\begin{gathered}y=e^{-2x}[C_1\cos(3x)\\+C_2\sin(3x)]\end{gathered}`,
  },
  // p289 · §7-7 2(5)
  {
    id: "p253", lessonId: "homogeneous-second-order", errorTag: "homogeneous_second_order", kind: "推导题", difficulty: "applied",
    title: "重根时怎么找到第二个解",
    formula: math`y''+6y'+9y=0`,
    prompt: "求通解。",
    explanation: "只写两次同样的指数，实际上只有一个方向。乘一个 x 才能补上第二种变化。",
    hints: ["特征式可以写成 (r+3)²。","试写 y=e⁻³ˣu。","代回看 u 满足什么。"],
    steps: [
      "唯一特征根是 −3，令 y=e⁻³ˣu。",
      "求导代回，含 u 和 u′ 的项全部抵消，只剩 e⁻³ˣu″=0。",
      "u″=0 意味着 u=C₁+C₂x，所以得完整通解。",
    ],
    solution: math`y=e^{-3x}(C_1+C_2x)`,
  },
  // p294 · §7-8 1(1)
  {
    id: "p254", lessonId: "nonhomogeneous-second-order", errorTag: "nonhomogeneous_second_order", kind: "推导题", difficulty: "applied",
    title: "右边撞上齐次解时多乘一个 x",
    formula: math`y''-y=6e^x`,
    prompt: "求通解。",
    explanation: "直接试 Aeˣ 时，左边会把它抵消，因为 eˣ 已经是齐次解。试乘一个 x，让它留下一部分。",
    hints: ["先找齐次解。","试特解 Ax eˣ。","代入后看左侧给几倍 eˣ。"],
    steps: [
      "齐次方程特征根为 1 和 −1。",
      "试 yₚ=Axeˣ，算得 yₚ″−yₚ=2Aeˣ，所以 A=3。",
      "把特解加上齐次通解。",
    ],
    solution: math`y=C_1e^x+C_2e^{-x}+3xe^x`,
  },
  // p294 · §7-8 1(3)
  {
    id: "p255", lessonId: "nonhomogeneous-second-order", errorTag: "nonhomogeneous_second_order", kind: "推导题", difficulty: "applied",
    title: "给多项式右端配出特解",
    formula: math`y''+4y=8x^2+4`,
    prompt: "求通解。",
    explanation: "先猜一个同样次数的多项式，再调每个系数，直到左边刚好给出右边。",
    hints: ["齐次部分给出 cos(2x) 与 sin(2x)。","设特解 ax²+bx+c。","比较 x²、x 和常数三类系数。"],
    steps: [
      "代入后得到 4ax²+4bx+2a+4c。",
      "和右端比系数，得 a=2、b=0、c=0。",
      "特解为 2x²，加上齐次通解即可。",
    ],
    solution: math`\begin{gathered}y=2x^2+C_1\cos(2x)\\+C_2\sin(2x)\end{gathered}`,
  },
] satisfies Omit<WrittenProblem, "errorLabel">[];

import type { WrittenProblem } from "./learning";

const math = String.raw;
type Entry = Omit<WrittenProblem, "errorLabel">;

// JC935 纸书第 20–23 页，习题 1-4。
const worked = [
  {
    id: "jc935-1-4-1", source: "同济习题 1-4 第 1 题",
    lessonId: "limit-laws", errorTag: "infinite_limits",
    kind: "推导题", difficulty: "basic",
    title: "无穷小作除法会留下什么", prompt: "判断极限是不是零，并说明两个无穷小的商是否一定是无穷小。",
    formula: math`\lim_{x\to2}\frac{6(x-2)^2}{4(x-2)^2}`,
    solution: math`\frac32`,
    explanation: "两段长度一起缩短，比例可以一直保持不变。", commonMistake: "不要把 0/0 当成计算结果。",
    hints: ["分别看分子和分母。","靠近 2 时允许 x≠2。","约掉共同的平方。"],
    steps: ["分子和分母在 x→2 时都趋于零。", "对 x≠2 约掉 (x−2)²，商恒为 3/2。", "极限是非零常数，所以两个无穷小的商不一定是无穷小。"],
  },
  {
    id: "jc935-1-4-2-1", source: "同济习题 1-4 第 2 题（1）",
    lessonId: "limit-laws", errorTag: "infinite_limits",
    kind: "证明题", difficulty: "applied",
    title: "约分以后证明它越来越小", prompt: "用 ε–δ 定义证明 f 在 x→5 时是无穷小。",
    formula: math`f(x)=\frac{x^2-25}{x+5}`,
    solution: math`\delta=\min(1,\varepsilon),\quad\lim_{x\to5}f(x)=0`,
    explanation: "先把多余的因子消掉，剩下的正好是离 5 的距离。", commonMistake: "全式在 x=−5 无定义，讨论 x→5 时只需控制靠近 5 的点。",
    hints: ["把分子拆成平方差。","x 在 5 附近时分母不为零。","取 δ 不超过 1 也可以。"],
    steps: ["在 x=5 的足够小邻域内，x+5≠0，所以 f=x−5。", "任给 ε>0，可取 δ=min(1,ε)，保证所在邻域内约分合法。", "当 0<|x−5|<δ，便有 |f(x)|=|x−5|<ε。"],
  },
  {
    id: "jc935-1-4-2-2", source: "同济习题 1-4 第 2 题（2）",
    lessonId: "limit-laws", errorTag: "infinite_limits",
    kind: "证明题", difficulty: "applied",
    title: "越来越窄的带子困住振荡", prompt: "用定义证明 x→2 时这个函数是无穷小。",
    formula: math`f(x)=3(x-2)\cos\frac1{x-2}`,
    solution: math`\delta=\varepsilon/3,\quad f(x)\to0`,
    explanation: "余弦一直上下摆动，但它能摆到多高由离 2 的距离决定。", commonMistake: "余弦因子本身没有极限，不能单独代入后用乘积极限定理。",
    hints: ["余弦的绝对值不超过 1。","先给 ","f(x)"," 找上界。","让 3","x−2","<ε。"],
    steps: ["对 x≠2，有 |f(x)|≤3|x−2|。", "给定 ε>0，取 δ=ε/3。", "若 0<|x−2|<δ，则 |f(x)|<ε，因此极限为零。"],
  },
  {
    id: "jc935-1-4-3", source: "同济习题 1-4 第 3 题",
    lessonId: "limit-laws", errorTag: "infinite_limits",
    kind: "证明题", difficulty: "challenge",
    title: "爆大的倒数能不能压过常数", prompt: "证明 x→1 时 |f(x)|→+∞，再给出一个保证 |f(x)|>700 的距离条件。",
    formula: math`f(x)=\frac2{x-1}-3`,
    solution: math`\begin{gathered}\delta=\frac2{M+3}\\0<|x-1|<\frac{2}{703}\end{gathered}`,
    explanation: "离 1 越近，倒数越大，固定减掉的 3 总能被超过。", commonMistake: "不能把 |f| 趋于无穷直接写成 f→+∞，这道题两侧符号不同。",
    hints: ["先取绝对值。","用倒三角不等式得下界。","先解一般的门槛 M。"],
    steps: ["|f(x)|≥2/|x−1|−3。", "对任意 M>0，取 δ=2/(M+3)，就能保证 |f(x)|>M。", "将门槛换成 700，得到 0<|x−1|<2/703。"],
  },
  {
    id: "jc935-1-4-4-1", source: "同济习题 1-4 第 4 题（1）",
    lessonId: "limit-laws", errorTag: "infinite_limits",
    kind: "推导题", difficulty: "basic",
    title: "把远处的分式拆成固定值和小尾巴", prompt: "计算极限并说明哪一部分趋于零。",
    formula: math`\lim_{|x|\to\infty}\frac{5x-7}{x}`,
    solution: math`5`,
    explanation: "把固定高度和会缩小的那点变化拆开看。", commonMistake: "不要把分子和分母都趋无穷当成它们的商也趋于无穷。",
    hints: ["用分母分别除分子两项。","看 7/","x","。","常数部分不变。"],
    steps: ["把分式拆成 5−7/x。", "当 |x|→∞ 时，|7/x|→0。", "所以两端都趋向 5。"],
  },
  {
    id: "jc935-1-4-4-2", source: "同济习题 1-4 第 4 题（2）",
    lessonId: "limit-laws", errorTag: "infinite_limits",
    kind: "推导题", difficulty: "basic",
    title: "平方差化简后再代入", prompt: "求极限并说明能否约分。",
    formula: math`\lim_{x\to1}\frac{9-x^2}{3-x}`,
    solution: math`4`,
    explanation: "看出分子是两个因子相乘，就可以把一个因子去掉。", commonMistake: "不要把 3+x 写成 3−x，两个因子的符号各不相同。",
    hints: ["先分解 9−x²。","在 1 附近检查 3−x≠0。","剩下的式子可以代入 1。"],
    steps: ["9−x²=(3−x)(3+x)。", "在 1 的邻域内 3−x≠0，分式恒等于 3+x。", "一次函数连续，极限为 3+1=4。"],
  },
  {
    id: "jc935-1-4-6", source: "同济习题 1-4 第 6 题",
    lessonId: "limit-laws", errorTag: "infinite_limits",
    kind: "证明题", difficulty: "challenge",
    title: "无界是不是每一步都变得很大", prompt: "证明 f 在实数范围无界，并判断 x→+∞ 时是否有 |f(x)|→+∞。",
    formula: math`f(x)=(2x+1)\sin x`,
    solution: math`\begin{gathered}x_k=2k\pi+\pi/2\\z_k=k\pi,\quad f(z_k)=0\end{gathered}`,
    explanation: "这条曲线的峰顶越来越高，但它还会一次次回到横轴。", commonMistake: "无界只要有一些值很大，绝对值趋无穷要求所有足够远的点都很大。",
    hints: ["选 sin x=1 的一列点。","另选 sin x=0 的点。","分别判断两条路的函数值。"],
    steps: ["取 xₖ=2kπ+π/2，f(xₖ)=2xₖ+1→+∞，故无界。", "再取 zₖ=kπ，任意远处都有 f(zₖ)=0。", "因此不存在“超过某个位置后，所有函数值的绝对值都超过任意门槛”的性质。"],
  },
  {
    id: "jc935-1-4-7", source: "同济习题 1-4 第 7 题",
    lessonId: "limit-laws", errorTag: "infinite_limits",
    kind: "证明题", difficulty: "challenge",
    title: "在极点附近找高点和零点", prompt: "判断 f 是否有界，并判断 x→0⁺ 时 |f(x)| 是否趋于无穷。",
    formula: math`f(x)=\frac2x\cos\frac1x,\quad 0<x\le1`,
    solution: math`\begin{gathered}x_k=(2k\pi)^{-1}\\z_k=(2k\pi+\pi/2)^{-1}\end{gathered}`,
    explanation: "离零近时，倒数像越来越大的放大器，但遇上余弦的零点仍然得到零。", commonMistake: "光看到 1/x 越来越大不够，另一个因子可以等于零。",
    hints: ["以 t=1/x 观察余弦。","选择 t=2kπ 和 t=2kπ+π/2。","两列 x 都会从右侧靠近零。"],
    steps: ["k≥1 时 xₖ=1/(2kπ) 在定义域内，f(xₖ)=4kπ→+∞，所以无界。", "取 zₖ=1/(2kπ+π/2)，得到 f(zₖ)=0。", "zₖ→0⁺，但对应的值始终是零，因此 |f(x)| 不趋于无穷。"],
  },
  {
    id: "jc935-1-4-8", source: "同济习题 1-4 第 8 题",
    lessonId: "curve-sketch", errorTag: "asymptotes",
    kind: "推导题", difficulty: "applied",
    title: "找水平和竖直渐近线", prompt: "找齐图像的渐近线，说明它们的依据。",
    formula: math`f(x)=\frac{7}{9-x^2}`,
    solution: math`y=0,\quad x=-3,\quad x=3`,
    explanation: "远处看图像贴近哪条平线，靠近断点看它会不会直冲上去或下去。", commonMistake: "分母为零只是候选条件。先检查能否约分，才知道是洞还是竖直渐近线。",
    hints: ["先让 ","x"," 变大。","令分母等于零。","核对分子在候选点是否也为零。"],
    steps: ["当 |x|→∞，分母的绝对值越来越大，所以 f→0。", "分母在 ±3 为零，分子不为零，因此每个断点附近 |f| 都趋无穷。", "这给出水平渐近线 y=0 与两条竖直渐近线 x=±3；其余有限点函数连续，且两端极限有限，不会有斜渐近线。"],
  },
] satisfies Entry[];

const inputs = [
  { aim: "x\\to2", description: "两侧靠近 2", parameter: "\\delta>0", range: "0<|x-2|<\\delta", cue: "取 2 左右的去心邻域，排除正中那个点。" },
  { aim: "x\\to2^+", description: "从右侧靠近 2", parameter: "\\delta>0", range: "0<x-2<\\delta", cue: "右侧的点满足 x>2，所以用 x−2 量正距离。" },
  { aim: "x\\to2^-", description: "从左侧靠近 2", parameter: "\\delta>0", range: "0<2-x<\\delta", cue: "左侧的点满足 x<2，所以用 2−x 量正距离。" },
  { aim: "|x|\\to\\infty", description: "同时看两个远端", parameter: "R>0", range: "|x|>R", cue: "用 |x|>R 同时抓住正、负两个方向的远端。" },
  { aim: "x\\to+\\infty", description: "只看右侧远端", parameter: "R>0", range: "x>R", cue: "往右走要超过正门槛 R，所以使用 x>R。" },
  { aim: "x\\to-\\infty", description: "只看左侧远端", parameter: "R>0", range: "x<-R", cue: "往左走要越过 −R，所以使用 x<−R，而 R 自己仍是正数。" },
] as const;

const outputs = [
  { aim: "-3", description: "趋于 −3", parameter: "\\varepsilon>0", range: "|f(x)+3|<\\varepsilon", cue: "输出要靠近 −3，任给正容差 ε，要求 |f(x)+3|<ε。", mistake: "不要写成 |f(x)−3|，要量的是到 −3 的距离。" },
  { aim: "\\pm\\infty", description: "绝对值趋于无穷", parameter: "M>0", range: "|f(x)|>M", cue: "输出只需要够大，无论正负，因此要求 |f(x)|>M。", mistake: "绝对值趋于无穷允许两侧符号不同，不能直接改写成 f(x)>M。" },
  { aim: "+\\infty", description: "趋于正无穷", parameter: "M>0", range: "f(x)>M", cue: "输出必须越过正门槛 M，所以用 f(x)>M。", mistake: "写成 |f(x)|>M 会把很大的负数也算进来。" },
  { aim: "-\\infty", description: "趋于负无穷", parameter: "M>0", range: "f(x)<-M", cue: "输出要落到 −M 以下，M 本身仍取正数。", mistake: "负无穷对应 f(x)<−M，别把不等号写成大于。" },
] as const;

// Row-major order matches the 24 source cells. Each variant asks for one quantified statement.
const definitions: Entry[] = inputs.flatMap((input, row) =>
  outputs.map((output, column) => {
    const part = row * outputs.length + column + 1;
    const formula = column === 1
      ? "\\lim_{" + input.aim + "}|f(x)|=+\\infty"
      : "\\lim_{" + input.aim + "}f(x)=" + output.aim;
    const solution = "\\begin{gathered}\\forall " + output.parameter + ",\\ \\exists " + input.parameter
      + "\\\\ \\forall x\\in D_f:\\\\" + input.range + "\\Longrightarrow " + output.range + "\\end{gathered}";
    return {
      id: "jc935-1-4-5-" + part,
      source: "同济习题 1-4 第 5 题（第 " + (row + 1) + " 行第 " + (column + 1) + " 列）",
      lessonId: "limit-laws",
      errorTag: "infinite_limits",
      kind: "证明题",
      difficulty: "applied",
      title: input.description + "，输出 " + output.description,
      prompt: "把题给的极限写成带量词和不等式的定义，说明先选什么、再找什么。",
      formula,
      solution,
      explanation: "先由对方指定输出要多近或多大，再找一个输入范围，让这个范围内每个可用的输入都符合要求。",
      hints: ["先确定输出目标对应的容差或门槛。", "再判断输入从哪边接近。", "先写任意的输出要求，再写存在的输入范围。"],
      steps: [output.cue, input.cue, "为每个输出要求找到一个输入门槛。只要定义域内的 x 满足输入范围，就必须满足输出要求。"],
      commonMistake: output.mistake + " 注意输入门槛可以随输出要求变化。",
    };
  }),
);

export const tongjiInfinitesimals = [
  ...worked.slice(0, 6),
  ...definitions,
  ...worked.slice(6),
];

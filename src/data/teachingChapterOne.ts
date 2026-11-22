import type { TeachingCheck, TeachingLesson, TeachingStep, TeachingTransfer } from "./teaching";

const math = String.raw;

interface Pilot extends TeachingLesson {
  strategy: string;
  target: string;
  prerequisites: string[];
  referenceAnswer: number;
}

function check(
  prompt: string,
  options: [string, string, string],
  correct: 0 | 1 | 2,
  feedback: [string, string, string],
  prerequisite: string,
): TeachingCheck {
  return { prompt, choices: options, correct, feedback, prerequisite };
}

function transfer(
  prompt: string, answer: number, solution: string, remediation: string,
  signFeedback = remediation,
): TeachingTransfer {
  return { prompt, answer, solution, remediation, signFeedback };
}

function notice(goal: string, plain: string, formula: string, detail: string, quiz: TeachingCheck): TeachingStep {
  return { id: "choose", goal, plain, formula, detail, check: quiz };
}

function apply(goal: string, plain: string, formula: string, detail: string, quiz: TeachingTransfer): TeachingStep {
  return { id: "apply", goal, plain, formula, detail, transfer: quiz };
}

export const chapterOnePilotTeaching = {
  p1: {
    strategy: "cancel", target: "会区分某个点算不出来和靠近它时可以计算。",
    prerequisites: ["平方差：A²−B²=(A−B)(A+B)。", "约分只对不等于零的公共因子有效。"],
    referenceAnswer: 2,
    solution: math`\lim_{x\to1}\frac{(x-1)(x+1)}{x-1}=\lim_{x\to1}(x+1)=2`,
    steps: [
      notice("找出上下都带着的因子",
        "直接在目标点计算会碰到零分母。把上面拆成两块，就能看看有没有和下面重复的那一块。",
        math`x^2-1=(x-1)(x+1)`,
        "平方差用一减一加两组括号，展开时中间的两项刚好相消。",
        check("若分子是 a²−b²，想约掉 a−b，第一件事做什么？",
          ["把平方分别去掉", "把分子写成乘积", "把分母设成零"], 1,
          ["平方不能直接删。先找能乘回原式的两个因子。", "对，约的是整块乘法因子。", "设成零反而不能除。先把分子拆成乘积。"],
          "像 6/3 可以看作 (3×2)/3，上下的 3 是同一个因子。")),
      apply("在点的旁边约分，再看靠近哪里",
        "极限看的是附近。只要还没踩到目标点，共同因子就可以约掉。",
        math`x\ne1:\quad\frac{x^2-1}{x-1}=x+1`,
        "原式在 1 无定义，化简得到的连续函数在附近与原式相等，所以极限相同。",
        transfer("新题：x 趋近 3 时，(x²−9)/(x−3) 的极限是多少？", 6,
          math`\lim_{x\to3}(x+3)=6`, "把 9 看成 3²。上下相同的一块消掉后，检查分子里另一个括号。")),
    ],
  },
  p3: {
    strategy: "sine-scale", target: "会让正弦里面的角度与分母匹配。",
    prerequisites: ["角度用弧度。", "角度趋零时，正弦除以同一个角度趋近 1。"],
    referenceAnswer: 3 / 5,
    solution: math`\lim_{x\to0}\frac{\sin3x}{5x}=\frac35`,
    steps: [
      notice("先看正弦实际吃进去的角度",
        "正弦像一个机器。要用那个熟悉的极限，正弦机的输入和下面除的数要是同一个。",
        math`\frac{\sin(3x)}{3x}\longrightarrow1`,
        "弧度下这是第一个重要极限。角度整体是 3x，也会随 x 趋近 0。",
        check("如果机器里是 sin(7t)，哪一个分母刚好匹配？",
          ["t", "7", "7t"], 2,
          ["t 少乘了 7。看整个括号。", "7 只是倍数，输入还随 t 变。", "对，整个输入都要写在下面。"],
          "sin(A)/A 上下的 A 必须是同一个量。先圈出正弦括号里的完整内容。")),
      apply("换成匹配的分母，同时把倍数补回来",
        "分母改了，原分数的大小也跟着改。要在外面乘一个比例，把这个影响抵消掉。",
        math`\frac{\sin3x}{5x}=\frac35\frac{\sin3x}{3x}`,
        "左边的分母是 5x，右边 3x 先配标准极限，再乘 3/5 还原。",
        transfer("新题：以弧度计，x 趋近 0 时，sin(4x)/(7x) 的极限是多少？", 4 / 7,
          math`\frac47\cdot1=\frac47`, "先看正弦里的 4x。让分母暂时也写成 4x，再比较它和原来的 7x。")),
    ],
  },
  p5: {
    strategy: "fill-point", target: "会用附近该到的高度补一个孤立的点。",
    prerequisites: ["分段函数的条件决定用哪条规则。", "极限取附近的值，连续还要求点值相同。"],
    referenceAnswer: 2,
    solution: math`\lim_{x\to1}(x+1)=2,\qquad c=2`,
    steps: [
      notice("先看这个点的附近走到哪里",
        "想把马路接平，先看路两边走到了多高。单独在接缝放一个点，改变不了两侧的路。",
        math`\lim_{x\to1}f(x)=\lim_{x\to1}(x+1)`,
        "极限的 x 在点附近但不取 x=1，所以附近使用 x+1。",
        check("如果只换掉正中间的一个点，两边原来的走向会怎样？",
          ["保持原来的走向", "两边立刻跟着它变", "附近也都不能计算"], 0,
          ["对，只改了一个点。", "变化只发生在正中一点。两边仍用旧规则。", "附近每一点仍有对应的函数规则。"],
          "在纸上给一条线中间挖个洞，再把一个点画到上面。洞左右那些线段还在原处。")),
      apply("让点值与路的高度一致",
        "找到两边共同靠近的高度之后，正中的点也要补在那个高度上。",
        math`f(1)=c=\lim_{x\to1}(x+1)`,
        "连续需要两个量相同：点存在时的函数值、附近趋近的高度。",
        transfer("新题：x≠2 时 g(x)=3x−1，x=2 时 g(2)=d。要连续，d 应取多少？", 5,
          math`d=\lim_{x\to2}(3x-1)=5`, "先忽略 d，用附近的规则算走到 2 时的高度。然后把 d 补到那个位置。")),
    ],
  },
  p6: {
    strategy: "side", target: "会把左极限和函数在分界点的取值分开。",
    prerequisites: ["数轴上左侧的数较小。", "上标减号表示从左边靠近。"],
    referenceAnswer: 0,
    solution: math`x\to0^-\ \Rightarrow\ x<0,\qquad \lim_{x\to0^-}f(x)=0`,
    steps: [
      notice("先选走近分界点的方向",
        "问左边，就想象你沿数轴从较小的数往目标走。到达目标之前，都只走左边那条路。",
        math`x\to0^-\quad\Rightarrow\quad x<0`,
        "左极限不使用点值，也不会经过右侧分支。",
        check("从 −1、−0.1 走向 0，路上的数与 0 有什么关系？",
          ["等于 0", "大于 0", "小于 0"], 2,
          ["还没走到终点。", "大于 0 是从右边靠近。", "对，这就决定了使用哪段规则。"],
          "先在数轴上标 −1、0 和 1。向 0 走时，两侧分别来自哪种大小的数？")),
      apply("只读那条路上的高度",
        "在这题的左侧，规则一直给同一个高度。即使正中间的点画在别处，左边到的高度也不变。",
        math`\lim_{x\to0^-}f(x)=0`,
        "左边这段恒等于 0；等号属于另一段，对左极限没有影响。",
        transfer("新题：x<2 时 g(x)=4，x≥2 时 g(x)=9。从左侧趋近 2，极限是多少？", 4,
          math`\lim_{x\to2^-}g(x)=4`, "试着从 1.9、1.99 走向 2。这两个数应该选哪一段规则？")),
    ],
  },
  p7: {
    strategy: "euler", target: "会把底数与指数配成第二个重要极限的形状。",
    prerequisites: ["底数为正时可以使用幂的乘方法则。", "小量 u 趋零时，(1+u) 的 1/u 次幂趋近 e。"],
    referenceAnswer: 6,
    solution: math`\lim_{x\to0}\big[(1+2x)^{1/(2x)}\big]^6=e^6`,
    steps: [
      notice("找底数比 1 多出来的一块",
        "我们要先认出一块熟悉的积木：底数在 1 的旁边多一点，上面的指数里要配上这一点的倒数。",
        math`1+2x,\qquad (1+2x)^{1/(2x)}\to e`,
        "这题的那一小块是 2x。x 充分靠近零时底数为正。",
        check("换成底数 1+5t，哪块应放到指数的分母？",
          ["1+5t", "5t", "t"], 1,
          ["先从底数里拿掉开头的 1。", "对，只取加在 1 后面的部分。", "t 还缺题目给出的倍数。"],
          "例如 1+0.02 比 1 多 0.02。找的是多出来的那一块。")),
      apply("保留改写指数时补上的倍数",
        "分母乘了一个倍数，分子也要乘同一个倍数，原值才保持不变。补上的数会留在括号外。",
        math`\frac3x=\frac{1}{2x}\cdot6`,
        "先让括号里的匹配形状趋近 e，再取括号外的常数次幂。题目只问这个外部指数。",
        transfer("新题：(1+4x)^(2/x) 在 x 趋近 0 时写成 e^k。k 是多少？", 8,
          math`2/x=8/(4x),\qquad k=8`, "先把指数的分母和底数的小量配成一样，再让整个分数与 2/x 相等。")),
    ],
  },
  p9: {
    strategy: "cosine-order", target: "知道余弦差会留下平方，并记得平方作用于整个角度。",
    prerequisites: ["以弧度计。", "角度很小时，1−cos(角度) 与角度的平方的一半之比趋于 1。"],
    referenceAnswer: 2,
    solution: math`\lim_{x\to0}\frac{1-\cos 2x}{x^2}=\frac{2^2}{2}=2`,
    steps: [
      notice("看明白公式要平方的对象",
        "这里要量的是余弦离 1 有多远。角度缩小时，那段距离缩得更快，会跟着角度的平方一起变小。",
        math`1-\cos u\sim u^2/2`,
        "符号 ～ 表示两边的比靠近 1。u 就是余弦括号里整个角度。",
        check("若角度是 3t，那个平方要写在哪里？",
          ["只平方 t", "只平方 3", "把 3t 整块平方"], 2,
          ["角度还带着 3，不能把它留在平方外面。", "t 也在角度里。", "对，括号里面整块平方。"],
          "把 3t 当成 3×t。它和自己相乘时，两个 3 也会相乘。")),
      apply("用上下相同的幂留下常数",
        "把余弦差换成同样快缩小的平方块。上下都有 x²，比较时就只剩前面的常数。",
        math`(2x)^2/(2x^2)=2\quad(x\ne0)`,
        "原式与替换后的表达式之比趋近 1，后者的极限是有限常数。",
        transfer("新题：x 趋近 0 时，(1−cos(4x))/x² 的极限是多少？", 8,
          math`4^2/2=8`, "先写出角度的平方，再取它的一半。别忘了整个 4x 都要平方。")),
    ],
  },
  p10: {
    strategy: "equivalent-quotient", target: "会在比值中分开替换两个接近零的量。",
    prerequisites: ["等价记号 ～ 表示两个量之比趋于 1。", "u 趋零时，ln(1+u) 与 sin u 都各自跟 u 同速缩小。"],
    referenceAnswer: 3 / 2,
    solution: math`\lim_{x\to0}\frac{\ln(1+3x)}{\sin 2x}=\frac32`,
    steps: [
      notice("先看这次连接上下两项的是哪种运算",
        "如果两样东西各自都几乎等于自己的替身，拿它们做比值时，可以先用替身看看比例。相减时，还要防两项刚好抵消。",
        math`\ln(1+u)\sim u,\qquad \sin v\sim v`,
        "u、v 是两层括号中各自的小量。两边都缩小，替换保留了相对大小。",
        check("下面哪个场景能先给上下两项分别找替身，再比较它们的比值？",
          ["两个近似值相减", "一个小量除以另一个小量", "先把两项都直接改成 0"], 1,
          ["相减会有抵消，第一项近似不一定够。", "对，先处理分子和分母各自的缩小速度。", "分母为零时就没法比较比值。"],
          "两条绳子同时缩短一半，谁是另一条的几倍并没有变。这里关心的就是这个倍数。")),
      apply("分别拿出括号里的小量",
        "对数里看 1 后面加了什么；正弦里看括号里送进去什么。两个小量各有各的倍数。",
        math`\ln(1+3x)\sim3x,\qquad \sin(2x)\sim2x`,
        "x 充分靠近 0 时对数的输入为正，正弦在去心邻域不等于零，替换得到 3x/2x。",
        transfer("新题：x 趋近 0 时，ln(1+5x)/sin(8x) 的极限是多少？", 5 / 8,
          math`5x/(8x)=5/8`, "把对数和正弦分开。一个看 1 后面的小量，另一个看正弦的角度。")),
    ],
  },
  p125: {
    strategy: "conjugate", target: "会给根式差配一项，把根号变成平方差。",
    prerequisites: ["平方差：(a−b)(a+b)=a²−b²。", "分子分母同时乘同一个非零量不会改变分数值。"],
    referenceAnswer: 1 / 6,
    solution: math`\lim_{x\to3}\frac{1}{\sqrt{x+6}+3}=\frac16`,
    steps: [
      notice("给根式差找一个能消掉根号的搭档",
        "两个平方之间的差容易整理。眼下只有两个数的差，所以试着乘一个搭档，让平方自己出现。",
        math`(\sqrt{x+6}-3)(\sqrt{x+6}+3)=x-3`,
        "这个搭档叫共轭式：同样的两项，中间由减号换成加号。附近的搭档不是零。",
        check("如果上面是 √A−4，要用平方差，应乘哪个搭档？",
          ["√A+4", "√A−4", "4"], 0,
          ["对，一加一减才能让交叉项抵消。", "同样的减号会留下交叉项。", "只乘 4 不会让 √A 和自身相乘。"],
          "试着展开 (a−4)(a+4)，看中间的两项是否正好互相抵消。")),
      apply("约掉共同的差，再代入",
        "乘完搭档，上面会出现和下面一样的一块。约掉它以后，新的分母在目标点仍然有值。",
        math`x\ne3:\quad\frac{\sqrt{x+6}-3}{x-3}=\frac1{\sqrt{x+6}+3}`,
        "上下都乘过搭档，约公共因子后，分母仍保留那个搭档。",
        transfer("新题：x 趋近 4 时，(√(x+12)−4)/(x−4) 的极限是多少？", 1 / 8,
          math`\frac1{\sqrt{4+12}+4}=\frac18`, "换加号配搭档。约分后，分母里有开根得到的数，还有原先那个 4。")),
    ],
  },
  p126: {
    strategy: "match-branches", target: "会把分界点两侧的高度写成等式，再解参数。",
    prerequisites: ["连续要求两侧高度以及点值一致。", "一次方程可通过对两边做同样的运算来解。"],
    referenceAnswer: 0,
    solution: math`2a+4=4+a\quad\Rightarrow\quad a=0`,
    steps: [
      notice("先分别算两条路接到分界点有多高",
        "两条路用的公式不同，就要各算一次。先记录各自到的高度，不急着猜参数。",
        math`L=2a+4,\qquad R=f(2)=4+a`,
        "L、R 分别表示左和右的极限。两段内的表达式连续；右支含等号，点值由右支决定。",
        check("分段第二条规则若写着 x≥2，分界点 x=2 的点值归哪条？",
          ["第一条", "两条都可以", "第二条"], 2,
          ["第一条要求 x<2，不包含 2。", "只能用真的包含等号的那一条。", "对，≥ 包含点本身。"],
          "先把 2 放进两条条件里，看哪条条件为真。")),
      apply("调参数，直到两侧一样高",
        "把两个高度写成等式，再求让等式成立的参数。右支的点值已经和右边高度一致。",
        math`2a+4=4+a`,
        "两边都减去 a 和 4，只剩 a=0；若分界点另有规则，还需检查点值。",
        transfer("新题：x<1 时 f(x)=ax+2，x≥1 时 f(x)=x²+2a。要在 1 连续，a 是多少？", 1,
          math`a+2=1+2a\quad\Rightarrow\quad a=1`, "左右分别代入 1 得到两条高度，再令它们相等。右支含等号。")),
    ],
  },
  p167: {
    strategy: "jump", target: "能通过两侧高度判断跳跃，并按右减左量它的方向。",
    prerequisites: ["分段时先按趋近的方向选规则。", "从一个高度到另一个高度的有向变化等于终点减起点。"],
    referenceAnswer: 7,
    solution: math`\begin{gathered}L=-2,\quad R=5\\R-L=7\end{gathered}`,
    steps: [
      notice("把左边、右边、正中间当成三个读数",
        "左右像两节台阶，中间可以另放一个标记。台阶有没有错开，只看两边的高度。",
        math`L=2-4=-2,\qquad R=2+3=5`,
        "L、R 是各自的单侧极限。两个极限都有限但不相等，这叫跳跃间断。",
        check("左右分别走到不同高度，单独换掉中间的点能把台阶接平吗？",
          ["能，只要换成右侧高度", "不能，两边的路没变", "能，只要取两侧的平均"], 1,
          ["只和右边对齐时，左边仍在另一个高度。", "对，左右极限靠的是两边的路。", "把点移到两级台阶中间，并不会让两级台阶变成同一级。"],
          "想象楼梯中间悬着一个球。球放高一点或低一点，梯级本身的高度不会改变。")),
      apply("按题目指定的顺序比较台阶高度",
        "要算右减左，就把右边的高度写在前面。左边如果低于零，减去负数相当于把那段距离加进来。",
        math`R-L=5-(-2)`,
        "右减左给出有向变化，负值代表右侧更低。只问跳跃大小时才取绝对值。",
        transfer("新题：从左走到高度 5，从右走到高度 2，分界点单独标 9。右极限减左极限是多少？", -3,
          math`R-L=2-5=-3`, "两个方向的高度不相等。忽略正中的标记，按右减左的次序计算。",
          "差的大小算对了。右边比左边低，所以有向变化为负。")),
    ],
  },
} satisfies Record<string, Pilot>;

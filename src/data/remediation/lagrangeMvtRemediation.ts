import type { TeachingLesson } from "../teaching";

const math = String.raw;

/**
 * 拉格朗日中值定理与辅助函数构造补救微课：
 * 面向在 §3.1 面对不等式放缩或含 f′(ξ)、f(ξ) 证明题不知如何选函数/构造辅助函数的学生，
 * 3 步速通「盯差选函数与区间 → 看导数单调性放缩 ξ → 还原动点 x 逆推辅助函数」。
 */
export const lagrangeMvtRemediationModule: TeachingLesson = {
  target: "用 2 分钟掌握拉格朗日中值不等式选区间与微分方程型辅助函数构造法。",
  prerequisites: [
    "拉格朗日中值定理：f(b)−f(a)=f′(ξ)(b−a)，其中 ξ∈(a, b)",
    "乘积求导公式：[f(x)e^(kx)]′=[f′(x)+kf(x)]e^(kx)",
  ],
  strategy: "lagrange-mvt-auxiliary-remediation",
  solution: math`\begin{gathered}f(b)-f(a)=f'(\xi)(b-a)\quad(\xi\in(a,b))\\[4pt]f'(x)+kf(x)=0\;\longleftrightarrow\;F(x)=f(x)e^{kx}\end{gathered}`,
  solutionExplanation: "证明不等式看「同结构函数之差」选 f(t) 与区间；证明含 f′ 与 f 的等式把 ξ 还原成 x 后凑全导数。",
  steps: [
    {
      id: "lagrange-rem-1",
      goal: "阶梯 1：盯住「同结构之差」，一眼定出 f(t) 与闭区间",
      plain: "看到不等式里出现 sin b − sin a、ln(1+x) − ln(1+y) 或 eˣ − e² 这类「同一个函数在两点相减」的结构，就立刻把括号里的字母换成动点 t 当作 f(t)，两个点就是闭区间端点。",
      formula: math`\begin{gathered}\ln\frac{1+x}{1+y}=\ln(1+x)-\ln(1+y)\\[4pt]\Longrightarrow\;f(t)=\ln(1+t),\;[y,x]\end{gathered}`,
      detail: "有时函数差藏在商的对数或移项后的项里，先拆成 f(b)−f(a) 再套定理。",
      check: {
        prompt: "要证明当 x>0 时 arctan x < x，最直接的拉格朗日函数 f(t) 与闭区间应选哪一组？",
        choices: [
          "f(t)=arctan t，区间 [0, x]",
          "f(t)=arctan t − t，区间 [−x, x]",
          "f(t)=1/(1+t²)，区间 [0, x]",
        ],
        correct: 0,
        feedback: [
          "对，因为 arctan 0=0，所以 arctan x − arctan 0 = [1/(1+ξ²)](x−0)，立刻得到放缩入口。",
          "不需要把区间扩到 −x，直接用 [0, x] 就能利用 arctan 0=0。",
          "1/(1+t²) 是 arctan t 的导数，不是要套中值定理的原函数 f(t)。",
        ],
        prerequisite: "把目标不等式里的单个表达式写成 f(b)−f(a)（常借用 f(0) 或已知端点值）。",
      },
    },
    {
      id: "lagrange-rem-2",
      goal: "阶梯 2：用端点范围放缩 f′(ξ)——注意正负与单调方向",
      plain: "拉格朗日把 f(b)−f(a) 换成了 f′(ξ)(b−a)。既然 ξ 严格夹在 a 和 b 之间，只要判断 f′(t) 在区间上是递增还是递减，就能用 f′(a) 和 f′(b) 夹住 f′(ξ) 消掉未知的 ξ。",
      formula: math`\begin{gathered}0<\xi<x\;\Longrightarrow\;1+\xi^2>1\\[4pt]\Longrightarrow\;\frac{1}{1+\xi^2}<1\end{gathered}`,
      detail: "关键易错点：对正数取倒数、或乘以负数时，不等号方向必须反转！",
      check: {
        prompt: "已知 0 < a < ξ < b 且导函数 f′(t)=1/t 在 (0, +∞) 严格递减，放缩 f′(ξ)=1/ξ 得到的正确双边不等式是？",
        choices: [
          "1/a < 1/ξ < 1/b",
          "1/b < 1/ξ < 1/a",
          "a < 1/ξ < b",
        ],
        correct: 1,
        feedback: [
          "取倒数时不等号忘记反转，分母越大分数反而越小。",
          "对，由 0 < a < ξ < b 取倒数反转不等号，得到 1/b < 1/ξ < 1/a。",
          "a 和 b 还没取倒数，单位和量级都对不上。",
        ],
        prerequisite: "先看 f′(t) 单调性：递增则同向代端点，递减（如倒数、负幂）则反向代端点。",
      },
    },
    {
      id: "lagrange-rem-3",
      goal: "阶梯 3：看到 f′(ξ)±k f(ξ)=0，还原动点 x 构造指数辅助函数",
      plain: "面对「证存在 ξ 使 f′(ξ)+k f(ξ)=0」这类题，先把 ξ 还原成 x，问自己：谁求导会冒出 f′(x)+k f(x)？答案正是 F(x)=f(x)e^(kx)，因为 F′(x)=[f′(x)+k f(x)]e^(kx) 且 e^(kx)>0 永不为零！",
      formula: math`\big[f(x)e^{kx}\big]'=\big(f'(x)+kf(x)\big)e^{kx}`,
      detail: "口诀：f′ 与 f 之间是 +k，就配 e^(+kx)；是 −k，就配 e^(−kx)。",
      check: {
        prompt: "要证明存在 ξ∈(a, b) 使 f′(ξ)+2f(ξ)=0，应该构造哪个辅助函数 F(x) 来套用罗尔定理？",
        choices: [
          "F(x)=f(x)+2x",
          "F(x)=f(x)e^(−2x)",
          "F(x)=f(x)e^(2x)",
        ],
        correct: 2,
        feedback: [
          "F′(x)=f′(x)+2，里面没有 f(x) 这一项。",
          "若对 f(x)e^(−2x) 求导会得到 [f′(x)−2f(x)]e^(−2x)，中间变成了减号。",
          "对，[f(x)e^(2x)]′=[f′(x)+2f(x)]e^(2x)，令 F′(ξ)=0 即可消去 e^(2ξ)>0 得结论。",
        ],
        prerequisite: "遇到 f′(x)+k f(x) 配指数因子 e^(kx)，利用 e^(kx)>0 永远不影响零点。",
      },
      transfer: {
        prompt: "速通检验：对 f(x)=x² 在区间 [2, 6] 上应用拉格朗日中值定理，求出满足 f′(ξ)=[f(6)−f(2)]/(6−2) 的中值点 ξ。",
        answer: 4,
        signFeedback: "[f(6)−f(2)]/(6−2)=(36−4)/4=8，令 2ξ=8 解得 ξ=4。",
        remediation: "平均变化率为 (36−4)/(6−2)=8，由 f′(ξ)=2ξ=8 解得 ξ=4。",
        solution: math`\begin{gathered}\frac{f(6)-f(2)}{6-2}=\frac{36-4}{4}=8\\[4pt]2\xi=8\;\Longrightarrow\;\xi=4\end{gathered}`,
      },
    },
  ],
};

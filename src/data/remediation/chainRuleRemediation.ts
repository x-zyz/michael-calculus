import type { TeachingLesson } from "../teaching";

const math = String.raw;

/**
 * 链式法则前置知识补救微课（P1-1）：
 * 面向在隐函数求导（2.3）或复合函数中值定理求导（3.1）卡壳的学生，
 * 3 步速通「剥洋葱找内外层 → 齿轮相乘不漏内层导数 → 把 y 看成隐藏函数 y(x)」。
 * 由 Sol 通过现有 Sheet 容器挂载，不新增底部堆叠区块。
 */
export const chainRuleRemediationModule: TeachingLesson = {
  target: "用 3 分钟补齐链式法则三大前置动作，彻底打通隐函数求导为什么会出现 y′。",
  prerequisites: [
    "熟记基本初等函数导数表：(xⁿ)′=nxⁿ⁻¹、(sin x)′=cos x、(eˣ)′=eˣ、(ln x)′=1/x",
  ],
  strategy: "chain-rule-prerequisite-remediation",
  solution: math`\begin{gathered}\frac{d}{dx}[f(g(x))]=f'(g(x))\cdot g'(x)\\[4pt]\frac{d}{dx}[y(x)^2]=2y\cdot\frac{dy}{dx}=2yy'\end{gathered}`,
  solutionExplanation: "凡是括号里装的不是单个 x，求导都要外层求导（内层照抄）再乘内层导数；隐函数里的 y 就是装了 x 的盒子。",
  steps: [
    {
      id: "chain-rem-1",
      goal: "阶梯 1：剥洋葱——分清外层函数与内层函数",
      plain: "判断是不是复合函数，只看「最后一步算什么」。比如 ln(cos x) 先算 cos x，最后套 ln，所以外层是 ln u，内层是 u=cos x；它不是 ln x 乘以 cos x。",
      formula: math`w=\ln u,\quad u=\cos x`,
      detail: "先给内层整体起个临时名字 u，外层就退化成最熟悉的基本导数表公式。",
      check: {
        prompt: "在表达式 e^(−3x) 中，如果按「外层 f(u)、内层 u=g(x)」拆解，内层 u 是什么？",
        choices: ["u = −3x", "u = eˣ", "u = −3"],
        correct: 0,
        feedback: [
          "对，先算指数上的 −3x，再把它放进外层指数函数 eᵘ，所以内层是 u=−3x。",
          "eˣ 是把整个外层和底数混在一起了，外层应写成 eᵘ。",
          "−3 只是系数，完整的内层表达式要带上自变量 x。",
        ],
        prerequisite: "把自变量 x 代入计算时，最先算的那一块就是内层 u。",
      },
    },
    {
      id: "chain-rem-2",
      goal: "阶梯 2：齿轮相乘——外层求导照抄内层，再乘内层导数",
      plain: "求导时先把内层当成一个不透明盒子 u：对外层求导后把盒子原样放回去，最后务必乘上盒子自己对 x 的导数 u′。",
      formula: math`\begin{gathered}(\sin(3x))'=\cos(3x)\cdot(3x)'=3\cos(3x)\\[4pt](e^{-2x})'=e^{-2x}\cdot(-2x)'=-2e^{-2x}\end{gathered}`,
      detail: "最常见的失误是只对外层求导，忘掉乘上内层系数 3 或 −2。",
      check: {
        prompt: "对 sin(5x) 关于 x 求导，下面哪个结果没有漏乘内层导数？",
        choices: ["cos(5x)", "5cos(5x)", "5cos(x)"],
        correct: 1,
        feedback: [
          "漏乘了内层 5x 的导数 5，外层求导后还要乘以 (5x)′。",
          "对，外层 sin u 导数为 cos(5x)，再乘内层导数 5，得到 5cos(5x)。",
          "外层求导时内层 5x 要原样保留在 cos 括号里，不能把 5 拿出来后丢掉里面的 5。",
        ],
        prerequisite: "口诀：外层求导内层照抄，末尾补乘内层导。",
      },
    },
    {
      id: "chain-rem-3",
      goal: "阶梯 3：打通隐函数——把 y 看成装了 x 的隐藏盒子 y(x)",
      plain: "隐函数方程（如 x²+y²=1）里的 y 不是常数，也不是独立变量，而是藏在方程里的函数 y(x)。所以对 y² 关于 x 求导，本质就是对 [y(x)]² 用链式法则：外层平方导成 2y，再乘内层导数 y′！",
      formula: math`\frac{d}{dx}\big(y(x)^2\big)=2y(x)\cdot y'(x)=2yy'`,
      detail: "对比：对 x² 关于 x 求导时内层是 x，x′=1 所以省略不写；对 y² 关于 x 求导时内层是 y(x)，y′ 不能省略。",
      check: {
        prompt: "在隐函数方程 sin y + x = 1 两边同时对 x 求导时，sin y 这一项求导后应该写成什么？",
        choices: ["cos y", "cos x", "cos y · y′"],
        correct: 2,
        feedback: [
          "把 y 当成自变量 x 漏乘了内层导数 y′；记住 y 是 x 的函数 y(x)。",
          "外层求导时括号里的内层 y 要原样保留，不能改成 x。",
          "对，外层 sin u 导成 cos y，再乘内层 y(x) 对 x 的导数 y′，合起来就是 cos y · y′。",
        ],
        prerequisite: "遇到任何含 y 的项对 x 求导：先按普通公式对 y 求导，末尾再乘一个 y′。",
      },
      transfer: {
        prompt: "速通检验：若隐函数满足 y²+2x=6 且曲线过点 (1, 2)，两边对 x 求导得到 2yy′+2=0，求该点处的 y′（小数或分数）。",
        answer: -0.5,
        signFeedback: "由 2·2·y′+2=0 得 4y′=−2，注意移项后的负号。",
        remediation: "两边对 x 求导得 2yy′+2=0，代入 y=2 得 4y′=−2，解得 y′=−1/2=−0.5。",
        solution: math`\begin{gathered}2yy'+2=0\xrightarrow{y=2}4y'=-2\\[4pt]y'=-\frac{1}{2}=-0.5\end{gathered}`,
      },
    },
  ],
};

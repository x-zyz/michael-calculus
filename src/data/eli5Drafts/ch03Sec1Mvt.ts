import type {
  TeachingCheck,
  TeachingLesson,
  TeachingStep,
  TeachingTransfer,
} from "../teaching";

const math = String.raw;

interface ChoiceCheckInput {
  prompt: string;
  choices: string[];
  answer: string;
  feedback: Record<string, string>;
  prerequisite: string;
}

const stableSlot = (stepId: string, choiceCount: number): number => {
  let hash = 0;
  for (let i = 0; i < stepId.length; i++) {
    hash = (hash * 31 + stepId.charCodeAt(i)) >>> 0;
  }
  return hash % choiceCount;
};

const toTeachingCheck = (
  stepId: string,
  input: ChoiceCheckInput,
): TeachingCheck => {
  const originalIndex = input.choices.indexOf(input.answer);
  if (originalIndex < 0) {
    throw new Error(`Missing answer "${input.answer}" in choices for ${stepId}`);
  }
  const targetSlot = stableSlot(stepId, input.choices.length);
  const shift = (targetSlot - originalIndex + input.choices.length) % input.choices.length;
  const ordered = input.choices.map(
    (_, index) => input.choices[(index - shift + input.choices.length) % input.choices.length],
  );
  return {
    prompt: input.prompt,
    choices: ordered,
    correct: ordered.indexOf(input.answer),
    feedback: ordered.map((choice) => input.feedback[choice] ?? ""),
    prerequisite: input.prerequisite,
  };
};

interface StepDraft {
  id: string;
  goal: string;
  plain: string;
  formula: string;
  detail: string;
  check?: ChoiceCheckInput;
  transfer?: TeachingTransfer;
}

const buildSteps = (drafts: readonly StepDraft[]): TeachingStep[] =>
  drafts.map((draft) => {
    const check = draft.check
      ? toTeachingCheck(draft.id, draft.check)
      : undefined;
    return {
      id: draft.id,
      goal: draft.goal,
      plain: draft.plain,
      formula: draft.formula,
      detail: draft.detail,
      ...(check ? { check } : {}),
      ...(draft.transfer ? { transfer: draft.transfer } : {}),
    };
  });

/**
 * 第三章 3.1 微分中值定理（罗尔定理、拉格朗日中值定理、柯西中值定理）深度 ELI5 教学内容。
 * 覆盖全部 22 题：p19, p20, p134, p181, p216, p217, jc935-3-1-1 至 jc935-3-1-15。
 * 教学标准（配合随题公式表）：只考动手算中间量、求导变形与空白题干破题决策，禁止复述公式标签或背诵限制条件。
 */
export const chapterThreeSec1MvtTeaching: Readonly<Record<string, TeachingLesson>> = {
  p19: {
    target: "对照拉格朗日中值定理公式，亲手算出区间平均斜率、列出导数方程并解出开区间内的中值点 ξ。",
    prerequisites: [
      "能对照公式表套用拉格朗日中值定理 f′(ξ)=[f(b)−f(a)]/(b−a)",
      "会用幂函数求导法则算 (x²)′=2x",
    ],
    strategy: "lagrange-midpoint-solve",
    referenceAnswer: 3,
    solution: math`\begin{gathered}\frac{f(5)-f(1)}{5-1}=\frac{25-1}{4}=6\\[4pt]2\xi=6\implies\xi=3\in(1,5)\end{gathered}`,
    solutionExplanation: "先算出区间 [1, 5] 两端连线的平均坡度 6，再令导数 2ξ=6 解出 ξ=3。",
    steps: buildSteps([
      {
        id: "p19-1",
        goal: "第一步：动手算出区间 [1, 5] 上的平均变化率",
        plain: "把端点 x=1 和 x=5 代入 f(x)=x²，用两端点函数值之差除以区间长度，先算出等式右边的具体数值。",
        formula: math`\frac{f(5)-f(1)}{5-1}=\frac{25-1}{4}=6`,
        detail: "f(5)=25，f(1)=1，差商 (25−1)/(5−1)=24/4=6。",
        check: {
          prompt: "对 f(x)=x²，算出区间 [1, 5] 上的平均变化率 [f(5)−f(1)]/(5−1) 等于多少？",
          choices: ["6", "24", "4"],
          answer: "6",
          feedback: {
            "6": "对，(25−1)/(5−1)=24/4=6，这就是端点连线的斜率。",
            "24": "24 只是分子 f(5)−f(1)=25−1，别忘了除以分母区间长度 5−1=4。",
            "4": "4 是分母 5−1 的长度，分子应该是 5²−1²=24，相除得 6。",
          },
          prerequisite: "先分别算出 f(5)=5²=25 和 f(1)=1²=1，再算 (25−1)/(5−1)。",
        },
      },
      {
        id: "p19-2",
        goal: "第二步：对 f(x)=x² 求导，列出关于 ξ 的方程",
        plain: "现在平均变化率已经算出来了。接下来求出 f(x)=x² 的导函数，把它在 ξ 处的值和刚才算出的平均斜率画上等号。",
        formula: math`f'(\xi)=2\xi=6`,
        detail: "由 (x²)′=2x 得 f′(ξ)=2ξ，令 2ξ=6 即可求解。",
        check: {
          prompt: "算出平均变化率是 6 后，下一步要解哪个方程才能求出中值点 ξ？",
          choices: ["2ξ = 6", "ξ² = 6", "2ξ = 0"],
          answer: "2ξ = 6",
          feedback: {
            "2ξ = 6": "对，f′(x)=2x，令中值点处的导数 2ξ 等于平均斜率 6。",
            "ξ² = 6": "ξ² 是原函数 f(ξ)，中值定理左边要用导函数 f′(ξ)=2ξ。",
            "2ξ = 0": "等于 0 是罗尔定理（两端等高），本题平均斜率是 6 不是 0。",
          },
          prerequisite: "看公式表里幂函数求导：(x²)′=2x，把 x 换成 ξ 放进等式左边。",
        },
      },
      {
        id: "p19-3",
        goal: "第三步：解出 ξ 并做一道换区间迁移题",
        plain: "解开一步方程并确认解落在 (1, 5) 内，再独立算一道同型题检验手感。",
        formula: math`\xi=\frac{6}{2}=3\in(1,5)`,
        detail: "2ξ=6 解得 ξ=3∈(1, 5)。",
        transfer: {
          prompt: "迁移练习：对 f(x)=x² 在闭区间 [2, 6] 上应用拉格朗日中值定理，求满足 f′(ξ)=[f(6)−f(2)]/(6−2) 的中值点 ξ。",
          answer: 4,
          signFeedback: "先算 (36−4)/(6−2)=8，再解 2ξ=8。",
          remediation: "平均斜率 (36−4)/(6−2)=8，令 2ξ=8 得 ξ=4∈(2, 6)。",
          solution: math`\begin{gathered}\frac{6^2-2^2}{6-2}=\frac{32}{4}=8\\[4pt]2\xi=8\implies\xi=4\in(2,6)\end{gathered}`,
        },
      },
    ]),
  },

  p20: {
    target: "动手算出两端点值确认罗尔定理可用，再求导解出驻点方程。",
    prerequisites: [
      "会代入数值计算二次多项式的端点值",
      "会对二次多项式逐项求导",
    ],
    strategy: "rolle-stationary-solve",
    referenceAnswer: 2,
    solution: math`\begin{gathered}f(1)=0=f(3)\\[4pt]f'(\xi)=2\xi-4=0\\[4pt]\implies\xi=2\in(1,3)\end{gathered}`,
    solutionExplanation: "先算出两端点值均为 0，再令一阶导数 2ξ−4=0 解出 ξ=2。",
    steps: buildSteps([
      {
        id: "p20-1",
        goal: "第一步：亲手代入两端点，确认函数值是否相等",
        plain: "先别急着求导，把区间 [1, 3] 的两个端点分别代入 f(x)=x²−4x+3 算一遍，看看两端高度是不是一样。",
        formula: math`f(1)=1-4+3=0,\quad f(3)=9-12+3=0`,
        detail: "f(1)=0 且 f(3)=0，两端等高，满足罗尔定理。",
        check: {
          prompt: "把端点 x=1 和 x=3 代入 f(x)=x²−4x+3，算出的 f(1) 与 f(3) 分别是多少？",
          choices: ["都是 0", "分别是 0 和 6", "分别是 −2 和 0"],
          answer: "都是 0",
          feedback: {
            "都是 0": "对，1−4+3=0 且 9−12+3=0，两端同高所以可以直接令 f′(ξ)=0。",
            "分别是 0 和 6": "再算一下 x=3：3²−4×3+3=9−12+3=0，不是 6。",
            "分别是 −2 和 0": "再算一下 x=1：1−4+3=0，别漏了末尾的 +3。",
          },
          prerequisite: "代入 x=3 时按顺序算：先算 3²=9，再减 4×3=12 得 −3，最后加 3 得 0。",
        },
      },
      {
        id: "p20-2",
        goal: "第二步：求出导函数并列出驻点方程",
        plain: "两端高度相等，说明区间内至少有一处导数为 0。对 x²−4x+3 逐项求导，写出关于 ξ 的驻点方程。",
        formula: math`f'(\xi)=2\xi-4=0`,
        detail: "(x²)′=2x，(−4x)′=−4，常数 3 的导数为 0，合起来 f′(x)=2x−4。",
        check: {
          prompt: "对 f(x)=x²−4x+3 求导后，令 f′(ξ)=0 得到哪个方程？",
          choices: ["2ξ − 4 = 0", "2ξ + 4 = 0", "ξ² − 4ξ + 3 = 0"],
          answer: "2ξ − 4 = 0",
          feedback: {
            "2ξ − 4 = 0": "对，逐项求导得 2ξ−4，令它等于 0 就能直接解出驻点。",
            "2ξ + 4 = 0": "一次项是 −4x，求导后系数仍带负号是 −4。",
            "ξ² − 4ξ + 3 = 0": "这是原函数等于 0（求零点），罗尔定理要解的是导函数等于 0。",
          },
          prerequisite: "常数项求导为 0，一次项 −4x 求导只留系数 −4。",
        },
      },
      {
        id: "p20-3",
        goal: "第三步：解出 ξ 并做一道同型迁移题",
        plain: "解开一步方程并确认落在 (1, 3) 内，再用迁移题巩固。",
        formula: math`2\xi-4=0\implies\xi=2\in(1,3)`,
        detail: "ξ=2∈(1, 3)。",
        transfer: {
          prompt: "迁移练习：对 f(x)=x²−6x+5 在闭区间 [1, 5] 上应用罗尔定理，求满足 f′(ξ)=0 的驻点 ξ。",
          answer: 3,
          signFeedback: "先核对 f(1)=f(5)=0，再解 2ξ−6=0。",
          remediation: "f′(x)=2x−6，令 2ξ−6=0 得 ξ=3∈(1, 5)。",
          solution: math`\begin{gathered}f(1)=0=f(5)\\[4pt]f'(\xi)=2\xi-6=0\implies\xi=3\in(1,5)\end{gathered}`,
        },
      },
    ]),
  },

  p134: {
    target: "在三次函数上亲手算出割线斜率、列出二次导数方程并注意题干所求是 c²。",
    prerequisites: [
      "会算 (x³)′=3x²",
      "会算割线平均斜率并区分 c 与 c²",
    ],
    strategy: "lagrange-cubic-target",
    referenceAnswer: 3,
    solution: math`\begin{gathered}\frac{f(3)-f(0)}{3-0}=\frac{27}{3}=9\\[4pt]3c^2=9\implies c^2=3\\[4pt]c=\sqrt{3}\in(0,3)\end{gathered}`,
    solutionExplanation: "割线斜率为 9，令 3c²=9 直接得 c²=3，正根 √3 落在 (0, 3) 内。",
    steps: buildSteps([
      {
        id: "p134-1",
        goal: "第一步：动手算出 f(x)=x³ 在 [0, 3] 上的割线斜率",
        plain: "把端点 x=0 和 x=3 代进 f(x)=x³，算出区间 [0, 3] 的平均变化率。",
        formula: math`\frac{f(3)-f(0)}{3-0}=\frac{27-0}{3}=9`,
        detail: "f(3)=27，f(0)=0，割线斜率为 27/3=9。",
        check: {
          prompt: "对 f(x)=x³，区间 [0, 3] 上的平均变化率 [f(3)−f(0)]/(3−0) 是多少？",
          choices: ["9", "27", "3"],
          answer: "9",
          feedback: {
            "9": "对，3³=27，除以区间长度 3 得 9。",
            "27": "27 是 f(3)−f(0)，别忘了除以分母 3−0=3。",
            "3": "3³=27 而不是 9，27 除以 3 应该等于 9。",
          },
          prerequisite: "先算 3³=3×3×3=27，再除以 3。",
        },
      },
      {
        id: "p134-2",
        goal: "第二步：对 x³ 求导，列出关于 c 的方程",
        plain: "求出 f(x)=x³ 的导函数，令 c 处的切线斜率等于第一步算出的 9。",
        formula: math`3c^2=9\implies c=\sqrt{3}\in(0,3)`,
        detail: "由 (x³)′=3x² 得 3c²=9，正根 c=√3∈(0, 3)。",
        check: {
          prompt: "令 f′(c) 等于割线斜率 9，得到的方程是哪一个？",
          choices: ["3c² = 9", "c³ = 9", "3c = 9"],
          answer: "3c² = 9",
          feedback: {
            "3c² = 9": "对，(x³)′=3x²，令 3c²=9 后除以 3 就能直接得到 c²。",
            "c³ = 9": "c³ 是原函数，左边要放导函数 f′(c)=3c²。",
            "3c = 9": "幂函数求导降一次幂，x³ 降一次是 x² 不是 x。",
          },
          prerequisite: "幂函数求导公式：(xⁿ)′=nxⁿ⁻¹，取 n=3 得 3x²。",
        },
      },
      {
        id: "p134-3",
        goal: "第三步：看清题目问的是 c²，并用迁移题巩固",
        plain: "两边同除以 3 立刻得到 c²，注意题目直接问 c² 而不是 c。",
        formula: math`c^2=3`,
        detail: "c²=3，正根 √3∈(0, 3)。",
        transfer: {
          prompt: "迁移练习：设 f(x)=x³ 在区间 [0, 6] 上满足拉格朗日中值定理 f′(c)=[f(6)−f(0)]/6，c∈(0, 6)，求 c²。",
          answer: 12,
          signFeedback: "先算 (6³−0)/6=36，再令 3c²=36 除以 3。",
          remediation: "割线斜率 216/6=36，令 3c²=36 得 c²=12（c=2√3∈(0, 6)）。",
          solution: math`\begin{gathered}\frac{6^3-0}{6}=36\\[4pt]3c^2=36\implies c^2=12\end{gathered}`,
        },
      },
    ]),
  },

  p181: {
    target: "动手算端点三角值确认罗尔条件，再用三层链式法则求导并解出驻点比值 c/π。",
    prerequisites: [
      "熟记 sin(π/6)=sin(5π/6)=1/2",
      "会用链式法则对 ln(sin(2x)) 逐层求导",
    ],
    strategy: "rolle-log-chain",
    referenceAnswer: 0.25,
    solution: math`\begin{gathered}\sin(2x)\ge\frac{1}{2}>0\\[4pt]f\left(\frac{\pi}{12}\right)=f\left(\frac{5\pi}{12}\right)\\[4pt]f'(c)=\frac{2\cos(2c)}{\sin(2c)}=0\\[4pt]2c=\frac{\pi}{2}\implies\frac{c}{\pi}=\frac{1}{4}\end{gathered}`,
    solutionExplanation: "端点正弦值均为 1/2>0，链式法则求导得 2cos(2x)/sin(2x)=0，解得 2c=π/2，即 c/π=1/4。",
    steps: buildSteps([
      {
        id: "p181-1",
        goal: "第一步：算出端点处的 sin(2x)，同时确认真数大于 0 且两端同高",
        plain: "把左端点 x=π/12 和右端点 x=5π/12 代入 2x，先算出两个端点处的正弦值，确认真数大于 0 且两边一样高。",
        formula: math`\begin{gathered}2x\in\left[\frac{\pi}{6},\frac{5\pi}{6}\right]\implies \sin(2x)\ge\frac{1}{2}>0\\[4pt]f\left(\frac{\pi}{12}\right)=\ln\frac{1}{2}=f\left(\frac{5\pi}{12}\right)\end{gathered}`,
        detail: "sin(π/6)=sin(5π/6)=1/2>0，区间内正弦值均 ≥1/2，满足罗尔定理。",
        check: {
          prompt: "代入左端点 x=π/12 后，2x=π/6，此时真数 sin(2x) 的值是多少？",
          choices: ["1/2", "√3/2", "0"],
          answer: "1/2",
          feedback: {
            "1/2": "对，sin(π/6)=1/2>0，右端点 sin(5π/6) 也是 1/2，两端同高且真数恒正。",
            "√3/2": "√3/2 是 cos(π/6) 或 sin(π/3)，sin(π/6) 等于 1/2。",
            "0": "sin(0)=0，π/6 是 30°，正弦值为 1/2。",
          },
          prerequisite: "特殊角回忆：π/6=30°，sin 30°=1/2。",
        },
      },
      {
        id: "p181-2",
        goal: "第二步：用三层链式法则求出 f′(x)",
        plain: "对 f(x)=ln(sin(2x)) 从外往里逐层求导：外层 ln u、中层 sin v、内层 2x，三层导数乘在一起。",
        formula: math`f'(x)=\frac{1}{\sin(2x)}\cdot\cos(2x)\cdot 2=\frac{2\cos(2x)}{\sin(2x)}`,
        detail: "外层 1/sin(2x)，中层 cos(2x)，内层 2，相乘得 2cos(2x)/sin(2x)。",
        check: {
          prompt: "对 f(x)=ln(sin(2x)) 用链式法则求导，正确结果是哪一个？",
          choices: ["2cos(2x) / sin(2x)", "cos(2x) / sin(2x)", "1 / sin(2x)"],
          answer: "2cos(2x) / sin(2x)",
          feedback: {
            "2cos(2x) / sin(2x)": "对，三层求导依次乘上 1/sin(2x)、cos(2x) 和内层导数 2。",
            "cos(2x) / sin(2x)": "漏乘了最内层 (2x)′=2，遇到系数题会直接算错。",
            "1 / sin(2x)": "只求了最外层 ln u，漏乘了中层 sin(2x) 与内层 2x 的导数。",
          },
          prerequisite: "链式法则：[ln(u)]′=u′/u，而 [sin(2x)]′=2cos(2x)。",
        },
      },
      {
        id: "p181-3",
        goal: "第三步：令分子 cos(2c)=0 解出 c/π 并完成迁移题",
        plain: "在 2c∈(π/6, 5π/6) 内使 cos(2c)=0 的唯一角是 2c=π/2，算出 c 后除以 π。",
        formula: math`2c=\frac{\pi}{2}\implies c=\frac{\pi}{4}\implies \frac{c}{\pi}=\frac{1}{4}`,
        detail: "c=π/4∈(π/12, 5π/12)，故 c/π=1/4。",
        transfer: {
          prompt: "迁移练习：对 f(x)=ln(sin x) 在 [π/6, 5π/6] 上应用罗尔定理，求满足 f′(c)=0 的驻点对应的 c/π。",
          answer: 0.5,
          signFeedback: "c 应落在 (π/6, 5π/6) 内，因此 c/π 介于 1/6 和 5/6 之间。",
          remediation: "f′(x)=cos x/sin x=0 得 cos c=0，在 (π/6, 5π/6) 内 c=π/2，故 c/π=1/2。",
          solution: math`\begin{gathered}f'(c)=\frac{\cos c}{\sin c}=0,\;c\in\left(\frac{\pi}{6},\frac{5\pi}{6}\right)\\[4pt]c=\frac{\pi}{2}\implies \frac{c}{\pi}=\frac{1}{2}\end{gathered}`,
        },
      },
    ]),
  },

  p216: {
    target: "动手算出二次函数的割线斜率并解导数方程，完整验证拉格朗日中值定理。",
    prerequisites: [
      "会算多项式端点值与差商",
      "会求导并解一次方程",
    ],
    strategy: "lagrange-written-verify",
    solution: math`\begin{gathered}\frac{f(5)-f(1)}{5-1}=\frac{65-1}{4}=16\\[4pt]f'(c)=6c-2=16\\[4pt]\implies c=3\in(1,5)\end{gathered}`,
    solutionExplanation: "多项式连续可导，平均斜率为 (65−1)/4=16，解 6c−2=16 得 c=3。",
    steps: buildSteps([
      {
        id: "p216-1",
        goal: "第一步：算出两端点函数值与平均斜率",
        plain: "多项式在 [1, 5] 连续、在 (1, 5) 可导。把 x=1 和 x=5 代入 f(x)=3x²−2x，动手算出割线斜率。",
        formula: math`\frac{f(5)-f(1)}{5-1}=\frac{65-1}{4}=16`,
        detail: "f(1)=3−2=1，f(5)=75−10=65，平均斜率 (65−1)/(5−1)=16。",
        check: {
          prompt: "对 f(x)=3x²−2x，已知 f(1)=1、f(5)=65，区间 [1, 5] 上的平均斜率是多少？",
          choices: ["16", "64", "13"],
          answer: "16",
          feedback: {
            "16": "对，(65−1)/(5−1)=64/4=16。",
            "64": "64 只是高度差 f(5)−f(1)，别忘了除以区间长度 5−1=4。",
            "13": "分母是 5−1=4 而不是 5。",
          },
          prerequisite: "平均斜率公式：[f(5)−f(1)]/(5−1)。",
        },
      },
      {
        id: "p216-2",
        goal: "第二步：求导并解方程 f′(c)=16",
        plain: "对 3x²−2x 求导得 6x−2，令 6c−2 等于刚才的平均斜率 16，解出 c。",
        formula: math`f'(c)=6c-2=16\implies c=3`,
        detail: "6c=18，解得 c=3。",
        check: {
          prompt: "解方程 6c−2=16，得到的中值点 c 是多少？",
          choices: ["3", "7/3", "18"],
          answer: "3",
          feedback: {
            "3": "对，把 −2 移到右边变 +2 得 6c=18，所以 c=3∈(1, 5)。",
            "7/3": "把 −2 移到右边要变号成 +2，是 16+2=18 而不是 16−2=14。",
            "18": "18 是 6c 的值，还要除以 6。",
          },
          prerequisite: "移项变号：6c=16+2=18，再两边除以 6。",
        },
      },
      {
        id: "p216-3",
        goal: "第三步：确认 c∈(1, 5) 并完成迁移题",
        plain: "写出 c=3∈(1, 5) 收尾，再做一道同型二次函数中值题。",
        formula: math`c=3\in(1,5),\quad f'(3)=16`,
        detail: "c=3 严格落在 (1, 5) 内。",
        transfer: {
          prompt: "迁移练习：对 f(x)=2x²+x 在闭区间 [2, 6] 上应用拉格朗日中值定理，求满足 f′(c)=[f(6)−f(2)]/(6−2) 的 c。",
          answer: 4,
          signFeedback: "先算 (78−10)/4=17，再解 4c+1=17。",
          remediation: "平均斜率 (78−10)/4=17，令 f′(c)=4c+1=17 得 c=4。",
          solution: math`\begin{gathered}\frac{f(6)-f(2)}{6-2}=\frac{78-10}{4}=17\\[4pt]4c+1=17\implies c=4\in(2,6)\end{gathered}`,
        },
      },
    ]),
  },

  p217: {
    target: "不展开多项式，亲手切出相邻零点区间并用「罗尔至少 + 次数至多」两头夹击证明实根个数。",
    prerequisites: [
      "能从因式分解直接读出所有实零点",
      "知道 n 次多项式至多有 n 个实根",
    ],
    strategy: "rolle-root-counting",
    solution: math`\begin{gathered}\text{罗尔定理给出三个区间}\\[4pt](-3,-1),\;(-1,2),\;(2,4)\\[4pt]\text{各至少有一个零点}\\[4pt] \deg f'=3\implies\text{至多 3 根}\\[4pt]\text{故恰有 3 个不同实零点}\end{gathered}`,
    solutionExplanation: "4 个互异零点构成 3 个相邻闭区间，罗尔定理得至少 3 根，三次导数至多 3 根。",
    steps: buildSteps([
      {
        id: "p217-1",
        goal: "第一步：读出原式四个零点，按升序切出三段相邻闭区间",
        plain: "不用展开括号，直接令四个因子分别为 0 读出零点，按从小到大排成三段互不重叠的相邻闭区间。",
        formula: math`f(-3)=f(-1)=f(2)=f(4)=0`,
        detail: "四个零点 −3<−1<2<4 切出 [−3, −1]、[−1, 2]、[2, 4] 三段相邻区间。",
        check: {
          prompt: "对 f(x)=(x+3)(x+1)(x−2)(x−4)，把四个零点按升序排好后，相邻零点构成哪三段闭区间？",
          choices: [
            "[−3, −1]、[−1, 2]、[2, 4]",
            "[−4, −2]、[−2, 1]、[1, 3]",
            "[−3, 4]、[−1, 2]、[2, 4]",
          ],
          answer: "[−3, −1]、[−1, 2]、[2, 4]",
          feedback: {
            "[−3, −1]、[−1, 2]、[2, 4]": "对，先读出零点 −3, −1, 2, 4，再相邻配对保证三段开区间互不重叠。",
            "[−4, −2]、[−2, 1]、[1, 3]": "符号弄反了：令 x+3=0 得 x=−3，令 x−2=0 得 x=2。",
            "[−3, 4]、[−1, 2]、[2, 4]": "[−3, 4] 套住了另外两段，找出的驻点可能重合，必须取相邻配对。",
          },
          prerequisite: "令每个一次因子等于 0：x+3=0 ⇒ x=−3，依次类推。",
        },
      },
      {
        id: "p217-2",
        goal: "第二步：在三段区间用罗尔定理得「至少 3 个」，再补「至多 3 个」",
        plain: "三段相邻区间各套一次罗尔定理，保证 f′(x)=0 至少有 3 个不同实零点。接下来怎么封住「不会有第 4 个实零点」？",
        formula: math`\begin{gathered}\exists\,\xi_1\in(-3,-1),\;\xi_2\in(-1,2),\\\xi_3\in(2,4),\;f'(\xi_k)=0\end{gathered}`,
        detail: "f(x) 是四次多项式，所以 f′(x) 是三次多项式，至多 3 个实根。",
        check: {
          prompt: "已经证出 f′(x)=0 至少有 3 个不同实根，下一步靠哪条事实把它收紧为「恰有 3 个」？",
          choices: [
            "f′(x) 是三次多项式，代数上至多有 3 个实根",
            "把四个括号全部展开后用求根公式硬算",
            "四个零点之和等于 2",
          ],
          answer: "f′(x) 是三次多项式，代数上至多有 3 个实根",
          feedback: {
            "f′(x) 是三次多项式，代数上至多有 3 个实根": "对，至少 3 个 + 至多 3 个 = 恰好 3 个，完全不需要展开。",
            "把四个括号全部展开后用求根公式硬算": "没必要展开硬算，看最高次幂就能直接封顶。",
            "四个零点之和等于 2": "零点之和不能限制导数实根的个数上限。",
          },
          prerequisite: "四次多项式求导降成三次多项式，n 次多项式最多有 n 个实根。",
        },
      },
      {
        id: "p217-3",
        goal: "第三步：合拢结论并做一道五次多项式迁移题",
        plain: "3≤实零点个数≤3，结论成立，用迁移题检验。",
        formula: math`\deg f'=3\implies\text{恰有 }3\text{ 个不同实零点}`,
        detail: "证毕。",
        transfer: {
          prompt: "迁移练习：设 f(x)=(x+4)(x+1)(x−1)(x−3)(x−6)，不展开原式，判断导方程 f′(x)=0 恰有几个不同的实零点？",
          answer: 4,
          signFeedback: "先数原多项式有几个互异实零点，间隔数等于零点数减 1。",
          remediation: "5 个互异零点构成 4 段相邻区间，罗尔定理得至少 4 根，四次导数至多 4 根，故恰有 4 个。",
          solution: math`\begin{gathered}5\text{ 个互异零点}\implies 4\text{ 段区间至少 }4\text{ 根}\\[4pt]\deg f'=4\implies\text{至多 }4\text{ 根，故恰有 }4\text{ 个}\end{gathered}`,
        },
      },
    ]),
  },

  "jc935-3-1-1": {
    target: "动手算端点对数值并完成链式求导，在复合三角对数函数上完整验证罗尔定理。",
    prerequisites: [
      "熟记 cos(±π/3)=1/2",
      "会用链式法则算 [ln(cos x)]′=−tan x",
    ],
    strategy: "rolle-log-cos",
    solution: math`\begin{gathered}\cos x\ge\frac{1}{2}>0\\[4pt]f\left(-\frac{\pi}{3}\right)=f\left(\frac{\pi}{3}\right)\\[4pt]f'(\xi)=-\tan\xi=0\\[4pt]\implies\xi=0\in\left(-\frac{\pi}{3},\frac{\pi}{3}\right)\end{gathered}`,
    solutionExplanation: "区间内 cos x≥1/2>0 且两端值均为 ln(1/2)，求导得 −tan ξ=0，开区间内唯一解为 ξ=0。",
    steps: buildSteps([
      {
        id: "jc935-3-1-1-1",
        goal: "第一步：算出两端点函数值，并确认真数 cos x>0",
        plain: "在 [−π/3, π/3] 上 cos x 最小值出现在两端点。先把 x=±π/3 代入 f(x)=ln(cos x) 算出端点值。",
        formula: math`\cos x\ge\frac{1}{2}>0,\quad f\left(-\frac{\pi}{3}\right)=\ln\frac{1}{2}=f\left(\frac{\pi}{3}\right)`,
        detail: "cos(±π/3)=1/2>0，故真数恒正且两端同高。",
        check: {
          prompt: "把 x=−π/3 与 x=π/3 代入 f(x)=ln(cos x)，算出的两端点函数值都等于什么？",
          choices: ["ln(1/2)", "ln(√3/2)", "0"],
          answer: "ln(1/2)",
          feedback: {
            "ln(1/2)": "对，cos(±π/3)=1/2>0，既确认了真数恒正，又确认了两端点函数值相等。",
            "ln(√3/2)": "cos(π/3)=cos 60°=1/2，√3/2 是 cos(π/6)。",
            "0": "只有 cos x=1（即 x=0）时 ln(cos x) 才等于 0。",
          },
          prerequisite: "特殊角回忆：π/3=60°，cos 60°=1/2，且 cos(−θ)=cos θ。",
        },
      },
      {
        id: "jc935-3-1-1-2",
        goal: "第二步：用链式法则对 f(x)=ln(cos x) 求导",
        plain: "外层是 ln u，内层是 u=cos x，按链式法则把两层导数乘在一起。",
        formula: math`f'(\xi)=\frac{-\sin\xi}{\cos\xi}=-\tan\xi=0`,
        detail: "(ln u)′=1/u，(cos x)′=−sin x，相乘得 −tan x。",
        check: {
          prompt: "对 f(x)=ln(cos x) 求导，正确的结果是哪一个？",
          choices: ["−sin x / cos x（即 −tan x）", "sin x / cos x（即 tan x）", "1 / cos x"],
          answer: "−sin x / cos x（即 −tan x）",
          feedback: {
            "−sin x / cos x（即 −tan x）": "对，外层 1/cos x 乘以内层 (cos x)′=−sin x，得到 −tan x。",
            "sin x / cos x（即 tan x）": "漏了负号：(cos x)′=−sin x。",
            "1 / cos x": "只求了外层 ln u，漏乘内层 cos x 的导数 −sin x。",
          },
          prerequisite: "看公式表：(cos x)′=−sin x，链式法则要乘内层导数。",
        },
      },
      {
        id: "jc935-3-1-1-3",
        goal: "第三步：解 −tan ξ=0 筛出开区间内的解，并完成迁移题",
        plain: "tan ξ=0 的解为 kπ，落在 (−π/3, π/3) 内的唯一解是 ξ=0。",
        formula: math`\xi=0\in\left(-\frac{\pi}{3},\frac{\pi}{3}\right)`,
        detail: "验证完毕。",
        transfer: {
          prompt: "迁移练习：对 f(x)=ln(cos(x−1)) 在闭区间 [1−π/3, 1+π/3] 上应用罗尔定理，求开区间内使 f′(ξ)=0 的唯一驻点 ξ。",
          answer: 1,
          signFeedback: "令 −tan(ξ−1)=0，找落在 (1−π/3, 1+π/3) 内的解。",
          remediation: "f′(ξ)=−tan(ξ−1)=0，在 (1−π/3, 1+π/3) 内唯一解为 ξ−1=0 即 ξ=1。",
          solution: math`\begin{gathered}f'(\xi)=-\tan(\xi-1)=0\\[4pt]\xi=1\in\left(1-\frac{\pi}{3},1+\frac{\pi}{3}\right)\end{gathered}`,
        },
      },
    ]),
  },

  "jc935-3-1-2": {
    target: "在三次多项式上动手算平均变化率、整理二次中值方程并验算两无理根是否落在 (0, 1) 内。",
    prerequisites: [
      "会求三次多项式导数并解二次方程",
      "会用 2<√7<3 估算无理根范围",
    ],
    strategy: "lagrange-cubic-roots",
    solution: math`\begin{gathered}\frac{f(1)-f(0)}{1-0}=1\\[4pt]9\xi^2-8\xi+2=1\\[4pt]\xi=\frac{4\pm\sqrt{7}}{9}\in(0,1)\end{gathered}`,
    solutionExplanation: "平均变化率为 1，整理得 9ξ²−8ξ+1=0，解得 (4±√7)/9 均落在 (0, 1) 内。",
    steps: buildSteps([
      {
        id: "jc935-3-1-2-1",
        goal: "第一步：算出区间 [0, 1] 上的平均变化率",
        plain: "多项式满足连续可导条件。先代入 x=0 和 x=1 算出 f(0) 与 f(1)，求区间平均斜率。",
        formula: math`\frac{f(1)-f(0)}{1-0}=\frac{2-1}{1}=1`,
        detail: "f(0)=1，f(1)=3−4+2+1=2，平均变化率为 (2−1)/1=1。",
        check: {
          prompt: "对 f(x)=3x³−4x²+2x+1，算出区间 [0, 1] 上的平均变化率 [f(1)−f(0)]/(1−0) 等于多少？",
          choices: ["1", "2", "0"],
          answer: "1",
          feedback: {
            "1": "对，f(1)=2、f(0)=1，差商 (2−1)/1=1。",
            "2": "2 是 f(1) 的值，别忘了减去 f(0)=1。",
            "0": "f(1)=3−4+2+1=2，与 f(0)=1 不相等。",
          },
          prerequisite: "逐项算 f(1)=3−4+2+1=2，f(0)=1。",
        },
      },
      {
        id: "jc935-3-1-2-2",
        goal: "第二步：求导并与平均变化率 1 联立，化为标准二次方程",
        plain: "先求出导函数 f′(ξ)=9ξ²−8ξ+2，令它等于第一步算出的 1，把常数项移到左边整理成标准二次方程。",
        formula: math`9\xi^2-8\xi+2=1\implies 9\xi^2-8\xi+1=0`,
        detail: "移项后常数项 2−1=1，用求根公式得 ξ=(4±√7)/9。",
        check: {
          prompt: "令 f′(ξ)=9ξ²−8ξ+2 等于平均变化率 1，移项整理后的标准二次方程是？",
          choices: ["9ξ² − 8ξ + 1 = 0", "9ξ² − 8ξ + 2 = 0", "9ξ² − 8ξ + 3 = 0"],
          answer: "9ξ² − 8ξ + 1 = 0",
          feedback: {
            "9ξ² − 8ξ + 1 = 0": "对，两边同减 1 得 9ξ²−8ξ+1=0，再用求根公式解出 (4±√7)/9。",
            "9ξ² − 8ξ + 2 = 0": "这是令导数等于 0，忘了等于刚才算出的平均斜率 1。",
            "9ξ² − 8ξ + 3 = 0": "右边的 +1 移到左边要变号成 −1。",
          },
          prerequisite: "移项变号：2−1=1。",
        },
      },
      {
        id: "jc935-3-1-2-3",
        goal: "第三步：用 2<√7<3 确认两根都在 (0, 1) 内，并做迁移题",
        plain: "由 2<√7<3 知 (4−√7)/9∈(1/9, 2/9) 且 (4+√7)/9∈(6/9, 7/9)，两个根全部保留。",
        formula: math`\xi=\frac{4\pm\sqrt{7}}{9}\in(0,1)`,
        detail: "两根均严格落在 (0, 1) 内。",
        transfer: {
          prompt: "迁移练习：对 f(x)=x³−3x²+4 在闭区间 [0, 3] 上应用拉格朗日中值定理，求开区间 (0, 3) 内满足条件的唯一中值点 ξ。",
          answer: 2,
          signFeedback: "先算 [f(3)−f(0)]/3=0，再解 3ξ²−6ξ=0，注意舍去落在端点上的 0。",
          remediation: "f(0)=4、f(3)=4，割线斜率为 0；解 3ξ(ξ−2)=0 得 ξ=0（端点舍去）或 ξ=2∈(0, 3)。",
          solution: math`\begin{gathered}\frac{f(3)-f(0)}{3-0}=\frac{4-4}{3}=0\\[4pt]3\xi^2-6\xi=0\implies\xi=2\in(0,3)\end{gathered}`,
        },
      },
    ]),
  },

  "jc935-3-1-3": {
    target: "亲手算出柯西中值定理两端的增量比与导数比，并用半角公式化简解出 ξ。",
    prerequisites: [
      "能对照公式表套用柯西中值定理 [f(b)−f(a)]/[g(b)−g(a)]=f′(ξ)/g′(ξ)",
      "会用半角公式 sin ξ/(1−cos ξ)=cot(ξ/2)",
    ],
    strategy: "cauchy-mvt-verify",
    solution: math`\begin{gathered}g'(x)=1-\cos x>0\\[4pt]\frac{-2}{\pi-2}=-\cot\frac{\xi}{2}\\[4pt]\implies\xi=2\arctan\frac{\pi-2}{2}\\[4pt]\xi\in\left(0,\frac{\pi}{2}\right)\end{gathered}`,
    solutionExplanation: "先算出增量比 −2/(π−2) 与导数比 −cot(ξ/2)，联立解得 ξ=2arctan((π−2)/2)。",
    steps: buildSteps([
      {
        id: "jc935-3-1-3-1",
        goal: "第一步：算出两端点增量比 [f(π/2)−f(0)]/[g(π/2)−g(0)]",
        plain: "已知 g′(x)=1−cos x>0（在 (0, π/2) 处处不为 0）。先把端点 0 和 π/2 分别代入 f(x)=cos x 与 g(x)=x−sin x，算出左边的增量比。",
        formula: math`\frac{f(\pi/2)-f(0)}{g(\pi/2)-g(0)}=\frac{0-1}{(\pi/2-1)-0}=\frac{-2}{\pi-2}`,
        detail: "分子 0−1=−1，分母 π/2−1=(π−2)/2，相除得 −2/(π−2)。",
        check: {
          prompt: "对 f(x)=cos x、g(x)=x−sin x 在 [0, π/2] 上，增量比 [f(π/2)−f(0)]/[g(π/2)−g(0)] 化简后等于？",
          choices: ["−2 / (π − 2)", "2 / (π − 2)", "−1 / π"],
          answer: "−2 / (π − 2)",
          feedback: {
            "−2 / (π − 2)": "对，分子 0−1=−1，分母 (π/2−1)−0=(π−2)/2，翻上去正是 −2/(π−2)。",
            "2 / (π − 2)": "漏了分子的负号：cos(π/2)−cos(0)=0−1=−1。",
            "−1 / π": "分母 g(π/2)=π/2−sin(π/2)=π/2−1，不是 π。",
          },
          prerequisite: "先算 cos(π/2)=0、cos(0)=1、sin(π/2)=1、sin(0)=0，再通分化简分母。",
        },
      },
      {
        id: "jc935-3-1-3-2",
        goal: "第二步：用半角公式化简导数比 f′(ξ)/g′(ξ)",
        plain: "求导得 f′(ξ)/g′(ξ)=−sin ξ/(1−cos ξ)。用 sin ξ=2sin(ξ/2)cos(ξ/2) 和 1−cos ξ=2sin²(ξ/2) 约分，把它化成单个三角函数。",
        formula: math`\frac{-2}{\pi-2}=\frac{-\sin\xi}{1-\cos\xi}=-\cot\frac{\xi}{2}`,
        detail: "分子分母同约 2sin(ξ/2)，得 −cot(ξ/2)。",
        check: {
          prompt: "把导数比 −sin ξ/(1−cos ξ) 用半角公式约去 2sin(ξ/2) 后，得到什么？",
          choices: ["−cot(ξ/2)", "−tan(ξ/2)", "cot(ξ/2)"],
          answer: "−cot(ξ/2)",
          feedback: {
            "−cot(ξ/2)": "对，约完剩 −cos(ξ/2)/sin(ξ/2)=−cot(ξ/2)，两边消负号取倒数就得 tan(ξ/2)=(π−2)/2。",
            "−tan(ξ/2)": "分子是 cos(ξ/2)、分母是 sin(ξ/2)，比值是余切 cot 不是正切 tan。",
            "cot(ξ/2)": "别弄丢分子 −sin ξ 自带的负号。",
          },
          prerequisite: "cos/sin=cot，sin/cos=tan。",
        },
      },
      {
        id: "jc935-3-1-3-3",
        goal: "第三步：解出 ξ 并做一道代数柯西中值迁移题",
        plain: "由 tan(ξ/2)=(π−2)/2∈(0, 1) 得 ξ=2arctan((π−2)/2)∈(0, π/2)。",
        formula: math`\xi=2\arctan\frac{\pi-2}{2}\in\left(0,\frac{\pi}{2}\right)`,
        detail: "验证完毕。",
        transfer: {
          prompt: "迁移练习：对 f(x)=x³ 与 g(x)=x² 在闭区间 [0, 3] 上应用柯西中值定理，求满足 [f(3)−f(0)]/[g(3)−g(0)]=f′(ξ)/g′(ξ) 的中值点 ξ。",
          answer: 2,
          signFeedback: "先算增量比 (27−0)/(9−0)=3，再化简导数比 3ξ²/(2ξ)=3ξ/2。",
          remediation: "令 3ξ/2=3，解得 ξ=2∈(0, 3)。",
          solution: math`\begin{gathered}\frac{3^3-0}{3^2-0}=3=\frac{3\xi^2}{2\xi}=\frac{3}{2}\xi\\[4pt]\xi=2\in(0,3)\end{gathered}`,
        },
      },
    ]),
  },

  "jc935-3-1-4": {
    target: "亲手完成二次函数的字母化简与方程求解，证明抛物线的中值点恒为区间中点。",
    prerequisites: [
      "会用平方差 d²−c²=(d−c)(d+c) 约分",
      "会解含参数的一次方程",
    ],
    strategy: "parabola-midpoint-proof",
    solution: math`\begin{gathered}\frac{f(d)-f(c)}{d-c}=\alpha(c+d)+\beta\\[4pt]2\alpha\xi+\beta=\alpha(c+d)+\beta\\[4pt]\xrightarrow{\alpha\neq 0}\xi=\frac{c+d}{2}\end{gathered}`,
    solutionExplanation: "约去 (d−c) 得平均斜率 α(c+d)+β，与导数 2αξ+β 联立并除以 2α 得 ξ=(c+d)/2。",
    steps: buildSteps([
      {
        id: "jc935-3-1-4-1",
        goal: "第一步：展开 [f(d)−f(c)]/(d−c) 并约去 (d−c)",
        plain: "把 f(d)−f(c) 按同次项合并成 α(d²−c²)+β(d−c)，用平方差拆开后除以 (d−c)。",
        formula: math`\begin{gathered}\frac{f(d)-f(c)}{d-c}=\frac{\alpha(d^2-c^2)+\beta(d-c)}{d-c}\\[4pt]=\alpha(c+d)+\beta\end{gathered}`,
        detail: "常数 γ 相减抵消，约去 (d−c) 后得 α(c+d)+β。",
        check: {
          prompt: "对 f(x)=αx²+βx+γ，把 [f(d)−f(c)]/(d−c) 展开约分后等于什么？",
          choices: ["α(c + d) + β", "α(d − c) + β", "2α(c + d) + β"],
          answer: "α(c + d) + β",
          feedback: {
            "α(c + d) + β": "对，(d²−c²)/(d−c)=c+d，(d−c)/(d−c)=1，合起来就是 α(c+d)+β。",
            "α(d − c) + β": "平方差 d²−c²=(d−c)(d+c)，约掉 (d−c) 后剩下的是 (c+d)。",
            "2α(c + d) + β": "平方差展开没有系数 2，系数 2 出现在导数 2αξ 里。",
          },
          prerequisite: "平方差公式：d²−c²=(d−c)(d+c)。",
        },
      },
      {
        id: "jc935-3-1-4-2",
        goal: "第二步：联立 f′(ξ)=2αξ+β 与平均斜率，解出 ξ",
        plain: "两边先消去 β，再利用题设 α≠0 两边同除以 2α，直接解出 ξ。",
        formula: math`\begin{gathered}2\alpha\xi=\alpha(c+d)\\[4pt]\xrightarrow{\alpha\neq 0}\xi=\frac{c+d}{2}\end{gathered}`,
        detail: "因 α≠0 可安全除以 2α，得到唯一中值点 (c+d)/2。",
        check: {
          prompt: "从 2αξ+β=α(c+d)+β 解出 ξ（已知 α≠0），结果是？",
          choices: ["(c + d) / 2", "c + d", "(d − c) / 2"],
          answer: "(c + d) / 2",
          feedback: {
            "(c + d) / 2": "对，消去 β 再除以 2α，抛物线的中值点恒为区间中点！",
            "c + d": "别忘了除以左边的系数 2。",
            "(d − c) / 2": "括号里是相加 (c+d) 而不是相减 (d−c)。",
          },
          prerequisite: "消去 β 后得 2αξ=α(c+d)，两边同除以 2α。",
        },
      },
      {
        id: "jc935-3-1-4-3",
        goal: "第三步：记住抛物线中点结论，并完成迁移题",
        plain: "以后凡是二次函数求拉格朗日中值点，都能直接用区间中点秒验算。",
        formula: math`\xi=\frac{c+d}{2}\in(c,d)`,
        detail: "证毕。",
        transfer: {
          prompt: "迁移练习：设二次函数 f(x)=−5x²+11x−7 在闭区间 [2, 8] 上应用拉格朗日中值定理，直接写出唯一中值点 ξ。",
          answer: 5,
          signFeedback: "二次函数的中值点恒为区间中点 (2+8)/2。",
          remediation: "因二次项系数 −5≠0，中值点恒为 (2+8)/2=5。",
          solution: math`\xi=\frac{2+8}{2}=5\in(2,8)`,
        },
      },
    ]),
  },

  "jc935-3-1-5": {
    target: "直接从因式分解读出四个零点切分区间，并用「罗尔至少 + 导数次数至多」精准定位全部实根。",
    prerequisites: [
      "能直接读出一次因子的零点并升序排列",
      "知道三次多项式至多 3 个实根",
    ],
    strategy: "rolle-polynomial-intervals",
    solution: math`\begin{gathered}(-2,1),\;(1,4),\;(4,7)\\[4pt]\text{各至少有一个实根}\\[4pt]\deg f'=3\implies\text{恰有 }3\text{ 个实根}\end{gathered}`,
    solutionExplanation: "四零点分三段区间得至少 3 根，三次导数至多 3 根，故恰有 3 根。",
    steps: buildSteps([
      {
        id: "jc935-3-1-5-1",
        goal: "第一步：不展开原式，直接切出三段相邻开区间",
        plain: "令每个括号等于 0 读出四个零点，按从小到大排好，相邻两点构成三段互不重叠的区间。",
        formula: math`f(-2)=f(1)=f(4)=f(7)=0`,
        detail: "零点为 −2<1<4<7，对应三段开区间 (−2, 1)、(1, 4)、(4, 7)。",
        check: {
          prompt: "对 f(x)=(x+2)(x−1)(x−4)(x−7)，相邻零点构成的三个开区间是哪一组？",
          choices: [
            "(−2, 1)、(1, 4)、(4, 7)",
            "(−7, −4)、(−4, −1)、(−1, 2)",
            "(−2, 4)、(1, 7)、(4, 7)",
          ],
          answer: "(−2, 1)、(1, 4)、(4, 7)",
          feedback: {
            "(−2, 1)、(1, 4)、(4, 7)": "对，零点是 −2, 1, 4, 7，相邻配对后三段开区间互不相交。",
            "(−7, −4)、(−4, −1)、(−1, 2)": "符号全反了：x−4=0 的根是 +4 不是 −4。",
            "(−2, 4)、(1, 7)、(4, 7)": "区间互相重叠无法保证找出的三个根互异，必须相邻配对。",
          },
          prerequisite: "令 x+2=0 得 −2，令 x−1=0 得 1，依次读出。",
        },
      },
      {
        id: "jc935-3-1-5-2",
        goal: "第二步：用罗尔定理得「至少 3 根」，再结合导数次数封顶",
        plain: "在三段区间各套一次罗尔定理，得到每段内至少有 1 个导数实根；下一步如何把「至少 3 个」收紧为「恰有 3 个」？",
        formula: math`\begin{gathered}\xi_1\in(-2,1),\;\xi_2\in(1,4),\;\xi_3\in(4,7)\\[4pt]\deg f'=3\implies\text{恰有 }3\text{ 个实根}\end{gathered}`,
        detail: "至少 3 根 + 至多 3 根 = 恰有 3 根。",
        check: {
          prompt: "在这三段开区间各找到至少 1 个实根后，如何证明不会有第 4 个实根？",
          choices: [
            "指出 f′(x) 是三次多项式，至多有 3 个实根",
            "把原式展开后再求一次导",
            "在 (−2, 7) 上再套一次拉格朗日中值定理",
          ],
          answer: "指出 f′(x) 是三次多项式，至多有 3 个实根",
          feedback: {
            "指出 f′(x) 是三次多项式，至多有 3 个实根": "对，四次多项式求导变三次，最多 3 个实根，立刻锁死「恰有 3 个」。",
            "把原式展开后再求一次导": "题目要求不展开不显式求导，直接看次数就够了。",
            "在 (−2, 7) 上再套一次拉格朗日中值定理": "再套定理只能多证存在性，不能给出根个数的上限。",
          },
          prerequisite: "四次多项式的一阶导数是三次多项式。",
        },
      },
      {
        id: "jc935-3-1-5-3",
        goal: "第三步：做一道六零点高次多项式迁移题",
        plain: "掌握规律后，任意个互异一次因子的导方程实根数都能秒答。",
        formula: math`\begin{gathered}\text{共 }3\text{ 个实根，分别在}\\[4pt](-2,1),\;(1,4),\;(4,7)\text{ 内}\end{gathered}`,
        detail: "完成定位。",
        transfer: {
          prompt: "迁移练习：不展开也不求导，判断 f(x)=(x+5)(x+2)(x−1)(x−4)(x−7)(x−10) 的导方程 f′(x)=0 恰有几个实根？",
          answer: 5,
          signFeedback: "先数原式有几个互异实零点，答案等于零点数减 1。",
          remediation: "6 个互异零点构成 5 段相邻闭区间，罗尔定理得至少 5 根，五次导数至多 5 根，故恰有 5 个实根。",
          solution: math`\begin{gathered}6\text{ 个互异零点}\implies 5\text{ 段区间至少 }5\text{ 根}\\[4pt]\deg f'=5\implies\text{至多 }5\text{ 根，故恰有 }5\text{ 个}\end{gathered}`,
        },
      },
    ]),
  },

  "jc935-3-1-6": {
    target: "动手用链式法则算出 [arctan(1/x)]′ 证导数恒为零，再代特值锁定恒等式常数。",
    prerequisites: [
      "熟记 (arctan u)′=1/(1+u²) 与 (1/x)′=−1/x²",
      "熟记 arctan 1=π/4",
    ],
    strategy: "zero-derivative-identity",
    solution: math`\begin{gathered}f'(x)=\frac{1}{1+x^2}-\frac{1}{x^2+1}\equiv 0\ (x>0)\\[4pt]f(x)\equiv f(1)=\frac{\pi}{4}+\frac{\pi}{4}=\frac{\pi}{2}\end{gathered}`,
    solutionExplanation: "链式求导得 f′(x)≡0（x>0），在单区间 (0, +∞) 内代 x=1 定出常数 π/2。",
    steps: buildSteps([
      {
        id: "jc935-3-1-6-1",
        goal: "第一步：对 f(x)=arctan x+arctan(1/x) 求导并化简第二项",
        plain: "第一项导数是 1/(1+x²)。对第二项 arctan(1/x) 用链式法则求导，把分母乘进去化简，看看两项能不能抵消。",
        formula: math`\begin{gathered}f'(x)=\frac{1}{1+x^2}+\frac{1}{1+1/x^2}\cdot\left(-\frac{1}{x^2}\right)\\[4pt]=\frac{1}{1+x^2}-\frac{1}{x^2+1}=0\end{gathered}`,
        detail: "x²(1+1/x²)=x²+1，故第二项导数化简为 −1/(x²+1)，与第一项抵消成 0。",
        check: {
          prompt: "对第二项 arctan(1/x) 用链式法则求导并化简，结果等于什么？",
          choices: ["−1 / (x² + 1)", "1 / (x² + 1)", "−1 / (1 + 1/x²)"],
          answer: "−1 / (x² + 1)",
          feedback: {
            "−1 / (x² + 1)": "对，[1/(1+1/x²)]·(−1/x²)=−1/(x²+1)，正好把第一项 1/(1+x²) 抵消为 0。",
            "1 / (x² + 1)": "漏掉了内层 (1/x)′=−1/x² 带来的负号。",
            "−1 / (1 + 1/x²)": "漏乘了内层导数因子 1/x²，没法化简成 x²+1。",
          },
          prerequisite: "链式法则：[arctan(1/x)]′=[1/(1+(1/x)²)]·(−1/x²)，把 x² 乘进分母。",
        },
      },
      {
        id: "jc935-3-1-6-2",
        goal: "第二步：在 (0, +∞) 内挑特值 x=1 算出常数值",
        plain: "因为 f′(x)≡0 在单个区间 (0, +∞) 上成立，f(x) 恒为常数。代入最好算的 x=1，算出常数的值。",
        formula: math`f(x)\equiv f(1)=\arctan 1+\arctan 1=\frac{\pi}{2}`,
        detail: "arctan 1=π/4，两项相加得 π/2（注意 x<0 时因跨断点 x=0 需另代 x=−1 得 −π/2）。",
        check: {
          prompt: "代入特殊点 x=1，算出 f(1)=arctan 1+arctan(1/1) 等于多少？",
          choices: ["π / 2", "π / 4", "π"],
          answer: "π / 2",
          feedback: {
            "π / 2": "对，arctan 1=π/4，两个 π/4 相加正好是 π/2，证明完成。",
            "π / 4": "π/4 只是其中一项 arctan 1 的值，两项相加是 π/2。",
            "π": "tan(π/4)=1，不是 π/2，两项之和是 π/2。",
          },
          prerequisite: "tan(π/4)=1 ⇒ arctan 1=π/4。",
        },
      },
      {
        id: "jc935-3-1-6-3",
        goal: "第三步：用一道零导数恒等式迁移题巩固套路",
        plain: "「构造函数 → 求导为 0 → 区间内代特值」是证恒等式的标准三步。",
        formula: math`\arctan x+\arctan\frac{1}{x}=\frac{\pi}{2}\quad (x>0)`,
        detail: "证毕。",
        transfer: {
          prompt: "迁移练习：设 f(x)=sin²x+cos²x+4（x∈R），先验证 f′(x)≡0，再代特殊值 x=0 确定该常数函数的值。",
          answer: 5,
          signFeedback: "代 x=0 时 sin 0=0、cos 0=1，再加 4。",
          remediation: "f′(x)=2sin x cos x−2cos x sin x≡0，故 f(x)≡f(0)=0+1+4=5。",
          solution: math`\begin{gathered}f'(x)=2\sin x\cos x-2\cos x\sin x\equiv 0\\[4pt]f(x)\equiv f(0)=0+1+4=5\end{gathered}`,
        },
      },
    ]),
  },

  "jc935-3-1-7": {
    target: "面对只给一个根的高次方程，学会发现无常数项自带的隐藏零点 x=0 并套用罗尔定理。",
    prerequisites: [
      "能识别导方程正是原多项式的导数",
      "能在 [−r, 0] 上应用罗尔定理",
    ],
    strategy: "rolle-hidden-zero-origin",
    solution: math`\begin{gathered}f(-r)=0=f(0)\ (r>0)\\[4pt]\exists\,\xi\in(-r,0),\;f'(\xi)=0\end{gathered}`,
    solutionExplanation: "发现隐藏零点 f(0)=0 后，在 [−r, 0] 上用罗尔定理即得导方程在 (−r, 0) 内有负根。",
    steps: buildSteps([
      {
        id: "jc935-3-1-7-1",
        goal: "第一步：破题——从原方程找出第二个隐藏零点",
        plain: "要证的方程正好是原多项式 f(x)=b₀xⁿ+⋯+bₙ₋₁x 的导方程 f′(x)=0。想用罗尔定理需要两个零点，题干只给了一个负根 x=−r，第二个零点藏在哪？",
        formula: math`f(x)=b_0x^n+b_1x^{n-1}+\cdots+b_{n-1}x,\quad f(0)=0`,
        detail: "原多项式没有常数项，每一项都含 x，故 x=0 天然满足 f(0)=0。",
        check: {
          prompt: "题干只给了负根 x=−r，从原多项式 b₀xⁿ+⋯+bₙ₋₁x 可以直接看出哪个隐藏零点？",
          choices: ["x = 0（因无常数项，f(0) = 0）", "x = r", "x = 1"],
          answer: "x = 0（因无常数项，f(0) = 0）",
          feedback: {
            "x = 0（因无常数项，f(0) = 0）": "对，所有项都带 x，代入 x=0 立得 f(0)=0，正好凑齐罗尔定理的两个端点！",
            "x = r": "多项式不一定是偶函数，x=r 不一定是零点。",
            "x = 1": "系数 bₖ 任意，不能保证 b₀+b₁+⋯+bₙ₋₁=0。",
          },
          prerequisite: "想用罗尔定理却少一个零点时，先代 x=0 看有没有常数项。",
        },
      },
      {
        id: "jc935-3-1-7-2",
        goal: "第二步：选定闭区间 [−r, 0] 套用罗尔定理得出负根",
        plain: "已知 r>0，所以 −r<0，闭区间 [−r, 0] 两端点同为 0。直接调用罗尔定理，看结论落在哪个区间。",
        formula: math`f(-r)=f(0)=0\implies\exists\,\xi\in(-r,0),\;f'(\xi)=0`,
        detail: "开区间 (−r, 0) 里的数全是负数，故导方程必有一负根。",
        check: {
          prompt: "在闭区间 [−r, 0] 上对 f(x) 套用罗尔定理，能直接推出哪条结论？",
          choices: [
            "存在 ξ ∈ (−r, 0) 使 f′(ξ) = 0，即导方程在 (−r, 0) 内有负根",
            "存在 ξ ∈ (0, r) 使 f′(ξ) = 0",
            "f(x) 在 [−r, 0] 上恒等于 0",
          ],
          answer: "存在 ξ ∈ (−r, 0) 使 f′(ξ) = 0，即导方程在 (−r, 0) 内有负根",
          feedback: {
            "存在 ξ ∈ (−r, 0) 使 f′(ξ) = 0，即导方程在 (−r, 0) 内有负根": "对，中值点落在 (−r, 0) 内必为负，正好命中题干要求。",
            "存在 ξ ∈ (0, r) 使 f′(ξ) = 0": "我们用的是左半轴区间 [−r, 0]，不是 [0, r]。",
            "f(x) 在 [−r, 0] 上恒等于 0": "罗尔定理只保证存在切线水平的点，不说明函数恒为零。",
          },
          prerequisite: "端点是 −r 和 0，所以中值点严格夹在 −r 与 0 之间。",
        },
      },
      {
        id: "jc935-3-1-7-3",
        goal: "第三步：用具体二次方程做一道迁移题",
        plain: "换个具体例子算一遍，感受导方程负根夹在 −r 与 0 之间。",
        formula: math`\exists\,\xi\in(-r,0),\quad f'(\xi)=0`,
        detail: "证毕。",
        transfer: {
          prompt: "迁移练习：方程 x²+6x=0 有负根 −6 和隐藏零点 0，求其导方程 2x+6=0 落在 (−6, 0) 内的负根 ξ。",
          answer: -3,
          signFeedback: "答案是负数，位于 −6 和 0 之间。",
          remediation: "令 f′(ξ)=2ξ+6=0，解得 ξ=−3∈(−6, 0)。",
          solution: math`f'(\xi)=2\xi+6=0\implies\xi=-3\in(-6,0)`,
        },
      },
    ]),
  },

  "jc935-3-1-8": {
    target: "掌握证明二阶导零点的核心策略：先用一次罗尔找 G′(η)=0，再求导找 G′(−1)=0 连用第二次罗尔。",
    prerequisites: [
      "会用乘积法则求 [(x+1)²g(x)]′",
      "理解连续两次使用罗尔定理可降到二阶导数",
    ],
    strategy: "double-rolle-second-deriv",
    solution: math`\begin{gathered}G(-1)=G(2)=0\implies\exists\,\eta\in(-1,2),\;G'(\eta)=0\\[4pt]G'(-1)=0=G'(\eta)\implies\exists\,\xi\in(-1,\eta),\;G''(\xi)=0\end{gathered}`,
    solutionExplanation: "先对 G 在 [−1, 2] 用罗尔得 G′(η)=0，再展开 G′(x) 得 G′(−1)=0，在 [−1, η] 再用一次罗尔。",
    steps: buildSteps([
      {
        id: "jc935-3-1-8-1",
        goal: "第一步：破题——规划两次罗尔定理的路线图",
        plain: "一次罗尔只能从 G 降到 G′，要证 G″(ξ)=0 必须连用两次。由 G(−1)=0 和 G(2)=9g(2)=0，第一次罗尔先给出 η∈(−1, 2) 使 G′(η)=0。下一轮对 G′ 用罗尔，要去哪找第二个零点？",
        formula: math`G(-1)=0=G(2)\implies\exists\,\eta\in(-1,2),\;G'(\eta)=0`,
        detail: "关键是验证 G′(−1)=0，从而把 [−1, η] 送进第二次罗尔定理。",
        check: {
          prompt: "第一次罗尔拿到 G′(η)=0 后，为了对 G′ 再用一次罗尔推出 G″(ξ)=0，下一步该怎么做？",
          choices: [
            "求 G′(x) 并验证 G′(−1)=0，在 [−1, η] 上再套一次罗尔定理",
            "去算 G′(2)=0，在 [η, 2] 上再套一次罗尔定理",
            "直接对 g(x) 在 [−1, 2] 上用罗尔定理",
          ],
          answer: "求 G′(x) 并验证 G′(−1)=0，在 [−1, η] 上再套一次罗尔定理",
          feedback: {
            "求 G′(x) 并验证 G′(−1)=0，在 [−1, η] 上再套一次罗尔定理": "对，二重因子 (x+1)² 在 x=−1 处会把一阶导也压成 0，正好配成新区间 [−1, η]。",
            "去算 G′(2)=0，在 [η, 2] 上再套一次罗尔定理": "题干没给 g′(2)=0，无法推出 G′(2)=0。",
            "直接对 g(x) 在 [−1, 2] 上用罗尔定理": "题干只给了 g(2)=0，没给 g(−1)=0，不能直接对 g 用罗尔。",
          },
          prerequisite: "要证 G″=0 就对 G′ 用罗尔，盯着二重因子 (x+1)² 所在点 x=−1。",
        },
      },
      {
        id: "jc935-3-1-8-2",
        goal: "第二步：用乘积法则动手写出 G′(x)，算出 G′(−1)=0",
        plain: "对 G(x)=(x+1)²g(x) 用乘积求导法则展开，看看为什么代入 x=−1 必然得 0。",
        formula: math`\begin{gathered}G'(x)=2(x+1)g(x)+(x+1)^2g'(x)\\[4pt]G'(-1)=0\end{gathered}`,
        detail: "两项都含因子 (x+1)，代入 x=−1 立刻得 G′(−1)=0。",
        check: {
          prompt: "对 G(x)=(x+1)²g(x) 用乘积法则求导，G′(x) 等于什么？",
          choices: [
            "2(x+1)g(x) + (x+1)²g′(x)",
            "2(x+1)g′(x)",
            "(x+1)²g′(x)",
          ],
          answer: "2(x+1)g(x) + (x+1)²g′(x)",
          feedback: {
            "2(x+1)g(x) + (x+1)²g′(x)": "对，前导后不导 + 前不导后导，两项都留着 (x+1)，代入 −1 稳稳为 0。",
            "2(x+1)g′(x)": "乘积求导不是「各自求导再相乘」，必须是 u′v+uv′。",
            "(x+1)²g′(x)": "漏掉了第一项 [(x+1)²]′·g(x)。",
          },
          prerequisite: "看公式表乘积法则：(uv)′=u′v+uv′。",
        },
      },
      {
        id: "jc935-3-1-8-3",
        goal: "第三步：在 [−1, η] 上第二次用罗尔定理，并用特例迁移",
        plain: "由 G′(−1)=G′(η)=0，在 [−1, η] 上再用一次罗尔定理即得 ξ∈(−1, η)⊂(−1, 2) 使 G″(ξ)=0。",
        formula: math`\exists\,\xi\in(-1,\eta)\subset(-1,2),\quad G''(\xi)=0`,
        detail: "证毕。",
        transfer: {
          prompt: "迁移练习：取特例 g(x)=x−2，则 G(x)=(x+1)²(x−2) 满足题设。直接展开或求两次导，求出 (−1, 2) 内使 G″(ξ)=0 的唯一 ξ。",
          answer: 0,
          signFeedback: "先算 G(x)=x³−3x−2，再求二阶导 G″(x)=6x。",
          remediation: "G(x)=x³−3x−2，G′(x)=3x²−3，G″(x)=6x=0 得 ξ=0∈(−1, 2)。",
          solution: math`\begin{gathered}G(x)=x^3-3x-2,\;G''(x)=6x\\[4pt]6\xi=0\implies\xi=0\in(-1,2)\end{gathered}`,
        },
      },
    ]),
  },

  "jc935-3-1-9": {
    target: "学会从双边不等式中间的 uᵖ−vᵖ 反推出辅助函数与区间，并正确处理负指数 p−1<0 的放缩方向。",
    prerequisites: [
      "会用幂函数求导 (xᵖ)′=pxᵖ⁻¹",
      "知道负指数幂函数在 (0, +∞) 上严格递减",
    ],
    strategy: "lagrange-power-inequality",
    solution: math`\begin{gathered}u^p-v^p=p\xi^{p-1}(u-v)\ (\xi\in(v,u))\\[4pt]p-1<0\implies u^{p-1}<\xi^{p-1}<v^{p-1}\\[4pt]pu^{p-1}(u-v)<u^p-v^p\\[4pt]<pv^{p-1}(u-v)\end{gathered}`,
    solutionExplanation: "对 f(x)=xᵖ 在 [v, u] 上用拉格朗日中值定理，再由 p−1<0 反向放缩 ξᵖ⁻¹。",
    steps: buildSteps([
      {
        id: "jc935-3-1-9-1",
        goal: "第一步：破题——确定目标函数与拉格朗日区间",
        plain: "盯着不等式中间的 uᵖ−vᵖ 和两边的 (u−v)，这正是同结构函数值之差配区间长度。第一步该选哪个函数、在哪个闭区间用中值定理？",
        formula: math`u^p-v^p=p\xi^{p-1}(u-v),\quad \xi\in(v,u)`,
        detail: "取 f(x)=xᵖ 在 [v, u] 上应用拉格朗日中值定理。",
        check: {
          prompt: "面对 puᵖ⁻¹(u−v) < uᵖ−vᵖ < pvᵖ⁻¹(u−v)（u>v>0），第一步应选什么函数和区间？",
          choices: [
            "选 f(x) = xᵖ，在闭区间 [v, u] 上用拉格朗日中值定理",
            "选 f(x) = pxᵖ⁻¹，在 [v, u] 上用罗尔定理",
            "选 f(x) = xᵖ，在闭区间 [0, 1] 上用拉格朗日中值定理",
          ],
          answer: "选 f(x) = xᵖ，在闭区间 [v, u] 上用拉格朗日中值定理",
          feedback: {
            "选 f(x) = xᵖ，在闭区间 [v, u] 上用拉格朗日中值定理": "对，这样立刻把 uᵖ−vᵖ 变成 pξᵖ⁻¹(u−v)，和目标左右两边严丝合缝。",
            "选 f(x) = pxᵖ⁻¹，在 [v, u] 上用罗尔定理": "pxᵖ⁻¹ 是导数不是原函数，且两端点值不相等不能用罗尔定理。",
            "选 f(x) = xᵖ，在闭区间 [0, 1] 上用拉格朗日中值定理": "区间端点必须对齐题干中的 v 和 u（v<u）。",
          },
          prerequisite: "看到 f(u)−f(v) 配 (u−v)，直接以 [v, u] 为区间对 f 用拉格朗日中值定理。",
        },
      },
      {
        id: "jc935-3-1-9-2",
        goal: "第二步：根据 0<p<1（即 p−1<0）判断 ξᵖ⁻¹ 的放缩方向",
        plain: "现在已有 0<v<ξ<u，需要给 ξᵖ⁻¹ 找上下界。特别留意 0<p<1 意味着指数 p−1<0，幂函数是递减的！",
        formula: math`0<v<\xi<u\xrightarrow{p-1<0}u^{p-1}<\xi^{p-1}<v^{p-1}`,
        detail: "负指数递减，所以越大反而越小：uᵖ⁻¹<ξᵖ⁻¹<vᵖ⁻¹。",
        check: {
          prompt: "由 0<v<ξ<u 且 0<p<1（即 p−1<0），放缩 ξᵖ⁻¹ 得到的正确不等式是？",
          choices: [
            "uᵖ⁻¹ < ξᵖ⁻¹ < vᵖ⁻¹",
            "vᵖ⁻¹ < ξᵖ⁻¹ < uᵖ⁻¹",
            "0 < ξᵖ⁻¹ < 1",
          ],
          answer: "uᵖ⁻¹ < ξᵖ⁻¹ < vᵖ⁻¹",
          feedback: {
            "uᵖ⁻¹ < ξᵖ⁻¹ < vᵖ⁻¹": "对，p−1<0 时底数越大幂越小，不等号调头，再乘正数 p(u−v) 即证！",
            "vᵖ⁻¹ < ξᵖ⁻¹ < uᵖ⁻¹": "方向写反了：试试 p=1/2，9<16 但 1/√16 < 1/√9。",
            "0 < ξᵖ⁻¹ < 1": "没有利用两端点 u、v，放缩不出目标式的左右两边。",
          },
          prerequisite: "不确定方向时取 p=1/2、v=9、u=16 代入 1/√x 试一下。",
        },
      },
      {
        id: "jc935-3-1-9-3",
        goal: "第三步：同乘正数 p(u−v) 收尾，并做一道数值迁移题",
        plain: "两边同乘 p(u−v)>0 不变号，代回即证。",
        formula: math`\begin{gathered}pu^{p-1}(u-v)<u^p-v^p\\[4pt]<pv^{p-1}(u-v)\end{gathered}`,
        detail: "证毕。",
        transfer: {
          prompt: "迁移练习：取 p=1/2, v=9, u=16，由 √16−√9=(1/(2√ξ))(16−9) 精确求出中值点 ξ（可用小数表示）。",
          answer: 12.25,
          signFeedback: "先算 1=7/(2√ξ)，解出 √ξ=3.5，再平方得 ξ。",
          remediation: "√16−√9=1=7/(2√ξ) 得 √ξ=7/2=3.5，故 ξ=49/4=12.25∈(9, 16)。",
          solution: math`\begin{gathered}1=\frac{16-9}{2\sqrt{\xi}}\implies \sqrt{\xi}=\frac{7}{2}\\[4pt]\xi=\frac{49}{4}=12.25\in(9,16)\end{gathered}`,
        },
      },
    ]),
  },

  "jc935-3-1-10": {
    target: "学会把对数商拆成对数差来套拉格朗日中值定理，并正确执行正数取倒数反向放缩。",
    prerequisites: [
      "会用 ln(A/B)=ln A−ln B",
      "知道 0<a<b<c 取倒数得 1/c<1/b<1/a",
    ],
    strategy: "lagrange-log-bounds",
    solution: math`\begin{gathered}\ln\frac{1+x}{1+y}=\ln(1+x)-\ln(1+y)\\[4pt]=\frac{x-y}{1+\xi},\quad 0<1+y<1+\xi<1+x\\[4pt]\frac{x-y}{1+x}<\ln\frac{1+x}{1+y}<\frac{x-y}{1+y}\end{gathered}`,
    solutionExplanation: "把对数商拆差后对 ln(1+t) 用中值定理，再由 0<1+y<1+ξ<1+x 取倒数并乘 x−y。",
    steps: buildSteps([
      {
        id: "jc935-3-1-10-1",
        goal: "第一步：破题——把商的对数拆成对数差，选出目标函数",
        plain: "中间是单个对数 ln[(1+x)/(1+y)]，看不出函数差 f(x)−f(y)。先用对数运算法则把它拆开，锁定要用的函数和区间。",
        formula: math`\ln(1+x)-\ln(1+y)=\frac{x-y}{1+\xi},\quad \xi\in(y,x)`,
        detail: "拆成 ln(1+x)−ln(1+y)，对 f(t)=ln(1+t) 在 [y, x] 上用拉格朗日中值定理。",
        check: {
          prompt: "要把 ln[(1+x)/(1+y)] 接入拉格朗日中值定理，第一步最关键的变形是什么？",
          choices: [
            "拆成 ln(1+x) − ln(1+y)，对 f(t)=ln(1+t) 在 [y, x] 上用中值定理",
            "拆成 ln(1+x) / ln(1+y)",
            "直接对 f(t)=1/(1+t) 在 [y, x] 上用中值定理",
          ],
          answer: "拆成 ln(1+x) − ln(1+y)，对 f(t)=ln(1+t) 在 [y, x] 上用中值定理",
          feedback: {
            "拆成 ln(1+x) − ln(1+y)，对 f(t)=ln(1+t) 在 [y, x] 上用中值定理": "对，拆成差值后直接得 (x−y)/(1+ξ)，立刻和目标分式接轨。",
            "拆成 ln(1+x) / ln(1+y)": "记住对数性质：商的对数等于对数的差，不是对数的商。",
            "直接对 f(t)=1/(1+t) 在 [y, x] 上用中值定理": "1/(1+t) 是导数不是原函数，对它求导会出现 −1/(1+t)²。",
          },
          prerequisite: "对数核心性质：ln(A/B)=ln A−ln B。",
        },
      },
      {
        id: "jc935-3-1-10-2",
        goal: "第二步：由 0<1+y<1+ξ<1+x 取倒数完成双边放缩",
        plain: "已知 x>y>−1，所以 1+y、1+ξ、1+x 全为正数且依次递增。对这三个正数同时取倒数，看看谁在左、谁在右。",
        formula: math`\begin{gathered}\frac{1}{1+x}<\frac{1}{1+\xi}<\frac{1}{1+y}\\[4pt]\implies\frac{x-y}{1+x}<\frac{x-y}{1+\xi}<\frac{x-y}{1+y}\end{gathered}`,
        detail: "取倒数不等号反向，再同乘正数 x−y 即证。",
        check: {
          prompt: "对 0 < 1+y < 1+ξ < 1+x 各项取倒数，得到的正确不等式是？",
          choices: [
            "1/(1+x) < 1/(1+ξ) < 1/(1+y)",
            "1/(1+y) < 1/(1+ξ) < 1/(1+x)",
            "1+x < 1+ξ < 1+y",
          ],
          answer: "1/(1+x) < 1/(1+ξ) < 1/(1+y)",
          feedback: {
            "1/(1+x) < 1/(1+ξ) < 1/(1+y)": "对，正数分母越大分数值越小，再同乘正数 (x−y) 就得到原不等式。",
            "1/(1+y) < 1/(1+ξ) < 1/(1+x)": "取倒数忘了把不等号调头。",
            "1+x < 1+ξ < 1+y": "已知 x>y，所以 1+x 最大、1+y 最小。",
          },
          prerequisite: "例子：0<2<3<4 ⇒ 1/4<1/3<1/2。",
        },
      },
      {
        id: "jc935-3-1-10-3",
        goal: "第三步：代具体数估算 ln 2 下界，检验掌握",
        plain: "用刚证出的结论可以直接手算 ln 2 的上下界。",
        formula: math`\frac{x-y}{1+x}<\ln\frac{1+x}{1+y}<\frac{x-y}{1+y}`,
        detail: "证毕。",
        transfer: {
          prompt: "迁移练习：把 y=1, x=3 代入本题结论估界 ln[(1+3)/(1+1)]=ln 2，求出该不等式给出的下界数值（小数或分数）。",
          answer: 0.5,
          signFeedback: "下界分母是较大的 1+x=4，分子是 x−y=2。",
          remediation: "下界为 (x−y)/(1+x)=(3−1)/(1+3)=2/4=0.5（确实小于 ln 2≈0.693）。",
          solution: math`\frac{3-1}{1+3}=\frac{2}{4}=\frac{1}{2}=0.5<\ln 2`,
        },
      },
    ]),
  },

  "jc935-3-1-11-1": {
    target: "动手用链式法则写出 sin(2t) 的中值等式，再取绝对值利用 |cos(2ξ)|≤1 一步放缩。",
    prerequisites: [
      "会用链式法则算 [sin(2t)]′=2cos(2t)",
      "知道 |cos θ|≤1 恒成立",
    ],
    strategy: "lagrange-lipschitz-sine",
    solution: math`\begin{gathered}u=v\text{ 显然成立；}u\neq v\text{ 时：}\\[4pt]|\sin(2u)-\sin(2v)|\\[4pt]=2|\cos(2\xi)||u-v|\le 2|u-v|\end{gathered}`,
    solutionExplanation: "先单列 u=v，u≠v 时中值定理得 2cos(2ξ)(u−v)，取绝对值并放缩 |cos(2ξ)|≤1。",
    steps: buildSteps([
      {
        id: "jc935-3-1-11-1-1",
        goal: "第一步：对 f(t)=sin(2t) 写出拉格朗日中值等式",
        plain: "u=v 时两边都是 0 显然成立。当 u≠v 时，对 f(t)=sin(2t) 用拉格朗日中值定理，先准确写出 f′(ξ)(u−v)。",
        formula: math`\sin(2u)-\sin(2v)=2\cos(2\xi)(u-v)`,
        detail: "链式法则给出 f′(t)=2cos(2t)，不能漏掉因子 2。",
        check: {
          prompt: "当 u≠v 时对 f(t)=sin(2t) 套拉格朗日中值定理，等式右边 f′(ξ)(u−v) 等于什么？",
          choices: [
            "2cos(2ξ)(u − v)",
            "cos(2ξ)(u − v)",
            "−2cos(2ξ)(u − v)",
          ],
          answer: "2cos(2ξ)(u − v)",
          feedback: {
            "2cos(2ξ)(u − v)": "对，外层 sin 导成 cos(2ξ)，再乘内层 (2t)′=2。",
            "cos(2ξ)(u − v)": "漏乘了链式法则里的内层导数 2。",
            "−2cos(2ξ)(u − v)": "(sin t)′=+cos t，没有负号。",
          },
          prerequisite: "看公式表链式法则：[sin(2t)]′=cos(2t)·(2t)′=2cos(2t)。",
        },
      },
      {
        id: "jc935-3-1-11-1-2",
        goal: "第二步：两边取绝对值并消去未知中值点 ξ",
        plain: "把 sin(2u)−sin(2v)=2cos(2ξ)(u−v) 两边同时取绝对值，用一条最基本的三角有界性不等式把 ξ 消掉。",
        formula: math`\begin{gathered}|\sin(2u)-\sin(2v)|\\[4pt]=2|\cos(2\xi)||u-v|\le 2|u-v|\end{gathered}`,
        detail: "利用 |cos(2ξ)|≤1 直接放大。",
        check: {
          prompt: "在 2|cos(2ξ)||u−v| 中，利用哪条不等式可以直接消去未知的 ξ 得到 ≤2|u−v|？",
          choices: ["|cos(2ξ)| ≤ 1", "cos(2ξ) = 1", "|cos(2ξ)| ≤ 2"],
          answer: "|cos(2ξ)| ≤ 1",
          feedback: {
            "|cos(2ξ)| ≤ 1": "对，余弦的绝对值处处不超过 1，所以 2|cos(2ξ)|≤2。",
            "cos(2ξ) = 1": "ξ 随 u, v 变化，cos(2ξ) 不一定等于 1，这里是放缩不是恒等。",
            "|cos(2ξ)| ≤ 2": "放成 2 会得到 4|u−v|，达不到题目要的系数 2。",
          },
          prerequisite: "余弦值域是 [−1, 1]，故 |cos θ|≤1。",
        },
      },
      {
        id: "jc935-3-1-11-1-3",
        goal: "第三步：做一道换频率的利普希茨常数迁移题",
        plain: "记住规律：|f′(t)|≤M ⇒ |f(u)−f(v)|≤M|u−v|。",
        formula: math`|\sin(2u)-\sin(2v)|\le 2|u-v|`,
        detail: "证毕。",
        transfer: {
          prompt: "迁移练习：对任意实数 u, v，满足 |sin(5u)−sin(5v)| ≤ M|u−v| 的最小常数 M 是多少？",
          answer: 5,
          signFeedback: "对 f(t)=sin(5t) 求导，看 |f′(t)| 的最大值。",
          remediation: "f′(t)=5cos(5t)，最大绝对值为 5（在 t=0 处取到），故最小 M=5。",
          solution: math`\begin{gathered}|(\sin(5t))'|=5|\cos(5t)|\le 5\\[4pt]\implies M=5\end{gathered}`,
        },
      },
    ]),
  },

  "jc935-3-1-11-2": {
    target: "学会通过找边界相等点锁定拉格朗日左端点 [2, x]，再放缩并合并同类项完成切线不等式证明。",
    prerequisites: [
      "知道 (eᵗ)′=eᵗ 且指数函数严格递增",
      "会提取公因式整理 e²(x−2)+e²",
    ],
    strategy: "lagrange-exp-tangent",
    solution: math`\begin{gathered}e^x-e^2=e^\xi(x-2)\ (\xi\in(2,x))\\[4pt]e^\xi>e^2\implies e^x>e^2(x-2)+e^2\\[4pt]=e^2(x-1)\end{gathered}`,
    solutionExplanation: "在 [2, x] 上对 eᵗ 用中值定理，由 e^ξ>e² 放缩后移项提取公因式 e²。",
    steps: buildSteps([
      {
        id: "jc935-3-1-11-2-1",
        goal: "第一步：破题——从 x>2 与 e² 反推出中值定理区间",
        plain: "条件给的是 x>2，而且 x=2 时不等式左右两边都等于 e²。选对闭区间端点，e² 和 (x−2) 才会自然长出来。",
        formula: math`e^x-e^2=e^\xi(x-2),\quad \xi\in(2,x)`,
        detail: "在 [2, x] 上对 f(t)=eᵗ 用拉格朗日中值定理。",
        check: {
          prompt: "要证 x>2 时 eˣ > e²(x−1)，应该在哪个闭区间上对 f(t)=eᵗ 应用拉格朗日中值定理？",
          choices: ["闭区间 [2, x]", "闭区间 [0, x]", "闭区间 [1, x]"],
          answer: "闭区间 [2, x]",
          feedback: {
            "闭区间 [2, x]": "对，左端点选 2 立刻得到 eˣ−e²=e^ξ(x−2)，系数 e² 精准对齐！",
            "闭区间 [0, x]": "选 [0, x] 只能推出 eˣ>1+x，配不出 e²(x−1)。",
            "闭区间 [1, x]": "选 [1, x] 推出的是 eˣ>ex，依然不是 e²(x−1)。",
          },
          prerequisite: "把让不等式两边恰好相等的边界点 x=2 当作固定左端点。",
        },
      },
      {
        id: "jc935-3-1-11-2-2",
        goal: "第二步：用 e^ξ>e² 放缩并移项合并同类项",
        plain: "因为 ξ>2 且指数递增，有 eˣ−e²=e^ξ(x−2)>e²(x−2)。把左边的 −e² 移到右边，提取公因式 e² 化简。",
        formula: math`e^x-e^2>e^2(x-2)\implies e^x>e^2(x-1)`,
        detail: "e²(x−2)+e²=e²[(x−2)+1]=e²(x−1)。",
        check: {
          prompt: "把不等式右边 e²(x−2)+e² 提取公因式 e² 合并后，等于什么？",
          choices: ["e²(x − 1)", "e²(x − 3)", "e²(x − 2)"],
          answer: "e²(x − 1)",
          feedback: {
            "e²(x − 1)": "对，e²(x−2)+e²·1=e²(x−2+1)=e²(x−1)，正好是目标结论。",
            "e²(x − 3)": "−2 加上 1 等于 −1，不是 −3。",
            "e²(x − 2)": "别漏了移项过来的 +e² 贡献的 +1。",
          },
          prerequisite: "提取公因式：A(x−2)+A·1=A(x−2+1)。",
        },
      },
      {
        id: "jc935-3-1-11-2-3",
        goal: "第三步：用 x>3 的同类切线不等式做迁移题",
        plain: "推广规律：对任意切点 a，当 x>a 时恒有 eˣ>eᵃ(x−a+1)。",
        formula: math`e^x>e^2(x-1)\quad (x>2)`,
        detail: "证毕。",
        transfer: {
          prompt: "迁移练习：仿照本题在 [3, x]（x>3）上证明 eˣ>e³(x−k)，求出括号里的常数 k。",
          answer: 2,
          signFeedback: "由 eˣ−e³>e³(x−3) 移项得 eˣ>e³(x−3+1)。",
          remediation: "eˣ>e³(x−3)+e³=e³(x−2)，因此 k=2。",
          solution: math`\begin{gathered}e^x-e^3=e^\xi(x-3)>e^3(x-3)\\[4pt]e^x>e^3(x-2)\implies k=2\end{gathered}`,
        },
      },
    ]),
  },

  "jc935-3-1-12": {
    target: "掌握高频大题「方程有且仅有一个实根」的两步实操：动手算异号端点证存在 + 求导判正用罗尔反证唯一。",
    prerequisites: [
      "会代值找异号端点用零点定理",
      "会求三次多项式导数判断恒正",
    ],
    strategy: "ivt-plus-rolle-unique-root",
    solution: math`\begin{gathered}f(0)=-2<0,\;f(1)=2>0\\[4pt]\implies\exists\,x_1\in(0,1),\;f(x_1)=0\\[4pt]f'(x)=3x^2+3\ge 3>0\xrightarrow{\text{罗尔反证}}\text{唯一正根}\end{gathered}`,
    solutionExplanation: "f(0)<0<f(1) 证存在正根，f′(x)=3x²+3≥3>0 配合罗尔反证得唯一。",
    steps: buildSteps([
      {
        id: "jc935-3-1-12-1",
        goal: "第一步：动手代 x=0 和 x=1，用零点定理证「至少一正根」",
        plain: "设 f(x)=x³+3x−2。先挑最好算的两个端点 x=0 和 x=1 代进去，看看函数值是不是一负一正。",
        formula: math`\begin{gathered}f(0)=-2<0,\;f(1)=2>0\\[4pt]\implies\exists\,x_1\in(0,1),\;f(x_1)=0\end{gathered}`,
        detail: "f(0)=−2<0、f(1)=2>0，由零点定理在 (0, 1) 内至少有一个正根。",
        check: {
          prompt: "对 f(x)=x³+3x−2，代入 x=0 和 x=1 算出的结果分别是？",
          choices: [
            "f(0) = −2 < 0，f(1) = 2 > 0",
            "f(0) = 2 > 0，f(1) = 6 > 0",
            "f(0) = −2 < 0，f(1) = −1 < 0",
          ],
          answer: "f(0) = −2 < 0，f(1) = 2 > 0",
          feedback: {
            "f(0) = −2 < 0，f(1) = 2 > 0": "对，两端异号直接用零点定理证明 (0, 1) 内至少有一个正根！",
            "f(0) = 2 > 0，f(1) = 6 > 0": "常数项是 −2 不是 +2，代入 0 得 −2。",
            "f(0) = −2 < 0，f(1) = −1 < 0": "算一下 x=1：1+3−2=2>0。",
          },
          prerequisite: "f(1)=1³+3×1−2=2。",
        },
      },
      {
        id: "jc935-3-1-12-2",
        goal: "第二步：求出导函数并判断符号，用罗尔反证「至多一正根」",
        plain: "假设有两个不同正根，罗尔定理会推出必有一点满足 f′(ξ)=0。现在亲手算出 f′(x)，看看它为什么不可能为 0。",
        formula: math`\begin{gathered}f(x_1)=f(x_2)=0\implies\exists\,\xi,\;f'(\xi)=0\\[4pt]\text{与 }f'(x)=3x^2+3>0\text{ 矛盾}\end{gathered}`,
        detail: "f′(x)=3x²+3≥3>0 处处成立，与 f′(ξ)=0 矛盾，故正根唯一。",
        check: {
          prompt: "对 f(x)=x³+3x−2 求导，得到的导函数及其符号界是哪一个？",
          choices: [
            "f′(x) = 3x² + 3 ≥ 3 > 0",
            "f′(x) = 3x² − 3",
            "f′(x) = 3x² + 3x − 2",
          ],
          answer: "f′(x) = 3x² + 3 ≥ 3 > 0",
          feedback: {
            "f′(x) = 3x² + 3 ≥ 3 > 0": "对，导数恒正所以永远不会等于 0，反证出正根至多一个。",
            "f′(x) = 3x² − 3": "一次项是 +3x，求导后是 +3 不是 −3。",
            "f′(x) = 3x² + 3x − 2": "3x 求导得 3，常数 −2 求导为 0。",
          },
          prerequisite: "逐项求导：(x³)′=3x²，(3x)′=3，(−2)′=0。",
        },
      },
      {
        id: "jc935-3-1-12-3",
        goal: "第三步：用一道五次方程迁移题巩固套路",
        plain: "「异号端点证存在 + 导数保号证唯一」直接秒杀所有同类方程根个数题。",
        formula: math`\text{在 }(0,+\infty)\text{ 内有且仅有一个正实根}`,
        detail: "证毕。",
        transfer: {
          prompt: "迁移练习：方程 x⁵+5x−3=0 在全体实数 R 上共有几个实根？",
          answer: 1,
          signFeedback: "先算 f(0)=−3<0、f(1)=3>0，再看导数 f′(x)=5x⁴+5 的符号。",
          remediation: "f(0)f(1)<0 证至少 1 根；f′(x)=5x⁴+5≥5>0 用罗尔反证得至多 1 根，故恰有 1 个实根。",
          solution: math`\begin{gathered}f(0)=-3<0,\;f(1)=3>0\\[4pt]f'(x)=5x^4+5\ge 5>0\\[4pt]\implies\text{恰有 }1\text{ 个实根}\end{gathered}`,
        },
      },
    ]),
  },

  "jc935-3-1-13": {
    target: "学会从结论右边的导数行列式逆推出辅助函数 Φ(x)，并准确算出 Φ(b)−Φ(a) 的符号。",
    prerequisites: [
      "会展开二阶行列式 ad−bc",
      "会区分固定常数 u(b), v(b) 与动点变量 u(x), v(x)",
    ],
    strategy: "auxiliary-determinant-mvt",
    solution: math`\begin{gathered}\Phi(x)=\begin{vmatrix}u(b)&u(x)\\v(b)&v(x)\end{vmatrix},\;\Phi(b)=0\\[4pt]\Phi(b)-\Phi(a)=(b-a)\Phi'(\xi)\end{gathered}`,
    solutionExplanation: "把结论右边的导数列还原成动点 x 构造 Φ(x)，再算出 Φ(b)−Φ(a)=u(a)v(b)−v(a)u(b)。",
    steps: buildSteps([
      {
        id: "jc935-3-1-13-1",
        goal: "第一步：破题——盯着结论右边的行列式逆推辅助函数 Φ(x)",
        plain: "不用凭空猜辅助函数！看结论右边的二阶行列式：第一列是固定常数 (u(b), v(b))，第二列是导数 (u′(ξ), v′(ξ))。把第二列的导数还原成原函数、把 ξ 换成 x，就能写出 Φ(x)。",
        formula: math`\begin{gathered}\Phi(x)=\begin{vmatrix}u(b)&u(x)\\v(b)&v(x)\end{vmatrix}\\[4pt]=u(b)v(x)-v(b)u(x)\end{gathered}`,
        detail: "对 x 求导得 Φ′(x)=u(b)v′(x)−v(b)u′(x)，正好等于右边行列式。",
        check: {
          prompt: "把结论右边行列式的导数列 (u′(ξ), v′(ξ)) 还原成动点 x，应构造哪个辅助函数 Φ(x)？",
          choices: [
            "Φ(x) = u(b)v(x) − v(b)u(x)",
            "Φ(x) = u(x)v(x) − u(b)v(b)",
            "Φ(x) = u(a)v(b) − v(a)u(b)",
          ],
          answer: "Φ(x) = u(b)v(x) − v(b)u(x)",
          feedback: {
            "Φ(x) = u(b)v(x) − v(b)u(x)": "对，u(b) 和 v(b) 是常数，对它求导瞬间得到 u(b)v′(x)−v(b)u′(x)！",
            "Φ(x) = u(x)v(x) − u(b)v(b)": "u(x)v(x) 求导会变成 u′v+uv′，和结论里的行列式对不上。",
            "Φ(x) = u(a)v(b) − v(a)u(b)": "这里面没有变量 x，只是一个常数，导数恒为 0。",
          },
          prerequisite: "把右边行列式展开为 u(b)v′(ξ)−v(b)u′(ξ)，去掉撇号把 ξ 改回 x。",
        },
      },
      {
        id: "jc935-3-1-13-2",
        goal: "第二步：算出端点差 Φ(b)−Φ(a)，核对负号是否对齐左边行列式",
        plain: "把 x=b 和 x=a 分别代入 Φ(x)=u(b)v(x)−v(b)u(x)，动手算出 Φ(b)−Φ(a) 展开后的结果。",
        formula: math`\begin{gathered}\Phi(b)=0\\[4pt]\Phi(b)-\Phi(a)=-\Phi(a)\\[4pt]=u(a)v(b)-v(a)u(b)\end{gathered}`,
        detail: "Φ(b)=0，−Φ(a)=−[u(b)v(a)−v(b)u(a)]=u(a)v(b)−v(a)u(b)，与左边行列式完全一致。",
        check: {
          prompt: "对 Φ(x)=u(b)v(x)−v(b)u(x)，算出 Φ(b)−Φ(a) 等于下面哪一个？",
          choices: [
            "u(a)v(b) − v(a)u(b)",
            "u(b)v(a) − v(b)u(a)",
            "0",
          ],
          answer: "u(a)v(b) − v(a)u(b)",
          feedback: {
            "u(a)v(b) − v(a)u(b)": "对，Φ(b)=0，减去 Φ(a) 恰好把顺序翻成 u(a)v(b)−v(a)u(b)，严丝合缝！",
            "u(b)v(a) − v(b)u(a)": "这是 Φ(a) 本身，Φ(b)−Φ(a)=0−Φ(a) 要整体变号。",
            "0": "只有 Φ(b)=0，Φ(a) 一般不为 0。",
          },
          prerequisite: "先算 Φ(b)=u(b)v(b)−v(b)u(b)=0，再算 0−[u(b)v(a)−v(b)u(a)]。",
        },
      },
      {
        id: "jc935-3-1-13-3",
        goal: "第三步：代具体函数 u(x)=x, v(x)=x² 做一道迁移题",
        plain: "套用拉格朗日中值定理 Φ(b)−Φ(a)=(b−a)Φ′(ξ) 即证，用具体函数算一遍加深印象。",
        formula: math`\begin{gathered}\begin{vmatrix}u(a)&u(b)\\v(a)&v(b)\end{vmatrix}\\[4pt]=(b-a)\begin{vmatrix}u(b)&u'(\xi)\\v(b)&v'(\xi)\end{vmatrix}\end{gathered}`,
        detail: "证毕。",
        transfer: {
          prompt: "迁移练习：取 u(x)=x, v(x)=x²，区间 [a, b]=[1, 3]，代入本题行列式等式解出满足条件的中值点 ξ。",
          answer: 2,
          signFeedback: "先算左边 1·9−3·1=6，再算右边 2·(3·2ξ−9·1)=12ξ−18。",
          remediation: "由 6=2(6ξ−9)=12ξ−18 得 12ξ=24，故 ξ=2∈(1, 3)。",
          solution: math`\begin{gathered}1\cdot 9-3\cdot 1=(3-1)(3\cdot 2\xi-9\cdot 1)\\[4pt]6=12\xi-18\implies\xi=2\in(1,3)\end{gathered}`,
        },
      },
    ]),
  },

  "jc935-3-1-14": {
    target: "掌握「乘以反向指数因子 e⁻ᵏˣ 构造辅助函数」的经典技巧，并动手用乘积与链式法则求导证 F′(x)≡0。",
    prerequisites: [
      "会用乘积法则和链式法则求 [f(x)e⁻³ˣ]′",
      "会用零导数推论由 F′≡0 与 F(0)=2 锁定 F(x)≡2",
    ],
    strategy: "auxiliary-exp-factor",
    solution: math`\begin{gathered}F(x)=f(x)e^{-3x}\\[4pt]F'(x)=[f'(x)-3f(x)]e^{-3x}\equiv 0\\[4pt]F(x)\equiv F(0)=2\implies f(x)=2e^{3x}\end{gathered}`,
    solutionExplanation: "构造 F(x)=f(x)e⁻³ˣ，求导得 [f′(x)−3f(x)]e⁻³ˣ≡0，代 x=0 得常数 2。",
    steps: buildSteps([
      {
        id: "jc935-3-1-14-1",
        goal: "第一步：破题——看到 f′(x)−3f(x)=0，构造反向指数辅助函数",
        plain: "把已知移项写成 f′(x)−3f(x)=0。要想把它吸进一个乘积的导数里（且不把 f(x) 放分母避免除零），该给 f(x) 乘上哪个指数因子？",
        formula: math`F(x)=f(x)e^{-3x}`,
        detail: "乘以 e⁻³ˣ 后求导恰好出现 −3 系数。",
        check: {
          prompt: "面对条件 f′(x)−3f(x)=0，应构造哪个辅助函数 F(x) 才能让 F′(x) 里正好凑出 f′(x)−3f(x)？",
          choices: [
            "F(x) = f(x)e⁻³ˣ",
            "F(x) = f(x)e³ˣ",
            "F(x) = f(x) / (3x)",
          ],
          answer: "F(x) = f(x)e⁻³ˣ",
          feedback: {
            "F(x) = f(x)e⁻³ˣ": "对，(e⁻³ˣ)′=−3e⁻³ˣ，求导后正好拼出 [f′(x)−3f(x)]e⁻³ˣ！",
            "F(x) = f(x)e³ˣ": "乘 e³ˣ 求导会变成 [f′(x)+3f(x)]e³ˣ，符号变成加号抵消不掉。",
            "F(x) = f(x) / (3x)": "不仅在 x=0 无定义，求导也凑不出 f′(x)−3f(x)。",
          },
          prerequisite: "口诀：f′(x)−kf(x)=0 配 F(x)=f(x)e⁻ᵏˣ；f′(x)+kf(x)=0 配 F(x)=f(x)eᵏˣ。",
        },
      },
      {
        id: "jc935-3-1-14-2",
        goal: "第二步：用乘积与链式法则动手算出 F′(x)",
        plain: "对 F(x)=f(x)e⁻³ˣ 求导并提取公因子 e⁻³ˣ，代入 f′(x)=3f(x) 即可证 F′(x)≡0。",
        formula: math`\begin{gathered}F'(x)=[f'(x)-3f(x)]e^{-3x}\equiv 0\\[4pt]F(x)\equiv F(0)=f(0)e^0=2\end{gathered}`,
        detail: "代入初值 f(0)=2 得 F(x)≡2，从而 f(x)=2e³ˣ。",
        check: {
          prompt: "对 F(x)=f(x)e⁻³ˣ 用乘积和链式法则求导并提取 e⁻³ˣ，得到什么？",
          choices: [
            "[f′(x) − 3f(x)]e⁻³ˣ",
            "[f′(x) + 3f(x)]e⁻³ˣ",
            "[f′(x) − f(x)]e⁻³ˣ",
          ],
          answer: "[f′(x) − 3f(x)]e⁻³ˣ",
          feedback: {
            "[f′(x) − 3f(x)]e⁻³ˣ": "对，链式法则给出 (e⁻³ˣ)′=−3e⁻³ˣ，代入 f′=3f 立刻恒等于 0。",
            "[f′(x) + 3f(x)]e⁻³ˣ": "内层 −3x 的导数是 −3，符号应为减号。",
            "[f′(x) − f(x)]e⁻³ˣ": "漏乘了内层导数系数 3。",
          },
          prerequisite: "链式法则：(e⁻³ˣ)′=−3e⁻³ˣ。",
        },
      },
      {
        id: "jc935-3-1-14-3",
        goal: "第三步：用初值锁定表达式，并做一道同型迁移题",
        plain: "由 f(x)e⁻³ˣ≡2 两边同乘 e³ˣ 得 f(x)=2e³ˣ。",
        formula: math`f(x)e^{-3x}=2\implies f(x)=2e^{3x}`,
        detail: "证毕。",
        transfer: {
          prompt: "迁移练习：若 f(x) 处处可导，满足 f′(x)=2f(x) 且 f(0)=5，构造 F(x)=f(x)e⁻²ˣ，求 F(10) 的值。",
          answer: 5,
          signFeedback: "先算 F′(x)≡0，它说明 F(10) 和 F(0) 完全相等。",
          remediation: "F′(x)=[f′(x)−2f(x)]e⁻²ˣ≡0，故 F(10)=F(0)=f(0)e⁰=5。",
          solution: math`\begin{gathered}F'(x)=[f'(x)-2f(x)]e^{-2x}\equiv 0\\[4pt]F(10)=F(0)=5\end{gathered}`,
        },
      },
    ]),
  },

  "jc935-3-1-15": {
    target: "掌握反复套用柯西中值定理「分子分母同步求导降阶」的动作，并会用 a+θ(x−a) 表示区间内点。",
    prerequisites: [
      "熟悉柯西中值定理的导数比形式",
      "知道 (t−a)ⁿ 连续求导 n 次得到 n!",
    ],
    strategy: "iterated-cauchy-taylor-bridge",
    solution: math`\begin{gathered}\frac{f(x)}{(x-a)^n}=\frac{f'(\xi_1)}{n(\xi_1-a)^{n-1}}\\[4pt]=\cdots=\frac{f^{(n)}(\xi_n)}{n!}\\[4pt]\xi_n=a+\theta(x-a)\ (0<\theta<1)\end{gathered}`,
    solutionExplanation: "利用 f(a)=⋯=f⁽ⁿ⁻¹⁾(a)=0 连用 n 次柯西中值定理降阶至 n 阶导数，再写 ξₙ=a+θ(x−a)。",
    steps: buildSteps([
      {
        id: "jc935-3-1-15-1",
        goal: "第一步：对 f(t) 与 (t−a)ⁿ 迈出第一次柯西降阶",
        plain: "利用 f(a)=0，把 f(x)/(x−a)ⁿ 写成 [f(x)−f(a)]/[(x−a)ⁿ−0]，在 a 与 x 之间套一次柯西中值定理，分子分母同时求一次导。",
        formula: math`\frac{f(x)-f(a)}{(x-a)^n-0}=\frac{f'(\xi_1)}{n(\xi_1-a)^{n-1}}`,
        detail: "ξ₁ 严格介于 a 与 x 之间。",
        check: {
          prompt: "对 f(t) 与 (t−a)ⁿ 在 a 和 x 之间应用一次柯西中值定理后，f(x)/(x−a)ⁿ 变成什么？",
          choices: [
            "f′(ξ₁) / [n(ξ₁ − a)ⁿ⁻¹]",
            "f′(ξ₁) / (ξ₁ − a)ⁿ",
            "f(ξ₁) / [n(ξ₁ − a)ⁿ⁻¹]",
          ],
          answer: "f′(ξ₁) / [n(ξ₁ − a)ⁿ⁻¹]",
          feedback: {
            "f′(ξ₁) / [n(ξ₁ − a)ⁿ⁻¹]": "对，分子降成一阶导，分母按幂法则降一次并掉出系数 n，接下来就能重复 n 次！",
            "f′(ξ₁) / (ξ₁ − a)ⁿ": "分母 (t−a)ⁿ 也要同步求导变成 n(ξ₁−a)ⁿ⁻¹。",
            "f(ξ₁) / [n(ξ₁ − a)ⁿ⁻¹]": "分子 f(t) 同样要求导变成 f′(ξ₁)。",
          },
          prerequisite: "柯西中值定理右边是 f′(ξ₁)/g′(ξ₁)，分子分母同时求导。",
        },
      },
      {
        id: "jc935-3-1-15-2",
        goal: "第二步：连降 n 次至 n!，并用 θ 表示区间内点 ξₙ",
        plain: "利用 f′(a)=⋯=f⁽ⁿ⁻¹⁾(a)=0 重复 n 次后，分母系数乘成 n!，得到 f⁽ⁿ⁾(ξₙ)/n!。把严格介于 a 与 x 之间的 ξₙ 写成 a+θ(x−a)，判断 θ 的范围。",
        formula: math`\begin{gathered}\frac{f'(\xi_1)}{n(\xi_1-a)^{n-1}}=\cdots=\frac{f^{(n)}(\xi_n)}{n!}\\[4pt]\xi_n=a+\theta(x-a)\end{gathered}`,
        detail: "无论 x>a 还是 x<a，比值 θ=(ξₙ−a)/(x−a) 恒满足 0<θ<1。",
        check: {
          prompt: "无论 x>a 还是 x<a，把严格介于 a 与 x 之间的 ξₙ 写成 a+θ(x−a) 时，θ 满足什么范围？",
          choices: ["0 < θ < 1", "−1 < θ < 1", "θ > 1"],
          answer: "0 < θ < 1",
          feedback: {
            "0 < θ < 1": "对，ξₙ−a 与 x−a 恒同号且更短，所以比值 θ 永远严格在 (0, 1) 内。",
            "−1 < θ < 1": "当 x<a 时分子分母同为负数，商仍是正数，不会取负值。",
            "θ > 1": "ξₙ 夹在 a 和 x 之间，距离比 |x−a| 短，所以 θ<1。",
          },
          prerequisite: "θ=(ξₙ−a)/(x−a) 表示 ξₙ 从 a 出发走了整段路程的几分之几。",
        },
      },
      {
        id: "jc935-3-1-15-3",
        goal: "第三步：代三次多项式做一道迁移题体验 n 次降阶",
        plain: "这就是泰勒公式拉格朗日余项的核心证明引擎。",
        formula: math`\begin{gathered}\frac{f(x)}{(x-a)^n}=\frac{f^{(n)}(a+\theta(x-a))}{n!}\\[4pt](0<\theta<1)\end{gathered}`,
        detail: "证毕。",
        transfer: {
          prompt: "迁移练习：取 a=1, n=3, f(x)=(x−1)³，它满足 f(1)=f′(1)=f″(1)=0。计算 f⁽³⁾(ξ)/3! 的值。",
          answer: 1,
          signFeedback: "先算 (x−1)³ 的三阶导数，再除以 3!=6。",
          remediation: "f′(x)=3(x−1)²，f″(x)=6(x−1)，f⁽³⁾(x)=6，因此 f⁽³⁾(ξ)/3!=6/6=1。",
          solution: math`\frac{f^{(3)}(\xi)}{3!}=\frac{6}{6}=1`,
        },
      },
    ]),
  },
};

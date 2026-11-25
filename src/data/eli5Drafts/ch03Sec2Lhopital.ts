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
    const check = draft.check ? toTeachingCheck(draft.id, draft.check) : undefined;
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
 * 第三章 3.2 洛必达法则全部 23 题深度动手版 ELI5 教学内容：
 * 核心/拓展/书主题 4 题（p21, p22, p135, p182）+ 习题 3-2 全部 19 题（jc935-3-2-1-1 至 1-16，3-2-2 至 3-2-4）。
 * 严格遵循新版动手标准：配合随题公式表，只考未定式转化、实际求导化简与失效辨别，零定义复述水题。
 */
export const chapterThreeSec2LhopitalTeaching: Readonly<Record<string, TeachingLesson>> = {
  p21: {
    target: "掌握二阶 0/0 型未定式连续两次套用洛必达法则的求导动作。",
    prerequisites: [
      "会算 (eˣ−1−x)′=eˣ−1 与 (x²)′=2x",
      "知道第一次求导后若仍是 0/0 型可继续求导",
    ],
    strategy: "lhopital-twice-exp",
    referenceAnswer: 0.5,
    solution: math`\begin{gathered}\lim_{x\to 0}\frac{e^x-1-x}{x^2}=\lim_{x\to 0}\frac{e^x-1}{2x}\\[4pt]=\lim_{x\to 0}\frac{e^x}{2}=\frac{1}{2}\end{gathered}`,
    solutionExplanation: "连续两次对分子分母分别求导，直到分母变为非零常数 2 再代入 x=0。",
    steps: buildSteps([
      {
        id: "p21-1",
        goal: "第一步：确认 0/0 型并动手完成第一次求导",
        plain: "x→0 时分子分母均趋于 0，对分子 eˣ−1−x 和分母 x² 各自求导（不是用商法则！）。",
        formula: math`\lim_{x\to 0}\frac{e^x-1}{2x}`,
        detail: "分子 (eˣ−1−x)′=eˣ−1，分母 (x²)′=2x，代入 x=0 仍是 0/0 型。",
        check: {
          prompt: "对 (eˣ−1−x)/x² 第一次使用洛必达法则后，分式变成什么？",
          choices: ["(eˣ − 1) / (2x)", "(eˣ − x) / (2x)", "eˣ / (2x)"],
          answer: "(eˣ − 1) / (2x)",
          feedback: {
            "(eˣ − 1) / (2x)": "对，(−x)′=−1、常数 −1 求导为 0，分母 (x²)′=2x。",
            "(eˣ − x) / (2x)": "−x 求导后变成 −1 而不是 −x。",
            "eˣ / (2x)": "漏掉了 −x 求导得到的 −1。",
          },
          prerequisite: "看公式表逐项求导：(eˣ)′=eˣ，(−1)′=0，(−x)′=−1。",
        },
      },
      {
        id: "p21-2",
        goal: "第二步：对仍是 0/0 型的 (eˣ−1)/(2x) 再求一次导",
        plain: "把 x=0 代进 (eˣ−1)/(2x) 依然是 0/0，继续分子分母分别求导，消掉分母里的 x。",
        formula: math`\lim_{x\to 0}\frac{e^x}{2}`,
        detail: "分子求导得 eˣ，分母求导得 2，此时不再是未定式。",
        check: {
          prompt: "对 (eˣ−1)/(2x) 第二次使用洛必达法则后，变成哪个分式？",
          choices: ["eˣ / 2", "(eˣ − 1) / 2", "eˣ / (2x)"],
          answer: "eˣ / 2",
          feedback: {
            "eˣ / 2": "对，常数 −1 求导归零，(2x)′=2，现在直接代入 x=0 就能算出来了。",
            "(eˣ − 1) / 2": "分子的常数 −1 求导为 0，应该消失。",
            "eˣ / (2x)": "分母 2x 也要同步求导变成 2。",
          },
          prerequisite: "分子分母每次都要各自求导一次。",
        },
      },
      {
        id: "p21-3",
        goal: "第三步：代入 x=0 算出结果，并用带系数迁移题巩固",
        plain: "把 x=0 代入 eˣ/2 得 1/2，再独立练一道带系数的同型题。",
        formula: math`\frac{e^0}{2}=\frac{1}{2}`,
        detail: "结果为 1/2。",
        transfer: {
          prompt: "迁移练习：用洛必达法则求极限 lim_{x→0} (e³ˣ−1−3x)/x²（可用小数或分数表示）。",
          answer: 4.5,
          signFeedback: "两次求导分别掉出两个系数 3，分子为 9e³ˣ，分母为 2。",
          remediation: "第一次得 (3e³ˣ−3)/(2x)，第二次得 9e³ˣ/2，代 x=0 得 9/2=4.5。",
          solution: math`\begin{gathered}\lim_{x\to 0}\frac{3e^{3x}-3}{2x}=\lim_{x\to 0}\frac{9e^{3x}}{2}=\frac{9}{2}\end{gathered}`,
        },
      },
    ]),
  },

  p22: {
    target: "掌握三阶 0/0 型三角差商极限的连续求导动作，避免三角求导符号出错。",
    prerequisites: [
      "熟记 (sin x)′=cos x 与 (cos x)′=−sin x",
      "熟记 lim_{x→0} (sin x/x)=1",
    ],
    strategy: "lhopital-cubic-sine",
    referenceAnswer: 1 / 6,
    solution: math`\begin{gathered}\lim_{x\to 0}\frac{x-\sin x}{x^3}=\lim_{x\to 0}\frac{1-\cos x}{3x^2}\\[4pt]=\lim_{x\to 0}\frac{\sin x}{6x}=\frac{1}{6}\end{gathered}`,
    solutionExplanation: "两次洛必达化为 (sin x)/(6x)，结合重要极限得出 1/6。",
    steps: buildSteps([
      {
        id: "p22-1",
        goal: "第一步：对 (x−sin x)/x³ 完成第一次求导",
        plain: "x→0 时为 0/0 型，分子分母分别求导降一次幂。",
        formula: math`\lim_{x\to 0}\frac{1-\cos x}{3x^2}`,
        detail: "分子得 1−cos x，分母得 3x²，仍是 0/0 型。",
        check: {
          prompt: "对 (x−sin x)/x³ 第一次使用洛必达法则，得到哪个分式？",
          choices: ["(1 − cos x) / (3x²)", "(1 + cos x) / (3x²)", "(1 − cos x) / x²"],
          answer: "(1 − cos x) / (3x²)",
          feedback: {
            "(1 − cos x) / (3x²)": "对，(x)′=1、(−sin x)′=−cos x、(x³)′=3x²。",
            "(1 + cos x) / (3x²)": "(sin x)′=+cos x，前面减号保留，所以是 1−cos x。",
            "(1 − cos x) / x²": "分母 x³ 求导掉出系数 3，是 3x²。",
          },
          prerequisite: "幂法则 (x³)′=3x²，(sin x)′=cos x。",
        },
      },
      {
        id: "p22-2",
        goal: "第二步：对 (1−cos x)/(3x²) 第二次求导，注意负负得正",
        plain: "仍是 0/0 型，再对分子分母各求一次导，特别小心 −(cos x)′ 的符号！",
        formula: math`\lim_{x\to 0}\frac{\sin x}{6x}`,
        detail: "(−cos x)′=−(−sin x)=+sin x，(3x²)′=6x。",
        check: {
          prompt: "对 (1−cos x)/(3x²) 第二次求导，分子与分母分别变成什么？",
          choices: ["sin x / (6x)", "−sin x / (6x)", "sin x / (3x)"],
          answer: "sin x / (6x)",
          feedback: {
            "sin x / (6x)": "对，(−cos x)′=+sin x，(3x²)′=6x，接下来用 sin x/x→1 一步出答案。",
            "−sin x / (6x)": "(cos x)′=−sin x，前面还有一个减号，负负得正变成 +sin x。",
            "sin x / (3x)": "3x² 求导是 3×2x=6x，别漏乘 2。",
          },
          prerequisite: "−(cos x)′=−(−sin x)=+sin x。",
        },
      },
      {
        id: "p22-3",
        goal: "第三步：用重要极限得出 1/6，并完成迁移题",
        plain: "由 lim(sin x/x)=1 得 1/6，再做一道倍角迁移题。",
        formula: math`\frac{1}{6}\lim_{x\to 0}\frac{\sin x}{x}=\frac{1}{6}`,
        detail: "结果为 1/6。",
        transfer: {
          prompt: "迁移练习：求极限 lim_{x→0} (2x−sin(2x))/x³（用分数或小数表示，保留精确值如 4/3）。",
          answer: 4 / 3,
          signFeedback: "第一次求导得 (2−2cos(2x))/(3x²)，第二次得 4sin(2x)/(6x)。",
          remediation: "4sin(2x)/(6x)=(4/3)·[sin(2x)/(2x)]→4/3。",
          solution: math`\begin{gathered}\lim_{x\to 0}\frac{2-2\cos(2x)}{3x^2}=\lim_{x\to 0}\frac{4\sin(2x)}{6x}=\frac{4}{3}\end{gathered}`,
        },
      },
    ]),
  },

  p135: {
    target: "在两次洛必达法则中连续准确使用链式法则（每次求导都乘内层系数 2）。",
    prerequisites: [
      "会算 (e²ˣ)′=2e²ˣ",
      "会化简分式后再求第二次导",
    ],
    strategy: "lhopital-twice-chain",
    referenceAnswer: 2,
    solution: math`\begin{gathered}\lim_{x\to 0}\frac{e^{2x}-1-2x}{x^2}=\lim_{x\to 0}\frac{2e^{2x}-2}{2x}\\[4pt]=\lim_{x\to 0}\frac{2e^{2x}}{1}=2\end{gathered}`,
    solutionExplanation: "第一次求导约去 2 得 (e²ˣ−1)/x，第二次求导得 2e²ˣ→2。",
    steps: buildSteps([
      {
        id: "p135-1",
        goal: "第一步：第一次求导并顺手约去公因子 2",
        plain: "x→0 时为 0/0 型。对分子 e²ˣ−1−2x 和分母 x² 分别求导，别漏乘内层系数 2。",
        formula: math`\lim_{x\to 0}\frac{2e^{2x}-2}{2x}=\lim_{x\to 0}\frac{e^{2x}-1}{x}`,
        detail: "分子 (e²ˣ−1−2x)′=2e²ˣ−2，分母 2x，上下同除以 2 化简为 (e²ˣ−1)/x。",
        check: {
          prompt: "对 (e²ˣ−1−2x)/x² 第一次求导并约分后，变成哪一个？",
          choices: ["(e²ˣ − 1) / x", "(e²ˣ − 2) / (2x)", "(2e²ˣ − 1) / (2x)"],
          answer: "(e²ˣ − 1) / x",
          feedback: {
            "(e²ˣ − 1) / x": "对，(2e²ˣ−2)/(2x) 上下约去 2 立刻变干净，下一步求导更不易出错。",
            "(e²ˣ − 2) / (2x)": "注意对 e²ˣ 求导漏乘了链式法则的系数 2。",
            "(2e²ˣ − 1) / (2x)": "(−2x)′=−2 而不是 −1。",
          },
          prerequisite: "链式法则：(e²ˣ)′=2e²ˣ。",
        },
      },
      {
        id: "p135-2",
        goal: "第二步：对 (e²ˣ−1)/x 第二次求导",
        plain: "仍是 0/0 型，再对分子分母分别求导一次，注意第二次对 e²ˣ 求导又要乘一次 2！",
        formula: math`\lim_{x\to 0}\frac{2e^{2x}}{1}`,
        detail: "分子得 2e²ˣ，分母得 1。",
        check: {
          prompt: "对 (e²ˣ−1)/x 第二次求导，得到什么？",
          choices: ["2e²ˣ", "e²ˣ", "4e²ˣ"],
          answer: "2e²ˣ",
          feedback: {
            "2e²ˣ": "对，分母 x′=1，分子 (e²ˣ−1)′=2e²ˣ，代入 x=0 立得结果。",
            "e²ˣ": "第二次求导依然要乘内层 (2x)′=2。",
            "4e²ˣ": "我们在第一步已经约去 2 了；如果没约去 2，分子是 4e²ˣ、分母是 2，比值也是 2e²ˣ。",
          },
          prerequisite: "每次对 eᵏˣ 求导都要乘一次 k。",
        },
      },
      {
        id: "p135-3",
        goal: "第三步：代入 x=0 并完成系数翻倍迁移题",
        plain: "代 x=0 得 2，再练一道系数为 4 的同型题。",
        formula: math`2e^0=2`,
        detail: "结果为 2。",
        transfer: {
          prompt: "迁移练习：求极限 lim_{x→0} (e⁴ˣ−1−4x)/x²。",
          answer: 8,
          signFeedback: "两次求导系数 4×4=16，再除以分母二次求导的 2。",
          remediation: "第一次得 (4e⁴ˣ−4)/(2x)，第二次得 16e⁴ˣ/2=8e⁴ˣ，代 x=0 得 8。",
          solution: math`\lim_{x\to 0}\frac{4e^{4x}-4}{2x}=\lim_{x\to 0}\frac{16e^{4x}}{2}=8`,
        },
      },
    ]),
  },

  p182: {
    target: "精准处理带负指数的指数差求导（负负得正），一次洛必达解决 0/0 极限。",
    prerequisites: [
      "会算 (e⁻³ˣ)′=−3e⁻³ˣ",
      "会算 [sin(2x)]′=2cos(2x)",
    ],
    strategy: "lhopital-exp-diff-sine",
    referenceAnswer: 3,
    solution: math`\begin{gathered}\lim_{x\to 0}\frac{e^{3x}-e^{-3x}}{\sin(2x)}=\lim_{x\to 0}\frac{3e^{3x}+3e^{-3x}}{2\cos(2x)}\\[4pt]=\frac{3+3}{2}=3\end{gathered}`,
    solutionExplanation: "分子求导得 3e³ˣ+3e⁻³ˣ，分母得 2cos(2x)，代入 x=0 得 6/2=3。",
    steps: buildSteps([
      {
        id: "p182-1",
        goal: "第一步：对分子 e³ˣ−e⁻³ˣ 用链式法则求导",
        plain: "x→0 时为 0/0 型。先算分子的导数，盯紧第二项 −e⁻³ˣ 求导后的正负号！",
        formula: math`(e^{3x}-e^{-3x})'=3e^{3x}+3e^{-3x}`,
        detail: "−(e⁻³ˣ)′=−(−3e⁻³ˣ)=+3e⁻³ˣ，两项变成相加。",
        check: {
          prompt: "分子 e³ˣ−e⁻³ˣ 对 x 求导的正确结果是？",
          choices: ["3e³ˣ + 3e⁻³ˣ", "3e³ˣ − 3e⁻³ˣ", "e³ˣ + e⁻³ˣ"],
          answer: "3e³ˣ + 3e⁻³ˣ",
          feedback: {
            "3e³ˣ + 3e⁻³ˣ": "对，内层 −3x 导出的负号与原减号负负得正！",
            "3e³ˣ − 3e⁻³ˣ": "漏掉了内层 (−3x)′=−3 的负号，结果会导致代入 0 时分子错算成 0。",
            "e³ˣ + e⁻³ˣ": "漏乘了链式法则的内层系数 3。",
          },
          prerequisite: "−(e⁻³ˣ)′=−(−3)e⁻³ˣ=+3e⁻³ˣ。",
        },
      },
      {
        id: "p182-2",
        goal: "第二步：对分母 sin(2x) 求导并写出导数比",
        plain: "对分母 sin(2x) 用链式法则求导，组成新的分式，再看代入 x=0 时分母是否为零。",
        formula: math`\lim_{x\to 0}\frac{3e^{3x}+3e^{-3x}}{2\cos(2x)}`,
        detail: "分母求导得 2cos(2x)，x=0 时为 2≠0，直接代入即可。",
        check: {
          prompt: "把 x=0 代入分母导数 [sin(2x)]′ 后，分母的值是多少？",
          choices: ["2", "1", "0"],
          answer: "2",
          feedback: {
            "2": "对，[sin(2x)]′=2cos(2x)，代入 x=0 得 2×1=2。",
            "1": "漏乘了内层 (2x)′=2。",
            "0": "cos 0=1 不是 0，所以一次洛必达就能直接代入了。",
          },
          prerequisite: "[sin(2x)]′=2cos(2x)，cos 0=1。",
        },
      },
      {
        id: "p182-3",
        goal: "第三步：算出比值并完成换系数迁移题",
        plain: "分子 3+3=6，分母 2，相除得 3。",
        formula: math`\frac{3+3}{2\cdot 1}=3`,
        detail: "结果为 3。",
        transfer: {
          prompt: "迁移练习：求极限 lim_{x→0} (e⁴ˣ−e⁻⁴ˣ)/sin(2x)。",
          answer: 4,
          signFeedback: "分子求导代入 0 得 4+4=8，分母求导代入 0 得 2。",
          remediation: "原式 = lim (4e⁴ˣ+4e⁻⁴ˣ)/[2cos(2x)]=(4+4)/2=4。",
          solution: math`\lim_{x\to 0}\frac{4e^{4x}+4e^{-4x}}{2\cos(2x)}=\frac{8}{2}=4`,
        },
      },
    ]),
  },

  "jc935-3-2-1-1": {
    target: "掌握对数型 0/0 极限的链式求导与代入，避免漏乘内层系数 4。",
    prerequisites: ["会算 [ln(1+4x)]′=4/(1+4x)"],
    strategy: "lhopital-log-linear",
    solution: math`\lim_{x\to 0}\frac{\ln(1+4x)}{2x}=\lim_{x\to 0}\frac{4/(1+4x)}{2}=2`,
    solutionExplanation: "分子求导 4/(1+4x)，分母求导 2，代 x=0 得 2。",
    steps: buildSteps([
      {
        id: "jc935-3-2-1-1-1",
        goal: "第一步：对分子 ln(1+4x) 和分母 2x 分别求导",
        plain: "x→0 时为 0/0 型，用链式法则对分子求导，别漏乘内层 4。",
        formula: math`\lim_{x\to 0}\frac{4/(1+4x)}{2}`,
        detail: "[ln(1+4x)]′=4/(1+4x)，(2x)′=2。",
        check: {
          prompt: "对 ln(1+4x)/(2x) 应用一次洛必达法则后，分子变成什么？",
          choices: ["4 / (1 + 4x)", "1 / (1 + 4x)", "4 / x"],
          answer: "4 / (1 + 4x)",
          feedback: {
            "4 / (1 + 4x)": "对，外层 1/(1+4x) 乘内层 (1+4x)′=4。",
            "1 / (1 + 4x)": "漏乘了链式法则里的内层导数 4。",
            "4 / x": "外层对数真数是 1+4x 整体，不能丢掉 1+。",
          },
          prerequisite: "链式法则：[ln(u)]′=u′/u。",
        },
      },
      {
        id: "jc935-3-2-1-1-2",
        goal: "第二步：代入 x=0 算出极限值",
        plain: "把 x=0 代入 [4/(1+4x)]/2，心算即可得出结果。",
        formula: math`\frac{4/(1+0)}{2}=2`,
        detail: "结果为 2。",
        check: {
          prompt: "把 x=0 代入 [4/(1+4x)]/2，算出的极限值是多少？",
          choices: ["2", "4", "1/2"],
          answer: "2",
          feedback: {
            "2": "对，4/1 再除以分母 2 正好等于 2。",
            "4": "别忘了除以分母 (2x)′=2。",
            "1/2": "是分子 4 除以分母 2，不是 1 除以 2。",
          },
          prerequisite: "(4/1)/2=2。",
        },
      },
      {
        id: "jc935-3-2-1-1-3",
        goal: "第三步：完成换系数迁移题",
        plain: "记住对数型规律：lim ln(1+ax)/(bx)=a/b。",
        formula: math`\lim_{x\to 0}\frac{\ln(1+4x)}{2x}=2`,
        detail: "完成。",
        transfer: {
          prompt: "迁移练习：求极限 lim_{x→0} ln(1+6x)/(3x)。",
          answer: 2,
          signFeedback: "分子导数 6/(1+6x)，分母导数 3。",
          remediation: "原式 = lim [6/(1+6x)]/3=6/3=2。",
          solution: math`\lim_{x\to 0}\frac{6/(1+6x)}{3}=2`,
        },
      },
    ]),
  },

  "jc935-3-2-1-2": {
    target: "准确求导含不对称系数的指数差 (e²ˣ−e⁻³ˣ)/sin(2x)，防止符号漏翻。",
    prerequisites: ["会算 (e²ˣ−e⁻³ˣ)′=2e²ˣ+3e⁻³ˣ"],
    strategy: "lhopital-asym-exp",
    solution: math`\begin{gathered}\lim_{x\to 0}\frac{e^{2x}-e^{-3x}}{\sin(2x)}\\[4pt]=\lim_{x\to 0}\frac{2e^{2x}+3e^{-3x}}{2\cos(2x)}=\frac{5}{2}\end{gathered}`,
    solutionExplanation: "分子求导得 2e²ˣ+3e⁻³ˣ，分母得 2cos(2x)，代 x=0 得 5/2。",
    steps: buildSteps([
      {
        id: "jc935-3-2-1-2-1",
        goal: "第一步：对分子 e²ˣ−e⁻³ˣ 与分母 sin(2x) 分别求导",
        plain: "x→0 时为 0/0 型，分别用链式法则求导，留意 −e⁻³ˣ 的负负得正。",
        formula: math`\lim_{x\to 0}\frac{2e^{2x}+3e^{-3x}}{2\cos(2x)}`,
        detail: "分子得 2e²ˣ+3e⁻³ˣ，分母得 2cos(2x)。",
        check: {
          prompt: "对 (e²ˣ−e⁻³ˣ)/sin(2x) 用一次洛必达法则，得到哪个分式？",
          choices: [
            "(2e²ˣ + 3e⁻³ˣ) / [2cos(2x)]",
            "(2e²ˣ − 3e⁻³ˣ) / [2cos(2x)]",
            "(2e²ˣ + 3e⁻³ˣ) / cos(2x)",
          ],
          answer: "(2e²ˣ + 3e⁻³ˣ) / [2cos(2x)]",
          feedback: {
            "(2e²ˣ + 3e⁻³ˣ) / [2cos(2x)]": "对，负指数导出的负号把减号翻成加号，分母也乘上了系数 2。",
            "(2e²ˣ − 3e⁻³ˣ) / [2cos(2x)]": "−(e⁻³ˣ)′=−(−3e⁻³ˣ)=+3e⁻³ˣ，中间应是加号。",
            "(2e²ˣ + 3e⁻³ˣ) / cos(2x)": "分母 [sin(2x)]′ 漏乘了内层导数 2。",
          },
          prerequisite: "−(e⁻³ˣ)′=+3e⁻³ˣ，[sin(2x)]′=2cos(2x)。",
        },
      },
      {
        id: "jc935-3-2-1-2-2",
        goal: "第二步：代入 x=0 算出最终分数",
        plain: "e⁰=1、cos 0=1，代入算出分子与分母之比。",
        formula: math`\frac{2+3}{2\cdot 1}=\frac{5}{2}`,
        detail: "分子 2+3=5，分母 2。",
        check: {
          prompt: "代入 x=0 后，(2e²ˣ+3e⁻³ˣ)/[2cos(2x)] 的值是多少？",
          choices: ["5/2", "−1/2", "5"],
          answer: "5/2",
          feedback: {
            "5/2": "对，(2+3)/2=5/2。",
            "−1/2": "分子是 2+3=5 不是 2−3。",
            "5": "别忘了分母还有因子 2。",
          },
          prerequisite: "e⁰=1，cos 0=1。",
        },
      },
      {
        id: "jc935-3-2-1-2-3",
        goal: "第三步：完成一道同型迁移题",
        plain: "再独立算一道换系数的双指数差极限。",
        formula: math`\frac{5}{2}`,
        detail: "完成。",
        transfer: {
          prompt: "迁移练习：求极限 lim_{x→0} (e⁴ˣ−e⁻²ˣ)/sin(3x)。",
          answer: 2,
          signFeedback: "分子导数代入 0 得 4+2=6，分母导数代入 0 得 3。",
          remediation: "原式 = lim (4e⁴ˣ+2e⁻²ˣ)/[3cos(3x)]=(4+2)/3=2。",
          solution: math`\lim_{x\to 0}\frac{4e^{4x}+2e^{-2x}}{3\cos(3x)}=\frac{6}{3}=2`,
        },
      },
    ]),
  },

  "jc935-3-2-1-3": {
    target: "学会「一次洛必达 + 三角因式分解约去零因子 1−cos x」的捷径，避免陷入繁琐的三次求导。",
    prerequisites: [
      "会算 (tan x)′=sec²x=1/cos²x",
      "会分解立方差 1−cos³x=(1−cos x)(1+cos x+cos²x)",
    ],
    strategy: "lhopital-then-factor",
    solution: math`\begin{gathered}\lim_{x\to 0}\frac{\sec^2 x-\cos x}{1-\cos x}\\[4pt]=\lim_{x\to 0}\frac{1+\cos x+\cos^2 x}{\cos^2 x}=3\end{gathered}`,
    solutionExplanation: "一次洛必达后把分子通分化为 (1−cos³x)/cos²x，约去 1−cos x 直接代入得 3。",
    steps: buildSteps([
      {
        id: "jc935-3-2-1-3-1",
        goal: "第一步：第一次用洛必达法则，得到 (sec²x−cos x)/(1−cos x)",
        plain: "x→0 时为 0/0 型，先求导一次，再把 sec²x 改写成 1/cos²x 通分。",
        formula: math`\frac{\sec^2 x-\cos x}{1-\cos x}=\frac{1-\cos^3 x}{\cos^2 x(1-\cos x)}`,
        detail: "sec²x−cos x=1/cos²x−cos x=(1−cos³x)/cos²x。",
        check: {
          prompt: "把第一次求导得到的分子 sec²x−cos x 全部换成 cos x 并通分，等于什么？",
          choices: ["(1 − cos³x) / cos²x", "(1 − cos²x) / cos²x", "(1 − cos x) / cos²x"],
          answer: "(1 − cos³x) / cos²x",
          feedback: {
            "(1 − cos³x) / cos²x": "对，1/cos²x − cos x = (1−cos³x)/cos²x，正好能用立方差约掉分母的 1−cos x！",
            "(1 − cos²x) / cos²x": "cos x 通分乘上 cos²x 变成 cos³x，不是 cos²x。",
            "(1 − cos x) / cos²x": "分子第二项是 cos x·cos²x=cos³x。",
          },
          prerequisite: "sec x=1/cos x ⇒ sec²x=1/cos²x。",
        },
      },
      {
        id: "jc935-3-2-1-3-2",
        goal: "第二步：用立方差约去 1−cos x，直接代入 x=0",
        plain: "把 1−cos³x 分解为 (1−cos x)(1+cos x+cos²x)，约掉公共零因子 1−cos x 后再代 x=0。",
        formula: math`\lim_{x\to 0}\frac{1+\cos x+\cos^2 x}{\cos^2 x}=3`,
        detail: "cos 0=1，分子 1+1+1=3，分母 1，极限为 3。",
        check: {
          prompt: "约去公因子 1−cos x 后，剩余分式 (1+cos x+cos²x)/cos²x 在 x→0 时的极限是多少？",
          choices: ["3", "2", "1"],
          answer: "3",
          feedback: {
            "3": "对，三项在 x=0 处都是 1，1+1+1=3。",
            "2": "1−cos³x=(1−cos x)(1+cos x+cos²x)，括号里有三项不是两项。",
            "1": "别漏掉 cos x 和 cos²x 在 0 处也等于 1。",
          },
          prerequisite: "立方差公式：1−u³=(1−u)(1+u+u²)。",
        },
      },
      {
        id: "jc935-3-2-1-3-3",
        goal: "第三步：完成一道换元倍角迁移题",
        plain: "做洛必达题时，每求一次导都先看能不能代数约分，往往比死磕多次求导快一倍。",
        formula: math`\lim_{x\to 0}\frac{\tan x-\sin x}{x-\sin x}=3`,
        detail: "完成。",
        transfer: {
          prompt: "迁移练习：令 u=2x，求极限 lim_{x→0} [tan(2x)−sin(2x)]/[2x−sin(2x)]。",
          answer: 3,
          signFeedback: "把 u=2x 看作整体，结构与本题完全相同。",
          remediation: "令 u=2x→0，原式 = lim_{u→0} (tan u−sin u)/(u−sin u)=3。",
          solution: math`\lim_{u\to 0}\frac{\tan u-\sin u}{u-\sin u}=3`,
        },
      },
    ]),
  },

  "jc935-3-2-1-4": {
    target: "掌握趋于非零点 x→π 的三角 0/0 极限，精准判断 cos(5π)=−1 的符号。",
    prerequisites: [
      "会算 [tan(4x)]′=4sec²(4x)",
      "知道 cos(kπ)=(−1)ᵏ",
    ],
    strategy: "lhopital-at-pi",
    solution: math`\begin{gathered}\lim_{x\to\pi}\frac{\sin(5x)}{\tan(4x)}=\lim_{x\to\pi}\frac{5\cos(5x)}{4\sec^2(4x)}\\[4pt]=\frac{5(-1)}{4\cdot 1}=-\frac{5}{4}\end{gathered}`,
    solutionExplanation: "一次洛必达得 5cos(5x)/[4sec²(4x)]，代入 x=π 注意 cos(5π)=−1，得 −5/4。",
    steps: buildSteps([
      {
        id: "jc935-3-2-1-4-1",
        goal: "第一步：确认 x→π 时为 0/0 型，并分别求导",
        plain: "sin(5π)=0 且 tan(4π)=0，对分子分母各自用链式法则求导。",
        formula: math`\lim_{x\to\pi}\frac{5\cos(5x)}{4\sec^2(4x)}`,
        detail: "分子 5cos(5x)，分母 4sec²(4x)。",
        check: {
          prompt: "对 sin(5x)/tan(4x) 应用一次洛必达法则后，变成什么？",
          choices: [
            "5cos(5x) / [4sec²(4x)]",
            "5cos(5x) / [4cos²(4x)]",
            "cos(5x) / sec²(4x)",
          ],
          answer: "5cos(5x) / [4sec²(4x)]",
          feedback: {
            "5cos(5x) / [4sec²(4x)]": "对，(tan u)′=sec²u，两边内层系数 5 和 4 也都乘上了。",
            "5cos(5x) / [4cos²(4x)]": "(tan u)′=1/cos²u=sec²u，不是 cos²u。",
            "cos(5x) / sec²(4x)": "漏乘了链式法则里的 5 和 4。",
          },
          prerequisite: "看公式表：(tan u)′=sec²u。",
        },
      },
      {
        id: "jc935-3-2-1-4-2",
        goal: "第二步：代入 x=π，盯紧奇数倍 π 的余弦符号",
        plain: "把 x=π 代入 5cos(5x)/[4sec²(4x)]，特别注意 cos(5π) 是 +1 还是 −1！",
        formula: math`\frac{5\cos(5\pi)}{4\sec^2(4\pi)}=\frac{5(-1)}{4\cdot 1}=-\frac{5}{4}`,
        detail: "5π 是 π 的奇数倍，cos(5π)=−1；4π 是偶数倍，sec²(4π)=1。",
        check: {
          prompt: "代入 x=π 时，cos(5π) 与 sec²(4π) 的值分别是多少？",
          choices: ["−1 和 1", "1 和 1", "−1 和 −1"],
          answer: "−1 和 1",
          feedback: {
            "−1 和 1": "对，奇数倍 π 余弦为 −1，平方后 sec²(4π) 恒为 +1，故极限为 −5/4。",
            "1 和 1": "5 是奇数，cos(5π)=cos π=−1，不是 +1。",
            "−1 和 −1": "sec²(4π) 是平方，不可能为负。",
          },
          prerequisite: "cos(奇数·π)=−1，cos(偶数·π)=+1。",
        },
      },
      {
        id: "jc935-3-2-1-4-3",
        goal: "第三步：完成一道趋于 π 的迁移题",
        plain: "遇到 x→π 时永远警惕 (−1)ᵏ 的正负号。",
        formula: math`-\frac{5}{4}`,
        detail: "完成。",
        transfer: {
          prompt: "迁移练习：求极限 lim_{x→π} sin(3x)/tan(2x)（用小数或分数表示）。",
          answer: -1.5,
          signFeedback: "注意 cos(3π)=−1，最终结果带负号。",
          remediation: "原式 = lim [3cos(3x)]/[2sec²(2x)]=3(−1)/(2·1)=−3/2=−1.5。",
          solution: math`\lim_{x\to\pi}\frac{3\cos(3x)}{2\sec^2(2x)}=-\frac{3}{2}`,
        },
      },
    ]),
  },

  "jc935-3-2-1-5": {
    target: "掌握在 x→π 处对 ln(−cos x)/(π−x)² 连续两次求导并正确处理多层负号。",
    prerequisites: [
      "会算 [ln(−cos x)]′=sin x/(−cos x)=−tan x",
      "会算 [(π−x)²]′=−2(π−x)",
    ],
    strategy: "lhopital-log-cos-pi",
    solution: math`\begin{gathered}\lim_{x\to\pi}\frac{\ln(-\cos x)}{(\pi-x)^2}=\lim_{x\to\pi}\frac{\tan x}{2(\pi-x)}\\[4pt]=\lim_{x\to\pi}\frac{\sec^2 x}{-2}=-\frac{1}{2}\end{gathered}`,
    solutionExplanation: "第一次求导化为 tan x/[2(π−x)]，第二次求导得 sec²x/(−2)，代 x=π 得 −1/2。",
    steps: buildSteps([
      {
        id: "jc935-3-2-1-5-1",
        goal: "第一步：第一次求导，处理好分子分母的两个负号",
        plain: "x→π 时 −cos x→1，属 0/0 型。分子分母分别求导，留意 (−cos x)′=+sin x 以及 [(π−x)²]′=−2(π−x)。",
        formula: math`\lim_{x\to\pi}\frac{\sin x/(-\cos x)}{-2(\pi-x)}=\lim_{x\to\pi}\frac{\tan x}{2(\pi-x)}`,
        detail: "分子是 −tan x，分母是 −2(π−x)，上下负号抵消得 tan x/[2(π−x)]。",
        check: {
          prompt: "对 ln(−cos x)/(π−x)² 第一次求导并消去公共负号后，得到什么？",
          choices: ["tan x / [2(π − x)]", "−tan x / [2(π − x)]", "cot x / [2(π − x)]"],
          answer: "tan x / [2(π − x)]",
          feedback: {
            "tan x / [2(π − x)]": "对，分子 −tan x 与分母 −2(π−x) 的负号刚好抵消！",
            "−tan x / [2(π − x)]": "分母 (π−x)² 求导还要乘内层 (π−x)′=−1，上下两个负号会抵消。",
            "cot x / [2(π − x)]": "sin x/cos x 是 tan x，不是 cot x。",
          },
          prerequisite: "[(π−x)²]′=2(π−x)·(−1)=−2(π−x)。",
        },
      },
      {
        id: "jc935-3-2-1-5-2",
        goal: "第二步：对 tan x/[2(π−x)] 第二次求导并代 x=π",
        plain: "x→π 时仍是 0/0 型，再求一次导，注意分母 [2(π−x)]′ 的负号。",
        formula: math`\lim_{x\to\pi}\frac{\sec^2 x}{-2}=-\frac{1}{2}`,
        detail: "sec²π=1/(−1)²=1，故极限为 −1/2。",
        check: {
          prompt: "对 tan x/[2(π−x)] 第二次求导并代入 x=π，结果是多少？",
          choices: ["−1/2", "1/2", "−2"],
          answer: "−1/2",
          feedback: {
            "−1/2": "对，分子 sec²π=1，分母 [2(π−x)]′=−2，比值 −1/2。",
            "1/2": "分母 2(π−x) 对 x 求导是 −2，别漏掉负号。",
            "−2": "2 在分母里，是 1/(−2)=−1/2。",
          },
          prerequisite: "(π−x)′=−1，sec²π=1。",
        },
      },
      {
        id: "jc935-3-2-1-5-3",
        goal: "第三步：完成一道同类对数余弦迁移题",
        plain: "在 x=0 附近算 ln(cos(2x))/x² 练一练同样的两次洛必达。",
        formula: math`-\frac{1}{2}`,
        detail: "完成。",
        transfer: {
          prompt: "迁移练习：求极限 lim_{x→0} ln(cos(2x))/x²。",
          answer: -2,
          signFeedback: "第一次求导得 −2tan(2x)/(2x)=−tan(2x)/x，第二次得 −2sec²(2x)。",
          remediation: "原式 = lim −tan(2x)/x = lim −2sec²(2x)=−2。",
          solution: math`\begin{gathered}\lim_{x\to 0}\frac{-2\tan(2x)}{2x}=\lim_{x\to 0}\frac{-\tan(2x)}{x}\\[4pt]=\lim_{x\to 0}(-2\sec^2(2x))=-2\end{gathered}`,
        },
      },
    ]),
  },

  "jc935-3-2-1-6": {
    target: "分清含参极限里的自变量 x 与常数 a、m，避免把常数项 aᵃ 当成变量求导。",
    prerequisites: [
      "熟记一般指数求导 (aˣ)′=aˣ ln a",
      "知道极限变量是 x，aᵃ 与 aᵐ 导数皆为 0",
    ],
    strategy: "lhopital-parametric-exp",
    solution: math`\begin{gathered}\lim_{x\to a}\frac{a^x-a^a}{x^m-a^m}=\lim_{x\to a}\frac{a^x\ln a}{mx^{m-1}}\\[4pt]=\frac{a^{a-m+1}\ln a}{m}\end{gathered}`,
    solutionExplanation: "对 x 求导得 (aˣ ln a)/(mxᵐ⁻¹)，代 x=a 并合并同底数幂。",
    steps: buildSteps([
      {
        id: "jc935-3-2-1-6-1",
        goal: "第一步：认清谁是变量 x、谁是常数，分别对 x 求导",
        plain: "x→a 时为 0/0 型。特别注意 aᵃ 和 aᵐ 都不含 x，求导直接为 0；aˣ 是指数函数，xᵐ 是幂函数。",
        formula: math`\lim_{x\to a}\frac{a^x\ln a}{mx^{m-1}}`,
        detail: "(aˣ)′=aˣ ln a，(xᵐ)′=mxᵐ⁻¹。",
        check: {
          prompt: "对 (aˣ−aᵃ)/(xᵐ−aᵐ) 关于变量 x 使用一次洛必达法则，结果是？",
          choices: [
            "(aˣ ln a) / (mxᵐ⁻¹)",
            "(xaˣ⁻¹) / (mxᵐ⁻¹)",
            "(aˣ ln a − aᵃ ln a) / (mxᵐ⁻¹)",
          ],
          answer: "(aˣ ln a) / (mxᵐ⁻¹)",
          feedback: {
            "(aˣ ln a) / (mxᵐ⁻¹)": "对，aˣ 是指数函数导数为 aˣ ln a，常数 aᵃ 求导直接归零。",
            "(xaˣ⁻¹) / (mxᵐ⁻¹)": "把指数函数 aˣ 错当成幂函数求导了！底数固定、指数是 x 时导数是 aˣ ln a。",
            "(aˣ ln a − aᵃ ln a) / (mxᵐ⁻¹)": "aᵃ 不含 x，是常数，导数为 0。",
          },
          prerequisite: "看公式表区分：(aˣ)′=aˣ ln a 与 (xᵐ)′=mxᵐ⁻¹。",
        },
      },
      {
        id: "jc935-3-2-1-6-2",
        goal: "第二步：代入 x=a 并合并同底数幂 aᵃ / aᵐ⁻¹",
        plain: "代入 x=a 后得到 (aᵃ ln a)/(m·aᵐ⁻¹)，用同底数幂相除法则合并指数。",
        formula: math`\frac{a^a\ln a}{ma^{m-1}}=\frac{a^{a-m+1}\ln a}{m}`,
        detail: "a−(m−1)=a−m+1。",
        check: {
          prompt: "合并同底数幂 aᵃ / aᵐ⁻¹ 时，a 的指数变成什么？",
          choices: ["a − m + 1", "a − m − 1", "a + m − 1"],
          answer: "a − m + 1",
          feedback: {
            "a − m + 1": "对，a−(m−1)=a−m+1，拆括号负负得正。",
            "a − m − 1": "减去 (m−1) 时括号里的 −1 要变号成 +1。",
            "a + m − 1": "同底数幂相除是底数不变、指数相减。",
          },
          prerequisite: "指数运算：aᵖ/aᵠ=aᵖ⁻ᵠ。",
        },
      },
      {
        id: "jc935-3-2-1-6-3",
        goal: "第三步：代具体参数 a=e, m=2 做一道迁移题",
        plain: "把字母换成 e 和 2 实算一遍，加深印象。",
        formula: math`\frac{a^{a-m+1}\ln a}{m}`,
        detail: "完成。",
        transfer: {
          prompt: "迁移练习：取 a=e, m=2，求 [lim_{x→1} (eˣ−e)/(x²−1)] 除以 e 之后的数值（小数或分数）。",
          answer: 0.5,
          signFeedback: "对 (eˣ−e)/(x²−1) 求导得 eˣ/(2x)，代 x=1 得 e/2。",
          remediation: "lim (eˣ−e)/(x²−1)=lim eˣ/(2x)=e/2，除以 e 得 1/2=0.5。",
          solution: math`\lim_{x\to 1}\frac{e^x-e}{x^2-1}=\lim_{x\to 1}\frac{e^x}{2x}=\frac{e}{2}\implies\frac{1}{2}`,
        },
      },
    ]),
  },

  "jc935-3-2-1-7": {
    target: "掌握 ∞/∞ 对数比极限：一次洛必达后立刻化繁分式拆出重要极限，切忌盲目二次求导。",
    prerequisites: ["会算 [ln(sin(kx))]′=k cos(kx)/sin(kx)"],
    strategy: "lhopital-log-sin-ratio",
    solution: math`\begin{gathered}\lim_{x\to 0^+}\frac{\ln\sin(5x)}{\ln\sin(3x)}\\[4pt]=\frac{5}{3}\lim_{x\to 0^+}\frac{\sin(3x)}{\sin(5x)}\cdot\frac{\cos(5x)}{\cos(3x)}=1\end{gathered}`,
    solutionExplanation: "一次洛必达后翻成乘积 (5/3)·[sin(3x)/sin(5x)]·[cos(5x)/cos(3x)]，极限为 (5/3)(3/5)·1=1。",
    steps: buildSteps([
      {
        id: "jc935-3-2-1-7-1",
        goal: "第一步：对 ∞/∞ 型求导一次，并把繁分式翻成乘积",
        plain: "x→0⁺ 时分子分母均趋于 −∞。分别求导得 [5cos(5x)/sin(5x)]/[3cos(3x)/sin(3x)]，把繁分式上下翻转整理。",
        formula: math`\frac{5}{3}\lim_{x\to 0^+}\frac{\sin(3x)}{\sin(5x)}\cdot\frac{\cos(5x)}{\cos(3x)}`,
        detail: "翻过来后 sin(3x) 上分子、sin(5x) 下分母，别再对余弦瞎求导。",
        check: {
          prompt: "把繁分式 [5cos(5x)/sin(5x)] / [3cos(3x)/sin(3x)] 翻转整理，sin 这一部分变成什么？",
          choices: ["sin(3x) / sin(5x)", "sin(5x) / sin(3x)", "sin(3x) · sin(5x)"],
          answer: "sin(3x) / sin(5x)",
          feedback: {
            "sin(3x) / sin(5x)": "对，除以分式等于乘以它的倒数，sin(3x) 翻到了分子上。",
            "sin(5x) / sin(3x)": "分母里的分母 sin(3x) 翻上来应在分子。",
            "sin(3x) · sin(5x)": "sin(5x) 仍在分母，两者相除不是相乘。",
          },
          prerequisite: "(A/B)/(C/D)=(A/C)·(D/B)。",
        },
      },
      {
        id: "jc935-3-2-1-7-2",
        goal: "第二步：逐项取极限相乘",
        plain: "x→0⁺ 时 cos(5x)/cos(3x)→1，sin(3x)/sin(5x)→3/5，把三个因子乘起来。",
        formula: math`\frac{5}{3}\cdot\frac{3}{5}\cdot 1=1`,
        detail: "5/3 与 3/5 恰好抵消成 1。",
        check: {
          prompt: "计算 (5/3) · lim_{x→0⁺} [sin(3x)/sin(5x)] · lim_{x→0⁺} [cos(5x)/cos(3x)]，最终结果是？",
          choices: ["1", "5/3", "25/9"],
          answer: "1",
          feedback: {
            "1": "对，(5/3)×(3/5)×1=1，系数刚好互相消掉！",
            "5/3": "别忘了 sin(3x)/sin(5x) 的极限是 3/5 不是 1。",
            "25/9": "把 sin(3x)/sin(5x) 错翻成 5/3 了。",
          },
          prerequisite: "lim_{x→0} sin(ax)/sin(bx)=a/b。",
        },
      },
      {
        id: "jc935-3-2-1-7-3",
        goal: "第三步：完成换系数迁移题",
        plain: "记住这个漂亮结论：只要 a, b>0，lim_{x→0⁺} ln(sin ax)/ln(sin bx) 恒为 1。",
        formula: math`1`,
        detail: "完成。",
        transfer: {
          prompt: "迁移练习：求极限 lim_{x→0⁺} ln(sin(7x))/ln(sin(2x))。",
          answer: 1,
          signFeedback: "(7/2) 乘以 sin(2x)/sin(7x) 的极限 2/7。",
          remediation: "原式 = (7/2)·(2/7)·1=1。",
          solution: math`\frac{7}{2}\lim_{x\to 0^+}\frac{\sin(2x)}{\sin(7x)}\cdot\frac{\cos(7x)}{\cos(2x)}=1`,
        },
      },
    ]),
  },

  "jc935-3-2-1-8": {
    target: "学会把 ∞/∞ 正切比翻成 0/0 余切比再用洛必达法则，避免 sec² 越求越乱。",
    prerequisites: [
      "知道 tan θ=1/cot θ 与 (cot u)′=−csc²u",
      "知道 csc²(5x)/csc²(3x)=sin²(3x)/sin²(5x)",
    ],
    strategy: "lhopital-tan-to-cot",
    solution: math`\begin{gathered}\lim_{x\to\frac{\pi}{2}}\frac{\tan(3x)}{\tan(5x)}=\lim_{x\to\frac{\pi}{2}}\frac{\cot(5x)}{\cot(3x)}\\[4pt]=\frac{5}{3}\lim_{x\to\frac{\pi}{2}}\frac{\sin^2(3x)}{\sin^2(5x)}=\frac{5}{3}\end{gathered}`,
    solutionExplanation: "翻成 cot(5x)/cot(3x) 后求导，再翻成 (5/3)·sin²(3x)/sin²(5x)，代 x=π/2 得 5/3。",
    steps: buildSteps([
      {
        id: "jc935-3-2-1-8-1",
        goal: "第一步：把 tan(3x)/tan(5x) 改写为 0/0 型余切比",
        plain: "x→π/2 时 tan(3x) 与 tan(5x) 均趋于 ∞。用倒数关系把正切比翻成余切比，看清 3x 和 5x 谁上谁下。",
        formula: math`\lim_{x\to\frac{\pi}{2}}\frac{\cot(5x)}{\cot(3x)}`,
        detail: "tan(3x)/tan(5x)=[1/cot(3x)]/[1/cot(5x)]=cot(5x)/cot(3x)。",
        check: {
          prompt: "利用 tan θ=1/cot θ，把 tan(3x)/tan(5x) 改写成余切之比后是？",
          choices: ["cot(5x) / cot(3x)", "cot(3x) / cot(5x)", "−cot(5x) / cot(3x)"],
          answer: "cot(5x) / cot(3x)",
          feedback: {
            "cot(5x) / cot(3x)": "对，取倒数后分子分母互换位置，5x 上分子、3x 下分母！",
            "cot(3x) / cot(5x)": "tan 变 cot 是取倒数，分子分母要对调位置。",
            "−cot(5x) / cot(3x)": "tan θ=1/cot θ 没有负号。",
          },
          prerequisite: "(1/a)/(1/b)=b/a。",
        },
      },
      {
        id: "jc935-3-2-1-8-2",
        goal: "第二步：求导并把 csc² 比翻成 sin² 比，代 x=π/2",
        plain: "对 cot(5x)/cot(3x) 求导得 [−5csc²(5x)]/[−3csc²(3x)]，再用 csc=1/sin 翻回正弦平方并代入 x=π/2。",
        formula: math`\frac{5}{3}\lim_{x\to\frac{\pi}{2}}\frac{\sin^2(3x)}{\sin^2(5x)}=\frac{5}{3}`,
        detail: "sin(3π/2)=−1、sin(5π/2)=1，平方都是 1，极限为 5/3。",
        check: {
          prompt: "求导化简为 (5/3)·[sin²(3x)/sin²(5x)] 后，代入 x=π/2 得到的值是？",
          choices: ["5/3", "3/5", "−5/3"],
          answer: "5/3",
          feedback: {
            "5/3": "对，(−1)²/1²=1，结果是 5/3（注意不是 3/5！）。",
            "3/5": "在第一步翻成 cot(5x)/cot(3x) 时，5 已经翻到分子上了。",
            "−5/3": "sin²(3π/2)=(−1)²=+1，平方后没有负号。",
          },
          prerequisite: "sin(3π/2)=−1，平方后为 +1。",
        },
      },
      {
        id: "jc935-3-2-1-8-3",
        goal: "第三步：完成一道换系数正切比迁移题",
        plain: "注意区别：x→0 时 tan(ax)/tan(bx)→a/b，而 x→π/2 时（a, b 同奇或同偶）会翻成 b/a！",
        formula: math`\frac{5}{3}`,
        detail: "完成。",
        transfer: {
          prompt: "迁移练习：求极限 lim_{x→π/2} tan(x)/tan(3x)。",
          answer: 3,
          signFeedback: "先用倒数关系翻成 cot(3x)/cot(x)，再求导代入 x=π/2。",
          remediation: "原式 = lim cot(3x)/cot(x) = lim [−3csc²(3x)]/[−csc²x] = 3·lim sin²x/sin²(3x) = 3。",
          solution: math`\begin{gathered}\lim_{x\to\frac{\pi}{2}}\frac{\cot(3x)}{\cot x}=3\lim_{x\to\frac{\pi}{2}}\frac{\sin^2 x}{\sin^2(3x)}=3\end{gathered}`,
        },
      },
    ]),
  },

  "jc935-3-2-1-9": {
    target: "掌握 x→+∞ 时含 1/x 的 0/0 型洛必达求导与有理分式化简。",
    prerequisites: [
      "会算 [ln(1+3/x)]′=−3/(x²+3x)",
      "会算 [arctan(2/x)]′=−2/(x²+4)",
    ],
    strategy: "lhopital-infinity-zero-over-zero",
    solution: math`\begin{gathered}\lim_{x\to+\infty}\frac{\ln(1+3/x)}{\arctan(2/x)}\\[4pt]=\lim_{x\to+\infty}\frac{3(x^2+4)}{2(x^2+3x)}=\frac{3}{2}\end{gathered}`,
    solutionExplanation: "链式求导后上下约去 −1/x² 并通分，抓 x² 最高次系数得 3/2。",
    steps: buildSteps([
      {
        id: "jc935-3-2-1-9-1",
        goal: "第一步：对分子 ln(1+3/x) 和分母 arctan(2/x) 用链式法则求导",
        plain: "x→+∞ 时为 0/0 型。分子分母各自乘以内层导数 (−3/x²) 与 (−2/x²)，把 x² 乘进各自的分母里化简。",
        formula: math`\lim_{x\to+\infty}\frac{-3/(x^2+3x)}{-2/(x^2+4)}=\lim_{x\to+\infty}\frac{3(x^2+4)}{2(x^2+3x)}`,
        detail: "[1/(1+3/x)]·(−3/x²)=−3/(x²+3x)；[1/(1+4/x²)]·(−2/x²)=−2/(x²+4)。",
        check: {
          prompt: "对分母 arctan(2/x) 用链式法则求导并化简，结果等于什么？",
          choices: ["−2 / (x² + 4)", "2 / (x² + 4)", "−2 / (1 + 4x²)"],
          answer: "−2 / (x² + 4)",
          feedback: {
            "−2 / (x² + 4)": "对，[1/(1+4/x²)]·(−2/x²)=−2/(x²+4)，与分子的负号相消！",
            "2 / (x² + 4)": "内层 (2/x)′=−2/x²，别漏掉负号。",
            "−2 / (1 + 4x²)": "x² 乘进 (1+4/x²) 得到 x²+4，不是 1+4x²。",
          },
          prerequisite: "x²(1+4/x²)=x²+4。",
        },
      },
      {
        id: "jc935-3-2-1-9-2",
        goal: "第二步：求有理分式 [3(x²+4)]/[2(x²+3x)] 在 x→+∞ 时的极限",
        plain: "分子分母最高次幂都是 x²，抓最高次项系数之比即可。",
        formula: math`\lim_{x\to+\infty}\frac{3(1+4/x^2)}{2(1+3/x)}=\frac{3}{2}`,
        detail: "结果为 3/2。",
        check: {
          prompt: "当 x→+∞ 时，[3(x²+4)]/[2(x²+3x)] 的极限是多少？",
          choices: ["3/2", "2", "0"],
          answer: "3/2",
          feedback: {
            "3/2": "对，同除以 x² 后 4/x²→0、3/x→0，剩下 3/2。",
            "2": "4 与 3x 都是低阶项，不能拿常数 12 除以 6。",
            "0": "分子分母同为二次多项式，极限是最高次系数比而非 0。",
          },
          prerequisite: "同次多项式在无穷远处的极限等于最高次系数之比。",
        },
      },
      {
        id: "jc935-3-2-1-9-3",
        goal: "第三步：完成一道换系数迁移题",
        plain: "同样方法也可令 t=1/x→0⁺ 转化为零点极限。",
        formula: math`\frac{3}{2}`,
        detail: "完成。",
        transfer: {
          prompt: "迁移练习：求极限 lim_{x→+∞} ln(1+5/x)/arctan(2/x)（小数或分数）。",
          answer: 2.5,
          signFeedback: "与本题结构完全相同，只需对比 5 和 2。",
          remediation: "洛必达后得 [5(x²+4)]/[2(x²+5x)]→5/2=2.5。",
          solution: math`\lim_{x\to+\infty}\frac{5(x^2+4)}{2(x^2+5x)}=\frac{5}{2}`,
        },
      },
    ]),
  },

  "jc935-3-2-1-10": {
    target: "学会在一次洛必达后提取公因子并拆出非零极限因子，优雅拿下复合三角对数极限。",
    prerequisites: [
      "会算 [sec(2x)]′=2sec(2x)tan(2x)",
      "知道乘法中的非零极限因子可先代入求值",
    ],
    strategy: "lhopital-split-nonzero-factors",
    solution: math`\begin{gathered}\lim_{x\to 0}\frac{6x/(1+3x^2)}{2\sec(2x)\tan(2x)+2\sin(2x)}\\[4pt]=\lim_{x\to 0}\frac{3}{1+3x^2}\cdot\frac{x}{\sin(2x)}\cdot\frac{\cos^2(2x)}{1+\cos^2(2x)}=\frac{3}{4}\end{gathered}`,
    solutionExplanation: "一次洛必达后把分母提公因子 2sin(2x)，拆成三段极限 3×(1/2)×(1/2)=3/4。",
    steps: buildSteps([
      {
        id: "jc935-3-2-1-10-1",
        goal: "第一步：一次洛必达求导，注意 −cos(2x) 求导变正",
        plain: "x→0 时为 0/0 型。分子分母分别求导，留意分母里 −[cos(2x)]′=+2sin(2x)。",
        formula: math`\lim_{x\to 0}\frac{6x/(1+3x^2)}{2\sec(2x)\tan(2x)+2\sin(2x)}`,
        detail: "分子 6x/(1+3x²)，分母 2sec(2x)tan(2x)+2sin(2x)。",
        check: {
          prompt: "对分母 sec(2x)−cos(2x) 用链式法则求导，结果是？",
          choices: [
            "2sec(2x)tan(2x) + 2sin(2x)",
            "2sec(2x)tan(2x) − 2sin(2x)",
            "sec(2x)tan(2x) + sin(2x)",
          ],
          answer: "2sec(2x)tan(2x) + 2sin(2x)",
          feedback: {
            "2sec(2x)tan(2x) + 2sin(2x)": "对，−[cos(2x)]′=+2sin(2x)，两项都乘上了内层系数 2。",
            "2sec(2x)tan(2x) − 2sin(2x)": "−(cos u)′=+sin u，中间是加号。",
            "sec(2x)tan(2x) + sin(2x)": "漏乘了内层 (2x)′=2。",
          },
          prerequisite: "看公式表：(sec u)′=sec u tan u，(cos u)′=−sin u。",
        },
      },
      {
        id: "jc935-3-2-1-10-2",
        goal: "第二步：提取分母的 2sin(2x)，把三段极限相乘",
        plain: "把 sec(2x)tan(2x)=sin(2x)/cos²(2x) 提公因子 2sin(2x) 后，原式拆成 [3/(1+3x²)]·[x/sin(2x)]·[cos²(2x)/(1+cos²(2x))]，分别代入算乘积。",
        formula: math`3\cdot\frac{1}{2}\cdot\frac{1}{2}=\frac{3}{4}`,
        detail: "x/sin(2x)→1/2，cos²0/(1+cos²0)=1/2，乘上 3 得 3/4。",
        check: {
          prompt: "在拆出的三段极限中，x→0 时 x/sin(2x) 与 cos²(2x)/(1+cos²(2x)) 的极限分别是？",
          choices: ["1/2 和 1/2", "2 和 1/2", "1/2 和 1"],
          answer: "1/2 和 1/2",
          feedback: {
            "1/2 和 1/2": "对，3 × (1/2) × (1/2) = 3/4！",
            "2 和 1/2": "x/sin(2x)=(1/2)·[2x/sin(2x)]→1/2，不是 2。",
            "1/2 和 1": "1+cos²0=1+1=2，所以第二段是 1/2 不是 1。",
          },
          prerequisite: "lim (x/sin(2x))=1/2，cos 0=1。",
        },
      },
      {
        id: "jc935-3-2-1-10-3",
        goal: "第三步：完成一道换系数迁移题",
        plain: "先提非零因子再算极限，是避免复杂求导的黄金技巧。",
        formula: math`\frac{3}{4}`,
        detail: "完成。",
        transfer: {
          prompt: "迁移练习：求极限 lim_{x→0} ln(1+4x²)/[sec(2x)−cos(2x)]。",
          answer: 1,
          signFeedback: "分子把 3x² 换成 4x²，结果是原题 3/4 的 4/3 倍。",
          remediation: "原式拆成 4·(1/2)·(1/2)=1。",
          solution: math`4\cdot\frac{1}{2}\cdot\frac{1}{2}=1`,
        },
      },
    ]),
  },

  "jc935-3-2-1-11": {
    target: "掌握 0·∞ 型改写为 0/0 型分式的技巧（把 cot 放分母变 tan），一次洛必达出答案。",
    prerequisites: ["知道 cot(3x)=1/tan(3x) 与 [tan(3x)]′=3sec²(3x)"],
    strategy: "lhopital-zero-times-inf",
    solution: math`\begin{gathered}\lim_{x\to 0}(e^{2x}-1)\cot(3x)=\lim_{x\to 0}\frac{e^{2x}-1}{\tan(3x)}\\[4pt]=\lim_{x\to 0}\frac{2e^{2x}}{3\sec^2(3x)}=\frac{2}{3}\end{gathered}`,
    solutionExplanation: "用 cot(3x)=1/tan(3x) 化为 0/0 型，求导得 2e²ˣ/[3sec²(3x)]→2/3。",
    steps: buildSteps([
      {
        id: "jc935-3-2-1-11-1",
        goal: "第一步：破题——把 0·∞ 型改写成最好求导的 0/0 型分式",
        plain: "洛必达法则只能直接用于 0/0 或 ∞/∞。把 (e²ˣ−1)cot(3x) 改写成分式时，把 cot(3x) 翻到分母最顺手。",
        formula: math`\lim_{x\to 0}\frac{e^{2x}-1}{\tan(3x)}`,
        detail: "cot(3x)=1/tan(3x)，改写后分子分母均趋于 0。",
        check: {
          prompt: "要把 0·∞ 型的 (e²ˣ−1)cot(3x) 改写成最便于求导的 0/0 型分式，写成哪一个最好？",
          choices: [
            "(e²ˣ − 1) / tan(3x)",
            "cot(3x) / (e²ˣ − 1)",
            "(e²ˣ − 1) · tan(3x)",
          ],
          answer: "(e²ˣ − 1) / tan(3x)",
          feedback: {
            "(e²ˣ − 1) / tan(3x)": "对，分子分母一次求导直接消掉 0/0，干净利落！",
            "cot(3x) / (e²ˣ − 1)": "这把原式除以了 (e²ˣ−1)²，与原式不等价。",
            "(e²ˣ − 1) · tan(3x)": "cot(3x) 是 1/tan(3x)，不是 tan(3x)。",
          },
          prerequisite: "cot θ=1/tan θ。",
        },
      },
      {
        id: "jc935-3-2-1-11-2",
        goal: "第二步：一次洛必达求导并代入 x=0",
        plain: "对 (e²ˣ−1)/tan(3x) 分子分母分别求导，再代入 x=0。",
        formula: math`\lim_{x\to 0}\frac{2e^{2x}}{3\sec^2(3x)}=\frac{2}{3}`,
        detail: "e⁰=1、sec²0=1，得 2/3。",
        check: {
          prompt: "对 (e²ˣ−1)/tan(3x) 求导并代入 x=0，结果是？",
          choices: ["2/3", "3/2", "1"],
          answer: "2/3",
          feedback: {
            "2/3": "对，分子导数 2e⁰=2，分母导数 3sec²0=3。",
            "3/2": "分子系数是 2、分母系数是 3，不要写反。",
            "1": "别漏乘链式法则的 2 和 3。",
          },
          prerequisite: "(e²ˣ)′=2e²ˣ，[tan(3x)]′=3sec²(3x)。",
        },
      },
      {
        id: "jc935-3-2-1-11-3",
        goal: "第三步：完成换系数迁移题",
        plain: "遇到 0·∞ 型先想「把谁翻到分母求导最简单」。",
        formula: math`\frac{2}{3}`,
        detail: "完成。",
        transfer: {
          prompt: "迁移练习：求极限 lim_{x→0} (e⁶ˣ−1)cot(2x)。",
          answer: 3,
          signFeedback: "化为 (e⁶ˣ−1)/tan(2x)，求导代入得 6/2。",
          remediation: "原式 = lim (6e⁶ˣ)/[2sec²(2x)]=6/2=3。",
          solution: math`\lim_{x\to 0}\frac{e^{6x}-1}{\tan(2x)}=\lim_{x\to 0}\frac{6e^{6x}}{2\sec^2(2x)}=3`,
        },
      },
    ]),
  },

  "jc935-3-2-1-12": {
    target: "学会在 0·∞ 型中把幂函数 x⁴ 翻到分母（而非把指数翻分母），连续两次洛必达看出指数爆炸至 +∞。",
    prerequisites: [
      "会算 [e^(1/x²)]′=e^(1/x²)·(−2/x³)",
      "会算 (x⁻⁴)′=−4x⁻⁵",
    ],
    strategy: "lhopital-exp-beats-power",
    solution: math`\begin{gathered}\lim_{x\to 0}\frac{e^{1/x^2}}{x^{-4}}=\frac{1}{2}\lim_{x\to 0}\frac{e^{1/x^2}}{x^{-2}}\\[4pt]=\frac{1}{2}\lim_{x\to 0}e^{1/x^2}=+\infty\end{gathered}`,
    solutionExplanation: "把 x⁴ 写成 x⁻⁴ 放分母，两次求导消掉分母幂次，剩 (1/2)e^(1/x²)→+∞。",
    steps: buildSteps([
      {
        id: "jc935-3-2-1-12-1",
        goal: "第一步：把 0·∞ 型改写为 ∞/∞ 型，选对放分母的因子",
        plain: "x→0 时 x⁴→0、e^(1/x²)→+∞。把 x⁴ 改写成 x⁻⁴ 放到分母，再对分子分母各求一次导。",
        formula: math`\lim_{x\to 0}\frac{e^{1/x^2}\cdot(-2/x^3)}{-4/x^5}=\frac{1}{2}\lim_{x\to 0}\frac{e^{1/x^2}}{x^{-2}}`,
        detail: "约去负号与 1/x³ 后，分母从 x⁻⁴ 降到了 x⁻²！",
        check: {
          prompt: "把 x⁴e^(1/x²) 写成 e^(1/x²)/x⁻⁴ 并第一次求导约分后，得到什么？",
          choices: [
            "(1/2) · e^(1/x²) / x⁻²",
            "2 · e^(1/x²) / x⁻²",
            "(1/2) · e^(1/x²) / x⁻⁶",
          ],
          answer: "(1/2) · e^(1/x²) / x⁻²",
          feedback: {
            "(1/2) · e^(1/x²) / x⁻²": "对，(−2/x³)/(−4/x⁵)=x²/2，所以分母降成了 x⁻²，再来一次就消光了！",
            "2 · e^(1/x²) / x⁻²": "分子系数 −2 除以分母系数 −4 等于 1/2 不是 2。",
            "(1/2) · e^(1/x²) / x⁻⁶": "x⁻³/x⁻⁵=x²（放分母就是 x⁻²），指数是在下降而不是上升。",
          },
          prerequisite: "(−2x⁻³)/(−4x⁻⁵)=(1/2)x²。",
        },
      },
      {
        id: "jc935-3-2-1-12-2",
        goal: "第二步：第二次求导消光幂次，直接读出 +∞",
        plain: "对 (1/2)·e^(1/x²)/x⁻² 再用一次洛必达法则，看看 (−2/x³) 会和谁抵消。",
        formula: math`\frac{1}{2}\lim_{x\to 0}\frac{e^{1/x^2}\cdot(-2/x^3)}{-2/x^3}=\frac{1}{2}\lim_{x\to 0}e^{1/x^2}=+\infty`,
        detail: "上下 (−2/x³) 完全抵消，只剩 (1/2)e^(1/x²)→+∞。",
        check: {
          prompt: "对 (1/2)·e^(1/x²)/x⁻² 第二次求导约分后，剩下什么表达式？",
          choices: ["(1/2)e^(1/x²)", "(1/4)e^(1/x²)", "0"],
          answer: "(1/2)e^(1/x²)",
          feedback: {
            "(1/2)e^(1/x²)": "对，上下 (−2/x³) 恰好一比一约掉，x→0 时 1/x²→+∞，所以极限是 +∞。",
            "(1/4)e^(1/x²)": "分子分母求导出来的都是 −2/x³，比值是 1，不会再多乘一个 1/2。",
            "0": "1/x² 在 x→0 时趋于 +∞ 而不是 −∞，指数爆炸到 +∞。",
          },
          prerequisite: "(x⁻²)′=−2x⁻³，与分子的 (1/x²)′=−2x⁻³ 完全相同。",
        },
      },
      {
        id: "jc935-3-2-1-12-3",
        goal: "第三步：做一道有限数值迁移题巩固二次洛必达",
        plain: "也可令 t=1/x²→+∞ 改写成 lim eᵗ/t²=+∞，一眼更直观。",
        formula: math`+\infty`,
        detail: "完成。",
        transfer: {
          prompt: "迁移练习：求极限 lim_{x→0} x²/(e²ˣ−1−2x)（用小数或分数表示）。",
          answer: 0.5,
          signFeedback: "两次洛必达：2x/(2e²ˣ−2) → 2/(4e²ˣ)，代 x=0。",
          remediation: "原式 = lim 2x/(2e²ˣ−2)=lim 1/(2e²ˣ)=1/2=0.5。",
          solution: math`\lim_{x\to 0}\frac{2x}{2e^{2x}-2}=\lim_{x\to 0}\frac{1}{2e^{2x}}=\frac{1}{2}`,
        },
      },
    ]),
  },

  "jc935-3-2-1-13": {
    target: "掌握 ∞−∞ 型分式差「先通分合并为 0/0 型，再用洛必达」的标准解法。",
    prerequisites: ["会用平方差 x²−4=(x−2)(x+2) 通分"],
    strategy: "lhopital-inf-minus-inf",
    solution: math`\begin{gathered}\lim_{x\to 2}\left(\frac{4}{x^2-4}-\frac{1}{x-2}\right)=\lim_{x\to 2}\frac{2-x}{x^2-4}\\[4pt]=\lim_{x\to 2}\frac{-1}{2x}=-\frac{1}{4}\end{gathered}`,
    solutionExplanation: "通分化为 (2−x)/(x²−4)，一次洛必达得 −1/(2x)→−1/4。",
    steps: buildSteps([
      {
        id: "jc935-3-2-1-13-1",
        goal: "第一步：通分把 ∞−∞ 型合并成单个 0/0 型分式",
        plain: "x→2 时两项都趋于 ∞。利用 x²−4=(x−2)(x+2) 把第二项通分，合并成一个分式。",
        formula: math`\frac{4}{x^2-4}-\frac{x+2}{x^2-4}=\frac{2-x}{x^2-4}`,
        detail: "4−(x+2)=2−x，分子分母在 x=2 处均为 0。",
        check: {
          prompt: "把 4/(x²−4) − 1/(x−2) 以 x²−4 为公分母通分合并后，分子变成什么？",
          choices: ["2 − x", "6 − x", "2 + x"],
          answer: "2 − x",
          feedback: {
            "2 − x": "对，4−(x+2)=4−x−2=2−x，现在是标准的 0/0 型。",
            "6 − x": "减括号 4−(x+2) 时 +2 也要变号成 −2。",
            "2 + x": "减去 (x+2) 后 x 前面是负号。",
          },
          prerequisite: "4−(x+2)=4−x−2=2−x。",
        },
      },
      {
        id: "jc935-3-2-1-13-2",
        goal: "第二步：对 (2−x)/(x²−4) 求导并代入 x=2",
        plain: "分子分母各自求导，再把 x=2 代进去算出最终值。",
        formula: math`\lim_{x\to 2}\frac{-1}{2x}=-\frac{1}{4}`,
        detail: "分子 (2−x)′=−1，分母 (x²−4)′=2x，代 x=2 得 −1/4。",
        check: {
          prompt: "对 (2−x)/(x²−4) 用洛必达法则并代入 x=2，结果是多少？",
          choices: ["−1/4", "1/4", "−1/2"],
          answer: "−1/4",
          feedback: {
            "−1/4": "对，(−1)/(2×2)=−1/4。",
            "1/4": "(2−x)′=−1，别漏掉负号。",
            "−1/2": "分母是 2x，代入 x=2 是 4 不是 2。",
          },
          prerequisite: "(2−x)′=−1，(x²−4)′=2x。",
        },
      },
      {
        id: "jc935-3-2-1-13-3",
        goal: "第三步：完成一道换点通分迁移题",
        plain: "∞−∞ 型分式差的第一步永远是通分。",
        formula: math`-\frac{1}{4}`,
        detail: "完成。",
        transfer: {
          prompt: "迁移练习：求极限 lim_{x→3} [6/(x²−9) − 1/(x−3)]（用分数如 -1/6 表示）。",
          answer: -1 / 6,
          signFeedback: "通分分子为 6−(x+3)=3−x，求导得 −1/(2x)，代 x=3。",
          remediation: "原式 = lim (3−x)/(x²−9)=lim (−1)/(2x)=−1/6。",
          solution: math`\lim_{x\to 3}\frac{3-x}{x^2-9}=\lim_{x\to 3}\frac{-1}{2x}=-\frac{1}{6}`,
        },
      },
    ]),
  },

  "jc935-3-2-1-14": {
    target: "掌握 1^∞ 幂指极限「先取对数算指数极限 L，最后还原 e^L」的标准流程。",
    prerequisites: [
      "知道 u^v=e^{v ln u}",
      "会算 [ln(e²ˣ+3x)]′=(2e²ˣ+3)/(e²ˣ+3x)",
    ],
    strategy: "lhopital-one-to-inf",
    solution: math`\begin{gathered}L=\lim_{x\to 0}\frac{\ln(e^{2x}+3x)}{x}\\[4pt]=\lim_{x\to 0}\frac{2e^{2x}+3}{e^{2x}+3x}=5\implies e^5\end{gathered}`,
    solutionExplanation: "取对数得指数极限 L=5，最后由指数连续性还原得 e⁵。",
    steps: buildSteps([
      {
        id: "jc935-3-2-1-14-1",
        goal: "第一步：对 1^∞ 型取对数得 L=lim ln(e²ˣ+3x)/x，并用洛必达求导",
        plain: "x→0 时底数趋于 1、指数趋于 ∞，先对指数上的 0/0 型 L=lim ln(e²ˣ+3x)/x 用一次洛必达法则。",
        formula: math`L=\lim_{x\to 0}\frac{(2e^{2x}+3)/(e^{2x}+3x)}{1}=5`,
        detail: "分子求导得 (2e²ˣ+3)/(e²ˣ+3x)，分母求导为 1，代入 x=0 得 L=(2+3)/1=5。",
        check: {
          prompt: "对指数上的 0/0 型极限 L=lim_{x→0} ln(e²ˣ+3x)/x 用洛必达法则，算出的 L 等于多少？",
          choices: ["5", "4", "3"],
          answer: "5",
          feedback: {
            "5": "对，(e²ˣ+3x)′=2e²ˣ+3，代 x=0 得 (2+3)/1=5。",
            "4": "注意对 e²ˣ 求导要乘内层 2，2+3=5 不是 1+3=4。",
            "3": "别忘了第一项 (e²ˣ)′ 在 x=0 处等于 2。",
          },
          prerequisite: "[ln(u)]′=u′/u，其中 u′=2e²ˣ+3。",
        },
      },
      {
        id: "jc935-3-2-1-14-2",
        goal: "第二步：千万别忘了最后一步——把 L=5 还原回 e^L",
        plain: "刚才算出的 5 是「取过对数之后」的极限 L，原极限应该写什么？",
        formula: math`\lim_{x\to 0}(e^{2x}+3x)^{1/x}=e^L=e^5`,
        detail: "由指数函数连续性，原极限为 e⁵。",
        check: {
          prompt: "算出对数极限 L=5 后，原幂指函数 (e²ˣ+3x)^(1/x) 的最终极限是？",
          choices: ["e⁵", "5", "ln 5"],
          answer: "e⁵",
          feedback: {
            "e⁵": "对，取对数是为了把指数拉下来算，收尾一定要放回 e 的指数上！",
            "5": "5 是 ln y 的极限，不是原函数 y 的极限。",
            "ln 5": "还原是取指数 e^L，不是再取一次对数。",
          },
          prerequisite: "若 ln y → L，则 y = e^{ln y} → e^L。",
        },
      },
      {
        id: "jc935-3-2-1-14-3",
        goal: "第三步：完成一道同型 1^∞ 指数极限迁移题",
        plain: "再算一道换系数题的指数部分 L。",
        formula: math`e^5`,
        detail: "完成。",
        transfer: {
          prompt: "迁移练习：若 lim_{x→0} (e³ˣ+4x)^(1/x) = e^L，求出指数 L 的值。",
          answer: 7,
          signFeedback: "对 ln(e³ˣ+4x)/x 用洛必达，代 x=0 算 3+4。",
          remediation: "L = lim (3e³ˣ+4)/(e³ˣ+4x)=3+4=7。",
          solution: math`L=\lim_{x\to 0}\frac{3e^{3x}+4}{e^{3x}+4x}=7`,
        },
      },
    ]),
  },

  "jc935-3-2-1-15": {
    target: "掌握 0⁰ 幂指极限：取对数化为 ∞/∞ 型 ln(sin x)/(1/x)，用洛必达算出 L=0 后还原 e⁰=1。",
    prerequisites: [
      "知道 (1/x)′=−1/x²",
      "知道 lim_{x→0⁺} (x/sin x)=1",
    ],
    strategy: "lhopital-zero-to-zero",
    solution: math`\begin{gathered}L=\lim_{x\to 0^+}\frac{\ln(\sin x)}{1/x}\\[4pt]=-\lim_{x\to 0^+}\frac{x}{\sin x}\cdot x\cos x=0\implies e^0=1\end{gathered}`,
    solutionExplanation: "取对数化成 ln(sin x)/(1/x) 求导得 −(x/sin x)·x cos x→0，故原极限 e⁰=1。",
    steps: buildSteps([
      {
        id: "jc935-3-2-1-15-1",
        goal: "第一步：对 0⁰ 型取对数并把 x 翻到分母，用洛必达求导",
        plain: "把 (sin x)ˣ 写成 e^L，L=lim_{x→0⁺} x ln(sin x)=lim ln(sin x)/(1/x)。对这个 ∞/∞ 型求导并整理。",
        formula: math`\lim_{x\to 0^+}\frac{\cos x/\sin x}{-1/x^2}=-\lim_{x\to 0^+}\frac{x}{\sin x}\cdot x\cos x`,
        detail: "分母 −1/x² 翻到分子变成 −x²，拆一个 x 给 sin x 配对。",
        check: {
          prompt: "对 ln(sin x)/(1/x) 使用洛必达法则并把 −1/x² 翻上去，化简后是？",
          choices: [
            "−(x / sin x) · x cos x",
            "(x / sin x) · x cos x",
            "−cos x / (x² sin x)",
          ],
          answer: "−(x / sin x) · x cos x",
          feedback: {
            "−(x / sin x) · x cos x": "对，−x² 乘到分子上，再拆出一个 x/sin x→1，剩下的 x cos x→0！",
            "(x / sin x) · x cos x": "(1/x)′=−1/x² 自带负号。",
            "−cos x / (x² sin x)": "除以 −1/x² 等于乘以 −x²，x² 应翻到分子上。",
          },
          prerequisite: "(1/x)′=−1/x²，除以 −1/x² 等于乘以 −x²。",
        },
      },
      {
        id: "jc935-3-2-1-15-2",
        goal: "第二步：算出 L=0 并还原 e^L",
        plain: "x→0⁺ 时 x/sin x→1、x cos x→0，算出 L 后别忘还原成 e^L！",
        formula: math`L=-1\cdot 0=0\implies e^L=e^0=1`,
        detail: "e⁰=1，不是 0！",
        check: {
          prompt: "算出指数部分极限 L=0 后，原极限 lim_{x→0⁺} (sin x)ˣ 等于多少？",
          choices: ["1", "0", "e"],
          answer: "1",
          feedback: {
            "1": "对，e⁰=1，这是 0⁰ 型最容易忘还原错写成 0 的地方！",
            "0": "0 是对数极限 L，原极限是 e^L=e⁰=1。",
            "e": "e¹=e，本题 L=0 所以是 e⁰=1。",
          },
          prerequisite: "e⁰=1。",
        },
      },
      {
        id: "jc935-3-2-1-15-3",
        goal: "第三步：完成一道 0⁰ 型迁移题",
        plain: "再算一道 (3x)ˣ 在 x→0⁺ 时的极限。",
        formula: math`1`,
        detail: "完成。",
        transfer: {
          prompt: "迁移练习：求极限 lim_{x→0⁺} (3x)ˣ。",
          answer: 1,
          signFeedback: "先算 L=lim x ln(3x)=lim ln(3x)/(1/x)=lim (−x)=0，再还原 e⁰。",
          remediation: "L=lim (1/x)/(−1/x²)=lim (−x)=0，故原极限为 e⁰=1。",
          solution: math`L=\lim_{x\to 0^+}\frac{\ln(3x)}{1/x}=\lim_{x\to 0^+}(-x)=0\implies e^0=1`,
        },
      },
    ]),
  },

  "jc935-3-2-1-16": {
    target: "掌握 ∞⁰ 幂指极限：取对数后先拆出非零因子 tan(3x)/(3x)→1，再对 ln(2/x)/(1/x) 用洛必达。",
    prerequisites: [
      "知道 lim_{x→0} tan(3x)/(3x)=1",
      "会算 [ln(2/x)]′=−1/x",
    ],
    strategy: "lhopital-inf-to-zero",
    solution: math`\begin{gathered}L=\lim_{x\to 0^+}\frac{\tan(3x)}{3x}\cdot 3\cdot\frac{\ln(2/x)}{1/x}\\[4pt]=1\cdot 3\cdot\lim_{x\to 0^+}x=0\implies e^0=1\end{gathered}`,
    solutionExplanation: "先拆出 tan(3x)/(3x)→1，再对 ln(2/x)/(1/x) 求导得 x→0，还原 e⁰=1。",
    steps: buildSteps([
      {
        id: "jc935-3-2-1-16-1",
        goal: "第一步：对 ∞⁰ 型取对数并拆出极限为 1 的因子",
        plain: "L=lim_{x→0⁺} tan(3x)ln(2/x)。直接对 tan(3x) 求导会很麻烦，先把 tan(3x) 凑成 [tan(3x)/(3x)]·3x，把 x 翻到分母配给 ln(2/x)！",
        formula: math`L=\lim_{x\to 0^+}\frac{\tan(3x)}{3x}\cdot 3\cdot\frac{\ln(2/x)}{1/x}`,
        detail: "tan(3x)/(3x)→1，问题立刻简化成求 ln(2/x)/(1/x)。",
        check: {
          prompt: "对化简后的 ∞/∞ 型 ln(2/x)/(1/x) 使用一次洛必达法则，分子与分母求导之比等于什么？",
          choices: ["(−1/x) / (−1/x²) = x", "(1/x) / (−1/x²) = −x", "(2/x) / (−1/x²) = −2x"],
          answer: "(−1/x) / (−1/x²) = x",
          feedback: {
            "(−1/x) / (−1/x²) = x": "对，ln(2/x)=ln 2−ln x，求导得 −1/x；除以 −1/x² 恰好等于 x→0！",
            "(1/x) / (−1/x²) = −x": "ln(2/x)=ln 2−ln x，对 x 求导带负号是 −1/x。",
            "(2/x) / (−1/x²) = −2x": "常数因子 2 在对数里拆成 ln 2，求导为 0，不会留系数 2。",
          },
          prerequisite: "先拆对数再求导更不容易错：ln(2/x)=ln 2−ln x ⇒ 导数为 −1/x。",
        },
      },
      {
        id: "jc935-3-2-1-16-2",
        goal: "第二步：算出 L=0 并还原 e^L",
        plain: "三段相乘得 L=1×3×0=0，最后一步放回 e 的指数上。",
        formula: math`L=1\cdot 3\cdot 0=0\implies e^0=1`,
        detail: "原极限为 e⁰=1。",
        check: {
          prompt: "求得 L=0 后，lim_{x→0⁺} (2/x)^(tan 3x) 的最终答案是？",
          choices: ["1", "0", "2"],
          answer: "1",
          feedback: {
            "1": "对，e⁰=1。",
            "0": "0 是对数极限 L，还原后是 e⁰=1。",
            "2": "常数 2 在对数求导时已消失，最终是 e⁰=1。",
          },
          prerequisite: "若 ln y→0，则 y→e⁰=1。",
        },
      },
      {
        id: "jc935-3-2-1-16-3",
        goal: "第三步：完成一道 ∞⁰ 型迁移题",
        plain: "记住：幂指型只要先拆出非零因子，计算量就能减半。",
        formula: math`1`,
        detail: "完成。",
        transfer: {
          prompt: "迁移练习：求极限 lim_{x→0⁺} (5/x)^(2x)。",
          answer: 1,
          signFeedback: "先算 L=2·lim ln(5/x)/(1/x)=2·lim x=0，再还原 e⁰。",
          remediation: "L=2·lim (−1/x)/(−1/x²)=2·0=0，故原极限为 e⁰=1。",
          solution: math`L=2\lim_{x\to 0^+}\frac{\ln(5/x)}{1/x}=2\lim_{x\to 0^+}x=0\implies e^0=1`,
        },
      },
    ]),
  },

  "jc935-3-2-2": {
    target: "识别洛必达法则失效的典型情形（导数比振荡无极限），并会果断改用拆项法求出真实极限。",
    prerequisites: [
      "知道洛必达失效不等于原极限不存在",
      "会用无穷小乘有界函数求 (cos x)/x→0",
    ],
    strategy: "lhopital-failure-oscillation",
    solution: math`\begin{gathered}\text{导数比 }2+\sin x\text{ 振荡无极限（洛必达失效）}\\[4pt]\lim_{x\to\infty}\left(2-\frac{\cos x}{x}\right)=2\end{gathered}`,
    solutionExplanation: "导数比 2+sin x 振荡故不能用洛必达；改拆成 2−(cos x)/x 直接得极限 2。",
    steps: buildSteps([
      {
        id: "jc935-3-2-2-1",
        goal: "第一步：对分子分母求导，亲眼看出为什么洛必达失效",
        plain: "先试着算一下 (2x−cos x)′ / x′，看看 x→∞ 时这个导数比有没有极限。",
        formula: math`\frac{(2x-\cos x)'}{x'}=2+\sin x\quad(\text{振荡无极限})`,
        detail: "sin x 在 [−1, 1] 周期振荡，2+sin x 极限不存在，因此不能套用洛必达法则。",
        check: {
          prompt: "对 (2x−cos x)/x 强行分子分母求导，得到的导数比是什么？",
          choices: ["2 + sin x（x→∞ 时振荡无极限）", "2 − sin x（x→∞ 时趋于 2）", "2（直接得出极限 2）"],
          answer: "2 + sin x（x→∞ 时振荡无极限）",
          feedback: {
            "2 + sin x（x→∞ 时振荡无极限）": "对，导数比极限不存在，只能说明洛必达失效，必须换方法，不能断定原极限不存在！",
            "2 − sin x（x→∞ 时趋于 2）": "−(cos x)′=+sin x，且 sin x 在无穷远处不趋于 0。",
            "2（直接得出极限 2）": "不能把 −cos x 的导数丢掉。",
          },
          prerequisite: "洛必达法则要求导数比极限存在（或为 ∞），振荡时法则不适用。",
        },
      },
      {
        id: "jc935-3-2-2-2",
        goal: "第二步：改用拆项法，用「有界乘无穷小」求真实极限",
        plain: "把 (2x−cos x)/x 拆成两项相减，直接取 x→∞ 的极限。",
        formula: math`\lim_{x\to\infty}\left(2-\frac{\cos x}{x}\right)=2-0=2`,
        detail: "|cos x|≤1 有界，1/x→0，乘积趋于 0，故原极限为 2。",
        check: {
          prompt: "改把原式拆成 2 − (cos x)/x 后，当 x→∞ 时 (cos x)/x 的极限是多少？",
          choices: ["0（有界函数乘无穷小）", "1", "不存在"],
          answer: "0（有界函数乘无穷小）",
          feedback: {
            "0（有界函数乘无穷小）": "对，|cos x|≤1 且 1/x→0，故 (cos x)/x→0，原极限稳稳等于 2。",
            "1": "分子在 [−1, 1] 内摆动，分母趋于 ∞，商趋于 0 不是 1。",
            "不存在": "虽然 cos x 振荡，但被趋于 0 的 1/x 压死了，乘积极限存在且为 0。",
          },
          prerequisite: "有界函数 × 无穷小 = 无穷小。",
        },
      },
      {
        id: "jc935-3-2-2-3",
        goal: "第三步：完成一道同类拆项迁移题",
        plain: "以后见到 ∞/∞ 里夹着 sin x 或 cos x，优先拆项，别急着用洛必达！",
        formula: math`2`,
        detail: "完成。",
        transfer: {
          prompt: "迁移练习：直接用拆项法求极限 lim_{x→∞} (5x+sin x)/x。",
          answer: 5,
          signFeedback: "拆成 5 + (sin x)/x，利用 (sin x)/x→0。",
          remediation: "原式 = lim [5+(sin x)/x]=5+0=5。",
          solution: math`\lim_{x\to\infty}\left(5+\frac{\sin x}{x}\right)=5`,
        },
      },
    ]),
  },

  "jc935-3-2-3": {
    target: "识别原点高频振荡 sin(1/x) 导致的洛必达失效，并会拆出 (x/tan x)·[x cos(1/x)] 求解。",
    prerequisites: [
      "会用乘积与链式法则求 [x²cos(1/x)]′",
      "熟记 lim_{x→0} (x/tan x)=1",
    ],
    strategy: "lhopital-failure-origin-oscillation",
    solution: math`\begin{gathered}\text{导数比含 }\sin(1/x)\text{ 振荡无极限（洛必达失效）}\\[4pt]\lim_{x\to 0}\frac{x}{\tan x}\cdot x\cos\frac{1}{x}=1\cdot 0=0\end{gathered}`,
    solutionExplanation: "分子求导后冒出高频振荡项 sin(1/x) 使洛必达失效；改拆成 (x/tan x)·x cos(1/x) 得 0。",
    steps: buildSteps([
      {
        id: "jc935-3-2-3-1",
        goal: "第一步：对分子 x²cos(1/x) 求导，看出高频振荡项",
        plain: "用乘积法则和链式法则对分子 x²cos(1/x) 求导，看看为什么会冒出一个在 x→0 时剧烈振荡的项。",
        formula: math`\left(x^2\cos\frac{1}{x}\right)'=2x\cos\frac{1}{x}+\sin\frac{1}{x}`,
        detail: "x²·[−sin(1/x)·(−1/x²)]=+sin(1/x)，它在 x→0 时振荡无极限，导致洛必达失效。",
        check: {
          prompt: "对分子 x²cos(1/x) 求导后，哪一项在 x→0 时剧烈振荡导致洛必达法则失效？",
          choices: ["sin(1/x)", "2x cos(1/x)", "sec²x"],
          answer: "sin(1/x)",
          feedback: {
            "sin(1/x)": "对，x² 与 −1/x² 抵消后留下了无衰减的 sin(1/x)，在 [−1, 1] 剧烈振荡，洛必达失效！",
            "2x cos(1/x)": "这一项前面乘着 x，x→0 时它乖乖趋于 0。",
            "sec²x": "分母导数 sec²x 在 x→0 时趋于 1，没有振荡。",
          },
          prerequisite: "[cos(1/x)]′=−sin(1/x)·(−1/x²)=sin(1/x)/x²。",
        },
      },
      {
        id: "jc935-3-2-3-2",
        goal: "第二步：拆出 (x/tan x)·[x cos(1/x)] 直接求极限",
        plain: "放弃洛必达，把分子的 x² 拆一个 x 给分母 tan x，再分别取极限相乘。",
        formula: math`\lim_{x\to 0}\frac{x}{\tan x}\cdot x\cos\frac{1}{x}=1\cdot 0=0`,
        detail: "x/tan x→1，x cos(1/x)→0，乘积为 0。",
        check: {
          prompt: "把原式拆成 (x/tan x)·[x cos(1/x)] 后，两段在 x→0 时的极限分别是多少？",
          choices: ["1 和 0（乘积为 0）", "0 和 0", "1 和不存在"],
          answer: "1 和 0（乘积为 0）",
          feedback: {
            "1 和 0（乘积为 0）": "对，x/tan x→1 且无穷小 x 乘有界 cos(1/x) 趋于 0，乘积为 0！",
            "0 和 0": "x/tan x 在 x→0 时的极限是 1 不是 0。",
            "1 和不存在": "cos(1/x) 虽然振荡，但乘上 x→0 后被压成 0。",
          },
          prerequisite: "lim_{x→0} (tan x/x)=1 ⇒ lim_{x→0} (x/tan x)=1。",
        },
      },
      {
        id: "jc935-3-2-3-3",
        goal: "第三步：完成一道原点振荡拆项迁移题",
        plain: "记住：洛必达失效时，优先把分母凑成重要极限再配无穷小乘有界。",
        formula: math`0`,
        detail: "完成。",
        transfer: {
          prompt: "迁移练习：直接用拆项法求极限 lim_{x→0} [3x + x²sin(1/x)]/x。",
          answer: 3,
          signFeedback: "拆成 3 + x sin(1/x)，利用 x sin(1/x)→0。",
          remediation: "原式 = lim [3+x sin(1/x)]=3+0=3。",
          solution: math`\lim_{x\to 0}\left(3+x\sin\frac{1}{x}\right)=3`,
        },
      },
    ]),
  },

  "jc935-3-2-4": {
    target: "综合运用「双层幂指取对数 + 洛必达法则 + 左右极限对比」判定分段函数在 x=0 处的连续性。",
    prerequisites: [
      "会化简 ln([(1+2x)^(1/x)/e²]^(1/x))=[ln(1+2x)−2x]/x²",
      "知道连续需满足左极限=右极限=函数值",
    ],
    strategy: "lhopital-piecewise-continuity",
    solution: math`\begin{gathered}L=\lim_{x\to 0^+}\frac{\ln(1+2x)-2x}{x^2}=-2\\[4pt]\lim_{x\to 0^+}f(x)=e^{-2}=\lim_{x\to 0^-}f(x)=f(0)\text{（连续）}\end{gathered}`,
    solutionExplanation: "右极限取对数得 [ln(1+2x)−2x]/x²，洛必达算得 −2，故右极限 e⁻²=左极限=f(0)，连续。",
    steps: buildSteps([
      {
        id: "jc935-3-2-4-1",
        goal: "第一步：对右分支双层幂指取对数，化简成单个 0/0 型分式",
        plain: "左极限和 f(0) 直接读出都是 e⁻²。对右分支 [(1+2x)^(1/x)/e²]^(1/x) 取自然对数，把两层指数全部拉下来通分。",
        formula: math`\frac{1}{x}\left(\frac{1}{x}\ln(1+2x)-2\right)=\frac{\ln(1+2x)-2x}{x^2}`,
        detail: "ln(A/e²)=ln A−2，通分后正好变成 0/0 型 [ln(1+2x)−2x]/x²。",
        check: {
          prompt: "对右分支 [(1+2x)^(1/x)/e²]^(1/x) 取对数并通分后，得到的 0/0 型分式是？",
          choices: [
            "[ln(1+2x) − 2x] / x²",
            "[ln(1+2x) − 2] / x²",
            "[ln(1+2x) − 2x] / x",
          ],
          answer: "[ln(1+2x) − 2x] / x²",
          feedback: {
            "[ln(1+2x) − 2x] / x²": "对，(1/x)[(1/x)ln(1+2x)−2]=[ln(1+2x)−2x]/x²，正好适合洛必达！",
            "[ln(1+2x) − 2] / x²": "把 −2 通分成 −2x/x 时别忘了乘上 x。",
            "[ln(1+2x) − 2x] / x": "外层和内层各有一个 1/x，相乘分母是 x²。",
          },
          prerequisite: "ln(e²)=2，再把 (1/x)ln(1+2x)−2 通分成 [ln(1+2x)−2x]/x，再乘外层 1/x。",
        },
      },
      {
        id: "jc935-3-2-4-2",
        goal: "第二步：对 [ln(1+2x)−2x]/x² 用洛必达求导，化简算出 L",
        plain: "分子分母分别求导，把分子通分约去 2x，直接代 x=0 算出 L，再还原回 e^L 与 f(0)=e⁻² 对比。",
        formula: math`L=\lim_{x\to 0^+}\frac{2/(1+2x)-2}{2x}=\lim_{x\to 0^+}\frac{-2}{1+2x}=-2`,
        detail: "2/(1+2x)−2=−4x/(1+2x)，除以 2x 得 −2/(1+2x)→−2，故右极限为 e⁻²=f(0)，连续！",
        check: {
          prompt: "分子导数 2/(1+2x)−2 通分后再除以分母导数 2x，化简结果及极限 L 是？",
          choices: ["−2/(1+2x)，极限 L = −2", "2/(1+2x)，极限 L = 2", "−4/(1+2x)，极限 L = −4"],
          answer: "−2/(1+2x)，极限 L = −2",
          feedback: {
            "−2/(1+2x)，极限 L = −2": "对，右极限还原为 e⁻²，与左极限和 f(0)=e⁻² 相等，所以在 x=0 处连续！",
            "2/(1+2x)，极限 L = 2": "2−2(1+2x)=−4x，分子带负号。",
            "−4/(1+2x)，极限 L = −4": "别忘了除以分母导数 2x（−4x 除以 2x 得 −2）。",
          },
          prerequisite: "2/(1+2x)−2=[2−2(1+2x)]/(1+2x)=−4x/(1+2x)。",
        },
      },
      {
        id: "jc935-3-2-4-3",
        goal: "第三步：完成一道同型对数差商迁移题",
        plain: "记住常见结构：[ln(1+kx)−kx]/x² 在 x→0 时极限为 −k²/2。",
        formula: math`\lim_{x\to 0^+}f(x)=e^{-2}=f(0)`,
        detail: "在 x=0 处连续。",
        transfer: {
          prompt: "迁移练习：求极限 lim_{x→0⁺} [ln(1+4x)−4x]/x²。",
          answer: -8,
          signFeedback: "一次洛必达得 [4/(1+4x)−4]/(2x)=−8/(1+4x)，注意负号。",
          remediation: "分子通分得 −16x/(1+4x)，除以 2x 得 −8/(1+4x)→−8。",
          solution: math`\lim_{x\to 0^+}\frac{4/(1+4x)-4}{2x}=\lim_{x\to 0^+}\frac{-8}{1+4x}=-8`,
        },
      },
    ]),
  },
};

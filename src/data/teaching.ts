import { chapterOnePilotTeaching } from "./teachingChapterOne";
import { chapterOneProductionTeaching } from "./teachingProduction";
import { chapterOneFunctionsContinuityTeaching } from "./eli5Drafts/ch01FunctionsContinuity";
import { chapterOneLimitsTeaching } from "./eli5Drafts/ch01Limits";
import { chapterTwoAdvancedTeaching } from "./eli5Drafts/ch02Advanced";
import { chapterTwoDerivativeDefinitionsTeaching } from "./eli5Drafts/ch02DerivativeDefinitions";
import { chapterTwoDifferentialTeaching } from "./eli5Drafts/ch02Differential";
import { chapterTwoRulesTeaching } from "./eli5Drafts/ch02Rules";

const math = String.raw;

export interface TeachingProgress {
  stepsSeen: number;
  checksPassed: number;
  checksSkipped: number;
  wrongChecks: number;
  transfer?: { firstResult: "correct" | "incorrect" | "skipped"; resolved: boolean };
}

export const initialTeachingProgress: TeachingProgress = {
  stepsSeen: 1, checksPassed: 0, checksSkipped: 0, wrongChecks: 0,
};

export interface TeachingCheck {
  prompt: string;
  choices: string[];
  correct: number;
  feedback: string[];
  prerequisite: string;
}

export interface TeachingTransfer {
  prompt: string;
  promptFormula?: string;
  answer: number;
  signFeedback: string;
  remediation: string;
  solution?: string;
}

export interface TeachingStep {
  id: string;
  goal: string;
  formula: string;
  plain: string;
  detail: string;
  check?: TeachingCheck;
  transfer?: TeachingTransfer;
}

export interface TeachingLesson {
  steps: TeachingStep[];
  solution: string;
  solutionExplanation?: string;
  solutionSteps?: readonly string[];
  target?: string;
  prerequisites?: string[];
  strategy?: string;
  referenceAnswer?: number;
}

export const expandedTeaching: Readonly<Record<string, TeachingLesson>> = {
  ...chapterOneFunctionsContinuityTeaching,
  ...chapterOneLimitsTeaching,
  ...chapterTwoDerivativeDefinitionsTeaching,
  ...chapterTwoAdvancedTeaching,
  ...chapterTwoDifferentialTeaching,
  ...chapterTwoRulesTeaching,
};

export const teachingByProblem: Partial<Record<string, TeachingLesson>> = {
  ...expandedTeaching,
  ...chapterOneProductionTeaching,
  ...chapterOnePilotTeaching,
  p8: {
    solution: math`\begin{gathered}
      \frac{2}{x}=\frac{1}{-3x}\cdot(-6)\\[4pt]
      \lim_{x\to0}\big[(1-3x)^{1/(-3x)}\big]^{-6}
      =e^{-6}\\[4pt]k=-6
    \end{gathered}`,
    steps: [
      {
        id: "match-base",
        goal: "找出底数里趋近于零的那一小块",
        formula: math`1-3x=1+(-3x)`,
        plain: "我们想认出一个熟悉的极限。先把这题的底数看成「1 加上一小块」，以后才能让上面的指数和这一小块配对。",
        detail: "第二个重要极限说：如果一小块趋近 0，那么用「1 加上这一小块」做底数、用它的倒数做指数，整个幂就趋近 e。",
        check: {
          prompt: "为了认出底数里的「1 加上一小块」，哪一块要配到指数的分母里？",
          choices: ["−3x", "x", "1−3x"],
          correct: 0,
          feedback: ["找对了，底数是在 1 上加 −3x。", "x 确实趋近零，再看看底数里它有没有乘上别的数。", "1−3x 是整个底数。先拿走开头的 1，再看看剩下什么。"],
          prerequisite: "先试个小数：1−0.03 可以写成 1+(−0.03)。要找的是括号里的部分。",
        },
      },
      {
        id: "match-exponent",
        goal: "在指数里配出刚才那一小块的倒数",
        formula: math`\frac{2}{x}=\frac{1}{-3x}\cdot(-6)`,
        plain: "上一步找到了底数里跟在 1 后面的那一块。我们要让它出现在指数的分母里，同时让这个分数保持原来的大小和正负。",
        detail: "分母从 x 变成 −3x，分子也要乘同一个 −3。原来分子是 2，所以现在是 −6。",
        check: {
          prompt: "把 2/x 的分母换成 −3x，哪个分子能保持分数的值不变？",
          choices: ["6", "−3", "−6"],
          correct: 2,
          feedback: ["大小对了。分母乘的是负数，分子也要乘负数。", "−3 是要乘的数。别忘了原来的分子还有一个 2。", "对，分子和分母同时乘 −3。"],
          prerequisite: "把 2/5 写成分母为 −15 的分数。5 乘 −3 才得到 −15，2 也需要乘 −3。",
        },
        transfer: {
          prompt: "换个数字试试。把 4/x 写成 1/(−2x) 乘以一个数。填入要乘的数。",
          answer: -8,
          signFeedback: "大小对了。新的分母换了正负号，分子也要跟着换号。",
          remediation: "先试更小的例子：3/5 的分母如果写成 −10，分子也要乘 −2，所以变成 −6。现在回到迁移题，把同一个方法用在它的分子上。",
        },
      },
      {
        id: "group-power",
        goal: "把能独立求极限的部分放进括号",
        formula: math`(1-3x)^{2/x}=\big[(1-3x)^{1/(-3x)}\big]^{-6}`,
        plain: "我们已经配好熟悉的形状。把它圈进括号，是为了可以先算括号里的结果，再处理括号外面的那一层。",
        detail: "这里用的是幂的乘方：先做一次乘方，再做一次乘方，指数相乘。x 靠近 0 时原底数为正，这个写法适用。",
        check: {
          prompt: "把一个幂再取一次幂，两层的指数怎样合成原来的指数？",
          choices: ["内外指数相乘", "内外指数相加", "只保留外面的指数"],
          correct: 0,
          feedback: ["对。内外指数相乘，仍等于原来的 2/x。", "相加适用于两个同底数的幂相乘。这里是把一个幂整体再做一次乘方。", "括号里已有一个指数，外面的操作还要作用在整个括号上。"],
          prerequisite: "例如先把 2 平方，再把结果立方，等于 2 的六次方。外面的 3 参与的是指数相乘。",
        },
      },
      {
        id: "read-result",
        goal: "把括号换成它趋近的值，再读出指数",
        formula: math`\lim_{x\to0}\big[(1-3x)^{1/(-3x)}\big]^{-6}=e^{-6}`,
        plain: "括号趋近一个固定的正数。我们可以先把括号换成那个数，再看题目要取的是哪一部分。",
        detail: "括号极限 e 是正数，取 −6 次幂在 e 附近连续，所以可以先取括号里面的极限，再取外面的幂。",
        check: {
          prompt: "假如另一题的极限是 e 的 5 次方，问的也是 e 上面的 k。应当填什么？",
          choices: ["e 的 5 次方", "5", "e"],
          correct: 1,
          feedback: ["这是整个极限值。题目只问右上角的指数。", "对，填右上角的 5。再用同一方法读原题的结果。", "e 是底数。题目要的是它右上角的数。"],
          prerequisite: "在 10³ 中，3 叫指数，10³ 是整个幂。用同一个办法，把例题里的底数和右上角的数分开。",
        },
      },
    ],
  },
};

export function p8Diagnostic(value: number) {
  if (value === 6) return "有可能是配分母时漏了负号。用下面的小题检查。";
  if (value === -3) return "有可能漏乘了原来的分子 2。用下面的小题检查。";
  return "先用下面的小题检查配分母，再把同一个方法用到原来的指数。";
}


export function teachingEvidence(attempts: readonly {
  problemId: string; correct: boolean; hints: number; at: string;
}[], problemId: string) {
  const matching = attempts.filter((attempt) => attempt.problemId === problemId);
  const latest = matching.at(-1);
  if (!latest) return "未尝试";
  if (!latest.correct) return "待复习";
  if (latest.hints > 0) return "提示辅助完成";
  const previous = matching.slice(0, -1).reverse().find((attempt) => attempt.correct && attempt.hints === 0);
  if (previous && Date.parse(latest.at) - Date.parse(previous.at) >= 86400000) return "延迟复习成功";
  return "独立完成";
}

const math = String.raw;

export interface TeachingProgress {
  stepsSeen: number;
  checksPassed: number;
  checksSkipped: number;
  wrongChecks: number;
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

export interface TeachingStep {
  id: string;
  goal: string;
  formula: string;
  plain: string;
  detail: string;
  check?: TeachingCheck;
}

export interface TeachingLesson {
  steps: TeachingStep[];
  solution: string;
}

export const teachingByProblem: Partial<Record<string, TeachingLesson>> = {
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
        plain: "我们想认出一个熟悉的极限。它的底数是 1 加上一小块，这里那一小块就是 −3x。",
        detail: "第二个重要极限说：如果一小块趋近 0，那么用「1 加上这一小块」做底数、用它的倒数做指数，整个幂就趋近 e。",
        check: {
          prompt: "为了认出底数里的「1 加上一小块」，哪一块要配到指数的分母里？",
          choices: ["−3x", "x", "1−3x"],
          correct: 0,
          feedback: ["找对了，底数是在 1 上加 −3x。", "x 确实趋近零。再看底数里，跟在 1 后面的是整个 −3x。", "1−3x 是整个底数。先拿走开头的 1，再看看剩下什么。"],
          prerequisite: "先试个小数：1−0.03 可以写成 1+(−0.03)。要找的是括号里的部分。",
        },
      },
      {
        id: "match-exponent",
        goal: "在指数里配出刚才那一小块的倒数",
        formula: math`\frac{2}{x}=\frac{1}{-3x}\cdot(-6)`,
        plain: "把指数中的一部分写成 1/(−3x)，就配齐了熟悉的极限。旁边乘以 −6，是为了让整个指数仍等于原来的 2/x。",
        detail: "分母从 x 变成 −3x，分子也要乘同一个 −3。原来分子是 2，所以现在是 −6。",
        check: {
          prompt: "把 2/x 的分母换成 −3x，哪个分子能保持分数的值不变？",
          choices: ["6", "−3", "−6"],
          correct: 2,
          feedback: ["大小对了。分母乘的是负数，分子也要乘负数。", "−3 是要乘的数。别忘了原来的分子还有一个 2。", "对，分子和分母同时乘 −3。"],
          prerequisite: "把 2/5 写成分母为 −15 的分数。5 乘 −3 才得到 −15，2 也需要乘 −3。",
        },
      },
      {
        id: "group-power",
        goal: "把能独立求极限的部分放进括号",
        formula: math`(1-3x)^{2/x}=\big[(1-3x)^{1/(-3x)}\big]^{-6}`,
        plain: "先把底数和刚配好的指数放在一起。剩下的 −6 放在括号外，让括号里的那一块可以单独求极限。",
        detail: "这里用的是幂的乘方：先做一次乘方，再做一次乘方，指数相乘。x 靠近 0 时原底数为正，这个写法适用。",
        check: {
          prompt: "括号外的 −6 从哪里来？",
          choices: ["它是原来指数配凑后剩下的乘数", "把底数的 −3 直接搬到了外面", "求极限时要自动加上负号"],
          correct: 0,
          feedback: ["对。内外指数相乘，仍等于原来的 2/x。", "底数没有搬动。看上一步，指数拆成了哪两个相乘的数？", "这里没有额外加负号。负号来自分子乘 −3。"],
          prerequisite: "例如先把 2 平方，再把结果立方，等于 2 的六次方。外面的 3 参与的是指数相乘。",
        },
      },
      {
        id: "read-result",
        goal: "把括号换成它趋近的值，再读出指数",
        formula: math`\lim_{x\to0}\big[(1-3x)^{1/(-3x)}\big]^{-6}=e^{-6}`,
        plain: "括号里配好的那一块趋近 e，外面的 −6 还是原来的常数。题目要的是 e 上面的数。",
        detail: "括号极限 e 是正数，取 −6 次幂在 e 附近连续，所以可以先取括号里面的极限，再取外面的幂。",
        check: {
          prompt: "既然结果是 e 的 −6 次方，题目中的 k 是什么？",
          choices: ["e 的 −6 次方", "−6", "6"],
          correct: 1,
          feedback: ["这是整个极限值。题目只问右上角的指数。", "对，指数 k=−6。", "指数是 −6。−6 次幂表示取倒数，负号依然是指数的一部分。"],
          prerequisite: "在 10³ 中，3 叫指数，10³ 是整个幂。对照 e 的 −6 次方，再找它的指数。",
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

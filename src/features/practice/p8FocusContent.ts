
import { p8Diagnostic } from "../../data/teaching";
import type { FocusedPracticeContent } from "./FocusedPractice";

const retrySign = "先看 5 要乘哪个数才会变成 −15，再让分子乘同一个数。";

export const p8FocusContent: FocusedPracticeContent = {
  contextLabel: "第一章 · 重要极限",
  solutionIntro: "先在指数里配出底数中那一小项的倒数，再用第二个重要极限求括号里的值。",
  stepPresentation: {
    "match-base": { plain: "先看底数里的 1。跟在它后面的那一项，等会儿要和指数配成一对。" },
    "match-exponent": { plain: "把那一项放进指数的分母。分子也要跟着变，分数的值才不变。" },
    "group-power": {
      plain: "这里有内外两层乘方。字母表示任意底数和指数，先看两层指数各在哪里。",
      referenceFormula: "[a^m]^n",
    },
    "read-result": { plain: "先求括号里的极限，再看结果中哪个部分对应原题里的 k。" },
  },
  diagnostic: {
    describe: p8Diagnostic,
    prompt: "把 2/5 的分母改成 −15，分子是哪一个？",
    choices: [
      { label: "-6", feedback: "对。分子分母都乘 −3。" },
      { label: "6", feedback: retrySign },
      { label: "-3", feedback: retrySign },
    ],
  },
};

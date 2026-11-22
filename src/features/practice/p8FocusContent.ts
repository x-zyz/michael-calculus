
import { p8Diagnostic } from "../../data/teaching";
import type { FocusedPracticeContent } from "./FocusedPractice";

const retrySign = "先看 5 要乘哪个数才会变成 −15，再让分子乘同一个数。";

export const p8FocusContent: FocusedPracticeContent = {
  contextLabel: "第一章 · 重要极限",
  solutionIntro: "先在指数里配出底数中那一小项的倒数，再用第二个重要极限求括号里的值。",
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

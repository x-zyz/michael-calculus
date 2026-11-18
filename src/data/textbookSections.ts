import type { ChapterId } from "./learning";

interface TextbookSection {
  number: string;
  title: string;
  lessons: readonly string[];
  optional?: boolean;
}

// Keep this order aligned with docs/textbook-curriculum.md.
export const textbookSections: Record<ChapterId, readonly TextbookSection[]> = {
  1: [
    { number: "1.1", title: "函数", lessons: ["functions"] },
    { number: "1.2", title: "极限", lessons: ["limit"] },
    { number: "1.3", title: "极限的运算法则", lessons: ["limit-laws"] },
    { number: "1.4", title: "极限存在准则及两个重要极限", lessons: ["limit-criteria", "sine", "euler"] },
    { number: "1.5", title: "无穷小的比较", lessons: ["infinitesimal"] },
    { number: "1.6", title: "函数的连续性", lessons: ["continuity"] },
  ],
  2: [
    { number: "2.1", title: "导数的概念", lessons: ["derivative"] },
    { number: "2.2", title: "导数的基本公式与运算法则", lessons: ["rules", "chain"] },
    { number: "2.3", title: "高阶导数、隐函数及由参数方程所确定的函数的导数", lessons: ["advanced-derivatives"] },
    { number: "2.4", title: "导数的经济意义", lessons: ["economic-derivatives"] },
    { number: "2.5", title: "函数的微分", lessons: ["differential"] },
  ],
  3: [
    { number: "3.1", title: "微分中值定理", lessons: ["mvt"] },
    { number: "3.2", title: "洛必达法则", lessons: ["lhopital"] },
    { number: "3.3", title: "函数的性态", lessons: ["extrema"] },
    { number: "3.4", title: "函数图形的描绘", lessons: ["curve-sketch"] },
    { number: "3.5", title: "函数的最大值和最小值及其在经济管理中的应用", lessons: ["economic-optimization"] },
  ],
  4: [
    { number: "4.1", title: "不定积分的概念及性质", lessons: ["antiderivative"] },
    { number: "4.2", title: "换元积分法", lessons: ["substitution"] },
    { number: "4.3", title: "分部积分法", lessons: ["integration-by-parts"] },
    { number: "4.4", title: "有理函数的积分", lessons: ["rational-integrals"], optional: true },
  ],
  5: [
    { number: "5.1", title: "定积分的概念与性质", lessons: ["riemann"] },
    { number: "5.2", title: "微积分基本公式", lessons: ["fundamental-theorem"] },
    { number: "5.3", title: "定积分计算", lessons: ["definite-methods"] },
    { number: "5.4", title: "反常积分初步及 Γ 函数", lessons: ["improper-integrals"] },
    { number: "5.5", title: "定积分的应用", lessons: ["integral-area", "integral-volume", "integral-arc", "economic-integrals"] },
  ],
};

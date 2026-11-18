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
  6: [
    { number: "6.1", title: "空间直角坐标系", lessons: ["space-vectors", "vector-products", "planes-lines"] },
    { number: "6.2", title: "空间曲面与空间曲线", lessons: ["space-curves"] },
    { number: "6.3", title: "多元函数的概念及其极限和连续", lessons: ["multivariable-limits"] },
    { number: "6.4", title: "偏导数与全微分", lessons: ["partial-derivatives", "total-differential"] },
    { number: "6.5", title: "方向导数与梯度", lessons: ["directional-gradient"] },
    { number: "6.6", title: "多元复合函数与隐函数的微分法", lessons: ["multivariable-chain"] },
    { number: "6.7", title: "多元函数的极值及其求法", lessons: ["multivariable-extrema", "constrained-extrema"] },
    { number: "6.8", title: "多元函数微分学在经济学中的应用", lessons: ["multivariable-economics"] },
    { number: "6.9", title: "直角坐标系下二重积分的计算", lessons: ["double-integrals"] },
    { number: "6.10", title: "二重积分的变量代换法", lessons: ["polar-integrals", "double-integral-substitution", "improper-double-integrals"] },
  ],
  7: [
    { number: "7.1", title: "常数项级数的概念和性质", lessons: ["series-basics"] },
    { number: "7.2", title: "正项级数的审敛法", lessons: ["positive-series-comparison", "series-ratio-root"] },
    { number: "7.3", title: "交错级数和任意项级数的审敛法", lessons: ["alternating-series"] },
    { number: "7.4", title: "幂级数", lessons: ["power-series-convergence", "power-series-operations"] },
    { number: "7.5", title: "函数展开成幂级数", lessons: ["taylor-series"] },
    { number: "7.6", title: "幂级数的简单应用", lessons: ["power-series-approximation"], optional: true },
  ],
  8: [
    { number: "8.1", title: "微分方程的基本概念", lessons: ["ode-basics"] },
    { number: "8.2", title: "一阶微分方程", lessons: ["separable-odes", "homogeneous-first-order", "linear-first-order", "bernoulli-ode"] },
    { number: "8.3", title: "可降阶的高阶微分方程", lessons: ["ode-order-reduction"] },
    { number: "8.4", title: "二阶常系数线性微分方程", lessons: ["homogeneous-second-order", "nonhomogeneous-second-order"] },
    { number: "8.5", title: "微分方程在经济管理中的应用", lessons: ["growth-models", "rate-and-pollution-models"] },
    { number: "8.6", title: "差分方程简介", lessons: ["first-order-differences", "second-order-differences"] },
    { number: "8.7", title: "差分方程在经济分析中的简单应用", lessons: ["economic-differences"] },
  ],
};

export const firstLessonId = textbookSections[1][0].lessons[0];

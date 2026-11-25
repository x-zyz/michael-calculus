import type { GuidedHint } from "../learning";

const math = String.raw;

/**
 * 第三章 3.2 洛必达法则全量逐步提示（23 题）：
 * 核心/拓展/书主题 4 题（p21, p22, p135, p182）+ 上册习题 3-2 全部 19 题（jc935-3-2-1-1 至 1-16，及 3-2-2 至 3-2-4）。
 */
export const ch3Sec2GuidedHints: Record<string, GuidedHint[]> = {
  p21: [
    {
      change: "先代入 x=0 确认 0/0 型未定式",
      text: "x→0 时分子 eˣ−1−x→1−1−0=0，分母 x²→0，满足 0/0 型，可用洛必达法则。",
      formula: math`\lim_{x\to 0}\frac{e^x-1-x}{x^2}\quad\left(\frac{0}{0}\right)`,
    },
    {
      change: "第一次分子分母分别求导",
      text: "分子求导得 eˣ−1，分母求导得 2x。代入 x=0 仍是 0/0 型，不能直接代入。",
      formula: math`\lim_{x\to 0}\frac{e^x-1}{2x}\quad\left(\frac{0}{0}\right)`,
    },
    {
      change: "第二次求导并代入 x=0",
      text: "分子分母再各求一次导，得 eˣ/2，此时分母为常数 2，直接代入 x=0 即可算出极限。",
      formula: math`\lim_{x\to 0}\frac{e^x}{2}=\frac{1}{2}=\;?`,
    },
  ],

  p22: [
    {
      change: "确认 0/0 型并第一次分子分母分别求导",
      text: "x→0 时 x−sin x→0 且 x³→0，第一次套用洛必达法则，分子求导得 1−cos x，分母求导得 3x²。",
      formula: math`\lim_{x\to 0}\frac{1-\cos x}{3x^2}`,
    },
    {
      change: "继续对 0/0 型第二次求导",
      text: "x→0 时 1−cos x→0 且 3x²→0，再次分别求导得 sin x/(6x)。",
      formula: math`\lim_{x\to 0}\frac{\sin x}{6x}`,
    },
    {
      change: "用重要极限或第三次求导得出结果",
      text: "由 lim (sin x/x)=1（或再求导得 cos x/6），直接算出最终结果。",
      formula: math`\frac{1}{6}\lim_{x\to 0}\frac{\sin x}{x}=\;?`,
    },
  ],

  p135: [
    {
      change: "确认 0/0 型后第一次求导（注意链式法则因子 2）",
      text: "x→0 时 e²ˣ−1−2x→0 且 x²→0。分子求导得 2e²ˣ−2（别漏乘内层导数 2），分母求导得 2x。",
      formula: math`\lim_{x\to 0}\frac{2e^{2x}-2}{2x}=\lim_{x\to 0}\frac{e^{2x}-1}{x}`,
    },
    {
      change: "对仍是 0/0 型的分式第二次求导",
      text: "分子 (e²ˣ−1)′=2e²ˣ，分母 x′=1，此时已不再是未定式。",
      formula: math`\lim_{x\to 0}\frac{2e^{2x}}{1}`,
    },
    {
      change: "直接代入 x=0 算出极限",
      text: "e⁰=1，代入即得最终数值。",
      formula: math`2e^0=\;?`,
    },
  ],

  p182: [
    {
      change: "确认 0/0 型未定式",
      text: "x→0 时分子 e³ˣ−e⁻³ˣ→1−1=0，分母 sin(2x)→0，属 0/0 型。",
      formula: math`\lim_{x\to 0}\frac{e^{3x}-e^{-3x}}{\sin(2x)}\quad\left(\frac{0}{0}\right)`,
    },
    {
      change: "分子分母分别用链式法则求导",
      text: "注意 (−e⁻³ˣ)′=−(−3e⁻³ˣ)=+3e⁻³ˣ，分子求导得 3e³ˣ+3e⁻³ˣ，分母求导得 2cos(2x)。",
      formula: math`\lim_{x\to 0}\frac{3e^{3x}+3e^{-3x}}{2\cos(2x)}`,
    },
    {
      change: "代入 x=0 算出比值",
      text: "x=0 时分子为 3+3=6，分母为 2×1=2，相除即得结果。",
      formula: math`\frac{3+3}{2\cdot 1}=\;?`,
    },
  ],

  "jc935-3-2-1-1": [
    {
      change: "确认 0/0 型未定式",
      text: "x→0 时 ln(1+4x)→ln 1=0 且 2x→0，属 0/0 型。",
      formula: math`\lim_{x\to 0}\frac{\ln(1+4x)}{2x}\quad\left(\frac{0}{0}\right)`,
    },
    {
      change: "分子分母分别求导（别漏乘内层 4）",
      text: "分子 [ln(1+4x)]′=4/(1+4x)，分母 (2x)′=2。",
      formula: math`\lim_{x\to 0}\frac{4/(1+4x)}{2}`,
    },
    {
      change: "代入 x=0 化简",
      text: "x=0 时分母不再为 0，直接代入得 (4/1)/2=2。",
      formula: math`\frac{4}{2(1+0)}=2`,
    },
  ],

  "jc935-3-2-1-2": [
    {
      change: "确认 0/0 型未定式",
      text: "x→0 时 e²ˣ−e⁻³ˣ→1−1=0 且 sin(2x)→0。",
      formula: math`\lim_{x\to 0}\frac{e^{2x}-e^{-3x}}{\sin(2x)}\quad\left(\frac{0}{0}\right)`,
    },
    {
      change: "分别求导，留意负负得正",
      text: "分子求导得 2e²ˣ−(−3e⁻³ˣ)=2e²ˣ+3e⁻³ˣ，分母求导得 2cos(2x)。",
      formula: math`\lim_{x\to 0}\frac{2e^{2x}+3e^{-3x}}{2\cos(2x)}`,
    },
    {
      change: "代入 x=0 得 5/2",
      text: "分子趋于 2+3=5，分母趋于 2×1=2，极限为 5/2。",
      formula: math`\frac{2+3}{2\cdot 1}=\frac{5}{2}`,
    },
  ],

  "jc935-3-2-1-3": [
    {
      change: "第一次套用洛必达法则",
      text: "x→0 时为 0/0 型，分子求导得 sec²x−cos x，分母求导得 1−cos x。",
      formula: math`\lim_{x\to 0}\frac{\sec^2 x-\cos x}{1-\cos x}`,
    },
    {
      change: "化正割为余弦并因式分解约去 1−cos x",
      text: "sec²x−cos x=(1−cos³x)/cos²x=[(1−cos x)(1+cos x+cos²x)]/cos²x，直接约掉公共零因子 1−cos x，比硬求三次导快得多。",
      formula: math`\lim_{x\to 0}\frac{1+\cos x+\cos^2 x}{\cos^2 x}`,
    },
    {
      change: "代入 x=0 算出结果",
      text: "cos 0=1，分子为 1+1+1=3，分母为 1，极限为 3。",
      formula: math`\frac{1+1+1}{1}=3`,
    },
  ],

  "jc935-3-2-1-4": [
    {
      change: "确认 x→π 时为 0/0 型",
      text: "sin(5π)=0 且 tan(4π)=0，满足 0/0 型。",
      formula: math`\lim_{x\to\pi}\frac{\sin(5x)}{\tan(4x)}\quad\left(\frac{0}{0}\right)`,
    },
    {
      change: "分子分母分别用链式法则求导",
      text: "分子求导得 5cos(5x)，分母求导得 4sec²(4x)。",
      formula: math`\lim_{x\to\pi}\frac{5\cos(5x)}{4\sec^2(4x)}`,
    },
    {
      change: "代入 x=π，注意 cos(5π)=−1",
      text: "cos(5π)=−1，cos(4π)=1 ⇒ sec²(4π)=1，故极限为 −5/4。",
      formula: math`\frac{5(-1)}{4\cdot 1}=-\frac{5}{4}`,
    },
  ],

  "jc935-3-2-1-5": [
    {
      change: "确认 0/0 型并第一次求导化简",
      text: "x→π 时 −cos x→1，分子 ln(−cos x)→0，分母 (π−x)²→0。第一次求导得 [sin x/(−cos x)]/[−2(π−x)]=tan x/[2(π−x)]。",
      formula: math`\lim_{x\to\pi}\frac{\sin x/(-\cos x)}{-2(\pi-x)}=\lim_{x\to\pi}\frac{\tan x}{2(\pi-x)}`,
    },
    {
      change: "对仍是 0/0 型的分式第二次求导",
      text: "分子 (tan x)′=sec²x，分母 [2(π−x)]′=−2（别漏负号）。",
      formula: math`\lim_{x\to\pi}\frac{\sec^2 x}{-2}`,
    },
    {
      change: "代入 x=π 得 −1/2",
      text: "因 cos π=−1 ⇒ sec²π=1，极限为 −1/2。",
      formula: math`\frac{1}{-2}=-\frac{1}{2}`,
    },
  ],

  "jc935-3-2-1-6": [
    {
      change: "分清变量 x 与常数 a, m，确认 0/0 型",
      text: "极限变量是 x，aᵃ 与 aᵐ 都是常数。x→a 时分子分母均趋于 0。",
      formula: math`\lim_{x\to a}\frac{a^x-a^a}{x^m-a^m}\quad\left(\frac{0}{0}\right)`,
    },
    {
      change: "对变量 x 分别求导",
      text: "分子 (aˣ−aᵃ)′=aˣ ln a（常数 aᵃ 导数为 0），分母 (xᵐ−aᵐ)′=mxᵐ⁻¹。",
      formula: math`\lim_{x\to a}\frac{a^x\ln a}{mx^{m-1}}`,
    },
    {
      change: "代入 x=a 并合并同底数幂",
      text: "aᵃ/aᵐ⁻¹=aᵃ⁻ᵐ⁺¹，故极限为 (aᵃ⁻ᵐ⁺¹ ln a)/m。",
      formula: math`\frac{a^a\ln a}{ma^{m-1}}=\frac{a^{a-m+1}\ln a}{m}`,
    },
  ],

  "jc935-3-2-1-7": [
    {
      change: "确认 ∞/∞ 型并第一次求导",
      text: "x→0⁺ 时 sin(5x)→0⁺、sin(3x)→0⁺，对数均趋于 −∞。分子分母分别求导得 [5cos(5x)/sin(5x)]/[3cos(3x)/sin(3x)]。",
      formula: math`\lim_{x\to 0^+}\frac{5\cos(5x)/\sin(5x)}{3\cos(3x)/\sin(3x)}`,
    },
    {
      change: "化繁分式为乘积，拆分已知极限因子",
      text: "翻分子分母写成 (5/3)·[sin(3x)/sin(5x)]·[cos(5x)/cos(3x)]，不要盲目继续求导！",
      formula: math`\frac{5}{3}\lim_{x\to 0^+}\frac{\sin(3x)}{\sin(5x)}\cdot\frac{\cos(5x)}{\cos(3x)}`,
    },
    {
      change: "逐项取极限相乘得 1",
      text: "sin(3x)/sin(5x)→3/5，cos(5x)/cos(3x)→1，乘起来 (5/3)×(3/5)×1=1。",
      formula: math`\frac{5}{3}\cdot\frac{3}{5}\cdot 1=1`,
    },
  ],

  "jc935-3-2-1-8": [
    {
      change: "把 ∞/∞ 型正切比翻成 0/0 型余切比",
      text: "直接对 tan 求导会出现 sec² 趋于 ∞ 的循环；利用 tan θ=1/cot θ 改写为 cot(5x)/cot(3x)（0/0 型）。",
      formula: math`\lim_{x\to\frac{\pi}{2}}\frac{\cot(5x)}{\cot(3x)}`,
    },
    {
      change: "分子分母求导并化成正弦平方比",
      text: "由 (cot u)′=−csc²u，求导得 [−5csc²(5x)]/[−3csc²(3x)]=(5/3)·[sin²(3x)/sin²(5x)]。",
      formula: math`\frac{5}{3}\lim_{x\to\frac{\pi}{2}}\frac{\sin^2(3x)}{\sin^2(5x)}`,
    },
    {
      change: "代入 x=π/2 得 5/3",
      text: "sin(3π/2)=−1、sin(5π/2)=1，平方均为 1，故极限为 5/3。",
      formula: math`\frac{5}{3}\cdot\frac{(-1)^2}{1^2}=\frac{5}{3}`,
    },
  ],

  "jc935-3-2-1-9": [
    {
      change: "确认 x→+∞ 时为 0/0 型",
      text: "3/x→0、2/x→0，故 ln(1+3/x)→0、arctan(2/x)→0。",
      formula: math`\lim_{x\to+\infty}\frac{\ln(1+3/x)}{\arctan(2/x)}\quad\left(\frac{0}{0}\right)`,
    },
    {
      change: "用链式法则分别求导并化简分式",
      text: "分子求导得 [1/(1+3/x)]·(−3/x²)=−3/(x²+3x)；分母求导得 [1/(1+4/x²)]·(−2/x²)=−2/(x²+4)。",
      formula: math`\lim_{x\to+\infty}\frac{3(x^2+4)}{2(x^2+3x)}`,
    },
    {
      change: "抓最高次幂 x² 系数得 3/2",
      text: "分子分母同除 x² 后令 x→+∞，得 3/2。",
      formula: math`\lim_{x\to+\infty}\frac{3(1+4/x^2)}{2(1+3/x)}=\frac{3}{2}`,
    },
  ],

  "jc935-3-2-1-10": [
    {
      change: "确认 0/0 型后第一次求导",
      text: "分子求导得 6x/(1+3x²)，分母求导得 2sec(2x)tan(2x)+2sin(2x)。",
      formula: math`\lim_{x\to 0}\frac{6x/(1+3x^2)}{2\sec(2x)\tan(2x)+2\sin(2x)}`,
    },
    {
      change: "提取分母公因子 2sin(2x)，拆出非零极限因子",
      text: "分母改写为 2sin(2x)[1+cos²(2x)]/cos²(2x)，约去 2 并把非零因子先提出。",
      formula: math`\lim_{x\to 0}\frac{3}{1+3x^2}\cdot\frac{x}{\sin(2x)}\cdot\frac{\cos^2(2x)}{1+\cos^2(2x)}`,
    },
    {
      change: "三段极限相乘得 3/4",
      text: "当 x→0 时三段分别趋于 3、1/2、1/2，相乘得 3×(1/2)×(1/2)=3/4。",
      formula: math`3\cdot\frac{1}{2}\cdot\frac{1}{2}=\frac{3}{4}`,
    },
  ],

  "jc935-3-2-1-11": [
    {
      change: "把 0·∞ 型改写为 0/0 型分式",
      text: "x→0 时 e²ˣ−1→0、cot(3x)→∞，利用 cot(3x)=1/tan(3x) 化为 (e²ˣ−1)/tan(3x)。",
      formula: math`\lim_{x\to 0}\frac{e^{2x}-1}{\tan(3x)}\quad\left(\frac{0}{0}\right)`,
    },
    {
      change: "分子分母分别求导",
      text: "分子求导得 2e²ˣ，分母求导得 3sec²(3x)。",
      formula: math`\lim_{x\to 0}\frac{2e^{2x}}{3\sec^2(3x)}`,
    },
    {
      change: "代入 x=0 得 2/3",
      text: "e⁰=1 且 sec²0=1，直接得 2/3。",
      formula: math`\frac{2\cdot 1}{3\cdot 1}=\frac{2}{3}`,
    },
  ],

  "jc935-3-2-1-12": [
    {
      change: "把 0·∞ 型改写为 ∞/∞ 型（把幂函数放到分母）",
      text: "把 x⁴ 写成 1/x⁻⁴ 放分母，比把 e^(1/x²) 放分母更好消去指数。",
      formula: math`\lim_{x\to 0}\frac{e^{1/x^2}}{x^{-4}}\quad\left(\frac{\infty}{\infty}\right)`,
    },
    {
      change: "第一次求导并约简幂次",
      text: "分子导数 e^(1/x²)·(−2/x³)，分母导数 −4/x⁵，约去负号与 1/x³ 得 (1/2)e^(1/x²)/x⁻²。",
      formula: math`\frac{1}{2}\lim_{x\to 0}\frac{e^{1/x^2}}{x^{-2}}`,
    },
    {
      change: "第二次求导得出 +∞",
      text: "再求一次导，(−2/x³) 与 (−2/x³) 恰好完全约掉，只剩 (1/2)e^(1/x²)→+∞。",
      formula: math`\frac{1}{2}\lim_{x\to 0}e^{1/x^2}=+\infty`,
    },
  ],

  "jc935-3-2-1-13": [
    {
      change: "把 ∞−∞ 型先通分合并为 0/0 型",
      text: "利用 x²−4=(x−2)(x+2) 通分，把 4/(x²−4)−1/(x−2) 合并成单个分式 (2−x)/(x²−4)。",
      formula: math`\lim_{x\to 2}\frac{4-(x+2)}{x^2-4}=\lim_{x\to 2}\frac{2-x}{x^2-4}`,
    },
    {
      change: "对 0/0 型应用洛必达法则",
      text: "分子 (2−x)′=−1，分母 (x²−4)′=2x。",
      formula: math`\lim_{x\to 2}\frac{-1}{2x}`,
    },
    {
      change: "代入 x=2 得 −1/4",
      text: "分母 2×2=4，故极限为 −1/4。",
      formula: math`\frac{-1}{2\cdot 2}=-\frac{1}{4}`,
    },
  ],

  "jc935-3-2-1-14": [
    {
      change: "识别 1^∞ 幂指型并取对数改写为 e^L",
      text: "x→0 时底数 e²ˣ+3x→1、指数 1/x→∞，先算指数上的对数极限 L=lim [ln(e²ˣ+3x)/x]。",
      formula: math`L=\lim_{x\to 0}\frac{\ln(e^{2x}+3x)}{x}\quad\left(\frac{0}{0}\right)`,
    },
    {
      change: "对 0/0 型指数极限套用洛必达法则",
      text: "分子求导得 (2e²ˣ+3)/(e²ˣ+3x)，分母求导得 1，代入 x=0 得 L=(2+3)/1=5。",
      formula: math`L=\lim_{x\to 0}\frac{2e^{2x}+3}{e^{2x}+3x}=5`,
    },
    {
      change: "还原回指数 e^L",
      text: "别忘了最终答案是 e^L 而不是 L，故原极限为 e⁵。",
      formula: math`e^L=e^5`,
    },
  ],

  "jc935-3-2-1-15": [
    {
      change: "识别 0⁰ 幂指型，取对数化成 ∞/∞ 型分式",
      text: "写成 e^L，其中 L=lim_{x→0⁺} x ln(sin x)=lim_{x→0⁺} ln(sin x)/(1/x)。",
      formula: math`L=\lim_{x\to 0^+}\frac{\ln(\sin x)}{1/x}\quad\left(\frac{\infty}{\infty}\right)`,
    },
    {
      change: "对 L 应用洛必达法则并化简",
      text: "分子导数 cos x/sin x，分母导数 −1/x²，整理成 −(x/sin x)·x cos x→−1·0=0。",
      formula: math`L=-\lim_{x\to 0^+}\frac{x}{\sin x}\cdot x\cos x=0`,
    },
    {
      change: "还原回 e^L 得 1",
      text: "L=0，因此原极限为 e⁰=1。",
      formula: math`e^0=1`,
    },
  ],

  "jc935-3-2-1-16": [
    {
      change: "识别 ∞⁰ 型并取对数求指数极限 L",
      text: "x→0⁺ 时 2/x→+∞、tan(3x)→0，先算 L=lim_{x→0⁺} tan(3x)ln(2/x)。",
      formula: math`L=\lim_{x\to 0^+}\frac{\tan(3x)}{3x}\cdot 3\cdot\frac{\ln(2/x)}{1/x}`,
    },
    {
      change: "对 ln(2/x)/(1/x) 用洛必达法则",
      text: "分子导数 −1/x，分母导数 −1/x²，相除得 x→0，故 L=1·3·0=0。",
      formula: math`\lim_{x\to 0^+}\frac{-1/x}{-1/x^2}=\lim_{x\to 0^+}x=0\implies L=0`,
    },
    {
      change: "还原回 e^L 得 1",
      text: "因此原极限为 e⁰=1。",
      formula: math`e^0=1`,
    },
  ],

  "jc935-3-2-2": [
    {
      change: "先检验导数比极限是否存在",
      text: "分子分母求导得 (2x−cos x)′/x′=2+sin x。当 x→∞ 时 sin x 在 [−1, 1] 周期振荡无极限，故洛必达法则失效。",
      formula: math`\frac{(2x-\cos x)'}{x'}=2+\sin x\quad(\text{振荡无极限})`,
    },
    {
      change: "改用拆项法直接化简原式",
      text: "洛必达失效不代表原极限不存在！把分式拆成 2−(cos x)/x。",
      formula: math`\frac{2x-\cos x}{x}=2-\frac{\cos x}{x}`,
    },
    {
      change: "用无穷小乘有界函数得出极限 2",
      text: "因为 |cos x|≤1 且 1/x→0，故 (cos x)/x→0，原极限存在且等于 2。",
      formula: math`\lim_{x\to\infty}\left(2-\frac{\cos x}{x}\right)=2`,
    },
  ],

  "jc935-3-2-3": [
    {
      change: "求导检验为什么洛必达法则失效",
      text: "分子求导得 2x cos(1/x)+sin(1/x)，分母求导得 sec²x。x→0 时 sin(1/x) 剧烈振荡，导数比无极限，洛必达失效。",
      formula: math`\frac{2x\cos(1/x)+\sin(1/x)}{\sec^2 x}\quad(\text{振荡无极限})`,
    },
    {
      change: "改写原式拆分出 x/tan x 与 x cos(1/x)",
      text: "把分子的 x² 拆一个 x 给分母 tan x，写成 (x/tan x)·[x cos(1/x)]。",
      formula: math`\frac{x^2\cos(1/x)}{\tan x}=\frac{x}{\tan x}\cdot x\cos\frac{1}{x}`,
    },
    {
      change: "利用重要极限与有界性算出 0",
      text: "lim(x/tan x)=1，且 |cos(1/x)|≤1 使 x cos(1/x)→0，乘积极限为 0。",
      formula: math`1\cdot 0=0`,
    },
  ],

  "jc935-3-2-4": [
    {
      change: "先读出函数值与左极限",
      text: "由分段定义，x≤0 时恒为 e⁻²，故 f(0)=lim_{x→0⁻} f(x)=e⁻²。",
      formula: math`f(0)=\lim_{x\to 0^-}f(x)=e^{-2}`,
    },
    {
      change: "对右极限取对数，化成 0/0 型并用洛必达法则",
      text: "右极限写成 e^L，其中 L=lim_{x→0⁺} [ln(1+2x)−2x]/x²。求导一次得 [2/(1+2x)−2]/(2x)=−2/(1+2x)→−2。",
      formula: math`\begin{gathered}L=\lim_{x\to 0^+}\frac{\ln(1+2x)-2x}{x^2}\\[4pt]=\lim_{x\to 0^+}\frac{2/(1+2x)-2}{2x}=-2\end{gathered}`,
    },
    {
      change: "对比左右极限与函数值判断连续性",
      text: "右极限 e^L=e⁻²，与左极限和 f(0) 完全相等，故在 x=0 处连续。",
      formula: math`\lim_{x\to 0^+}f(x)=e^{-2}=f(0)`,
    },
  ],
};

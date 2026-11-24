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
 * 严格遵循 P0 质量门禁：每题 3 步 + 2 个三选一理解检查（防固定槽位、防剧透、仅正确项肯定反馈）+ 1 道非退化数值迁移题。
 */
export const chapterThreeSec1MvtTeaching: Readonly<Record<string, TeachingLesson>> = {
  p19: {
    target: "理解拉格朗日中值定理「某点瞬时斜率等于整段平均斜率」的几何意义，并会按「核条件 → 算割线斜率 → 解导数方程」三步求中值点 ξ。",
    prerequisites: [
      "知道多项式函数在闭区间连续、在开区间可导",
      "会用幂函数求导法则算 f′(x)=2x",
    ],
    strategy: "lagrange-midpoint-solve",
    referenceAnswer: 3,
    solution: math`\begin{gathered}\frac{f(5)-f(1)}{5-1}=\frac{25-1}{4}=6\\[4pt]2\xi=6\implies\xi=3\in(1,5)\end{gathered}`,
    solutionExplanation: "先算出区间 [1, 5] 两端连线的平均坡度，再令导数等于这个平均坡度解出开区间内的 ξ。",
    steps: buildSteps([
      {
        id: "p19-1",
        goal: "第一步：核对拉格朗日中值定理的前提，并算两端连线的平均斜率",
        plain: "拉格朗日中值定理要求函数在闭区间上连续不断开、在开区间内光滑可导。确认这两条满足后，先用两端点高度差除以横向跨度，算出整段路的平均坡度。",
        formula: math`\frac{f(5)-f(1)}{5-1}=\frac{25-1}{4}=6`,
        detail: "f(x)=x² 是多项式，在 [1, 5] 连续、在 (1, 5) 可导。两端点为 (1, 1) 和 (5, 25)，割线斜率为 (25−1)/(5−1)=6。",
        check: {
          prompt: "对 f(x)=x² 在 [1, 5] 上套用拉格朗日中值定理时，割线斜率分母与分子分别对应什么？",
          choices: [
            "分子是 f(5)−f(1)，分母是 5−1",
            "分子是 f(5)+f(1)，分母是 5+1",
            "分子是 f′(5)−f′(1)，分母是 5−1",
          ],
          answer: "分子是 f(5)−f(1)，分母是 5−1",
          feedback: {
            "分子是 f(5)−f(1)，分母是 5−1": "对，平均变化率就是终点减起点的函数值差，除以区间长度。",
            "分子是 f(5)+f(1)，分母是 5+1": "割线斜率衡量的是变化量之比，分子分母都要用减法而不是加法。",
            "分子是 f′(5)−f′(1)，分母是 5−1": "割线连接的是原函数图像上的两端点，分子用原函数值 f(5)−f(1) 而不是导数值。",
          },
          prerequisite: "回忆两点 (x₁, y₁) 与 (x₂, y₂) 连线的斜率公式：(y₂−y₁)/(x₂−x₁)。",
        },
      },
      {
        id: "p19-2",
        goal: "第二步：写出导函数 f′(ξ)，让瞬时坡度等于刚才的平均坡度",
        plain: "中值定理保证区间内部至少有一个位置 ξ，那里的切线和两端连线平行。只要把原函数求导，让导数表达式等于第一步的平均坡度，就得到关于 ξ 的方程。",
        formula: math`f'(\xi)=2\xi=6`,
        detail: "f(x)=x² 的导函数是 f′(x)=2x，令 2ξ=6 即可解出中值点。",
        check: {
          prompt: "把原题换成 f(x)=x² 在 [0, 4] 上求中值点，列出方程 2ξ=(16−0)/(4−0) 后，解出的 ξ 应满足什么位置要求？",
          choices: [
            "必须严格落在开区间 (0, 4) 内",
            "必须等于左端点 0 或右端点 4",
            "只要是实数即可，不限制在区间内",
          ],
          answer: "必须严格落在开区间 (0, 4) 内",
          feedback: {
            "必须严格落在开区间 (0, 4) 内": "对，拉格朗日中值定理保证的中值点严格在开区间 (a, b) 内部，不含端点。",
            "必须等于左端点 0 或右端点 4": "中值点是区间内部的光滑点，不需要也不要求落在端点上。",
            "只要是实数即可，不限制在区间内": "解方程后必须验根，筛掉落在开区间 (a, b) 之外的解。",
          },
          prerequisite: "中值定理结论写作「存在 ξ ∈ (a, b)」，圆括号表示严格介于 a 和 b 之间。",
        },
      },
      {
        id: "p19-3",
        goal: "第三步：解出 ξ 并做一道同型迁移题检验掌握",
        plain: "解开一步线性方程后，务必把答案放回开区间 (1, 5) 里核对一遍，确认它确实落在区间内部。",
        formula: math`\xi=\frac{6}{2}=3\in(1,5)`,
        detail: "2ξ=6 解得 ξ=3，且 1<3<5，正好位于区间正中。",
        transfer: {
          prompt: "迁移练习：对 f(x)=x² 在闭区间 [2, 6] 上应用拉格朗日中值定理，求满足 f′(ξ)=[f(6)−f(2)]/(6−2) 的中值点 ξ。",
          answer: 4,
          signFeedback: "检查一下区间 [2, 6] 的中点位置，中值点一定在 2 和 6 之间。",
          remediation: "先算平均斜率 (36−4)/(6−2)=8，再解 2ξ=8 得 ξ=4。",
          solution: math`\begin{gathered}\frac{6^2-2^2}{6-2}=\frac{32}{4}=8\\[4pt]2\xi=8\implies\xi=4\in(2,6)\end{gathered}`,
        },
      },
    ]),
  },

  p20: {
    target: "掌握罗尔定理的三条前提（闭区间连续、开区间可导、两端点函数值相等），理解为什么两端同高必然出现水平切线。",
    prerequisites: [
      "能代入端点检验 f(a) 与 f(b) 是否相等",
      "会求二次多项式的导数并解一次方程",
    ],
    strategy: "rolle-stationary-solve",
    referenceAnswer: 2,
    solution: math`\begin{gathered}f(1)=0=f(3)\\[4pt]f'(\xi)=2\xi-4=0\\[4pt]\implies\xi=2\in(1,3)\end{gathered}`,
    solutionExplanation: "先验证两端高度相同，再令一阶导数为零解出开区间内的驻点。",
    steps: buildSteps([
      {
        id: "p20-1",
        goal: "第一步：逐条核对罗尔定理的三条前提，特别是两端点是否等高",
        plain: "罗尔定理就像爬山：起点和终点海拔一样高，路上没断崖也没尖刺，中途就一定至少有一处平地。先算两端点的函数值，看看它们是不是相等。",
        formula: math`f(1)=1-4+3=0,\quad f(3)=9-12+3=0`,
        detail: "多项式在 [1, 3] 连续、在 (1, 3) 可导，且 f(1)=f(3)=0，三条前提全部满足。",
        check: {
          prompt: "相比拉格朗日中值定理，罗尔定理额外要求哪一条前提，才能保证一定存在 f′(ξ)=0？",
          choices: [
            "两端点函数值相等，即 f(a)=f(b)",
            "函数在区间内处处大于 0",
            "函数必须是偶函数",
          ],
          answer: "两端点函数值相等，即 f(a)=f(b)",
          feedback: {
            "两端点函数值相等，即 f(a)=f(b)": "对，两端同高使割线变成水平线（斜率为 0），从而切线斜率也为 0。",
            "函数在区间内处处大于 0": "罗尔定理只看两端高度是否相等，函数值可以为 0 也可以为负。",
            "函数必须是偶函数": "非偶函数只要满足两端等高与连续可导，同样适用罗尔定理。",
          },
          prerequisite: "想一想斜坡：只有起点和终点海拔相同，平均坡度才是 0。",
        },
      },
      {
        id: "p20-2",
        goal: "第二步：求导并令导数为零，找水平切点的位置",
        plain: "切线水平意味着瞬时变化率为 0。对原二次函数逐项求导，把导数设为 0，就能把驻点方程列出来。",
        formula: math`f'(\xi)=2\xi-4=0`,
        detail: "对 x²−4x+3 求导得 2x−4，令 2ξ−4=0。",
        check: {
          prompt: "如果函数换成 g(x)=|x−2| 在 [1, 3] 上，虽然 g(1)=g(3)=1，但能不能直接用罗尔定理断定存在 g′(ξ)=0？",
          choices: [
            "不能，因为 x=2 处有尖点不可导",
            "能，只要两端点相等就一定成立",
            "不能，因为 g(x) 在 [1, 3] 上不连续",
          ],
          answer: "不能，因为 x=2 处有尖点不可导",
          feedback: {
            "不能，因为 x=2 处有尖点不可导": "对，绝对值函数在顶点处左右导数不相等，破坏了「开区间内可导」的前提。",
            "能，只要两端点相等就一定成立": "三条前提缺一不可，少掉可导性就可能出现 V 字尖顶，没有水平切线。",
            "不能，因为 g(x) 在 [1, 3] 上不连续": "|x−2| 图像连在一起，它是连续的，问题出在 x=2 处不可导。",
          },
          prerequisite: "画出 V 字形的 |x−2|：在 x=2 处图像没断开，但左边斜率 −1、右边斜率 +1，是个尖角。",
        },
      },
      {
        id: "p20-3",
        goal: "第三步：解方程验区间，并完成同型迁移练习",
        plain: "解出驻点后确认它严格落在开区间 (1, 3) 内，再做一道换参数的罗尔定理小练习。",
        formula: math`2\xi-4=0\implies\xi=2\in(1,3)`,
        detail: "ξ=2 严格介于 1 和 3 之间，正是抛物线的顶点。",
        transfer: {
          prompt: "迁移练习：对 f(x)=x²−6x+5 在闭区间 [1, 5] 上应用罗尔定理，求满足 f′(ξ)=0 的驻点 ξ。",
          answer: 3,
          signFeedback: "先核对 f(1)=f(5)=0，再解 2ξ−6=0，结果应为正数且在 (1, 5) 内。",
          remediation: "f′(x)=2x−6，令 2ξ−6=0 得 ξ=3∈(1, 5)。",
          solution: math`\begin{gathered}f(1)=0=f(5)\\[4pt]f'(\xi)=2\xi-6=0\implies\xi=3\in(1,5)\end{gathered}`,
        },
      },
    ]),
  },

  p134: {
    target: "会在三次函数上应用拉格朗日中值定理，并注意区分「题目要求的是 c² 还是 c」以及验根区间。",
    prerequisites: [
      "会算幂函数 f(x)=x³ 的导数 f′(x)=3x²",
      "会算割线平均斜率并看清题目最终所求量",
    ],
    strategy: "lagrange-cubic-target",
    referenceAnswer: 3,
    solution: math`\begin{gathered}\frac{f(3)-f(0)}{3-0}=\frac{27}{3}=9\\[4pt]3c^2=9\implies c^2=3\\[4pt]c=\sqrt{3}\in(0,3)\end{gathered}`,
    solutionExplanation: "割线斜率为 9，令 3c²=9 直接得 c²=3，且正根 √3 落在 (0, 3) 内。",
    steps: buildSteps([
      {
        id: "p134-1",
        goal: "第一步：算区间 [0, 3] 上的割线斜率",
        plain: "三次多项式处处光滑，直接把区间两端点代入 f(x)=x³，算整段的平均斜率。",
        formula: math`\frac{f(3)-f(0)}{3-0}=\frac{27-0}{3}=9`,
        detail: "f(3)=27，f(0)=0，区间长度为 3，因此割线斜率为 9。",
        check: {
          prompt: "为什么对三次函数 f(x)=x³ 在 [0, 3] 上，中值点 c 不再是区间中点 1.5？",
          choices: [
            "因为 f′(x)=3x² 不是线性的，斜率增长越来越快",
            "因为 x³ 在 x=0 处不可导",
            "因为区间起点是 0 而不是 1",
          ],
          answer: "因为 f′(x)=3x² 不是线性的，斜率增长越来越快",
          feedback: {
            "因为 f′(x)=3x² 不是线性的，斜率增长越来越快": "对，只有二次函数的导数是线性函数时，中值点才恒为区间中点。",
            "因为 x³ 在 x=0 处不可导": "x³ 是多项式，在全体实数上都可导，f′(0)=0。",
            "因为区间起点是 0 而不是 1": "与起点是否为 0 无关，本质是导函数 3x² 非线性。",
          },
          prerequisite: "对比 x²（导数 2x 均匀增长）与 x³（导数 3x² 加速增长）。",
        },
      },
      {
        id: "p134-2",
        goal: "第二步：令切线斜率等于割线斜率并看清所求目标",
        plain: "写出 f′(c)=3c²，让它等于第一步的割线斜率。解出 c² 后，记得确认它的正平方根落在开区间 (0, 3) 内，负根要舍去。",
        formula: math`3c^2=9\implies c=\sqrt{3}\in(0,3)`,
        detail: "3c²=9 有两个实根 ±√3，但只有正根 √3≈1.732 落在 (0, 3) 内。",
        check: {
          prompt: "解方程 3c²=9 得到 c=±√3，为什么要舍去 c=−√3？",
          choices: [
            "因为 −√3 不在开区间 (0, 3) 内",
            "因为负数的平方不能等于 3",
            "因为三次函数在负数处没有导数",
          ],
          answer: "因为 −√3 不在开区间 (0, 3) 内",
          feedback: {
            "因为 −√3 不在开区间 (0, 3) 内": "对，拉格朗日中值点必须严格位于题目给定的开区间 (0, 3) 内。",
            "因为负数的平方不能等于 3": "(−√3)² 同样等于 3，舍去它是因为它不在 (0, 3) 里。",
            "因为三次函数在负数处没有导数": "x³ 在所有实数上都可导，舍去负根纯粹是区间限制。",
          },
          prerequisite: "解中值方程后永远多做一步：检查解是否落在 (a, b) 内。",
        },
      },
      {
        id: "p134-3",
        goal: "第三步：确认题目要求的是 c²，并用迁移题巩固",
        plain: "读清题干问的是 c² 而不是 c，再做一道区间拉长后的三次函数中值题。",
        formula: math`c^2=3`,
        detail: "由 3c²=9 得 c²=3。",
        transfer: {
          prompt: "迁移练习：设 f(x)=x³ 在区间 [0, 6] 上满足拉格朗日中值定理 f′(c)=[f(6)−f(0)]/6，c∈(0, 6)，求 c²。",
          answer: 12,
          signFeedback: "c² 必为正数，先算 (6³−0)/6=36，再除以 3。",
          remediation: "割线斜率 216/6=36，令 3c²=36 得 c²=12（c=2√3∈(0, 6)）。",
          solution: math`\begin{gathered}\frac{6^3-0}{6}=36\\[4pt]3c^2=36\implies c^2=12\end{gathered}`,
        },
      },
    ]),
  },

  p181: {
    target: "把「对数定义域正性检查 + 链式法则求导 + 罗尔定理」串成完整推理链，避免漏乘内层导数或忽略真数大于零。",
    prerequisites: [
      "知道 ln u 要求真数 u>0",
      "会用链式法则对 ln(sin(2x)) 逐层求导",
    ],
    strategy: "rolle-log-chain",
    referenceAnswer: 0.25,
    solution: math`\begin{gathered}\sin(2x)\ge\frac{1}{2}>0\\[4pt]f\left(\frac{\pi}{12}\right)=f\left(\frac{5\pi}{12}\right)\\[4pt]f'(c)=\frac{2\cos(2c)}{\sin(2c)}=0\\[4pt]2c=\frac{\pi}{2}\implies\frac{c}{\pi}=\frac{1}{4}\end{gathered}`,
    solutionExplanation: "先确认区间内 sin(2x)>0 且两端同值，再用链式法则求导令分子 cos(2c)=0。",
    steps: buildSteps([
      {
        id: "p181-1",
        goal: "第一步：核对对数真数 sin(2x) 恒正，且两端点同高",
        plain: "遇到带 ln 的中值定理题，第一关永远是检查真数在闭区间上是不是处处大于 0，否则函数连定义都没有。确认安全后，再比对两个端点的函数值。",
        formula: math`\begin{gathered}2x\in\left[\frac{\pi}{6},\frac{5\pi}{6}\right]\implies \sin(2x)\ge\frac{1}{2}>0\\[4pt]f\left(\frac{\pi}{12}\right)=\ln\frac{1}{2}=f\left(\frac{5\pi}{12}\right)\end{gathered}`,
        detail: "在 [π/6, 5π/6] 上正弦值最小是 1/2>0，且两端正弦值同为 1/2，满足罗尔定理全部条件。",
        check: {
          prompt: "在检验 f(x)=ln(sin(2x)) 是否满足罗尔定理前，最先要确认哪一件事？",
          choices: [
            "在闭区间 [π/12, 5π/12] 上 sin(2x) 处处大于 0",
            "在闭区间上 cos(2x) 处处大于 0",
            "区间长度必须等于 π",
          ],
          answer: "在闭区间 [π/12, 5π/12] 上 sin(2x) 处处大于 0",
          feedback: {
            "在闭区间 [π/12, 5π/12] 上 sin(2x) 处处大于 0": "对，只有真数 sin(2x)>0，ln(sin(2x)) 才在闭区间有定义且连续可导。",
            "在闭区间上 cos(2x) 处处大于 0": "cos(2x) 在中间恰好会经过 0，这正是驻点所在，不需要它恒正。",
            "区间长度必须等于 π": "罗尔定理对区间长度没有固定要求，只要两端等高且连续可导。",
          },
          prerequisite: "ln u 只对 u>0 有意义；一旦真数触及 0 或负数，函数就不连续甚至无定义。",
        },
      },
      {
        id: "p181-2",
        goal: "第二步：三层链式法则求导，找到使导数为零的角",
        plain: "把 ln(sin(2x)) 从外往里剥三层：外层 ln u、中层 sin v、内层 2x，每一层求完导都要乘在一起。因为分母 sin(2x) 恒正，导数为零只取决于分子。",
        formula: math`f'(x)=\frac{1}{\sin(2x)}\cdot\cos(2x)\cdot 2=\frac{2\cos(2x)}{\sin(2x)}`,
        detail: "外层 (ln u)'=1/u，中层 (sin v)'=cos v，内层 (2x)'=2，乘起来得 2cos(2x)/sin(2x)。",
        check: {
          prompt: "对 ln(sin(2x)) 求导时，若只写成 cos(2x)/sin(2x)，漏掉了链式法则中的哪一层导数？",
          choices: [
            "最内层 2x 的导数 2",
            "最外层 ln u 的导数 1/u",
            "中层 sin v 的导数 cos v",
          ],
          answer: "最内层 2x 的导数 2",
          feedback: {
            "最内层 2x 的导数 2": "对，v=2x 对 x 求导还要乘上 2；虽然本题求 =0 时系数 2 会约掉，但其他题漏掉 2 会直接算错。",
            "最外层 ln u 的导数 1/u": "分母里已经有 sin(2x)，说明外层 1/u 已经乘进去了。",
            "中层 sin v 的导数 cos v": "分子里已经有 cos(2x)，说明中层导数已经算了。",
          },
          prerequisite: "链式法则口诀：由外向内剥洋葱，剥到最后一层 2x 也要乘它的导数 2。",
        },
      },
      {
        id: "p181-3",
        goal: "第三步：解出开区间内的 c/π 并做迁移题",
        plain: "在 2c∈(π/6, 5π/6) 内找出使 cos(2c)=0 的唯一角度，算出 c 后再除以 π 得到题目要求的比值。",
        formula: math`2c=\frac{\pi}{2}\implies c=\frac{\pi}{4}\implies \frac{c}{\pi}=\frac{1}{4}`,
        detail: "c=π/4 落在 (π/12, 5π/12) 内，故 c/π=1/4。",
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
    target: "掌握书面验证拉格朗日中值定理的标准三段写法：先写条件，再算割线斜率，最后解导数方程并标明归属开区间。",
    prerequisites: [
      "知道书面验证题不能跳过「闭区间连续、开区间可导」的声明",
      "会求二次多项式的导数与割线斜率",
    ],
    strategy: "lagrange-written-verify",
    solution: math`\begin{gathered}\frac{f(5)-f(1)}{5-1}=\frac{65-1}{4}=16\\[4pt]f'(c)=6c-2=16\\[4pt]\implies c=3\in(1,5)\end{gathered}`,
    solutionExplanation: "先确认连续可导，再算出平均斜率 16，解 6c−2=16 得 c=3。",
    steps: buildSteps([
      {
        id: "p216-1",
        goal: "第一步：写清定理前提，再算两端连线的平均坡度",
        plain: "验证题最容易丢分的地方是上来就求导。先交代多项式在 [1, 5] 连续、在 (1, 5) 可导，再把两个端点代入原函数算出割线斜率。",
        formula: math`\frac{f(5)-f(1)}{5-1}=\frac{65-1}{4}=16`,
        detail: "f(1)=3−2=1，f(5)=75−10=65，平均坡度为 64/4=16。",
        check: {
          prompt: "在书面验证拉格朗日中值定理时，为什么开篇一定要写「在 [1, 5] 连续，在 (1, 5) 可导」？",
          choices: [
            "这是定理成立的必要前提，缺一不可",
            "只是格式习惯，不写逻辑也完全严密",
            "因为多项式只在开区间内连续",
          ],
          answer: "这是定理成立的必要前提，缺一不可",
          feedback: {
            "这是定理成立的必要前提，缺一不可": "对，只有前提成立才能合法调用拉格朗日中值定理的结论。",
            "只是格式习惯，不写逻辑也完全严密": "在微积分证明中，未经验证前提就套用定理属于逻辑漏洞。",
            "因为多项式只在开区间内连续": "多项式在全体实数上连续可导，这里按定理要求写出闭区间连续、开区间可导。",
          },
          prerequisite: "把定理当成机器：先确认输入符合规格（连续+可导），机器输出才可靠。",
        },
      },
      {
        id: "p216-2",
        goal: "第二步：求导并列方程 6c−2=16",
        plain: "求出导函数 f′(x)=6x−2，令瞬时斜率等于刚才算出的平均斜率 16，解出 c。",
        formula: math`f'(c)=6c-2=16\implies c=3`,
        detail: "6c=18 解得 c=3。",
        check: {
          prompt: "对二次函数 f(x)=3x²−2x 在 [1, 5] 上解出的 c=3，和区间端点 1、5 有什么巧合关系？",
          choices: [
            "恰好是区间中点 (1+5)/2=3",
            "恰好是两端点之积 1×5",
            "恰好等于一次项系数的绝对值 2",
          ],
          answer: "恰好是区间中点 (1+5)/2=3",
          feedback: {
            "恰好是区间中点 (1+5)/2=3": "对，任意二次函数在任意闭区间上的拉格朗日中值点恒为区间中点，这能帮你快速验算！",
            "恰好是两端点之积 1×5": "1×5=5 是右端点，不是中值点 3。",
            "恰好等于一次项系数的绝对值 2": "c=3 而不是 2，一次项系数 −2 在方程两边抵消掉了。",
          },
          prerequisite: "后面第 3-1-4 题会严格证明：任意二次函数的中值点恒为 (a+b)/2。",
        },
      },
      {
        id: "p216-3",
        goal: "第三步：标明 c∈(1, 5) 收尾，并完成迁移题",
        plain: "最后明确写出 c=3∈(1, 5)，完成验证闭环。",
        formula: math`c=3\in(1,5),\quad f'(3)=16`,
        detail: "c=3 严格落在 (1, 5) 内，切线与割线平行。",
        transfer: {
          prompt: "迁移练习：对 f(x)=2x²+x 在闭区间 [2, 6] 上应用拉格朗日中值定理，求满足 f′(c)=[f(6)−f(2)]/(6−2) 的 c。",
          answer: 4,
          signFeedback: "c 必须落在开区间 (2, 6) 内，二次函数的中值点正好是区间中点。",
          remediation: "平均斜率 (78−10)/4=17，令 f′(c)=4c+1=17 得 c=4。",
          solution: math`\begin{gathered}\frac{f(6)-f(2)}{6-2}=\frac{78-10}{4}=17\\[4pt]4c+1=17\implies c=4\in(2,6)\end{gathered}`,
        },
      },
    ]),
  },

  p217: {
    target: "掌握「罗尔定理证至少 k 个根 + 多项式次数证至多 k 个根」的双重夹击法，避免展开高次多项式。",
    prerequisites: [
      "能直接从因式分解读出多项式的所有实零点",
      "知道 n 次多项式至多有 n 个实根",
    ],
    strategy: "rolle-root-counting",
    solution: math`\begin{gathered}\text{罗尔定理给出三个区间}\\[4pt](-3,-1),\;(-1,2),\;(2,4)\\[4pt]\text{各至少有一个零点}\\[4pt] \deg f'=3\implies\text{至多 3 根}\\[4pt]\text{故恰有 3 个不同实零点}\end{gathered}`,
    solutionExplanation: "4 个互异零点构成 3 个相邻闭区间，罗尔定理得至少 3 个导数零点，三次导数至多 3 根。",
    steps: buildSteps([
      {
        id: "p217-1",
        goal: "第一步：按从小到大排好原函数的四个零点，切出三段相邻闭区间",
        plain: "千万别把四次括号乘开！直接读出让每个因式为零的 x，按顺序排成一行，相邻两个零点之间正好组成一段「两端高度同为 0」的闭区间。",
        formula: math`f(-3)=f(-1)=f(2)=f(4)=0`,
        detail: "四个互异零点把数轴分成三段互不重叠的相邻区间：[−3, −1]、[−1, 2]、[2, 4]。",
        check: {
          prompt: "如果有 k 个互不相同的实零点按顺序排好，相邻零点一共能组成多少段互不重叠的闭区间？",
          choices: ["k−1 段", "k 段", "k+1 段"],
          answer: "k−1 段",
          feedback: {
            "k−1 段": "对，4 个点之间有 3 个间隔，k 个不同零点之间正好有 k−1 段相邻闭区间。",
            "k 段": "想象 2 个点之间只有 1 条线段，间隔数总比点数少 1。",
            "k+1 段": "两端之外的无穷区间无法满足两端点等高，只算夹在零点之间的闭区间。",
          },
          prerequisite: "画 4 个点在数轴上数一数它们中间的空档：点—空—点—空—点—空—点，共 3 个空档。",
        },
      },
      {
        id: "p217-2",
        goal: "第二步：在三段区间各用一次罗尔定理，证明「至少有 3 个」",
        plain: "多项式处处连续可导，每段区间两端函数值都是 0，所以每段内部都至少藏着一个 f′=0 的点。因为三段开区间互不相交，这三个点一定互不相同。",
        formula: math`\begin{gathered}\exists\,\xi_1\in(-3,-1),\;\xi_2\in(-1,2),\\\xi_3\in(2,4),\;f'(\xi_k)=0\end{gathered}`,
        detail: "三段开区间两两无公共点，保证 ξ₁<ξ₂<ξ₃ 互异。",
        check: {
          prompt: "用罗尔定理找到三个不同零点后，为什么还不能直接宣布「恰有三个」，必须补上「f′ 是三次多项式」这一句？",
          choices: [
            "因为罗尔定理只保证「至少」，还需要次数上限保证「至多」",
            "因为三次多项式一定有三个不同实根",
            "因为原函数在端点处不可导",
          ],
          answer: "因为罗尔定理只保证「至少」，还需要次数上限保证「至多」",
          feedback: {
            "因为罗尔定理只保证「至少」，还需要次数上限保证「至多」": "对，「恰好=至少+至多」，两头夹住才算完整证明。",
            "因为三次多项式一定有三个不同实根": "一般三次多项式可能只有 1 个实根（如 x³+x），它提供的是「至多 3 个」的上限。",
            "因为原函数在端点处不可导": "多项式处处可导，补次数上限是为了封住「会不会有第 4 个根」的漏洞。",
          },
          prerequisite: "证明「恰好等于 3」在数学里几乎总是拆成两半：证明 ≥3，再证明 ≤3。",
        },
      },
      {
        id: "p217-3",
        goal: "第三步：合拢「至少 3 个」与「至多 3 个」，并用迁移题巩固",
        plain: "四次多项式求一次导变成三次多项式，至多 3 个实根，与上一步合起来就得到「恰有 3 个不同实零点」。",
        formula: math`\deg f'=3\implies\text{恰有 }3\text{ 个不同实零点}`,
        detail: "3≤实零点个数≤3，结论严密成立。",
        transfer: {
          prompt: "迁移练习：设 f(x)=(x+4)(x+1)(x−1)(x−3)(x−6)，不展开原式，判断导方程 f′(x)=0 恰有几个不同的实零点？",
          answer: 4,
          signFeedback: "先数清原多项式有几个互异实零点，间隔数等于零点数减 1。",
          remediation: "原式为五次多项式且有 5 个互异实零点，相邻 4 段区间用罗尔定理得至少 4 根，四次导数至多 4 根，故恰有 4 个。",
          solution: math`\begin{gathered}5\text{ 个互异零点}\implies 4\text{ 段区间至少 }4\text{ 根}\\[4pt]\deg f'=4\implies\text{至多 }4\text{ 根，故恰有 }4\text{ 个}\end{gathered}`,
        },
      },
    ]),
  },

  "jc935-3-1-1": {
    target: "会在复合对数三角函数 f(x)=ln(cos x) 上完整验证罗尔定理，养成先查真数正性的习惯。",
    prerequisites: [
      "知道 cos x 在 [−π/3, π/3] 上恒大于等于 1/2",
      "会用链式法则算 (ln(cos x))′=−tan x",
    ],
    strategy: "rolle-log-cos",
    solution: math`\begin{gathered}\cos x\ge\frac{1}{2}>0\\[4pt]f\left(-\frac{\pi}{3}\right)=f\left(\frac{\pi}{3}\right)\\[4pt]f'(\xi)=-\tan\xi=0\\[4pt]\implies\xi=0\in\left(-\frac{\pi}{3},\frac{\pi}{3}\right)\end{gathered}`,
    solutionExplanation: "先验证 cos x>0 保证定义域安全，再比对偶函数端点值，最后解 −tan ξ=0 得 ξ=0。",
    steps: buildSteps([
      {
        id: "jc935-3-1-1-1",
        goal: "第一步：先查真数 cos x>0，再核对两端点高度相等",
        plain: "在 [−π/3, π/3] 里余弦最小也等于 1/2，稳稳大于 0，所以 ln(cos x) 全程连续可导。又因为 cos(−x)=cos x，两端点函数值天然相等。",
        formula: math`\cos x\ge\frac{1}{2}>0,\quad f\left(-\frac{\pi}{3}\right)=\ln\frac{1}{2}=f\left(\frac{\pi}{3}\right)`,
        detail: "满足罗尔定理全部三条前提。",
        check: {
          prompt: "如果把区间扩大到 [−2π/3, 2π/3]，还能对 f(x)=ln(cos x) 使用罗尔定理吗？",
          choices: [
            "不能，因为区间内 x=±π/2 处 cos x=0，ln(cos x) 无定义",
            "能，因为 cos(−2π/3)=cos(2π/3)",
            "能，只要求导得到 −tan x=0 解出 ξ=0 即可",
          ],
          answer: "不能，因为区间内 x=±π/2 处 cos x=0，ln(cos x) 无定义",
          feedback: {
            "不能，因为区间内 x=±π/2 处 cos x=0，ln(cos x) 无定义": "对，当 |x|≥π/2 时 cos x≤0，对数函数直接失去定义，前提失效。",
            "能，因为 cos(−2π/3)=cos(2π/3)": "cos(±2π/3)=−1/2<0，连端点处的 ln(−1/2) 在实数里都不存在！",
            "能，只要求导得到 −tan x=0 解出 ξ=0 即可": "解得出 ξ=0 不能反推定理适用，前提不满足就不能使用罗尔定理。",
          },
          prerequisite: "检查对数函数是否连续可导，第一步永远看真数是否严格大于 0。",
        },
      },
      {
        id: "jc935-3-1-1-2",
        goal: "第二步：用链式法则求导并筛选开区间内的解",
        plain: "外层 ln u 求导得 1/cos x，乘以内层 cos x 的导数 −sin x，合成 −tan x。解方程 −tan ξ=0 时，只保留落在 (−π/3, π/3) 内的根。",
        formula: math`f'(\xi)=\frac{-\sin\xi}{\cos\xi}=-\tan\xi=0`,
        detail: "tan ξ=0 的全体实解是 kπ，落入 (−π/3, π/3) 内的只有 k=0 即 ξ=0。",
        check: {
          prompt: "对 f(x)=ln(cos x) 求导得到 −tan x，负号是从哪里来的？",
          choices: [
            "内层函数 cos x 求导得到 −sin x",
            "外层函数 ln u 求导得到 −1/u",
            "罗尔定理公式本身自带负号",
          ],
          answer: "内层函数 cos x 求导得到 −sin x",
          feedback: {
            "内层函数 cos x 求导得到 −sin x": "对，(cos x)′=−sin x，乘上外层导数 1/cos x 就得到 −tan x。",
            "外层函数 ln u 求导得到 −1/u": "(ln u)′=+1/u，没有负号。",
            "罗尔定理公式本身自带负号": "罗尔定理只要求 f′(ξ)=0，负号来自三角函数求导。",
          },
          prerequisite: "牢记常见易错符号：(sin x)′=cos x，(cos x)′=−sin x。",
        },
      },
      {
        id: "jc935-3-1-1-3",
        goal: "第三步：确认 ξ=0∈(−π/3, π/3)，并完成平移迁移题",
        plain: "唯一驻点 ξ=0 严格落在开区间内，验证完成。",
        formula: math`\xi=0\in\left(-\frac{\pi}{3},\frac{\pi}{3}\right)`,
        detail: "验证完毕。",
        transfer: {
          prompt: "迁移练习：对 f(x)=ln(cos(x−1)) 在闭区间 [1−π/3, 1+π/3] 上应用罗尔定理，求开区间内使 f′(ξ)=0 的唯一驻点 ξ。",
          answer: 1,
          signFeedback: "图像向右平移了 1 个单位，对称中心也跟着右移 1。",
          remediation: "f′(ξ)=−tan(ξ−1)=0，在 (1−π/3, 1+π/3) 内唯一解为 ξ−1=0 即 ξ=1。",
          solution: math`\begin{gathered}f'(\xi)=-\tan(\xi-1)=0\\[4pt]\xi=1\in\left(1-\frac{\pi}{3},1+\frac{\pi}{3}\right)\end{gathered}`,
        },
      },
    ]),
  },

  "jc935-3-1-2": {
    target: "学会在三次多项式上解二次中值方程，并逐一检验无理根是否严格落在开区间内。",
    prerequisites: [
      "会用一元二次方程求根公式",
      "会估算 √7 的范围以判断根是否在 (0, 1) 内",
    ],
    strategy: "lagrange-cubic-roots",
    solution: math`\begin{gathered}\frac{f(1)-f(0)}{1-0}=1,\;9\xi^2-8\xi+2=1\\[4pt]\xi=\frac{4\pm\sqrt{7}}{9}\in(0,1)\end{gathered}`,
    solutionExplanation: "列出 9ξ²−8ξ+1=0 解得 (4±√7)/9，利用 2<√7<3 确认两根均在 (0, 1) 内。",
    steps: buildSteps([
      {
        id: "jc935-3-1-2-1",
        goal: "第一步：算割线斜率并化简为一元二次方程",
        plain: "多项式满足条件，先算出端点 f(0)=1、f(1)=2，平均变化率为 1；再把导数 9ξ²−8ξ+2 设为 1 并移项。",
        formula: math`9\xi^2-8\xi+2=1\implies 9\xi^2-8\xi+1=0`,
        detail: "移项后常数项从 2 变成 1。",
        check: {
          prompt: "把 f′(ξ)=9ξ²−8ξ+2 与割线斜率 1 联立时，下面哪一步整理是正确的？",
          choices: [
            "移项得 9ξ²−8ξ+1=0",
            "直接令 9ξ²−8ξ+2=0",
            "移项得 9ξ²−8ξ+3=0",
          ],
          answer: "移项得 9ξ²−8ξ+1=0",
          feedback: {
            "移项得 9ξ²−8ξ+1=0": "对，两边同时减去 1，常数项变为 2−1=1。",
            "直接令 9ξ²−8ξ+2=0": "令导数等于 0 是罗尔定理，本题两端高度不同，割线斜率是 1 不是 0。",
            "移项得 9ξ²−8ξ+3=0": "把右边的 +1 移到左边要变号成 −1。",
          },
          prerequisite: "拉格朗日中值方程是 f′(ξ)=割线斜率，只有两端等高时右边才是 0。",
        },
      },
      {
        id: "jc935-3-1-2-2",
        goal: "第二步：用求根公式求解，并用不等式估算验根",
        plain: "解二次方程得到两个含 √7 的无理根。不要只凭感觉留下或舍去，用 4<7<9 推出 2<√7<3，就能严格判断两个根都在 (0, 1) 里。",
        formula: math`\xi=\frac{4\pm\sqrt{7}}{9},\quad 2<\sqrt{7}<3`,
        detail: "1/9<(4−√7)/9<2/9，且 6/9<(4+√7)/9<7/9，两根都严格落在 (0, 1) 内。",
        check: {
          prompt: "由 2<√7<3，可以严格推出 (4+√7)/9 满足哪条范围？",
          choices: [
            "6/9 < (4+√7)/9 < 7/9，因此严格落在 (0, 1) 内",
            "(4+√7)/9 > 1，因此应该舍去",
            "(4+√7)/9 < 0，因此应该舍去",
          ],
          answer: "6/9 < (4+√7)/9 < 7/9，因此严格落在 (0, 1) 内",
          feedback: {
            "6/9 < (4+√7)/9 < 7/9，因此严格落在 (0, 1) 内": "对，分子在 6 和 7 之间，除以 9 肯定小于 1 且大于 0。",
            "(4+√7)/9 > 1，因此应该舍去": "√7 小于 3，所以 4+√7 小于 7，除以 9 不会超过 1。",
            "(4+√7)/9 < 0，因此应该舍去": "4 和 √7 都是正数，商必大于 0。",
          },
          prerequisite: "估算 √n 的最稳方法：找夹住 n 的两个相邻完全平方数，例如 2²=4<7<9=3²。",
        },
      },
      {
        id: "jc935-3-1-2-3",
        goal: "第三步：写出完整两根结论，并做一道迁移题",
        plain: "注意中值定理说的是「至少存在一点」，所以区间内完全可能同时存在两个满足条件的中值点。",
        formula: math`\xi=\frac{4\pm\sqrt{7}}{9}\in(0,1)`,
        detail: "两个根都保留。",
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
    target: "掌握柯西中值定理的三条前提（特别是分母导数 g′(x)≠0），并能把三角导数比化简求解。",
    prerequisites: [
      "理解柯西中值定理是拉格朗日中值定理的推广（取 g(x)=x 即退化回拉格朗日）",
      "会用半角公式 sin ξ/(1−cos ξ)=cot(ξ/2)",
    ],
    strategy: "cauchy-mvt-verify",
    solution: math`\begin{gathered}g'(x)=1-\cos x>0\\[4pt]\frac{-2}{\pi-2}=-\cot\frac{\xi}{2}\\[4pt]\implies\xi=2\arctan\frac{\pi-2}{2}\\[4pt]\xi\in\left(0,\frac{\pi}{2}\right)\end{gathered}`,
    solutionExplanation: "先验证 g′(x)=1−cos x>0，再把导数比化为 −cot(ξ/2) 解出 ξ。",
    steps: buildSteps([
      {
        id: "jc935-3-1-3-1",
        goal: "第一步：核对柯西中值定理最易漏掉的条件 g′(x)≠0",
        plain: "柯西中值定理把两个函数 f(x) 和 g(x) 的变化率做比值。为了保证分母导数和分母增量都不为零，必须先检查 g′(x) 在开区间内处处不为 0。",
        formula: math`g'(x)=1-\cos x>0\quad \left(x\in\left(0,\frac{\pi}{2}\right)\right)`,
        detail: "在 (0, π/2) 内 cos x<1，因此 1−cos x>0 严格成立。",
        check: {
          prompt: "在 (0, π/2) 上为什么能保证 g(π/2)−g(0)≠0？",
          choices: [
            "因为 g′(x)=1−cos x>0 处处不为零（若 g(a)=g(b)，罗尔定理会导出 g′(c)=0 的矛盾）",
            "因为 g(x) 在端点 x=0 处等于 1",
            "因为 f(x)=cos x 在区间内单调递减",
          ],
          answer: "因为 g′(x)=1−cos x>0 处处不为零（若 g(a)=g(b)，罗尔定理会导出 g′(c)=0 的矛盾）",
          feedback: {
            "因为 g′(x)=1−cos x>0 处处不为零（若 g(a)=g(b)，罗尔定理会导出 g′(c)=0 的矛盾）": "对，这就是柯西中值定理把 g′(x)≠0 放进前提的深层原因——它自动保证了分母增量 g(b)−g(a)≠0！",
            "因为 g(x) 在端点 x=0 处等于 1": "g(0)=0−sin 0=0，并不是 1。",
            "因为 f(x)=cos x 在区间内单调递减": "f 的单调性与分母 g(b)−g(a) 是否为零无关。",
          },
          prerequisite: "柯西中值定理条件：f、g 闭连续、开可导，且开区间内 g′(x)≠0。",
        },
      },
      {
        id: "jc935-3-1-3-2",
        goal: "第二步：用半角公式化简导数比 −sin ξ/(1−cos ξ)",
        plain: "把增量比和导数比写等后，左边是常数 −2/(π−2)，右边是 −sin ξ/(1−cos ξ)。用二倍角公式 sin ξ=2sin(ξ/2)cos(ξ/2) 和 1−cos ξ=2sin²(ξ/2) 约分，立刻化成干净的 −cot(ξ/2)。",
        formula: math`\frac{-2}{\pi-2}=\frac{-\sin\xi}{1-\cos\xi}=-\cot\frac{\xi}{2}`,
        detail: "两边的负号消去，取倒数即得 tan(ξ/2)=(π−2)/2。",
        check: {
          prompt: "将 −sin ξ/(1−cos ξ) 用半角展开约分时，分子分母共同约掉了哪个因子？",
          choices: ["2sin(ξ/2)", "2cos(ξ/2)", "sin ξ"],
          answer: "2sin(ξ/2)",
          feedback: {
            "2sin(ξ/2)": "对，分子是 −2sin(ξ/2)cos(ξ/2)，分母是 2sin²(ξ/2)，约去 2sin(ξ/2) 剩下 −cot(ξ/2)。",
            "2cos(ξ/2)": "分母 1−cos ξ=2sin²(ξ/2) 不含 cos(ξ/2)。",
            "sin ξ": "分母是 2sin²(ξ/2)，不能直接约掉完整的 sin ξ。",
          },
          prerequisite: "三角降幂公式：1−cos ξ=2sin²(ξ/2)，sin ξ=2sin(ξ/2)cos(ξ/2)。",
        },
      },
      {
        id: "jc935-3-1-3-3",
        goal: "第三步：由 0<(π−2)/2<1 确认 ξ∈(0, π/2)，并完成迁移题",
        plain: "因为 π≈3.14，所以 (π−2)/2≈0.57 严格介于 0 和 1 之间，故反正切在 (0, π/4) 内，乘 2 后恰好落在 (0, π/2) 内。",
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
    target: "理解并严格证明「任意抛物线在任意闭区间上的拉格朗日中值点恒为区间中点」，同时明白 α≠0 的作用。",
    prerequisites: [
      "会因式分解平方差 d²−c²=(d−c)(d+c)",
      "知道方程两边除以字母系数前必须确认该字母非零",
    ],
    strategy: "parabola-midpoint-proof",
    solution: math`\begin{gathered}\frac{f(d)-f(c)}{d-c}=\alpha(c+d)+\beta\\[4pt]2\alpha\xi+\beta=\alpha(c+d)+\beta\\[4pt]\xrightarrow{\alpha\neq 0}\xi=\frac{c+d}{2}\end{gathered}`,
    solutionExplanation: "消去 β 并利用 α≠0 除以 2α，得到唯一中值点 ξ=(c+d)/2。",
    steps: buildSteps([
      {
        id: "jc935-3-1-4-1",
        goal: "第一步：把 f(d)−f(c) 提取公因子 (d−c) 算出平均斜率",
        plain: "先把 f(d)−f(c) 按同次项配对：α(d²−c²)+β(d−c)，常数 γ 直接抵消。用平方差公式拆出 (d−c)，就能干净地除以 (d−c)。",
        formula: math`\frac{f(d)-f(c)}{d-c}=\frac{\alpha(d^2-c^2)+\beta(d-c)}{d-c}=\alpha(c+d)+\beta`,
        detail: "因 c<d，d−c≠0，可以合法约分。",
        check: {
          prompt: "在计算 [f(d)−f(c)]/(d−c) 时，常数项 γ 去哪儿了？",
          choices: [
            "在 f(d)−f(c) 相减时互相抵消为 0",
            "被除以 (d−c) 变成了 γ/(d−c)",
            "留在结果里变成了 +γ",
          ],
          answer: "在 f(d)−f(c) 相减时互相抵消为 0",
          feedback: {
            "在 f(d)−f(c) 相减时互相抵消为 0": "对，曲线整体上下平移 γ 个单位，不会改变任何割线或切线的斜率。",
            "被除以 (d−c) 变成了 γ/(d−c)": "γ−γ=0，在相减那一步就已经消失了。",
            "留在结果里变成了 +γ": "f(d) 和 f(c) 里各有一个 +γ，一减就没了。",
          },
          prerequisite: "上下平移函数图像，坡度完全不变。",
        },
      },
      {
        id: "jc935-3-1-4-2",
        goal: "第二步：令 2αξ+β=α(c+d)+β，并说明为什么必须用到 α≠0",
        plain: "两边消去 β 得到 2αξ=α(c+d)。要想把 2α 除过去得到唯一解 (c+d)/2，必须明确引用题设 α≠0。",
        formula: math`2\alpha\xi=\alpha(c+d)\xrightarrow{\alpha\neq 0}\xi=\frac{c+d}{2}`,
        detail: "若 α=0，函数退化为直线 βx+γ，区间内每一点都是中值点，不唯一是中点。",
        check: {
          prompt: "如果题目没有给 α≠0，当 α=0 时方程 2αξ=α(c+d) 会发生什么？",
          choices: [
            "变成 0·ξ=0，区间内任意一点都是中值点，不再唯一是中点",
            "方程无解，中值定理失效",
            "解出 ξ=0",
          ],
          answer: "变成 0·ξ=0，区间内任意一点都是中值点，不再唯一是中点",
          feedback: {
            "变成 0·ξ=0，区间内任意一点都是中值点，不再唯一是中点": "对，直线处处与自身割线平行，所以所有内点都满足定理，不能除以 0。",
            "方程无解，中值定理失效": "0·ξ=0 是恒等式，有无穷多解而不是无解。",
            "解出 ξ=0": "不能两边除以 α=0，0·ξ=0 对任何 ξ 都成立。",
          },
          prerequisite: "代数红线：两边同除以字母前，先检查该字母是否可能为 0。",
        },
      },
      {
        id: "jc935-3-1-4-3",
        goal: "第三步：记住这个常用验算结论，并完成迁移题",
        plain: "以后凡是二次函数求拉格朗日中值点，都能用「区间中点」秒验算。",
        formula: math`\xi=\frac{c+d}{2}\in(c,d)`,
        detail: "c<d 保证 (c+d)/2 严格落在 (c, d) 内。",
        transfer: {
          prompt: "迁移练习：设二次函数 f(x)=−5x²+11x−7 在闭区间 [2, 8] 上应用拉格朗日中值定理，直接写出唯一中值点 ξ。",
          answer: 5,
          signFeedback: "二次函数的中值点只取决于区间端点，等于 (2+8)/2。",
          remediation: "因为二次项系数 −5≠0，中值点恒为区间中点 (2+8)/2=5。",
          solution: math`\xi=\frac{2+8}{2}=5\in(2,8)`,
        },
      },
    ]),
  },

  "jc935-3-1-5": {
    target: "熟练运用「相邻零点分段用罗尔定理 + 导数次数封顶」定位高次多项式导方程的全部实根区间。",
    prerequisites: [
      "能直接读出因式分解多项式的零点",
      "理解「至少 k 个」与「至多 k 个」合起来才是「恰有 k 个」",
    ],
    strategy: "rolle-polynomial-intervals",
    solution: math`\begin{gathered}(-2,1),\;(1,4),\;(4,7)\\[4pt]\text{各至少有一个实根}\\[4pt]\deg f'=3\implies\text{恰有 }3\text{ 个实根}\end{gathered}`,
    solutionExplanation: "四零点分三段区间得至少 3 根，三次导数至多 3 根，故恰有 3 根。",
    steps: buildSteps([
      {
        id: "jc935-3-1-5-1",
        goal: "第一步：读出原式四个零点并按升序分段",
        plain: "直接令四个一次因子分别为 0，得到 −2, 1, 4, 7 四个互异实根，按从小到大排成三段相邻闭区间。",
        formula: math`f(-2)=f(1)=f(4)=f(7)=0`,
        detail: "三段闭区间分别为 [−2, 1]、[1, 4]、[4, 7]。",
        check: {
          prompt: "要让每个相邻区间都不重不漏，四个零点必须怎样排列？",
          choices: [
            "按从小到大排成 −2 < 1 < 4 < 7，取相邻配对",
            "任意两两配对，例如 [−2, 7] 和 [1, 4]",
            "把四个零点取平均值后再分段",
          ],
          answer: "按从小到大排成 −2 < 1 < 4 < 7，取相邻配对",
          feedback: {
            "按从小到大排成 −2 < 1 < 4 < 7，取相邻配对": "对，只有相邻配对得到的开区间才互不相交，从而保证找出的三个根互不相同。",
            "任意两两配对，例如 [−2, 7] 和 [1, 4]": "如果区间互相套着，两个区间找到的根可能是同一个点，无法保证互异！",
            "把四个零点取平均值后再分段": "平均值处函数值一般不为 0，不能直接用罗尔定理。",
          },
          prerequisite: "两段开区间没有重叠，里面各自找到的点才一定不重复。",
        },
      },
      {
        id: "jc935-3-1-5-2",
        goal: "第二步：分段套用罗尔定理，再结合导数次数锁定总数",
        plain: "在每段相邻闭区间上用罗尔定理，得到三个互不相交开区间内各至少有一根；再指出 f′(x) 是三次多项式，至多 3 个实根，从而锁死「恰有 3 个」。",
        formula: math`\begin{gathered}\xi_1\in(-2,1),\;\xi_2\in(1,4),\;\xi_3\in(4,7)\\[4pt]\deg f'=3\implies\text{恰有 }3\text{ 个实根}\end{gathered}`,
        detail: "至少 3 个 + 至多 3 个 = 恰好 3 个。",
        check: {
          prompt: "本题中 f′(x)=0 的三个实根里，有没有可能某个根恰好等于 1？",
          choices: [
            "不可能，因为 1 只是原函数 f 的单根，不是重根，且三个根分别在开区间内",
            "有可能，因为区间 [−2, 1] 和 [1, 4] 都包含端点 1",
            "一定等于 1，因为 1 是中间零点",
          ],
          answer: "不可能，因为 1 只是原函数 f 的单根，不是重根，且三个根分别在开区间内",
          feedback: {
            "不可能，因为 1 只是原函数 f 的单根，不是重根，且三个根分别在开区间内": "对，罗尔定理给出的点严格在开区间内部，三根已占满三次方程全部 3 个名额。",
            "有可能，因为区间 [−2, 1] 和 [1, 4] 都包含端点 1": "罗尔定理保证驻点严格在开区间 (−2, 1) 和 (1, 4) 内，不包含端点 1。",
            "一定等于 1，因为 1 是中间零点": "直接代入可知 f′(1)=(1+2)(1−4)(1−7)=54≠0。",
          },
          prerequisite: "开区间 (a, b) 不含端点 a 与 b。",
        },
      },
      {
        id: "jc935-3-1-5-3",
        goal: "第三步：做一道六零点高次多项式迁移题",
        plain: "掌握规律后，不管多少个互异一次因子都能一眼数出导方程实根个数。",
        formula: math`\text{共 }3\text{ 个实根，分别在 }(-2,1),\;(1,4),\;(4,7)\text{ 内}`,
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
    target: "掌握用拉格朗日中值定理推论「区间上导数恒为零 ⇒ 函数恒为常数」证明恒等式，并警惕多段不连通定义域的陷阱。",
    prerequisites: [
      "会用链式法则对 arctan(1/x) 求导",
      "知道零导数推论必须作用在单个连续区间上",
    ],
    strategy: "zero-derivative-identity",
    solution: math`\begin{gathered}f'(x)=\frac{1}{1+x^2}-\frac{1}{x^2+1}\equiv 0\ (x>0)\\[4pt]f(x)\equiv f(1)=\frac{\pi}{4}+\frac{\pi}{4}=\frac{\pi}{2}\end{gathered}`,
    solutionExplanation: "在单个区间 (0, +∞) 上证 f′(x)≡0，再代特殊值 x=1 定出常数为 π/2。",
    steps: buildSteps([
      {
        id: "jc935-3-1-6-1",
        goal: "第一步：构造函数并用链式法则证明 f′(x)≡0",
        plain: "把等式左边记作 f(x)=arctan x+arctan(1/x)。对第二项求导时，外层是 1/(1+(1/x)²)，千万别忘了乘内层 (1/x)′=−1/x²。",
        formula: math`\begin{gathered}f'(x)=\frac{1}{1+x^2}+\frac{1}{1+1/x^2}\cdot\left(-\frac{1}{x^2}\right)\\[4pt]=\frac{1}{1+x^2}-\frac{1}{x^2+1}=0\end{gathered}`,
        detail: "把 −1/x² 乘进分母 (1+1/x²) 恰好变成 x²+1，与第一项完全抵消。",
        check: {
          prompt: "化简 [1/(1+1/x²)]·(−1/x²) 时，把 x² 乘进分母括号里会得到什么？",
          choices: ["−1/(x²+1)", "−1/(1+x⁴)", "1/(x²+1)"],
          answer: "−1/(x²+1)",
          feedback: {
            "−1/(x²+1)": "对，x²·(1+1/x²)=x²+1，加上负号正好是 −1/(x²+1)，与第一项抵消成 0。",
            "−1/(1+x⁴)": "x² 乘以 1/x² 等于 1，不是 x⁴。",
            "1/(x²+1)": "别弄丢了 (1/x)′=−1/x² 带来的负号。",
          },
          prerequisite: "乘分配律：x²(1+1/x²)=x²·1+x²·(1/x²)=x²+1。",
        },
      },
      {
        id: "jc935-3-1-6-2",
        goal: "第二步：用单区间零导数推论定常数，避免跨断点错误",
        plain: "因为 (0, +∞) 是一个连在一起的区间，导数恒为 0 说明高度永远不变。随便挑个最好算的点 x=1 代进去，就锁定了全段的常数。",
        formula: math`f(x)\equiv f(1)=\arctan 1+\arctan 1=\frac{\pi}{2}`,
        detail: "在 x>0 上恒为 π/2；注意不能越过断点 x=0 把这个常数搬到 x<0 上。",
        check: {
          prompt: "如果在 x<0 上也满足 f′(x)≡0，那么当 x<0 时 arctan x+arctan(1/x) 等于 π/2 还是 −π/2？",
          choices: [
            "等于 −π/2，因为 (−∞, 0) 与 (0, +∞) 不连通，要单独代 x=−1 定常数",
            "仍然等于 π/2，因为导数处处为 0",
            "等于 0，因为奇函数加起来抵消",
          ],
          answer: "等于 −π/2，因为 (−∞, 0) 与 (0, +∞) 不连通，要单独代 x=−1 定常数",
          feedback: {
            "等于 −π/2，因为 (−∞, 0) 与 (0, +∞) 不连通，要单独代 x=−1 定常数": "对，x=0 处 1/x 断开了，两段区间各自有独立的常数，代 x=−1 得 −π/4+(−π/4)=−π/2。",
            "仍然等于 π/2，因为导数处处为 0": "零导数推论只在单个连通区间上保证同一个常数，跨过间断点常数可能跳变。",
            "等于 0，因为奇函数加起来抵消": "arctan(−1)=−π/4，两个负角相加得 −π/2 而不是 0。",
          },
          prerequisite: "记住经典反例：阶梯函数在两段区间导数都是 0，但左右高度不同。",
        },
      },
      {
        id: "jc935-3-1-6-3",
        goal: "第三步：用一道零导数恒等式迁移题巩固套路",
        plain: "「构造函数 → 证导数为 0 → 在该区间内代一个好算的点」是证明恒等式的万能三板斧。",
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
    target: "学会发现缺少常数项的多项式自带隐藏零点 f(0)=0，并用罗尔定理把原方程的根转化为导方程的根。",
    prerequisites: [
      "能识别导方程正是原多项式的导数",
      "会在闭区间 [−r, 0] 上应用罗尔定理",
    ],
    strategy: "rolle-hidden-zero-origin",
    solution: math`\begin{gathered}f(-r)=0=f(0)\ (r>0)\\[4pt]\exists\,\xi\in(-r,0),\;f'(\xi)=0\end{gathered}`,
    solutionExplanation: "无常数项给出隐藏零点 f(0)=0，在 [−r, 0] 用罗尔定理即得导方程在 (−r, 0) 有负根。",
    steps: buildSteps([
      {
        id: "jc935-3-1-7-1",
        goal: "第一步：把导方程「积分还原」对应到原多项式 f(x)",
        plain: "看到 nb₀xⁿ⁻¹+(n−1)b₁xⁿ⁻²+⋯+bₙ₋₁=0 别慌，对照题目给的原方程，它正好是原多项式 f(x) 的一阶导数 f′(x)=0！",
        formula: math`f(x)=b_0x^n+b_1x^{n-1}+\cdots+b_{n-1}x`,
        detail: "原多项式在全体实数上连续可导。",
        check: {
          prompt: "为什么能一眼看出原多项式 f(x)=b₀xⁿ+⋯+bₙ₋₁x 一定经过原点？",
          choices: [
            "因为每一项都含有因子 x（没有常数项），代入 x=0 得 f(0)=0",
            "因为题目规定了 b₀=0",
            "因为 n≥2 是偶数",
          ],
          answer: "因为每一项都含有因子 x（没有常数项），代入 x=0 得 f(0)=0",
          feedback: {
            "因为每一项都含有因子 x（没有常数项），代入 x=0 得 f(0)=0": "对，没有常数项意味着 x=0 天生是它的一个零点！",
            "因为题目规定了 b₀=0": "题目没有要求 b₀=0，关键是少了常数项 bₙ。",
            "因为 n≥2 是偶数": "n 可以是奇数也可以是偶数，只要没有常数项就有 f(0)=0。",
          },
          prerequisite: "想用罗尔定理但题目只给了一个根？快检查 x=0 或端点处有没有隐藏零点！",
        },
      },
      {
        id: "jc935-3-1-7-2",
        goal: "第二步：把已知负根 −r 和隐藏零点 0 组成闭区间 [−r, 0]",
        plain: "已知 r>0 所以 −r<0，区间 [−r, 0] 非退化且两端点函数值同为 0。直接套罗尔定理，就得到 (−r, 0) 内至少有一个 f′(ξ)=0。",
        formula: math`f(-r)=f(0)=0\implies\exists\,\xi\in(-r,0),\;f'(\xi)=0`,
        detail: "落在 (−r, 0) 内的 ξ 必然小于 0，即导方程至少有一个负根。",
        check: {
          prompt: "为什么在 (−r, 0) 内找到的 ξ 一定满足「是一个负根」？",
          choices: [
            "因为 r>0，开区间 (−r, 0) 里的每一个数都严格小于 0",
            "因为导函数系数全为负数",
            "因为罗尔定理只能找负根",
          ],
          answer: "因为 r>0，开区间 (−r, 0) 里的每一个数都严格小于 0",
          feedback: {
            "因为 r>0，开区间 (−r, 0) 里的每一个数都严格小于 0": "对，−r<ξ<0 直接说明 ξ 是负的，而且比 −r 更靠近原点。",
            "因为导函数系数全为负数": "系数 bₖ 符号任意，结论来自区间 (−r, 0) 位于负半轴。",
            "因为罗尔定理只能找负根": "罗尔定理只看区间位置，区间在正半轴就找正根，在负半轴就找负根。",
          },
          prerequisite: "数轴上位于 0 左侧的开区间 (−r, 0) 里全是负数。",
        },
      },
      {
        id: "jc935-3-1-7-3",
        goal: "第三步：用一道具体二次多项式迁移题验证直觉",
        plain: "抽掉字母换成具体多项式，感受一下导方程负根夹在 −r 与 0 之间的画面。",
        formula: math`\exists\,\xi\in(-r,0),\quad f'(\xi)=0`,
        detail: "证明完毕。",
        transfer: {
          prompt: "迁移练习：方程 x²+6x=0 有负根 −6 和隐藏零点 0，求其导方程 2x+6=0 落在 (−6, 0) 内的负根 ξ。",
          answer: -3,
          signFeedback: "注意答案是负数，位于 −6 和 0 之间。",
          remediation: "令 f′(ξ)=2ξ+6=0，解得 ξ=−3∈(−6, 0)。",
          solution: math`f'(\xi)=2\xi+6=0\implies\xi=-3\in(-6,0)`,
        },
      },
    ]),
  },

  "jc935-3-1-8": {
    target: "掌握「高阶导数存在性证明 = 连续套用罗尔定理」的核心策略，识别二重因子 (x+1)² 带来的双重归零效应。",
    prerequisites: [
      "会用乘积法则求 [(x+1)²g(x)]′",
      "理解第一次罗尔得到的中值点 η 可以作为第二次罗尔的新端点",
    ],
    strategy: "double-rolle-second-deriv",
    solution: math`\begin{gathered}G(-1)=G(2)=0\\[4pt]\implies\exists\,\eta\in(-1,2),\;G'(\eta)=0\\[4pt]G'(-1)=0=G'(\eta)\\[4pt]\implies\exists\,\xi\in(-1,\eta),\;G''(\xi)=0\end{gathered}`,
    solutionExplanation: "先对 G 在 [−1, 2] 用罗尔得 G′(η)=0，再由 G′(−1)=0 对 G′ 在 [−1, η] 二次用罗尔。",
    steps: buildSteps([
      {
        id: "jc935-3-1-8-1",
        goal: "第一步：对 G(x) 用第一次罗尔定理，找到一阶导零点 η",
        plain: "要证二阶导数 G″(ξ)=0，光靠一次罗尔定理只能降到一阶导 G′。先查 G(−1)=0 与 G(2)=9g(2)=0，在 [−1, 2] 上用第一次罗尔定理，先拿到 η∈(−1, 2) 使 G′(η)=0。",
        formula: math`G(-1)=0=G(2)\implies\exists\,\eta\in(-1,2),\;G'(\eta)=0`,
        detail: "注意区间右端点的 0 来自题设 g(2)=0。",
        check: {
          prompt: "想对 G′(x) 再用一次罗尔定理得到 G″(ξ)=0，现在已经有了 G′(η)=0，还缺什么条件？",
          choices: [
            "还需要找到另一个不同于 η 的点，使 G′ 在那里也等于 0",
            "只需要验证 g(−1)=0",
            "只需要验证 G″(2)=0",
          ],
          answer: "还需要找到另一个不同于 η 的点，使 G′ 在那里也等于 0",
          feedback: {
            "还需要找到另一个不同于 η 的点，使 G′ 在那里也等于 0": "对，罗尔定理需要两个不同端点处函数值相等，所以我们马上去算 G′(−1)。",
            "只需要验证 g(−1)=0": "题目没给 g(−1)=0，G′(−1)=0 靠的是因子 (x+1)² 本身！",
            "只需要验证 G″(2)=0": "题目连 G″(2) 的值都没给，不需要它。",
          },
          prerequisite: "要证 G″=0，就对 G′ 用罗尔定理，因此要给 G′ 找两个零点。",
        },
      },
      {
        id: "jc935-3-1-8-2",
        goal: "第二步：用乘积法则算 G′(x)，发现二重因子给出 G′(−1)=0",
        plain: "对 (x+1)²g(x) 用乘积法则求导，两项里都还留着至少一个 (x+1) 因子，所以代入 x=−1 时根本不用知道 g(−1) 和 g′(−1) 是多少，结果铁定是 0！",
        formula: math`\begin{gathered}G'(x)=2(x+1)g(x)+(x+1)^2g'(x)\\[4pt]G'(-1)=0\end{gathered}`,
        detail: "因为 g 在 [−1, 2] 二阶可导，G′ 在 [−1, η] 连续、在 (−1, η) 可导。",
        check: {
          prompt: "如果题目把 (x+1)² 改成一次因子 (x+1)，即 H(x)=(x+1)g(x)，还能保证 H′(−1)=0 吗？",
          choices: [
            "不能，因为 H′(−1)=g(−1)，题目没说 g(−1)=0",
            "能，因为 H(−1)=0 自动推出 H′(−1)=0",
            "能，因为 g(2)=0",
          ],
          answer: "不能，因为 H′(−1)=g(−1)，题目没说 g(−1)=0",
          feedback: {
            "不能，因为 H′(−1)=g(−1)，题目没说 g(−1)=0": "对，这正是二重因子 (x+1)² 的威力：求一次导后还剩一个 (x+1) 把 −1 处压回 0。",
            "能，因为 H(−1)=0 自动推出 H′(−1)=0": "函数值为 0 不代表切线水平（例如 y=x 在 0 处值为 0，导数是 1）。",
            "能，因为 g(2)=0": "x=2 处的值无法决定 x=−1 处的 g(−1)。",
          },
          prerequisite: "二重零点 (x−a)² 的特征：在 x=a 处函数值和一阶导数同时为 0。",
        },
      },
      {
        id: "jc935-3-1-8-3",
        goal: "第三步：在 [−1, η] 上二次套用罗尔定理，并用具体例子迁移",
        plain: "把 G′(−1)=G′(η)=0 送进罗尔定理，得到 ξ∈(−1, η)⊂(−1, 2) 使 G″(ξ)=0。",
        formula: math`\exists\,\xi\in(-1,\eta)\subset(-1,2),\quad G''(\xi)=0`,
        detail: "证毕。",
        transfer: {
          prompt: "迁移练习：取特例 g(x)=x−2，则 G(x)=(x+1)²(x−2) 满足题设。直接展开或求两次导，求出 (−1, 2) 内使 G″(ξ)=0 的唯一 ξ。",
          answer: 0,
          signFeedback: "先算 G(x)=x³−3x−2，再求二阶导 G″(x)=6x。",
          remediation: "G(x)=(x²+2x+1)(x−2)=x³−3x−2，G′(x)=3x²−3，G″(x)=6x=0 得 ξ=0∈(−1, 2)。",
          solution: math`\begin{gathered}G(x)=x^3-3x-2,\;G''(x)=6x\\[4pt]6\xi=0\implies\xi=0\in(-1,2)\end{gathered}`,
        },
      },
    ]),
  },

  "jc935-3-1-9": {
    target: "掌握「拉格朗日中值定理证双边不等式」的标准流程，并警惕负指数 p−1<0 导致单调性反向的陷阱。",
    prerequisites: [
      "能把目标差值 uᵖ−vᵖ 看作函数 f(x)=xᵖ 在 [v, u] 上的增量",
      "知道当指数为负时，幂函数在 (0, +∞) 上严格递减",
    ],
    strategy: "lagrange-power-inequality",
    solution: math`\begin{gathered}u^p-v^p=p\xi^{p-1}(u-v)\\[4pt]\xi\in(v,u),\quad p-1<0\\[4pt]u^{p-1}<\xi^{p-1}<v^{p-1}\\[4pt]pu^{p-1}(u-v)<u^p-v^p\\[4pt]u^p-v^p<pv^{p-1}(u-v)\end{gathered}`,
    solutionExplanation: "先用中值定理把 uᵖ−vᵖ 换成 pξᵖ⁻¹(u−v)，再由 p−1<0 反向放缩 ξᵖ⁻¹。",
    steps: buildSteps([
      {
        id: "jc935-3-1-9-1",
        goal: "第一步：识别函数 f(x)=xᵖ，在 [v, u] 上应用拉格朗日中值定理",
        plain: "看到不等式中间夹着同结构的差 uᵖ−vᵖ，立刻想到对 f(x)=xᵖ 在闭区间 [v, u] 上用拉格朗日中值定理，把差值改写成导数乘以区间长度。",
        formula: math`u^p-v^p=p\xi^{p-1}(u-v),\quad \xi\in(v,u)`,
        detail: "因 u>v>0，xᵖ 在 [v, u] 连续、在 (v, u) 可导。",
        check: {
          prompt: "为什么本题要对 f(x)=xᵖ 在 [v, u] 上用拉格朗日中值定理，而不是用罗尔定理？",
          choices: [
            "因为 uᵖ 与 vᵖ 不相等，我们需要把差值 uᵖ−vᵖ 改写成 f′(ξ)(u−v)",
            "因为罗尔定理不能用于幂函数",
            "因为 f(x)=xᵖ 在 v 处不连续",
          ],
          answer: "因为 uᵖ 与 vᵖ 不相等，我们需要把差值 uᵖ−vᵖ 改写成 f′(ξ)(u−v)",
          feedback: {
            "因为 uᵖ 与 vᵖ 不相等，我们需要把差值 uᵖ−vᵖ 改写成 f′(ξ)(u−v)": "对，看到 f(u)−f(v) 形式的不等式，首选拉格朗日中值定理把函数差变成导数×(u−v)。",
            "因为罗尔定理不能用于幂函数": "罗尔定理当然可以用于幂函数，只是这里两端点值不相等。",
            "因为 f(x)=xᵖ 在 v 处不连续": "v>0 时幂函数处处连续可导。",
          },
          prerequisite: "识别信号：出现 f(b)−f(a) 和 (b−a) 成对出现，十有八九用拉格朗日中值定理。",
        },
      },
      {
        id: "jc935-3-1-9-2",
        goal: "第二步：盯紧 0<p<1 推出 p−1<0，确定 ξᵖ⁻¹ 的放缩方向",
        plain: "这是本题最容易写反的一步！因为 0<p<1，所以指数 p−1 是负数。负数次幂越大反而越小，因此 v<ξ<u 放缩后不等号要调头。",
        formula: math`0<v<\xi<u\xrightarrow{p-1<0}u^{p-1}<\xi^{p-1}<v^{p-1}`,
        detail: "例如 p=1/2 时，x⁻¹/²=1/√x，分母越大分数值越小。",
        check: {
          prompt: "如果把条件改成 p>1（例如 p=2），由 0<v<ξ<u 放缩 ξᵖ⁻¹ 时不等号方向会怎样？",
          choices: [
            "保持同向：vᵖ⁻¹ < ξᵖ⁻¹ < uᵖ⁻¹",
            "依然反向：uᵖ⁻¹ < ξᵖ⁻¹ < vᵖ⁻¹",
            "两端相等：vᵖ⁻¹ = uᵖ⁻¹",
          ],
          answer: "保持同向：vᵖ⁻¹ < ξᵖ⁻¹ < uᵖ⁻¹",
          feedback: {
            "保持同向：vᵖ⁻¹ < ξᵖ⁻¹ < uᵖ⁻¹": "对，当 p>1 时 p−1>0，xᵖ⁻¹ 严格递增，不等号不反转。",
            "依然反向：uᵖ⁻¹ < ξᵖ⁻¹ < vᵖ⁻¹": "反向只在指数 p−1<0（即 0<p<1）时发生。",
            "两端相等：vᵖ⁻¹ = uᵖ⁻¹": "u>v>0 且 p−1>0 时两者严格不等。",
          },
          prerequisite: "拿具体数试一下最保险：p=1/2 时，9<16 但 1/√16 < 1/√9。",
        },
      },
      {
        id: "jc935-3-1-9-3",
        goal: "第三步：同乘正数 p(u−v) 完成证明，并做数值迁移题",
        plain: "因为 p>0 且 u−v>0，乘以正数不改方向，立刻得到目标双边不等式。",
        formula: math`pu^{p-1}(u-v)<u^p-v^p<pv^{p-1}(u-v)`,
        detail: "证毕。",
        transfer: {
          prompt: "迁移练习：取 p=1/2, v=9, u=16，由 √16−√9=(1/(2√ξ))(16−9) 精确求出中值点 ξ（可用小数表示）。",
          answer: 12.25,
          signFeedback: "先算 1=(7)/(2√ξ)，解出 √ξ=3.5，再平方得 ξ。",
          remediation: "√16−√9=1=7/(2√ξ) 得 √ξ=7/2=3.5，故 ξ=49/4=12.25∈(9, 16)。",
          solution: math`\begin{gathered}1=\frac{16-9}{2\sqrt{\xi}}\implies \sqrt{\xi}=\frac{7}{2}\\[4pt]\xi=\frac{49}{4}=12.25\in(9,16)\end{gathered}`,
        },
      },
    ]),
  },

  "jc935-3-1-10": {
    target: "学会把对数商拆成对数差，再用拉格朗日中值定理与正数取倒数完成对数双边估界。",
    prerequisites: [
      "会用对数性质 ln(A/B)=ln A−ln B",
      "知道正数取倒数会反转不等号方向",
    ],
    strategy: "lagrange-log-bounds",
    solution: math`\begin{gathered}\ln\frac{1+x}{1+y}=\ln(1+x)-\ln(1+y)\\[4pt]\ln\frac{1+x}{1+y}=\frac{x-y}{1+\xi}\\[4pt]0<1+y<1+\xi<1+x\\[4pt]\frac{x-y}{1+x}<\ln\frac{1+x}{1+y}<\frac{x-y}{1+y}\end{gathered}`,
    solutionExplanation: "拆成 ln(1+x)−ln(1+y)，用中值定理化为 (x−y)/(1+ξ)，再确认正性后取倒数。",
    steps: buildSteps([
      {
        id: "jc935-3-1-10-1",
        goal: "第一步：拆开对数商，对 f(t)=ln(1+t) 应用拉格朗日中值定理",
        plain: "把 ln[(1+x)/(1+y)] 写成 ln(1+x)−ln(1+y)，它就是函数 f(t)=ln(1+t) 在 [y, x] 上的高度差。套用拉格朗日中值定理，立刻换出一个带中间点 ξ 的分式。",
        formula: math`\ln(1+x)-\ln(1+y)=\frac{x-y}{1+\xi},\quad \xi\in(y,x)`,
        detail: "因 x>y>−1，在 [y, x] 上 1+t≥1+y>0，故 f(t) 连续可导。",
        check: {
          prompt: "条件里特别强调 x>y>−1（而不是只写 x>y），这主要是为了保证哪两件事？",
          choices: [
            "保证对数真数 1+t>0 有定义，且取倒数时三项同为正数",
            "保证 x−y 等于 1",
            "保证 ln(1+x) 大于 1",
          ],
          answer: "保证对数真数 1+t>0 有定义，且取倒数时三项同为正数",
          feedback: {
            "保证对数真数 1+t>0 有定义，且取倒数时三项同为正数": "对，如果跨过 0（一正一负），取倒数不但不能安全反向，连对数真数都会变负！",
            "保证 x−y 等于 1": "x 和 y 的差可以是任意正数。",
            "保证 ln(1+x) 大于 1": "当 x 接近 0 时 ln(1+x) 接近 0，并不要求大于 1。",
          },
          prerequisite: "正数取倒数才保证严格反向：0<a<b ⇒ 1/b<1/a。",
        },
      },
      {
        id: "jc935-3-1-10-2",
        goal: "第二步：由 0<1+y<1+ξ<1+x 取倒数并同乘正数 x−y",
        plain: "三个正数排好队，取倒数后队形翻转，再乘上正数 x−y，左右两头正好变成题目要证的两个分式。",
        formula: math`\frac{1}{1+x}<\frac{1}{1+\xi}<\frac{1}{1+y}\implies\frac{x-y}{1+x}<\frac{x-y}{1+\xi}<\frac{x-y}{1+y}`,
        detail: "代回 (x−y)/(1+ξ)=ln[(1+x)/(1+y)] 即证。",
        check: {
          prompt: "在这条双边不等式里，左边的 (x−y)/(1+x) 与右边的 (x−y)/(1+y) 各自对应的几何意义是什么？",
          choices: [
            "分别对应区间右端点斜率与左端点斜率乘以区间长度",
            "分别对应原函数在两端点的函数值",
            "分别对应二阶导数在两端点的值",
          ],
          answer: "分别对应区间右端点斜率与左端点斜率乘以区间长度",
          feedback: {
            "分别对应区间右端点斜率与左端点斜率乘以区间长度": "对，1/(1+x) 是右端点较缓的切线斜率，1/(1+y) 是左端点较陡的切线斜率，平均斜率正好夹在中间。",
            "分别对应原函数在两端点的函数值": "原函数值是 ln(1+x) 和 ln(1+y)，1/(1+t) 是它的导数。",
            "分别对应二阶导数在两端点的值": "二阶导数是 −1/(1+t)²，不是 1/(1+t)。",
          },
          prerequisite: "对数曲线越往右越平缓，所以右端斜率最小、左端斜率最大。",
        },
      },
      {
        id: "jc935-3-1-10-3",
        goal: "第三步：用具体数值代入检验这条对数估界",
        plain: "记住这个实用结论：它能不用计算器就快速夹出 ln 2 的上下界。",
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
    target: "掌握用拉格朗日中值定理证明利普希茨不等式 |f(u)−f(v)|≤M|u−v|，并养成单列 u=v 平凡情形的严谨习惯。",
    prerequisites: [
      "会用链式法则求 (sin(2t))′=2cos(2t)",
      "知道中值定理要求闭区间非退化（u≠v）",
    ],
    strategy: "lagrange-lipschitz-sine",
    solution: math`\begin{gathered}u=v\text{ 时显然成立}\\[4pt]u\neq v\text{ 时：}\\[4pt]|\sin(2u)-\sin(2v)|\\[4pt]=2|\cos(2\xi)||u-v|\le 2|u-v|\end{gathered}`,
    solutionExplanation: "先处理 u=v，再对 u≠v 应用中值定理并结合 |cos(2ξ)|≤1 放缩。",
    steps: buildSteps([
      {
        id: "jc935-3-1-11-1-1",
        goal: "第一步：先交代 u=v，再对 u≠v 套拉格朗日中值定理",
        plain: "题目只说「任意实数 u, v」，并没有说 u≠v。如果 u=v，没法构成闭区间，所以先一句话处理 u=v（两边都是 0）。当 u≠v 时，对 f(t)=sin(2t) 用拉格朗日中值定理。",
        formula: math`\sin(2u)-\sin(2v)=2\cos(2\xi)(u-v)`,
        detail: "ξ 严格介于 u 和 v 之间，无需区分谁大谁小。",
        check: {
          prompt: "对 f(t)=sin(2t) 求导时，为什么导数前面会出现常数因子 2？",
          choices: [
            "链式法则要求乘以内层 2t 的导数 2",
            "因为正弦函数的振幅是 2",
            "因为要同时对 u 和 v 求两次导",
          ],
          answer: "链式法则要求乘以内层 2t 的导数 2",
          feedback: {
            "链式法则要求乘以内层 2t 的导数 2": "对，外层 sin w 导数是 cos w，再乘内层 (2t)′=2，得 2cos(2t)。",
            "因为正弦函数的振幅是 2": "sin(2t) 的振幅仍是 1，只是频率加倍，导致最大坡度加倍。",
            "因为要同时对 u 和 v 求两次导": "我们只对单变量函数 f(t) 求一次导。",
          },
          prerequisite: "链式法则：[sin(kt)]′=k·cos(kt)。",
        },
      },
      {
        id: "jc935-3-1-11-1-2",
        goal: "第二步：两边取绝对值，并用 |cos(2ξ)|≤1 放缩掉未知中值点",
        plain: "我们不知道 ξ 具体是多少，但也没必要知道！因为余弦的绝对值永远不会超过 1，取完绝对值直接把 |cos(2ξ)| 放大成 1 就大功告成。",
        formula: math`|\sin(2u)-\sin(2v)|=2|\cos(2\xi)||u-v|\le 2|u-v|`,
        detail: "注意不等号带等号 ≤，因为 u=v 或 cos(2ξ)=±1 时可以取等。",
        check: {
          prompt: "为什么不需要算出 ξ 的具体值，也能完成这条不等式证明？",
          choices: [
            "因为我们对 |f′(ξ)| 有一致上界 |2cos(2ξ)|≤2，对任意 ξ 都成立",
            "因为 ξ 一定等于 0",
            "因为 u−v 一定等于 1",
          ],
          answer: "因为我们对 |f′(ξ)| 有一致上界 |2cos(2ξ)|≤2，对任意 ξ 都成立",
          feedback: {
            "因为我们对 |f′(ξ)| 有一致上界 |2cos(2ξ)|≤2，对任意 ξ 都成立": "对，只要导数绝对值全局不超过 M，就能直接得到 |f(u)−f(v)|≤M|u−v|。",
            "因为 ξ 一定等于 0": "ξ 随 u, v 变化而变化，不一定等于 0。",
            "因为 u−v 一定等于 1": "u, v 是任意实数。",
          },
          prerequisite: "几何直觉：全程最大坡度不超过 2，高度差就不可能超过水平距离的 2 倍。",
        },
      },
      {
        id: "jc935-3-1-11-1-3",
        goal: "第三步：做一道换频率的利普希茨常数迁移题",
        plain: "记住这个规律：|f′(t)|≤M ⇒ |f(u)−f(v)|≤M|u−v|。",
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
    target: "学会从目标切线不等式中反推「该选哪个固定左端点」来构造拉格朗日中值区间。",
    prerequisites: [
      "知道指数函数 eᵗ 导数仍是 eᵗ 且严格递增",
      "会通过让不等式两边相等来找切点（区间左端点）",
    ],
    strategy: "lagrange-exp-tangent",
    solution: math`\begin{gathered}e^x-e^2=e^\xi(x-2),\quad\xi\in(2,x)\\[4pt]e^\xi>e^2\\[4pt]\implies e^x>e^2(x-2)+e^2=e^2(x-1)\end{gathered}`,
    solutionExplanation: "在 [2, x] 上对 eᵗ 用拉格朗日中值定理，由 e^ξ>e² 放缩后移项整理。",
    steps: buildSteps([
      {
        id: "jc935-3-1-11-2-1",
        goal: "第一步：通过找「两边相等的点」精准锁定区间 [2, x]",
        plain: "很多同学看到 eˣ 就习惯选 [0, x]，结果放缩出来是 1+x 而不是 e²(x−1)。窍门是看条件 x>2 且 x=2 时左右两边都等于 e²，所以左端点必须选 2！",
        formula: math`e^x-e^2=e^\xi(x-2),\quad \xi\in(2,x)`,
        detail: "f(t)=eᵗ 在 [2, x] 连续、在 (2, x) 可导。",
        check: {
          prompt: "为什么本题选区间 [2, x] 而不是 [0, x]？",
          choices: [
            "因为 x=2 是切点（两边同为 e²），能直接产生因子 e² 和 (x−2)",
            "因为 eᵗ 在 [0, x] 上不可导",
            "因为 0 不是正数",
          ],
          answer: "因为 x=2 是切点（两边同为 e²），能直接产生因子 e² 和 (x−2)",
          feedback: {
            "因为 x=2 是切点（两边同为 e²），能直接产生因子 e² 和 (x−2)": "对，找准让不等式恰好取等（或边界重合）的点当左端点，目标式就会自然长出来。",
            "因为 eᵗ 在 [0, x] 上不可导": "eᵗ 处处可导，选 [2, x] 是为了对齐目标式的系数 e²。",
            "因为 0 不是正数": "eᵗ 定义域是全体实数，0 完全合法，只是配不出 e²(x−1)。",
          },
          prerequisite: "想证曲线高于某条切线，就把切点的横坐标作为拉格朗日区间的固定端点。",
        },
      },
      {
        id: "jc935-3-1-11-2-2",
        goal: "第二步：利用 e^ξ>e² 放缩并移项整理",
        plain: "因为 ξ>2 且指数函数严格递增，所以 e^ξ>e²；乘上正数 x−2 再把左边的 −e² 移到右边，e²(x−2)+e² 恰好合并成 e²(x−1)。",
        formula: math`e^x-e^2>e^2(x-2)\implies e^x>e^2(x-1)`,
        detail: "注意严格不等号 >，因为 ξ>2 且 x−2>0。",
        check: {
          prompt: "把 e²(x−2)+e² 合并同类项时，提取公因式 e² 后括号里变成什么？",
          choices: ["x−1", "x−3", "x−2"],
          answer: "x−1",
          feedback: {
            "x−1": "对，e²(x−2)+e²·1=e²(x−2+1)=e²(x−1)。",
            "x−3": "加 1 而不是减 1，−2+1=−1。",
            "x−2": "别忘了后面加上的那个 +e² 贡献了 +1。",
          },
          prerequisite: "分配律逆用：A(x−2)+A=A[(x−2)+1]=A(x−1)。",
        },
      },
      {
        id: "jc935-3-1-11-2-3",
        goal: "第三步：用 x>3 的同类切线不等式检验迁移",
        plain: "举一反三：在任意切点 a 处，对 x>a 都有 eˣ>eᵃ(x−a+1)。",
        formula: math`e^x>e^2(x-1)\quad (x>2)`,
        detail: "证毕。",
        transfer: {
          prompt: "迁移练习：仿照本题在 [3, x]（x>3）上证明 eˣ>e³(x−k)，求出括号里的常数 k。",
          answer: 2,
          signFeedback: "由 eˣ−e³>e³(x−3) 移项得 eˣ>e³(x−3+1)，看括号里的常数。",
          remediation: "eˣ>e³(x−3)+e³=e³(x−2)，因此 k=2。",
          solution: math`\begin{gathered}e^x-e^3=e^\xi(x-3)>e^3(x-3)\\[4pt]e^x>e^3(x-2)\implies k=2\end{gathered}`,
        },
      },
    ]),
  },

  "jc935-3-1-12": {
    target: "掌握高数考试最高频题型「方程有且仅有一个实根」的标准两步模板：零点定理证存在 + 罗尔定理反证法证唯一。",
    prerequisites: [
      "会用闭区间连续函数的零点存在定理",
      "会用罗尔定理导出与 f′(x)>0 的矛盾",
    ],
    strategy: "ivt-plus-rolle-unique-root",
    solution: math`\begin{gathered}f(0)=-2<0,\;f(1)=2>0\\[4pt]\implies\exists\,x_1\in(0,1),\;f(x_1)=0\\[4pt]f'(x)=3x^2+3\ge 3>0\\[4pt]\xrightarrow{\text{罗尔反证}}\text{唯一正根}\end{gathered}`,
    solutionExplanation: "先由零点定理得存在正根，再反设两正根用罗尔定理推出 f′(ξ)=0 与 f′(x)≥3>0 矛盾。",
    steps: buildSteps([
      {
        id: "jc935-3-1-12-1",
        goal: "第一步：零点定理证「存在」（至少有一个正根）",
        plain: "「有且仅有」是两句话：先证「有」。挑两个好算的端点 0 和 1 代进 f(x)=x³+3x−2，一负一正，连续曲线穿过 x 轴就保证了 (0, 1) 里至少有一个正根。",
        formula: math`\begin{gathered}f(0)=-2<0,\;f(1)=2>0\\[4pt]\implies\exists\,x_1\in(0,1),\;f(x_1)=0\end{gathered}`,
        detail: "多项式在 [0, 1] 连续，满足零点定理条件。",
        check: {
          prompt: "为什么在第一步已经算出 f′(x)=3x²+3>0 说明严格递增后，仍然必须找 f(0)<0 和 f(1)>0？",
          choices: [
            "严格递增只能保证「至多一个根」，不能保证一定穿过 x 轴（例如 eˣ 恒递增但没有实根）",
            "因为不找两个端点就没法求导",
            "因为多项式可能不连续",
          ],
          answer: "严格递增只能保证「至多一个根」，不能保证一定穿过 x 轴（例如 eˣ 恒递增但没有实根）",
          feedback: {
            "严格递增只能保证「至多一个根」，不能保证一定穿过 x 轴（例如 eˣ 恒递增但没有实根）": "对，一针见血！存在性靠零点定理（两端异号），唯一性靠导数保号或罗尔反证。",
            "因为不找两个端点就没法求导": "求导完全不需要端点值。",
            "因为多项式可能不连续": "多项式处处连续，找端点是为了给出异号证据。",
          },
          prerequisite: "牢记「有且仅有」= 存在性（≥1，零点定理）+ 唯一性（≤1，罗尔定理反证）。",
        },
      },
      {
        id: "jc935-3-1-12-2",
        goal: "第二步：用罗尔定理反证法证「唯一」（至多一个正根）",
        plain: "再证「仅有」。假设存在两个不同正根 x₁<x₂，在 [x₁, x₂] 上用罗尔定理，必然存在某个 ξ 使 f′(ξ)=0；但算出来 f′(x)=3x²+3 永远 ≥3>0，直接矛盾！",
        formula: math`\begin{gathered}f(x_1)=f(x_2)=0\\[4pt]\implies\exists\,\xi,\;f'(\xi)=0\\[4pt]\text{与 }3x^2+3>0\text{ 矛盾}\end{gathered}`,
        detail: "反证成立，正根至多一个。",
        check: {
          prompt: "在用罗尔定理反证唯一性时，矛盾的焦点是什么？",
          choices: [
            "罗尔定理推出必有 f′(ξ)=0，而实际导数 3x²+3 处处严格大于 0",
            "假设两根后得出 f(0)>0",
            "导函数 3x²+3 在 x=0 处无定义",
          ],
          answer: "罗尔定理推出必有 f′(ξ)=0，而实际导数 3x²+3 处处严格大于 0",
          feedback: {
            "罗尔定理推出必有 f′(ξ)=0，而实际导数 3x²+3 处处严格大于 0": "对，一边说「必须有平切点」，一边说「全程都在爬坡从不放平」，矛盾立现。",
            "假设两根后得出 f(0)>0": "f(0)=−2 是已知事实，不会因假设改变。",
            "导函数 3x²+3 在 x=0 处无定义": "x=0 时导数等于 3，完全有定义。",
          },
          prerequisite: "3x²≥0 恒成立，所以 3x²+3≥3>0，永远不可能等于 0。",
        },
      },
      {
        id: "jc935-3-1-12-3",
        goal: "第三步：用一道五次方程迁移题秒杀同类题",
        plain: "遇到高次方程问实根个数，永远先算导数看它是不是恒正或恒负。",
        formula: math`\text{在 }(0,+\infty)\text{ 内有且仅有一个正实根}`,
        detail: "证毕。",
        transfer: {
          prompt: "迁移练习：方程 x⁵+5x−3=0 在全体实数 R 上共有几个实根？",
          answer: 1,
          signFeedback: "先算 f(0)=−3<0、f(1)=3>0，再看导数 f′(x)=5x⁴+5 的符号。",
          remediation: "f(0)f(1)<0 证至少 1 根；f′(x)=5x⁴+5≥5>0 用罗尔反证得至多 1 根，故恰有 1 个实根。",
          solution: math`\begin{gathered}f(0)=-3<0,\;f(1)=3>0\\[4pt]f'(x)=5x^4+5\ge 5>0\implies\text{恰有 }1\text{ 个实根}\end{gathered}`,
        },
      },
    ]),
  },

  "jc935-3-1-13": {
    target: "学会用「把行列式一列里的常数端点替换为动点 x」的方法构造辅助函数，突破中值定理构造难点。",
    prerequisites: [
      "会展开二阶行列式 ad−bc",
      "知道行列式两列相同时值为 0，交换两列变号",
    ],
    strategy: "auxiliary-determinant-mvt",
    solution: math`\begin{gathered}\Phi(x)=\begin{vmatrix}u(b)&u(x)\\v(b)&v(x)\end{vmatrix},\;\Phi(b)=0\\[4pt]\Phi(b)-\Phi(a)=(b-a)\Phi'(\xi)\end{gathered}`,
    solutionExplanation: "固定含 b 的列、把导数列换成动点 x 构造 Φ(x)，再套用拉格朗日中值定理。",
    steps: buildSteps([
      {
        id: "jc935-3-1-13-1",
        goal: "第一步：把结论右边行列式里的 ξ 导数列还原成动点 x，构造辅助函数",
        plain: "构造辅助函数不用靠猜！看结论右边的行列式：第一列是常数 (u(b), v(b))，第二列是导数 (u′(ξ), v′(ξ))。把导数还原成原函数、把 ξ 换成 x，辅助函数 Φ(x) 就自动现身了！",
        formula: math`\Phi(x)=\begin{vmatrix}u(b)&u(x)\\v(b)&v(x)\end{vmatrix}=u(b)v(x)-v(b)u(x)`,
        detail: "因为 u(b)、v(b) 是常数，对 x 求导立刻得 Φ′(x)=u(b)v′(x)−v(b)u′(x)。",
        check: {
          prompt: "把 Φ(x)=u(b)v(x)−v(b)u(x) 对 x 求导时，为什么 u(b) 和 v(b) 不需要用乘积法则求导？",
          choices: [
            "因为 b 是固定端点，u(b) 和 v(b) 只是常数系数",
            "因为 u 和 v 的导数在 b 处等于 0",
            "因为行列式求导可以直接忽略第一列",
          ],
          answer: "因为 b 是固定端点，u(b) 和 v(b) 只是常数系数",
          feedback: {
            "因为 b 是固定端点，u(b) 和 v(b) 只是常数系数": "对，x 才是变量，u(b)、v(b) 在求导时就是普通数字系数，直接提出来。",
            "因为 u 和 v 的导数在 b 处等于 0": "题目没说它们导数为 0，而是因为它们本身不含变量 x。",
            "因为行列式求导可以直接忽略第一列": "只有常数列才不变，如果第一列也含 x 就必须用行列式求导法则。",
          },
          prerequisite: "分清变量 x 和固定常数 b，是构造辅助函数最关键的一步。",
        },
      },
      {
        id: "jc935-3-1-13-2",
        goal: "第二步：算 Φ(b) 与 Φ(a)，留意列序翻转正好补回负号",
        plain: "代入 x=b，行列式两列完全相同，所以 Φ(b)=0。代入 x=a，得到 u(b)v(a)−v(b)u(a)，刚好是目标左边行列式的相反数，于是 Φ(b)−Φ(a)=0−Φ(a) 负负得正！",
        formula: math`\begin{gathered}\Phi(b)=0\\[4pt]\Phi(b)-\Phi(a)=-\Phi(a)\\[4pt]=u(a)v(b)-v(a)u(b)\end{gathered}`,
        detail: "套用拉格朗日中值定理 Φ(b)−Φ(a)=(b−a)Φ′(ξ)，两边瞬间对齐。",
        check: {
          prompt: "在 Φ(b)−Φ(a) 中，为什么 −Φ(a) 恰好等于以 (u(a), v(a)) 为第一列、(u(b), v(b)) 为第二列的行列式？",
          choices: [
            "因为 Φ(a) 两列顺序是 (b, a)，加负号等价于交换两列变成 (a, b)",
            "因为 Φ(a) 恒等于 0",
            "因为交换两行不改变行列式符号",
          ],
          answer: "因为 Φ(a) 两列顺序是 (b, a)，加负号等价于交换两列变成 (a, b)",
          feedback: {
            "因为 Φ(a) 两列顺序是 (b, a)，加负号等价于交换两列变成 (a, b)": "对，−[u(b)v(a)−v(b)u(a)]=u(a)v(b)−v(a)u(b)，符号严丝合缝。",
            "因为 Φ(a) 恒等于 0": "是 Φ(b)=0，不是 Φ(a)=0。",
            "因为交换两行不改变行列式符号": "交换两行或两列都会使行列式变号。",
          },
          prerequisite: "二阶行列式性质：−(bc−ad)=ad−bc。",
        },
      },
      {
        id: "jc935-3-1-13-3",
        goal: "第三步：代具体函数 u(x)=x, v(x)=x² 体验这条行列式公式",
        plain: "抽象定理代一组简单函数算一遍，立刻就能摸透它的脾气。",
        formula: math`\begin{vmatrix}u(a)&u(b)\\v(a)&v(b)\end{vmatrix}=(b-a)\begin{vmatrix}u(b)&u'(\xi)\\v(b)&v'(\xi)\end{vmatrix}`,
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
    target: "掌握「乘以反向指数因子 e⁻ᵏˣ 构造辅助函数」证明微分关系唯一解，避免未经证明就除以 f(x) 产生除零漏洞。",
    prerequisites: [
      "会用乘积法则和链式法则求 [f(x)e⁻³ˣ]′",
      "会用零导数推论由 F′(x)≡0 推出 F(x)≡F(0)",
    ],
    strategy: "auxiliary-exp-factor",
    solution: math`\begin{gathered}F(x)=f(x)e^{-3x}\\[4pt]F'(x)=[f'(x)-3f(x)]e^{-3x}\equiv 0\\[4pt]F(x)\equiv F(0)=2\\[4pt]\implies f(x)=2e^{3x}\end{gathered}`,
    solutionExplanation: "乘上 e⁻³ˣ 构造处处可导的 F(x)，证其导数恒为零，再由初值锁定常数 2。",
    steps: buildSteps([
      {
        id: "jc935-3-1-14-1",
        goal: "第一步：乘以 e⁻³ˣ 构造辅助函数，绕开除零陷阱",
        plain: "想把 f′(x)−3f(x)=0 凑成一个乘积的导数，给两边乘上「反向指数因子」e⁻³ˣ，它正好把 −3f(x) 吸收进 [f(x)e⁻³ˣ]′ 里，而且全程不需要假设 f(x)≠0。",
        formula: math`F(x)=f(x)e^{-3x}`,
        detail: "因 f(x) 和 e⁻³ˣ 处处可导，F(x) 在 (−∞, +∞) 内处处可导。",
        check: {
          prompt: "为什么本题不建议直接两边除以 f(x) 写成 f′(x)/f(x)=3 再积分？",
          choices: [
            "因为题目还没证明 f(x) 处处不为 0，直接作分母存在除零逻辑漏洞",
            "因为 f′(x)/f(x) 无法求导",
            "因为 e³ˣ 不能取对数",
          ],
          answer: "因为题目还没证明 f(x) 处处不为 0，直接作分母存在除零逻辑漏洞",
          feedback: {
            "因为题目还没证明 f(x) 处处不为 0，直接作分母存在除零逻辑漏洞": "对，乘以 e⁻³ˣ 是满分严谨写法，一举避开除零和取对数符号问题。",
            "因为 f′(x)/f(x) 无法求导": "问题不在求导，而在未经证明就把可能为 0 的 f(x) 放进分母。",
            "因为 e³ˣ 不能取对数": "e³ˣ>0 当然能取对数，但前提得先证明 f(x) 就是 2e³ˣ 而不是反过来循环论证。",
          },
          prerequisite: "构造辅助函数口诀：看到 f′(x)−kf(x)=0，立刻想到 F(x)=f(x)e⁻ᵏˣ。",
        },
      },
      {
        id: "jc935-3-1-14-2",
        goal: "第二步：求导证 F′(x)≡0，再用初值 f(0)=2 定常数",
        plain: "用乘积法则展开 F′(x)，把公因子 e⁻³ˣ 提出来，括号里正好是 f′(x)−3f(x)=0！于是 F(x) 在整条实轴上恒为常数，代 x=0 算出它等于 2。",
        formula: math`\begin{gathered}F'(x)=[f'(x)-3f(x)]e^{-3x}\equiv 0\\[4pt]F(x)\equiv F(0)=f(0)e^0=2\end{gathered}`,
        detail: "由 f(x)e⁻³ˣ=2 两边同乘 e³ˣ 得 f(x)=2e³ˣ。",
        check: {
          prompt: "对 F(x)=f(x)e⁻³ˣ 求导时，第二项 f(x)·(e⁻³ˣ)′ 等于什么？",
          choices: ["−3f(x)e⁻³ˣ", "3f(x)e⁻³ˣ", "−f(x)e⁻³ˣ"],
          answer: "−3f(x)e⁻³ˣ",
          feedback: {
            "−3f(x)e⁻³ˣ": "对，链式法则给出 (e⁻³ˣ)′=−3e⁻³ˣ，正好与第一项拼出 f′(x)−3f(x)。",
            "3f(x)e⁻³ˣ": "内层 −3x 的导数是 −3，漏掉负号就凑不出 f′−3f 了。",
            "−f(x)e⁻³ˣ": "漏乘了内层导数系数 3。",
          },
          prerequisite: "链式法则：(eᵏˣ)′=keᵏˣ。",
        },
      },
      {
        id: "jc935-3-1-14-3",
        goal: "第三步：完成一道同型辅助函数常量迁移题",
        plain: "把方程变成「某个辅助函数导数恒为 0」，就能凭一个初值锁定整条曲线。",
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
    target: "理解反复套用柯西中值定理「同步求导降阶 + 中值点步步逼近 a」的思想，它正是泰勒公式拉格朗日余项的雏形。",
    prerequisites: [
      "熟悉柯西中值定理的增量比与导数比形式",
      "知道 (t−a)ⁿ 连续求导 n 次得到 n!",
    ],
    strategy: "iterated-cauchy-taylor-bridge",
    solution: math`\begin{gathered}\frac{f(x)}{(x-a)^n}=\frac{f'(\xi_1)}{n(\xi_1-a)^{n-1}}\\[4pt]=\cdots=\frac{f^{(n)}(\xi_n)}{n!}\\[4pt]\xi_n=a+\theta(x-a)\ (0<\theta<1)\end{gathered}`,
    solutionExplanation: "利用 f(a)=⋯=f⁽ⁿ⁻¹⁾(a)=0 连用 n 次柯西中值定理降到 n 阶导数，再用 θ 表示区间内点。",
    steps: buildSteps([
      {
        id: "jc935-3-1-15-1",
        goal: "第一步：配对 f(t) 与 (t−a)ⁿ，迈出第一次柯西降阶",
        plain: "条件给了 f(a)=0，正好可以把分子 f(x) 改写成增量 f(x)−f(a)，分母 (x−a)ⁿ 改写成 (x−a)ⁿ−0。在 a 和 x 之间用一次柯西中值定理，分子降成一阶导，分母次数减 1 并掉出一个因子 n。",
        formula: math`\frac{f(x)-f(a)}{(x-a)^n-0}=\frac{f'(\xi_1)}{n(\xi_1-a)^{n-1}}`,
        detail: "ξ₁ 严格介于 a 与 x 之间，所以 (ξ₁−a)ⁿ⁻¹≠0。",
        check: {
          prompt: "为什么这里必须用柯西中值定理，而不能只对分子用一次拉格朗日中值定理？",
          choices: [
            "因为需要分子分母同步求导，把分母的 (x−a)ⁿ 逐次降阶成 n! 并锁定同一个中值点",
            "因为拉格朗日中值定理不能在含参数 a 的区间上使用",
            "因为 f(a)=0 只允许用柯西中值定理",
          ],
          answer: "因为需要分子分母同步求导，把分母的 (x−a)ⁿ 逐次降阶成 n! 并锁定同一个中值点",
          feedback: {
            "因为需要分子分母同步求导，把分母的 (x−a)ⁿ 逐次降阶成 n! 并锁定同一个中值点": "对，如果分子分母分开用定理会产生两个不同的中值点，而且降不出 n!。",
            "因为拉格朗日中值定理不能在含参数 a 的区间上使用": "拉格朗日中值定理完全支持字母区间，只是无法同步消掉 (x−a)ⁿ。",
            "因为 f(a)=0 只允许用柯西中值定理": "f(a)=0 是为了让每一轮都能凑出「减端点值=0」的增量形式。",
          },
          prerequisite: "柯西中值定理的最大特长：同时对分子分母求导，且两边共享同一个 ξ。",
        },
      },
      {
        id: "jc935-3-1-15-2",
        goal: "第二步：连用 n−1 次降阶到 n 阶导数，并用 θ∈(0, 1) 表示 ξₙ",
        plain: "因为 f′(a)=⋯=f⁽ⁿ⁻¹⁾(a)=0，同样的动作可以连做 n 次！每做一次，新的中值点就往 a 再缩一步，分母系数依次乘出 n·(n−1)⋯1=n!。最后把严格夹在 a 和 x 之间的 ξₙ 写成 a+θ(x−a)。",
        formula: math`\frac{f'(\xi_1)}{n(\xi_1-a)^{n-1}}=\cdots=\frac{f^{(n)}(\xi_n)}{n!},\quad \xi_n=a+\theta(x-a)`,
        detail: "无论 x>a 还是 x<a，只要 ξₙ 严格介于 a 与 x 之间，比例 θ=(ξₙ−a)/(x−a) 恒满足 0<θ<1。",
        check: {
          prompt: "当 x<a 时，如果 ξₙ 严格位于开区间 (x, a) 内，写成 ξₙ=a+θ(x−a) 后 θ 的范围是什么？",
          choices: [
            "依然是 0 < θ < 1",
            "变成 −1 < θ < 0",
            "变成 θ > 1",
          ],
          answer: "依然是 0 < θ < 1",
          feedback: {
            "依然是 0 < θ < 1": "对，此时 ξₙ−a 和 x−a 同为负数，负负得正且 |ξₙ−a|<|x−a|，所以 θ 依然严格在 (0, 1) 内！",
            "变成 −1 < θ < 0": "分子 ξₙ−a 与分母 x−a 同号（同负），商是正数不是负数。",
            "变成 θ > 1": "ξₙ 比 x 更靠近 a，因此 |ξₙ−a|<|x−a|，比值一定小于 1。",
          },
          prerequisite: "这就是写 a+θ(x−a) 的妙处：不用分 x>a 还是 x<a 两种情况讨论！",
        },
      },
      {
        id: "jc935-3-1-15-3",
        goal: "第三步：代一个三次多项式体验 n 次降阶后的常数比值",
        plain: "这个证明过程就是下一章泰勒公式拉格朗日余项的核心引擎。",
        formula: math`\frac{f(x)}{(x-a)^n}=\frac{f^{(n)}(a+\theta(x-a))}{n!}\quad (0<\theta<1)`,
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

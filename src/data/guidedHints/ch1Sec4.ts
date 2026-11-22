import type { GuidedHint } from "../learning";

const math = String.raw;

export const ch1Sec4GuidedHints: Record<string, GuidedHint[]> = {
  "jc935-1-4-1": [
    {
      change: "分别看分子和分母的趋势",
      text: "当 x 趋近 2 时，(x−2)² 趋近 0，所以分子 6(x−2)² 和分母 4(x−2)² 都是无穷小。0/0 是未定式，不能直接当作 0。",
      formula: math`\begin{gathered}
        6(x-2)^2\to 0,\quad 4(x-2)^2\to 0\\[4pt]
        \lim_{x\to 2}\frac{6(x-2)^2}{4(x-2)^2}
      \end{gathered}`,
    },
    {
      change: "在 x≠2 时约掉公因式 (x−2)²",
      text: "求 x→2 的极限只考察靠近 2 但不等于 2 的点，此时 (x−2)²≠0，可以合法约掉分子和分母共同的平方因子。",
      formula: math`\lim_{x\to 2}\frac{6}{4}`,
    },
    {
      change: "化简常数商并下结论",
      text: "约分后表达式已经不含 x，它恒等于一个非零常数。请先化简 6/4 判断极限是不是 0，再据此回答“两个无穷小的商是否一定是无穷小”，最后对照参考解答。",
      formula: math`\frac{6}{4}=\;?`,
    },
  ],

  "jc935-1-4-2-1": [
    {
      change: "把分子拆成平方差",
      text: "分子 x²−25 是平方差，可以先因式分解为 (x−5)(x+5)，分母 x+5 先照抄不动。",
      formula: math`f(x)=\frac{(x-5)(x+5)}{x+5}`,
    },
    {
      change: "在 5 的邻域内约掉 x+5",
      text: "要证明 x→5 时的性质，只需看 5 附近的点。先限制 |x−5|<1（即 4<x<6），就能保证分母 x+5>9 不为零，从而合法约分。",
      formula: math`\begin{gathered}
        |x-5|<1\Longrightarrow x+5\ne 0\\[4pt]
        f(x)=x-5
      \end{gathered}`,
    },
    {
      change: "写出无穷小的目标不等式",
      text: "无穷小就是极限为 0。对任意给定的 ε>0，我们需要让 |f(x)−0|<ε，代入化简后的表达式就是 |x−5|<ε。",
      formula: math`|f(x)-0|=|x-5|<\varepsilon`,
    },
    {
      change: "合并两个距离条件选出 δ",
      text: "前面用到了两个条件：|x−5|<1（保证约分合法）和 |x−5|<ε（保证输出够小）。请把这两个上界合并成一个 δ（用 min），补齐“任给 ε>0，存在 δ>0……”的完整证明，再对照参考解答。",
      formula: math`\begin{gathered}
        0<|x-5|<1\\[4pt]
        0<|x-5|<\varepsilon
      \end{gathered}`,
    },
  ],

  "jc935-1-4-2-2": [
    {
      change: "先取绝对值并拆开因子",
      text: "注意 x→2 时 cos(1/(x−2)) 会剧烈振荡，本身没有极限，不能单独求极限。先把整个 f(x) 加上绝对值，拆成各因子绝对值的乘积。",
      formula: math`\begin{gathered}
        x\ne 2:\\[4pt]
        |f(x)|=3|x-2|\left|\cos\frac{1}{x-2}\right|
      \end{gathered}`,
    },
    {
      change: "用 |cos t|≤1 放缩掉振荡因子",
      text: "无论 1/(x−2) 取什么实数，余弦的绝对值都不会超过 1。把余弦绝对值放大成 1，就得到一个不含振荡的简单上界。",
      formula: math`|f(x)|\le 3|x-2|`,
    },
    {
      change: "让更强的上界小于 ε",
      text: "只要让这个更大的上界 3|x−2| 小于 ε，原来的 |f(x)| 就一定小于 ε。请把下面的不等式两边除以 3，解出 δ 的取法并写出完整的 ε–δ 证明，再对照参考解答。",
      formula: math`3|x-2|<\varepsilon`,
    },
  ],

  "jc935-1-4-3": [
    {
      change: "取绝对值并用倒三角不等式",
      text: "要证 |f(x)|→+∞，先给 f(x) 套上绝对值，再用倒三角不等式 |a−b|≥|a|−|b| 把常数 3 拆出来，得到一个方便控制的下界。",
      formula: math`\begin{gathered}
        |f(x)|=\left|\frac{2}{x-1}-3\right|\\[4pt]
        |f(x)|\ge \frac{2}{|x-1|}-3
      \end{gathered}`,
    },
    {
      change: "让更小的下界超过门槛 M",
      text: "任给正门槛 M>0，只要让下界 2/|x−1|−3 大于 M，就必然有 |f(x)|>M。",
      formula: math`\frac{2}{|x-1|}-3>M`,
    },
    {
      change: "移项把常数合并到右边",
      text: "把 −3 移到不等式右边。此时左右两边都是正数，下一步就能放心取倒数（注意取倒数时不等号要反向）。",
      formula: math`\frac{2}{|x-1|}>M+3`,
    },
    {
      change: "解出 |x−1| 上界并代入 M=700",
      text: "请把上式取倒数并乘 2，解出关于 M 的距离上界 δ 来完成一般证明；再把 M=700 代入同一个公式，算出具体的距离条件，最后对照参考解答。",
      formula: math`\begin{gathered}
        0<|x-1|<\;?\\[4pt]
        M=700\Longrightarrow 0<|x-1|<\;?
      \end{gathered}`,
    },
  ],

  "jc935-1-4-4-1": [
    {
      change: "用分母 x 分别除分子两项",
      text: "当 |x|→∞ 时 x 不会等于 0，可以把分式按分子两项拆开，分出常数部分和随 x 变化的部分。",
      formula: math`\lim_{|x|\to\infty}\left(5-\frac{7}{x}\right)`,
    },
    {
      change: "判断哪一项在远端趋于零",
      text: "无论 x 走向正无穷还是负无穷，|x| 都无限增大，因此 7/x 的绝对值趋于 0；而常数 5 保持不变。",
      formula: math`\begin{gathered}
        |x|\to\infty:\\[4pt]
        \left|\frac{7}{x}\right|=\frac{7}{|x|}\to 0
      \end{gathered}`,
    },
    {
      change: "把两部分合起来得出极限",
      text: "固定常数减去趋于 0 的小尾巴，两端都逼近同一个数。请指明趋于零的部分并写出最终极限，再对照参考解答。",
      formula: math`5-0=\;?`,
    },
  ],

  "jc935-1-4-4-2": [
    {
      change: "用平方差分解分子",
      text: "先把分子 9−x² 写成 3²−x²，按平方差公式拆成两个一次因子的乘积，分母 3−x 先保持不变。",
      formula: math`\lim_{x\to 1}\frac{(3-x)(3+x)}{3-x}`,
    },
    {
      change: "确认分母不为零后约分",
      text: "x 趋近的是 1 而不是 3。在 1 的充分小邻域（如 |x−1|<1）内，3−x 靠近 2 且恒不为零，因此可以合法约掉 3−x。",
      formula: math`\lim_{x\to 1}(3+x)`,
    },
    {
      change: "把 x=1 直接代入连续函数",
      text: "剩下的 3+x 是一次函数，在 x=1 处连续，可以直接代入求值。请算出结果并简要说明为何在 x=1 附近能约分，再对照参考解答。",
      formula: math`3+1=\;?`,
    },
  ],

  "jc935-1-4-5-1": [
    {
      change: "写出输出靠近 −3 的不等式",
      text: "输出目标是有限数 −3，先由对方任给正容差 ε>0。量 f(x) 到 −3 的距离是 |f(x)−(−3)|，化简后是 |f(x)+3|，别错写成 |f(x)−3|。",
      formula: math`\begin{gathered}
        \forall \varepsilon>0\\[4pt]
        |f(x)-(-3)|<\varepsilon\\[4pt]
        \iff |f(x)+3|<\varepsilon
      \end{gathered}`,
    },
    {
      change: "写出输入从两侧靠近 2 的范围",
      text: "输入从左右两侧靠近 2 且不取 2 本身，用去心邻域表示：存在正数 δ>0，要求 x 与 2 的距离严格大于 0 且小于 δ。",
      formula: math`\begin{gathered}
        \exists \delta>0\\[4pt]
        0<|x-2|<\delta
      \end{gathered}`,
    },
    {
      change: "按“先输出、再输入”拼出定义",
      text: "量词顺序必须是先“任意 ε>0”，再“存在 δ>0”，然后对定义域内所有满足输入范围的 x 推出输出不等式。请把前两步填入下面骨架并说明先后顺序，再对照参考解答。",
      formula: math`\begin{gathered}
        \forall \varepsilon>0,\ \exists \delta>0\\[4pt]
        \forall x\in D_f:\\[4pt]
        (\text{输入范围})\Longrightarrow(\text{输出要求})
      \end{gathered}`,
    },
  ],

  "jc935-1-4-5-2": [
    {
      change: "写出绝对值趋于无穷的输出要求",
      text: "目标只要求 |f(x)| 无限增大，无论正负。先由对方任给正门槛 M>0，要求 |f(x)|>M（不能随意去掉绝对值写成 f(x)>M）。",
      formula: math`\begin{gathered}
        \forall M>0\\[4pt]
        |f(x)|>M
      \end{gathered}`,
    },
    {
      change: "写出输入从两侧靠近 2 的范围",
      text: "输入从左右两侧靠近 2 且排除 x=2 本身，所以需要找到一个正半径 δ>0，用去心邻域刻画。",
      formula: math`\begin{gathered}
        \exists \delta>0\\[4pt]
        0<|x-2|<\delta
      \end{gathered}`,
    },
    {
      change: "按“先门槛 M、再半径 δ”拼出定义",
      text: "先写任意正门槛 M>0，再写存在输入半径 δ>0，确保定义域内满足去心邻域的每个 x 都满足输出要求。请补全完整定义并说明先后顺序，再对照参考解答。",
      formula: math`\begin{gathered}
        \forall M>0,\ \exists \delta>0\\[4pt]
        \forall x\in D_f:\\[4pt]
        (\text{输入范围})\Longrightarrow(\text{输出要求})
      \end{gathered}`,
    },
  ],

  "jc935-1-4-5-3": [
    {
      change: "写出输出趋于正无穷的不等式",
      text: "目标是正无穷，输出不仅要很大，还必须是正数。先任给正门槛 M>0，要求 f(x)>M（不要加绝对值，否则大负数也会混进来）。",
      formula: math`\begin{gathered}
        \forall M>0\\[4pt]
        f(x)>M
      \end{gathered}`,
    },
    {
      change: "写出输入从两侧靠近 2 的范围",
      text: "输入从两侧靠近 2 且不等于 2，需要找到正数 δ>0，使 x 落在 2 的去心 δ 邻域内。",
      formula: math`\begin{gathered}
        \exists \delta>0\\[4pt]
        0<|x-2|<\delta
      \end{gathered}`,
    },
    {
      change: "按“先门槛 M、再半径 δ”拼出定义",
      text: "先由对方指定任意 M>0，再由我们寻找对应的 δ>0，使定义域内该范围的每个 x 都推出输出不等式。请补全完整定义并说明先后顺序，再对照参考解答。",
      formula: math`\begin{gathered}
        \forall M>0,\ \exists \delta>0\\[4pt]
        \forall x\in D_f:\\[4pt]
        (\text{输入范围})\Longrightarrow(\text{输出要求})
      \end{gathered}`,
    },
  ],

  "jc935-1-4-5-4": [
    {
      change: "写出输出趋于负无穷的不等式",
      text: "目标是负无穷，仍先任给正门槛 M>0，但输出要落到 −M 的下方，即 f(x)<−M，注意不等号方向是小于。",
      formula: math`\begin{gathered}
        \forall M>0\\[4pt]
        f(x)<-M
      \end{gathered}`,
    },
    {
      change: "写出输入从两侧靠近 2 的范围",
      text: "输入从左右两侧靠近 2 且排除 2 本身，对应存在正数 δ>0 的去心邻域。",
      formula: math`\begin{gathered}
        \exists \delta>0\\[4pt]
        0<|x-2|<\delta
      \end{gathered}`,
    },
    {
      change: "按“先门槛 M、再半径 δ”拼出定义",
      text: "先写“任意 M>0”，再写“存在 δ>0”，随后对定义域内满足去心邻域的 x 推出输出不等式。请补全完整定义并说明先后顺序，再对照参考解答。",
      formula: math`\begin{gathered}
        \forall M>0,\ \exists \delta>0\\[4pt]
        \forall x\in D_f:\\[4pt]
        (\text{输入范围})\Longrightarrow(\text{输出要求})
      \end{gathered}`,
    },
  ],

  "jc935-1-4-5-5": [
    {
      change: "写出输出靠近 −3 的不等式",
      text: "输出目标为 −3，先任给正容差 ε>0。到 −3 的距离是 |f(x)−(−3)|=|f(x)+3|，要求它小于 ε。",
      formula: math`\begin{gathered}
        \forall \varepsilon>0\\[4pt]
        |f(x)+3|<\varepsilon
      \end{gathered}`,
    },
    {
      change: "写出输入从右侧靠近 2 的范围",
      text: "记号 x→2⁺ 表示只在 2 的右侧靠近，即 x>2，所以直接用正差值 x−2 量距离，不需要绝对值。",
      formula: math`\begin{gathered}
        \exists \delta>0\\[4pt]
        0<x-2<\delta
      \end{gathered}`,
    },
    {
      change: "按“先输出、再输入”拼出定义",
      text: "把“任给 ε>0”写在最前，“存在 δ>0”紧随其后，再对定义域内满足右侧范围的 x 推出输出不等式。请补全完整定义并说明先后顺序，再对照参考解答。",
      formula: math`\begin{gathered}
        \forall \varepsilon>0,\ \exists \delta>0\\[4pt]
        \forall x\in D_f:\\[4pt]
        (\text{输入范围})\Longrightarrow(\text{输出要求})
      \end{gathered}`,
    },
  ],

  "jc935-1-4-5-6": [
    {
      change: "写出绝对值趋于无穷的输出要求",
      text: "输出目标为 |f(x)|→+∞，只关心大小不限正负。先任给正门槛 M>0，要求 |f(x)|>M。",
      formula: math`\begin{gathered}
        \forall M>0\\[4pt]
        |f(x)|>M
      \end{gathered}`,
    },
    {
      change: "写出输入从右侧靠近 2 的范围",
      text: "x→2⁺ 只考察 2 右侧的点（x>2），因此存在 δ>0 使得 0<x−2<δ。",
      formula: math`\begin{gathered}
        \exists \delta>0\\[4pt]
        0<x-2<\delta
      \end{gathered}`,
    },
    {
      change: "按“先门槛 M、再半径 δ”拼出定义",
      text: "先选任意正门槛 M>0，再找依赖于 M 的正数 δ>0，使定义域内该右侧区间的所有 x 都满足输出要求。请补全完整定义并说明先后顺序，再对照参考解答。",
      formula: math`\begin{gathered}
        \forall M>0,\ \exists \delta>0\\[4pt]
        \forall x\in D_f:\\[4pt]
        (\text{输入范围})\Longrightarrow(\text{输出要求})
      \end{gathered}`,
    },
  ],

  "jc935-1-4-5-7": [
    {
      change: "写出输出趋于正无穷的不等式",
      text: "目标是正无穷，先任给正门槛 M>0，要求输出严格大于 M，即 f(x)>M，不能加绝对值。",
      formula: math`\begin{gathered}
        \forall M>0\\[4pt]
        f(x)>M
      \end{gathered}`,
    },
    {
      change: "写出输入从右侧靠近 2 的范围",
      text: "x→2⁺ 表示从右侧靠近 2（x>2），用 0<x−2<δ 刻画右侧去心邻域。",
      formula: math`\begin{gathered}
        \exists \delta>0\\[4pt]
        0<x-2<\delta
      \end{gathered}`,
    },
    {
      change: "按“先门槛 M、再半径 δ”拼出定义",
      text: "先写“任意 M>0”，再写“存在 δ>0”，再对定义域内满足右侧条件的 x 推出输出不等式。请补全完整定义并说明先后顺序，再对照参考解答。",
      formula: math`\begin{gathered}
        \forall M>0,\ \exists \delta>0\\[4pt]
        \forall x\in D_f:\\[4pt]
        (\text{输入范围})\Longrightarrow(\text{输出要求})
      \end{gathered}`,
    },
  ],

  "jc935-1-4-5-8": [
    {
      change: "写出输出趋于负无穷的不等式",
      text: "目标是负无穷，仍先任给正门槛 M>0，要求函数值落到 −M 以下，即 f(x)<−M。",
      formula: math`\begin{gathered}
        \forall M>0\\[4pt]
        f(x)<-M
      \end{gathered}`,
    },
    {
      change: "写出输入从右侧靠近 2 的范围",
      text: "x→2⁺ 表示 x 在 2 的右侧且不等于 2，对应正距离条件 0<x−2<δ。",
      formula: math`\begin{gathered}
        \exists \delta>0\\[4pt]
        0<x-2<\delta
      \end{gathered}`,
    },
    {
      change: "按“先门槛 M、再半径 δ”拼出定义",
      text: "先任给 M>0，再找对应的 δ>0，使定义域内满足右侧范围的 x 都推出输出不等式。请补全完整定义并说明先后顺序，再对照参考解答。",
      formula: math`\begin{gathered}
        \forall M>0,\ \exists \delta>0\\[4pt]
        \forall x\in D_f:\\[4pt]
        (\text{输入范围})\Longrightarrow(\text{输出要求})
      \end{gathered}`,
    },
  ],

  "jc935-1-4-5-9": [
    {
      change: "写出输出靠近 −3 的不等式",
      text: "输出目标为 −3，先任给正容差 ε>0，要求 f(x) 与 −3 的距离 |f(x)+3| 小于 ε。",
      formula: math`\begin{gathered}
        \forall \varepsilon>0\\[4pt]
        |f(x)+3|<\varepsilon
      \end{gathered}`,
    },
    {
      change: "写出输入从左侧靠近 2 的范围",
      text: "记号 x→2⁻ 表示只在 2 的左侧靠近，即 x<2，所以 2−x 才是正距离，写成 0<2−x<δ。",
      formula: math`\begin{gathered}
        \exists \delta>0\\[4pt]
        0<2-x<\delta
      \end{gathered}`,
    },
    {
      change: "按“先输出、再输入”拼出定义",
      text: "先写“任意 ε>0”，再写“存在 δ>0”，随后对定义域内满足左侧范围的 x 推出输出不等式。请补全完整定义并说明先后顺序，再对照参考解答。",
      formula: math`\begin{gathered}
        \forall \varepsilon>0,\ \exists \delta>0\\[4pt]
        \forall x\in D_f:\\[4pt]
        (\text{输入范围})\Longrightarrow(\text{输出要求})
      \end{gathered}`,
    },
  ],

  "jc935-1-4-5-10": [
    {
      change: "写出绝对值趋于无穷的输出要求",
      text: "目标是 |f(x)|→+∞，不区分正负号。先任给正门槛 M>0，要求 |f(x)|>M。",
      formula: math`\begin{gathered}
        \forall M>0\\[4pt]
        |f(x)|>M
      \end{gathered}`,
    },
    {
      change: "写出输入从左侧靠近 2 的范围",
      text: "x→2⁻ 表示从左侧靠近 2（x<2），用正数 2−x 表示距离，即 0<2−x<δ。",
      formula: math`\begin{gathered}
        \exists \delta>0\\[4pt]
        0<2-x<\delta
      \end{gathered}`,
    },
    {
      change: "按“先门槛 M、再半径 δ”拼出定义",
      text: "先任给 M>0，再找依赖于 M 的 δ>0，使定义域内该左侧范围的所有 x 都满足输出要求。请补全完整定义并说明先后顺序，再对照参考解答。",
      formula: math`\begin{gathered}
        \forall M>0,\ \exists \delta>0\\[4pt]
        \forall x\in D_f:\\[4pt]
        (\text{输入范围})\Longrightarrow(\text{输出要求})
      \end{gathered}`,
    },
  ],

  "jc935-1-4-5-11": [
    {
      change: "写出输出趋于正无穷的不等式",
      text: "目标是正无穷，先任给正门槛 M>0，要求 f(x)>M，确保输出为正且超过任意门槛。",
      formula: math`\begin{gathered}
        \forall M>0\\[4pt]
        f(x)>M
      \end{gathered}`,
    },
    {
      change: "写出输入从左侧靠近 2 的范围",
      text: "x→2⁻ 只看 2 左侧的点（x<2），所以用 0<2−x<δ 刻画左侧去心邻域。",
      formula: math`\begin{gathered}
        \exists \delta>0\\[4pt]
        0<2-x<\delta
      \end{gathered}`,
    },
    {
      change: "按“先门槛 M、再半径 δ”拼出定义",
      text: "先写“任意 M>0”，再写“存在 δ>0”，再对定义域内满足左侧范围的 x 推出输出不等式。请补全完整定义并说明先后顺序，再对照参考解答。",
      formula: math`\begin{gathered}
        \forall M>0,\ \exists \delta>0\\[4pt]
        \forall x\in D_f:\\[4pt]
        (\text{输入范围})\Longrightarrow(\text{输出要求})
      \end{gathered}`,
    },
  ],

  "jc935-1-4-5-12": [
    {
      change: "写出输出趋于负无穷的不等式",
      text: "目标是负无穷，先任给正门槛 M>0，要求输出落到 −M 以下，即 f(x)<−M。",
      formula: math`\begin{gathered}
        \forall M>0\\[4pt]
        f(x)<-M
      \end{gathered}`,
    },
    {
      change: "写出输入从左侧靠近 2 的范围",
      text: "x→2⁻ 表示 x<2，距离写成正数 2−x，对应范围 0<2−x<δ。",
      formula: math`\begin{gathered}
        \exists \delta>0\\[4pt]
        0<2-x<\delta
      \end{gathered}`,
    },
    {
      change: "按“先门槛 M、再半径 δ”拼出定义",
      text: "先任给 M>0，再寻找对应的 δ>0，使定义域内该左侧范围的所有 x 都推出输出不等式。请补全完整定义并说明先后顺序，再对照参考解答。",
      formula: math`\begin{gathered}
        \forall M>0,\ \exists \delta>0\\[4pt]
        \forall x\in D_f:\\[4pt]
        (\text{输入范围})\Longrightarrow(\text{输出要求})
      \end{gathered}`,
    },
  ],

  "jc935-1-4-5-13": [
    {
      change: "写出输出靠近 −3 的不等式",
      text: "输出目标为 −3，先任给正容差 ε>0，要求 f(x) 到 −3 的距离 |f(x)+3| 小于 ε。",
      formula: math`\begin{gathered}
        \forall \varepsilon>0\\[4pt]
        |f(x)+3|<\varepsilon
      \end{gathered}`,
    },
    {
      change: "写出输入在两个远端的范围",
      text: "记号 |x|→∞ 同时考察正远端和负远端，不再用小半径 δ，而是找一个足够大的正门槛 R>0，要求 |x|>R。",
      formula: math`\begin{gathered}
        \exists R>0\\[4pt]
        |x|>R
      \end{gathered}`,
    },
    {
      change: "按“先容差 ε、再门槛 R”拼出定义",
      text: "先写“任意 ε>0”，再写“存在 R>0”，随后对定义域内所有满足 |x|>R 的 x 推出输出不等式。请补全完整定义并说明先后顺序，再对照参考解答。",
      formula: math`\begin{gathered}
        \forall \varepsilon>0,\ \exists R>0\\[4pt]
        \forall x\in D_f:\\[4pt]
        (\text{输入范围})\Longrightarrow(\text{输出要求})
      \end{gathered}`,
    },
  ],

  "jc935-1-4-5-14": [
    {
      change: "写出绝对值趋于无穷的输出要求",
      text: "输出目标为 |f(x)|→+∞，不限正负号。先任给正门槛 M>0，要求 |f(x)|>M。",
      formula: math`\begin{gathered}
        \forall M>0\\[4pt]
        |f(x)|>M
      \end{gathered}`,
    },
    {
      change: "写出输入在两个远端的范围",
      text: "|x|→∞ 同时覆盖正、负两个远端，对应存在正门槛 R>0，使 |x|>R。",
      formula: math`\begin{gathered}
        \exists R>0\\[4pt]
        |x|>R
      \end{gathered}`,
    },
    {
      change: "按“先输出 M、再输入 R”拼出定义",
      text: "先由对方任给正门槛 M>0，再找对应的输入门槛 R>0，使定义域内满足 |x|>R 的每个 x 都满足输出要求。请补全完整定义并说明先后顺序，再对照参考解答。",
      formula: math`\begin{gathered}
        \forall M>0,\ \exists R>0\\[4pt]
        \forall x\in D_f:\\[4pt]
        (\text{输入范围})\Longrightarrow(\text{输出要求})
      \end{gathered}`,
    },
  ],

  "jc935-1-4-5-15": [
    {
      change: "写出输出趋于正无穷的不等式",
      text: "目标是正无穷，先任给正门槛 M>0，要求 f(x)>M（不要错加绝对值）。",
      formula: math`\begin{gathered}
        \forall M>0\\[4pt]
        f(x)>M
      \end{gathered}`,
    },
    {
      change: "写出输入在两个远端的范围",
      text: "|x|→∞ 同时看正、负两个远端，所以输入条件是存在 R>0 使得 |x|>R。",
      formula: math`\begin{gathered}
        \exists R>0\\[4pt]
        |x|>R
      \end{gathered}`,
    },
    {
      change: "按“先输出 M、再输入 R”拼出定义",
      text: "先写“任意 M>0”，再写“存在 R>0”，随后对定义域内满足 |x|>R 的 x 推出输出不等式。请补全完整定义并说明先后顺序，再对照参考解答。",
      formula: math`\begin{gathered}
        \forall M>0,\ \exists R>0\\[4pt]
        \forall x\in D_f:\\[4pt]
        (\text{输入范围})\Longrightarrow(\text{输出要求})
      \end{gathered}`,
    },
  ],

  "jc935-1-4-5-16": [
    {
      change: "写出输出趋于负无穷的不等式",
      text: "目标是负无穷，仍先任给正门槛 M>0，要求 f(x)<−M。",
      formula: math`\begin{gathered}
        \forall M>0\\[4pt]
        f(x)<-M
      \end{gathered}`,
    },
    {
      change: "写出输入在两个远端的范围",
      text: "|x|→∞ 同时看正、负两个远端，需要找到正门槛 R>0，用 |x|>R 刻画。",
      formula: math`\begin{gathered}
        \exists R>0\\[4pt]
        |x|>R
      \end{gathered}`,
    },
    {
      change: "按“先输出 M、再输入 R”拼出定义",
      text: "先任给 M>0，再找对应的 R>0，使定义域内满足 |x|>R 的每个 x 都推出输出不等式。请补全完整定义并说明先后顺序，再对照参考解答。",
      formula: math`\begin{gathered}
        \forall M>0,\ \exists R>0\\[4pt]
        \forall x\in D_f:\\[4pt]
        (\text{输入范围})\Longrightarrow(\text{输出要求})
      \end{gathered}`,
    },
  ],

  "jc935-1-4-5-17": [
    {
      change: "写出输出靠近 −3 的不等式",
      text: "输出目标为 −3，先任给正容差 ε>0，要求 |f(x)−(−3)|=|f(x)+3|<ε。",
      formula: math`\begin{gathered}
        \forall \varepsilon>0\\[4pt]
        |f(x)+3|<\varepsilon
      \end{gathered}`,
    },
    {
      change: "写出输入走向正无穷的范围",
      text: "x→+∞ 只看数轴右侧远端，因此找正门槛 R>0，要求 x>R（不需要绝对值）。",
      formula: math`\begin{gathered}
        \exists R>0\\[4pt]
        x>R
      \end{gathered}`,
    },
    {
      change: "按“先容差 ε、再门槛 R”拼出定义",
      text: "先写“任意 ε>0”，再写“存在 R>0”，随后对定义域内满足 x>R 的每个 x 推出输出不等式。请补全完整定义并说明先后顺序，再对照参考解答。",
      formula: math`\begin{gathered}
        \forall \varepsilon>0,\ \exists R>0\\[4pt]
        \forall x\in D_f:\\[4pt]
        (\text{输入范围})\Longrightarrow(\text{输出要求})
      \end{gathered}`,
    },
  ],

  "jc935-1-4-5-18": [
    {
      change: "写出绝对值趋于无穷的输出要求",
      text: "目标是 |f(x)|→+∞，允许函数值正负交替变大。先任给正门槛 M>0，要求 |f(x)|>M。",
      formula: math`\begin{gathered}
        \forall M>0\\[4pt]
        |f(x)|>M
      \end{gathered}`,
    },
    {
      change: "写出输入走向正无穷的范围",
      text: "x→+∞ 只关注右侧远端，存在正门槛 R>0，用 x>R 表示足够靠右的输入。",
      formula: math`\begin{gathered}
        \exists R>0\\[4pt]
        x>R
      \end{gathered}`,
    },
    {
      change: "按“先输出 M、再输入 R”拼出定义",
      text: "先任给 M>0，再寻找对应的 R>0，使定义域内所有满足 x>R 的 x 都满足输出要求。请补全完整定义并说明先后顺序，再对照参考解答。",
      formula: math`\begin{gathered}
        \forall M>0,\ \exists R>0\\[4pt]
        \forall x\in D_f:\\[4pt]
        (\text{输入范围})\Longrightarrow(\text{输出要求})
      \end{gathered}`,
    },
  ],

  "jc935-1-4-5-19": [
    {
      change: "写出输出趋于正无穷的不等式",
      text: "目标是正无穷，先任给正门槛 M>0，要求 f(x)>M。",
      formula: math`\begin{gathered}
        \forall M>0\\[4pt]
        f(x)>M
      \end{gathered}`,
    },
    {
      change: "写出输入走向正无穷的范围",
      text: "x→+∞ 只看右侧远端，存在正门槛 R>0，要求 x>R。",
      formula: math`\begin{gathered}
        \exists R>0\\[4pt]
        x>R
      \end{gathered}`,
    },
    {
      change: "按“先输出 M、再输入 R”拼出定义",
      text: "先写“任意 M>0”，再写“存在 R>0”，随后对定义域内满足 x>R 的 x 推出输出不等式。请补全完整定义并说明先后顺序，再对照参考解答。",
      formula: math`\begin{gathered}
        \forall M>0,\ \exists R>0\\[4pt]
        \forall x\in D_f:\\[4pt]
        (\text{输入范围})\Longrightarrow(\text{输出要求})
      \end{gathered}`,
    },
  ],

  "jc935-1-4-5-20": [
    {
      change: "写出输出趋于负无穷的不等式",
      text: "目标是负无穷，仍先任给正门槛 M>0，要求输出落到 −M 以下，即 f(x)<−M。",
      formula: math`\begin{gathered}
        \forall M>0\\[4pt]
        f(x)<-M
      \end{gathered}`,
    },
    {
      change: "写出输入走向正无穷的范围",
      text: "x→+∞ 只看右侧远端，存在正门槛 R>0，要求 x>R。",
      formula: math`\begin{gathered}
        \exists R>0\\[4pt]
        x>R
      \end{gathered}`,
    },
    {
      change: "按“先输出 M、再输入 R”拼出定义",
      text: "先任给 M>0，再找对应的 R>0，使定义域内满足 x>R 的每个 x 都推出输出不等式。请补全完整定义并说明先后顺序，再对照参考解答。",
      formula: math`\begin{gathered}
        \forall M>0,\ \exists R>0\\[4pt]
        \forall x\in D_f:\\[4pt]
        (\text{输入范围})\Longrightarrow(\text{输出要求})
      \end{gathered}`,
    },
  ],

  "jc935-1-4-5-21": [
    {
      change: "写出输出靠近 −3 的不等式",
      text: "输出目标为 −3，先任给正容差 ε>0，要求 |f(x)−(−3)|=|f(x)+3|<ε。",
      formula: math`\begin{gathered}
        \forall \varepsilon>0\\[4pt]
        |f(x)+3|<\varepsilon
      \end{gathered}`,
    },
    {
      change: "写出输入走向负无穷的范围",
      text: "x→−∞ 只看数轴左侧远端，R 仍取正数，但输入要越过 −R 往左走，写成 x<−R。",
      formula: math`\begin{gathered}
        \exists R>0\\[4pt]
        x<-R
      \end{gathered}`,
    },
    {
      change: "按“先容差 ε、再门槛 R”拼出定义",
      text: "先写“任意 ε>0”，再写“存在 R>0”，随后对定义域内满足 x<−R 的每个 x 推出输出不等式。请补全完整定义并说明先后顺序，再对照参考解答。",
      formula: math`\begin{gathered}
        \forall \varepsilon>0,\ \exists R>0\\[4pt]
        \forall x\in D_f:\\[4pt]
        (\text{输入范围})\Longrightarrow(\text{输出要求})
      \end{gathered}`,
    },
  ],

  "jc935-1-4-5-22": [
    {
      change: "写出绝对值趋于无穷的输出要求",
      text: "目标是 |f(x)|→+∞，不区分正负号。先任给正门槛 M>0，要求 |f(x)|>M。",
      formula: math`\begin{gathered}
        \forall M>0\\[4pt]
        |f(x)|>M
      \end{gathered}`,
    },
    {
      change: "写出输入走向负无穷的范围",
      text: "x→−∞ 只看左侧远端，存在正数 R>0，要求 x<−R。",
      formula: math`\begin{gathered}
        \exists R>0\\[4pt]
        x<-R
      \end{gathered}`,
    },
    {
      change: "按“先输出 M、再输入 R”拼出定义",
      text: "先任给 M>0，再找对应的 R>0，使定义域内所有满足 x<−R 的 x 都满足输出要求。请补全完整定义并说明先后顺序，再对照参考解答。",
      formula: math`\begin{gathered}
        \forall M>0,\ \exists R>0\\[4pt]
        \forall x\in D_f:\\[4pt]
        (\text{输入范围})\Longrightarrow(\text{输出要求})
      \end{gathered}`,
    },
  ],

  "jc935-1-4-5-23": [
    {
      change: "写出输出趋于正无穷的不等式",
      text: "目标是正无穷，先任给正门槛 M>0，要求 f(x)>M。",
      formula: math`\begin{gathered}
        \forall M>0\\[4pt]
        f(x)>M
      \end{gathered}`,
    },
    {
      change: "写出输入走向负无穷的范围",
      text: "x→−∞ 只看左侧远端，存在正门槛 R>0，要求 x<−R。",
      formula: math`\begin{gathered}
        \exists R>0\\[4pt]
        x<-R
      \end{gathered}`,
    },
    {
      change: "按“先输出 M、再输入 R”拼出定义",
      text: "先写“任意 M>0”，再写“存在 R>0”，随后对定义域内满足 x<−R 的每个 x 推出输出不等式。请补全完整定义并说明先后顺序，再对照参考解答。",
      formula: math`\begin{gathered}
        \forall M>0,\ \exists R>0\\[4pt]
        \forall x\in D_f:\\[4pt]
        (\text{输入范围})\Longrightarrow(\text{输出要求})
      \end{gathered}`,
    },
  ],

  "jc935-1-4-5-24": [
    {
      change: "写出输出趋于负无穷的不等式",
      text: "目标是负无穷，仍先任给正门槛 M>0，要求 f(x)<−M。",
      formula: math`\begin{gathered}
        \forall M>0\\[4pt]
        f(x)<-M
      \end{gathered}`,
    },
    {
      change: "写出输入走向负无穷的范围",
      text: "x→−∞ 只看左侧远端，存在正数 R>0，要求 x<−R。",
      formula: math`\begin{gathered}
        \exists R>0\\[4pt]
        x<-R
      \end{gathered}`,
    },
    {
      change: "按“先输出 M、再输入 R”拼出定义",
      text: "先任给 M>0，再找对应的 R>0，使定义域内满足 x<−R 的每个 x 都推出输出不等式。请补全完整定义并说明先后顺序，再对照参考解答。",
      formula: math`\begin{gathered}
        \forall M>0,\ \exists R>0\\[4pt]
        \forall x\in D_f:\\[4pt]
        (\text{输入范围})\Longrightarrow(\text{输出要求})
      \end{gathered}`,
    },
  ],

  "jc935-1-4-6": [
    {
      change: "先挑一列让 sin x=1 的波峰点",
      text: "要证 f 无界，只需找出一列点让函数值越来越大。选正弦始终等于 1 的波峰位置 xₖ。",
      formula: math`x_k=2k\pi+\frac{\pi}{2}\quad (k=1,2,\dots)`,
    },
    {
      change: "代入波峰点算出函数值趋势",
      text: "把 xₖ 代入 f(x)=(2x+1)sin x，因为 sin xₖ=1，函数值变成一次递增式，随 k 增大趋于正无穷。",
      formula: math`\begin{gathered}
        f(x_k)=2x_k+1\\[4pt]
        =4k\pi+\pi+1\to+\infty
      \end{gathered}`,
    },
    {
      change: "再挑一列让 sin x=0 的零点",
      text: "接着检验 |f(x)|→+∞：它要求“超过某个 R 后的所有 x”都满足 |f(x)|>M。改选正弦等于 0 的点列 zₖ，无论 R 多大总有 zₖ>R。",
      formula: math`z_k=k\pi\quad (k=1,2,\dots)`,
    },
    {
      change: "对比两条点列的值下结论",
      text: "在 zₖ 处正弦为 0，函数值恒为 0，永远超不过任何正门槛 M。请结合 xₖ 和 zₖ 两条路径分别写出“是否有界”和“|f(x)| 是否趋于无穷”的结论，再对照参考解答。",
      formula: math`f(z_k)=(2k\pi+1)\sin(k\pi)=0`,
    },
  ],

  "jc935-1-4-7": [
    {
      change: "设 t=1/x 把余弦变量理顺",
      text: "把 1/x 看成新变量 t。当 x 从右侧靠近 0 且落在 (0,1] 内时，t 满足 t≥1 且走向正无穷。",
      formula: math`\begin{gathered}
        t=\frac{1}{x}\ge 1\\[4pt]
        f(x)=2t\cos t
      \end{gathered}`,
    },
    {
      change: "挑一列让 cos t=1 的高点",
      text: "取 tₖ=2kπ（k=1,2,…），对应 xₖ=1/(2kπ) 都落在 (0,1] 内。代入后余弦为 1，函数值随 k 增大趋于正无穷。",
      formula: math`\begin{gathered}
        x_k=\frac{1}{2k\pi}\in(0,1]\\[4pt]
        f(x_k)=4k\pi\to+\infty
      \end{gathered}`,
    },
    {
      change: "再挑一列让 cos t=0 的零点",
      text: "取 t'ₖ=2kπ+π/2（k=1,2,…），对应 zₖ 同样落在 (0,1] 内且从右侧趋近 0。",
      formula: math`z_k=\frac{1}{2k\pi+\frac{\pi}{2}}\to 0^+`,
    },
    {
      change: "对比高点与零点写出双结论",
      text: "在任意靠近 0⁺ 的邻域内都存在零点 zₖ 使 f(zₖ)=0，说明不可能让所有靠近 0⁺ 的点都超过正门槛 M。请据此写出“是否有界”和“|f(x)| 是否趋于无穷”的完整结论，再对照参考解答。",
      formula: math`\begin{gathered}
        f(z_k)=2\left(2k\pi+\frac{\pi}{2}\right)\cdot 0\\[4pt]
        =0
      \end{gathered}`,
    },
  ],
};

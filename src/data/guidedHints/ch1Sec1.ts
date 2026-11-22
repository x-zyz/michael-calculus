import type { GuidedHint } from "../learning";

const math = String.raw;

export const ch1Sec1GuidedHints: Record<string, GuidedHint[]> = {
  "jc935-1-1-1-1": [
    {
      change: "列出根号里的非负条件",
      text: "实数范围内，二次根号里面的数可以是正数，也可以是 0，但不能是负数。先只把被开方数单独拿出来列不等式。",
      formula: math`5x+15\ge 0`,
    },
    {
      change: "把常数项移到不等号右边",
      text: "不等式两边同时减去 15，不等号方向不变，把含 x 的项留在左边。",
      formula: math`5x\ge -15`,
    },
    {
      change: "两边同除以正数 5",
      text: "除以正数 5 不改变不等号方向。得到最终范围后，再根据是否包含等号写成区间形式，并对照参考解答。",
      formula: math`\begin{gathered}
x\ge \frac{-15}{5}\\[4pt]
x\ge -3
\end{gathered}`,
    },
  ],

  "jc935-1-1-1-2": [
    {
      change: "列出分母不为零的条件",
      text: "分式里分子是常数 1，唯一的限制是分母不能等于 0。先把这个禁用条件写出来。",
      formula: math`9-x^2\ne 0`,
    },
    {
      change: "用平方差把分母因式分解",
      text: "把 9 看成 3²，利用平方差公式拆成两个一次因子的乘积，这样容易看清哪些点会让分母归零。",
      formula: math`(3-x)(3+x)\ne 0`,
    },
    {
      change: "找出必须剔除的两个点",
      text: "乘积不为 0 意味着两个因子都不能为 0。剩下的所有实数都能代入，请写出从全体实数中删去这两个点的集合。",
      formula: math`x\ne -3,\quad x\ne 3`,
    },
  ],

  "jc935-1-1-1-3": [
    {
      change: "分别列出分母与根号的限制",
      text: "函数由两项相减组成，必须同时有意义。第一项 1/x 要求分母非零，第二项根号要求被开方数非负。",
      formula: math`\begin{gathered}
x\ne 0\\[4pt]
16-x^2\ge 0
\end{gathered}`,
    },
    {
      change: "解出根号对应的范围",
      text: "把 16−x²≥0 改写成 x²≤16，开平方得到绝对值不等式，也就是夹在 −4 和 4 之间的闭区间。",
      formula: math`\begin{gathered}
x^2\le 16\\[4pt]
-4\le x\le 4
\end{gathered}`,
    },
    {
      change: "把两个条件取交集",
      text: "现在要从 [−4,4] 里挖掉不合法的 0，两端点 −4 和 4 都能满足两项条件所以保留。把挖空后的结果写成区间并集即可。",
      formula: math`-4\le x\le 4,\quad x\ne 0`,
    },
  ],

  "jc935-1-1-1-4": [
    {
      change: "合并根号与分母两个限制",
      text: "根号本身允许里面等于 0，但整个根号在分母里，所以不能等于 0。把非负和非零合起来，就是严格大于 0。",
      formula: math`36-x^2>0`,
    },
    {
      change: "把二次不等式改写成平方比较",
      text: "把 −x² 移到不等号右边，直接比较 x² 和 36 的大小。",
      formula: math`x^2<36`,
    },
    {
      change: "开方得到双边严格不等式",
      text: "平方小于 36 等价于绝对值小于 6。因为是严格不等号，左右两个端点都不能取，请写成开区间。",
      formula: math`-6<x<6`,
    },
  ],

  "jc935-1-1-1-5": [
    {
      change: "先检查外层正弦的限制",
      text: "正弦函数 sin u 可以接收任意实数作为输入，所以外层本身不会增加任何额外限制，只需保证内层能算出实数。",
      formula: math`u=\sqrt{x+4}\in\mathbb R`,
    },
    {
      change: "列出内层根号的非负条件",
      text: "内层是二次根号，只要被开方数大于或等于 0，就能算出实数 u 送进正弦。",
      formula: math`x+4\ge 0`,
    },
    {
      change: "移项解出 x 的取值范围",
      text: "两边同时减去 4，得到下界 −4 且等号可以取到。请写成区间形式并核对参考解答。",
      formula: math`x\ge -4`,
    },
  ],

  "jc935-1-1-1-6": [
    {
      change: "把正切改写成分式找限制",
      text: "正切等于正弦除以余弦，所以当且仅当分母里的余弦不为 0 时，函数才有定义。",
      formula: math`\begin{gathered}
\tan(2x-1)=\frac{\sin(2x-1)}{\cos(2x-1)}\\[4pt]
\cos(2x-1)\ne 0
\end{gathered}`,
    },
    {
      change: "列出余弦为零的禁用角度",
      text: "余弦在 π/2 加上 π 的整数倍处等于 0。让内层角度 2x−1 避开这些点。",
      formula: math`\begin{gathered}
2x-1\ne \frac{\pi}{2}+k\pi\\[4pt]
(k\in\mathbb Z)
\end{gathered}`,
    },
    {
      change: "解出必须排除的 x 值",
      text: "两边先加 1，再除以 2，就得到所有不能取的 x。把它们从全体实数中剔除，写出最终定义域集合。",
      formula: math`\begin{gathered}
x\ne \frac{1+\pi/2+k\pi}{2}\\[4pt]
(k\in\mathbb Z)
\end{gathered}`,
    },
  ],

  "jc935-1-1-1-7": [
    {
      change: "列出反正弦的输入限制",
      text: "因为正弦值恒落在 [−1,1]，反正弦 arcsin u 也只接受 [−1,1] 内的输入。把内层 x+2 放进这个范围。",
      formula: math`-1\le x+2\le 1`,
    },
    {
      change: "三边同时减去 2",
      text: "为了把中间的 x 单独留出来，连不等式的左、中、右三边一起减 2，不等号方向不变。",
      formula: math`-1-2\le x\le 1-2`,
    },
    {
      change: "化简两端得到 x 的范围",
      text: "算出两边的常数后，注意两个等号都可以取到。请据此写出闭区间定义域。",
      formula: math`-3\le x\le -1`,
    },
  ],

  "jc935-1-1-1-8": [
    {
      change: "分别列出两项的定义条件",
      text: "第一项根号要求被开方数非负；第二项外层 arctan 接受任意实数，但内层倒数 1/x 要求分母不为 0。",
      formula: math`\begin{gathered}
5-x\ge 0\\[4pt]
x\ne 0
\end{gathered}`,
    },
    {
      change: "解出根号对应的不等式",
      text: "把 5−x≥0 中的 −x 移到右边，得到 x 的上界 5，且 5 可以取到。",
      formula: math`x\le 5`,
    },
    {
      change: "合并两个条件取交集",
      text: "在不超过 5 的所有实数里，还必须挖掉 0 这一点。请把结果写成两段区间的并集并核对端点开闭。",
      formula: math`x\le 5,\quad x\ne 0`,
    },
  ],

  "jc935-1-1-1-9": [
    {
      change: "列出对数真数严格正的条件",
      text: "自然对数 ln u 的真数必须严格大于 0，连 0 本身也不能代入。先把真数单独列出来。",
      formula: math`3x-12>0`,
    },
    {
      change: "把常数项移到不等号右边",
      text: "两边同时加上 12，把含 x 的项留在左边，不等号方向不变。",
      formula: math`3x>12`,
    },
    {
      change: "两边同除以正数 3",
      text: "除以正数 3 保持不等号方向不变。因为是严格大于号，左端点不能取，请写成开区间。",
      formula: math`x>4`,
    },
  ],

  "jc935-1-1-1-10": [
    {
      change: "先确认外层指数没有限制",
      text: "指数函数 e^u 对任意实数 u 都有定义，所以外层不挑输入，只要指数位置能算出实数就行。",
      formula: math`u=\frac{3}{x-2}\in\mathbb R`,
    },
    {
      change: "列出指数里分母非零的条件",
      text: "指数位置是一个分式，唯一可能出问题的是分母等于 0。",
      formula: math`x-2\ne 0`,
    },
    {
      change: "找出唯一要剔除的点",
      text: "解出禁用点 x=2，其余实数全部允许。请用集合差的形式写出完整定义域。",
      formula: math`x\ne 2`,
    },
  ],

  "jc935-1-1-2-1": [
    {
      change: "分别列出两式的定义域条件",
      text: "判断两个函数是否相同，必须先检查定义域是否一致。f 的真数是 x²，g 的真数是 x，两者都要严格大于 0。",
      formula: math`\begin{gathered}
f:\ x^2>0\\[4pt]
g:\ x>0
\end{gathered}`,
    },
    {
      change: "解出两个定义域集合",
      text: "任何非零实数的平方都是正数，所以 f 允许负数输入；而 g 只能接受正数。",
      formula: math`\begin{gathered}
D_f=\mathbb R\setminus\{0\}\\[4pt]
D_g=(0,+\infty)
\end{gathered}`,
    },
    {
      change: "对比定义域并举出差异点",
      text: "例如 x=−2 在 D_f 中却不在 D_g 中。既然两者的定义域不同，请据此直接写出最终判断与理由。",
      formula: math`D_f\ne D_g,\quad -2\in D_f,\ -2\notin D_g`,
    },
  ],

  "jc935-1-1-2-2": [
    {
      change: "先确认两个函数的定义域",
      text: "2x 对所有实数有定义，而 4x²≥0 恒成立，所以 √(4x²) 也对所有实数有定义。两者的定义域相同。",
      formula: math`D_f=D_g=\mathbb R`,
    },
    {
      change: "化简 g(x) 的算术平方根",
      text: "算术平方根的结果恒非负，因此 √(4x²) 等于 2|x|，而不是 2x。",
      formula: math`g(x)=\sqrt{(2x)^2}=2|x|`,
    },
    {
      change: "代入一个负数检验对应法则",
      text: "取 x=−1 分别代入 f 和 g，看看输出是否一致。根据这两个数值的差异，即可写出最终判断。",
      formula: math`\begin{gathered}
f(-1)=2(-1)=-2\\[4pt]
g(-1)=2|-1|=2
\end{gathered}`,
    },
  ],

  "jc935-1-1-2-3": [
    {
      change: "先确认两函数的定义域",
      text: "实数立方根对正数、0 和负数都有唯一定义，因此 f 和 g 都能接收全体实数，定义域相同。",
      formula: math`D_f=D_g=\mathbb R`,
    },
    {
      change: "把 f(x) 和 g(x) 分别立方",
      text: "为了去掉立方根方便比较，把两个表达式同时三次方。g(x) 立方时两个因子各自立方再相乘。",
      formula: math`\begin{gathered}
[f(x)]^3=x^3(x+2)\\[4pt]
[g(x)]^3=x^3\cdot(x+2)
\end{gathered}`,
    },
    {
      change: "利用实数立方的一一对应比较",
      text: "两者的立方对一切实数 x 完全相等。因为实数函数 t↦t³ 严格递增是一一对应的，立方相等就能反推原值相等。请据此写出结论。",
      formula: math`\begin{gathered}
[f(x)]^3=[g(x)]^3\\[4pt]
(\forall x\in\mathbb R)
\end{gathered}`,
    },
  ],

  "jc935-1-1-2-4": [
    {
      change: "先写出常数函数 f 的定义域",
      text: "f(x)=2 是常数函数，不依赖任何除法或根号，因此对所有实数都有定义。",
      formula: math`D_f=\mathbb R`,
    },
    {
      change: "把 sec 和 tan 化成分式",
      text: "虽然恒等式 sec²x−tan²x=1 在有意义时成立，但 sec x 和 tan x 的分母都是 cos x，必须先要求分母不为 0。",
      formula: math`\begin{gathered}
\sec x=\frac{1}{\cos x}\\[4pt]
\tan x=\frac{\sin x}{\cos x}\\[4pt]
D_g=\{x\in\mathbb R:\cos x\ne 0\}
\end{gathered}`,
    },
    {
      change: "用缺口点对比两个定义域",
      text: "在 x=π/2 处，f 有值 2，而 cos(π/2)=0 导致 g 没有定义。请依据定义域不同写出最终结论。",
      formula: math`\begin{gathered}
D_f\ne D_g\\[4pt]
\frac{\pi}{2}\in D_f\setminus D_g
\end{gathered}`,
    },
  ],

  "jc935-1-1-3": [
    {
      change: "按绝对值把四个点分进对应分段",
      text: "先用 |x|<π/2 和 |x|≥π/2 这条分界线（π/2≈1.57）给四个点归类，避免代错表达式。",
      formula: math`\begin{gathered}
|\pi/6|,\ |-\pi/3|<\pi/2\\[4pt]
|\pi/2|=\pi/2,\quad |-2|>\pi/2
\end{gathered}`,
    },
    {
      change: "代入内段公式算前两个函数值",
      text: "π/6 和 −π/3 都在中间区间，代入 |sin x|。注意负角取正弦后再加绝对值会变成正数。",
      formula: math`\begin{gathered}
\phi(\pi/6)=|\sin(\pi/6)|\\[4pt]
\phi(-\pi/3)=|\sin(-\pi/3)|
\end{gathered}`,
    },
    {
      change: "读取外段值并标好端点虚实",
      text: "外段恒为 0，所以 π/2 和 −2 的函数值都是 0。画图时，中间是关于 y 轴对称的两段正弦拱，在 x=±π/2 处高度 1 画空心点、高度 0 画实心点。请算出上面两个数值并完成作图。",
      formula: math`\begin{gathered}
\phi(\pi/2)=\phi(-2)=0\\[4pt]
\lim_{|x|\to(\pi/2)^-}\phi(x)=1
\end{gathered}`,
    },
  ],

  "jc935-1-1-4-1": [
    {
      change: "取绝对值把正负号统一起来",
      text: "要证明有界，只需证明 |f(x)| 有一个不依赖 x 的常数上界。分母 4+x² 恒正，直接保留在绝对值外。",
      formula: math`|f(x)|=\frac{3|x|}{4+x^2}`,
    },
    {
      change: "用完全平方非负给分母找下界",
      text: "由 (|x|−2)²≥0 展开得 x²−4|x|+4≥0，移项就能把分母 4+x² 和分子里的 |x| 联系起来。",
      formula: math`\begin{gathered}
(|x|-2)^2\ge 0\\[4pt]
4+x^2\ge 4|x|
\end{gathered}`,
    },
    {
      change: "把分母变小以放大整个分式",
      text: "当 x≠0 时，把正分母 4+x² 换成更小的正数 4|x|，分式变大且约掉 |x|；x=0 时 |f(0)|=0 同样满足该上界。去掉绝对值即可写出上下界。",
      formula: math`|f(x)|\le \frac{3|x|}{4|x|}=\frac{3}{4}`,
    },
  ],

  "jc935-1-1-4-2": [
    {
      change: "令 t=x² 并先定出正下界",
      text: "表达式里只出现 x² 和 x⁴，设 t=x²≥0 会更清爽。分子分母都严格为正，立刻得到下界 0。",
      formula: math`t=x^2\ge 0,\quad f(x)=\frac{2+t}{2+t^2}>0`,
    },
    {
      change: "用平方非负给一次项 t 找上界",
      text: "为了把分子中的一次项 t 放缩成常数加 t²，利用 (t−1)²≥0 展开并移项。",
      formula: math`\begin{gathered}
(t-1)^2\ge 0\\[4pt]
t\le \frac{1+t^2}{2}
\end{gathered}`,
    },
    {
      change: "把分子放缩成分母的常数倍",
      text: "把 t≤(1+t²)/2 代进分子 2+t，再把系数凑成分母 2+t² 的统一倍数。两边同除正数 2+t²，即可写出完整的上下界结论。",
      formula: math`\begin{gathered}
2+t\le \frac{5+t^2}{2}\\[4pt]
\le \frac{3}{2}(2+t^2)
\end{gathered}`,
    },
  ],

  "jc935-1-1-5-1": [
    {
      change: "在区间内任取两点作差",
      text: "不用导数证明严格递增，就按定义任取区间内两点 u<v<2，计算右边点的函数值减去左边点的函数值。",
      formula: math`f(v)-f(u)=\frac{v}{2-v}-\frac{u}{2-u}`,
    },
    {
      change: "通分并化简分子",
      text: "两个分式通分，分子展开为 2v−uv−2u+uv，交叉项 −uv 和 +uv 刚好抵消。",
      formula: math`\begin{gathered}
f(v)-f(u)=\frac{v(2-u)-u(2-v)}{(2-v)(2-u)}\\[4pt]
=\frac{2(v-u)}{(2-v)(2-u)}
\end{gathered}`,
    },
    {
      change: "逐个判定分子与分母因子的符号",
      text: "由 u<v<2，分子里的 v−u 为正，分母里的两个括号也都为正。据此判定差值的正负，并写出严格递增的结论。",
      formula: math`\begin{gathered}
v-u>0\\[4pt]
2-v>0,\quad 2-u>0
\end{gathered}`,
    },
  ],

  "jc935-1-1-5-2": [
    {
      change: "任取两点把差拆成两块",
      text: "按定义任取 −1<u<v，把 f(v)−f(u) 中同类项归在一起，分成一次项之差和对数项之差。",
      formula: math`\begin{gathered}
f(v)-f(u)=2(v-u)\\[4pt]
+[\ln(v+1)-\ln(u+1)]
\end{gathered}`,
    },
    {
      change: "先判断一次项差值的正负",
      text: "因为 v>u，差值 v−u 严格大于 0，乘以正数 2 后仍然严格大于 0。",
      formula: math`2(v-u)>0`,
    },
    {
      change: "再判断对数项差值的正负",
      text: "由 −1<u<v 得 0<u+1<v+1，而自然对数在 (0,+∞) 上严格递增。两个正数相加仍为正，请据此写出最终证明结论。",
      formula: math`\begin{gathered}
v+1>u+1>0\\[4pt]
\ln(v+1)-\ln(u+1)>0
\end{gathered}`,
    },
  ],

  "jc935-1-1-6-1": [
    {
      change: "找出抛物线的对称轴分界点",
      text: "函数是顶点式二次函数，平方项 (x−2)² 在 x=2 处取到最小值 0，因此用 x=2 把定义域拆成左右两段。",
      formula: math`(-\infty,2],\quad [2,+\infty)`,
    },
    {
      change: "先看平方项本身的单调性",
      text: "在 x≤2 一侧，x 增大时 |x−2| 变小，所以 (x−2)² 严格递减；在 x≥2 一侧，(x−2)² 严格递增。",
      formula: math`\begin{gathered}
(x-2)^2:\ \downarrow\ (-\infty,2]\\[4pt]
(x-2)^2:\ \uparrow\ [2,+\infty)
\end{gathered}`,
    },
    {
      change: "按参数 a 的符号分类讨论",
      text: "加上常数 5 不改变单调性；乘以正数 a 保持原方向，乘以负数 a 则把递增和递减完全颠倒。请按 a>0 与 a<0 分别写出完整区间。",
      formula: math`\begin{gathered}
a>0:\ \text{same direction}\\[4pt]
a<0:\ \text{reversed direction}
\end{gathered}`,
    },
  ],

  "jc935-1-1-6-2": [
    {
      change: "找出分母断开的位置",
      text: "分母 3x−6 不能为 0，所以 x≠2。断点把定义域拆成左右两段，单调性必须在每一段内分别讨论。",
      formula: math`I_1=(-\infty,2),\quad I_2=(2,+\infty)`,
    },
    {
      change: "分离常数把 x 集中到分母",
      text: "把分子 2x+b 凑成 2(x−2)+(b+4)，再拆成常数加上一个简单反比例项，这样一眼就能看出变化趋势。",
      formula: math`\begin{gathered}
f_b(x)=\frac{2(x-2)+(b+4)}{3(x-2)}\\[4pt]
=\frac{2}{3}+\frac{b+4}{3(x-2)}
\end{gathered}`,
    },
    {
      change: "按系数 b+4 的正负零分类",
      text: "在 I_1 和 I_2 内，1/(x−2) 各自严格递减。系数 b+4 为正时保持递减，为负时变为递增，为 0 时退化为常数 2/3。请按这三种情况写出完整结论。",
      formula: math`\begin{gathered}
b>-4:\ b+4>0\\[4pt]
b<-4:\ b+4<0\\[4pt]
b=-4:\ f_b(x)=2/3
\end{gathered}`,
    },
  ],

  "jc935-1-1-7": [
    {
      change: "在左半区间任取两点并取相反数",
      text: "要证 f 在 (−3,0) 上严格递增，任取 −3<u<v<0。两边同时乘 −1 会翻转不等号，把两个点对称搬到右半区间 (0,3)。",
      formula: math`0<-v<-u<3`,
    },
    {
      change: "在右半区间套用已知递增条件",
      text: "题目已知 f 在 (0,3) 上严格递增，而 −v 和 −u 都落在 (0,3) 内且 −v<−u，所以可以直接比较函数值。",
      formula: math`f(-v)<f(-u)`,
    },
    {
      change: "用奇函数定义把负号提到外面",
      text: "把 f(−v) 和 f(−u) 分别换成 −f(v) 和 −f(u)，再两边同时乘 −1 翻转不等号，就能得到左半区间的单调性结论。",
      formula: math`\begin{gathered}
-f(v)<-f(u)\\[4pt]
f(u)<f(v)
\end{gathered}`,
    },
  ],

  "jc935-1-1-8-1": [
    {
      change: "确认定义域对称并代入 −x",
      text: "区间 (−2,2) 关于原点对称。要检验 F 的奇偶性，先把表达式里的 x 全部换成 −x。",
      formula: math`F(-x)=2f(-x)+3g(-x)`,
    },
    {
      change: "代入同为偶函数的条件",
      text: "当 f 和 g 都是偶函数时，f(−x)=f(x) 且 g(−x)=g(x)，两项都保持原样，整个和也就保持原样。",
      formula: math`F(-x)=2f(x)+3g(x)=F(x)`,
    },
    {
      change: "代入同为奇函数的条件并提负号",
      text: "当 f 和 g 都是奇函数时，两项各自多出一个负号。把公共的 −1 提出来，就能看出它与 −F(x) 的关系，请据此写出完整结论。",
      formula: math`\begin{gathered}
F(-x)=-2f(x)-3g(x)\\[4pt]
=-[2f(x)+3g(x)]=-F(x)
\end{gathered}`,
    },
  ],

  "jc935-1-1-8-2": [
    {
      change: "确认定义域对称并写出 F(−x)",
      text: "区间 (−3,3) 关于原点对称。把 x 替换成 −x，准备观察乘积里会出现几个负号。",
      formula: math`F(-x)=4f(-x)g(-x)`,
    },
    {
      change: "检查同偶与同奇时的负号个数",
      text: "两个偶函数出现 0 个负号，两个奇函数出现 2 个负号，负负得正后都回到原来的 4f(x)g(x)。",
      formula: math`\begin{gathered}
4f(x)g(x)=F(x)\\[4pt]
4[-f(x)][-g(x)]=F(x)
\end{gathered}`,
    },
    {
      change: "检查一奇一偶时的符号结果",
      text: "一奇一偶时只有一个因子变号，乘积整体多出一个负号。请汇总三种情况，分别写出奇偶性结论。",
      formula: math`F(-x)=-4f(x)g(x)=-F(x)`,
    },
  ],

  "jc935-1-1-9-1": [
    {
      change: "确认定义域关于原点对称",
      text: "f(x) 是多项式，定义域为全体实数，显然关于原点对称，满足讨论奇偶性的前提。",
      formula: math`D_f=\mathbb R`,
    },
    {
      change: "把表达式里的 x 换成 −x",
      text: "将每一处 x 替换成 −x，注意括号不要漏掉，方便下一步处理平方。",
      formula: math`f(-x)=(-x)^2[4-(-x)^2]`,
    },
    {
      change: "化简平方项并与 f(x) 对照",
      text: "因为 (−x)²=x²，两个因子都没有改变，整个乘积与原函数完全一致。请据此写出奇偶性结论。",
      formula: math`f(-x)=x^2(4-x^2)=f(x)`,
    },
  ],

  "jc935-1-1-9-2": [
    {
      change: "代入 −x 观察各项符号变化",
      text: "把 x 换成 −x，偶次项 2x² 保持不变，奇次项 −3x³ 变了号。看起来它既不像 f(x) 也不像 −f(x)。",
      formula: math`f(-x)=2x^2+3x^3`,
    },
    {
      change: "挑一对非零相反数直接算值",
      text: "要严格否定奇偶性，只需举出一个具体反例。取最简单的 x=1 和 x=−1 分别代入计算。",
      formula: math`\begin{gathered}
f(1)=2(1)^2-3(1)^3\\[4pt]
f(-1)=2(-1)^2-3(-1)^3
\end{gathered}`,
    },
    {
      change: "比较两个函数值并排除奇偶",
      text: "算出 f(1)=−1 和 f(−1)=5。因为 5 既不等于 −1，也不等于它的相反数 1，请据此写出最终判断。",
      formula: math`\begin{gathered}
f(1)=-1,\quad f(-1)=5\\[4pt]
f(-1)\ne f(1),\quad f(-1)\ne -f(1)
\end{gathered}`,
    },
  ],

  "jc935-1-1-9-3": [
    {
      change: "先确认分母恒正与定义域对称",
      text: "因为 x²≥0，分母 4+x²≥4 永远不为 0，所以定义域是全体实数，关于原点对称。",
      formula: math`4+x^2\ge 4>0,\quad D_f=\mathbb R`,
    },
    {
      change: "把分子和分母的 x 都换成 −x",
      text: "用 −x 替换所有 x，分子和分母里出现的都只有 x 的平方。",
      formula: math`f(-x)=\frac{4-(-x)^2}{4+(-x)^2}`,
    },
    {
      change: "化简平方并与原式对比",
      text: "由 (−x)²=x²，分子分母全部回到原样，得到 f(−x)=f(x)。请据此写出最终判断。",
      formula: math`f(-x)=\frac{4-x^2}{4+x^2}=f(x)`,
    },
  ],

  "jc935-1-1-9-4": [
    {
      change: "先用平方差合并后两个因子",
      text: "定义域为全体实数，关于原点对称。把 (x−2)(x+2) 合并成 x²−4 后，奇次和偶次因子会更清楚。",
      formula: math`f(x)=x(x^2-4)`,
    },
    {
      change: "把表达式里的 x 换成 −x",
      text: "将外面的 x 和括号里的 x 同时替换成 −x。",
      formula: math`f(-x)=(-x)[(-x)^2-4]`,
    },
    {
      change: "化简括号并提出外面的负号",
      text: "括号内 (−x)²−4 还原为 x²−4，外面的 −x 留下一个负号，刚好得到 −f(x)。请据此写出结论。",
      formula: math`f(-x)=-x(x^2-4)=-f(x)`,
    },
  ],

  "jc935-1-1-9-5": [
    {
      change: "选一对好算的相反数角来检验",
      text: "式子里同时含有奇函数 sin x、偶函数 cos x 和常数 −1，大概率非奇非偶。选 sin 取 1 且 cos 取 0 的角 π/2 和 −π/2 来试。",
      formula: math`x=\frac{\pi}{2},\quad -x=-\frac{\pi}{2}`,
    },
    {
      change: "分别代入计算两个函数值",
      text: "利用 sin(±π/2)=±1、cos(±π/2)=0，分别算出这两个点处的函数值。",
      formula: math`\begin{gathered}
f(\pi/2)=2(1)+0-1=1\\[4pt]
f(-\pi/2)=2(-1)+0-1=-3
\end{gathered}`,
    },
    {
      change: "对比结果排除偶函数和奇函数",
      text: "−3 既不等于 1，也不等于 −1，说明 f(−x)=f(x) 和 f(−x)=−f(x) 都不恒成立。请据此写出最终结论。",
      formula: math`\begin{gathered}
f(-\pi/2)\ne f(\pi/2)\\[4pt]
f(-\pi/2)\ne -f(\pi/2)
\end{gathered}`,
    },
  ],

  "jc935-1-1-9-6": [
    {
      change: "先确认定义域关于原点对称",
      text: "指数函数 3^x 和 3^(−x) 对所有实数都有定义，所以定义域为全体实数，关于原点对称。",
      formula: math`D_f=\mathbb R`,
    },
    {
      change: "把指数里的 x 全部换成 −x",
      text: "代换后，第一项变成 3^(−x)，第二项的指数变成 −(−x)=x。",
      formula: math`f(-x)=\frac{3^{-x}+3^x}{2}`,
    },
    {
      change: "用加法交换律与原函数对比",
      text: "分子的两项只是互换了先后顺序，和完全不变，因此 f(−x)=f(x)。请写出奇偶性结论。",
      formula: math`f(-x)=\frac{3^x+3^{-x}}{2}=f(x)`,
    },
  ],

  "jc935-1-1-10-1": [
    {
      change: "写出周期定义对应的等式",
      text: "设 T>0 是周期，就需要把 x 换成 x+T 后函数值对所有实数 x 保持不变。",
      formula: math`\cos((x+T)-5)=\cos(x-5)`,
    },
    {
      change: "看清内层角度的增量",
      text: "把括号重新组合，(x+T)−5 等于 (x−5)+T。常数 −5 只是横向平移，角度的增量恰好就是 T。",
      formula: math`\cos((x-5)+T)=\cos(x-5)`,
    },
    {
      change: "对照余弦的最小正周期下结论",
      text: "基本余弦函数 cos u 的最小正周期是 2π，任何更小的正数 T 都无法让整条曲线完全重合。请据此写出最终最小正周期。",
      formula: math`T_{\min}=2\pi`,
    },
  ],

  "jc935-1-1-10-2": [
    {
      change: "把 x 换成 x+T 看角度增量",
      text: "把自变量增加 T，乘开内层括号可以看到角度增加了 6T。",
      formula: math`\begin{gathered}f(x+T)=\cos(6(x+T))\\=\cos(6x+6T)\end{gathered}`,
    },
    {
      change: "令角度增量等于余弦的最小正周期",
      text: "要让 cos(6x+6T) 对所有 x 都等于 cos(6x)，且 T 取最小正值，内层角度增量 6T 必须恰好等于 2π。",
      formula: math`6T=2\pi`,
    },
    {
      change: "解方程并约分得到 T",
      text: "两边同除以 6，再把分数约到最简，即可写出最小正周期。",
      formula: math`T=\frac{2\pi}{6}`,
    },
  ],

  "jc935-1-1-10-3": [
    {
      change: "剥离不改周期的常数偏移",
      text: "前面的 +4 只是把整条正弦波向上平移 4 个单位，不改变横轴上的重复间隔，只需关注 sin(3πx)。",
      formula: math`4+\sin(3\pi(x+T))=4+\sin(3\pi x)`,
    },
    {
      change: "展开内层找出角度的增量",
      text: "把 3π 乘进括号里，看到 x 增加 T 时，正弦里的角度增加了 3πT。",
      formula: math`\sin(3\pi x+3\pi T)=\sin(3\pi x)`,
    },
    {
      change: "令角度增量等于 2π 并解出 T",
      text: "正弦的最小正周期是 2π，令 3πT=2π 后两边同除 3π，约去 π 即可写出最终答案。",
      formula: math`\begin{gathered}
3\pi T=2\pi\\[4pt]
T=\frac{2\pi}{3\pi}
\end{gathered}`,
    },
  ],

  "jc935-1-1-10-4": [
    {
      change: "用反证法假设存在正周期 T",
      text: "f(x)=2x cos x 在全体实数上连续。如果它有正周期 T>0，那么它在闭区间 [0,T] 上有界，靠平移重复后在整条数轴上都必须有界。",
      formula: math`|f(x)|\le M\quad(\forall x\in\mathbb R)`,
    },
    {
      change: "挑一列让余弦恒为 1 的点",
      text: "为了看清前面因子 2x 的增长趋势，取点列 x_k=2kπ（k 为自然数），在这些点上 cos(2kπ)=1。",
      formula: math`x_k=2k\pi,\quad \cos(2k\pi)=1`,
    },
    {
      change: "算出点列上的值并导出矛盾",
      text: "代入后得到 f(2kπ)=4kπ，随着 k 增大可以超过任意常数 M，这与周期连续函数必有界矛盾。请据此写出最终结论。",
      formula: math`f(2k\pi)=4k\pi\to+\infty`,
    },
  ],

  "jc935-1-1-10-5": [
    {
      change: "用降幂公式把平方化成一次余弦",
      text: "直接看 sin²(2x) 容易误以为周期和 sin(2x) 一样。用二倍角降幂公式 sin²u=(1−cos 2u)/2，令 u=2x 去掉平方。",
      formula: math`\begin{gathered}
\sin^2 u=\frac{1-\cos(2u)}{2}\\[4pt]
f(x)=\frac{1-\cos(4x)}{2}
\end{gathered}`,
    },
    {
      change: "剥离常数与倍数，锁定 cos(4x)",
      text: "加常数 1/2 和乘非零常数 −1/2 都不改变最小正周期，所以 f(x) 的最小正周期就等于 cos(4x) 的最小正周期。",
      formula: math`\cos(4x+4T)=\cos(4x)`,
    },
    {
      change: "令角度增量 4T=2π 解出 T",
      text: "让余弦的内层角度刚好走完一整圈 2π，两边同除以 4 并约分，即可写出最终答案。",
      formula: math`4T=2\pi\implies T=\frac{2\pi}{4}`,
    },
  ],

  "jc935-1-1-11-1": [
    {
      change: "设 y=f(x) 并先记下原函数值域",
      text: "反函数的定义域就是原函数的值域。实立方根能取遍所有实数，所以先把 y∈R 记下来。",
      formula: math`y=\sqrt[3]{x-4},\quad y\in\mathbb R`,
    },
    {
      change: "两边同时立方去掉立方根",
      text: "为了把被开方数里的 x 解放出来，等式两边同时取三次方。",
      formula: math`y^3=x-4`,
    },
    {
      change: "解出 x 再互换字母写出反函数",
      text: "把 −4 移到左边得到 x=y³+4。最后按习惯把 x 和 y 互换位置，并附上反函数定义域即可。",
      formula: math`x=y^3+4`,
    },
  ],

  "jc935-1-1-11-2": [
    {
      change: "令 y=f(x) 并乘掉分母",
      text: "原函数要求 x≠−1。设 y=(2−x)/(1+x)，等式两边同乘 1+x 化为整式方程。",
      formula: math`\begin{gathered}
y=\frac{2-x}{1+x}\\[4pt]
y(1+x)=2-x
\end{gathered}`,
    },
    {
      change: "把含 x 的项归到等号左边",
      text: "展开得 y+yx=2−x，把 −x 移到左边、y 移到右边，再提取公因式 x。",
      formula: math`\begin{gathered}
yx+x=2-y\\[4pt]
x(1+y)=2-y
\end{gathered}`,
    },
    {
      change: "排除系数为零的点再除掉 1+y",
      text: "若 y=−1，方程变为 0=3 无解，所以值域要求 y≠−1。在 y≠−1 时两边同除 1+y 解出 x，互换字母即可写出反函数和定义域。",
      formula: math`x=\frac{2-y}{1+y},\quad y\ne -1`,
    },
  ],

  "jc935-1-1-11-3": [
    {
      change: "令 y=f(x) 并交叉相乘去分母",
      text: "原函数定义域为 x≠1/2。等式两边同乘 2x−1 并展开括号。",
      formula: math`\begin{gathered}
y(2x-1)=3x+2\\[4pt]
2xy-y=3x+2
\end{gathered}`,
    },
    {
      change: "合并所有含 x 的项到左边",
      text: "把 3x 移到左边、−y 移到右边，然后把左边提取公因式 x。",
      formula: math`(2y-3)x=y+2`,
    },
    {
      change: "检验禁用值并解出 x",
      text: "若 2y−3=0 即 y=3/2，方程变成 0=7/2 矛盾，故 y≠3/2。两边同除 2y−3 得到 x，再互换 x 与 y 写出反函数及定义域。",
      formula: math`x=\frac{y+2}{2y-3},\quad y\ne \frac{3}{2}`,
    },
  ],

  "jc935-1-1-11-4": [
    {
      change: "先定出内层角度与输出 y 的范围",
      text: "由 −π/4≤x≤π/4 乘以 2 得 −π/2≤2x≤π/2，这刚好是正弦单调递增的主值区间，因此 sin(2x) 取遍 [−1,1]，乘 3 后值域为 [−3,3]。",
      formula: math`\begin{gathered}
-\frac{\pi}{2}\le 2x\le \frac{\pi}{2}\\[4pt]
-3\le y\le 3
\end{gathered}`,
    },
    {
      change: "除掉外层系数 3 并取反正弦",
      text: "先写成 sin(2x)=y/3。因为 2x 落在 [−π/2,π/2]，可以用反正弦唯一还原出 2x。",
      formula: math`\begin{gathered}
\sin(2x)=\frac{y}{3}\\[4pt]
2x=\arcsin\frac{y}{3}
\end{gathered}`,
    },
    {
      change: "两边除以 2 再互换字母",
      text: "解出 x 后互换 x 和 y，并把第一步求出的原函数值域 [−3,3] 写成反函数的定义域即可。",
      formula: math`\begin{gathered}
x=\frac{1}{2}\arcsin\frac{y}{3}\\[4pt]
-3\le y\le 3
\end{gathered}`,
    },
  ],

  "jc935-1-1-11-5": [
    {
      change: "记下值域并把常数 2 移到左边",
      text: "对数 ln(x+4) 的值域是全体实数，加 2 后值域仍是全体实数。先移项把对数项单独留出来。",
      formula: math`y-2=\ln(x+4),\quad y\in\mathbb R`,
    },
    {
      change: "两边取以 e 为底的指数",
      text: "利用指数与自然对数互为逆运算，把 ln 消掉，露出里面的 x+4。",
      formula: math`e^{y-2}=x+4`,
    },
    {
      change: "移项解出 x 再互换字母",
      text: "两边减 4 解出 x，互换 x 与 y 并说明反函数定义域为全体实数即可。",
      formula: math`x=e^{y-2}-4`,
    },
  ],

  "jc935-1-1-11-6": [
    {
      change: "令 t=5^x 并先定出值域范围",
      text: "把 5^x 暂时看成一个正数盒子 t>0。写成 y=t/(1+t)=1−1/(1+t)，因为 t 取遍 (0,+∞)，所以 y 严格夹在 0 和 1 之间。",
      formula: math`\begin{gathered}
t=5^x>0,\quad y=\frac{t}{1+t}\\[4pt]
0<y<1
\end{gathered}`,
    },
    {
      change: "先从分式里把盒子 t 解出来",
      text: "两边同乘 1+t 得 y+yt=t，把含 t 的项移到右边提公因式，因为 1−y>0 可安全相除。",
      formula: math`\begin{gathered}
y=(1-y)t\\[4pt]
t=\frac{y}{1-y}
\end{gathered}`,
    },
    {
      change: "代回 5^x 并取以 5 为底的对数",
      text: "由 5^x=y/(1−y) 两边取 log_5 解出 x。最后互换 x 与 y，并附上定义域 0<x<1 即可。",
      formula: math`x=\log_5\frac{y}{1-y},\quad 0<y<1`,
    },
  ],

  "jc935-1-1-12-1": [
    {
      change: "把内层 u=sin x 代进外层平方",
      text: "把 y=u² 中的 u 整体替换成 sin x，得到复合函数的表达式。",
      formula: math`y=(\sin x)^2=\sin^2 x`,
    },
    {
      change: "先算出两个点的内层正弦值",
      text: "按先内后外的顺序，分别计算 x_1=π/4 和 x_2=π/2 对应的中间变量 u。",
      formula: math`\begin{gathered}
u_1=\sin(\pi/4)=\frac{\sqrt 2}{2}\\[4pt]
u_2=\sin(\pi/2)=1
\end{gathered}`,
    },
    {
      change: "把两个内层值各自平方",
      text: "将 u_1 和 u_2 送进外层平方运算，算出具体结果后与复合表达式一起写出即可。",
      formula: math`y_1=\left(\frac{\sqrt 2}{2}\right)^2,\quad y_2=1^2`,
    },
  ],

  "jc935-1-1-12-2": [
    {
      change: "把内层 u=3x 填入正弦函数",
      text: "将 y=sin u 中的 u 直接换成 3x，得到复合函数。",
      formula: math`y=\sin(3x)`,
    },
    {
      change: "先算出放大后的两个角度",
      text: "把 x_1=π/18 和 x_2=π/6 分别乘以 3，化简成熟悉的特殊角。",
      formula: math`\begin{gathered}
u_1=3\cdot\frac{\pi}{18}=\frac{\pi}{6}\\[4pt]
u_2=3\cdot\frac{\pi}{6}=\frac{\pi}{2}
\end{gathered}`,
    },
    {
      change: "求两个特殊角的正弦值",
      text: "分别算出 sin(π/6) 和 sin(π/2) 的数值，即可写出完整的复合函数和 (y_1,y_2)。",
      formula: math`y_1=\sin\frac{\pi}{6},\quad y_2=\sin\frac{\pi}{2}`,
    },
  ],

  "jc935-1-1-12-3": [
    {
      change: "把内层多项式放进根号里",
      text: "将 y=√u 中的 u 整体替换成 4+x²，根号要包住整个和。",
      formula: math`y=\sqrt{4+x^2}`,
    },
    {
      change: "先算出两个点处的内层值 u",
      text: "把 x_1=0 和 x_2=3 分别代入 4+x²，先把根号里面的加法算完。",
      formula: math`\begin{gathered}
u_1=4+0^2=4\\[4pt]
u_2=4+3^2=13
\end{gathered}`,
    },
    {
      change: "对两个内层结果分别开平方根",
      text: "取算术平方根并把能开尽的 √4 化简，即可写出最终答案。",
      formula: math`y_1=\sqrt{4},\quad y_2=\sqrt{13}`,
    },
  ],

  "jc935-1-1-12-4": [
    {
      change: "把内层 u=2x² 放到指数位置",
      text: "用 2x² 替换 y=e^u 中的 u，注意指数上的系数 2 是在平方外面乘的。",
      formula: math`y=e^{2x^2}`,
    },
    {
      change: "先算出两个点处的指数值 u",
      text: "先算平方再乘 2，注意 (−2)²=4 为正数。",
      formula: math`\begin{gathered}
u_1=2(-2)^2=8\\[4pt]
u_2=2(1)^2=2
\end{gathered}`,
    },
    {
      change: "把两个指数代回外层 e^u",
      text: "将算出的 u_1 和 u_2 放到 e 的指数位置，即可整理出完整的复合函数与两点函数值。",
      formula: math`y_1=e^8,\quad y_2=e^2`,
    },
  ],

  "jc935-1-1-12-5": [
    {
      change: "把 u=2^x 立方并用幂的乘方法则",
      text: "把 u 换成 2^x 得到 (2^x)³，利用 (a^m)^n=a^(mn) 将指数相乘化简。",
      formula: math`y=(2^x)^3=2^{3x}`,
    },
    {
      change: "把两个 x 值分别代进指数 3x",
      text: "先算出 x_1=2 和 x_2=−1 对应的指数 6 和 −3。",
      formula: math`\begin{gathered}
y_1=2^{3\cdot 2}=2^6\\[4pt]
y_2=2^{3\cdot(-1)}=2^{-3}
\end{gathered}`,
    },
    {
      change: "把正指数和负指数化为具体数字",
      text: "负指数 2^(−3) 表示 1/2³。算出两个具体数值后，即可对照参考解答。",
      formula: math`y_1=2^6,\quad y_2=\frac{1}{2^3}`,
    },
  ],

  "jc935-1-1-13-1": [
    {
      change: "让内层 x² 落在 f 的定义域内",
      text: "要使 f(x²) 有意义，必须把整个内层输出 x² 送进 D_f=[0,4]。",
      formula: math`0\le x^2\le 4`,
    },
    {
      change: "去掉自动成立的左侧不等式",
      text: "对一切实数都有 x²≥0，左边条件天然满足，只需解右边的二次不等式。",
      formula: math`x^2\le 4`,
    },
    {
      change: "开平方解出 x 的双边范围",
      text: "x²≤4 等价于 |x|≤2，正负两边端点都能取到。请据此写出闭区间定义域。",
      formula: math`-2\le x\le 2`,
    },
  ],

  "jc935-1-1-13-2": [
    {
      change: "让内层 cos x 落在 [0,2] 内",
      text: "复合函数 f(cos x) 有意义的条件是内层值 cos x 属于 D_f=[0,2]。",
      formula: math`0\le \cos x\le 2`,
    },
    {
      change: "去掉自动满足的上界条件",
      text: "因为对一切实数都有 cos x≤1<2，上界 2 永远成立，只需保证余弦非负。",
      formula: math`\cos x\ge 0`,
    },
    {
      change: "先找主周期内的解再按 2π 平移",
      text: "在一个周期 [−π,π] 上，cos x≥0 恰对应 [−π/2,π/2]。把它向左右每隔 2π 复制一次，请用整数 k 写出所有闭区间的并集。",
      formula: math`\begin{gathered}
2k\pi-\frac{\pi}{2}\le x\le 2k\pi+\frac{\pi}{2}\\[4pt]
(k\in\mathbb Z)
\end{gathered}`,
    },
  ],

  "jc935-1-1-13-3": [
    {
      change: "让内层 x+2 落在原定义域内",
      text: "把 x+2 夹进 (−1,3]，注意左端是严格小于号、右端是小于等于号。",
      formula: math`-1<x+2\le 3`,
    },
    {
      change: "不等式三边同时减去 2",
      text: "三边同减 2 不改变不等号方向，也不改变两端点的开闭性质。",
      formula: math`-1-2<x\le 3-2`,
    },
    {
      change: "化简左右端点得到 x 的范围",
      text: "算出两端数字后，保持左开右闭写成区间即可。",
      formula: math`-3<x\le 1`,
    },
  ],

  "jc935-1-1-13-4": [
    {
      change: "分别为两项列出定义域条件",
      text: "两项相加要求 f(x+a) 和 f(x−a) 同时有意义，把两个内层都放进 [0,4]。",
      formula: math`\begin{gathered}
0\le x+a\le 4\\[4pt]
0\le x-a\le 4
\end{gathered}`,
    },
    {
      change: "分别解出两项允许的区间",
      text: "第一条不等式三边减 a，第二条三边加 a，得到两个平移后的闭区间。",
      formula: math`\begin{gathered}
-a\le x\le 4-a\\[4pt]
a\le x\le 4+a
\end{gathered}`,
    },
    {
      change: "求两区间的交集并讨论是否非空",
      text: "因为 a>0，交集的左端是 max(−a,a)=a，右端是 min(4−a,4+a)=4−a。只有当 a≤4−a 即 a≤2 时区间非空，请分 0<a≤2 与 a>2 两种情况写出完整定义域。",
      formula: math`\begin{gathered}
a\le x\le 4-a\\[4pt]
a\le 4-a\iff a\le 2
\end{gathered}`,
    },
  ],

  "jc935-1-1-14-1": [
    {
      change: "利用 2^x 恒正去掉外层绝对值",
      text: "先算内层 u=2^x。因为 2^x>0 恒成立，外层条件里的 |u| 可以直接写成 2^x。",
      formula: math`|2^x|=2^x`,
    },
    {
      change: "把关于 2^x 的三段翻译成 x 的范围",
      text: "指数函数 2^x 严格递增且 2¹=2，所以 2^x 与 2 的大小关系直接等价于 x 与 1 的大小关系。",
      formula: math`\begin{gathered}
2^x<2\iff x<1\\[4pt]
2^x=2\iff x=1\\[4pt]
2^x>2\iff x>1
\end{gathered}`,
    },
    {
      change: "对应填入三段高度并定好端点虚实",
      text: "按 x<1、x=1、x>1 分别填入高度 2、1、−2。作图时在 x=1 处，上下两条射线端点画空心点，孤立点 (1,1) 画实心点。请写出完整分段式并作图。",
      formula: math`\begin{gathered}
x<1\mapsto 2,\quad x=1\mapsto 1\\[4pt]
x>1\mapsto -2
\end{gathered}`,
    },
  ],

  "jc935-1-1-14-2": [
    {
      change: "先按 x 读取内层 f(x) 的三段取值",
      text: "这次先做阶梯函数 f(x)，所以分界点仍然是 |x|<2、|x|=2 和 |x|>2，对应输出 2、1、−2。",
      formula: math`\begin{gathered}
|x|<2:\ f(x)=2\\[4pt]
|x|=2:\ f(x)=1\\[4pt]
|x|>2:\ f(x)=-2
\end{gathered}`,
    },
    {
      change: "把三个常数值送进外层 2^u",
      text: "将每一段上 f(x) 的常数结果直接当作指数，代入 g(u)=2^u。",
      formula: math`\begin{gathered}
|x|<2:\ 2^2\\[4pt]
|x|=2:\ 2^1\\[4pt]
|x|>2:\ 2^{-2}
\end{gathered}`,
    },
    {
      change: "算出三段高度并标清边界实心点",
      text: "算出 2²=4、2¹=2、2^(−2)=1/4。作图时 x=±2 处高度 2 画实心点，高度 4 和 1/4 处画空心点。请整理出分段表达式并完成作图。",
      formula: math`2^2=4,\quad 2^1=2,\quad 2^{-2}=\frac{1}{4}`,
    },
  ],

  "jc935-1-1-15": [
    {
      change: "用底宽 b 和水深 h 表示上底与斜边",
      text: "边坡与底边夹角为 45°，两侧的直角三角形都是等腰直角三角形，每侧水平伸出 h，斜边长 √2·h。",
      formula: math`\begin{gathered}
\text{top}=b+2h\\[4pt]
\text{side}=\sqrt 2\,h
\end{gathered}`,
    },
    {
      change: "由梯形面积 S=9 解出底宽 b",
      text: "套用梯形面积公式 S=(上底+下底)h/2，化简得 h(b+h)=9，因为 h>0 两边同除 h 解出 b。",
      formula: math`\begin{gathered}
\frac{b+(b+2h)}{2}\cdot h=9\\[4pt]
b=\frac{9}{h}-h
\end{gathered}`,
    },
    {
      change: "把 b 代进湿周 L=b+2√2·h 并化简",
      text: "湿周是水接触到的底边加两条斜边，不含水面。把 b 换掉后合并含 h 的同类项。",
      formula: math`\begin{gathered}
L(h)=\left(\frac{9}{h}-h\right)+2\sqrt 2\,h\\[4pt]
=\frac{9}{h}+(2\sqrt 2-1)h
\end{gathered}`,
    },
    {
      change: "由底宽 b>0 和 h>0 解出定义域",
      text: "要求 b=9/h−h>0，乘以正数 h 得 h²<9。结合 h>0 即可写出完整定义域并汇总最终结果。",
      formula: math`\frac{9}{h}-h>0\iff 0<h^2<9`,
    },
  ],

  "jc935-1-1-16": [
    {
      change: "找出斜线经过正方形顶点的分界 t",
      text: "观察直线 x+y=t 从左下角往右上角扫过正方形 [0,2]×[0,2]：在 (0,0) 处 t=0，经过 (2,0) 和 (0,2) 时 t=2，到 (2,2) 时 t=4，由此分成三段。",
      formula: math`0\le t\le 2,\quad 2<t\le 4,\quad t>4`,
    },
    {
      change: "算第一段左下直角三角形的面积",
      text: "当 0≤t≤2 时，直线与两坐标轴截出的区域是两条直角边都等于 t 的等腰直角三角形。",
      formula: math`S(t)=\frac{1}{2}t^2\quad(0\le t\le 2)`,
    },
    {
      change: "第二段用总面积扣掉右上小角",
      text: "当 2<t≤4 时，没被扫到的右上角是直角边为 2−(t−2)=4−t 的等腰直角三角形，从正方形总面积 4 里减去它即可。",
      formula: math`S(t)=4-\frac{1}{2}(4-t)^2\quad(2<t\le 4)`,
    },
    {
      change: "确认第三段常面积并汇总分段式",
      text: "当 t>4 时，整个正方形都在直线下方，面积恒为 4。把三段合并写成分段函数即可。",
      formula: math`S(t)=4\quad(t>4)`,
    },
  ],

  "jc935-1-1-17-1": [
    {
      change: "设一次函数并先用冰点求截距",
      text: "两个温标成一次函数关系，设 F=kC+b。代入第一组基准点 (0,32)，立刻得到截距 b。",
      formula: math`F=kC+b,\quad b=32`,
    },
    {
      change: "用两组基准点之差求斜率 k",
      text: "摄氏升高 100 度对应华氏升高 212−32=180 度，相除约分得到斜率 k=9/5，写出换算公式。",
      formula: math`\begin{gathered}
k=\frac{212-32}{100-0}=\frac{9}{5}\\[4pt]
F=\frac{9}{5}C+32
\end{gathered}`,
    },
    {
      change: "分别代入 68℉ 和 −10℃ 做换算",
      text: "由 68=(9/5)C_1+32 先减 32 再乘 5/9 求摄氏；直接把 C_2=−10 代入公式求华氏。算出两个数值即可写出完整答案。",
      formula: math`\begin{gathered}
C_1=\frac{5}{9}(68-32)\\[4pt]
F_2=\frac{9}{5}(-10)+32
\end{gathered}`,
    },
  ],

  "jc935-1-1-17-2": [
    {
      change: "把相等的读数统一记作 t",
      text: "若存在某个温度使摄氏与华氏读数相同，就令 C=F=t，代入换算公式得到关于 t 的一元一次方程。",
      formula: math`t=\frac{9}{5}t+32`,
    },
    {
      change: "把含 t 的项移到左边合并",
      text: "两边同时减去 (9/5)t，左边合并系数 1−9/5=−4/5。",
      formula: math`-\frac{4}{5}t=32`,
    },
    {
      change: "两边同乘 −5/4 解出 t 并检验",
      text: "算出 t 的数值后，可代回 (9/5)t+32 检验是否等于 t，再写出存在性与具体温度结论。",
      formula: math`t=32\cdot\left(-\frac{5}{4}\right)`,
    },
  ],

  "jc935-1-1-18": [
    {
      change: "求斜边与三个拐弯和相遇时刻",
      text: "由勾股定理得斜边 AB=√(12²+9²)=15，周长为 36。Q 走 2x 在 x=6 处到 A 拐弯，P 走 x 在 x=9 处到 B 拐弯，两者在 x+2x=36 即 x=12 时首次相遇。",
      formula: math`\begin{gathered}
AB=\sqrt{12^2+9^2}=15\\[4pt]
x\in[0,6],\ (6,9],\ (9,12]
\end{gathered}`,
    },
    {
      change: "算第一段两点都在直角边的面积",
      text: "当 0≤x≤6 时，P 在 CB 上、Q 在 CA 上，直角边分别为 CP=x 与 CQ=2x，直接用直角三角形面积公式。",
      formula: math`S(x)=\frac{1}{2}\cdot x\cdot 2x=x^2`,
    },
    {
      change: "算第二段 Q 在斜边 AB 上的面积",
      text: "当 6<x≤9 时，P 仍在 CB 上（CP=x），Q 在 AB 上且距 B 为 BQ=12+15−2x=27−2x。由相似三角形，Q 到 BC 的高为 (12/15)BQ=(4/5)(27−2x)。",
      formula: math`\begin{gathered}
h_Q=\frac{12}{15}(27-2x)=\frac{4}{5}(27-2x)\\[4pt]
S(x)=\frac{1}{2}x\cdot\frac{4}{5}(27-2x)
\end{gathered}`,
    },
    {
      change: "算第三段两点同在斜边上的面积",
      text: "当 9<x≤12 时，P 和 Q 都在 AB 上，相距 PQ=36−3x，而 C 到斜边 AB 的高是 (12·9)/15=36/5。化简每段系数后即可汇总写出完整分段函数。",
      formula: math`\begin{gathered}
h_C=\frac{12\cdot 9}{15}=\frac{36}{5}\\[4pt]
S(x)=\frac{1}{2}\cdot\frac{36}{5}(36-3x)
\end{gathered}`,
    },
  ],
};

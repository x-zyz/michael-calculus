# 习题 6-3 与总习题六 原创同构题库复核说明

- 数据文件：`src/data/bankIntegralPhysicsReview.ts`（导出 `bankIntegralPhysicsReview`）
- 符号校验脚本：`scripts/check-bank-6-3-6-review.py`（SymPy 全量通过）
- 覆盖范围：上册习题 6-3（12 题）与上册总习题六（20 题），合计 **32 题**。

## 1. 覆盖清点

### 习题 6-3（12 题）
| ID | 题号 | 主题 | 校验方式 |
| --- | --- | --- | --- |
| `jc935-6-3-1` | 第 1 题 | 胡克定律弹簧拉伸功（8 cm） | symbolic |
| `jc935-6-3-2` | 第 2 题 | 圆筒气体等温压缩功（压缩至 1/3 体积） | symbolic |
| `jc935-6-3-3-1` | 第 3 题（1） | 克服行星引力升空功公式证明 | symbolic |
| `jc935-6-3-3-2` | 第 3 题（2） | 250 kg 卫星入轨 600 km 做功 | symbolic |
| `jc935-6-3-4` | 第 4 题 | 变速直线运动克服介质阻力功（x=ct², R=kv³） | symbolic |
| `jc935-6-3-5` | 第 5 题 | 等功锤击木桩二次入土深度 | symbolic |
| `jc935-6-3-6` | 第 6 题 | 倒圆锥水池抽水做功 | symbolic |
| `jc935-6-3-7` | 第 7 题 | 矩形闸门对角线两侧水压力 2 倍关系证明 | symbolic |
| `jc935-6-3-8` | 第 8 题 | 等腰梯形闸门单侧水压力 | symbolic |
| `jc935-6-3-9` | 第 9 题 | 沉没等腰三角形薄片水压力 | symbolic |
| `jc935-6-3-10` | 第 10 题 | 均匀细直棒对端外质点引力分量 | symbolic |
| `jc935-6-3-11` | 第 11 题 | 均匀圆弧细棒对圆心质点引力 | symbolic |

### 总习题六（20 题）
| ID | 题号 | 主题 | 校验方式 |
| --- | --- | --- | --- |
| `jc935-6-review-1-1` | 第 1 题（1） | 三次曲线 y=x³−5x²+4x 与 x 轴所围面积 | symbolic |
| `jc935-6-review-1-2` | 第 1 题（2） | 完全平方型弧长 y=(√x/6)(12−x) | symbolic |
| `jc935-6-review-2-1` | 第 2 题（1） | 共线细棒对质点引力积分表达与求值 | symbolic |
| `jc935-6-review-2-2` | 第 2 题（2） | 单调下凸函数定积分与矩形、梯形面积比较证明 | manual |
| `jc935-6-review-2-3` | 第 2 题（3） | 球环体积 V=(π/6)H³ 与球半径无关（餐巾环） | symbolic |
| `jc935-6-review-3` | 第 3 题 | 变密度金属棒半质量分割点 | symbolic |
| `jc935-6-review-4` | 第 4 题 | 两极坐标圆公共部分面积 | symbolic |
| `jc935-6-review-5` | 第 5 题 | 等面积条件反求未知曲线方程 | symbolic |
| `jc935-6-review-6` | 第 6 题 | 定面积抛物线旋转体体积最小化 | symbolic |
| `jc935-6-review-7-1` | 第 7 题（1） | 过原点切线与 y=ln(2x) 所围面积 | symbolic |
| `jc935-6-review-7-2` | 第 7 题（2） | 上题区域绕 x=e/2 旋转体体积 | symbolic |
| `jc935-6-review-8` | 第 8 题 | y=xe^(−2x) 拐点切线与无界区域面积 | symbolic |
| `jc935-6-review-9` | 第 9 题 | 柱壳法求绕 y 轴旋转体体积 | symbolic |
| `jc935-6-review-10` | 第 10 题 | 偏心圆盘 (x−3)²+y²≤4 绕 y 轴环面体积 | symbolic |
| `jc935-6-review-11` | 第 11 题 | 圆 x²+y²=2 截抛物线 y=x² 的弧长 | symbolic |
| `jc935-6-review-12` | 第 12 题 | 等密度沉没球体提离水面做功 | symbolic |
| `jc935-6-review-13` | 第 13 题 | 倾斜沉没矩形薄板液体压力 | symbolic |
| `jc935-6-review-14` | 第 14 题 | 变密度星形线弧对原点单位质点引力 | symbolic |
| `jc935-6-review-15-1` | 第 15 题（1） | 等比做功打桩 4 次后的入土深度 | symbolic |
| `jc935-6-review-15-2` | 第 15 题（2） | 无限次等比打桩的极限深度 | symbolic |

## 2. 人工逻辑复核（Pure Proof）

### `jc935-6-review-2-2`
- 条件：在 $[a, b]$（$a < b$）上 $f(x) > 0$，$f'(x) < 0$，$f''(x) > 0$。
- 证明 $I_2 < I_1$：因 $f'(x) < 0$，$f$ 在 $[a, b]$ 上严格单调递减，故对任意 $x \in [a, b)$ 有 $f(x) > f(b)$。由定积分严格保号性得
  $$I_1 = \int_a^b f(x)\,dx > \int_a^b f(b)\,dx = f(b)(b-a) = I_2.$$
- 证明 $I_1 < I_3$：因 $f''(x) > 0$，$f$ 在 $[a, b]$ 上严格下凸（凹向上），故在开区间 $(a, b)$ 上曲线严格位于两端点连线
  $$g(x) = f(a) + \frac{f(b)-f(a)}{b-a}(x-a)$$
  的下方，即 $f(x) < g(x)$。两边在 $[a, b]$ 上积分得
  $$I_1 = \int_a^b f(x)\,dx < \int_a^b g(x)\,dx = \frac{1}{2}\left[f(a)+f(b)\right](b-a) = I_3.$$
- 综上 $I_2 < I_1 < I_3$，逻辑严密无懈可击；脚本另以 $f(x) = 1/x$ 在 $[1, 2]$ 上完成了数值抽检验证。

## 3. 质量与合规检查
- 原创同构：全部 32 题均更换参数、函数或物理情景，保留原题核心微元法与积分技巧，无原文照搬。
- 排版与 KaTeX：全部 `formula` 与 `solution` 通过 `katex.renderToString(..., { throwOnError: true, strict: "error" })` 严格模式检查，宽公式均以 `\begin{gathered}...\end{gathered}` 分行适配 360px 窄屏。
- TypeScript：`npx tsc --noEmit` 退出码为 0。

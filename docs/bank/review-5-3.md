# 上册习题 5-3 人工审核与证明校验记录

- 对应模块：`src/data/bankDefiniteMethods.ts`（导出 `bankDefiniteMethods`）
- 题量统计：共 45 题（第 1 题 26 小题、第 2–7 题 6 题、第 8 题 13 小题）
- 校验分布：
  - 符号验证（`symbolic`）：41 题，均通过 `scripts/check-bank-5-3.py`（SymPy 定积分 / FTC 求导验证 / 高精度数值积分与华里士递推校验，退出码 0）。
  - 人工证明审核（`manual`）：4 题（`jc935-5-3-2`、`jc935-5-3-4`、`jc935-5-3-5`、`jc935-5-3-6`），下方逐题核对推理链与端点条件。

## 人工证明题逐题复核

### 1. `jc935-5-3-2`（区间对称反射换元公式）
- **命题**：设 $g(t)$ 在 $[c, d]$ 上连续，证明 $\int_c^d g(t)\,dt = \int_c^d g(c+d-t)\,dt$。
- **复核**：令 $t = c + d - u$，映射 $u \mapsto c + d - u$ 在 $[c, d]$ 上连续可微且单调递减，$dt = -du$，下限 $t=c \Rightarrow u=d$，上限 $t=d \Rightarrow u=c$。代入换元公式得
  $$\int_c^d g(t)\,dt = -\int_d^c g(c+d-u)\,du = \int_c^d g(c+d-u)\,du = \int_c^d g(c+d-t)\,dt。$$
- **结论**：逻辑严密，满足定积分换元定理全部前提，通过。

### 2. `jc935-5-3-4`（贝塔型乘积幂次对称性）
- **命题**：设 $p, q \in \mathbb{N}_+$，证明 $\int_0^2 t^p(2-t)^q\,dt = \int_0^2 t^q(2-t)^p\,dt$。
- **复核**：被积函数为多项式，在 $[0, 2]$ 上连续。令 $t = 2 - u$，则 $2 - t = u$，$dt = -du$，端点 $0 \mapsto 2, 2 \mapsto 0$。故
  $$\int_0^2 t^p(2-t)^q\,dt = -\int_2^0 (2-u)^p u^q\,du = \int_0^2 u^q(2-u)^p\,du = \int_0^2 t^q(2-t)^p\,dt。$$
- **结论**：推理完整无瑕，通过。

### 3. `jc935-5-3-5`（任意象限三角绝对值积分等式）
- **命题**：设 $g(x)$ 在 $[0, 1]$ 上连续，$k \in \mathbb{Z}$，证明
  $$\int_{\frac{k}{2}\pi}^{\frac{k+1}{2}\pi} g(|\cos t|)\,dt = \int_{\frac{k}{2}\pi}^{\frac{k+1}{2}\pi} g(|\sin t|)\,dt = \int_0^{\frac{\pi}{2}} g(\cos t)\,dt。$$
- **复核**：
  1. 令 $t = u + \frac{k}{2}\pi$，则 $dt = du$，积分区间平移为 $[0, \frac{\pi}{2}]$。
  2. 当 $k$ 为偶数时，$|\cos(u + \frac{k}{2}\pi)| = |\cos u| = \cos u$，$|\sin(u + \frac{k}{2}\pi)| = |\sin u| = \sin u$；当 $k$ 为奇数时，$|\cos(u + \frac{k}{2}\pi)| = \sin u$，$|\sin(u + \frac{k}{2}\pi)| = \cos u$（因 $u \in [0, \frac{\pi}{2}]$ 上 $\sin u, \cos u \ge 0$）。
  3. 再由 $u = \frac{\pi}{2} - v$ 得 $\int_0^{\frac{\pi}{2}} g(\sin u)\,du = \int_0^{\frac{\pi}{2}} g(\cos v)\,dv$，故无论 $k$ 奇偶，连等式均成立。
- **结论**：分类完备，绝对值符号处理准确，通过。

### 4. `jc935-5-3-6`（变上限积分函数的奇偶性）
- **命题**：设 $g(t)$ 在 $\mathbb{R}$ 上连续，$G(x) = \int_0^{2x} g(t)\,dt$。证明：$g$ 为奇函数时 $G$ 为偶函数；$g$ 为偶函数时 $G$ 为奇函数。
- **复核**：对任意 $x \in \mathbb{R}$，在 $G(-x) = \int_0^{-2x} g(t)\,dt$ 中令 $t = -u$，则 $dt = -du$，下限 $0 \mapsto 0$，上限 $-2x \mapsto 2x$，得
  $$G(-x) = -\int_0^{2x} g(-u)\,du。$$
  - 若 $g$ 为奇函数，则 $g(-u) = -g(u)$，于是 $G(-x) = \int_0^{2x} g(u)\,du = G(x)$，即 $G$ 为偶函数；
  - 若 $g$ 为偶函数，则 $g(-u) = g(u)$，于是 $G(-x) = -\int_0^{2x} g(u)\,du = -G(x)$，即 $G$ 为奇函数。
- **结论**：避免仅凭导数奇偶性漏查常数的常见错误，直接换元证明严密，通过。

## 格式与版权合规复核
- 所有 45 题均为原创同构题，系数、被积函数或区间均与参考教材不同，保留核心换元与分部积分方法。
- 全部 LaTeX 公式与解答均已通过 KaTeX `strict: "error"` 校验，长式均采用 `\begin{gathered}...\end{gathered}` 分行以适配 360px 窄屏。
- 文件路径、导出名、注释与文档中均不含任何敏感教材品牌词。

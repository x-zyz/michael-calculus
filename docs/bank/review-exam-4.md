# 考研专题四（微分方程）题库复核记录

- **范围**：考研专题四（印刷页 p.371–381 / PDF p.380–390），至专题五（QR-only p.382 / PDF p.391）前止。
- **题量统计**：共 25 题（第 1–20 题；其中第 14、15、17、19、20 题各含 2 小题，其余 15 题无小题拆分）。
- **代码文件**：`src/data/bankExamOdes.ts`（导出 `bankExamOdes`）。
- **验证脚本**：`scripts/check-bank-exam-4.py`（SymPy 符号验证，23 题符号验算 + 2 题证明题辅助代算，全部 exit code 0 通过）。

## 逐题核对表

| ID | 题源 | App 课时 | 题型与方法 | 验证方式 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `jc935-exam-4-1` | 考研专题四第1题 | `homogeneous-second-order` | 复特征根二阶常系数齐次方程通解 | `symbolic` | $y''-4y'+13y=0 \Rightarrow y=e^{2x}(C_1\cos 3x+C_2\sin 3x)$ |
| `jc935-exam-4-2` | 考研专题四第2题 | `nonhomogeneous-second-order` | 叠加原理与共振特解的待定形式 | `symbolic` | 代入待定形式唯一解出 $A=\frac{2}{9}, B=-\frac{1}{6}, C=0$ |
| `jc935-exam-4-3` | 考研专题四第3题 | `ode-order-reduction` | 缺自变量二阶可降阶方程初值问题 | `symbolic` | $yy''+2(y')^2=0$，$y(0)=1, y'(0)=1 \Rightarrow y=\sqrt[3]{3x+1}$ |
| `jc935-exam-4-4` | 考研专题四第4题 | `homogeneous-second-order` | 二阶欧拉方程通解（实相异根） | `symbolic` | $x^2y''-2xy'-4y=0 \Rightarrow y=C_1x^4+C_2/x$ |
| `jc935-exam-4-5` | 考研专题四第5题 | `linear-first-order` | 微分形式化一阶线性方程求特解 | `symbolic` | $(2y+x^4)dx-xdy=0$，$y(1)=\frac{3}{2} \Rightarrow y=\frac{1}{2}x^4+x^2$ |
| `jc935-exam-4-6` | 考研专题四第6题 | `nonhomogeneous-second-order` | 由齐次通解反推系数并解非齐次初值 | `symbolic` | $a=4,b=4$，特解 $y=(2+3x)e^{-2x}+x-1$ |
| `jc935-exam-4-7` | 考研专题四第7题 | `homogeneous-second-order` | 由三阶通解反求常系数齐次方程 | `symbolic` | 特征根 $-2, \pm 3i \Rightarrow y'''+2y''+9y'+18y=0$ |
| `jc935-exam-4-8` | 考研专题四第8题 | `separable-odes` | 凑微分与可分离变量方程初值求解 | `symbolic` | $2yy'-2y^2-6=0$，$y(0)=1 \Rightarrow y=\sqrt{4e^{2x}-3}$ |
| `jc935-exam-4-9` | 考研专题四第9题 | `homogeneous-second-order` | 含参衰减二阶方程的无穷积分 | `symbolic` | 对 $a=3, 2\sqrt{2}, 2$ 三类阻尼均验得 $\int_0^{+\infty}f(x)\,dx=\frac{am+n}{2}$ |
| `jc935-exam-4-10` | 考研专题四第10题 | `homogeneous-second-order` | 重负特征根方程解的反常积分 | `symbolic` | $y=(1+4x)e^{-2x}$，$\int_0^{+\infty}y(x)\,dx=\frac{3}{2}$ |
| `jc935-exam-4-11` | 考研专题四第11题 | `homogeneous-second-order` | 三阶常系数齐次方程通解（立方和分解） | `symbolic` | $y'''+8y=0 \Rightarrow y=C_1e^{-2x}+e^x(C_2\cos\sqrt{3}x+C_3\sin\sqrt{3}x)$ |
| `jc935-exam-4-12` | 考研专题四第12题 | `homogeneous-second-order` | 二阶欧拉方程的初值特解 | `symbolic` | $x^2y''+xy'-9y=0$，$y(1)=2, y'(1)=0 \Rightarrow y=x^3+x^{-3}$ |
| `jc935-exam-4-13` | 考研专题四第13题 | `separable-odes` | 变上限积分函数方程化微分方程 | `symbolic` | $f(x)=3(\ln x+1)$ 回代原变上限积分等式恒成立 |
| `jc935-exam-4-14-1` | 考研专题四第14(1)题 | `separable-odes` | 法线截距几何条件建立微分方程 | `symbolic` | $Y_Q=-2y$ 与过 $(\frac{1}{2},\frac{1}{2})$ 推出 $x^2+3y^2=1$ |
| `jc935-exam-4-14-2` | 考研专题四第14(2)题 | `ode-basics` | 椭圆弧长与正弦曲线弧长的换元关系 | `symbolic` | 被积式恒等与 20 位精度数值积分均验得 $s=\frac{\sqrt{3}}{6}l$ |
| `jc935-exam-4-15-1` | 考研专题四第15(1)题 | `ode-order-reduction` | 反函数二阶导数替换化简微分方程 | `symbolic` | 反函数替换化为 $y''-4y=\cos 2x$ |
| `jc935-exam-4-15-2` | 考研专题四第15(2)题 | `nonhomogeneous-second-order` | 变换后二阶非齐次线性方程初值求解 | `symbolic` | 初值 $y(0)=\frac{7}{8}, y'(0)=2 \Rightarrow y=e^{2x}-\frac{1}{8}\cos 2x$ |
| `jc935-exam-4-16` | 考研专题四第16题 | `rate-and-pollution-models` | 线性阻尼制动的最长滑行距离 | `symbolic` | $m=4000, v_0=50, k=2000 \Rightarrow s=\frac{mv_0}{k}=100\text{ m}$ |
| `jc935-exam-4-17-1` | 考研专题四第17(1)题 | `homogeneous-second-order` | 由系数递推证明幂级数和函数满足微分方程 | `manual` | 阶乘通项确定 $R=+\infty$ + 逐项求导换标人工复核（脚本同步验前 11 项泰勒系数） |
| `jc935-exam-4-17-2` | 考研专题四第17(2)题 | `homogeneous-second-order` | 解微分方程反求幂级数和函数 | `symbolic` | $S''-4S=0$，$S(0)=5, S'(0)=2 \Rightarrow S(x)=3e^{2x}+2e^{-2x}$ |
| `jc935-exam-4-18` | 考研专题四第18题 | `homogeneous-first-order` | 切法线截距关系导出齐次微分方程 | `symbolic` | 隐函数求导验得 $\arctan\frac{y}{x}-\frac{1}{2}\ln(x^2+y^2)=0$ 满足 $X_P+Y_P=0$ |
| `jc935-exam-4-19-1` | 考研专题四第19(1)题 | `linear-first-order` | 一阶线性方程通解（线性自由项） | `symbolic` | $y'+2y=4x \Rightarrow y=Ce^{-2x}+2x-1$ |
| `jc935-exam-4-19-2` | 考研专题四第19(2)题 | `linear-first-order` | 周期驱动一阶线性方程周期解的唯一性 | `manual` | 定积分通解 + 区间拆分换元 $t=u+T$ 人工逐行复核（脚本同步以 $\cos\frac{2\pi x}{T}$ 验周期性） |
| `jc935-exam-4-20-1` | 考研专题四第20(1)题 | `linear-first-order` | 含卷积变上限积分方程化微分方程 | `symbolic` | $f(x)=a(1-e^{-2x})$ 回代原卷积积分方程恒成立 |
| `jc935-exam-4-20-2` | 考研专题四第20(2)题 | `linear-first-order` | 由函数区间平均值反求参数 | `symbolic` | $\int_0^1 a(1-e^{-2x})\,dx=1 \Rightarrow a=\frac{2e^2}{e^2+1}$ |

## 人工证明复核要点

1. **`jc935-exam-4-17-1`**：由 $a_n=\frac{4a_{n-2}}{n(n-1)}$（$n\ge 2$）递推得 $a_{2m}=\frac{2^{2m}a_0}{(2m)!}$、$a_{2m+1}=\frac{2^{2m}a_1}{(2m+1)!}$，按比值/根值判别或与 $e^{2|x|}$ 比较可知 $\sum_{n=0}^{\infty}a_nx^n$ 在 $(-\infty,+\infty)$ 内绝对收敛，因此可在 $(-\infty,+\infty)$ 内逐项求导两次；代入递推关系 $n(n-1)a_n=4a_{n-2}$ 并令 $k=n-2$ 得 $S''(x)=4S(x)$。
2. **`jc935-exam-4-19-2`**：通解 $y(x)=e^{-2x}(C+\int_0^x f(t)e^{2t}\,dt)$ 对连续周期函数 $f$ 处处成立；作差 $y(x+T)-y(x)$ 时将 $\int_0^{x+T}$ 分为 $\int_0^T+\int_T^{x+T}$ 并对后段令 $t=u+T$，利用 $f(u+T)=f(u)$ 恰好消去含 $x$ 的积分项，得到 $y(x+T)-y(x)=e^{-2x}[(e^{-2T}-1)C+e^{-2T}\int_0^T f(t)e^{2t}\,dt]$；由 $T>0\implies e^{2T}-1\neq 0$，存在唯一常数 $C=\frac{\int_0^T f(t)e^{2t}\,dt}{e^{2T}-1}$ 使 $y(x+T)\equiv y(x)$。

## 质量检查

- 全部 25 题均为独立原创同构变式，无原书题干或数据照搬，无任何品牌敏感词。
- 全部 25 题公式与解答通过 KaTeX `strict: "error"` 校验，宽行均已使用 `\begin{gathered}...\end{gathered}` 换行适配 360px 窄屏。
- TypeScript `tsc --noEmit` 零错误通过。

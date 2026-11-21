# 总习题七（7-review）核验与审核记录

- 对应资料范围：纸书第 316–328 页（PDF 第 325–337 页），共 12 大题、32 小题。
- 应用数据模块：`src/data/bankChapterSevenReview.ts`（导出 `bankChapterSevenReview`）。
- 符号核验脚本：`scripts/check-bank-7-review.py`（SymPy 自动验证 29 题，全部通过）。
- 人工核验项：3 题（概念判别与结构定理题：`1-1`、`1-3`、`2-1`），已逐项核对逻辑与边界条件。
- 版权与风格审查：全部 32 题均为原创同构变式，替换了原题系数、函数或应用背景；无任何禁用词；全部 `formula` 与 `solution` 通过 KaTeX `strict: "error"` 校验与 360px 窄屏折行审查。

## 逐题映射与核验清单

| 题号 ID | 原题对应 | App 课时 (`lessonId`) | 标签 (`errorTag`) | 核验方式 | 核验摘要 |
| --- | --- | --- | --- | --- | --- |
| `jc935-7-review-1-1` | 总习题七 第 1(1) 题 | `ode-basics` | `ode_basics` | `manual` | 最高阶导数为 $y^{(4)}$，幂次 $(y'')^3$ 不改变阶数，确为 4 阶。 |
| `jc935-7-review-1-2` | 总习题七 第 1(2) 题 | `linear-first-order` | `linear_first_order` | `symbolic` | SymPy 验证通解代入 $y'-a(x)y-b(x)\equiv 0$。 |
| `jc935-7-review-1-3` | 总习题七 第 1(3) 题 | `ode-basics` | `ode_basics` | `manual` | 变上限求导与取 $x=a$ 互推，确认与初值问题双向等价。 |
| `jc935-7-review-1-4` | 总习题七 第 1(4) 题 | `nonhomogeneous-second-order` | `nonhomogeneous_second_order` | `symbolic` | SymPy 验证 $W(x,x^3)=2x^3\neq 0$ 且通解满足显式二阶非齐次方程。 |
| `jc935-7-review-2-1` | 总习题七 第 2(1) 题 | `linear-first-order` | `linear_first_order` | `manual` | 核对两不同解之差为齐次非零解，加任一特解构成一阶线性通解。 |
| `jc935-7-review-2-2` | 总习题七 第 2(2) 题 | `homogeneous-second-order` | `homogeneous_second_order` | `symbolic` | SymPy 验证三个指数特解均满足 $y'''-3y''+4y=0$。 |
| `jc935-7-review-3-1` | 总习题七 第 3(1) 题 | `ode-basics` | `ode_basics` | `symbolic` | SymPy 验证圆族隐式求导消去 $C$ 后满足 $x^2(1+(y')^2)=4(y')^2$。 |
| `jc935-7-review-3-2` | 总习题七 第 3(2) 题 | `homogeneous-second-order` | `homogeneous_second_order` | `symbolic` | SymPy 验证 $C_1e^{-x}+C_2e^{3x}$ 满足 $y''-2y'-3y=0$。 |
| `jc935-7-review-4-1` | 总习题七 第 4(1) 题 | `homogeneous-first-order` | `homogeneous_first_order` | `symbolic` | SymPy 隐式求导验证 $3x-2\sqrt{xy}=C$ 满足 $xy'+y=3\sqrt{xy}$。 |
| `jc935-7-review-4-2` | 总习题七 第 4(2) 题 | `linear-first-order` | `linear_first_order` | `symbolic` | SymPy 代入验证 $y=bx^3+C/\ln x$。 |
| `jc935-7-review-4-3` | 总习题七 第 4(3) 题 | `linear-first-order` | `linear_first_order` | `symbolic` | SymPy 验证 $x=\ln y-1/3+C/y^3$ 满足互换变量后方程。 |
| `jc935-7-review-4-4` | 总习题七 第 4(4) 题 | `bernoulli-ode` | `bernoulli_ode` | `symbolic` | SymPy 代入验证伯努利通解 $1/y^2=x^2+1/2+Ce^{2x^2}$。 |
| `jc935-7-review-4-5` | 总习题七 第 4(5) 题 | `ode-order-reduction` | `ode_order_reduction` | `symbolic` | SymPy 验证 $y=\ln|\cos(2x+C_1)|+C_2$ 满足 $y''+(y')^2+4=0$。 |
| `jc935-7-review-4-6` | 总习题七 第 4(6) 题 | `ode-order-reduction` | `ode_order_reduction` | `symbolic` | SymPy 验证 $y=(2/C_1)\cosh(C_1x+C_2)$ 满足 $yy''-(y')^2-4=0$。 |
| `jc935-7-review-4-7` | 总习题七 第 4(7) 题 | `nonhomogeneous-second-order` | `nonhomogeneous_second_order` | `symbolic` | SymPy 代入验证复特征根齐次通解与三角特解。 |
| `jc935-7-review-4-8` | 总习题七 第 4(8) 题 | `nonhomogeneous-second-order` | `nonhomogeneous_second_order` | `symbolic` | SymPy 代入验证三阶方程叠加与双重共振特解。 |
| `jc935-7-review-4-9` | 总习题七 第 4(9) 题 | `bernoulli-ode` | `bernoulli_ode` | `symbolic` | SymPy 验证 $x^2=2y^3+Cy^4$ 满足 $(y^3-2x^2)dy+xydx=0$。 |
| `jc935-7-review-4-10` | 总习题七 第 4(10) 题 | `homogeneous-first-order` | `homogeneous_first_order` | `symbolic` | SymPy 隐式求导验证根式代换通解 $(\sqrt{x^2+y}-x)^2=C(2\sqrt{x^2+y}-x)$。 |
| `jc935-7-review-5-1` | 总习题七 第 5(1) 题 | `bernoulli-ode` | `bernoulli_ode` | `symbolic` | SymPy 验证方程与初值 $y|_{x=1}=1$。 |
| `jc935-7-review-5-2` | 总习题七 第 5(2) 题 | `ode-order-reduction` | `ode_order_reduction` | `symbolic` | SymPy 验证方程与 $y(0)=1, y'(0)=-2$。 |
| `jc935-7-review-5-3` | 总习题七 第 5(3) 题 | `ode-order-reduction` | `ode_order_reduction` | `symbolic` | SymPy 验证 $y=2\arctan(e^{2x})$ 满足方程与初值。 |
| `jc935-7-review-5-4` | 总习题七 第 5(4) 题 | `nonhomogeneous-second-order` | `nonhomogeneous_second_order` | `symbolic` | SymPy 验证 $y=xe^x+\frac{1}{2}\cos x$ 满足方程与初值。 |
| `jc935-7-review-6` | 总习题七 第 6 题 | `linear-first-order` | `linear_first_order` | `symbolic` | SymPy 验证 $y=4x-2x^2$ 满足截距方程与过点 $(1,2)$。 |
| `jc935-7-review-7` | 总习题七 第 7 题 | `rate-and-pollution-models` | `rate_and_pollution_models` | `symbolic` | SymPy 验证混合模型方程、初值及 $v=300\ln 2$ 处达标浓度 $0.06\%$。 |
| `jc935-7-review-8` | 总习题七 第 8 题 | `linear-first-order` | `linear_first_order` | `symbolic` | SymPy 直接积分验证 $\varphi(x)=\sin x-\cos x$ 满足原积分方程。 |
| `jc935-7-review-9` | 总习题七 第 9 题 | `separable-odes` | `separable_odes` | `symbolic` | SymPy 验证 $\sqrt{1+(y')^2}=e^{2x}$ 与 $\lim_{x\to 0^+}y(x)=0$。 |
| `jc935-7-review-10-1` | 总习题七 第 10(1) 题 | `homogeneous-second-order` | `homogeneous_second_order` | `symbolic` | SymPy 抽象函数代换验证 $W'+a(x)W\equiv 0$。 |
| `jc935-7-review-10-2` | 总习题七 第 10(2) 题 | `separable-odes` | `separable_odes` | `symbolic` | SymPy 抽象函数验证刘维尔公式满足方程与初值 $W(x_0)$。 |
| `jc935-7-review-11-1` | 总习题七 第 11(1) 题 | `homogeneous-second-order` | `homogeneous_second_order` | `symbolic` | SymPy 代入验证重根欧拉方程通解 $x^2(C_1+C_2\ln x)$。 |
| `jc935-7-review-11-2` | 总习题七 第 11(2) 题 | `nonhomogeneous-second-order` | `nonhomogeneous_second_order` | `symbolic` | SymPy 代入验证非齐次欧拉方程通解 $C_1x+C_2x^3-2x^2$。 |
| `jc935-7-review-12-1` | 总习题七 第 12(1) 题 | `nonhomogeneous-second-order` | `nonhomogeneous_second_order` | `symbolic` | SymPy 代入验证一阶线性方程组两式恒成立。 |
| `jc935-7-review-12-2` | 总习题七 第 12(2) 题 | `nonhomogeneous-second-order` | `nonhomogeneous_second_order` | `symbolic` | SymPy 代入验证二阶对称线性方程组两式恒成立。 |

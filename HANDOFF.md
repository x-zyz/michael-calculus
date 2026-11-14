# Michael calculus — v0.4.0 工作交接与继续开发提示词

仓库地址：`https://github.com/x-zyz/michael-calculus`
可直接让 **Codex**、**DeepSeek（Claude Code / cc-switch / OpenCode）** 或 **Gemini** 读取仓库根目录的 `AGENTS.md` / `CLAUDE.md` / `GEMINI.md`，或复制以下内容继续开发：

---

你将接手继续开发 **Michael calculus**（面向大学生的交互式高等数学学习平台，Web + Capacitor Android APK）。请在现有 `0.4.0`（`versionCode 4`）源码基础上继续迭代，**严格保留六大导航模块与真实可用的学习闭环，不要退回占位原型**。

## 一、当前已完成交付（v0.4.0，versionCode 4）

1. **移动端（360px）与桌面端浏览器体验验收及修复**：
   - 修复窄屏（360px）下多行数学公式横向裁切问题（使用 `\begin{gathered}...\end{gathered}` 分行排版）。
   - 修复移动端 `@media(max-width:760px)` 下小于 `11px` 的字号，确保全部可见文字 `>= 11px`，且底部固定六入口导航栏不遮挡任何交互控件。

2. **九节完整课程（每节均含「直觉 / 实验 / 定义 / 例题 / 练习」五种视图）**：
   - **第一章 · 函数、极限与连续（5 节）**：`limit`（函数极限）、`sine`（第一个重要极限）、`euler`（第二个重要极限）、`infinitesimal`（等价无穷小替换）、`continuity`（连续性与左右极限）。
   - **第二章 · 导数与微分（4 节）**：
     - `derivative`：导数的定义与切线
     - `rules`：基本求导法则与初等函数导数（新增）
     - `chain`：复合函数求导（链式法则）（新增）
     - `differential`：微分的概念与线性近似（新增）
   - 每节课程的「实验」标签页均自动联动对应的极限或导数微分交互实验模型。

3. **两类交互数学实验（课程内与「数学实验室」均可交互）**：
   - **左右极限逼近实验（`Experiment`）**：支持可去间断 `(x² − 1)/(x − 1)`、第一个重要极限 `sin x / x`、第二个重要极限 `(1 + x)^(1/x)`、等价无穷小 `(1 − cos x)/x²`（半角公式消除浮点相消误差）、跳跃间断分段函数。孔点处 `experimentValue` 严格返回 `null`。
   - **割线与切线逼近及微分线性近似实验（`SecantExperiment`）**：支持 `f(x) = x²`、`f(x) = x³ − x`、`f(x) = √x`、`f(x) = (2x − 1)²` 在 `x₀ = 1` 处的左/右步长 `h` 逼近，实时绘制曲线、切线、割线、切线近似点与增量三角形，并计算割线差商 `Δy/h`、微分线性近似 `dy = f'(x₀)h`、真实增量 `Δy`、绝对误差 `|Δy − dy|` 以及高阶误差比 `|Δy − dy| / |h|`。在 `h = 0` 时 `secantSlope` 与 `errorRatio` 严格返回 `null`。

4. **十八道受限数值题与章节/错因诊断复习闭环**：
   - `p1`–`p18` 覆盖全部 9 节课程（每节 2 题），包含三级提示、详细解析、错因标签（`errorTag` / `errorLabel`）。
   - 练习中心与错题复习均支持按章节（第一章 / 第二章）与错因标签（`errorTag`）筛选，并实时计算各章节与考点的掌握度统计（`computeMastery`）。
   - 本地持久化使用 `localStorage`（`mc-learning-v1`、`mc-theme`），向后兼容 `0.2.0` / `0.3.0` 数据。

5. **自动化测试、多 Harness 环境与 Android 构建**：
   - Vitest 单元与组件回归测试：2 个文件、**18 项测试全部通过**。
   - Playwright E2E 端到端测试：桌面 + 移动（360px）双端 **14 项测试全部通过**。
   - 仓库根目录已提供 `AGENTS.md`、`CLAUDE.md`、`GEMINI.md` 及 `.github/workflows/release.yml`，本机已配置持久化 `JAVA_HOME`（Temurin JDK 21）、`ANDROID_HOME`（Android SDK 35 + Build Tools 35.0.0）与 GitHub CLI `gh`。

---

## 二、下一阶段工作建议（v0.5.0，versionCode 5）

1. **中值定理与导数的应用**：
   - 新增课程：罗尔定理与拉格朗日中值定理、洛必达法则（`0/0` 与 `∞/∞` 型未定式）、函数的单调性与极值判别。
   - 实验扩展：支持观察原函数 `y = f(x)` 与导函数 `y = f'(x)` 的单调区间/驻点/极值点对应关系，或拉格朗日中值定理割线平行切线点 `ξ` 的几何意义。
   - 补充配套受限数值/分数练习题（每节至少 2 题）。
2. **章节阶段自测闭环**：
   - 在练习中心支持按章节发起一轮阶段自测，完成后汇总得分与薄弱错因标签。

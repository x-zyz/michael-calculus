# Michael calculus — Agent Harness Guide (Codex / DeepSeek / Claude / Gemini)

## Standing Delivery & Release Instructions

- After completing and validating any app change in a turn, commit the relevant source changes and push them to the configured GitHub repository, `x-zyz/michael-calculus` (`https://github.com/x-zyz/michael-calculus`). The user has given standing authorization for this project.
- When the task produces Android APK or source bundle releases, publish the requested artifacts to GitHub Releases (`gh release create` / `gh release upload`) and verify the download links.
- Keep account credentials, signing keystores (`*.jks`, `*.keystore`, `signing.properties`), and local test reports out of the public repository.
- If the user requests a local-only change for a specific task, follow that request.

---

## 一、项目概览与当前基线（v0.5.0，versionCode 5）

**Michael calculus** 是面向大学生的交互式高等数学学习平台（React 19 + TypeScript + Vite + Tailwind CSS + 本地离线 KaTeX + Capacitor 7 Android APK）。

### 已交付功能（v0.5.0）
1. **六大模块完整路由与深浅主题**：学习首页（`/`）、课程中心（`/curriculum`）、数学实验室（`/experiments`）、练习中心（`/practice`）、错题与复习（`/review`）、AI 教师（`/assistant`）。
2. **十二节完整课程（每节均含「直觉 / 实验 / 定义 / 例题 / 练习」五种视图）**：
   - **第一章 · 函数、极限与连续（5 节）**：`limit`（函数极限）、`sine`（第一个重要极限）、`euler`（第二个重要极限）、`infinitesimal`（等价无穷小替换）、`continuity`（连续性与左右极限）。
   - **第二章 · 导数与微分（4 节）**：`derivative`（导数的定义与切线）、`rules`（基本求导法则与初等函数导数）、`chain`（复合函数求导/链式法则）、`differential`（微分的概念与线性近似）。
   - **第三章 · 中值定理与导数的应用（3 节）**：`mvt`（罗尔定理与拉格朗日中值定理）、`lhopital`（洛必达法则与未定式极限）、`extrema`（函数的单调性与极值判别）。
3. **三类交互数学实验**：
   - **左右极限逼近实验（`Experiment`）**：支持可去间断、第一个重要极限、第二个重要极限、等价无穷小（半角公式消除浮点相消误差）、跳跃间断分段函数。孔点处 `experimentValue` 严格返回 `null`。
   - **割线与切线逼近及微分线性近似实验（`SecantExperiment`）**：支持二次、三次、根式、复合函数模型在 $x_0=1$ 处的左右步长逼近，实时显示割线斜率 $\Delta y/h$、切线斜率 $f'(x_0)$、微分线性近似 $dy = f'(x_0)h$、真实增量 $\Delta y$ 以及高阶误差比 $|\Delta y - dy|/|h|$。在 $h=0$ 处 `secantSlope` 与 `errorRatio` 严格返回 `null`。
   - **中值定理与导数应用实验（`DerivativeAppExperiment`）**：支持拉格朗日中值定理平行弦切点 $\xi$ 几何观察、洛必达法则 $(e^x - 1 - x)/x^2$ 与导数比 $(e^x - 1)/(2x)$ 同步逼近（在 $x=0$ 处 `derivativeAppState("lhopital", 0)` 严格返回 `null`）、以及三次函数 $f(x)=x^3-3x$ 的一阶导数符号与二阶导数驻点凹凸性判别。
4. **二十四道受限数值题与章节/错因诊断闭环**：
   - `p1`–`p24` 覆盖全部 12 节课程（每节 2 题），含三级提示、详细解析、错因标签（`errorTag` / `errorLabel`）。
   - 练习中心与错题复习支持按章节（第一章 / 第二章 / 第三章）和错因标签（`errorTag`）筛选，并实时统计章节掌握度、作答题数与薄弱考点列表（`computeMastery` 的 `attempted` 与 `weakTags`）。
   - 本地持久化使用 `localStorage`（`mc-learning-v1`、`mc-theme`），向后兼容 `0.2.0` / `0.3.0` / `0.4.0` 数据。

---

## 二、关键源码结构与开发红线（严守约束）

- `src/app/App.tsx`：路由、六模块导航、深浅主题、学习路径说明弹窗、`LearningProvider`。
- `src/data/learning.ts`：课程、题库、章节与错因掌握度统计、受限数值判题器、极限与导数微分实验数学模型。
- `src/features/learning/LearningPages.tsx`：`Experiment`、`SecantExperiment`、`CoursePage`、`ExperimentsPage`、`PracticePage`、`ReviewPage`。
- `src/db/learning.tsx`、`src/db/preferences.ts`：`mc-learning-v1` 与 `mc-theme` 本地存储。
- `src/components/Formula.tsx`：本地 KaTeX 公式渲染（内置离线字体）。
- `src/features/dashboard/Dashboard.tsx`：首页真实阅读进度、累计作答与练习天数统计。

### 开发红线
1. **保留全部六个导航入口**，不得退回空壳卡片或破坏已有学习闭环。
2. **保持 `mc-learning-v1` 与 `mc-theme` 兼容性**，升级或迁移时不得丢失用户已有进度与错题记录。
3. **数学严谨性**：不用随机代值宣称任意符号等价，不使用 `eval`；数值采样实验必须注明「仅用于观察，不代替数学证明」；未定义点（孔点、$h=0$ 差商）在模型函数中必须返回 `null`；不直接复制现代教材原文或插图。
4. **移动端适配**：所有公式在 `360px` 宽度下不得横向裁切（多行或较长公式请使用 `\begin{gathered}...\end{gathered}` 分行），移动端可见文字字号不得小于 `11px`，底部固定导航栏不得遮挡交互控件。
5. **离线 APK**：APK 必须打包本地 `dist/` 静态资源（`capacitor.config.ts` 中勿改为远程 `server.url`）。
6. **诚实边界**：尚未实现的功能（积分课程、AI 教师真实问答、任意符号/过程评分、账号同步、OCR、完整限时诊断卷）在实现前不要宣称为已有功能。

---

## 三、本机工具链与多 Harness 构建验证命令

无论在 **Codex**、**DeepSeek (Claude Code / cc-switch / OpenCode)** 还是 **Gemini Antigravity** 中运行，本机已配置好以下环境（亦已写入用户级环境变量）：

- **JDK 21（Android Gradle 构建推荐）**：`C:\Users\Michael\.jdks\jdk-21.0.13+9`（已写入用户环境变量 `JAVA_HOME` 与 `JDK21_HOME`）
- **Android SDK（含 Platform 35 & Build Tools 35.0.0）**：`C:\Users\Michael\Documents\Codex\2026-11-06\ban\work\ax-sdk`（已写入用户环境变量 `ANDROID_HOME` 与 `ANDROID_SDK_ROOT`）
- **GitHub CLI (`gh`)**：`C:\Users\Michael\.local\bin\gh.exe`（已加入用户 `PATH`）

### 标准验证与构建命令
```powershell
npm.cmd ci
npm.cmd run typecheck
npm.cmd test
npm.cmd run lint
npx.cmd playwright test
npm.cmd run android:sync
cd android
./gradlew.bat assembleDebug lintRelease
```

---

## 四、下一阶段迭代方向（v0.6.0+）

1. **第四章 · 不定积分与定积分（牛顿—莱布尼茨公式与黎曼和实验）**：
   - 新增课程：原函数与不定积分、定积分的概念（分割—近似—求和—取极限）、微积分基本定理（牛顿—莱布尼茨公式）。
   - 实验扩展：定积分黎曼和（左矩形/右矩形/中点分割数 $n$ 增加逼近曲边梯形面积）与变上限积分函数导数实验。
   - 配套受限数值/分数练习题与错因标签。
2. **章节阶段自测（轻量诊断模式）**：
   - 从指定章节题库中抽取固定组合完成一轮阶段自测，生成章节掌握度小结与薄弱错因复习入口。

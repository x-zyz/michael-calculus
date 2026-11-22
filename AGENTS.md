> **永久签名规则**：所有 agent 的正式更新必须使用 `android/signing-identity.json` 固定的同一证书，走 GitHub Actions 的签名 release 流程。禁止为每台机器或每个版本生成私钥、禁止分发普通 debug APK。调试包只能使用 `.dev` 包名。缺少密钥、指纹不同或权限不足就停止发布并说明原因，不能改指纹绕过。详见 `docs/android-signing.md`；用户只需一次配置仓库 Secrets。旧签名丢失时先做只读数据备份，不擅自卸载旧版。

## v0.7.0 界面结构规则（优先于下方历史基线）

- 五项学习导航，AI 保留 `/assistant`，只从首页链接进入。永久签名规则继续生效。
- 新功能必须放进已有结构（新路由 / Tabs / Sheet / Accordion），禁止往页面底部继续追加区块；禁止使用原生 select / details / number 控件和字面样式值；只能使用 `src/components/ui` 组件和 tokens。数学图形坐标、SVG 路径和动态百分比是几何数据。
- 样式入口 `src/styles.css` 只导入 tokens / base / layout / components；组件/页面 TSX 不超过 300 行。字体最小 12px，触控目标至少 44px，每页最多一个可见 primary；手机主任务必须首屏可见。
- 课程在 `features/curriculum`，答题在 `practice`，掌握度在 `review`，三个独立实验在 `experiments`；`LearningPages.tsx` 仅兼容导出。公式设置放 Sheet，数据备份放 `/settings`。
- 按改动范围运行 typecheck、lint、test、check:css 和 Playwright。签名路径变更或正式发布时运行 test:signing；涉及 Android 的任务按授权执行 sync / lint。assembleDebug 仅验证 .dev 调试构建。
- `src/data/*.ts`、公式 engine 和所有持久化/备份格式在此次 UI 重构中保持原样。后续不得以界面调整名义修改数学或调度行为。
- 交接与前后图见 `HANDOFF.md`、`docs/ui-before`、`docs/ui-after`，本轮原始方案见 `docs/superpowers/specs/2026-11-16-ui-redesign.md`。

# Michael calculus — Agent Harness Guide (Codex / DeepSeek / Claude / Gemini)

## AI 协作与交接

1. 先读本文件，再读 [AI_HANDOFF.md](docs/AI_HANDOFF.md)。旧工作树里的同名文件视为历史快照，使用 [main 上的固定地址](https://github.com/x-zyz/michael-calculus/blob/main/docs/AI_HANDOFF.md)读取最新交接。
2. 检查 Git 分支、工作树和未提交改动，确认任务模块和负责人。之后只读本任务需要的源码和测试。以 Git、源码和实际验证核对交接信息。
3. 日常状态、实际改动、提交 SHA、验证结果和接手动作交给集成负责人。任务结束或中断时保留检查点。集成负责人通过仅含文档的 PR 更新 main 上的交接文档。

## 开发交付与正式发布

- **优先级**：先遵守本次任务明确的范围和发布限制。永久签名规则适用于所有获授权的正式 Android 发布。日常提交和测试通过本身不构成发布授权。
- **日常开发**：在独立分支完成变更和必要验证，提交并推送源码，更新交接状态，按范围提供可操作的预览或测试交付物。不得因提交自动改正式版版本号、推送发布标签或发 Release。合并主线按当前任务的授权执行。
- **正式发布**：仅在任务明确要求正式发布或得到对应授权时执行。依现有约定更新应用版本和递增 Android versionCode，使用固定证书及 GitHub Actions release.yml 构建，核验正式 APK 的签名、包名和版本后再对外交付。等待工作流结束并核对 Release 和下载附件。应用内更新按已授权的发布范围走现有流程。
- **明确不发布的任务**：包括 ELI5 教学试点。未经本次授权不得自动合并主线、增加版本号、构建正式 APK、推送 v* 标签或创建 Release。可以提供经授权的独立网页预览或测试交付物。main 的推送会触发 Pages 部署，须纳入合并决策。
- 凭据、签名私钥与 keystore、signing.properties 和本地测试报告不得提交到公共仓库。

---

## 当前发布增量（v0.6.0，versionCode 6）

新增公式记忆中心：42 个公式、填空/完整默写/条件判断/反向识别、独立 `mc-formula-v1`、间隔复习、跨日 L0–L5 证据与练习手动卡住联动。详见 `docs/formula-mastery-implementation.md`。保留原有 12 节课程、24 道题和六大导航。测试现为 28 项单元/组件、22 项浏览器回归。
历史调试包不能用于当前发布；当前只发布固定签名 release APK。

## 一、项目概览与既有课程基线（v0.5.0，versionCode 5）

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
1. **保留五个学习导航及独立 AI 状态路由**，不得退回空壳卡片或破坏已有学习闭环。
2. **保持 `mc-learning-v1` 与 `mc-theme` 兼容性**，升级或迁移时不得丢失用户已有进度与错题记录。
3. **数学严谨性**：不用随机代值宣称任意符号等价，不使用 `eval`；数值采样实验必须注明「仅用于观察，不代替数学证明」；未定义点（孔点、$h=0$ 差商）在模型函数中必须返回 `null`；不直接复制现代教材原文或插图。
4. **移动端适配**：所有公式在 `360px` 宽度下不得横向裁切（多行或较长公式请使用 `\begin{gathered}...\end{gathered}` 分行），移动端可见文字字号不得小于 `12px`，底部固定导航栏不得遮挡交互控件。
5. **离线 APK**：APK 必须打包本地 `dist/` 静态资源（`capacitor.config.ts` 中勿改为远程 `server.url`）。
6. **诚实边界**：尚未实现的功能（AI 教师真实问答、任意符号/过程评分、账号同步、OCR、完整限时诊断卷）在实现前不要宣称为已有功能。

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

## 四、课程补充与后续方向

1. **教材课程大纲**：后续课程、公式、练习与实验按 [教材目录](docs/textbook-curriculum.md) 的章节和节号归档。第四章为「不定积分」，第五章为「定积分及其应用」。有实际内容时才开放后续章节，并保持持久化内容的已有标识。
2. **章节阶段自测（轻量诊断模式）**：
   - 从指定章节题库中抽取固定组合完成一轮阶段自测，生成章节掌握度小结与薄弱错因复习入口。

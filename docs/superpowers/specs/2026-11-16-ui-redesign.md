# Michael calculus v0.6.2：界面为什么“像一坨”，以及怎么改

> [!NOTE]
> 这份诊断基于 GitHub 最新提交 `d2b6d41`（v0.6.2，“Clarify learning navigation and home actions”）。我在本机跑起来，用 360px 手机和 1280px 桌面两种尺寸逐页截图，并统计了样式数据。

## 一、0.6.2 比 0.5.0 变了什么

| 变化 | 判断 |
|---|---|
| AI 教师从导航里拿掉，只在首页底部留一个“尚未开放”的链接 | ✅ 方向对 |
| 首页删掉了“开发进度”、名言、假统计 | ✅ 方向对 |
| 新增公式记忆中心，复习页分成“错题 / 公式”两个标签 | ✅ 功能有价值，但界面做得很糙 |
| **首页的深蓝主视觉、进度环、插画全被删掉，换成了白卡片** | ❌ 整个 App 里唯一“设计过”的部分没了 |
| 练习页、课程页、实验室的结构和 0.5.0 基本一样 | ❌ 老问题都还在 |

## 二、这种感受从哪来（诊断）

````carousel
![0.6.2 首页（桌面）：大白卡片、一行字、一个按钮，没有层级](C:/Users/0979/.gemini/antigravity/brain/77205fc8-d7b1-403e-ab84-2eedb6de41ba/scratch/ux062/desktop-home.png)
<!-- slide -->
![0.6.2 公式记忆中心：设置表单当主内容，原生下拉框、数字框、折叠三角](C:/Users/0979/.gemini/antigravity/brain/77205fc8-d7b1-403e-ab84-2eedb6de41ba/scratch/ux062/desktop-formulas.png)
<!-- slide -->
![0.6.2 手机练习页：输入框在 y=1425px，差不多要滑两屏](C:/Users/0979/.gemini/antigravity/brain/77205fc8-d7b1-403e-ab84-2eedb6de41ba/scratch/ux062/phone-practice.png)
<!-- slide -->
![0.6.2 手机课程页：12 个课时按钮堆成 9 行，正文在首屏以下](C:/Users/0979/.gemini/antigravity/brain/77205fc8-d7b1-403e-ab84-2eedb6de41ba/scratch/ux062/phone-lesson.png)
````

| # | 根因 | 0.6.2 里的证据 |
|---|---|---|
| 1 | **“设计过的部分”被删掉，剩下的全是默认表单的样子** | 0.5.0 首页至少有品牌感，0.6.2 把它换成了和内页一样的白卡片。现在每一页都是“白底 + 灰边框 + 28px 内边距 + 浅绿按钮”，没有颜色层次、图形和视觉重点，看起来像后台管理系统。只有侧栏还留着当初的精致风格（衬线 logo、装饰卡片“理解，比记住更重要”），和内容区格格不入 |
| 2 | **控件没设计，直接用浏览器原生的** | 原生 `<select>`、数字输入框、`<details>` 折叠三角（▶ 第1章 · 13 个公式）。“错题 / 公式”两个标签看不出哪个被选中。“开始今日复习”按钮颜色淡得像被禁用了 |
| 3 | **样式还是在打补丁，而且留着大量废代码** | `styles.css` 里仍有 **30 种字号**（4–44px）和 8 个 `!important`，又多了一段“Formula Mastery”补丁块。首页模块已经删掉，`hero-/journey-/quick-card/milestone/roadmap` 这些样式还有 **117 处**残留。桌面上一个页面就同时出现 14–15 种字号（8px 到 32px） |
| 4 | **主任务被埋** | 练习页从上到下：说明 → 三章掌握度 → 章节筛选 → 错因下拉 → 24 个题号按钮，然后才是题目。答案输入框在手机上排在 **y=1425px**，桌面上是 1147px。课程页手机上 12 个课时按钮堆成 9 行，正文排在首屏以下。实验室把 3 个实验竖着叠，高 **3249px** |
| 5 | **设置在前，行动在后** | 公式记忆中心最显眼的是“复习模式”下拉框和“每天最多加入的新公式（0–20）”输入框，用户得先配置，才看得到“开始”。复习页最上面是“学习数据恢复 / 导入旧版备份”，一个低频的维护功能占了最好的位置 |
| 6 | **同一份数据在多处重复** | 三章掌握度统计在练习页和复习页原样各出现一次。首页、复习页、公式页都在重复“今日到期 0 / 新学 0 / 薄弱 0” |
| 7 | **按钮墙没有状态** | “第 1 题 … 第 24 题”只有序号，看不出标题，也看不出对、错、没做。12 个课时按钮不按章分组，看不出哪节学完了 |
| 8 | **层级扁平，信息稀疏** | 首页“继续学习”卡在桌面上有 960px 宽，里面只有 3 行字。所有卡片的边框、圆角、阴影都一样，主次分不出来。同一屏常出现两个一样的浅绿主按钮（“开始学习”和“开始公式复习”） |
| 9 | **流程上的根因（依然存在）** | 验收只查“不溢出、字号 ≥ 11px、功能能用”，没有任何约束视觉一致性和首屏任务的测试。`LearningPages.tsx` 一个文件 1067 行，`FormulaPages.tsx` 566 行，每个 Agent 都只是往里继续加 |

一句话总结：**0.5.0 是“两套风格拼接”，0.6.2 是“把好看的那套删了，剩下的那套本来就没设计过”**。所以现在每一页都一样平、一样白、一样像表单，功能越多越显得乱。

---

## 三、可以直接复制给 Codex / Gemini Argon 的提示词

```text
你将接手 Michael calculus（React + Vite + Capacitor 的高数学习 App，仓库 https://github.com/x-zyz/michael-calculus，当前 v0.6.2）。本轮任务是【纯 UI / 信息架构重构，版本 0.7.0，versionCode 在当前基础上 +1】，不新增任何数学内容或学习功能。

## 背景：当前界面的问题（必须逐条解决）
1. 所有页面都是同质白卡片 + 浏览器原生控件（select / number input / details），没有视觉层级和品牌感，像后台表单。
2. styles.css 有 30 种字号、8 个 !important、多段版本补丁，并残留首页已删除模块的 117 处废样式。
3. 主任务被埋：练习页答案输入框在 360px 手机上 y≈1425px；课程正文在首屏以下；实验室 3 个实验竖叠，高 3249px。
4. 公式记忆中心、复习页“设置/维护在前，行动在后”（复习模式下拉、每日新公式数、数据导入放在最上方）。
5. 掌握度统计在练习页和复习页重复；24 个题号、12 个课时按钮平铺，没有分组和状态。
6. 侧栏是旧的精致风格，内容区是朴素表单风格，两边不统一。

## 硬约束（不得破坏）
- 路由与数据：保留 / /curriculum /experiments /practice /review /review/formulas /assistant 及 ?lesson= 兼容；保留所有 localStorage 键（mc-learning-v1、mc-theme、公式记忆相关键）及备份导入导出格式，旧数据必须能读。
- 保留 src/data/*.ts 的全部课程、题目、公式、判分逻辑（parseAnswer/checkAnswer）、实验数学模型和间隔复习算法，不改任何数学或调度行为；无定义点返回 null 的行为不变。
- 保留现有 data-testid；现有 Vitest / Playwright 测试的行为断言必须继续通过（选择器可随结构更新，不得删断言）。
- AI 教师维持现状：不进主导航，/assistant 保留诚实的“尚未开放”空状态。
- 360px 下：不横向溢出、公式不裁切、可见文字 ≥ 12px、触控目标 ≥ 44px。
- Android 打包仍用本地 dist，不得配置远程 server.url。

## 第 1 步：设计系统（先做，后续全部依赖）
1. 新建 src/styles/tokens.css，只允许以下取值：
   - 字号：12 / 14 / 16 / 20 / 24 / 32 px（正文：手机 16，桌面 15）。
   - 字重：400 / 500 / 600。
   - 间距：4 / 8 / 12 / 16 / 24 / 32 / 48。圆角：8 / 12 / 16。
   - 颜色：品牌 navy #22344d、accent #d7edab（及其深浅两档）、--bg / --surface / --surface-2 / --text / --muted / --line，语义色 --success / --danger / --warning / --info；完整深色主题。
   - 阴影两档：--shadow-sm（卡片）、--shadow-md（浮层）。
2. 拆分 styles.css 为 tokens.css / base.css / layout.css / components.css；删除所有版本补丁块、全部 !important、以及已无引用的 hero- / journey- / quick-card / milestone / roadmap / preview- 等废样式（删除前用 grep 确认没有 className 引用）。
3. 在 src/components/ui/ 实现并只用这些组件拼页面：
   Button（primary | secondary | ghost | danger，含 disabled 态，且 disabled 必须与 secondary 视觉可区分）、Card（default | emphasis：emphasis 用 navy 底 + 浅色字，用于每页最多一个重点卡）、PageHeader、SectionHeader、Tabs（有明确选中态，用于“错题 / 公式”等）、SegmentedControl、Chip（可横向滚动的 ChipRow）、StatTile（大数字 + 小标签，横向排列）、ProgressBar、ListItem（左侧状态图标 ✓/✗/○，右侧箭头）、Accordion（替代原生 details，带旋转 chevron）、Select 和 NumberStepper（替代原生 select / number input）、Sheet（手机底部抽屉 / 桌面右侧面板）、EmptyState、InfoTip（ⓘ 弹出说明）。
4. 把 LearningPages.tsx（1067 行）和 FormulaPages.tsx（566 行）按页面拆到 src/features/{curriculum,practice,review,formulas,experiments}/，单文件不超过 300 行，共享的掌握度统计抽成一个 MasterySummary 组件。

## 第 2 步：逐页信息架构（原则：每页一个主任务，主任务首屏可见，每屏最多 1 个 primary 按钮）
### 首页 /
- 顶部一张 emphasis 卡（navy 底，找回品牌感）：“继续学习：第 X 章 · 课时名 · 当前环节”，下方 ProgressBar（已学 n/12），唯一的 primary 按钮“继续”。无记录时显示“从 1.1 函数极限开始”。
- 下面一行 3 个 StatTile：今日待复习错题、今日到期公式、已掌握题数，点击分别跳到对应页面（StatTile 是可点击卡片，不再放第二个 primary 按钮）。
- 再下面是三个章节的紧凑进度行（章名 + ProgressBar + n/总数）。
- 底部保留“AI 教师 · 尚未开放”的小链接。

### 侧栏 / 顶栏
- 侧栏去掉装饰卡“理解，比记住更重要”，底部换成“关于 / 数据备份”入口（备份导入从复习页移到这里，或做成设置页）。
- 顶栏版本号移到“关于”里。侧栏与内容区使用同一套 token。

### 课程中心 /curriculum
- 桌面：左侧课程大纲（按章分组的 Accordion，每节显示 ✓ / 进行中 / 未学），右侧课时阅读区，最大宽度 720px。
- 手机：/curriculum 是按章分组的 ListItem 列表；点进 /curriculum/:lessonId 是课时详情（保留 ?lesson= 重定向）。
- 课时详情：顶部 5 步进度条“直觉 → 实验 → 定义 → 例题 → 练习（2/5）”取代 5 个平铺按钮；底部 sticky 主按钮“下一步”，走到最后一步自动标记完成，删除单独的“标记已完成阅读”按钮。

### 练习中心 /practice
- 默认是“专注答题”：首屏就是当前题目（短标题 + 公式 + 输入框 + 检查答案）。360px 下输入框必须在第一屏内。
- 题目顶部一行：“第 7 / 24 题 · 第一章”+ ‹ › + “题目列表”按钮 → 打开 Sheet：按章分组的题号网格，每格显示短标题，用颜色和图标标出未做 / 正确 / 错误。章节和错因筛选放在 Sheet 顶部的 ChipRow。
- 掌握度统计从练习页移除（统一放复习页）。判分说明收进输入框旁的 InfoTip。
- 若已有阶段自测，放到独立路由 /practice/quiz/:chapter，入口放在 Sheet 里。

### 错题与复习 /review（Tabs：错题 | 公式）
- 错题标签：顶部是 MasterySummary（3 个章节进度行 + 薄弱考点 Chip），下面按错因分组的错题 ListItem，每条一个“重做”按钮，跳进专注答题。没有错题时显示 EmptyState + “去练习”。
- “最近 20 次作答”收进 Accordion，默认折叠。
- 数据恢复 / 导入移出此页（见侧栏）。

### 公式记忆中心 /review/formulas
- 首屏：emphasis 卡显示“今天要复习 N 张 + 新学 M 个”，唯一 primary 按钮“开始今日复习”。没有到期卡片时显示 EmptyState 和“学几个新公式”。
- “复习模式”和“每日新公式上限”收进右上角“设置”按钮打开的 Sheet，用 SegmentedControl / NumberStepper，不再常驻页面主体。
- 公式库按章 Accordion，每条公式 ListItem 显示熟练度小圆点。
- 卡片复习界面：大字号公式居中，“翻面”后显示答案和 3 个自评按钮（忘了 / 模糊 / 记得），按钮语义色区分。

### 数学实验室 /experiments
- /experiments 只显示 3 张实验卡片（缩略图 + 一句话 + 关联课时）。点进 /experiments/:labId 才是单个实验。
- 单个实验：图表在上（手机上 sticky），控件在下；只突出 2–3 个关键读数（StatTile），其余收进 Accordion“详细数值”。
- “有限采样不代替证明”全局只在 InfoTip 出现一次。课程的“实验”一步嵌入同一组件的紧凑版。

## 第 3 步：移动端
- 底部导航 5 项：图标 24px、文字 12px，当前项高亮。
- 章节、筛选一律用横向滚动的 ChipRow，不允许换行堆成多排。
- 内容最大宽度：阅读类 720px，仪表盘 1200px，居中；桌面卡片不得只放一行字却撑满 960px。

## 第 4 步：防退化护栏（必须实现并纳入 CI）
1. tests/design-guard.spec.ts（Playwright，360×740 和 1280×860）：
   - 遍历所有路由，非 .katex 内的可见文本元素 computed font-size 必须属于 {12,14,15,16,20,24,32}。
   - 360×740 下：/practice 答案输入框 y < 740；/curriculum/:lessonId 正文首段 y < 740；/review/formulas 的“开始今日复习”按钮 y < 740；/experiments/:labId 图表 y < 740。
   - 每页可见的 .btn-primary 不超过 1 个。
   - main 内不得出现原生 <select>、<details>、<input type=number>（统一用组件）。
2. npm run check:css：除 tokens.css 外，CSS 不得出现字面 px 字号、十六进制颜色和 !important；未被任何 TSX 引用的 class 选择器报错（可用简单脚本 grep 实现）。
3. 用 SCREENSHOTS=1 的 screens.spec.ts 在改动前后各截一套 360 / 1280、明暗主题的图，放进 docs/ui-before/ 和 docs/ui-after/，在 HANDOFF.md 里做对比说明。
4. 在 AGENTS.md / CLAUDE.md / GEMINI.md 写入规则：“新功能必须放进已有结构（新路由 / Tabs / Sheet / Accordion），禁止往页面底部继续追加区块；禁止使用原生表单控件和字面样式值；只能使用 src/components/ui 组件和 tokens。”

## 交付与验收
- npm run typecheck、lint、test、check:css 和 npx playwright test 全部通过。
- npm run android:sync，然后 gradlew assembleDebug lintRelease 0 error，版本号 0.7.0。
- 输出：前后对比截图、更新后的 HANDOFF.md、APK、干净源码 zip。
- 汇报时逐条对照本提示词说明完成情况；没完成的如实列出，不得声称完成。
```

---

## 四、需要你拍板的点

1. **品牌感找回来吗**：方案用 navy 深色“重点卡”（每页最多一个）把 0.5.0 首页的气质带回来。如果你就想要现在这种极简白，可以把 Card emphasis 那条删掉。
2. **数据备份放哪**：方案是移到侧栏“关于 / 数据备份”。也可以单独做一个设置页，但那样会多一个路由。
3. **要不要分两轮做**：改动面比较大，可以先只做第 1 步（设计系统）和第 4 步（护栏），验收后再做第 2 步的逐页重构。这样每轮更好检查。

# Michael calculus v0.7.0 交接

基线为 d2b6d41（v0.6.2），本轮只改 UI 和信息架构；Android versionCode 为 9。

## 按修改方案核对

| 项目 | 本轮实现 |
|---|---|
| 设计系统 | tokens / base / layout / components 四层；固定字号、间距、圆角、语义色与深色主题；移除旧补丁和未引用 class。共享 UI 组件覆盖 Button、Card、Tabs、Sheet 等全部清单。 |
| 文件拆分 | LearningPages 仅兼容导出，课程、练习、复习、实验独立文件；公式详情、训练、标签拆分；feature TSX 均不超过 300 行。 |
| 首页及导航 | navy emphasis 主视觉、真实进度和三项统计、章节紧凑进度；五项导航；AI 只保留首页状态链接；版本、备份放设置。 |
| 课程 | 按章大纲，手机目录/详情独立路由，旧 ?lesson= 重定向；五步 Tabs + 进度条 + sticky 下一步，最后一步自动完成阅读。 |
| 练习 | 输入框首屏可见；题目、章节、错因筛选收进 Sheet，网格带标题及对错状态；移除重复掌握度；判分说明收进 InfoTip。 |
| 错题复习 | 共享 MasterySummary、薄弱考点 Chip、按错因分组重做；历史默认折叠；备份迁至设置。 |
| 公式记忆 | 首屏强调复习任务；模式/新公式数用 Sheet + SegmentedControl + NumberStepper；按章公式库；答案翻面、自评语义色。 |
| 数学实验 | 三张入口卡，三个独立实验路由；图表在前，手机 sticky；关键读数保留，微分详细数值默认折叠；证明边界由 InfoTip 说明。 |
| 移动端 | 360px/1280px、深浅主题检查；字号 token、44px 触控、首屏任务、单 primary、无横向溢出和公式裁切护栏。 |
| 防退化 | check:css 和 design-guard 纳入签名发布 CI；三个 agent 指令文件写入结构规则。 |
| 数据兼容 | src/data/*.ts 与公式 engine 无变更；持久化键与备份格式无变更；旧数据恢复、作答保存与公式间隔复习继续回归。 |

## 前后截图

`docs/ui-before/` 是 v0.6.2，`docs/ui-after/` 是 v0.7.0。均含 phone360（360×740）和 desktop（1280×860）的 light/dark 版本；文件名一一对应。课时正文可比较 `lesson-sine-定义`。后图额外包含课时详情、设置、三个单实验页。

| 页面 | 前 | 后 | 可见变化 |
|---|---|---|---|
| 首页 | [前](docs/ui-before/phone360-light-home.png) | [后](docs/ui-after/phone360-light-home.png) | 恢复品牌主视觉、一个主动作、统计入口 |
| 练习 | [前](docs/ui-before/phone360-light-practice.png) | [后](docs/ui-after/phone360-light-practice.png) | 从多屏题号与统计改成首屏答题 |
| 课程 | [前](docs/ui-before/phone360-light-curriculum.png) | [后](docs/ui-after/phone360-light-lesson-limit.png) | 课时正文独立，五步阅读 |
| 公式 | [前](docs/ui-before/phone360-light-formulas.png) | [后](docs/ui-after/phone360-light-formulas.png) | 设置让位于复习任务 |
| 实验 | [前](docs/ui-before/phone360-light-experiments.png) | [后](docs/ui-after/phone360-light-experiments.png) | 三个实验从纵向堆叠改成入口卡 |
| 桌面首页 | [前](docs/ui-before/desktop-light-home.png) | [后](docs/ui-after/desktop-light-home.png) | 侧栏、内容、控件使用同一主题 |

完整截图助手仍覆盖全部 12 课五个环节、24 题、全部极限实验类型。运行：`SCREENSHOTS=1 npx playwright test tests/screens.spec.ts --project=desktop --timeout=240000`（加 `DOC_SCREENSHOTS=1` 可直接更新文档代表图）；开发用全量截图留在忽略的 test-results 中，仅代表性对照图入库。

## 验证结果

- typecheck、ESLint、check:css 通过；32 项单元/组件、5 项签名与备份脚本检查通过。
- 桌面/手机浏览器回归共 28 项通过（默认跳过的 8 项为按需截图助手）；覆盖全部课程、题目、公式、三类实验、旧版数据恢复、主题、抽屉焦点与防误提交。
- 全量截图 4 个尺寸/主题用例通过；另存 32 张前图、52 张后图用于文档对照。
- android:sync、assembleRelease、assembleDebug、lintRelease 通过；app lint 0 error，保留 Android 依赖现有 30 条 warning。
- 最终本地 release APK 已验证：包名 com.michael.calculus，0.7.0 / 9，固定证书，不可调试。
- 课程/题库/数学模型/公式调度与存储源码无差异；原 16 个 data-testid 全部保留。

截图测试中曾因同时进行 Android 编译导致 30 秒综合巡检超时；该测试遍历 60 个课时环节和 24 次抽屉选题，现设为 120 秒并通过，行为断言均保留。日常 CI 与正式发布 CI 均运行全套回归。

首次 GitHub CI 使用 Chromium 145，发现 label 内移除选项按钮会触发 label 的默认激活，重新打开下拉框；本地系统 Chromium 156 没有表现出该差异。已用 145 复现默认激活计数为 1，修复后为 0；Select 阻止选项点击的默认 label 激活并归还焦点，选项辅助函数新增“选择后必须关闭”的断言。未发布失败流水线的 APK，修复后才重新建立 v0.7.0 的正式发布标签。

## 构建与发布

正式包只走 `.github/workflows/release.yml`：固定证书、包名 `com.michael.calculus`、versionName 0.7.0、versionCode 9、不可调试。debug 构建是独立 `.dev` 应用，仅用于构建检查。

已下载 v0.6.2 正式 APK 比较证书，其 SHA-256 与仓库锁定值一致：`8d7d3a0c3cccb6130ce83dc1d71c7c9721d4266c085f5a68f4b9df8027751706`。不生成新私钥、不修改 pin、不把密钥放进源码包。

尚未执行用户手机上的实际覆盖安装；签名和递增版本检查提供覆盖更新的必要条件，不能代替真机验收。积分课程、AI 问答、OCR、云同步、阶段自测未实现，本轮未新增这些功能。

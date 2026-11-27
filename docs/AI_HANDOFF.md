# Michael Calculus · AI 项目交接

本文件是 `main` 的权威交接。旧工作树先读 [AGENTS.md](../AGENTS.md)，再查阅 [main 上的本文件](https://github.com/x-zyz/michael-calculus/blob/main/docs/AI_HANDOFF.md)。接手任务时核对远程提交、工作树和未提交改动，保留其他 Agent 的工作树与分支。分支状态、版本与验证结果以 Git、源码及实际回读为准。

## 当前发布基线 · v1.6.0

- [v1.6.0](https://github.com/x-zyz/michael-calculus/releases/tag/v1.6.0) 的合并提交为 `2b1a6baa8a89a1214341c8bd63f1c9bf3d9da548`（[PR #19](https://github.com/x-zyz/michael-calculus/pull/19)，含 510 题去模板 ELI5 升级 `a472c7ed935a74641782e05ff2eb9ad1b40ef21f` 与发版提交 `307dd751ab3fe1ac3eeef6769963feec453346f6`；前置 [PR #18](https://github.com/x-zyz/michael-calculus/pull/18) 合并提交 `7f0e7207b8236fd78aba55ecea5229a43d450879` 已合入第三章剩余 97 题与 68 节课程重写 `21827ddd7bc463a438fa6a40a56af7b8bdb4c9f5`）。
- **教学与题库里程碑（第 1–3 章 797/797 题 100% 定制 ELI5 覆盖）**：
  - 补齐第三章剩余 97 题并完成全书第 1–8 章 68 节课程正文自然口语化重写与 `MathText` 渲染校验；
  - 将第一、二章全部 510 道模板题（第 1 章 303 + 第 2 章 207）重构为 3 步定制 ELI5 教学（1,020 道理解检查、平衡槽位分布），并将全部 37 道六位近似/无理迁移题替换为 SymPy 验证的整数或简洁有理数变体；510 题在 `360×740` 下逐题实测零裁切；新增永久门禁单测 [ch03RemainingEli5.test.ts](../src/tests/ch03RemainingEli5.test.ts) 与 [ch01Ch02DetemplateEli5.test.ts](../src/tests/ch01Ch02DetemplateEli5.test.ts)。
- 本地终验（`validate:bank` 1,693 题 / 797 提示 / 797 ELI5 / 0 错、`typecheck`、`lint`、`check:css`、`vitest` 20 文件 132 项、`test:signing` 5 项、`android:sync`、510 题 `360×740` 巡检 0 错、Playwright 448 通过 / 20 跳过）与云端流水线均已通过：主线 [UI 回归](https://github.com/x-zyz/michael-calculus/actions/runs/45935821236)、[Pages 部署](https://github.com/x-zyz/michael-calculus/actions/runs/45935821278) 与 [签名发布](https://github.com/x-zyz/michael-calculus/actions/runs/45935830814)（含 `publish-bytevirt`）均成功。
- 正式 APK 为 `com.michael.calculus` 1.6.0 / `versionCode 53`，共 `7,871,269` 字节，SHA-256 为 `185caadc9635267e0d86570a3c28ae4daa70fc316f2554df422483b4ffe8d92c`；PWA 离线 ZIP 为 `4,862,818` 字节，SHA-256 为 `a071e92e21b9e70196ec63b2de1795df8bbc555f9bb2fda28d1bc77d2dbb020d`。独立跑通 `scripts/verify-android-release.mjs`（固定签名指纹 `8d7d3a0c3cccb6130ce83dc1d71c7c9721d4266c085f5a68f4b9df8027751706`，非调试包，对齐通过）。
- [ByteVirt 清单](https://update.0979019203.top/calculus/stable/android/latest.json) 实测版本 `1.6.0` / `build 53`、序列 `53`，APK 返回 HTTP 200 且 SHA-256 与 Release 一致；[Pages](https://x-zyz.github.io/michael-calculus/) 实测 `sw.js` 缓存为 `michael-calculus-v1.6.0`。Android 真机覆盖升级、学习数据保留和离线重开仍待验收。

## v1.5.0 与前期基线发布记录

- [v1.5.0](https://github.com/x-zyz/michael-calculus/releases/tag/v1.5.0) 的合并提交为 `9fffda7b64f43d92120eaadde96860dfad6916b0`（[PR #17](https://github.com/x-zyz/michael-calculus/pull/17)，发版提交 `0164f92baaa09c8f013ee8f36d6332afa4571e76`）。实装印象派 "Giverny Atelier" 双主题，新增 [DanubeBackdrop.tsx](../src/components/DanubeBackdrop.tsx) 及 `public/art/danube-day.webp`、`danube-night.webp`；截至 §3.4 的 700 题 ELI5 与 3 套补救微课已入主线。主线 [UI 回归](https://github.com/x-zyz/michael-calculus/actions/runs/45615942211)、[Pages 部署](https://github.com/x-zyz/michael-calculus/actions/runs/45615942364) 与 [签名发布](https://github.com/x-zyz/michael-calculus/actions/runs/45616033252) 均成功，APK 为 `1.5.0` / `52`（7,302,781 字节，SHA-256 `2719bd2533a0524888ef17c03e9fa11f57c828ad10a840e73a9169cef2d5581c`）。
- 随后 [PR #18](https://github.com/x-zyz/michael-calculus/pull/18)（`7f0e7207`）合入 `content/ch3-complete-eli5`（第三章剩余 97 题 ELI5 `a8bf415`、`643abdc`、`1f52d5d` 及 68 节课程自然表达重写 `21827dd`）。

## v1.4.0 发布记录

- [v1.4.0](https://github.com/x-zyz/michael-calculus/releases/tag/v1.4.0) 合并提交为 `51b931e7aac7d9b60148c8d330b35f53c76b04e1`（[PR #16](https://github.com/x-zyz/michael-calculus/pull/16)，提交 `daabcd02f33e1ef6c1e45e09c421a24968f9274d` / `2b04d9b2f59997a335a20d0fbbaa3b4b304205cc` / `27b6faf6b7d909426e9eb8f30a62ecafff67f7c5`），新增第三章 §3.3 泰勒公式（15 题）与 §3.4 单调性、极值与凹凸性（38 题），全库达 700 题覆盖，Android 升至 `1.4.0` / `versionCode 51`。
- [UI 回归](https://github.com/x-zyz/michael-calculus/actions/runs/45590561242)、[Pages 部署](https://github.com/x-zyz/michael-calculus/actions/runs/45590560934) 与 [签名发布](https://github.com/x-zyz/michael-calculus/actions/runs/45590612755) 成功；正式 APK 为 7,098,141 字节，SHA-256 为 `324cc2ccfea3dbaf49834acf8d0fae6e8af296ae9d8f34b01652b592a06fdd1a`。

## v1.3.1 发布记录

- [v1.3.1](https://github.com/x-zyz/michael-calculus/releases/tag/v1.3.1) 合并提交为 `5f6d47eea85f3a2c089d58593fd7614db2984bc3`（[PR #15](https://github.com/x-zyz/michael-calculus/pull/15)，提交 `e617ac96a5c732c07552c93a40de14b5cb3a8ed3` / `3cd0b8b88fbc289fa7fef06ad051564b4afd3536`），升级第二章 50 道核心题 ELI5 教学，并在 [remediationModules.ts](../src/data/remediation/remediationModules.ts) 新增罗尔定理三大前提（`rolle-conditions`）与拉格朗日中值定理辅助函数（`lagrange-mvt`）两套补救微课，Android 升至 `1.3.1` / `versionCode 50`。
- [UI 回归](https://github.com/x-zyz/michael-calculus/actions/runs/45560852213)、[Pages 部署](https://github.com/x-zyz/michael-calculus/actions/runs/45560852251) 与 [签名发布](https://github.com/x-zyz/michael-calculus/actions/runs/45560898257) 成功；正式 APK 为 7,045,965 字节，SHA-256 为 `e7e9a6cd5ab9c476a2f4f7be25f744c3968c2244a58669f0d974eb2c924e3605`。

## v1.3.0 发布记录

- [v1.3.0](https://github.com/x-zyz/michael-calculus/releases/tag/v1.3.0) 的发布提交为 `f9d3d90bd1eb63d72eac7ae08646d693f0f6211b`，包含 Phase 2A 的 `3e8249e33792b6dcebacfc8fd8b5c6982e9504a8`。1,693 道题、647 组逐步提示和 647 套 ELI5 统一存放于 `src/data/bank/ch01.json` 至 `ch08.json`。30 组图形在 `graphs.ts` 恢复曲线函数，渲染取样点逐支与 v1.2.1 比对一致。
- 首页、课程、复习、备份校验和公式复习使用派生索引。练习打开指定题目时按章加载完整内容。Vite 生成 8 个独立章节包，入口 JS 由约 3.71 MB 降至 1.54 MB。PWA 预缓存全部章节，Android APK 内置相同的章节包。
- 练习中心的「题目列表」支持即时关键词、题号和出处搜索，以及章节、考点、难度、题型、ELI5 和逐步提示筛选。昵称、独立定理和套路字段已接入索引，数据仍待教学方标注。本版可按已有考点标签筛选。
- 编辑章节数据后运行 `npm run build:bank-index` 更新派生索引，再运行 `npm run validate:bank`。校验覆盖数据结构、ID、引用、KaTeX、ELI5、派生索引和图形配置，并已接入 [质量检查](https://github.com/x-zyz/michael-calculus/actions/runs/45540550221) 与 [发版工作流](https://github.com/x-zyz/michael-calculus/actions/runs/45540550399)。
- 本地 typecheck、lint、check:css、118 项 Vitest、5 项签名与备份验证和 `android:sync` 通过。Playwright 384 项通过、8 项按条件跳过，覆盖 1,693 道题的 360px 检查、搜索筛选、断网切章和 PWA 升级。从 v1.2.1 升级后作答记录保留。签名工作流另通过云端 Playwright 372 项与 Android `assembleRelease lintRelease`。
- 正式 APK 为 `com.michael.calculus` 1.3.0 / 49，共 7,021,677 字节，SHA-256 为 `260ea67630476d4a422eb072f3faac3103fdb5f5125a6b794d55e46b2d8c01a6`，固定签名独立验包通过。[ByteVirt 清单](https://update.0979019203.top/calculus/stable/android/latest.json) 验签通过，版本 1.3.0 / 49、序列 49，APK 与 GitHub Release 逐字节一致。
- [Pages](https://x-zyz.github.io/michael-calculus/) 的缓存为 `michael-calculus-v1.3.0`，HTML、`sw.js`、入口 JS/CSS 和 8 个章节包均与 Release 离线 ZIP 一致。Android 真机覆盖升级、学习数据保留和离线重开仍待验收。

## v1.2.1 发布记录

- [v1.2.1](https://github.com/x-zyz/michael-calculus/releases/tag/v1.2.1) 发布提交为 `5dd2198cad58da12aeb5238f584cd460622966c2`，集成 Gemini 的 `ab0f18bbd7cdc40d0ae0f07e5eb0ee3dd5f889d9`。第一、二章及 §3.2 共 625 道题补齐公式关联。§3.2 的 23 道题已启用逐步提示和 ELI5，另外 9 道同标签题沿用原练习流程。
- 题头的「公式表」增加强调色、描边、展开状态和本题公式数量。桌面并排时为题面保留足够宽度，§3.2 的五道解法已调整为适合 360px 的换行。
- 本地 typecheck、lint、check:css、build、149 项 Vitest 和 5 项签名与备份验证通过。§3.2 的 23 题及迁移题通过 SymPy 复算。Playwright 378 项通过、8 项按条件跳过，已回归全部 23 题的四状态流程和公式表，并验证了 v1.2.0 PWA 升级保留记录、断网重开可查公式。
- [签名发布](https://github.com/x-zyz/michael-calculus/actions/runs/45520342033) 成功，云端 Playwright 370 项通过、16 项按条件跳过，Android `assembleRelease lintRelease` 通过。正式 APK 为 `com.michael.calculus` 1.2.1 / 48，共 6,885,609 字节，SHA-256 为 `c1b986b61756b77e531875725e75990464a6eee1aece16590723ce47f583a08b`，固定证书独立验包通过。
- [ByteVirt 清单](https://update.0979019203.top/calculus/stable/android/latest.json) 验签通过，版本 1.2.1 / 48、序列 48，APK 与 GitHub Release 逐字节一致。[Pages](https://x-zyz.github.io/michael-calculus/) 的缓存为 `michael-calculus-v1.2.1`，HTML、`sw.js` 和入口 JS/CSS 与 Release 离线 ZIP 一致。Android 真机覆盖升级、学习数据保留与离线重开仍待验收。

## v1.2.0 发布记录

- [v1.2.0](https://github.com/x-zyz/michael-calculus/releases/tag/v1.2.0) 发布提交为 `cb8bc4d730baa25c54031ae41f592eefe51c235e`，包含 Gemini 的 `bab6818006713eac2a2756997abb3d3a87e74b50`。P1.5 为 §3.1 的 22 题改写 44 个理解检查并补齐公式关联，恢复三题在 360px 下的解法换行。
- 专注 ELI5、普通数值题与书面证明题均可在题内查看本题和本章公式。宽屏并排显示，窄屏使用 Sheet。公式表复用公式库与 KaTeX，关闭后恢复焦点，保留草稿、教学步骤和理解检查进度。
- 本地通过 typecheck、lint、check:css、build、146 项 Vitest、5 项签名与备份验证，以及 §3.1 的 22 题和迁移题 SymPy 复核。Playwright 332 项通过、8 项按条件跳过，含 360px 布局、离线重开和旧 PWA 升级。另验证了从 v1.1.0 升级至 v1.2.0 后保留作答记录。
- [签名发布工作流](https://github.com/x-zyz/michael-calculus/actions/runs/45510713963) 与 [主线回归](https://github.com/x-zyz/michael-calculus/actions/runs/45510713309) 成功。云端 Playwright 324 项通过、16 项按条件跳过，签名发布另通过 Android `assembleRelease lintRelease`。
- 正式 APK 为 `com.michael.calculus` 1.2.0 / 47，共 6,861,085 字节，SHA-256 为 `dd1cc3bc26ad2a6854362936930de5a68e2c793a3ad31c063fd89eb724906238`，固定证书独立验包通过。[ByteVirt 公网清单](https://update.0979019203.top/calculus/stable/android/latest.json) 验签通过，版本 1.2.0 / 47、序列 47，下载的 APK 与 GitHub Release 逐字节一致。
- [Pages](https://x-zyz.github.io/michael-calculus/) 的缓存为 `michael-calculus-v1.2.0`，HTML、`sw.js` 和入口 JS/CSS 与 Release 离线 ZIP 逐字节一致。Android 真机覆盖升级、学习数据保留和断网重开仍待验收。

## 项目与 v1.1.0 发布记录

- Michael Calculus 是离线优先的高数学习应用，使用 React、TypeScript、Vite、KaTeX 与 Capacitor，交付 Android 和 PWA。项目入口与运行方式见 [README](../README.md)。
- [v1.1.0](https://github.com/x-zyz/michael-calculus/releases/tag/v1.1.0) 的标签对象 `7d19eb55f3c858ca58c6bb8836327f835d0e359a` 指向主线发版提交 `16138ccb9f0841c1b37f6a729768a147dcb3b1fd`。Android 包名 `com.michael.calculus`，`versionName 1.1.0`，`versionCode 46`。
- 2026-11-23（太平洋时间）通过公网下载核验了 [正式 APK](https://github.com/x-zyz/michael-calculus/releases/download/v1.1.0/Michael-calculus-1.1.0.apk) 和 [离线 PWA ZIP](https://github.com/x-zyz/michael-calculus/releases/download/v1.1.0/Michael-calculus-1.1.0-pwa.zip)。两者均为 HTTP 200，SHA-256 与 Release 校验表一致。APK 6,864,881 字节，SHA-256 `2defe902b859b3aa00ae83eea8b26d68a114a3249eb10793d3db284358bf18a8`。ZIP 3,857,854 字节，SHA-256 `8b733bf10f43d9c2505837fcebb2cc423df1cdaf13cccbe8c5d1ebf61b59589b`。
- 对下载的 APK 运行 `node scripts/verify-android-release.mjs <APK>`，核对了包名、版本、非调试属性、对齐与[固定签名](android-signing.md)。证书 SHA-256 为 `8d7d3a0c3cccb6130ce83dc1d71c7c9721d4266c085f5a68f4b9df8027751706`。[签名发布和 ByteVirt 同步](https://github.com/x-zyz/michael-calculus/actions/runs/45347513179) 均成功。
- 发版前通过 `npm run typecheck`、`npm run lint`、`npm run check:css`、`npm test`（146 项）、`npm run test:signing`（5 项）和 `npm run build`。签名工作流另通过 Playwright（318 项通过，14 项跳过）与 Android `assembleRelease lintRelease`。
- [ByteVirt 公网清单](https://update.0979019203.top/calculus/stable/android/latest.json) 的内容签名通过验证，实测版本 1.1.0 / 46、序列 46。清单和 [公网 APK](https://update.0979019203.top/calculus/stable/android/releases/46/package.apk) 均返回 HTTP 200，公网 APK 与 GitHub Release APK 逐字节一致。
- [GitHub Pages PWA](https://x-zyz.github.io/michael-calculus/) 由 [pwa-pages.yml](../.github/workflows/pwa-pages.yml) 在 `main` 推送时部署。[PR #10](https://github.com/x-zyz/michael-calculus/pull/10) 让制品检查与部署使用同一制品服务，解决了 v1.1.0 的制品索引延迟。[实测部署](https://github.com/x-zyz/michael-calculus/actions/runs/45348189352) 的 HTML、`sw.js` 与入口 JS/CSS 均返回 HTTP 200，SHA-256 与部署制品一致。
- Pages 的 `sw.js` 缓存标识为 `michael-calculus-v1.1.0`（SHA-256 `fb9626feaca4eea150703517a6e8fb0298a729801872e9f7c40fe60cfae0bbd9`）。HTML 引用 `index-CfcZW3bR.js`（`437db6107dc454512f492c3ba93210840680b28ae35e240dd4449b091898b1d1`）与 `index-Dlh76GjU.css`（`8643338b6bb663a278c5fd4948d8f5253b596ea4a1490a2ad0ed6e72fc3b5e97`）。HTML、工作线程和两个入口资源的字节也与 Release 的离线 ZIP 一致。
- 当前 ByteVirt 发布机接受受限 SSH，洛杉矶 Caddy 为高数稳定通道代理发布机。发布工作流已经加入 [公网回读](../scripts/verify-bytevirt-public.mjs)，将清单和 APK 与上传包逐字节对照。

## 题库与教学进度

下表为 `main`（`v1.6.0`）单一数据源 `src/data/bank/ch01.json` … `ch08.json` 的实时覆盖统计（**第 1–3 章全部 797 题已实现 100% 定制三步 ELI5 覆盖**，全库占比 `797/1,693 = 47.08%`）：

| 范围 | 题量 | 已关联 `formulaIds` | 有逐步提示 `guidedHints` | 定制四状态 ELI5（`main`） |
| --- | ---: | ---: | ---: | ---: |
| 第一章 函数、极限与连续 | 344 | 344 | 344 | 344（100%） |
| 第二章 导数与微分 | 258 | 258 | 258 | 258（100%） |
| 第三章 微分中值定理与导数应用 | 195 | 195 | 195 | 195（100%） |
| 第四章 不定积分 | 241 | 2 | 0 | 0 |
| 第五章 定积分及其应用 | 301 | 9 | 0 | 0 |
| 第六章 多元函数微积分 | 37 | 22 | 0 | 0 |
| 第七章 无穷级数 | 22 | 9 | 0 | 0 |
| 第八章 常微分方程及差分方程 | 295 | 18 | 0 | 0 |
| 整体题库合计 | 1,693 | 857 | 797 | 797（47.08%） |

- 第三章分节明细（195 题）：§3.1 16 题、§3.2 19 题、§3.3 15 题、§3.4 38 题、§3.5 31 题、§3.6 5 题、§3.7 11 题、§3.8 4 题、总习题三 30 题、核心与综合 26 题；全库 `meta`（`nickname` / `theorems` / `techniques` / `isTrap` / `trapNote`）目前为 `0` 题，待后续语义标引。章节与课时归属见 [教材课程大纲](textbook-curriculum.md)，题库结构与字段规范见 [题库说明](bank/README.md)。
- 四状态 ELI5 支持独立作答、引导、完整解法和结果。数值题按允许的数值或分数判分。书写推导、证明和作图保留纸笔作答与自评。看过引导或解法的正确作答记录为辅助完成。
- 运行时覆盖由 [expandedTeaching.test.ts](../src/tests/expandedTeaching.test.ts)、[ch01Ch02DetemplateEli5.test.ts](../src/tests/ch01Ch02DetemplateEli5.test.ts)、[ch03RemainingEli5.test.ts](../src/tests/ch03RemainingEli5.test.ts) 与 `npm run validate:bank` 核对；历史 [首批生产清单](eli5-production/README.md) 的排期状态仅作早期批次参考。
- [41 题教学审计](eli5-pedagogy-audit-ch1-41.md) 与 [P0 整改记录](eli5-p0-remediation-report.md) 记录了 Batch 1 的选项位置、提前揭示和迁移题问题，以及第二章 `p17` 的条件到公式映射。覆盖测试、已审计范围和学生体验是三个独立的验收项。

## P1 已合入主线

- [PR #7](https://github.com/x-zyz/michael-calculus/pull/7) 起逐步接入第三章 §3.1（22 题）、§3.2（23 题）、§3.3–§3.4（53 题）的 `guidedHints` 与深度四状态 ELI5；分支 `content/ch3-complete-eli5` 接续补齐第三章全部剩余 97 题。
- [前置知识补救 Sheet](../src/features/practice/RemediationEntry.tsx) 按 [模块注册表](../src/data/remediation/remediationModules.ts) 的 `remediationId` 渲染，现已注册 `chain-rule`（链式法则）、`rolle-conditions`（罗尔定理三大前提）与 `lagrange-mvt`（拉格朗日放缩与辅助函数）三套微课。课程入口由注册表配置，被动入口根据教学步骤和错因解析，关闭或完成后回到原题当前步骤，沿用原有学习记录与备份格式。
- 主线 [自动化回归](https://github.com/x-zyz/michael-calculus/actions/workflows/quality.yml?query=branch%3Amain) 覆盖桌面和 360px 移动端的四状态流程、补救入口触发边界、公式表显示及进度恢复。

## 协作与下一阶段

| 负责人 | 分工 |
| --- | --- |
| Gemini | 教学内容、ELI5 微课（`guidedHints`/`teaching`）、`formulaIds`、`meta` 语义标引与数学验收 |
| Sol | 架构、UI、工程集成与回归，维护状态机、数据兼容性、构建发布及本交接 |

1. **推进第四章《不定积分》（`ch04.json`，241 题）**：优先补齐 `formulaIds`、三级 `guidedHints` 与定制 3 步四状态 ELI5 教学，并视需要补充凑微分 / 第一、二类换元 / 分部积分前置补救微课；同步保留 `ch04`–`ch08` 章节大纲 ID 与持久化的向后兼容（之后普通未教学练习夹具需继续指向 `ch05.json` 及以后）。
2. **继续扩展第 5–8 章 ELI5 教学（第 5 章 301 题、第 6 章 37 题、第 7 章 22 题、第 8 章 295 题）**：在 `v1.6.0` 第 1–3 章 797 题 100% 手工 ELI5 基线上，分章推进其余 896 道练习。
3. **推进语义标引 `meta` 与真机验收**：按 `src/data/bank/schema.ts` 为已教学题目补充 `nickname` / `theorems` / `techniques` / `isTrap` / `trapNote` 语义标签，强化题目检索体验；完成 Android 真机覆盖升级（v1.5.0 → v1.6.0）、学习数据保留及离线重开验收。

## 验收边界与历史分支

- 继续沿用学习进度、作答、错题、公式复习和 JSON 备份格式。Android 真机覆盖升级、数据保留及离线重开仍待产品验收。
- P0 修复覆盖 Batch 1 和 `p17` 的已知问题。其余未单独审计的新增 ELI5（含后续扩展及 Ch3 新增批次）的可读性、错因区分与迁移质量仍待分批教学验收。学习效果需要代表题与学生反馈。
- [草稿 PR #4](https://github.com/x-zyz/michael-calculus/pull/4) 记录旧的 0.31.0、43 号候选和 ByteVirt 序列 37。建议用这份交接替代其当前状态说明，关闭旧 PR 由产品负责人决定。
- 历史 Android 验收清单和迁移排查见 [发布前验收分支](https://github.com/x-zyz/michael-calculus/blob/a5da5178e1f32f14fd2a0fdee12cc0b6d8d45c10/docs/android-v1-candidate.md) 与 [ByteVirt 调查](https://github.com/x-zyz/michael-calculus/blob/a5da5178e1f32f14fd2a0fdee12cc0b6d8d45c10/docs/bytevirt-stable-acceptance.md)。保留历史签名构建及 App Hub 暂存记录，待负责人确认使用情况后再清理远程分支。

交接更新应写明实际变更、提交、验证命令、结果和仍待验收的事项。正式发布、标签和版本变更遵循 [AGENTS.md](../AGENTS.md) 的授权及固定签名规则。

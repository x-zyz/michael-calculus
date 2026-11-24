# Michael Calculus · AI 项目交接

本文件是 `main` 的权威交接。旧工作树先读 [AGENTS.md](../AGENTS.md)，再查阅 [main 上的本文件](https://github.com/x-zyz/michael-calculus/blob/main/docs/AI_HANDOFF.md)。接手任务时核对远程提交、工作树和未提交改动，保留其他 Agent 的工作树与分支。分支状态、版本与验证结果以 Git、源码及实际回读为准。

## 当前发布基线 · v1.2.0

- [v1.2.0](https://github.com/x-zyz/michael-calculus/releases/tag/v1.2.0) 发布提交为 `cb8bc4d730baa25c54031ae41f592eefe51c235e`，包含 Gemini 的 `bab6818006713eac2a2756997abb3d3a87e74b50`。P1.5 为 §3.1 的 22 题改写 44 个理解检查并补齐公式关联，恢复三题在 360px 下的解法换行。
- 专注 ELI5、普通数值题与书面证明题均可在题内查看本题和本章公式。宽屏并排显示，窄屏使用 Sheet。公式表复用公式库与 KaTeX，关闭后恢复焦点，保留草稿、教学步骤和理解检查进度。
- 本地通过 typecheck、lint、check:css、build、146 项 Vitest、5 项签名与备份验证，以及 §3.1 的 22 题和迁移题 SymPy 复核。Playwright 332 项通过、8 项按条件跳过，含 360px 布局、离线重开和旧 PWA 升级。另验证了从 v1.1.0 升级至 v1.2.0 后保留作答记录。
- [签名发布工作流](https://github.com/x-zyz/michael-calculus/actions/runs/45510713963) 与 [主线回归](https://github.com/x-zyz/michael-calculus/actions/runs/45510713309) 成功。云端 Playwright 324 项通过、16 项按条件跳过，签名发布另通过 Android `assembleRelease lintRelease`。
- 正式 APK 为 `com.michael.calculus` 1.2.0 / 47，共 6,861,085 字节，SHA-256 为 `dd1cc3bc26ad2a6854362936930de5a68e2c793a3ad31c063fd89eb724906238`，固定证书独立验包通过。[ByteVirt 公网清单](https://update.0979019203.top/calculus/stable/android/latest.json) 验签通过，版本 1.2.0 / 47、序列 47，下载的 APK 与 GitHub Release 逐字节一致。
- [Pages](https://x-zyz.github.io/michael-calculus/) 的缓存为 `michael-calculus-v1.2.0`，HTML、`sw.js` 和入口 JS/CSS 与 Release 离线 ZIP 逐字节一致。Android 真机覆盖升级、学习数据保留和断网重开仍待验收。

## 项目与 v1.1.0 发布记录

- Michael Calculus 是离线优先的高数学习应用，使用 React、TypeScript、Vite、KaTeX 与 Capacitor，交付 Android 和 PWA。项目入口与运行方式见 [README](../README.md)。
- 上一正式版为 [v1.1.0](https://github.com/x-zyz/michael-calculus/releases/tag/v1.1.0)。标签对象 `7d19eb55f3c858ca58c6bb8836327f835d0e359a` 指向主线发版提交 `16138ccb9f0841c1b37f6a729768a147dcb3b1fd`。Android 包名 `com.michael.calculus`，`versionName 1.1.0`，`versionCode 46`。
- 2026-11-23（太平洋时间）通过公网下载核验了 [正式 APK](https://github.com/x-zyz/michael-calculus/releases/download/v1.1.0/Michael-calculus-1.1.0.apk) 和 [离线 PWA ZIP](https://github.com/x-zyz/michael-calculus/releases/download/v1.1.0/Michael-calculus-1.1.0-pwa.zip)。两者均为 HTTP 200，SHA-256 与 Release 校验表一致。APK 6,864,881 字节，SHA-256 `2defe902b859b3aa00ae83eea8b26d68a114a3249eb10793d3db284358bf18a8`。ZIP 3,857,854 字节，SHA-256 `8b733bf10f43d9c2505837fcebb2cc423df1cdaf13cccbe8c5d1ebf61b59589b`。
- 对下载的 APK 运行 `node scripts/verify-android-release.mjs <APK>`，核对了包名、版本、非调试属性、对齐与[固定签名](android-signing.md)。证书 SHA-256 为 `8d7d3a0c3cccb6130ce83dc1d71c7c9721d4266c085f5a68f4b9df8027751706`。[签名发布和 ByteVirt 同步](https://github.com/x-zyz/michael-calculus/actions/runs/45347513179) 均成功。
- 发版前通过 `npm run typecheck`、`npm run lint`、`npm run check:css`、`npm test`（146 项）、`npm run test:signing`（5 项）和 `npm run build`。签名工作流另通过 Playwright（318 项通过，14 项跳过）与 Android `assembleRelease lintRelease`。
- [ByteVirt 公网清单](https://update.0979019203.top/calculus/stable/android/latest.json) 的内容签名通过验证，实测版本 1.1.0 / 46、序列 46。清单和 [公网 APK](https://update.0979019203.top/calculus/stable/android/releases/46/package.apk) 均返回 HTTP 200，公网 APK 与 GitHub Release APK 逐字节一致。
- [GitHub Pages PWA](https://x-zyz.github.io/michael-calculus/) 由 [pwa-pages.yml](../.github/workflows/pwa-pages.yml) 在 `main` 推送时部署。[PR #10](https://github.com/x-zyz/michael-calculus/pull/10) 让制品检查与部署使用同一制品服务，解决了 v1.1.0 的制品索引延迟。[实测部署](https://github.com/x-zyz/michael-calculus/actions/runs/45348189352) 的 HTML、`sw.js` 与入口 JS/CSS 均返回 HTTP 200，SHA-256 与部署制品一致。
- Pages 的 `sw.js` 缓存标识为 `michael-calculus-v1.1.0`（SHA-256 `fb9626feaca4eea150703517a6e8fb0298a729801872e9f7c40fe60cfae0bbd9`）。HTML 引用 `index-CfcZW3bR.js`（`437db6107dc454512f492c3ba93210840680b28ae35e240dd4449b091898b1d1`）与 `index-Dlh76GjU.css`（`8643338b6bb663a278c5fd4948d8f5253b596ea4a1490a2ad0ed6e72fc3b5e97`）。HTML、工作线程和两个入口资源的字节也与 Release 的离线 ZIP 一致。
- 当前 ByteVirt 发布机接受受限 SSH，洛杉矶 Caddy 为高数稳定通道代理发布机。发布工作流已经加入 [公网回读](../scripts/verify-bytevirt-public.mjs)，将清单和 APK 与上传包逐字节对照。

## 题库与教学进度

| 范围 | 运行时题量 | 有逐步提示 `guidedHints` | 注册四状态 ELI5 |
| --- | ---: | ---: | ---: |
| 第一章 函数、极限与连续 | 344 | 344 | 344 |
| 第二章 导数与微分 | 258 | 258 | 258 |
| 第三章 §3.1 微分中值定理 | 22 | 22 | 22 |
| 整体题库 | 1,693 | 上述范围已全覆盖 | 624 |

- 第二章覆盖教材 §2.1–§2.5 及章末总习题二。章节与课时归属见 [教材课程大纲](textbook-curriculum.md)。题库来源和分类见 [题库说明](bank/README.md)。
- 四状态 ELI5 支持独立作答、引导、完整解法和结果。数值题按允许的数值或分数判分。书写推导、证明和作图保留纸笔作答与自评。看过引导或解法的正确作答记录为辅助完成。
- 第一章原 41 道是既有详细试点和 Batch 1。运行时其余 303 道第一章题和 258 道第二章题也已注册。历史 [首批生产清单](eli5-production/README.md) 的排期状态记录了当时的制作批次。当前覆盖由 [运行时注册测试](../src/tests/expandedTeaching.test.ts) 核对。
- [41 题教学审计](eli5-pedagogy-audit-ch1-41.md) 与 [P0 整改记录](eli5-p0-remediation-report.md) 记录了 Batch 1 的选项位置、提前揭示和迁移题问题，以及第二章 `p17` 的条件到公式映射。v1.0.1 已包含这些修正与移动端公式换行。覆盖测试、已审计范围和学生体验是三个独立的验收项。

## P1 已合入主线

- [PR #7](https://github.com/x-zyz/michael-calculus/pull/7) 接入 §3.1 全部 22 题的 `guidedHints` 与深度四状态 ELI5。全库 51 道 `mvt` 题中，§3.1 的 22 题按注册题号启用，其余 29 道保留原练习流程。
- [前置知识补救 Sheet](../src/features/practice/RemediationEntry.tsx) 按 [模块注册表](../src/data/eli5Drafts/remediationModules.ts) 的 `remediationId` 渲染，目前注册 `chain-rule`。课程入口由注册表配置，被动入口根据教学步骤和错因解析。关闭或完成后回到原题当前步骤，沿用原有学习记录与备份格式。
- Gemini 完成数学与交互审核，产品负责人完成人工验收。主线 [自动化回归](https://github.com/x-zyz/michael-calculus/actions/workflows/quality.yml?query=branch%3Amain) 覆盖桌面和 360px 移动端的 §3.1 四状态流程、补救入口的触发边界和进度恢复。

## 协作与下一阶段

| 负责人 | 分工 |
| --- | --- |
| Gemini | 教学内容与数学复核，编写理解检查、补救例题和迁移题，组织教学验收 |
| Sol | 架构、UI、工程集成与回归，维护状态机、数据兼容性、构建发布及本交接 |

1. 按注册表追加罗尔定理和拉格朗日中值定理的补救模块数据，复用现有 Sheet。覆盖定理适用条件、反例和辅助函数选择，并按具体障碍配置入口。
2. 由产品负责人排定 §3.2 洛必达法则与剩余章节 ELI5 的优先级。后续工作从最新 `origin/main` 开独立分支，并将实测结果回写交接。

## 验收边界与历史分支

- 继续沿用学习进度、作答、错题、公式复习和 JSON 备份格式。Android 真机覆盖升级、数据保留及离线重开仍待产品验收。
- P0 修复覆盖 Batch 1 和 `p17` 的已知问题。其余 560 道新增 ELI5 的可读性、错因区分与迁移质量仍待分批教学验收。学习效果需要代表题与学生反馈。
- [草稿 PR #4](https://github.com/x-zyz/michael-calculus/pull/4) 记录旧的 0.31.0、43 号候选和 ByteVirt 序列 37。建议用这份交接替代其当前状态说明，关闭旧 PR 由产品负责人决定。
- 历史 Android 验收清单和迁移排查见 [发布前验收分支](https://github.com/x-zyz/michael-calculus/blob/a5da5178e1f32f14fd2a0fdee12cc0b6d8d45c10/docs/android-v1-candidate.md) 与 [ByteVirt 调查](https://github.com/x-zyz/michael-calculus/blob/a5da5178e1f32f14fd2a0fdee12cc0b6d8d45c10/docs/bytevirt-stable-acceptance.md)。保留历史签名构建及 App Hub 暂存记录，待负责人确认使用情况后再清理远程分支。

交接更新应写明实际变更、提交、验证命令、结果和仍待验收的事项。正式发布、标签和版本变更遵循 [AGENTS.md](../AGENTS.md) 的授权及固定签名规则。

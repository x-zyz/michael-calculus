# Michael Calculus · AI 项目交接

已合并的交接以 [main 固定地址](https://github.com/x-zyz/michael-calculus/blob/main/docs/AI_HANDOFF.md)为准。本轮最新、尚未合并的检查点在[交接 PR #4](https://github.com/x-zyz/michael-calculus/pull/4)。新会话先读 [AGENTS.md](../AGENTS.md)、本检查点及第 7–9 节，再核对目标分支和工作树。若信息冲突，以 Git、源码和实测为准。

## 1. 项目概览

Michael Calculus 是离线优先的高数学习 App，提供课程、图像实验、练习和公式记忆。使用 React 19、TypeScript、Vite、Tailwind CSS、KaTeX 与 Capacitor 7，支持浏览器/PWA 和 Android。仓库为 [x-zyz/michael-calculus](https://github.com/x-zyz/michael-calculus)，开发环境见 [README](../README.md)。

远程 `origin/main` 及[正式版 v0.31.0](https://github.com/x-zyz/michael-calculus/releases/tag/v0.31.0)均为 `a08419f`。本地 `main` 仍指向 `f3c5363`，接手基线用 `origin/main`。Android 正式包名 com.michael.calculus，versionCode 42。主线已含旧版 ELI5 41 道，四状态新版及 v1.0.0 候选分别在独立分支。

入口为 [main.tsx](../src/main.tsx) 和 [App.tsx](../src/app/App.tsx)。题库/课程由 [learning.ts](../src/data/learning.ts) 聚合，试点分支 eli5/ch1-pilot 的教学由 [teaching.ts](https://github.com/x-zyz/michael-calculus/blob/eli5/ch1-pilot/src/data/teaching.ts) 注册，主线普通练习使用 [Question.tsx](../src/features/practice/Question.tsx)，复习汇总见 [ReviewPage.tsx](../src/features/review/ReviewPage.tsx)。

## 2. 当前开发状态

| 模块 | 当前状态 | 相关分支 | 负责人 | 下一步 |
| --- | --- | --- | --- | --- |
| 高数题库 | 运行时 1,693 题。第一章 344 道和第二章 258 道均有既有逐步提示 | main | Gemini 负责教学内容 | 其余 303 道第一章题继续使用原有提示 |
| ELI5 教学系统 | 新版四状态已适配第一章实际注册的 41 道题。P8 已通过人工验收 | ui/eli5-chapter-one | Sol 负责交互，Gemini 已有教学内容沿用 | 对其它代表题和真机执行验收 |
| 学习记录与掌握度 | 原记录与备份兼容。试点区分提示辅助、独立和延迟复习，普通练习全局汇总及 Formula Mastery 沿用原逻辑 | `main`，试点扩展在 `eli5/ch1-pilot` | Sol 负责教学证据；全局改造负责人待核实 | 等用户授权及跨题迁移证据，再讨论全局评分 |
| PWA | 候选分支包含冷启动缓存匹配修复和旧版本缓存迁移回归 | release/v1.0.0-rc | Sol | 核对候选包及真机离线重开 |
| Android | GitHub 正式版 0.31.0 / 42。固定签名候选 1.0.0 / 43 已验证；最终 1.0.0 至少用构建号 44 | `release/v1.0.0-rc`、`build/android-v1-rc` | Sol 验证，用户决定发布 | 按下方清单完成两条真机覆盖路径与更新验签 |
| ByteVirt 稳定通道 | 签名清单 0.28.0 / 37，序列 42 的公开 APK 返回 404 | `docs/android-v1-final-acceptance` | Sol 负责只读调查，运维权限待确认 | 对照 SSH 发布目录和公网 Caddy 读取目录，取得授权后对齐 GitHub |
| 测试与构建 | 浏览器、数学及安卓验收见[候选报告](https://github.com/x-zyz/michael-calculus/blob/release/v1.0.0-rc/docs/v1.0.0-candidate.md) | release/v1.0.0-rc | Sol | 留意有意跳过的全题库扫描及真机缺口 |

## 3. Agent 协作分工

- **Sol／集成负责人**维护本文和共有接口，负责 [教学组件](https://github.com/x-zyz/michael-calculus/blob/eli5/ch1-pilot/src/features/practice/TeachingSession.tsx)、练习交互、学习证据和自动化测试。
- **Gemini／内容负责人**维护题库、逐步提示和数学验证。第二章提示已进入 v0.31.0 基线。Sol 的界面推广复用现有题目与教学注册表。
- 各自使用独立工作树。共享入口如 `learning.ts`、备份协议、样式及共有测试先协调，再核对两边的 `git diff --name-status` 和远程提交。禁止清理、覆盖、代提交别人的工作树。
- 其他 Agent 交给集成负责人一段简短摘要，包含任务状态、文件、提交 SHA、实际验证结果和接手动作。集成负责人从 main 开仅含文档的 PR 更新本文；试点分支保留本分支验收记录，不新增或同步自己的权威交接副本。记录功能分支及准确 SHA，合并验证后再将其状态更新为已进入 main。

## 4. 当前进行中的任务

| ID / 任务 | Agent / 分支 | 状态 | 已完成与尚未完成 | 关联文件、最近提交与验证 |
| --- | --- | --- | --- | --- |
| ELI5-01 第一章试点 | Sol / `eli5/ch1-pilot` | DONE | 分类、P8 与十题试点已完成，用户已确认启动全章制作 | [分类报告](https://github.com/x-zyz/michael-calculus/blob/eli5/ch1-pilot/docs/eli5-chapter-one-classification.md)、[试点记录](https://github.com/x-zyz/michael-calculus/blob/eli5/ch1-pilot/docs/eli5-chapter-one-pilot.md)；`0279d5a`，65 项单测与 26 项浏览器测试通过 |
| ELI5-02 第一章量产 | Sol + Gemini | TODO | 已注册 41 道，尚缺 303 道完整 ELI5，本轮任务仅适配已注册题 | [生产清单](https://github.com/x-zyz/michael-calculus/blob/eli5/ch1-production/docs/eli5-production/README.md) |
| ANDROID-RC-01 Android 候选验收 | Sol / `build/android-v1-rc` | REVIEW | 43 已构建并独立复核；最终 APK 尚未构建，42 和 43 分别覆盖最终版、原记录和 JSON 恢复、离线重开、发现高版本及验签均待真机 | [候选构建](https://github.com/x-zyz/michael-calculus/actions/runs/45082750318)；源码 `0d2ca98`，工作流 `cd5db51` |
| BYTEVIRT-01 稳定通道同步 | Sol / `docs/android-v1-final-acceptance` | BLOCKED | Actions 回执 42，公网签名清单仍为 37；服务器写入目录、Caddy 实际来源需现有只读权限确认。修复需另行授权 | `a5da517`，本次只读复验结果与报告一致 |
| RELEASE-01 正式 v1.0.0 | Sol、用户 / 候选基线 `0d2ca98` | BLOCKED | 两条真机路径及更新验签待完成，线上通道未对齐，正式发布未获授权 | [最终验收清单](https://github.com/x-zyz/michael-calculus/blob/a5da5178e1f32f14fd2a0fdee12cc0b6d8d45c10/docs/android-v1-candidate.md#最终验收检查表) |
| BANK-01 第二章逐步提示与课程数学渲染 | Gemini / main | DONE | 已进入 v0.31.0 | 基线 a08419f |
| BANK-02 题库待复核 | Gemini / 分支待确定 | TODO | 清单已有 1,170 条 symbolic、157 条 manual、111 条 pending；exam-2/3 未盘点，exam-5 需要外部来源 | [题库说明](bank/README.md)、[机器清单](bank/inventory.json)；基线 `f3c5363`，待复核条目无新验证记录 |

状态只用 `TODO / IN_PROGRESS / BLOCKED / REVIEW / DONE`。任务移交时核对提交与验收后再改状态。

## 5. 关键技术决策

- 以题号挂接独立 ELI5 数据，保留 `guidedHints` 和原题，便于并行维护与逐批接入。原题吸顶供对照，当前步骤推导在检查后显示；迁移题有独立判分，跳过不显示其解式。
- 保持 [学习记录](../src/db/learning.tsx)、[备份](../src/db/backup.ts) 与 Formula Mastery 的存储协议兼容。教学生答对、同题独立完成、跨题迁移是三种不同证据。
- 先验代表题的实际学习效果。自动化负责 KaTeX、数学复算、界面揭示时机和 360px 裁切；解释是否跳步或暗示答案仍要人工判断。
- PWA 从 [vite.config.ts](../vite.config.ts) 注入缓存清单，[sw.js](../public/sw.js) 管理缓存。断网验证使用生产预览。正式 Android 发布依赖 [release.yml](../.github/workflows/release.yml) 和 [固定签名约定](android-signing.md)，不得混用调试包。

## 6. 已知问题与风险

- 第一章还有 303 道未配完整 ELI5，题库另有需要数学复核的条目。v1.0.0 候选界面覆盖的 41 道不扩大此范围。
- 同题重做、同一组迁移题答对都不足以证明长期迁移。试点尚无批量用户验收；自动化绿灯也不能替代内容人工复核。
- 本轮检查 21 个登记工作树，均无跟踪或未跟踪改动，未发现 stash。Gemini 的 `formula-keyboard` 在 `a08419f`，与远程一致。保留其工作树及旧分支，不替其他 Agent 清理或提交。
- 0.31.0 正式安装只支持 JSON 导入；旧导出工具依赖可调试 WebView。没有已核实备份时，主力机保留原安装，在备用真机上使用预先建立的数据验收。覆盖安装后不保证能直接降级。

## 7. 下一步执行计划

| 优先 | 接手动作与入口 | 预计修改 | 完成标准与边界 |
| --- | --- | --- | --- |
| 1 | **新会话先核对本检查点和远程状态**。用 `git worktree list`、`git status -sb`、`git ls-remote --heads origin` 和 `gh pr view 4` 核对分支、未提交内容与 PR。 | 仅更新已证实的交接状态 | 从对应独立工作树继续，保留其他 Agent 的工作树 |
| 2 | 依[只读调查](https://github.com/x-zyz/michael-calculus/blob/a5da5178e1f32f14fd2a0fdee12cc0b6d8d45c10/docs/bytevirt-stable-acceptance.md)由有权限人员核对发布与 Caddy 生效目录。另获运维授权后对齐 GitHub，并回读公网已签名清单及 APK。 | 只读结果先记录；运维修复独立授权 | GitHub 和公网清单版本、包身份与 APK 哈希一致；保留原始签名，避免同序列重签 |
| 3 | 按[真机清单](https://github.com/x-zyz/michael-calculus/blob/a5da5178e1f32f14fd2a0fdee12cc0b6d8d45c10/docs/android-v1-candidate.md#最终验收检查表)收集 42 → 最终包和 43 → 最终包的实测。 | 验收结果及正式包版本规划 | 真实设备验完数据、JSON、断网重开和高版本验签。所有门槛完成后，等待用户明确回复「批准正式发布 Michael Calculus v1.0.0」 |

## 8. 2026-11-22 工作检查点

- 已通过的候选验证为 134 项单元／组件、212 项浏览器、5 项签名／旧备份协议测试。固定签名 Actions 构建也已通过类型检查、Lint、单元测试和 Android Lint；回下载验签、包名、版本及哈希均一致。本轮只复核 APK 和线上状态，没有重跑应用测试，也未连接真机。
- [候选 APK 1.0.0 / 43](https://github.com/x-zyz/michael-calculus/actions/runs/45082750318/artifacts/14778227227)（`com.michael.calculus`）在 2026-11-25 15:23 太平洋时间到期。本机工作区 `artifacts/calculus-v1.0.0-rc-android/candidate/` 仍有 APK、`SHA256SUMS.txt` 和 `verification.txt`，未纳入 Git。APK SHA-256 为 `ef9ec8b34e28c1a53ceaf340f5c4ab4041b266de9f9cafa8c9e017d7cb72d540`。重建方法见[签名候选清单](https://github.com/x-zyz/michael-calculus/blob/58eb4b4228b74441fe27359634b0dbc3a1971189/docs/android-v1-candidate.md)。
- ByteVirt 复测通过公钥验签且 APK 哈希匹配序列 37；序列 42 路径仍返回 404。Actions 的 42 回执未证明公网送达。服务侧写入与读取路径、可能的回退或挂载待核实；直接改线上通道的授权尚未获得。
- 本轮工作仅提交 `docs/AI_HANDOFF.md`。原有工作树、既有提交、stash 状态和本地候选产物保留。GitHub 最新正式版仍是 0.31.0，未发现 v1.0.0 正式标签。无需从本地旧 `main` 重新打包。

## 9. 待合并 PR 与未进入 main 的成果

[PR #4](https://github.com/x-zyz/michael-calculus/pull/4) 是唯一打开的 PR，目标为 `main`，保持草稿，文件清单只有 `docs/AI_HANDOFF.md`。核对时可合并且未见冲突，`quality` 尚未结束。PR #1–#3 已合并。下面分支已经推送，均没有打开的产品合并 PR。

| 远程分支 / SHA | 尚未进入 main 的成果或文件 |
| --- | --- |
| `ui/practice-p8` / `6f9e1c4` | P8 验收版、离线修复；`src/features/practice/FocusedPractice.tsx`、`p8FocusContent.ts`，以及 `docs/practice-p8-preview.md`、`docs/pwa-offline-review.md`。后续候选沿用。 |
| `ui/eli5-chapter-one` / `cf86885` | 41 题新版交互（29 数值、12 书写）。`focusedPracticeRollout.ts`、`ReferenceGraph.tsx` 和 `docs/eli5-interface-rollout.md`。 |
| `release/v1.0.0-rc` / `0d2ca98` | 构建号 43 的已验候选源码与 `docs/v1.0.0-candidate.md`。 |
| `build/android-v1-rc` / `58eb4b4` | `.github/workflows/publish-checksums.yml` 的候选专用分支版本（`cd5db51`）和 `docs/android-v1-candidate.md`。该工作流路径在 main 用途不同，不能用候选分支覆盖主线版本。 |
| `docs/android-v1-final-acceptance` / `a5da517` | `docs/bytevirt-stable-acceptance.md` 和最终验收版 `docs/android-v1-candidate.md`。 |
| `eli5/ch1-content-b01` / `16a6ac2`、`eli5/ch1-production` / `7220622` | 保留第一批内容与生产分支的既有增量；第一章剩余 303 题仍为待办，暂停扩展。 |

本地旧 App Hub 快照中仍有无同名远端的分支，`simplify-learning-entry`（`d2b6d41`）也保有本地分支引用。它们是已提交成果，无需在本轮移动或补推。

### 检查点维护约定

每次任务结束时，集成负责人只根据本轮 diff、提交和实际验证更新相关状态、文件、SHA、验证结果及下一动作。中断时尽量写下分支、已提交与未提交范围、停在哪一步、失败信息、可恢复命令和阻塞条件。只在状态有变或证据矛盾时补查范围。删掉过期临时状态，保留有效决策，历史用 Git 和专题文档引用。正文控制在 200 行内，不写凭据、完整对话或未证实的验证结论。

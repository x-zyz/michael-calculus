# Michael Calculus · AI 项目交接

先核对当前源码、工作树和远程分支，再决定要不要继续。若证据与本文不一致，以 Git、源码和实际运行结果为准，由集成负责人更新本文。

## 1. 项目概览

Michael Calculus 是离线优先的高数学习 App，提供课程、图像实验、练习和公式记忆。使用 React 19、TypeScript、Vite、Tailwind CSS、KaTeX 与 Capacitor 7，支持浏览器/PWA 和 Android。仓库为 [x-zyz/michael-calculus](https://github.com/x-zyz/michael-calculus)，开发环境见 [README](../README.md)。

本次核对时，[最新正式版 v0.30.1](https://github.com/x-zyz/michael-calculus/releases/tag/v0.30.1) 与远程 `main` 均指向 `f3c5363`。当前 `package.json` 为 `0.30.1`，Android 为 `com.michael.calculus` / versionCode 41。ELI5 试点在独立分支，未进入该正式版。

入口为 [main.tsx](../src/main.tsx) 和 [App.tsx](../src/app/App.tsx)。题库/课程由 [learning.ts](../src/data/learning.ts) 聚合，教学由 [teaching.ts](../src/data/teaching.ts) 注册，普通练习使用 [Question.tsx](../src/features/practice/Question.tsx)，复习汇总见 [ReviewPage.tsx](../src/features/review/ReviewPage.tsx)。

## 2. 当前开发状态

| 模块 | 当前状态 | 相关分支 | 负责人 | 下一步 |
| --- | --- | --- | --- | --- |
| 高数题库 | 运行时 1,693 题，清单已有 1,438 条入库，第一章 344 题均有旧版逐步提示 | `main`；本地内容工作树 `formula-keyboard` | Gemini 负责内容；活跃会话状态待核实 | 确认现有第二章提示工作的接手点和验证记录 |
| ELI5 教学系统 | P8 与第一章十题试点已实现。344 题完成方法分类 | `eli5/p8` → `eli5/ch1-pilot` | GPT-6.2 Sol 负责架构和集成，Gemini 负责后续数学内容 | 等用户体验确认后再制作下一批 |
| 学习记录与掌握度 | 原记录与备份兼容。试点区分提示辅助、独立和延迟复习，普通练习全局汇总及 Formula Mastery 沿用原逻辑 | `main`，试点扩展在 `eli5/ch1-pilot` | Sol 负责教学证据；全局改造负责人待核实 | 等用户授权及跨题迁移证据，再讨论全局评分 |
| PWA | `main` 的 Pages 最近部署成功。试点已通过生产版断网测试 | `main`、`eli5/ch1-pilot` | Sol 负责试点回归；线上运维负责人待核实 | 用生产构建复验断网和缓存更新 |
| Android | v0.30.1 正式 APK 与 PWA ZIP 均已发布，对应的 ByteVirt 工作流成功。当前设备端渠道状态待核实 | `main`、`v0.30.1` | 发布负责人待核实 | 当前任务暂停打包与发布；另行授权后走固定签名流程 |
| 测试与构建 | 主线最近 CI 成功；十题试点验证记录见第 8 节 | `main`、`eli5/ch1-pilot` | Sol 负责交互回归，Gemini 负责内容校验 | 接手后按实际变更范围重跑 |

## 3. Agent 协作分工

- **Sol／集成负责人**维护本文和共有接口，负责 [教学组件](../src/features/practice/TeachingSession.tsx)、练习交互、学习证据和自动化测试。
- **Gemini／内容负责人**维护 `src/data/bank*.ts`、[逐步提示](../src/data/guidedHints/index.ts)、[题库清单](bank/inventory.json)及数学验证。只读检查确认本地 `formula-keyboard` 仍有未提交的第二章提示、其校验脚本和课程 UI 相关文件。当前操作者、最终分支与验证完成度待核实。
- 各自使用独立工作树。共享入口如 `learning.ts`、备份协议、样式及共有测试先协调，再核对两边的 `git diff --name-status` 和远程提交。禁止清理、覆盖、代提交别人的工作树。
- 其他 Agent 交给集成负责人一段简短摘要，包含任务状态、文件、提交 SHA、实际验证结果和接手动作。集成负责人统一更新本文，避免并发编辑。

## 4. 当前进行中的任务

| ID / 任务 | Agent / 分支 | 状态 | 已完成与尚未完成 | 关联文件、最近提交与验证 |
| --- | --- | --- | --- | --- |
| ELI5-01 第一章试点 | Sol / `eli5/ch1-pilot` | REVIEW | 分类、P8 与十题已完成；待用户体验及确认下一批 | [分类报告](eli5-chapter-one-classification.md)、[试点记录](eli5-chapter-one-pilot.md)；`0279d5a`，65 项单测与 26 项浏览器测试通过 |
| ELI5-02 第一章推广 | Sol + Gemini / 分支待确定 | BLOCKED | 首轮模板与质检已可复用；余下 333 题尚未开始制作，需用户确认试点 | [十题数据](../src/data/teachingChapterOne.ts)；前置提交 `0279d5a`，后续批次未验证 |
| BANK-01 第二章逐步提示 | Gemini / 本地 `formula-keyboard` | IN_PROGRESS | 只确认已有未提交的内容和脚本。覆盖率、是否仍在运行及推送状态待核实 | `src/data/guidedHints/ch2*.ts`、`scripts/check-guided-ch2-*.py` 为本地草稿；最近已核实基线 `f3c5363`，本批测试待核实 |
| BANK-02 题库待复核 | Gemini / 分支待确定 | TODO | 清单已有 1,170 条 symbolic、157 条 manual、111 条 pending；exam-2/3 未盘点，exam-5 需要外部来源 | [题库说明](bank/README.md)、[机器清单](bank/inventory.json)；基线 `f3c5363`，待复核条目无新验证记录 |

状态只用 `TODO / IN_PROGRESS / BLOCKED / REVIEW / DONE`。任务移交时核对提交与验收后再改状态。

## 5. 关键技术决策

- 以题号挂接独立 ELI5 数据，保留 `guidedHints` 和原题，便于并行维护与逐批接入。公式在检查后显示；迁移题有独立判分，跳过不显示其解式。
- 保持 [学习记录](../src/db/learning.tsx)、[备份](../src/db/backup.ts) 与 Formula Mastery 的存储协议兼容。教学生答对、同题独立完成、跨题迁移是三种不同证据。
- 先验代表题的实际学习效果。自动化负责 KaTeX、数学复算、界面揭示时机和 360px 裁切；解释是否跳步或暗示答案仍要人工判断。
- PWA 从 [vite.config.ts](../vite.config.ts) 注入缓存清单，[sw.js](../public/sw.js) 管理缓存。断网验证使用生产预览。正式 Android 发布依赖 [release.yml](../.github/workflows/release.yml) 和 [固定签名约定](android-signing.md)，不得混用调试包。

## 6. 已知问题与风险

- 已确认缺口包括 333 道尚无 ELI5 样板、111 道题待逐题数学复核，以及 exam-2/3 与 exam-5 的清单缺口。端点极限约定、原定义域等题意风险见分类报告。
- 同题重做、同一组迁移题答对都不足以证明长期迁移。试点尚无批量用户验收；自动化绿灯也不能替代内容人工复核。
- 当前合作工作树有未提交修改。共享组件和测试可能冲突。未经协调保持只读，切勿切换或重置那个工作树。
- 线上实际安装、覆盖升级和更新通道状态未在交接任务中复验。已完成的 Actions 不等于设备验收。

## 7. 下一步执行计划

| 优先 | 接手动作与入口 | 预计修改 | 完成标准与边界 |
| --- | --- | --- | --- |
| 1 | **新 Agent 第一步**先运行 `git status -sb`、`git worktree list`、`git log -5 --oneline`，并用 `git ls-remote --heads origin` 核对目标分支。读 [试点记录](eli5-chapter-one-pilot.md) 和第 8 节。 | 仅在证据变化时更新本文 | 确认任务、负责人、分支和用户授权后才改代码。不得开始下一批或从别人的脏工作树提交 |
| 2 | 用户确认十题体验后，从分类报告中的正弦配凑、连续接缝、等价小量各选少量题做下一批 | 独立教学数据、数学测例和 Playwright 测试 | 每题经数学复算和 360px 验证，迁移答案延后揭示。不得重写旧提示、改全局掌握度或发版 |
| 3 | 与 Gemini 对齐第二章提示的文件和最近提交，先清点已完成项，再决定需要接手的题号 | 由内容 Agent 在其独立分支更新提示、脚本和清单 | 对账题号并记录实际测试和待核验项。不得由集成 Agent 把本地草稿直接并入主线 |

## 8. 最近一次工作检查点

- 更新时间 2026-11-21（America/Los_Angeles）。当前工作分支 `eli5/ch1-pilot`，最后一项功能提交 `0279d5ad4ea8725be2449649cf97e1131d1c16ef`（远程已核实）。P8 修订基线 `5442326`，主线/发布基线 `f3c5363`。
- 最后一项开发工作为第一章分类和十题试点。该次记录有 65 项 Vitest、26 项生产预览 Playwright、20 个 SymPy 原题/迁移答案复算通过，以及类型、Lint、CSS 和生产构建通过。主线最近 [CI](https://github.com/x-zyz/michael-calculus/actions/runs/44986294531)、[Pages](https://github.com/x-zyz/michael-calculus/actions/runs/44986294521)、[签名 Release](https://github.com/x-zyz/michael-calculus/actions/runs/44986373883) 和 [ByteVirt 发布](https://github.com/x-zyz/michael-calculus/actions/runs/44989644326) 成功。这些是历史验证，本次文档任务仅检查链接、结构与差异。
- 开始本轮时试点工作树干净，内容工作树存在未提交改动。交接文档是本轮唯一变更范围。下一动作是收集用户对十题体验的反馈。阻塞为用户尚未确认下一批，第二章草稿需等待内容负责人确认接手点。
- 本地预览如已停止，在试点分支运行 `npm run dev` 并打开 `/#/practice?problem=p8`。断网回归使用 `npm run build` + `npm run preview`，再设置 `PLAYWRIGHT_BASE_URL` 与 `ELI5_OFFLINE_TEST=1` 运行对应测试。

### 检查点维护约定

每次任务结束时，集成负责人只根据本轮 diff、提交和实际验证更新相关状态、文件、SHA、验证结果及下一动作。中断时尽量写下分支、已提交与未提交范围、停在哪一步、失败信息、可恢复命令和阻塞条件。只在状态有变或证据矛盾时补查范围。删掉过期临时状态，保留有效决策，历史用 Git 和专题文档引用。正文控制在 200 行内，不写凭据、完整对话或未证实的验证结论。

# Michael Calculus · AI 项目交接

本文以 main 上的[固定 GitHub 地址](https://github.com/x-zyz/michael-calculus/blob/main/docs/AI_HANDOFF.md)为唯一权威来源。旧工作树先读 [AGENTS.md](../AGENTS.md)，再用固定地址读取最新交接。核对分支、工作树和未提交修改，确认模块与负责人后只读本任务所需源码。若证据与本文冲突，以 Git、源码和实际验证为准。

## 1. 项目概览

Michael Calculus 是离线优先的高数学习 App，提供课程、图像实验、练习和公式记忆。使用 React 19、TypeScript、Vite、Tailwind CSS、KaTeX 与 Capacitor 7，支持浏览器/PWA 和 Android。仓库为 [x-zyz/michael-calculus](https://github.com/x-zyz/michael-calculus)，开发环境见 [README](../README.md)。

当前主线及[正式版 v0.31.0](https://github.com/x-zyz/michael-calculus/releases/tag/v0.31.0)均为 a08419f。Android 正式包名 com.michael.calculus，versionCode 42。主线已含旧版 ELI5 41 道，四状态新版及 v1.0.0 候选分别在独立分支。

入口为 [main.tsx](../src/main.tsx) 和 [App.tsx](../src/app/App.tsx)。题库/课程由 [learning.ts](../src/data/learning.ts) 聚合，试点分支 eli5/ch1-pilot 的教学由 [teaching.ts](https://github.com/x-zyz/michael-calculus/blob/eli5/ch1-pilot/src/data/teaching.ts) 注册，主线普通练习使用 [Question.tsx](../src/features/practice/Question.tsx)，复习汇总见 [ReviewPage.tsx](../src/features/review/ReviewPage.tsx)。

## 2. 当前开发状态

| 模块 | 当前状态 | 相关分支 | 负责人 | 下一步 |
| --- | --- | --- | --- | --- |
| 高数题库 | 运行时 1,693 题。第一章 344 道和第二章 258 道均有既有逐步提示 | main | Gemini 负责教学内容 | 其余 303 道第一章题继续使用原有提示 |
| ELI5 教学系统 | 新版四状态已适配第一章实际注册的 41 道题。P8 已通过人工验收 | ui/eli5-chapter-one | Sol 负责交互，Gemini 已有教学内容沿用 | 对其它代表题和真机执行验收 |
| 学习记录与掌握度 | 原记录与备份兼容。试点区分提示辅助、独立和延迟复习，普通练习全局汇总及 Formula Mastery 沿用原逻辑 | `main`，试点扩展在 `eli5/ch1-pilot` | Sol 负责教学证据；全局改造负责人待核实 | 等用户授权及跨题迁移证据，再讨论全局评分 |
| PWA | 候选分支包含冷启动缓存匹配修复和旧版本缓存迁移回归 | release/v1.0.0-rc | Sol | 核对候选包及真机离线重开 |
| Android | GitHub 正式版 0.31.0 / 42，固定签名候选 1.0.0 / 43。ByteVirt 稳定清单经签名复核为 0.28.0 / 37 | build/android-v1-rc | Sol 负责检查，用户授权正式发布 | 按[真机清单](https://github.com/x-zyz/michael-calculus/blob/build/android-v1-rc/docs/android-v1-candidate.md)验收覆盖安装、数据保留、离线重开和更新 |
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
| ANDROID-RC-01 Android 候选验收 | Sol / `build/android-v1-rc` | REVIEW | 固定签名候选构建与校验完成，待真实 Android 覆盖安装、数据和断网验收 | [构建记录](https://github.com/x-zyz/michael-calculus/actions/runs/45082750318)；源码 `0d2ca98`、工作流 `cd5db51` |
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
- 当前合作工作树有未提交修改。共享组件和测试可能冲突。未经协调保持只读，切勿切换或重置那个工作树。
- 0.31.0 正式安装只支持 JSON 导入；旧导出工具依赖可调试 WebView。没有已核实备份时，主力机保留原安装，在备用真机上使用预先建立的数据验收。覆盖安装后不保证能直接降级。

## 7. 下一步执行计划

| 优先 | 接手动作与入口 | 预计修改 | 完成标准与边界 |
| --- | --- | --- | --- |
| 1 | **新 Agent 第一步**先运行 `git status -sb`、`git worktree list`、`git log -5 --oneline`，并用 `git ls-remote --heads origin` 核对目标分支。读 [试点记录](https://github.com/x-zyz/michael-calculus/blob/eli5/ch1-pilot/docs/eli5-chapter-one-pilot.md) 和第 8 节。 | 仅在证据变化时更新本文 | 确认任务、负责人、分支和用户授权后才改代码。未经当前授权不扩展内容，不从别人的脏工作树提交 |
| 2 | 读[界面推广报告](https://github.com/x-zyz/michael-calculus/blob/ui/eli5-chapter-one/docs/eli5-interface-rollout.md)和[固定签名候选 Android 验收](https://github.com/x-zyz/michael-calculus/blob/build/android-v1-rc/docs/android-v1-candidate.md)，在真机复验离线重开及旧记录 | 验收记录 | 真实设备记录版本、签名、数据与离线表现 |
| 3 | 收集候选质量验收与用户明确发布授权 | 正式发布前才执行标签和签名流程 | 当前只允许测试候选，主线和稳定渠道不动 |

## 8. 最近一次工作检查点

- 主线及正式标签 v0.31.0 为 a08419f。已验收 P8 界面 6f9e1c4，离线修复 4f65fec，第一章默认推广 cf86885。
- [第一章推广结果](https://github.com/x-zyz/michael-calculus/blob/ui/eli5-chapter-one/docs/eli5-interface-rollout.md)包含 29 道数值题与 12 道书写题。现有数学数据及备份协议保持不变。
- [v1.0.0 候选](https://github.com/x-zyz/michael-calculus/blob/release/v1.0.0-rc/docs/v1.0.0-candidate.md)提交 0d2ca98，已通过 134 项单元／组件、212 项浏览器、5 项签名／旧备份协议测试与 Android 调试构建。固定签名构建 `45082750318` 已通过；远端产物回下载复核结果与 SHA-256 见[真机清单](https://github.com/x-zyz/michael-calculus/blob/build/android-v1-rc/docs/android-v1-candidate.md)。
- 2026-11-22 检查点。构建分支 `build/android-v1-rc` 的签名工作流提交 `cd5db51`；`docs/calculus-v1-handoff` 通过仅含交接文档的 PR #4 记录状态，主线仍为 `a08419f`。电脑未检测到 Android 真机。下一步按清单覆盖安装 42 → 43，验证旧数据与断网重新打开。正式包应使用 44 或高于已分发候选的构建号。发布需待所有门槛完成及用户明确授权。
- Android 发布验收阻断（2026-11-22）。[只读排查报告](https://github.com/x-zyz/michael-calculus/blob/a5da5178e1f32f14fd2a0fdee12cc0b6d8d45c10/docs/bytevirt-stable-acceptance.md)确认 Actions 发布序列 42 后，Android 公网入口仍读到有效签名的 37，序列 42 的公网 APK 返回 404。接手时先核对发布目录与 Caddy 实际读取路径。需另获运维变更授权，随后按[真机清单](https://github.com/x-zyz/michael-calculus/blob/a5da5178e1f32f14fd2a0fdee12cc0b6d8d45c10/docs/android-v1-candidate.md)补齐 42 和 43 分别覆盖最终版的实测。
- 本地预览如已停止，在对应分支运行 `npm run dev`。断网回归使用 `npm run build` + `npm run preview`，再设置 `PLAYWRIGHT_BASE_URL` 与 `ELI5_OFFLINE_TEST=1` 运行对应测试。

### 检查点维护约定

每次任务结束时，集成负责人只根据本轮 diff、提交和实际验证更新相关状态、文件、SHA、验证结果及下一动作。中断时尽量写下分支、已提交与未提交范围、停在哪一步、失败信息、可恢复命令和阻塞条件。只在状态有变或证据矛盾时补查范围。删掉过期临时状态，保留有效决策，历史用 Git 和专题文档引用。正文控制在 200 行内，不写凭据、完整对话或未证实的验证结论。

# Michael Calculus · AI 项目交接

本文件是 `main` 的权威交接。旧工作树先读 [AGENTS.md](../AGENTS.md)，再查阅 [main 上的本文件](https://github.com/x-zyz/michael-calculus/blob/main/docs/AI_HANDOFF.md)。接手任务时核对远程提交、工作树和未提交改动，保留其他 Agent 的工作树与分支。分支状态、版本与验证结果以 Git、源码及实际回读为准。

## 项目与发布基线

- Michael Calculus 是离线优先的高数学习应用，使用 React、TypeScript、Vite、KaTeX 与 Capacitor，交付 Android 和 PWA。项目入口与运行方式见 [README](../README.md)。
- 最新正式版为 [v1.0.1](https://github.com/x-zyz/michael-calculus/releases/tag/v1.0.1)。发布标签指向 `fa074b82f5ad583ee9d99903c18231bd953fc44f`，该发布提交已纳入 `main`。Android 包名 `com.michael.calculus`，`versionCode 45`，沿用[固定签名](android-signing.md)。
- Android 稳定更新使用 [ByteVirt 清单](https://update.0979019203.top/calculus/stable/android/latest.json)。2026-11-23 从公网验签并下载实测为 1.0.1 / 45、序列 45，APK SHA-256 为 `c46b8bdeecc5c7d198bdcee1350ab65cf09e9b5a22c147df7a24a17a0302f50a`，与 GitHub Release 附件一致。
- [GitHub Pages PWA](https://x-zyz.github.io/michael-calculus/) 由 [pwa-pages.yml](../.github/workflows/pwa-pages.yml) 在 `main` 推送时部署。正式 tag 的 APK 发布流程和 Pages 部署各有触发条件。用公网 `sw.js` 的缓存版本及 HTML 实际引用的 JS/CSS 核对部署。
- 当前 ByteVirt 发布机接受受限 SSH，洛杉矶 Caddy 为高数稳定通道代理发布机。发布工作流已经加入 [公网回读](../scripts/verify-bytevirt-public.mjs)，将清单和 APK 与上传包逐字节对照。

## 题库与教学进度

| 范围 | 运行时题量 | 有逐步提示 `guidedHints` | 注册四状态 ELI5 |
| --- | ---: | ---: | ---: |
| 第一章 函数、极限与连续 | 344 | 344 | 344 |
| 第二章 导数与微分 | 258 | 258 | 258 |
| 整体题库 | 1,693 | 上述两章已全覆盖 | 602 |

- 第二章覆盖教材 §2.1–§2.5 及章末总习题二。章节与课时归属见 [教材课程大纲](textbook-curriculum.md)。题库来源和分类见 [题库说明](bank/README.md)。
- 四状态 ELI5 支持独立作答、引导、完整解法和结果。数值题按允许的数值或分数判分。书写推导、证明和作图保留纸笔作答与自评。看过引导或解法的正确作答记录为辅助完成。
- 第一章原 41 道是既有详细试点和 Batch 1。运行时其余 303 道第一章题和 258 道第二章题也已注册。历史 [首批生产清单](eli5-production/README.md) 的排期状态记录了当时的制作批次。当前覆盖由 [运行时注册测试](../src/tests/expandedTeaching.test.ts) 核对。
- [41 题教学审计](eli5-pedagogy-audit-ch1-41.md) 与 [P0 整改记录](eli5-p0-remediation-report.md) 记录了 Batch 1 的选项位置、提前揭示和迁移题问题，以及第二章 `p17` 的条件到公式映射。v1.0.1 已包含这些修正与移动端公式换行。覆盖测试、已审计范围和学生体验是三个独立的验收项。

## 协作与 P1

| 负责人 | 分工 |
| --- | --- |
| Gemini | 教学内容与数学复核，编写理解检查、补救例题和迁移题，组织教学验收 |
| Sol | 架构、UI、工程集成与回归，维护状态机、数据兼容性、构建发布及本交接 |

1. 链式法则前置知识补救。先确定常见的内外层识别与变化率相乘错因，再设计短补救、原题返回及同策略迁移。教学验收由 Gemini 与 Sol 对齐后安排。
2. 罗尔定理与拉格朗日中值定理教学。以现有课程和实验为入口，覆盖适用条件、结论与反例，区分定理给出的存在性与是否能找到具体点。
3. 从已对齐的 `origin/main` 创建独立 P1 分支。共享练习入口、持久化和测试的变更先协调。在实际变更范围内回归，并把验收结果与准确提交写回交接。

## 验收边界与历史分支

- 继续沿用学习进度、作答、错题、公式复习和 JSON 备份格式。Android 真机覆盖升级、数据保留及离线重开仍待产品验收。
- P0 修复覆盖 Batch 1 和 `p17` 的已知问题。其余 560 道新增 ELI5 的可读性、错因区分与迁移质量仍待分批教学验收。学习效果需要代表题与学生反馈。
- [草稿 PR #4](https://github.com/x-zyz/michael-calculus/pull/4) 记录旧的 0.31.0、43 号候选和 ByteVirt 序列 37。建议用这份交接替代其当前状态说明，关闭旧 PR 由产品负责人决定。
- 历史 Android 验收清单和迁移排查见 [发布前验收分支](https://github.com/x-zyz/michael-calculus/blob/a5da5178e1f32f14fd2a0fdee12cc0b6d8d45c10/docs/android-v1-candidate.md) 与 [ByteVirt 调查](https://github.com/x-zyz/michael-calculus/blob/a5da5178e1f32f14fd2a0fdee12cc0b6d8d45c10/docs/bytevirt-stable-acceptance.md)。保留历史签名构建及 App Hub 暂存记录，待负责人确认使用情况后再清理远程分支。

交接更新应写明实际变更、提交、验证命令、结果和仍待验收的事项。正式发布、标签和版本变更遵循 [AGENTS.md](../AGENTS.md) 的授权及固定签名规则。

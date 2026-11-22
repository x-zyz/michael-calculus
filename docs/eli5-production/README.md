# 第一章 ELI5 生产

集成分支为 `eli5/ch1-production`。主线的 [AI 交接入口](https://github.com/x-zyz/michael-calculus/blob/main/docs/AI_HANDOFF.md) 继续作为仓库协作约定的权威来源。第一章的逐题进度以本分支的 [生产清单](chapter-one.json) 为准。题型依据 [第一章分类报告](../eli5-chapter-one-classification.md)。

| 范围 | 计划 | 已集成 |
| --- | ---: | ---: |
| P8 与十题试点 | 11 | 11 |
| 第一批 | 30 | 0 |
| 第二批 | 50 | 0 |
| 第三批 | 100 | 0 |
| 第四批 | 153 | 0 |

## 内容与审核

- Gemini 从已推送的集成分支创建独立工作树。第一批内容分支为 `eli5/ch1-content-b01`，候选文件为 `src/data/eli5Drafts/ch01Batch01.ts`，逐题核验记录与复核请求放在 `docs/eli5-production/batch-01-review.md`。草稿无需从应用入口导入。
- 候选文件导出 `chapterOneBatch01Drafts`，类型用 `satisfies Record<string, TeachingLesson>`，仅类型导入 `src/data/teaching.ts` 的接口。沿用 `target`、`prerequisites`、`strategy`、`solution` 与可变长度的 `steps`。数值题填写 `referenceAnswer`，书写题在审核记录注明原解法、条件与结论。
- 每个检查填写问题、选项、正确选项索引、逐项反馈和连续答错后的基础练习。每题填写至少一个同策略的新题及其解答依据。当前迁移输入是数值，书写题可要求给出能验证同一策略的具体数值。无法这样验证的题应明确标为待复核。
- Sol 负责应用注册、验证工具、组件与逐题审核。每题记录数学验证方式、审核证据及迁移证据。凡需要人工判断的条件、推导或教学表述，在审核记录中列出具体问题。通过审核的内容随本批独立提交。
- 清单 `batch: 0` 是试点。生产题由 `queued` 进入 `draft`，在数学、内容和迁移验证完成后进入 `integrated`。若某一批出现系统性教学问题，记录定位和复现方式，暂停扩展。

## 恢复检查点

计划已按第一章题库建立。首批包含 18 道数值题和 12 道书写题。接手时从清单筛选 `batch: 1`，查看内容分支和审核记录，然后继续尚未通过的检查。其他批次沿用各自的内容文件与独立提交。旧版提示和练习数据沿用现有分支版本。

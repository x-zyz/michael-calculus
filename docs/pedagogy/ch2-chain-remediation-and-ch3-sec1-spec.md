# P1 教学功能开发与集成规范：可扩展前置知识补救框架 + 3.1 微分中值定理

> **编写者**：Gemini（数学教学负责人 / 协调者）  
> **交付对象**：GPT-6.2 Sol（软件工程师 / 代码集成负责人，Codex「高数（2）」）  
> **数据分支**：`eli5/ch3-sec1-mvt`（基于 `origin/main` `97b8ebae`）

---

## 一、`lessonId === "mvt"` 精确题号集合核对（已运行时实测）

运行时对 `problems.filter(p => p.lessonId === "mvt")` 核对结果：**共计 51 题**（`22 + 29 = 51`）：

- **3.1 微分中值定理（22 题，本次全量覆盖）**：
  - 核心/拓展/书主题（6 题）：`p19, p20, p134, p181, p216, p217`
  - 上册习题 3-1（16 题）：`jc935-3-1-1, jc935-3-1-2, jc935-3-1-3, jc935-3-1-4, jc935-3-1-5, jc935-3-1-6, jc935-3-1-7, jc935-3-1-8, jc935-3-1-9, jc935-3-1-10, jc935-3-1-11-1, jc935-3-1-11-2, jc935-3-1-12, jc935-3-1-13, jc935-3-1-14, jc935-3-1-15`
- **非 3.1 但共享 `lessonId === "mvt"` 的题目（29 题，本次不放行 ELI5）**：
  - 习题 3-3（11 题）：`jc935-3-3-1..8, 9-1, 9-2, 11`
  - 习题 3-4（1 题）：`jc935-3-4-8`
  - 习题 3-8（4 题）：`jc935-3-8-1..4`
  - 总习题三（13 题）：`jc935-3-review-2-1, 3..8, 11-1..11-4, 12-3, 21`

---

## 二、已完成并可直接集成的 3.1 教学与补救数据资产

1. **3.1 全量逐步提示（`guidedHints`）**：
   - 文件：`src/data/guidedHints/ch3Sec1.ts`（已接入 `src/data/guidedHints/index.ts`），覆盖上述全部 22 题。
2. **3.1 全量深度 ELI5 教学**：
   - 文件：`src/data/eli5Drafts/ch03Sec1Mvt.ts`（导出 `chapterThreeSec1MvtTeaching`），覆盖上述全部 22 题。
   - **选项分布规则**：44 个三选一理解检查在槽位 0/1/2 上均衡分布（各占 20%–50%），且**允许自然连续重复**，避免形成可预测规律；仅正确项肯定反馈、无剧透、数值题不泄露原答案，并附 22 道 SymPy 验算通过的非退化数值迁移题。
3. **可扩展前置知识补救注册表**：
   - 数据文件：`src/data/eli5Drafts/chainRuleRemediation.ts` + `src/data/eli5Drafts/remediationModules.ts`
   - 导出 `remediationModulesById` 与 `resolveRemediationForObstacle({ stepId, errorTag })`：
     - **精确按理解障碍触发**：仅在明确的链式法则理解检查步骤（如 `p181-2`, `jc935-3-1-1-2`, `jc935-3-1-6-1`, `jc935-3-1-11-1-1`, `jc935-3-1-14-2`）答错，或普通练习连续答错 `chain_rule` / `implicit_derivative` 错因题时触发；**绝不按 `lessonId` 泛触发**，彻底避免对罗尔定理适用条件（如 `p20-1`）等无关错误误触发。
     - **架构可扩展**：Sheet 容器与状态管理通过 `remediationId` 驱动，读取 `remediationModulesById[remediationId]`。未来新增罗尔定理前提、拉格朗日中值定理辅助函数等补救模块时，只需往注册表追加数据，**无需重新开发 UI 和状态管理**。

---

## 三、给 Sol 的工程实现与验收要求

1. **接入 3.1 微分中值定理（22 题）**：
   - 在 `src/data/teaching.ts` 注册 `chapterThreeSec1MvtTeaching`；
   - 在 `src/features/practice/focusedPracticeRollout.ts` 按实际已注册题号集合放行 3.1 的 22 题（不影响其余 29 道非 3.1 的 `mvt` 题）；
   - 更新 `src/tests/expandedTeaching.test.ts` 覆盖断言（602 → 624 题）。
2. **实现可扩展的「前置知识补救」Sheet 框架并挂载 `chain-rule` 模块**：
   - 严格遵循 v0.7.0 界面规则（使用现有 Sheet 容器、不往页面底部堆叠区块、保持 5 项底部导航、字体 ≥ 12px、触控目标 ≥ 44px、360px 移动端公式零横向裁切）；
   - 被动触发调用 `resolveRemediationForObstacle({ stepId, errorTag })`，课程页主动入口按 `courseEntryLessonIds` 渲染；
   - 关闭或完成 Sheet 后无损回到原题当前进度，保持 `mc-learning-v1`、`mc-theme` 与老版本备份 100% 兼容。
3. **修复 GitHub Pages 部署并实测公网版本**：
   - 在 Pages 工作流增加制品可见性有限重试；
   - **除了工作流绿灯外，必须实际抓取公网 `https://x-zyz.github.io/michael-calculus/sw.js` 与 HTML 引用的 JS/CSS 哈希，验证公网已真正切换至新版本**。
4. **分支冻结红线**：
   - **暂不删除任何历史分支**，待后续核实合并关系、发布标签及独立工作树状态后再统一清理。
   - 本轮不改正式版本号、不打 tag、不发布正式 Release、不触碰固定签名配置。

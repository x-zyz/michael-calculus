# 逐步算式提示（`guidedHints`）功能实现思路与工程总结

本文档总结 `Michael calculus` 逐步算式提示模式（Step-by-Step Guided Algebra Hints）的设计理念、前端架构、数据解耦方案、SymPy 逐阶校验流水线、移动端 360px 布局保障以及第一章全量落地结果（**344 / 344 题，1,174 步**）。

---

## 1. 核心教学设计（从「文字点拨」到「逐步算式展开」）

传统三段式文字提示（`hints: string[]`）要求学生在脑中自己完成代数改写，遇到连续有理化、提公因式、等价无穷小替换或分左右极限时，极易卡在「知道要用什么方法，但不知道算式怎么变过去」。

新模式以 `p128` 为样板，将解题过程拆为若干独立教学动作，每点击一次 **「看下一步」** 多展开一张算式卡片，保留历史步骤形成完整推导轨迹：

- **`formula`（完整算式）**：展示本步变形后的完整当前表达式；涉及局部恒等式时（如共轭有理化、三角倍角公式），用 `\begin{gathered}` 上下两行呈现「局部工具式 + 代回后的整体式」。
- **`change`（这一步的变化）**：用一句简短白话（通常 ≤ 18 字）直接指出相对上一步到底改动了哪一块。
- **`text`（怎么算的）**：解释变形规则、合法性条件（例如约分时 $x \ne x_0$、$x \to -\infty$ 时 $\sqrt{x^2}=-x$、等价无穷小仅对乘除因子替换）以及「其余部分先照抄」的局部聚焦策略。
- **末步防剧透原则**：
  - 数值题末步停在已消去未定式的纯算术表达式（带 `=\;?`），把最后一步简单数值计算留给用户填入答案框；
  - 书写题/证明题末步停在决定性的化简式、桥接不等式或分类讨论收口前，引导用户自行写出最终结论再对照参考解析自评。

---

## 2. 前端架构与数据解耦

1. **类型定义与向后兼容**（`src/data/learning.ts`）：
   - `GuidedHint` 接口定义 `{ change: string; text: string; formula: string }`，在 `ProblemDetails` 中作为可选字段 `guidedHints?: GuidedHint[]`。
   - 未配置 `guidedHints` 的章节题目自动回退到原有 `hints` 纯文字提示，保证零破坏性渐进铺开。
2. **共用展开组件**（`src/features/practice/PracticeHints.tsx`）：
   - 数值题（`Question.tsx`）与书写题（`WrittenQuestion.tsx`）共用同一套 `<PracticeHints />` 渲染组件，步骤上限由 `guidedHints.length` 动态决定（不再硬编码 3 步上限），历史步骤保留并以 `aria-live="polite"` 播报新展开步骤。
   - 列表项使用复合键 `${index}-${change}`，避免多步同类动作描述碰撞。
   - 本地备份模块（`src/db/backup.ts`）已支持保存与恢复超过 3 步的提示展开计数。
3. **模块化分片挂载**（`src/data/guidedHints/`）：
   - 逐步提示数据独立存放在 `src/data/guidedHints/<batch>.ts`（导出 `Record<string, GuidedHint[]>`），通过 `src/data/guidedHints/index.ts` 汇总为 `guidedHintsById`，在 `src/data/learning.ts` 组装 `problems` 时自动挂载。
   - 这种解耦设计避免了并行编辑大体积题库文件导致的合并冲突，也便于按章节/小节分批审校和续跑。

---

## 3. 可复用、可并行、可续跑的五步生产流水线

```text
识别卡点与题型归类 → 按动作骨架拆式 → SymPy 逐阶符号校验 → 白话与防剧透审校 → 360px 布局与单测门禁
```

1. **题型动作骨架复用**：围绕高频卡点沉淀 6 类极限/连续动作骨架（根式有理化 `lim-rationalize`、因式分解约零因子 `lim-factor-cancel`、三角重要极限配系数 `lim-trig-standard`、$1^\infty$ 配指数 `lim-one-inf`、等价无穷小转乘除 `lim-equiv-inf`、无穷远根式符号 `lim-inf-radical`）及函数/连续性骨架，统一「每步只做 1 个主动作」与必写定义域提醒。
2. **SymPy 逐阶校验脚本**（`scripts/check-guided-*.py`）：
   - 自动验证相邻两步表达式等价（`simplify(E_i - E_{i-1}) == 0` 或去心邻域高精度多点抽样）、局部辅助恒等式、极限值与单侧性守恒、以及末步代入点分母非零（确认未定式已真正消除）。
   - 纯概念、$\varepsilon$-$\delta$ 或抽象函数证明题由人工逐句审校并如实标注 `manual` / `hybrid`。
3. **360px 移动端防裁切门禁**：
   - 鉴于 `<ol class="learning-tip"><li>` 内含内边距、左边框与编号缩进，360px 视口下的 `.formula` 实际可用宽度较窄；通过专用 Playwright 巡检脚本在真实 `.learning-tip` DOM 容器内按含跨平台字体余量的宽度逐条检测全部公式，超宽公式自动拆入 `\begin{gathered}...\end{gathered}` 多行居中排版。
4. **单一进度账本**（`docs/bank/guided-hints-progress.json`）：
   - 记录每个批次对应的 TS 文件、SymPy 校验脚本以及每道题的 `batchId`、`pattern`、`steps`、`verification` 与 `status`，支持随时断点续跑与分批交接。

---

## 4. 第一章全量落地统计（v0.30.1）

- **覆盖范围**：第一章全部 **344 道题**（含 `p128` 样板、28 道基础/拓展数值题、7 道核心书写题、习题 `1-1` 至 `1-10`、总习题一与考研专题一），**100% 覆盖**，累计 **1,174** 步逐步算式提示。
- **验证分布**：`238` 题全符号 SymPy 逐阶复算（`symbolic`）+ `50` 题混合复算（`hybrid`）+ `56` 题纯概念/抽象证明人工复核（`manual`）。
- **自动化回归门禁**：
  - 9 个 SymPy 逐阶校验脚本全部 `exit 0`；
  - `src/tests/learning.test.tsx` 新增第一章 100% 覆盖断言及全量 `guidedHints[].formula` 的 KaTeX `strict: "error"` 校验；
  - 全部 1,174 条提示公式通过 360px 视口 `.learning-tip` 容器零裁切验收。

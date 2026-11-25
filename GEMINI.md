# GEMINI.md — Gemini / Antigravity Harness Instructions

本项目由 **Codex（GPT-6.2 Sol）** 与 **Gemini** 双 Agent 协作维护。所有开发、测试与发布规则以根目录 [AGENTS.md](./AGENTS.md) 和 `main` 上的 [docs/AI_HANDOFF.md](./docs/AI_HANDOFF.md) 为唯一权威来源。

### Gemini 核心红线速查
1. **唯一数据源（SSOT）**：所有题库、逐步提示（`guidedHints`）、ELI5（`teaching`）、`formulaIds` 与语义标引（`meta`）统一写入 `src/data/bank/ch01.json` … `ch08.json`（Schema 见 `src/data/bank/schema.ts`）；补救微课放在 `src/data/remediation/`。
2. **严禁新建平行文件或复制单节脚本**：禁止再新建 `guidedHints/`、`eli5Drafts/`、`bank*.ts`、`problemFormulaIds.ts` 或 `scripts/check-*.py`。
3. **每次数据修改必跑**：`npm run build:bank-index && npm run validate:bank && npm run typecheck && npm test`。
4. **永久固定签名与发布边界**：不得擅自修改版本号、打 tag 或发布 Release；正式 Android 构建必须走 GitHub Actions 固定签名流程。

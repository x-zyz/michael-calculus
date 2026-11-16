> **永久签名规则**：所有 agent 的正式更新必须使用 `android/signing-identity.json` 固定的同一证书，走 GitHub Actions 的签名 release 流程。禁止为每台机器或每个版本生成私钥、禁止分发普通 debug APK。调试包只能使用 `.dev` 包名。缺少密钥、指纹不同或权限不足就停止发布并说明原因，不能改指纹绕过。详见 `docs/android-signing.md`；用户只需一次配置仓库 Secrets。旧签名丢失时先做只读数据备份，不擅自卸载旧版。

## v0.7.0 界面结构规则（优先于下方历史基线）

- 当前版本 0.7.0 / versionCode 9。五项学习导航，AI 保留 `/assistant`，只从首页链接进入。永久签名规则继续生效。
- 新功能必须放进已有结构（新路由 / Tabs / Sheet / Accordion），禁止往页面底部继续追加区块；禁止使用原生 select / details / number 控件和字面样式值；只能使用 `src/components/ui` 组件和 tokens。数学图形坐标、SVG 路径和动态百分比是几何数据。
- 样式入口 `src/styles.css` 只导入 tokens / base / layout / components；组件/页面 TSX 不超过 300 行。字体最小 12px，触控目标至少 44px，每页最多一个可见 primary；手机主任务必须首屏可见。
- 课程在 `features/curriculum`，答题在 `practice`，掌握度在 `review`，三个独立实验在 `experiments`；`LearningPages.tsx` 仅兼容导出。公式设置放 Sheet，数据备份放 `/settings`。
- 必须跑 typecheck、lint、test、check:css、test:signing、Playwright 和 Android sync / lint。发布使用固定证书的 release APK；assembleDebug 仅验证 `.dev` 调试构建。
- `src/data/*.ts`、公式 engine 和所有持久化/备份格式在此次 UI 重构中保持原样。后续不得以界面调整名义修改数学或调度行为。
- 交接与前后图见 `HANDOFF.md`、`docs/ui-before`、`docs/ui-after`，本轮原始方案见 `docs/superpowers/specs/2026-11-16-ui-redesign.md`。

# CLAUDE.md — DeepSeek / Claude Code Harness Instructions

Please read and follow [AGENTS.md](./AGENTS.md) for full project architecture, mathematical rigor redlines, mobile 360px layout rules, local JDK 21 / Android SDK 35 paths, verification commands, and standing GitHub release authorization (`https://github.com/x-zyz/michael-calculus`).

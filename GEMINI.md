> **永久签名规则**：所有 agent 的正式更新必须使用 `android/signing-identity.json` 固定的同一证书，走 GitHub Actions 的签名 release 流程。禁止为每台机器或每个版本生成私钥、禁止分发普通 debug APK。调试包只能使用 `.dev` 包名。缺少密钥、指纹不同或权限不足就停止发布并说明原因，不能改指纹绕过。详见 `docs/android-signing.md`；用户只需一次配置仓库 Secrets。旧签名丢失时先做只读数据备份，不擅自卸载旧版。

# GEMINI.md — Gemini / Antigravity Harness Instructions

Please read and follow [AGENTS.md](./AGENTS.md) for full project architecture, mathematical rigor redlines, mobile 360px layout rules, local JDK 21 / Android SDK 35 paths, verification commands, and standing GitHub release authorization (`https://github.com/x-zyz/michael-calculus`).

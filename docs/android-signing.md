# 所有 agent 共用的安卓更新规则

## 原因与一次性修复

以前发布的是 `assembleDebug`，私钥由构建机器临时生成。Android 覆盖更新要求包名相同、签名身份兼容且 versionCode 合法；相同 GitHub 仓库、应用名或版本名并不能代替相同私钥。我方之前只说明签名不兼容，没有固定发布身份，导致用户无法正常更新。

今后唯一正式包名：`com.michael.calculus`。唯一证书 SHA-256：

`8d7d3a0c3cccb6130ce83dc1d71c7c9721d4266c085f5a68f4b9df8027751706`

这份私钥沿用早期 0.1/0.2 预览版本已经保存的那份，不是新生成的。它不能替代已经丢失的 v0.5/v0.6 CI 调试私钥；这两个旧包分别使用不同证书。如果当前安装的是另一份签名，需要一次迁移，之后所有正式更新都继续用本固定身份。APK 内只有公钥证书，无法从 APK 恢复私钥。

## 长期机制（必须遵守）

1. 用户保管私密签名备份；GitHub Actions Secrets 保存同一份密钥的加密配置。
2. Codex、Gemini、Claude 等日常只提交代码，发布交给 `.github/workflows/release.yml`。
3. 正式发布使用 `assembleRelease`，不能改回 `assembleDebug`。签名环境变量缺失会直接阻止正式构建；不能生成替代密钥、临时调试签名或无签名发布包。
4. `scripts/verify-android-release.mjs` 在上传前强制核对固定证书、正式包名、versionName、versionCode 和非 debuggable 标志。不一致就失败；不准为绕过检查修改指纹。
5. 每次更新递增 versionCode，保留 `mc-learning-v1`、`mc-formula-v1`、`mc-theme` 兼容性。
6. 本地调试包使用 `com.michael.calculus.dev` 和“开发版”名称，与正式版独立安装，不能当作正式更新分发。

## 一次配置 GitHub（仅仓库所有者执行）

需要 Node.js 22+、JDK 21、已登录仓库所有者身份的 GitHub CLI。

从本次聊天下载私密配置包，解压到仓库之外。它包含既有私钥和密码，必须离线备份，不可上传公开仓库、Release、Issue 或聊天。

在解压目录运行：

    node configure-github-signing.mjs

工具先用 keytool 校验证书，再通过 gh 的 stdin 配置以下四个仓库 Secrets，不会把秘密放到命令参数或打印出来：

- MC_ANDROID_KEYSTORE_BASE64
- MC_ANDROID_KEYSTORE_PASSWORD
- MC_ANDROID_KEY_ALIAS
- MC_ANDROID_KEY_PASSWORD

配置工具还会启动首次 v0.6.1 固定签名构建，验证通过后由 Actions 发布 APK、源码和校验值。如果该正式 APK 已存在，重复配置不会重复发布。

重复执行仍配置同一份密钥，不生成新密钥。若 403，说明当前 gh 身份缺少 Actions Secrets 写权限，应在本机用仓库所有者登录，或在 GitHub 的仓库 Settings → Secrets and variables → Actions 完成配置；不要把密码发给 agent。本次 Cloud 的集成访问该接口返回 403，因此 agent 无法代替用户完成这一步。

配置完成后，各 agent 均从仓库统一流程发布。可推送新的版本标签，或手动运行 Release Android APK 并提供已存在的标签。不得重写已有 Release 标签或用新签名替换旧 Release 的原 APK。

## 旧版数据：先备份，不要直接卸载

旧版调试 APK 的 WebView 可通过已授权的 USB 调试只读导出。需要 Android SDK 的 adb、Node.js 22+，手机解锁、授权 USB 调试，并打开旧版 Michael calculus。

    node scripts/export-legacy-android-data.mjs "C:\Users\Michael\Downloads\Michael-calculus-learning-backup.json"

工具只读取旧应用自身 WebView 中的三个项目键，保存 JSON，随后移除临时 adb 转发。不会安装、卸载、停止应用或修改学习记录；已存在的备份文件不会被覆盖。如果找不到旧应用、USB 未授权或该安装禁用了 WebView 调试，工具会停止，而不是尝试清除数据。

先保存并检查 JSON，确认包含实际的课程、作答和公式记录；核对新的固定签名安装包已经准备好，再由用户决定一次性迁移。不要在备份未验证或新版尚未就绪时卸载旧应用。

新版“错题与复习 → 学习数据恢复 / 导入旧版备份”能选择该 JSON，预览数量，在明确确认后恢复。导入替换对应本地键，不上传文件；遇到存储写入失败会尝试回滚。空、损坏、其他应用和不支持的记录会拒绝导入。后续固定签名版本可直接覆盖更新，不再需要这次迁移。

限制：当前 Cloud 没连接用户的安卓手机。导出协议与恢复逻辑有自动化测试，但真实 USB/WebView 导出和一次性换签名迁移还需要在用户设备上验收。导出失败时保留旧版，不要删除它。

## 本轮验证与启用状态

源码准备为 0.6.1 / versionCode 7；此前公开的 v0.6.0 仍是历史随机调试签名，不会被悄悄替换。固定签名正式发布需要上述一次 Secrets 配置。配置缺失时新流程会停止，绝不再发布另一份随机签名。

### 已完成的验证

- 32 项应用单元/组件测试、5 项签名/旧版导出协议测试通过。
- 原有 22 项浏览器回归通过，新增桌面和 360px 的备份导入/确认/重开恢复用例通过。
- 实际 Gradle 无密钥正式构建被拒绝；提供固定密钥后正式/开发 APK 和 Android lint 构建通过。
- 正式 APK 实测包名 `com.michael.calculus`、版本 0.6.1 / 7、不可调试且证书等于固定指纹。
- 私密配置包已核对 ZIP 完整性和脚本版本，未进入 Git。实际 GitHub Secrets 写入因当前集成 403 等待所有者执行一次配置；不能宣称已启用。

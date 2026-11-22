# Michael Calculus 1.0.0 Android 候选验收

本清单面向 Android 真机。候选从 `0d2ca983b1ffeb5a4ff2dceafe8e21b4aa4a8341` 构建，目标身份是 `com.michael.calculus`、`1.0.0`、构建号 `43`。既有正式版是 `0.31.0 / 42`，固定签名证书 SHA-256 为 `8d7d3a0c3cccb6130ce83dc1d71c7c9721d4266c085f5a68f4b9df8027751706`。

## 下载与核对

- [下载固定签名候选 APK（ZIP）](https://github.com/x-zyz/michael-calculus/actions/runs/45082750318/artifacts/14778227227) · [成功的构建记录](https://github.com/x-zyz/michael-calculus/actions/runs/45082750318)。需登录 GitHub，产物保留到 2026-11-25 15:23（太平洋时间）。
- APK SHA-256 为 `ef9ec8b34e28c1a53ceaf340f5c4ab4041b266de9f9cafa8c9e017d7cb72d540`。Actions 通过签名构建、Android Lint、包身份及 ZIP 对齐校验。本地回下载后再次核对 APK 哈希、固定证书和包身份，均通过。

- 解压下载的 ZIP，在其目录用 PowerShell 执行 `Get-FileHash .\Michael-Calculus-1.0.0-rc-build43.apk -Algorithm SHA256`。结果应与 `SHA256SUMS.txt` 和上面的值相同。
- `verification.txt` 记录签名、包名、版本以及构建所用提交。构建由独立分支的手动工作流执行，校验通过后上传三个指定文件，保留三天。需要重建时，使用 `gh workflow run 419733378 --repo x-zyz/michael-calculus --ref build/android-v1-rc -f tag=0d2ca983b1ffeb5a4ff2dceafe8e21b4aa4a8341`。必须选定该分支。GitHub 列表可能沿用主线已登记的旧工作流名称，候选作业名为 `candidate`。
- 现行正式 APK 已单独下载，SHA-256 与该正式版公布的校验文件一致。实际 APK 显示 `com.michael.calculus / 0.31.0 / 42`，证书指纹与上面的固定身份一致。[现行正式版](https://github.com/x-zyz/michael-calculus/releases/tag/v0.31.0)

## 1. 安装前备份

- 有旧 JSON 时，把原备份另存一份到电脑或其他独立位置。到旧版的「关于与数据备份 → 学习数据恢复 / 导入旧版备份」，选择文件并查看日期、课程、作答和公式复习数量。取消或离开页面，先保留当前手机上的记录。备份太旧、缺少关键记录或无法读取时，应视同没有完整备份。
- 固定签名的 0.31.0 只提供 JSON 导入。项目旧导出脚本仅支持可调试的 WebView，现行正式 APK 已核验为非调试包。Android 系统备份可以作为补充，无法据此确认已取得一份可由 App 导入的完整 JSON。[Android 系统备份说明](https://developer.android.com/identity/data/autobackup)
- 主力机若没有已核实的备份，保留原安装。用备用真实 Android 设备安装经核验的 0.31.0，在旧版里建立测试数据，也可导入已有 JSON，再用候选 APK 覆盖安装。至少先留下一节已学课程、一道对题、一道错题、一条公式复习记录，并记录当前主题。截图或记录这些样本及数量，供升级后比对。

## 2. 覆盖安装与数据比对

- 真机上从「文件」打开已核对的候选 APK，确认系统提示更新现有应用。USB 调试已授权时也可运行 `adb -s <真机序列号> install -r "<候选 APK 路径>"`。
- 安装后确认 App 显示 `1.0.0`，核对系统安装包构建号 `43`。如需用电脑读取，可运行 `adb -s <真机序列号> shell dumpsys package com.michael.calculus`，查看 `versionName` 和 `versionCode`。
- 首次打开后先比对原有课程进度、作答、错题、公式掌握度和主题。完成数据比对前先别导入备份，以便确认数据确实跨版本保留。
- 用 P8、一个带 ELI5 的数值题和一题书写推导检查原题、引导、反馈和回到练习。书写题走纸笔和自评流程。全 41 题自动回归结果见[候选质量报告及更新说明](https://github.com/x-zyz/michael-calculus/blob/0d2ca983b1ffeb5a4ff2dceafe8e21b4aa4a8341/docs/v1.0.0-candidate.md)。

## 3. 断网重新打开

- 打开飞行模式，确认 Wi-Fi 和移动数据均关闭。到 Android 应用详情强行停止 Michael Calculus，然后从桌面图标重新打开。全程保留应用存储。
- 检查首页、第一章题面、KaTeX 公式和既有记录。完成一道题，再次停止并打开应用，确认离线新增作答仍在。
- 恢复网络后回到应用内更新，记录结果。本轮只读核验发现，ByteVirt 稳定渠道仍返回有效签名的 0.28.0（构建号及序列号均为 37），GitHub 正式版则为 0.31.0 / 42。装了 43 的手机应在应用内显示「已是最新正式版」。记录设备型号、Android 版本、覆盖安装结果、数据比对、断网重开和更新检查。

## 4. 失败后的数据保护

- 如果系统拒绝覆盖或要求卸载，停止。保留原 App、数据和备份，记录系统报错。不要卸载或清除应用存储。
- 安装 43 后，旧版 42 的直接降级没有保障。若打开失败或数据出现差异，先保留现有安装和两个版本的记录。可从同签名、更高构建号修复包继续，或在 App 可进入且已确认需要恢复时，使用经过核实的 JSON。导入会替换相应记录，先核对日期与数量。

## 版本码与正式发布门槛

应用内更新器把本机构建号大于或等于渠道构建号判为已是最新。下载后还要求 APK 构建号严格大于本机，且与清单匹配，并通过包名和固定签名校验。因此 43 → 43 不触发更新，43 → 44 可进入更新流程，前提是签名清单合法且最低支持构建号不高于 43。若仍支持从 42 更新，该最低构建号不应高于 42。正式 `versionName` 仍为 `1.0.0`，`versionCode` 至少为 `44`，并应高于任何实际分发的候选包。正式发布时也应再核对 ByteVirt 最新序列、渠道签名清单及同步结果。此结论基于当前实现，尚未把 44 发布到稳定渠道做在线升级。[清单比较](https://github.com/x-zyz/michael-calculus/blob/0d2ca983b1ffeb5a4ff2dceafe8e21b4aa4a8341/android/app/src/main/java/com/michael/calculus/ByteVirtManifest.java#L121-L143) · [安装校验](https://github.com/x-zyz/michael-calculus/blob/0d2ca983b1ffeb5a4ff2dceafe8e21b4aa4a8341/android/app/src/main/java/com/michael/calculus/AppUpdates.java#L148-L169)

目前没有连接真机。覆盖安装、学习记录跨版本保留、Android 断网重开和真机端更新检查均待验收。取得实测结果后再进入明确的正式发布授权。

# App Hub 账号接入登记

生产 Android 端的包名、签名指纹和回调规划见 [apphub.json](../apphub.json)。证书指纹取自 [仓库固定签名身份](../android/signing-identity.json)。

在 Android 的「关于与数据备份」进入 App Hub 账号。客户端 `michael-calculus-android` 使用系统浏览器和 Authorization Code + PKCE S256。回调登记在 Android 清单，关联文件由 App Hub 站点提供。授权回调校验 `state`，ID Token 校验签名、发行方、受众、有效期及 `nonce`。

GitHub Release 使用项目的固定 Android 签名。仓库变量 `CALCULUS_AUTO_PUBLISH_LEGACY` 显式设为 `true` 时，Release 工作流才同步到旧 ByteVirt 更新服务器。已有的手动发布工作流仍可独立运行。

本地课程、学习进度和错题按现有存储格式读取。账号数据同步另行设计。

# App Hub 账号接入登记

生产 Android 端的包名、签名指纹和回调规划见 [apphub.json](../apphub.json)。证书指纹取自 [仓库固定签名身份](../android/signing-identity.json)。

接入时在 Casdoor 的 App Hub 组织中登记 `michael-calculus-android`，使用 Authorization Code + PKCE S256 和系统浏览器。Client ID 由生产 Casdoor 分配。域名上线后发布 Android Digital Asset Links，在固定签名的 APK 中登记回调并真机验证 `state` 与登录取消。

本地课程、学习进度和错题按现有存储格式读取。账号数据同步另行设计。

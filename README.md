# Michael calculus

面向大学生的离线交互式高等数学学习平台（Web + Capacitor Android APK）。让极限、导数、积分与级数看得见、练得会、记得住。

- **最新正式版与更新记录**：[GitHub Releases](https://github.com/x-zyz/michael-calculus/releases)
- **离线优先**：内置本地 KaTeX 字体与莫奈公有领域画作，无需登录即可完整学习，数据保存在本机。

---

## 核心功能

- **八章完整课程（48 个教材小节 / 68 课时）**
  覆盖函数极限与连续、导数与微分、微分中值定理与导数应用、不定积分、定积分及其应用、多元函数微积分、无穷级数、常微分方程与差分方程。每节课按「直觉 → 实验 → 定义 → 例题 → 练习」循序展开，定义页附白话讲解。
- **五类交互数学图像实验**
  1. **左右极限逼近**：可去间断、两个重要极限、等价无穷小、跳跃间断，带误差读数与参考线。
  2. **割线、切线与微分线性近似**：实时对比差商斜率、微分近似 `dy` 与高阶误差比。
  3. **中值定理与导数应用**：拉格朗日平行弦切点、洛必达法则同步逼近、单调性与凹凸性判别。
  4. **不定积分与定积分**：积分常数平移、左/中/右黎曼和逼近、变上限积分差商。
  5. **定积分应用**：曲边梯形面积、旋转体截面与折线逼近弧长。
- **分级练习与错题诊断**
  共 203 道题，覆盖全部八章，含参考同济第八版上册习题改编的 40 道数值题。支持整数、小数与分数答案判题（绝对误差 ≤ 10⁻⁶，不使用 `eval`），提供基础 / 提高 / 挑战筛选、三级提示、详细解析、错因标签统计与错题重练。
- **公式记忆中心（Formula Mastery）**
  支持填空、完整默写（内置触控数学键盘）、条件判断与反向识别；按间隔复习调度，以跨日证据自动推算 L0–L5 掌握度，并与练习中心联动。
- **0979 会员等级、App Hub 账号与数据备份**
  右上角实时展示 0979 会员等级与成长进度；支持本地 JSON 备份导入/恢复，Android 版内置应用内更新与 App Hub 账号登录。

---

## 下载与使用

- **Android APK**：前往 [Releases](https://github.com/x-zyz/michael-calculus/releases) 下载最新签名版 `Michael-calculus-<version>.apk`（支持 Android 8.0+，使用固定证书签名可直接覆盖升级）。
- **Web 端**：本地运行 `npm run dev` 或将 `npm run build` 生成的 `dist/` 部署到任意静态托管服务（使用 Hash 路由，无需服务端重写）。

---

## 本地开发与测试

需要 Node.js 22.12+ 与 npm。

```sh
npm ci
npm run dev          # 本地开发预览
npm run typecheck    # TypeScript 类型检查
npm run lint         # ESLint 检查
npm run check:css    # CSS Token 与组件规范检查
npm test             # Vitest 单元与组件回归测试
npm run build        # 生产构建
```

端到端与移动端（360px）布局验收测试：

```sh
npx playwright install chromium
npm run test:e2e
```

---

## Android 构建与发布

需要 JDK 21、Android SDK Platform 35 与 Build Tools 35.0.0。

```sh
npm ci
npm run android:sync   # 构建前端并同步到 android/
npm run android:debug  # 构建 .dev 调试包
```

正式版通过推送 `v*` 标签触发 GitHub Actions，使用仓库固定签名证书构建并发布到 GitHub Releases 与应用内更新通道。签名与旧版数据迁移说明见 [docs/android-signing.md](docs/android-signing.md)。

---

## 目录结构

```text
src/app/         路由、导航配置与全局外壳
src/components/  共享 UI 控件、KaTeX 公式渲染、画作与会员徽章
src/features/    首页、课程、数学图像、练习、公式记忆中心与设置页
src/data/        课程内容、实验数学模型、练习题库与公式库
src/db/          本机持久化（学习进度、公式记忆、主题偏好、备份导入）
src/styles/      设计 Token、基础排版、布局与组件样式
src/tests/       Vitest 单元与组件测试
tests/           Playwright 桌面与 360px 移动端端到端验收测试
android/         Capacitor 7 Android 工程
```

---

## 说明与边界

- **本地数据**：学习进度（`mc-learning-v1`）、公式记录（`mc-formula-v1`）与主题偏好（`mc-theme`）仅保存在设备本地；AI 教师问答、云端同步与手写 OCR 尚未开放。
- **画作来源**：各章节配图为克劳德·莫奈公有领域馆藏作品，来源于芝加哥艺术博物馆（Art Institute of Chicago），离线内置于安装包中。

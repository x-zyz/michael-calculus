# Michael calculus

面向大学生的交互式高等数学学习平台。当前版本：**0.3.0，极限完整闭环与导数入门**。

## 已实现

- React 19 + TypeScript + Vite，固定依赖版本和 npm lockfile。
- Tailwind CSS、统一主题变量、浅色/深色模式及本地主题偏好。
- 六大模块路由：学习首页、课程中心、数学实验室、练习中心、错题与复习、AI 教师。
- 桌面侧边栏与移动端六入口底部导航，未知路由恢复页面。
- 模块介绍占位页、学习路径说明弹窗、键盘操作和焦点恢复。
- Vitest 组件回归测试、Playwright 桌面与移动端（360px）布局及学习闭环端到端测试、ESLint 与类型检查。

目前已开放课程与实验：
- **第一章 · 函数、极限与连续（5 节）**：函数极限、第一个重要极限、第二个重要极限、等价无穷小替换、连续性与左右极限。
- **第二章 · 导数与微分（1 节）**：导数的定义与切线。
- **五种学习视图**：直觉、实验、定义、例题、练习，每节课程的「实验」环节自动关联对应数学模型。
- **两类交互实验**：
  1. **左右极限逼近实验**：可去间断 `(x² − 1)/(x − 1)`、第一个重要极限 `sin x / x`、第二个重要极限 `(1 + x)^(1/x)`、等价无穷小 `(1 − cos x)/x²`、跳跃间断分段函数；带极限参考线、坐标标注与误差读数。
  2. **割线与切线逼近实验**：支持 `f(x) = x²`、`f(x) = x³ − x`、`f(x) = √x` 在定点处的左右步长逼近，实时显示割线、切线、增量 `Δx/Δy` 与差商斜率。
- **12 道受限数值题**：支持整数、小数与分数输入（如 `3/5`、`-6`、`1/2`），提供三级提示、答案解析、错因归类与错题重练；首页展示真实阅读进度、累计作答次数和练习天数。

公式使用本地 KaTeX，APK 内置页面和字体。使用带版本号的 `localStorage`（`mc-learning-v1`、`mc-theme`）保存阅读完成状态、最近知识点、最近 500 次作答和主题偏好，兼容 0.2.0 升级数据；保存失败会显示提醒。作答仅检查预设数值答案（绝对误差 ≤ 10⁻⁶），不使用 `eval`，不宣称判断任意符号等价或推导过程。

后续求导法则、积分、AI 教师、账号同步与完整诊断卷尚未开放。

## 本地运行

需要 Node.js 22.12+ 与 npm。

```sh
npm ci
npm run dev
npm run typecheck
npm test
npm run lint
npm run build
```

浏览器自动化测试（本地）：

```sh
npx playwright install chromium
npm run test:e2e
```

也可设置 `PLAYWRIGHT_BASE_URL` 对已有预览运行测试。

## 结构

```text
src/app/              路由、导航配置和语言边界
src/components/       共享布局组件、公式渲染、静态图形与模块介绍
src/features/         学习首页、课程/实验/练习/复习闭环与模块页面
src/data/             课程、实验数学模型、受限判题与练习题库
src/db/               主题偏好与学习进度持久化
src/tests/            单元与组件回归测试
tests/                Playwright 端到端与移动端布局验收测试
.openai/hosting.json  托管身份和静态输出配置
```

## 发布

`npm run build` 生成 `dist/`。Hash 路由支持静态托管的刷新与深链接，无需服务器重写。

## 安卓 APK

安卓工程位于 `android/`，使用 Capacitor 7 封装本地 `dist/`，无需网站登录或联网加载首页。应用名为 **Michael calculus**，包名 `com.michael.calculus`，版本 `0.3.0`（versionCode 3）。支持 Android 8.0（API 26）及以上，Android System WebView / Chrome 需为 111 或以上。

已处理应用图标、启动画面、安卓返回键，以及 Android 15 系统栏边距。主题偏好与学习记录在应用自己的 WebView 本地存储中保存，与浏览器数据相互独立。

### 在 Android Studio 或命令行构建

安装 JDK 21、Android SDK Platform 35、Build Tools 35.0.0，执行：

```sh
npm ci
npm run android:sync
npm run android:debug
```

或使用 `npm run android:release` 构建 release APK 并使用签名密钥签名。每次改动前端后重新执行 `npm run android:sync`，确保 APK 包含最新资源。

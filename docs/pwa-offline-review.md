
# PWA 离线冷启动审核

## 复现

使用 Windows 上 Playwright 自带的 Chromium 145.0.7632.6。以生产构建运行预览，基线为 `a08419f`，修复前的 P8 样板为 `57fd93d`。每次都创建新浏览器上下文，在线打开应用并确认 Service Worker 已激活，再断开网络，在同一上下文打开一个新标签页。探针记录每次尝试，失败也计入样本。

```powershell
npm ci
npm run build
npm run preview -- --host 127.0.0.1 --port 4193 --strictPort
```

在另一终端运行探针。切换到基线的独立预览时，替换端口并去掉 `&ui=study`。默认探针端口为 4195，并行运行时用 `PWA_PROBE_PORT` 指定其他空闲端口。

```powershell
node scripts/probe-pwa-offline.mjs http://127.0.0.1:4193 transport 6 '/practice?problem=p8&ui=study' trace
node scripts/probe-pwa-offline.mjs http://127.0.0.1:4193 browser 12 '/practice?problem=p8&ui=study'
```

- `browser` 使用 Chromium 的断网模拟。`transport` 通过本地代理关闭源站请求的 TCP 连接，浏览器保持正常联网模式。每行输出包含请求状态、预缓存条目和 Worker 状态。
- `trace` 在探针代理中为 Service Worker 加入只读缓存查询日志，记录请求的 Origin、严格命中和忽略 Vary 时的命中。线上 Worker 代码不会带探针。

## 根因与范围

失败时 HTML 仍由 Service Worker 返回 200，控制器与注册均显示 `activated`，等待与安装中的 Worker 都为空。缓存 `michael-calculus-v0.31.0` 有 38 条记录，其中包括入口 JS 和 CSS。基线失败请求是 `/assets/index-DMYm-fI2.js` 与 `/assets/index-Bcd2Tc1K.css`，修复前样板为 `/assets/index-CnwLv2Ht.js` 与 `/assets/index-DBn2Hh3Z.css`，失败码为 `net::ERR_FAILED`。

Vite 预览响应带 `Vary: Origin`。预缓存没有设置 Origin，浏览器加载入口资源时在 CORS 请求里发送了同源 Origin，严格匹配返回空。探针在同一失败请求上得到 `matched: false` 和 `matchedIgnoringVary: true`。Worker 转而访问已断开的源站，于是 HTML 可以到达，脚本无法启动应用。

原基线及样板在源站断开时均稳定复现。Chromium 断网模拟的复现频率较不稳定，因此不能用它单独判断问题是否消失。缓存流程在样板前已经存在，失败发生在入口脚本执行之前。

修复保留严格匹配，对预缓存清单内、构建输出目录中的精确同源 URL，在唯一变体是 Origin 时使用当前版本缓存里的静态资源。含其他 Vary 维度、运行时资源及不同查询参数的请求继续走原流程。

## 独立复验

| 构建与入口 | 断开源站 | Chromium 模拟断网 |
| --- | ---: | ---: |
| v0.31.0 基线 | 0/6 | 10/10 |
| 修复前 P8 样板 | 0/6 | 9/10 |
| 修复后旧入口 | 6/6 | — |
| 修复后 P8 样板 | 12/12 | 12/12 |

修复后抓取的旧入口日志仍显示严格 Origin 匹配落空，入口 JS 和 CSS 由 Service Worker 返回 200。单元测试覆盖 Origin 单变量命中、优先采用严格匹配，以及查询参数、运行时资源或其他 Vary 维度不会被放宽。

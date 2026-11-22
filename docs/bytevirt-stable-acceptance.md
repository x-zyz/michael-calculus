# ByteVirt 稳定通道发布核查

核查时间为 2026-11-22 15:30–15:33（太平洋时间）。GitHub 正式版为 0.31.0 / 42，ByteVirt 公网仍为 0.28.0 / 37。本轮仅查询，不修改线上发布状态。

## 已核实的证据

| 项目 | 实测 |
| --- | --- |
| GitHub 正式 APK | `v0.31.0`，`com.michael.calculus`，构建 42，大小 6,672,009 字节。SHA-256 为 `b47f4b175d50f6855e3ef77c0a514bc1d9e245c3d64c0b7f9384891377bb0713`，与 GitHub 记录一致，APK 固定证书通过。 |
| Actions 发布入口 | Run `45015267137` / Job `137189413846` 下载并验证 GitHub v0.31.0 APK，经 SSH 向 `141.11.138.234` 的 `publish-v1` 送交签名包，返回 `Published calculus/stable/android sequence 42`。较早的 Run `44989644326` 同样返回序列 41。另一个 v0.31.0 Run `45012872975` 构建失败且跳过发布，无证据显示它回退了通道。 |
| Android 读取入口 | 正式版和候选代码都使用 `https://update.0979019203.top/calculus/stable/android/latest.json`。禁止重定向、关闭 URL 连接缓存，无 GitHub 回退路径。公钥校验后才读取构建号和序列，设备还会拒绝低于已接受序列的清单。 |
| 公网 DNS | Google 与 Cloudflare 的 DNS over HTTPS 均返回 A `154.26.235.59`，未得到 AAAA 或 CNAME。与发布 SSH 地址 `141.11.138.234` 不同。工作机系统解析返回 `198.18.0.97`，该地址不作为公网路由证据。 |
| 公开清单与 APK | HTTP 200，RS256 和应用内置公钥验证通过，`kid=calculus-stable-android-1`，构建 37、序列 37、最低构建 0，有效期至 2027-02-19 06:15:43 UTC。序列 37 APK 实际包名、版本、构建号及固定证书通过；大小 5,997,406 字节，SHA-256 `bb128c98b203dcd365cc462d5efc25d22abed94806bef9d55690024d2eb5ffcf` 与签名清单一致。序列 38–42 的 APK 路径均返回 HTTP 404。 |
| 缓存与直连线索 | 公开清单显示 Caddy、`Cache-Control: no-store`，未见 `Age` 或 `CF-Cache-Status`。普通 URL、请求 `no-cache` 和随机查询参数均返回相同 ETag 与清单 SHA-256 `ceccd770deff3c7e8b8892880e44a43cbebaf0a33a713498b8ea6b7de1fbd589`。本机用相同 HTTPS 主机名和 SNI 指定两个 IP 均读到旧 ETag，且序列 42 均为 404。直连结果无法确认两台主机实际读取的存储路径。 |

[发布 Job 42](https://github.com/x-zyz/michael-calculus/actions/runs/45015267137/job/137189413846) · [发布 Run 41](https://github.com/x-zyz/michael-calculus/actions/runs/44989644326) · [发布工作流](https://github.com/x-zyz/michael-calculus/blob/a08419ff0457d84e21e795d18203c3b8c232bc3b/.github/workflows/bytevirt.yml) · [Android 清单读取](https://github.com/x-zyz/michael-calculus/blob/a08419ff0457d84e21e795d18203c3b8c232bc3b/android/app/src/main/java/com/michael/calculus/ByteVirtManifest.java) · [公网清单](https://update.0979019203.top/calculus/stable/android/latest.json)

## 结论与待核实项

Actions 最后的成功条件是 SSH 发布命令退出成功。它会在写入前检查在线清单，但写入后没有核对 Android 实际请求的公网清单和 APK。因此即使序列 42 没有送达公开路径，任务仍会显示成功。两次不同构建都出现这个结果，公开侧始终能返回自洽的旧清单与旧 APK。现有证据优先指向发布目标和 Caddy 对外读取的目录、挂载或上游没有指向同一份数据。普通 CDN 缓存证据不足，服务端回退、路由或部署迁移仍待核实。

SSH 主机已用仓库固定指纹核对，但当前账号无服务器只读权限，未看到实际写入目录、Caddy 生效配置、挂载或服务日志，不能断言序列 42 现在在哪台机器哪个目录。公网只有 37 也无法证明没有设备曾经收到 42。设备若已接受 42，读回 37 时会触发防回退；尚未接受较高序列且已安装构建 42 或 43 的设备，会把签名有效的 37 判为当前已是最新版。

## 可复现的只读检查

在仓库根目录使用 PowerShell、Node.js 22 与已登录的 GitHub CLI。

```powershell
gh run view 45015267137 --job 137189413846 --log | Select-String 'Published calculus/stable/android sequence'
git show a08419f:.github/workflows/bytevirt.yml | Select-String 'publish-v1|BYTEVIRT_CHECK_LIVE'
gh api repos/x-zyz/michael-calculus/releases/latest --jq '{tag_name,apks:[.assets[]|select(.name|endswith(".apk"))|{name,digest,size}]}'
curl.exe -fsS 'https://dns.google/resolve?name=update.0979019203.top&type=A'
curl.exe -fsS -H 'Accept: application/dns-json' 'https://cloudflare-dns.com/dns-query?name=update.0979019203.top&type=A'
$lane='https://update.0979019203.top/calculus/stable/android'
37..42 | ForEach-Object {
  curl.exe -sSI -o NUL --max-time 10 -w "sequence $_ HTTP %{http_code}\n" "$lane/releases/$_/package.apk"
}
```

以下命令读取清单并用客户端公钥验签，再核对清单所指 APK 的字节数和 SHA-256。它不需要任何私钥。

```powershell
@'
import {createHash,createPublicKey,verify} from 'node:crypto';
import {readFileSync} from 'node:fs';
const origin='https://update.0979019203.top';
const lane='/calculus/stable/android';
const source=readFileSync('android/app/src/main/java/com/michael/calculus/ByteVirtManifest.java','utf8');
const key=createPublicKey({key:Buffer.from(source.match(/PUBLIC_KEY = "([^"]+)"/)[1],'base64'),format:'der',type:'spki'});
const headers={'cache-control':'no-cache','pragma':'no-cache'};
for (const suffix of ['', '?rc_probe='+Date.now()]) {
  const response=await fetch(origin+lane+'/latest.json'+suffix,{headers,redirect:'error',signal:AbortSignal.timeout(10000)});
  if(!response.ok) throw Error('Manifest HTTP '+response.status);
  const raw=await response.text();
  const {protected:h,payload:p,signature:s}=JSON.parse(raw);
  if(!verify('RSA-SHA256',Buffer.from(h+'.'+p),key,Buffer.from(s,'base64url'))) throw Error('Bad JWS signature');
  const header=JSON.parse(Buffer.from(h,'base64url'));
  const m=JSON.parse(Buffer.from(p,'base64url'));
  if(header.alg!=='RS256'||header.kid!=='calculus-stable-android-1'||m.app!=='calculus'||m.channel!=='stable'||m.platform!=='android'||m.status!=='release'||Date.parse(m.expires_at)<=Date.now()) throw Error('Unexpected manifest identity or expiry');
  const content=await fetch(origin+m.asset.url,{redirect:'error',signal:AbortSignal.timeout(15000)});
  if(!content.ok) throw Error('APK HTTP '+content.status);
  const apk=Buffer.from(await content.arrayBuffer());
  const digest=createHash('sha256').update(apk).digest('hex');
  if(digest!==m.asset.sha256||apk.length!==m.asset.size) throw Error('APK hash or size mismatch');
  console.log(JSON.stringify({probe:suffix?'query/no-cache':'canonical/no-cache',version:m.version,build:m.build,sequence:m.sequence,minimum:m.min_client_build,kid:header.kid,apkSigner:m.asset.signer_sha256,apkBytes:apk.length,apkSha256:digest,envelopeSha256:createHash('sha256').update(raw).digest('hex'),published:m.published_at,expires:m.expires_at,cache:response.headers.get('cache-control'),age:response.headers.get('age'),cdn:response.headers.get('cf-cache-status'),server:response.headers.get('server'),etag:response.headers.get('etag')}));
}
'@ | node --input-type=module -
```

有现有只读运维权限后，在发布主机及公网实际服务主机上各执行。首先从发布服务的既有运行配置确认实际发布目录，从正在运行的 Caddy 服务确认生效配置和最终文件根目录或反代上游。以下示例中的路径由运维人员按实际值替换，输出只保留必要字段。

```bash
hostname
systemctl show caddy -p ExecStart -p FragmentPath
readlink -f "$PUBLISH_ROOT" "$SERVED_ROOT"
findmnt -T "$PUBLISH_ROOT"
findmnt -T "$SERVED_ROOT"
stat "$PUBLISH_ROOT/calculus/stable/android/latest.json" "$SERVED_ROOT/calculus/stable/android/latest.json"
sha256sum "$PUBLISH_ROOT/calculus/stable/android/latest.json" "$SERVED_ROOT/calculus/stable/android/latest.json"
sha256sum "$PUBLISH_ROOT/calculus/stable/android/releases/42/package.apk" "$SERVED_ROOT/calculus/stable/android/releases/42/package.apk"
journalctl -u caddy --since '2026-11-22 05:25:00 UTC' --until '2026-11-22 11:25:00 UTC'
```

比对发布与 Caddy 的实际路径、清单哈希、42 的 APK 哈希，以及窗口中是否发生服务切换、快照回滚或反向代理转发。对反向代理继续读其最终上游的同一路径。如果 42 文件存在但清单仍为 37，优先查当前清单指针或回退记录。如果两个目录都只有 37，查发布服务实际写入位置和日志，保留原始签名包。

## 对齐方案，另行授权后执行

1. 先确认唯一权威的生产目录。若目录或上游分离，让发布端与公网读取端统一到权威数据；若确认是回退，先定位回退触发条件，保留现有数据和日志。不要盲改 DNS、发布目标或清空目录。
2. 让 ByteVirt 对齐已存在的 GitHub v0.31.0 / 42。优先恢复或沿现有发布机制复用**原始签名清单字节**和已核验的 GitHub APK。客户端把同序列但不同签名摘要也视为旧清单，因此如原始序列 42 清单找不到，不要重签一个不同的 42 试探。采用经过授权的严格更高构建号及序列修复，并保持最高构建号规划。禁止手改签名 JSON。
3. 在单独获授权的工作流变更中加入发布后的公网门禁。从应用实际 URL 获取清单，验证签名、时效、包名、渠道及构建/序列。再读取 APK，核对大小、SHA-256、固定签名和 GitHub 附件。尽量再用一条独立网络复测。任一失败，发布任务应报错，禁止把 SSH 成功作为到达用户的凭证。修复后应见 0.31.0 / 42、序列 42 APK HTTP 200 和 GitHub 同哈希；如果改用更高的获授权修复版本，按该版本核对。

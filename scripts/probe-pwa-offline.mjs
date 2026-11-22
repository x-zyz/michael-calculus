
import { createServer, request } from "node:http";
import { chromium } from "playwright";

const [origin, mode = "browser", count = "10", hash = "/practice?problem=p8", trace = ""] = process.argv.slice(2);
if (!origin || !["browser", "transport"].includes(mode) || !/^[1-9]\d*$/.test(count)) {
  console.error("Usage: node scripts/probe-pwa-offline.mjs ORIGIN [browser|transport] [count] [hash route] [trace]");
  process.exit(2);
}
const upstream = new URL(origin);
if (upstream.protocol !== "http:" || !["localhost", "127.0.0.1"].includes(upstream.hostname)) {
  console.error("Use a loopback HTTP production preview as the upstream.");
  process.exit(2);
}
const workerTrace = String.raw`
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (!["script", "style"].includes(req.destination)) return;
  event.waitUntil((async () => {
    const [match, relaxed] = await Promise.all([caches.match(req), caches.match(req, { ignoreVary: true })]);
    const record = {
      path: new URL(req.url).pathname, destination: req.destination,
      origin: req.headers.get("origin"), mode: req.mode,
      matched: Boolean(match), matchedIgnoringVary: Boolean(relaxed),
      vary: relaxed?.headers.get("vary"), cacheName: CACHE_NAME,
    };
    const diagnostics = await globalThis.caches.open("offline-probe-only");
    await diagnostics.put("/__offline-probe/" + req.destination, new Response(JSON.stringify(record)));
  })());
});
`;

let disconnected = false;
const server = createServer((incoming, outgoing) => {
  if (disconnected) {
    incoming.socket.destroy();
    return;
  }
  const incomingUrl = new URL(incoming.url, upstream);
  const target = new URL(upstream);
  target.pathname = incomingUrl.pathname;
  target.search = incomingUrl.search;
  const instrument = trace && target.pathname.endsWith("/sw.js");
  const headers = { ...incoming.headers, host: upstream.host };
  if (instrument) headers["accept-encoding"] = "identity";
  const forwarded = request(target, { headers }, (response) => {
    if (instrument && response.statusCode === 200) {
      const chunks = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", () => {
        const body = Buffer.concat([Buffer.from(workerTrace), ...chunks]);
        const headers = { ...response.headers, "content-length": body.length };
        delete headers["transfer-encoding"];
        delete headers.etag;
        outgoing.writeHead(response.statusCode, headers);
        outgoing.end(body);
      });
    } else {
      outgoing.writeHead(response.statusCode, response.headers);
      response.pipe(outgoing);
    }
  });
  forwarded.on("error", () => outgoing.destroy());
  incoming.pipe(forwarded);
});
await new Promise((resolve) => server.listen(Number(process.env.PWA_PROBE_PORT ?? 4195), "127.0.0.1", resolve));
const url = "http://127.0.0.1:" + server.address().port + "/#" + hash;
const browser = await chromium.launch();

async function snapshot(page) {
  return page.evaluate(async () => {
    const registration = await navigator.serviceWorker.getRegistration();
    const controller = navigator.serviceWorker.controller;
    const required = Array.from(globalThis.document.querySelectorAll("script[src],link[rel=stylesheet]"),
      (node) => node.src || node.href);
    const keys = await globalThis.caches.keys();
    const entries = await Promise.all(keys.filter((name) => name !== "offline-probe-only").map(async (name) => {
      const cache = await globalThis.caches.open(name);
      const requests = await cache.keys();
      return {
        name, size: requests.length,
        assets: await Promise.all(required.map(async (url) => {
          const cached = await cache.match(url, { ignoreVary: true });
          return { url: new URL(url).pathname, present: Boolean(cached), vary: cached?.headers.get("vary") ?? null };
        })),
      };
    }));
    const trace = [];
    if (keys.includes("offline-probe-only")) {
      const diagnostics = await globalThis.caches.open("offline-probe-only");
      for (const request of await diagnostics.keys()) trace.push(await (await diagnostics.match(request)).json());
    }
    return {
      trace,
      documentState: globalThis.document.readyState,
      controller: controller?.state ?? null,
      active: registration?.active?.state ?? null,
      waiting: registration?.waiting?.state ?? null,
      installing: registration?.installing?.state ?? null,
      entries,
    };
  });
}

try {
  let success = 0;
  for (let i = 0; i < Number(count); i++) {
    disconnected = false;
    const context = await browser.newContext();
    const failures = [];
    const responses = [];
    try {
      const online = await context.newPage();
      await online.goto(url);
      await online.locator("main .formula").first().waitFor();
      await online.waitForFunction(() => navigator.serviceWorker.controller?.state === "activated", undefined, { timeout: 7000 }).catch(async (err) => {
        const state = await online.evaluate(async () => {
          const registration = await navigator.serviceWorker.getRegistration();
          const check = await navigator.serviceWorker.register("./sw.js").then(() => null, String);
          return { state: registration?.active?.state, check, url: globalThis.location.href };
        });
        throw new Error(JSON.stringify(state), { cause: err });
      });
      const before = await snapshot(online);
      if (mode === "browser") await context.setOffline(true);
      else disconnected = true;

      const cold = await context.newPage();
      cold.on("requestfailed", (req) => failures.push({
        path: new URL(req.url()).pathname, type: req.resourceType(), error: req.failure()?.errorText,
      }));
      cold.on("response", (res) => {
        const type = res.request().resourceType();
        if (["document", "script", "stylesheet"].includes(type)) {
          responses.push({ path: new URL(res.url()).pathname, type, worker: res.fromServiceWorker(), status: res.status() });
        }
      });

      const navigationError = await cold.goto(url, { timeout: 7000 }).then(() => null, (err) => String(err));
      const loaded = !navigationError && await cold.locator("main .formula").first()
        .waitFor({ timeout: 2000 }).then(() => true, () => false);
      success += Number(loaded);
      const after = await snapshot(cold).catch(() => null);
      console.log(JSON.stringify({ run: i + 1, mode, loaded, navigationError, failures, responses, before, after }));
    } finally {
      await context.close();
    }
  }
  console.log(JSON.stringify({ summary: true, origin, mode, route: hash, trace: Boolean(trace),
    passed: success, total: Number(count), chromium: browser.version() }));
  if (success !== Number(count)) process.exitCode = 1;
} finally {
  await browser.close();
  server.close();
}

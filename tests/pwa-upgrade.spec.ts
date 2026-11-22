import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";
import { expect, test } from "@playwright/test";
const { version } = JSON.parse(readFileSync("package.json", "utf8")) as { version: string };

test("production PWA replaces the 0.31 cache without losing a recorded attempt", async ({ context, page }) => {
  const baseline = process.env.PWA_UPGRADE_BASELINE;
  test.skip(!baseline, "Set PWA_UPGRADE_BASELINE to the built v0.31.0 dist directory.");
  test.setTimeout(45_000);
  let root = resolve(baseline!);
  const mimetypes: Record<string, string> = {
    ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
    ".json": "application/json", ".webmanifest": "application/manifest+json",
  };
  const origin = createServer(async (request, response) => {
    const route = new URL(request.url!, "http://localhost").pathname;
    const path = resolve(root, "." + (route === "/" ? "/index.html" : route));
    if (!path.startsWith(root + sep)) {
      response.writeHead(404).end();
      return;
    }
    try {
      const body = await readFile(path);
      response.writeHead(200, {
        "Content-Type": mimetypes[extname(path)] ?? "application/octet-stream",
        "Cache-Control": "no-cache",
        Vary: "Origin",
      }).end(body);
    } catch {
      response.writeHead(404).end();
    }
  });
  await new Promise<void>((done) => origin.listen(0, "127.0.0.1", done));
  const address = origin.address();
  if (!address || typeof address === "string") throw new Error("No HTTP address");
  const url = "http://127.0.0.1:" + address.port + "/#/practice?problem=p8";

  try {
    await page.goto(url);
    await page.getByRole("textbox").fill("-6");
    await page.getByRole("button", { name: "检查答案" }).click();
    await expect(page.getByText(/✓ 回答正确/)).toBeVisible();
    const before = await page.evaluate(() => localStorage.getItem("mc-learning-v1"));
    expect(before).toContain('"problemId":"p8"');
    await page.waitForFunction(() => Boolean(navigator.serviceWorker.controller));
    expect(await page.evaluate(() => caches.keys())).toContain("michael-calculus-v0.31.0");

    root = resolve("dist");
    await page.evaluate(async () => {
      const workers = navigator.serviceWorker;
      const previous = workers.controller;
      const activated = new Promise<void>((done) => {
        function changed() {
          if (workers.controller && workers.controller !== previous) {
            workers.removeEventListener("controllerchange", changed);
            done();
          }
        }
        workers.addEventListener("controllerchange", changed);
      });
      const registration = await workers.ready;
      await registration.update();
      await activated;
    });
    await expect.poll(() => page.evaluate(() => caches.keys())).toEqual(["michael-calculus-v" + version]);

    await context.setOffline(true);
    const reopened = await context.newPage();
    const response = await reopened.goto(url);
    expect(response?.fromServiceWorker()).toBe(true);
    await reopened.getByRole("button", { name: "一步一步教我" }).click();
    await expect(reopened.getByRole("region", { name: "原题" })).toBeVisible();
    expect(await reopened.evaluate(() => localStorage.getItem("mc-learning-v1"))).toBe(before);
  } finally {
    origin.closeAllConnections();
    origin.close();
  }
});


import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { expect, it, vi } from "vitest";

const scope = "https://example.test/calculus/";
const hashed = new URL("assets/index-123.js", scope).href;
const source = readFileSync("public/sw.js", "utf8")
  .replace('["__PRECACHE_ASSETS__"]', JSON.stringify(["./", "./assets/index-123.js", "./manifest.webmanifest"]));

function fixture(vary: string, strict = false) {
  const precached = new Response("precached", { headers: { vary } });
  const currentCache = { match: vi.fn(async () => precached) };
  const caches = {
    match: vi.fn(async () => strict ? precached : undefined),
    open: vi.fn(async () => currentCache),
  };
  const network = vi.fn(async () => { throw new TypeError("Offline"); });
  let onFetch: (event: {
    request: Request;
    respondWith: (response: Promise<Response>) => void;
  }) => void;
  runInNewContext(source, {
    URL, caches, fetch: network,
    self: {
      registration: { scope },
      location: { origin: new URL(scope).origin },
      addEventListener(name: string, listener: typeof onFetch) {
        if (name === "fetch") onFetch = listener;
      },
    },
  });
  function request(url: string) {
    return new Promise<Response>((resolve) => onFetch({
      request: new Request(url, { headers: { Origin: new URL(scope).origin } }),
      respondWith: resolve,
    }));
  }
  return { request, cachedMatch: currentCache.match, network };
}

it("finds a precached build asset when only the Origin header differs", async () => {
  const { request, cachedMatch, network } = fixture("Origin");
  expect(await (await request(hashed)).text()).toBe("precached");
  expect(cachedMatch).toHaveBeenCalledWith(expect.objectContaining({ url: hashed }), { ignoreVary: true });
  expect(network).not.toHaveBeenCalled();
});

it("uses a strict cache hit without applying the fallback", async () => {
  const { request, cachedMatch } = fixture("Accept", true);
  expect(await (await request(hashed)).text()).toBe("precached");
  expect(cachedMatch).not.toHaveBeenCalled();
});

it("keeps Origin fallback scoped to exact built URLs and no additional Vary headers", async () => {
  const otherVariant = fixture("Origin, Accept");
  await expect(otherVariant.request(hashed)).rejects.toThrow("Offline");
  for (const path of ["manifest.webmanifest", "assets/dynamic.js", "assets/index-123.js?changed"]) {
    const otherAsset = fixture("Origin");
    await expect(otherAsset.request(new URL(path, scope).href)).rejects.toThrow("Offline");
    expect(otherAsset.cachedMatch).not.toHaveBeenCalled();
  }
});

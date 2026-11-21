/* global self, caches, URL, fetch */
// Offline-first Service Worker for Michael calculus PWA.
// During production build, vite.config.ts replaces __PRECACHE_ASSETS__ and __CACHE_VERSION__.
const CACHE_NAME = "michael-calculus-v__CACHE_VERSION__";
const PRECACHE_ASSETS = ["__PRECACHE_ASSETS__"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        const urls = PRECACHE_ASSETS.filter((u) => !u.includes("__PRECACHE_ASSETS__"));
        return urls.length ? cache.addAll(urls) : Promise.resolve();
      })
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("michael-calculus-") && key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          void caches.open(CACHE_NAME).then((cache) => cache.put("./index.html", copy));
          return response;
        })
        .catch(async () => (await caches.match(request)) || (await caches.match("./index.html")) || (await caches.match("./"))),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request).then((response) => {
          if (response.ok && response.type === "basic") {
            const copy = response.clone();
            void caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        }),
    ),
  );
});

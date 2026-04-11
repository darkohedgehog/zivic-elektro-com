const STATIC_CACHE = "zivic-elektro-static-v3";
const RUNTIME_CACHE = "zivic-elektro-runtime-v3";

const OFFLINE_FALLBACK_URL = "/";

const PRECACHE_URLS = [
  OFFLINE_FALLBACK_URL,
  "/manifest.webmanifest",
  "/icons/favicon-16x16.png",
  "/icons/favicon-32x32.png",
  "/icons/apple-touch-icon.png",
  "/icons/android-chrome-192x192.png",
  "/icons/android-chrome-512x512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .catch((error) => {
        console.error("Precache failed:", error);
      }),
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      const activeCaches = new Set([STATIC_CACHE, RUNTIME_CACHE]);

      await Promise.all(
        cacheNames.map((cacheName) => {
          if (activeCaches.has(cacheName)) {
            return Promise.resolve();
          }

          return caches.delete(cacheName);
        }),
      );

      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(request.url);

  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(handleNavigationRequest(request));
    return;
  }

  event.respondWith(handleRuntimeRequest(request));
});

async function handleNavigationRequest(request) {
  const runtimeCache = await caches.open(RUNTIME_CACHE);

  try {
    const networkResponse = await fetch(request);

    if (networkResponse && networkResponse.ok) {
      await runtimeCache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch {
    return (
      (await runtimeCache.match(request)) ||
      (await caches.match(OFFLINE_FALLBACK_URL)) ||
      Response.error()
    );
  }
}

async function handleRuntimeRequest(request) {
  const runtimeCache = await caches.open(RUNTIME_CACHE);
  const cachedResponse = await runtimeCache.match(request);

  if (cachedResponse) {
    void refreshRuntimeCache(request, runtimeCache);
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);

    if (networkResponse && shouldCacheResponse(networkResponse)) {
      await runtimeCache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch {
    return (await caches.match(request)) || Response.error();
  }
}

async function refreshRuntimeCache(request, runtimeCache) {
  try {
    const networkResponse = await fetch(request);

    if (networkResponse && shouldCacheResponse(networkResponse)) {
      await runtimeCache.put(request, networkResponse.clone());
    }
  } catch {
    return undefined;
  }
}

function shouldCacheResponse(response) {
  return response.ok && response.type !== "error";
}
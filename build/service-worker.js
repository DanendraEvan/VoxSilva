// Service Worker untuk PWA - Offline Support (Cache-first navigation)
const PRECACHE_NAME = 'voxsilva-precache-v5';
const RUNTIME_CACHE = 'voxsilva-runtime-v5';

// Wajib dicache (sesuai requirement)
const PRECACHE_URLS = [
  '/index.html',
  '/dashboard.html',
  '/login.html',
  '/chat.html',
  '/monitoring.html',
  '/device.html',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

const NAVIGATION_FALLBACK_URL = '/index.html';

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(PRECACHE_NAME);
    await Promise.allSettled(
      PRECACHE_URLS.map((url) =>
        cache.add(new Request(url, { cache: 'reload' }))
      )
    );
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map((name) => {
        if (name !== PRECACHE_NAME && name !== RUNTIME_CACHE) {
          return caches.delete(name);
        }
        return undefined;
      })
    );
    await self.clients.claim();
  })());
});

async function putInRuntimeCache(request, response) {
  if (!response || !response.ok) return;
  const cache = await caches.open(RUNTIME_CACHE);
  await cache.put(request, response);
}

async function cacheFirstNavigation(request) {
  // Cache-first untuk navigasi halaman (document)
  const cached = await caches.match(request, { ignoreSearch: true });
  if (cached) return cached;

  try {
    const response = await fetch(request);
    // Simpan copy ke runtime cache agar next time cache-first berhasil
    await putInRuntimeCache(request, response.clone());
    return response;
  } catch (_err) {
    // Offline + tidak ada di cache => fallback ke /index.html
    return (await caches.match(NAVIGATION_FALLBACK_URL, { ignoreSearch: true })) ||
      new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
}

async function cacheFirstAsset(request) {
  const cached = await caches.match(request, { ignoreSearch: true });
  if (cached) return cached;

  const response = await fetch(request);
  // Hanya cache same-origin (hindari caching cross-origin)
  const url = new URL(request.url);
  if (url.origin === self.location.origin) {
    await putInRuntimeCache(request, response.clone());
  }
  return response;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.protocol === 'chrome-extension:') return;

  // Cache-first untuk navigasi halaman
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(cacheFirstNavigation(request));
    return;
  }

  // Cache-first untuk assets (css/js/png/manifest/ikon, dll)
  event.respondWith(
    cacheFirstAsset(request).catch(async () => {
      // Jika offline dan asset tidak ada di cache, jangan bikin navigasi gagal
      const cached = await caches.match(request, { ignoreSearch: true });
      return cached || new Response('Offline', { status: 503 });
    })
  );
});


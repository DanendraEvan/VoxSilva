// Service Worker untuk PWA - Offline Support (Network-first untuk update otomatis)
const PRECACHE_NAME = 'voxsilva-precache-v6';
const RUNTIME_CACHE = 'voxsilva-runtime-v6';

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

async function networkFirstNavigation(request) {
  // Network-first untuk navigasi halaman (selalu ambil versi terbaru)
  try {
    const response = await fetch(request, { cache: 'no-store' });
    // Update cache dengan versi terbaru
    if (response.ok) {
      await putInRuntimeCache(request, response.clone());
    }
    return response;
  } catch (_err) {
    // Jika offline, gunakan cache sebagai fallback
    const cached = await caches.match(request, { ignoreSearch: true });
    if (cached) return cached;
    // Jika tidak ada cache, fallback ke /index.html
    return (await caches.match(NAVIGATION_FALLBACK_URL, { ignoreSearch: true })) ||
      new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
}

async function networkFirstAsset(request) {
  // Network-first untuk assets (selalu cek versi terbaru dulu)
  try {
    const response = await fetch(request, { cache: 'no-store' });
    // Update cache dengan versi terbaru
    const url = new URL(request.url);
    if (url.origin === self.location.origin && response.ok) {
      await putInRuntimeCache(request, response.clone());
    }
    return response;
  } catch (_err) {
    // Jika offline, gunakan cache sebagai fallback
    const cached = await caches.match(request, { ignoreSearch: true });
    return cached || new Response('Offline', { status: 503 });
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.protocol === 'chrome-extension:') return;

  // Network-first untuk navigasi halaman (selalu ambil versi terbaru)
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  // Network-first untuk assets (selalu cek versi terbaru dulu)
  event.respondWith(networkFirstAsset(request));
});


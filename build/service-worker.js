// Service Worker untuk PWA - Offline Support
const CACHE_NAME = 'voxsilva-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/dashboard.html',
  '/device.html',
  '/monitoring.html',
  '/profile.html',
  '/login.html',
  '/daftar.html',
  '/chat.html',
  '/manifest.json',
  '/js/firebase-config.js',
  '/js/pwa-install.js',
  '/assets/css/bottom-nav.css'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Service Worker: Cache failed', error);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request).then((response) => {
          // Don't cache if not a GET request
          if (event.request.method !== 'GET') {
            return response;
          }
          
          // Clone the response
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          
          return response;
        });
      })
      .catch(() => {
        // If both cache and network fail, return offline fallback
        if (event.request.destination === 'document') {
          // Try to return cached dashboard or index
          return caches.match('/dashboard.html') || caches.match('/index.html');
        }
        // For other resources, return a basic offline response
        return new Response('Offline - Content not available', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/plain'
          })
        });
      })
  );
});


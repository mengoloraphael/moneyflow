const CACHE_NAME = 'moneyflow-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
];

// Installation du Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('✅ MoneyFlow PWA: Cache ouvert');
        return cache.addAll(urlsToCache).catch(err => {
          console.log('⚠️ Certains fichiers n\'ont pas pu être cachés:', err);
        });
      })
  );
  self.skipWaiting();
});

// Activation du Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Suppression ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Stratégie Cache First (pour assets statiques)
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    return;
  }

  // Pour les requêtes API, utiliser Network First
  if (event.request.url.includes('api.anthropic.com')) {
    event.respondWith(
      fetch(event.request)
        .catch(err => {
          console.log('🌐 API indisponible (mode offline)');
          return new Response(JSON.stringify({ error: 'Mode hors ligne' }), { 
            status: 503,
            headers: { 'Content-Type': 'application/json' }
          });
        })
    );
    return;
  }

  // Pour les autres ressources, Cache First
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(response => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          return response;
        });
      })
      .catch(err => {
        console.log('❌ Erreur fetch:', err);
        return new Response('Ressource non disponible', { status: 404 });
      })
  );
});

// Notification de mise à jour
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

const CACHE = 'amblyopia-v5';
const FILES = [
  './',
  'index.html',
  'progress.html',
  'whack-a-mole.html',
  'spot-the-difference.html',
  'matching-game.html',
  'maze-game.html',
  'chase-the-light.html',
  'fly-swatter.html',
  'zombie-whacker.html',
  'schulte-grid.html',
  'zombie-schulte-grid.html',
  'blueberry-flash.html',
  'gabor-orientation.html',
  'aloe-detective.html',
  'C1-E-contrast.html',
  'find-fireflies.html',
  'pvz-schulte.html',
  'assets/icons/icon-192.png',
  'assets/icons/icon-512.png',
  'assets/icons/icon-maskable-192.png',
  'assets/icons/icon-maskable-512.png'
];

self.addEventListener('install', function(e) {
  console.log('SW installing...');
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return Promise.all(FILES.map(function(url) {
        return fetch(url).then(function(r) {
          if (r.ok) { cache.put(url, r.clone()); }
        }).catch(function() {});
      }));
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('SW activating...');
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k) { return k !== CACHE; })
        .map(function(k) { return caches.delete(k); }));
    }).then(function() { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(function(r) {
      return r || fetch(e.request).then(function(nr) {
        return nr;
      });
    })
  );
});
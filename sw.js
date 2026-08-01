const CACHE = 'lazyeye-v3';
const PRECACHE = [
  './', './index.html', './assessment.html', './progress.html', './contact.html', './manifest.json', './sw.js', './logo.png',
  './assets/images/qrcode-gzh.jpg',
  './stage-1.html', './stage-2.html', './stage-3.html', './stage-4.html', './stage-5.html',
  './whack-a-mole.html', './spot-the-difference.html', './matching-game.html', './maze-game.html',
  './vernier-line.html', './flash-spotter.html', './chase-the-light.html', './fly-swatter.html',
  './zombie-whacker.html', './schulte-grid.html', './zombie-schulte-grid.html', './dichoptic-dots.html',
  './bubble-chase.html', './fusion-color.html', './blueberry-flash.html', './crowding-breaker.html',
  './gabor-orientation.html', './aloe-detective.html', './C1-E-contrast.html', './find-fireflies.html',
  './depth-pop.html', './depth-order.html', './stereo-match.html', './binocular-puzzle.html'
];

self.addEventListener('install', function(e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function(c) { return c.addAll(PRECACHE); }));
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); }));
    }).then(function() { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  e.respondWith(
    caches.match(req).then(function(cached) {
      if (cached) return cached;
      return fetch(req).then(function(res) {
        if (res && res.ok && res.type === 'basic') {
          var cp = res.clone();
          caches.open(CACHE).then(function(c) { c.put(req, cp); });
        }
        return res;
      }).catch(function() { return caches.match('./index.html'); });
    })
  );
});

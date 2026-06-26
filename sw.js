const CACHE = 'amblyopia-v2';
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
  'manifest.json',
  'assets/icons/icon-192.png',
  'assets/icons/icon-512.png',
  'assets/icons/icon-maskable-192.png',
  'assets/icons/icon-maskable-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});

const cacheName = 'web-cache';
const assetsToCache = [
  './',
  './index.html',
  './games.html',
  './upcoming-games.html',
  './consoles-etc.html',
  './forums-queries-and-faqs.html',
  './about-us.html',
  './css/',
  './img/'
  // other assets
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

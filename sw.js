var cacheName = 'tc-pwa';
var filesToCache = [
  '/',
  '/index.php',
  '/css/style.css',
  '/js/main.js',
  '/js/func.js',
  '/audio/index.mp3'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
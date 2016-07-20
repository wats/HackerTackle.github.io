var dataCacheName = 'hackertackle';
var cacheName = 'hackertackle-13';
var isDebug = true; // キャッシュを無効にする
var filesToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/map.html',
  '/speaker.html',
  '/timetable.html',
  '/5f.svg',
  '/icon.png',
  '/scripts/top.js',
  '/stylesheets/stylesheet.css',
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(e) {
  if(isDebug){
    return fetch(e.request);

  }else{
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }

});

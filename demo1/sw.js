var cacheName = "shell-content_01";

//with file u to chache

var fileToCache = ["/style.css", "index.js", "index.html", "/"];
//Activate Service Worker
self.addEventListener("install", e => {
  console.log("ServiceWorker [Activate]");
  e.waitUntil(caches.open(cacheName).then(function (cache){
      console.log( '[ServiceWorker ] Chaching app')
      return cache.addAll(fileToCache)
  }))
});

//Fetch Request

self.addEventListener("fetch", function(e) {
  console.log("[ServiceWorker] Fetch", e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
self.addEventListener("activate", function(e) {
  console.log("[ServiceWorker] Activate");
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(
        keyList.map(function(key) {
          if (key !== cacheName) {
            console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

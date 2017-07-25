var cacheName="comexperu";
var currentCacheNames = [ cacheName];
var fileToCache = [];

self.addEventListener('install',function(e){
  console.log('serviceWorker Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache){
      console.log('serviceWorker Caching app shell');
      return cache.addAll(fileToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});


// self.addEventListener('fetch', function(e) {
//   console.log('[ServiceWorker] Fetch', e.request.url);
//   e.respondWith(
//     caches.match(e.request).then(function(response) {
//       return response || fetch(e.request);
//     })
//   );
// });

//captura automaticamente y almacenarlas en cahe
// self.addEventListener('fetch', function(e) {
//   console.log('[ServiceWorker] Fetch', e.request.url);
//   e.respondWith(
//     caches.match(e.request).then(function(response) {
//       return response || fetch(e.request).then(function(response){
//         return caches.open(cacheName).then(function(cache){
//           cache.put(e.request, response.clone());
//           return response;
//         });
//       });
//     });
//   );
// });


this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        return caches.open(cacheName).then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});














// self.addEventListener('active',function(e){
//   console.log('servicieWorker Active');
//   e.waitUntil(
//     caches.keys()
//         .then(function (cacheNames) {
//           return Promise.all(
//             cacheNames.map(function (cacheName) {
//               if (currentCacheNames.indexOf(cacheName) === -1) {
//                 return caches.delete(cacheName);
//               }
//             })
//           );
//         })
//   );
// });

//   self.addEventListener('fetch', function(event) {
//     console.log("fetch");
//   event.respondWith(
//     caches.open(cacheName).then(function(cache) {
//       return cache.match(event.request).then(function(response) {
//         var fetchPromise = fetch(event.request).then(function(networkResponse) {
//           cache.put(event.request, networkResponse.clone());
//           return networkResponse;
//         })
//         return response || fetchPromise;
//       })
//     })
//   );
// });

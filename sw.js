var CACHE_NAME = 'bcs-v2';
var urlsToCache = [
    'sw-test/pure-min.css',
    'sw-test/MMBNRoll.jpg',
    'sw-test/Megamansoul_search2.jpg',
    'sw-test/jquery-3.2.0.min.js'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
             }).catch(function(){

            })

    )
});


self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    )

});
self.addEventListener('activate', function(event) {

    var cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
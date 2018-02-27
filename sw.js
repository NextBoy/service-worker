// 保存service worker
let sw = this

sw.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('v1')
            .then(cache => {
                return cache.addAll([
                    '/service-worker/index.html',
                    '/service-worker/test.jpg'
                ])
            })
    )
})


sw.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .catch(() => fetch(event.request))
    )
})


/*
sw.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).catch(function () {
            return fetch(event.request).then(function (response) {
                return caches.open('v1').then(function (cache) {
                    cache.put(event.request, response.clone());
                    return response;
                })
            })
        }).catch(function () {
            return caches.match('/sw-test/gallery/myLittleVader.jpg');
        })
    )
})*/

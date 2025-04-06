self.addEventListener('fetch', (event) => {
    const url = event.request.url;
    if (url.includes('tile.openstreetmap.org')) {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                return cachedResponse || fetch(event.request);
            }),
        );
    }
});

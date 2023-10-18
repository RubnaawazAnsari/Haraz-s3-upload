if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.ww.min.js', { scope: '/' }).then(function (reg) {
    console.log('Registered ', reg);
    if (reg.active) {
      console.log('Registered active', reg.active);
      reg.update();

      reg.addEventListener('fetch', function (event) {
        console.log('Fetched event ', event);
        event.respondWith(
          caches.open('app-assets-cache').then(function (cache) {
            return cache.match(event.request).then(function (response) {
              console.log('Cached response ', response);
              return response || fetch(event.request);
            });
          })
        );
      });

      caches.open('app-assets-cache').then(function (cache) {
        console.log('Cache files ', cache);
        return cache.addAll([
          '/sw.ww.min.js', // Add other files you want to cache
          // ... other files to cache ...
        ]);
      })

      reg.addEventListener('install', function (event) {
        event.waitUntil(
          caches.open('app-assets-cache').then(function (cache) {
            console.log('Cache files ', event);
            return cache.addAll([
              '/sw.ww.min.js', // Add other files you want to cache
              // ... other files to cache ...
            ]);
          })
        );
      });
    }

  }).catch(function (error) {
    // registration failed
    console.log('Registration failed with ', error);
  });
}

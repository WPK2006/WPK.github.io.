const CACHE_NAME = 'wpk-cache-v1';
const ASSETS = [
  '/WPK.github.io/',
  '/WPK.github.io/index.html',
  '/WPK.github.io/manifest.json'
  // Removed the CSS path - add it back once you confirm the actual path
];

// Install
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching assets...');
        return cache.addAll(ASSETS);
      })
      .catch(err => console.error('Cache addAll failed:', err))
  );
  self.skipWaiting(); // Force activation
});

// Activate
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => {
          console.log('Deleting old cache:', k);
          return caches.delete(k);
        })
      )
    )
  );
  return self.clients.claim(); // Take control immediately
});

// Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          console.log('Serving from cache:', event.request.url);
          return response;
        }
        console.log('Fetching:', event.request.url);
        return fetch(event.request);
      })
      .catch(err => console.error('Fetch failed:', err))
  );
});

// service-worker.js

const CACHE_NAME = "my-pwa-cache-v1";
const ASSETS = [
  "./",                // Root
  "./index.html",
  "./styles.css",
  "./app.js",
  "./favicon.ico",
  "./manifest.json",
];

// Install event — cache core assets
self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[ServiceWorker] Caching app shell");
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event — clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activating...");
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[ServiceWorker] Removing old cache:", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch event — network-first strategy with cache fallback
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache the fetched response
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

// Optional: Push notifications
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "New Notification";
  const options = {
    body: data.body || "You have a new message!",
    icon: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/699824cc-3806-47bf-8487-666796a0c2f7.png",
    badge: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/699824cc-3806-47bf-8487-666796a0c2f7.png",
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// Optional: Handle notification click
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/")
  );
});

// Cache name and files to cache
const CACHE_NAME = 'ngss-pwa-cache-v1';
const FILES_TO_CACHE = [
	'/NGSStability/index.html',
	'/NGSStability/manifest.json',
	'/NGSStability/icon.png'
];

// Install event: Cache files
self.addEventListener('install', (event) => {
	console.log('[Service Worker] Install');
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			console.log('[Service Worker] Caching app shell');
			return cache.addAll(FILES_TO_CACHE);
		})
	);
});

// Activate event: Cleanup old caches
self.addEventListener('activate', (event) => {
	console.log('[Service Worker] Activate');
	event.waitUntil(
		caches.keys().then((keyList) =>
			Promise.all(
				keyList.map((key) => {
					if (key !== CACHE_NAME) {
						console.log('[Service Worker] Removing old cache', key);
						return caches.delete(key);
					}
				})
			)
		)
	);
});

// Fetch event: Serve cached content when offline
self.addEventListener('fetch', (event) => {
	console.log('[Service Worker] Fetch', event.request.url);
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		})
	);
});

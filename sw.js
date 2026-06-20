// sw.js

// Geef de cache een naam met een versienummer
const CACHE_NAAM = 'bmi-calculator-cache-v1';

// Lijst van bestanden die gecached worden bij installatie
const TE_CACHEN_BESTANDEN = [
  '/',
  '../mijn-app/index.html',
  '../mijn-app/bmicalculator.html',
  '../mijn-app/recepten.html',
  '../mijn-app/css/style.css',
  '../mijn-app/js/app.js',
  '../mijn-app/js/api.js',
  '../mijn-app/js/bmi.js',
  '../mijn-app/manifest.json',
  '../mijn-app/icons/bmicalc.png',
  '../mijn-app/icons/bmical.png'
];

// Install event: cache openen en bestanden opslaan
self.addEventListener('install', function(event) {
  console.log('SW: installeren...');

  event.waitUntil(
    caches.open(CACHE_NAAM).then(function(cache) {
      console.log('SW: bestanden cachen');
      return cache.addAll(TE_CACHEN_BESTANDEN);
    })
    .then(function() {
      return self.skipWaiting();
    })
  );
});

// Activate event: oude caches verwijderen
self.addEventListener('activate', function(event) {
  console.log('SW: actief');

  event.waitUntil(
    caches.keys().then(function(cacheNamen) {
      return Promise.all(
        cacheNamen
          .filter(function(naam) {
            // houd alleen de huidige cache over
            return naam !== CACHE_NAAM;
          })
          .map(function(naam) {
            console.log('SW: oude cache verwijderen:', naam);
            return caches.delete(naam);
          })
      );
    })
    .then(function() {
      return self.clients.claim();
    })
  );
});


// Fetch event: Cache First strategie
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(cachedResponse) {
      // Zit het in de cache? Geef het terug.
      if (cachedResponse) {
        return cachedResponse;
      }
      // Niet in cache? Haal het van het netwerk.
      return fetch(event.request);
    })
  );
});
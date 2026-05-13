const CACHE = 'switch-v1'
const ASSETS = [
  '/switch-app/',
  '/switch-app/index.html',
  '/switch-app/icon-192.png',
  '/switch-app/icon-512.png',
]

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()))
})

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()))
})

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return
  const url = new URL(e.request.url)
  // Only cache same-origin assets, not Supabase API calls
  if (!url.origin.includes('github.io') && !url.origin.includes('googleapis') && !url.origin.includes('jsdelivr')) return
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      if (res.ok && url.origin.includes('github.io')) {
        caches.open(CACHE).then(c => c.put(e.request, res.clone()))
      }
      return res
    }))
  )
})

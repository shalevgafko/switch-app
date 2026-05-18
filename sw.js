const CACHE = 'switch-v6'
const STATIC = [
  '/switch-app/icon-192.png',
  '/switch-app/icon-512.png',
]

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(STATIC)).then(() => self.skipWaiting()))
})

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return
  const url = new URL(e.request.url)
  if (!url.origin.includes('github.io') && !url.origin.includes('googleapis') && !url.origin.includes('jsdelivr')) return

  if (url.pathname.endsWith('.html') || url.pathname.endsWith('/')) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)))
    return
  }

  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      if (res.ok) {
        const clone = res.clone()
        caches.open(CACHE).then(c => c.put(e.request, clone))
      }
      return res
    }))
  )
})

// ── PUSH NOTIFICATIONS ──
self.addEventListener('push', e => {
  if (!e.data) return
  let data = {}
  try { data = e.data.json() } catch { data = { title: 'switch', body: e.data.text() } }

  const options = {
    body: data.body || '',
    icon: '/switch-app/icon-192.png',
    badge: '/switch-app/icon-192.png',
    tag: data.tag || 'switch-notif',
    data: data.url || 'https://shalevgafko.github.io/switch-app/',
    vibrate: [100, 50, 100],
    requireInteraction: !!data.urgent
  }
  e.waitUntil(self.registration.showNotification(data.title || 'switch ⇄', options))
})

self.addEventListener('notificationclick', e => {
  e.notification.close()
  const url = e.notification.data || 'https://shalevgafko.github.io/switch-app/'
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      const existing = list.find(c => c.url.includes('switch-app'))
      if (existing) { existing.focus(); return }
      return clients.openWindow(url)
    })
  )
})

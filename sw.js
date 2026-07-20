const CACHE='voca-loop-icon-check-v1';
const FILES=['./index.html','./manifest.webmanifest?v=1.1.3-rc.1','./icon-192.png?v=1.1.3-rc.1','./apple-touch-icon-v1.1.3.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(x=>{if(x.ok){const y=x.clone();caches.open(CACHE).then(c=>c.put(e.request,y))}return x}).catch(()=>caches.match('./index.html'))))});

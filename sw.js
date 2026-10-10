// Master Kingdom service worker: offline play after the first successful load.
// To release an update, change VERSION. The new worker waits until the game is
// closed, so a child is never interrupted mid-game.
const VERSION='mk-v4';
const CORE=['./','index.html','manifest.webmanifest','offline.html','icon-192.png','icon-512.png'];
const OPTIONAL=['PressStart2P-Regular.ttf'];
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(VERSION);await c.addAll(CORE);for(const u of OPTIONAL){try{await c.add(u)}catch(_){}}})())});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys()){if(k!==VERSION)await caches.delete(k)}await self.clients.claim()})())});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith((async()=>{
    const hit=await caches.match(r,{ignoreSearch:true});
    if(hit)return hit;
    try{const res=await fetch(r);if(res.ok){const c=await caches.open(VERSION);c.put(r,res.clone())}return res}
    catch(_){return r.mode==='navigate'?((await caches.match('index.html'))||(await caches.match('offline.html'))):Response.error()}
  })());
});

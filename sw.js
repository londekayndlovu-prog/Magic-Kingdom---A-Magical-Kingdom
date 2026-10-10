// Master Kingdom service worker: offline play after the first successful load.
// Updates: pages are fetched from the network first and cached for offline use.
// Change VERSION when you release, so old caches are cleaned up.
const VERSION='mk-v6';
const CORE=['./','index.html','manifest.webmanifest','offline.html','icon-192.png','icon-512.png'];
const OPTIONAL=['PressStart2P-Regular.ttf'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil((async()=>{const c=await caches.open(VERSION);await c.addAll(CORE);for(const u of OPTIONAL){try{await c.add(u)}catch(_){}}})())});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys()){if(k!==VERSION)await caches.delete(k)}await self.clients.claim()})())});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  // Network first so updates arrive quickly; cache is the offline fallback.
  e.respondWith((async()=>{
    try{
      const res=await Promise.race([fetch(r),new Promise((_,rej)=>setTimeout(rej,4000))]);
      if(res&&res.ok){const c=await caches.open(VERSION);c.put(r,res.clone())}
      return res;
    }catch(_){
      const hit=await caches.match(r,{ignoreSearch:true});
      if(hit)return hit;
      return r.mode==='navigate'?((await caches.match('index.html'))||(await caches.match('offline.html'))):Response.error();
    }
  })());
});

// Copies the game files into www/ for Capacitor (Android packaging).
const fs=require('fs');
const items=['index.html','sw.js','offline.html','manifest.webmanifest','icon-192.png','icon-512.png','PressStart2P-Regular.ttf'];
fs.rmSync('www',{recursive:true,force:true});fs.mkdirSync('www');
for(const i of items){if(fs.existsSync(i))fs.copyFileSync(i,'www/'+i)}
console.log('www/ ready');

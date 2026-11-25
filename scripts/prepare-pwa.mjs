import {readFile,writeFile,copyFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const base='/chronicle-history/';
await copyFile('assets/icon.png','dist/app-icon.png');
await writeFile('dist/manifest.webmanifest',JSON.stringify({name:'Chronicle — History through choices',short_name:'Chronicle',id:base,start_url:base,scope:base,display:'standalone',background_color:'#10292b',theme_color:'#10292b',icons:[{src:base+'app-icon.png',sizes:'1024x1024',type:'image/png',purpose:'any'}]}));
let html=await readFile('dist/index.html','utf8');
html=html.replace('</head>',`<link rel="manifest" href="${base}manifest.webmanifest"><link rel="apple-touch-icon" href="${base}app-icon.png"><meta name="theme-color" content="#10292b"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><style>html,body,#root{background:#10292b}body{margin:0}</style></head>`);
html=html.replace('</body>',`<script>if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('${base}sw.js',{scope:'${base}'}).catch(console.warn)})}</script></body>`);
await writeFile('dist/index.html',html);await writeFile('dist/.nojekyll','');
async function files(dir,prefix=''){let out=[];for(const e of await readdir(dir,{withFileTypes:true})){const p=prefix+e.name;if(e.isDirectory())out.push(...await files(dir+'/'+e.name,p+'/'));else if(!p.endsWith('.map')&&p!=='.nojekyll')out.push(p)}return out}
const list=await files('dist');const version=createHash('sha256').update(await readFile('dist/index.html')).digest('hex').slice(0,12);
await writeFile('dist/sw.js',`const CACHE='chronicle-${version}';const FILES=${JSON.stringify(list.map(p=>base+p))};self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('chronicle-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).catch(()=>caches.match('${base}index.html')));return}e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});`);
console.log('Prepared installable PWA with',list.length,'offline assets');

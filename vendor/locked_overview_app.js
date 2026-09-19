/** Gunzips base64 chunks into the locked overview app. */
const base = new URL('.', import.meta.url);
const parts = await Promise.all([0,1,2].map(i => fetch(new URL('./locked_overview_app.b64.'+i+'.txt', base)).then(r=>r.text())));
const bin = Uint8Array.from(atob(parts.join('')), c => c.charCodeAt(0));
const ds = new DecompressionStream('gzip');
let code = await new Response(new Blob([bin]).stream().pipeThrough(ds)).text();
code = code.replace(/from\s+['"]\.\/osgb_wgs84\.js['"]/g, "from '" + new URL('./osgb_wgs84.js', base).href + "'");
code = code.replace(/from\s+['"]three['"]/g, "from '" + new URL('./three.module.js', base).href + "'");
code = code.replace(/from\s+['"]three\/addons\/OrbitControls\.js['"]/g, "from '" + new URL('./OrbitControls.js', base).href + "'");
await import(URL.createObjectURL(new Blob([code], { type: 'text/javascript' })));

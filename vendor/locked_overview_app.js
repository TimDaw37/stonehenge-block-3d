/** Assembles plain parts into the locked overview app module. */
const base = new URL('.', import.meta.url);
const n = 5;
const texts = await Promise.all([...Array(n).keys()].map(i =>
  fetch(new URL('./locked_overview_app.part' + i + '.js.txt', base)).then(r => {
    if (!r.ok) throw new Error('missing part ' + i + ' HTTP ' + r.status);
    return r.text();
  })
));
let code = texts.join('');
code = code.replace(/from\s+['"]\.\/osgb_wgs84\.js['"]/g, "from '" + new URL('./osgb_wgs84.js', base).href + "'");
code = code.replace(/from\s+['"]three['"]/g, "from '" + new URL('./three.module.js', base).href + "'");
code = code.replace(/from\s+['"]three\/addons\/OrbitControls\.js['"]/g, "from '" + new URL('./OrbitControls.js', base).href + "'");
await import(URL.createObjectURL(new Blob([code], { type: 'text/javascript' })));

// locked_overview_app 20260919f — epoch sun/moon (chunk loader)
const __base = new URL('.', import.meta.url).href;
const __N = 12;
async function __load() {
  const parts = await Promise.all(
    Array.from({length: __N}, (_, i) =>
      fetch(new URL(`./locked_overview_app.20260919f.p${i}.txt`, import.meta.url)).then(r => {
        if (!r.ok) throw new Error('missing chunk p'+i);
        return r.text();
      })
    )
  );
  let text = parts.join('');
  text = text.replace(/from\s+['"]\.\/osgb_wgs84\.js['"]/g, `from '${__base}osgb_wgs84.js'`);
  const url = URL.createObjectURL(new Blob([text], { type: 'text/javascript' }));
  await import(url);
}
await __load();

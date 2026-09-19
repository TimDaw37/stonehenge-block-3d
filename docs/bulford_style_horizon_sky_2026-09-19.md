# Bulford-style horizon + sky — 19 Sep 2026

Punchier Salisbury Plain terrain and Bulford-like sky/sun controls on
`locked_overview.html`, without rebuilding the ~18 MB horizon mesh.

## What changed

| Item | Detail |
|------|--------|
| Colours | Hypso × hillshade with **hillshade ve=2** baked into existing vertex colours (positions / normals / indices / extent **unchanged**) |
| Assets | `data/terrain_assets/landscape.png` (+ horizon/near previews) |
| Bake tool | `tools/bake_terrain_colours.py` |
| Lights / fog | `HemisphereLight(0xc9d4e8, 0x3d4a3a, 0.55)` + warm `DirectionalLight` + cool fill; `Fog(0x2a3548, …)`; background `0x2a3548` |
| Sky | Solid sky (no starfield). Sun disc only when Terrain + Sunrise/Sunset |
| Exaggeration | Slider **1–4×**, default **1×**. Scales **terrain Y and stone/lintel Y together** so seats stay. Watermark when >1 |
| Sun | Seasonal placeholder az/alt (midsummer / midwinter / equinox-ish). Prefer true scale (exag→1) when sun shown. Optional ray |
| Locked XY | **Untouched** — `locked_poses` e_m / n_m / yaw_deg not modified |

## How hillshade / hypso was made

1. Keep mesh from `data/terrain_horizon.js` (EA DTM 12 km @ ~40 m + near chip).
2. For each grid, take vertex Y (= OD − origin_od), rebuild elev grid.
3. Hillshade with **vertical exaggeration 2** (azimuth 315°, altitude 45°).
4. Hypsometric chalk-downs palette (deep green → cream ridge) × shade curve.
5. Slight saturation boost; write colours back; export `landscape.png`.

Reference behaviour from Bulford posts-3d (`ref/bulford/index.html` + `landscape.png`): solid sky, exaggeration watermark, sun disc on skyline, true scale preferred with sun.

## Exaggeration behaviour

- Store true-scale Y0 for every terrain vertex and every stone centre / label.
- On slider: `y = y0 * exag`; stone `scale.y = exag` so box height scales with ground.
- When exaggeration > 1.01 → show “Exaggerated — silhouette not to scale”.
- Enabling sunrise/sunset forces exag back to **1×** (Bulford true-scale preference).

## Sun

- Modes: Off / Sunrise / Sunset.
- Day-of-year slider + equinox / solstice buttons.
- v1 uses a simple declination→azimuth seasonal placeholder (not Bulford ephemeris tables).
- Disc sized for ~0.53° solar diameter at a reference range; optional ray from monument centre.

## Hard-refresh

```text
cd .
python -m http.server 8000
```

Open **http://localhost:8000/locked_overview.html** and **Ctrl+F5**.

Then: **Orbit** → **Terrain** → optional exag / sunrise.

`terrain_horizon.js` is ~18 MB — allow a moment to parse.

## Rebuild colours only

```text
python tools/bake_terrain_colours.py
```

Needs `numpy`, `pillow`. Does **not** refetch DTM or rebuild triangles.

## Paths

| Role | Path |
|------|-----|--------|
| Overview | `./locked_overview.html` | `./locked_overview.html` |
| Terrain JS | `data/terrain_horizon.js` | same |
| Landscape PNG | `data/terrain_assets/landscape.png` | same |
| Bulford ref (read-only copy) | `ref/bulford/` | stage if useful |
| Backup | `locked_overview.html.bak-before-bulford-sky-2026-09-19` | — |

## Sync note


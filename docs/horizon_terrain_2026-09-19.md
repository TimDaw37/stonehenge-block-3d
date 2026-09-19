# Horizon terrain — 19 Sep 2026

LiDAR ground mesh so the locked Minecraft boxes sit in a landscape that reaches the **horizon**, ready for sun / stars / sky later.

## Status

- Plan XY + heights **accepted** by Tim (2026-09-19).
- Stones **unchanged**: locked_poses XY locked; Z seating still `site_ground_od` (not retuned by this mesh).
- Rounded / organic stone fork: **not started** (RESUME later only).

## Extent / resolution / LOD

| Layer | Source | Extent | Grid | Cell (approx) | Tris |
|-------|--------|--------|------|---------------|------|
| **Horizon** | EA Lidar Composite DTM 1 m via WCS `SCALEFACTOR=0.025` (~40 m), then subsampled | **12 × 12 km** (~**6 km** radius) around CE/CN **412245.35 / 142194.11** | 220 × 220 | ~54.6 m | **95 922** |
| **Near** | Local 1 m chip `SH_dtm1m.tif` (500 m box) subsampled | 412000–412500 E, 141950–142450 N | 200 × 200 | ~2.5 m | **79 202** |

- Combined when Terrain on: **~175k tris** (under 200k OrbitControls budget; horizon alone &lt;100k).
- Elevation frame (same as overview): `x = E − CE`, `z = −(N − CN)`, `y = OD − origin_od` with **origin_od = 102.588**.

## Paths

| Role | Path |
|------|-----|-------------------|
| Project | `.` | (local clone) |
| Horizon GeoTIFF cache | `(local EA DTM cache; omitted)` | `(local EA DTM cache; omitted)` |
| Near 1 m DTM | `(local EA DTM cache; omitted)` | `(local EA DTM cache; omitted)` |
| Mesh JSON / JS | `data/terrain_horizon.json` / `data/terrain_horizon.js` | same under project |
| Overview | `locked_overview.html` | same |
| Build script | `tools/build_terrain_horizon.py` | same |
| WCS pattern | `projects/.../_lidar_stonehenge.py` + wiltshire `download_ea_dtm.py` | `(local)` / project copies |

WCS endpoint: Environment Agency Lidar Composite DTM 1 m (OGL). Fetch pattern matches `_lidar_stonehenge.py`.

## Viewer wiring

- Toggle **Terrain** in `locked_overview.html` (keeps Top-down / Orbit / Plan).
- Loads `data/terrain_horizon.js` → shaded (hillshade vertex colours) horizon + near meshes.
- **Far clip** / `OrbitControls.maxDistance` raised to **25 000 / 20 000** m so you can look to the horizon.
- **Sky:** hemisphere light + inward hemisphere dome stub; comments `TODO(sun)` / `TODO(stars)` for later.
- FogExp2 softens far ground when Terrain is on.
- Stones still built from `locked_poses` + `site_ground_od` — mesh is visual landscape only.

## Hard-refresh

```text
cd .
python -m http.server 8000
```

Open **http://localhost:8000/locked_overview.html** and **Ctrl+F5**.

Then: **Orbit** → **Terrain**. Dolly out to see Salisbury Plain to ~6 km. Plan underlay can stay on for site; turn Plan off if it fights the near mesh.

`terrain_horizon.js` is ~**18 MB** — allow a moment to parse.

## Rebuild

```text
python tools/build_terrain_horizon.py
```

(Needs `rasterio`, `scipy`, `numpy`; reuses cached GeoTIFF if present.)

## Blockers / notes

- - Backup before this edit: `locked_overview.html.bak-before-horizon-2026-09-19`, `LOCKED.md.bak-before-horizon-2026-09-19`.

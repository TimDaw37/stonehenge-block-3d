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

- Combined when Terrain on: **~175k tris** (under 200k OrbitControls budget; horizon alone <100k).
- Elevation frame (same as overview): `x = E − CE`, `z = −(N − CN)`, `y = OD − origin_od` with **origin_od = 102.588**.

## Paths

| Role | Notes |
|------|-------|
| Mesh JSON / JS | `data/terrain_horizon.json` / `data/terrain_horizon.js` |
| Overview | `locked_overview.html` |
| Build script | `tools/build_terrain_horizon.py` (workshop; not in public tree) |
| DTM cache | Local EA DTM paths omitted from public tree |

WCS endpoint: Environment Agency Lidar Composite DTM 1 m (OGL).

## Viewer wiring

- Toggle **Terrain** in `locked_overview.html`.
- Loads `data/terrain_horizon.js` → shaded horizon + near meshes.
- Far clip / OrbitControls.maxDistance raised for horizon viewing.
- Stones still from `locked_poses` + `site_ground_od`.

## Hard-refresh

```text
python -m http.server 8000
```

Open **http://localhost:8000/locked_overview.html** and **Ctrl+F5**.

`terrain_horizon.js` is ~**18 MB** — allow a moment to parse.

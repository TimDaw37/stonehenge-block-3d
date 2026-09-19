# Platform — how to extend

## Where to change poses

- Source of truth: `data/locked_poses.js` (and twin `data/locked_poses.json`).
- Seating heights: `data/site_ground_od.js` (OD samples under each pose).
- Do **not** silently rewrite locked `e_m` / `n_m` / `yaw_deg` without a new lock snapshot.

## How the viewer loads data

1. Classic scripts: `data/locked_poses.js`, `data/site_ground_od.js` (globals).
2. ES module import map → `vendor/three.module.js`, `vendor/OrbitControls.js` (astronomy-engine is vendored for future date-mode but not imported by the live viewer; moon UI is the standstill dial).
3. Terrain lazy-loads `data/terrain_horizon.js` on first Terrain / sky-body need.

Serve over HTTP from the repo root so relative `./vendor/` and `./data/` paths resolve.

## Extension points (shaped stones fork)

| Layer | Keep | Fork |
|-------|------|------|
| Poses / OD seating | Lock snapshot + JSON | Optional new pose file |
| Box meshes in `locked_overview.html` | Maths / seating | Replace box geometry with shaped meshes |
| Terrain / sun / moon | Reuse | Optional Skyfield bake later |
| HUD | Snapshot `*.lock-*` | Visual polish OK if behaviour preserved |

## Lock snapshots

Before a risky visual change:

```bash
cp locked_overview.html locked_overview.html.lock-YYYY-MM-DD-note
```

Update `LOCKED.md` with the new snapshot name. Keep older locks in git history.

## What this repo deliberately omits

Workshop nudge tools, plan raster embeds (Cleal / Johnson copyrights), payment PDFs, bak/diagnose scripts, per-stone seed JSON sprawl.

## Data twin check (run before commit)

`data/locked_poses.json` must match the object embedded in `data/locked_poses.js`, and the same for `site_ground_od.json` / `.js`.

```bash
python tools/check_data_twins.py
```

Exit 0 = twins match; exit 1 = drift (do not commit until fixed). Also runs in CI via `.github/workflows/check-twins.yml`.

## Mobile HUD

On viewports ≤700px the control panel (`#hud`) defaults collapsed; `#hudToggle` expands/collapses it. Preference persists in `sessionStorage` key `sh_hud_open`. Desktop always shows the panel (toggle hidden).

## Cursor georeference

Hover and pin both show OSGB and WGS84 (same framing as [stonehenge-plan](https://timdaw37.github.io/stonehenge-plan/)). `#geoReadout` raycasts the y=0 origin-OD plane → OSGB36 E/N (scene/plan grid via `CE`/`CN` + `localXZ` inverse) and WGS84 lat/lon (`vendor/osgb_wgs84.js`, Airy TM + Helmert). Not GNSS; Google Earth can sit ~1.5 m east — we do not warp to GE. Short click pins; Escape / Clear pin clears.

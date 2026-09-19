# Lock 2026-09-19 — HUD tidy platform baseline

**Snapshot:** `locked_overview.html.lock-2026-09-19-hud` (byte-identical to `locked_overview.html` at lock time).

## What is locked

- Tidy HUD: short legend, Orbit / Terrain / Labels, Sky body buttons, sun date panel vs moon Most N ↔ Most S azimuth dial.
- Moon via vendored **astronomy-engine**; standstill-season extremes dial (not calendar doy for moon).
- **Ray to centre** checkbox (boot: on with 21 Jun sunrise).
- Horizon **terrain** lazy-load (~18 MB `data/terrain_horizon.js`) — off until Terrain toggle or sky body needs it.
- Boxes on `site_ground_od` seating; pose XY from `locked_poses`.

## How to run

```bash
python -m http.server 8000
```

Open `/locked_overview.html` at `http://localhost:8000/locked_overview.html`.

## Platform role

This lock is the public **platform** for further refinements. Next expected fork: rounded / organic stones — copy this baseline; do not overwrite the lock snapshot.

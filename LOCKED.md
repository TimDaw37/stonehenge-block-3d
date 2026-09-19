# Locked Minecraft-box platform — 19 Sep 2026 HUD tidy baseline

**Current lock:** 19 Sep 2026 — tidy HUD platform baseline  
**Snapshot:** [`locked_overview.html.lock-2026-09-19-hud`](locked_overview.html.lock-2026-09-19-hud)  
**Viewer:** [`locked_overview.html`](locked_overview.html)

This repository is the **public platform** for further refinements (next fork target: rounded / organic stones). Do not treat the boxes as a finished reconstruction claim.

## Roadmap

| # | Item | Status |
|---|------|--------|
| 1 | Moon via astronomy-engine + Most N ↔ Most S azimuth dial | **DONE** (19 Sep 2026) |
| 2 | Horizon terrain (EA LiDAR derived mesh, lazy ~18 MB) | **DONE** (toggle; loads on Terrain / sky body) |
| 3 | Sun seasonal placeholders + ray to centre | **DONE** (platform) |
| 4 | Tighten code + publish GitHub public platform | **DONE** (this repo) |
| 5 | Rounded / shaped stones fork | **NEXT** (fork; keep this lock) |

See also:

- [`docs/LOCK_2026-09-19_hud_platform.md`](docs/LOCK_2026-09-19_hud_platform.md)
- [`docs/LOCK_2026-09-19_overview.md`](docs/LOCK_2026-09-19_overview.md)
- [`PLATFORM.md`](PLATFORM.md)

## Colours

| Colour | Meaning |
|--------|---------|
| Sarsen light elephant-grey | Outer / trilithon sarsens (locked boxes) |
| Bluestone blue-grey `#6b8cae` | Outer circle + horseshoe bluestones |
| Altar pink | Stone 80 (Altar) |
| Cream | Stone 156 |
| Silver markers | Station stones 92 / 94 |
| Gold (medium) | Partial / provisional locks (e.g. 53, 54, 21) |
| Grey seed | Seed-only (154) |

Counts live in the HUD (`data/locked_poses.js`).

## Data contracts

| File | Role |
|------|------|
| `data/locked_poses.js` / `.json` | Locked stone poses (`array` + `by_id`) |
| `data/site_ground_od.js` / `.json` | Per-stone ground OD seating (EA 1 m DTM sample) |
| `data/terrain_horizon.js` | Lazy horizon + near terrain mesh (~18 MB) |

## How to run

```bash
python -m http.server 8000
```

Open `http://localhost:8000/locked_overview.html` (not `file://`).

## Platform note

Keep lock snapshots when forking. Pose XY and seating maths stay locked unless Tim opens a new lock; visual / mesh shape forks should copy this baseline first.

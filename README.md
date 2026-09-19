# stonehenge-block-3d

Locked **Minecraft-box** Stonehenge block-3D platform: stone poses seated on LiDAR ground, optional horizon terrain, and sun / moon rays.

Author: **Tim Daw** ([sarsen.org](https://www.sarsen.org)) · Contact: tim.daw@gmail.com

This is a **platform for forks** (rounded stones, Skyfield bake, etc.), not a finished reconstruction claim.

## Live

Public Pages: [https://timdaw37.github.io/stonehenge-block-3d/](https://timdaw37.github.io/stonehenge-block-3d/) (redirects to `locked_overview.html`).

## Run locally

From the repo root (ES modules + large terrain need HTTP):

```bash
python -m http.server 8000
```

Then open:

[http://localhost:8000/locked_overview.html](http://localhost:8000/locked_overview.html)

Do **not** open via `file://` — the import map and lazy terrain load will fail.

## Defaults (boot)

| Control | Default |
|---------|---------|
| View | **Orbit** |
| Terrain | Off until you toggle **Terrain** (or pick a sky body — loads lazy ~18 MB) |
| Sky | **21 Jun sunrise** |
| Labels | Off |
| Ray to centre | On with sunrise boot |

Import map (relative paths):

```json
{
  "imports": {
    "three": "./vendor/three.module.js",
    "three/addons/": "./vendor/"
  }
}
```

(`vendor/astronomy.esm.js` remains in-tree for a future optional date-mode; live moon UI is the standstill dial — see moon docs below.)

## Colours legend

| Colour | Meaning |
|--------|---------|
| Sarsen grey | Locked sarsen boxes |
| Bluestone blue | Outer + horseshoe bluestones |
| Pink | Altar Stone (80) |
| Cream | Stone 156 |
| Silver | Stations 92 / 94 |
| Gold | Medium / provisional |
| Grey | Seed-only |

## Data contracts

| Path | What |
|------|------|
| [`data/locked_poses.js`](data/locked_poses.js) | Locked poses (`window` export + JSON twin) |
| [`data/site_ground_od.js`](data/site_ground_od.js) | Ground OD seating samples |
| [`data/terrain_horizon.js`](data/terrain_horizon.js) | Horizon terrain (~18 MB) — required for **Terrain** toggle |

## Docs

- [`LOCKED.md`](LOCKED.md) — current lock + roadmap
- [`PLATFORM.md`](PLATFORM.md) — how to extend / fork
- [`docs/LOCK_2026-09-19_hud_platform.md`](docs/LOCK_2026-09-19_hud_platform.md) — HUD platform lock note
- Moon: [`docs/moon_standstill_azimuth_dial_2026-09-19.md`](docs/moon_standstill_azimuth_dial_2026-09-19.md) (**current** dial), [`docs/moon_astronomy_engine_2026-09-19.md`](docs/moon_astronomy_engine_2026-09-19.md) (historical / superseded live-ephemeris note)
- Terrain / sky: [`docs/horizon_terrain_2026-09-19.md`](docs/horizon_terrain_2026-09-19.md), [`docs/bulford_style_horizon_sky_2026-09-19.md`](docs/bulford_style_horizon_sky_2026-09-19.md)

## License

**CC BY-SA 4.0** — Tim Daw. See [`LICENSE`](LICENSE).

Third-party and LiDAR attribution: [`NOTICE.md`](NOTICE.md).

Terrain is **derived** from Environment Agency LiDAR (Open Government Licence — cite EA / OGL as in NOTICE). Original survey copyrights remain with their owners; plan raster embeds are **not** published here.

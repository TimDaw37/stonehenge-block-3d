# stonehenge-block-3d

Locked **Minecraft-box** Stonehenge block-3D platform: stone poses seated on LiDAR ground, optional horizon terrain, and sun / moon rays.

Author: **Tim Daw** ([sarsen.org](https://www.sarsen.org)) · Contact: tim.daw@gmail.com

This is a **platform for forks** (rounded stones, Skyfield bake, etc.), not a finished reconstruction claim.

## Live

## Pages

| URL | Role |
|-----|------|
| [index.html](index.html) / live root | The public viewer. `skyscape.html` and `complete.html` redirect here |
| [locked_stars.html](locked_stars.html) | Backup of the previous live page (stars, before Complete) |
| [stars.html](stars.html) | Same backup |
| [locked_2026-09-22.html](locked_2026-09-22.html) | Earlier backup (22 Sep, before stars) |
| [locked_overview.html](locked_overview.html) | Older backup (21 Sep 2026 AOK) |

Live: https://timdaw37.github.io/stonehenge-block-3d/  
Lock: `live-2026-09-23` (`index.html.lock-2026-09-23`)  
Previous live: https://timdaw37.github.io/stonehenge-block-3d/locked_stars.html (`live-stars`, commit 196c6d0)  
Earlier: https://timdaw37.github.io/stonehenge-block-3d/locked_2026-09-22.html (`live-2026-09-22`)  
Older: https://timdaw37.github.io/stonehenge-block-3d/locked_overview.html (`live-2026-09-21-aok`)

Hover and pin both show OSGB and WGS84 (scene/plan grid, not GNSS; WGS84 converted from that grid). Same framing as [stonehenge-plan](https://timdaw37.github.io/stonehenge-plan/).

## Run locally

From the repo root (ES modules + large terrain need HTTP):

```bash
python -m http.server 8000
```

Then open:

[http://localhost:8000/](http://localhost:8000/)

Do **not** open via `file://` — the import map and lazy terrain load will fail.

## Defaults (boot)

| Control | Default |
|---------|---------|
| View | **Orbit** |
| Terrain | Off until you toggle **Terrain** (or pick a sky body — loads lazy ~18 MB) |
| Sky | **21 Jun sunrise**, with a clock. **Sun's arc** and **Moon's arc** play that passage |
| Epoch | **Modern** (2026). **2500 BC** or a typed year. Pole label is Polaris or Thuban |
| Stars | On. They fade once the sun is up |
| Complete | Off. One click fills the missing stones; fallen stones stay ghosted |
| Newham | Off. Most northerly / Most southerly appear only while it is on |
| Labels | Off until you press **Labels** |
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

The live sky uses `skyscape_sky.js`, which imports `vendor/astronomy.esm.js`. Sun and moon are apparent places for the chosen date and year. Stars are the bright-star list in `data/bright_stars.js`.

## Colours legend

| Colour | Meaning |
|--------|---------|
| Sarsen grey | Locked sarsen boxes |
| Bluestone blue | Outer + horseshoe bluestones |
| Pink | Altar Stone (80) |
| Cream | Stone 156 |
| Bright silver | Stations 92 / 94 (markers only) |
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

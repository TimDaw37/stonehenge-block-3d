# Moonrise / moonset via astronomy-engine (2026-09-19)

## Implemented

Option 1 from the feasibility note: vendored **astronomy-engine** ESM
(`vendor/astronomy.esm.js`, npm `astronomy-engine@2.1.19`) and wired into
`locked_overview.html` through the same importmap pattern as Three.js.

### UI

Mutually exclusive sky-body modes:

- Off | Sunrise | Sunset | Moonrise | Moonset

Shared Date / doy slider (calendar day in **2026** for astronomy-engine).
Ray-from-centre checkbox applies to whichever body is active.
Moon disc is cool silver/white; sun stays warm gold.

### Observer

Stonehenge: lat **51.1789** N, lon **-1.8262** W, height **102** m
(`new Observer(lat, lon, height)`).

### Computation

- `SearchRiseSet(Body.Moon, observer, +1|-1, localMidnight, 1.5)`
- `Equator` + `Horizon(..., 'normal')` for azimuth / altitude (refraction on)
- `Illumination` phase fraction shown in the readout
- Placement reuses `distPastTerrain` + centre ray (same path as sun)

Sun modes remain the existing **seasonal placeholder** (not astronomy-engine yet).

### How to use

1. From project root: `python -m http.server 8000`
2. Hard-refresh `http://localhost:8000/locked_overview.html` (Ctrl+F5)
3. Pick a date; click **Moonrise** or **Moonset**
4. Terrain loads on first body mode (lazy); pale moon disc appears past the sheet

### Accuracy caveats

- Geometric horizon (~0 deg) with library refraction; **not** true
  topographic moonrise over the LiDAR skyline.
- Local-midnight search uses the browser timezone (intended: Europe/London).
- doy maps to 2026 including leap-day handling only if year is leap (2026 is not).
- Some high-latitude / grazing days can return null within the 1.5-day window.
- Angular disc size matches the sun visual scale (not lunar angular diameter).

### Files

- `locked_overview.html`
- `vendor/astronomy.esm.js`
- `docs/moon_astronomy_engine_2026-09-19.md`
- lock snapshot: `locked_overview.html.lock-2026-09-19`

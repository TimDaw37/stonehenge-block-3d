# Epoch choice for sun / moon azimuths (2026-09-19f)

## Why
Rise/set azimuths at Stonehenge shift between today and ~2500 BC mainly because Earth’s **obliquity** ε drifts. Tim wants Modern vs c. 2500 BC (and a free year) without breaking the moon **Most N↔Most S** dial.

## UI
- HUD **Epoch** near Sky: **Modern** (2026) | **c. 2500 BC** (year −2499) + compact year input.
- Helper: `−2499 = 2500 BC` (astronomical year: negative = BC).
- Persists `sessionStorage` key `sh_epoch_year`.
- On change: refresh moon extremes, `placeSun()`, readout includes `epoch <label>`.

## Obliquity
IAU-ish polynomial, T centuries from J2000:

```js
ε = 23.4392911 − (46.8150/3600)T − (0.00059/3600)T² + (0.001813/3600)T³
```

## Sun
`approxSun(doy, mode)` uses `ε = obliquityDeg(epochYear)`:

- `decl = ε · sin(2π · (doy−81)/365)`
- Flat-horizon geometric az at lat **51.1789°**:
  - `x = sin(decl)/cos(lat)` clamped to [−1,1]
  - sunrise az from north: `acos(x)` (deg)
  - sunset: `360 − that`
- Smoke: Modern doy 172 → sunrise ~50.6°, sunset ~309.4° (band 49–52 / 308–311).
- Terrain height is **not** folded into az yet.

## Moon dial
Still **Most N↔Most S**, not day-of-year. Extremes from max lunar declination ≈ `ε + 5.145°` (mean inclination):

- most-N moonrise `acos(sin(dmax)/cos(lat))`
- most-S moonrise `acos(−…)`
- sets mirrored across N–S

Modern geometric moonrise most-N ≈ **40.26°** vs locked 2024–25 scan **40.30°** (Δ 0.04° < 3°) → **no constant offset** (`MOON_AZ_OFFSET_DEG = 0`).

Not GNSS; not live ephemeris.

## Cache bust
`?v=20260919f` · `vendor/locked_overview_app.20260919f.js` (+ `.js` twin).

## Out of scope
- n=90 poses
- georef / mobile HUD behaviour
- true apparent altitude over terrain

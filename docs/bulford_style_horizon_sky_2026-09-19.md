# Bulford-style horizon + sky — 19 Sep 2026

Punchier Salisbury Plain terrain and Bulford-like sky/sun controls on `locked_overview.html`, without rebuilding the ~18 MB horizon mesh.

## What changed

| Item | Detail |
|------|--------|
| Colours | Hypso × hillshade baked into existing vertex colours |
| Lights / fog | Hemisphere + warm directional + cool fill; fog background |
| Sky | Solid sky; sun disc when Terrain + Sunrise/Sunset |
| Exaggeration | True scale preferred with sun |
| Locked XY | Untouched |

## Hard-refresh

```text
python -m http.server 8000
```

Open http://localhost:8000/locked_overview.html and Ctrl+F5. Then Orbit → Terrain.

`terrain_horizon.js` is ~18 MB — allow a moment to parse.

See also `docs/horizon_terrain_2026-09-19.md`.

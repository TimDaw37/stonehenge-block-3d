# Ambient dial + sun/moon shadows (21 Sep 2026)

Terence Meaden’s point: shadows matter. The viewer already aimed a directional key light at the sun disc; ambient/fill washed shadows out, and shadow maps were off.

## Changes
- `renderer.shadowMap` (PCF soft) + `sunLight.castShadow`
- Stones cast/receive shadows (markers do not cast)
- Terrain receives shadows
- **Ambient** slider (0–100%, default 100%, persisted): scales hemisphere + fill. Turn down for dominant sun/moon shadows.
- Moon mode also drives the same key light (cool colour) so lunar shadows work.

Live: https://timdaw37.github.io/stonehenge-block-3d/

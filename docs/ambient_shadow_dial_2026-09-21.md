# Ambient dial + sun/moon shadows (21 Sep 2026)

Terence Meaden’s point: shadows matter. The viewer already aimed a directional key light at the sun disc; ambient/fill washed shadows out, and shadow maps were off.

## Changes
- `renderer.shadowMap` (PCF soft) + `sunLight.castShadow`
- Stones cast/receive shadows (markers do not cast)
- Terrain receives shadows
- **Ambient** slider (0–100%, default 100%, persisted): scales hemisphere + fill. Turn down for dominant sun/moon shadows.
- Moon mode also drives the same key light (cool colour) so lunar shadows work.

Live: https://timdaw37.github.io/stonehenge-block-3d/

## Fix: shadows not visible (same day)

Cause: key light was copied to the sky-disc position (~20 km). DirectionalLight shadow camera `far` was 1200 m, so the monument never entered the shadow map. Transparent stone materials also cast poorly.

Fixes:
- Key light at 280 m along sun/moon direction (disc still far)
- Shadow frustum ±200 m, 4096 map, far 600
- Opaque sarsens/bluestones for casting
- Ground disc (r=180 m) under the site to receive long shadows (Heel → Altar)

## Ambient wash + half-black fix

- Ground lightened (`#b3c49a`); ambient fill floor so turf never goes black.
- Ambient **100%** turns `castShadow` off → shadows disappear.
- Shadow key light uses **true azimuth** but altitude ≥ 14° (dawn gleam was breaking the map into a half-black disc). Sky disc still at true altitude.
- Other dates: `approxSun` schematic follows the date slider; key light + shadows track that az/alt.

## Remove ground disc (same day)

The flat green disc under the circle was showing a hard two-tone sunrise shadow line. Removed the disc entirely (pre-shadow look). Stone↔stone and terrain shadows remain.

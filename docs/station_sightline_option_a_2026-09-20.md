# Station-stone sightline Option A (2026-09-20)

HUD: **Heel Stone axis** (default) vs **Station stone axis**.

When Station stone axis is on, `placeSun()` sets ray origin at the starting station of the Newham rectangle side and uses that side’s live bearing from `locked_poses` 91–94:

| Mode | Side | Origin |
|------|------|--------|
| Moonrise | 94→91 | 94 |
| Moonset | 92→93 | 92 |
| Sunrise | 93→94 | 93 |
| Sunset | 91→92 | 91 |

Heel Stone axis keeps centre origin + astronomical az.

Files: `locked_overview.html` + `vendor/locked_overview_app.js` (external module; cache-bust `stations-sightline-a-20260920`).

Verify: Orbit, Terrain on, Ray on → Station stone axis + Moonrise → ray near 94 and 91.

Option B (static sides + rise animation) not shipped.

# Lintel seat fix — 2026-09-19

Floating lintels (visible air gap over the shorter upright) came from two places:

1. **Viewer `seatZ`** used the **mean** of the two upright tops. It now uses **`Math.max(topA, topB)`** so the lintel underside sits on the taller crown.
2. **Pose heights** for the shorter support in each present pair were lengthened so `uprightTopRel` matches the taller partner (±1 mm).

Uprights lengthened (old → new `height_m`):

| id | old | new | lintel pair |
|----|-----|-----|-------------|
| 1 | 3.96 | 4.23 | 102 with 2 (also levels 101) |
| 30 | 3.96 | 4.104 | 101 with 1 |
| 29 | 3.96 | 4.066 | 130 with 30 (cascade) |
| 7 | 3.96 | 4.113 | 107 with 6 |
| 22 | 3.81 | 3.99 | 122 with 21 |
| 51 | 4.98 | 5.182 | 152 with 52 |
| 58 | 5.18 | 5.212 | 158 with 57 |

Pairs left alone (|Δtop| ≤ 0.05 m): 105 (4/5), 154 (53/54).

Also: HUD **Georef / Coords** toggle (`sessionStorage` `sh_geo_on`, default on); clearer coord help; stale “152/158 not in dataset” comment removed (they are in n=90).

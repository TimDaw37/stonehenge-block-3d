# Newham mode — 91 hole fig1-relative (2026-09-20)

## What went wrong
Absolute Plan1 hole EN **412287.630 / 142174.136** was dropped into a model where stone 91 sits on **fig1**. Plan1 vs fig1 disagree ~**3 m** on the same fallen stone, so the pink ring sat ~**2 m** off the end of the box.

## Fix
Keep Tim’s Plan1 eyeball as an **offset** from the Plan1 fallen pick, apply onto fig1 fallen pose:

| | E | N |
|---|---|---|
| Plan1 fallen pick | 412288.711 | 142173.348 |
| Plan1 hole (approved absolute) | 412287.630 | 142174.136 |
| Offset (hole − Plan1 fallen) | −1.081 | +0.788 |
| Fig1 fallen (model) | 412285.696 | 142173.451 |
| **Hole (fig1-relative, live)** | **412284.615** | **142174.239** |

## Files
- `data/locked_poses.json` — `hole_e_m` / `hole_n_m` on 91
- `data/station91_hole_approved.json`
- cache: `locked_poses.js?v=newham-91hole-fig1rel-20260920`

# Sky accuracy (Tim 19 Sep 2026)

## Live public (now)
- Sky / Epoch remain **schematic**: flat-horizon geometric az from declination.
- No refraction, no lunar parallax, horizon altitude not taken from LiDAR.
- HUD shows an explicit caveat (`#skyCaveat`). Do **not** rebuild sky math on live until the proper path is ready.

## Path A (later — not on live yet)
1. Build horizon altitude vs azimuth from the LiDAR terrain mesh (eye-point at monument centre or chosen station).
2. Use a proper apparent place for Sun/Moon (e.g. astronomy-engine) at the chosen epoch.
3. Apply atmospheric refraction; for Moon include horizontal parallax.
4. Solve rise/set where body altitude meets horizon altitude along that bearing.
5. For standstill extremes, compute an envelope over the standstill window — not ε+5.145° on a flat plane.

## Path B (done on live)
Explanatory text only; Sky defaults remain Off until the user chooses.

# Sky accuracy (Tim 19 Sep 2026)

## Live public (22 Sep 2026)

The disc is placed by `skyscape_sky.js` using `vendor/astronomy.esm.js`: apparent azimuth and altitude, refraction on, lunar parallax for the Moon. Rise and set are the moment the chosen limb meets the Hoyle skyline. The Path A sample is the check shown in the readout, not a second sun.

Years before the modern epoch are proleptic Gregorian. Stellarium uses the Julian calendar by default. For the major lunar standstill in -2498 the same moon position differs by about 3 minutes, which is acceptable.

There is no `#skyCaveat`. The old flat-horizon dial described below is not what the page draws.

## Path A (now the live placement)
1. Build horizon altitude vs azimuth from the LiDAR terrain mesh (eye-point at monument centre or chosen station).
2. Use a proper apparent place for Sun/Moon (e.g. astronomy-engine) at the chosen epoch.
3. Apply atmospheric refraction; for Moon include horizontal parallax.
4. Solve rise/set where body altitude meets horizon altitude along that bearing.
5. For standstill extremes, compute an envelope over the standstill window — not ε+5.145° on a flat plane.

## Path B
Historical. The live page no longer defaults the sky to Off.

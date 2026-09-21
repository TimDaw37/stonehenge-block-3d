# Epoch restore on Newham index (21 Sep 2026)

After Newham promote, Modern / c. 2500 BC epoch controls were missing from live `index.html`.

Restored from `index.html.lock-2026-09-20-pre-newham-promote`:

- Epoch HUD (Modern / c. 2500 BC + year input)
- `epochYear` + sessionStorage `sh_epoch_year`
- `pathAEpochKey` → Path A sample `modern` vs `bc2500` blocks
- Moon standstill envelope + sun solstice sample pick by epoch
- Schematic sun uses `obliquityDeg(epochYear)`
- Newham dual date UI + limbs unchanged

Default: Modern (2026).

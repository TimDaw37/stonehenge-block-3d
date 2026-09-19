# Lock 2026-09-19e — Pages mobile / georef baseline

**Date:** 19 Sep 2026 (evening, Europe/London)  
**Live:** https://timdaw37.github.io/stonehenge-block-3d/  
**Cache-bust at lock:** `?v=20260919e`

## What is locked
- Full-width wrapping Georef readout on mobile; Georef on/off in Controls
- Mobile georef: sample on touch, short tap pins, freeze only after real drag (not OrbitControls start)
- Retractable Controls on narrow viewports
- Stations 92/94 bright silver markers-only
- Lintel seat on max upright top; lengthened short uprights in `locked_poses`
- Plain `vendor/locked_overview_app.*.js` (no gzip pack)
- `index.html` is the real viewer (not a redirect)
- Poses **n = 90**

## Not in this lock
- Sun/moon epoch for ~2500 BC (next)
- Rounded stones fork

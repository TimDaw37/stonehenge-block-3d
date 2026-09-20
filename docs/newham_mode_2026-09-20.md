# Newham mode — single enquiry toggle (2026-09-20)

## Why
Station-stone / Newham rectangle alignments are a **separate enquiry** from general Heel Stone / centre use of the model. One click turns everything Newham-related on or off. **Default = off** (Heel Stone / centre).

## HUD
- **Newham** button (next to Terrain / Labels): toggles rectangle overlay **and** station-origin dual rays together.
- Removed separate Heel / Station axis buttons and the always-on “Station stones” overlay.
- Ray checkbox label: “Ray to centre” (off) / “Ray along Newham sides” (on).

## 91 = stonehole right by fallen stone
Tim 2026-09-20: the alignment is with the stonehole of 91; the megalith has fallen away from it, but the hole is **right by the stone**. **Do not use Cleal Plan1** picks for the Newham corner (Plan1 91 was ~3 m east — wrong for this). Newham corner 91 uses the **fallen-stone pose** EN in `locked_poses` (fig1 ink), same as the visible block.

## Both sets both ways
Long sides (94↔91, 92↔93) are **moon** lines, either direction. Short sides (93↔94, 91↔92) are **sun** lines, either direction. Sky mode draws **two** parallel rays toward that extreme.

## Files
- `locked_overview.html`
- Cache-bust: `locked_poses.js?v=newham-91-by-stone-20260920`

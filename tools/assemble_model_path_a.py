#!/usr/bin/env python3
"""Assemble Path A public files from data/_agent_restore/*.b64.* parts.
Only writes an output when the full expected part set is present and base64 decodes cleanly.
Exits 0 even if some targets are still incomplete so CI can commit what was written.
"""
import base64
import sys
from pathlib import Path

root = Path(__file__).resolve().parents[1]
parts_dir = root / "data" / "_agent_restore"

TARGETS = [
    ("model_path_a.b64.", "model_path_a.html", 7),
    ("sky_events_path_a_hoyle_sample.js.b64.", "data/sky_events_path_a_hoyle_sample.js", 5),
    ("sky_events_path_a_hoyle_sample.json.b64.", "data/sky_events_path_a_hoyle_sample.json", 7),
]

wrote = 0
for stem, outname, expect_n in TARGETS:
    chunks = sorted(
        parts_dir.glob(stem + "*"),
        key=lambda p: int(p.name.rsplit(".", 1)[-1]),
    )
    if not chunks:
        print("skip (none)", stem)
        continue
    indices = [int(p.name.rsplit(".", 1)[-1]) for p in chunks]
    if indices != list(range(expect_n)):
        print(
            f"skip incomplete {stem}: have {indices}, need 0..{expect_n-1}",
            file=sys.stderr,
        )
        continue
    b64 = "".join(p.read_text().strip() for p in chunks)
    try:
        data = base64.b64decode(b64, validate=False)
    except Exception as e:
        print(f"skip decode fail {stem}: {e}", file=sys.stderr)
        continue
    out = root / outname
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_bytes(data)
    wrote += 1
    print("wrote", out, out.stat().st_size)

print("done wrote", wrote)
sys.exit(0)

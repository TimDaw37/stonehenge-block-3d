#!/usr/bin/env python3
import base64
from pathlib import Path
root = Path(__file__).resolve().parents[1]
parts_dir = root / 'data' / '_agent_restore'
for stem, outname in [
  ('model_path_a.b64.', 'model_path_a.html'),
  ('sky_events_path_a_hoyle_sample.js.b64.', 'data/sky_events_path_a_hoyle_sample.js'),
  ('sky_events_path_a_hoyle_sample.json.b64.', 'data/sky_events_path_a_hoyle_sample.json'),
]:
  chunks = sorted(parts_dir.glob(stem + '*'), key=lambda p: int(p.name.rsplit('.',1)[-1]))
  if not chunks:
    print('skip', stem)
    continue
  b64 = ''.join(p.read_text().strip() for p in chunks)
  out = root / outname
  out.parent.mkdir(parents=True, exist_ok=True)
  out.write_bytes(base64.b64decode(b64))
  print('wrote', out, out.stat().st_size)

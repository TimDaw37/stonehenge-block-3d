#!/usr/bin/env python3
"""Ensure JSON / JS data twins match for locked_poses and site_ground_od."""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"

PAIRS = (
    ("locked_poses.json", "locked_poses.js"),
    ("site_ground_od.json", "site_ground_od.js"),
)


def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def extract_js_object(path: Path):
    """Parse the first top-level {...} assigned in a classic script twin."""
    text = path.read_text(encoding="utf-8")
    # Prefer window.NAME = {...}; or const/let/var NAME = {...};
    m = re.search(
        r"(?:window\.[A-Za-z0-9_]+|(?:const|let|var)\s+[A-Za-z0-9_]+)\s*=\s*(\{)",
        text,
    )
    if not m:
        # Fallback: first '{' in file
        start = text.find("{")
        if start < 0:
            raise ValueError(f"{path.name}: no object literal found")
    else:
        start = m.start(1)

    depth = 0
    in_str = None
    esc = False
    for i, ch in enumerate(text[start:], start):
        if in_str:
            if esc:
                esc = False
            elif ch == "\\":
                esc = True
            elif ch == in_str:
                in_str = None
            continue
        if ch in ("'", '"'):
            in_str = ch
            continue
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                return json.loads(text[start : i + 1])
    raise ValueError(f"{path.name}: unbalanced braces while extracting object")


def main() -> int:
    failed = False
    for json_name, js_name in PAIRS:
        jp, sp = DATA / json_name, DATA / js_name
        if not jp.is_file() or not sp.is_file():
            print(f"FAIL: missing twin files: {json_name} / {js_name}", file=sys.stderr)
            failed = True
            continue
        try:
            a = load_json(jp)
            b = extract_js_object(sp)
        except Exception as e:
            print(f"FAIL: {json_name} vs {js_name}: {e}", file=sys.stderr)
            failed = True
            continue
        if a != b:
            print(
                f"FAIL: drift between data/{json_name} and data/{js_name}",
                file=sys.stderr,
            )
            failed = True
        else:
            print(f"OK: {json_name} <-> {js_name}")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())

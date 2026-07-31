#!/bin/bash
# Render all slide_*.html in <post-dir> to 3240x4050 JPGs in <post-dir>/out/
# Usage: bash render.sh <post-dir>
set -euo pipefail

POST_DIR="${1:?usage: render.sh <post-dir>}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$CHROME" ] || { echo "Google Chrome not found at $CHROME"; exit 1; }

cd "$POST_DIR"
mkdir -p out

shopt -s nullglob
slides=(slide_*.html)
[ ${#slides[@]} -gt 0 ] || { echo "no slide_*.html files in $POST_DIR"; exit 1; }

for f in "${slides[@]}"; do
  n=$(echo "$f" | sed -E 's/slide_([0-9]+)\.html/\1/')
  nn=$(printf "%02d" "$n")
  png="out/slide_${nn}.png"
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
    --allow-file-access-from-files \
    --window-size=1080,1350 --force-device-scale-factor=3 \
    --virtual-time-budget=15000 --timeout=30000 \
    --screenshot="$png" "file://$(pwd)/$f" 2>/dev/null
  sips -s format jpeg -s formatOptions 92 "$png" --out "out/slide_${nn}.jpg" >/dev/null
  rm -f "$png"
  echo "rendered out/slide_${nn}.jpg"
done
echo "done: ${#slides[@]} slides in $POST_DIR/out"

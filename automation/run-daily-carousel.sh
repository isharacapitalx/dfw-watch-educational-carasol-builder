#!/bin/bash
set -euo pipefail

DIR="/Users/ishantd/Documents/Claude/REALTOR/Carasol builder"
cd "$DIR"

PROMPT="$(cat "$DIR/automation/daily-carousel-prompt.txt")"
LOG="$DIR/automation/logs/$(date +%Y-%m-%d_%H%M).log"
PROGRESS="$DIR/automation/logs/progress.log"

# Deterministic start marker, written by the shell (not the model) so it's
# always there the instant the job fires, before Claude produces anything.
echo "[$(date '+%H:%M:%S')] 0% - Job started (pid $$), log: $(basename "$LOG")" > "$PROGRESS"

# Bash is scoped to only the render script (not a blanket grant) so this
# unattended job can render but can't run arbitrary shell commands.
EXIT_CODE=0
/usr/local/bin/claude -p "$PROMPT" \
  --allowedTools "WebSearch,WebFetch,Read,Write,Edit,Glob,Grep,TodoWrite,Skill,Agent,Artifact,mcp__Apify__*,Bash(bash .claude/skills/carousel-edit/scripts/render.sh*)" \
  --output-format text \
  > "$LOG" 2>&1 || EXIT_CODE=$?

# Deterministic end marker too, in case the model never wrote its own 100% line.
echo "[$(date '+%H:%M:%S')] SHELL: claude process exited with code $EXIT_CODE" >> "$PROGRESS"

echo "Done: $LOG"

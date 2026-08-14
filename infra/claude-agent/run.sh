#!/bin/sh
# Wraps every Claude Code CLI invocation so it's captured to a durable
# transcript, even though this container has its own unrestricted tool
# access (no per-action approval gate) — the transcript is the audit trail
# for this path, standing in for the structured audit rows the main
# AIwebmaster propose/approve pipeline gets for free.
set -e

mkdir -p /transcripts
STAMP=$(date -u +%Y%m%dT%H%M%SZ)
LOG="/transcripts/${STAMP}.jsonl"

echo "[claude-agent] transcript: $LOG"
exec claude -p "$*" --output-format stream-json 2>&1 | tee "$LOG"

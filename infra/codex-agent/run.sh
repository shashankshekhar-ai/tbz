#!/bin/sh
# Wraps every Codex CLI invocation so it's captured to a durable transcript,
# even though this container has its own unrestricted tool access (no
# per-action approval gate) — the transcript is the audit trail for this
# path, standing in for the structured audit rows the main AIwebmaster
# propose/approve pipeline gets for free. Mirrors infra/claude-agent/run.sh.
#
# --dangerously-bypass-approvals-and-sandbox: this container IS the sandbox
# (own network, no docker socket, no .env/.git, only apps/* bind-mounted) —
# Codex's own nested approval/sandbox prompts would just hang with no TTY to
# answer them non-interactively, so they're disabled here in favor of the
# outer container boundary (flag confirmed against `codex exec --help` on
# @openai/codex 0.147.0; re-check on upgrade).
# Set $RESUME_ID to resume a prior conversation (Agent Terminal multi-turn
# sessions) instead of starting a new one — `codex exec resume <id> "<prompt>"`
# is a distinct subcommand, not a flag on plain `codex exec` (confirmed via
# `codex exec resume --help`).
set -e

mkdir -p /transcripts
STAMP=$(date -u +%Y%m%dT%H%M%SZ)
LOG="/transcripts/${STAMP}.jsonl"

echo "[codex-agent] transcript: $LOG"
if [ -n "$RESUME_ID" ]; then
  exec codex exec resume "$RESUME_ID" --json --dangerously-bypass-approvals-and-sandbox "$*" 2>&1 | tee "$LOG"
else
  exec codex exec --json --dangerously-bypass-approvals-and-sandbox "$*" 2>&1 | tee "$LOG"
fi

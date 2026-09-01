#!/bin/sh
# Wraps every Claude Code CLI invocation so it's captured to a durable
# transcript, even though this container has its own unrestricted tool
# access (no per-action approval gate) — the transcript is the audit trail
# for this path, standing in for the structured audit rows the main
# AIwebmaster propose/approve pipeline gets for free.
#
# --permission-mode bypassPermissions: without this, -p (non-interactive)
# mode blocks on tool-use approval prompts with no TTY to answer them —
# confirmed by testing (`claude -p ... --output-format stream-json` alone
# hangs on the first file-edit/bash call). Safe here because this container
# IS the sandbox boundary (own network, no docker socket, no .env/.git).
# --verbose: --output-format=stream-json requires it in --print mode
# (confirmed via `claude -p ... --output-format stream-json`, which errors
# "requires --verbose" without it — not documented in --help).
#
# Set $RESUME_ID to resume a prior conversation (Agent Terminal multi-turn
# sessions) instead of starting a new one.
set -e

# Claude Code writes account/OAuth state to ~/.claude.json — a *file*
# directly in $HOME, distinct from ~/.claude/ (a directory), which is the
# only thing the claude_agent_home volume actually mounts. Without this
# symlink, login "succeeds" but ~/.claude.json is lost the moment the
# --rm container exits, and `claude auth status` reports loggedIn:false on
# every subsequent run even though ~/.claude/.credentials.json (which IS
# persisted) has real tokens in it — confirmed by testing.
if [ ! -e "$HOME/.claude.json" ]; then
  ln -sf "$HOME/.claude/.claude.json" "$HOME/.claude.json"
fi

# `docker compose run --rm claude-agent auth login` (see infra/claude-agent/
# README.md) needs the real interactive CLI, not the -p-wrapped/transcript
# path below — pass auth/--help straight through.
case "$1" in
  auth|--help|-h)
    exec claude "$@"
    ;;
esac

# One-shot structured-JSON query mode — AIwebmaster's chat agent asking a
# question, not a coding task. Distinct from the default path below:
# --permission-mode plan (read-only, no file-edit/bash execution — this call
# has no business touching the workspace), --output-format json (one clean
# result object instead of a stream to reassemble), no transcript (nothing
# to audit — the answer becomes a proposed action that already goes through
# AIwebmaster's own propose/approve/audit pipeline once parsed out).
# $QUERY_SYSTEM_PROMPT/$QUERY_MODEL/$QUERY_EFFORT come in as env vars, not
# argv, so a large system prompt doesn't blow argv limits or leak into
# `docker compose ps`/process-listing output.
if [ "$QUERY_MODE" = "1" ]; then
  exec claude -p "$*" \
    --output-format json \
    --permission-mode plan \
    --model "${QUERY_MODEL:-sonnet}" \
    --effort "${QUERY_EFFORT:-low}" \
    --system-prompt "$QUERY_SYSTEM_PROMPT"
fi

mkdir -p /transcripts
STAMP=$(date -u +%Y%m%dT%H%M%SZ)
LOG="/transcripts/${STAMP}.jsonl"

echo "[claude-agent] transcript: $LOG"
if [ -n "$RESUME_ID" ]; then
  exec claude -p "$*" --resume "$RESUME_ID" --output-format stream-json --verbose --permission-mode bypassPermissions 2>&1 | tee "$LOG"
else
  exec claude -p "$*" --output-format stream-json --verbose --permission-mode bypassPermissions 2>&1 | tee "$LOG"
fi

# claude-agent — isolated Claude Code CLI sandbox

Full agentic tool access (its own file-edit/bash), structurally cut off from
prod — see `docker-compose.yml`'s `claude-agent` service comment and
`docs/planning/14_DECISION_LOG.md` (v6 addendum) for what "isolated" means
here and why.

## First-time login (browser/device-code, no API key needed)

Uses your existing Claude subscription's included usage instead of separate
per-token API billing. Leave `ANTHROPIC_API_KEY` unset in `.env` for this.

```sh
docker compose run --rm claude-agent auth login
```

No browser exists inside the container, so `claude` prints a URL — open it
on any device, sign in, done. The session is saved to the `claude_agent_home`
volume and persists across future runs (each `docker compose run` is a fresh
container, but that volume isn't). Don't override `--entrypoint` for this —
`run.sh` passes `auth`/`--help` straight through to the real CLI itself (see
its comments); overriding the entrypoint skips `run.sh`'s
`~/.claude.json` symlink setup and the login gets silently lost the moment
the container exits (hit this for real during initial setup — `claude auth
status` kept reporting `loggedIn: false` even after a completed login).

## Everyday use

```sh
docker compose run --rm claude-agent "add a loading spinner to the contact form"
```

Every invocation's full transcript is written to the `claude_agent_transcripts`
volume (`/transcripts/<timestamp>.jsonl` inside the container) — that's the
audit trail for this path, since it has no per-action approval/RBAC gate the
way AIwebmaster's own actions do.

## Promoting changes

This sandbox only touches files under `apps/web`, `apps/cms`, `apps/api`,
`apps/aiwebmaster` on the dev checkout. To commit, redeploy dev containers,
or publish to production, use AIwebmaster's existing `git`/`docker`/`publish`
actions (chat or Users/System pages) — those still go through the full
propose → approve → RBAC → audit pipeline. This sandbox deliberately has no
`.git`, no docker socket, and no route to prod, so it can't do any of that
itself.

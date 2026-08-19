# codex-agent — isolated OpenAI Codex CLI sandbox

Full agentic tool access (its own file-edit/bash), structurally cut off from
prod — same isolation model as `infra/claude-agent/`, see
`docker-compose.yml`'s `codex-agent` service comment and
`docs/planning/14_DECISION_LOG.md` for what "isolated" means here and why.

## First-time login (browser/device-code, no API key needed)

Uses your existing ChatGPT Plus/Pro subscription's included usage instead of
separate per-token API billing. Leave `OPENAI_API_KEY` unset in `.env` for
this.

```sh
docker compose run --rm --entrypoint codex codex-agent login --device-auth
```

No browser exists inside the container, so `codex login --device-auth`
prints a URL + code — open the URL on any device, enter the code, sign in,
done. The session is saved to the `codex_agent_home` volume and persists
across future runs (each `docker compose run` is a fresh container, but
that volume isn't).

## Everyday use

```sh
docker compose run --rm codex-agent "add a loading spinner to the contact form"
```

Every invocation's full transcript is written to the `codex_agent_transcripts`
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

## Which sandbox for which job

AIwebmaster's `codegen_agent` action routes each request to `claude-agent` or
`codex-agent` automatically (`core/codegen_router.py`) — you don't normally
invoke either sandbox by hand. Manual `docker compose run` (above) is for
direct dev-machine use outside the AIwebmaster UI.

# 14 — Decision Log

Use this file to prevent Claude/Codex from guessing stakeholder decisions.

## D1 — Assessment naming

### Options

- AESOP
- AI Readiness Assessment
- AI Maturity Index
- AI Readiness Diagnostic

### Current status

Decided: **AI Readiness Assessment**. Route slug (`assessment`) already matches — no URL change needed.

### Why it matters

Impacts:

- route names
- CMS block names
- UI copy
- HubSpot fields
- report title
- analytics labels

### Recommended temporary technical name

Use internal key:

```txt
assessment
```

Do not expose public label until approved.

---

## D2 — Columbus MVP scope

### Options

1. Preserve Columbus as CTA/widget only
2. Route Columbus webhook into FastAPI during MVP
3. Build deeper Columbus automation later

### Current status

Needs confirmation because source docs are not fully consistent.

### Recommendation

MVP:

- Keep Columbus visible.
- Build FastAPI webhook as a stub or real endpoint if credentials are available.
- Full agentic routing remains Phase 3.

---

## D3 — Our AI Return naming

### Options

- Our AI Return
- Our ROI
- Proof of Impact
- Client Outcomes

### Current status

Needs Paige approval.

### Recommendation

Use `Our AI Return` or `Proof of Impact`. Avoid `Our ROI` if brand rules say ROI is internal-only.

---

## D4 — MailerLite vs HubSpot nurture

### Current status

Conflict in source docs.

### Recommendation

Confirm whether HubSpot replaces MailerLite or MailerLite remains for short-term nurture.

Implementation should abstract email/nurture provider behind a service so this can change later.

---

## D5 — AI Fluency phase structure

### Current plan

One page, one URL, with Phase 1 and Phase 2 as distinct sections.

### Risk

If stakeholder wants phase distinction removed entirely, that conflicts with existing brand/KG rule.

### Recommendation

Keep phases visually equal, do not imply Phase 1 is inferior.

---

## D7 — AI provider abstraction

### Current status

Decided: dynamic, not locked to Anthropic. `AI_PROVIDER` env var (`anthropic` default, or `gemini`) picks the backend at runtime for every agent (assessment scoring, lead follow-up, Page Agent, Content Agent). Both `ANTHROPIC_API_KEY` and `GEMINI_API_KEY` can be configured simultaneously; the env var just selects which is live.

### Why

Exploring a Google/Gemini collaboration — want the option to run on Gemini without a rebuild once that's confirmed.

### Implementation

- `apps/api/core/ai_provider.py` (`structured_call()`) and `apps/cms/src/lib/aiProvider.ts` (`runAgentTurn()`) — one abstraction per language, each callable with a JSON-schema-style input schema and returning a validated dict/object regardless of provider.
- Anthropic path: forced tool-use (`tool_choice`), as before.
- Gemini path: `response_mime_type: application/json` + `response_schema`, with a schema converter (JSON Schema lowercase types → Gemini's uppercase OpenAPI-subset types). Range/length constraints (min/max, minLength) aren't enforced by Gemini's schema — those stay enforced by the existing pydantic/zod validation on the caller's side either way.
- All 4 call sites (`ai_scoring.py`, `lead_agent.py`, `pageAgent.ts`, `contentAgent.ts`) now go through the abstraction instead of an SDK directly — swapping providers again later (or adding a third) means touching one file, not four.

## D8 — GEO (Generative Engine Optimization)

### Current status

Decided: add GEO alongside classic SEO, not instead of it. Baseline shipped:

- Organization JSON-LD sitewide (`apps/web/app/layout.tsx`, `lib/jsonLd.ts`), sourced from CMS SiteSettings.
- BlogPosting JSON-LD on Insights posts.
- `/llms.txt` — markdown site index for LLM crawlers (llmstxt.org convention), listing core pages + CMS pages + blog posts with their `aiSummary` where set.
- `robots.ts` — explicit allow rules for GPTBot, ChatGPT-User, ClaudeBot, Claude-Web, PerplexityBot, Google-Extended, CCBot (the wildcard rule already covered them; this makes intent explicit).
- New `aiSummary` field in the `seo` group on Pages, Posts, Resources, CaseStudies — a direct, quotable 2-3 sentence summary meant for AI answer engines to cite verbatim, distinct from the meta description (which is written to earn a click, not to be extracted).

### Not done — needs content/analytics decisions, not just code

- Answer-first content structure on Insights posts (editorial rewrite, not a code task).
- Author/credibility schema (Person schema, bios) — generative engines weight authority in answer synthesis.
- `aiSummary` field is empty on all existing content until an editor fills it in — the CMS field exists, nothing populates it automatically.
- GEO-specific analytics (referrer tracking from chat.openai.com / perplexity.ai / gemini.google.com) — blocked on an analytics tool being chosen at all (nothing wired up yet).

## D6 — Solomon low-cost product

### Current recommendation

Do not create a low-cost product under Solomon name.

### Reason

It weakens Solomon exclusivity and creates pricing-anchor confusion.

### Alternative

Create a separately named readiness toolkit or diagnostic.

## D9 — AIwebmaster (standalone ops+content agent)

### Current status

Decided: a third agent, "AIwebmaster," built as a standalone service (`apps/aiwebmaster`, FastAPI) rather than extended into the CMS's Page Agent / Content Agent. Same propose → human-approve pattern as those two, but covers a wider action surface: content (delegates to the existing `pageAgent`/`contentAgent` CMS apply endpoints), nav links (new `apps/cms/src/endpoints/navigation.ts`, route `/api/nav-link/upsert` — closes the gap where a page could exist with no nav row pointing at it), git commit/push, docker rebuild/redeploy, and raw SQL. Nginx and OS/system-update actions are draft-only in v1 — the agent explains the command, never runs it — since the host runs 60+ unrelated containers at 88% disk and nginx isn't even containerized in this repo (`infra/nginx/` is empty, config is host-side or unconfigured).

### Why standalone, not inside the CMS admin panel

The CMS (`cms`) container is public-facing, runs non-root, and has zero docker/host access today (confirmed: no `child_process` usage anywhere in the repo before this, no docker socket mounted). Giving that process a docker socket, repo write access, and SSH deploy keys to satisfy AIwebmaster's scope would materially widen its attack surface. AIwebmaster instead runs as its own compose service, bound to `127.0.0.1` only (not publicly reachable), authenticated by a single shared bearer token (`AIWEBMASTER_TOKEN`) rather than Payload/Clerk auth — it's a single-operator tool, not a multi-user editor surface.

### Implementation

- `apps/aiwebmaster/core/ai_provider.py` + `aiwebmaster_agent.py` — same `AI_PROVIDER`-switched structured-call pattern as the other two agents (see D7), one `propose_actions` tool returning a list of typed actions.
- `apps/aiwebmaster/core/executors.py` — one function per executable action type (`git`, `docker`, `sql`, `content`, `nav_link`), only ever invoked after a human clicks Run in the UI (`routers/actions.py`). SQL executor refuses unscoped `DROP`/`TRUNCATE`/`DELETE` (no `WHERE`) even with approval.
- `apps/aiwebmaster/db/audit.py` — every proposed and every executed action logged to an `aiwebmaster_audit` table in `tbg_api`.
- Calls into the CMS's existing `pageAgent`/`contentAgent`/`navigation` apply endpoints authenticate via a new `x-service-token` header (`CMS_SERVICE_TOKEN`, checked in those endpoints' `requireAdmin` helper alongside the existing `req.user` check) since AIwebmaster has no Payload session.
- `docker-compose.yml` — new `aiwebmaster` service, `127.0.0.1:8010` only, mounts `/var/run/docker.sock` and the repo root (`.:/repo`) for git/docker actions. No deploy SSH key is provisioned yet — `git push` requires generating a dedicated key and adding it as a GitHub deploy key (documented in `apps/aiwebmaster/.env.example`), a manual one-time step.

### v2 addendum — multi-user login + RBAC

Single shared token replaced with AIwebmaster's own login system (independent of Payload/Clerk): `apps/aiwebmaster/auth/` — `aiwebmaster_users` table (email/bcrypt hash/role) in `tbg_api`, signed `itsdangerous` session cookies, one super_admin seeded on first boot from `AIWEBMASTER_ADMIN_EMAIL`/`PASSWORD`. Four roles: `docker_ops` (docker, git), `ui_editor` (content, nav_link), `infra_admin` (docker, git, sql), `super_admin` (all + `user_management` + `publish`). Enforcement happens server-side in `routers/actions.py` regardless of what the LLM proposes in chat — the LLM can suggest anything, `/actions/run` always re-checks the caller's role.

Also added: `core/context.py::build_site_context()` injects a static knowledge doc (`apps/aiwebmaster/AGENT_CONTEXT.md` — stack layout, content model, brand conventions, safety rules) plus a live snapshot (current CMS pages/posts/nav + `docker compose ps`) into every chat turn, so proposals are grounded in real site state.

Two infra gotchas hit and fixed while wiring the `docker`/`publish` actions, worth remembering for any future container that needs to run `docker compose` against the host daemon via the mounted socket: (1) Debian trixie's `docker.io` apt package ships only `dockerd`, no client and no compose plugin — both fetched as static binaries directly (`download.docker.com` / GitHub releases) in `apps/aiwebmaster/Dockerfile`. (2) `docker compose ps` silently returns zero rows if the container's cwd doesn't literally match the `working_dir` label recorded when the stack was created from the host — fixed by always passing `-p rewamped-site` to pin the project name explicitly, which bypasses that check.

### v3 addendum — dev/prod publish pipeline + structured content browser

Added a second local stack, same host, for production (`docker-compose.prod.yml`: `cms-prod`/`web-prod`/`api-prod`, ports 3103/3102/8003, separate `tbg_cms_prod`/`tbg_api_prod` databases on the same Postgres instance — not a separate server, per user's confirmed choice; revisit if a real external host ever enters the picture). New `publish` action (`core/executors.py::run_publish`, super_admin only): `pg_dump`/`pg_restore --clean` promotes the dev CMS database as a full snapshot, then builds+redeploys the `-prod` compose services from current source. No per-document diffing in v3 — whole-DB promote only.

Also added `apps/aiwebmaster/routers/browse.py` + `static/browse.html` — a structured app→content-type→existing-item(or new)→edit picker, proxying the CMS's own public read REST API for listing/prefilling, submitting straight to the existing `/api/actions/run` (same propose-preview-Run/RBAC/audit pipeline, no LLM round-trip needed for routine field edits). Chat stays available alongside it for freeform/cross-cutting requests.

### v4 addendum — security hardening + Auth0 SSO

Hardening pass (user: "fill the gap" after I flagged risks vs. a strict "enterprise" bar):

- **Login rate limiting** (`auth/rate_limit.py`) — 5 failed attempts per email locks out for 15 minutes. In-memory (single-process, single-operator tool — a restart clearing it is an acceptable trade-off here, not a production auth system serving thousands of users).
- **Session revocation** — `aiwebmaster_users.session_epoch` (new column) is embedded in every signed session cookie; `create_user()`'s upsert increments it on every password (re)set, which is now the mechanism for revoking a compromised session: reset the password (via `user_management` or the Users page), every existing cookie for that account stops working immediately (`auth/deps.py` compares cookie epoch to the DB's current value).
- **Append-only audit trail** — `db/audit.py::log_event` now dual-writes every row to a JSONL file (`/app/data/audit.log`, mounted volume) in addition to the `aiwebmaster_audit` table. Not true WORM storage, but a `super_admin` with `sql` access editing/deleting a DB row no longer erases the trail.
- **Publish backup + rollback** — `run_publish` now `pg_dump`s the *current* prod DB to `/app/data/backups/prod_cms_<timestamp>.sql` before overwriting it (keeps last 5), and a new `rollback` action (super_admin only) restores the most recent backup + restarts `cms-prod`. Undoes a bad *content* promote; a bad *code* publish still needs a fresh `code_edit` + `publish`, rollback doesn't revert code/images.

Still explicitly NOT done (flagged, not silently skipped): no secrets vault (AI provider keys sit plaintext in `tbg_api`), no MFA on the password-login path, no rate limiting beyond login, single shared Postgres instance for dev+prod.

**New `code_edit` action type** (infra_admin/super_admin) — lets AIwebmaster edit or create arbitrary repo files, the capability gap identified when the user asked about changing the header logo (hardcoded in `HeaderNav.tsx`, not CMS-driven) and the Contact page (hardcoded Next.js route, not a CMS `pages` doc). Two modes: `edit` (exact-match `old_string`/`new_string`, fails loudly — no match or >1 match — rather than guessing wrong) and `write` (full file content, for new files). Blocklists `.env` and `.git/` even with approval. Paired with a new read-only `GET /api/files/read` endpoint + a `/read <path>` chat command, since the agent has no file-browsing tool of its own and needs real file content before it can propose an accurate `old_string`.

**Auth0 SSO** (`auth/auth0_oauth.py`, optional — password login is unaffected and stays the default) — standard authorization-code flow against Auth0's own `/authorize`, `/oauth/token`, `/userinfo` endpoints. Explicitly NOT self-service signup: a valid Auth0 login for an email with no matching `aiwebmaster_users` row is rejected. Considered and rejected in the same conversation: Google OAuth (Google requires HTTPS redirect URIs except for `localhost`, a blocker for LAN access — built, then reverted before shipping when the user pivoted to Auth0, which has no such restriction) and Clerk (already partially configured in `apps/api` but unused; user chose Auth0 instead once comparing options).

**Follow-up, explicitly deferred**: user wants Auth0 wired into the CMS (Payload admin) too, "for both." Payload has no first-party Auth0 strategy — would need a custom OIDC auth strategy on the `Users` collection, a materially separate piece of work from AIwebmaster's side (different codebase, different auth primitives). Scoped out of this pass on purpose (session already very long, risk of leaving CMS admin login half-broken) — tracked here as the next thing to pick up, not forgotten.

### v5 addendum — UI rewrite: Tailwind + Chart.js

User called the hand-rolled inline-CSS UI "unprofessional," asked for a proper Tailwind design system with graphs, enterprise-grade. Rebuilt all 6 pages (login, chat, browse, users, system, settings):

- **Tailwind via CDN** (`cdn.tailwindcss.com`) — no build step, consistent with this service's zero-Node-toolchain nature. Shared config (`static/assets/theme.js`, loaded before the CDN script) defines the brand color palette as Tailwind tokens (`brand.navy`/`gold`/`teal`/`terracotta`/etc.) plus custom keyframe animations (`fade-in-up`, `fade-in-left`, `pop-in`, `pulse-dot`) — one design-token source instead of copy-pasted `<style>` blocks per page.
- **Shared sidebar component** (`static/assets/sidebar.js`) — `mountShell(activePath)` renders the nav/user-card shell and fetches `/api/me` once, used identically by all 5 authenticated pages instead of duplicating ~40 lines of markup per file.
- **Chart.js** (CDN) added where numbers are better read as shapes: Users page gets a role-distribution donut; System page gets a top-containers-by-CPU bar chart + a disk-usage donut, both live-updating on the existing 10s poll.
- Motion throughout: staggered fade-ins on lists/cards, a typing indicator in chat, skeleton loading states before data arrives, hover/active micro-interactions on buttons and cards.

Verified: all 6 routes return 200, both shared asset files serve via a new `/assets` `StaticFiles` mount, every page's inline `<script>` block passes a Node syntax check.

### v6 addendum — isolated Claude Code CLI sandbox

User wants to use the Claude Code CLI directly (full agentic tool access — its own file-edit/bash, not our propose→approve action-type system) for dev work. Flagged the real risk: without technical isolation, "dev only" is just a prompt instruction, not a boundary — the main `aiwebmaster` container already holds prod DB URLs and the docker socket (needed for its own `publish`/`docker` actions), so an unrestricted agent in that same container *could* reach prod regardless of what it's told.

Built genuine isolation instead of a policy note: new `claude-agent` compose service (`infra/claude-agent/`), structurally cut off from prod:
- Own docker network (`sandbox`), not attached to any other service — cannot resolve or route to `postgres`/`cms-prod`/etc even under a compromised or malicious prompt. Verified: `getent hosts postgres` fails.
- No docker socket mounted — verified absent.
- No root `.env`, no `docker-compose*.yml`, no `infra/` — only `apps/web`, `apps/cms`, `apps/api`, `apps/aiwebmaster` bind-mounted read-write. Verified: `.env` not found anywhere in the container.
- No `.git` present in the mounts (only subdirectories, not repo root) — no git commit/push capability from inside; that still routes through the existing audited `git` action.
- Every transcript captured to a mounted volume (`claude_agent_transcripts`) via a wrapper entrypoint (`run.sh`, `claude -p ... --output-format stream-json | tee /transcripts/<timestamp>.jsonl`) — since this path has no per-action audit row, the full session transcript is the audit trail instead.

Not a long-running service — invoked on demand: `docker compose run --rm claude-agent "<prompt>"`. Promotion path unchanged: dev changes reviewed here, then `git`/`docker`/`publish` actions (still gated by AIwebmaster's existing RBAC + approval + audit) move them to production. Requires `ANTHROPIC_API_KEY` set in root `.env` (not yet set as of this session — user needs to add it before first use).

### v7 addendum — `codegen_agent` action: wiring the sandbox into the chat pipeline, + Codex CLI as a second tool

The v6 sandbox sat unused — nothing in AIwebmaster's action system ever invoked it. User asked to replace `code_edit`'s hand-guessed-diff approach with real coding agents (Claude Code and OpenAI Codex CLI both), letting something *other than the main chat model* decide which tool handles a given request.

**New `infra/codex-agent/`** mirrors `infra/claude-agent/` exactly for isolation: own `sandbox` network only, no docker socket, no root `.env`, no `.git`, same 4 read-write bind-mounts (`apps/web`, `apps/cms`, `apps/api`, `apps/aiwebmaster`), `codex_agent_home`/`codex_agent_transcripts` volumes standing in for `claude_agent_home`/`claude_agent_transcripts`. `run.sh` wraps `codex exec --json --dangerously-bypass-approvals-and-sandbox "<prompt>"` — Codex CLI's nested approval/sandbox layer is redundant (and would hang with no TTY) given the outer container is already the sandbox boundary; flag confirmed present via `codex exec --help` against the installed `@openai/codex@0.147.0`, since Codex CLI's non-interactive flags have moved around across releases and an older guess (`--ask-for-approval never`) didn't exist in this version. Login is browser/device-code (`codex login --device-auth`), matching the user's explicit "browser-based, not token" call for both tools — no `OPENAI_API_KEY`/`ANTHROPIC_API_KEY` billing by default.

**New `codegen_agent` action type** (`core/aiwebmaster_agent.py`, `core/executors.py`, infra_admin/super_admin only, added to both server-side `auth/permissions.py` and client-side `static/assets/sidebar.js` gates per this app's own two-places checklist rule): payload is just `{prompt: string}`. The executor (`run_codegen_agent`) resolves which sandbox to run via a **new, separate router** (`core/codegen_router.py`) — one narrow `structured_call` whose only job is picking `"claude"` or `"codex"`, using whatever AI provider is already configured in Settings, with a keyword-based fallback if that call itself fails. Deliberately not folded into the main chat system prompt: the default chat provider is `gemini-flash-latest`, and the user didn't want that model's general conversational judgement making the tool-choice call. The chat model's own job stayed narrower — decide `code_edit` (cheap, mechanical, only when it already knows exact file content) vs `codegen_agent` (hands off to a real agent) — it never sets a `tool` field itself.

Execution stayed **synchronous and blocking**, explicitly chosen over building new async/job/poll infrastructure — grepped the whole app for `BackgroundTasks|asyncio.create_task|Thread(|Celery|job_id|poll` and found zero hits; `run_docker`'s rebuild (30min timeout) and `run_publish` already block the HTTP request for long stretches the same way, so a multi-minute coding-agent run follows an established pattern rather than introducing a new one. After the sandbox container exits, the executor runs `git diff --stat`/`git diff` in the same `/repo` mount AIwebmaster's own container sees (the sandbox edited those same bind-mounted files) and returns that as the human-facing review artifact — no auto-commit, same as `code_edit` today; the existing `git` action and Git page remain the commit/discard path. `static/index.html`'s `followUpEl()` got a `codegen_agent` branch showing the diff plus per-touched-service "Rebuild & Preview" buttons (parses `diff_stat` against the existing `FILE_PREFIX_TO_SERVICE` map, reusing the same rebuild-button pattern `code_edit` already had rather than adding new UI machinery).

**Not yet done**: neither sandbox has been logged into on this host yet (`docker compose run --rm --entrypoint claude claude-agent` / `--entrypoint codex codex-agent login --device-auth`, both required once before first real use). All three images (`claude-agent`, `codex-agent`, `aiwebmaster`) build clean and the new Python wiring import-checks inside the built `aiwebmaster` image, but no live `codegen_agent` action has been run end-to-end through the chat UI yet — that's the next verification step once login is done.

### v8 addendum — Agent Terminal (interactive streaming UI) + two small security items

User wanted the same coding-agent sandboxes from v7 usable **interactively from a browser**, live streaming output and multi-turn, the way this Claude Code session itself works — not just one-shot via the chat's `codegen_agent` action. Built as a fully separate page (`/agent`, `routers/agent.py`, `core/agent_stream.py`, `db/agent_sessions.py`), same `codegen_agent` RBAC tier, leaving v7's `codegen_agent` action untouched (still the right shape for "the chat model decided this needs real codegen").

First WebSocket + first `asyncio.create_subprocess_exec` in this app (confirmed zero prior instances of either by grep before starting). Hit a real architecture snag caught only by live testing, not import-checking: an `APIRouter(dependencies=[Depends(require_session)])` applies that dependency to every route registered on it, including `@router.websocket(...)` ones — but `require_session` takes an HTTP `Request`, and FastAPI 500s trying to resolve it for a WebSocket connection. Fixed by splitting the websocket route onto its own `ws_router` with no router-level dependency, doing its own auth via a new `auth/deps.py::require_session_ws` (same cookie/token/epoch logic as `require_session`, but closes the socket with a 4401 code instead of raising `HTTPException`, since a WebSocket route can't raise one after accepting).

Also caught by live testing, not caught by any static check: **v7's `claude-agent` sandbox had a real, previously-unnoticed bug** — its `run.sh` never set a permission mode, so `claude -p ...` in non-interactive mode would hang forever the moment it tried an actual file-edit/bash tool call, with no TTY to answer the approval prompt. Fixed with `--permission-mode bypassPermissions`, which in turn required moving `claude-agent` off root (Claude Code refuses that flag as root, "for security reasons") — `node:22-slim` conveniently already ships a uid/gid-1000 `node` user matching this host's own uid, so bind-mounted `apps/*` stayed writable without inventing a new user. Also found: `--output-format stream-json` in `--print` mode requires `--verbose` or the CLI exits immediately with an argument error — not documented in `--help`, only surfaced by actually running it. Both fixes benefit the v7 `codegen_agent` action too, which shared the same broken `run.sh` and would have hung on first real (non-trivial) use.

Multi-turn continuity: each Agent Terminal session persists the sandbox CLI's own conversation id and passes it back on the next turn (`$RESUME_ID` env var read by both `run.sh` scripts — `claude -p ... --resume <id>`, or `codex exec resume <id> ...` which is a distinct subcommand shape, not a flag, confirmed via `codex exec resume --help`). The two CLIs use different field names for this id in their JSON event streams (Claude Code: `session_id`; Codex: `thread_id`) — handled per-tool in `core/agent_stream.py`. Only persisted after a turn exits 0; a turn that error-exits and gets its session id captured anyway poisons the next turn ("No conversation found" — reproduced and fixed during testing).

Verified for real (not just built): logged in as `super_admin`, drove the actual `/api/agent/ws/{id}` socket against the real `claude-agent` sandbox — confirmed line-by-line streaming (not buffered-to-end), the `git diff` step picking up real uncommitted changes from this very session's edits, DB event persistence, and RBAC (`docker_ops`/`ui_editor` denied, `infra_admin`/`super_admin` allowed, no-cookie request 401s). Only the actual Claude/Codex login step is outstanding (same as v7) — everything up to that boundary is confirmed working, not assumed.

**Two small unrelated hardening items, bundled into this same pass** (from a security-posture discussion, not part of the streaming feature): `run_sql`'s destructive-statement guard now blocks `DROP`/`TRUNCATE` unconditionally (previously exempt with a `WHERE` clause, which doesn't even apply to those statements) — `DELETE` unchanged, still only blocked when unscoped. And the dev Postgres port (`5433`) is now bound to `127.0.0.1` only instead of all interfaces — every in-container service already reaches it via the internal compose network by name, this mapping only ever existed for host-side `psql`/GUI debugging, and it carries a weak hardcoded dev password (`tbg_dev`) that must never be internet-reachable (flagged as a real risk in an AWS-hosting security review this session, alongside no-TLS and no-secrets-vault — those two remain open, not addressed here).

**Not yet done**: real Claude/Codex login (blocks both v7 and v8 from doing anything beyond mechanical wiring); Stop button's `--rm` cleanup after `proc.terminate()` not yet verified (no orphaned-container check run); Agent Terminal not yet clicked through in an actual browser, only driven via a raw WebSocket test client.

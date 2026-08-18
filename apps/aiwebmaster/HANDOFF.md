# AIwebmaster — handoff

Standalone ops+content agent for The Bradbury Group's site (`apps/aiwebmaster`,
FastAPI + vanilla HTML/Tailwind-CDN, no build step). Full design history is in
`docs/planning/14_DECISION_LOG.md` (search "D9" — v1 through v6 addenda,
chronological). This file is the "pick it up cold" summary.

## What it does

Chat (or Browse picker) → agent proposes typed **actions** → human clicks
**Run** on each one individually → executor runs it → logged to an
append-only audit trail. Nothing executes without an explicit click, ever.

Action types: `content` (Pages/Posts/Resources/Case Studies, draft-by-default),
`nav_link` (add/update/remove/reorder header+footer nav), `git` (commit/push,
or discard uncommitted changes), `docker` (start/stop/restart/rebuild, dev or
staging), `sql`, `code_edit` (arbitrary repo file edit/create), `publish`
(dev→staging DB snapshot + redeploy, auto-backup first), `rollback` (restore
latest staging backup), `user_management`. `nginx`/`system` are draft-only —
explained, never executed, on purpose (shared host, too risky).

## Pages (sidebar)

Chat (`/`) · Browse & edit (`/browse`) · Git (`/git`) · Deploy (`/deploy`) ·
Users (`/users`) · System (`/system`) · Settings (`/settings`, AI provider).

## Access right now

- URL: `http://192.168.0.122:8110` (LAN) or `http://localhost:8110` (host only)
- Login: `admin@thebradburygroup.com` / see `AIWEBMASTER_ADMIN_PASSWORD` in root `.env`
- Also: `sunnyrocks1122@gmail.com` (super_admin, via Auth0 — that's the user's real account)
- 4 roles: `docker_ops` (docker,git) · `ui_editor` (content,nav_link) ·
  `infra_admin` (+ sql,code_edit) · `super_admin` (everything)
- Auth0 wired and working (real tenant creds in `.env`); password login always
  available as fallback. CMS/Payload does NOT have Auth0 — explicitly deferred,
  tracked as a follow-up (see decision log v4 addendum).

## Environments

- **Dev** (what's normally being edited): `cms`:3003, `web`:3002, `api`:8000
- **Staging** (called "prod" internally in code/ports — same thing, renamed
  in UI only): `cms-prod`:3103, `web-prod`:3102, `api-prod`:8003 —
  `docker-compose.prod.yml` overlay, separate `tbg_cms_prod`/`tbg_api_prod` DBs
  on the same Postgres instance.
- Promote dev→staging: `publish` action (Deploy page or sidebar button).
  Auto-backs-up staging DB first; `rollback` restores latest backup.

## Known infra gotchas (already fixed, don't re-break)

1. **This host's shell has a stale `GEMINI_API_KEY` exported in `~/.bashrc`**
   (line ~121) that silently overrides `.env` on every `docker compose up`
   because Compose gives shell env vars priority over `.env` file values.
   Workaround used all session: `env -u GEMINI_API_KEY GEMINI_API_KEY="$(grep ^GEMINI_API_KEY= .env | cut -d= -f2-)" docker compose up -d --force-recreate aiwebmaster`.
   Real fix (not yet done): remove/fix the `~/.bashrc` line — user hasn't
   confirmed removal yet, ask before touching it.
2. **Debian trixie has no `docker-compose-plugin` or usable `docker.io` client
   package** — both `docker` CLI and the compose plugin are fetched as static
   binaries directly in `apps/aiwebmaster/Dockerfile` (see comments there).
3. **`docker compose` run from inside a bind-mounted container needs
   `-p rewamped-site` explicitly** — otherwise it silently finds zero
   containers (`working_dir` label mismatch between host path and `/repo`
   inside the container). Already applied everywhere in `core/executors.py`.
4. **Git needs `safe.directory /repo`** configured (baked into the
   Dockerfile) — without it every git command fails with "dubious ownership".
5. **pg_dump/pg_restore version mismatch** — trixie's `postgresql-client` is
   v17, our Postgres is v16. Fixed by using plain-SQL dump + `sed` to strip
   the one incompatible `SET transaction_timeout` line, instead of custom-format
   `pg_restore`. Applies to both `publish`'s main dump and its pre-publish backup.

## Open bug — mid-investigation when this handoff was written

**User report**: "I can't see my own sent chat messages, only assistant
responses" (on the live Chat page, `sunnyrocks1122@gmail.com` account).

**Ruled out**: NOT a storage bug. Direct DB query confirms both `user` and
`assistant` rows are stored correctly, alternating in order, for that user's
session 1:
```sql
SELECT u.email, s.id, m.role, left(m.content,60) FROM aiwebmaster_chat_sessions s
JOIN aiwebmaster_users u ON u.id=s.user_id
JOIN aiwebmaster_chat_messages m ON m.session_id=s.id ORDER BY s.id, m.id;
```
This showed correct `user`/`assistant`/`user`/`assistant`... alternation with
real content in both roles. So the bug is client-side rendering, not the API
or DB.

**Not yet checked** (next steps for whoever picks this up):
- Open the Chat page as `sunnyrocks1122@gmail.com` in a real browser, DevTools
  open, and see whether user bubbles are (a) genuinely absent from the DOM,
  or (b) present but invisible (CSS issue — check `#log`'s `flex flex-col`
  + each row's `self-end`/`flex-row-reverse` classes in `static/index.html`'s
  `addMsg()`, and the teal bubble color `bg-brand-teal` against the navy bg).
- Check whether this happens on **live typing** vs. only on **reloading a
  session** (`loadSessionFromUrl()` in `static/index.html`) — both call the
  same `addMsg()`, so if one works and the other doesn't, the bug is in
  whichever code path isn't calling it, not in `addMsg()` itself.
- `addMsg('user', text)` call site confirmed still present (line ~323 of
  `static/index.html`) — wasn't accidentally deleted in a later edit.
- Worth a plain browser screenshot/inspect-element rather than more guessing
  from the server side — this needs eyes on the actual rendered page.

## Deploy/Rollback in the chat header, gated by an actual diff

Chat page header (`static/index.html`) now has both **Publish to staging**
and **Rollback staging** buttons (previously only Publish existed). Both
just call the existing `/api/actions/run` with `type: "publish"` /
`type: "rollback"` — same executor path as before (`core/executors.py`
`run_publish`/`run_rollback`), so nothing changed about what they *do*.

What's new is `GET /api/deploy/diff` (`routers/deploy.py`) — checked on page
load and again right after a publish completes:
- `code_changed`: compares current git HEAD sha + hash of `git diff HEAD`
  (`core/repo_state.py::git_state()`) against what was recorded at the last
  *successful* publish (`db/deploy_state.py`, table
  `aiwebmaster_deploy_state`, single row, written by `run_publish` on
  success). Catches both committed and uncommitted code changes since
  staging build copies the working tree.
- `content_changed`: dumps dev's and staging's CMS DB (`pg_dump` plain SQL)
  and compares hashes directly — no state tracking needed, self-correcting
  each check (`core/repo_state.py::db_content_hash()`).
- `has_backup`: whether a `publish` backup exists at all, for gating
  Rollback (reuses `core/executors.py::_backups_sorted()`).

Publish button disables with a tooltip when `has_changes` is false ("dev and
staging already match"). Rollback disables when `has_backup` is false. If
the diff fetch itself fails, buttons fail *open* (stay enabled) rather than
silently blocking a real publish/rollback on an unknown.

Not yet done: same diff-aware gating on the separate `/deploy` page (still
just start/stop/restart/rebuild per service, no Publish/Rollback there) —
was asked for "in chatbox only" this round, so left as-is. Also not
battle-tested end-to-end (no live publish run during this session — too
slow/disruptive to test blind); `GET /api/deploy/diff` itself confirmed
working via curl.

## Recently added, less thoroughly battle-tested

- Chat sessions (list/rename/delete, sidebar submenu) — DB-backed, works via
  curl tests, but see the open bug above for real-browser rendering.
- Shared in-app dialog (`dialogPrompt`/`dialogConfirm`/`dialogAlert` in
  `static/assets/sidebar.js`) replacing all native `prompt()`/`confirm()`/
  `alert()` — syntax-checked, not yet visually confirmed in a browser.
- Deploy page (`/deploy`) — start/stop/restart/rebuild per service, dev +
  staging, plus a recent-activity feed. Confirmed via curl (real stop/start
  cycle proven), not yet clicked through in a browser.
- Git page discard buttons (per-file + discard-all) — confirmed via curl.
- Sidebar "Git" badge showing live uncommitted-file count.
- `code_edit`'s follow-up "Rebuild `<service>` & Preview" button after a
  successful Run, auto-mapping file path → dev service.

## Not done / explicitly deferred

- CMS (Payload admin) has no Auth0 — password auth only there.
- No secrets vault — AI provider keys in Settings sit plaintext in `tbg_api`.
- No MFA on password login.
- `~/.bashrc`'s stale `GEMINI_API_KEY` export not removed (needs user's OK).
- No true 3rd environment tier — "staging" is the only promotion target,
  confirmed by user this is intentional (no real external prod exists yet).

## Everything is committed and pushed

Two commits this session: `7b500e7` (initial AIwebmaster build) and `48ae5c1`
(browser/device-code login for claude-agent). **Everything after that —
all of v2 through v6 (auth hardening, code_edit, UI rewrite, chat sessions,
Deploy page, discard, dialogs) — is uncommitted in the working tree.** Check
`git status` / the Git page's badge count before doing anything destructive.

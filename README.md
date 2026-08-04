# TBG MVP AI Build Pack

This pack is designed for Claude Code, OpenAI Codex, and human developer handoff.

It converts the TBG 45-day MVP plan and the Website Content Architecture into a build-ready execution system.

## Primary build goal

Build a CMS-driven AI-native website platform for The Bradbury Group using:

- Next.js 15 for the public website and lightweight lead portal
- Payload CMS with PostgreSQL for editable marketing content
- FastAPI for business logic, AI scoring, webhooks, and integrations
- AWS credits-first infrastructure
- HubSpot, ClickUp, n8n, SES, Clerk, Cal.com, and Columbus integration
- A future-ready schema that can support Phase 2 learning platform and Phase 3 agentic operations

## How to use this pack

All planning docs live in [`docs/planning/`](docs/planning/).

1. Start with `docs/planning/00_PROJECT_CONTEXT.md`
2. Read `docs/planning/01_LOCKED_DECISIONS.md`
3. Read `docs/planning/02_PHASE_WISE_MVP_PLAN.md`
4. For Claude Code, use `docs/planning/10_CLAUDE.md`
5. For Codex, use `docs/planning/11_CODEX.md`
6. Maintain continuity using `docs/planning/13_PROJECT_STATE_TEMPLATE.md` and `docs/planning/PROJECT_STATE.md`
7. Do not begin implementation until the unresolved stakeholder questions in `docs/planning/14_DECISION_LOG.md` are answered or explicitly parked.

Live build status/guide for the team (what's done, planned, login requirements, flows) is at `/docs` on the running web app — see `apps/web/app/docs/page.tsx`.

## Important operating rule

Do not let AI coding agents re-decide product strategy. Claude/Codex should execute the plan, not reinterpret the business.

## Current build status

- **Design system**: Home, About, Footer, Header, and the Columbus AI widget are locked to the reference designs unzipped under `/project/tbg/reference/updates/` (Home-V2, About-V2, columbus-ui) — those references are the master design. Match their exact Tailwind classnames, hex colors, and font-utility classes rather than remapping to custom tokens.
- **Local dev**: `apps`, `apps/cms` (Payload), and `apps/api` (FastAPI) run via the root `docker-compose.yml`, exposed at `localhost:3002`. Standard change loop: `npx tsc --noEmit` (from `apps/web`) → `docker compose build web` → `docker compose up -d web` → curl smoke test.
- **Deploy**: `apps/web` deploys to Vercel automatically on push to `origin/main`. Local docker rebuild is separate from the Vercel deploy — a `git push` is required for prod to pick up changes.
- **CI**: the GitHub Actions workflow (`.github/workflows/ci.yml`) was removed — pre-existing lint/typecheck debt across `apps/api` and `apps/web` predates active work on this repo and isn't gating deploys.

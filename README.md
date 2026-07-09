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

1. Start with `00_PROJECT_CONTEXT.md`
2. Read `01_LOCKED_DECISIONS.md`
3. Read `02_PHASE_WISE_MVP_PLAN.md`
4. For Claude Code, use `CLAUDE.md`
5. For Codex, use `CODEX.md`
6. Maintain continuity using `PROJECT_STATE_TEMPLATE.md`
7. Do not begin implementation until the unresolved stakeholder questions in `DECISION_LOG.md` are answered or explicitly parked.

## Important operating rule

Do not let AI coding agents re-decide product strategy. Claude/Codex should execute the plan, not reinterpret the business.

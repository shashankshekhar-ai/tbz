# 01 — Locked Decisions

These are treated as locked unless a human explicitly overrides them.

## Stack

- Monorepo with pnpm workspaces
- `apps/web` = Next.js 15 App Router
- `apps/cms` = Payload CMS
- `apps/api` = FastAPI
- PostgreSQL as source-of-truth database
- S3 for media, PDFs, and downloadable resources
- Clerk for authentication
- HubSpot as CRM / sales brain
- ClickUp as delivery/project brain
- n8n as webhook orchestrator
- SES for transactional emails
- CloudFront / CDN layer for performance
- Tailwind for frontend styling
- Claude Haiku or equivalent low-cost model for assessment scoring

## Architecture rules

- Marketing pages are CMS-driven. Do not hardcode page copy in Next.js.
- Next.js is presentation only. No business logic inside components.
- No LLM calls from the frontend.
- FastAPI owns AI calls, scoring, webhooks, integration validation, and business rules.
- Payload CMS owns editable content.
- PostgreSQL stores users, leads, assessment results, CMS content, audit logs, and structured event data.
- n8n flows must be exported as JSON and version-controlled.
- All integrations need error fallback and alerting.
- Dev → staging → approval → production. No direct production changes.

## MVP boundaries

In 45 days, build:

- CMS-driven marketing site
- Payload CMS admin
- Blog / Insights
- Resource hub with gated downloads
- Contact and inquiry flows
- AI Readiness Assessment MVP, if naming and scoring are approved
- Columbus public entry point / preserved CTA
- Basic lead portal with Clerk, if still in scope
- HubSpot / ClickUp / email automation
- AWS deployment foundation

Do not build in MVP:

- Full LMS
- Paid membership system
- Stripe payment flows
- Full Solomon Engine portal
- Full knowledge base + RAG assistant
- Phase 3 agent fleet
- Public “meet our AI team” showcase page

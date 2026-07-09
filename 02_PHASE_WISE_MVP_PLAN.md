# 02 — Phase-Wise MVP Plan

## Overview

The MVP should be built in phases so Claude Code and Codex can work without losing context or mixing responsibilities.

The recommended division:

- Phase 0: Repository, environment, and planning files
- Phase 1: Foundation architecture
- Phase 2: Payload CMS content platform
- Phase 3: Next.js website shell and CMS rendering
- Phase 4: FastAPI backend and data model
- Phase 5: Forms, resources, and CRM integration
- Phase 6: AI Readiness Assessment
- Phase 7: Auth and lightweight lead portal
- Phase 8: AWS deployment and hardening
- Phase 9: QA, content loading, launch
- Phase 10: Post-MVP Phase 2 foundation

---

## Phase 0 — AI build setup and repo protocol

### Goal

Prepare the repo so Claude/Codex can work safely across multiple sessions.

### Deliverables

- Monorepo initialized
- `CLAUDE.md`
- `CODEX.md`
- `PROJECT_STATE.md`
- `EXECUTION_PLAN.md`
- `.gitignore`
- `.editorconfig`
- package manager setup
- folder structure
- environment variable templates
- decision log

### Definition of Done

- `pnpm install` runs at root
- empty workspace scripts run without breaking
- repo contains all planning files
- `PROJECT_STATE.md` lists current task and blockers
- first git commit completed

### AI agent instruction

Claude should create the architecture and planning files first. Codex should only start coding after Phase 0 is committed.

---

## Phase 1 — Foundation architecture

### Goal

Create the basic skeleton for web, CMS, API, database, and local development.

### Deliverables

- `apps/web` Next.js 15 app
- `apps/cms` Payload CMS app
- `apps/api` FastAPI app
- local Docker Compose for PostgreSQL
- environment templates
- root scripts
- CI skeleton
- shared types folder if required

### Definition of Done

- Next.js runs locally
- FastAPI `/health` returns 200
- Payload admin starts locally
- PostgreSQL is reachable
- CI can run lint/typecheck/test placeholders

---

## Phase 2 — Payload CMS content platform

### Goal

Build the editable content layer for the website.

### Collections

- Pages
- Navigation
- Blog Posts
- Resources
- Case Studies
- Testimonials
- FAQs
- Team / Advisory Board
- Media
- Forms / Form Definitions if needed
- Global Settings
- SEO Defaults

### Page blocks

- Hero Block
- Journey Selector Block
- Rich Text Block
- Program Overview Block
- Phase / Step Block
- CTA Block
- Testimonial Block
- Logo Cloud Block
- Resource Download Block
- Gated Form Block
- FAQ Block
- Case Study Preview Block
- Assistant Embed Block
- Assessment Embed Block
- Pricing / Tier Block
- Feature Grid Block
- SEO Metadata Group

### Definition of Done

- Admin/editor roles created
- Editor can create draft/published pages
- Media uploads use S3 or local dev fallback
- Test page can be fetched by API
- Block schema is documented
- Draft preview works or is stubbed clearly

---

## Phase 3 — Next.js CMS-driven website

### Goal

Render all marketing pages from Payload CMS.

### Public routes

- `/`
- `/ai-fluency-cohort`
- `/the-solomon-engine`
- `/for-organizations`
- `/our-ai-return`
- `/resources`
- `/about`
- `/insights`
- `/insights/[slug]`
- `/contact`
- `/preview/[slug]`

### Deliverables

- App Router setup
- Layout
- Header/footer
- CMS nav fetch
- Block renderer
- SEO metadata from CMS
- Sitemap
- Robots
- Error and loading states
- Revalidation strategy

### Definition of Done

- A Payload page renders on the frontend
- No page copy is hardcoded in Next.js
- Published pages appear in sitemap
- Draft pages are not indexed
- Broken CMS connection shows graceful error

---

## Phase 4 — FastAPI backend and database

### Goal

Create the business logic layer.

### Modules

- Health
- Config
- Database
- Auth middleware
- Leads
- Forms
- Resources
- Assessment
- HubSpot integration
- ClickUp integration
- n8n webhook emitter
- SES email
- AI scoring helper
- Audit logging

### Core tables

- users
- leads
- lead_events
- form_submissions
- resource_downloads
- assessment_sessions
- assessment_answers
- assessment_results
- report_files
- integration_events
- audit_logs

### Definition of Done

- `/health` confirms DB connectivity
- migrations run using Alembic
- structured logging works
- API errors return consistent JSON
- OpenAPI docs are available
- protected route validates Clerk JWT

---

## Phase 5 — Forms, resources, and CRM automation

### Goal

Turn the site into a lead-generation system.

### Flows

#### Contact form

1. User submits form
2. Next.js posts to FastAPI
3. FastAPI validates and stores lead
4. FastAPI emits n8n webhook
5. n8n creates/updates HubSpot contact
6. n8n creates ClickUp task if relevant
7. SES sends confirmation and internal notification

#### Gated resource

1. User selects downloadable asset
2. User enters email and metadata
3. FastAPI records resource download
4. Resource access is granted
5. HubSpot contact is updated
6. Email sequence is triggered

### Definition of Done

- Contact form works end-to-end
- Resource gate works
- Failed integration does not lose the lead
- n8n workflow JSON is exported to repo
- HubSpot and ClickUp test records are created

---

## Phase 6 — AI Readiness Assessment

### Goal

Create an assessment flow that produces structured lead intelligence and, if approved, a PDF report.

### Important blocker

Do not finalize public naming or route naming until stakeholder confirms:

- AESOP
- AI Readiness Assessment
- AI Maturity Index
- Something else

### MVP flow

1. User starts assessment
2. User answers multi-step questions
3. FastAPI stores answers
4. FastAPI calls AI scoring helper
5. AI returns structured JSON
6. Result is stored
7. PDF report generated if in scope
8. HubSpot / ClickUp / email flows triggered
9. Optional Clerk registration to view report

### Definition of Done

- Assessment can be completed
- Result is deterministic enough for MVP
- AI output is schema-validated
- Bad AI output fails safely
- Report generation either works or is explicitly deferred
- Lead routing works

---

## Phase 7 — Clerk auth and lightweight lead portal

### Goal

Allow users to log in and view their report.

### Routes

- `/sign-in`
- `/sign-up`
- `/dashboard`
- `/dashboard/report`
- `/dashboard/book-call`

### Portal MVP

- AI score
- PDF report download
- Top 3 recommendations
- Recommended next step
- Cal.com booking embed

### Definition of Done

- Unauthenticated users are redirected
- Authenticated user can see their own result
- JWT is validated by FastAPI
- No user can access another user's report

---

## Phase 8 — AWS deployment and infrastructure

### Goal

Deploy cost-conscious MVP infrastructure.

### Services

- EC2 t3.micro or similar for API/CMS
- RDS PostgreSQL
- S3 media bucket
- CloudFront
- SES
- Nginx reverse proxy
- GitHub Actions deploy
- CloudWatch
- Sentry

### Definition of Done

- Staging deployment works
- SSL is active
- CMS is protected
- API is reachable
- Frontend is reachable
- Media loads from S3/CloudFront
- CI/CD deploys without manual SSH steps
- Backups enabled

---

## Phase 9 — QA, content loading, and launch

### Goal

Launch only after complete end-to-end validation.

### Checklist

- Load approved pages
- Load initial blogs
- Load resources
- Load testimonials
- Load case studies
- Validate SEO metadata
- Validate schema markup
- Test all forms
- Test all integration flows
- Test Columbus entry point
- Test assessment flow
- Test report delivery
- Test HubSpot records
- Test ClickUp tasks
- Test email notifications
- Test mobile layout
- Test accessibility basics
- Run Lighthouse
- Confirm redirects from WordPress URLs

### Definition of Done

- Paige/Aparna sign-off
- No critical bugs
- No known lead-loss path
- WordPress cutover plan approved
- Rollback plan documented

---

## Phase 10 — Post-MVP foundation

### Goal

Prepare for LMS, Solomon Engine portal, knowledge base, and agent fleet.

### Do not start until MVP is stable.

### Phase 2 candidates

- LMS
- Stripe / memberships
- Solomon Engine portal
- Knowledge base
- RAG
- Deeper HubSpot / ClickUp automation
- MCP-style wrappers for external tools

### Phase 3 candidates

- Lead Agent
- Intent Discovery Agent
- Planner Agent
- Worker Agent
- Review Agent
- Summary Agent
- MCP servers for HubSpot, ClickUp, Gmail, assessment, drafting

### Definition of Done

MVP data should be clean enough to train and operate later workflows without refactoring the base system.

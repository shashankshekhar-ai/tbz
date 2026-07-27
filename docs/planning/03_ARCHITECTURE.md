# 03 — Architecture

## Architecture style

CMS-driven, API-first, integration-ready web platform.

## High-level system

```mermaid
flowchart TB
  User[Visitor / Lead] --> Web[Next.js Website]
  Editor[Paige Team / Editor] --> CMS[Payload CMS]
  Web --> CMS
  Web --> API[FastAPI]
  CMS --> DB[(PostgreSQL)]
  API --> DB
  API --> AI[Claude Haiku / AI Scoring]
  API --> N8N[n8n Webhooks]
  N8N --> HubSpot[HubSpot CRM]
  N8N --> ClickUp[ClickUp]
  N8N --> Mailer[Email/Nurture]
  API --> SES[AWS SES]
  CMS --> S3[AWS S3 Media]
  Web --> CDN[CloudFront/CDN]
  Columbus[Columbus / ElevenLabs] --> API
  Clerk[Clerk Auth] --> Web
  Web --> Clerk
  API --> Clerk
```

## Responsibility boundaries

### Next.js

- Presentation layer
- CMS page rendering
- Forms UI
- Assessment UI
- Lead portal UI
- SEO metadata rendering
- No AI calls
- No integration secrets
- No business decisions

### Payload CMS

- Editable pages
- Blog posts
- Resources
- Case studies
- FAQs
- Testimonials
- Navigation
- Global settings
- Media management
- Draft preview

### FastAPI

- Validation
- AI scoring
- Lead processing
- Assessment processing
- Webhooks
- Auth checks
- HubSpot / ClickUp / n8n integration triggering
- SES email
- Audit logging
- Report generation

### PostgreSQL

- CMS data
- Users
- Leads
- Assessments
- Reports
- Events
- Audit logs
- Integration states

### n8n

- Orchestrates cross-tool workflows
- Handles HubSpot / ClickUp / email automation
- Must not be the source of truth
- Must not be the only place where lead data exists

## Recommended monorepo

```txt
tbg-platform/
  apps/
    web/
    cms/
    api/
  packages/
    ui/
    config/
    types/
    api-client/
  infra/
    aws/
    nginx/
    scripts/
  docs/
  workflows/
    n8n/
  .github/
    workflows/
  CLAUDE.md
  CODEX.md
  PROJECT_STATE.md
  EXECUTION_PLAN.md
```

## Deployment shape

```txt
Frontend:
  Next.js on Vercel or AWS Amplify/CloudFront

Backend/CMS:
  EC2 t3.micro
    - FastAPI on port 8000
    - Payload CMS on port 3001
    - Nginx reverse proxy

Database:
  RDS PostgreSQL

Media:
  S3 + CloudFront

Email:
  SES

Monitoring:
  Sentry + CloudWatch
```

## URL routing

```txt
/                    -> Next.js
/ai-fluency-cohort   -> Next.js CMS page
/the-solomon-engine  -> Next.js CMS page
/for-organizations   -> Next.js CMS page
/our-ai-return       -> Next.js CMS page
/resources           -> Next.js CMS/resource listing
/insights            -> Next.js blog listing
/insights/[slug]     -> Next.js blog detail
/contact             -> Next.js contact page
/dashboard           -> Next.js protected lead portal

/api/*               -> FastAPI
/cms/*               -> Payload CMS admin/API
```

## Future agent-readiness

Every lead and assessment event should store:

- source
- raw_input
- intent_type
- segment
- urgency
- recommended_next_step
- structured_payload
- integration_status

This prepares Phase 3 agent workflows without reworking the data model.

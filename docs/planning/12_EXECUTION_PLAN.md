# 12 — Execution Plan

## Phase 0 — Repo and continuity

- [ ] Create monorepo structure
- [ ] Add planning MD files
- [ ] Add `PROJECT_STATE.md`
- [ ] Add `CLAUDE.md`
- [ ] Add `CODEX.md`
- [ ] Add `.gitignore`
- [ ] Add `.editorconfig`
- [ ] Add root package scripts
- [ ] Add Docker Compose for PostgreSQL
- [ ] Commit baseline

## Phase 1 — App scaffolding

- [ ] Scaffold Next.js app in `apps/web`
- [ ] Scaffold Payload CMS in `apps/cms`
- [ ] Scaffold FastAPI app in `apps/api`
- [ ] Add shared config package if needed
- [ ] Add CI skeleton
- [ ] Add environment templates
- [ ] Verify all apps run locally

## Phase 2 — CMS

- [ ] Create Users collection with roles
- [ ] Create Media collection
- [ ] Create Pages collection
- [ ] Create Navigation collection
- [ ] Create Blog Posts collection
- [ ] Create Resources collection
- [ ] Create FAQs collection
- [ ] Create Testimonials collection
- [ ] Create Case Studies collection
- [ ] Create Global Settings
- [ ] Add page block schema
- [ ] Add draft preview

## Phase 3 — Frontend CMS rendering

- [ ] Build layout
- [ ] Build nav
- [ ] Build footer
- [ ] Add CMS client
- [ ] Add dynamic page route
- [ ] Add block renderer
- [ ] Add page block components
- [ ] Add blog listing
- [ ] Add blog detail
- [ ] Add resource hub
- [ ] Add contact page
- [ ] Add SEO metadata
- [ ] Add sitemap
- [ ] Add robots

## Phase 4 — FastAPI foundation

- [ ] Add config
- [ ] Add DB connection
- [ ] Add health route
- [ ] Add common response schema
- [ ] Add error handling
- [ ] Add logging
- [ ] Add Alembic
- [ ] Add lead models
- [ ] Add assessment models
- [ ] Add integration event models
- [ ] Add auth middleware

## Phase 5 — Forms and integrations

- [ ] Contact route
- [ ] Resource gate route
- [ ] Corporate inquiry route
- [ ] Lead service
- [ ] n8n service
- [ ] HubSpot service
- [ ] ClickUp service
- [ ] SES service
- [ ] Integration event retry handling
- [ ] n8n workflow exports

## Phase 6 — Assessment

- [ ] Confirm assessment naming
- [ ] Create assessment questions config
- [ ] Build frontend multi-step form
- [ ] Create assessment session route
- [ ] Create answer submission route
- [ ] Create scoring service
- [ ] Add AI structured output validation
- [ ] Store result
- [ ] Generate PDF report if approved
- [ ] Email report if approved
- [ ] Trigger HubSpot/ClickUp/nurture

## Phase 7 — Auth and portal

- [ ] Clerk frontend setup
- [ ] Clerk backend validation
- [ ] Dashboard route
- [ ] Report page
- [ ] Cal.com embed
- [ ] User/report access control

## Phase 8 — Deployment

- [ ] Provision AWS resources
- [ ] Configure S3
- [ ] Configure RDS
- [ ] Configure EC2
- [ ] Configure Nginx
- [ ] Configure SES
- [ ] Configure CI/CD deploy
- [ ] Configure Sentry
- [ ] Configure CloudWatch
- [ ] Test staging

## Phase 9 — Launch

- [ ] Load content
- [ ] Test CMS editing
- [ ] Test forms
- [ ] Test assessment
- [ ] Test integrations
- [ ] Test portal
- [ ] Validate SEO/schema
- [ ] Run Lighthouse
- [ ] Prepare redirects
- [ ] DNS cutover
- [ ] Monitor launch

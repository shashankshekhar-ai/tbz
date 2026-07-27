# 15 — Acceptance Criteria

## MVP acceptance criteria

The MVP is not done until these pass.

## Website

- Public site loads with SSL
- All approved navigation items work
- All marketing pages render from CMS
- No hardcoded page copy in Next.js
- Mobile navigation works
- Footer and global settings are editable
- SEO metadata renders correctly

## CMS

- Admin can log in
- Editor can create draft pages
- Editor can publish pages
- Media upload works
- Blog post can be published without developer involvement
- Resource can be created and gated
- FAQs can render as schema-ready content

## Forms

- Contact form submits successfully
- Corporate inquiry submits successfully
- Resource gate submits successfully
- All submissions are stored before external integrations
- User sees clear success/failure message

## Integrations

- HubSpot contact created or updated
- ClickUp task/project created where relevant
- n8n workflow receives structured payload
- SES sends confirmation/internal notification
- Integration failures are logged
- No lead is lost on external tool failure

## Assessment

- User can complete assessment
- Answers are stored
- AI scoring returns validated JSON
- Failure creates manual review state
- Report generated if in scope
- Lead is routed to HubSpot/ClickUp/nurture
- Result can be viewed in portal if auth is in scope

## Portal

- Clerk sign-in works
- Dashboard is protected
- User sees only own report
- Cal.com booking embed works

## Infrastructure

- Staging works
- Production works
- CI/CD deploy works
- RDS backups enabled
- S3 versioning enabled
- Monitoring enabled
- Critical errors alert the team

## Performance and SEO

- Lighthouse performance 85+
- Accessibility 90+
- SEO 95+
- Sitemap generated
- Robots configured
- Schema validated for key pages

## Launch

- WordPress backup created
- Redirects prepared
- DNS cutover plan approved
- Rollback plan documented
- Stakeholder sign-off recorded

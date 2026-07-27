# 05 — Frontend Spec

## App

`apps/web`

## Stack

- Next.js 15
- App Router
- TypeScript
- Tailwind
- Server Components where useful
- Client Components for forms and interactive UI
- API client package for FastAPI calls

## Routes

```txt
/
 /ai-fluency-cohort
 /the-solomon-engine
 /for-organizations
 /our-ai-return
 /resources
 /resources/[slug]
 /about
 /insights
 /insights/[slug]
 /contact
 /dashboard
 /dashboard/report
 /dashboard/book-call
 /preview/[slug]
```

## Components

### Layout

- Header
- Footer
- Mobile navigation
- Columbus widget shell
- Page container

### CMS rendering

- `BlockRenderer`
- `HeroBlock`
- `JourneySelectorBlock`
- `RichTextBlock`
- `ProgramOverviewBlock`
- `PhaseStepBlock`
- `CTABlock`
- `FAQBlock`
- `ResourceDownloadBlock`
- `GatedFormBlock`
- `AssessmentEmbedBlock`
- `CaseStudyPreviewBlock`
- `TestimonialBlock`
- `PricingTierBlock`
- `AssistantEmbedBlock`

### Forms

- ContactForm
- ResourceGateForm
- AssessmentForm
- CorporateInquiryForm
- NewsletterForm

### Portal

- DashboardLayout
- ScoreCard
- RecommendationList
- ReportDownload
- CalEmbed

## Frontend rules

- Do not call Claude / Anthropic directly.
- Do not store API secrets.
- Do not hardcode public page copy.
- Do not put business rules in React components.
- Use FastAPI for all lead, form, assessment, and report logic.
- Use Payload only for content fetching.
- Use Clerk for auth state.

## Data fetching

### CMS pages

- Fetch by slug from Payload
- Use ISR or on-demand revalidation
- Published pages only unless preview route

### Blog

- Fetch paginated list from Payload
- Fetch individual post by slug
- Render FAQ schema if FAQs exist

### Forms

- Submit to FastAPI
- Show success/failure state
- Do not assume integration success unless API confirms accepted

## SEO

Each page should support:

- title
- description
- canonical
- OG image
- robots
- structured schema
- FAQ schema where relevant
- sitemap inclusion based on status

## Acceptance criteria

- Home loads from CMS
- All major pages render from Payload
- Contact form posts to FastAPI
- Resource gate posts to FastAPI
- Assessment UI can start and submit
- Dashboard is protected
- Lighthouse target: Performance 85+, Accessibility 90+, SEO 95+

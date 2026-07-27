# 17 — Risk Register

## R1 — Scope creep

Risk:

The MVP may expand into LMS, full AI assistant, agent fleet, or Solomon portal.

Mitigation:

Keep these in Phase 2/3 unless explicitly approved.

## R2 — Content architecture mismatch

Risk:

Developers build older generic Services navigation while content architecture expects product-led navigation.

Mitigation:

Use Website Content Architecture as source for nav. Update technical plan accordingly.

## R3 — Columbus ambiguity

Risk:

One doc treats Columbus webhook migration as MVP; another treats deeper Columbus routing as later.

Mitigation:

Separate visual CTA from automation depth. Build safe endpoint/stub, confirm deeper behavior.

## R4 — MailerLite vs HubSpot confusion

Risk:

Duplicate nurture logic across both systems.

Mitigation:

Decide one source of email/nurture truth or abstract provider.

## R5 — n8n source-of-truth trap

Risk:

Lead data exists only in n8n.

Mitigation:

Always store in PostgreSQL first.

## R6 — AI scoring instability

Risk:

AI returns inconsistent or invalid assessment output.

Mitigation:

Use strict JSON schema validation, prompt versioning, fallback/manual review.

## R7 — AWS overbuild

Risk:

Costs increase due to NAT Gateway, extra EC2, Fargate, or wrong RDS sizing.

Mitigation:

Follow credits-first architecture.

## R8 — CMS block overengineering

Risk:

Too many block types slow MVP.

Mitigation:

Implement essential blocks first:
Hero, Rich Text, CTA, FAQ, Form, Resource, Program, Case Study, Testimonial.

## R9 — Stakeholder approvals delay implementation

Risk:

Naming and assessment logic stay blocked.

Mitigation:

Build internal stubs with neutral names and placeholder blocks.

## R10 — WordPress cutover risk

Risk:

SEO and URLs break during launch.

Mitigation:

Backup, URL inventory, redirects, staging validation, rollback plan.

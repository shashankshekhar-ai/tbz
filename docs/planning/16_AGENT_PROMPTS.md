# 16 — Agent Prompts

## Claude kickoff prompt

```txt
You are Claude Code working on the TBG MVP platform.

Read README.md, 00_PROJECT_CONTEXT.md, 01_LOCKED_DECISIONS.md, 02_PHASE_WISE_MVP_PLAN.md, PROJECT_STATE.md, and DECISION_LOG.md.

Do not code yet. First summarize:
1. Current phase
2. Next task
3. Blockers
4. Files you expect to modify
5. Verification commands you will run

After that, wait for confirmation or proceed only with the next unblocked task.
```

## Codex kickoff prompt

```txt
You are Codex working on the TBG MVP platform.

Read PROJECT_STATE.md, EXECUTION_PLAN.md, CODEX.md, and the spec file relevant to the next task.

Implement only the next task. Keep changes minimal. Do not alter architecture. Do not implement blocked decisions.

Before finishing:
1. Run relevant tests/checks
2. Update PROJECT_STATE.md
3. Summarize changed files
```

## Claude CMS prompt

```txt
Implement the Payload CMS content model from 04_CMS_CONTENT_MODEL.md.

Create collections for Pages, Navigation, Blog Posts, Resources, FAQs, Testimonials, Case Studies, Media, and Global Settings.

Create reusable page blocks:
Hero, Journey Selector, Rich Text, Program Overview, Phase/Step, CTA, Resource Download, Gated Form, FAQ, Assistant Embed, Assessment Embed, Case Study Preview, Pricing/Tier, Feature Grid.

Do not add public copy. Use placeholder labels only.
```

## Codex FastAPI lead prompt

```txt
Implement the FastAPI lead/contact foundation.

Use the response format from CODEX.md.
Create models/schemas/services/routes for contact form submission.

Requirements:
- Validate input
- Store lead in PostgreSQL
- Store lead event
- Create integration event for n8n
- Return accepted response
- Do not call external services directly unless service stubs exist
- Add tests
```

## Codex assessment prompt

```txt
Implement assessment backend using internal name `assessment`.

Do not expose public name AESOP unless approved in DECISION_LOG.md.

Requirements:
- Create session
- Store answers
- Complete session
- Call AI scoring service
- Validate structured AI output
- Store result
- Create integration event
- Add failure/manual-review fallback
```

## Claude frontend prompt

```txt
Build the Next.js CMS rendering system.

Requirements:
- Fetch page by slug from Payload
- Render blocks via BlockRenderer
- Implement placeholder components for each block type
- Generate SEO metadata from CMS
- Add graceful error state
- Do not hardcode final marketing copy
```

## Launch QA prompt

```txt
Run MVP launch QA using 15_ACCEPTANCE_CRITERIA.md.

Create a QA report with:
- Passed
- Failed
- Blocked
- Risk
- Required fix before launch
- Can defer after launch

Do not mark launch-ready unless all critical lead and CMS flows pass.
```

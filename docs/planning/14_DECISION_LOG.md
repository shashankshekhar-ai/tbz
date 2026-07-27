# 14 — Decision Log

Use this file to prevent Claude/Codex from guessing stakeholder decisions.

## D1 — Assessment naming

### Options

- AESOP
- AI Readiness Assessment
- AI Maturity Index
- AI Readiness Diagnostic

### Current status

Decided: **AI Readiness Assessment**. Route slug (`assessment`) already matches — no URL change needed.

### Why it matters

Impacts:

- route names
- CMS block names
- UI copy
- HubSpot fields
- report title
- analytics labels

### Recommended temporary technical name

Use internal key:

```txt
assessment
```

Do not expose public label until approved.

---

## D2 — Columbus MVP scope

### Options

1. Preserve Columbus as CTA/widget only
2. Route Columbus webhook into FastAPI during MVP
3. Build deeper Columbus automation later

### Current status

Needs confirmation because source docs are not fully consistent.

### Recommendation

MVP:

- Keep Columbus visible.
- Build FastAPI webhook as a stub or real endpoint if credentials are available.
- Full agentic routing remains Phase 3.

---

## D3 — Our AI Return naming

### Options

- Our AI Return
- Our ROI
- Proof of Impact
- Client Outcomes

### Current status

Needs Paige approval.

### Recommendation

Use `Our AI Return` or `Proof of Impact`. Avoid `Our ROI` if brand rules say ROI is internal-only.

---

## D4 — MailerLite vs HubSpot nurture

### Current status

Conflict in source docs.

### Recommendation

Confirm whether HubSpot replaces MailerLite or MailerLite remains for short-term nurture.

Implementation should abstract email/nurture provider behind a service so this can change later.

---

## D5 — AI Fluency phase structure

### Current plan

One page, one URL, with Phase 1 and Phase 2 as distinct sections.

### Risk

If stakeholder wants phase distinction removed entirely, that conflicts with existing brand/KG rule.

### Recommendation

Keep phases visually equal, do not imply Phase 1 is inferior.

---

## D7 — AI provider abstraction

### Current status

Decided: dynamic, not locked to Anthropic. `AI_PROVIDER` env var (`anthropic` default, or `gemini`) picks the backend at runtime for every agent (assessment scoring, lead follow-up, Page Agent, Content Agent). Both `ANTHROPIC_API_KEY` and `GEMINI_API_KEY` can be configured simultaneously; the env var just selects which is live.

### Why

Exploring a Google/Gemini collaboration — want the option to run on Gemini without a rebuild once that's confirmed.

### Implementation

- `apps/api/core/ai_provider.py` (`structured_call()`) and `apps/cms/src/lib/aiProvider.ts` (`runAgentTurn()`) — one abstraction per language, each callable with a JSON-schema-style input schema and returning a validated dict/object regardless of provider.
- Anthropic path: forced tool-use (`tool_choice`), as before.
- Gemini path: `response_mime_type: application/json` + `response_schema`, with a schema converter (JSON Schema lowercase types → Gemini's uppercase OpenAPI-subset types). Range/length constraints (min/max, minLength) aren't enforced by Gemini's schema — those stay enforced by the existing pydantic/zod validation on the caller's side either way.
- All 4 call sites (`ai_scoring.py`, `lead_agent.py`, `pageAgent.ts`, `contentAgent.ts`) now go through the abstraction instead of an SDK directly — swapping providers again later (or adding a third) means touching one file, not four.

## D8 — GEO (Generative Engine Optimization)

### Current status

Decided: add GEO alongside classic SEO, not instead of it. Baseline shipped:

- Organization JSON-LD sitewide (`apps/web/app/layout.tsx`, `lib/jsonLd.ts`), sourced from CMS SiteSettings.
- BlogPosting JSON-LD on Insights posts.
- `/llms.txt` — markdown site index for LLM crawlers (llmstxt.org convention), listing core pages + CMS pages + blog posts with their `aiSummary` where set.
- `robots.ts` — explicit allow rules for GPTBot, ChatGPT-User, ClaudeBot, Claude-Web, PerplexityBot, Google-Extended, CCBot (the wildcard rule already covered them; this makes intent explicit).
- New `aiSummary` field in the `seo` group on Pages, Posts, Resources, CaseStudies — a direct, quotable 2-3 sentence summary meant for AI answer engines to cite verbatim, distinct from the meta description (which is written to earn a click, not to be extracted).

### Not done — needs content/analytics decisions, not just code

- Answer-first content structure on Insights posts (editorial rewrite, not a code task).
- Author/credibility schema (Person schema, bios) — generative engines weight authority in answer synthesis.
- `aiSummary` field is empty on all existing content until an editor fills it in — the CMS field exists, nothing populates it automatically.
- GEO-specific analytics (referrer tracking from chat.openai.com / perplexity.ai / gemini.google.com) — blocked on an analytics tool being chosen at all (nothing wired up yet).

## D6 — Solomon low-cost product

### Current recommendation

Do not create a low-cost product under Solomon name.

### Reason

It weakens Solomon exclusivity and creates pricing-anchor confusion.

### Alternative

Create a separately named readiness toolkit or diagnostic.

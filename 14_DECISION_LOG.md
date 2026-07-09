# 14 — Decision Log

Use this file to prevent Claude/Codex from guessing stakeholder decisions.

## D1 — Assessment naming

### Options

- AESOP
- AI Readiness Assessment
- AI Maturity Index
- AI Readiness Diagnostic

### Current status

Blocked.

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

## D6 — Solomon low-cost product

### Current recommendation

Do not create a low-cost product under Solomon name.

### Reason

It weakens Solomon exclusivity and creates pricing-anchor confusion.

### Alternative

Create a separately named readiness toolkit or diagnostic.

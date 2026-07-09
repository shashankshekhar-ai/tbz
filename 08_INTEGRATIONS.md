# 08 — Integrations

## Integration philosophy

FastAPI stores source-of-truth data first. External tools are updated after. If an external tool fails, the platform must still retain the lead.

## HubSpot

Role:

- CRM
- Contacts
- Pipeline stages
- Segments
- Deal tracking

Events:

- contact form submission
- resource download
- assessment completion
- Columbus conversation
- corporate inquiry

Minimum fields:

- email
- first name
- last name
- company
- role
- source
- interest type
- assessment score
- segment
- recommended next action

## ClickUp

Role:

- Delivery/project brain
- Tasks for leads
- Projects for corporate inquiries
- Checklists for workshops

Events:

- high-intent contact form
- corporate inquiry
- assessment completed
- Columbus high-priority conversation

## n8n

Role:

- Orchestration bridge

Rules:

- n8n workflows must be exported to `workflows/n8n/`
- n8n must not be the only place where lead data exists
- n8n failures must create alerts
- n8n webhooks should receive structured payloads from FastAPI

## SES

Role:

- Transactional email
- Confirmation emails
- Report delivery
- Internal notifications

Emails:

- contact form confirmation
- assessment report delivery
- internal lead alert
- booking confirmation if required
- fallback integration failure alert

## Clerk

Role:

- Auth for lead portal

Usage:

- Next.js handles sign-in/sign-up UI
- FastAPI validates JWT on protected routes
- User can only access own report

## Cal.com

Role:

- Booking

Usage:

- Embedded on Contact page
- Embedded in lead portal
- Booking event should update HubSpot stage where possible

## Columbus / ElevenLabs

Role:

- Public assistant / voice agent entry point

MVP behavior:

- Preserve public CTA / widget where approved
- Route structured data to FastAPI instead of manual email inbox when scope is confirmed
- Store transcript / payload as lead event
- Trigger HubSpot/ClickUp/nurture via n8n

## MailerLite vs HubSpot email

Important conflict to resolve.

One plan says HubSpot becomes CRM/marketing brain. Another plan still references MailerLite sequences.

Recommended MVP decision:

- Use HubSpot for CRM and pipeline
- Keep MailerLite only if existing sequences must be preserved short-term
- Do not build duplicate nurture logic in both tools
- Confirm with stakeholder before implementation

## Integration event payload shape

```json
{
  "event_type": "assessment_completed",
  "lead": {
    "id": "uuid",
    "email": "person@example.com",
    "name": "Jane Doe",
    "company": "Example Co",
    "source": "assessment",
    "segment": "executive",
    "urgency": "high"
  },
  "context": {
    "source_page": "/for-organizations",
    "assessment_score": 78,
    "recommended_next_action": "Book discovery call"
  },
  "timestamp": "2026-07-01T00:00:00Z"
}
```

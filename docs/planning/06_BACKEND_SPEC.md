# 06 — Backend Spec

## App

`apps/api`

## Stack

- FastAPI
- Python 3.11
- SQLAlchemy 2.0 async
- Alembic
- Pydantic v2
- pydantic-settings
- httpx
- Anthropic SDK
- JWT validation for Clerk
- WeasyPrint or equivalent for PDF generation, if report generation remains in MVP

## Suggested module structure

```txt
apps/api/
  app/
    main.py
    core/
      config.py
      db.py
      security.py
      logging.py
      errors.py
      ai.py
    models/
      user.py
      lead.py
      assessment.py
      resource.py
      integration.py
      audit.py
    schemas/
      lead.py
      form.py
      assessment.py
      integration.py
      common.py
    routers/
      health.py
      contact.py
      resources.py
      assessment.py
      columbus.py
      portal.py
      webhooks.py
    services/
      leads.py
      assessment.py
      reports.py
      hubspot.py
      clickup.py
      n8n.py
      ses.py
      clerk.py
      audit.py
    tests/
```

## API response format

All API responses should be consistent:

```json
{
  "ok": true,
  "data": {},
  "error": null,
  "request_id": "uuid"
}
```

Error format:

```json
{
  "ok": false,
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human readable message",
    "details": {}
  },
  "request_id": "uuid"
}
```

## Endpoints

### Health

```txt
GET /health
GET /health/db
```

### Contact

```txt
POST /api/contact
```

Input:

- name
- email
- company
- role
- message
- interest_type
- source_page

Actions:

- validate
- store lead
- emit integration event
- trigger n8n
- send email notification

### Resources

```txt
POST /api/resources/download-request
GET /api/resources/:id/access
```

Actions:

- capture lead
- record requested resource
- provide gated file access
- trigger HubSpot / nurture flow

### Assessment

Public naming is blocked until approved.

Temporary internal route:

```txt
POST /api/assessment/sessions
POST /api/assessment/sessions/{id}/answers
POST /api/assessment/sessions/{id}/complete
GET /api/assessment/sessions/{id}/result
```

Actions:

- create session
- store answers
- score answers
- validate AI response
- store result
- generate report if enabled
- trigger integrations

### Columbus

```txt
POST /api/columbus/webhook
```

Actions:

- receive structured payload from Columbus / ElevenLabs
- parse raw transcript/payload
- create lead event
- classify source
- trigger n8n
- notify internal team

### Portal

```txt
GET /api/me
GET /api/me/reports
GET /api/me/reports/{id}
```

Protected by Clerk JWT.

## AI scoring rules

- AI output must be schema-validated.
- Store prompt version.
- Store model name.
- Store raw AI response for audit.
- Never trust AI output without validation.
- If AI scoring fails, store the lead and trigger manual review.

## Integration reliability rules

- Never lose lead data if HubSpot / ClickUp / n8n fails.
- Store integration events with status:
  - pending
  - sent
  - failed
  - retrying
  - completed
- Use retries with backoff.
- Notify internal team on repeated failure.

## Definition of Done

- API runs locally
- DB migrations work
- `/health` works
- Contact route stores lead
- n8n event is emitted
- Assessment route validates structured AI output
- Auth route validates Clerk token
- Tests cover core services

# CODEX.md

You are OpenAI Codex working on the TBG MVP platform.

## Your role

You are the coding execution agent. You should implement clearly scoped tasks from the execution plan.

## Required reading before work

1. `PROJECT_STATE.md`
2. `EXECUTION_PLAN.md`
3. `01_LOCKED_DECISIONS.md`
4. Relevant spec file for your task

## Rules

- Do not rewrite architecture.
- Do not move files unnecessarily.
- Do not hardcode content.
- Do not add new dependencies without documenting why.
- Do not touch secrets.
- Do not implement blocked decisions.
- Keep changes small and testable.

## Best tasks for Codex

- FastAPI routes
- Pydantic schemas
- SQLAlchemy models
- Alembic migrations
- API client functions
- Form handlers
- Unit tests
- GitHub Actions
- Utility scripts

## Task execution format

For every task:

1. State what file(s) you will modify.
2. Implement.
3. Run tests/lint relevant to the change.
4. Summarize changed files.
5. Update `PROJECT_STATE.md`.

## API response format

Use:

```json
{
  "ok": true,
  "data": {},
  "error": null,
  "request_id": "uuid"
}
```

For errors:

```json
{
  "ok": false,
  "data": null,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": {}
  },
  "request_id": "uuid"
}
```

## Do not do this

- Do not call Anthropic from React.
- Do not store leads only in n8n.
- Do not skip DB migrations.
- Do not send emails before storing the source event.
- Do not assume HubSpot/ClickUp success.

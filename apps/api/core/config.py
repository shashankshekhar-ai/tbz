from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str
    debug: bool = False

    # AI provider — which backend the agents (scoring, lead follow-up, page/content
    # agents in the CMS) call. "gemini" (default/primary) or "anthropic". Both keys
    # can be set at once; this just picks which one is live.
    ai_provider: str = "gemini"
    anthropic_api_key: str = ""
    gemini_api_key: str = ""
    environment: str = "development"

    # Clerk auth — optional in dev, required in production
    clerk_secret_key: str = ""
    clerk_jwks_url: str = ""

    # n8n — generic outbound webhook target for lead/form/resource events.
    # Unset in dev: events are still recorded in integration_events, just not dispatched.
    n8n_webhook_url: str = ""

    # ElevenLabs Conversational AI (Columbus voice agent) — verifies the
    # elevenlabs-signature header on inbound POST /columbus/webhook calls.
    # Unset in dev: signature check is skipped.
    columbus_webhook_secret: str = ""

    # The real production Columbus automation: a self-hosted n8n workflow
    # (Gemini analysis, Paige's internal report email, caller marketing
    # email, Google Sheets log, ClickUp task) that normally only fires from
    # the ElevenLabs voice agent's own post-call webhook. The website's
    # Talk-tab interview (routers/columbus.py, core/columbus_n8n_bridge.py)
    # reaches the *same* workflow directly by posting an ElevenLabs-shaped
    # payload to its webhook URL, signed with its own secret (distinct from
    # columbus_webhook_secret above, which guards our own /columbus/webhook
    # receiver instead). Unset in dev: the bridge call is skipped and
    # recorded in integration_events, same as every other best-effort
    # integration in this module.
    columbus_n8n_webhook_url: str = ""
    columbus_n8n_webhook_secret: str = ""

    # HubSpot / ClickUp — direct API clients (core/hubspot.py, core/clickup.py).
    # Unset in dev: calls are skipped and recorded in integration_events as such.
    hubspot_api_key: str = ""
    clickup_api_key: str = ""
    clickup_list_id: str = ""

    # Where generated assessment PDF reports are written. Mounted as a named
    # volume in docker-compose so reports survive container restarts.
    reports_dir: str = "data/reports"

    # CORS
    cors_origins: list[str] = [
        "http://localhost:3000",
        "http://localhost:3002",
        "http://localhost:3001",
        "https://tbz-web.vercel.app",
        "https://dev.thebradburygroup.net",
    ]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()

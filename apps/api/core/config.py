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
    ]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()

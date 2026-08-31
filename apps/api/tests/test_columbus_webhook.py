import hashlib
import hmac
import json
import time

SECRET = "wsec_test_secret"


def _sign(body: bytes, secret: str = SECRET, timestamp: int | None = None) -> str:
    ts = timestamp if timestamp is not None else int(time.time())
    signed_payload = f"{ts}.{body.decode('utf-8')}".encode("utf-8")
    signature = hmac.new(secret.encode("utf-8"), signed_payload, hashlib.sha256).hexdigest()
    return f"t={ts},v0={signature}"


def _payload():
    return {
        "data": {
            "conversation_id": "conv_123",
            "agent_id": "agent_9201kp1axxvdfprb99958h8wd89s",
            "metadata": {"call_duration_secs": 120},
            "analysis": {
                "transcript_summary": "Visitor asked about AI readiness.",
                "evaluation_criteria_results": {"sentiment": {"result": "positive"}},
                "data_collection_results": {
                    "user_name_spelled": {"value": "jane doe"},
                    "user_email": {"value": "Jane@Example.com"},
                    "user_company": {"value": "Acme Co"},
                    "user_title": {"value": "VP Ops"},
                    "user_location": {"value": "Austin, TX"},
                    "user_phone": {"value": "555-1234"},
                    "Q1": {"value": "We use AI ad hoc"},
                },
            },
        }
    }


def test_columbus_webhook_rejects_bad_signature(client, monkeypatch):
    from core.config import settings

    monkeypatch.setattr(settings, "columbus_webhook_secret", SECRET)
    body = json.dumps(_payload()).encode("utf-8")
    resp = client.post(
        "/columbus/webhook",
        content=body,
        headers={"content-type": "application/json", "elevenlabs-signature": "t=1,v0=deadbeef"},
    )
    assert resp.status_code == 401


def test_columbus_webhook_creates_lead_and_event(client, monkeypatch):
    from core.config import settings

    monkeypatch.setattr(settings, "columbus_webhook_secret", SECRET)
    body = json.dumps(_payload()).encode("utf-8")
    resp = client.post(
        "/columbus/webhook",
        content=body,
        headers={"content-type": "application/json", "elevenlabs-signature": _sign(body)},
    )
    assert resp.status_code == 200
    assert resp.json() == {"status": "received"}

    lead = client.post("/leads", json={"email": "jane@example.com"}).json()
    assert lead["company"] == "Acme Co"
    assert lead["first_name"] == "jane"


def test_columbus_webhook_skips_verification_when_secret_unset(client, monkeypatch):
    from core.config import settings

    monkeypatch.setattr(settings, "columbus_webhook_secret", "")
    body = json.dumps(_payload()).encode("utf-8")
    resp = client.post("/columbus/webhook", content=body, headers={"content-type": "application/json"})
    assert resp.status_code == 200

def test_submit_form_creates_lead_and_submission(client):
    resp = client.post(
        "/forms",
        json={"form_type": "contact", "email": "lead@example.com", "message": "Hi there"},
    )
    assert resp.status_code == 201
    body = resp.json()
    assert body["form_type"] == "contact"
    assert body["lead_id"] is not None

    leads = client.get("/leads").json()
    assert len(leads) == 1
    assert leads[0]["email"] == "lead@example.com"


def test_submit_form_logs_audit_and_integration_event(client):
    client.post("/forms", json={"form_type": "contact", "email": "audit@example.com"})

    audit = client.get("/admin/audit-logs").json()
    assert any(a["action"] == "form.submitted" for a in audit)

    events = client.get("/admin/integration-events").json()
    assert any(e["event_type"] == "form_submitted" and e["target"] == "n8n" for e in events)
    # no N8N_WEBHOOK_URL configured in tests — must be recorded as skipped, not silently dropped
    assert all(e["status"] == "skipped" for e in events if e["event_type"] == "form_submitted")


def test_list_form_submissions(client):
    client.post("/forms", json={"form_type": "newsletter", "email": "sub@example.com"})
    resp = client.get("/forms")
    assert resp.status_code == 200
    assert len(resp.json()) == 1

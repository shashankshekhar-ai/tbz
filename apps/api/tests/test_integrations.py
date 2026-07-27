def test_form_submit_records_hubspot_clickup_skipped(client):
    resp = client.post(
        "/forms",
        json={"form_type": "contact", "email": "skip@example.com", "message": "hi"},
    )
    assert resp.status_code == 201
    body = resp.json()
    assert body["hubspot_synced"] is False
    assert body["clickup_synced"] is False

    events = client.get("/admin/integration-events").json()
    hubspot_events = [e for e in events if e["target"] == "hubspot"]
    clickup_events = [e for e in events if e["target"] == "clickup"]
    assert len(hubspot_events) == 1
    assert len(clickup_events) == 1
    assert hubspot_events[0]["status"] == "skipped"
    assert clickup_events[0]["status"] == "skipped"


def test_resource_download_records_hubspot_skipped(client):
    resp = client.post(
        "/resources/download",
        json={"resource_slug": "guide", "resource_title": "Guide", "email": "res@example.com"},
    )
    assert resp.status_code == 201

    events = client.get("/admin/integration-events").json()
    hubspot_events = [e for e in events if e["target"] == "hubspot"]
    assert len(hubspot_events) == 1
    assert hubspot_events[0]["status"] == "skipped"
    # resources never create ClickUp tasks
    assert not any(e["target"] == "clickup" for e in events)


def test_assessment_complete_records_hubspot_clickup_skipped(client, monkeypatch):
    from core.ai_scoring import AssessmentScore

    fake_score = AssessmentScore(
        overall_score=42,
        maturity_level="building",
        summary="Solid footing, room to grow.",
        recommendations=["Adopt an AI usage policy"],
    )
    monkeypatch.setattr("routers.assessment.score_assessment", lambda answers: fake_score)

    start = client.post("/assessment/start", json={"email": "assess@example.com"})
    token = start.json()["session_token"]
    client.post(f"/assessment/{token}/answers", json={"answers": [{"question_id": "q1", "answer": "yes"}]})

    resp = client.post(f"/assessment/{token}/complete")
    assert resp.status_code == 200
    assert resp.json()["result"]["overall_score"] == 42

    events = client.get("/admin/integration-events").json()
    hubspot_events = [e for e in events if e["target"] == "hubspot"]
    clickup_events = [e for e in events if e["target"] == "clickup"]
    assert len(hubspot_events) == 1
    assert len(clickup_events) == 1
    assert hubspot_events[0]["status"] == "skipped"
    assert clickup_events[0]["status"] == "skipped"

    # follow-up drafting is skipped (no ANTHROPIC_API_KEY) — no audit entry, no HubSpot note
    audit_logs = client.get("/admin/audit-logs").json()
    assert not any(a["action"] == "lead.followup_drafted" for a in audit_logs)

    # report generation doesn't depend on any external key — still produced and downloadable
    report_resp = client.get(f"/assessment/{token}/report")
    assert report_resp.status_code == 200
    assert report_resp.headers["content-type"] == "application/pdf"


def test_assessment_report_404_before_completion(client):
    start = client.post("/assessment/start", json={})
    token = start.json()["session_token"]
    resp = client.get(f"/assessment/{token}/report")
    assert resp.status_code == 404

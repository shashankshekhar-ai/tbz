from unittest.mock import patch

from core.ai_scoring import AssessmentScore


def test_start_assessment_without_email(client):
    resp = client.post("/assessment/start", json={})
    assert resp.status_code == 201
    body = resp.json()
    assert body["status"] == "in_progress"
    assert body["session_token"]


def test_start_assessment_links_lead(client):
    resp = client.post("/assessment/start", json={"email": "assess@example.com"})
    assert resp.status_code == 201

    leads = client.get("/leads").json()
    assert any(l["email"] == "assess@example.com" for l in leads)


def test_submit_answers_and_get_session(client):
    token = client.post("/assessment/start", json={}).json()["session_token"]

    resp = client.post(
        f"/assessment/{token}/answers",
        json={"answers": [{"question_id": "q1", "answer": "yes"}, {"question_id": "q2", "answer": 3}]},
    )
    assert resp.status_code == 200
    assert resp.json()["answers_saved"] == 2

    got = client.get(f"/assessment/{token}")
    assert got.status_code == 200
    assert got.json()["status"] == "in_progress"


def test_answers_for_missing_session_404(client):
    resp = client.post("/assessment/nonexistent/answers", json={"answers": []})
    assert resp.status_code == 404


def test_complete_without_answers_fails(client):
    token = client.post("/assessment/start", json={}).json()["session_token"]
    resp = client.post(f"/assessment/{token}/complete")
    assert resp.status_code == 400


def test_complete_fails_safe_without_api_key(client):
    """No ANTHROPIC_API_KEY in the test environment — completion must degrade
    to scoring_failed, not 500, and the session/answers must survive."""
    token = client.post("/assessment/start", json={}).json()["session_token"]
    client.post(f"/assessment/{token}/answers", json={"answers": [{"question_id": "q1", "answer": "yes"}]})

    resp = client.post(f"/assessment/{token}/complete")
    assert resp.status_code == 200
    body = resp.json()
    assert body["status"] == "scoring_failed"
    assert body["result"] is None

    audit = client.get("/admin/audit-logs").json()
    assert any(a["action"] == "assessment.scoring_failed" for a in audit)


def test_complete_success_with_mocked_scoring(client):
    token = client.post("/assessment/start", json={"email": "scored@example.com"}).json()["session_token"]
    client.post(f"/assessment/{token}/answers", json={"answers": [{"question_id": "q1", "answer": "yes"}]})

    fake_score = AssessmentScore(
        overall_score=55,
        maturity_level="building",
        summary="Good progress, needs structure.",
        recommendations=["Adopt a pilot workflow", "Train the team"],
    )
    with patch("routers.assessment.score_assessment", return_value=fake_score):
        resp = client.post(f"/assessment/{token}/complete")

    assert resp.status_code == 200
    body = resp.json()
    assert body["status"] == "completed"
    assert body["result"]["overall_score"] == 55
    assert body["result"]["maturity_level"] == "building"
    assert body["result"]["recommendations"] == ["Adopt a pilot workflow", "Train the team"]

    events = client.get("/admin/integration-events").json()
    assert any(e["event_type"] == "assessment_completed" for e in events)

    # completing again should just return the stored result, not re-score
    resp2 = client.post(f"/assessment/{token}/complete")
    assert resp2.status_code == 200
    assert resp2.json()["result"]["overall_score"] == 55


def test_list_assessments_admin(client):
    client.post("/assessment/start", json={})
    resp = client.get("/assessment")
    assert resp.status_code == 200
    assert len(resp.json()) == 1

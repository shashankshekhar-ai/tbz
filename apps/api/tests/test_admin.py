def test_admin_endpoints_empty_by_default(client):
    assert client.get("/admin/audit-logs").json() == []
    assert client.get("/admin/integration-events").json() == []


def test_integration_events_status_filter(client):
    client.post("/forms", json={"form_type": "contact", "email": "filter@example.com"})

    skipped = client.get("/admin/integration-events", params={"status": "skipped"}).json()
    # n8n + hubspot + clickup all skipped (no keys configured in tests)
    assert len(skipped) == 3

    success = client.get("/admin/integration-events", params={"status": "success"}).json()
    assert success == []

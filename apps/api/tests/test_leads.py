def test_create_lead(client):
    resp = client.post("/leads", json={"email": "Jane@Example.com", "first_name": "Jane", "source": "contact"})
    assert resp.status_code == 201
    body = resp.json()
    assert body["email"] == "jane@example.com"
    assert body["first_name"] == "Jane"


def test_create_lead_upserts_by_email(client):
    client.post("/leads", json={"email": "jane@example.com", "company": "Acme"})
    resp = client.post("/leads", json={"email": "jane@example.com", "company": "Widgets Inc"})
    assert resp.status_code == 201
    assert resp.json()["company"] == "Widgets Inc"

    listed = client.get("/leads")
    assert listed.status_code == 200
    assert len(listed.json()) == 1


def test_get_lead_not_found(client):
    resp = client.get("/leads/999")
    assert resp.status_code == 404


def test_get_and_patch_lead(client):
    created = client.post("/leads", json={"email": "pat@example.com"}).json()
    lead_id = created["id"]

    got = client.get(f"/leads/{lead_id}")
    assert got.status_code == 200
    assert got.json()["email"] == "pat@example.com"

    patched = client.patch(f"/leads/{lead_id}", json={"company": "New Co"})
    assert patched.status_code == 200
    assert patched.json()["company"] == "New Co"


def test_add_lead_event(client):
    created = client.post("/leads", json={"email": "evt@example.com"}).json()
    resp = client.post(f"/leads/{created['id']}/events", json={"event_type": "page_view"})
    assert resp.status_code == 201


def test_add_lead_event_missing_lead(client):
    resp = client.post("/leads/999/events", json={"event_type": "page_view"})
    assert resp.status_code == 404

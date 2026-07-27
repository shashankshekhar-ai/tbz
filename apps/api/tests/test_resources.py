def test_request_resource_download_issues_token(client):
    resp = client.post(
        "/resources/download",
        json={"email": "reader@example.com", "resource_slug": "ai-playbook"},
    )
    assert resp.status_code == 201
    body = resp.json()
    assert body["resource_slug"] == "ai-playbook"
    assert body["access_token"]


def test_verify_resource_access_valid_token(client):
    created = client.post(
        "/resources/download",
        json={"email": "reader2@example.com", "resource_slug": "case-study"},
    ).json()

    resp = client.get(f"/resources/access/{created['access_token']}")
    assert resp.status_code == 200
    assert resp.json()["resource_slug"] == "case-study"


def test_verify_resource_access_invalid_token(client):
    resp = client.get("/resources/access/not-a-real-token")
    assert resp.status_code == 404


def test_list_resource_downloads(client):
    client.post("/resources/download", json={"email": "reader3@example.com", "resource_slug": "guide"})
    resp = client.get("/resources")
    assert resp.status_code == 200
    assert len(resp.json()) == 1

#!/usr/bin/env bash
# One-shot: rebuild web+api's production images, bring them up, smoke-test,
# then git push straight to origin/main. Run from the IDE's terminal (or the
# host) inside this repo. Direct/no approval gate, by design — see
# docs/planning/20_DOKPLOY_DEPLOYMENT.md for the reasoning.
#
# Usage: infra/scripts/deploy.sh [-m "commit message"]
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/../.."

PROJECT=tbz

if [ "${1:-}" = "-m" ]; then
  MSG="${2:?commit message required after -m}"
  git add -A
  git commit -m "$MSG"
elif [ -n "$(git status --porcelain)" ]; then
  echo "Uncommitted changes present. Commit first, or pass a message: deploy.sh -m \"message\"" >&2
  exit 1
fi

echo "==> docker compose build (web-prod, api-prod)"
docker compose -f docker-compose.yml -f docker-compose.prod.yml -p "$PROJECT" build web-prod api-prod

echo "==> docker compose up -d (web-prod, api-prod)"
docker compose -f docker-compose.yml -f docker-compose.prod.yml -p "$PROJECT" up -d web-prod api-prod

echo "==> smoke test"
sleep 3
curl -fsS -o /dev/null http://127.0.0.1:3102 && echo "web-prod OK"
curl -fsS -o /dev/null http://127.0.0.1:8003/health && echo "api-prod OK"

echo "==> git push origin main"
git push origin main

echo "Deployed and pushed."

# Dokploy Deployment Notes

Reference notes for deploying this monorepo (`apps/api`, `apps/cms`, `apps/web`) via [Dokploy](https://dokploy.com) instead of, or alongside, the current Vercel setup for `apps/web` (see status note in the root `README.md`).

## Install

Needs a fresh-ish VM/server — doesn't play well installed alongside a lot of pre-existing Docker stuff.

```bash
curl -sSL https://dokploy.com/install.sh | sh
```

Runs on port 3000 by default and gives you the dashboard.

## Monorepo setup

Dokploy handles monorepos fine — this is a common setup, not an edge case. Since this repo already has `apps/api`, `apps/cms`, and `apps/web` each with their own `Dockerfile`, this maps cleanly:

- Create one Dokploy **Application** per subfolder, all pointing at the same git repo, but with a different **Build Path** / root directory each:
  - App `api` → build path `apps/api` → own domain/port
  - App `cms` → build path `apps/cms` → own domain/port
  - App `web` → build path `apps/web` → own domain/port (if moved off Vercel)
- Each app builds and deploys independently on push; they just share a git source.

## Things to watch for

- **Build context vs. Dockerfile location** — if a subfolder's Dockerfile needs files outside its own folder (shared types, root-level configs, `pnpm-workspace.yaml`, etc.), the Docker **build context** must be the repo root even though the Dockerfile lives in the subfolder, so `COPY` can reach the shared code. Worth confirming this repo's `apps/*/Dockerfile`s already assume repo-root context (they likely do, since local dev already builds through the root `docker-compose.yml`).
- **Build triggers** — by default, pushing anything to the repo triggers a rebuild of every app, even if only one subfolder changed. Dokploy has no native "only rebuild if this path changed" filtering. Either accept all three rebuilding on every push (fine if builds are fast) or manage the filtering manually.
- **Preview deployments** — enable per-app in settings; spins up a live preview URL on PR/branch push, separate from the production deploy.
- **Domains** — Dokploy handles Traefik + SSL; point a subdomain's DNS at the server and set it in the app config.

## Recommended order of operations

1. Verify each subfolder builds standalone with build context at repo root, e.g.:
   ```bash
   docker build -f apps/api/Dockerfile .
   docker build -f apps/cms/Dockerfile .
   docker build -f apps/web/Dockerfile .
   ```
   This is where monorepo Docker setups usually break — catch it locally before touching Dokploy.
2. Confirm each app folder's deploy source is a git repo Dokploy can pull from (this repo already is — `origin/main`). Dokploy pulls from git, it doesn't watch a local folder on disk, so any workflow of editing directly on the server would need to shift to git-push-to-deploy.
3. Install Dokploy on the target server.
4. Create the three Applications in the dashboard, one per build path, and wire up domains.

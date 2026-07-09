# TBG Platform — Project Setup Plan

> Execution runbook for standing up the monorepo and dev environment. Fresh repo, nothing exists yet, Linux dev machine. Commands are copy-paste ready.

---

## 0. What's unblocked vs. blocked right now

Don't wait on Aparna/Paige to start building — most of this doesn't depend on the three open conflicts. Split the work so you're never idle:

**Unblocked — start today:**
- Monorepo scaffold, tooling, linting, CI skeleton
- Payload CMS install + auth/users collection + media collection
- Next.js 15 install + base layout, design tokens, CMS data-fetching wiring
- FastAPI service skeleton + health check + DB connection
- Local Docker Compose stack (Postgres, Payload, Next.js, FastAPI all running together)
- AWS account/IAM setup, S3 bucket, RDS instance (infra doesn't care about page names)

**Blocked — needs Paige/Aparna sign-off before you build it:**
- The actual **Page** collection block schema (depends on final nav — 5 items vs. 8 items)
- The **AESOP / AI Readiness Assessment** FastAPI endpoint naming and scoring logic (depends on conflict #1)
- **Columbus routing** middleware (depends on conflict #2 — in/out of scope)
- The **"Our AI Return"** content model (depends on conflict #3)

Rule: build the plumbing now, leave the page-block schema and assessment-naming as a single deferred task you can drop in once Paige signs off. Don't guess at names in code — you'll be doing find-and-replace across FastAPI routes, Payload collections, and Next.js dynamic routes if you guess wrong.

---

## 1. Local prerequisites (one-time, ~15 min)

```bash
# Node (via nvm) — Next.js 15 needs Node 18.18+ or 20+
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
node -v

# pnpm (monorepo package manager — faster than npm for workspaces)
corepack enable
corepack prepare pnpm@latest --activate
pnpm -v

# Python 3.11+ for FastAPI
sudo apt update && sudo apt install -y python3.11 python3.11-venv python3-pip
python3.11 --version

# Docker + Compose (local Postgres, and to mirror prod containers)
sudo apt install -y docker.io docker-compose-plugin
sudo usermod -aG docker $USER   # log out/in after this
docker --version

# AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip && sudo ./aws/install
aws --version
aws configure   # access key, secret, region (us-east-1 or your AWS credits region)
```

---

## 2. Monorepo scaffold

```bash
mkdir tbg-platform && cd tbg-platform
git init
pnpm init

mkdir -p apps/web apps/cms apps/api infra docs
```

Create `pnpm-workspace.yaml`:
```yaml
packages:
  - "apps/*"
```

Root `.gitignore`:
```
node_modules/
.next/
dist/
.env
.env.local
__pycache__/
*.pyc
.venv/
media/
```

Copy your existing `CLAUDE.md` into the repo root — this is what keeps AI-assisted coding sessions consistent as you and any collaborators build. Also drop `TBG_45Day_Full_Plan.docx` into `/docs` for reference (don't commit large binaries long-term — link to the source of truth instead once it's in ClickUp/Drive).

```bash
git add .
git commit -m "chore: monorepo scaffold"
```

---

## 3. Payload CMS (`apps/cms`)

```bash
cd apps/cms
pnpm create payload-app@latest . --db postgres --template blank
```

When prompted: project name `tbg-cms`, package manager `pnpm`, skip examples.

**Build only what's nav-independent right now:**
- `Users` collection (auth) — scaffolded by default, just confirm roles: `admin`, `editor` (Aparna needs `editor`)
- `Media` collection — scaffolded by default
- `Pages` collection — create the collection **shell only** (slug, title, status, SEO fields). Leave the `blocks` field empty/commented — that's the piece waiting on nav sign-off.

```bash
pnpm dev   # Payload admin at localhost:3000/admin
```

Create your local `.env` in `apps/cms`:
```
DATABASE_URI=postgresql://tbg:tbg_dev@localhost:5433/tbg_cms
PAYLOAD_SECRET=<generate with: openssl rand -base64 32>
PORT=3001
```

---

## 4. Next.js 15 (`apps/web`)

```bash
cd ../../apps/web
pnpm create next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

Install the Payload REST/GraphQL client helper:
```bash
pnpm add graphql-request
```

Build now: root layout, header/footer shell (placeholder nav, swap in real items once confirmed), design tokens matching Niharika's design system, and a generic `[slug]/page.tsx` that fetches a page from Payload by slug and renders whatever blocks exist. This route is nav-agnostic — it'll work whether the final nav has 5 items or 8.

`.env.local`:
```
NEXT_PUBLIC_CMS_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 5. FastAPI (`apps/api`)

```bash
cd ../../apps/api
python3.11 -m venv .venv
source .venv/bin/activate
pip install fastapi uvicorn[standard] sqlalchemy psycopg2-binary python-dotenv pydantic-settings anthropic
pip freeze > requirements.txt
```

Minimal structure:
```
apps/api/
  main.py
  routers/
    health.py
    # assessment.py   <- placeholder, don't name the route yet (AESOP conflict)
  models/
  core/
    config.py
    db.py
```

`main.py` should stand up the app, DB connection, and a `/health` endpoint only. **Do not create the `/assessment` or `/aesop` route yet** — naming it before conflict #1 is resolved means you'll rename it in code, in the Next.js fetch calls, and in any HubSpot workflow webhooks pointing at it. Leave a `# TODO: assessment endpoint — blocked on AESOP naming, see CLAUDE.md` comment instead.

`.env`:
```
DATABASE_URL=postgresql://tbg:tbg_dev@localhost:5433/tbg_api
ANTHROPIC_API_KEY=<your key>
```

---

## 6. Local Docker Compose (ties it all together)

`docker-compose.yml` at repo root:
```yaml
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: tbg
      POSTGRES_PASSWORD: tbg_dev
    ports:
      - "5433:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
```

Run it, then run all three apps in separate terminals (or use `pnpm -r --parallel dev` once scripts are wired):
```bash
docker compose up -d
cd apps/cms && pnpm dev &
cd apps/web && pnpm dev &
cd apps/api && source .venv/bin/activate && uvicorn main:app --reload --port 8000 &
```

You should now have Payload admin, Next.js frontend, and FastAPI all running locally against one Postgres instance.

---

## 7. AWS infra (credits-first, do this in parallel with local dev)

This doesn't block on anything — provision it this week so it's ready when you deploy.

```bash
# S3 bucket for Payload media
aws s3 mb s3://tbg-platform-media --region us-east-1

# RDS Postgres (db.t3.micro, MVP-sized)
aws rds create-db-instance \
  --db-instance-identifier tbg-platform-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username tbgadmin \
  --master-user-password '<generate a strong password, store in a secrets manager, not here>' \
  --allocated-storage 20 \
  --no-publicly-accessible

# SES — request production access if still in sandbox (takes 24h, do this NOW)
aws ses get-account-sending-enabled
```

EC2 + CloudFront setup is a Week 2-3 deployment task, not Week 1 — get local dev solid first, don't provision compute you're not using yet.

---

## 8. CI skeleton (GitHub Actions)

`.github/workflows/ci.yml` — lint + typecheck on push, nothing fancy yet:
```yaml
name: CI
on: [push, pull_request]
jobs:
  web:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm }
      - run: pnpm install
      - run: pnpm -F web lint
```

---

## 9. Week 1 sequencing (maps to the sprint plan in the technical doc)

| Day | Task | Blocked? |
|---|---|---|
| 1 | Sections 1-2 of this doc: prereqs + monorepo scaffold | No |
| 1-2 | Payload CMS install, Users/Media collections, auth working | No |
| 2 | Next.js scaffold, layout, design tokens, generic page renderer | No |
| 2-3 | FastAPI scaffold, health check, DB connection, Anthropic SDK wired | No |
| 3 | AWS provisioning (S3, RDS, SES sandbox request) | No |
| 3-4 | **Send Paige/Aparna the three-question list** (AESOP, Columbus, Our AI Return) — this is the single action that unblocks Week 2 | — |
| 4-5 | Docker Compose full stack running, CI skeleton, first commit to shared repo | No |
| End of Week 1 | Page block type definitions **must** be agreed in the daily huddle (per Section 14 risk) before Week 2 page work starts | Depends on Day 3-4 action |

The critical-path item isn't technical — it's getting the three-question list in front of Paige and Aparna by Day 3. Everything else in this plan can proceed without them.

---

## 10. Immediate next actions

1. Run Sections 1-2 today.
2. Send the three open questions (AESOP naming, Columbus scope, "Our AI Return" definition) to Aparna/Paige — don't wait for a meeting, send it as a specific decision request with the three options laid out, same as flagged in the content architecture doc review.
3. Scaffold CMS + web + api in parallel (they don't depend on each other to start).
4. Provision AWS S3/RDS/SES this week regardless of the nav decision.
5. Once the three answers come back, update `CLAUDE.md` with final nav/page names, then build the `Pages.blocks` field and the FastAPI assessment route in one pass.

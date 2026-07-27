# 09 — AWS Infrastructure

## Goal

Credits-first MVP infrastructure that is simple, cheap, and reliable enough for launch.

## MVP services

- EC2 t3.micro or equivalent
- RDS PostgreSQL db.t3.micro
- S3 bucket
- CloudFront
- SES
- CloudWatch
- Sentry free tier
- Nginx
- GitHub Actions deploy

## Recommended deployment

```txt
EC2:
  FastAPI: localhost:8000
  Payload CMS: localhost:3001
  Nginx:
    /api/* -> FastAPI
    /cms/* -> Payload
    /* -> frontend origin / CloudFront / Vercel depending final host
```

## Environments

- local
- staging
- production

## Secrets

Do not commit secrets.

MVP acceptable:

- `.env` on EC2 with locked file permissions

Better:

- AWS SSM Parameter Store
- AWS Secrets Manager

## S3 buckets

Suggested:

- `tbg-platform-media`
- `tbg-platform-reports`
- or single bucket with folders:
  - `/media`
  - `/resources`
  - `/reports`

## Backups

- RDS daily automated backup
- S3 versioning enabled
- n8n workflows exported to repo
- Environment variables documented but not committed

## CI/CD

GitHub Actions should:

- lint
- typecheck
- test
- build
- deploy staging
- deploy production only after approval

## DNS cutover

Before cutover:

- Export WordPress backup
- Export WordPress database
- Capture current URL list
- Prepare redirects
- Verify SSL
- Verify forms
- Verify CMS
- Verify rollback target

## Cost guardrails

Avoid:

- NAT Gateway
- ECS/Fargate unless needed
- Multiple EC2 instances in free-tier period
- ElastiCache
- Unattached Elastic IPs
- Overbuilt RDS instance
- Overbuilt observability stack

## Definition of Done

- Site loads with SSL
- API reachable
- CMS reachable and protected
- Media served from S3/CloudFront
- Database backup enabled
- Deploy is automated
- Monitoring alerts exist

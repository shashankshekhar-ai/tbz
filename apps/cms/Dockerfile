FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@11.5.3 --activate

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/cms/package.json ./apps/cms/
RUN pnpm install --frozen-lockfile --filter tbg-cms

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/cms/node_modules ./apps/cms/node_modules
COPY apps/cms ./apps/cms
COPY pnpm-workspace.yaml package.json ./
ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_URI=postgresql://tbg:tbg_dev@postgres:5432/tbg_cms
ENV PAYLOAD_SECRET=build_placeholder
RUN pnpm -F tbg-cms build

FROM base AS runner
WORKDIR /app/apps/cms
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 payload
COPY --from=builder --chown=payload:nodejs /app/node_modules /app/node_modules
COPY --from=builder --chown=payload:nodejs /app/apps/cms/node_modules ./node_modules
COPY --from=builder --chown=payload:nodejs /app/apps/cms/.next ./.next
COPY --from=builder --chown=payload:nodejs /app/apps/cms/package.json ./package.json
COPY --from=builder --chown=payload:nodejs /app/package.json /app/package.json
RUN ln -sf /app/node_modules/.pnpm/node_modules/drizzle-kit ./node_modules/drizzle-kit
# WORKDIR (/app/apps/cms) is created by Docker as root:root — the --chown
# flags above only cover files/dirs actually COPY'd in, so the payload user
# can write into .next/node_modules but can't create a brand-new top-level
# entry here at runtime. Payload's media upload does exactly that (mkdir
# 'media' the first time something is uploaded), which fails with EACCES
# without this. Confirmed via a real upload attempt reproducing the error.
RUN mkdir -p media && chown payload:nodejs media
USER payload
EXPOSE 3003
ENV PORT=3003
ENV HOSTNAME=0.0.0.0
CMD ["node_modules/.bin/next", "start", "--port", "3003"]

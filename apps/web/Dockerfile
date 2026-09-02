FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@11.5.3 --activate

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/web/package.json ./apps/web/
RUN pnpm install --frozen-lockfile --filter tbg-web

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
COPY apps/web ./apps/web
COPY pnpm-workspace.yaml package.json ./
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_CMS_URL=https://cms.thebradburygroup.net
ARG NEXT_PUBLIC_API_URL=https://api.thebradburygroup.net
ENV NEXT_PUBLIC_CMS_URL=${NEXT_PUBLIC_CMS_URL}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
RUN pnpm -F tbg-web build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
# Standalone monorepo layout: server lives at apps/web/server.js
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
USER nextjs
EXPOSE 3002
ENV PORT=3002
ENV HOSTNAME=0.0.0.0
CMD ["node", "apps/web/server.js"]

# -----------------------------------------------------------------------------
# 1. Base image with necessary Alpine runtime packages
# -----------------------------------------------------------------------------
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat openssl netcat-openbsd

# -----------------------------------------------------------------------------
# 2. Dependencies installation stage
# -----------------------------------------------------------------------------
FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps --force --ignore-scripts

# -----------------------------------------------------------------------------
# 3. Builder stage
# -----------------------------------------------------------------------------
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV DATABASE_URL="postgresql://postgres:postgres@localhost:5432/dummy"
ENV AUTH_SECRET="build-time-dummy-secret-at-least-32-chars-long!"

# Generate Prisma Client
RUN npx prisma generate

# Bundle seed script into standalone JS for zero-dependency execution
RUN npx esbuild prisma/seed.ts --bundle --platform=node --target=node20 --outfile=prisma/seed.bundle.js --external:pg-native

# Build Next.js with standalone output
RUN npm run build

# -----------------------------------------------------------------------------
# 4. Production Runner stage (Lightweight, Non-root)
# -----------------------------------------------------------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3010
ENV HOSTNAME="0.0.0.0"

# Install global prisma CLI for running migrations in runner
RUN npm install -g prisma@6.19.3

# Create non-root system user and group
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy static assets and standalone server bundle
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/src/generated/prisma ./src/generated/prisma
RUN rm -f /app/prisma.config.ts

# Ensure upload directory exists and is owned by nextjs user
RUN mkdir -p /app/public/uploads/logos && \
    chown -R nextjs:nodejs /app/public/uploads

# Copy and setup entrypoint script
COPY --chown=nextjs:nodejs docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

# Switch to non-root user
USER nextjs

EXPOSE 3010

HEALTHCHECK --interval=15s --timeout=5s --start-period=20s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3010/api/health || exit 1

ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["node", "server.js"]

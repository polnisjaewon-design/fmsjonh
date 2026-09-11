#!/bin/sh
set -e

echo "=================================================================="
echo "  Starting FMS MCU Production Container"
echo "=================================================================="

DB_HOST="${DB_HOST:-db}"
DB_PORT="${DB_PORT:-5432}"

echo "⏳ Waiting for PostgreSQL at $DB_HOST:$DB_PORT to be ready..."
while ! nc -z "$DB_HOST" "$DB_PORT"; do
  sleep 1
done
echo "✅ PostgreSQL is accepting connections."

# Clean up development prisma config in standalone container if present
rm -f /app/prisma.config.ts

echo "🚀 Applying database migrations (prisma migrate deploy)..."
prisma migrate deploy --schema=./prisma/schema.prisma

if [ "$SEED_ON_BOOT" = "1" ] || [ "$SEED_ON_BOOT" = "true" ]; then
  echo "🌱 Executing initial database seed..."
  SEED_ALLOW_PROD=1 node prisma/seed.bundle.js || echo "⚠️ Seed script completed or skipped."
fi

echo "🌟 Launching Next.js Production Server on http://0.0.0.0:3010..."
exec "$@"

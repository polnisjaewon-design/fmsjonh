#!/usr/bin/env bash
set -e

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKUP_DIR="$REPO_DIR/prisma/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/ums_prod_backup_${TIMESTAMP}.sql"
LATEST_FILE="$BACKUP_DIR/ums_prod_backup.sql"

export PATH="/Applications/Docker.app/Contents/Resources/bin:/usr/local/bin:/opt/homebrew/bin:$PATH"

mkdir -p "$BACKUP_DIR"

echo "=== Exporting PostgreSQL Database Backup ==="
docker exec fms_postgres_prod pg_dump -U postgres --clean --if-exists ums_prod > "$LATEST_FILE"
cp "$LATEST_FILE" "$BACKUP_FILE"

echo "✔ Backup created at: $LATEST_FILE"
echo "✔ Timestamped backup created at: $BACKUP_FILE"

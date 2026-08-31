#!/bin/bash
# Restore one database from a backup-dbs.sh dump.
# Usage: restore-db.sh <database> [path-to-dump.sql.gz]
#   database: tbg_api | tbg_cms | tbg_api_prod | tbg_cms_prod
#   dump: defaults to the most recent backup for that database in
#         /home/admin/tbg/db-backups
#
# DESTRUCTIVE: drops and recreates the target database before restoring.
# Always confirms before running unless -y is passed.
set -euo pipefail

BACKUP_DIR="/home/admin/tbg/db-backups"
DB="${1:-}"
DUMP="${2:-}"
ASSUME_YES=0
for arg in "$@"; do
  [ "$arg" = "-y" ] && ASSUME_YES=1
done

if [ -z "$DB" ]; then
  echo "Usage: $0 <tbg_api|tbg_cms|tbg_api_prod|tbg_cms_prod> [dump.sql.gz] [-y]" >&2
  exit 1
fi

# $DB gets embedded in a double-quoted SQL identifier below (DROP/CREATE
# DATABASE "$DB") — the caller (routers/backups.py) already validates this
# against a fixed enum before invoking this script, but check it here too
# so the script stays safe even if something else ever calls it directly.
case "$DB" in
  tbg_api|tbg_cms|tbg_api_prod|tbg_cms_prod) ;;
  *) echo "Refusing unknown database '$DB' — must be one of: tbg_api, tbg_cms, tbg_api_prod, tbg_cms_prod" >&2; exit 1 ;;
esac

if [ -z "$DUMP" ] || [ "$DUMP" = "-y" ]; then
  DUMP="$(ls -t "$BACKUP_DIR/${DB}_"*.sql.gz 2>/dev/null | head -1)"
  if [ -z "$DUMP" ]; then
    echo "No backups found for $DB in $BACKUP_DIR" >&2
    exit 1
  fi
fi

if [ ! -f "$DUMP" ]; then
  echo "Dump file not found: $DUMP" >&2
  exit 1
fi

echo "About to DROP and restore '$DB' from: $DUMP"
if [ "$ASSUME_YES" != "1" ]; then
  read -r -p "Type the database name to confirm: " confirm
  if [ "$confirm" != "$DB" ]; then
    echo "Confirmation did not match — aborting."
    exit 1
  fi
fi

docker exec tbz-postgres-1 psql -U tbg -d postgres -c "DROP DATABASE IF EXISTS \"$DB\";"
docker exec tbz-postgres-1 psql -U tbg -d postgres -c "CREATE DATABASE \"$DB\";"
gunzip -c "$DUMP" | docker exec -i tbz-postgres-1 psql -U tbg -d "$DB"
echo "Restored $DB from $DUMP"

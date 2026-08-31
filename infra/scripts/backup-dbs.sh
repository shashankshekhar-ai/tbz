#!/bin/bash
# Daily logical backup of all 4 Postgres databases (tbg_api, tbg_cms,
# tbg_api_prod, tbg_cms_prod — see infra/scripts/init-dbs.sh) into
# /home/admin/tbg/db-backups on the HOST, outside any container's lifecycle.
#
# This is separate from (and does not replace) two other existing safety
# nets: the `pgdata` named Docker volume (survives container recreate but
# not a bad migration/DELETE), and AIwebmaster's own pre-publish backup of
# tbg_cms_prod only (core/executors.py run_publish — tied to the publish
# workflow, not scheduled, not the other 3 databases).
#
# Off-host copy: each dump is also age-encrypted (recipient file below —
# public key only, safe to commit) and pushed to a dedicated private repo
# via a repo-scoped SSH deploy key (~/.ssh/tbg-backup-deploy-key, Host alias
# github-tbg-backups in ~/.ssh/config) — NOT the same key used for code
# pushes. Local backups on this same disk protect against a bad migration
# or DELETE; this protects against losing the host/disk entirely. Decrypt
# with the age PRIVATE key (generated once, handed to the operator, never
# stored on this host): `age -d -i private-key.txt -o out.sql.gz file.age`.
# A git/network failure here is logged but never fails the local backup.
#
# Dev (tbg_api/tbg_cms) and prod (tbg_api_prod/tbg_cms_prod) go to SEPARATE
# branches of the same repo — `dev` in the main clone
# (db-backups-repo), `prod` in a `git worktree` checkout
# (db-backups-repo-prod) — so a prod restore can never accidentally pull in
# a dev dump or vice versa, and each branch's history/retention is
# independent.
#
# Each database keeps exactly ONE file in the repo (`<db>.sql.gz.age`,
# overwritten every run) — git's own commit history is the timeline, not a
# pile of timestamped files. To restore yesterday's (or any day's) dump:
#   git -C db-backups-repo log --oneline -- tbg_cms.sql.gz.age   # find the commit
#   git -C db-backups-repo show <sha>:tbg_cms.sql.gz.age > tbg_cms.sql.gz.age
# See each branch's README.md for the full decrypt+restore flow.
#
# Also backs up rewamped-site/.env itself (encrypted, same as the DB dumps)
# — SESSION_SECRET, CMS_SERVICE_TOKEN, PAYLOAD_SECRET, etc. live ONLY in
# that file on this host's disk; a restored database is useless without it
# (nothing can authenticate). Goes to the dev branch — it's one shared
# config file, not split by environment.
#
# Run via systemd timer tbg-db-backup.timer — see
# /etc/systemd/system/tbg-db-backup.{service,timer}.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
BACKUP_DIR="/home/admin/tbg/db-backups"
AGE_RECIPIENT_FILE="$SCRIPT_DIR/backup-age-recipient.txt"
KEEP_DAYS=14
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"

# database name -> encrypted-repo worktree (branch = the worktree's checked-out branch)
declare -A REPO_DIR_FOR_DB=(
  [tbg_api]="/home/admin/tbg/db-backups-repo"
  [tbg_cms]="/home/admin/tbg/db-backups-repo"
  [tbg_api_prod]="/home/admin/tbg/db-backups-repo-prod"
  [tbg_cms_prod]="/home/admin/tbg/db-backups-repo-prod"
)

mkdir -p "$BACKUP_DIR"

for db in "${!REPO_DIR_FOR_DB[@]}"; do
  out="$BACKUP_DIR/${db}_${STAMP}.sql.gz"
  if docker exec tbz-postgres-1 pg_dump -U tbg "$db" | gzip > "$out"; then
    echo "backed up $db -> $out ($(du -h "$out" | cut -f1))"
  else
    echo "FAILED to back up $db" >&2
    rm -f "$out"
    continue
  fi

  repo_dir="${REPO_DIR_FOR_DB[$db]}"
  if [ -f "$AGE_RECIPIENT_FILE" ] && [ -e "$repo_dir/.git" ]; then
    # Fixed filename, no timestamp — overwritten every run. git history is
    # the point-in-time record, not the filename.
    enc="$repo_dir/${db}.sql.gz.age"
    if age -r "$(cat "$AGE_RECIPIENT_FILE")" -o "$enc" "$out"; then
      echo "encrypted $db -> $enc"
    else
      echo "FAILED to encrypt $db (local backup still kept)" >&2
    fi
  fi
done

# Encrypt + stage .env alongside the dev DB dumps — same fixed-filename,
# git-history-is-the-timeline pattern as the databases above.
if [ -f "$REPO_ROOT/.env" ] && [ -f "$AGE_RECIPIENT_FILE" ] && [ -e "/home/admin/tbg/db-backups-repo/.git" ]; then
  if age -r "$(cat "$AGE_RECIPIENT_FILE")" -o "/home/admin/tbg/db-backups-repo/env.age" "$REPO_ROOT/.env"; then
    echo "encrypted .env -> /home/admin/tbg/db-backups-repo/env.age"
  else
    echo "FAILED to encrypt .env" >&2
  fi
fi

# Retention: delete local dumps older than KEEP_DAYS, per database. (Local
# dir isn't git-backed, so it still needs timestamped files + mtime pruning
# to keep any history at all — unlike the repo below.)
find "$BACKUP_DIR" -name '*.sql.gz' -mtime "+${KEEP_DAYS}" -print -delete

# Push each branch/worktree independently. No file pruning needed here —
# each database is always exactly one file, overwritten in place; the
# commit history itself is the retention/timeline mechanism, unbounded for
# now (dumps are small — empty/near-empty DBs today; revisit with a git
# history trim if that ever changes).
# Marker files record the last successful off-host push per branch, in
# BACKUP_DIR (shared with the aiwebmaster container) — that container has
# no SSH key and can't reach the encrypted repos itself (deliberately), so
# this is the only way its UI can show real off-host sync status instead of
# just "local backup exists" and hoping the push worked.
push_branch() {
  local repo_dir="$1" branch="$2"
  [ -e "$repo_dir/.git" ] || return 0
  # Bind-mounted dir (host UID owns it; may run as root in a container) —
  # git's dubious-ownership check blocks operations otherwise.
  git config --global --add safe.directory "$repo_dir"
  git -C "$repo_dir" add -A
  if ! git -C "$repo_dir" diff --cached --quiet; then
    git -C "$repo_dir" commit -q -m "backup $STAMP"
    if GIT_SSH_COMMAND="ssh -o StrictHostKeyChecking=accept-new" git -C "$repo_dir" push -q origin "HEAD:$branch"; then
      echo "pushed $branch encrypted backups to off-host repo"
      date -u +%Y%m%dT%H%M%SZ > "$BACKUP_DIR/.last_offhost_push_${branch}"
    else
      echo "FAILED to push $branch encrypted backups off-host (committed locally, will retry next run)" >&2
    fi
  else
    echo "no $branch encrypted backup changes to push"
    # Nothing changed = still in sync as of now, from the UI's point of
    # view — don't leave the marker looking stale just because content
    # hasn't actually changed since the last real push.
    date -u +%Y%m%dT%H%M%SZ > "$BACKUP_DIR/.last_offhost_push_${branch}"
  fi
}

push_branch "/home/admin/tbg/db-backups-repo" "dev"
push_branch "/home/admin/tbg/db-backups-repo-prod" "prod"

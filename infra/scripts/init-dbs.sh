#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
  CREATE DATABASE tbg_api;
  -- Production stack (docker-compose.prod.yml) — separate DB on the same
  -- Postgres instance.
  CREATE DATABASE tbg_api_prod;
EOSQL

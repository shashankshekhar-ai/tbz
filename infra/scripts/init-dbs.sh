#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
  CREATE DATABASE tbg_cms;
  CREATE DATABASE tbg_api;
  -- Production stack (docker-compose.prod.yml) — separate DBs on the same
  -- Postgres instance, promoted into via AIwebmaster's "publish" action.
  CREATE DATABASE tbg_cms_prod;
  CREATE DATABASE tbg_api_prod;
EOSQL

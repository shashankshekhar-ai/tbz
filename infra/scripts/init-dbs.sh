#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
  CREATE DATABASE tbg_cms;
  CREATE DATABASE tbg_api;
EOSQL

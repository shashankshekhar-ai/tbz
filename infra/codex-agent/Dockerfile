# Isolated sandbox for running OpenAI's Codex CLI with full agentic tool
# access (its own file-edit + bash tools, no propose/approve gate). Mirrors
# infra/claude-agent/Dockerfile exactly — isolation is structural, not
# policy: this container has no docker socket, no prod DB credentials, no
# root .env, and no route to postgres/prod on the network — see
# docker-compose.yml's `codex-agent` service + `sandbox` network.
FROM node:22-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    git ca-certificates curl \
    && npm install -g @openai/codex \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace
COPY run.sh /usr/local/bin/run.sh
RUN chmod +x /usr/local/bin/run.sh

ENTRYPOINT ["/usr/local/bin/run.sh"]

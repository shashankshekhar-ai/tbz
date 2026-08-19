# Isolated sandbox for running Claude Code CLI with full agentic tool access
# (its own file-edit + bash tools, no propose/approve gate). Isolation is
# structural, not policy: this container has no docker socket, no prod DB
# credentials, no root .env, and no route to postgres/prod on the network —
# see docker-compose.yml's `claude-agent` service + `sandbox` network.
FROM node:22-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    git ca-certificates curl \
    && npm install -g @anthropic-ai/claude-code \
    && rm -rf /var/lib/apt/lists/*

# Claude Code refuses --permission-mode bypassPermissions (needed below,
# non-interactive mode has no TTY to answer approval prompts) when run as
# root, "for security reasons" — confirmed by testing. node:22-slim already
# ships a uid/gid-1000 "node" user, which conveniently matches this host's
# user, so the bind-mounted apps/* directories (owned 1000:1000 on the host)
# stay writable.
RUN mkdir -p /workspace && chown node:node /workspace
# Pre-create /transcripts owned by node so the claude_agent_transcripts named
# volume inherits that ownership on first mount (Docker copies the image's
# existing directory content/ownership into a fresh named volume) — without
# this, the volume mounts root-owned and run.sh's `tee` fails with
# "Permission denied" (confirmed by testing).
RUN mkdir -p /transcripts && chown node:node /transcripts

WORKDIR /workspace
COPY run.sh /usr/local/bin/run.sh
RUN chmod +x /usr/local/bin/run.sh
USER node

ENTRYPOINT ["/usr/local/bin/run.sh"]

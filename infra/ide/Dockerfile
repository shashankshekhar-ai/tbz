# Browser IDE (code-server = VS Code in the browser) for editing this repo
# directly on the server, with push access from inside the container. Needs
# the docker CLI (rebuild/up) and git+ssh (push) — see the `ide` service in
# docker-compose.yml for the actual socket/key mounts and group_add that
# make those usable from here.
FROM codercom/code-server:latest

USER root
RUN apt-get update && apt-get install -y --no-install-recommends \
      git openssh-client ca-certificates curl \
    && ARCH="$(dpkg --print-architecture)" \
    && curl -fsSL -o /tmp/docker.tgz "https://download.docker.com/linux/static/stable/$( [ "$ARCH" = arm64 ] && echo aarch64 || echo x86_64 )/docker-27.3.1.tgz" \
    && tar -xzf /tmp/docker.tgz -C /usr/local/bin --strip-components=1 docker/docker \
    && rm /tmp/docker.tgz \
    # Node 22 + the Claude Code CLI — same package claude-agent's Dockerfile
    # installs (infra/claude-agent/Dockerfile), so `claude` works from this
    # IDE's integrated terminal the same way it does there: run `claude`,
    # follow the printed device-code URL to log in with an existing
    # Claude subscription (no API key needed).
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && npm install -g @anthropic-ai/claude-code \
    && rm -rf /var/lib/apt/lists/*
USER coder

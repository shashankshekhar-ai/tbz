FROM python:3.13-slim

# docker CLI + compose plugin (talks to the host daemon via the mounted socket)
# + git/openssh for the git action. Debian trixie's docker.io apt package only
# ships dockerd (no client, no docker-compose-plugin), so both the docker CLI
# and the compose v2 plugin binaries are fetched directly from upstream releases.
RUN apt-get update && apt-get install -y --no-install-recommends \
    git openssh-client ca-certificates curl postgresql-client \
    && curl -fsSL -o /tmp/docker.tgz https://download.docker.com/linux/static/stable/x86_64/docker-27.3.1.tgz \
    && tar -xzf /tmp/docker.tgz -C /usr/local/bin --strip-components=1 docker/docker \
    && rm /tmp/docker.tgz \
    && mkdir -p /usr/libexec/docker/cli-plugins \
    && curl -fsSL -o /usr/libexec/docker/cli-plugins/docker-compose \
       https://github.com/docker/compose/releases/download/v2.29.7/docker-compose-linux-x86_64 \
    && chmod +x /usr/libexec/docker/cli-plugins/docker-compose \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8010

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8010"]

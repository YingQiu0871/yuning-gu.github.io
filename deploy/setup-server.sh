#!/usr/bin/env bash
# One-shot server setup for the static site (Debian 12 / Ubuntu 22.04+).
#
# Usage (run on the server as root):
#   sudo bash setup-server.sh yingqiu.me
#   sudo bash setup-server.sh yingqiu.me "ssh-ed25519 AAAA... deploy@github-actions"
#
# The first argument is your domain; the optional second argument is a public
# SSH key for the "deployer" user used by GitHub Actions.
set -euo pipefail

DOMAIN="${1:?usage: setup-server.sh <domain> [deployer-public-key]}"
DEPLOYER_KEY="${2:-}"
SITE_DIR="/var/www/site"

echo "==> Installing Caddy (official apt repo)"
if ! command -v caddy >/dev/null 2>&1; then
  apt-get update -y
  apt-get install -y debian-keyring debian-archive-keyring apt-transport-https curl gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
    | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
    | tee /etc/apt/sources.list.d/caddy-stable.list >/dev/null
  apt-get update -y
  apt-get install -y caddy
else
  echo "    caddy already installed, skipping"
fi

echo "==> Preparing site directory"
install -d -m 755 "$SITE_DIR"

if [[ -n "$DEPLOYER_KEY" ]]; then
  echo "==> Creating deployer user with SSH key"
  if ! id -u deployer >/dev/null 2>&1; then
    useradd --create-home --shell /bin/bash deployer
  fi
  install -d -o deployer -g deployer -m 700 /home/deployer/.ssh
  echo "$DEPLOYER_KEY" > /home/deployer/.ssh/authorized_keys
  chown deployer:deployer /home/deployer/.ssh/authorized_keys
  chmod 600 /home/deployer/.ssh/authorized_keys
  # Give deployer ownership of the site dir so rsync can write to it
  chown -R deployer:deployer "$SITE_DIR"
fi

echo "==> Writing Caddyfile for $DOMAIN"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
sed "s/yingqiu.me/$DOMAIN/g" "$SCRIPT_DIR/Caddyfile" > /etc/caddy/Caddyfile

echo "==> Enabling and reloading Caddy"
systemctl enable caddy
systemctl reload caddy || systemctl start caddy

echo
echo "Done. Next steps:"
echo "  1. Point DNS: A/AAAA records for $DOMAIN -> this server's IP, CNAME www -> $DOMAIN"
echo "  2. Verify: curl -I https://$DOMAIN  (Caddy gets the certificate automatically)"
echo "  3. Add GitHub Actions secrets: DEPLOY_HOST, DEPLOY_USER=deployer, DEPLOY_SSH_KEY, DEPLOY_PORT (if not 22)"

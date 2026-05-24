#!/usr/bin/env bash
# =============================================================================
# Every Second Counts deployment script for everysecondcount.org
# =============================================================================
# Run as the VM's regular user (one that can `sudo`). Targets Debian/Ubuntu
# with nginx already serving silmetro.com (WordPress) and app.silmetro.com.
#
# What it does (idempotent — safe to re-run):
#   1. Clones / updates the repo at /opt/everysecondcount.org
#   2. Installs Node deps + builds the Next.js production bundle
#   3. Installs a systemd service `everysecondcount-web` (next start on
#      127.0.0.1:3002)
#   4. Drops an nginx server block at
#      /etc/nginx/sites-available/everysecondcount.org that:
#        - serves everysecondcount.org + www.everysecondcount.org
#        - reverse-proxies to 127.0.0.1:3002
#        - redirects www -> apex
#        - leaves silmetro.com + app.silmetro.com completely untouched
#   5. Runs certbot for Let's Encrypt cert (apex + www) + HTTPS redirect
#
# DNS prerequisite: A records for both `everysecondcount.org` and
# `www.everysecondcount.org` must already point to this VM's external IP,
# otherwise certbot will fail the HTTP-01 challenge.
# =============================================================================
set -euo pipefail

# ---- Tunables ----
REPO_URL="git@github.com:devSilmetro/every-second-counts-website.git"
REPO_URL_HTTPS="https://github.com/devSilmetro/every-second-counts-website.git"
APP_USER="${APP_USER:-$(whoami)}"
APP_HOME="/opt/everysecondcount.org"
DOMAIN="everysecondcount.org"
WWW_DOMAIN="www.everysecondcount.org"
APP_PORT="3003"  # 3002 is taken by PM2-managed Express on this VM
NODE_MAJOR="20"
LETSENCRYPT_EMAIL="dev@silmetro.com"

# ---- 0. Sanity / sudo ----
echo "[1/7] Checking prerequisites…"
sudo -v
sudo apt-get update -qq
sudo apt-get install -y git curl nginx certbot python3-certbot-nginx ca-certificates

# ---- 1. Node.js (Next.js 15 needs ≥18.18, we use 20 LTS) ----
if ! command -v node >/dev/null 2>&1 || [ "$(node -v | cut -d. -f1 | tr -d v)" -lt "$NODE_MAJOR" ]; then
  echo "[2/7] Installing Node.js ${NODE_MAJOR}.x…"
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | sudo -E bash -
  sudo apt-get install -y nodejs
else
  echo "[2/7] Node $(node -v) already installed."
fi

# ---- 2. Clone / update repo ----
echo "[3/7] Syncing repo into ${APP_HOME}…"
sudo mkdir -p "${APP_HOME}"
sudo chown "${APP_USER}":"${APP_USER}" "${APP_HOME}"
if [ -d "${APP_HOME}/.git" ]; then
  git -C "${APP_HOME}" fetch --all --prune
  git -C "${APP_HOME}" reset --hard origin/main
else
  # Prefer SSH (uses existing key on VM), fall back to HTTPS (public repo only).
  if ! git clone "${REPO_URL}" "${APP_HOME}" 2>/dev/null; then
    echo "  SSH clone failed, falling back to HTTPS (works only if repo is public)…"
    git clone "${REPO_URL_HTTPS}" "${APP_HOME}"
  fi
fi

# ---- 3. Install deps + build ----
echo "[4/7] Installing dependencies and building Next.js…"
cd "${APP_HOME}"
npm ci --no-audit --no-fund
npm run build

# ---- 4. Systemd service for `next start` ----
echo "[5/7] Installing systemd unit…"
sudo tee /etc/systemd/system/everysecondcount-web.service >/dev/null <<EOF
[Unit]
Description=Every Second Counts website (Next.js)
After=network.target

[Service]
Type=simple
User=${APP_USER}
WorkingDirectory=${APP_HOME}
Environment=NODE_ENV=production
# Invoke next directly with -H/-p flags. Setting HOSTNAME via env var
# is unreliable through npm wrappers; CLI flags are honored every time.
ExecStart=${APP_HOME}/node_modules/.bin/next start -H 127.0.0.1 -p ${APP_PORT}
Restart=on-failure
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
# Clear any 'failed' state from a previous bad run so the restart sticks
sudo systemctl reset-failed everysecondcount-web 2>/dev/null || true
sudo systemctl enable --now everysecondcount-web
# Always restart in case code changed
sudo systemctl restart everysecondcount-web
sleep 2
# `|| true` because systemctl status exits non-zero on a failing unit and
# would otherwise abort the script (set -euo pipefail) before nginx + certbot.
sudo systemctl status everysecondcount-web --no-pager | head -10 || true

# ---- 5. nginx server block ----
echo "[6/7] Configuring nginx for ${DOMAIN}…"
sudo tee /etc/nginx/sites-available/${DOMAIN} >/dev/null <<EOF
# Redirect www -> apex (over HTTP; certbot will add an HTTPS variant)
server {
    listen 80;
    listen [::]:80;
    server_name ${WWW_DOMAIN};
    return 301 http://${DOMAIN}\$request_uri;
}

server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN};

    # certbot will overwrite this with HTTPS redirect + cert on first run.
    location / {
        proxy_pass http://127.0.0.1:${APP_PORT};
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 300s;
    }

    # Long cache for Next.js's hashed static assets
    location /_next/static/ {
        proxy_pass http://127.0.0.1:${APP_PORT};
        proxy_cache_valid 200 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location = /favicon.ico { log_not_found off; access_log off; }
    location = /robots.txt  { log_not_found off; access_log off; }
}
EOF

sudo ln -sf /etc/nginx/sites-available/${DOMAIN} /etc/nginx/sites-enabled/${DOMAIN}
sudo nginx -t
sudo systemctl reload nginx

# ---- 6. TLS via Let's Encrypt (apex + www) ----
echo "[7/7] Requesting Let's Encrypt cert for ${DOMAIN} + ${WWW_DOMAIN}…"
echo "      (DNS for both must already point at this VM)"
sudo certbot --nginx --non-interactive --agree-tos --redirect \
             --email "${LETSENCRYPT_EMAIL}" \
             -d "${DOMAIN}" -d "${WWW_DOMAIN}" || {
  echo "!! certbot failed. Common causes:"
  echo "   - DNS for ${DOMAIN} / ${WWW_DOMAIN} doesn't resolve to this VM yet"
  echo "     check with:  dig +short ${DOMAIN}    dig +short ${WWW_DOMAIN}"
  echo "   - port 80 blocked by GCP firewall (check 'gcloud compute firewall-rules list')"
  echo "   - rate limit (5 certs/week/domain)"
  echo "Continuing — site is live over HTTP. Run certbot manually after fixing."
}

# ---- Done ----
echo
echo "============================================================"
echo "  Deploy complete."
echo "    Site:        https://${DOMAIN}   (or http:// if certbot failed)"
echo "    www:         redirects to apex"
echo "    Service:     systemctl status everysecondcount-web"
echo "    Logs:        journalctl -u everysecondcount-web -f"
echo "    Rebuild:     re-run this script — it's idempotent."
echo "    Other sites: silmetro.com + app.silmetro.com untouched"
echo "============================================================"

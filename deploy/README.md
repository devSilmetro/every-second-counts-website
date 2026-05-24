# everysecondcount.org — deployment notes

`deploy_everysecondcount.sh` deploys the Next.js marketing site to the
same VM that already runs silmetro.com + app.silmetro.com. It adds a
fresh nginx server block and a systemd service; the other two sites are
left completely untouched.

## Prereqs (one-time, manual)

1. **DNS A records at Namecheap**
   - `everysecondcount.org` (host `@`) → VM external IP
   - `www.everysecondcount.org` (host `www`) → VM external IP

   Wait ~5 min, then check:
   ```bash
   dig +short everysecondcount.org
   dig +short www.everysecondcount.org
   ```
   Both must return the VM's IP. Without this, certbot's HTTP-01
   challenge will fail.

2. **GCP firewall** — ports 80 + 443 open to `0.0.0.0/0`. They already
   are if app.silmetro.com works.

3. **GitHub access from the VM** — the script tries SSH first
   (`git@github.com:...`) and falls back to HTTPS. If the repo is
   private and the VM has no SSH key registered with GitHub, either:
   - Make the repo public, OR
   - Add the VM's `~/.ssh/id_ed25519.pub` to your GitHub account, OR
   - Use a Personal Access Token via `git config --global` credentials.

## Run it

```bash
# SSH into the VM
gcloud compute ssh <vm-name> --zone=<zone>

# Download + run
curl -fsSL https://raw.githubusercontent.com/devSilmetro/every-second-counts-website/main/deploy/deploy_everysecondcount.sh \
  -o deploy.sh
bash deploy.sh
```

Or, if you've already cloned manually:

```bash
cd /opt/everysecondcount.org
git pull
bash deploy/deploy_everysecondcount.sh
```

Re-running is safe — the script is idempotent.

## What gets installed where

| Path | Purpose |
|---|---|
| `/opt/everysecondcount.org` | Repo clone |
| `/opt/everysecondcount.org/.next` | Next.js production build output |
| `/etc/systemd/system/everysecondcount-web.service` | systemd unit — `next start` on 127.0.0.1:3002 |
| `/etc/nginx/sites-available/everysecondcount.org` | nginx server block (TLS via certbot) |
| `/etc/letsencrypt/live/everysecondcount.org/` | Let's Encrypt cert + key |

## Health checks after deploy

```bash
# Next.js running locally on the VM
curl -sI http://127.0.0.1:3002 | head -3

# nginx serving the site (after DNS + cert)
curl -sI https://everysecondcount.org | head -3

# www redirects to apex
curl -sI https://www.everysecondcount.org | head -3

# Logs
journalctl -u everysecondcount-web -f
tail -F /var/log/nginx/access.log /var/log/nginx/error.log
```

## Rollback

```bash
cd /opt/everysecondcount.org
git log --oneline | head -10
git reset --hard <SHA>
bash deploy/deploy_everysecondcount.sh
```

## Tear down

```bash
sudo systemctl disable --now everysecondcount-web
sudo rm /etc/systemd/system/everysecondcount-web.service
sudo systemctl daemon-reload

sudo rm /etc/nginx/sites-enabled/everysecondcount.org
sudo rm /etc/nginx/sites-available/everysecondcount.org
sudo systemctl reload nginx

sudo certbot delete --cert-name everysecondcount.org  # only if you want the cert gone
sudo rm -rf /opt/everysecondcount.org
```

silmetro.com + app.silmetro.com are untouched by any of the above.

## Port assignments on this VM

| Port | Service |
|---|---|
| 80, 443 | nginx (all sites) |
| 8001 | safevac backend (uvicorn) — app.silmetro.com |
| 3002 | everysecondcount.org (Next.js) |

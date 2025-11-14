# State Restorer

A tile based puzzle game built using React and FastAPI [[link](https://jrv.fish)]

## Quick Start

### Docker

```
docker compose -f docker-compose.local.yml up
```

This will build images and run containers for the frontend, backend, and nginx.

- Frontend: [http://localhost:8080](http://localhost:8080)
- Backend: [http://localhost:8080/api/docs](http://localhost:8080/api/docs)

To stop the app: `docker compose down`

### Linux

```
sudo chmod -R +x scripts && ./scripts/start.sh
```

This will install required dependencies and start the backend and frontend on different ports.

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:8000/api/docs](http://localhost:8000/api/docs)

Verified to work for:

- Ubuntu via WSL2
- Linux Mint

To stop the app: `./scripts/stop.sh`

If `start.sh` fails, try removing `backend/venv`, `node_modules` and `yarn.lock` before retrying.

## Testing

Currently there are only backend unit tests.

To run them: `./scripts/docker-start.sh; ./scripts/test_backend.sh`

## Deployment

Deployment is done with Github Actions over SSH. The configuration is in `.github/workflows/deploy.yml`.

Key Points:

- Deployment is automatically triggered when a pull request is merged into `main`. Manual deployment is also available via `Actions > Deployment Workflow > Run workflow`.

- App is deployed to a single VPS that has certbot and Docker installed

- Secrets are stored the Secrets > Github Actions section of Github project settings

- Deployment logs are stored in `deployment.log` in the deployment directory

- The deployment script:

  1. Creates the `backup` directory, `deployment.log`, and clones the project if necesary

  1. Keeps Docker images (tagged with the SHA commit id) of three previous versions and tags the new images with `latest`

  1. Keeps backups of three previous versions of source code

  1. Performs container and site health checks after starting containers and rolls back to the previous version if health checks fail

- When applicable, update `VITE_APP_VERSION` in `frontend/.env.*` files

## TLS Certificate

`certbot` is installed on the VPS, and it automatically renews the Let's Encrypt certificate located at `/etc/letsencrypt/live/jrv.fish/` 30 days before the certificate expires.

The nginx container loads the certificate from the mounted volume. When the certificate is renewed, the nginx configuration is reloaded with a [deploy hook](https://www.interhacktive.de/certbot/using.html#pre-and-post-validation-hooks) located at `/etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh`

## Observability

### Logs

At the moment, logs are stored on server. Eventually, they may be exported to Loki for viewing in Grafana.

### Metrics

Metrics are stored in [Prometheus](https://prometheus.io/) and visualized in a [cloud instance](https://jrv.grafana.net/) of [Grafana](https://grafana.com/).

The backend is instrumented with the [Prometheus Python client](https://github.com/prometheus/client_python?tab=readme-ov-file). System metrics are captured via the [Prometheus Node Exporter](https://prometheus.io/docs/guides/node-exporter/).

Dashboards are visible (to authorized users) on the Grafana instance [here](https://jrv.grafana.net/dashboards/f/bf444s335tkw0d/?orgId=1)

- [App metrics](https://jrv.grafana.net/d/jvbkbd5/state-restorer?orgId=1&from=now-6h&to=now&timezone=browser)

- [System metrics](https://jrv.grafana.net/d/jvpsf6k/system?orgId=1&from=now-6h&to=now&timezone=browser)

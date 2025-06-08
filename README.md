# state-restorer

## Quick Start

### Docker

```
./scripts/docker-start.sh
```

This will build images and run containers for the frontend, backend, and nginx.

- Frontend: [http://localhost:8443](http://localhost:8443)
- Backend: [http://localhost:8443/api/docs](http://localhost:8443/api/docs)

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

To run them: `./scripts/docker-start.sh; ./scripts/test_backend.sh

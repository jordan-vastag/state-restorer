# state-restorer

## Quick Start

### Docker

```
./scripts/docker-start.sh
```

This will build images and run containers for the frontend and backend on port 8443 with nginx:

- Frontend: [http://localhost:8443](http://localhost:8443)
- Backend: [http://localhost:8443/api/docs](http://localhost:8443/api/docs)

### Linux

```
sudo chmod -R +x scripts && ./scripts/start.sh
```

This will install required dependencies and start the backend and frontend on different ports:

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:8000/api/docs](http://localhost:8000/api/docs)

## Testing

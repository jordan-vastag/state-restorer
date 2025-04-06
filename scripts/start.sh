#!/bin/bash

# Exit in case of error
set -ex

# Stop containers
docker compose down

# Build containers
docker compose create --build --remove-orphans

# Run containers
docker compose start

# Hack to wait for postgres container to be up before running alembic migrations
sleep 5;

# Run migrations
docker compose run --rm backend alembic upgrade head

# Create initial data
docker compose run --rm backend python3 app/db/scripts/initial_data.py

# Watch for file changes
docker compose watch

# Output current status
docker ps -a
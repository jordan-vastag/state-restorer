#!/bin/bash

# Exit in case of error
set -ex

# Install dependencies
./scripts/build.sh

# Start Docker if needed
if ! systemctl is-active --quiet docker; then
    echo "Starting Docker..."
    sudo systemctl start docker
fi

# Stop containers
docker compose down

# Build containers
docker compose create --build --remove-orphans

# Run containers
docker compose start

# TODO: configure this for development
# Watch for file changes
# docker compose watch

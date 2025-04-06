#!/bin/bash

# Exit in case of error
set -ex

# Stop containers
docker compose down

# Build containers
docker compose create --build --remove-orphans

# Run containers
docker compose start

# TODO: configure this
# Watch for file changes
# docker compose watch

# Output current status
docker ps -a
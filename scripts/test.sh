#! /usr/bin/env bash

# Exit in case of error
set -ex

docker compose run --remove-orphans backend pytest
docker compose run --remove-orphans frontend test
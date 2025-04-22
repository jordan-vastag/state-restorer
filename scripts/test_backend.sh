#! /usr/bin/env bash

# Exit in case of error
set -ex

docker compose run --rm --remove-orphans backend pytest "$@"

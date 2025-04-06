#!/usr/bin/env bash

case $1 in
  start)
    npm run dev
    ;;
  build)
    npm build
    ;;
  test)
    npm test $@
    ;;
  *)
    npm "$@"
    ;;
esac
#!/bin/bash

echo "Stopping backend..."
fuser -k 8000/tcp >/dev/null 2>&1
echo "Stopped."

echo "Stopping frontend..."
fuser -k 5173/tcp >/dev/null 2>&1
echo "Stopped."

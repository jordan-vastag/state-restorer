#!/bin/bash

./scripts/build.sh

echo "Starting app..."
if lsof -i:8000 &>/dev/null; then
    echo "Backend already running. Killing existing process..."
    fuser -k 8000/tcp >/dev/null 2>&1
    echo "Stopped."
fi
echo "Starting backend..."
cd backend && . venv/bin/activate && fastapi run app/main.py &
echo "Done."

if lsof -i:5173 &>/dev/null; then
    echo "Frontend already running. Killing existing process..."
    fuser -k 5173/tcp >/dev/null 2>&1
    echo "Stopped."
fi
echo "Starting frontend..."
cd frontend && npm run dev &
echo "Done."

echo "App started."

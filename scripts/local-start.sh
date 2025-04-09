#!/bin/bash

echo "Retarting backend"
fuser -k 8000/tcp
cd backend
. venv/bin/activate
fastapi run app/main.py &

echo "Retarting frontend"
fuser -k 5173/tcp
cd ../frontend 
npm i
npm run dev &
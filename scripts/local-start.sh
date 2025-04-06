#!/bin/bash

cd backend
. venv/bin/activate
fastapi run app/main.py &

cd ../frontend 
npm i
npm run dev &
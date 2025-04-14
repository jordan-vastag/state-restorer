#!/bin/bash

echo "Stopping backend"
fuser -k 8000/tcp

echo "Stopping frontend"
fuser -k 5173/tcp
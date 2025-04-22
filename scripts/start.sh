#!/bin/bash

echo "Restarting..."

echo ""

echo "Stopping backend..."
fuser -k 8000/tcp
echo "Stopped."
cd backend || exit 1
if [ ! -d "venv" ]; then
    echo "Virtual environment not found."
    if ! command -v python3 &>/dev/null; then
        echo "Python3 is not installed."
        echo "Installing..."
        sudo apt update && sudo apt install -y python3 || {
            echo -e "\e[31m\nERROR: Failed to install Python3. Please install it manually.\e[0m"
            exit 1
        }
    fi
    echo "Creating virtual environment..."
    python3 -m venv venv
fi
. venv/bin/activate
echo "Installing backend dependencies..."
(sudo apt update && sudo apt install -y libpq-dev && pip install -r requirements.txt) || {
    echo -e "\e[31m\nERROR: Failed to install backend dependencies.\e[0m"
    exit 1
}
fastapi run app/main.py &

echo ""

echo "Stopping frontend..."
fuser -k 5173/tcp
echo "Stopped."
cd ../frontend || exit 1
if ! command -v node &>/dev/null; then
    echo "Node.js is not installed. Attempting to install using nvm..."
    if ! command -v nvm &>/dev/null; then
        echo "nvm is not installed. Installing nvm..."
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
        [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
    fi
    nvm install --lts || {
        echo -e "\e[31m\nERROR: Failed to install Node.js using nvm. Please install it manually and rerun the script.\e[0m]"
        exit 1
    }
fi

if ! command -v yarn &>/dev/null; then
    echo "Yarn is not installed. Attempting to install..."
    npm install --global yarn || {
        echo -e "\e[31m\nERROR: Failed to install Yarn. Please install it manually and rerun the script.\e[0m]"
        exit 1
    }
fi
echo "Installing frontend dependencies..."
yarn || {
    echo -e "\e[31m\nERROR: Failed to install frontend dependencies.\e[0m]"
    exit 1
}
echo "Done."
echo "Starting frontend..."
yarn run dev &

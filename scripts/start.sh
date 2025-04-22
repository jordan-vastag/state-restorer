#!/bin/bash

echo "Doing setup..."
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
    echo "Virtual environment created."
    echo "Activating virtual environment..."
    . venv/bin/activate
    echo "Virtual environment activated."
fi

if [ ! -f "venv/dependencies_installed_flag" ]; then
    echo "Installing backend dependencies..."
    echo "Checking if psycopg2 dependency (libpq-dev) is installed..."
    if ! dpkg -l | grep -q libpq-dev; then
        echo "libpq-dev is not installed. Installing..."
        (sudo apt update && sudo apt install -y libpq-dev) || {
            echo -e "\e[31m\nERROR: Failed to install libpq-dev.\e[0m"
            exit 1
        }
    else
        echo "libpq-dev is already installed."
    fi

    echo "Installing requirements..."
    pip install -r requirements.txt || {
        echo -e "\e[31m\nERROR: Failed to install requirements.\e[0m"
        exit 1
    }
    touch venv/dependencies_installed_flag
    echo "Requirements installed and flag file created."
else
    echo "Assuming backend dependencies are up to date."
    echo "NOTE: if the API fails to start, delete the venv/dependencies_installed_flag file and rerun the script."
fi

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
cd ..
echo "Setup complete."

echo "Starting app..."
if lsof -i:8000 &>/dev/null; then
    echo "Backend already running. Killing existing process..."
    fuser -k 8000/tcp >/dev/null 2>&1
    echo "Stopped."
fi
echo "Starting backend..."
cd backend && fastapi run app/main.py &
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

import os

PROJECT_NAME = "state-restorer"

PORT = 7331

SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")

CELL_COLORS = ["#ffffff", "#000000"]
import os

PROJECT_NAME = "state-restorer"

SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")

CELL_COLORS = ["#ffffff", "#000000"]
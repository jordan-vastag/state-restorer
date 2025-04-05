import os

PROJECT_NAME = "state-restorer"

SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")

API_V1_STR = "/api"

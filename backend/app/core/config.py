import os

PROJECT_NAME = "state-restorer"

PORT = 7331

SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")

DEFAULT_CELL_COLOR_THEME = "grayscale"
CELL_COLOR_THEMES = {
    "grayscale": {
        "colors": ["#ffffff", "#000000"],
        "complements": [("#ffffff", "#000000")],
    },
    "basic": {
        "colors": ["#ff5757", "#46cc46", "#69abe1", "#ffc26d"],
        "complements": [("#ff5757", "#46cc46"), ("#69abe1", "#ffc26d")],
    },
}

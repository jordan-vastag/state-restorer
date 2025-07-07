PROJECT_NAME = "state-restorer"

PORT = 7331

FRONTEND_LOCAL_URL = "http://localhost:5173"

TARGET_STATE_GENERATION_STRATEGIES = ["random"]

DEFAULT_CELL_COLOR_THEME = "grayscale"
CELL_COLOR_THEMES = {
    "grayscale": {
        "colors": ["#bbbbbb", "#000000"],
        "complements": [("#bbbbbb", "#000000")],
    },
    "basic": {
        "colors": ["#ff5757", "#46cc46", "#69abe1", "#ffc26d"],
        "complements": [("#ff5757", "#46cc46"), ("#69abe1", "#ffc26d")],
    },
}

EMAIL = "jordanrvastag@gmail.com"

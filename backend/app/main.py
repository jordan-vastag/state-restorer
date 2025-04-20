from fastapi import FastAPI, Response, status
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from app.core import config
from app.core.board_state import *
from app.core.request_schemas import Theme, AppState, Board
from app.core.context import current_cell_color_theme

app = FastAPI(
    title=config.PROJECT_NAME, docs_url="/api/docs", openapi_url="/api"
)

origins = [
    config.FRONTEND_LOCAL_URL,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/board/new")
async def new_board(size: int):
    return {"board": generate_random_board(size)}


@app.post("/api/board/move")
async def make_move(state: AppState, response: Response):
    try:
        validate_move(state.move, len(state.board))
    except:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"msg": "invalid move"}
    return {
        "board": do_move(state.board, state.move),
        "move_history": state.move_history.append(state.move),
    }


@app.post("/api/board/previous")
async def previous_state(state: AppState, response: Response):
    if state.move_history:
        last_move = state.move_history.pop()
        return {
            "board": do_move(state.board, last_move),
            "move_history": state.move_history,
        }
    else:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"msg": "no moves have been performed"}


@app.post("/api/board/initial")
async def initial_state(state: AppState, response: Response):
    if state.move_history:
        board = []
        for _ in state.move_history:
            last_move = state.move_history.pop()
            board = do_move(state.board, last_move)
        return {"board": board}  # note: move_history is not saved
    else:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"msg": "no moves have been performed"}


@app.post("/api/board/target")
async def target_state(initial_board: Board, response: Response, strategy: str = "random"):
    try:
        validate_target_state_generation_strategy(strategy)
        target_board, solution = generate_target_state(
            initial_board.board, strategy)
        return {"board": target_board, "solution": solution}
    except:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"msg": "failed to generate target board state"}


@app.post("/api/board/theme")
async def set_theme(theme: Theme, response: Response):
    try:
        validate_theme(theme)
        current_cell_color_theme = theme
    except:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"msg": "invalid theme"}


@app.get("/api/board/theme")
async def get_theme():
    return {"name": current_cell_color_theme}


@app.get("/api/board/themes")
async def get_themes():
    return {"themes": config.CELL_COLOR_THEMES.keys()}


@app.get("/api/health")
async def health():
    return {"status": "healthy"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=config.PORT)

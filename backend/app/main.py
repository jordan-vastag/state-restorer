from fastapi import FastAPI, Depends
from starlette.requests import Request
import uvicorn

from app.api.api_v1.routers.users import users_router
from app.api.api_v1.routers.auth import auth_router
from app.core import config
from app.db.session import SessionLocal
from app.core.celery_app import celery_app
from app.core.auth import get_current_active_user
from app.core.board_state import *
from app.db.schemas import BoardState, Board
from app import tasks


app = FastAPI(
    title=config.PROJECT_NAME, docs_url="/api/docs", openapi_url="/api"
)


@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    request.state.db = SessionLocal()
    response = await call_next(request)
    request.state.db.close()
    return response

@app.get("/api/board/new")
async def new_board(size: int):
    return {"board_state": generate_random_board(size)}


@app.post("/api/board/move")
async def make_move(current_state: BoardState, move: tuple[int, int]):
    validate_move(move)
    return {"board_state": BoardState(do_move(current_state, move), current_state.move_stack.append(move))}


@app.get("/api/board/previous")
async def previous_state(current_state: BoardState):
    if current_state.move_stack:
        last_move = current_state.move_stack.pop()
        return {"board_state": BoardState(do_move(current_state, last_move), current_state.move_stack)}
    else:
        return {"board_state": current_state, "msg": "no moves performed"}
        

@app.get("/api/board/initial")
async def initial_state(current_state: BoardState):
    # note: move history is not preserved
    if current_state.move_stack:
        for move in current_state.move_stack:
            last_move = current_state.move_stack.pop()
            next = BoardState(do_move(current_state, last_move), current_state.move_stack)
        return {"board_state": next}
    else:
        return {"board_state": current_state, "msg": "no moves performed"}


@app.get("/api")
async def root():
    return {"message": "Hello World"}


# @app.get("/api/task")
# async def example_task():
#     celery_app.send_task("app.tasks.example_task", args=["Hello World"])

#     return {"message": "success"}


# Routers
app.include_router(
    users_router,
    prefix="/api",
    tags=["users"],
    dependencies=[Depends(get_current_active_user)],
)
app.include_router(auth_router, prefix="/api", tags=["auth"])

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=config.PORT)

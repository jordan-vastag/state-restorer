from pydantic import BaseModel

class AppState(BaseModel):
    board: list[list[str]]
    move_history: list[tuple[int, int]]
    move: tuple[int, int]

class Theme(BaseModel):
    name: str
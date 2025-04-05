from random import choice
from app.db.schemas import BoardState, Board
from app.core.config import CELL_COLORS


def validate_move(move: tuple[int, int]):
    if not (move[0] > 0 and move[1] > 0):
        raise ValueError("move index is negative") 

def generate_random_board(size: int) -> Board:
    return Board(cells=[choice(CELL_COLORS)  * size for _ in range(size)])


def do_move(current_state: BoardState, move: tuple[int, int]) -> Board:
    pass

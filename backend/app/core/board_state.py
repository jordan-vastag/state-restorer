from random import choice
from app.db.schemas import AppState
from app.core.config import CELL_COLOR_THEMES
from app.core.context import current_cell_color_theme


def validate_theme(theme: str):
    if theme not in CELL_COLOR_THEMES.keys():
        raise ValueError(f"theme '{theme}' is invalid")


def validate_move(move: tuple[int, int], board_size: int):
    if not (move[0] >= 0 and move[1] >= 0):
        raise ValueError(f"move {move} contains a negative index")
    if not (move[0] < board_size and move[1] < board_size):
        raise ValueError(
            f"move {move} contains an out of bounds index (board size is {board_size})"
        )


def validate_color(color: str):
    if color not in CELL_COLOR_THEMES[current_cell_color_theme]["colors"]:
        raise ValueError(
            f"color {color} is invalid for theme '{current_cell_color_theme}'"
        )


def generate_random_board(size: int) -> list[list[int]]:
    return [
        [
            choice(CELL_COLOR_THEMES[current_cell_color_theme]["colors"])
            for _ in range(size)
        ]
        for _ in range(size)
    ]


def _get_complement(
    color: str,
    complements=CELL_COLOR_THEMES[current_cell_color_theme]["complements"],
) -> str:
    validate_color(color)
    for pair in complements:
        if pair[0] == color:
            return pair[1]
    for pair in complements:
        if pair[1] == color:
            return pair[0]


def _get_adjacent_cells(
    board: list[list[str]], x: int, y: int
) -> list[tuple[int, int]]:
    rows, cols = len(board), len(board[0])
    adjacent = []
    for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
        nx, ny = x + dx, y + dy
        if 0 <= nx < rows and 0 <= ny < cols:
            adjacent.append((nx, ny))
    return adjacent


def do_move(board: list[list[str]], move: tuple[int, int]) -> list[list[str]]:
    move_x, move_y = move

    # Flip the selected cell
    board[move_x][move_y] = _get_complement(board[move_x][move_y])

    # Flip adjacent cells
    for pair in _get_adjacent_cells(board, move_x, move_y):
        x, y = pair
        complement = _get_complement(board[x][x])
        board[x][y] = complement

    return board

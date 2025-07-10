from random import choice, randint
from loguru import logger
from app.core.config import CELL_COLOR_THEMES, TARGET_STATE_GENERATION_STRATEGIES
from app.core.context import current_cell_color_theme


def validate_theme(theme: str):
    if theme not in CELL_COLOR_THEMES.keys():
        logger.error(f"Theme validation failed: '{theme}' is invalid")
        raise ValueError(f"theme '{theme}' is invalid")


def validate_move(move: tuple[int, int], board_size: int):
    if not (move[0] >= 0 and move[1] >= 0):
        logger.error(f"Move validation failed - negative index: {move}")
        raise ValueError(f"move {move} contains a negative index")
    if not (move[0] < board_size and move[1] < board_size):
        logger.error(
            f"Move {move} contains an out of bounds index (board size is {board_size})")
        raise ValueError(
            f"move {move} contains an out of bounds index (board size is {board_size})"
        )


def validate_target_state_generation_strategy(strategy: str):
    if strategy not in TARGET_STATE_GENERATION_STRATEGIES:
        logger.error(f"Invalid target state generation strategy: {strategy}")
        raise ValueError(
            f"target state generation strategy '{strategy}' is invalid"
        )


def validate_color(color: str):
    if color not in CELL_COLOR_THEMES[current_cell_color_theme]["colors"]:
        logger.error(
            f"Color '{color}' is invalid for theme '{current_cell_color_theme}'")
        raise ValueError(
            f"color '{color}' is invalid for theme '{current_cell_color_theme}'"
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


def _remove_redundant_moves(solution: list[tuple[int, int]]) -> list[tuple[int, int]]:
    new_solution = []
    index = 0
    while index < len(solution):
        if index == len(solution) - 1 and solution[index] != solution[index - 1]:
            new_solution.append(solution[index])
            index += 1
        elif solution[index] == solution[index + 1]:
            index += 2
        else:
            new_solution.append(solution[index])
            index += 1
    return new_solution


def _count_redundant_moves(solution: list[tuple[int, int]]) -> int:
    count = 0
    index = 1
    while index < len(solution):
        if solution[index] == solution[index - 1]:
            count += 1
            index += 1
        else:
            index += 1

    return count


def _optimize_solution(solution: list[tuple[int, int]]) -> list[tuple[int, int]]:
    while _count_redundant_moves(solution) > 0:
        solution = _remove_redundant_moves(solution)
    return solution


def do_move(board: list[list[str]], move: tuple[int, int]) -> list[list[str]]:
    move_x, move_y = move
    new_board = board.copy()

    # Flip the selected cell
    complement = _get_complement(board[move_x][move_y])
    new_board[move_x][move_y] = complement
    # Flip adjacent cells
    for pair in _get_adjacent_cells(new_board, move_x, move_y):
        x, y = pair
        new_board[x][y] = _get_complement(new_board[x][y])

    return new_board


def generate_target_state(board: list[list[str]], strategy: str):
    try:
        solution = []
        if strategy == "random":
            # TODO: modify this range based on difficulty
            num_moves = randint(2, 5)
            board_size = len(list(board)[0])
            for _ in range(num_moves):
                x = randint(0, board_size - 1)
                y = randint(0, board_size - 1)
                board = do_move(board, (x, y))
                solution.append((x, y))

        solution = _optimize_solution(solution)
        return (board, solution)
    except Exception as e:
        logger.error(
            f"Error generating target state with strategy {strategy}: {e}")
        raise

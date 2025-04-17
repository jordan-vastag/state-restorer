import pytest
from app.core.board_state import do_move, validate_move, validate_color
from app.core.context import current_cell_color_theme
from app.core.config import CELL_COLOR_THEMES


def test_validate_color():
    valid_color = CELL_COLOR_THEMES[current_cell_color_theme]["colors"][0]
    validate_color(valid_color)

    with pytest.raises(ValueError, match="is invalid for theme"):
        validate_color("not_a_real_color")


def test_validate_move():
    # Valid move
    validate_move((1, 1), 3)  # Should not raise an exception

    # Negative index
    with pytest.raises(ValueError):
        validate_move((-1, 1), 3)

    # Out of bounds
    with pytest.raises(ValueError):
        validate_move((3, 1), 3)
    with pytest.raises(ValueError):
        validate_move((1, 3), 3)


def test_do_move():
    move = (0, 1)
    current_board = [
        ["#000000", "#000000", "#000000"],
        ["#000000", "#f6f6f6", "#000000"],
        ["#000000", "#000000", "#000000"]
    ]
    expected_board = [
        ["#000000", "#f6f6f6", "#000000"],
        ["#f6f6f6", "#000000", "#f6f6f6"],
        ["#000000", "#f6f6f6", "#000000"]
    ]
    next_board = do_move(current_board, move)
    assert next_board == expected_board

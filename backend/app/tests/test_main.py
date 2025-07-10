from fastapi.testclient import TestClient
from app.main import app, AppState
from app.core.board_state import generate_random_board

from icecream import ic

client = TestClient(app)
test_board = generate_random_board(2)


def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


def test_new_board():
    response = client.get("/api/board/new", params={"size": 5})
    assert response.status_code == 200
    data = response.json()
    assert "board" in data
    assert isinstance(data["board"], list)
    assert len(data["board"]) == 5


def test_make_move():
    response = client.post(
        "/api/board/move",
        json={"board": test_board, "move_history": [(0, 1)], "move": (0, 1)},
    )
    assert response.status_code == 200


def test_previous_state():
    response = client.post(
        "/api/board/previous",
        json={"board": test_board, "move_history": [(0, 1)], "move": (0, 1)},
    )
    assert response.status_code == 200


def test_initial_state():
    state = AppState(
        board=test_board, move_history=[(0, 1), (1, 0)], move=(0, 1)
    )
    response = client.post(
        "/api/board/initial",
        json={
            "board": test_board,
            "move_history": [(0, 1), [1, 1]],
            "move": (0, 1),
        },
    )
    assert response.status_code == 200

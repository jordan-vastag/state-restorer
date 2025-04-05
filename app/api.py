from pydantic import BaseModel
from typing import List, Tuple, Optional
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.templating import Jinja2Templates

# Constants
DEFAULT_BOARD_SIZE = 2
FAVICON_PATH = "static/favicon.ico"

# Initialize the FastAPI app
app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


# Define a model for the board state
class BoardState(BaseModel):
    board: List[List[str]]  # 2D list for the board
    move: Optional[
        Tuple[Optional[int], Optional[int]]
    ]  # Tuple for the move (row, column)


# -------
# Helpers
# -------


# Helper function to flip a cell between 'black' and 'white'
def flip_cell(cell: str) -> str:
    return "white" if cell == "black" else "black"


# Helper function to generate the next board state based on a move
def generate_next_board_state(
    board: List[List[str]], move: Tuple[int, int]
) -> List[List[str]]:
    row, col = move
    # Check if the move is within bounds
    if not (0 <= row < len(board) and 0 <= col < len(board[0])):
        raise ValueError("Move out of bounds. Board is n x n.")

    # Flip the cell at the move location
    board[row][col] = flip_cell(board[row][col])

    # Directions for checking adjacent cells (up, down, left, right)
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    # Iterate over the directions to flip adjacent cells
    for dr, dc in directions:
        adj_row, adj_col = row + dr, col + dc
        if 0 <= adj_row < len(board) and 0 <= adj_col < len(board[0]):
            # Flip adjacent cells
            board[adj_row][adj_col] = flip_cell(board[adj_row][adj_col])

    return board


# Helper function to generate a board of size n
def generate_board(n: int) -> BoardState:
    board = [["black" for _ in range(n)] for _ in range(n)]
    return BoardState(board=board, move=(None, None))


# Helper function to render the board as raw HTML
def render_board_state(board: List[List[str]]) -> str:
    html = "<html><body><table style='border-collapse: collapse; border-spacing: 5px'>"
    for row in board:
        html += "<tr>"
        for cell in row:
            color = "black" if cell == "black" else "white"
            html += f"<td style='width: 30px; height: 30px; background-color: {color};'></td>"
        html += "</tr>"
    html += "</table></body></html>"
    return html


# ---------
# Endpoints
# ---------
@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return FileResponse(FAVICON_PATH)


@app.get("/", response_class=HTMLResponse)
def index():
    try:
        return render_board_state(generate_board(DEFAULT_BOARD_SIZE).board)
    except Exception as e:
        return {"error": str(e)}


@app.get("/next_state", response_class=HTMLResponse)
def next_state(board_state: BoardState):
    try:
        next_board = generate_next_board_state(board_state.board, board_state.move)
        return render_board_state(next_board)
    except Exception as e:
        return {"error": str(e)}


@app.get("/template_test", response_class=HTMLResponse)
def template_test():
    return templates.TemplateResponse(name="layout.tmpl")

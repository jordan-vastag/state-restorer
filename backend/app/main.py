from fastapi import FastAPI, Response, status
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import re
import smtplib
from loguru import logger

from email.mime.text import MIMEText
from app.core import config
from app.core.board_state import *
from app.core.request_schemas import Theme, AppState, Board, UserMessage
from app.core.context import current_cell_color_theme

logger.remove()
logger.add("log", rotation="1 day", retention="1 day",
           level="DEBUG", format="{time} | {level} | {message}")

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
    except Exception as e:
        logger.error(f"Invalid move error: {e}")
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
    except Exception as e:
        logger.error(f"Failed to generate target board state: {e}")
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"msg": "failed to generate target board state"}


@app.post("/api/board/theme")
async def set_theme(theme: Theme, response: Response):
    try:
        validate_theme(theme)
        current_cell_color_theme = theme
    except Exception as e:
        logger.error(f"Invalid theme error: {e}")
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"msg": "invalid theme"}


@app.get("/api/board/theme")
async def get_theme():
    return {"name": current_cell_color_theme}


@app.get("/api/board/themes")
async def get_themes():
    return {"themes": config.CELL_COLOR_THEMES.keys()}


@app.post("/api/user-message")
async def send_user_message(
    user_message: UserMessage, response: Response
):
    # TODO: write tests for this endpoint
    if not user_message.message or not user_message.name or not user_message.email:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"msg": "required argument is empty"}

    email_regex = r"^[^@]+@[^@]+\.[^@]+$"
    if not re.match(email_regex, user_message.email):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"msg": "invalid email format"}

    try:
        # Check if Gmail credentials are configured
        if not config.GMAIL_EMAIL or not config.GMAIL_APP_PASSWORD:
            logger.error("Gmail credentials not configured")
            response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
            return {"msg": "Email service not configured"}

        subject = "State Restorer: User Message"
        body = f"Name: {user_message.name}\nEmail: {user_message.email}\n\nMessage:\n{user_message.message}"
        msg = MIMEText(body)
        msg["Subject"] = subject
        msg["From"] = config.GMAIL_EMAIL
        msg["To"] = config.RECIPIENT_EMAIL

        # Gmail SMTP configuration
        smtp_server = "smtp.gmail.com"
        smtp_port = 587

        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()  # Enable TLS encryption
            server.login(config.GMAIL_EMAIL, config.GMAIL_APP_PASSWORD)
            server.sendmail(config.GMAIL_EMAIL,
                            config.RECIPIENT_EMAIL, msg.as_string())

        logger.info(
            f"Email sent successfully - {user_message.email} ({user_message.name})")
    except Exception as e:
        logger.error(f"Failed to send email: {e}")
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {"msg": f"Failed to send email: {e}"}

    return {"msg": "Message received successfully"}


@app.get("/api/health")
async def health():
    return {"status": "healthy"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=config.PORT)

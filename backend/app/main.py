from fastapi import FastAPI, Response, status, Request
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
from app.middleware.metrics import metrics_app, request_counter, server_exception_counter

logger.remove()
logger.add("log", rotation="1 day", retention="1 day",
           level="DEBUG", format="{time} | {level} | {message}")

app = FastAPI(
    title=config.PROJECT_NAME, docs_url=config.DOCS_URL, openapi_url=config.OPENAPI_URL
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

app.mount("/metrics", metrics_app)

@app.get("/api/board/new")
async def new_board(size: int, response: Response, request: Request):
    logger.info(f"Generating new board with size: {size}")
    request_counter.labels(method=request.method.lower(), endpoint=request.url.path).inc()
    try:
        return {"board": generate_random_board(size)}
    except Exception as e:
        server_exception_counter.labels(method=request.method.lower(), endpoint=request.url.path).inc()
        msg = f"Failed to generate board: {e}"
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        logger.error(msg)
        return {"msg": msg}


@app.post("/api/board/move")
async def make_move(state: AppState, response: Response, request: Request):
    logger.info(f"Processing move: {state.move} for board size: {len(state.board)}")
    request_counter.labels(method=request.method.lower(), endpoint=request.url.path).inc()
    try:
        validate_move(state.move, len(state.board))
    except Exception as e:
        logger.error(f"Invalid move error: {e}")
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"msg": "invalid move"}
    logger.info("Move validated successfully, executing move")
    try:
        return {
            "board": do_move(state.board, state.move),
            "move_history": state.move_history.append(state.move),
        }
    except Exception as e:
        server_exception_counter.labels(method=request.method.lower(), endpoint=request.url.path).inc()
        msg = f"Failed to do move: {e}"
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        logger.error(msg)
        return {"msg": msg}


@app.post("/api/board/previous")
async def previous_state(state: AppState, response: Response, request: Request):
    logger.info(f"Requesting previous state, move history length: {len(state.move_history) if state.move_history else 0}")
    request_counter.labels(method=request.method.lower(), endpoint=request.url.path).inc()
    if state.move_history:
        last_move = state.move_history.pop()
        logger.info(f"Undoing last move: {last_move}")
        try:
            return {
                "board": do_move(state.board, last_move),
                "move_history": state.move_history,
            }
        except Exception as e:
            server_exception_counter.labels(method=request.method.lower(), endpoint=request.url.path).inc()
            msg = f"Failed to move to previous board state: {e}"
            response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
            logger.error(msg)
            return {"msg": msg}

    else:
        logger.info("No previous moves available to undo")
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"msg": "no moves have been performed"}


@app.post("/api/board/initial")
async def initial_state(state: AppState, response: Response, request: Request):
    logger.info(f"Resetting to initial state, move history length: {len(state.move_history) if state.move_history else 0}")
    request_counter.labels(method=request.method.lower(), endpoint=request.url.path).inc()
    if state.move_history:
        try:
            board = []
            for _ in state.move_history:
                last_move = state.move_history.pop()
                board = do_move(state.board, last_move)
            logger.info("Successfully reset board to initial state")
            return {"board": board}  # note: move_history is not saved
        except Exception as e:
            server_exception_counter.labels(method=request.method.lower(), endpoint=request.url.path).inc()
            msg = f"Failed to reset board: {e}"
            response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
            logger.error(msg)
            return {"msg": msg}

    else:
        logger.info("No moves to reset")
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"msg": "no moves have been performed"}


@app.post("/api/board/target")
async def target_state(initial_board: Board, response: Response, request: Request, strategy: str = "random"):
    logger.info(f"Generating target state with strategy: {strategy}, board size: {len(initial_board.board)}")
    request_counter.labels(method=request.method.lower(), endpoint=request.url.path).inc()
    try:
        validate_target_state_generation_strategy(strategy)
        try:
            target_board, solution = generate_target_state(
                initial_board.board, strategy)
            logger.info(f"Target state generated successfully with {len(solution)} solution steps")
            return {"board": target_board, "solution": solution}
        except Exception as e:
            server_exception_counter.labels(method=request.method.lower(), endpoint=request.url.path).inc()
            msg = f"Failed to generate target board state: {e}"
            response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
            logger.error(msg)
            return {"msg": msg}

    except Exception as e:
        logger.error(f"Failed to generate target board state: {e}")
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"msg": "failed to generate target board state"}


@app.post("/api/board/theme")
async def set_theme(theme: Theme, response: Response, request: Request):
    logger.info(f"Setting theme to: {theme.name}")
    request_counter.labels(method=request.method.lower(), endpoint=request.url.path).inc()
    try:
        validate_theme(theme)
        current_cell_color_theme = theme
        logger.info(f"Theme successfully set to: {theme.name}")
    except Exception as e:
        logger.error(f"Invalid theme error: {e}")
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"msg": "invalid theme"}


@app.get("/api/board/theme")
async def get_theme(request: Request):
    logger.info(f"Retrieved current theme: {current_cell_color_theme}")
    request_counter.labels(method=request.method.lower(), endpoint=request.url.path).inc()
    return {"name": current_cell_color_theme}


@app.get("/api/board/themes")
async def get_themes(request: Request):
    logger.info(f"Retrieved available themes: {list(config.CELL_COLOR_THEMES.keys())}")
    request_counter.labels(method=request.method.lower(), endpoint=request.url.path).inc()
    return {"themes": config.CELL_COLOR_THEMES.keys()}


@app.post("/api/user-message")
async def send_user_message(
    user_message: UserMessage, response: Response, request: Request
):
    # TODO: write tests for this endpoint
    logger.info(f"Received user message from: {user_message.email} ({user_message.name})")
    request_counter.labels(method=request.method.lower(), endpoint=request.url.path).inc()
    if not user_message.message or not user_message.name or not user_message.email:
        logger.info("User message rejected: required argument is empty")
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"msg": "required argument is empty"}

    email_regex = r"^[^@]+@[^@]+\.[^@]+$"
    if not re.match(email_regex, user_message.email):
        logger.info(f"User message rejected: invalid email format - {user_message.email}")
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
        server_exception_counter.labels(method=request.method.lower(), endpoint=request.url.path).inc()
        msg = f"Failed to send email: {e}"
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        logger.error(msg)
        return {"msg": msg}

    logger.info(f"User message processed successfully from: {user_message.email}")
    return {"msg": "Message received successfully"}


@app.get("/api/health")
async def health(request: Request):
    logger.info("Health check requested")
    request_counter.labels(method=request.method.lower(), endpoint=request.url.path).inc()
    return {"status": "healthy"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=config.PORT)

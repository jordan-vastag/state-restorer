from sqlalchemy import Boolean, Column, Integer, String

from .session import Base


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    first_name = Column(String)
    last_name = Column(String)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)

# class BoardState(Base):
#     __tablename__ = "board_state"
#     id = Column(Integer, primary_key=True, index=True)
#     board_id = Column(Integer, nullable=False)

class Board(Base):
    __tablename__ = "board"

    id = Column(Integer, primary_key=True, index=True)
    size = Column(Integer, nullable=False)

class BoardRow(Base):
    __tablename__ = "board_row"

    id = Column(Integer, primary_key=True, index=True)
    board_id = Column(Integer, index=True)
    index = Column(Integer, nullable=False)

class BoardColumn(Base):
    __tablename__ = "board_column"

    id = Column(Integer, primary_key=True, index=True)
    board_id = Column(Integer, index=True)
    index = Column(Integer, nullable=False)

class BoardCell(Base):
    __tablename__ = "board_cell"
    
    id = Column(Integer, primary_key=True, index=True)
    array_id = Column(Integer, index=True, nullable=False)
    index = Column(Integer, nullable=False)
    hex_value = Column(String, nullable=False, default="#ffffff")

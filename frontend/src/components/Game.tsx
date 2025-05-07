import { Board, GameBoard, SolutionModal } from "@/components";
import { toaster } from "@/components/ui/toaster";
import { API_URL, DEFAULT_BOARD_SIZE } from "@/constants";
import { Box, Button, Container, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function Game() {
  const boardSize = DEFAULT_BOARD_SIZE;
  const buttonBorderRadius = "md";
  const buttonFontSize = "md";

  const initializedCells = Array<string[]>(DEFAULT_BOARD_SIZE).fill(
    Array(DEFAULT_BOARD_SIZE).fill("#f6f6f6")
  );
  const [cells, setCells] = useState(initializedCells);
  const [initialCells, setInitialCells] = useState(initializedCells);
  const [targetCells, setTargetCells] = useState(initializedCells);
  const [solutionMoves, setSolutionMoves] = useState<number[][]>([]);
  const [moveHistory, setMoveHistory] = useState<number[][]>([]);

  const fetchNewBoard = async () => {
    const params = new URLSearchParams({ size: boardSize.toString() });
    const url = new URL(`${API_URL}/board/new?${params}`);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      return json.board;
    } catch (error: unknown) {
      console.error(error);
      window.location.assign("/error");
    }
  };

  const fetchTargetBoard = async (initialBoard: string[][]) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        board: initialBoard,
      }),
    };
    const url = new URL(`${API_URL}/board/target`);

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      return { board: json.board, solution: json.solution };
    } catch (error: unknown) {
      console.error(error);
      window.location.assign("/error");
    }
  };

  const gameIsWon = (
    board: Array<Array<string>>,
    targetBoard: Array<Array<string>>
  ) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== targetBoard[i][j]) {
          return false;
        }
      }
    }
    return true;
  };

  const undoMove = async () => {
    console.log("board -> ", cells);
    if (moveHistory.length < 1) {
      toaster.create({
        description: "No moves performed. Cannot undo.",
        type: "info",
      });
      return;
    }

    const lastMove = moveHistory[moveHistory.length - 1];
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        board: cells,
        move_history: moveHistory,
        move: lastMove,
      }),
    };
    const url = new URL(`${API_URL}/board/move`);

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();

      setCells(json.board);
      const previousMoveHistory = moveHistory.slice(0, moveHistory.length - 1);
      setMoveHistory(previousMoveHistory);

      toaster.create({
        description: "Move undone.",
        type: "info",
      });
    } catch (error: unknown) {
      console.error(error);
    }
  };

  const resetBoard = () => {
    if (moveHistory.length < 1) {
      toaster.create({
        description: "No moves performed. Cannot reset.",
        type: "info",
      });
      return;
    }

    setCells(initialCells);
    toaster.create({
      description: "Board reset.",
      type: "info",
    });
  };

  const newGame = async () => {
    // TODO: add "Are you sure?" confirmation modal
    const newCells = await fetchNewBoard();
    setCells(newCells);
    setInitialCells(newCells);

    let targetBoard = await fetchTargetBoard(newCells);
    while (gameIsWon(newCells, targetBoard?.board)) {
      targetBoard = await fetchTargetBoard(newCells);
    }
    setTargetCells(targetBoard?.board);
    setSolutionMoves(targetBoard?.solution);
    setMoveHistory([]);

    toaster.create({
      description: "New board generated.",
      type: "info",
    });
  };

  useEffect(() => {
    const init = async () => {
      const initialCells = await fetchNewBoard();
      const targetBoard = await fetchTargetBoard(initialCells);
      setCells(initialCells);
      setInitialCells(initialCells);
      setTargetCells(targetBoard?.board);
      setSolutionMoves(targetBoard?.solution);
    };

    init();
  }, []);

  return (
    <>
      <Container>
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box margin="5">
            <Box textAlign="center" fontSize="2xl" marginBottom="2">
              Goal:
            </Box>
            <Board cells={targetCells} />
          </Box>
          <Box margin="5">
            <GameBoard
              targetCells={targetCells}
              cells={cells}
              setCells={setCells}
              moveHistory={moveHistory}
              setMoveHistory={setMoveHistory}
              gameIsWon={gameIsWon}
            />
          </Box>
        </Flex>
        <Flex
          spaceX="5"
          alignItems="center"
          justifyContent="center"
          borderRadius="2xl"
        >
          <Button
            borderRadius={buttonBorderRadius}
            fontSize={buttonFontSize}
            onClick={undoMove}
          >
            Undo
          </Button>
          <Button
            borderRadius={buttonBorderRadius}
            fontSize={buttonFontSize}
            onClick={resetBoard}
          >
            Reset
          </Button>
          <SolutionModal
            buttonBorderRadius={buttonBorderRadius}
            buttonFontSize={buttonFontSize}
            solutionMoves={solutionMoves}
            cells={initializedCells}
          />
          <Button
            borderRadius={buttonBorderRadius}
            fontSize={buttonFontSize}
            onClick={newGame}
          >
            New Game
          </Button>
        </Flex>
      </Container>
    </>
  );
}

export default Game;

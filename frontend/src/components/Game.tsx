import {
  Board,
  ConfirmationModal,
  GameBoard,
  HowToPlayModal,
  SettingsModal,
  SolutionModal,
} from "@/components";
import { useColorModeValue } from "@/components/ui/color-mode";
import { toaster } from "@/components/ui/toaster";
import { API_URL, DEFAULT_BOARD_SIZE, Difficulty } from "@/constants";
import { Box, Button, Container, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface GameProps {
  difficulty: string;
  onDifficultyChange: (difficulty: string) => void;
}

function Game(props: GameProps) {
  const getDifficultySize = (difficulty: string) => {
    switch (difficulty) {
      case Difficulty.EASY:
        return 2;
      case Difficulty.MEDIUM:
        return 3;
      case Difficulty.HARD:
        return 4;
      default:
        return DEFAULT_BOARD_SIZE;
    }
  };

  const getTileSize = (difficulty: string) => {
    switch (difficulty) {
      case Difficulty.EASY:
        return { base: "20", md: "28" };
      case Difficulty.MEDIUM:
        return { base: "16", md: "24" };
      case Difficulty.HARD:
        return { base: "12", md: "20" };
      default:
        return { base: "16", md: "24" };
    }
  };

  const boardSize = getDifficultySize(props.difficulty);
  const tileSize = getTileSize(props.difficulty);
  const buttonBorderRadius = "md";
  const buttonFontSize = "md";

  const buttonBg = useColorModeValue("gray.100", "gray.700");
  const buttonColor = useColorModeValue("gray.800", "gray.200");
  const buttonHoverBg = useColorModeValue("gray.200", "gray.600");
  const initializedCellsBg = useColorModeValue("gray.100", "gray.500");

  const initializedCells = Array<string[]>(boardSize).fill(
    Array(boardSize).fill(initializedCellsBg)
  );
  const [cells, setCells] = useState(initializedCells);
  const [initialCells, setInitialCells] = useState(initializedCells);
  const [targetCells, setTargetCells] = useState(initializedCells);
  const [solutionMoves, setSolutionMoves] = useState<number[][]>([]);
  const [moveHistory, setMoveHistory] = useState<number[][]>([]);
  const [isNewGameModalOpen, setIsNewGameModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isSolutionModalOpen, setIsSolutionModalOpen] = useState(false);

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

  const handleResetClick = () => {
    if (moveHistory.length < 1) {
      toaster.create({
        description: "No moves performed. Cannot reset.",
        type: "info",
      });
      return;
    }
    setIsResetModalOpen(true);
  };

  const confirmReset = () => {
    setIsResetModalOpen(false);
    setCells(initialCells);
    setMoveHistory([]);
    toaster.create({
      description: "Board reset.",
      type: "info",
    });
  };

  const cancelReset = () => {
    setIsResetModalOpen(false);
  };

  const handleNewGameClick = () => {
    setIsNewGameModalOpen(true);
  };

  const confirmNewGame = async () => {
    setIsNewGameModalOpen(false);
    await generateNewBoard();

    toaster.create({
      description: "New board generated.",
      type: "info",
    });
  };

  const cancelNewGame = () => {
    setIsNewGameModalOpen(false);
  };

  const handleShowSolution = () => {
    setIsSolutionModalOpen(true);
  };

  const generateNewBoard = async () => {
    const newCells = await fetchNewBoard();
    let targetBoard = await fetchTargetBoard(newCells);

    while (gameIsWon(newCells, targetBoard?.board)) {
      targetBoard = await fetchTargetBoard(newCells);
    }

    setCells(newCells);
    setInitialCells(newCells);
    setTargetCells(targetBoard?.board);
    setSolutionMoves(targetBoard?.solution);
    setMoveHistory([]);
  };

  useEffect(() => {
    generateNewBoard();
  }, [props.difficulty]);

  return (
    <>
      <Container maxW={{ base: "100%", md: "container.xl" }} px={{ base: 2, md: 4 }}>
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
          minHeight="calc(100vh - 120px)"
          maxHeight="calc(100vh - 120px)"
          overflow="auto"
          paddingY={{ base: 2, md: 4 }}
          gap={{ base: 4, md: 8 }}
        >
          <Box>
            <Box textAlign="center" fontSize={{ base: "lg", md: "2xl" }} marginBottom="2">
              Goal:
            </Box>
            <Board cells={targetCells} boardSquareSize={{ base: "10", md: "14" }} />
          </Box>
          <Box>
            <GameBoard
              targetCells={targetCells}
              cells={cells}
              setCells={setCells}
              moveHistory={moveHistory}
              setMoveHistory={setMoveHistory}
              gameIsWon={gameIsWon}
              tileSize={tileSize}
            />
          </Box>
          <Flex
            spaceX={{ base: 2, md: 5 }}
            alignItems="center"
            justifyContent="center"
            borderRadius="2xl"
            flexWrap="wrap"
            gap={{ base: 2, md: 0 }}
          >
            <Button
              borderRadius={buttonBorderRadius}
              fontSize={{ base: "sm", md: buttonFontSize }}
              size={{ base: "sm", md: "md" }}
              onClick={undoMove}
              bg={buttonBg}
              color={buttonColor}
              _hover={{ bg: buttonHoverBg }}
            >
              Undo
            </Button>
            <Button
              borderRadius={buttonBorderRadius}
              fontSize={{ base: "sm", md: buttonFontSize }}
              size={{ base: "sm", md: "md" }}
              onClick={handleResetClick}
              bg={buttonBg}
              color={buttonColor}
              _hover={{ bg: buttonHoverBg }}
            >
              Reset
            </Button>
            <Button
              borderRadius={buttonBorderRadius}
              fontSize={{ base: "sm", md: buttonFontSize }}
              size={{ base: "sm", md: "md" }}
              onClick={handleNewGameClick}
              bg={buttonBg}
              color={buttonColor}
              _hover={{ bg: buttonHoverBg }}
            >
              New Game
            </Button>
            <Button
              borderRadius={buttonBorderRadius}
              fontSize={{ base: "sm", md: buttonFontSize }}
              size={{ base: "sm", md: "md" }}
              onClick={handleShowSolution}
              bg={buttonBg}
              color={buttonColor}
              _hover={{ bg: buttonHoverBg }}
            >
              Show Solution
            </Button>
            <HowToPlayModal />
            <SettingsModal
              onDifficultyChange={props.onDifficultyChange}
              currentDifficulty={props.difficulty}
            />
          </Flex>
        </Flex>
      </Container>

      <ConfirmationModal
        isOpen={isNewGameModalOpen}
        onClose={cancelNewGame}
        onConfirm={confirmNewGame}
        title="Are you sure?"
        message="This will generate a new board."
      />

      <ConfirmationModal
        isOpen={isResetModalOpen}
        onClose={cancelReset}
        onConfirm={confirmReset}
        title="Are you sure?"
        message="This will reset the board and erase your move history. This cannot be undone."
      />

      <SolutionModal
        isOpen={isSolutionModalOpen}
        onClose={() => setIsSolutionModalOpen(false)}
        solutionMoves={solutionMoves}
        cells={initializedCells}
      />
    </>
  );
}

export default Game;

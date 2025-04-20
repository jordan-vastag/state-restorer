import { Box } from "@chakra-ui/react";
import { API_URL } from "@/constants";
import { toaster } from "@/components/ui/toaster";

interface tileProps {
  index: Array<number>;
  bg: string;
  board: Array<Array<string>>;
  targetBoard: Array<Array<string>>;
  moveHistory: Array<Array<number>>;
  setMoveHistory: CallableFunction;
  setCells: CallableFunction;
  gameIsWon: CallableFunction;
}

const Tile = (props: tileProps) => {
  const handleClick = async (
    index: Array<number>,
    board: Array<Array<string>>,
    moveHistory: Array<Array<number>>,
    setMoveHistory: CallableFunction,
    setCells: CallableFunction,
    targetBoard: Array<Array<string>>,
    gameIsWon: CallableFunction
  ) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        board: board,
        move_history: moveHistory,
        move: index,
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
      moveHistory[moveHistory.length] = index;
      setMoveHistory(moveHistory);

      if (gameIsWon(json.board, targetBoard)) {
        // TODO: implement win modal
        toaster.create({
          description: "You won!",
          type: "info",
        });
      }
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <Box
      onClick={() =>
        handleClick(
          props.index,
          props.board,
          props.moveHistory,
          props.setMoveHistory,
          props.setCells,
          props.targetBoard,
          props.gameIsWon
        )
      }
      boxSize="2xs"
      bg={props.bg}
      borderRadius="md"
      _hover={{ cursor: "button" }}
    />
  );
};

export default Tile;

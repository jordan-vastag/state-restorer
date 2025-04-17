import { Box } from "@chakra-ui/react";
import { API_URL } from "@/constants";

interface tileProps {
  index: Array<number>;
  bg: string;
  board: Array<Array<string>>;
  moveHistory: Array<Array<number>>;
  setMoveHistory: CallableFunction;
  setCells: CallableFunction;
}

const handleClick = async (
  index: Array<number>,
  board: Array<Array<string>>,
  moveHistory: Array<Array<number>>,
  setMoveHistory: CallableFunction,
  setCells: CallableFunction
) => {
  console.log(`index: ${index}`)
  console.log(`moveHistory: ${moveHistory}`)

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
  } catch (error: unknown) {
    console.error(error);
  }
};

const Tile = (props: tileProps) => {
  return (
    <Box
      onClick={() => handleClick(props.index, props.board, props.moveHistory, props.setMoveHistory, props.setCells)}
      boxSize="xs"
      bg={props.bg}
      borderRadius="md"
      _hover={{ borderWidth: 3, borderColor: "white" }}
    />
  );
};

export default Tile;

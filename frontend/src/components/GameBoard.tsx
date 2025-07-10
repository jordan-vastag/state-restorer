import { Tile } from "@/components";
import { Center, For, SimpleGrid } from "@chakra-ui/react";

interface gameBoardProps {
  cells: string[][];
  targetCells: string[][];
  moveHistory: number[][];
  setMoveHistory: CallableFunction;
  setCells: CallableFunction;
  gameIsWon: CallableFunction;
  tileSize: string | { base: string; md: string };
}

const GameBoard = (props: gameBoardProps) => {
  return (
    <>
      <Center>
        <SimpleGrid
          columns={props.cells.length}
          gap={{ base: 3, md: 4 }}
          padding={{ base: 3, md: 4 }}
          borderColor="gray.300"
          borderWidth={{ base: "3px", md: "4px" }}
          borderRadius="md"
          borderStyle="solid"
          background="gray.100"
        >
          <For each={props.cells}>
            {(_, row: number) => (
              <For each={props.cells[row]} key={row}>
                {(item: string, column: number) => (
                  <Tile
                    key={row + "-" + column}
                    index={[row, column]}
                    bg={item}
                    size={props.tileSize}
                    board={props.cells}
                    moveHistory={props.moveHistory}
                    setMoveHistory={props.setMoveHistory}
                    setCells={props.setCells}
                    targetBoard={props.targetCells}
                    gameIsWon={props.gameIsWon}
                  />
                )}
              </For>
            )}
          </For>
        </SimpleGrid>
      </Center>
    </>
  );
};

export default GameBoard;

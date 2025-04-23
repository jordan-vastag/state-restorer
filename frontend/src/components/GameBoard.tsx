import { SimpleGrid, Center, For } from "@chakra-ui/react";
import { Tile } from "@/components";

interface gameBoardProps {
  cells: string[][];
  targetCells: string[][];
  moveHistory: number[][];
  setMoveHistory: CallableFunction;
  setCells: CallableFunction;
  gameIsWon: CallableFunction;
}

const GameBoard = (props: gameBoardProps) => {
  return (
    <>
      <Center>
        <SimpleGrid columns={props.cells.length} gap="3">
          <For each={props.cells}>
            {(_, row: number) => (
              <For each={props.cells[row]} key={row}>
                {(item: string, column: number) => (
                  <Tile
                    key={row + "-" + column}
                    index={[row, column]}
                    bg={item}
                    size="3xs"
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

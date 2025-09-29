import { Tile } from "@/components";
import { Center, For, SimpleGrid } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

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
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const backgroundColor = useColorModeValue("gray.100", "gray.700");

  return (
    <>
      <Center>
        <SimpleGrid
          columns={props.cells.length}
          gap={{ base: 3, md: 4 }}
          padding={{ base: 3, md: 4 }}
          borderColor={borderColor}
          borderWidth={{ base: "3px", md: "4px" }}
          borderRadius="md"
          borderStyle="solid"
          background={backgroundColor}
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

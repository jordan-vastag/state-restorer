import { SimpleGrid, Center, For, Flex, Box, Stack } from "@chakra-ui/react";

interface boardProps {
  cells: string[][];
  solutionMoves?: number[][];
}

const Board = (props: boardProps) => {
  const cellInSolution = (cell: number[], solutionMoves?: number[][]) => {
    if (solutionMoves === undefined) {
      throw new Error("solutionMoves is undefined");
    } else {
      const index = solutionMoves.findIndex(
        (move) =>
          move.length === cell.length &&
          move.every((value, i) => value === cell[i])
      );

      return {
        inSolution: index !== -1,
        index: index,
      };
    }
  };
  if (props.solutionMoves === undefined) {
    return (
      <>
        <Center>
          <Flex flexDirection="column" alignItems="center" spaceY="1">
            <SimpleGrid columns={props.cells.length} gap="1">
              <For each={props.cells}>
                {(_, row: number) => (
                  <For each={props.cells[row]} key={row}>
                    {(item: string, column: number) => (
                      <Box
                        key={row + "-" + column}
                        boxSize="14"
                        borderRadius="sm"
                        bg={item}
                      />
                    )}
                  </For>
                )}
              </For>
            </SimpleGrid>
          </Flex>
        </Center>
      </>
    );
  } else {
    return (
      <>
        <Center>
          <Flex flexDirection="column" alignItems="center" spaceY="1">
            <SimpleGrid columns={props.cells.length} gap="1">
              <For each={props.cells}>
                {(_, row: number) => (
                  <For each={props.cells[row]} key={row}>
                    {(item: string, column: number) => {
                      let result = cellInSolution(
                        [row, column],
                        props.solutionMoves
                      );
                      if (result.inSolution) {
                        return (
                          <Box
                            key={row + "-" + column}
                            boxSize="14"
                            borderRadius="sm"
                            borderColor="green.500"
                            borderWidth="3px"
                            bg={item}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            fontSize="2xl"
                          >
                            {
                              /* FIXME: what do when a cell appears twice in solutionMoves?   */
                              result.index + 1
                            }
                          </Box>
                        );
                      } else {
                        return (
                          <Box
                            key={row + "-" + column}
                            boxSize="14"
                            borderRadius="sm"
                            bg={item}
                          />
                        );
                      }
                    }}
                  </For>
                )}
              </For>
            </SimpleGrid>
          </Flex>
        </Center>
      </>
    );
  }
};

export default Board;

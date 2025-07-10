import { Box, Center, Flex, For, SimpleGrid } from "@chakra-ui/react";

interface boardProps {
  cells: string[][];
  solutionMoves?: number[][];
  boardSquareSize?: string | { base: string; md: string };
}

const Board = (props: boardProps) => {
  const cellInSolution = (cell: number[], solutionMoves?: number[][]) => {
    if (solutionMoves === undefined) {
      throw new Error("solutionMoves is undefined");
    } else {
      const indices: number[] = [];
      solutionMoves.forEach((move, index) => {
        if (
          move.length === cell.length &&
          move.every((value, i) => value === cell[i])
        ) {
          indices.push(index + 1);
        }
      });

      return {
        inSolution: indices.length > 0,
        indices: indices,
        displayText: indices.join(","),
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
                        boxSize={props.boardSquareSize || "14"}
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
                      const result = cellInSolution(
                        [row, column],
                        props.solutionMoves
                      );
                      if (result.inSolution) {
                        return (
                          <Box
                            key={row + "-" + column}
                            boxSize={props.boardSquareSize || "14"}
                            borderRadius="sm"
                            borderColor="green.500"
                            borderWidth="3px"
                            bg={item}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            fontSize={{ base: "md", md: "2xl" }}
                          >
                            {result.displayText}
                          </Box>
                        );
                      } else {
                        return (
                          <Box
                            key={row + "-" + column}
                            boxSize={props.boardSquareSize || "14"}
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

import { useState, useEffect } from "react";
import { SimpleGrid, Center, For } from "@chakra-ui/react";
import { Tile } from "@/components";
import { DEFAULT_BOARD_SIZE, API_URL } from "@/constants";

const boardSize = DEFAULT_BOARD_SIZE;

const initializeCells = (n: number, value: string) => {
  return Array(n).fill(Array(n).fill(value));
};

const Board = () => {
  const [cells, setCells] = useState(initializeCells(boardSize, "lightgray"));

  useEffect(() => {
    const fetchCells = async () => {
      const params = new URLSearchParams({ size: boardSize.toString() });
      const url = new URL(`${API_URL}/board/new?${params}`);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        setCells(json.board);
      } catch (error: unknown) {
        console.error(error);
      }
    };

    fetchCells();
  }, []);

  return (
    <>
      <Center>
        <SimpleGrid columns={boardSize} gap="1">
          <For each={cells}>
            {(_, row: number) => (
              <For each={cells[row]}>
                {(item: string, column: number) => (
                  <Tile
                    key={row + "-" + column}
                    index={[row, column]}
                    bg={item}
                    board={cells}
                    moveHistory={moveHistory}
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

export default Board;

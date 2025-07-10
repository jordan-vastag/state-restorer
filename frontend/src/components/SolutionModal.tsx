import { Board } from "@/components";
import { Button, Dialog, Flex, Portal, Text } from "@chakra-ui/react";

interface SolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  solutionMoves: number[][];
  cells: string[][];
}

const SolutionModal = (props: SolutionModalProps) => {
  return (
    <>
      <Dialog.Root
        open={props.isOpen}
        onOpenChange={(details) => !details.open && props.onClose()}
        placement="center"
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content maxW={{ base: "95vw", md: "lg" }}>
              <Dialog.Header>
                <Dialog.Title fontSize={{ base: "lg", md: "xl" }}>Solution</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Board
                  cells={props.cells}
                  solutionMoves={props.solutionMoves}
                  boardSquareSize={{ base: "8", md: "12" }}
                />
              </Dialog.Body>
              <Dialog.Footer>
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  width="full"
                  flexDirection={{ base: "column", md: "row" }}
                  gap={{ base: 3, md: 0 }}
                >
                  <Text fontSize={{ base: "xs", md: "md" }} color="gray.600" textAlign={{ base: "center", md: "left" }}>
                    Note: this may not be the only solution
                  </Text>
                  <Button fontSize={{ base: "sm", md: "md" }} size={{ base: "sm", md: "md" }} onClick={props.onClose}>
                    Close
                  </Button>
                </Flex>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

export default SolutionModal;

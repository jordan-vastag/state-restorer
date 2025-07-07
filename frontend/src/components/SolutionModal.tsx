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
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title fontSize="xl">Solution</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Board
                  cells={props.cells}
                  solutionMoves={props.solutionMoves}
                />
              </Dialog.Body>
              <Dialog.Footer>
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  width="full"
                >
                  <Text fontSize="md" color="gray.600">
                    Note: this may not be the only solution
                  </Text>
                  <Button fontSize="md" onClick={props.onClose}>
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

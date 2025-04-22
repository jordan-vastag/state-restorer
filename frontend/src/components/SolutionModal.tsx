import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { Board } from "@/components";

interface SolutionModalProps {
  buttonBorderRadius: string;
  buttonFontSize: string;
  solutionMoves: number[][];
  cells: string[][];
}

const SolutionModal = (props: SolutionModalProps) => {
  return (
    <>
      <Dialog.Root placement="center">
        <Dialog.Trigger asChild>
          <Button
            borderRadius={props.buttonBorderRadius}
            fontSize={props.buttonFontSize}
          >
            Show Solution
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Solution</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Board
                  cells={props.cells}
                  solutionMoves={props.solutionMoves}
                />
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button>Close</Button>
                </Dialog.ActionTrigger>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

export default SolutionModal;

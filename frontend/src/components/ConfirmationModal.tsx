import { Button, Dialog, Flex, Portal, Text } from "@chakra-ui/react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmationModal = (props: ConfirmationModalProps) => {
  return (
    <Dialog.Root
      open={props.isOpen}
      onOpenChange={(details) => !details.open && props.onClose()}
      placement="center"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW={{ base: "90vw", md: "md" }}>
            <Dialog.Header>
              <Dialog.Title fontSize={{ base: "lg", md: "xl" }}>{props.title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Text fontSize={{ base: "sm", md: "lg" }}>{props.message}</Text>
            </Dialog.Body>
            <Dialog.Footer>
              <Flex gap={3} justifyContent="flex-end">
                <Button variant="outline" onClick={props.onClose} fontSize={{ base: "sm", md: "md" }} size={{ base: "sm", md: "md" }}>
                  No
                </Button>
                <Button onClick={props.onConfirm} fontSize={{ base: "sm", md: "md" }} size={{ base: "sm", md: "md" }}>
                  Yes
                </Button>
              </Flex>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ConfirmationModal;

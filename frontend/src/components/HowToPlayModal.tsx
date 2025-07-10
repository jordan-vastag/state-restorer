import {
  Button,
  CloseButton,
  Dialog,
  Heading,
  Image,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";

const HowToPlayModal = () => {
  return (
    <Dialog.Root placement="center">
      <Dialog.Trigger asChild>
        <Button
          variant="ghost"
          _hover={{ opacity: 0.7 }}
          padding="2"
          minW="auto"
          height={{ base: "32px", md: "40px" }}
          size={{ base: "sm", md: "md" }}
        >
          <Image
            boxSize={{ base: "6", md: "8" }}
            src="question-mark.svg"
            alt="How to play"
            transition="opacity 0.8s ease"
          />
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW={{ base: "90vw", md: "md" }}>
            <Dialog.Header>
              <Dialog.Title asChild>
                <Heading fontSize={{ base: "lg", md: "xl" }}>How to Play</Heading>
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <VStack align="stretch" gap={4}>
                <Text fontSize={{ base: "sm", md: "md" }}>
                  <strong>Goal:</strong> Win by getting your board to look like
                  the goal board.
                </Text>
                <Text fontSize={{ base: "sm", md: "md" }}>
                  <strong>How:</strong> Click on tiles to flip their color. When
                  you click on a tile, it flips the color of adjacent tiles and
                  the tile you clicked.
                </Text>
                <Text fontSize={{ base: "sm", md: "md" }}>
                  <strong>Controls:</strong> You can undo, reset, or start a new
                  game at any time using the buttons below the board.
                </Text>
              </VStack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button fontSize={{ base: "sm", md: "md" }} size={{ base: "sm", md: "md" }}>Got it!</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size={{ base: "xs", md: "sm" }} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default HowToPlayModal;

import { Difficulty } from "@/constants";
import {
  Button,
  Dialog,
  Heading,
  Image,
  Portal,
  RadioGroup,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

interface SettingsModalProps {
  onDifficultyChange: (difficulty: string) => void;
  currentDifficulty: string;
}

const SettingsModal = (props: SettingsModalProps) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    props.currentDifficulty
  );

  const handleDifficultyChange = (details: { value: string | null }) => {
    if (details.value) {
      setSelectedDifficulty(details.value);
      props.onDifficultyChange(details.value);
    }
  };

  return (
    <Dialog.Root placement="center">
      <Dialog.Trigger asChild>
        <Button
          variant="ghost"
          _hover={{ opacity: 0.7 }}
          padding="2"
          minW="auto"
          height="40px"
        >
          <Image
            boxSize="8"
            src="settings.svg"
            alt="Settings Cog"
            transition="opacity 0.8s ease"
          />
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title asChild>
                <Heading fontSize="xl">Settings</Heading>
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <VStack align="stretch" gap={4}>
                <Heading size="md">Difficulty</Heading>
                <RadioGroup.Root
                  value={selectedDifficulty}
                  onValueChange={handleDifficultyChange}
                >
                  <VStack align="stretch" gap={3}>
                    <RadioGroup.Item
                      value={Difficulty.EASY}
                      _hover={{ bg: "gray.50" }}
                      p={2}
                      borderRadius="md"
                    >
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemControl
                        position="relative"
                        borderWidth="2px"
                        borderColor="black"
                        _hover={{
                          bg: "gray.100",
                          borderColor: "black",
                          _before: {
                            content: '""',
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            bg: "gray.600",
                          },
                        }}
                        _checked={{
                          bg: "gray.50",
                          borderColor: "black",
                          _before: {
                            content: '""',
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            bg: "gray.600",
                          },
                        }}
                      />
                      <RadioGroup.ItemText fontSize="md">
                        Easy (2x2)
                      </RadioGroup.ItemText>
                    </RadioGroup.Item>
                    <RadioGroup.Item
                      value={Difficulty.MEDIUM}
                      _hover={{ bg: "gray.50" }}
                      p={2}
                      borderRadius="md"
                    >
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemControl
                        position="relative"
                        borderWidth="2px"
                        borderColor="black"
                        _hover={{
                          bg: "gray.100",
                          borderColor: "black",
                          _before: {
                            content: '""',
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            bg: "gray.600",
                          },
                        }}
                        _checked={{
                          bg: "gray.50",
                          borderColor: "black",
                          _before: {
                            content: '""',
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            bg: "gray.600",
                          },
                        }}
                      />
                      <RadioGroup.ItemText fontSize="md">
                        Medium (3x3)
                      </RadioGroup.ItemText>
                    </RadioGroup.Item>
                    <RadioGroup.Item
                      value={Difficulty.HARD}
                      _hover={{ bg: "gray.50" }}
                      p={2}
                      borderRadius="md"
                    >
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemControl
                        position="relative"
                        borderWidth="2px"
                        borderColor="black"
                        _hover={{
                          bg: "gray.100",
                          borderColor: "black",
                          _before: {
                            content: '""',
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            bg: "gray.600",
                          },
                        }}
                        _checked={{
                          bg: "gray.50",
                          borderColor: "black",
                          _before: {
                            content: '""',
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            bg: "gray.600",
                          },
                        }}
                      />
                      <RadioGroup.ItemText fontSize="md">
                        Hard (4x4)
                      </RadioGroup.ItemText>
                    </RadioGroup.Item>
                  </VStack>
                </RadioGroup.Root>
              </VStack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button fontSize="md">Done</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            {/* <Dialog.CloseTrigger asChild>
              <CloseButton size="md" />
            </Dialog.CloseTrigger> */}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default SettingsModal;

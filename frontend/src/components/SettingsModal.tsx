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
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode";
import { getIconPath } from "@/utils/iconUtils";

interface SettingsModalProps {
  onDifficultyChange: (difficulty: string) => void;
  currentDifficulty: string;
}

const SettingsModal = (props: SettingsModalProps) => {
  const { colorMode } = useColorMode();
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    props.currentDifficulty
  );

  const buttonBg = useColorModeValue("gray.100", "gray.700");
  const buttonColor = useColorModeValue("gray.800", "gray.200");
  const buttonHoverBg = useColorModeValue("gray.200", "gray.600");

  const itemHoverBg = useColorModeValue("gray.50", "gray.700");
  const radioButtonBg = useColorModeValue("gray.100", "gray.600");
  const radioButtonHoverBg = useColorModeValue("gray.200", "gray.500");
  const radioButtonCheckedBg = useColorModeValue("gray.50", "gray.600");
  const radioButtonBorder = useColorModeValue("black", "gray.300");
  const radioButtonDot = useColorModeValue("gray.600", "gray.200");


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
          height={{ base: "32px", md: "40px" }}
          size={{ base: "sm", md: "md" }}
        >
          <Image
            boxSize={{ base: "6", md: "8" }}
            src={getIconPath("settings", colorMode)}
            alt="Settings Cog"
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
                <Heading fontSize={{ base: "lg", md: "xl" }}>Settings</Heading>
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <VStack align="stretch" gap={4}>
                <Heading size={{ base: "sm", md: "md" }}>Difficulty</Heading>
                <RadioGroup.Root
                  value={selectedDifficulty}
                  onValueChange={handleDifficultyChange}
                >
                  <VStack align="stretch" gap={3}>
                    <RadioGroup.Item
                      value={Difficulty.EASY}
                      _hover={{ bg: itemHoverBg }}
                      p={2}
                      borderRadius="md"
                    >
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemControl
                        position="relative"
                        borderWidth="2px"
                        borderColor={radioButtonBorder}
                        bg={radioButtonBg}
                        _hover={{
                          bg: radioButtonHoverBg,
                          borderColor: radioButtonBorder,
                          _before: {
                            content: '""',
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            bg: radioButtonDot,
                          },
                        }}
                        _checked={{
                          bg: radioButtonCheckedBg,
                          borderColor: radioButtonBorder,
                          _before: {
                            content: '""',
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            bg: radioButtonDot,
                          },
                        }}
                      />
                      <RadioGroup.ItemText fontSize={{ base: "sm", md: "md" }}>
                        Easy (2x2)
                      </RadioGroup.ItemText>
                    </RadioGroup.Item>
                    <RadioGroup.Item
                      value={Difficulty.MEDIUM}
                      _hover={{ bg: itemHoverBg }}
                      p={2}
                      borderRadius="md"
                    >
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemControl
                        position="relative"
                        borderWidth="2px"
                        borderColor={radioButtonBorder}
                        bg={radioButtonBg}
                        _hover={{
                          bg: radioButtonHoverBg,
                          borderColor: radioButtonBorder,
                          _before: {
                            content: '""',
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            bg: radioButtonDot,
                          },
                        }}
                        _checked={{
                          bg: radioButtonCheckedBg,
                          borderColor: radioButtonBorder,
                          _before: {
                            content: '""',
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            bg: radioButtonDot,
                          },
                        }}
                      />
                      <RadioGroup.ItemText fontSize={{ base: "sm", md: "md" }}>
                        Medium (3x3)
                      </RadioGroup.ItemText>
                    </RadioGroup.Item>
                    <RadioGroup.Item
                      value={Difficulty.HARD}
                      _hover={{ bg: itemHoverBg }}
                      p={2}
                      borderRadius="md"
                    >
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemControl
                        position="relative"
                        borderWidth="2px"
                        borderColor={radioButtonBorder}
                        bg={radioButtonBg}
                        _hover={{
                          bg: radioButtonHoverBg,
                          borderColor: radioButtonBorder,
                          _before: {
                            content: '""',
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            bg: radioButtonDot,
                          },
                        }}
                        _checked={{
                          bg: radioButtonCheckedBg,
                          borderColor: radioButtonBorder,
                          _before: {
                            content: '""',
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            bg: radioButtonDot,
                          },
                        }}
                      />
                      <RadioGroup.ItemText fontSize={{ base: "sm", md: "md" }}>
                        Hard (4x4)
                      </RadioGroup.ItemText>
                    </RadioGroup.Item>
                  </VStack>
                </RadioGroup.Root>
              </VStack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  fontSize={{ base: "sm", md: "md" }}
                  size={{ base: "sm", md: "md" }}
                  bg={buttonBg}
                  color={buttonColor}
                  _hover={{ bg: buttonHoverBg }}
                >
                  Done
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default SettingsModal;

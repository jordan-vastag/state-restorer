import { Image, Flex, Box } from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode";
import { getIconPath } from "@/utils/iconUtils";

interface errorProps {
  text: string;
  subtext: string;
}

function Error(props: errorProps) {
  const { colorMode } = useColorMode();

  return (
    <Flex
      flexDirection="column"
      spaceY="5"
      alignItems="center"
      justifyContent="center"
      height="inherit"
    >
      <Image
        src={getIconPath("alert-triangle", colorMode)}
        alt="Error Icon"
        boxSize="3xs"
        fit="scale-down"
      />
      <Box fontSize="3xl">{props.text}</Box>
      <Box fontSize="xl">{props.subtext}</Box>
    </Flex>
  );
}

export default Error;

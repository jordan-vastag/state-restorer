import { Image, Flex, Box } from "@chakra-ui/react";

interface errorProps {
  text: string;
  subtext: string;
}

function Error(props: errorProps) {
  return (
    <Flex
      flexDirection="column"
      spaceY="5"
      alignItems="center"
      justifyContent="center"
      height="inherit"
    >
      <Image
        src="alert-icon.png"
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

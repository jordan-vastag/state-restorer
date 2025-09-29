import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useColorModeValue } from "@/components/ui/color-mode";

interface bodyProps {
  children: ReactNode;
}

const Body = (props: bodyProps) => {
  const bgColor = useColorModeValue("white", "#1a202c");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <>
      <Flex
        flexDirection="column"
        spaceY="10"
        flex="1"
        minHeight="0"
        bg={bgColor}
        color={textColor}
      >
        {props.children}
      </Flex>
    </>
  );
};

export default Body;

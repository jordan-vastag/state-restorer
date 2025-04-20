import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface bodyProps {
  children: ReactNode
}

const Body = (props: bodyProps) => {
  return (
    <>
      <Flex flexDirection="column" flex="1" spaceY="10">
        {props.children}
      </Flex>
    </>
  );
}

export default Body;

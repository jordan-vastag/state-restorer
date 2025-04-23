import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface bodyProps {
  children: ReactNode;
}

const Body = (props: bodyProps) => {
  return (
    <>
      <Flex flexDirection="column" spaceY="10" height="90vh">
        {props.children}
      </Flex>
    </>
  );
};

export default Body;

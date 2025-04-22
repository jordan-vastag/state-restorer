import { Flex } from "@chakra-ui/react";
import { Provider } from "@/components/ui/provider";
import { Navbar, Body, Footer } from "@/components";
import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from "react";

interface props {
  children: ReactNode;
}

function Main(props: props) {
  return (
    <Provider>
      <Toaster />
      <Flex flexDirection="column">
        <Navbar />
        <Body>{props.children}</Body>
        <Footer />
      </Flex>
    </Provider>
  );
}

export default Main;

import { Flex } from "@chakra-ui/react";
import { Provider } from "@/components/ui/provider";
import { Navbar, Body, Footer, Game } from "@/components";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <Provider>
      <Toaster />
      <Flex flexDirection="column">
        <Navbar />
        <Body>
          <Game />
        </Body>
        <Footer />
      </Flex>
    </Provider>
  );
}

export default App;

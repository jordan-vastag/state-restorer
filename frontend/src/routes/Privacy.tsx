import { Flex } from "@chakra-ui/react";
import { Provider } from "@/components/ui/provider";
import { Navbar, Body, Footer } from "@/components";
import Markdown from "react-markdown";

function App() {
  const privacyPolicy = "# Privacy Policy";

  return (
    <Provider>
      <Flex flexDirection="column">
        <Navbar />
        <Body>
          <Markdown>{privacyPolicy}</Markdown>
        </Body>
        <Footer />
      </Flex>
    </Provider>
  );
}

export default App;

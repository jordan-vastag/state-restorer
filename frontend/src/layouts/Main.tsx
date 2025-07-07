import { Flex } from "@chakra-ui/react";
import { Provider } from "@/components/ui/provider";
import { Navbar, Body, Footer } from "@/components";
import { Toaster } from "@/components/ui/toaster";
import { Difficulty } from "@/constants";
import { ReactNode } from "react";

interface props {
  children: ReactNode;
  difficulty?: string;
  onDifficultyChange?: (difficulty: string) => void;
}

function Main(props: props) {
  return (
    <Provider>
      <Toaster />
      <Flex flexDirection="column">
        <Navbar 
          currentDifficulty={props.difficulty || Difficulty.MEDIUM}
          onDifficultyChange={props.onDifficultyChange || (() => {})}
        />
        <Body>{props.children}</Body>
        <Footer />
      </Flex>
    </Provider>
  );
}

export default Main;

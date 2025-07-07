import { Main } from "@/layouts";
import { Game } from "@/components";
import { Difficulty } from "@/constants";
import { useState } from "react";

function App() {
  const [difficulty, setDifficulty] = useState(Difficulty.MEDIUM);

  const handleDifficultyChange = (newDifficulty: string) => {
    setDifficulty(newDifficulty);
  };

  return (
    <Main>
      <Game 
        difficulty={difficulty} 
        onDifficultyChange={handleDifficultyChange}
      />
    </Main>
  );
}

export default App;

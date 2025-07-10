import { Error } from "@/components";
import { Main } from "@/layouts";

function App() {
  return (
    <Main>
      <Error
        text="Uh oh! Something went wrong."
        subtext="Please try again later."
      />
    </Main>
  );
}

export default App;

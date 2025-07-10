import { Main } from "@/layouts";
import { Error } from "@/components";

function NotFound() {
  return (
    <Main>
      <Error
        text="404 Not Found"
        subtext="The page you are looking for does not exist."
      />
    </Main>
  );
}

export default NotFound;

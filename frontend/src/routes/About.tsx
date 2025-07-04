import { Main } from "@/layouts";
import { Box, Heading, Link, Text } from "@chakra-ui/react";

function About() {
  return (
    <Main>
      <Box maxW="900px" mx="auto" mt={12} px={4}>
        <Heading as="h1" size="2xl" mb={6}>
          About State Restorer
        </Heading>
        <Text fontSize="xl" mb={10}>
          State Restorer is a game inspired by classic slide puzzles. Instead of
          rearranging tiles, players must attempt to reverse engineer the series
          of taps that result in the goal board state.
        </Text>
        <Heading as="h2" fontSize="xl" mb={4}>
          Future
        </Heading>
        <Text fontSize="xl" mb={10}>
          The game currently features random board generation and a basic
          difficulty system, but in the future there may be different modes,
          improved puzzle generation, and user customizable color themes. We're
          always open to ideas :)
        </Text>
        <Text fontSize="xl" mb={10}>
          If you have any feedback, ideas, or suggestions, please{" "}
          {/* TODO: add link icon */}
          <Link href="/contact-us">contact us</Link>. If you're interested in
          contributing, feel free to open a pull request on{" "}
          <Link
            href="https://github.com/jordan-vastag/state-restorer"
            target="_blank"
          >
            Github
          </Link>
          .
        </Text>
        <Heading as="h2" fontSize="xl" mb={4}>
          Development
        </Heading>
        <Text fontSize="xl" mb={10}>
          State Restorer was developed by Jordan Vastag for fun and as an
          exercise in full stack web development. To view his other projects or
          work experience, check out his profile on{" "}
          {/* TODO: add github, email, and linkedin images and external link icons */}
          <Link href="https://github.com/jordan-vastag" target="_blank">
            Github
          </Link>{" "}
          or{" "}
          <Link href="https://linkedin.com/in/jordan-vastag" target="_blank">
            LinkedIn
          </Link>
          .
        </Text>
        <Text fontSize="xl" mb={10}>
          {/* TODO: add tool images and external link icons */}
          Made with{" "}
          <Link href="https://https://react.dev/" target="_blank">
            React
          </Link>{" "}
          +{" "}
          <Link href="https://chakra-ui.com/" target="_blank">
            ChakraUI
          </Link>{" "}
          and{" "}
          <Link href="https://fastapi.tiangolo.com/" target="_blank">
            FastAPI
          </Link>
          .
        </Text>
        <Text fontSize="xl">Thanks for playing!</Text>
      </Box>
    </Main>
  );
}

export default About;

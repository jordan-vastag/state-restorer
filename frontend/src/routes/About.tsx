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
          <br />
          <br />
          The game currently features random board generation and a basic
          difficulty system, but in the future there may be different modes,
          improved puzzle generation, and user customizable color themes. If you
          have any feedback, ideas, or suggestions, please{" "}
          {/* TODO: add link icon */}
          <Link href="/contact-us">contact us</Link>.
        </Text>
        <Heading as="h2" size="xl" mb={4}>
          The Team
        </Heading>
        <Text fontSize="xl" mb={10}>
          State Restorer was developed by Jordan Vastag as an exercise in full
          stack web development. To view his other projects, check out his{" "}
          {/* TODO: add github, email, and linkedin images and external link icons */}
          <Link href="https://github.com/jordan-vastag" target="_blank">
            Github profile
          </Link>
          . To directly contact him, reach out via{" "}
          <Link href="mailto:jordanrvastag@gmail.com" target="_blank">
            email
          </Link>{" "}
          or{" "}
          <Link href="https://linkedin.com/in/jordan-vastag" target="_blank">
            LinkedIn
          </Link>
          <br />
          <br />
          Thanks for playing State Restorer!
        </Text>
      </Box>
    </Main>
  );
}

export default About;

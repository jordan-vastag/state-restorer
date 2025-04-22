import { Flex, Link, Image, Box, Container } from "@chakra-ui/react";
import { SOURCE_CODE_GITHUB_URL } from "@/constants";

function Navbar() {
  return (
    <>
      <Container>
        <Flex justifyContent="space-between" padding="3">
          <Flex alignItems="center" spaceX="2">
            <Link href="/" padding="2">
              <Image src="logo.png" alt="State Restorer Logo" />
            </Link>
            <Box fontSize="3xl">
              <b>State Restorer</b>
            </Box>
          </Flex>
          <Flex alignItems="center" spaceX="5" fontSize="xl">
            <Link href="/">Home</Link>
            <Link href="/how-to-play">How To Play</Link>
            <Link href="/about">About</Link>
            <Link href="/contact-us">Contact</Link>
            <Link href={SOURCE_CODE_GITHUB_URL} target="_blank">
              <Image
                boxSize="6"
                src="github-mark/github-mark-dark.svg"
                alt="GitHub logo"
                _hover={{ opacity: 0.5 }}
              />
            </Link>
          </Flex>
        </Flex>
      </Container>
    </>
  );
}

export default Navbar;

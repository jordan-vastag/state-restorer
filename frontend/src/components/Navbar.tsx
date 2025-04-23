import { Flex, Link, Image, Box } from "@chakra-ui/react";
import { SOURCE_CODE_GITHUB_URL } from "@/constants";

function Navbar() {
  return (
    <>
      {/* TODO: use theme color */}
      <Flex bg="whitesmoke" justifyContent="center">
        <Flex justifyContent="space-between" width="60vw" padding="3">
          <Flex alignItems="center" spaceX="2">
            <Link href="/">
              <Image
                src="logo.png"
                alt="State Restorer Logo"
                scale="0.75"
              ></Image>
            </Link>
            <Box fontSize="xl">
              <b>State Restorer</b>
            </Box>
          </Flex>
          <Flex alignItems="center" spaceX="4" fontSize="lg">
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
      </Flex>
    </>
  );
}

export default Navbar;

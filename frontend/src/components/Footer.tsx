import { Box, Flex, Link } from "@chakra-ui/react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      {/* TODO: use theme color */}
      <Flex bg="whitesmoke" padding="4" justifyContent="center" fontSize="sm">
        <Flex justifyContent="space-between" width="60vw">
          <Box>© {year} State Restorer. All rights reserved.</Box>
          <Flex spaceX="4">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms-and-conditions">Terms and Conditions</Link>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default Footer;

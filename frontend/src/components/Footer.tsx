import { Box, Flex, Link } from "@chakra-ui/react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      {/* TODO: use theme color */}
      <Flex bg="whitesmoke" padding={{ base: 2, md: 4 }} justifyContent="center" fontSize={{ base: "xs", md: "sm" }}>
        <Flex 
          justifyContent="space-between" 
          width={{ base: "95vw", md: "60vw" }}
          flexDirection={{ base: "column", md: "row" }}
          alignItems="center"
          gap={{ base: 2, md: 0 }}
        >
          <Box textAlign="center">© {year} State Restorer. All rights reserved.</Box>
          <Flex spaceX={{ base: 2, md: 4 }} flexWrap="wrap" justifyContent="center">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms-and-conditions">Terms and Conditions</Link>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default Footer;

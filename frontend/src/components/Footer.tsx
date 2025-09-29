import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

function Footer() {
  const year = new Date().getFullYear();
  const app_version = import.meta.env.VITE_APP_VERSION;
  const bgColor = useColorModeValue("whitesmoke", "#282c34");

  return (
    <>
      <Flex
        bg={bgColor}
        padding={{ base: 2, md: 4 }}
        justifyContent="center"
        fontSize={{ base: "xs", md: "sm" }}
      >
        <Flex
          justifyContent="space-between"
          width={{ base: "95vw", md: "60vw" }}
          flexDirection={{ base: "column", md: "row" }}
          alignItems="center"
          gap={{ base: 2, md: 0 }}
        >
          <Box textAlign="center">
            © {year} State Restorer. All rights reserved.
          </Box>
          <Flex
            spaceX={{ base: 2, md: 4 }}
            flexWrap="wrap"
            justifyContent="center"
          >
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms-and-conditions">Terms and Conditions</Link>
            <Text opacity="0.5">v{app_version}</Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default Footer;

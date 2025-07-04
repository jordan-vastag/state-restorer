import { Main } from "@/layouts";
import { Box, Heading, Text } from "@chakra-ui/react";

function Privacy() {
  return (
    <Main>
      <Box maxW="800px" mx="auto" mt={12} px={4}>
        <Heading as="h1" size="2xl" mb={6}>
          Privacy Policy
        </Heading>
        <Heading as="h2" size="xl" mb={4} mt={8}>
          Our Promise
        </Heading>
        <Text fontSize="xl" mb={6}>
          State Restorer does not collect, store, or share any personal user
          data.
        </Text>
        <Text fontSize="xl" mb={6}>
          State Restorer does track usage and health metrics in order to improve
          the site.
        </Text>
        <Heading as="h2" size="xl" mb={4} mt={8}>
          Disclaimer
        </Heading>
        <Text fontSize="xl">This privacy policy is subject to change.</Text>
      </Box>
    </Main>
  );
}

export default Privacy;

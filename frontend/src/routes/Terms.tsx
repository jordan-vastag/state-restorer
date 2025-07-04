import { Main } from "@/layouts";
import { Box, Heading, Text } from "@chakra-ui/react";

function Terms() {
  return (
    <Main>
      <Box maxW="800px" mx="auto" mt={12} px={4}>
        <Heading as="h1" size="2xl" mb={6}>
          Terms and Conditions
        </Heading>
        <Text fontSize="xl" mb={6}>
          State Restorer is provided for personal and non-commercial use only.
          You may not use this game or its content for commercial purposes.
        </Text>
        <Text fontSize="xl" mb={6}>
          If you use State Restorer to create content (such as videos, articles,
          or streams), please include a link to the game in your content or its
          description.
        </Text>
        <Heading as="h2" size="xl" mb={4} mt={8}>
          Disclaimer
        </Heading>
        <Text fontSize="xl">
          These terms and conditions are subject to change.
        </Text>
      </Box>
    </Main>
  );
}
export default Terms;

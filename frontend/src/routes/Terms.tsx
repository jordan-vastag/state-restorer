import { Main } from "@/layouts";
import { Box, Heading, Text } from "@chakra-ui/react";

function Terms() {
  return (
    <Main>
      <Box maxW="800px" mx="auto" mt={{ base: 6, md: 12 }} px={{ base: 6, md: 4 }}>
        <Heading as="h1" size="2xl" mb={6}>
          Terms and Conditions
        </Heading>
        <Text fontSize="xl" mb={6}>
          State Restorer is provided for personal use and content creation
          purposes only.
        </Text>
        <Text fontSize="xl" mb={6}>
          If you use State Restorer to create content (such as YouTube videos,
          TikToks, Twitch streams, articles, etc.), monetized or not, please
          include a link to the game in the content itself or its description.
        </Text>
        <Heading as="h2" size="xl" mb={4} mt={8}>
          Additional Terms
        </Heading>
        <Text fontSize="xl" mb={4}>
          <u>User Conduct:</u> Users agree not to use State Restorer for any
          unlawful activities or to attempt to disrupt or harm the service.
        </Text>
        <Text fontSize="xl" mb={6}>
          <u>Changes to Terms:</u> Continued use of State Restorer after changes
          to these terms constitutes acceptance of those changes.
        </Text>
        <Heading as="h2" size="xl" mb={4} mt={8}>
          Disclaimer
        </Heading>
        <Text fontSize="xl" mb={8}>
          These terms and conditions are subject to change.
        </Text>
      </Box>
    </Main>
  );
}
export default Terms;

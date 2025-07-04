import { Main } from "@/layouts";
import {
  Box,
  Button,
  Center,
  Field,
  Flex,
  Heading,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

const FEEDBACK_KEY = "feedback_last_submitted";
const MAX_FEEDBACK_LENGTH = 1000;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isRateLimited = () => {
    const last = localStorage.getItem(FEEDBACK_KEY);
    if (!last) return false;
    const lastTime = parseInt(last, 10);
    return Date.now() - lastTime < 15 * 60 * 1000; // 15 minutes
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (isRateLimited()) {
      setError("You just sent a message. Please try again later.");
      return;
    }
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!feedback.trim()) {
      setError("Message cannot be empty.");
      return;
    }
    setLoading(true);

    // TODO: send feedback to API
    console.log("Feedback submitted:", { name, email, feedback });

    setTimeout(() => {
      localStorage.setItem(FEEDBACK_KEY, Date.now().toString());
      setSubmitted(true);
      setLoading(false);
    }, 600);
  };

  if (submitted) {
    return (
      <Main>
        <Box maxW="600px" mx="auto" mt={12} px={4} textAlign="center">
          <Text fontSize="2xl" mb={4}>
            Thank you for your feedback!
          </Text>
        </Box>
      </Main>
    );
  }

  return (
    <Main>
      <Flex
        maxW="1100px"
        mx="auto"
        mt={12}
        px={4}
        gap={12}
        align="flex-start"
        direction={["column", "column", "row"]}
      >
        <Box flex="1">
          <Heading as="h1" size="2xl" mb={6}>
            Contact Us
          </Heading>
          <Text fontSize="xl" color="gray.600">
            Have questions, feedback, or suggestions about State Restorer? We'd
            love to hear from you! Once you fill out the form we'll get back to
            you as soon as possible.
          </Text>
        </Box>
        <Box flex="1" minW={["100%", "100%", "400px"]}>
          <form onSubmit={handleSubmit}>
            <Field.Root mb={4}>
              <Field.Label htmlFor="name">Name</Field.Label>
              <Input
                id="name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading || isRateLimited()}
                required
              />
            </Field.Root>
            <Field.Root mb={4}>
              <Field.Label htmlFor="email">Email Address</Field.Label>
              <Input
                id="email"
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading || isRateLimited()}
                required
              />
            </Field.Root>
            <Field.Root mb={4}>
              <Field.Label htmlFor="feedback">Message</Field.Label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => {
                  if (e.target.value.length <= MAX_FEEDBACK_LENGTH)
                    setFeedback(e.target.value);
                }}
                placeholder="Your Message"
                maxLength={MAX_FEEDBACK_LENGTH}
                rows={6}
                disabled={loading || isRateLimited()}
                required
              />
              <Flex justify="space-between" width="100%">
                <Text fontSize="sm" color="gray.500">
                  * All fields are required.
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {feedback.length}/{MAX_FEEDBACK_LENGTH}
                </Text>
              </Flex>
            </Field.Root>
            {error && (
              <Text color="red.500" mb={2}>
                {error}
              </Text>
            )}
            <Button
              type="submit"
              width="100%"
              colorScheme="purple"
              size="lg"
              loading={loading}
              disabled={isRateLimited()}
              mt={2}
            >
              Send Message
            </Button>
            {isRateLimited() && (
              <>
                <Text color="orange.500" mt={4}>
                  <Center>
                    You can only send one message every 15 minutes.
                  </Center>
                </Text>
                <Text color="orange.500">
                  <Center>Please try again later :)</Center>
                </Text>
              </>
            )}
          </form>
        </Box>
      </Flex>
    </Main>
  );
}

export default Contact;

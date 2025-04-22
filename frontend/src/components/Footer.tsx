import { Box, Container, Flex, Link } from "@chakra-ui/react";
import { SOURCE_CODE_GITHUB_URL } from "@/constants";

function Footer() {
  const year = new Date().getFullYear();
  const footerLinkFontSize = "md";
  const footerRowSpacing = "4";

  return (
    <>
      <Box marginTop={footerRowSpacing}>
        <Container>
          <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            spaceY={footerRowSpacing}
          >
            <Flex
              alignItems="center"
              justifyContent="center"
              spaceX="5"
              paddingTop={footerRowSpacing}
            >
              <Link fontSize={footerLinkFontSize} href="/about">
                About
              </Link>
              <Link fontSize={footerLinkFontSize} href="/contact-us">
                Contact
              </Link>
              <Link
                fontSize={footerLinkFontSize}
                href={SOURCE_CODE_GITHUB_URL}
                target="_blank"
              >
                Source Code
              </Link>
              <Link fontSize={footerLinkFontSize} href="/privacy-policy">
                Privacy
              </Link>
              <Link fontSize={footerLinkFontSize} href="/terms-and-conditions">
                Terms and Conditions
              </Link>
            </Flex>
            <Box fontSize="sm" paddingBottom={footerRowSpacing}>
              © {year} State Restorer. All rights reserved.
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  );
}

export default Footer;

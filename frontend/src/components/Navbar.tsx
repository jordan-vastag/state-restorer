import { SOURCE_CODE_GITHUB_URL } from "@/constants";
import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function Navbar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string>("home");

  const getSelectedItemFromPath = (pathname: string): string => {
    if (pathname === "/") return "home";
    if (pathname === "/how-to-play") return "how-to-play";
    if (pathname === "/about") return "about";
    if (pathname === "/contact-us") return "contact";
    return "home";
  };

  useEffect(() => {
    const currentPath = window.location.pathname;
    setSelectedItem(getSelectedItemFromPath(currentPath));
  }, []);

  const NavItem = ({
    href,
    icon,
    label,
    itemKey,
    iconOnly = false,
  }: {
    href: string;
    icon: string;
    label: string;
    itemKey: string;
    iconOnly?: boolean;
  }) => {
    const isHovered = hoveredItem === itemKey;
    const isSelected = selectedItem === itemKey;
    const showText = !iconOnly || isHovered || isSelected;

    return (
      <Link
        href={href}
        display="flex"
        alignItems="center"
        textDecoration="none"
        borderBottom={isSelected ? "2px solid" : "2px solid transparent"}
        borderColor={isSelected ? "gray.400" : "transparent"}
        pb={1}
        onMouseEnter={() => setHoveredItem(itemKey)}
        onMouseLeave={() => setHoveredItem(null)}
        onClick={() => setSelectedItem(itemKey)}
        _hover={{ textDecoration: "none" }}
        transition="all 0.8s ease"
      >
        <Image boxSize="6" src={icon} alt={`${label} icon`} />
        <Text
          ml={showText ? 1 : 0}
          opacity={showText ? 1 : 0}
          width={showText ? "auto" : 0}
          overflow="hidden"
          whiteSpace="nowrap"
          fontSize="lg"
        >
          {label}
        </Text>
      </Link>
    );
  };

  return (
    <>
      {/* TODO: use theme color */}
      <Flex bg="whitesmoke" justifyContent="center">
        <Flex justifyContent="space-between" width="60vw" padding="3">
          <Flex alignItems="center" spaceX="2">
            <Link href="/" _hover={{ textDecoration: "none" }}>
              <Image
                src="logo/logo192.png"
                alt="State Restorer Logo"
                boxSize="48px"
              ></Image>
              <Box fontSize="xl">
                <b>State Restorer</b>
              </Box>
            </Link>
          </Flex>
          <Flex alignItems="center" spaceX="4" fontSize="lg">
            <NavItem href="/" icon="home.svg" label="Home" itemKey="home" />
            <NavItem
              href="/about"
              icon="info.svg"
              label="About"
              itemKey="about"
            />
            <NavItem
              href="/contact-us"
              icon="mail.svg"
              label="Contact"
              itemKey="contact"
            />
            <Link href={SOURCE_CODE_GITHUB_URL} target="_blank">
              <Image
                boxSize="6"
                src="github-mark/github-mark-dark.svg"
                alt="GitHub logo"
                _hover={{ opacity: 0.7 }}
                transition="opacity 0.8s ease"
              />
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default Navbar;

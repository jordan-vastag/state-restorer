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
    iconOnly?: boolean | { base: boolean; md: boolean };
  }) => {
    const isHovered = hoveredItem === itemKey;
    const isSelected = selectedItem === itemKey;
    
    const isResponsive = typeof iconOnly === 'object';
    const showTextDesktop = !iconOnly || isHovered || isSelected;

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
          ml={isResponsive ? { base: 0, md: 1 } : showTextDesktop ? 1 : 0}
          opacity={isResponsive ? 1 : showTextDesktop ? 1 : 0}
          width={isResponsive ? "auto" : showTextDesktop ? "auto" : 0}
          overflow="hidden"
          whiteSpace="nowrap"
          fontSize="lg"
          display={isResponsive ? { base: "none", md: "block" } : undefined}
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
        <Flex 
          justifyContent="space-between" 
          width={{ base: "95vw", md: "60vw" }} 
          padding={{ base: "2", md: "3" }}
        >
          <Flex alignItems="center" spaceX="2">
            <Link href="/" _hover={{ textDecoration: "none" }}>
              <Image
                src="logo/logo192.png"
                alt="State Restorer Logo"
                boxSize={{ base: "32px", md: "48px" }}
              ></Image>
              <Box fontSize={{ base: "md", md: "xl" }}>
                <b>State Restorer</b>
              </Box>
            </Link>
          </Flex>
          <Flex alignItems="center" spaceX={{ base: "4", md: "4" }} fontSize={{ base: "sm", md: "lg" }}>
            <NavItem 
              href="/" 
              icon="home.svg" 
              label="Home" 
              itemKey="home" 
              iconOnly={{ base: true, md: false }}
            />
            <NavItem
              href="/about"
              icon="info.svg"
              label="About"
              itemKey="about"
              iconOnly={{ base: true, md: false }}
            />
            <NavItem
              href="/contact-us"
              icon="mail.svg"
              label="Contact"
              itemKey="contact"
              iconOnly={{ base: true, md: false }}
            />
            <Link 
              href={SOURCE_CODE_GITHUB_URL} 
              target="_blank"
              display="flex"
              alignItems="center"
              pb={1}
            >
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

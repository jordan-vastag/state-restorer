import { Wrap, Box, Image} from "@chakra-ui/react";

function Navbar() {
  return (
    <>
      <Wrap>
        <Image src="logo.png" alt="State Restorer Logo" display="inline" />
        <Box height="md" display="inline">
          <h1>State Restorer</h1>
        </Box>
      </Wrap>
    </>
  );
}

export default Navbar;

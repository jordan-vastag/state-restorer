import { Flex } from "@chakra-ui/react";

function Footer() {
  const year = new Date().getFullYear();
  // const year = new Date().getFullYear();
  // const year = new Date().getFullYear();
  // const year = new Date().getFullYear();
  // const year = new Date().getFullYear();
  // const

  return (
    <>
      <Flex alignItems="center" justifyContent="center" padding="5">
        <div>© State Restorer {year}. All rights reserved.</div>
      </Flex>
    </>
  );
}

export default Footer;

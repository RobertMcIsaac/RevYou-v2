import { Flex, Box, Container, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      as="footer"
      position="static"
      bottom="0"
      left="0"
      right="0"
      height="100px"
      bg="black"
      opacity={0.9}
      color="white"
      align="left"
    >
      <Container
        maxW="container.lg"
        display="flex"
        flexDirection="column"
        alignItems="left"
        justifyContent="center"
        height="100%"
      >
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            RevYou
          </Text>
        </Box>
        <Text fontSize="md" color="gray.400" mt={2}>
          Your go-to platform for feedback and ideas
        </Text>
      </Container>
      <Container
        maxW="container.lg"
        display="flex"
        flexDirection="column"
        alignItems="left"
        justifyContent="center"
        height="100%"
        ml="auto"
      >
        <Text fontSize="sm" color="gray.400">
          &copy; {new Date().getFullYear()} Makers Agency. All rights
          reserved.
        </Text>
        <Text fontSize="sm" color="gray.400">
          Made with ❤️ by RevYou Team
        </Text>
      </Container>
    </Flex>
  );
};

export default Footer;

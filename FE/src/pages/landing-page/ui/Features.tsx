import { Heading, Text, HStack, Box, Container } from "@chakra-ui/react";

const Features = () => {
  return (
    <Container
      id="features"
      maxW="container.xl"
      px={6}
      py={12}
      textAlign="center"
      position="relative"
      border="1px solid"
      borderColor="gray.200"
      bgGradient={"linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)"}
      _dark={{ bg:"#222327ff", bgGradient:"none", border:"1px", borderColor: "black" }}
    >
      <Heading
        as="h1"
        fontWeight="bold"
        color="gray.900"
        mb={6}
        fontSize={["xl", "3xl", "4xl", "5xl"]}
        lineHeight="0.6"
        textAlign="center"
        _dark={{ color: "#048535"}}
      >
        Why Choose RevYou?
      </Heading>
      <Text
        fontSize={["lg", "xl", "2xl"]}
        color="gray.600"
        mb={12}
        maxW="2xl"
        mx="auto"
        lineHeight="relaxed"
        _dark={{ color: "white" }}
      >
        Discover the key features that make RevYou the best choice for your
        feedback needs.
      </Text>
      <HStack
        justify="center"
        mt={12}
        mb={8}
        flexDirection="row"
        alignItems="center"
      >
        <Box
          bg="white"
          p={6}
          borderRadius="md"
          boxShadow="md"
          textAlign="left"
          height={200}
          width={{ base: "100%", md: "auto" }}
          _dark={{ bg: "#282828" }}
        >
          <Heading as="h3" size="md" mb={2} color="gray.800" _dark={{ color:"#048535"}}>
            Easy to Use
          </Heading>
          <Text color="gray.600" _dark={{ color: "white" }}>
            Intuitive interface that makes it easy to request and give feedback.
          </Text>
        </Box>
        <Box
          bg="white"
          p={6}
          borderRadius="md"
          boxShadow="md"
          textAlign="left"
          height={200}
          width={{ base: "100%", md: "auto" }}
          _dark={{ bg: "#282828" }}
        >
          <Heading as="h3" size="md" mb={2} color="gray.800" _dark={{ color:"#048535"}}>
            360° Feedback
          </Heading>
          <Text color="gray.600" _dark={{ color: "white"}} >
            Collect feedback from managers, peers, and direct reports for
            complete perspective.
          </Text>
        </Box>
        <Box
          bg="white"
          p={6}
          borderRadius="md"
          boxShadow="md"
          textAlign="left"
          height={200}
          width={{ base: "100%", md: "auto" }}
          _dark={{ bg: "#282828" }}
        >
          <Heading as="h3" size="md" mb={2} color="gray.800" _dark={{ color:"#048535"}}>
            Actionable Insights
          </Heading>
          <Text color="gray.600" _dark={{ color: "white" }}>
            Advanced analytics help you understand patterns and track your
            professional growth.
          </Text>
        </Box>
      </HStack>
    </Container>
  );
};

export default Features;

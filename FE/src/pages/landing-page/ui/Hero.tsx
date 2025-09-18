import {
  Heading,
  Text,
  HStack,
  Box,
  Container,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import LandingImage from "@/assets/landing-image.svg";

const Hero = () => {
  return (
    <Box
      minH="100vh"
      bg="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      border={"1px solid"}
      borderColor="gray.200"
      _dark={{ bg:"#222327ff", border:"1px", borderColor: "black" }}
    >
      <Container
        maxW="4xl"
        px={6}
        textAlign="center"
        position="relative"
        zIndex={10}
      >
        <Box maxW="4xl" mx="auto">
          {/* Heading */}
          <HStack
            justify="center"
            mb={8}
            flexDirection="row"
            alignItems="center"
          >
            <Heading
              as="h1"
              fontWeight="bold"
              color="gray.900"
              _dark={{ color: "#ffffffff" }}
              mb={6}
              fontSize={["2xl", "4xl", "5xl", "6xl"]}
              lineHeight="0.9"
              textAlign="left"
            >
              Get honest feedback
              <br />
              <Box as="span" color="green.600" _dark={{ color: "#048535"}} >
                from your team
              </Box>
            </Heading>

            {/* Image */}
            <Image
              as="img"
              src={LandingImage}
              style={{ width: "100%", maxWidth: "350px", height: "auto" }}
              alt="Feedback Platform"
              mb={8}
              display="block"
              mx="auto"
              objectFit="cover"
            />
          </HStack>
          {/* Subheading */}
          <Text
            fontSize={["lg", "xl", "2xl"]}
            color="gray.600"
            _dark={{ color:"white" }}
            mb={12}
            maxW="2xl"
            mx="auto"
            lineHeight="relaxed"
          >
            Feedback platform that helps you grow professionally and build
            stronger workplace relationships.
          </Text>

          {/* Stats */}
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            maxW="2xl"
            mx="auto"
          >
            <Box>
              <Text fontSize="3xl" fontWeight="bold" color="gray.900" mb={2} _dark={{ color: "#048535"}} >
                10,000+
              </Text>
              <Text color="gray.600" _dark={{ color:"white" }} >Active users</Text>
            </Box>
            <Box>
              <Text fontSize="3xl" fontWeight="bold" color="gray.900" mb={2} _dark={{ color: "#048535"}}>
                50,000+
              </Text>
              <Text color="gray.600" _dark={{ color:"white" }} >Feedback requests</Text>
            </Box>
            <Box>
              <Text fontSize="3xl" fontWeight="bold" color="gray.900" mb={2} _dark={{ color: "#048535"}}>
                4.9/5
              </Text>
              <Text color="gray.600" _dark={{ color:"white" }} >User rating</Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;

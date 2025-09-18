import { Box, Container, Heading, Text } from "@chakra-ui/react";
const About = () => {
    return (
        <Box
            as="section"
            bg="gray.50"
            py={10}
            px={4}
            textAlign="center"
            border={"1px solid"}
            borderColor="gray.200"
            id="about"
            _dark={{ bg:"#222327ff", bgGradient:"none", border:"1px", borderColor: "black" }}
        >
            <Container maxW="container.md">
                <Heading as="h2" size="xl" mb={6}>
                    About Us
                </Heading>
                <Text fontSize="lg" mb={4}>
                    We are a team of passionate individuals dedicated to making a difference in the world through innovative solutions.
                </Text>
                <Text fontSize="lg">
                    Our mission is to empower communities and drive positive change through technology and collaboration.
                </Text>
            </Container>
        </Box>
    )
}

export default About;
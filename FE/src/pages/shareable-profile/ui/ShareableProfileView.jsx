import {
  Box,
  Card,
  HStack,
  Flex,
  Text,
  VStack,
  Avatar,
} from "@chakra-ui/react";

export const ShareableProfileView = ({ profileData }) => {
  if (!profileData || profileData.length === 0) {
    return (
      <Box>
        <Card.Root bgColor="orange.50" shadow="md" maxW="600px" _dark={{ bg:"blackAlpha.100"}}>
          <Card.Body>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              No Feedbacks Available
            </Text>
          </Card.Body>
        </Card.Root>
      </Box>
    );
  }

  const responses = profileData.flatMap((campaign) =>
    campaign.projects.flatMap((project) =>
      project.team.flatMap((member) =>
        (member.responses || []).flatMap((responseArray) =>
          responseArray.map((response) => ({
            respondent: member.fullName,
            content: response.content,
            createdAt: response.createdAt,
            campaignName: campaign.title,
            projectName: project.projectName,
          }))
        )
      )
    )
  );

  return (
    <>
    <HStack justify="center" mb={4}>
      <Text fontSize="2xl" fontWeight="bold" color="gray.600">
        What people think about John Doe
      </Text>
      </HStack>
      <Flex as="header" direction="row" gap={8} width="100%" align="flex-start">
        <Box w={{ base: "100%", md: "280px" }} flexShrink={0}>
          <VStack align="start">
            <Box>
              <Avatar.Root size="full" name="John Doe">
                <Avatar.Fallback name="John Doe" />
                <Avatar.Image
                  src="https://bit.ly/dan-abramov"
                  alt="John Doe"
                  borderRadius="full"
                />
              </Avatar.Root>
              <Text fontSize="lg" fontWeight="bold">
                John Doe
              </Text>
              <Text color="gray.600" size="sm">
                Passionate about building impactful software. Ex-Product
                Manager, now Full Stack Developer.
              </Text>
            </Box>
          </VStack>
        </Box>

        <VStack p={1} flex={1} align="stretch">
          {responses.map((response, index) => (
            <Card.Root
              key={index}
              bgColor="orange.50"
              shadow="md"
              mb={4}
              _dark={{ bg:"blackAlpha.100"}}
            >
              <Card.Body>
                <VStack spacing={4} align="stretch">
                  <Text fontSize="md">{response.respondent}</Text>
                  <Box
                    bgColor={"white"}
                    p={3}
                    borderRadius="md"
                    border={"1px solid #ccc"}
                    _dark={{ bg:"whiteAlpha.200"}}
                  >
                    <Text fontSize="xs" fontFamily={"mono"}>
                      {response.content}
                    </Text>
                  </Box>
                  <Text fontSize="sm" color="gray.500">
                    {response.campaignName} &bull; {response.projectName} &bull;
                    Submitted on:{" "}
                    {new Date(response.createdAt).toLocaleString()}
                  </Text>
                </VStack>
              </Card.Body>
            </Card.Root>
          ))}
        </VStack>
      </Flex>
    </>
  );
};

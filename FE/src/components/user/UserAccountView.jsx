import {
  Box,
  Button,
  Card,
  HStack,
  Text,
  VStack,
  Field,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";

const SHAREABLE_PROFILE_BASE_URL = import.meta.env
  .VITE_SHAREABLE_PROFILE_BASE_URL;

const UserAccountView = ({ dbUser, onEdit }) => {
  const handleShareProfile = () => {
    console.log("Share profile clicked");
    console.log("Profile URL:", `https://yourapp.com/user/${dbUser._id}`);
    const profileUrl = `${SHAREABLE_PROFILE_BASE_URL}/shareable-profile/${dbUser._id}`;
    navigator.clipboard
      .writeText(profileUrl)
      .then(() => {
        toaster.create({
          title: "Profile URL copied to clipboard!",
          description: "You can now share your profile URL with others.",
          type: "success",
        });
      })
      .catch((error) => {
        console.error("Failed to copy profile URL:", error);
        toaster.create({
          title: "Error copying profile URL",
          description:
            "There was an error copying your profile URL. Please try again.",
          type: "error",
        });
      });
  };

  return (
    <Card.Root bgColor="orange.50" shadow="md" maxW="600px" mx="auto" my={6} _dark={{ bg:"blackAlpha.100"}}>
      <Card.Body>
        <VStack spacing={4} align="stretch">
          <Field.Root mt={3}>
            <Field.Label fontWeight="bold">
              First name{" "}
              <Text as="span" color="red.500" ml={1} opacity={0}>
                *
              </Text>
            </Field.Label>
            <Box borderRadius="md" py={2} px={3}>
              <Text fontSize="sm" color="gray.600">
                {dbUser.firstName}
              </Text>
            </Box>
          </Field.Root>

          <Field.Root mt={3}>
            <Field.Label fontWeight="bold">
              Last name{" "}
              <Text as="span" color="red.500" ml={1} opacity={0}>
                *
              </Text>
            </Field.Label>
            <Box borderRadius="md" py={2} px={3}>
              <Text fontSize="sm" color="gray.600">
                {dbUser.lastName}
              </Text>
            </Box>
          </Field.Root>

          <Field.Root mt={3}>
            <Field.Label fontWeight="bold">Username</Field.Label>
            <Box borderRadius="md" py={2} px={3}>
              <Text fontSize="sm" color="gray.600">
                {dbUser.username}
              </Text>
            </Box>
          </Field.Root>

          <Field.Root mt={3}>
            <Field.Label fontWeight="bold">
              Email{" "}
              <Text as="span" color="red.500" ml={1} opacity={0}>
                *
              </Text>
            </Field.Label>
            <Box borderRadius="md" py={2} px={3}>
              <Text fontSize="sm" color="gray.600">
                {dbUser.email}
              </Text>
            </Box>
          </Field.Root>

          <HStack justify="flex-end">
            <Button 
                colorPalette="gray"
                variant="surface" 
                onClick={() => handleShareProfile()}
            >
              Share Profile
            </Button>
            <Button
              // size="sm"
              variant="surface"
              colorPalette={"gray"}
              // leftIcon={<FaEdit />}
              onClick={onEdit}
            >
              Edit
            </Button>
          </HStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};

export default UserAccountView;

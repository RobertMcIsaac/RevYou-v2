import { Box, Text, Button } from "@chakra-ui/react";
import { syncUser } from "../../services/userService";
import { useAuth0 } from "@auth0/auth0-react";

const SyncUserTestPage = () => {
  const { user, getAccessTokenSilently } = useAuth0();

  const handleSync = async () => {
    console.log(user);
    try {
      const token = await getAccessTokenSilently();
      const result = await syncUser(token, user);
      console.log("Sync success:", result);
    } catch (err) {
      console.error("Sync failed:", err);
    }
  };

  return (
    <Box>
      <br />
      <br />
      <br />
      <Text>Click to test user sync:</Text>
      <Button onClick={handleSync}>Sync User</Button>
    </Box>
  );
};

export default SyncUserTestPage;


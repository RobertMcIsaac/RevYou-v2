import {
  Flex,
  Heading,
  Spacer,
  Avatar,
  Text,
  HStack,
  Menu,
  Portal,
} from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "../../contexts/UserContext";
import "./TopBar.css";

const TopBar = () => {
  const { logout } = useAuth0();
  const { user } = useUser(); // Using UserContext to get user state

  return (
    <>
      <Flex
        as="header"
        position="fixed"
        top="0"
        left="0"
        right="0"
        height="60px"
        zIndex="1000"
        bg="yellow.200"
        _dark={{ bg: "gray.700", color: "white", opacity:"1" }}
        opacity={0.9}
        color="gray.800"
        align="center"
        px={6}
      >
        <Heading size="2xl" className="pacifico-regular">RevYou</Heading>
        <HStack spacing={10} ml={6} flex={1}>
          <ChakraLink as={RouterLink} to="/dashboard" style={{ textDecoration: "none" }}>
            My Campaigns
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/create-campaign" style={{ textDecoration: "none" }}>
            Create Campaign
          </ChakraLink>
        </HStack>
        <Spacer />
        <HStack spacing={4} ml={6}>
          <Avatar.Root size="sm">
            <Avatar.Fallback
              name={user ? user.firstName + " " + user.lastName : "Loading..."}
            />
            <Avatar.Image
              src="https://bit.ly/dan-abramov"
              borderRadius="full"
            />
          </Avatar.Root>
          <Menu.Root>
            <Menu.Trigger _focus={{ boxShadow: "none", outline: "none" }}>
              
                <Text 
                  ml={2} 
                  fontSize="md"
                  _hover={{ textDecoration: "underline", textDecorationColor: "blackAlpha.300" }}  
                >
                  {/* {user ? `${user.firstName} ${user.lastName}` : "Loading..."} */}
                  {user ? `${user.email}` : "Loading..."}
                </Text>
              
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item
                    _focus={{
                      boxShadow: "none",
                      outline: "none",
                      background: "gray.100",
                    }}
                  >
                    <ChakraLink
                      as={RouterLink}
                      to="/me"
                      _focus={{ boxShadow: "none", outline: "none" }}
                      style={{ textDecoration: "none" }}
                    >
                      Account Settings
                    </ChakraLink>
                  </Menu.Item>
                  <Menu.Item
                    _focus={{
                      boxShadow: "none",
                      outline: "none",
                      background: "gray.100",
                    }}
                  >
                    <ChakraLink
                      as={RouterLink}
                      _focus={{ boxShadow: "none", outline: "none" }}
                      style={{ textDecoration: "none" }}
                      onClick={() => {
                        logout({
                          logoutParams: { returnTo: window.location.origin },
                        });
                        sessionStorage.clear();
                      }}
                    >
                      Logout
                    </ChakraLink>
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </HStack>
      </Flex>
    </>
  );
};

export default TopBar;

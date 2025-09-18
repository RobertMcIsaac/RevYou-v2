import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Spinner, Center } from "@chakra-ui/react";
import React from "react";

// Returns a protected version of the component passed in
const ProtectedRoute = ({ component: Component }) => {
  const WrappedComponent = withAuthenticationRequired(Component, {
    // withAuthenticationRequired() handles isLoading and isAuthenticated. Saves need to repeat on each component/page.
    onRedirecting: () => (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    ),
  });

  return <WrappedComponent />;
};

export default ProtectedRoute;


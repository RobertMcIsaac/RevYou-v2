import { Button } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/dashboard");
    return null;
  }

  return (
    <Button 
    colorPalette="black" size="md" 
    onClick={() => loginWithRedirect()}>
      Log In
    </Button>
  );
};

export default LoginButton;
import { useAuth0 } from '@auth0/auth0-react';
import { Button, ButtonGroup } from "@chakra-ui/react";

const LogoutButton = ({ colorPalette, size, variant, fontWeight, alignContent }) => {
  const { logout, isAuthenticated } = useAuth0()

  if (!isAuthenticated) return null

  return (
    <Button 
    // colorPalette="blue" size="md" 
      colorPalette={colorPalette}
      size={size}
      variant={variant}
      fontWeight={fontWeight}
      alignContent={alignContent}
      // onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
      onClick={
        () => {
          logout({ logoutParams: { returnTo: window.location.origin } });
          sessionStorage.clear();
        }
      }
    >
      Log Out
    </Button>
  )
}

export default LogoutButton;

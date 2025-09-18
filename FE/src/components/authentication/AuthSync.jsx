import { Box, Text, Button } from "@chakra-ui/react";
import { syncUser } from "../../services/userService";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

// This syncs the user profile information from the Auth0 ID token with MongoDB users
//If user doesn't exist (i.e. on user's first sign-up/login) in the mongoDB, a new user is created with the profle information from Auth0
// Will run on each login
const AuthSync = () => {
    const { user, isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
    console.log("user from AuthSync:", user);

    useEffect(() => {
        if (isLoading || !isAuthenticated) return;

        const hasSynced = sessionStorage.getItem("hasSynced");
        
        const runSync = async () => {
            try {
                const token = await getAccessTokenSilently();
                await syncUser(token, user);
                sessionStorage.setItem("hasSynced", true)
                //sessionStorage is now cleared on logout in LogoutButton component
                console.log("user synced once this session", hasSynced);
                
            } catch (error) {
                console.error("user sync failed: ", error);
            }
        };

        // Prevents full component from running each page render - only checks sessionStorage on renders after login
        if (!hasSynced) {
            runSync();
        } else {
            console.log("User already synced");
        }

    }, [user, isLoading, isAuthenticated, getAccessTokenSilently]);
    
    return null;
};

export default AuthSync;
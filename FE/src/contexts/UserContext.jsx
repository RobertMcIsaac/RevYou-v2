import { createContext, useContext, useState, useEffect } from "react";
import { getUser } from "../services/userService";
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await getUser(token);
            if (response.status === 200) {
            setUser(response.data.user);
            } else {
            console.error("Failed to fetch user:", response.message);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        }
        }
    fetchUser();
  }, [getAccessTokenSilently]);


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
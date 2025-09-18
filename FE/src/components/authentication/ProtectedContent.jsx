import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import { use } from "react";

const ProtectedContent = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const token = await getAccessTokenSilently();
        console.log("Access Token:", token);

        const res = await fetch("http://localhost:5000/api/v1/private", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data = await res.json();
        setMessage(data.message);
      } catch (err) {
        console.error("Error fetching protected data:", err.message);
        setMessage("Failed to access protected content.");
      }
    };

    if (isAuthenticated) {
      fetchProtectedData();
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  return (
    <div>
      <h2>Protected API Response</h2>
      <p>{isAuthenticated ? message : "Please log in to view this content."}</p>
    </div>
  );
};

export default ProtectedContent;

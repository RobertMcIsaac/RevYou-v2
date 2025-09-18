import { useEffect, useState } from "react";
import { getShareableProfile } from "../../../services/ShareableProfileService";

export const useShareableProfile = (userId) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await getShareableProfile(userId);
        if (response.status === 200) {
          console.log("Fetched profile data:", response.data);
          setProfileData(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err.message || "Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  return { profileData, loading, error };
};

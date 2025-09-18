const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getShareableProfile = async (userId) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `${BACKEND_URL}/api/v1/shareable-profiles/${userId}`,
    requestOptions
  );
  if (!response.ok) {
    return { status: response.status, message: "Network response was not ok" };
  }
  const data = await response.json();
  return {
    status: response.status,
    data: data,
  };
};

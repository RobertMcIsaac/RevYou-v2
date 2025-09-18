const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const createFeedbackRequest = async (token) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
    };
    const response = await fetch(`${BACKEND_URL}/api/v1/feedbacks`, requestOptions);
    if (!response.ok) {
        return { status: response.status, message: 'Network response was not ok' };
    }
    const data = await response.json();
    return {
        status: response.status,
        data: data,
    };
}
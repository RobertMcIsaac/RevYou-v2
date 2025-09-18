const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Sync user
export const syncUser = async (token, user) => {
    const payload = {
        user: user
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    };
    const response = await fetch(`${BACKEND_URL}/api/v1/users/sync`, requestOptions);
    
    if (!response.ok) {
        throw new Error("Failed to sync user profile")
    }
    const data = await response.json();
    return {
        status: response.status,
        data: data,
    };
};

// Get User
export const getUser = async (token) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await fetch(`${BACKEND_URL}/api/v1/users/me`, requestOptions);

    if (!response.ok) {
        throw new Error("Failed to fetch user profile");
    }

    const data = await response.json();
    return {
        status: response.status,
        data: data,
    };
};

export const patchUserProfile = async (token, updates) => {
    
    const payload = {
        updates: updates
    };

    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    };

    const response = await fetch(`${BACKEND_URL}/api/v1/users/me/update-profile`, requestOptions);

    if (!response.ok) {
        throw new Error("Failed to update user profile");
    }

    const data = await response.json();
    return {
        status: response.status,
        data: data,
    };
};
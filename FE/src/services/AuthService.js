// Stub service to simulate login functionality.
// TODO: Remove or replace with the actual Auth0 login logic.

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const login = async (email, password) => {
    email = 'john@doe.com';
    password = 'password!1';
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    };
    const response = await fetch(`${BACKEND_URL}/api/v1/auth/login`, requestOptions);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (data.error) {
        throw new Error(data.error);
    }
    return data;
}
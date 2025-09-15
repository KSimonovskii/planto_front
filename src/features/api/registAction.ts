import type { AuthResponseData } from "../../utils/types";
export const registerUser = async (dataUser: {
    login: string,
    firstname?: string,
    lastname?: string,
    email: string,
    password: string
}): Promise<AuthResponseData> => {
    const URL = `${import.meta.env.VITE_BASE_URL}/account/register`;
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
             body: JSON.stringify(dataUser),
    });

    if (!response.ok) {
        let errorMessage = response.statusText;
        try {
            const errorData = await response.json();
            if (errorData.message) {
                errorMessage = errorData.message;
            } else if (errorData.error) {
                errorMessage = errorData.error;
            }
        } catch (e) {
            console.error("Failed to parse error response from registration:", e);
        }
        throw new Error(`Registration failed: ${errorMessage} (Status: ${response.status})`);
    }

    const data: AuthResponseData = await response.json();
    const accessToken = data.accessToken;
    const jwtExpirationMs = data.jwtExpirationMs;

    if (!accessToken) {
        throw new Error("Access token missing in response from server after registration.");
    }

    return { accessToken, jwtExpirationMs };
};
import {BASE_URL} from "../../utils/constants.ts";
import type {AuthResponseData} from "../../utils/types";

export const loginUser = async (credentials:
                                    { login: string, password: string }):
    Promise<AuthResponseData> => {
    const URL = `${BASE_URL}/auth/login`;
    const options: RequestInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials)
    };

    const response = await fetch(URL, options);

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
            console.error("Failed to parse error response from login:", e);
        }
        throw new Error(`Login failed: ${errorMessage} (Status: ${response.status})`);
    }

    const data:AuthResponseData = await response.json();
    const accessToken = data.accessToken;
    const jwtExpirationMs = data.jwtExpirationMs;

    if (!accessToken) {
        throw new Error("Access token missing in response from server.");
    }

    return {accessToken, jwtExpirationMs};
};
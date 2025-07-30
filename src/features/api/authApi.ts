import {BASE_URL} from "../../utils/constants.ts";

export const refreshToken = async (): Promise<string | null> => {
    try {
        const response = await fetch(`${BASE_URL}/auth/refresh`, {
            method: "POST",
            credentials: "include",
        });

        if (!response.ok) {
            console.warn("Failed to refresh token:", response.status, await response.text());
            return null;
        }

        const data = await response.json();
        const newAccessToken = data.accessToken;

        if (!newAccessToken) {
            console.warn("Refresh token response missing new access token.");
            return null;
        }

        return newAccessToken;
    } catch (e) {
        console.error("Error during refresh token request:", e);
        return null;
    }
};
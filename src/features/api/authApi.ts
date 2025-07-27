import { BASE_URL } from "../../utils/constants.ts";
import type { AuthResponseData } from "../../utils/types"; // ИСПРАВЛЕНО: Опечатка

export const refreshToken = async (): Promise<string | null> => {
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
    });

    if (response.ok) {
        const data: AuthResponseData = await response.json();
        console.log("authApi: Data from refreshToken -> ", data);
        return data.accessToken;
    } else {
        console.warn("authApi: Refresh token request failed with status:", response.status);
        try {
            const errorBody = await response.json();
            console.error("authApi: Refresh token error details:", errorBody);
        } catch (e) {
            console.error("authApi: Could not parse refresh token error response:", e);
        }
        return null;
    }
};
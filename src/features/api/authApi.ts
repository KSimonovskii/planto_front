import {BASE_URL} from "../../utils/constants.ts";


export const refreshToken = async () => {
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
    });

    if (!response.ok) {
        const data = await response.json();
        return data.token;
    } else {
        console.warn("Refresh token request failed");
        return null;
    }
};
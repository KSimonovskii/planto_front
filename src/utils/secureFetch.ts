import {refreshToken} from "../features/api/authApi.ts";

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

export const secureFetch = async (
    input: RequestInfo,
    options: RequestInit = {},
    getToken: () => string | null,
    setToken: (token: string | null) => void
) => {
    const accessToken = getToken();

    const headers = new Headers(options.headers);
    if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
    }


    let response = await fetch(input, {
        ...options,
        headers,
        credentials: "include",
    });

    if (response.status === 401) {
        console.log("secureFetch: Received 401, attempting to refresh token...");

        if (!isRefreshing) {
            isRefreshing = true;
            refreshPromise = refreshToken().finally(() => {
                isRefreshing = false;
            });
        }


        const newAccessToken = await refreshPromise;

        if (newAccessToken) {
            console.log("secureFetch: Token refreshed successfully, retrying original request.");
            setToken(newAccessToken);

            const retryHeaders = new Headers(options.headers);
            retryHeaders.set("Authorization", `Bearer ${newAccessToken}`);

            response = await fetch(input, {
                ...options,
                headers: retryHeaders,
                credentials: "include",
            });
        } else {
            console.warn("secureFetch: Failed to refresh token, user might need to re-login.");
            setToken(null);
            throw new Error("Authentication failed: Could not refresh token.");
        }
    }

    return response;
};

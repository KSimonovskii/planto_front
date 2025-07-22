import { refreshToken } from "../features/api/authApi.ts";

export const secureFetch = async (
    input: RequestInfo,
    options: RequestInit = {},
    getToken: () => string | null,
    setToken: (token: string | null) => void
) => {
    let accessToken = getToken();

    const headers = new Headers(options.headers);
    if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
    }
    headers.set("Content-Type", "application/json");

    let response = await fetch(input, {
        ...options,
        headers,
        credentials: "include",
    });

    if (response.status === 401) {
        const newAccessToken = await refreshToken();

        if (newAccessToken) {
            setToken(newAccessToken);

            const retryHeaders = new Headers(options.headers);
            retryHeaders.set("Authorization", `Bearer ${newAccessToken}`);
            retryHeaders.set("Content-Type", "application/json");

            response = await fetch(input, {
                ...options,
                headers: retryHeaders,
                credentials: "include",
            });
        }
    }

    return response;
};

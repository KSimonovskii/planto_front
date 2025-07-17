import {refreshToken} from "../features/api/authApi.ts";

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
    headers.set("Content-Type", "application/json");

    const response = await fetch(input, {
        ...options,
        headers: headers,
        credentials: "include"
    });

    if (response.status === 401) {
        const newToken = await refreshToken();
        if (newToken) {
            setToken(newToken);

            const retryResponse = await fetch(input, {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${newToken}`,
                    "Content-Type": "application/json",
                },
                credentials: 'include',
            });

            return retryResponse;
        }
    }
    return response;
}
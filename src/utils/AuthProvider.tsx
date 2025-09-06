import {type ReactNode, useCallback, useEffect, useMemo, useState} from "react";
import {AuthContext} from "./AuthContext";
import {refreshToken} from "../features/api/authApi.ts";

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [accessToken, setAccessTokenState] = useState<string | null>(null);
    const [accessTokenLoaded, setAccessTokenLoaded] = useState(false);

    const setAccessToken = useCallback((newToken: string | null) => {
        setAccessTokenState(newToken);
    }, []);

    const getToken = useCallback(() => accessToken, [accessToken]);

    const logout = useCallback(async () => {
        try {
            await fetch(`${import.meta.env.VITE_BASE_URL}/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
        } catch (e) {
            console.error("Logout failed: ", e);
        }

        setAccessTokenState(null);
        setAccessTokenLoaded(false);
        setAccessTokenLoaded(true);

    }, [setAccessToken]);

    useEffect(() => {
        const restoreAccessToken = async () => {
            try {
                const newAccessToken = await refreshToken();
                if (newAccessToken) {
                    setAccessToken(newAccessToken);
                    console.log("AuthContext: Access token restored on app load.");
                } else {
                    console.warn("AuthContext: Could not refresh token on app load: No new token received. User is not authenticated.");
                    setAccessToken(null);
                }
            } catch (error) {
                console.warn("Could not refresh token on app load: ", error);
                setAccessToken(null);
            }
            setAccessTokenLoaded(true)
        };

        restoreAccessToken();
    }, [setAccessToken]);

    const contextValue = useMemo(() => ({
        accessToken,
        setAccessToken,
        logout,
        getToken,
        accessTokenLoaded
    }), [accessToken, setAccessToken, logout, getToken, accessTokenLoaded]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

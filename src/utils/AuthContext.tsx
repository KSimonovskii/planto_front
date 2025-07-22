import {createContext, type ReactNode, useState} from "react";
import {BASE_URL} from "./constants.ts";
import type {AuthContextType} from "./types";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [accessToken, setAccessTokenState] = useState<string | null>(null);

    const setAccessToken = (newToken: string | null) => {
        setAccessTokenState(newToken);
    };

    const logout = async () => {
        try {
            await fetch(`${BASE_URL}/auth/logout`, {
                method: "POST",
                credentials: "include"
            });
        } catch (e) {
            console.error("Logout failed: ", e);
        } finally {
            setAccessToken(null);
        }
    };

    // useEffect(() => {
    //     const restoreAccessToken = async () => {
    //         try {
    //             const newAccessToken = await refreshToken();
    //             if (newAccessToken) {
    //                 setAccessToken(newAccessToken);
    //             }
    //         } catch (error) {
    //             console.warn("Could not refresh token on app load: ", error);
    //             setAccessToken(null);
    //         }
    //     };
    //
    //     restoreAccessToken();
    // }, []);

    return (
        <AuthContext.Provider value={{accessToken, setAccessToken, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

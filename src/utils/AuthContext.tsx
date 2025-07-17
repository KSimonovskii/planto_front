import type {ReactNode} from "react";
import {createContext, useState} from "react";
import {BASE_URL} from "./constants.ts";
import type {AuthContextType} from "./types";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [token, setTokenState] = useState<string | null>(null);

    const setToken = (newToken: string | null) => {
        setTokenState(newToken);
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
            setToken(null);
        }
    };

    return (
        <AuthContext.Provider value={{token, setToken, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

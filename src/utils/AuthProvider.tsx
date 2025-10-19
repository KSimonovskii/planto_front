import {type ReactNode, useCallback, useEffect, useMemo} from "react";
import {AuthContext} from "./AuthContext";
import {refreshToken} from "../features/api/authApi.ts";
import {useAppDispatch} from "../app/hooks.ts";
import {changeAccessToken} from "../features/slices/userAuthSlice.ts";

export const AuthProvider = ({children}: { children: ReactNode }) => {

    const dispatch = useAppDispatch();

    const logout =  useCallback(async () => {
        try {
            await fetch(`${import.meta.env.VITE_BASE_URL}/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
        } catch (e) {
            console.error("Logout failed: ", e);
        }

        dispatch(changeAccessToken({token: ""}))
    }, [dispatch]);

    useEffect(() => {
        const restoreAccessToken = async () => {

            let newToken = "";
            try {
                const newAccessToken = await refreshToken();
                if (newAccessToken) {
                    newToken = newAccessToken;
                    console.log(`AuthContext: Access token restored on app load.`);
                } else {
                    console.warn("AuthContext: Could not refresh token on app load: No new token received. User is not authenticated.");
                }
            } catch (error) {
                console.warn("Could not refresh token on app load: ", error);
            }
            dispatch(changeAccessToken({token: newToken}));
        };

        restoreAccessToken();
    }, [dispatch]);

    const contextValue = useMemo(() => ({
        logout,
    }), [logout]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

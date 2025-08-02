import {useUserActions} from "./useUserAction.ts";
import {useCallback, useEffect, useState} from "react";
import {parseJwt} from "../../utils/parseJwt.ts";
import {useAuth} from "./useAuth.ts";
import type {UserInterfaceAccount} from "../../utils/types";

export function useCurrentUser() {
    const {accessToken, accessTokenLoaded} = useAuth();
    const {getUserByLogin} = useUserActions();
    const [user, setUser] = useState<UserInterfaceAccount | null>(null);
    const [loadingUser, setLoadingUser] = useState<boolean>(true);
    const [errorUser, setErrorUser] = useState<string | null>(null);

    const fetchUser = useCallback(async () => {
        setLoadingUser(true);
        setErrorUser(null);

        if (!accessTokenLoaded) {
            return;
        }

        if (!accessToken) {
            setUser(null);
            setLoadingUser(false);
            setErrorUser("Access token missing and token loading not in progress");
            return;
        }

        try {
            const decoded = parseJwt(accessToken);
            const login = decoded.sub;
            const userAccount = await getUserByLogin(login);
            setUser(userAccount);
            setErrorUser(null);
        } catch (e: any) {
            console.error("useCurrentUser: Failed to load user data:", e);
            setUser(null);
            setErrorUser(e.message || "Failed to load user data.");
        } finally {
            setLoadingUser(false);
        }
    }, [accessToken, accessTokenLoaded]);


    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const refetchUser = useCallback(() => {
        fetchUser();
    }, [fetchUser]);

    const isAdmin = user?.roles?.includes("ADMINISTRATOR") ?? false;
    const isUser = user?.roles?.includes("USER") ?? false;
    const isAuthenticated = !!user;

    return {
        user,
        isAdmin,
        isUser,
        loadingUser,
        errorUser,
        isAuthenticated,
        refetchUser
    };
}
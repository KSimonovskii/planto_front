
import {useUserActions} from "./useUserAction.ts";
import {useCallback, useEffect, useState} from "react";
import type UserAccount from "../../components/pages/users/UserAccount.ts";
import {parseJwt} from "../../utils/parseJwt.ts";
import {useAuth} from "./useAuth.ts";

export function useCurrentUser() {
const {accessToken, accessTokenLoaded} = useAuth();
    const {getUserByLogin} = useUserActions();
    const [user, setUser] = useState<UserAccount | null>(null);
    const [loadingUser, setLoadingUser] = useState<boolean>(true);
    const [errorUser, setErrorUser] = useState<string | null>(null);

    const fetchUser = useCallback(async () => {
        setLoadingUser(true);
        setErrorUser(null);

        if (!accessToken) {
            setUser(null);
            setLoadingUser(false);
            console.log("useCurrentUser: No access token found, user data not loaded.");
            return;
        }

        try {
            const decoded = parseJwt(accessToken);
            const login = decoded.sub;
            console.log("useCurrentUser: Attempting to fetch user data for login:", login);
            const userAccount = await getUserByLogin(login);
            setUser(userAccount);
            setErrorUser(null);
            console.log("useCurrentUser: User data loaded successfully.");

        } catch (e: any) {
            console.error("useCurrentUser: Failed to load user data:", e);
            setUser(null);
            setErrorUser(e.message || "Failed to load user data.");
        } finally {
            setLoadingUser(false);
        }
      }, [getUserByLogin, accessToken]);


    useEffect(() => {
        if (accessToken) {
        fetchUser();
        }
    }, [accessToken, accessTokenLoaded]);

    const refetchUser = useCallback(() => {
        fetchUser();
    }, [fetchUser]);

    const isAdmin = user?.role?.includes("ADMINISTRATOR") ?? false;
    const isUser = user?.role?.includes("USER") ?? false;
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
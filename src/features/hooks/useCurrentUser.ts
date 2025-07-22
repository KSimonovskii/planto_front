import {useAuth} from "./useAuth.ts";
import {useUserActions} from "./useUserAction.ts";
import {useEffect, useState} from "react";
import type UserAccount from "../../components/pages/users/UserAccount.ts";
import {parseJwt} from "../../utils/parseJwt.ts";

export function useCurrentUser() {
    const {accessToken} = useAuth();
    const {getUserByLogin} = useUserActions();
    const [user, setUser] = useState<UserAccount | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const isAdmin = user?.role?.includes("ADMINISTRATOR") ?? false;
    const isUser = user?.role?.includes("USER") ?? false;

    useEffect(() => {
        const fetchUser = async () => {
            if (!accessToken) {
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const decoded = parseJwt(accessToken);
                const login = decoded.sub;

                //todo delete
                console.log("LOGIN in useCurrentUser --> ", login);

                const userAccount = await getUserByLogin(login);

                //todo delete
                console.log("UserAccount in useCurrentUser --> ", userAccount);

                setUser(userAccount);
            } catch (e) {

                //todo delete
                console.log("TOKEN in useCurrentUser in catch --> ", accessToken);

                console.error("Failed to load user:", e);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [accessToken]);

    return {
        user,
        isAdmin,
        isUser,
        loading,
        isAuthenticated: !!user
    };
}

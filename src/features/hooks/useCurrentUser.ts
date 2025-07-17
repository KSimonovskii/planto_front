import {useAuth} from "./useAuth.ts";
import {useUserActions} from "./useUserAction.ts";
import {useEffect, useState} from "react";
import type UserAccount from "../../components/pages/users/UserAccount.ts";
import {parseJwt} from "../../utils/parseJwt.ts";

export function useCurrentUser() {
    const {token} = useAuth();
    const {getUserByLogin} = useUserActions();
    const [user, setUser] = useState<UserAccount | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const isAdmin = user?.role?.includes("ADMINISTRATOR") ?? false;
    const isUser = user?.role?.includes("USER") ?? false;

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const decoded = parseJwt(token);
                const login = decoded.sub;
                const userAccount = await getUserByLogin(login);
                setUser(userAccount);
            } catch (e) {
                console.error("Failed to load user:", e);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [token]);

    return {
        user,
        isAdmin,
        isUser,
        loading,
        isAuthenticated: !!user
    };
}

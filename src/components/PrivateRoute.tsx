import {Navigate} from "react-router";
import {useCurrentUser} from "../features/hooks/useCurrentUser.ts";
import type {JSX} from "react";

export const PrivateRoute = ({children}: { children: JSX.Element }) => {
    const {isAuthenticated, loadingUser} = useCurrentUser();

    if (loadingUser) return null; //todo some spinner

    return isAuthenticated ? children : <Navigate to="login" replace/>
}

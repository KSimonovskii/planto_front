import {type JSX} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useCurrentUser} from "../features/hooks/useCurrentUser.ts";
import {useAppSelector} from "../app/hooks.ts";
import SpinnerFlower from "../assets/SpinnerFlower.tsx";


interface Props {
    children: JSX.Element
}

const RequireAuth = ({children}: Props) => {
    const {accessToken, accessTokenLoaded} = useAppSelector(state => state.userAuthSlice);
    const {loadingUser, isAuthenticated} = useCurrentUser();
    const location = useLocation();

    if (!accessTokenLoaded || loadingUser) {
        return (
            <SpinnerFlower/>
        )
    }

    if (!isAuthenticated && !accessToken) {
        return <Navigate to="/auth/login" state={{from: location}} replace/>
    }


    return children;
}

export default RequireAuth;
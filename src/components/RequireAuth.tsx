import {type JSX} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useCurrentUser} from "../features/hooks/useCurrentUser.ts";
import spinner from "../assets/spinner2.png";
import {useAppSelector} from "../app/hooks.ts";


interface Props {
    children: JSX.Element
}

const RequireAuth = ({children}: Props) => {
    const {accessToken, accessTokenLoaded} = useAppSelector(state => state.userAuthSlice);
    const {loadingUser, isAuthenticated} = useCurrentUser();
    const location = useLocation();

    if (!accessTokenLoaded || loadingUser) {
        return (
            <div className="flex justify-center items-center w-full h-64">
                <img src={spinner} alt="loading..." className="spinner-icon"/>
            </div>
        )
    }

    if (!isAuthenticated && !accessToken) {
        return <Navigate to="/auth/login" state={{from: location}} replace/>
    }


    return children;
}

export default RequireAuth;
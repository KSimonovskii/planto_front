import {type JSX} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useCurrentUser} from "../features/hooks/useCurrentUser.ts";
import {useAuth} from "../features/hooks/useAuth.ts";
import spinner from "../assets/spinner2.png";


interface Props {
    children: JSX.Element
}

const RequireAuthAdministrator = ({children}: Props) => {
    const {accessToken, accessTokenLoaded} = useAuth();
    const {loadingUser, isAdmin} = useCurrentUser();
    const location = useLocation();

    if (!accessTokenLoaded || loadingUser) {
        return (
            <div className="flex justify-center items-center w-full h-64">
                <img src={spinner} alt="loading..." className="spinner-icon"/>
            </div>
        )
    }

    if (!isAdmin && !accessToken) {
        return <Navigate to="/auth/login" state={{from: location}} replace/>
    }


    return children;
}

export default RequireAuthAdministrator;
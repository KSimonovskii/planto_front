import {type JSX} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useCurrentUser} from "../features/hooks/useCurrentUser.ts";
import {useAuth} from "../features/hooks/useAuth.ts";


interface Props {
    children: JSX.Element
}

const RequireAuthAdministrator = ({children}: Props) => {
    const {accessToken, accessTokenLoaded} = useAuth();
    const {loadingUser, isAdmin} = useCurrentUser();
    const location = useLocation();

    if (!accessTokenLoaded || loadingUser) {
        return <div className="text-center mt-40">
            Loading .... Pam-Pam-Spinner
        </div>
    }

    if (!isAdmin && !accessToken) {
        return <Navigate to="/auth/login" state={{from: location}} replace/>
    }


    return children;
}

export default RequireAuthAdministrator;
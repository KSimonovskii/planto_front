import {type JSX} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useCurrentUser} from "../features/hooks/useCurrentUser.ts";
import {useAuth} from "../features/hooks/useAuth.ts";


interface Props {
    children: JSX.Element
}

const RequireAuth = ({children}: Props) => {
    const {accessToken} = useAuth();
    const {loadingUser, isAuthenticated} = useCurrentUser();
    const location = useLocation();


    if (!accessToken && !isAuthenticated) {
        return <Navigate to="/auth/login" state={{from: location}} replace/>
    }

    if (!accessToken && loadingUser) {
        return <div className="text-center mt-40">
            Loading .... Pam-Pam-Spinner
        </div>
    }

    return children;
}

export default RequireAuth;
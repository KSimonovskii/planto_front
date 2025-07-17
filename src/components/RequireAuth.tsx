import type {JSX} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useAuth} from "../features/hooks/useAuth.ts";


interface Props {
    children: JSX.Element
}

const RequireAuth = ({children}: Props) => {
    const {token} = useAuth();

    const location = useLocation();

    if (!token) {
        return <Navigate to="/auth/login" state={{from: location}} replace/>
    }

    return children
}

export default RequireAuth;
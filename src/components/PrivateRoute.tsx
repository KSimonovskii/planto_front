import {Navigate} from "react-router";
import AccountDashboard from "./AccountDashboard.tsx";

const PrivateRoute = ({children}: {children: JSX.Element}) => {
    const isAuthenticated = localStorage.getItem('jwt') !== null;
    return isAuthenticated ? children : <Navigate to={AccountDashboard}/>
}
export default PrivateRoute;
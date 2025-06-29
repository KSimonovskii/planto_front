import {Navigate} from "react-router";

const PrivateRoute = ({children}: { children: JSX.Element }) => {
    const isAuthenticated = localStorage.getItem('jwt') !== null;
    return isAuthenticated ? children : <Navigate to={"/accountDashboard"}/>
}
export default PrivateRoute;
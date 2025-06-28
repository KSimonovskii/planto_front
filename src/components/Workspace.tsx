import {Route, Routes} from "react-router";
import {navItems} from "../utils/constants.ts";
import Home from "./Home.tsx";
import ProductsManager from "./ProductsManager.tsx";
import ErrorPage from "./ErrorPage.tsx";
import PersonalAccount from "./PersonalAccount.tsx";
import AccountDashboard from "./AccountDashboard.tsx";
import AccountRegister from "./AccountRegister.tsx";

const Workspace = () => {

    return (
        <Routes>
            {['/', navItems[0].path, `${navItems[0].path}/`].map(path =>
                <Route key={path} path={path} element={<Home/>}/>)}
            {['/', navItems[1].path, `${navItems[1].path}/`].map(path =>
                <Route key={path} path={path} element={<ProductsManager/>}/>)}
            {[navItems[2].path, `${navItems[2].path}/login`].map(path =>
                <Route key={path} path={path} element={<PersonalAccount/>}/>)}
            {['accountDashboard'].map(path =>
                <Route key={path} path={path} element={<AccountDashboard/>}/>)}
            {['account/register'].map(path =>
                <Route key={path} path={path} element={<AccountRegister/>}/>)}
            <Route path={'*'} element={<ErrorPage/>}/>
        </Routes>
    )
}

export default Workspace
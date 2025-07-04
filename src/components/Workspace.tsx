import {Route, Routes} from "react-router";
import {navItems} from "../utils/constants.ts";
import Home from "./pages/home/Home.tsx";
import ProductsManager from "./pages/products/ProductsManager.tsx";
import ErrorPage from "./ErrorPage.tsx";
import PersonalAccount from "./pages/personalAccount/PersonalAccount.tsx";
import AccountDashboard from "./pages/personalAccount/AccountDashboard.tsx";
import AccountRegister from "./pages/personalAccount/AccountRegister.tsx";
import ShoppingCart from "./pages/shoppingCart/ShoppingCart.tsx";
import Store from "./pages/store/Store.tsx";
import RequireAuth from "./RequireAuth.tsx";


const Workspace = () => {

    return (
        <Routes>
            {['/', navItems[0].path, `${navItems[0].path}/`].map(path =>
                <Route key={path} path={path} element={<Home/>}/>)}
            {['/', navItems[2].path, `${navItems[2].path}/`].map(path =>
                <Route key={path} path={path} element={<ProductsManager/>}/>)}
            {[navItems[4].path, `${navItems[4].path}/login`].map(path =>
                <Route key={path} path={path} element={<PersonalAccount/>}/>)}
            {['accountDashboard'].map(path =>
                <Route key={path} path={path} element={<AccountDashboard/>}/>)}
            {['account/register'].map(path =>
                <Route key={path} path={path} element={<AccountRegister/>}/>)}
            {[navItems[3].path].map(path =>
                <Route key={path} path={path} element={
                    <RequireAuth>
                        <ShoppingCart/>
                    </RequireAuth>
                }/>)}
            {[navItems[5].path].map(path =>
                <Route key={path} path={path} element={<Store/>}/>)}
            <Route path={'*'} element={<ErrorPage/>}/>
        </Routes>
    )
}

export default Workspace
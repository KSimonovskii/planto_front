import {Route, Routes} from "react-router-dom";
import {navItems} from "../utils/constants.ts";

import Home2 from "./pages/home/Home2.tsx";
import ProductsManager from "./pages/products/ProductsManager.tsx";
import ErrorPage from "./ErrorPage.tsx";
import PersonalAccount from "./pages/personalAccount/PersonalAccount.tsx";
import AccountDashboard from "./pages/personalAccount/AccountDashboard.tsx";
import AccountRegister from "./pages/personalAccount/AccountRegister.tsx";
import ShoppingCart from "./pages/shoppingCart/ShoppingCart.tsx";
import Store from "./pages/store/Store.tsx";
import RequireAuth from "./RequireAuth.tsx";
import AboutUs from "./pages/aboutUs/AboutUs.tsx";
import RequireAuthAdministrator from "./RequireAuthAdministrator.tsx";
import AdminDashboard from "./pages/forAdministrator/AdminDashboard.tsx";
import MainLayout from "./pages/home/MainLayout.tsx";

const Workspace = () => {
    return (

        <Routes>

            <Route element={<MainLayout/>}>

                <Route path="/" element={<Home2/>}/>
                <Route path={navItems[0].path} element={<Home2/>}/>
                <Route path={`${navItems[0].path}/`} element={<Home2/>}/>

                <Route path={navItems[1].path} element={<AboutUs/>}/>

                <Route
                    path={navItems[2].path}
                    element={
                        <RequireAuth>
                            <ShoppingCart/>
                        </RequireAuth>
                    }
                />

                <Route
                    path={navItems[3].path}
                    element={
                        <RequireAuth>
                            <AccountDashboard/>
                        </RequireAuth>
                    }
                />

                <Route path={navItems[4].path} element={<Store/>}/>
                <Route path="auth/login" element={<PersonalAccount/>}/>
                <Route path="account/register" element={<AccountRegister/>}/>

            </Route>

            <Route
                path="products"
                element={
                    <RequireAuthAdministrator>
                        <ProductsManager/>
                    </RequireAuthAdministrator>
                }
            />

            <Route
                path={navItems[5].path}
                element={
                    <RequireAuthAdministrator>
                        <AdminDashboard/>
                    </RequireAuthAdministrator>
                }
            />

            <Route path="*" element={<ErrorPage msg="Page not found"/>}/>
        </Routes>
    );
};

export default Workspace;

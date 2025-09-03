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
import AboutUs from "./pages/aboutUs/AboutUs.tsx";
import RequireAuthAdministrator from "./RequireAuthAdministrator.tsx";
import AdminDashboard from "./pages/forAdministrator/AdminDashboard.tsx";

import {useState} from "react";
import {PageContext} from "../utils/context.ts";
import type {PageProductsData} from "../utils/types";
import OrdersManager from "./orders/OrdersManager.tsx";

const Workspace = () => {

    const [pageData, setPage] = useState<PageProductsData>({pageNumber: 1, sort: DEFAULT_SORT_PRODUCT, filters: []});

    return (
        <PageContext.Provider value={{pageNumber: pageData.pageNumber, sort: pageData.sort, filters: pageData.filters, setPage: setPage}}>
        <Routes>

            {[`auth/login`].map(path =>
                <Route key={path} path={path} element={<PersonalAccount/>}/>)}

            {[`account/register`].map(path =>
                <Route key={path} path={path} element={<AccountRegister/>}/>)}

            {[`products`].map(path =>
                <Route key={path} path={path} element={
                    <RequireAuthAdministrator>
                        <ProductsManager/>
                    </RequireAuthAdministrator>
                }/>)}

            {[navItems[5].path].map(path =>
                <Route key={path} path={path} element={
                    <RequireAuthAdministrator>
                        <AdminDashboard/>
                    </RequireAuthAdministrator>
                }/>)}

            {['/', navItems[0].path].map(path =>
                <Route key={path} path={path} element={<Home/>}/>)}

            {[navItems[2].path].map(path =>
                <Route key={path} path={path} element={
                    <RequireAuth>
                        <ShoppingCart/>
                    </RequireAuth>
                }/>)}

            {[navItems[3].path].map(path =>
                <Route key={path} path={path} element={
                    <RequireAuth>
                        <AccountDashboard/>
                    </RequireAuth>
                }/>)}

            {[navItems[4].path].map(path =>
                <Route key={path} path={path} element={<Store/>}/>)}

            {[navItems[1].path].map(path =>
                <Route key={path} path={path} element={<AboutUs/>}/>)}


            <Route path={'*'} element={<ErrorPage msg={"Page not found"}/>}/>
        </Routes>
        </PageContext.Provider>
    )
}

export default Workspace
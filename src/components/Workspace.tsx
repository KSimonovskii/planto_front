import {DEFAULT_SORT_PRODUCT, navItems} from "../utils/constants.ts";
import ProductsManager from "./pages/forAdministrator/products/ProductsManager.tsx";
import {Route, Routes, Navigate} from "react-router-dom";

import Home2 from "./pages/home/Home2.tsx";
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
import {PageProductContext} from "../utils/context.ts";
import type {PageTableData} from "../utils/types";
import MainLayout from "./pages/home/MainLayout.tsx";

const Workspace = () => {

    const [pageData, setPage] = useState<PageTableData>({pageNumber: 1, sort: DEFAULT_SORT_PRODUCT, filters: []});

    return (
        <Routes>
            <Route element={<MainLayout/>}>

                <Route path="/" element={<Home2/>}/>
                <Route path="/main" element={<Home2/>}/>
                <Route path="/main/*" element={<Home2/>}/>

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

            <PageProductContext.Provider value={{...pageData , setPage}}>
                <Route
                    path="products"
                    element={
                        <RequireAuthAdministrator>
                            <ProductsManager/>
                        </RequireAuthAdministrator>
                    }
                />
            </PageProductContext.Provider>

            <Route
                path={navItems[5].path}
                element={
                    <RequireAuthAdministrator>
                        <AdminDashboard/>
                    </RequireAuthAdministrator>
                }
            />

            <Route path="/main" element={<Navigate to="/" replace/>}/>

            <Route path="*" element={<ErrorPage msg="Page not found"/>}/>
        </Routes>
    );
};

export default Workspace;

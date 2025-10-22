import {DEFAULT_SORT_PRODUCT, navItems} from "../utils/constants.ts";
import ProductsManager2 from "./pages/forAdministrator/products/ProductsManager2.tsx";
import {Navigate, Route, Routes} from "react-router-dom";

import Home2 from "./pages/home/Home2.tsx";
import ErrorPage from "./ErrorPage.tsx";
import PersonalAccount from "./pages/personalAccount/PersonalAccount.tsx";
import AccountDashboard from "./pages/personalAccount/AccountDashboard.tsx";
import AccountRegister from "./pages/personalAccount/AccountRegister.tsx";
import ShoppingCart from "./pages/shoppingCart/ShoppingCart.tsx";
import RequireAuth from "./RequireAuth.tsx";
import RequireAuthAdministrator from "./RequireAuthAdministrator.tsx";
import AdminDashboard from "./pages/forAdministrator/AdminDashboard.tsx";

import {useState} from "react";
import {PageProductContext} from "../utils/context.ts";
import type {PageTableData} from "../utils/types";
import MainLayout from "./pages/home/MainLayout.tsx";
import UsersManager from "./pages/users/UsersManager.tsx";
import {OrdersProvider} from "./pages/orders/OrderProvider.tsx";
import Store from "./pages/store/Store.tsx";
import OurRoots from "./pages/home/aboutUs/OurRoots.tsx";

import {Rebuilding} from "./pages/home/aboutUs/Rebuilding.tsx";
import October7 from "./pages/home/aboutUs/October7.tsx";
import ProductPage from "./pages/store/ProductPage.tsx";

const Workspace = () => {

    const [pageData, setPage] = useState<PageTableData>({pageNumber: 1, sort: DEFAULT_SORT_PRODUCT, filters: []});

    return (
        <PageProductContext.Provider value={{...pageData, setPage}}>

            <Routes>
                <Route element={<MainLayout/>}>
                    <Route path="/" element={<Home2/>}/>
                    <Route path="/main" element={<Home2/>}/>
                    <Route path="/main/*" element={<Home2/>}/>
                    <Route path="/our-roots" element={<OurRoots/>} />
                    <Route path="/october-7" element={<October7/>} />
                    <Route path="/rebuilding-now" element={<Rebuilding/>} />
                    <Route path={navItems[2].path} element={<ShoppingCart/>}/>

                    <Route
                        path={navItems[3].path}
                        element={
                            <RequireAuth>
                                <AccountDashboard/>
                            </RequireAuth>
                        }
                    />

                    <Route path={`${navItems[4].path}/*`} element={<Store/>}/>
                    <Route path={"/product/:id"} element={<ProductPage/>}/>
                    <Route path="auth/login" element={<PersonalAccount/>}/>
                    <Route path="account/register" element={<AccountRegister/>}/>

                    <Route
                        path="products"
                        element={
                            <RequireAuthAdministrator>
                                <ProductsManager2/>
                            </RequireAuthAdministrator>
                        }
                    />

                    <Route
                        path={navItems[6].path}
                        element={
                            <RequireAuthAdministrator>
                                <AdminDashboard/>
                            </RequireAuthAdministrator>
                        }
                    />
                    <Route
                        path={navItems[7].path}
                        element={
                            <RequireAuthAdministrator>
                                <OrdersProvider>
                                    <UsersManager/>
                                </OrdersProvider>
                            </RequireAuthAdministrator>
                        }
                    />

                </Route>

                <Route path="/main" element={<Navigate to="/" replace/>}/>
                <Route path="*" element={<ErrorPage msg="Page not found"/>}/>

            </Routes>
        </PageProductContext.Provider>

    );
};

export default Workspace;

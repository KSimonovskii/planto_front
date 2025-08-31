import {Route, Routes} from "react-router";
import {DEFAULT_SORT_PRODUCT, navItems} from "../utils/constants.ts";
import Home from "./Home.tsx";
import ProductsManager from "./products/ProductsManager.tsx";
import ErrorPage from "./ErrorPage.tsx";
import {useState} from "react";
import {PageContext} from "../utils/context.ts";
import type {PageProductsData} from "../utils/types";
import OrdersManager from "./orders/OrdersManager.tsx";

const Workspace = () => {

    const [pageData, setPage] = useState<PageProductsData>({pageNumber: 1, sort: DEFAULT_SORT_PRODUCT, filters: []});

    return (
        <PageContext.Provider value={{pageNumber: pageData.pageNumber, sort: pageData.sort, filters: pageData.filters, setPage: setPage}}>
        <Routes>
            {['/', navItems[0].path, `${navItems[0].path}/`].map(path =>
                <Route key={path} path={path} element={<Home/>}/>)}
            {['/', navItems[1].path, `${navItems[1].path}/:pageNumber`].map(path =>
                <Route key={path} path={path} element={<ProductsManager/>}/>)}
            {['/', navItems[2].path, `${navItems[2].path}/:pageNumber`].map(path =>
                <Route key={path} path={path} element={<OrdersManager/>}/>)}
            <Route path={'*'} element={<ErrorPage msg={"Page not found"}/>}/>
        </Routes>
        </PageContext.Provider>
    )
}

export default Workspace
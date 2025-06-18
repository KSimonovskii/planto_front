import {Route, Routes} from "react-router";
import {navItems} from "../utils/constants.ts";
import Home from "./Home.tsx";
import ProductsManager from "./ProductsManager.tsx";
import ErrorPage from "./ErrorPage.tsx";
import UsersManager from "./UsersManager.tsx";

const Workspace = () => {

    return (
        <Routes>
            {['/', navItems[0].path, `${navItems[0].path}/`].map(path =>
                <Route key={path} path={path} element={<Home/>}/>)}
            {['/', navItems[1].path, `${navItems[1].path}/`].map(path =>
                <Route key={path} path={path} element={<ProductsManager/>}/>)}
            {[navItems[2].path, `${navItems[2].path}/`].map(path =>
                <Route key={path} path={path} element={<UsersManager/>}/>)}
           <Route path={'*'} element={<ErrorPage/>}/>
        </Routes>
    )
}

export default Workspace
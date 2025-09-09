import {NavLink} from "react-router";
import {getProductsTable} from "../../../features/api/productAction.ts";
import {useContext} from "react";
import {PageContext, ProductsContext} from "../../../utils/Context.ts";


const PageNavigation = () => {

    const {pages, setProductsData} = useContext(ProductsContext);
    const {pageNumber, sort, filters, setPage} = useContext(PageContext);

    const getArrayOfPages = (countPages: number)  => {
        return Array.from({length: countPages}, (_, i) => i + 1);
    }

    const handleChangePage = async (page: number) => {
        setPage((prevState) => ({...prevState, pageNumber: page}));
        setProductsData(await getProductsTable(page, sort, filters));
    }

    const getNewPage = (direction: number) => {
        let newPage = pageNumber + direction;
        newPage = Math.max(1, newPage);
        newPage = Math.min(pages, newPage);
        return newPage;
    }

    return (
        <nav className={"flex justify-center space-x-3"}>
            <NavLink className={"text-base-form"} onClick={() => handleChangePage(1)} key={"first"}
                     to={`/products/1`}>{"<<"}</NavLink>
            <NavLink className={"text-base-form"} onClick={() => handleChangePage(getNewPage(-1))} key={"previous"}
                     to={`/products/${getNewPage(-1)}`}>{"<"}</NavLink>
            {getArrayOfPages(pages).map(page => <NavLink
                className={`text-base-form ${page === pageNumber ? "font-bold underline" : ""}`}
                onClick={() => handleChangePage(page)} key={page}
                to={`/products/${page}`}>
                {page}
            </NavLink>)}
            <NavLink className={"text-base-form"} onClick={() => handleChangePage(getNewPage(1))} key={"next"}
                     to={`/products/${getNewPage(1)}`}>{">"}</NavLink>
            <NavLink className={"text-base-form"} onClick={() => handleChangePage(pages)} key={"last"}
                     to={`/products/${pages}`}>{">>"}</NavLink>
        </nav>
    )
}

export default PageNavigation;
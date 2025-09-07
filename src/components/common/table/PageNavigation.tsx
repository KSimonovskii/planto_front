import {NavLink} from "react-router";
import {useContext} from "react";
import {PageProductContext, ProductsContext} from "../../../utils/context.ts";
import {navItems} from "../../../utils/constants.ts";

const PageNavigation = () => {

    const {pages} = useContext(ProductsContext);
    const {pageNumber, setPage} = useContext(PageProductContext);

    const getArrayOfPages = (countPages: number)  => {
        return Array.from({length: countPages}, (_, i) => i + 1);
    }

    const handleChangePage = async (page: number) => {
        setPage((prevState) => ({...prevState, pageNumber: page}));
    }

    const getNewPage = (direction: number) => {
        let newPage = pageNumber + direction;
        newPage = Math.max(1, newPage);
        newPage = Math.min(pages, newPage);
        return newPage;
    }

    const path = navItems[4]; //'products';

    return (
        <nav className={"flex justify-center space-x-3"}>
            <NavLink className={"text-base-form"} onClick={() => handleChangePage(1)} key={"first"}
                     to={`/${path}/1`}>{"<<"}</NavLink>
            <NavLink className={"text-base-form"} onClick={() => handleChangePage(getNewPage(-1))} key={"previous"}
                     to={`/${path}/${getNewPage(-1)}`}>{"<"}</NavLink>
            {getArrayOfPages(pages).map(page => <NavLink
                className={`text-base-form ${page === pageNumber ? "font-bold underline" : ""}`}
                onClick={() => handleChangePage(page)} key={page}
                to={`/${path}/${page}`}>
                {page}
            </NavLink>)}
            <NavLink className={"text-base-form"} onClick={() => handleChangePage(getNewPage(1))} key={"next"}
                     to={`/${path}/${getNewPage(1)}`}>{">"}</NavLink>
            <NavLink className={"text-base-form"} onClick={() => handleChangePage(pages)} key={"last"}
                     to={`/${path}/${pages}`}>{">>"}</NavLink>
        </nav>
    )
}

export default PageNavigation;
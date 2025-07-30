
import {SearchBar} from "../../filters/SearchBar.tsx";
import {Filters} from "../../filters/Filters.tsx";

import {ProductsContext} from "../../../utils/Context.ts";
import Sorting from "../products/Sorting.tsx";
import {useContext, useState} from "react";
import ViewMode from "../products/ViewMode.tsx";
import ProductsCards from "../products/card/ProductsCards.tsx";
import ProductsTable from "../products/ProductsTable.tsx";
import PageNavigation from "../products/PageNavigation.tsx";


const ProductsView = () => {

    const {products} = useContext(ProductsContext);
    const [viewAsCards, setView] = useState(false);

    return (

        <div className={"flex-col items-center"}>
            <h1 className={"flex justify-center text-[24px] mt-5 mb-3"}>List of products</h1>
            <div className={"flex justify-between items-center mr-8 space-x-4"}>
                <SearchBar/>
                <Sorting/>
                <ViewMode viewAsCards={viewAsCards} setView={setView}/>
            </div>
            <Filters/>
            {viewAsCards? <ProductsCards/> : <ProductsTable/>}
            {products.length? <PageNavigation/> : <></>}
        </div>
    )
}

export default ProductsView
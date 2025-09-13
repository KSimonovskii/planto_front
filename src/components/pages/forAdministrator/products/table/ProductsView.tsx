import {useContext, useState} from "react";
import {ProductsContext} from "../../../../../utils/context.ts";
import {SearchBar} from "../../../../filters/SearchBar.tsx";
import {FiltersAdmin} from "../../../../filters/Filters.admin.tsx";
import ProductsTable from "./ProductsTable.tsx";
import ProductsCards from "../card/ProductsCards.tsx";
import PageNavigation from "../../../../common/table/PageNavigation.tsx";
import ViewMode from "./ViewMode.tsx";
import Sorting from "../../../../common/table/Sorting.tsx";
import {dataTypes} from "../../../../../utils/enums/dataTypes.ts";

const ProductsView = () => {

    const {table} = useContext(ProductsContext);
    const [viewAsCards, setView] = useState(false);

   return (

       <div className={"flex-col items-center"}>
           <h1 className={"flex justify-center text-[24px] mt-5 mb-3"}>List of products</h1>
           <div className={"flex justify-between items-center mr-8 space-x-4 mb-2.5"}>
               <SearchBar/>
               <Sorting dataType={dataTypes.products}/>
               <ViewMode viewAsCards={viewAsCards} setView={setView}/>
           </div>
           <FiltersAdmin/>
           {viewAsCards? <ProductsCards/> : <ProductsTable/>}
           {table.length? <PageNavigation/> : <></>}
       </div>
   )
}

export default ProductsView
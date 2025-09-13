import {useContext, useState} from "react";
import {SearchBar} from "../../filters/SearchBar.tsx";
import {FiltersAdmin} from "../../filters/Filters.admin.tsx";
import ProductsTable from "./ProductsTable.tsx";
import PageNavigation from "./PageNavigation.tsx";
import ViewMode from "./ViewMode.tsx";
import Sorting from "./Sorting.tsx";
import {ProductsContext} from "../../../utils/Context.ts";
import ProductsCards from "./card/ProductsCards.tsx";

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
           <FiltersAdmin/>
           {viewAsCards? <ProductsCards/> : <ProductsTable/>}
           {products.length? <PageNavigation/> : <></>}
       </div>
   )
}

export default ProductsView
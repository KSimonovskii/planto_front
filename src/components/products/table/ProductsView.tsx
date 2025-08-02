import {useContext, useState} from "react";
import {ProductsContext} from "../../../utils/context.ts";
import {SearchBar} from "../../filters/SearchBar.tsx";
import {Filters} from "../../filters/Filters.tsx";
import ProductsTable from "./ProductsTable.tsx";
import ProductsCards from "../card/ProductsCards.tsx";
import PageNavigation from "./PageNavigation.tsx";
import ViewMode from "./ViewMode.tsx";
import Sorting from "./Sorting.tsx";

const ProductsView = () => {

    const {products} = useContext(ProductsContext);
    const [viewAsCards, setView] = useState(false);

   return (

       <div className={"flex-col items-center"}>
           <h1 className={"flex justify-center text-[24px] mt-5 mb-3"}>List of products</h1>
           <div className={"flex justify-between items-center mr-8 space-x-4 mb-2.5"}>
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
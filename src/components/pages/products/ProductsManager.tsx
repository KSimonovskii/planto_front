import {useCallback, useContext, useEffect} from "react";
import AddProduct from "./AddProduct.tsx";
import ProductsView from "./ProductsView.tsx";
import {PageContext, ProductsContext} from "../../../utils/Context.ts";
import {getProductsTable} from "../../../features/api/productAction.ts";

const ProductsManager = () => {
    const {setProductsData} = useContext(ProductsContext)!;
    const {pageNumber, sort, filters} = useContext(PageContext)!;

    const fetchProducts = useCallback(async () => {
        try {
            const result = await getProductsTable(pageNumber, sort, filters);
            setProductsData(result);
        } catch (error) {
            console.error("Error fetching products", error)
        }
    }, [pageNumber, sort, filters, setProductsData]);


    useEffect(() => {
        fetchProducts()
    }, [fetchProducts]);

    return (
        <div className={"col-span-6"}>
                <AddProduct/>
                <ProductsView/>
        </div>

    )
}

export default ProductsManager
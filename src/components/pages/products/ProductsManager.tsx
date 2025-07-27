import {useEffect, useState} from "react";
import Product from "./Product.ts";
import {ProductsContext} from "../../../utils/Context.ts";
import AddProduct from "./AddProduct.tsx";
import ProductsTable from "./ProductsTable.tsx";
import {getProductsTable} from "../../../features/api/productAction.ts";

const ProductsManager = () => {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {

        const getProducts = async () => {
            try{
                const result = await getProductsTable();
                setProducts(result)
            } catch (error) {
                console.error(error);
            }
        }

        getProducts();
    }, [])

    return (
        <div className={"col-span-6, pt-24"}>
            <ProductsContext.Provider value={{products, setProducts}}>
                <AddProduct/>
                <ProductsTable/>
            </ProductsContext.Provider>
        </div>
    )
}

export default ProductsManager
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import AddProduct from "./AddProduct.tsx";
import ProductsView from "./ProductsView.tsx";
import {PageContext, ProductsContext} from "../../../utils/Context.ts";
import type {DataTableProducts} from "../../../utils/types";
import {getProductsTable} from "../../../features/api/productAction.ts";

const ProductsManager = () => {

    const [productsData, setProductsData] = useState<DataTableProducts>({products: [], pages: 0});
    const {pageNumber, sort, filters} = useContext(PageContext);
    const navigate = useNavigate();

    useEffect(() => {

        const getProducts = async () => {
            try {
                const result = await getProductsTable(pageNumber, sort, filters);
                setProductsData(result);
            } catch (error) {
                console.error(error)
                //navigate('/error', {state: {message: `Can't receive data from database by reason ${error}`}});
            }
        }

        getProducts().catch(console.error);

    }, [pageNumber, sort, filters, navigate])

    return (
        <div className={"col-span-6"}>
            <ProductsContext.Provider value={{
                products: productsData.products,
                pages: productsData.pages,
                setProductsData: setProductsData
            }}>
                    <AddProduct/>
                    <ProductsView/>
            </ProductsContext.Provider>
        </div>

    )
}

export default ProductsManager
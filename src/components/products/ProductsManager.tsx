import {useContext, useMemo} from "react";
import {getBodyForQueryGetProducts} from "../../features/api/productAction.ts";
import {PageContext, ProductsContext} from "../../utils/context.ts";
import AddProduct from "../AddProduct.tsx";
import ProductsView from "./table/ProductsView.tsx";
import {useGetProductsTableRTKQuery} from "../../features/api/productApi.ts";
import Product from "../../features/classes/Product.ts";

const ProductsManager = () => {

    const {pageNumber, sort, filters} = useContext(PageContext);

    const {data = {products: [], pages: 0}, isLoading, isError, error} = useGetProductsTableRTKQuery(getBodyForQueryGetProducts(pageNumber, sort, filters));

    const products = useMemo(() => {
            return data.products.map((p: Product) => new Product(p.id, p.name, p.category, p.quantity, p.price, p.imageUrl, p.description));
        },
        [data.products]
    )

    if (isLoading) return <h2>Loading....</h2>
    if (isError) {
        let errorMsg = "";
        if ('status' in error) {
            errorMsg = `Error: ${error.status} - ${error.data}`;
        } else {
            errorMsg = "Unknown error";
        }
        return <h2>{errorMsg}</h2>
    }

    return (
        <div className={"col-span-6"}>
            <ProductsContext.Provider value={{
                products: products,
                pages: data.pages,
                setProductsData: () => {},
            }}>
                    <AddProduct/>
                    <ProductsView/>
            </ProductsContext.Provider>
        </div>

    )
}

export default ProductsManager
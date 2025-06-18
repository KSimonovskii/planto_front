import RowProductsTable from "./RowProductsTable.tsx";
import {useContext} from "react";
import {ProductsContext} from "../utils/Context.ts";

const ProductsTable = () => {

    const {products} = useContext(ProductsContext);

    return (

        <table className={"text-light-green"}>
            <caption>List of products</caption>
            <thead className={"border-y-2 border-base-text-color"}>
            {/*    TODO change to fields from class Product*/}
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => <RowProductsTable key={product.id} product={product}/>)}
            </tbody>
        </table>
    )
}

export default ProductsTable
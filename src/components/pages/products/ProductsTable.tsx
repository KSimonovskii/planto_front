import {useContext} from "react";

import RowProductsTable from "./RowProductsTable.tsx";
import EmptyRowTable from "./EmptyRowTable.tsx";
import {ProductsContext} from "../../../utils/Context.ts";

const ProductsTable = () => {

    const {products} = useContext(ProductsContext);

    return (
        <table className={"text-base-form gap-4"}>
            <thead className={"border-y-2 border-base-text"}>
            {/*    TODO change to fields from class Product*/}
            <tr>
                <th className={"pl-2"}>Image</th>
                <th className={"pl-2"}>Name</th>
                <th className={"pl-2"}>Category</th>
                <th className={"pl-2"}>Quantity</th>
                <th className={"pl-2"}>Price</th>
                <th className={"pl-2"}>Description</th>
                <th className={"pl-2"}></th>
            </tr>
            </thead>
            <tbody>
                {products.length == 0?
                    <EmptyRowTable msg={"Can't receive data from database"}/> :
                    products.map(product => <RowProductsTable key={product.id} product={product}/>)}
            </tbody>
        </table>
    )

}

export default ProductsTable
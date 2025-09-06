import {useContext} from "react";
import {ProductsContext} from "../../../../../utils/context.ts";
import RowProductsTable from "./RowProductsTable.tsx";
import EmptyRowTable from "../../../../common/table/EmptyRowTable.tsx";

const TABLE_HEAD = [
    "Image",
    "Name",
    "Category",
    "Quantity",
    "Price",
    "Description",
    "Action"
]

const ProductsTable = () => {

    const {table} = useContext(ProductsContext);

    return (
        <table className={"text-base-form gap-4"}>
            <thead className={"border-y-2 border-base-text"}>
            <tr>
                {TABLE_HEAD.map((head) => (
                    <th key={head} className={"pl-2"}>
                        {head}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {table.length == 0 ?
                <EmptyRowTable msg={"Can't receive data from database"}/> :
                table.map(product => <RowProductsTable key={product.id} product={product}/>)}
            </tbody>
        </table>
    )

}

export default ProductsTable
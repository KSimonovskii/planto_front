import {useContext} from "react";
import {ProductsContext} from "../../../../../utils/context.ts";
import RowProductsTable from "./RowProductsTable.tsx";
import EmptyRowTable from "../../../../common/table/EmptyRowTable.tsx";

const TABLE_HEAD = [
    "Image",
    "Name",
    "Quantity",
    "Price",
    "Description",
    "Action"
]

const ProductsTable = () => {

    const {table} = useContext(ProductsContext);

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    {TABLE_HEAD.map((head) => (
                        <th key={head} className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                            {head}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {table.length === 0 ?
                    <EmptyRowTable msg={"Can't receive data from database"} /> :
                    table.map((product, index) => <RowProductsTable key={product.id} product={product} isOdd={index % 2 !== 0}/>)}
                </tbody>
            </table>
        </div>
    )

}

export default ProductsTable

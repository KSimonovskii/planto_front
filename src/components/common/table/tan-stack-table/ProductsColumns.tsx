import {createColumnHelper} from "@tanstack/react-table";
import Product from "../../../../features/classes/Product.ts";
import ImageForRowTable from "./ImageForRowTable.tsx";
import {SquarePen, Trash2} from "lucide-react";


function ProductsColumns() {

    const columnHelper = createColumnHelper<Product>();

    return [
        columnHelper.accessor("imageUrl", {
            header: "Image",
            cell: (props) => <ImageForRowTable product={props.row.original}/>,
            size: 113
        }),
        columnHelper.accessor("name", {
            id: "name",
            header: "Name",
            size: 155
        }),
        columnHelper.accessor("quantity", {
            id: "quantity",
            header: "Quantity",
            size: 113
        }),
        columnHelper.accessor("price", {
            id: "price",
            header: "Price",
            size: 84
        }),
        columnHelper.accessor("description",
            {
                id: "description",
                header: "Description",
                cell: (props) => <textarea
                    id={`description_${props.row.id}`}
                    className={"w-full overscroll-y-auto"}
                    rows={3}
                    value={props.getValue()}/>,
                size: 677
            }),
        columnHelper.display({
            header: "actions",
            id: "actions",
            cell: () => (<div className={"flex justify-start items-center space-x-2"}>
                <SquarePen
                    // onClick={() => editProduct(product.id)}
                    className="w-5 h-5 text-gray-500 hover:text-lime-600 transition cursor-pointer"
                />
                <Trash2
                    // onClick={() => handleRemoveProduct(product.id)}
                    className="w-5 h-5 text-gray-500 hover:text-red-600 transition cursor-pointer"
                /></div>),
            size: 97
        })
    ]
}

export default ProductsColumns;
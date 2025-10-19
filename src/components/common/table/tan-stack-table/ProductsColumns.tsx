import {createColumnHelper, type Row} from "@tanstack/react-table";
import Product from "../../../../features/classes/Product.ts";
import ImageForRowTable from "./ImageForRowTable.tsx";
import {SquareCheckBig, SquarePen, SquareX, Trash2} from "lucide-react";
import InputTableField from "./InputTableField.tsx";
import type {ProductDataForTable} from "../../../../utils/types";
import {type RefObject} from "react";

interface PropsEditRow {
    editRowIndex: number,
    accessToken: string,
    refFocusField: RefObject<HTMLInputElement | null>
    setEditRowIndex: (index: number) => void,
    updateProduct: (raw: ProductDataForTable) => void,
    handleCancelDataChanges: (idProduct: string) => void,
    handleRemoveProduct: (idProduct: string) => void
}

const ProductsColumns = ({
                             editRowIndex,
                             refFocusField,
                             setEditRowIndex,
                             updateProduct,
                             handleCancelDataChanges,
                             handleRemoveProduct
                         }: PropsEditRow) => {

    const columnHelper = createColumnHelper<Product>();

    const fieldString = {
        type: "text"
    }

    const fieldIntNumber = {
        type: "number",
        minValue: 0
    }

    const fieldFlNumber = {
        type: "number",
        step: "0.01",
        min: 0
    }

    const saveChanges = async (rowData: Row<Product>) => {

        const {id, imageUrl, name, category, quantity, price, description} = rowData.original;

        let newImageUrl = imageUrl;
        // if (imageFile && imageFile.size != 0) {
        //     newImageUrl = await uploadFile(imageFile, name, accessToken);
        // }

        const raw = {
            id: id,
            name: name,
            category: category,
            quantity: quantity,
            price: price,
            imageUrl: newImageUrl,
            description: description
        };
        updateProduct(raw);
        setEditRowIndex(-1);
    }

    return [
        columnHelper.accessor("imageUrl", {
            header: "Image",
            cell: (props) =>
                <ImageForRowTable
                    product={props.row.original}
                    isEditMode={props.row.index === editRowIndex}/>,
            size: 113
        }),
        columnHelper.accessor("name", {
            id: "name",
            header: "Name",
            cell: (props) =>
                <InputTableField
                    id={props.column.id}
                    field={{...fieldString, disabled: props.row.index != editRowIndex}}
                    row = {props.row}
                    table = {props.table}
                    refFocusField = {props.row.index === editRowIndex? refFocusField: undefined}/>,
            size: 200
        }),
        columnHelper.accessor("quantity", {
            id: "quantity",
            header: "Quantity",
            cell: (props) =>
                <InputTableField
                    id={props.column.id}
                    field={{...fieldIntNumber, disabled: props.row.index != editRowIndex}}
                    row = {props.row}
                    table = {props.table}/>,
            size: 115
        }),
        columnHelper.accessor("price", {
            id: "price",
            header: "Price",
            cell: (props) =>
                <InputTableField
                    id={props.column.id}
                    field={{...fieldFlNumber, disabled: props.row.index != editRowIndex}}
                    row = {props.row}
                    table = {props.table}/>,
            size: 115
        }),
        columnHelper.accessor("description",
            {
                id: "description",
                header: "Description",
                cell: (props) =>
                    <InputTableField
                        id={props.column.id}
                        field={{...fieldString, disabled: props.row.index != editRowIndex}}
                        row = {props.row}
                        table = {props.table}/>,
                size: 550
            }),
        columnHelper.display({
            header: "actions",
            id: "actions",
            cell: (props) => (
                <div className={"flex justify-start items-center space-x-2"}>
                    <SquarePen
                        onClick={() => setEditRowIndex(props.row.index)}
                        className={`w-5 h-5 text-gray-500 hover:text-lime-600 transition cursor-pointer ${props.row.index === editRowIndex ? 'hidden' : `visible`}`}
                    />
                    <Trash2
                        onClick={() => handleRemoveProduct(props.row.original.id)}
                        className={`w-5 h-5 text-gray-500 hover:text-red-600 transition cursor-pointer ${props.row.index === editRowIndex ? 'hidden' : `visible`}`}
                    />
                    <SquareCheckBig
                        onClick={() => saveChanges(props.row)}
                        className={`w-5 h-5 text-green-500 hover:text-green-600 transition cursor-pointer ${props.row.index != editRowIndex ? 'hidden' : `visible`}`}
                    />
                    <SquareX
                        onClick={() => handleCancelDataChanges(props.row.original.id)}
                        className={`w-5 h-5 text-red-500 hover:text-red-600 transition cursor-pointer ${props.row.index != editRowIndex ? 'hidden' : `visible`}`}
                    />
                </div>),
            size: 97
        })
    ]
}

export default ProductsColumns;
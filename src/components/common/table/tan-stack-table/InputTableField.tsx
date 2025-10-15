import {useInputProduct} from "../../../pages/forAdministrator/products/hooks/useInputProduct.tsx";
import type Product from "../../../../features/classes/Product.ts";
import {Input} from "@headlessui/react"
import type {Row, Table} from "@tanstack/react-table";

type ProductProperties = {
    name: string,
    category: string,
    quantity: number,
    price: number,
    description: string,
}

interface FieldProperties {
    type: string,
    disabled: boolean,
    step?: string,
    minValue?: number,
    maxValue?: number,
}

interface PropsTableInput {
    id: string,
    field: FieldProperties,
    row: Row<Product>,
    table: Table<Product>
}

const InputTableField = ({id, field, row, table}: PropsTableInput) => {

    const {type, disabled, step, minValue, maxValue} = field;
    const product = row.original;

    const {productData, handleInputProductData} = useInputProduct(product.getProductData());

    const handleChangeDataProduct = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        handleInputProductData(id, e.target.value);
    }

    const onBlur = () => {
        table.options.meta?.updateData(row.index, id, productData[id as keyof ProductProperties])
    }

    return (
        <>
            {id === "description" ?
                <textarea
                    disabled={disabled}
                    className={"inputFieldTable w-full overscroll-y-auto"}
                    value={productData[id]}
                    rows={3}
                    onChange={handleChangeDataProduct}
                    onBlur={onBlur}/> :
                <Input
                    disabled={disabled}
                    className={"inputFieldTable w-full"}
                    value={productData[id as keyof ProductProperties]}
                    type={type}
                    step={step}
                    min={minValue}
                    max={maxValue}
                    onChange={handleChangeDataProduct}
                    onBlur={onBlur}
                />
            }
        </>

    );
};

export default InputTableField;
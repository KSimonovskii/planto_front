import {ProductsContext} from "../../../../../utils/context.ts";
import {useContext, useRef, useState} from "react";
import Product from "../../../../../features/classes/Product.ts";
import {SquareCheckBig, SquarePen, SquareX, Trash2} from "lucide-react";
import {EMPTY_PHOTO} from "../../../../../utils/constants.ts";
import ImagePopup from "../../../../common/ImagePopup.tsx";
import {useRemoveProductMutation, useUpdateProductMutation} from "../../../../../features/api/productApi.ts";
import {uploadFile} from "../../../../../features/api/imageAction.ts";
import {useInputProduct} from "../hooks/useInputProduct.tsx";
import {useAppSelector} from "../../../../../app/hooks.ts";

interface PropsProduct {
    product: Product,
    isOdd: boolean,
}

const RowProductsTable = ({product, isOdd}: PropsProduct) => {

    const {table} = useContext(ProductsContext);
    const [removeProduct] = useRemoveProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const {accessToken} = useAppSelector(state => state.userAuthSlice);

    const {
        productData,
        handleInputProductData,
        handleSelectFile,
        handleCancelDataChanges
    } = useInputProduct(product.getProductData())

    const {name, category, qty, price, description, imageUrl, imageFile} = productData;

    const [idEditProduct, setIdEditProduct] = useState("");
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const editProduct = (id: string) => {
        const index = table.findIndex((product) => product.id === id);
        if (index >= 0) {
            setIdEditProduct(id);
        }
    }

    const handleRemoveProduct = async (id: string) => {
        removeProduct(id);
    }

    const saveChanges = async (id: string) => {

        let newImageUrl = imageUrl;
        if (imageFile && imageFile.size != 0) {
            newImageUrl = await uploadFile(imageFile, name, accessToken);
        }

        const raw = {
            id: id,
            name: name,
            category: category,
            quantity: qty,
            price: price,
            imageUrl: newImageUrl,
            description: description
        };
        updateProduct(raw);

        setIdEditProduct("");
    }

    const cancelChanges = () => {
        handleCancelDataChanges();
        setIdEditProduct("");
    }

    const handlerClickImage = () => {
        if (idEditProduct === product.id) {
            inputFileRef.current!.click();
        } else {
            setIsOpen(true);
        }
    }

    const handleChangeDataProduct = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const fieldId = e.target.id;
        const fieldName = fieldId.slice(0, fieldId.indexOf(`_${idEditProduct}`));
        handleInputProductData(fieldName, e.target.value);
    }

    const fieldName = <input
        id={`name_${product.id}`}
        className={"inputFieldTable"}
        value={name}
        onChange={handleChangeDataProduct}/>
    const fieldQty = <input
        id={`qty_${product.id}`}
        className={"inputFieldTable w-34"}
        type={"number"}
        min={0}
        value={qty}
        onChange={handleChangeDataProduct}/>
    const fieldPrice = <input
        id={`price_${product.id}`}
        className={"inputFieldTable w-14"}
        type={"number"}
        step={"0.01"}
        min={0}
        value={price}
        onChange={handleChangeDataProduct}/>
    const fieldDescription = <textarea
        id={`description_${product.id}`}
        className={"inputFieldTable h-16 w-full mt-3 overscroll-y-auto"}
        rows={3}
        value={description}
        onChange={handleChangeDataProduct}/>

    const isEditing = idEditProduct === product.id;
    const rowClass = `
        group
        ${isOdd ? 'bg-gray-50' : 'bg-white'}
        ${isEditing ? 'bg-lime-100' : 'hover:bg-gray-100'}
        transition-colors duration-200 ease-in-out
    `;

    const cellClass = "px-6 py-4 whitespace-nowrap text-sm text-gray-500";
    const actionCellClass = "px-6 py-4 whitespace-nowrap text-right text-sm font-medium";

    return (
        <tr className={rowClass}>
            <td className={`${cellClass} w-20`}>
                <div
                    className={`w-16 h-16 rounded-full overflow-hidden mx-auto ${isEditing ? 'cursor-pointer' : 'cursor-zoom-in'}`}>
                    <img
                        src={imageUrl || EMPTY_PHOTO}
                        alt={product.name}
                        className="w-full h-full object-cover border border-gray-200"
                        onClick={handlerClickImage}
                    />
                </div>
                <ImagePopup name={product.name} url={imageUrl} isOpen={isOpen}
                            setIsOpen={setIsOpen}/>
                <input type="file" accept="image/*" hidden ref={inputFileRef} onChange={handleSelectFile}/>
            </td>
            <td className={`${cellClass} font-medium text-gray-900`}>
                {isEditing ? fieldName : name}
            </td>

            <td className={cellClass}>
                {isEditing ? fieldQty : qty}
            </td>
            <td className={cellClass}>
                {isEditing ? fieldPrice : price}
            </td>
            <td className={cellClass}>
                {isEditing ? fieldDescription : description}
            </td>
            <td className={actionCellClass}>
                <div className="flex justify-end items-center space-x-2">
                    {isEditing ? (
                        <>
                            <SquareCheckBig
                                onClick={() => saveChanges(product.id)}
                                className="w-5 h-5 text-green-500 hover:text-green-600 transition cursor-pointer"
                            />
                            <SquareX
                                onClick={cancelChanges}
                                className="w-5 h-5 text-red-500 hover:text-red-600 transition cursor-pointer"
                            />
                        </>
                    ) : (
                        <>
                            <SquarePen
                                onClick={() => editProduct(product.id)}
                                className="w-5 h-5 text-gray-500 hover:text-lime-600 transition cursor-pointer"
                            />
                            <Trash2
                                onClick={() => handleRemoveProduct(product.id)}
                                className="w-5 h-5 text-gray-500 hover:text-red-600 transition cursor-pointer"
                            />
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
}

export default RowProductsTable

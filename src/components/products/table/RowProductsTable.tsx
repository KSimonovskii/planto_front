import {ProductsContext} from "../../../utils/context.ts";
import {useContext, useRef, useState} from "react";
import Product from "../../../features/classes/Product.ts";
import {SquarePen, Trash2, SquareCheckBig, SquareX} from "lucide-react";
import {EMPTY_PHOTO} from "../../../utils/constants.ts";
import ImagePopup from "../ImagePopup.tsx";
import CategoryBox from "../CategoryBox.tsx";
import {useRemoveProductMutation, useUpdateProductMutation} from "../../../features/api/productApi.ts";
import {uploadFile} from "../../../features/api/imageAction.ts";
import {useInputProduct} from "../hooks/useInputProduct.tsx";

interface PropsProduct {
    product: Product,
}

const RowProductsTable = ({product}: PropsProduct) => {

    const {products} = useContext(ProductsContext);
    const [removeProduct] = useRemoveProductMutation();
    const [updateProduct] = useUpdateProductMutation();

    const {
        productData,
        handleInputProductData,
        handleInputCategory,
        handleSelectFile,
        handleCancelDataChanges
    } = useInputProduct(product.getProductData())

    const {name, category, qty, price, description, imageUrl, imageFile} = productData;

    const [idEditProduct, setIdEditProduct] = useState("");
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const editProduct = (id: string) => {
        const index = products.findIndex((product) => product.id === id);
        if (index >= 0){
            setIdEditProduct(id);
        }
    }

    const handleRemoveProduct = async (id: string) => {
        removeProduct(id);
    }

    const saveChanges = async (id: string) => {

        let newImageUrl = imageUrl;
        if (imageFile && imageFile.size != 0) {
            newImageUrl = await uploadFile(imageFile, name);
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
    const fieldCategory = <CategoryBox category={category} setCategory={handleInputCategory} twClass={"inputFieldTable"}/>;
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
    return (
        <tr className={"hover:bg-light-orange hover:text-alt-text"}>
             <th className={`w-20 h-20 align-top overflow-hidden ${idEditProduct == product.id ? 'cursor-pointer' : 'cursor-zoom-in' }`}><img
                                                          src={imageUrl ? imageUrl : EMPTY_PHOTO} alt={product.name}
                                                          className={"rounded-full border-base-form border-1 my-0.5"}
                                                          onClick={handlerClickImage}
                                                          style={{width: "100%", height: "100%", objectFit: "cover"}}/>
                 <ImagePopup name={product.name} category={product.category} url={imageUrl} isOpen = {isOpen} setIsOpen = {setIsOpen}/>
                 <input type={"file"} accept={"image/*"} hidden={true} ref={inputFileRef} onChange={handleSelectFile}/>
             </th>
            <th className={"pl-2 font-normal w-70"}>{idEditProduct == product.id ? fieldName : name}</th>
            <th className={"font-normal w-70"}>{idEditProduct == product.id ? fieldCategory : category}</th>
            <th className={"pl-2 w-40"}>{idEditProduct == product.id ? fieldQty : qty}</th>
            <th className={"pl-2 w-20"}>{idEditProduct == product.id ? fieldPrice : price}</th>
            <th className={"pl-2 font-normal w-70"}>{idEditProduct == product.id ? fieldDescription : description}</th>
            <th className={"pl-2 text-color-base-text"}>
                <div className={"flex flex-row justify-start space-x-1"}>
                    <SquarePen onClick={() => editProduct(product.id)} className={`${idEditProduct == product.id ? 'hidden' : ''} cursor-pointer`}/>
                    <Trash2 onClick={() => handleRemoveProduct(product.id)} className={`${idEditProduct == product.id ? 'hidden' : ''} cursor-pointer`}/>
                    <SquareCheckBig onClick={() => saveChanges(product.id)} className={`${idEditProduct == product.id ? '' : 'hidden'} cursor-pointer`}/>
                    <SquareX onClick={() => cancelChanges()} className={`${idEditProduct == product.id ? '' : 'hidden'} cursor-pointer`}/>
                </div>
            </th>

        </tr>
    )
}

export default RowProductsTable
import {EMPTY_PHOTO} from "../../../../utils/constants.ts";
import ImagePopup from "../../ImagePopup.tsx";
import {useRef, useState} from "react";
import {useInputProduct} from "../../../pages/forAdministrator/products/hooks/useInputProduct.tsx";
import type Product from "../../../../features/classes/Product.ts";

interface PropsImage {
    product: Product,
    isEditMode: boolean
}

const ImageForRowTable = ({product, isEditMode} : PropsImage) => {

    const [isOpen, setIsOpen] = useState(false);
    const inputFileRef = useRef<HTMLInputElement>(null);

    const {handleSelectFile} = useInputProduct(product.getProductData());

    const handlerClickImage = () => {
        if (isEditMode) {
            inputFileRef.current!.click();
        } else {
            setIsOpen(true);
        }
    }

    return (
        <>
            <div
                className={`w-16 h-16 rounded-full overflow-hidden mx-auto ${isEditMode ? 'cursor-pointer' : 'cursor-zoom-in'}`}>
                <img
                    src={product.imageUrl || EMPTY_PHOTO}
                    alt={product.name}
                    className="w-full h-full object-cover border border-gray-200"
                    onClick={handlerClickImage}
                />
            </div>
            <ImagePopup
                name={product.name}
                url={product.imageUrl}
                isOpen={isOpen}
                setIsOpen={setIsOpen}/>
            <input type="file" accept="image/*" hidden ref={inputFileRef} onChange={handleSelectFile}/>
        </>
    )
};

export default ImageForRowTable;
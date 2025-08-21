import {useEffect, useState} from "react";
import {useAddProductMutation} from "../../../features/api/productApi.ts";
import {uploadFile} from "../../../features/api/imageAction.ts";
import type {ProductData} from "../../../utils/types";



const emptyData = {
    name: "",
    category: "",
    qty: 0,
    price: 0,
    description: "",
    imageUrl: "",
    imageFile: null
}

export const useInputProduct = (initialData: ProductData | null) => {

    if (initialData == null) {
        initialData = emptyData;
    }

    const [initialProductData] = useState(initialData);
    const [productData, setProductData] = useState(initialData);
    const [addProduct] = useAddProductMutation();
    const NUM_FIELDS = ["qty", "price"];
    const {imageFile} = productData;

    useEffect(() => {

        if (imageFile && imageFile.size != 0) {
            const fr = new FileReader();
            fr.readAsDataURL(imageFile);
            fr.onloadend = () => {
                if (fr.result != null){
                    setProductData(prevData => ({...prevData, imageUrl: (fr.result as string)}));
                }
            }
        }
    }, [imageFile])

    const handleInputProductData = (id: string, value : string | number) => {

        let valueField : string | number = value;
        if (NUM_FIELDS.indexOf(id) >= 0) {
           valueField = Number(value);
        }
        setProductData(prevData => ({...prevData, [id] : valueField}));
    }

    const handleInputCategory = (value: string) => {
        setProductData(prevData => ({...prevData, category: value}));
    }

    const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (!event.target.files
            || event.target.files.length === 0) {
            return;
        }

        const imageFile = event.target.files[0];
        setProductData(prevData => ({...prevData, imageFile: imageFile}));
    }

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();

        const {name, category, qty, price, imageFile, description} = productData;

        const imageUrl = imageFile? await uploadFile(imageFile, name.trim()) : "";

        const raw = JSON.stringify({
            name: name.trim(),
            category: category.trim(),
            quantity: qty,
            price: price,
            imageUrl: imageUrl,
            description: description.trim()
        });

        const res = await addProduct(raw).unwrap();

        if (res.error) {
            console.log(res.error);
        } else if (res){
           setProductData(emptyData);
        }
    }

    const handleCancelDataChanges = () => {
        setProductData(initialProductData);
    }

    return {
        productData,
        handleInputProductData,
        handleInputCategory,
        handleSelectFile,
        handleAddProduct,
        handleCancelDataChanges
    }
}

import {useEffect, useState} from "react";
import {useAddProductMutation} from "../../../../../features/api/productApi.ts";
import {uploadFile} from "../../../../../features/api/imageAction.ts";
import type {ProductData} from "../../../../../utils/types";
import {useAppSelector} from "../../../../../app/hooks.ts";

const emptyData = {
    id: Math.random().toString(12),
    name: "",
    category: "",
    quantity: 0,
    price: 0,
    description: "",
    imageUrl: "",
    imageFile: null
}

export const useInputProduct = (initialData: ProductData | null) => {

    if (initialData == null) {
        initialData = emptyData;
    }

    const { accessToken } = useAppSelector(state => state.userAuthSlice);
    const [productData, setProductData] = useState(initialData);
    const [addProduct] = useAddProductMutation();
    const NUM_FIELDS = ["quantity", "price"];
    const {imageFile} = productData;
    const productId = initialData.id;

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

    useEffect(() => {
        const cloneData = {...initialData};
        setProductData(cloneData)
    }, [productId])

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

        const {name, category, quantity, price, imageFile, description} = productData;

        const imageUrl = imageFile? await uploadFile(imageFile, name.trim(), accessToken) : "";

        const raw = {
            name: name.trim(),
            category: category.trim(),
            quantity,
            price,
            imageUrl,
            description: description.trim()
        };

        try {

            const res = await addProduct(raw).unwrap();

            if (res){
                setProductData(emptyData);
            }
        } catch (error) {
            console.error('Failed to add product:', error);
        }
    }

    return {
        productData,
        handleInputProductData,
        handleInputCategory,
        handleSelectFile,
        handleAddProduct
    }
}
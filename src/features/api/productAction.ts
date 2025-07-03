import Product from "../../components/pages/products/Product.ts";
import {uploadFile} from "./imageAction.ts";

export const getProductsTable = async () => {
    const URL = import.meta.env.VITE_BASE_PRODUCT_URL;
    if (!URL){
        throw new Error("URL not found in the settings!");
    }

    const options = {
        method: "GET",
    }

    const response = await fetch(URL, options);
    if (!response.ok){
        throw new Error(response.statusText);
    }

    const products: Product[] = [];

    const data = await response.json();
    data.map((p: Product) => products.push(new Product(p.id, p.name, p.category, p.quantity, p.price, p.imageUrl, p.description)));

    return products;

}

export const addProductToTable = async (product: Product, imageFile: Blob) => {

    const BASE_URL = import.meta.env.VITE_BASE_PRODUCT_URL;

    const imageUrl = imageFile? await uploadFile(imageFile, product.name) : "";
    if (!imageUrl) {
        return null;
    }

    const URL = `${BASE_URL}/create`;
    const raw = JSON.stringify({
        name: product.name,
        category: product.category,
        quantity: product.quantity,
        price: product.price,
        imageUrl: imageUrl,
        description: product.description
    });
    const headers = new Headers();
    headers.append("Content-type", "application/json");

    const options = {
        method: "POST",
        headers: headers,
        body: raw
    }

    const response = await fetch(URL, options);

    if (!response.ok){
        console.error(response.statusText);
        return;
    }

    const data = await response.json();
    if (data){
        return new Product(data.id, data.name, data.category, data.quantity,data.price);
    }

    return null;
}

export const removeProductFromTable = async (id: string) => {
    const BASE_URL = import.meta.env.VITE_BASE_PRODUCT_URL;
    const URL = `${BASE_URL}/${id}`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options = {
        method: "DELETE",
        headers: headers
    }

    const response = await fetch(URL, options);
    if (!response.ok){
        console.error(response.statusText);
        return;
    }

    return await response.json();

}

export const updateProduct = async (product: Product) => {
    const BASE_URL = import.meta.env.VITE_BASE_PRODUCT_URL;
    const URL = `${BASE_URL}/update/${product.id}`;

    const headers = new Headers();
    headers.append("Content-type", "application/json");

    const raw = JSON.stringify({
        name: product.name,
        category: product.category,
        quantity: product.quantity,
        price: product.price,
        description: product.description
    });

    const options = {
        method: "PUT",
        headers: headers,
        body: raw
    }

    const response = await fetch(URL, options);
    if (!response.ok){
        console.error(response.statusText);
        return null;
    }

    return await response.json();
}

export const getProductById = async (productId: string): Promise<Product> => {
    const BASE_URL = import.meta.env.VITE_BASE_PRODUCT_URL;
    const response = await fetch(`${BASE_URL}/${productId}`);
    if (!response.ok) throw new Error("Product not found");
    return await response.json();
};

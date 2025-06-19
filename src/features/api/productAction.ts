import Product from "../../components/Product.ts";
import {BASE_URL} from "../../utils/constants.ts";

export const getProductsTable = async () => {
    const URL = `${BASE_URL}/product`;
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
    data.map((p: Product) => products.push(new Product(p.id, p.name, p.category, p.quantity, p.price)));

    return products;

}

export const addProductToTable = async (product: Product) => {

    const URL = `${BASE_URL}/create`;
    const raw = JSON.stringify({
        name: product.name,
        category: product.category,
        quantity: product.quantity,
        price: product.price
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
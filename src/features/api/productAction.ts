import Product from "../classes/Product.ts";
import {uploadFile} from "./imageAction.ts";
import Sort from "../classes/Sort.ts";
import {DATA_FOR_FILTERS, SIZE_PAGE} from "../../utils/constants.ts";
import type Filter from "../classes/Filter.ts";

interface answerTable {
    content: [];
    page: {
        size: number,
        number: number,
        totalElements: number,
        totalPages: number
    }
}

interface DataForFilters {
    price: number,
    categories: [];
}

export const getProductsTable = async (page: number, sort?: Sort, filters?: Filter[]) => {

    const withFilters = filters && filters.length > 0;

    const URL = import.meta.env.VITE_BASE_PRODUCT_URL; //withFilters? import.meta.env.VITE_BASE_PRODUCT_URL : import.meta.env.VITE_PRODUCT_CRITERIA_URL;

    if (!URL){
        throw new Error("URL not found in the settings!");
    }

    if (sort == undefined) {
        sort = new Sort("NameAsc", "name", 1, "Name (from A to Z)");
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const criteria = [];
    if (withFilters) {
        for (let i = 0; i < filters.length; i++) {
            criteria.push(filters[i].getFilterDto());
        }
    }

   const raw = JSON.stringify({
        page: page - 1,
        size: SIZE_PAGE,
        field: sort.field,
        direction: sort.direction,
        criteria: criteria
    })

    const options = {
        method: "POST",
        headers: headers,
        body: raw
    }

    const response = await fetch(URL, options);
    if (!response.ok){
        throw new Error(response.statusText);
    }

    const products: Product[] = [];

    const data = await response.json() as answerTable;
    data.content.map((p: Product) => products.push(new Product(p.id, p.name, p.category, p.quantity, p.price, p.imageUrl, p.description)));

    await setDataForFilters();

    return {products: products, pages: data.page.totalPages};

}

export const addProductToTable = async (product: Product, imageFile: Blob) => {

    const BASE_URL = import.meta.env.VITE_BASE_PRODUCT_URL;

    const imageUrl = imageFile? await uploadFile(imageFile, product.name) : "";

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
        return new Product(data.id, data.name, data.category, data.quantity, data.price);
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

export const updateProduct = async (product: Product, imageFile: Blob) => {
    const BASE_URL = import.meta.env.VITE_BASE_PRODUCT_URL;
    const URL = `${BASE_URL}/update/${product.id}`;

    if (imageFile.size != 0) {
        product.imageUrl = await uploadFile(imageFile, product.name);
    }

    const headers = new Headers();
    headers.append("Content-type", "application/json");

    const raw = JSON.stringify({
        name: product.name,
        category: product.category,
        quantity: product.quantity,
        price: product.price,
        imageUrl: product.imageUrl,
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

export const getDataForFilters = async () => {

    const URL = `${import.meta.env.VITE_BASE_PRODUCT_URL}/filterdata`;
    const options = {
        method: "GET"
    }
    const response = await fetch(URL, options);

    if (!response.ok) {
        throw new Error(`Server returned answer: ${response.status}`);
    }

    const result = await response.json() as DataForFilters;
    return {price : result.price, categories: result.categories};
}

const setDataForFilters = async () => {
    const dataForFilters = await getDataForFilters();

    DATA_FOR_FILTERS.maxPrice = dataForFilters.price;
    DATA_FOR_FILTERS.categories = dataForFilters.categories;
}
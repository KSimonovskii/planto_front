import Product from "../classes/Product.ts";
import Sort from "../classes/Sort.ts";
import Filter from "../classes/Filter.ts";
import {SIZE_PAGE} from "../../utils/constants.ts";

interface answerTable {
    content: [];
    page: {
        size: number,
        number: number,
        totalElements: number,
        totalPages: number
    }
}

export const getProductById = async (productId: string): Promise<Product> => {
    const BASE_URL = `${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_BASE_PRODUCT_ENDPOINT}`;
    const response = await fetch(`${BASE_URL}/${productId}`);
    if (!response.ok) throw new Error("Product not found");
    return await response.json();
};

export const getProductsTable = async (page?: number, sort?: Sort, filters?: Filter[]) => {

    const withFilters = filters && filters.length > 0;

    const URL = `${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_BASE_PRODUCT_ENDPOINT}`;

    if (!URL){
        throw new Error("URL not found in the settings!");
    }

    if (sort == undefined) {
        sort = new Sort("NameAsc", "name", 1, "Name (from A to Z)");
    }

    const pageNumber = page ?? 1;

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const criteria = [];
    if (withFilters) {
        for (let i = 0; i < filters.length; i++) {
            criteria.push(filters[i].getFilterDto());
        }
    }

    const raw = JSON.stringify({
        page: pageNumber - 1,
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

    return {products: products, pages: data.page.totalPages};

}

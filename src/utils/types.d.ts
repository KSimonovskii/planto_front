import {directions} from "./enums/directions.ts";
import type Sort from "../features/classes/Sort.ts";

export interface Item {
    title: string
    path: string
    icon: React.ElementType
}

export interface DataTableProducts{
    products: Product[],
    pages: number
}

export interface PageProductsData{
    pageNumber: number;
    sort: Sort;
    filters: Filter[]
}

export interface ProductData {
    id?: string,
    name: string,
    category: string,
    qty: number,
    price: number,
    description: string,
    imageUrl: string,
    imageFile: File | null
}

export interface ProductDataForTable {
    imageUrl: string,
    name: string,
    category: string,
    qty: number,
    price: number,
    description: string,
}

export interface AnswerTable {
    content: [];
    page: {
        size: number,
        number: number,
        totalElements: number,
        totalPages: number
    }
}


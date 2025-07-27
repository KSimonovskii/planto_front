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


import React, {type Dispatch, type SetStateAction} from "react";
import Product from "../components/Product.ts";
import type {DataTableProducts, PageProductsData} from "./types";
import {DEFAULT_SORT} from "./constants.ts";
import type Sort from "../components/Sort.ts";
import type Filter from "../components/Filter.ts";

interface ContextData {
    products: Product[];
    pages: number;
    setProductsData: Dispatch<SetStateAction<DataTableProducts>>
}

interface PageContext {
    pageNumber: number;
    sort: Sort;
    filters: Filter[];
    setPage: Dispatch<SetStateAction<PageProductsData>>;
}

export const ProductsContext = React.createContext<ContextData>({products: [], pages: 0, setProductsData: () => {}});
export const PageContext = React.createContext<PageContext>({pageNumber: 1, sort: DEFAULT_SORT, filters: [], setPage: () => {}});
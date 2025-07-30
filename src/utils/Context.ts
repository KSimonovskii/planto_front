import React, {type Dispatch, type SetStateAction} from "react";

import type {DataTableProducts, PageProductsData} from "./types";
import type Product from "../components/clasess/Product.ts";
import type Sort from "../components/clasess/Sort.ts";
import type Filter from "../components/clasess/Filter.ts";

// import {DEFAULT_SORT} from "./constants.ts";

interface ProductContextType {
    products: Product[];
    pages: number;
    setProductsData: Dispatch<SetStateAction<DataTableProducts>>
}

export const ProductsContext =
    React.createContext<ProductContextType | undefined>(undefined);
// export const ProductsContext = React.createContext<ProductContextType | undefined>({products: [], pages: 0, setProductsData: () => {}});

interface PageContextType {
    pageNumber: number;
    sort: Sort;
    filters: Filter[];
    setPage: Dispatch<SetStateAction<PageProductsData>>;
}
export const PageContext = React.createContext<PageContextType | undefined>(undefined);

// export const PageContext = React.createContext<PageContextType | undefined>({pageNumber: 1, sort: DEFAULT_SORT, filters: [], setPage: () => {}});
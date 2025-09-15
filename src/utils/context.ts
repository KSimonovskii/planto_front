import React, {type Dispatch, type SetStateAction} from "react";
import {DEFAULT_SORT_PRODUCT} from "./constants.ts";
import type Sort from "../features/classes/Sort.ts";
import type Filter from "../features/classes/Filter.ts";
import type Product from "../features/classes/Product.ts";
import type Order from "../features/classes/Order.ts";
import type {DataTable, PageTableData} from "./types";

interface ContextData<T> {
    table: T[];
    pages: number;
    setTableData: Dispatch<SetStateAction<DataTable<T>>>
}

interface PageContext {
    pageNumber: number;
    sort: Sort;
    filters: Filter[];
    setPage: Dispatch<SetStateAction<PageTableData>>;
}

export const ProductsContext = React.createContext<ContextData<Product>>({table: [], pages: 0, setTableData: () => {}});
export const OrdersContext = React.createContext<ContextData<Order>>({table: [], pages: 0, setTableData: () => {}});

export const PageProductContext = React.createContext<PageContext>({pageNumber: 1, sort: DEFAULT_SORT_PRODUCT, filters: [], setPage: () => {}});


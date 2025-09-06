import {type Dispatch, type ReactNode, type SetStateAction, useMemo, useState} from "react";
import type {DataTable} from "../../utils/types";
import {ProductsContext} from "../../utils/context.ts";
import type Product from "../classes/Product.ts";


interface ProductsProviderProps {
    children: ReactNode;
}

export const ProductsProvider = ({ children }: ProductsProviderProps) => {
    const [table, setTableData] =
        useState<DataTable<Product>>({table: [], pages: 0});

    const contextProductValue = useMemo(() => ({
        table: table.table,
        pages: table.pages,
        setTableData: setTableData as Dispatch<SetStateAction<DataTable<Product>>>
    }), [table.table, table.pages, setTableData]);


    return(
        <ProductsContext.Provider value={contextProductValue}>
            {children}
        </ProductsContext.Provider>
    );
};
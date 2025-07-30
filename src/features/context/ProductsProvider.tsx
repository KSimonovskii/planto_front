import {type Dispatch, type ReactNode, type SetStateAction, useMemo, useState} from "react";
import type {DataTableProducts} from "../../utils/types";
import {ProductsContext} from "../../utils/Context.ts";


interface ProductsProviderProps {
    children: ReactNode;
}

export const ProductsProvider = ({ children }: ProductsProviderProps) => {
    const [productData, setProductData] =
        useState<DataTableProducts>({products: [], pages: 0});

    const contextProductValue = useMemo(() => ({
        products: productData.products,
        pages: productData.pages,
        setProductsData: setProductData as Dispatch<SetStateAction<DataTableProducts>>
    }), [productData.products, productData.pages, setProductData]);


    return(
        <ProductsContext.Provider value={contextProductValue}>
            {children}
        </ProductsContext.Provider>
    );
};
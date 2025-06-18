import React, {type Dispatch, type SetStateAction} from "react";
import Product from "../components/Product.ts";

interface ContextData {
    products: Product[];
    setProducts: Dispatch<SetStateAction<Product[]>>
   }

export const ProductsContext = React.createContext<ContextData>({products: [], setProducts: () => {}});
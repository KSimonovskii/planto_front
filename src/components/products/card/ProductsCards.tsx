import {useContext} from "react";
import {ProductsContext} from "../../../utils/context.ts";
import {Card} from "./Card.tsx";

const ProductsCards = () => {

    const {table} = useContext(ProductsContext);

    return (
        <div className={"flex flex-row flex-wrap justify-stretch space-x-3 space-y-3 mt-4"}>
            {table.map((product) => <Card product={product} key={product.id}/>)}
        </div>
    )
}

export default ProductsCards
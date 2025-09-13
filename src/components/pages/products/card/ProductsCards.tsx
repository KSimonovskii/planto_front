import {useContext} from "react";

import {Card} from "./Card.tsx";
import {ProductsContext} from "../../../../utils/Context.ts";

const ProductsCards = () => {

    const {table} = useContext(ProductsContext);

    return (
        <div className="w-[1220px] inline-flex flex-col justify-center items-start gap-10 overflow-hidden">
            <div className="self-stretch inline-flex justify-start items-start gap-6 flex-wrap content-start">
                {table.map((product) => <Card product={product} key={product.id}/>)}
            </div>
        </div>
    )
}

export default ProductsCards
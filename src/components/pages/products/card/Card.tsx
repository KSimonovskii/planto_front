
import {useState} from "react";
import {ShoppingCart} from "lucide-react"
import {Image} from "@imagekit/react";
import ImagePopup from "../ImagePopup.tsx";
import type Product from "../../../../features/classes/Product.ts";


interface PropsProduct {
    product: Product,
}

interface CartItem {
    id: string,
    quantity: number
}


export const Card = (props: PropsProduct) => {

    const product = props.product;

    const cart: CartItem[] = [];

    const [productsQuantity, setQuantity] = useState(cart);
    const [isOpen, setIsOpen] = useState(false);

    const handlerAddQuantity = (id: string) => {
        changeQuantity(id, 1);
    }

    const handlerDecreaseQuantity = (id: string) => {
        changeQuantity(id, -1);
    }

    const getQuantityProduct = (id: string) => {
        const index = productsQuantity.findIndex((item) => item.id === id);
        if (index >= 0) {
            return productsQuantity[index].quantity;
        }

        return 0;

    }

    const handlerChangeQuantity = (id: string, qty: string) => {
        const index = productsQuantity.findIndex((item) => item.id === id);
        if (index < 0) {
            changeQuantity(id, Number.parseInt(qty));
        } else {
            const change = Number.parseInt(qty) - productsQuantity[index].quantity;
            changeQuantity(id, change);
        }

    }

    const changeQuantity = (id : string, change : number) => {

        const index = productsQuantity.findIndex((item) => item.id === id);
        const newArray = productsQuantity.slice();
        if (index >= 0) {
            const newQty = Math.max(productsQuantity[index].quantity + change, 0);

            if (newQty > 0) {
                newArray[index].quantity = newQty;
            } else {
                newArray.splice(index, 1);
            }
        } else if (change > 0) {
            newArray.push({id: id, quantity: change});
        }

        setQuantity(newArray);
    }

    const handlerSendToBasket = (id: string) => {
        const index = productsQuantity.findIndex((item) => item.id === id);
        if (index < 0) {
            return;
        }
    }

    const imageUrl = product.imageUrl ? product.imageUrl : import.meta.env.VITE_IMAGEKIT_EMPTY_PHOTO;

    return (
        <>
            <div className={"border-base-form border-1 rounded-2xl flex flex-col items-center justify-between w-80 h-55 p-1"}>
                <div className={"flex flex-row justify-around w-full"}>
                    <div className={"w-30 h-30 my-2"}>
                        <Image urlEndpoint={`${import.meta.env.VITE_IMAGEKIT_ENDPOINT}`}
                               src={imageUrl}
                               alt={product.name}
                               className={"rounded-full cursor-zoom-in"}
                               onClick={() => setIsOpen(true)}
                               style={{width: "100%", height: "100%", objectFit: "cover"}}/>
                    </div>
                    <ImagePopup name={product.name} category={product.category} url={imageUrl} isOpen = {isOpen} setIsOpen = {setIsOpen}/>
                    <div className={"flex flex-col items-start justify-start w-2/4"}>
                        <h1 className={"text-base-form text-xl font-bold"}>{product.name}</h1>
                        <h2 className={"text-base-form text-xl"}>{product.category}</h2>
                        <p className={"text-base-text"}>{product.description}</p>
                    </div>
                </div>
                <div>
                    <p className={"text-base-form text-lg font-bold"}>Price: {product.price}$</p>
                </div>
                <div className={"flex flex-row justify-center items-center space-x-2"}
                     id={"productQuantity"}>
                    <button
                        className={"button w-10 h-7"}
                        id={"addQuantity"}
                        onClick={() => handlerAddQuantity(product.id)}>+</button>
                    <input
                        type={"number"}
                        min={0}
                        className={"inputField border-1 w-15 text-center p-0"}
                        id={`qty_${product.id}`}
                        value={getQuantityProduct(product.id)}
                        onChange={(e) => handlerChangeQuantity(product.id, e.target.value)}/>
                    <button
                        className={"button w-10 h-7"}
                        id={"decQuantity"}
                        onClick={() => handlerDecreaseQuantity(product.id)}>-
                    </button>
                    <button
                        className={"button w-15 h-7 flex justify-center"}
                        id={"send"}
                        onClick={() => handlerSendToBasket(product.id)}><ShoppingCart/>
                    </button>
                </div>
            </div>
        </>
    )
}
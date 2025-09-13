
import {useCallback, useState} from "react";
import {Image} from "@imagekit/react";
import ImagePopup from "../ImagePopup.tsx";
import type Product from "../../../clasess/Product.ts";
import {useCartActions} from "../../../../features/hooks/useCartAction.ts";
import {useCurrentUser} from "../../../../features/hooks/useCurrentUser.ts";

interface PropsProduct {
    product: Product,
}

interface CartItem {
    id: string,
    quantity: number
}


export const Card = ({product}: PropsProduct) => {

    const cart: CartItem[] = [];

    // const [productsQuantity, setQuantity] = useState(cart);
    const [isOpen, setIsOpen] = useState(false);

    const {addToCart, message} = useCartActions()
    const {isAuthenticated} = useCurrentUser();

    const openAuthModal = () => setAuthModalVisible(true);
    const closeAuthModal = () => setAuthModalVisible(false);

    // const handlerAddQuantity = (id: string) => {
    //     changeQuantity(id, 1);
    // }
    //
    // const handlerDecreaseQuantity = (id: string) => {
    //     changeQuantity(id, -1);
    // }
    //
    // const getQuantityProduct = (id: string) => {
    //     const index = productsQuantity.findIndex((item) => item.id === id);
    //     if (index >= 0) {
    //         return productsQuantity[index].quantity;
    //     }
    //
    //     return 0;
    //
    // }
    //
    // const handlerChangeQuantity = (id: string, qty: string) => {
    //     const index = productsQuantity.findIndex((item) => item.id === id);
    //     if (index < 0) {
    //         changeQuantity(id, Number.parseInt(qty));
    //     } else {
    //         const change = Number.parseInt(qty) - productsQuantity[index].quantity;
    //         changeQuantity(id, change);
    //     }
    //
    // }
    //
    // const changeQuantity = (id : string, change : number) => {
    //
    //     const index = productsQuantity.findIndex((item) => item.id === id);
    //     const newArray = productsQuantity.slice();
    //     if (index >= 0) {
    //         const newQty = Math.max(productsQuantity[index].quantity + change, 0);
    //
    //         if (newQty > 0) {
    //             newArray[index].quantity = newQty;
    //         } else {
    //             newArray.splice(index, 1);
    //         }
    //     } else if (change > 0) {
    //         newArray.push({id: id, quantity: change});
    //     }
    //
    //     setQuantity(newArray);
    // }

    const handleAddToCart = useCallback(async (productId: string) => {
        if (!isAuthenticated) {
            openAuthModal();
            return;
        }
        try {
            await addToCart(productId);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            }

        }

    }, [isAuthenticated, addToCart]);

    const imageUrl = product.imageUrl ? product.imageUrl : import.meta.env.VITE_IMAGEKIT_EMPTY_PHOTO;

    return (
        <>
            <div className="w-72 h-[462px] inline-flex justify-start items-center gap-2.5">
                <div className="w-72 h-[462px] inline-flex flex-col justify-start items-start gap-2">
                    <div className="self-stretch flex flex-col justify-start items-start gap-3">
                        <div className="w-72 h-72 relative rounded-lg overflow-hidden">
                            <Image urlEndpoint={`${import.meta.env.VITE_IMAGEKIT_ENDPOINT}`}
                                   src={imageUrl}
                                   alt={product.name}
                                   onClick={() => setIsOpen(true)}
                                   style={{width: "100%", height: "100%", objectFit: "cover"}}>
                            </Image>
                            <div className="w-5 h-4 left-[251px] top-[17px] absolute">
                                <div className="w-5 h-4 left-0 top-0 absolute bg-white/20 outline-2 outline-offset-[-1px] outline-lime-800" />
                            </div>
                        </div>
                        <div className="self-stretch flex flex-col justify-start items-start gap-1">
                            <div className="w-72 inline-flex justify-between items-start overflow-hidden">
                                <div className="w-48 h-12 justify-start text-lime-800 text-xl font-bold font-['Rubik']">{product.name}</div>
                                <div className="text-right justify-start text-lime-800 text-xl font-bold font-['Rubik']">₪ {product.price}</div>
                            </div>
                            <div className="self-stretch justify-start text-lime-800 text-base font-normal font-['Rubik'] leading-normal">{product.category}</div>
                        </div>
                    </div>
                    <div data-property-1="White" className="self-stretch px-6 py-3 bg-white rounded-lg outline-1 outline-offset-[-1px] outline-lime-800 inline-flex justify-center items-center gap-2 overflow-hidden">
                        <button
                            className="justify-start text-lime-800 text-base font-medium font-['Rubik'] leading-normal cursor-pointer"
                            onClick={() => handleAddToCart(product.id)}>
                            Shop Now
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
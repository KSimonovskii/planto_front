import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {useCartActions} from "../hooks/useCartAction.ts"

import {useCurrentUser} from "../hooks/useCurrentUser.ts";

interface CartContextType {
    productsInCart: number;
    refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const { getCart } = useCartActions();
    const [productsInCart, setProductsInCart] = useState(0);
    const {isAuthenticated} = useCurrentUser();

    const refreshCart = useCallback(async () => {
        try {
            const cartData = await getCart();
            setProductsInCart(cartData.length);
        } catch (err) {
            console.error("Failed to refresh cart:", err);
            setProductsInCart(0);
        }
    }, [getCart]);

    useEffect(() => {
        if (isAuthenticated) {
            refreshCart();
        } else {
            setProductsInCart(0);
        }
    }, [isAuthenticated, refreshCart]);

    return (
        <CartContext.Provider value={{ productsInCart, refreshCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCartContext must be used inside CartProvider");
    return context;
};

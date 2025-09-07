import { createContext, useState, useCallback, useContext } from "react";
import { useCartActions } from "../hooks/useCartAction.ts"

interface CartContextType {
    productsInCart: number;
    refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const { getCart } = useCartActions();
    const [productsInCart, setProductsInCart] = useState(0);

    const refreshCart = useCallback(async () => {
        const cartData = await getCart();
        setProductsInCart(cartData.length);
    }, [getCart]);

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

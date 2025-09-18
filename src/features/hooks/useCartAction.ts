import {useCurrentUser} from "./useCurrentUser.ts";
import {useCallback, useState} from "react";
import {secureFetch} from "../../utils/secureFetch.ts";

const LOCAL_CART_KEY = "localCart";

export type CartEntry = {
    productId: string;
    quantity: number;
};

export const useCartActions = () => {
    // const { getToken, setAccessToken } = useAppSelector(state => state.userAuth.Slice)
    const { user } = useCurrentUser();
    const [message, setMessage] = useState<string | null>(null);
    const [cart, setCart] = useState<CartEntry[]>([]);

    const BASE_URL = import.meta.env.VITE_BASE_URL;


    // Server cart

    const getCart = useCallback(async (): Promise<CartEntry[]> => {
        if (!user) {
            console.warn("User is not authenticated yet or token not loaded");
            return [];
        }

        const URL = `${BASE_URL}/account/user/${user.login}/cart`;

        try {
            const response = await secureFetch(URL, { method: "GET" });

            if (!response.ok) {
                const errorText = await response.text();
                setMessage("Error fetching cart");
                throw new Error(`Failed to fetch cart: ${response.status} ${errorText}`);
            }

            const cartData: CartEntry[] = await response.json();
            setCart(cartData);
            return cartData;
        } catch (e: unknown) {
            console.error("Error fetching cart:", e);
            if (e instanceof Error) {
                setMessage(e.message || "Failed to fetch cart data.");
            }
            setTimeout(() => setMessage(null), 3000);
            return [];
        }
    }, [user]);

    const addToCart = useCallback(async (productId: string): Promise<void> => {
        if (!user) throw new Error("User is not authenticated");

        const url = `${BASE_URL}/account/user/${user.login}/cart/${productId}`;
        const response = await secureFetch(url, { method: "PUT" });

        if (!response.ok) {
            setMessage("Error adding product to cart");
            const errorText = await response.text();
            throw new Error(`Failed to add to cart: ${response.status} ${errorText}`);
        }

        setMessage("Product added to cart");
        setCart((prev) => {
            const exists = prev.find((entry) => entry.productId === productId);
            if (exists) {
                return prev.map((entry) =>
                    entry.productId === productId
                        ? { ...entry, quantity: entry.quantity + 1 }
                        : entry
                );
            }
            return [...prev, { productId, quantity: 1 }];
        });

        setTimeout(() => setMessage(null), 3000);
    }, [user]);

    const isInCart = useCallback(
        (productId: string): boolean =>
            cart.some((entry) => entry.productId === productId),
        [cart]
    );

    const removeFromCart = useCallback(async (productId: string): Promise<void> => {
        if (!user) throw new Error("User is not authenticated");

        const url = `${BASE_URL}/account/user/${user.login}/cart/${productId}`;
        const response = await secureFetch(url, { method: "DELETE" });

        if (!response.ok) {
            const errorText = await response.text();
            setMessage("Error removing product from cart");
            throw new Error(`Failed to remove from cart: ${response.status} ${errorText}`);
        }

        setMessage("Product removed from cart");
        setCart((prev) =>
            prev
                .map((entry) =>
                    entry.productId === productId
                        ? { ...entry, quantity: entry.quantity - 1 }
                        : entry
                )
                .filter((entry) => entry.quantity > 0)
        );

        setTimeout(() => setMessage(null), 3000);
    }, [user]);

    const removeAllFromCart = useCallback(async (productId: string): Promise<void> => {
        if (!user) throw new Error("User is not authenticated");

        const url = `${BASE_URL}/account/user/${user.login}/cart/${productId}/all`;
        const response = await secureFetch(url, { method: "DELETE" });

        if (!response.ok) {
            const errorText = await response.text();
            setMessage("Error removing product from cart");
            throw new Error(`Failed to remove all from cart: ${response.status} ${errorText}`);
        }

        setMessage("Product removed completely");
        setCart((prev) => prev.filter((entry) => entry.productId !== productId));
        setTimeout(() => setMessage(null), 3000);
    }, [user]);

    const clearCart = useCallback(async (): Promise<void> => {
        if (!user) throw new Error("User is not authenticated");

        const url = `${BASE_URL}/account/user/${user.login}/cart/clear`;
        const response = await secureFetch(url, { method: "DELETE" });

        if (!response.ok) {
            const errorText = await response.text();
            setMessage("Error clearing cart");
            throw new Error(`Failed to clear cart: ${response.status} ${errorText}`);
        }

        setMessage("Cart cleared");
        setCart([]);
        setTimeout(() => setMessage(null), 3000);
    }, [user]);


    // Local cart

    const getLocalCart = useCallback((): CartEntry[] => {
        const stored = localStorage.getItem(LOCAL_CART_KEY);
        return stored ? JSON.parse(stored) : [];
    }, []);

    const saveLocalCart = useCallback((cart: CartEntry[]) => {
        localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cart));
    }, []);

    const addToLocalCart = useCallback((productId: string) => {
        const cart = getLocalCart();
        const existing = cart.find((p) => p.productId === productId);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ productId, quantity: 1 });
        }
        saveLocalCart(cart);
    }, [getLocalCart, saveLocalCart]);

    const isInLocalCart = useCallback(
        (productId: string): boolean => {
            const localCart = getLocalCart();
            return localCart.some((entry) => entry.productId === productId);
        },
        [getLocalCart]
    );

    const clearLocalCart = useCallback(() => {
        localStorage.removeItem(LOCAL_CART_KEY);
    }, []);

    const syncLocalCartToServer = useCallback(async () => {
        const localCart = getLocalCart();
        for (const item of localCart) {
            for (let i = 0; i < item.quantity; i++) {
                await addToCart(item.productId);
            }
        }
        clearLocalCart();
    }, [getLocalCart, addToCart, clearLocalCart]);

    const removeFromLocalCart = useCallback((productId: string) => {
        const cart = getLocalCart();
        const index = cart.findIndex((p) => p.productId === productId);
        if (index !== -1) {
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1);
            }
            saveLocalCart(cart);
        }
    }, [getLocalCart, saveLocalCart]);

    const removeAllFromLocalCart = useCallback((productId: string) => {
        const cart = getLocalCart().filter((p) => p.productId !== productId);
        saveLocalCart(cart);
    }, [getLocalCart, saveLocalCart]);


    return {
        // server
        getCart,
        addToCart,
        removeFromCart,
        removeAllFromCart,
        clearCart,
        isInCart,

        // local
        getLocalCart,
        addToLocalCart,
        isInLocalCart,
        clearLocalCart,
        syncLocalCartToServer,
        removeFromLocalCart,
        removeAllFromLocalCart,

        // state
        message,
        cart,
    };
};

import {useCallback, useState} from "react";
import {secureFetch} from "../../utils/secureFetch.ts";
import {useCurrentUser} from "./useCurrentUser.ts";
import {useAuth} from "./useAuth.ts";

export type CartEntry = {
    productId: string;
    quantity: number;
};

export const useCartActions = () => {
    const {getToken, setAccessToken} = useAuth();
    const {user} = useCurrentUser();
    const [message, setMessage] = useState<string | null>(null);
    const [cart, setCart] = useState<CartEntry[]>([]);

    const BASE_URL = import.meta.env.VITE_BASE_URL;


    const getCart = useCallback(async (): Promise<CartEntry[]> => {

        if (!user) {
            console.warn("User is not authenticated yet or token not loaded");
            return [];
        }

        const URL = `${BASE_URL}/account/user/${user.login}/cart`;

        try {
            const options = {
                method: "GET",
            }
            const response = await secureFetch(URL, options, getToken, setAccessToken);

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
    }, [user, getToken, setAccessToken]);


    const addToCart = useCallback(async (productId: string): Promise<void> => {
        if (!user) throw new Error("User is not authenticated");

        const url = `${BASE_URL}/account/user/${user.login}/cart/${productId}`;
        const response = await secureFetch(url, {method: "PUT"}, getToken, setAccessToken);

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
                        ? {...entry, quantity: entry.quantity + 1}
                        : entry
                );
            }
            return [...prev, {productId, quantity: 1}];
        });

        setTimeout(() => setMessage(null), 3000);
    }, [user, getToken, setAccessToken]);


    const isInCart = useCallback(
        (productId: string): boolean => cart.some((entry) => entry.productId === productId),
        [cart]
    );


    const removeFromCart = useCallback(async (productId: string): Promise<void> => {
        if (!user) throw new Error("User is not authenticated");

        const url = `${BASE_URL}/account/user/${user.login}/cart/${productId}`;
        const response = await secureFetch(url, {method: "DELETE"}, getToken, setAccessToken);

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
                        ? {...entry, quantity: entry.quantity - 1}
                        : entry
                )
                .filter((entry) => entry.quantity > 0)
        );

        setTimeout(() => setMessage(null), 3000);
    }, [user, getToken, setAccessToken]);


    const removeAllFromCart = useCallback(async (productId: string): Promise<void> => {
        if (!user) throw new Error("User is not authenticated");

        const url = `${BASE_URL}/account/user/${user.login}/cart/${productId}/all`;
        const response = await secureFetch(url, {method: "DELETE"}, getToken, setAccessToken);

        if (!response.ok) {
            const errorText = await response.text();
            setMessage("Error removing product from cart");
            throw new Error(`Failed to remove all from cart: ${response.status} ${errorText}`);
        }

        setMessage("Product removed completely");
        setCart((prev) => prev.filter((entry) => entry.productId !== productId));
        setTimeout(() => setMessage(null), 3000);
    }, [user, getToken, setAccessToken]);


    const clearCart = useCallback(async (): Promise<void> => {
        if (!user) throw new Error("User is not authenticated");

        const url = `${BASE_URL}/account/user/${user.login}/cart/clear`;
        const response = await secureFetch(url, {method: "DELETE"}, getToken, setAccessToken);

        if (!response.ok) {
            const errorText = await response.text();
            setMessage("Error clearing cart");
            throw new Error(`Failed to clear cart: ${response.status} ${errorText}`);
        }

        setMessage("Cart cleared");
        setCart([]);
        setTimeout(() => setMessage(null), 3000);
    }, [user, getToken, setAccessToken]);

    return {
        getCart,
        addToCart,
        removeFromCart,
        removeAllFromCart,
        clearCart,
        isInCart,
        message,
        cart
    };
};

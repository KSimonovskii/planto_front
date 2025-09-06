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

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const getCart = useCallback(async (): Promise<CartEntry[]> => {
        if (!getToken || !user) {
            console.warn("User is not authenticated, cannot get cart");
            return [];
        }

        const url = `${BASE_URL}/account/user/${user.login}/cart`;

        try {
            const response = await secureFetch(url, {method: "GET"}, getToken, setAccessToken);

            if (!response.ok) {
                const errorText = await response.text();
                setMessage("Error fetching cart");
                throw new Error(`Failed to fetch cart: ${response.status} ${errorText}`);
            }

            const cartData: CartEntry[] = await response.json();
            setMessage("Cart loaded successfully");
            setTimeout(() => setMessage(null), 3000);
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
        } else {
            setMessage("Product added to cart");
        }
        setTimeout(() => setMessage(null), 3000);

    }, [user, getToken, setAccessToken]);

    const removeFromCart = useCallback(async (productId: string): Promise<void> => {
        if (!user) throw new Error("User is not authenticated");

        const url = `${BASE_URL}/account/user/${user.login}/cart/${productId}`;


        const response = await secureFetch(url, {method: "DELETE"}, getToken, setAccessToken);

        if (!response.ok) {
            const errorText = await response.text();
            setMessage("Error removing product from cart");
            throw new Error(`Failed to remove from cart: ${response.status} ${errorText}`);
        } else {
            setMessage("Product removed from cart");
        }
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
        } else {
            setMessage("Product removed from cart completely");
        }
        setTimeout(() => setMessage(null), 3000);
    }, [user, getToken, setAccessToken]);

    const clearCart = useCallback(async (): Promise<void> => {
        if (!user) throw new Error("User is not authenticated");
        const url = `${BASE_URL}/account/user/${user.login}/cart/clear`;
        const response = await secureFetch(url, {method: "DELETE"}, getToken, setAccessToken);

        if (!response.ok) {
            const errorText = await response.text();
            setMessage("Error clearing the cart");
            throw new Error(`Failed to clear cart: ${response.status} ${errorText}`);
        } else {
            setMessage("Cart has been cleared");
        }
        setTimeout(() => setMessage(null), 3000);
    }, [user, getToken, setAccessToken]);

    return {
        getCart,
        addToCart,
        removeFromCart,
        removeAllFromCart,
        message,
        clearCart
    };
}
import {useCallback, useState} from "react";
import {BASE_URL} from "../../utils/constants.ts";
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

        } catch (e: any) {
            console.error("Error fetching cart:", e);
            setMessage(e.message || "Failed to fetch cart data.");
            setTimeout(() => setMessage(null), 3000);
            return [];
        }
    }, [user]);


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

    }, [user]);

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

    }, [user]);

    return {
        getCart,
        addToCart,
        removeFromCart,
        message
    };
}
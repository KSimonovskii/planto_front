import {useState} from "react";
import {BASE_URL} from "../../utils/constants.ts";
import {secureFetch} from "../../utils/secureFetch.ts";
import {useAuth} from "../hooks/useAuth.ts";
import {useCurrentUser} from "./useCurrentUser.ts";

export type CartEntry = {
    productId: string;
    quantity: number;
};

export const useCartActions = () => {
    const {user, isAuthenticated} = useCurrentUser();
    const {token, setToken} = useAuth();

    const [message, setMessage] = useState<string | null>(null);

    const getCart = async (): Promise<CartEntry[]> => {
        if (!isAuthenticated || !user) throw new Error("User is not authenticated");

        const url = `${BASE_URL}/account/user/${user.login}`;

        try {
            const response = await secureFetch(url, {method: "GET"}, () => token, setToken);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch cart: ${response.status} ${errorText}`);
            }

            const data = await response.json();
            return data.cart ?? [];
        } catch (error) {
            setMessage("Error loading cart");
            throw error;
        }
    };

    const addToCart = async (productId: string): Promise<void> => {
        if (!isAuthenticated || !user) throw new Error("User is not authenticated");

        const url = `${BASE_URL}/account/user/${user.login}/cart/${productId}`;

        const response = await secureFetch(url, {method: "PUT"}, () => token, setToken);

        if (!response.ok) {
            setMessage("Error adding product to cart");
            const errorText = await response.text();
            throw new Error(`Failed to add to cart: ${response.status} ${errorText}`);
        } else {
            setMessage("Product added to cart");
        }
        setTimeout(() => setMessage(null), 3000);

    };

    const removeFromCart = async (productId: string): Promise<void> => {
        if (!isAuthenticated || !user) throw new Error("User is not authenticated");

        const url = `${BASE_URL}/account/user/${user.login}/cart/${productId}`;


        const response = await secureFetch(url, {method: "DELETE"}, () => token, setToken);

        if (!response.ok) {
            const errorText = await response.text();
            setMessage("Error removing product from cart");
            throw new Error(`Failed to remove from cart: ${response.status} ${errorText}`);
        } else {
            setMessage("Product removed from cart");
        }
        setTimeout(() => setMessage(null), 3000);

    };

    return {
        getCart,
        addToCart,
        removeFromCart,
        message
    };
}
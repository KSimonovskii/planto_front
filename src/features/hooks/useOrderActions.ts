import {useCallback} from "react";
import {createOrderApi} from "../api/orderAction.ts";
import {useCurrentUser} from "./useCurrentUser.ts";
import type {OrderCreateDto} from "../../dto/OrderCreateDto.ts";
import {secureFetch} from "../../utils/secureFetch.ts";


export const useOrderActions = () => {
    const {user} = useCurrentUser();

    const createOrder = useCallback(async (orderData: OrderCreateDto) => {
        if (!user || !user.login) {
            throw new Error("User not authenticated.");
        }
        return await createOrderApi(user.login, orderData);
    }, [user]);

    const deleteOrder = useCallback(async (orderId: string): Promise<void> => {
        const url = `${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_BASE_ORDER_ENDPOINT}/remove/${orderId}`;
        const response = await secureFetch(url, {method: "DELETE"});

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to remove order: ${response.status} ${errorText}`);
        }
    }, []);

    return {
        createOrder,
        deleteOrder,
    };
};
import {useCallback} from "react";
import {createOrderApi} from "../api/orderAction.ts";
import {useCurrentUser} from "./useCurrentUser.ts";
import type {OrderCreateDto} from "../../dto/OrderCreateDto.ts";

export const useOrderActions = () => {
    const {user} = useCurrentUser();

    const createOrder = useCallback(async (orderData: OrderCreateDto) => {
        if (!user || !user.login){
            throw new Error("User not authenticated.");
        }
        return await createOrderApi(user.login, orderData);
    }, [user]);



    return {
        createOrder,
    };
};
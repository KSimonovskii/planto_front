import {useCallback} from "react";
import {createOrderApi} from "../api/orderAction.ts";
import {useCurrentUser} from "./useCurrentUser.ts";
import type {OrderCreateDto} from "../../dto/OrderCreateDto.ts";
import {useAuth} from "./useAuth.ts";

export const useOrderActions = () => {
    const {user} = useCurrentUser();
    const {getToken, setAccessToken} = useAuth();

    const createOrder = useCallback(async (orderData: OrderCreateDto) => {
        if (!user || !user.login){
            throw new Error("User not authenticated.");
        }
        return await createOrderApi(user.login, orderData, getToken, setAccessToken);
    }, [user]);



    return {
        createOrder,
    };
};
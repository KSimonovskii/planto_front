import {createContext} from "react";
import type {OrderDto} from "../../../utils/types";

export const OrderContext = createContext<{
    orders: OrderDto[];
    setOrders: (orders: OrderDto[]) => void;
}>({
    orders: [],
    setOrders: () => {}
});
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Decimal } from "decimal.js";
import { OrderContext } from "./OrderContext.ts";
import type { OrderDto } from "../../../utils/types";
import { secureFetch } from "../../../utils/secureFetch.ts";
import spinner from "../../../assets/spinner2.png";
import {useAppSelector} from "../../../app/hooks.ts";


type OrdersProviderProps = {
    children: ReactNode;
};

export const OrdersProvider = ({ children }: OrdersProviderProps) => {
    const [orders, setOrders] = useState<OrderDto[]>([]);
    const [loading, setLoading] = useState(true);

    const {accessToken} = useAppSelector(state => state.userAuthSlice);

    const fetchOrders = async () => {

        if (!accessToken) {
            console.error("User not authenticated");
            setOrders([]);
            setLoading(false);
            return;
        }

        try {
            const BASE_URL = `${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_BASE_ORDER_ENDPOINT}/orders`;

            const response = await secureFetch(
                BASE_URL,
                { method: "GET", headers: { "Content-Type": "application/json" } },
            );

            if (!response.ok) {
                throw new Error(`Failed to fetch orders: ${response.statusText}`);
            }

            const result = await response.json();

            if (!Array.isArray(result)) {
                throw new Error("Invalid response format");
            }

            const converted: OrderDto[] = result.map((o: OrderDto) => ({
                ...o,
                items: Array.isArray(o.items)
                    ? o.items.map((item: any) => ({
                        ...item,
                        priceUnit: new Decimal(item?.priceUnit ?? 0),
                    }))
                    : [],
            }));

            setOrders(converted);
        } catch (err: unknown) {
            console.error("Order fetch error:", err);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [accessToken, fetchOrders]);

    if (loading) {
        return (
            <div className="flex justify-center items-center w-full h-64">
                <img src={spinner} alt="loading..." className="spinner-icon" />
            </div>
        );
    }

    return (
        <OrderContext.Provider value={{ orders, setOrders }}>
            {children}
        </OrderContext.Provider>
    );
};

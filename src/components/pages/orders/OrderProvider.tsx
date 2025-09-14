import type {ReactNode} from "react";
import {useEffect, useState} from "react";
import {Decimal} from "decimal.js";
import {OrderContext} from "./OrderContext.ts";
import type {OrderDto} from "../../../utils/types";
import {useAuth} from "../../../features/hooks/useAuth.ts";
import {getAllOrders} from "../../../features/api/orderAction.ts";
import spinner from "../../../assets/spinner2.png";

type OrdersProviderProps = {
    children: ReactNode;
};

export const OrdersProvider = ({children}: OrdersProviderProps) => {
    const [orders, setOrders] = useState<OrderDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {accessToken} = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            if (!accessToken) return;
            try {
                const result = await getAllOrders(accessToken);


                const converted: OrderDto[] = result.map((o: OrderDto) => ({
                    ...o,
                    items: o.items.map((item: any) => ({
                        ...item,
                        priceUnit: new Decimal(item.priceUnit ?? 0)
                    }))
                }));

                setOrders(converted);
            } catch (err) {
                console.error(err);
                setError("Failed to load orders");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [accessToken]);

    if (loading) {
        return (
            <div className="flex justify-center items-center w-full h-64">
                <img src={spinner} alt="loading..." className="spinner-icon"/>
            </div>
        );
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <OrderContext.Provider value={{orders, setOrders}}>
            {children}
        </OrderContext.Provider>
    );
};

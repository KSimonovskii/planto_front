import type {OrderCreateDto} from "../../dto/OrderCreateDto.ts";
import {secureFetch} from "../../utils/secureFetch.ts";

export const createOrderApi = async (
    login: string,
    orderData: OrderCreateDto,
    getToken: () => string | null,
    setAccessToken: (token: string | null) => void,
    ) => {

    const url = `${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_BASE_ORDER_ENDPOINT}/create/${login}`;
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(orderData)
    };

    const response = await secureFetch(url, options, getToken, setAccessToken);

    if (!response.ok) {
        throw new Error(`Failed to create order: ${response.statusText}`);
    }
    return await response.json();
};


export const getAllOrders = async (token: string) => {
    const BASE_URL = `${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_BASE_ORDER_ENDPOINT}/orders`;

    const response = await fetch(BASE_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }
    return await response.json();
};
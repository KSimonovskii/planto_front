import {secureFetch} from "../../utils/secureFetch.ts";

import {Address} from "../../components/pages/users/Address.ts";
import {OrderItem} from "../../components/pages/orders/OrderItem.ts";
import {Order} from "../../components/pages/orders/Order.ts";
import {CartItem} from "../../components/pages/orders/CartItem.ts";
import type {CartItemDto, OrderDto, OrderItemDto, UserInterfaceAccount} from "../../utils/types";
import {useCallback} from "react";

export const useUserActions = () => {

    const getUserByLogin = useCallback(async (login: string) => {

        const URL = `${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_BASE_USER_ENDPOINT}/user/${login}`;

        const options = {
            method: "GET",
        }
        const response = await secureFetch(URL, options);

        if (!response.ok) {
           const errorText = await response.text();
            throw new Error(`${response.status}  ${errorText}`);
        }

        const data = await response.json();

        const orders = data.orders ? data.orders.map(createOrder) : [];
        const cart = data.cart ? data.cart.map(createCartItem) : [];

        const address = data.address
            ? new Address(
                data.address.country,
                data.address.city,
                data.address.street,
                data.address.zip,
                data.address.houseNumber,
                data.address.apartmentNumber
            )
            : null;

        return {
            login: data.login,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            address: address,
            roles: data.roles,
            orders: orders,
            cart: cart
        }
    }, []);
    return {getUserByLogin};

}

function createOrderItem(itemData: OrderItemDto) {
    return new OrderItem(
        itemData.productId,
        itemData.name,
        itemData.quantity,
        itemData.priceUnit
    );
}

function createOrder(orderData: OrderDto) {
    const items = orderData.items
        ? orderData.items.map(createOrderItem) : [];
    return new Order(
        orderData.id,
        items,
        orderData.status,
        orderData.orderDate,
        orderData.paymentMethod,
        orderData.paid
    )
}

function createCartItem(cartItemData: CartItemDto) {
    return new CartItem(
        cartItemData.productId,
        cartItemData.quantity
    );
}

export async function getUsersTable(): Promise<UserInterfaceAccount[]> {
    const URL = `${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_BASE_USER_ENDPOINT}/users`;

    try {
        const response = await secureFetch(URL, { method: "GET" });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch users: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
            throw new Error("Invalid response format. Expected an array of users.");
        }

        return data.map(userDto => {
            const orders = userDto.orders ? userDto.orders.map(createOrder) : null;
            const cart = userDto.cart ? userDto.cart.map(createCartItem) : null;

            const address = userDto.address
                ? new Address(
                    userDto.address.country,
                    userDto.address.city,
                    userDto.address.street,
                    userDto.address.zip,
                    userDto.address.houseNumber,
                    userDto.address.apartmentNumber
                )
                : null;

            return {
                login: userDto.login,
                firstName: userDto.firstName || null,
                lastName: userDto.lastName || null,
                email: userDto.email,
                address: address,
                roles: Array.from(userDto.roles),
                orders: orders,
                cart: cart
            } as UserInterfaceAccount;
        });

    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}
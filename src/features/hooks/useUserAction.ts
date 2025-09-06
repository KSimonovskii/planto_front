import {secureFetch} from "../../utils/secureFetch.ts";
import {useAuth} from "./useAuth.ts";

import {Address} from "../../components/pages/users/Address.ts";
import {OrderItem} from "../../components/pages/orders/OrderItem.ts";
import {Order} from "../../components/pages/orders/Order.ts";
import {CartItem} from "../../components/pages/orders/CartItem.ts";
import type {CartItemDto, OrderDto, OrderItemDto} from "../../utils/types";

export const useUserActions = () => {
    const {getToken, setAccessToken} = useAuth();

    const getUserByLogin = async (login: string) => {

        const URL = `${import.meta.env.VITE_BASE_USER_URL}/user/${login}`;

        const options = {
            method: "GET",
        }
        const response = await secureFetch(URL, options, getToken, setAccessToken);

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
    };
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

export async function getUsersTable() {
    return [];
}
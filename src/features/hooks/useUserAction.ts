import {BASE_URL} from "../../utils/constants.ts";
import {secureFetch} from "../../utils/secureFetch.ts";
import {useAuth} from "./useAuth.ts";
import UserAccount from "../../components/pages/users/UserAccount.ts";
import {Address} from "../../components/pages/users/Address.ts";
import {OrderItem} from "../../components/pages/orders/OrderItem.ts";
import {Order} from "../../components/pages/orders/Order.ts";
import {CartItem} from "../../components/pages/orders/CartItem.ts";
import type {CartItemDto, OrderDto, OrderItemDto} from "../../utils/types";

export const useUserActions = () => {
    const {accessToken, setAccessToken} = useAuth();

    const getUserByLogin = async (login: string) => {

        const URL = `${BASE_URL}/account/user/${login}`;
        if (!URL) {
            throw new Error("URL not found");
        }

        const options = {
            method: "GET",
        }

        const response = await secureFetch(URL, options, () => accessToken, setAccessToken);

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

        return new UserAccount(
            data.login,
            data.firstName,
            data.lastName,
            data.email,
            address,
            data.role,
            orders,
            cart
        );
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
import {OrderItem} from "./OrderItem.ts";
import type {Address} from "./Address.ts";
import type {OrderStatus} from "./OrderStatus.ts";

export class Order {
    id: string;
    items: OrderItem[];
    status: OrderStatus;
    orderDate: string;
    shippingAddress: Address;
    paymentMethod: string;
    paid: boolean

}
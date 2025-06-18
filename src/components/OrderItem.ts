import {Decimal} from "decimal.js";

export interface OrderItem {
    productId: string;
    name: string;
    quantity: number;
    priceUnit: Decimal
}
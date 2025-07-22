import {LucideIcon} from "lucide-react";
import {Decimal} from "decimal.js";
import type {OrderStatus} from "../components/pages/orders/OrderStatus.ts";

interface AuthContextType {
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
    logout: () => void;
}

interface Item {
    title: string
    path: string
    icon: LucideIcon
    adminOnly: boolean
}

interface OrderItemDto {
    productId: string
    name: string
    quantity: number
    priceUnit: Decimal
}

interface OrderDto {
    id: string
    items: OrderItem[]
    status: OrderStatus
    orderDate: string
    paymentMethod: string
    paid: boolean
}

interface CartItemDto {
    productId: string
    quantity: number
}


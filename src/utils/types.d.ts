import {LucideIcon} from "lucide-react";
import {Decimal} from "decimal.js";
import type {OrderStatus} from "../components/pages/orders/OrderStatus.ts";
import type {CartItem} from "../components/pages/orders/CartItem.ts";

interface UserInterfaceAccount {
    login: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    address: Address | null;
    roles: string[];
    orders: Order[] | null;
    cart: CartItem[] | null;
}


interface AuthResponseData {
    accessToken: string
    jwtExpirationMs: number
}

interface AuthContextType {
    accessToken: string | null
    setAccessToken: (token: string | null) => void
    logout: () => void
    getToken: () => string | null
    accessTokenLoaded: boolean
}

interface NavItem {
    title: string
    path: string
    adminOnly: boolean
    userOnly?: boolean
}


interface OrderItemDto {
    productId: string
    name: string
    quantity: number
    priceUnit: Decimal
}

interface OrderDto {
    id: string
    items: OrderItemDto[]
    status: OrderStatus
    orderDate: string
    paymentMethod: string
    paid: boolean
}

interface CartItemDto {
    productId: string
    quantity: number
}


export interface DataTableProducts {
    products: Product[],
    pages: number
}

export interface PageProductsData {
    pageNumber: number;
    sort: Sort;
    filters: Filter[]
}
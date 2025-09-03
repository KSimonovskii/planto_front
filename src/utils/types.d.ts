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
    cart: CartItem[]| null;
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
import {directions} from "./enums/directions.ts";
import type Sort from "../features/classes/Sort.ts";

export interface Item {
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
export interface DataTableProducts{
    products: Product[],
    pages: number
}

export interface PageProductsData{
    pageNumber: number;
    sort: Sort;
    filters: Filter[]
}

export interface ProductData {
    id?: string,
    name: string,
    category: string,
    qty: number,
    price: number,
    description: string,
    imageUrl: string,
    imageFile: File | null
}

export interface ProductDataForTable {
    imageUrl: string,
    name: string,
    category: string,
    qty: number,
    price: number,
    description: string,
}

export interface AnswerTable {
    content: [];
    page: {
        size: number,
        number: number,
        totalElements: number,
        totalPages: number
    }
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


export interface DataTableProducts{
    products: Product[],
    pages: number
}

export interface PageProductsData{
    pageNumber: number;
    sort: Sort;
    filters: Filter[]
}
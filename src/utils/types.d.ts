import {Decimal} from "decimal.js";
import type Sort from "../features/classes/Sort.ts";
import type {OrderStatus} from "../components/pages/orders/OrderStatus.ts";
import type {CartItem} from "../components/pages/orders/CartItem.ts";
import type Product from "../features/classes/Product.ts";

//Common
interface NavItem {
    title: string
    path: string
    adminOnly: boolean
    userOnly?: boolean
}

export interface DataTable <T> {
    table: T[],
    pages: number
}

export interface PageTableData {
    pageNumber: number;
    sort: Sort;
    filters: Filter[]
}

//Auth
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

//Products
export interface ProductData {
    id?: string;
    name: string;
    category?: string;
    quantity: number;
    price: number;
    description?: string;
    imageUrl: string;
    imageFile?: File | null;
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

//Orders
interface OrderDto {
    id: string;
    items: OrderItemDto[];
    status: OrderStatus;
    orderDate: string;
    paymentMethod: string;
    paid: boolean;
    user?: UserDto;
}

export interface OrderItemDto {
    productId: string;
    name: string;
    quantity: number;
    priceUnit: Decimal;
}

interface CartItemDto {
    productId: string
    quantity: number
}

interface CartItemType {
    product: Product ;
    quantity: number;
}
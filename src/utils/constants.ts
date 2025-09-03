import {Home, Info, LayoutDashboard, LogIn, /*Package*/ ShoppingCart, Store} from "lucide-react";
import {directions} from "./enums/directions.ts";
import emptyPhoto from "../assets/empty-foto.jpg";
import {filterTypes} from "./enums/filterTypes.ts";
import type {Dispatch, SetStateAction} from "react";
import type {NavItem} from "./types";
import Sort from "../components/clasess/Sort.ts";
import Filter from "../components/clasess/Filter.ts";


export const navItems: NavItem[] = [
    {title: 'Home', path: 'main', icon: Home, adminOnly: false},
    {title: 'About us', path: 'about', icon: Info, adminOnly: false},
    {title: 'Shopping cart', path: 'cart', icon: ShoppingCart, adminOnly: false},
    {title: 'My account', path: 'accountDashboard', icon: LogIn, adminOnly: false},
    {title: 'Store', path: 'store', icon: Store, adminOnly: false},
    // {title: 'Products', path: 'products', icon: Package, adminOnly: true},
    {title: 'Admin Dashboard', path: 'admin/dashboard', icon: LayoutDashboard, adminOnly: true},
]

import {
    Home,
    Package,
    ShoppingCart,
    Users,
    BarChart3,
    Settings,
} from "lucide-react";

export const navItems: Item[] = [
    {title: 'Main', path: 'main', icon: Home},
    {title: 'Products', path: 'products', icon: Package},
    {title: 'Orders', path: 'orders', icon: ScrollText}
]

export const SIZE_PAGE = 8;
export const DEFAULT_SORT = new Sort("IdDesc", "id", directions.Ascending, "Id (ascending)");
export const DEFAULT_SORT_PRODUCT = new Sort("NameAsc","name", directions.Ascending, "Name (from A to Z)");
export const SORTING_PRODUCTS = [
    DEFAULT_SORT_PRODUCT,
    new Sort("NameDesc", "name", directions.Descending, "Name (from Z to A)"),
    new Sort("PriceAsc", "price", directions.Ascending, "Price (from low to high)"),
    new Sort("PriceDesc", "price", directions.Descending, "Price (from high to low)"),
]

export const DEFAULT_SORT_ORDER = new Sort("DateAsc","date", directions.Ascending, "Date (from earliest to lastest)");
export const SORTING_ORDERS = [
    DEFAULT_SORT_ORDER,
    new Sort("DateDesc", "date", directions.Descending, "Date (from latest to earliest)"),
    new Sort("StatusAsc", "status", directions.Ascending, "Status (from low to high)"),
    new Sort("StatusDesc", "status", directions.Descending, "Status (from high to low)"),
    new Sort("AmountAsc", "amount", directions.Ascending, "Amount (from low to high)"),
    new Sort("AmountDesc", "amount", directions.Descending, "Amount (from high to low)"),
]

export const DEFAULT_SORTING_FOR_TABLES = new Map([["product", DEFAULT_SORT_PRODUCT],
                                            ["order", DEFAULT_SORT_ORDER]]);
export const KINDS_OF_SORTING = new Map([["product", SORTING_PRODUCTS],
                                            ["order", SORTING_ORDERS]])


export const EMPTY_PHOTO = emptyPhoto;

export const FILTER_NAME = new Filter("name", filterTypes.like, "string", "");
export const FILTER_CATEGORY = new Filter("category", filterTypes.in, "string", undefined, undefined, undefined, []);

export const DATA_FOR_PRODUCT_FILTERS = {maxPrice: 0, categories: [""]};
export const DATA_FOR_ORDER_FILTERS = {statuses: [""]};

export interface FILTER_PROPS {
    filter: Filter
    setFilter: Dispatch<SetStateAction<Filter>>
}
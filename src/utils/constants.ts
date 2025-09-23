import {directions} from "./enums/directions.ts";
import emptyPhoto from "../assets/empty-foto.jpg";
import {filterTypes} from "./enums/filterTypes.ts";
import type {Dispatch, SetStateAction} from "react";
import type {NavItem} from "./types";
import Sort from "../features/classes/Sort.ts";
import Filter from "../features/classes/Filter.ts";


export const navItems: NavItem[] = [
    {title: 'Home', path: 'main', adminOnly: false},
    {title: 'About us', path: 'about', adminOnly: false},
    {title: 'Shopping cart', path: 'cart', adminOnly: false, userOnly: true},
    {title: 'My account', path: 'accountDashboard', adminOnly: false},
    {title: 'Store', path: 'store', adminOnly: false},
    {title: 'Products', path: 'products', adminOnly: true},
    {title: 'Admin Dashboard', path: 'admin/dashboard', adminOnly: true},
    {title: 'Clients', path: 'clients', adminOnly: true},
]

// export const BASE_URL = "https://planto-gp2i.onrender.com"
// export const BASE_URL = "http://localhost:8080";

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

export const DEFAULT_SORTING_FOR_TABLES = new Map([["products", DEFAULT_SORT_PRODUCT],
                                            ["orders", DEFAULT_SORT_ORDER]]);
export const KINDS_OF_SORTING = new Map([["products", SORTING_PRODUCTS],
                                            ["orders", SORTING_ORDERS]])

export const EMPTY_PHOTO = emptyPhoto;

export const FILTER_NAME = new Filter("name", filterTypes.like, "string", "");
export const FILTER_CATEGORY = new Filter("category", filterTypes.in, "string", undefined, undefined, undefined, []);
export const FILTER_IN_STOCK = new Filter("quantity", filterTypes.range, "integer",undefined,1, 10000)
export const FILTER_OUT_STOCK = new Filter("quantity", filterTypes.range, "integer",undefined, -1, 0);

export const DATA_FOR_PRODUCT_FILTERS = {maxPrice: 0, categories: [{category: "", count: 0}], inStock: 0, outStock: 0};
export const DATA_FOR_ORDER_FILTERS = {statuses: [""]};

export interface FILTER_PROPS {
    filter: Filter
    setFilter: Dispatch<SetStateAction<Filter>>
}
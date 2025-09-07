import {directions} from "./enums/directions.ts";
import emptyPhoto from "../assets/empty-foto.jpg";
import {filterTypes} from "./enums/filterTypes.ts";
import type {Dispatch, SetStateAction} from "react";
import type {NavItem} from "./types";
import Sort from "../components/clasess/Sort.ts";
import Filter from "../components/clasess/Filter.ts";


export const navItems: NavItem[] = [
    {title: 'Home', path: 'main', adminOnly: false},
    {title: 'About us', path: 'about', adminOnly: false},
    {title: 'Shopping cart', path: 'cart', adminOnly: false, userOnly: true},
    {title: 'My account', path: 'accountDashboard', adminOnly: false},
    {title: 'Store', path: 'store', adminOnly: false},
    {title: 'Products', path: 'products', adminOnly: true},
    {title: 'Admin Dashboard', path: 'admin/dashboard', adminOnly: true},
]

export const BASE_URL = "https://planto-gp2i.onrender.com"
// export const BASE_URL = "http://localhost:8080";

export const SIZE_PAGE = 8;
export const DEFAULT_SORT = new Sort("NameAsc", "name", directions.Ascending, "Name (from A to Z)");
export const paramsOfSorts = [
    DEFAULT_SORT,
    new Sort("NameDesc", "name", directions.Descending, "Name (from Z to A)"),
    new Sort("PriceAsc", "price", directions.Ascending, "Price (from low to high)"),
    new Sort("PriceDesc", "price", directions.Descending, "Price (from high to low)"),
]

export const EMPTY_PHOTO = emptyPhoto;
export const FILTER_NAME = new Filter("name", filterTypes.like, "string", "");
export const FILTER_CATEGORY = new Filter("category", filterTypes.in, "string", undefined, undefined, undefined, []);
export const FILTER_PRICE = new Filter("price", filterTypes.range, "double", undefined, 0, 0);
export const DATA_FOR_FILTERS = {maxPrice: 0, categories: []};

export interface FILTER_PROPS {
    filter: Filter
    setFilter: Dispatch<SetStateAction<Filter>>
}
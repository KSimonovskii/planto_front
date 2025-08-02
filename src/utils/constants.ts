import type {Item} from './types'

import {Home, Package,} from "lucide-react";
import Sort from "../features/classes/Sort.ts";
import {directions} from "./enums/directions.ts";
import emptyPhoto from "../assets/empty-foto.jpg";
import Filter from "../features/classes/Filter.ts";
import {filterTypes} from "./enums/filterTypes.ts";
import type {Dispatch, SetStateAction} from "react";

export const navItems: Item[] = [
    {title: 'Main', path: 'main', icon: Home},
    {title: 'Products', path: 'products', icon: Package}
]

export const SIZE_PAGE = 8;
export const DEFAULT_SORT = new Sort("NameAsc","name", directions.Ascending, "Name (from A to Z)");
export const paramsOfSorts = [
    DEFAULT_SORT,
    new Sort("NameDesc", "name", directions.Descending, "Name (from Z to A)"),
    new Sort("PriceAsc", "price", directions.Ascending, "Price (from low to high)"),
    new Sort("PriceDesc", "price", directions.Descending, "Price (from high to low)"),
]

export const EMPTY_PHOTO = emptyPhoto;

export const FILTER_NAME = new Filter("name", filterTypes.like, "string", "");
export const FILTER_CATEGORY = new Filter("category", filterTypes.in, "string", undefined, undefined, undefined, []);

export const DATA_FOR_FILTERS = {maxPrice: 0, categories: [""]};
export interface FILTER_PROPS {
    filter: Filter
    setFilter: Dispatch<SetStateAction<Filter>>
}
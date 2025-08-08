import Sort from "../classes/Sort.ts";
import {SIZE_PAGE} from "../../utils/constants.ts";
import type Filter from "../classes/Filter.ts";

export const getBodyForQueryGetProducts = (page: number, sort?: Sort, filters?: Filter[]) => {

    const withFilters = filters && filters.length > 0;

    const URL = import.meta.env.VITE_BASE_PRODUCT_URL;

    if (!URL){
        throw new Error("URL not found in the settings!");
    }

    if (sort == undefined) {
        sort = new Sort("NameAsc", "name", 1, "Name (from A to Z)");
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const criteria = [];
    if (withFilters) {
        for (let i = 0; i < filters.length; i++) {
            criteria.push(filters[i].getFilterDto());
        }
    }

    return JSON.stringify({
        page: page - 1,
        size: SIZE_PAGE,
        field: sort.field,
        direction: sort.direction,
        criteria: criteria
    })
}
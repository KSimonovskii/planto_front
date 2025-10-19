import Sort from "../classes/Sort.ts";
import {DEFAULT_SORT, DEFAULT_SORTING_FOR_TABLES, SIZE_PAGE} from "../../utils/constants.ts";
import type Filter from "../classes/Filter.ts";
import type {dataTypes} from "../../utils/enums/dataTypes.ts";

export const getBodyForQueryGetTable = (typeData: dataTypes, page: number, sort?: Sort, filters?: Filter[]) => {

    const withFilters = filters && filters.length > 0;

    const URL = `${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_BASE_PRODUCT_ENDPOINT}`;

    if (!URL){
        throw new Error("URL not found in the settings!");
    }

    if (sort == undefined) {
        sort = getSortByDefault(typeData);
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const criteria = [];
    if (withFilters) {
        for (let i = 0; i < filters.length; i++) {
            criteria.push(filters[i].getFilterDto());
        }
    }

    return {
        page: page - 1,
        size: SIZE_PAGE,
        field: sort.field,
        direction: sort.direction,
        criteria: criteria
    }

}

export const getSortByDefault = (typeData : dataTypes) : Sort => {
    const sorting = DEFAULT_SORTING_FOR_TABLES.get(typeData);
    if (!sorting){
        return DEFAULT_SORT;
    }
    return sorting;
}
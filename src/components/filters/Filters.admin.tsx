import {useContext, useState} from "react";
import {PageProductContext} from "../../utils/context.ts";
import {FILTER_CATEGORY} from "../../utils/constants.ts";
import FilterPrice from "./FilterPrice.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getToInitialState} from "../../features/slices/priceRangeSlice.ts";
import Filter from "../../features/classes/Filter.ts";
import {filterTypes} from "../../utils/enums/filterTypes.ts";
import {useGetDataForFiltersQuery} from "../../features/api/productApi.ts";
import {getToInitialTableStates} from "../../features/slices/tableStatesSlice.ts";

export const FiltersAdmin = () => {

    const {filters, setPage} = useContext(PageProductContext);

    const [filterCategory, setFilterCategory] = useState(FILTER_CATEGORY);

    const priceValue = useAppSelector(state => state.filterPrice);
    const filterPrice = new Filter("price", filterTypes.range, "double",undefined, priceValue.valueFrom, priceValue.valueTo)
    const dispatch = useAppDispatch();

    const {data = {price: 0, categories: []}} = useGetDataForFiltersQuery("");

    const handlerAcceptFilters = () => {

        if (filterPrice.valueFrom != 0 && filterPrice.valueTo != data.price) {
            filterPrice.isChanged = true;
        }

        const currFilters = [filterCategory, filterPrice];
        const newFilters = filters.slice();

        currFilters.forEach((filter) => {

            const index = newFilters.findIndex((f) => f.field.toLowerCase() == filter.field);

            let action = "";
            if (index >= 0 && filter.isChanged) {
                if (filter.field == "category") {
                    action = filter.valueList.length > 0 ? "add" : "remove";
                } else if (filter.field == "price") {
                    action = "add";
                }
                if (action == "add") {
                    newFilters[index] = filter;
                } else {
                    newFilters.splice(index, 1);
                }
            } else if (filter.isChanged) {
                newFilters.push(filter);
            } else if (index >= 0) {
                newFilters.splice(index, 1);
            }
        })
        dispatch(getToInitialTableStates({tableName: "products"}));
        setPage((prevState) => ({...prevState, filters: newFilters}))

    }

    function handlerResetFilters() {

        const fields = ["category", "price"];
        const newFilter = filters.slice();

        for (let i = 0; i < fields.length; i++) {
            const index = newFilter.findIndex((filter) => filter.field === fields[i]);
            if (index >= 0) {
                newFilter.splice(index, 1);
            }
        }

        setFilterCategory(FILTER_CATEGORY.getCopy({...FILTER_CATEGORY}));
        dispatch(getToInitialTableStates({tableName: "products"}));
        dispatch(getToInitialState());
        setPage((prevState) => ({...prevState, filters: newFilter}))
    }

    return (
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">

            <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                <FilterPrice/>
            </div>

            <div className="flex items-center gap-2 mt-4 md:mt-0">
                <button
                    className="px-6 py-2 rounded-lg bg-lime-600 hover:bg-lime-800 text-white font-medium transition"
                    onClick={handlerAcceptFilters}
                >
                    Accept
                </button>
                <button
                    className="px-6 py-2 rounded-lg bg-gray-400 hover:bg-gray-500 text-white font-medium transition"
                    onClick={handlerResetFilters}
                >
                    Reset
                </button>
            </div>
        </div>
    )
}

import {useContext, useState} from "react";
import {PageContext} from "../../utils/context.ts";
import {DATA_FOR_FILTERS, FILTER_CATEGORY} from "../../utils/constants.ts";
import FilterPrice from "./FilterPrice.tsx";
import FilterCategory from "./FilterCategory.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getToInitialState} from "../../features/slices/priceRangeSlice.ts";
import Filter from "../../features/classes/Filter.ts";
import {filterTypes} from "../../utils/enums/filterTypes.ts";

export const Filters = () => {

    const {filters, setPage} = useContext(PageContext);

    const [filterCategory, setFilterCategory] = useState(FILTER_CATEGORY);

    const priceValue = useAppSelector(state => state.filterPrice);
    const filterPrice = new Filter("price", filterTypes.range, "double",undefined, priceValue.valueFrom, priceValue.valueTo)
    const dispatch = useAppDispatch();

    const handlerAcceptFilters = () => {

        if (filterPrice.valueFrom != 0 && filterPrice.valueTo != DATA_FOR_FILTERS.maxPrice) {
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
        setPage((prevState) => ({...prevState, filters: newFilters}))
    }

    const handlerResetFilters = () => {

        const fields = ["category", "price"];
        const newFilter = filters.slice();

        for (let i = 0; i < fields.length; i++) {
            const index = newFilter.findIndex((filter) => filter.field === fields[i]);
            if (index >= 0) {
                newFilter.splice(index, 1);
            }
        }

        setFilterCategory(FILTER_CATEGORY.getCopy({...FILTER_CATEGORY}));
        dispatch(getToInitialState());
        setPage((prevState) => ({...prevState, filters: newFilter}))
    }

    return (
        <>
            <div className={"flex flex-row items-start py-2 px-2 mr-8 space-x-3 border-base-form border-1 rounded-md justify-start"}>
                <FilterCategory filter={filterCategory} setFilter={setFilterCategory}/>
                <div className={"flex flex-row items-start space-x-2"}>
                    <p className={"block text-base-text mt-2"}>Filter by price:</p>
                    <FilterPrice/>
                </div>
                <div className={"flex flex-row space-x-1"}>
                    <button className={"button w-20 px-2.5 pb-2.5 mt-2 h-8"} onClick={handlerAcceptFilters}>Accept</button>
                    <button className={"button w-20 px-2.5 pb-2.5 mt-2 h-8"} onClick={handlerResetFilters}>Reset</button>
                </div>
            </div>
        </>
    )
}
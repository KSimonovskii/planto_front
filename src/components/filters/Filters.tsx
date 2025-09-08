import {useContext, useState} from "react";
import {FILTER_CATEGORY, FILTER_PRICE} from "../../utils/constants.ts";
import FilterPrice from "./FilterPrice.tsx";
import FilterCategory from "./FilterCategory.tsx";
import {PageContext} from "../../utils/Context.ts";

export const Filters = () => {

    const {filters, setPage} = useContext(PageContext);

    const [filterCategory, setFilterCategory] = useState(FILTER_CATEGORY);
    const [filterPrice, setFilterPrice] = useState(FILTER_PRICE);

    const handlerAcceptFilters = () => {
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

        for (let i = 0; i < fields.length; i++) {
            const index = filters.findIndex((filter) => filter.field == fields[i]);

            if (index >= 0) {
                filters.splice(index, 1);
            }
        }

        setFilterCategory(FILTER_CATEGORY.getCopy({...FILTER_CATEGORY}));
        setFilterPrice(FILTER_PRICE.getCopy({...FILTER_PRICE}));
        setPage((prevState) => ({...prevState, filters: filters.slice()}))
    }

    return (
        <>
            <div className={"flex flex-row items-start py-2 space-x-3 border-base-form border-1 rounded-md mr-8 justify-start px-2"}>
                <FilterCategory filter={filterCategory} setFilter={setFilterCategory}/>
                <div className={"flex flex-row items-start space-x-2"}>
                    <p className={"block text-base-text mt-2"}>Filter by price:</p>
                    <FilterPrice filter={filterPrice} setFilter={setFilterPrice}/>
                </div>
                <div className={"flex flex-row space-x-1"}>
                    <button className={"button w-20 px-2.5 pb-2.5 mt-2 h-8"} onClick={handlerAcceptFilters}>Accept</button>
                    <button className={"button w-20 px-2.5 pb-2.5 mt-2 h-8"} onClick={handlerResetFilters}>Reset</button>
                </div>
            </div>
        </>
    )
}
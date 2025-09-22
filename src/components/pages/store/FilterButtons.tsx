import {useContext} from "react";
import {PageProductContext} from "../../../utils/context.ts";
import {
    DATA_FOR_PRODUCT_FILTERS,
    FILTER_CATEGORY,
    FILTER_IN_STOCK,
    FILTER_OUT_STOCK
} from "../../../utils/constants.ts";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import Filter from "../../../features/classes/Filter.ts";
import {filterTypes} from "../../../utils/enums/filterTypes.ts";
import {getToInitialState} from "../../../features/slices/priceRangeSlice.ts";
import {clearCategoriesFilter} from "../../../features/slices/filterCategorySlice.ts";
import {useClose} from "@headlessui/react";

const FilterButtons = () => {

    const close = useClose();

    const dispatch = useAppDispatch();
    const {filters, setPage} = useContext(PageProductContext);
    const {categories} = useAppSelector(state => state.filterCategorySlice);

    const priceValue = useAppSelector(state => state.filterPrice);
    const filterPrice = new Filter("price", filterTypes.range, "double", undefined, priceValue.valueFrom, priceValue.valueTo)
    filterPrice.isChanged = (priceValue.valueFrom > 0 || priceValue.valueTo < DATA_FOR_PRODUCT_FILTERS.maxPrice);

    function getFilterCategory(): Filter {

        if (categories.length === 0) {
            return FILTER_CATEGORY;
        }

        const filterFind = filters.filter((filter) => filter.field ==="category");

        if (filterFind.length === 0) {
            return FILTER_CATEGORY.getCopy({valueList: categories});
        } else {
            const filterTmp = filterFind[0];

            if (filterTmp.valueList.length != categories.length) {
                return filterTmp.getCopy({valueList: categories});
            }
            const changeFilter = categories.some((category) => (filterTmp.valueList.indexOf(category) < 0));
            if (changeFilter) {
                return filterTmp.getCopy({valueList: categories});
            }
        }
        return filterFind[0];

    }

    const handlerAcceptFilters = () => {

        if (filterPrice.valueFrom != 0 && filterPrice.valueTo != DATA_FOR_PRODUCT_FILTERS.maxPrice) {
            filterPrice.isChanged = true;
        }

        const currFilters = [getFilterCategory(), filterPrice, FILTER_IN_STOCK, FILTER_OUT_STOCK];
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
        setPage((prevState) => ({...prevState, filters: newFilters}));
        close();
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

        dispatch(getToInitialState());
        dispatch(clearCategoriesFilter());
        FILTER_OUT_STOCK.isChanged = false;
        FILTER_IN_STOCK.isChanged = false;
        setPage((prevState) => ({...prevState, filters: newFilter}));
        close();
    }

    return (
        <div className={"flex flex-row space-x-1"}>
            <div data-property-1="Green"
                 className="px-6 py-3 bg-neutral-900 rounded-lg inline-flex justify-center items-center gap-2 overflow-hidden">
                <button className={"text-white text-base font-medium font-['Rubik'] leading-normal"}
                        onClick={handlerAcceptFilters}>Filter
                </button>
            </div>
            <div data-property-1="Green"
                 className="px-6 py-3 bg-neutral-900 rounded-lg inline-flex justify-center items-center gap-2 overflow-hidden">
                <button className={"text-white text-base font-medium font-['Rubik'] leading-normal"}
                        onClick={handlerResetFilters}>Reset
                </button>
            </div>
        </div>
    );
};

export default FilterButtons;
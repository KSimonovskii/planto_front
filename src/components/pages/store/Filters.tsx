import {Popover, PopoverButton, PopoverPanel} from "@headlessui/react";
import {ChevronDownIcon} from "lucide-react";
import FilterElement from "./FilterElement.tsx";
import FilterPrice from "../../filters/FilterPrice.tsx";
import {useGetDataForFiltersQuery} from "../../../features/api/productApi.ts";
import FilterButtons from "./FilterButtons.tsx";
import {FILTER_IN_STOCK, FILTER_OUT_STOCK} from "../../../utils/constants.ts";
import {useAppDispatch} from "../../../app/hooks.ts";
import {changeCategoriesFilter} from "../../../features/slices/filterCategorySlice.ts";

const Filters = () => {

    const dispatch = useAppDispatch();

    const {data = {price: 0, categories: [], inStock: 0, outStock: 0}} = useGetDataForFiltersQuery("");

    const filterDataStock = [
        {
            title: "In stock",
            count: data.inStock,
            handleClick: (isChecked: boolean) => {
                FILTER_IN_STOCK.isChanged = isChecked;
            }
        },
        {
            title: "Out of stock",
            count: data.outStock,
            handleClick: (isChecked: boolean) => {
                FILTER_OUT_STOCK.isChanged = isChecked;
            }
        }
    ]

    const filterDataCategory = data.categories.map(category => ({
        title: category.category,
        count: category.count,
        handleClick: (isChecked: boolean, category: string|undefined) => {
            if (category) {
                dispatch(changeCategoriesFilter({category, isRemove: !isChecked}))
            }
        }
    }));

    return (
        <Popover className="group">
            <PopoverButton
                className={"inline-flex justify-start items-center gap-2"}>
                <div className="justify-start text-lime-800 text-base font-bold font-['Rubik']">
                    Filters
                </div>
                <ChevronDownIcon className="size-5 group-data-open:rotate-180" />
            </PopoverButton>
            <PopoverPanel
                transition
                anchor="bottom"
                className="w-64 h-[842px] py-2 ml-2 left-0 top-[35px] absolute bg-white rounded-[5px] inline-flex justify-start items-center-safe gap-2.5">
                <div className="w-64 h-[789px] inline-flex flex-col justify-start items-start gap-6">
                    <FilterElement filterData={filterDataStock}/>
                    <FilterElement filterData={filterDataCategory}/>
                    <FilterPrice/>
                    <FilterButtons/>
                </div>
            </PopoverPanel>
        </Popover>
    );
};

export default Filters;
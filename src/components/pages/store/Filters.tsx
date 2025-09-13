import {Popover, PopoverButton, PopoverPanel} from "@headlessui/react";
import {ChevronDownIcon} from "lucide-react";
import FilterElement from "./FilterElement.tsx";
import FilterPrice from "../../filters/FilterPrice.tsx";
import {useGetDataForFiltersQuery} from "../../../features/api/productApi.ts";

const Filters = () => {

    const filterDataStock = [
        {title: "In stock", count: 23},
        {title: "Out of stock", count: 11}
    ]

    const {data = {price: 0, categories: []}} = useGetDataForFiltersQuery("");

    const filterDataCategory = data.categories.map(category => ({
        title: category,
        count: Math.round(Math.random(0, 1) * 100)
    }));

    return (
        <Popover className="group">
            <PopoverButton className={"inline-flex justify-start items-center gap-2"}>
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
                </div>
            </PopoverPanel>
        </Popover>
    );
};

export default Filters;
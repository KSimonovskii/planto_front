import {DATA_FOR_FILTERS, type FILTER_PROPS} from "../../utils/constants.ts";
import {Listbox, ListboxButton, ListboxOption, ListboxOptions} from "@headlessui/react";
import type {filterValueType} from "../../features/classes/Filter.ts";
import {CheckIcon} from "lucide-react";

const FilterCategory = ({filter, setFilter}: FILTER_PROPS) => {

    const handlerSelectCategory = (value: filterValueType[]) => {
        setFilter((prevState) => prevState.getCopy({valueList: value}));
    }

    return (
        <div className={"flex space-x-1 w-4/6"}>
            <label className={"text-base-text py-2"} htmlFor={"categoryFilter"}>
                Filter by category:
            </label>
            <Listbox
                value={filter.valueList}
                onChange={(value) => handlerSelectCategory(value)}
                multiple={true}>
                <ListboxButton id={"categoryFilter"} className={"text-base-text flex flex-wrap py-2"}>{filter.valueList.length == 0?
                    <label className={"text-base-text px-2 mx-1 border-2 rounded-md"}>
                        All categories
                    </label> :
                    filter.valueList.map(category => (
                        <label className={"text-base-text px-2 mx-1 border-2 rounded-md"}>
                            {category}
                        </label>
                    ))}
                </ListboxButton>
                <ListboxOptions anchor = "bottom start" className={"border-1 rounded-xl border-base-form bg-base-bg p-2"}>
                    {DATA_FOR_FILTERS.categories.map(category => (
                        <ListboxOption value={category} key={category} className={"group flex text-base-text cursor-pointer"}>
                            <CheckIcon className={"invisible size-5 group-data-selected:visible"}/>
                            {category}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Listbox>
        </div>

    )
}

export default FilterCategory;
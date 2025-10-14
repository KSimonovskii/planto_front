import {DATA_FOR_PRODUCT_FILTERS, type FILTER_PROPS} from "../../utils/constants.ts";
import {Listbox, ListboxButton, ListboxOption, ListboxOptions} from "@headlessui/react";
import type {filterValueType} from "../../features/classes/Filter.ts";
import {CheckIcon} from "lucide-react";
import type {CategoryFilterItem} from "../../utils/types";

const FilterCategory = ({filter, setFilter}: FILTER_PROPS) => {

    const handlerSelectCategory = (value: filterValueType[]) => {
        setFilter((prevState) => prevState.getCopy({valueList: value}));
    }

    const deleteValue = (category: filterValueType) => {
        const newValueList = filter.valueList.filter(value => value !== category);
        setFilter((prevState) => prevState.getCopy({valueList: newValueList}));
    }

    const categories: CategoryFilterItem[] = DATA_FOR_PRODUCT_FILTERS.categories as CategoryFilterItem[];
    const categoryNames: filterValueType[] = categories.map(item => item.category);


    return (
        <div className={"flex space-x-1 w-4/6"}>
            <label className={"text-base-text py-2"} htmlFor={"categoryFilter"}>
                Filter by category:
            </label>
            <Listbox
                value={filter.valueList}
                onChange={(value) => handlerSelectCategory(value)}
                multiple={true}>
                <ListboxButton
                    id={"categoryFilter"}
                    className={"text-base-text flex flex-wrap py-2"}>{filter.valueList.length == 0?
                    <label className={"text-base-text px-2 mx-1 border-2 rounded-md"}>
                        All categories
                    </label> :
                    filter.valueList.map(category => (
                        <label
                            key={category}
                            className={"text-base-text px-2 mx-1 border-2 rounded-md cursor-pointer"}
                            onClick={() => deleteValue(category)}>
                            {category}
                        </label>
                    ))}
                </ListboxButton>
                <ListboxOptions
                    anchor = "bottom start"
                    className={"border-1 rounded-xl border-base-form bg-base-bg p-2"}>

                    {categoryNames.map(i => (
                        <ListboxOption
                            value={i}
                            key={i}
                            className={"group flex text-base-text cursor-pointer"}>
                            <CheckIcon className={"invisible size-5 group-data-selected:visible"}/>
                            {i}
                        </ListboxOption>
                    ))}

                    {/*{DATA_FOR_PRODUCT_FILTERS.categories.map(category => (*/}
                    {/*    <ListboxOption value={category} key={category} className={"group flex text-base-text cursor-pointer"}>*/}
                    {/*        <CheckIcon className={"invisible size-5 group-data-selected:visible"}/>*/}
                    {/*        {category}*/}
                    {/*    </ListboxOption>*/}
                    {/*))}*/}

                </ListboxOptions>
            </Listbox>
        </div>

    )
}

export default FilterCategory;
import {useState} from "react";
import {DATA_FOR_FILTERS} from "../../utils/constants.ts";
import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
    Field,
} from "@headlessui/react";
import {CheckIcon, ChevronDownIcon} from "lucide-react";

interface PropsCategoryBox {
    category: string,
    setCategory: (value: string) => void,
    twClass: string
}

const CategoryBox = ({category, setCategory, twClass}: PropsCategoryBox) => {
    const [query, setQuery] = useState("");

    const categories = DATA_FOR_FILTERS.categories;

    const filtered = query === "" ? [] : categories.filter(category => category.toLowerCase().includes(query.toLowerCase()));

    return (
        <Field className={"flex items-center w-full"}>
            <label className={"label mr-2.5"}>Category:</label>
            <Combobox
                value={category}
                onChange={setCategory}
                onClose={() => setQuery("")}>
                <div className={"relative w-full"}>
                    <ComboboxInput
                        className={`${twClass} w-full focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25`}
                        displayValue={(category : string) => category}
                        onChange={(e) => setQuery(e.target.value)}>
                    </ComboboxInput>
                    <ComboboxButton className={"group absolute inset-y-0 right-0 px-2.5"}>
                        <ChevronDownIcon className={"size-4 fill-base-form/10 group-data-hover:fill-white"}/>
                    </ComboboxButton>
                </div>

                <ComboboxOptions
                    anchor={"bottom start"}
                    transition={true}
                    className={"border-1 rounded-xl border-base-form bg-base-bg p-2 [--anchor-gap:--spacing(1)] empty:invisible transition duration-100 ease-in data-leave:data-closed:opacity-0"}>
                    {filtered.length === 0 && (
                        <ComboboxOption value={query} className={"data-focus:bg-base-form/10"}>
                            Create <span className={"font-bold"}>"{query}"</span>
                        </ComboboxOption>
                    )}
                    {filtered.map(category => (
                        <ComboboxOption
                            key={category}
                            value={category}
                            className={"group flex text-base-text cursor-default select-none data-focus:bg-base-form/10"}>
                            <CheckIcon className={"invisible size-5 fill-white group-data-selected:visible"}/>
                            <div className={"text-base-form"}>{category}</div>
                        </ComboboxOption>
                        ))}
                </ComboboxOptions>
            </Combobox>
        </Field>
    )
}

export default CategoryBox
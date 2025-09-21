import {Checkbox, Description, Field, Label} from "@headlessui/react";
import {useState} from "react";
import {useAppSelector} from "../../../app/hooks.ts";
import {FILTER_IN_STOCK, FILTER_OUT_STOCK} from "../../../utils/constants.ts";

interface Props {
    title: string
    count: number
    handleClick: (title: string, value: boolean)=> (void)
}
const FilterCheckbox = ({title, count, handleClick}: Props) => {

    const {categories} = useAppSelector(state => state.filterCategorySlice);

    let initialState = false;
    if (title === "In stock") {
        initialState = FILTER_IN_STOCK.isChanged;
    } else if (title === "Out of stock") {
        initialState = FILTER_OUT_STOCK.isChanged
    } else {
        initialState = categories.indexOf(title) >= 0;
    }

    const [checked, setEnabled] = useState(initialState);

    const onChangeHandle = (title: string, value: boolean) => {
        handleClick(title, value);
        setEnabled(value);
    }

    return (
        <Field className={"self-stretch inline-flex justify-start items-center gap-3.5"}>
            <Checkbox
                checked={checked}
                onChange={(checked) => onChangeHandle(title, checked)}
                className="group block size-5 rounded-[3px] border border-zinc-300 bg-white data-checked:bg-black">
                <svg className="stroke-white opacity-0 group-data-checked:opacity-100" viewBox="0 0 14 14" fill="none">
                    <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </Checkbox>
            <Label className="w-32 justify-start text-zinc-600 text-sm font-normal font-['Poppins'] leading-tight">{title}</Label>
            <Description className="w-9 text-right justify-start text-neutral-400 text-xs font-normal font-['Poppins'] leading-none">{count}</Description>
        </Field>
    );
};

export default FilterCheckbox;
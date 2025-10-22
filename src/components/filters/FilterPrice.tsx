import {DATA_FOR_PRODUCT_FILTERS} from "../../utils/constants.ts";
import PriceSlider from "./PriceSlider.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {changePriceRange} from "../../features/slices/priceRangeSlice.ts";


const FilterPrice = () => {

    const dispatch = useAppDispatch();
    const priceRange = useAppSelector(state => state.filterPrice);

    const handlerChangePrice = (field: HTMLInputElement, value: string) => {
        dispatch(changePriceRange({
            fieldName: field.id,
            value: Number.parseFloat(value)
            }));
    }

    return (
        <div className="w-60 px-4 flex flex-col justify-start items-start gap-4">
            <div
                className="self-stretch h-5 justify-start text-sm font-semibold font-['Rubik'] text-lime-800 uppercase leading-tight tracking-wide">Filter Price
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-3.5">
                <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                    <div className="w-20 h-10 relative">
                        <div className="w-20 h-10 left-0 top-0 absolute bg-white rounded-[5px] border border-zinc-300"/>
                        <input
                            type={"number"}
                            className={"top-[10px] ml-2 w-16 absolute justify-center text-sm font-normal font-['Rubik'] text-lime-800 leading-tight"}
                            id={"priceFrom"}
                            placeholder={" "}
                            min={0}
                            max={DATA_FOR_PRODUCT_FILTERS.maxPrice}
                            step={"0.01"}
                            value={priceRange.valueFrom ? priceRange.valueFrom : 0}
                            onChange={(e) => handlerChangePrice(e.target, e.target.value)}/>

                    </div>
                <div className="w-5 h-5 relative">
                    <div className="w-3.5 h-0.5 left-[3px] top-[9px] absolute bg-stone-300 rounded-[1px]"/>
                </div>
                <div className="w-20 h-10 relative">
                    <div className="w-20 h-10 left-0 top-0 absolute bg-white rounded-[5px] border border-zinc-300"/>
                    <input
                        type={"number"}
                        className={"top-[10px] absolute justify-center ml-2 w-16 text-sm font-normal font-['Rubik'] text-lime-800 leading-tight"}
                        id={"priceTo"}
                        placeholder={" "}
                        min={0}
                        max={DATA_FOR_PRODUCT_FILTERS.maxPrice}
                        step={"0.01"}
                        value={!priceRange.valueTo || priceRange.valueTo == 0? DATA_FOR_PRODUCT_FILTERS.maxPrice : priceRange.valueTo}
                        onChange={(e) => handlerChangePrice(e.target, e.target.value)}/>
                </div>
                </div>
            </div>
            <PriceSlider/>
            <div className="self-stretch h-px relative">
                <div className="w-60 h-px left-0 top-0 absolute">
                    <div className="w-60 h-px left-0 top-0 absolute bg-zinc-300"/>
                </div>
            </div>
        </div>
    )
}

export default FilterPrice
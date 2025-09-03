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
        <div className={"flex flex-col space-y-2"}>
            <div className={"flex flex-row items-center"}>
                <div className={"relative h-10"}>
                    <label className={"text-base-text text-xs absolute bg-base-bg z-10 ml-2 px-1"}>
                        from:
                    </label>
                    <input
                        type={"number"}
                        className={"inputFieldTable w-28 px-2.5 pb-2.5 mt-2 pt-4 h-8"}
                        id={"priceFrom"}
                        placeholder={" "}
                        min={0}
                        max={DATA_FOR_PRODUCT_FILTERS.maxPrice}
                        step={"0.01"}
                        value={priceRange.valueFrom ? priceRange.valueFrom : 0}
                        onChange={(e) => handlerChangePrice(e.target, e.target.value)}/>
                </div>
                <p>-</p>
                <div>
                    <label className={"text-base-text text-xs absolute bg-base-bg z-10 ml-2 px-1"}>
                        to:
                    </label>
                    <input
                        type={"number"}
                        className={"inputFieldTable w-28 px-2.5 pb-2.5 mt-2 pt-4 h-8"}
                        id={"priceTo"}
                        placeholder={" "}
                        min={0}
                        max={DATA_FOR_PRODUCT_FILTERS.maxPrice}
                        step={"0.01"}
                        value={!priceRange.valueTo || priceRange.valueTo == 0? DATA_FOR_PRODUCT_FILTERS.maxPrice : priceRange.valueTo}
                        onChange={(e) => handlerChangePrice(e.target, e.target.value)}/>
                </div>
            </div>
            <div>
                <PriceSlider/>
            </div>
        </div>
    )
}

export default FilterPrice
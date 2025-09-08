import {DATA_FOR_FILTERS, type FILTER_PROPS} from "../../utils/constants.ts";
import PriceSlider from "./PriceSlider.tsx";


const FilterPrice = (props: FILTER_PROPS) => {

    const handlerChangePrice = (field: HTMLInputElement, value: string) => {
        changeFilterPrice(field.id, Number.parseInt(value));
    }

    const changeFilterPrice = (fieldName: string, value: number) => {
        if (fieldName === "priceFrom") {
            props.setFilter((prevState) => prevState.getCopy({valueFrom:value}));
        } else if (fieldName === "priceTo") {
            props.setFilter((prevState) => prevState.getCopy({valueTo:value}));
        }
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
                        max={DATA_FOR_FILTERS.maxPrice}
                        value={props.filter.valueFrom ? props.filter.valueFrom : 0}
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
                        max={DATA_FOR_FILTERS.maxPrice}
                        value={!props.filter.valueTo || props.filter.valueTo == 0? DATA_FOR_FILTERS.maxPrice : props.filter.valueTo}
                        onChange={(e) => handlerChangePrice(e.target, e.target.value)}/>
                </div>
            </div>
            {/*TODO add slider with 2 ranges for prices*/}
            <div>
                <PriceSlider
                    handlerChangeFilter = {changeFilterPrice}
                    valueFrom={props.filter.valueFrom!}
                    valueTo={!props.filter.valueTo || props.filter.valueTo == 0? DATA_FOR_FILTERS.maxPrice : props.filter.valueTo}/>
            </div>
        </div>
    )
}

export default FilterPrice
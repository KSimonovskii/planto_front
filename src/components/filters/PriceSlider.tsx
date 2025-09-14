import {useState} from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {DATA_FOR_PRODUCT_FILTERS} from "../../utils/constants.ts";
import {useDispatch} from "react-redux";
import {changePriceRange} from "../../features/slices/priceRangeSlice.ts";
import {useAppSelector} from "../../app/hooks.ts";

const PriceSlider = () => {
    const dispatch = useDispatch();
    const priceRange = useAppSelector(state => state.filterPrice);
    const [values, setValues] = useState([priceRange.valueFrom, priceRange.valueTo == 0? DATA_FOR_PRODUCT_FILTERS.maxPrice : priceRange.valueTo]);

    const handleChange = (input: number|number[]) => {
        if (input instanceof Array) {

            if (input[0] != values[0]){
                dispatch(changePriceRange({
                    fieldName: "priceFrom",
                    value: values[0]
                }));
            }

            if (input[1] != values[1]){
                dispatch(changePriceRange({
                    fieldName: "priceTo",
                    value: values[1]
                }));
            }
            setValues(input);
        }

    }

    return (
        <>
            <Slider range
                id={"price-slider"}
                min={0}
                max={DATA_FOR_PRODUCT_FILTERS.maxPrice}
                value={[priceRange.valueFrom, priceRange.valueTo == 0? DATA_FOR_PRODUCT_FILTERS.maxPrice : priceRange.valueTo]}
                step={0.01}
                onChange={(value) => handleChange(value)}
            styles={{
                rail: {
                    paddingLeft: -6,
                    paddingRight: -6,
                    background: '#d4d4d8'
                },
                track: {
                    background: '#171717'
                },
                handle: {
                    background: '#171717',
                    borderColor: '#171717',
                }
            }}/>
        </>
    )
}

export default PriceSlider
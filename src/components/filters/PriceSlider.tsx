import {useState} from "react";
import 'rc-slider/assets/index.css';
import {DATA_FOR_FILTERS} from "../../utils/constants.ts";
import Slider from "rc-slider";


interface PropsSlider{
    handlerChangeFilter: (a: string, b: number) => void
    valueFrom: number
    valueTo: number
}

const PriceSlider = (props: PropsSlider) => {
    const [values, setValues] = useState([props.valueFrom, props.valueTo]);

    const handleChange = (input: number|number[]) => {
        if (input instanceof Array) {

            if (input[0] != values[0]){
                props.handlerChangeFilter("priceFrom", values[0]);
            }

            if (input[1] != values[1]){
                props.handlerChangeFilter("priceTo", values[1]);
            }
            setValues(input);
        }

    }

    return (
        <>
            <Slider range
                id={"price-slider"}
                min={0}
                max={DATA_FOR_FILTERS.maxPrice}
                value={[props.valueFrom, props.valueTo]}
                step={0.01}
                onChange={(value) => handleChange(value)}
            styles={{
                rail: {
                    background: '#405443'
                },
                track: {
                    background: '#cd663d'
                },
                handle: {
                    background: '#57805b',
                    borderColor: '#cd663d',
                }
            }}/>
        </>
    )
}

export default PriceSlider
import type {PayloadAction} from "@reduxjs/toolkit";

import {createSlice} from '@reduxjs/toolkit'
import {DATA_FOR_FILTERS} from "../../utils/constants.ts";

interface changePricePayload {
    fieldName: string,
    value: number
}

const filterPriceSlice = createSlice({
    name: "filterPrice",
    initialState: {
        valueFrom: 0,
        valueTo: DATA_FOR_FILTERS.maxPrice
    },
    reducers: {
        changePriceRange: (state, action: PayloadAction<changePricePayload>) => {
            if (action.payload.fieldName === "priceFrom") {
                state.valueFrom = action.payload.value;
            } else if (action.payload.fieldName === "priceTo") {
                state.valueTo = action.payload.value;
            }
        },
        getToInitialState: (state) => {
           state.valueFrom = 0;
           state.valueTo = DATA_FOR_FILTERS.maxPrice;
        }
    }
})

export const {changePriceRange, getToInitialState} = filterPriceSlice.actions;
export default filterPriceSlice.reducer
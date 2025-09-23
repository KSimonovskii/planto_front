import {createSlice} from "@reduxjs/toolkit";

interface FilterStockSlice {
    type: number,
    value: number | null,
    valueFrom: number | null,
    valueTo: number | null
}

const initialState : FilterStockSlice  = {
    type: -1,
    value: null,
    valueFrom: null,
    valueTo: null
}

const filterStockSlice = createSlice({
    name: "filterStock",
    initialState: initialState,
    reducers: {
        setFilterInStock(state ) {
            state.type = 2;
            state.value = null;
            state.valueFrom = 0;
            state.valueTo = Number.MAX_SAFE_INTEGER;
        },
        setFilterOutStock(state) {
            state.type = 0;
            state.value = 0;
            state.valueFrom = null;
            state.valueTo = null;
        },
        resetFilterStock(state) {
            state.type = -1;
            state.value = null;
            state.valueFrom = null;
            state.valueTo = null;
        }
    }
})

export const {setFilterInStock, setFilterOutStock, resetFilterStock} = filterStockSlice.actions;
export default filterStockSlice.reducer

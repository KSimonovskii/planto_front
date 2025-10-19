import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

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

interface FilterStockAction {
    value: boolean;
}

function applyInitialState(state: FilterStockSlice)  {
    state.type = -1;
    state.value = null;
    state.valueFrom = null;
    state.valueTo = null;
}

const filterStockSlice = createSlice({
    name: "filterStock",
    initialState: initialState,
    reducers: {
        setFilterInStock(state, action: PayloadAction<FilterStockAction> ) {
            if (action.payload.value) {
                state.type = 2;
                state.value = null;
                state.valueFrom = 0;
                state.valueTo = null;
            } else if (state.type != 0) {
                applyInitialState(state);
            }
        },
        setFilterOutStock(state, action: PayloadAction<FilterStockAction>) {
            if (action.payload.value) {
                state.type = 0;
                state.value = 0;
                state.valueFrom = null;
                state.valueTo = null;
            } else if (state.type != 2) { //if not selected option In stock
                applyInitialState(state);
            }

        },
        resetFilterStock(state) {
           applyInitialState(state);
        }
    }
})

export const {setFilterInStock, setFilterOutStock, resetFilterStock} = filterStockSlice.actions;
export default filterStockSlice.reducer

import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";

interface changeFilterPayload {
    category: string;
    isRemove: boolean;
}

const filterCategorySlice = createSlice({
    name: "filterCategory",
    initialState: {
        categories: []
    },
    reducers: {
        changeCategoriesFilter: (state, action: PayloadAction<changeFilterPayload>) => {
            const i = state.indexOf(action.payload.category);
            if (action.payload.isRemove) {
                if (i >= 0) {
                    state.splice(i, 1);
                }
            } else if (i === 0) {
                state.push(action.payload.category);
            }
        }
    }
})

export const {changeCategoriesFilter} = filterCategorySlice.actions;
export default filterCategorySlice.reducer
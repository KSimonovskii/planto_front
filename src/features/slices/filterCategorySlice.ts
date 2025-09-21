import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";

interface changeFilterPayload {
    category: string;
    isRemove: boolean;
}

const filterCategorySlice = createSlice({
    name: "filterCategorySlice",
    initialState: {
        categories: new Array<string>
    },
    reducers: {
        changeCategoriesFilter: (state, action: PayloadAction<changeFilterPayload>) => {
            const i = state.categories.indexOf(action.payload.category);
            if (action.payload.isRemove) {
                if (i >= 0) {
                    state.categories.splice(i, 1);
                }
            } else if (i < 0) {
                state.categories.push(action.payload.category);
            }
        },
        clearCategoriesFilter: (state) => {
            state.categories = [];
        }
    }
})

export const {changeCategoriesFilter, clearCategoriesFilter} = filterCategorySlice.actions;
export default filterCategorySlice.reducer
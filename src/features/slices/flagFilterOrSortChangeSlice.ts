import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface PayloadData {
    isChanged: boolean,
    currentPage: number
}

const flagFilterOrSortChangeSlice = createSlice({
        name: "flagFilterOrSortChange",
        initialState: {
            isRefillTable: true,
            currentPage: 1
        },
        reducers: {
            changeFlag: (state, action: PayloadAction<PayloadData>) => {
                state.isRefillTable = action.payload.isChanged;
                state.currentPage = action.payload.currentPage
            },
            getToInitialStateStorePage: (state) => {
                state.isRefillTable = true;
                state.currentPage = 1;
            }
        }
    })

export const {changeFlag, getToInitialStateStorePage} = flagFilterOrSortChangeSlice.actions
export default flagFilterOrSortChangeSlice.reducer
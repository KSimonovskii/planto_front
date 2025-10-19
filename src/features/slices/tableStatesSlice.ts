import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface TableState {
    isRefillTable: boolean,
    currentPage: number

}

interface PayloadData {
    tableName: string,
    changes: Partial<TableState>
}

interface TableName {
    tableName: string
}

type StoreTableStates = Record<string, TableState>;

const initialState: StoreTableStates = {
    products: {
        isRefillTable: true,
        currentPage: 1
    },
    store: {
        isRefillTable: true,
        currentPage: 1
    },
    orders: {
        isRefillTable: true,
        currentPage: 1
    },
    users: {
        isRefillTable: true,
        currentPage: 1
    }
}

const tableStatesSlice = createSlice({
    name: "tableStates",
    initialState: initialState,
    reducers: {
        changeFlag: (state, action: PayloadAction<PayloadData>) => {
            const {tableName, changes} = action.payload;
            state[tableName] = {
                ...state[tableName],
                ...changes
            }
        },
        getToInitialTableStates: (state, action: PayloadAction<TableName>) => {
            const {tableName} = action.payload;
            state[tableName].isRefillTable = true;
            state[tableName].currentPage = 1
        }
    }
})

export const {changeFlag, getToInitialTableStates} = tableStatesSlice.actions
export default tableStatesSlice.reducer
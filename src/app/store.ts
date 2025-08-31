import {configureStore} from "@reduxjs/toolkit";
import filterPrice from "../features/slices/priceRangeSlice.ts"
import {productApi} from "../features/api/productApi.ts";
import {orderApi} from "../features/api/orderApi.ts";

export const store = configureStore({
    reducer: {
        filterPrice,
        [productApi.reducerPath]: productApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware, orderApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
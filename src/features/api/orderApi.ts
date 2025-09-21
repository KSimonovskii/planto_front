import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {DATA_FOR_ORDER_FILTERS} from "../../utils/constants.ts";
import Order from "../classes/Order.ts";

interface DataForFilters {
    statuses: [""];
}

interface answer {
    content: [{
        id: string,
        number: number,
        orderDate: string,
        status: string,
        amount: number
    }],
    page: {
        size: number,
        number: number,
        totalElements: number,
        totalPages: number
    }
}

export const orderApi = createApi({
    reducerPath: "orderApi",
    tagTypes: ["Orders"],
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_BASE_ORDER_ENDPOINT}`,
        headers: new Headers({"content-type": "application/json"}),
        credentials: "include"
    }),
    endpoints: (build) => ({
        getOrdersTable: build.query({
                query: (body) => ({
                    url: "all",
                    method: "POST",
                    body,
                }),
                transformResponse: (response: answer) => {
                    const orders = response.content.map((order) => new Order(order.id,
                        "",
                        new Date(order.orderDate),
                        order.status,
                        0));
                    return {orders: orders, pages: response.page.totalPages};
                },
                transformErrorResponse: (
                    response: { status: string | number },
                ) => response.status,
                providesTags: (result) =>
                    result && result.orders
                        ? [
                            ...result.orders.map(({id}) => ({type: 'Orders' as const, id})),
                            {type: 'Orders', id: 'LIST'},
                        ]
                        : [{type: 'Orders', id: 'LIST'}],
            }
        ),
        getDataForFilters: build.query({
            query: () => ({
                url: "/filterdata",
                method: "GET"
            }),
            transformResponse: (result: DataForFilters) => {
                DATA_FOR_ORDER_FILTERS.statuses = result.statuses;
                return result;
            },
        }),

    })
})

export const {useGetOrdersTableQuery,
                useGetDataForFiltersQuery} = orderApi;



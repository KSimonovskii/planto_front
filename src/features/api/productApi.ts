import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {DATA_FOR_PRODUCT_FILTERS} from "../../utils/constants.ts";
import type {AnswerTable} from "../../utils/types.d.ts";

interface DataForFilters {
    price: number,
    categories: [];
}

export const productApi = createApi({
    reducerPath: "productApi",
    tagTypes: ["Products","FilterData"],
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_BASE_PRODUCT_ENDPOINT}`,
        headers: new Headers({"Content-type": "application/json"})
    }),
    endpoints: (build) => ({
        getProductsTableRTK: build.query({
                query: (body) => ({
                    url: "",
                    method: "POST",
                    body,
                }),
                transformResponse: (response: AnswerTable,) => {
                        return {products: response.content, pages: response.page.totalPages};
                    },
                transformErrorResponse: (
                    response: { status: string | number },
                ) => response.status,
                providesTags: (result) =>
                    result && result.products
                        ? [
                            ...result.products.map(({ id }) => ({ type: 'Products' as const, id })),
                            { type: 'Products', id: 'LIST' },
                        ]
                        : [{ type: 'Products', id: 'LIST' }],
            }
        ),
        getDataForFilters: build.query({
            query: () => ({
                url: "/filterdata",
                method: "GET"
            }),
            transformResponse: (result : DataForFilters) => {
                DATA_FOR_PRODUCT_FILTERS.maxPrice = result.price;
                DATA_FOR_PRODUCT_FILTERS.categories = result.categories;
                return result;
            },
            providesTags: [{type: "FilterData"}]
        }),
        getProductById: build.query({
            query: (id)=>({
                url: `/${id}`,
                method: "GET"
            }),
            providesTags: (id) => [{type: 'Products', id}]
        }),
        addProduct: build.mutation({
            query: (body) => ({
                url: "/create",
                method: "POST",
                body
            }),
            invalidatesTags: [{ type: 'Products', id: 'LIST' }, {type: 'FilterData'}]
        }),
        removeProduct: build.mutation({
            query: (id) => ({
                url:`/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: [{type: 'Products', id: 'LIST'}, {type: 'FilterData'}]
        }),
        updateProduct: build.mutation({
            query: (body) => ({
                url: `/update/${body.id}`,
                method: "PUT",
                body: JSON.stringify(body)
            }),
            invalidatesTags: [{type: 'Products', id: 'LIST'}, {type: 'FilterData'}]

        })
    })
})

export const {useGetProductsTableRTKQuery,
                useGetDataForFiltersQuery,
                useGetProductByIdQuery,
                useAddProductMutation,
                useRemoveProductMutation,
                useUpdateProductMutation} = productApi;
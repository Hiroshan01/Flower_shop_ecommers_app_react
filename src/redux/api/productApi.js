import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ProductApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/v1" }), 
  keepUnusedDataFor:30,
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url:"/products",
        params:{
          page:params?.page,
          keyword:params?.keyword,
          category:params?.category,
          "price[gte]":params.min,
          "price[lte]":params.max,
          "ratings[gte]":params?.ratings
        }
      }),
    }),
    getProductDetails: builder.query({
      query: (id) => `/product/${id}`,
    }),
  }),
});

export const { useGetProductsQuery,useGetProductDetailsQuery} = ProductApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "http://localhost:4000/api/v1",
    credentials: "include" // Helps with cookies if using sessions
  }),
  endpoints: (builder) => ({
    createNewOrder: builder.mutation({
      query(body) {
        return {
          url: "/order/new",
          method: "POST",
          body,
        }
      }
    }),
  }),
});

export const { useCreateNewOrderMutation } = orderApi;
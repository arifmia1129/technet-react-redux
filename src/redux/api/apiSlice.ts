import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-tech-net.vercel.app/api/v1/',
  }),
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => 'product',
    }),
    getProductById: builder.query({
      query: (id) => `product/${id}`,
    }),
  }),
});

export const { useGetProductQuery, useGetProductByIdQuery } = api;

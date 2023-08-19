import { api } from '@/redux/api/apiSlice';

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => 'product',
    }),
    getProductById: builder.query({
      query: (id) => `product/${id}`,
      providesTags: ['comment'],
    }),
    addComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `product/${id}/comment`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['comment'],
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductByIdQuery,
  useAddCommentMutation,
} = productApi;

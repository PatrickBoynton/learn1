import { PRODUCTS_URL, UPLOADS_URL } from '../constants.js'
import { apiSlice } from './apiSlice.js'

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query({
      query: ({ pageNumber }) => ({
        url: PRODUCTS_URL,
        params: {
          pageNumber,
        },
      }),
      keepUnusedDataFor: 500,
    }),
    getProduct: builder.query({
      query: productId => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      providesTags: ['Products'],
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: `${PRODUCTS_URL}`,
        method: 'POST',
      }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation({
      query: data => ({
        url: `${PRODUCTS_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
    uploadProductImage: builder.mutation({
      query: data => ({
        url: `${UPLOADS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: productId => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
    }),
    createReview: builder.mutation({
      query: data => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
} = productApiSlice

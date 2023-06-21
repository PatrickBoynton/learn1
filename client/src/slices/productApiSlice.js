import { PRODUCTS_URL } from '../constants.js'
import { apiSlice } from './apiSlice.js'

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 500,
    }),
  }),
})

export const { useGetProductsQuery } = productApiSlice

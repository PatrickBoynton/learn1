import { apiSlice } from './apiSlice'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query({}),
  }),
})

import { apiSlice } from './apiSlice'
import { ORDERS_URL, PAYPAL_URL } from '../constants'

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createOrder: builder.mutation({
      query: order => ({
        url: ORDERS_URL,
        method: 'POST',
        body: { ...order },
      }),
    }),
    getOrderDetails: builder.query({
      query: id => ({
        url: `${ORDERS_URL}/${id}`,
      }),
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: { ...details },
      }),
    }),
    getPayPalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
      }),
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
    }),
  }),
})

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useGetMyOrdersQuery,
  useGetAllOrdersQuery,
} = ordersApiSlice

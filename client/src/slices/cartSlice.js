import { createSlice } from '@reduxjs/toolkit'

const cart = localStorage.getItem('cart')

const initialState = cart ? JSON.parse(cart) : { cartItems: [] }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
})

export default cartSlice.reducer

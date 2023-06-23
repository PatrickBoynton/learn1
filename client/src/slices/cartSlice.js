import { createSlice } from '@reduxjs/toolkit'
import { updateCart } from '../utils/cartUtils'

const cart = localStorage.getItem('cart')

const initialState = cart ? JSON.parse(cart) : { cartItems: [] }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload
      const itemExists = state.cartItems.find(i => i._id === item._id)

      if (itemExists) {
        state.cartItems = state.cartItems.map(cartItem =>
          cartItem._id === itemExists._id ? item : cartItem
        )
      } else {
        state.cartItems = [...state.cartItems, item]
      }

      updateCart(state)
    },
  },
})

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
import { updateCart } from '../utils/cartUtils'

const cart = localStorage.getItem('cart')

const initialState = cart
  ? JSON.parse(cart)
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' }

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

      return updateCart(state)
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        item => item._id !== action.payload
      )
      return updateCart(state)
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload
      return updateCart(state)
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload
      return updateCart(state)
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
} = cartSlice.actions

export default cartSlice.reducer

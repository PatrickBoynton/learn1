import { createSlice } from '@reduxjs/toolkit'

const cart = localStorage.getItem('cart')

const initialState = cart ? JSON.parse(cart) : { cartItems: [] }

const addDecimals = num => (Math.round(num * 100) / 100).toFixed(2)

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

      // item price
      state.itemPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      )

      // Shipping price
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10)

      // Tax price (6%)
      state.taxPrice = addDecimals(Number(0.06 * state.itemsPrice))

      // Total price
      state.totalPrice = addDecimals(
        Number(state.itemPrice + state.shippingPrice + state.taxPrice)
      )

      localStorage.setItem('cart', state)
    },
  },
})

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer

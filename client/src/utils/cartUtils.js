export const addDecimals = num => (Math.round(num * 100) / 100).toFixed(2)

export const updateCart = state => {
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

  localStorage.setItem('cart', JSON.stringify(state))

  return state
}

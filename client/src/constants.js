export const BASE_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : ''

export const PRODUCTS_URL = '/api/product'
export const ORDERS_URL = '/api/order'
export const PAYPAL_URL = '/api/config/paypal'

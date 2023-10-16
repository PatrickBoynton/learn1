export interface IProduct {
  _id?: string
  user?: IUser
  name: string
  image: string
  brand: string
  category: string
  description: string
  reviews?: IReview[]
  rating: number
  numReviews: number
  price: number
  countInStock: number
}

export interface IUser {
  _id?: string
  name: string
  email: string
  password: string
  isAdmin: boolean
  matchPassword?: (password: string) => Promise<void>
}

export interface IReview {
  _id?: string
  user: IUser
  name: string
  rating: number
  comment: string
}

interface IOrderItems {
  _id?: string
  name: string
  qty: number
  image: string
  price: number
  product: IProduct
}
interface IShippingAddress {
  _id?: string
  address: string
  city: string
  postalCode: string
  country: string
}
interface IPaymentResult {
  _id?: string
  status: string
  update_time: string
  email_address: string
}
export interface IOrder {
  _id?: string
  user: IUser
  orderItems: IOrderItems[]
  shippingAddress: IShippingAddress
  paymentMethod: string
  paymentResult: IPaymentResult
  itemsPrice: number
  taxPrice: number
  shippingPrice: number
  totalPrice: number
  isPaid: boolean
  paidAt: Date | number
  isDelivered: boolean
  deliveredAt: Date | number
}

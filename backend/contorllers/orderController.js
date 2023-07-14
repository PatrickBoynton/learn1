import { asyncHandler } from '../middleware/asyncHandler.js'
import Order from '../models/orderModel.js'

export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items.')
  } else {
    const order = new Order({
      orderItems: orderItems.map(item => ({
        ...item,
        product: item._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
})

export const getMyOrders = asyncHandler(async (req, res) => {
  const myOrders = await Order.find({ user: req.user._id })
  res.status(200).json(myOrders)
})

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.status(200).json(order)
  } else {
    res.status(404)
    throw new Error('Order not found.')
  }
})

export const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send('Update the order status.')
})
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send('Update the order status.')
})

export const getAllOrders = asyncHandler(async (req, res) => {
  res.send('Get all orders')
})

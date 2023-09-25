import { asyncHandler } from '../middleware/asyncHandler'
import Order from '../models/orderModel'
import { errorCondition } from '../utils/errorCondition'
import { CustomRequest } from '../interfaces/customInterfaceExtensions'
import { Request, Response } from 'express'

export const addOrderItems = asyncHandler(
  async (req: CustomRequest, res: Response): Promise<void> => {
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
      errorCondition(res, 400, 'No order items.')
    } else {
      const order = new Order({
        orderItems: orderItems.map((item: any) => ({
          ...item,
          product: item.product,
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
  }
)

export const getMyOrders = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const myOrders = await Order.find({ user: req.user._id })
    res.status(200).json(myOrders)
  }
)

export const getOrderById = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    )

    if (order) {
      res.status(200).json(order)
    } else {
      errorCondition(res, 404, 'Order not found.')
    }
  }
)

export const updateOrderToPaid = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id)

    if (order) {
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        _id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      }
      const updatedOrder = await order.save()

      res.status(200).json(updatedOrder)
    } else {
      errorCondition(res, 404, 'Error not found.')
    }
  }
)
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()
    const updatedOrder = await order.save()

    res.status(200).json(updatedOrder)
  } else {
    errorCondition(res, 404, 'Order not found.')
  }
})

export const getAllOrders = asyncHandler(
  async (_: Request, res: Response): Promise<void> => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.status(200).json(orders)
  }
)

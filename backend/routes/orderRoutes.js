import express from 'express'
import {
  addOrderItems,
  getAllOrders,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
  updateOrderToPaid,
} from '../contorllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, addOrderItems)
router.get('/', protect, getAllOrders)
router.get('/mine', protect, getMyOrders)
router.get('/:id', protect, getOrderById)
router.put('/:id/pay', protect, admin, updateOrderToPaid)
router.put('/:id/deliver', protect, admin, updateOrderToDelivered)

export default router

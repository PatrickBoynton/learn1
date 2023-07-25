import express from 'express'
import {
  getProductById,
  getProducts,
  createProduct,
} from '../contorllers/productController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getProducts)

router.get('/:id', getProductById)

router.post('/', protect, admin, createProduct)

export default router

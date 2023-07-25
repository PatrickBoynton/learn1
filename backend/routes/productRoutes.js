import express from 'express'
import {
  getProductById,
  getProducts,
  createProduct,
  editProduct,
} from '../contorllers/productController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getProducts)

router.get('/:id', getProductById)
router.put('/:id', protect, admin, editProduct)

router.post('/', protect, admin, createProduct)

export default router

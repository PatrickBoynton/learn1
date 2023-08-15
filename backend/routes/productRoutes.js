import express from 'express'
import {
  getProductById,
  getProducts,
  createProduct,
  editProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from '../contorllers/productController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getProducts)
router.get('/top', getTopProducts)
router.post('/', protect, admin, createProduct)

router.get('/:id', getProductById)
router.put('/:id', protect, admin, editProduct)
router.delete('/:id', protect, admin, deleteProduct)
router.post('/:id/reviews', protect, createProductReview)
export default router

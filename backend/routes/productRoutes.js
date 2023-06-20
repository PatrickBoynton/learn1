import express from 'express'
import { asyncHandler } from '../middleware/asyncHandler.js'
import Product from '../models/productModel.js'

const router = express.Router()

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const products = await Product.find({})
    res.json(products)
  })
)

router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (product) {
      res.send(product)
    } else {
      res.status(404)
      throw new Error('Resource not found.')
    }
  })
)

export default router

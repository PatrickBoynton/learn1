import { asyncHandler } from '../middleware/asyncHandler.js'
import Product from '../models/productModel.js'

export const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({})
  res.json(products)
})

export const getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.send(product)
  } else {
    res.status(404)
    throw new Error('Resource not found.')
  }
})

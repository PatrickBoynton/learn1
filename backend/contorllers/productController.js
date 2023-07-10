import { asyncHandler } from '../middleware/asyncHandler.js'
import Product from '../models/productModel.js'
import { errorCondition } from '../utils/errorCondition.js'

export const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({})
  res.json(products)
})

export const getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.send(product)
  } else {
    errorCondition(res, 404, 'Resource not found. ')
  }
})

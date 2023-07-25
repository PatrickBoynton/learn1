import { asyncHandler } from '../middleware/asyncHandler.js'
import Product from '../models/productModel.js'
import { errorCondition } from '../utils/errorCondition.js'

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.send(product)
  } else {
    errorCondition(res, 404, 'Resource not found. ')
  }
})

export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdProduct = await Product.save()

  res.status(201).json(createdProduct)
})

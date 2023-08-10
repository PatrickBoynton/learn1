import { asyncHandler } from '../middleware/asyncHandler.js'
import Product from '../models/productModel.js'
import { errorCondition } from '../utils/errorCondition.js'

export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 2
  const page = Number(req.query.pageNumber) || 1
  const count = await Product.countDocuments()

  const products = await Product.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
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

export const editProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updateProduct = await product.save()
    res.status(200).json(updateProduct)
  } else {
    errorCondition(res, 404, 'Product not found.')
  }
})

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await Product.deleteOne({ _id: product._id })
    res.status(200).json({ message: 'Product deleted' })
  } else {
    errorCondition(res, 404, 'Product not found')
  }
})

export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body
  const product = await Product.findById(req.params.id)
  if (product) {
    const alreadyReviewed = product.reviews.find(
      review => review.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      errorCondition(res, 400, 'Product already reviewed.')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = proudct.reviews.length

    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length

    await product.save()

    res.status(201).json({ message: 'Review added!' })
  } else {
    errorCondition(res, 404, 'Product not found.')
  }
})

import { asyncHandler } from '../middleware/asyncHandler'
import Product from '../models/productModel'
import { errorCondition } from '../utils/errorCondition'
import { Request, Response } from 'express'
import { CustomRequest } from '../interfaces/customInterfaceExtensions'

export const getProducts = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const pageSize: number = 2
    const page: number = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: 'i' } }
      : {}

    const count: number = await Product.countDocuments({ ...keyword })

    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))

    res.json({ products, page, pages: Math.ceil(count / pageSize) })
  }
)

export const getProductById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const product = await Product.findById(req.params.id)

    if (product) {
      res.send(product)
    } else {
      errorCondition(res, 404, 'Resource not found. ')
    }
  }
)

export const createProduct = asyncHandler(
  async (req: CustomRequest, res: Response): Promise<void> => {
    const product = await Product.create({
      name: 'Sample name',
      price: 0,
      user: req.user._id as string,
      image: '/images/sample.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
    })

    const createdProduct = await product.save()

    res.status(201).json(createdProduct)
  }
)

export const editProduct = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
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
  }
)

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const product = await Product.findById(req.params.id)

    if (product) {
      await Product.deleteOne({ _id: product._id })
      res.status(200).json({ message: 'Product deleted' })
    } else {
      errorCondition(res, 404, 'Product not found')
    }
  }
)

export const createProductReview = asyncHandler(
  async (req: CustomRequest, res: Response): Promise<void> => {
    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id)

    if (product) {
      const alreadyReviewed = product.reviews?.find(
        review => review.toString() === req.user._id.toString()
      )

      if (alreadyReviewed) {
        errorCondition(res, 400, 'Product already reviewed.')
      } else {
        const review = {
          name: req.user.name,
          rating: Number(rating),
          comment,
          user: req.user._id,
        }
        if (product.reviews) {
          product.reviews.push(review)

          product.numReviews = product.reviews.length

          product.rating =
            product.reviews.reduce(
              (acc: number, review: any) => acc + review.rating,
              0
            ) / product.reviews.length
        }

        await product.save()

        res.status(201).json({ message: 'Review added!' })
      }
    } else {
      errorCondition(res, 404, 'Product not found.')
    }
  }
)

export const getTopProducts = asyncHandler(
  async (_: Request, res: Response): Promise<void> => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)

    if (products) {
      res.status(200).json(products)
    } else {
      errorCondition(res, 404, 'Resource not found')
    }
  }
)

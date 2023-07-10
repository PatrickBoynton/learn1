import { asyncHandler } from './asyncHandler.js'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export const protect = asyncHandler(async (req, res, next) => {
  let token

  token = req.cookies.jwt

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SERCRET)
      req.user = await User.findById(decoded.userId).select('-password')
      next()
    } catch (e) {
      console.error(e)
      res.status(401)
      throw new Error('Unauthorized entry! Bad Token.')
    }
  } else {
    res.status(401)
    throw new Error('Unauthorized entry!')
  }
})

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Unauthorized entry! Not an admin.')
  }
}

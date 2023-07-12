import { asyncHandler } from './asyncHandler.js'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import { errorCondition } from '../utils/errorCondition.js'
import dotenv from 'dotenv'

dotenv.config({ path: '../.env' })

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
      errorCondition(res, 401, 'Unauthorized entry! Bad Token.')
    }
  } else {
    errorCondition(res, 401, 'Unauthorized entry!')
  }
})

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    errorCondition(res, 401, 'Unauthorized entry! Not an admin.')
  }
}

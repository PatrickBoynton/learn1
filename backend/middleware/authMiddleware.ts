import { asyncHandler } from './asyncHandler'
import jwt from 'jsonwebtoken'
import User from '../models/userModel'
import { errorCondition } from '../utils/errorCondition'
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import { CustomRequest } from '../interfaces/customInterfaceExtensions'
import { DecodedToken } from '../interfaces/misInterfaces'

dotenv.config({ path: '../.env' })

export const protect = asyncHandler(
  async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    let token = req.cookies.jwt

    if (token) {
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SERCRET as string
        ) as DecodedToken
        req.user = await User.findById(decoded.userId).select('-password')
        next()
      } catch (e: any) {
        console.error(e)
        errorCondition(res, 401, 'Unauthorized entry! Bad Token.')
      }
    } else {
      errorCondition(res, 401, 'Unauthorized entry!')
    }
  }
)

export const admin = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    errorCondition(res, 401, 'Unauthorized entry! Not an admin.')
  }
}

import { asyncHandler } from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

export const registerUser = asyncHandler(async (req, res, next) => {
  res.send('register user')
})

export const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expiresIn: new Date(0),
  })
  res.status(200).json({ message: 'Logged out successfully.' })
})

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && user.matchPassword(password)) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SERCRET, {
      expiresIn: '365d',
    })

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      //  365 days in milliseconds
      maxAge: 31536000000,
    })
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials.')
  }
})

export const getUserProfile = asyncHandler(async (req, res, next) => {
  res.send('Get user profile')
})

export const updateProfile = asyncHandler(async (req, res, next) => {
  res.send('UPDATE profile')
})

export const getAllUsers = asyncHandler(async (req, res, next) => {
  res.send('Get all users')
})

export const getUser = asyncHandler(async (req, res, next) => {
  res.send('Get User by ID')
})

export const deleteUsers = asyncHandler(async (req, res, next) => {
  res.send('DELETED')
})

export const updateUser = asyncHandler(async (req, res, next) => {
  res.send('UPDATE user')
})

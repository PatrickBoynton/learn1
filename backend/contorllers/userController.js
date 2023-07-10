import { asyncHandler } from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { generateToken } from '../utils/generateToken.js'

export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists!')
  }

  const user = await User.create({ name, email, password })

  if (user) {
    generateToken(res, user._id)

    res.status(201).json({
      _id: user._id,
      email: user.email,
      password: user.password,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data. ')
  }
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
    generateToken(res, user._id)

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

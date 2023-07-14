import { asyncHandler } from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'
import { generateToken } from '../utils/generateToken.js'
import { errorCondition } from '../utils/errorCondition.js'

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
      name: user.name,
      email: user.email,
      password: user.password,
    })
  } else {
    errorCondition(res, 400, 'Invalid user data.')
  }
})

export const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expiresIn: new Date(0),
  })
  res.status(200).json({ message: 'Logged out successfully.' })
})

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && user.matchPassword(password)) {
    generateToken(res, user._id)

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    errorCondition(res, 401, 'Invalid credentials. ')
  }
})

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  const { _id, email, password } = user
  if (user) {
    res.status(200).json({ _id, email, password })
  } else {
    errorCondition(res, 404, 'This is not the user you are looking for. ')
  }
})

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.user.name || user.name
    user.email = req.user.email || user.email

    if (req.body.password) user.password = req.body.password
  } else {
    errorCondition(res, 404, 'This is not the user you are looking for.')
  }
  const updatedUser = await user.save()
  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    password: updatedUser.password,
    isAdmin: updatedUser.isAdmin,
  })
})

export const getAllUsers = asyncHandler(async (req, res) => {
  res.send('Get all users')
})

export const getUser = asyncHandler(async (req, res) => {
  res.send('Get User by ID')
})

export const deleteUsers = asyncHandler(async (req, res) => {
  res.send('DELETED')
})

export const updateUser = asyncHandler(async (req, res) => {
  res.send('UPDATE user')
})

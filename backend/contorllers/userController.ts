import { asyncHandler } from '../middleware/asyncHandler'
import User from '../models/userModel'
import { generateToken } from '../utils/generateToken'
import { errorCondition } from '../utils/errorCondition'
import { Request, Response } from 'express'
import { CustomRequest } from '../interfaces/customInterfaceExtensions'

export const registerUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
      errorCondition(res, 400, 'User already exists.')
    }

    const user = await User.create({ name, email, password })

    if (user) {
      generateToken(res, user._id)

      await user.save()

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
      })
    } else {
      errorCondition(res, 400, 'Invalid user data.')
    }
  }
)

export const logoutUser = asyncHandler(
  async (_: Request, res: Response): Promise<void> => {
    res.cookie('jwt', '', {
      httpOnly: true,
      // expiresIn: new Date(0),
    })
    res.status(200).json({ message: 'Logged out successfully.' })
  }
)

export const loginUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    const isMatch = user?.matchPassword(password)
    if (user && isMatch) {
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
  }
)

export const getUserProfile = asyncHandler(
  async (req: CustomRequest, res: Response): Promise<void> => {
    const user = await User.findById(req.user._id)
    if (user) {
      const { _id, email, password } = user
      res.status(200).json({ _id, email, password })
    } else {
      errorCondition(res, 404, 'This is not the user you are looking for. ')
    }
  }
)

export const updateProfile = asyncHandler(
  async (req: CustomRequest, res: Response): Promise<void> => {
    const user = await User.findById(req.user._id)

    if (user) {
      user.name = req.user.name || user.name
      user.email = req.user.email || user.email

      if (req.body.password) user.password = req.body.password
    } else {
      errorCondition(res, 404, 'This is not the user you are looking for.')
    }
    const updatedUser = await user?.save()
    res.status(200).json({
      _id: updatedUser?._id,
      name: updatedUser?.name,
      email: updatedUser?.email,
      password: updatedUser?.password,
      isAdmin: updatedUser?.isAdmin,
    })
  }
)

export const getAllUsers = asyncHandler(
  async (_: Request, res: Response): Promise<void> => {
    const users = await User.find({})
    res.status(200).json(users)
  }
)

export const getUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const user = await User.findById(req.params.id).select('-password')

    if (user) {
      res.status(200).json(user)
    } else {
      errorCondition(res, 404, 'This is not the user you were looking for.')
    }
  }
)

export const deleteUsers = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const user = await User.findById(req.params.id)

    if (user) {
      if (user.isAdmin) {
        errorCondition(res, 400, "Admins can't be deleted. ")
      }
      await user.deleteOne({ _id: user._id })
      res.status(204).json({ message: 'User Deleted.' })
    } else {
      errorCondition(res, 404, 'This is not the user you were looking for.')
    }
  }
)

export const updateUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const user = await User.findById(req.params.id)

    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.isAdmin = Boolean(req.body.isAdmin)

      const updatedUser = await user.save()

      res.status(200).json(updatedUser)
    } else {
      errorCondition(res, 404, 'This is not the user you were looking for.')
    }
  }
)

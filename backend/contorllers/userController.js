import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'


export const authUser = asyncHandler(async (req, res, next) => {
    res.send('auth user')
})

export const registerUser = asyncHandler(async (req,res, next) => {
    res.send('register user')
})

export const logoutUser = asyncHandler(async (req, res, next) => {
    res.send('logout')
})

export const loginUser = asyncHandler(async (req, res, next) => {
    res.send('login')
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
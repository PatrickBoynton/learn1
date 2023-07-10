import express from 'express'
import {
  deleteUsers,
  getAllUsers,
  getUser,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateProfile,
  updateUser,
} from '../contorllers/userController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', protect, admin, getAllUsers)
router.post('/', registerUser)

router.post('/logout', protect, logoutUser)
router.post('/login', loginUser)

router.get('/profile', protect, getUserProfile)
router.put('/profile', protect, updateProfile)

router.delete('/:id', protect, admin, deleteUsers)
router.get('/:id', getUser)
router.put('/:id', updateUser)

export default router

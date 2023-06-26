import express from 'express'
import {
    deleteUsers,
    getAllUsers, getUser,
    getUserProfile,
    loginUser,
    logoutUser,
    registerUser,
    updateProfile, updateUser
} from "../contorllers/userController.js";

const router = express.Router()

router.get('/', getAllUsers)
router.post('/', registerUser)

router.post('/logout', logoutUser)
router.post('/login', loginUser)

router.get('/profile', getUserProfile)
router.put('/profile', updateProfile)

router.delete('/:id', deleteUsers)
router.get('/:id', getUser)
router.put('/:id', updateUser)

export default router
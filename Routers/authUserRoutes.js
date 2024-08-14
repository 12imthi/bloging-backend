import express from "express"
import { getAllUsers, loginUser, logoutUser, registerUser,deleteUsers,updateUserByRole } from "../Controllers/UserController.js";







const router = express.Router();

router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/logout',logoutUser)
router.get('/users',getAllUsers)
router.delete('/users/:id',deleteUsers)
router.put('/users/:id',updateUserByRole)

export default router;
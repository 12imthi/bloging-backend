import express from "express"
import { getAllUsers, loginUser, logoutUser, registerUser } from "../Controllers/UserController.js";
// import { authenticateToken } from '../Middleware/authenticateToken.js';
import { deleteUsers } from '../Controllers/UserController.js';






const router = express.Router();

router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/logout',logoutUser)
router.get('/users',getAllUsers)
router.delete('/users/:id',deleteUsers)

export default router;
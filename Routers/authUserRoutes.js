import express from "express"
import { loginUser, registerUser } from "../Controllers/UserController.js";
// import { authenticateToken } from '../Middleware/authenticateToken.js';






const router = express.Router();

router.post('/register',registerUser)
router.post('/login',loginUser)

export default router;
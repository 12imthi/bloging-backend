import express from "express"
import { registerUser } from "../Controllers/UserController.js";


const router = express.Router();

router.post('/register',registerUser)

export default router;
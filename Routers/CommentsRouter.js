import express from "express"
import { totalComments, postComments } from "../Controllers/CommentController.js";

const router = express.Router();

router.post('/post-comment', postComments)
router.get('/total-comment', totalComments)

export default router;
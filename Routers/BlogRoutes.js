import express from "express"
import { createBlog, deletePost, getBlogs, getById, relatedPost, updatePostById } from "../Controllers/BlogController.js";




const router = express.Router();

router.post("/create-post",createBlog)

router.get('/',getBlogs)

router.get('/:id',getById)

router.patch('/update-post/:id',updatePostById)

router.delete('/delete-post/:id',deletePost)

router.get('/related/:id',relatedPost)



export default router;